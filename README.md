**Money Manager — Full Stack (minimal runnable scaffold)**

Run services with Docker Compose (builds backend image and starts MySQL):

```bash
docker compose up --build
```

API:
- Backend: http://localhost:8080
- Auth endpoints: POST /api/auth/register, /api/auth/login (JSON body)

Notes:
- Backend is a minimal Spring Boot app wired to MySQL via environment variables.
- Frontend scaffold is provided under `frontend/` — run `npm install` and `npm run dev`.
# AOOP_Porject-