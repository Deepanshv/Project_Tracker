````markdown
# 🚀 Project Tracker

A React + Firebase app to manage users and tasks with secure authentication and a clean dashboard.

---

## Features

- 🔐 Firebase Authentication (Login & Signup)  
- 📋 User & Task Management (Add, Edit, Delete)  
- 🛡️ Protected Routes with React Router  

---

## Tech Stack

- React  
- Firebase (Auth & Firestore)  
- React Router  

---

## Getting Started

1. Clone and install dependencies:
   ```bash
   git clone https://github.com/yourusername/project-tracker.git
   cd project-tracker
   npm install
````

2. Setup Firebase:

   * Create a Firebase project with Auth & Firestore enabled.
   * Add your Firebase config in a `.env` file.

3. Run the app:

   ```bash
   npm start
   ```

---

## Firebase Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

Made by **Deepansh Vishwakarma**


