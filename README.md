# Code Snippet Manager

A MERN stack app for saving, organizing, browsing, and reusing code snippets. It supports private and public snippets, collections, search and filtering, snippet forking, and a browser-based editor for creating or editing code.

## Features

- Authentication with register, login, logout, and session verification.
- Create, edit, delete, and view snippets.
- Mark snippets as public or private.
- Explore public snippets from other users and fork them into your own dashboard.
- Organize snippets into collections and sync snippets between snippets and collections.
- Search and filter snippets by title, language, description, or tags.
- Monaco-based code editor for writing snippets in the browser.
- Theme toggle for light and dark mode.
- Backend code execution through a sandboxed compiler service using `vm2`.

## Tech Stack

| Technology                                                                                                                                        | Purpose                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />                          | Database                              |
| <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />                    | Backend API                           |
| <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />                               | Frontend UI                           |
| <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />                          | Runtime                               |
| <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />                                   | Frontend dev server and build tooling |
| <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />              | App state                             |
| <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=tanstack&logoColor=white" alt="React Query" />               | Server state and mutations            |
| <img src="https://img.shields.io/badge/Monaco%20Editor-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="Monaco Editor" /> | In-browser code editing               |
| <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />          | Styling                               |
| <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />                            | Authentication                        |

## Project Structure

- `backend/` contains the Express API, MongoDB models, controllers, services, and auth utilities.
- `frontend/` contains the React app, pages, reusable components, hooks, and state management.

## Prerequisites

- Node.js 16 or newer
- MongoDB running locally or a hosted MongoDB connection string

## Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/code-snippet-manager
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
```

Start the API:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the app at [http://localhost:5173](http://localhost:5173).

## API Overview

The backend exposes these routes under `/api`:

- `/api/auth` for register, login, logout, and session check
- `/api/snippets` for snippet CRUD and fork actions
- `/api/collections` for collection CRUD and snippet-collection syncing
- `/api/compiler` for running code in the backend sandbox

## Notes

- Auth uses HTTP-only cookies and JWT.
- Passwords are hashed with `bcrypt`.
- Public snippets can be forked, but private snippets stay in the owner dashboard.
