# 🚀 MERN Stack Deployment Guide: Netlify & Render

This guide outlines how to launch the **பொம்மைக் கடை** frontend on **Netlify** and the backend on **Render.com**.

---

## 💻 Part 1: Deploy Frontend to Netlify

Vite compiles all static assets into the `/dist` directory. We have already generated the `_redirects` file to handle single-page application routing correctly.

### Option A: Drag-and-Drop (Instant deployment)
1. Go to the [Netlify Drop](https://app.netlify.com/drop) page.
2. Drag the `dist` folder located in `c:\guvi\ecommerce web\dist` and drop it into the box.
3. Your site is live instantly!

### Option B: Connect to GitHub (Continuous Deployment)
1. Push your frontend code to a GitHub repository.
2. Log in to [Netlify Console](https://app.netlify.com/).
3. Click **Add new site** → **Import an existing project**.
4. Select your GitHub repository.
5. Configure Build Settings:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy site**.

---

## 🗄️ Part 2: Deploy Backend to Render.com

Render is the standard cloud platform to host Express.js servers.

### 1. Push backend code to GitHub
Make sure your Express server files (the `/server` directory) are pushed to GitHub.

### 2. Create Web Service on Render
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Configure Web Service settings:
   - **Name:** `bommai-kadai-api`
   - **Environment:** `Node`
   - **Region:** Select the closest region (e.g., Singapore).
   - **Branch:** `main` (or your active branch).
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free` (perfect for testing).

### 3. Add Environment Variables
In the **Environment** tab on Render, add:
*   `PORT` = `5000`
*   `MONGO_URI` = *(Your MongoDB Atlas connection string)*
*   `JWT_SECRET` = *(Any secure secret string)*

---

## 🔗 Part 3: Connect Frontend & Backend

Once your backend is running on Render (e.g. `https://bommai-kadai-api.onrender.com`), update your frontend code to make requests to the Render URL:

1. Update `/src/context/ShopContext.jsx` or your request proxy to point directly to your backend Render URL.
2. Add the Netlify URL to CORS configurations on Render if needed.
