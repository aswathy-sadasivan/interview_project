# Vercel Deployment Instructions

Follow these steps to deploy your full-stack Inventory Dashboard to Vercel.

## 1. Prerequisites
- A [Vercel Account](https://vercel.com).
- GitHub Repository with this code pushed.

## 2. Project Configuration (Already Done)
I have already configured the project for Vercel:
- **`vercel.json`**: Configures routing so `/api/*` goes to the backend and everything else goes to the frontend.
- **Backend**: Updated to export the app as a serverless function.
- **Frontend**: Updated to use relative API paths.

## 3. Deploy Steps
1.  **Push to GitHub**: Ensure your latest code is on GitHub.
2.  **Import to Vercel**:
    -   Go to Vercel Dashboard -> "Add New..." -> "Project".
    -   Select your repository `inventory-dashboard`.
3.  **Configure Project**:
    -   **Framework Preset**: Select **Vite**.
    -   **Root Directory**: Click "Edit" and select `inventory-dashboard` (if your repo has the project in a subdirectory). If the files are at the root of the repo, leave as `./`.
    -   **Build Command**: `cd frontend && npm install && npm run build` (Override if needed, but Vercel might auto-detect `frontend` if you set Root Directory to `frontend`. **However, for Monorepos**, keep Root Directory as `./` and use the default settings or specified below).

    **Recommended Settings for this Monorepo Structure:**
    -   **Root Directory**: `.` (The main folder containing `backend`, `frontend`, `vercel.json`).
    -   **Framework Preset**: **Other** (Override Vite if it auto-selects, because we are deploying a custom monorepo).
    -   **Build Command**: `cd frontend && npm install && npm run build`
    -   **Output Directory**: `frontend/dist`
    -   **Install Command**: `cd frontend && npm install && cd ../backend && npm install`

4.  **Deploy**: Click "Deploy".

## 4. Important Note on Data
⚠ **Warning**: Your backend uses an **in-memory database**. 
- On Vercel (Serverless), the server "freezes" or restarts frequently.
- **Result**: Your stock changes will **reset to default** after a few minutes of inactivity or on new deployments.
- **Fix**: For a real app, you must connect to a database like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres).
