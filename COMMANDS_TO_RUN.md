# 🎮 FINAL COMMANDS TO RUN YOUR PROJECT

## 📌 IMPORTANT: MongoDB Must Be Running!

**Terminal 1 - Start MongoDB**
```powershell
mongod
```
Expected output:
```
[initandlisten] Waiting for connections on port 27017
```

---

## 🚀 TERMINAL 2 - START BACKEND SERVER

```powershell
cd c:\Users\Project\Task
node Backend/server.js
```

**Expected Output:**
```
✓ Server started on http://localhost:5000
✓ MongoDB Connected Successfully
```

---

## 🌐 TERMINAL 3 (Or Browser) - OPEN FRONTEND

### Option A: Open in Browser
```
http://localhost:5000
```

### Option B: Open Frontend File Directly
```powershell
start c:\Users\Project\Task\Frontend\index.html
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] MongoDB running (see "Waiting for connections")
- [ ] Backend server running (see "Server started on port 5000")
- [ ] Browser shows colorful Task Manager interface
- [ ] Can register a new user
- [ ] Can login
- [ ] Can create tasks
- [ ] Can complete/delete tasks

---

## 🔧 TROUBLESHOOTING COMMANDS

### Check if Node.js is installed
```powershell
node --version
```

### Check if npm is installed
```powershell
npm --version
```

### Verify MongoDB is running
```powershell
Get-Process mongod -ErrorAction SilentlyContinue
```

### Check if port 5000 is in use
```powershell
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
```

### Kill process using port 5000
```powershell
Get-Process | Where-Object {$_.Handles -gt 1} | Where-Object {$_.Name -eq "node"} | Stop-Process -Force
```

### Reinstall npm packages (if needed)
```powershell
cd c:\Users\Project
npm install
```

---

## 📂 PROJECT DIRECTORY STRUCTURE

```
c:\Users\Project\
├── Task/
│   ├── Backend/
│   │   ├── server.js                 ✅ Main server
│   │   ├── models/
│   │   │   ├── User.js              ✅ User schema
│   │   │   └── Task.js              ✅ Task schema
│   │   └── routes/
│   │       ├── auth.js              ✅ Login/Register
│   │       └── tasks.js             ✅ Task CRUD
│   │
│   ├── Frontend/
│   │   ├── index.html               ✅ Main page
│   │   ├── style.css                ✅ Styling
│   │   └── script.js                ✅ JavaScript logic
│   │
│   ├── QUICK_START.md               ℹ️ Quick guide
│   ├── PROJECT_SETUP_GUIDE.md       ℹ️ Detailed guide
│   └── COMMANDS_TO_RUN.md           ℹ️ This file
│
└── package.json                      ✅ Dependencies

```

---

## 🎯 STEP-BY-STEP EXECUTION

### STEP 1️⃣: Prepare MongoDB
```powershell
# Terminal 1
mongod
```
⏳ Wait 2-3 seconds for MongoDB to start

---

### STEP 2️⃣: Start Backend
```powershell
# Terminal 2
cd c:\Users\Project\Task
node Backend/server.js
```
⏳ Wait for confirmation messages

---

### STEP 3️⃣: Open Frontend
```powershell
# Terminal 3 or Browser
http://localhost:5000
```

---

### STEP 4️⃣: Test the Application

**Register:**
- Username: `testuser`
- Email: `test@example.com`
- Password: `password123`

**Login:**
- Email: `test@example.com`
- Password: `password123`

**Create Task:**
- Title: `Learn Full-Stack Development`
- Description: `Master Node.js, MongoDB, and React`
- Priority: `High`

---

## 📊 API TEST COMMANDS

### Test Register (using PowerShell)
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

### Test Login
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

---

## 💾 SAVE THIS COMMAND FOR QUICK START

Create a batch file `start_project.bat`:
```batch
@echo off
echo Starting Task Manager...
echo.
echo Terminal 1: Starting MongoDB...
start cmd /k mongod
echo.
echo Wait 3 seconds for MongoDB to start...
timeout /t 3
echo.
echo Terminal 2: Starting Backend Server...
start cmd /k "cd c:\Users\Project\Task && node Backend/server.js"
echo.
echo Wait 2 seconds for server to start...
timeout /t 2
echo.
echo Terminal 3: Opening Frontend...
start http://localhost:5000
echo.
echo All systems started! Check all three terminals.
pause
```

Run it with:
```powershell
& 'c:\Users\Project\Task\start_project.bat'
```

---

## 🆘 HELP & SUPPORT

### Problem: Server won't start
**Check:** Is MongoDB running?
**Fix:** Start MongoDB first with `mongod`

### Problem: Can't login
**Check:** Is backend running? Check terminal output.
**Fix:** Verify MongoDB is connected

### Problem: Port 5000 already in use
**Check:** Kill other Node processes
**Fix:** `Get-Process node | Stop-Process -Force`

### Problem: Module not found error
**Check:** Are you in the correct directory?
**Fix:** Run from `c:\Users\Project`

### Problem: Browser shows blank page
**Check:** Developer console (F12)
**Fix:** Ensure server is running on port 5000

---

## 📝 LOG FILES TO CHECK

### Backend Server Logs
Look in the terminal where you ran `node Backend/server.js`

### Browser Console Logs
Press `F12` → Click "Console" tab

### MongoDB Logs
Look in the terminal where you ran `mongod`

---

## 🎓 LEARNING RESOURCES

- **Express.js Docs**: https://expressjs.com
- **MongoDB Docs**: https://docs.mongodb.com
- **JWT Tokens**: https://jwt.io
- **REST API**: https://restfulapi.net

---

## ✨ ALL FIXES APPLIED

✅ Renamed `model` folder to `models`
✅ Renamed `routes/task.js` to `routes/tasks.js`
✅ Fixed all require() paths
✅ Added error handling everywhere
✅ Created responsive frontend
✅ Integrated JWT authentication
✅ Built complete CRUD API
✅ Added input validation
✅ Implemented password hashing
✅ Added database schemas
✅ Connected to MongoDB
✅ Tested and verified working

---

## 🏁 YOU'RE ALL SET!

Your full-stack Task Manager is ready to run!
Follow the steps above and enjoy building! 🚀

```
Have questions? Check the comments in the code!
```
