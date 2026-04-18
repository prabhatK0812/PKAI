<h1 align="center">✨🚀 AI SAAS PLATFORM 🚀✨</h1>

<p align="center">
  A full-stack AI-powered SaaS web app with <b>content generation</b>,
  <b>image editing</b>, and <b>resume analysis</b> tools.  
  Built using <b>MERN Stack + Clerk + Gemini AI + Clipdrop + Cloudinary + Neon PostgreSQL</b>.
</p>

🚀 PK.ai – AI SaaS Platform :
PK.ai is a full-stack AI SaaS application built using the MERN stack + AI APIs.
It offers multiple powerful AI-driven tools for productivity, content creation, and media editing — all in one platform.

✨ Features :
🔹 Authentication & Authorization – Secure login/signup using Clerk
🔹 Content Tools – Generate Articles, Blog Titles, and Resume Analysis using Gemini AI
🔹 Image Tools – Text to Image (Clipdrop + Cloudinary),Background Remover,Object Remover
🔹 Community – Browse, like, and share AI-generated creations
🔹 Database – Store prompts, creations, and user data with PostgreSQL (Neon DB)
🔹 Responsive UI – Modern, mobile-friendly UI built with React + Tailwind CSS
🔹 Real-Time Actions – Secure API handling with Express + Clerk Middleware

🛠️ Tech Stack
Frontend: React (Vite), Tailwind CSS, Clerk Auth, Axios
Backend: Node.js, Express.js, REST APIs, Clerk Middleware
Database: Neon PostgreSQL (serverless)
AI & Cloud APIs: Gemini AI, Clipdrop API, Cloudinary
Other Tools: JWT, CORS, Multer, dotenv

📂 Project Structure :
PK.ai/
│── client/         # Frontend (React + Vite + Tailwind + Clerk)
│── server/         # Backend (Express + PostgreSQL + APIs)
│── assets/         # Images, icons, and dummy data
│── README.md       # Documentation

⚡ Installation & Setup 
1️⃣ Clone the Repository
git clone https://github.com/username/pk-ai.git
cd pk-ai

2️⃣ Setup Backend :
cd server
npm install

Create .env file in server/ and add:
PORT=3000
DATABASE_URL=your_neon_postgres_url
CLERK_SECRET_KEY=your_clerk_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Start server:
npm run server


Server will run on 👉 //localhost:3000

3️⃣ Setup Frontend
cd client
npm install

Create .env file in client/ and add:
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

Start frontend:
npm run dev
Frontend will run on 👉 http://localhost:5173

🎯 Usage :
Signup/Login using Clerk Auth.

Explore tools:
✍️ Generate Articles & Blog Titles
🖼️ Generate AI Images, Remove Background/Object
📄 Analyze Resume with Gemini AI
Save creations, like others’ work in Community Section.



🚀 Future Enhancements :
Add Payment Gateway for premium tools
Advanced Resume Scoring
AI-powered Job Recommendations

🤝 Contributing
Contributions are welcome!
Feel free to fork this repo and submit a pull request.



