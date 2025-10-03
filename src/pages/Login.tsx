import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, Mail, AlertCircle } from 'lucide-react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getDemoCredentials = () => {
    const demos = {
      student: 'student@example.com',
      faculty: 'faculty@example.com',
      placement_cell: 'placement@example.com',
      recruiter: 'recruiter@example.com'
    };
    return demos[role as keyof typeof demos];
  };

  const fillDemoCredentials = () => {
    setEmail(getDemoCredentials());
    setPassword('demo123');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-section">
              <h1>CIPMS</h1>
              <p>Campus Internship & Placement Management System</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="role">Login as:</label>
              <div className="role-selector">
                <select 
                  id="role" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="placement_cell">Placement Cell</option>
                  <option value="recruiter">Recruiter</option>
                </select>
                <User className="input-icon" size={18} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="form-control"
                  required
                />
                <Mail className="input-icon" size={18} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="form-control"
                  required
                />
                <Lock className="input-icon" size={18} />
              </div>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="demo-section">
              <h4 className="demo-title">Demo Credentials</h4>
              <div className="credentials-grid">
                <div className="credential-card">
                  <h5>👨‍🎓 Student</h5>
                  <p><strong>Email:</strong> student@example.com</p>
                  <p><strong>Password:</strong> demo123</p>
                </div>
                <div className="credential-card">
                  <h5>👨‍🏫 Faculty</h5>
                  <p><strong>Email:</strong> faculty@example.com</p>
                  <p><strong>Password:</strong> demo123</p>
                </div>
                <div className="credential-card">
                  <h5>🏢 Placement Cell</h5>
                  <p><strong>Email:</strong> placement@example.com</p>
                  <p><strong>Password:</strong> demo123</p>
                </div>
                <div className="credential-card">
                  <h5>🤝 Recruiter</h5>
                  <p><strong>Email:</strong> recruiter@example.com</p>
                  <p><strong>Password:</strong> demo123</p>
                </div>
              </div>
              <div className="current-selection">
                <p className="demo-text">
                  Current Selection: <strong>{getDemoCredentials()}</strong>
                </p>
                <button 
                  type="button" 
                  onClick={fillDemoCredentials}
                  className="demo-btn"
                >
                  Fill Selected Credentials
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;