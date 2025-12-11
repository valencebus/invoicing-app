# Deploy Guide — Option 1 (GitHub + Render + Vercel)

Follow these steps to upload the scaffold to GitHub and deploy backend to Render and frontend to Vercel.

## 1. Create a GitHub repository
1. Go to https://github.com and sign in.
2. Click **New repository**.
3. Name it `invoicing-job-system` (or any name you like).
4. Choose Public or Private.
5. Create repository.

## 2. Push the project to GitHub
On your local machine:
```bash
git init
git add .
git commit -m "Initial scaffold"
git branch -M main
git remote add origin https://github.com/<your-username>/invoicing-job-system.git
git push -u origin main
```

## 3. Deploy Backend to Render
1. Create a Render account (https://render.com) and connect your GitHub.
2. Click **New → Web Service**.
3. Select your repository and choose the `backend` folder as the root (or root if monorepo).
4. Set environment variables on Render (DATABASE_URL, REDIS_URL, SENDGRID_API_KEY, EMAIL_FROM, etc).
5. Build command:
   ```
   npm install --prefix backend && npm run build --prefix backend || true
   ```
   (the scaffold uses `npm start`, so a build step is optional)
6. Start command:
   ```
   npm start --prefix backend
   ```
7. Render will build and provide a public URL for your backend.

## 4. Deploy Frontend to Vercel
1. Create a Vercel account (https://vercel.com) and connect your GitHub.
2. Click **New Project** and import your repository.
3. Configure the project to use the `frontend` folder.
4. Set build command:
   ```
   npm install --prefix frontend && npm run build --prefix frontend
   ```
   Output Directory:
   ```
   frontend/dist
   ```
5. Add environment variable for API URL if needed (e.g., REACT_APP_API_URL or similar).
6. Deploy. Vercel will provide a public URL.

## 5. Connect Frontend → Backend
- In your frontend configuration (e.g., src/config.js), set the backend API base URL to the Render URL.
- Redeploy frontend if you changed env vars.

## 6. Other setup
- On Render, you may need a managed Postgres DB and Redis. Render can provision managed databases or you can use external providers (Supabase, ElephantSQL, Redis Cloud).
- Add required environment variables on both platforms.

## 7. Test
- Open your frontend URL and verify API calls to the backend Render URL.
- Check logs in Render and Vercel for errors.

---
If you want, I can produce a one-click deploy button setup for Render and Vercel (requires additional config).