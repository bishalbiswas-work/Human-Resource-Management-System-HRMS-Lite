let rawUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : 'https://hrms-backend-hchs.onrender.com');

// Render injects 'host' as e.g., 'hrms-backend.onrender.com' without protocol
if (rawUrl && !rawUrl.startsWith('http')) {
    rawUrl = `https://${rawUrl}`;
}

export const API_BASE_URL = rawUrl.replace(/\/$/, "");
