import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('projects/');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('projects/', newProject);
      setShowModal(false);
      setNewProject({ name: '', description: '' });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`projects/${id}/`);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between align-center mb-4">
        <h1>Projects</h1>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + New Project
          </button>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 50, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '20px' }}>
            <div className="glass-panel modal-animate" style={{ padding: '30px', width: '100%', maxWidth: '400px' }}>
              <h2 className="mb-3">Create Project</h2>
              <form onSubmit={handleCreate}>
              <div className="mb-3">
                <label>Name</label>
                <input required value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} />
              </div>
              <div className="mb-4">
                <label>Description</label>
                <textarea rows="3" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})}></textarea>
              </div>
              <div className="flex justify-between">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {projects.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '80px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '20px', opacity: 0.7 }}>🗂️</div>
            <h2 style={{ marginBottom: '10px', color: 'white', fontSize: '1.8rem' }}>No Projects Yet</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', maxWidth: '400px', lineHeight: 1.6, marginBottom: '28px' }}>
              {isAdmin
                ? "You haven't created any projects yet. Click the button above to get started!"
                : "No projects have been assigned to you yet. Check back later!"}
            </p>
            {isAdmin && (
              <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ fontSize: '1.1rem', padding: '14px 32px' }}>
                🚀 Create Your First Project
              </button>
            )}
          </div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="glass-card flex" style={{ flexDirection: 'column' }}>
              <div className="flex justify-between align-center mb-1">
                <h3>{project.name}</h3>
                {isAdmin && (
                  <button
                    className="btn btn-danger btn-icon"
                    onClick={() => handleDelete(project.id)}
                    title="Delete Project"
                  >
                    ✕
                  </button>
                )}
              </div>
              <p className="mb-3" style={{ color: 'var(--text-muted)', flex: 1 }}>{project.description}</p>
              <div className="mt-4 pt-3 flex justify-between align-center" style={{ borderTop: '1px solid var(--card-border)' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Tasks: {project.tasks?.length || 0}</span>
                <Link to={`/projects/${project.id}`} className="btn btn-secondary">View Tasks →</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;
