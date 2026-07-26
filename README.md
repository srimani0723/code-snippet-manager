# 📂 Code Snippet Manager

<p align="left">
  <img src="https://img.shields.io/badge/react-19.0-blue?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/vite-6.0-purple?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwindcss-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/node-20.x-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/express-5.x-lightgrey?style=for-the-badge&logo=express&logoColor=black" alt="Express" />
  <img src="https://img.shields.io/badge/mongodb-7.0-green?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/jwt-black?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT" />
</p>

A premium developer utility designed to save, search, fork, and manage code snippets across multiple programming languages and tech stacks. Built using a robust full-stack architecture featuring a React frontend, a Node.js/Express backend, and MongoDB database storage.

---

## 🛠️ Technology Stack

| Layer | Technology | Badge / Logo | Key Advantages / Use Cases |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | React 19, Vite | <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" /> | Fast dev server, modular Component architecture, and responsive state updates. |
| **Styling** | Tailwind CSS v4 | <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" /> | Utility-first styling framework allowing extremely fast and modern UI construction. |
| **Routing & Client API** | React Router DOM, Axios | <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white" /> | Declarative client-side routing, route guard parameters, and asynchronous AJAX queries. |
| **Syntax Highlighting** | Prism React Renderer | <img src="https://img.shields.io/badge/PrismJS-lightgrey?style=flat-square" /> | High-fidelity color highlighting of code blocks directly on the snippet cards. |
| **Backend Core** | Express, Node.js | <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" /> | Non-blocking I/O runtime, clean middleware pipelines, and structured controller layers. |
| **Database & ORM** | MongoDB, Mongoose | <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" /> | Flexible document storage matching JSON models directly with Mongoose schemas. |
| **Security & Auth** | JWT, Bcrypt | <img src="https://img.shields.io/badge/JWT-black?style=flat-square&logo=JSON%20web%20tokens" /> | Fully hashed passwords using Bcrypt and signed authorization tokens for session validity. |

---

## 📁 Workspace Folder Structure

Below is the directory mapping of the workspace:

```text
code-snippet-manager/
├── backend/
│   ├── controllers/         # Express controllers (user, snippet, collection)
│   ├── db.js                # Mongoose database connection setup
│   ├── index.js             # API entrypoint, CORS configuration, routes mounting
│   ├── middlewares/         # Authorization middleware (verifyToken)
│   ├── models/              # Mongoose DB schema definitions
│   ├── routes/              # Express API route endpoints
│   ├── services/            # Database query services
│   ├── utils/               # Helpers for JWT tokens, hashing, and cookies
│   └── package.json         # Backend dependencies
└── frontend/
    ├── src/
    │   ├── auth/            # Axios API config & auth check methods
    │   ├── components/      # Shared React components (Navbar, Filters, SnippetCard, SnippetForm)
    │   ├── contexts/        # Snippets state context & context provider
    │   ├── customHooks/     # useAuth custom hook for checking auth state
    │   ├── pages/           # Screen views (Home, Login, Register, Snippets, Dashboard)
    │   ├── App.jsx          # Route configuration
    │   └── main.jsx         # React application mounting
    ├── index.html           # HTML template shell
    ├── vite.config.js       # Vite build configurations
    └── package.json         # Frontend dependencies
```

---

## ✨ Features & Capabilities

- **🔐 Safe Authentication**: Secure authentication system employing hashed user passwords (via Bcrypt) and JWT generation stored in HttpOnly cookies to defend against XSS attacks.
- **💻 Interactive Dashboard**: Seamless React-driven dashboard dashboard allowing authenticated users to easily create, view, search, edit, or delete personal snippets.
- **🔍 Advanced Query Filters**: Sophisticated live search filters allowing dynamic search matches across titles and descriptions, language types, and comma-separated tags.
- **✨ High-Fidelity Highlights**: Prism-driven code visualization utilizing the beautiful `oneDark` style to make code readable and scannable directly on the feed card.
- **🍴 Code Forking**: Simple fork capabilities allowing users to clone shared snippets from other developers directly to their personal workspaces.
- **📂 Backend Snippet Collections**: Ready-to-go MongoDB collection endpoints to categorize and structure code snippets into folders.

