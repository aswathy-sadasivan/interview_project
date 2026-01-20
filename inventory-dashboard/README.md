# Inventory Dashboard

A full-stack inventory management dashboard built with Node.js, Express, React, and Vite.

## Features
- **Product Grid**: View products with real-time stock levels.
- **Stock Management**: Increase or decrease stock with instant updates.
- **Visual Alerts**: Low stock items (< 5 units) are highlighted with a red border and warning badge.
- **Responsive Design**: Works on mobile, tablet, and desktop.

## Prerequisites
- Node.js installed

## Setup & Run

### 1. Clone the repository
(If you downloaded this code, skip this step)

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The app will open at `http://localhost:5173`.

## Tech Stack
- **Backend**: Express.js, CORS (In-memory storage)
- **Frontend**: React, Vite, Axios
- **CSS**: Custom responsive CSS
