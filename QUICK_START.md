# 🚀 QUICK START GUIDE

## Prerequisites
✅ Node.js installed
✅ MongoDB running on localhost:27017
✅ npm dependencies installed

---

## 🎯 Start the Project (3 Steps)

### 1. Open Terminal 1 - Start MongoDB
```powershell
mongod
```
Wait for: `Waiting for connections on port 27017`

### 2. Open Terminal 2 - Start Backend Server
```powershell
cd c:\Users\Project\Task
node Backend/server.js
```
Wait for:
```
✓ Server started on http://localhost:5000
✓ MongoDB Connected Successfully
```

### 3. Open Frontend in Browser
```
http://localhost:5000
```

---

## 📝 Test the Application

### 1. Register a New User
- Email: `test@example.com`
- Username: `testuser`
- Password: `password123`

### 2. Login
- Email: `test@example.com`
- Password: `password123`

### 3. Create a Task
- Title: "Learn Node.js"
- Description: "Complete the backend tutorial"
- Priority: "high"

### 4. Complete the Task
- Click the "Complete" button
- Task gets strikethrough

### 5. Delete the Task
- Click the "Delete" button
- Confirm deletion

---

## ✅ Verification

### Backend is working if you see:
```
✓ Server started on http://localhost:5000
✓ MongoDB Connected Successfully
```

### Frontend is working if you see:
- Colorful purple gradient header
- Register/Login forms
- After login: Task management interface

---

## 🔑 Key Features

✅ User authentication with JWT
✅ Create, read, update, delete tasks
✅ Task priority (low, medium, high)
✅ Mark tasks as complete
✅ Beautiful responsive design
✅ Works on mobile, tablet, desktop

---

## 📍 Project Structure

```
Task/
├── Backend/
│   ├── server.js          ← Start here
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   └── routes/
│       ├── auth.js        (Login/Register)
│       └── tasks.js       (CRUD operations)
│
└── Frontend/
    ├── index.html         ← Open this in browser
    ├── style.css
    └── script.js
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Start MongoDB: `mongod` |
| Port 5000 already in use | Kill process on port 5000 |
| Cannot find module | Run: `npm install` |
| Login fails | Check MongoDB is running |
| Tasks don't load | Check browser console (F12) |

---

## 🎓 Learning Path

1. **Understand the structure** → Read PROJECT_SETUP_GUIDE.md
2. **Explore the code** → Check models/ and routes/
3. **Run the application** → Follow Quick Start steps
4. **Test each feature** → Register, login, add tasks
5. **Modify and experiment** → Change code and refresh

---

## 📚 Files to Review

| File | Purpose |
|------|---------|
| Backend/server.js | Main Express server |
| Backend/models/User.js | User database schema |
| Backend/models/Task.js | Task database schema |
| Backend/routes/auth.js | Login/Register API |
| Backend/routes/tasks.js | Task CRUD API |
| Frontend/index.html | UI structure |
| Frontend/style.css | Styling (responsive) |
| Frontend/script.js | API integration |

---

## 💡 Tips

✅ All code has comments for beginners
✅ Frontend is fully responsive (mobile-friendly)
✅ Passwords are securely hashed
✅ JWT tokens expire after 7 days
✅ All API errors are handled gracefully

---

**Happy coding! 🎉**
