
import { Pool } from '@neondatabase/serverless';

const connectionString = import.meta.env.VITE_DATABASE_URL;

if (!connectionString) {
    console.error("❌ VITE_DATABASE_URL is missing in .env");
}

export const pool = new Pool({ connectionString });

// Helper to run queries easily
export const query = async (text: string, params?: any[]) => {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        // release client back to pool
        client.release();
    }
};