---

## 🔒 API Endpoints & Routes

### 1. Authentication (`/api/auth`)
Mounted in [index.js](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/backend/index.js) pointing to [authRoute.js](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/backend/routes/authRoute.js):

| Endpoint | Method | Authentication | Description |
| :--- | :--- | :--- | :--- |
| `/register` | `POST` | Public | Creates a new user, hashes password, generates JWT, sets token cookie. |
| `/login` | `POST` | Public | Validates credentials, sets HttpOnly token cookie. |
| `/logout` | `POST` | Public | Clears client token cookie. |
| `/check` | `GET` | **Required** (JWT) | Validates user session token and returns active user details. |

### 2. Snippets (`/api/snippets`)
Mounted in [index.js](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/backend/index.js) pointing to [snippetRoute.js](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/backend/routes/snippetRoute.js):

| Endpoint | Method | Authentication | Description |
| :--- | :--- | :--- | :--- |
| `/` | `POST` | **Required** (JWT) | Creates a new code snippet under the authenticated user. |
| `/` | `GET` | **Required** (JWT) | Retrieves all public snippets (or my snippets with `?mine=true`) with search, filter, and pagination support. |
| `/:id` | `PUT` | **Required** (JWT) | Updates a code snippet (requires ownership checks). |
| `/:id` | `DELETE`| **Required** (JWT) | Deletes a code snippet (requires ownership checks). |
| `/:id/fork` | `POST` | **Required** (JWT) | Clones a public snippet from another user and saves a copy on the user's dashboard. |

### 3. Collections (`/api/collections`)
Mounted in [index.js](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/backend/index.js) pointing to [collectionRoute.js](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/backend/routes/collectionRoute.js):

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/` | `POST` | Creates a new custom folder collection of snippets. |
| `/` | `GET` | Retrieves all folders or collections in the user's catalog. |
| `/:id` | `PUT` | Renames or updates snippet IDs inside a collection. |
| `/:id` | `DELETE`| Removes a custom collection folder. |

---

## 💻 Frontend Pages & Routing

All routes are declared in [App.jsx](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/frontend/src/App.jsx):

- **`/` (Public - [Home.jsx](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/frontend/src/pages/Home.jsx))**: Landing screen displaying app introduction and dynamic marquee listings of supported languages.
- **`/login` (Public - [Login.jsx](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/frontend/src/pages/Login.jsx))**: Captures credentials and authenticates sessions.
- **`/register` (Public - [Register.jsx](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/frontend/src/pages/Register.jsx))**: Registers a new user.
- **`/snippets` (Protected - [Snippets.jsx](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/frontend/src/pages/Snippets.jsx))**: Displays the public snippets catalog. Built with a global `SnippetsProvider` context feed and dynamic multi-criteria search.
- **`/dashboard` (Protected - [Dashboard.jsx](file:///c:/Users/srima/OneDrive/Downloads/code-snippet-manager-main/code-snippet-manager-main/frontend/src/pages/Dashboard.jsx))**: User-owned snippet panel allowing creation, edition, and deletion via a form card.

---

## ⚙️ Setup & Configuration

### Prerequisites
- Node.js installed locally.
- MongoDB instance running locally or hosted on MongoDB Atlas.

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` and configure the variables:
   ```env
   PORT=5000
   MONGODB_URL=mongodb://localhost:27017/code-snippets
   JWT_SECRET=your_jwt_signing_secret_here
   FRONTEND_URL=http://localhost:5173
   ```
4. Run the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `frontend/` (or update existing `.env`):
   ```env
   VITE_BACKEND=http://localhost:5000/api
   ```
4. Run the frontend development server:
   ```bash
   npm run dev
   ```
