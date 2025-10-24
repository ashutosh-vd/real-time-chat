# Real Time Chat

A minimal real-time chat application (React + Vite frontend, Express + Socket.IO backend) with user auth, image upload (Cloudinary), and realtime messaging.

## Features
- Email/password signup & login (JWT cookie-based) — see [`signup`](backend/src/controller/auth.controller.js) and [`login`](backend/src/controller/auth.controller.js).
- Realtime online presence and messaging via Socket.IO — see [`initSocket`](backend/src/lib/socket.js) and [`getIO`](backend/src/lib/socket.js).
- Image uploads to Cloudinary — see [`uploadCloud`](backend/src/lib/cloudinary.js).
- Simple REST API for messages and sidebar users — see [backend/src/routes/message.route.js](backend/src/routes/message.route.js) and [backend/src/routes/auth.route.js](backend/src/routes/auth.route.js).
- React UI with Zustand stores and Axios client — see [`useAuthStore`](frontend/src/store/useAuthStore.js), [`useChatStore`](frontend/src/store/useChatStore.js) and [`axiosInstance`](frontend/src/lib/axios.js).

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- A MongoDB instance (connection string in backend `.env`)
- Cloudinary account (API keys in backend `.env`)

See example env keys in [backend/.env.example](backend/.env.example).

## Setup

1. Backend
```bash
# from repo root
cd backend
npm install

# copy .env.example -> .env and fill values:
# PORT, MONGODB_URI, JWT_SECRET, CLOUDINARY_*, CORS_ORIGIN
```

2. Frontend
```bash
cd frontend
npm install
```

Important: Frontend Axios and socket client expect the backend API at `http://localhost:5001` by default:
- See [`axiosInstance`](frontend/src/lib/axios.js) (baseURL `http://localhost:5001/api`) and [`BASE_URL`](frontend/src/store/useAuthStore.js) used by the socket client.

## Running (development)
Open two terminals.

Terminal A — backend:
```bash
cd backend
npm run dev
```
This runs the Express server (entry: [backend/src/index.js](backend/src/index.js)) and initializes DB via [`connectDB`](backend/src/lib/db.js) and Socket.IO via [`initSocket`](backend/src/lib/socket.js).

Terminal B — frontend:
```bash
cd frontend
npm run dev
```
Open the app at the URL shown by Vite (usually `http://localhost:5173`).

## Build / Production
- Build frontend: `cd frontend && npm run build`
- Serve backend in production: set `NODE_ENV=production`, set proper env vars and run node on `backend/src/index.js` (or use a process manager).

## Data model & key files
- User model: [backend/src/models/user.model.js](backend/src/models/user.model.js)  
- Message model: [backend/src/models/message.model.js](backend/src/models/message.model.js)  
- Auth controller: [backend/src/controller/auth.controller.js](backend/src/controller/auth.controller.js) — uses [`generateToken`](backend/src/lib/utils.js)  
- Message controller: [backend/src/controller/message.controller.js](backend/src/controller/message.controller.js) — emits realtime events via [`getIO`](backend/src/lib/socket.js) and [`getSocketId`](backend/src/lib/socket.js)  
- Frontend app entry: [frontend/src/main.jsx](frontend/src/main.jsx) and [frontend/src/App.jsx](frontend/src/App.jsx)  
- Frontend stores: [`useAuthStore`](frontend/src/store/useAuthStore.js), [`useChatStore`](frontend/src/store/useChatStore.js)

## Notes & troubleshooting
- Ensure `CORS_ORIGIN` in backend `.env` matches the frontend origin. Socket IO also restricts origins using `process.env.CORS_ORIGIN` (see [`initSocket`](backend/src/lib/socket.js)).
- Cookies are used for auth (`token` cookie). Axios is configured with `withCredentials: true` in [`axiosInstance`](frontend/src/lib/axios.js).
- If images fail to upload, confirm Cloudinary keys and that the Cloudinary account allows unsigned uploads or server-side upload via API keys.
- Check backend console for MongoDB and server logs (see [`connectDB`](backend/src/lib/db.js) and server listen in [backend/src/index.js](backend/src/index.js)).

## Useful links (open files)
- [backend/src/index.js](backend/src/index.js)  
- [backend/src/lib/db.js](backend/src/lib/db.js) — [`connectDB`](backend/src/lib/db.js)  
- [backend/src/lib/socket.js](backend/src/lib/socket.js) — [`initSocket`](backend/src/lib/socket.js), [`getIO`](backend/src/lib/socket.js), [`getSocketId`](backend/src/lib/socket.js)  
- [backend/src/lib/cloudinary.js](backend/src/lib/cloudinary.js) — [`uploadCloud`](backend/src/lib/cloudinary.js)  
- [backend/src/lib/utils.js](backend/src/lib/utils.js) — [`generateToken`](backend/src/lib/utils.js)  
- [backend/src/controller/auth.controller.js](backend/src/controller/auth.controller.js) — [`signup`](backend/src/controller/auth.controller.js), [`login`](backend/src/controller/auth.controller.js), [`update`](backend/src/controller/auth.controller.js)  
- [backend/src/controller/message.controller.js](backend/src/controller/message.controller.js) — [`sendMessage`](backend/src/controller/message.controller.js), [`getMessages`](backend/src/controller/message.controller.js)  
- [backend/src/routes/auth.route.js](backend/src/routes/auth.route.js)  
- [backend/src/routes/message.route.js](backend/src/routes/message.route.js)  
- [frontend/src/lib/axios.js](frontend/src/lib/axios.js) — [`axiosInstance`](frontend/src/lib/axios.js)  
- [frontend/src/store/useAuthStore.js](frontend/src/store/useAuthStore.js) — [`checkAuth`](frontend/src/store/useAuthStore.js), [`connectSocket`](frontend/src/store/useAuthStore.js)  
- [frontend/src/store/useChatStore.js](frontend/src/store/useChatStore.js)  
- [frontend/src/App.jsx](frontend/src/App.jsx)  
- [backend/.env.example](backend/.env.example)
