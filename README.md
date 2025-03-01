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


<pre>
ruutikangas-userapp/
├── backend/                # Node.js backend with Firebase Admin SDK
│   ├── server.js           # Express server handling authentication and file management
│   ├── service-account-key.json (Ignored in .gitignore)
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, Header)
│   │   ├── pages/          # Main page components (Home, UserData, SignIn, SignUp, etc.)
│   │   ├── context/        # Context API for managing global state
│   │   ├── firebase.js     # Firebase configuration (uses environment variables)
│   │   ├── App.js          # Main application entry point
│   │
│   ├── public/             # Static files
│   ├── .env                # Environment variables (ignored in .gitignore)
│   ├── .gitignore          # Ignore sensitive files
│   ├── package.json        # Dependencies
</pre>



---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/Ruutikangas-Shooting-Project/ruutikangas-userapp.git
cd ruutikangas-userapp
### 2️⃣ Backend Setup
1. Install dependencies:
   
   cd backend
   npm install
2. Create a .env file in the backend directory and configure Firebase:

   FIREBASE_ADMIN_CREDENTIALS=./service-account-key.json
   PORT=3001
3. Run the backend server

   npm run dev
   
###  3️⃣ Frontend Setup
1. Install dependencies:
   
    cd frontend
    npm install
2. Create a .env file in the frontend directory and configure Firebase:
   
    REACT_APP_FIREBASE_API_KEY=your-api-key
   
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain

    REACT_APP_FIREBASE_PROJECT_ID=your-project-id

    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket

    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id

    REACT_APP_FIREBASE_APP_ID=your-app-id

    REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id

4. Run front end
   
   npm start

🔒 Security & Best Practices
Firebase Admin SDK: Ensures only authenticated users can access data.
Environment Variables: Sensitive data is stored in .env files.
Git Ignore: Prevents API keys and credentials from being exposed.

👥 Contributors
Scarlett ShuFen Cheng - https://github.com/ofiscarlett 
Miika  - 
📜 License
This project is licensed under the MIT License.

Give a ⭐ on GitHub if you like this project!




