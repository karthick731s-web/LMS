# 📚 Learning Management System (LMS)

A full-stack Learning Management System built using the MERN stack.  
It supports role-based access for **Students, Instructors, and Admins** with secure authentication and dashboards.

---

## 🚀 Live Demo

- 🌐 Frontend: https://lms-eight-lemon.vercel.app/

---

## 📌 Features

### 👨‍🎓 Student
- Register & Login
- Browse courses
- Enroll in courses
- Access learning dashboard

### 👨‍🏫 Instructor
- Create & manage courses
- View enrolled students
- Dashboard analytics
- Profile management

### 🛡️ Admin
- Manage users (students & instructors)
- Manage courses
- System overview dashboard

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- CORS

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 🔐 Authentication System

- JWT-based authentication
- Role-based authorization (Student / Instructor / Admin)
- Protected API routes using middleware

---

## ⚙️ Environment Variables (DUMMY VALUES)

### 🖥️ Backend (.env)

> ⚠️ These are dummy values for reference only. Do NOT use in production.

```env
PORT=5000

MONGO_URI=mongodb+srv://demoUser:demoPassword@cluster0.mongodb.net/lmsDB

JWT_SECRET=demo_super_secret_key_123456

FRONTEND_URL=https://your-frontend-domain.vercel.app

1. AUTH / USER APIs


👤 Student Authentication

POST /api/users/register
POST /api/users/login
👤 Instructor Authentication

POST /api/instructors/register
POST /api/instructors/login
🛡️ Admin Login

POST /api/admin/login

👤 Profile APIs (Protected)

GET /api/users/profile
PUT /api/users/profile

👥 2. USER MANAGEMENT (Admin / System)

GET /api/users/all
POST /api/users/register   (admin create user)

📚 3. COURSE APIs
📖 Public
GET /api/courses
GET /api/courses/:id

🧑‍🎓 Enrollment

POST /api/courses/enroll/:id
GET /api/courses/enrolled

🧑‍🏫 Instructor Course Management

POST /api/courses
PUT /api/courses/:id
DELETE /api/courses/:id

📊 4. INSTRUCTOR APIs

GET /api/instructors/dashboard
GET /api/instructors/stats

🛡️ 5. ADMIN APIs

📊 Dashboard

GET /api/admin/stats

👨‍🎓 Student Management

GET /api/admin/students
DELETE /api/admin/students/:id

👨‍🏫 Instructor Management

GET /api/admin/instructors/pending
GET /api/admin/instructors/approved
POST /api/admin/instructors/approve/:id
POST /api/admin/instructors/reject/:id
POST /api/admin/instructors/revoke/:id
DELETE /api/admin/instructors/:id


Features Implemented

✔ User authentication (JWT)
✔ Role-based access control
✔ Course management system
✔ Instructor dashboard
✔ Student dashboard
✔ Admin panel
✔ Secure API routes
✔ MongoDB integration

Security Notes

.env file is NOT included in repository
Sensitive data is stored in environment variables
JWT tokens are used for secure authentication
CORS enabled for frontend-backend communication
🚧 Future Improvements (As per Internship Task)
Progress tracking system (watch percentage per session)
Notes & bookmarks feature
Advanced search & filtering
Pagination for courses
DB schema visualization (dbdiagram.io)
Postman API documentation



👨‍💻 Author

Name: Karthick
Project: Full Stack LMS (MERN)