# Task Manager App - MERN Stack

A full-stack task management application built as part of the Full-Stack Intern Assignment. This project demonstrates proficiency in the MERN stack (MongoDB, Express.js, React.js, Node.js) by implementing a complete CRUD application with modern UI/UX design.

## 🌐 Live Demo

The application is deployed and accessible online:

- **Live Application**: [https://taskmanager-pi-olive.vercel.app](https://taskmanager-pi-olive.vercel.app)
- **Backend API**: [https://taskmanager-pgpe.onrender.com/api/tasks](https://taskmanager-pgpe.onrender.com/api/tasks)

> **Note**: The backend is hosted on Render's free tier, which sleeps after 15 minutes of inactivity. The first request may take 30-50 seconds to wake up the server. The application includes automatic retry logic to handle this gracefully.

## � Prroject Overview

This Task Manager application allows users to efficiently organize and track their daily tasks. Users can create new tasks, view all tasks in an organized list, update task details, and delete completed tasks. The application features a clean, modern interface with advanced filtering and pagination capabilities.

## 🛠️ Tech Stack

### Frontend

- **React.js** (v19.2.0) with Vite - For building the user interface
- **React Router DOM** - For client-side routing
- **Axios** - For making HTTP requests to the backend
- **Tailwind CSS** - For styling and responsive design
- **Lucide React** - For modern icons

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - ODM for MongoDB
- **CORS** - For handling cross-origin requests
- **dotenv** - For environment variable management

### Development Tools

- **Git & GitHub** - Version control
- **Postman** - API testing
- **VS Code** - Code editor

### Deployment

- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database

## ✨ Features Implemented

### Core Features (Required)

#### User Interface (React)

- ✅ Page to list all tasks with organized display
- ✅ Form to add new tasks (Title, Description, Status)
- ✅ Edit functionality for existing tasks
- ✅ Delete functionality with confirmation dialog
- ✅ Form validation (title cannot be empty)
- ✅ User-friendly error messages

#### Backend API (Node + Express)

- ✅ `POST /api/tasks` - Create a new task
- ✅ `GET /api/tasks` - Get all tasks
- ✅ `GET /api/tasks/:id` - Get single task by ID
- ✅ `PUT /api/tasks/:id` - Update a task
- ✅ `DELETE /api/tasks/:id` - Delete a task
- ✅ Proper error handling (404, 500, validation errors)

#### Database (MongoDB)

- ✅ Task schema with: title, description, status, createdAt, updatedAt
- ✅ Mongoose models and schemas
- ✅ Connected to MongoDB Atlas (cloud database)

### Bonus Features (Implemented)

- ✅ **Filter by Status** - Filter tasks by All, Pending, In Progress, or Completed
- ✅ **Pagination** - Navigate through tasks with customizable items per page (5, 10, 20, 50)
- ✅ **Login/Logout Pages** - Basic authentication UI with landing page
- ✅ **Deployed Application** - Both frontend (Vercel) and backend (Render) are live
- ✅ **Modern UI/UX** - Professional design with smooth animations and transitions
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Loading States** - Clear feedback during data operations
- ✅ **Empty States** - Helpful messages when no tasks exist

## 📁 Project Structure

```
task-manager-mern/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   └── taskController.js     # Business logic for CRUD operations
│   ├── models/
│   │   └── Task.js               # Mongoose schema and model
│   ├── routes/
│   │   └── taskRoutes.js         # API route definitions
│   ├── .env                      # Environment variables (not in repo)
│   ├── .env.example              # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── TasksPage.jsx
│   │   ├── services/
│   │   │   └── api.js            # Axios API service layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vercel.json
│   └── vite.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation) or MongoDB Atlas account
- Git
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-manager-mern
   ```

2. **Set up the Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Configure Backend Environment Variables**

   Create a `.env` file in the `backend` folder:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskmanager
   ```

   For MongoDB Atlas (cloud):

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

4. **Set up the Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure Frontend Environment Variables (Optional)**

   Create a `.env` file in the `frontend` folder:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## 🏃 Running the Application

### Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`

You should see:

```
Server running on port 5000
MongoDB Connected: <your-mongodb-host>
```

### Start the Frontend Development Server

Open a new terminal and run:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

Now open your browser and navigate to `http://localhost:5173` to use the application.

## 📡 API Documentation

### Base URL

- Local: `http://localhost:5000/api`
- Production: `https://taskmanager-pgpe.onrender.com/api`

### Endpoints

| Method | Endpoint     | Description     | Request Body                     |
| ------ | ------------ | --------------- | -------------------------------- |
| GET    | `/tasks`     | Get all tasks   | -                                |
| GET    | `/tasks/:id` | Get single task | -                                |
| POST   | `/tasks`     | Create new task | `{ title, description, status }` |
| PUT    | `/tasks/:id` | Update task     | `{ title, description, status }` |
| DELETE | `/tasks/:id` | Delete task     | -                                |

### Request/Response Examples

**Create Task (POST /api/tasks)**

```json
// Request
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending"
}

// Response (201 Created)
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending",
  "createdAt": "2024-11-19T10:30:00.000Z",
  "updatedAt": "2024-11-19T10:30:00.000Z"
}
```

**Get All Tasks (GET /api/tasks)**

```json
// Response (200 OK)
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending",
    "createdAt": "2024-11-19T10:30:00.000Z",
    "updatedAt": "2024-11-19T10:30:00.000Z"
  }
]
```

**Update Task (PUT /api/tasks/:id)**

```json
// Request
{
  "status": "completed"
}

// Response (200 OK)
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "completed",
  "createdAt": "2024-11-19T10:30:00.000Z",
  "updatedAt": "2024-11-19T11:45:00.000Z"
}
```

**Error Response (400 Bad Request)**

```json
{
  "message": "Title is required"
}
```

**Error Response (404 Not Found)**

```json
{
  "message": "Task not found"
}
```

## 🧪 Testing the API

You can test the API using Postman or Thunder Client:

1. **Import the endpoints** into your API testing tool
2. **Set the base URL** to `http://localhost:5000/api` (or production URL)
3. **Test each endpoint**:
   - Create a few tasks
   - Retrieve all tasks
   - Update a task status
   - Delete a task

Example using cURL:

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing API","status":"pending"}'
```

## 🎨 Features Walkthrough

### Landing Page

- Modern hero section with animated rotating text
- Clean navigation with login/signup options
- Professional design that sets the tone for the application

### Login Page

- Simple authentication interface
- **Login with any email and password** (email structure validation is applied)
- Redirects to the main tasks page after login
- Clean, minimal design with form validation

> **Note**: This is a demo application. You can login with any email (e.g., user@example.com) and any password. The email must follow standard email format (contains @ and domain).

### Tasks Page (Main Application)

**Sidebar Navigation**

- Logo and branding
- Filter options: All Tasks, Pending, In Progress, Completed
- Real-time task counts for each status
- Logout option

**Main Content Area**

- Header showing current filter and task count
- "Add New Task" button (opens modal dialog)
- Task list with cards showing:
  - Task title and description
  - Status badge with color coding
  - Update and Delete buttons

**Task Operations**

- **Create**: Click "Add New Task" → Fill form → Submit
- **Read**: All tasks displayed in organized cards
- **Update**: Click "Update" on any task → Edit in modal → Save
- **Delete**: Click "Delete" → Confirm in dialog → Task removed

**Pagination**

- Fixed at the bottom of the page
- Shows current page and total tasks
- Customizable items per page (5, 10, 20, 50)
- Previous/Next navigation
- Smart page number display with ellipsis

## 🔧 Code Quality

### Best Practices Implemented

- ✅ Clean and readable code with proper indentation
- ✅ Comprehensive comments explaining complex logic
- ✅ Modular component structure
- ✅ Separation of concerns (routes, controllers, models)
- ✅ Error handling at all levels
- ✅ Input validation on both frontend and backend
- ✅ Environment variables for configuration
- ✅ Proper HTTP status codes
- ✅ RESTful API design

### Error Handling

- Frontend: User-friendly error messages
- Backend: Proper HTTP status codes (400, 404, 500)
- Database: Connection error handling
- Validation: Form validation with helpful messages

## 🚀 Deployment

The application is deployed and accessible online:

**Frontend (Vercel)**

- URL: https://taskmanager-pi-olive.vercel.app
- Automatic deployments on git push
- Environment variable: `VITE_API_URL`

**Backend (Render)**

- URL: https://taskmanager-pgpe.onrender.com
- Automatic deployments on git push
- Environment variables: `PORT`, `MONGO_URI`

**Database (MongoDB Atlas)**

- Cloud-hosted MongoDB cluster
- Automatic backups
- Always available

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📝 Development Timeline

Following the suggested 7-day breakdown:

**Days 1-2: Setup** ✅

- Installed Node.js, MongoDB, and created GitHub repository
- Initialized backend with Express
- Connected to MongoDB Atlas
- Created Task model with Mongoose

**Days 3-4: Backend APIs** ✅

- Implemented all CRUD routes
- Added error handling and validation
- Tested all endpoints using Postman
- Added proper status codes and error messages

**Days 5-6: Frontend UI** ✅

- Set up React project with Vite
- Created all components (TaskList, TaskForm, TaskItem, etc.)
- Integrated with backend using Axios
- Implemented routing with React Router

**Day 7: Polish & Submit** ✅

- Added form validation and error messages
- Cleaned up code and added comments
- Wrote comprehensive README
- Deployed to production
- Tested end-to-end functionality

## 🎯 Evaluation Criteria Met

✅ **MERN Environment Setup**: Successfully configured MongoDB, Express, React, and Node.js

✅ **Working CRUD Functionality**: All create, read, update, and delete operations work end-to-end

✅ **Clean and Readable Code**: Proper file structure, modular components, and clear naming conventions

✅ **Error Handling and Validation**: Comprehensive error handling on both frontend and backend

✅ **Clear README**: Detailed documentation with setup instructions and API documentation

## 🤝 Contributing

This project was created as part of an internship assignment. If you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of a Full-Stack Intern Assignment.

## 👨‍💻 Author

Created as part of the Full-Stack Intern Assignment (Basic MERN Level)

## 🙏 Acknowledgments

- React.js documentation for component patterns
- Express.js documentation for API best practices
- MongoDB documentation for database design
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icon set

---

**Thank you for reviewing this project!** 🚀

For any questions or feedback, please feel free to reach out.
