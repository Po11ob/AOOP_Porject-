**Money Manager — Full Stack (minimal runnable scaffold)**

Run services with Docker Compose (builds backend image and starts MySQL):

```bash
docker compose up --build
```

API:
- Backend: http://localhost:8080 (inside compose) or http://localhost/api via frontend proxy
- Auth endpoints: POST /api/auth/register, /api/auth/login (JSON body)

Frontend (production with Docker):
- Build and run with Docker Compose (adds `frontend` service):
  ```bash
  docker compose up --build
  ```
- Frontend will be available at: http://localhost/
- The frontend proxies `/api` to the backend in the compose network so no additional config is required.

Frontend (local dev):
- Install dependencies: `cd frontend && npm install`
- Start dev server: `npm run dev` (available at http://localhost:5173 or next available port)
- To point dev server to a backend in a different host, set `VITE_API_URL` in your environment or in `vite.config.js`.

Notes:
- Backend is a Spring Boot app wired to MySQL via environment variables and started by Docker Compose.
- After starting, you can register an account via the Register page and then sign in to view the dashboard.

# AOOP_Porject-