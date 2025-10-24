# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

...existing code...

## Project packages (not exhaustive)
- react, react-dom — UI library
- vite — dev server / build tool (fast HMR)
- @vitejs/plugin-react — JSX/fast refresh support
- axios — HTTP client; frontend uses an axios instance configured with withCredentials to send auth cookies
- zustand — lightweight state management (used for auth and chat stores)
- socket.io-client — realtime client for Socket.IO (connects to backend socket server)
- react-router-dom — routing (if used in the app)
- any CSS tooling used in the project (e.g., Tailwind, plain CSS, CSS modules) — check package.json

## Frontend features
- Fast development with Vite + HMR
- React functional components and hooks
- Centralized API client (axios instance) configured for backend baseURL and credentials
- Zustand stores:
  - useAuthStore — auth state, checkAuth, connectSocket
  - useChatStore — chat state, messages, users
- Realtime messaging with Socket.IO client; socket connection uses BASE_URL configured in the store
- Image uploads handled via the backend API (Cloudinary configured server-side)
- Minimal ESLint setup and recommended TypeScript migration notes (see repo root)

## Running locally
1. Install
```bash
cd frontend
npm install
```
2. Start dev server
```bash
npm run dev
```
3. Open the URL shown by Vite (usually http://localhost:5173). Ensure backend is running and CORS_ORIGIN matches.

## Notes
- The frontend expects the backend API at the URL configured in frontend/src/lib/axios.js (default used in this repo: http://localhost:5001/api). If the backend runs on another host/port, update the axios baseURL and the socket BASE_URL in the auth store.
- Check frontend/src/lib/axios.js and frontend/src/store/useAuthStore.js for the exact runtime configuration.
- For production builds, run npm run build and serve the built assets or deploy the build output behind a static server or CDN.