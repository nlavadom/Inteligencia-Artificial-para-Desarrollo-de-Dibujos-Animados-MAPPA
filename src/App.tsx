import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Upload } from "./pages/Upload";
import { Chat } from "./pages/Chat";
import { Animation } from "./pages/Animation";
import { Profile } from "./pages/Profile";
import { DesignSystem } from "./pages/DesignSystem";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
