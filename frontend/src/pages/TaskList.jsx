import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks', { params: { search } });
      setTasks(response.data.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditForm({ title: task.title, description: task.description || '' });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await api.put(`/tasks/${id}`, editForm);
      setTasks(tasks.map((task) => (task.id === id ? response.data.data : task)));
      setEditingTask(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update task');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading tasks...</p>
    </div>
  );

  return (
    <div>
      <div className="navbar">
        <div className="navbar-content">
          <h1>Task Manager</h1>
          <div className="navbar-actions">
            <button onClick={toggleTheme} className="theme-toggle">
              {isDark ? '☀️' : '🌙'}
            </button>
            <button onClick={() => { logout(); navigate('/login'); }} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
        <div className="page-header">
          <h2>My Tasks</h2>
          <div className="header-actions">
            <button onClick={() => navigate('/tasks/create')} className="btn btn-primary btn-small">
              + New Task
            </button>
          </div>
        </div>

        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {error && <div className="error-message">{error}</div>}

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Create your first task to get started!</p>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                {editingTask === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '2px solid #667eea' }}
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      style={{ width: '100%', padding: '10px', marginBottom: '10px', minHeight: '80px' }}
                    />
                    <div className="task-actions">
                      <button onClick={() => handleUpdate(task.id)} className="btn btn-primary btn-small">
                        Save
                      </button>
                      <button onClick={() => setEditingTask(null)} className="btn btn-secondary btn-small">
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{task.title}</h3>
                    <p>{task.description || 'No description provided'}</p>
                    <div className="task-meta">
                      <div>👤 Created by: {task.user.name}</div>
                      <div>📧 {task.user.email}</div>
                    </div>
                    <div className="task-date">
                      📅 Created: {formatDate(task.createdAt)}
                    </div>
                    <div className="task-actions">
                      <button onClick={() => handleEdit(task)} className="btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(task.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
