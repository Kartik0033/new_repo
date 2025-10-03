import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Filter,
  Search,
  Download,
  Eye,
  MessageSquare,
  Bell,
  ArrowUpRight
} from 'lucide-react';
import './Applications.css';

interface Application {
  id: string;
  internshipTitle: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'pending' | 'under-review' | 'interview-scheduled' | 'accepted' | 'rejected' | 'withdrawn';
  interviewDate?: string;
  feedback?: string;
  nextStep?: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('applied-date');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockApplications: Application[] = [
      {
        id: '1',
        internshipTitle: 'Software Engineering Intern',
        company: 'Google',
        location: 'Mountain View, CA',
        salary: '$8,000/month',
        appliedDate: '2024-01-15',
        status: 'interview-scheduled',
        interviewDate: '2024-01-25',
        priority: 'high',
        nextStep: 'Technical interview scheduled for Jan 25, 2024'
      },
      {
        id: '2',
        internshipTitle: 'Data Science Intern',
        company: 'Microsoft',
        location: 'Seattle, WA',
        salary: '$7,500/month',
        appliedDate: '2024-01-12',
        status: 'under-review',
        priority: 'high',
        nextStep: 'Application under review by hiring team'
      },
      {
        id: '3',
        internshipTitle: 'Frontend Developer Intern',
        company: 'Airbnb',
        location: 'San Francisco, CA',
        salary: '$7,000/month',
        appliedDate: '2024-01-10',
        status: 'accepted',
        priority: 'medium',
        nextStep: 'Complete onboarding documents by Jan 30'
      },
      {
        id: '4',
        internshipTitle: 'Backend Developer Intern',
        company: 'Uber',
        location: 'New York, NY',
        salary: '$6,800/month',
        appliedDate: '2024-01-08',
        status: 'rejected',
        priority: 'medium',
        feedback: 'Great technical skills, but looking for someone with more experience in distributed systems.'
      },
      {
        id: '5',
        internshipTitle: 'Mobile App Developer Intern',
        company: 'Snapchat',
        location: 'Los Angeles, CA',
        salary: '$6,500/month',
        appliedDate: '2024-01-05',
        status: 'pending',
        priority: 'low',
        deadline: '2024-01-30'
      },
      {
        id: '6',
        internshipTitle: 'DevOps Engineer Intern',
        company: 'Netflix',
        location: 'Los Gatos, CA',
        salary: '$7,200/month',
        appliedDate: '2024-01-03',
        status: 'under-review',
        priority: 'high',
        nextStep: 'Waiting for initial screening call'
      }
    ];

    setTimeout(() => {
      setApplications(mockApplications);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'under-review': return '#3498db';
      case 'interview-scheduled': return '#9b59b6';
      case 'accepted': return '#27ae60';
      case 'rejected': return '#e74c3c';
      case 'withdrawn': return '#95a5a6';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'under-review': return <FileText size={16} />;
      case 'interview-scheduled': return <Calendar size={16} />;
      case 'accepted': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      case 'withdrawn': return <XCircle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#6c757d';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.internshipTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'applied-date':
        return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      case 'company':
        return a.company.localeCompare(b.company);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });

  const getStats = () => {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'pending').length;
    const underReview = applications.filter(app => app.status === 'under-review').length;
    const interviews = applications.filter(app => app.status === 'interview-scheduled').length;
    const accepted = applications.filter(app => app.status === 'accepted').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;

    return { total, pending, underReview, interviews, accepted, rejected };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="applications-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-page">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track and manage your internship applications</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Applications</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon review">
            <Eye size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.underReview}</div>
            <div className="stat-label">Under Review</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon interviews">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.interviews}</div>
            <div className="stat-label">Interviews</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon accepted">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.accepted}</div>
            <div className="stat-label">Accepted</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon rejected">
            <XCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="controls-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search applications by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters">
          <div className="filter-group">
            <Filter size={18} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under-review">Under Review</option>
              <option value="interview-scheduled">Interview Scheduled</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
          <div className="filter-group">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="applied-date">Sort by Applied Date</option>
              <option value="company">Sort by Company</option>
              <option value="status">Sort by Status</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <span>Showing {sortedApplications.length} of {applications.length} applications</span>
        <button className="export-btn">
          <Download size={16} />
          Export Applications
        </button>
      </div>

      {/* Applications List */}
      {sortedApplications.length === 0 ? (
        <div className="no-results">
          <FileText size={48} />
          <h3>No applications found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="applications-list">
          {sortedApplications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="card-header">
                <div className="title-section">
                  <h3>{application.internshipTitle}</h3>
                  <div className="company-location">
                    <span className="company">
                      <Building size={16} />
                      {application.company}
                    </span>
                    <span className="location">
                      <MapPin size={16} />
                      {application.location}
                    </span>
                  </div>
                </div>
                <div className="card-actions">
                  <div 
                    className="priority-indicator" 
                    style={{ backgroundColor: getPriorityColor(application.priority) }}
                    title={`${application.priority} priority`}
                  ></div>
                  <div 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(application.status)}20`,
                      color: getStatusColor(application.status)
                    }}
                  >
                    {getStatusIcon(application.status)}
                    {application.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </div>
              </div>

              <div className="card-content">
                <div className="application-details">
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <span>{application.salary}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                  </div>
                  {application.interviewDate && (
                    <div className="detail-item interview">
                      <Bell size={16} />
                      <span>Interview: {new Date(application.interviewDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {application.deadline && (
                    <div className="detail-item deadline">
                      <Clock size={16} />
                      <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {application.nextStep && (
                  <div className="next-step">
                    <h4>Next Step</h4>
                    <p>{application.nextStep}</p>
                  </div>
                )}

                {application.feedback && (
                  <div className="feedback">
                    <h4>Feedback</h4>
                    <p>{application.feedback}</p>
                  </div>
                )}
              </div>

              <div className="card-footer">
                <button className="action-btn secondary">
                  <MessageSquare size={16} />
                  Contact HR
                </button>
                <button className="action-btn secondary">
                  <Eye size={16} />
                  View Details
                </button>
                <button className="action-btn primary">
                  <ArrowUpRight size={16} />
                  Open Application
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;