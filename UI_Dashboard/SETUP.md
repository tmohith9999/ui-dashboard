UI-Dashboards – Setup

Prerequisites
- Node.js 18+ (recommend LTS)
- npm 9+ or yarn 1.22+

Install

Frontend
```
cd frontend
npm install
```

Backend
```
cd ../backend
npm install
```

Run (Dev)

Backend API (Terminal 1)
```
cd backend
npm run dev
```
API runs on `http://localhost:4000`.

Frontend Web (Terminal 2)
```
cd frontend
npm run dev
```
App opens on `http://localhost:5173`.

Build (Frontend)
```
cd frontend
npm run build
```

Notes
- React + Vite + TailwindCSS; React Router for routing.
- Charts: Recharts. HTTP: Axios. Backend: Express (Step 7).
- Create stepwise git commits per feature as described in the prompt.

