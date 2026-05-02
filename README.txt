====================================================
  TEAM TASK MANAGER — Full Stack Application
  Submission for Ethara AI Assignment
====================================================

LIVE DEMO URL:
  https://dependable-abundance-production.up.railway.app

GITHUB REPOSITORY:
  https://github.com/Aaditya-990/team-task-manager

====================================================
  TECH STACK
====================================================

Backend:
  - Python 3.13
  - Django 6.0 + Django REST Framework
  - JWT Authentication (djangorestframework-simplejwt)
  - PostgreSQL (via Railway) / SQLite (local)
  - Gunicorn (production server)
  - WhiteNoise (static file serving)
  - django-cors-headers (CORS support)

Frontend:
  - React 18 (Vite)
  - Vanilla CSS (Glassmorphism design)
  - Axios (API communication)
  - React Router v6 (SPA routing)

Deployment:
  - Railway.app (Backend + Frontend)
  - GitHub (source control)

====================================================
  KEY FEATURES
====================================================

1. JWT Authentication
   - Secure registration and login
   - Access tokens stored in localStorage
   - All API requests authenticated via Bearer token

2. Role-Based Access Control (RBAC)
   - ADMIN role: Full access (create/delete projects, create tasks)
   - MEMBER role: Read-only + can update task status only
   - Backend enforces permissions on every API call

3. Project Management
   - Admins can create and delete projects
   - Members can view all projects they have access to

4. Task Management (Kanban Board)
   - Tasks organized into 3 columns: TODO, IN PROGRESS, DONE
   - Admins can create tasks and assign them to members
   - Members can update the status of their assigned tasks
   - Due dates supported on tasks

5. Dashboard & Analytics
   - Real-time task count by status
   - Overdue task tracking
   - Welcome screen with user role displayed

6. Premium UI Design
   - Glassmorphism design with animated aurora background
   - Smooth animations and micro-interactions
   - Fully responsive layout
   - Custom scrollbars and gradient typography

====================================================
  API ENDPOINTS
====================================================

Authentication:
  POST   /api/auth/register/    — Register a new user
  POST   /api/auth/login/       — Login and get JWT tokens
  GET    /api/auth/me/          — Get current user profile

Projects:
  GET    /api/projects/         — List all projects
  POST   /api/projects/         — Create project (Admin only)
  GET    /api/projects/{id}/    — Get project details + tasks
  DELETE /api/projects/{id}/    — Delete project (Admin only)

Tasks:
  GET    /api/tasks/            — List all tasks
  POST   /api/tasks/            — Create task (Admin only)
  PATCH  /api/tasks/{id}/       — Update task status (Member: status only)
  DELETE /api/tasks/{id}/       — Delete task (Admin only)

====================================================
  LOCAL SETUP INSTRUCTIONS
====================================================

Prerequisites:
  - Python 3.10+
  - Node.js 18+
  - Git

--- BACKEND SETUP ---

1. Clone the repository:
   git clone https://github.com/Aaditya-990/team-task-manager.git
   cd team-task-manager

2. Create and activate virtual environment:
   python -m venv venv
   venv\Scripts\activate        (Windows)
   source venv/bin/activate     (Mac/Linux)

3. Install dependencies:
   pip install -r requirements.txt

4. Run database migrations:
   python manage.py migrate

5. Start the backend server (port 8001):
   python manage.py runserver 8001

   Backend will be running at: http://localhost:8001

--- FRONTEND SETUP ---

1. Navigate to frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

   Frontend will be running at: http://localhost:5173

====================================================
  DEPLOYMENT (Railway.app)
====================================================

Backend Service:
  - Connected to GitHub repo (root directory)
  - Procfile defines start command: gunicorn backend.wsgi
  - Auto-runs migrations on startup
  - Environment Variables Required:
      ALLOWED_HOSTS = *

Frontend Service:
  - Connected to same GitHub repo
  - Root Directory set to: /frontend
  - Environment Variables Required:
      VITE_API_URL = https://team-task-manager-production-4f44.up.railway.app/api/

====================================================
  PROJECT STRUCTURE
====================================================

team-task-manager/
├── api/                    # Django app
│   ├── models.py           # User, Project, Task models
│   ├── serializers.py      # DRF serializers
│   ├── views.py            # ViewSets + RBAC logic
│   └── urls.py             # API routes
├── backend/                # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── frontend/               # React application
│   └── src/
│       ├── pages/          # Login, Register, Dashboard, Projects, ProjectDetails
│       ├── components/     # Layout (sidebar + navbar)
│       ├── api.js          # Axios instance with JWT interceptor
│       └── index.css       # Global styles (glassmorphism design)
├── manage.py
├── requirements.txt
├── Procfile                # Railway start command
└── README.txt

====================================================
  MODELS
====================================================

User (extends AbstractUser):
  - username, email, password
  - role: ADMIN | MEMBER

Project:
  - name, description
  - created_by (FK to User)
  - created_at

Task:
  - title, description
  - status: TODO | IN_PROGRESS | DONE
  - due_date
  - project (FK to Project)
  - assigned_to (FK to User)
  - created_by (FK to User)

====================================================
  SECURITY & BEST PRACTICES
====================================================

  - Stateless JWT authentication (no server-side sessions)
  - Role enforcement on both frontend (UI) and backend (API)
  - CORS configured for cross-origin requests
  - Environment variables for all sensitive config
  - Passwords hashed using Django's default PBKDF2 algorithm
  - Database-ready for PostgreSQL in production

====================================================
  DEVELOPER
====================================================

  Name:    Aaditya
  GitHub:  https://github.com/Aaditya-990
  Email:   aditya2022.44@gmail.com

====================================================
