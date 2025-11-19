const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: 'include', // Include credentials for CORS
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
      } catch {
        // If response is not JSON, create error object
        errorData = { error: `HTTP error! status: ${response.status}` };
      }

      // Handle express-validator errors format: { errors: [{ msg, param }] }
      if (errorData.errors && Array.isArray(errorData.errors)) {
        const errorMessages = errorData.errors.map((err: any) => 
          `${err.param || 'Campo'}: ${err.msg || err.message || 'Error de validación'}`
        ).join(', ');
        throw new Error(errorMessages);
      }

      // Handle standard error format: { error: "message" }
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  async register(userData: {
    nombre: string;
    email: string;
    password: string;
    rol?: string;
    id_padre?: number;
  }) {
    const data = await this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Verify token is still valid
  async verifyToken(): Promise<boolean> {
    try {
      await this.request('/auth/me');
      return true;
    } catch {
      // If token is invalid, clear it
      this.logout();
      return false;
    }
  }

  // Users
  async getCurrentUserProfile() {
    return this.request('/users/me');
  }

  async updateProfile(data: { nombre?: string; email?: string }) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getUserStats() {
    return this.request('/users/me/stats');
  }

  // Drawings
  async uploadDrawing(file: File, descripcion?: string) {
    const formData = new FormData();
    formData.append('drawing', file);
    if (descripcion) {
      formData.append('descripcion', descripcion);
    }

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/drawings`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getDrawings() {
    return this.request('/drawings');
  }

  async getDrawing(id: number) {
    return this.request(`/drawings/${id}`);
  }

  async deleteDrawing(id: number) {
    return this.request(`/drawings/${id}`, { method: 'DELETE' });
  }

  // Chat
  async createChatSession(titulo?: string) {
    return this.request('/chat/sessions', {
      method: 'POST',
      body: JSON.stringify({ titulo }),
    });
  }

  async getChatSessions() {
    return this.request('/chat/sessions');
  }

  async getChatMessages(sessionId: number) {
    return this.request(`/chat/sessions/${sessionId}/messages`);
  }

  async sendMessage(sessionId: number, texto: string, id_dibujo?: number) {
    return this.request(`/chat/sessions/${sessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ texto, id_dibujo }),
    });
  }

  async closeChatSession(sessionId: number) {
    return this.request(`/chat/sessions/${sessionId}/close`, {
      method: 'PATCH',
    });
  }

  // Processes
  async getProcessTypes() {
    return this.request('/processes/types');
  }

  async createProcess(data: {
    id_dibujo: number;
    id_tipo_proceso: number;
    parametros?: any;
  }) {
    return this.request('/processes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProcesses() {
    return this.request('/processes');
  }

  async getProcess(id: number) {
    return this.request(`/processes/${id}`);
  }

  async getProcessResults(id: number) {
    return this.request(`/processes/${id}/results`);
  }
}

export const api = new ApiService();

