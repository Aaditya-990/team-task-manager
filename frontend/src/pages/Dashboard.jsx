import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, taskRes] = await Promise.all([
          api.get('projects/'),
          api.get('tasks/')
        ]);
        setProjects(projRes.data);
        setTasks(taskRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchData();
  }, []);

  const todoTasks = tasks.filter(t => t.status === 'TODO');
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
  const doneTasks = tasks.filter(t => t.status === 'DONE');
  const overdueTasks = tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'DONE');

  return (
    <div className="animate-fade-in">
      <h1 className="mb-4">Dashboard</h1>
      
      <div className="flex gap-4 mb-4">
        <div className="glass-card" style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--text-muted)' }}>Total Projects</h3>
          <h2>{projects.length}</h2>
        </div>
        <div className="glass-card" style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--text-muted)' }}>Total Tasks</h3>
          <h2>{tasks.length}</h2>
        </div>
        <div className="glass-card" style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--text-muted)' }}>In Progress</h3>
          <h2>{inProgressTasks.length}</h2>
        </div>
        <div className="glass-card" style={{ flex: 1, borderLeft: '4px solid var(--danger)' }}>
          <h3 style={{ color: 'var(--text-muted)' }}>Overdue</h3>
          <h2>{overdueTasks.length}</h2>
        </div>
      </div>

      <h2 className="mb-3 mt-4">Recent Projects</h2>
      <div className="task-list">
        {projects.slice(0, 5).map(project => (
          <div key={project.id} className="glass-card flex justify-between align-center">
            <div>
              <h3>{project.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{project.description}</p>
            </div>
            <Link to={`/projects/${project.id}`} className="btn btn-secondary">View Project</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
