import React from 'react';
import { User, Bell, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'student': return 'Student';
      case 'faculty': return 'Faculty';
      case 'placement_cell': return 'Placement Cell';
      case 'recruiter': return 'Recruiter';
      default: return role;
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <h2>CIPMS</h2>
            <span className="logo-subtitle">Campus Internship & Placement Management</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="notification-icon">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </div>
          
          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div className="user-details">
                <span className="user-name">{user.firstName} {user.lastName}</span>
                <span className="user-role">{getRoleDisplayName(user.role)}</span>
              </div>
            </div>
            
            <div className="user-actions">
              <button className="action-btn" title="Settings">
                <Settings size={16} />
              </button>
              <button className="action-btn logout-btn" onClick={logout} title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;