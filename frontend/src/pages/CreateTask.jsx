import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const CreateTask = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/tasks', formData);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

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
        <button onClick={() => navigate('/tasks')} className="back-btn">
          ← Back to Tasks
        </button>
        <div className="dashboard-card">
          <h2 style={{ color: '#667eea', marginBottom: '30px' }}>Create New Task</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Task Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Enter task description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn btn-primary btn-small">
                {loading ? 'Creating...' : 'Create Task'}
              </button>
              <button type="button" onClick={() => navigate('/tasks')} className="btn btn-secondary btn-small">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
