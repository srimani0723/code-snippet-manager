# 🚀 SnipSpace - Modern Code Snippet Manager & Playground

SnipSpace is a feature-rich, high-performance web application designed for developers to create, organize, execute, and share code snippets. Equipped with an interactive editor sandbox and a secure execution engine, SnipSpace makes snippet management seamless and developer-friendly.

---

## 🎨 Tech Stack

| Technology         | Purpose               | Logo / Shield                                                                                                                     |
| :----------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| **MongoDB**        | Database              | ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)                   |
| **Express.js**     | Backend Framework     | ![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)             |
| **React**          | Frontend Framework    | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)                     |
| **Node.js**        | Runtime Environment   | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)                           |
| **Tailwind CSS**   | Styles & Layouts      | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind_css&logoColor=white)      |
| **React Query**    | State & Data Fetching | ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)         |
| **Monaco Editor**  | Code Editor Component | ![Monaco Editor](https://img.shields.io/badge/Monaco%20Editor-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) |
| **JSON Web Token** | Authentication Token  | ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)                                       |

---

## ✨ Features

- **💻 Real-Time Interactive Playground:** Live Monaco Editor environment with standard JS capabilities to write and play with Javascript code directly on the browser.
- **⚡ Secure Server-Side Execution:** Executes user code safely in a sandbox on the backend using `vm2`, returning compilation outputs and runtime errors instantly.
- **📂 Full CRUD Operations:** Create, retrieve, update, and delete snippets. Easily manage snippet configuration properties like Title, Description, Tags, Language, and Visibility.
- **👥 Collaboration & Forking:** Discover public snippets created by other developers and fork them to your workspace to build upon existing solutions.
- **🔒 Secure 48-Hour Auth Session:** Fully secured JWT sessions stored in HttpOnly cookies, protecting your private library for up to 48 hours.
- **🌗 Dynamic Theme System:** Seamless light/dark mode support with sleek, responsive designs and curated color palettes.
- **🏷️ Smart Tags & Search:** Filter and look up snippets instantly using titles, descriptions, or specific language tags.

---

## 💡 Advantages

1. **Boost Productivity:** Keep your most-used boilerplates and helper functions in one dashboard. No more searching through old repositories or folders.
2. **Experiment Instantly:** Zero local setup needed to test Javascript snippets. Open the Playground, type, and click **Run Code**.
3. **Collaboration Friendly:** Share code patterns with teammates by turning public snippet access on, or fork public templates to customize them.
4. **Enhanced Security:** Private snippets stay strictly confidential under secure routes, while credentials are safe with hashed passwords and secure authentication cookies.

---

## 🛠️ Installation & Setup

Follow these steps to set up SnipSpace locally:

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 2. Clone the Repository

```bash
git clone https://github.com/<your-username>/code-snippet-manager.git
cd code-snippet-manager
```

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/snipspace
   JWT_SECRET=your_super_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Security Best Practices

- Passwords are encrypted using **bcrypt** before database insertion.
- Session tokens are verified through **JWT** and transferred using **HttpOnly cookies** (with `Secure` and `SameSite: lax` options enabled).
- Executing custom user script files is strictly isolated using backend sandbox environments.
