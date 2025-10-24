# Real Time Chat — Backend

Express + Socket.IO backend for the Real Time Chat app. Provides auth, message REST API, Cloudinary image upload, and realtime events via Socket.IO.

## Features
- Email/password signup & login (JWT via HTTP-only cookie)
- Update user profile (name, avatar)
- Send and fetch messages (persisted in MongoDB)
- Image upload proxied to Cloudinary (server-side)
- Realtime presence and messaging via Socket.IO (initSocket, getIO, getSocketId)
- CORS + cookie support for frontend integration

## Packages (key)
- express — web server and routing
- mongoose — MongoDB ODM
- dotenv — env vars
- cookie-parser — parsing cookies (auth cookie)
- cors — cross-origin requests handling
- socket.io — realtime websocket server
- bcryptjs / bcrypt — password hashing (if used)
- jsonwebtoken — JWT creation & verification
- multer (or similar) — multipart handling (if used for uploads)
- cloudinary — Cloudinary API client
- axios (optional) — HTTP client (if backend calls external services)

## Environment variables
See backend/.env.example. Typical keys:
- PORT (e.g., 5001)
- MONGODB_URI
- JWT_SECRET
- CORS_ORIGIN (frontend origin, e.g., http://localhost:5173)
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

## API (overview)
Check `backend/src/routes/*.js` for exact paths and request/response shapes. Common endpoints:

Auth
- POST /api/auth/signup
  - Body: { name, email, password, [avatar] }
  - Returns: user data; sets auth cookie (JWT)
- POST /api/auth/login
  - Body: { email, password }
  - Returns: user data; sets auth cookie
- POST /api/auth/logout (if implemented)
  - Clears auth cookie
- PUT /api/auth/update
  - Auth required (cookie). Body: fields to update (name, avatar, etc.)

Messages
- GET /api/message
  - Query or params to fetch conversation/messages (see route implementation)
  - Returns: list of messages
- POST /api/message
  - Body: { to, text, image? } or sendMessage payload
  - Persists message, emits realtime event via Socket.IO

Notes:
- All endpoints that require authentication expect the JWT cookie sent with requests (axiosInstance sets withCredentials: true).
- Exact request shapes and URLs are defined in `backend/src/routes` and controllers in `backend/src/controller`.

## Socket.IO — events & usage
Server provides realtime events for presence and messaging. Typical pattern:
- Client connects using socket.io-client and identifies (token or user id)
- Server emits events like:
  - "user-online" / "user-offline" (presence)
  - "new-message" (when a message is sent)
- Client emits events like:
  - "send-message" (or uses REST POST then server emits)
Refer to `backend/src/lib/socket.js` for the concrete event names and flow.

## Running locally
1. Install
```bash
cd backend
npm install
```
2. Configure .env (copy .env.example -> .env)
3. Start dev server
```bash
npm run dev
```
Server entry: `backend/src/index.js` — initializes middleware, routes, DB and Socket.IO.

## Troubleshooting
- Auth cookie not sent: ensure frontend axios uses withCredentials and backend CORS_ORIGIN includes frontend origin.
- Socket connection refused: confirm socket server origin and CORS_ORIGIN for socket config.
- Image upload errors: verify Cloudinary credentials and upload code in `backend/src/lib/cloudinary.js`.

## Useful files
- src/index.js — app entry, middleware, HTTP server + Socket.IO init
- src/lib/db.js — connectDB (MongoDB)
- src/lib/socket.js — initSocket, getIO, getSocketId
- src/lib/cloudinary.js — Cloudinary upload helper
- src/controller/auth.controller.js — signup, login, update
- src/controller/message.controller.js — sendMessage, getMessages
- src/routes/auth.route.js, src/routes/message.route.js — route declarations
- src/models — Mongoose models (User, Message)

For exact API signatures, open the route and controller files listed above.