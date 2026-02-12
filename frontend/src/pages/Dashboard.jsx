import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="user-info">
          <h2>Welcome back, {user?.name}! 👋</h2>
          <p>📧 {user?.email}</p>
          <p>🔑 Role: <span className="badge">{user?.role}</span></p>
        </div>

        <div className="actions-grid">
          <div className="action-card" onClick={() => navigate('/tasks')}>
            <h3>📋 View Tasks</h3>
            <p>See all your tasks</p>
          </div>
          <div className="action-card" onClick={() => navigate('/tasks/create')}>
            <h3>➕ Create Task</h3>
            <p>Add a new task</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
