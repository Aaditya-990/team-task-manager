# Team Task Manager

A full-stack web application where users can create projects, assign tasks, and track progress with role-based access control (Admin/Member).

## Key Features
- **Authentication**: Secure Signup/Login using JWT.
- **Role-Based Access**: 
  - Admins can create projects and tasks.
  - Members can only update the status of tasks assigned to them.
- **Premium UI**: Modern glassmorphism design built from scratch with Vanilla CSS.
- **Dashboard**: Overview of total tasks, in-progress tasks, and overdue tasks.
- **Kanban Board**: Drag-and-drop or status-update task board for individual projects.

## Tech Stack
- **Backend**: Django & Django REST Framework (Python)
- **Frontend**: React (Vite)
- **Database**: SQLite (Local) / PostgreSQL (Production ready)

## Local Development Setup

### Backend (Django)
1. Navigate to the base directory:
   ```bash
   cd team-task-manager
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```
3. Install requirements:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server (on port 8001 to avoid conflicts):
   ```bash
   python manage.py runserver 8001
   ```

### Frontend (React)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd team-task-manager/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Deployment to Railway

This repository is structured to be easily deployed on [Railway.app](https://railway.app/).

1. Create a new project on Railway.
2. Provision a **PostgreSQL** database from the Railway dashboard.
3. Deploy the **Backend**:
   - Create a new service from your GitHub repo.
   - Set the Root Directory to `/backend`.
   - Add environment variables: `DATABASE_URL` (from the provisioned Postgres).
   - Set the Start Command to `gunicorn backend.wsgi --log-file -`.
4. Deploy the **Frontend**:
   - Create another service from your GitHub repo.
   - Set the Root Directory to `/frontend`.
   - Add an environment variable: `VITE_API_URL` pointing to your deployed backend URL.

## Demo Video
🎥 **[Click here to watch the demo](https://drive.google.com/file/d/1MEaPc1GpbVCE62U6iCoU0aHyArKwfz1S/view?usp=sharing)**

> A 2-5 minute walkthrough showing: Signup, Admin creating projects/tasks, Member updating task status, and the Kanban board.
