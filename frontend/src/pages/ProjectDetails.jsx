import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'TODO', due_date: '' });
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const res = await api.get(`projects/${id}/`);
      setProject(res.data);
      // Wait, in ProjectSerializer, tasks are included if we used nested serializer, or we can fetch /tasks/ and filter.
      // Assuming tasks are included via nested serializer:
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('tasks/', { ...newTask, project: id });
      setShowModal(false);
      setNewTask({ title: '', description: '', status: 'TODO', due_date: '' });
      fetchProjectDetails();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`tasks/${taskId}/`, { status: newStatus });
      fetchProjectDetails();
    } catch (err) {
      console.error(err);
      alert("You might not have permission to update this task.");
    }
  };

  if (!project) return <div>Loading...</div>;

  const columns = ['TODO', 'IN_PROGRESS', 'DONE'];

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h1 className="mb-1">{project.name}</h1>
        <p style={{ color: 'var(--text-muted)' }}>{project.description}</p>
      </div>

      <div className="flex justify-between align-center mb-4">
        <h2>Task Board</h2>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Task
          </button>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 50, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '20px' }}>
            <div className="glass-panel modal-animate" style={{ padding: '30px', width: '100%', maxWidth: '400px' }}>
              <h2 className="mb-3">Add Task</h2>
              <form onSubmit={handleCreateTask}>
              <div className="mb-3">
                <label>Title</label>
                <input required value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea rows="2" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}></textarea>
              </div>
              <div className="mb-4">
                <label>Due Date</label>
                <input type="date" value={newTask.due_date} onChange={e => setNewTask({...newTask, due_date: e.target.value})} />
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

      <div className="kanban-board">
        {columns.map(status => (
          <div key={status} className="kanban-column glass-panel" style={{ padding: '20px' }}>
            <h3 className="kanban-column-header flex justify-between">
              {status.replace('_', ' ')}
              <span className={`badge badge-${status.toLowerCase()}`}>{tasks.filter(t => t.status === status).length}</span>
            </h3>
            <div className="task-list">
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task.id} className="glass-card" style={{ padding: '15px' }}>
                  <h4 className="mb-1">{task.title}</h4>
                  {task.description && <p className="mb-3" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{task.description}</p>}
                  
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
                    <select 
                      value={task.status} 
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '0.8rem', background: 'rgba(0,0,0,0.2)' }}
                    >
                      {columns.map(col => (
                        <option key={col} value={col}>{col.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetails;
