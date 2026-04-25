# 🏥 VitalSync – Healthcare Patient Dashboard

## 📌 Project Overview

VitalSync is a full-stack healthcare management platform built using the MERN stack. It enables users to securely manage appointments, track medical records, and interact with healthcare services in a seamless and efficient way.

---
# Live link - "https://prodesk-vital-sync.vercel.app/"

## 🚀 Features

### 🔐 Authentication

* User Registration & Login
* Password hashing using bcrypt
* JWT-based authentication
* Protected routes (only logged-in users can access)

### 🏠 Dashboard

* Personalized dashboard after login
* Secure access to healthcare features

### 📅 Appointment System

* Book appointments with doctors
* Easy navigation for scheduling

### 👨‍⚕️ Doctors Module

* View list of doctors
* Specialization-based browsing

### 📊 Healthcare Features

* Medical history tracking (UI ready)
* Prescription viewing (UI ready)
* Real-time doctor availability (UI concept)

### 🎨 UI/UX

* Modern responsive design
* Clean navigation bar
* Premium homepage with:

  * Hero section
  * Features
  * Testimonials
  * Footer

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* CSS (Custom styling)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* bcryptjs
* JSON Web Token (JWT)

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/vitalsync.git
cd vitalsync
```

---

### 2️⃣ Setup Backend

```
cd server
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Run server:

```
npm start
```

---

### 3️⃣ Setup Frontend

```
cd client
npm install
npm start
```

---

## 🔐 Authentication Flow

1. User registers → password hashed using bcrypt
2. User logs in → JWT token generated
3. Token stored in localStorage
4. Protected routes verify token
5. Unauthorized users are redirected to login

---




## 💡 Future Enhancements

* Doctor vs Patient roles
* Real-time appointment booking
* Notifications system
* Payment integration
* Mobile responsiveness
* Deployment (Render + Vercel)

---

## 👩‍💻 Author

**Hemasri Kandula**
Full Stack Developer

---

## 📜 License

This project is for educational purposes and capstone submission.

---

## ⭐ Acknowledgement

This project is developed as part of a full-stack MERN capstone to demonstrate real-world application development skills.
