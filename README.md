# React Forms Assignment

This repository contains a small React app demonstrating Signup and Login forms with validation, localStorage usage, client-side password hashing (SHA-256), and a simple dashboard.

Features
- Signup and Login components rendered on the same page with tab UI
- Validations: required fields, email format, strong password, confirm match
- Stores users in `localStorage` under the `users` array
- Client-side password hashing via SubtleCrypto (SHA-256)
- Duplicate-email prevention (case-insensitive)
- Soft toasts for success/error messages
- Password show/hide toggles (Font Awesome used via CDN)

Run locally

1. Install dependencies:
```
npm install
```

2. Run dev server:
```
npm run dev
```

Open the URL printed by Vite (e.g., `http://localhost:5173`).

Prepare for submission
- Add this project to a GitHub repository and provide the GitHub URL.
- Deploy to a host (Vercel/Netlify) and provide the hosted URL.

Notes
- This project uses client-side hashing for demo only — not a replacement for proper server-side auth.
- If Font Awesome icons do not load, ensure internet access or switch to inline SVGs.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
