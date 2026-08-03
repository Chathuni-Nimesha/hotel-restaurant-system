# Deployment Guide

Deploy the **Grand Royal Hotel Restaurant Management System** with:

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com)
- **Database** → [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Prerequisites

- GitHub repository pushed to remote
- MongoDB Atlas cluster created
- Vercel account
- Render account

---

## 1. MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user with read/write access.
3. Add your IP (or `0.0.0.0/0` for cloud hosts) under **Network Access**.
4. Copy the connection string:

   ```text
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/grand-royal?retryWrites=true&w=majority
   ```

5. Replace `<username>` and `<password>` with your credentials.

---

## 2. Backend (Render)

### Create Web Service

1. Go to [render.com](https://render.com) → **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure:

   | Setting | Value |
   |---------|-------|
   | **Root Directory** | `backend` |
   | **Runtime** | Node |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm start` |

### Environment Variables (Render)

| Variable | Example | Required |
|----------|---------|----------|
| `PORT` | `5000` | Set automatically by Render |
| `MONGO_URI` | `mongodb+srv://...` | Yes |
| `CLIENT_URL` | `https://your-app.vercel.app` | Yes |
| `NODE_ENV` | `production` | Recommended |

> **CORS:** `CLIENT_URL` accepts comma-separated origins. Include your Vercel URL and custom domain if used:
>
> ```text
> https://your-app.vercel.app,https://www.yourdomain.com
> ```

### Verify

After deploy, open:

```text
https://your-backend.onrender.com/
```

Expected response: `Grand Royal Backend Running`

Test API:

```text
GET https://your-backend.onrender.com/api/menus
```

---

## 3. Frontend (Vercel)

### Import Project

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Import your GitHub repository.
3. Configure:

   | Setting | Value |
   |---------|-------|
   | **Root Directory** | `client` |
   | **Framework Preset** | Next.js |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `.next` (default) |

### Environment Variables (Vercel)

| Variable | Example | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com` | Yes |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` | Yes |

> Do **not** include a trailing slash on URLs.

### Redeploy

After setting env vars, trigger a redeploy so Next.js picks up `NEXT_PUBLIC_*` values at build time.

---

## 4. Local Development

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd client
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 5. Build Commands Reference

| App | Dev | Build | Start |
|-----|-----|-------|-------|
| Client | `npm run dev` | `npm run build` | `npm start` |
| Backend | `npm run dev` | `npm run build` | `npm start` |

---

## 6. Production Checklist

- [ ] MongoDB Atlas cluster running and accessible from Render
- [ ] `MONGO_URI` set on Render
- [ ] `CLIENT_URL` on Render matches Vercel domain(s)
- [ ] `NEXT_PUBLIC_API_URL` on Vercel points to Render backend
- [ ] `NEXT_PUBLIC_SITE_URL` on Vercel matches public frontend URL
- [ ] `npm run build` passes in `client/`
- [ ] `npm run build` passes in `backend/` (TypeScript check)
- [ ] Public menu loads from API
- [ ] Reservation form submits successfully
- [ ] Admin menu CRUD works against production API
- [ ] Admin reservations CRUD works against production API
- [ ] `/robots.txt` and `/sitemap.xml` use correct site URL

---

## 7. Troubleshooting

### CORS errors

Ensure `CLIENT_URL` on Render exactly matches the browser origin (scheme + host, no trailing slash).

### Menu images not loading

Remote menu image URLs must be HTTPS in production. `next.config.ts` allows HTTPS remote images.

### API unreachable from Vercel

Confirm Render service is awake (free tier may spin down). Verify `NEXT_PUBLIC_API_URL` has no trailing slash.

### SEO metadata wrong

Update `NEXT_PUBLIC_SITE_URL` and redeploy the frontend.
