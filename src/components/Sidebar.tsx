import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  User, 
  Briefcase, 
  FileText, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings,
  CheckSquare,
  Eye,
  MessageCircle,
  Plus,
  Building2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getMenuItems = () => {
    switch (user.role) {
      case 'student':
        return [
          { icon: Home, label: 'Dashboard', path: '/dashboard' },
          { icon: User, label: 'Profile', path: '/profile' },
          { icon: Briefcase, label: 'Internships', path: '/internships' },
          { icon: FileText, label: 'Applications', path: '/applications' },
          { icon: Calendar, label: 'Interviews', path: '/interviews' },
          { icon: Settings, label: 'Settings', path: '/settings' }
        ];
      
      case 'faculty':
        return [
          { icon: Home, label: 'Dashboard', path: '/dashboard' },
          { icon: Users, label: 'Students', path: '/faculty/students' },
          { icon: CheckSquare, label: 'Approvals', path: '/approvals' },
          { icon: MessageCircle, label: 'Feedback', path: '/feedback' },
          { icon: BarChart3, label: 'Analytics', path: '/analytics' },
          { icon: Settings, label: 'Settings', path: '/settings' }
        ];
      
      case 'placement_cell':
        return [
          { icon: Home, label: 'Dashboard', path: '/dashboard' },
          { icon: Plus, label: 'Post Job', path: '/placement/post-job' },
          { icon: Briefcase, label: 'Manage Jobs', path: '/manage-jobs' },
          { icon: Users, label: 'Students', path: '/students' },
          { icon: Eye, label: 'Recruiters', path: '/recruiters' },
          { icon: BarChart3, label: 'Analytics', path: '/analytics' },
          { icon: Calendar, label: 'Interviews', path: '/interviews' },
          { icon: Settings, label: 'Settings', path: '/settings' }
        ];
      
      case 'recruiter':
        return [
          { icon: Home, label: 'Dashboard', path: '/dashboard' },
          { icon: Users, label: 'Candidates', path: '/recruiter/candidates' },
          { icon: Building2, label: 'Company Profile', path: '/recruiter/profile' },
          { icon: Briefcase, label: 'Post Jobs', path: '/post-jobs' },
          { icon: Calendar, label: 'Interviews', path: '/interviews' },
          { icon: MessageCircle, label: 'Feedback', path: '/feedback' },
          { icon: Settings, label: 'Settings', path: '/settings' }
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path} className="nav-item">
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <IconComponent size={18} />
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;