# 📝 Notes App

This project is a modern web application for managing notes with a full-featured authentication system. Built with **Next.js (App Router)**, it ensures fast performance, protected routes, and a seamless user experience.

🔗 **Live Demo:** [https://09-auth-one-self.vercel.app/](https://09-auth-one-self.vercel.app/)

---

## 🚀 Key Features

- 🔐 **Authentication:** Secure user registration, login, and logout.
- 🛡️ **Protected Routes:** Access to notes and profile pages is restricted to authorized users only.
- 📓 **Notes Management (CRUD):** Create, read, update, and delete your personal notes.
- 👤 **User Profile:** Display and manage current user information.
- 🌓 **Dark Theme:** Modern and stylish UI optimized for comfortable use.
- ⚡ **Optimization:** Leverages Next.js Server and Client components for maximum efficiency.

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **Data Fetching:** Axios (with separate Client and Server API instances for Cookie handling)
- **Styling:** CSS Modules
- **Deployment:** Vercel

## 📂 Project Structure

- `/app` — Routing logic (pages and layouts).
- `/components` — Reusable UI components.
- `/store` — Zustand store configuration (auth, notes).
- `/api` — Backend interaction logic (Axios instances).

---

## ⚙️ Local Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure environment variables:**
    Create a `.env.local` file and add your API backend URL:

    ```env
    NEXT_PUBLIC_API_URL=[https://your-api-address.com](https://your-api-address.com)
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👨‍💻 Project by

**Oleksandra Starovatova** — Junior Frontend Developer.
