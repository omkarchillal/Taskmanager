# Task Manager App - MERN Stack

A full-stack Task Manager application built with MongoDB, Express.js, React.js, and Node.js (MERN Stack). This application allows users to create, view, update, and delete tasks with a modern and professional user interface.

## 🚀 Project Overview

This is a comprehensive task management system that helps users organize and track their daily tasks efficiently. The application features a clean, modern UI with filtering, pagination, and real-time task status updates.

## 🛠️ Tech Stack

### Frontend

- **React.js** (v19.2.0) - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## ✨ Features

### Core Features

- ✅ Create new tasks with title, description, and status
- ✅ View all tasks in a clean, organized list
- ✅ Update existing tasks
- ✅ Delete tasks with confirmation dialog
- ✅ Form validation (title cannot be empty)
- ✅ Error handling and user feedback

### Bonus Features

- ✅ Filter tasks by status (All, Pending, In Progress, Completed)
- ✅ Pagination with customizable items per page (5, 10, 20, 50)
- ✅ Modern landing page
- ✅ Login/Logout pages
- ✅ Responsive sidebar navigation
- ✅ Professional UI with icons and smooth transitions

## 📁 Folder Structure

```
task-manager-mern/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js  # Task CRUD logic
│   ├── models/
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   └── taskRoutes.js      # API routes
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js              # Express server entry point
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
│   │   │   └── api.js         # API service layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd task-manager-mern
```

2. **Setup Backend**

```bash
cd backend
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
```

For MongoDB Atlas, use:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
```

4. **Setup Frontend**

```bash
cd ../frontend
npm install
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

## 📡 API Endpoints

### Tasks API

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/api/tasks`     | Get all tasks         |
| GET    | `/api/tasks/:id` | Get single task by ID |
| POST   | `/api/tasks`     | Create a new task     |
| PUT    | `/api/tasks/:id` | Update a task         |
| DELETE | `/api/tasks/:id` | Delete a task         |

### Request/Response Examples

**Create Task (POST /api/tasks)**

```json
Request Body:
{
  "title": "Complete project",
  "description": "Finish the MERN stack project",
  "status": "pending"
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project",
  "description": "Finish the MERN stack project",
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🎨 Features Walkthrough

### Landing Page

- Modern hero section with animated text
- Navigation to login/signup

### Login Page

- Clean authentication interface
- Redirects to tasks page after login

### Tasks Page

- **Sidebar Navigation**: Filter tasks by status with live counts
- **Task List**: View all tasks with status badges
- **Add Task**: Modal dialog for creating new tasks
- **Edit Task**: Update existing tasks inline
- **Delete Task**: Confirmation dialog before deletion
- **Pagination**: Navigate through tasks with customizable page size
- **Status Indicators**: Color-coded badges (Yellow: Pending, Blue: In Progress, Green: Completed)

## 🧪 Testing the API

You can test the API endpoints using:

- **Postman**: Import the endpoints and test CRUD operations
- **Thunder Client**: VS Code extension for API testing
- **cURL**: Command-line testing

Example cURL command:

```bash
curl -X GET http://localhost:5000/api/tasks
```

## 🎯 Task Schema

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🔧 Available Scripts

### Backend

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables (MONGO_URI, PORT)
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Vercel/Netlify
3. Update API base URL in `frontend/src/services/api.js`

## 🐛 Error Handling

The application includes comprehensive error handling:

- **Frontend**: User-friendly error messages for failed operations
- **Backend**: Proper HTTP status codes (404, 500, 400)
- **Validation**: Form validation with error messages
- **Database**: Connection error handling

## 📝 Code Quality

- Clean and readable code structure
- Proper component separation
- Reusable components
- Consistent naming conventions
- Comments where necessary
- Error boundaries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created as part of a Full-Stack Intern Assignment.

## 👨‍💻 Author

Created as part of the MERN Stack Intern Assignment

## 🙏 Acknowledgments

- React.js documentation
- Express.js documentation
- MongoDB documentation
- Tailwind CSS
- Lucide Icons
