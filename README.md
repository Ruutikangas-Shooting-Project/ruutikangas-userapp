# Ruutikangas User App

This is a **React and Node.js-based** web application for managing **user data, authentication, and file storage**. The system integrates **Firebase Authentication, Firestore, and Firebase Storage** for seamless user management and media handling.

## 🚀 Features
- **User Authentication** (Sign up, Sign in, Logout)
- **Media File Management** (Upload, View, Download, Delete)
- **Firebase Storage** (Files stored securely per user)
- **User Profile Management**
- **Multilingual Support (FI & EN)**
- **Secure API Authentication** using Firebase Admin SDK
---

## 📂 Project Structure
ruutikangas-userapp/ │── backend/ # Node.js backend with Firebase Admin SDK │ ├── server.js # Express server handling authentication and file management │ ├── service-account-key.json (Ignored in .gitignore) │── frontend/ # React frontend │ ├── src/ │ │ ├── components/ # Reusable UI components (Navbar, Footer, Header) │ │ ├── pages/ # Main page components (Home, UserData, SignIn, SignUp, etc.) │ │ ├── context/ # Context API for managing global state │ │ ├── firebase.js # Firebase configuration (uses environment variables) │ │ ├── App.js # Main application entry point │ ├── public/ # Static files │ ├── .env # Environment variables (ignored in .gitignore) │ ├── .gitignore # Ignore sensitive files │ ├── package.json # Dependencies

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Ruutikangas-Shooting-Project/ruutikangas-userapp.git
cd ruutikangas-userapp



