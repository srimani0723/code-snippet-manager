# Code Snippet Manager

Save, share, and organize code snippets with a lightweight MERN app. This project includes user authentication, snippet collections, a Monaco-based editor, sandboxed code execution, and AI-assisted snippet explanations.

## Screenshots

Added screenshots directly from the github by drag and drop.

- Home
<img width="1919" height="855" alt="Screenshot 2026-08-05 181654" src="https://github.com/user-attachments/assets/9bc2a3cd-f41a-4831-a496-46fa1f08d98c" />
- Dashboard
<img width="1919" height="855" alt="Screenshot 2026-08-05 181726" src="https://github.com/user-attachments/assets/f69c9c4d-568e-47e0-8825-ef2b22b09c23" />

- Explore
  
<img width="1919" height="857" alt="Screenshot 2026-08-05 181849" src="https://github.com/user-attachments/assets/fc124873-1623-4dd1-9b30-b228ac80086e" />
- Explore Snippet details
<img width="1919" height="769" alt="Screenshot 2026-08-05 181910" src="https://github.com/user-attachments/assets/ecfbee0a-d296-4cf8-af70-07b497f65959" />
- User Snippet details
<img width="1919" height="855" alt="Screenshot 2026-08-05 181835" src="https://github.com/user-attachments/assets/e2c3b8aa-b4bd-4440-aa48-e5f566185111" />

- Collections
<img width="1919" height="857" alt="Screenshot 2026-08-05 181742" src="https://github.com/user-attachments/assets/01ae1ab4-b609-4049-ac83-383b129c7334" />

- Collections Details
<img width="1919" height="854" alt="Screenshot 2026-08-05 181804" src="https://github.com/user-attachments/assets/9d30d5d7-833d-4d2b-bc80-40470ad0c8ea" />

- Editor
<img width="1919" height="858" alt="Screenshot 2026-08-05 182001" src="https://github.com/user-attachments/assets/f3a30e49-1fb6-46e3-b895-5ee352c93030" />

- AI explain result
<img width="1918" height="857" alt="Screenshot 2026-08-05 182022" src="https://github.com/user-attachments/assets/094d41b0-4181-4d53-a812-d3502efaad47" />

## Features

- Authentication: register, login, logout and session verification. Uses JWT stored in HTTP-only cookies and password hashing with `bcrypt`.
- Snippet CRUD: create, edit, delete, and view snippets with metadata (title, language, description, tags). Snippets support multiple languages and syntax highlighting in the editor.
- Public / Private snippets & Forking: mark snippets as public to share them in the Explore view; public snippets can be forked into a user's dashboard while private snippets remain owner-only.
- Collections: group related snippets into collections, add or remove snippets from collections, and toggle synchronization between snippets and collections.
- Search & Filters: full-text and field-based search by title, language, description or tags with client-side filters for easier discovery.
- Monaco Editor: in-browser code editor with syntax highlighting and language modes powered by the Monaco editor component.
- Theme Toggle: light/dark theme support with persistent preference (via `ThemeContext` / localStorage).
- Server-side sandboxed execution: run JavaScript snippets in a secure sandbox (`vm2`) via the `/api/compiler/javascript` endpoint; returns execution output or errors.
- AI-assisted explanations: send snippet code to the AI service (`/api/ai/explain`) to receive concise, human-readable explanations (requires `GEMINI_API_KEY`).
- State & Networking: client uses React Query for server state and mutations, and Redux Toolkit for application-level state.
- Security & Ops: HTTP-only cookies, CORS configuration for frontend origins, and environment-based configuration for production vs. development.

## What's new / notable features

- AI code explanation: POST `/api/ai/explain` (authenticated) — sends snippet code to an AI service and returns a concise explanation.
- Server-side JavaScript runner: POST `/api/compiler/javascript` — runs submitted JS in a sandbox and returns output.
- Snippet forking and public/private visibility, collections, and Monaco editor integration.

## Quick start

Requirements

- Node 16+ and npm
- MongoDB (local or hosted)

Run the backend

```bash
cd backend
npm install
# create .env (see example below)
npm run dev
```

Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the app at: http://localhost:5173

## Environment example (`backend/.env`)

```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/code-snippet-manager
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_key_here
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_V2=http://localhost:4173
```

Notes:

- Backend reads `MONGODB_URL`, `PORT`, `GEMINI_API_KEY`, `FRONTEND_URL`, and `FRONTEND_URL_V2`.
- The AI explain endpoint requires authentication (uses HTTP-only cookies + JWT).

## Main API routes

- `/api/auth` — register, login, logout, verify session
- `/api/snippets` — CRUD and fork snippets
- `/api/collections` — CRUD collections and manage snippet membership
- `/api/compiler/javascript` — POST JS code, returns execution output
- `/api/ai/explain` — POST code, returns AI-generated explanation (authenticated)

## Developer notes

- Auth uses HTTP-only cookies and JWT tokens; passwords are hashed with `bcrypt`.
- The compiler service is sandboxed using `vm2`; review `backend/services/compilerService.js` before enabling untrusted code in production.
- AI calls use the Gemini client and require `GEMINI_API_KEY` in env.

## Project structure

- `backend/` — Express API, controllers, services, models, middlewares
- `frontend/` — React app (Vite), pages, components, hooks, providers

## Scripts

- Backend: `npm run dev` (uses `nodemon`), `npm start` to run `node index.js`.
- Frontend: `npm run dev` (Vite), `npm run build`, `npm run preview`.

## Contributing

- Fork, create a feature branch, and open a pull request. Include tests for significant features and keep changes scoped.

---

If you'd like, I can add screenshot files with suggested crops, or update the README to include example API requests and responses. Which would you prefer next?
