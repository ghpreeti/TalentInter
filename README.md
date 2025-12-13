<h1 align="center">✨ TalentInter — Full-Stack Interview Platform ✨</h1>

<p align="center">
A modern, real-time interview preparation platform built to simulate real technical interviews with collaborative coding, video calls, and automated evaluation.
</p>

<p align="center">
  <img src="/frontend/public/screenshot-for-readme.png" alt="TalentInter Demo" />
</p>

---

## 🚀 Key Features

### 👩‍💻 Interview Experience
- **VS Code–like collaborative code editor** with multi-language support  
- **1-on-1 interview rooms** with video, audio, and screen sharing  
- **Room locking** to ensure only two participants per interview  
- **Real-time chat messaging** for interviewer–candidate interaction  

### 🧠 Coding & Evaluation
- **Secure code execution** in an isolated environment  
- **Automated test-case based evaluation** (pass/fail feedback)  
- **Instant visual feedback**  
  - 🎉 Confetti on success  
  - 🔔 Notifications on failure  
- **Practice problems mode** for solo preparation  

### 📊 Platform Capabilities
- **Personalized dashboard** with live session statistics  
- **Authentication & session management** via Clerk  
- **Background jobs & async workflows** powered by Inngest  
- **RESTful APIs** built with Node.js & Express  
- **Optimized data fetching & caching** using TanStack Query  

### 🧩 Developer Experience
- **Git & GitHub workflow** (feature branches, PR reviews, merges)  
- **Automated code review & optimization** using CodeRabbit AI  
- **Production-ready deployment** on Sevalla (free-tier friendly)

---

## 🧪 .env Setup

### Backend (`/backend`)

```bash
PORT=3000
NODE_ENV=development

DB_URL=your_mongodb_connection_url

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

CLIENT_URL=http://localhost:5173
```

### Frontend (`/frontend`)

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

VITE_API_URL=http://localhost:3000/api

VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🔧 Run the Backend

```bash

cd backend
npm install
npm run dev
```

---

## 🔧 Run the Frontend

```
bash
cd frontend
npm install
npm run dev
```
