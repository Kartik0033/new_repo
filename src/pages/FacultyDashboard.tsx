import React from 'react';
import { 
  CheckSquare, 
  Users, 
  Clock, 
  TrendingUp, 
  Calendar,
  MessageCircle,
  FileText,
  Eye
} from 'lucide-react';
import './FacultyDashboard.css';

const FacultyDashboard: React.FC = () => {
  // Mock data for prototype
  const stats = {
    pendingApprovals: 5,
    totalStudents: 28,
    activeInternships: 12,
    completedReviews: 15
  };

  const pendingApprovals = [
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'CS2021001',
      company: 'TechCorp Solutions',
      position: 'Software Development Intern',
      appliedDate: '2024-10-01',
      urgency: 'high'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'CS2021002',
      company: 'DataTech Industries',
      position: 'Data Science Intern',
      appliedDate: '2024-09-30',
      urgency: 'medium'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      studentId: 'CS2021003',
      company: 'WebFlow Inc',
      position: 'Frontend Developer Intern',
      appliedDate: '2024-09-28',
      urgency: 'low'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'approval',
      message: 'Approved internship application for Sarah Wilson at AI Solutions',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'feedback',
      message: 'Submitted feedback for Tom Brown at TechStartup',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      type: 'review',
      message: 'Reviewed progress report from Lisa Davis',
      timestamp: '1 day ago'
    }
  ];

  const studentProgress = [
    {
      id: '1',
      name: 'John Doe',
      company: 'TechCorp Solutions',
      status: 'ongoing',
      progress: 75,
      weeksCompleted: 6,
      totalWeeks: 8
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      company: 'AI Solutions',
      status: 'completed',
      progress: 100,
      weeksCompleted: 10,
      totalWeeks: 10,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Mike Chen',
      company: 'StartupXYZ',
      status: 'ongoing',
      progress: 40,
      weeksCompleted: 4,
      totalWeeks: 10
    }
  ];

  const getUrgencyClass = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'urgency-high';
      case 'medium': return 'urgency-medium';
      case 'low': return 'urgency-low';
      default: return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ongoing': return <Clock className="status-icon ongoing" size={16} />;
      case 'completed': return <CheckSquare className="status-icon completed" size={16} />;
      default: return <Clock className="status-icon" size={16} />;
    }
  };

  return (
    <div className="faculty-dashboard">
      <div className="dashboard-header">
        <h1>Faculty Dashboard</h1>
        <p>Monitor student applications and track internship progress.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card approvals">
          <div className="stat-icon">
            <CheckSquare size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>

        <div className="stat-card students">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card internships">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.activeInternships}</h3>
            <p>Active Internships</p>
          </div>
        </div>

        <div className="stat-card reviews">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.completedReviews}</h3>
            <p>Completed Reviews</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Pending Approvals */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Pending Approvals</h3>
            <a href="/approvals" className="view-all">View All</a>
          </div>
          <div className="approvals-list">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="approval-item">
                <div className="approval-info">
                  <h4>{approval.studentName}</h4>
                  <p className="student-id">{approval.studentId}</p>
                  <p className="position">{approval.position}</p>
                  <p className="company">{approval.company}</p>
                  <span className="apply-date">Applied: {new Date(approval.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="approval-actions">
                  <span className={`urgency-badge ${getUrgencyClass(approval.urgency)}`}>
                    {approval.urgency.toUpperCase()}
                  </span>
                  <div className="action-buttons">
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Progress */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Student Progress</h3>
            <a href="/students" className="view-all">View All</a>
          </div>
          <div className="progress-list">
            {studentProgress.map((student) => (
              <div key={student.id} className="progress-item">
                <div className="student-info">
                  <div className="student-header">
                    <h4>{student.name}</h4>
                    {getStatusIcon(student.status)}
                  </div>
                  <p className="company-name">{student.company}</p>
                  <div className="progress-details">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {student.weeksCompleted}/{student.totalWeeks} weeks
                    </span>
                  </div>
                  {student.rating && (
                    <div className="rating">
                      <span>Rating: ⭐ {student.rating}/5</span>
                    </div>
                  )}
                </div>
                <button className="view-details-btn">
                  <Eye size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="dashboard-card full-width">
          <div className="card-header">
            <h3>Recent Activities</h3>
            <a href="/activities" className="view-all">View All</a>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'approval' && <CheckSquare size={16} />}
                  {activity.type === 'feedback' && <MessageCircle size={16} />}
                  {activity.type === 'review' && <FileText size={16} />}
                </div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="timestamp">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;