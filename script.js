// ===== API Configuration =====
const API_BASE = "https://todo-backend-396u.onrender.com/api";
const TASKS_API = `${API_BASE}/tasks`;
const AUTH_API = `${API_BASE}/auth`;

// Store JWT token in localStorage
let authToken = localStorage.getItem("authToken") || null;
let currentUser = localStorage.getItem("currentUser") || null;

// ===== Initialize App =====
document.addEventListener("DOMContentLoaded", () => {
    // Setup event listeners
    document.getElementById("registerFormElement").addEventListener("submit", handleRegister);
    document.getElementById("loginFormElement").addEventListener("submit", handleLogin);
    document.getElementById("addTaskForm").addEventListener("submit", handleAddTask);
    document.getElementById("loginBtn").addEventListener("click", showLoginForm);
    document.getElementById("registerBtn").addEventListener("click", showRegisterForm);
    document.getElementById("logoutBtn").addEventListener("click", handleLogout);

    // Check if user is already logged in
    if (authToken) {
        showTaskSection();
        fetchTasks();
    } else {
        showAuthSection();
        showRegisterForm();
    }
});

// ===== Authentication Functions =====

/**
 * Handle user registration
 * @param {Event} e - Form submit event
 */
async function handleRegister(e) {
    e.preventDefault();

    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
        // Validate inputs
        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        const response = await fetch(`${AUTH_API}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please login.");
            document.getElementById("registerFormElement").reset();
            toggleForms();
        } else {
            alert("Registration failed: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Registration Error:", error);
        alert("Registration failed: Connection error");
    }
}

/**
 * Handle user login
 * @param {Event} e - Form submit event
 */
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(`${AUTH_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store token and user info
            authToken = data.token;
            currentUser = email;
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("currentUser", currentUser);

            alert("Login successful!");
            document.getElementById("loginFormElement").reset();
            showTaskSection();
            fetchTasks();
        } else {
            alert("Login failed: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed: Connection error");
    }
}

/**
 * Handle user logout
 */
function handleLogout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    alert("Logged out successfully!");
    showAuthSection();
    showRegisterForm();
}

/**
 * Toggle between login and register forms
 */
function toggleForms() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}

/**
 * Show login form
 */
function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

/**
 * Show register form
 */
function showRegisterForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

// ===== UI Toggle Functions =====

/**
 * Show authentication section and hide task section
 */
function showAuthSection() {
    document.getElementById("authSection").style.display = "block";
    document.getElementById("taskSection").style.display = "none";
    document.getElementById("loginBtn").style.display = "inline-block";
    document.getElementById("registerBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("userDisplay").style.display = "none";
}

/**
 * Show task section and hide authentication section
 */
function showTaskSection() {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("taskSection").style.display = "block";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("registerBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";
    document.getElementById("userDisplay").style.display = "inline-block";
    document.getElementById("userDisplay").textContent = `👤 ${currentUser}`;
}

// ===== Task Management Functions =====

/**
 * Fetch all tasks from the backend
 */
async function fetchTasks() {
    try {
        const response = await fetch(TASKS_API, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error("Fetch Tasks Error:", error);
        alert("Failed to load tasks: " + error.message);
    }
}

/**
 * Display tasks in the UI
 * @param {Array} tasks - Array of task objects
 */
function displayTasks(tasks) {
    const tasksList = document.getElementById("tasksList");
    const emptyState = document.getElementById("emptyState");

    tasksList.innerHTML = "";

    if (tasks.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        tasksList.appendChild(taskCard);
    });
}

/**
 * Create a task card element
 * @param {Object} task - Task object from database
 * @returns {HTMLElement} Task card element
 */
function createTaskCard(task) {
    const card = document.createElement("div");
    card.className = `task-card ${task.completed ? "completed" : ""} ${task.priority}-priority`;
    card.id = `task-${task._id}`;

    const priorityClass = `priority-${task.priority}`;

    card.innerHTML = `
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ""}
        <span class="task-priority ${priorityClass}">${task.priority.toUpperCase()}</span>
        <div class="task-actions">
            <button class="btn btn-success btn-small" onclick="toggleTaskComplete('${task._id}', ${task.completed})">
                ${task.completed ? "↩️ Undo" : "✓ Complete"}
            </button>
            <button class="btn btn-primary btn-small" onclick="editTask('${task._id}')">✏️ Edit</button>
            <button class="btn btn-danger btn-small" onclick="deleteTask('${task._id}')">🗑️ Delete</button>
        </div>
    `;

    return card;
}

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Handle adding a new task
 * @param {Event} e - Form submit event
 */
async function handleAddTask(e) {
    e.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const priority = document.getElementById("taskPriority").value;

    if (!title) {
        alert("Please enter a task title");
        return;
    }

    try {
        const response = await fetch(TASKS_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ title, description, priority })
        });

        if (response.ok) {
            document.getElementById("addTaskForm").reset();
            fetchTasks();
        } else {
            const data = await response.json();
            alert("Failed to add task: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Add Task Error:", error);
        alert("Failed to add task: Connection error");
    }
}

/**
 * Toggle task completion status
 * @param {string} taskId - Task ID
 * @param {boolean} currentStatus - Current completion status
 */
async function toggleTaskComplete(taskId, currentStatus) {
    try {
        const response = await fetch(`${TASKS_API}/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ completed: !currentStatus })
        });

        if (response.ok) {
            fetchTasks();
        } else {
            alert("Failed to update task");
        }
    } catch (error) {
        console.error("Toggle Task Error:", error);
        alert("Failed to update task: Connection error");
    }
}

/**
 * Edit a task (placeholder for future enhancement)
 * @param {string} taskId - Task ID
 */
function editTask(taskId) {
    const newTitle = prompt("Enter new task title:");
    if (newTitle) {
        updateTask(taskId, { title: newTitle });
    }
}

/**
 * Update task in the backend
 * @param {string} taskId - Task ID
 * @param {Object} updates - Fields to update
 */
async function updateTask(taskId, updates) {
    try {
        const response = await fetch(`${TASKS_API}/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(updates)
        });

        if (response.ok) {
            fetchTasks();
        } else {
            alert("Failed to update task");
        }
    } catch (error) {
        console.error("Update Task Error:", error);
        alert("Failed to update task: Connection error");
    }
}

/**
 * Delete a task
 * @param {string} taskId - Task ID
 */
async function deleteTask(taskId) {
    if (!confirm("Are you sure you want to delete this task?")) {
        return;
    }

    try {
        const response = await fetch(`${TASKS_API}/${taskId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            fetchTasks();
        } else {
            alert("Failed to delete task");
        }
    } catch (error) {
        console.error("Delete Task Error:", error);
        alert("Failed to delete task: Connection error");
    }
}

fetchTasks();