import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Phone,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Plus,
  Filter,
  Search,
  Bell,
  ExternalLink,
  Download,
  MessageSquare,
  Star,
  ChevronRight
} from 'lucide-react';
import './Interviews.css';

interface Interview {
  id: string;
  company: string;
  position: string;
  type: 'technical' | 'hr' | 'behavioral' | 'final' | 'group';
  date: string;
  time: string;
  duration: number; // minutes
  mode: 'online' | 'offline' | 'phone';
  location?: string;
  meetingLink?: string;
  interviewers: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  round: number;
  totalRounds: number;
  preparationMaterials?: string[];
  notes?: string;
  result?: 'passed' | 'failed' | 'pending';
  feedback?: string;
  nextRound?: string;
}

const Interviews: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [view, setView] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockInterviews: Interview[] = [
      {
        id: '1',
        company: 'Google',
        position: 'Software Engineering Intern',
        type: 'technical',
        date: '2024-01-25',
        time: '10:00',
        duration: 60,
        mode: 'online',
        meetingLink: 'https://meet.google.com/abc-def-ghi',
        interviewers: ['John Smith (Senior Engineer)', 'Sarah Johnson (Tech Lead)'],
        status: 'scheduled',
        round: 2,
        totalRounds: 3,
        preparationMaterials: ['Data Structures & Algorithms', 'System Design Basics', 'Google SWE Guide'],
        notes: 'Focus on coding problems and system design concepts'
      },
      {
        id: '2',
        company: 'Microsoft',
        position: 'Data Science Intern',
        type: 'hr',
        date: '2024-01-28',
        time: '14:30',
        duration: 45,
        mode: 'online',
        meetingLink: 'https://teams.microsoft.com/l/meetup-join/xyz',
        interviewers: ['Emily Davis (HR Manager)'],
        status: 'scheduled',
        round: 1,
        totalRounds: 2,
        preparationMaterials: ['Resume Discussion', 'Behavioral Questions', 'Company Culture'],
        notes: 'Prepare STAR method examples'
      },
      {
        id: '3',
        company: 'Airbnb',
        position: 'Frontend Developer Intern',
        type: 'technical',
        date: '2024-01-20',
        time: '11:00',
        duration: 90,
        mode: 'offline',
        location: 'Airbnb Office, San Francisco',
        interviewers: ['Mike Chen (Frontend Engineer)', 'Lisa Wang (Product Manager)'],
        status: 'completed',
        round: 2,
        totalRounds: 2,
        result: 'passed',
        feedback: 'Great technical skills and problem-solving approach. Strong understanding of React and modern frontend practices.',
        nextRound: 'Offer discussion with HR'
      },
      {
        id: '4',
        company: 'Netflix',
        position: 'DevOps Engineer Intern',
        type: 'behavioral',
        date: '2024-01-30',
        time: '16:00',
        duration: 45,
        mode: 'phone',
        interviewers: ['David Kim (Engineering Manager)'],
        status: 'scheduled',
        round: 1,
        totalRounds: 3,
        preparationMaterials: ['Leadership Principles', 'Previous Projects', 'Team Collaboration'],
        notes: 'Discuss previous internship experience and technical projects'
      },
      {
        id: '5',
        company: 'Uber',
        position: 'Backend Developer Intern',
        type: 'final',
        date: '2024-01-18',
        time: '13:00',
        duration: 60,
        mode: 'online',
        meetingLink: 'https://zoom.us/j/123456789',
        interviewers: ['Rachel Green (VP Engineering)', 'Tom Wilson (Senior Backend Engineer)'],
        status: 'completed',
        round: 3,
        totalRounds: 3,
        result: 'failed',
        feedback: 'Good technical knowledge but needs improvement in system design and scalability concepts.'
      }
    ];

    setTimeout(() => {
      setInterviews(mockInterviews);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical': return '#3498db';
      case 'hr': return '#e74c3c';
      case 'behavioral': return '#f39c12';
      case 'final': return '#9b59b6';
      case 'group': return '#27ae60';
      default: return '#6c757d';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return <Video size={16} />;
      case 'phone': return <Phone size={16} />;
      case 'offline': return <MapPin size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#3498db';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      case 'rescheduled': return '#f39c12';
      default: return '#6c757d';
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || interview.type === filterType;
    const matchesView = view === 'all' || 
                       (view === 'upcoming' && interview.status === 'scheduled') ||
                       (view === 'completed' && interview.status === 'completed');
    return matchesSearch && matchesType && matchesView;
  });

  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`).getTime();
    const dateB = new Date(`${b.date} ${b.time}`).getTime();
    return dateA - dateB;
  });

  const getStats = () => {
    const total = interviews.length;
    const upcoming = interviews.filter(i => i.status === 'scheduled').length;
    const completed = interviews.filter(i => i.status === 'completed').length;
    const passed = interviews.filter(i => i.result === 'passed').length;
    const failed = interviews.filter(i => i.result === 'failed').length;

    return { total, upcoming, completed, passed, failed };
  };

  const stats = getStats();

  const getUpcomingThisWeek = () => {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return interviews.filter(interview => {
      if (interview.status !== 'scheduled') return false;
      const interviewDate = new Date(interview.date);
      return interviewDate >= now && interviewDate <= weekFromNow;
    });
  };

  if (loading) {
    return (
      <div className="interviews-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your interviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="interviews-page">
      <div className="page-header">
        <div>
          <h1>Interview Schedule</h1>
          <p>Manage and track your interview schedule</p>
        </div>
        <button className="add-interview-btn">
          <Plus size={20} />
          Schedule Interview
        </button>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Interviews</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon upcoming">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.upcoming}</div>
            <div className="stat-label">Upcoming</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon passed">
            <Star size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.passed}</div>
            <div className="stat-label">Passed</div>
          </div>
        </div>
      </div>

      {/* This Week's Interviews */}
      {getUpcomingThisWeek().length > 0 && (
        <div className="this-week-section">
          <h2>This Week's Interviews</h2>
          <div className="this-week-grid">
            {getUpcomingThisWeek().map((interview) => (
              <div key={interview.id} className="this-week-card">
                <div className="week-card-header">
                  <div className="date-time">
                    <div className="date">{new Date(interview.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                    <div className="time">{interview.time}</div>
                  </div>
                  <div className="mode-indicator">
                    {getModeIcon(interview.mode)}
                  </div>
                </div>
                <div className="week-card-content">
                  <h4>{interview.position}</h4>
                  <p>{interview.company}</p>
                  <div className="type-badge" style={{ backgroundColor: `${getTypeColor(interview.type)}20`, color: getTypeColor(interview.type) }}>
                    {interview.type} - Round {interview.round}/{interview.totalRounds}
                  </div>
                </div>
                <div className="week-card-actions">
                  <button className="join-btn">
                    {interview.mode === 'online' ? <Video size={14} /> : interview.mode === 'phone' ? <Phone size={14} /> : <MapPin size={14} />}
                    {interview.mode === 'online' ? 'Join Meeting' : interview.mode === 'phone' ? 'Call Details' : 'Location'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Tabs */}
      <div className="view-tabs">
        <button 
          className={`tab ${view === 'upcoming' ? 'active' : ''}`}
          onClick={() => setView('upcoming')}
        >
          <Clock size={18} />
          Upcoming ({interviews.filter(i => i.status === 'scheduled').length})
        </button>
        <button 
          className={`tab ${view === 'completed' ? 'active' : ''}`}
          onClick={() => setView('completed')}
        >
          <CheckCircle size={18} />
          Completed ({interviews.filter(i => i.status === 'completed').length})
        </button>
        <button 
          className={`tab ${view === 'all' ? 'active' : ''}`}
          onClick={() => setView('all')}
        >
          <Calendar size={18} />
          All Interviews
        </button>
      </div>

      {/* Filters */}
      <div className="controls-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters">
          <div className="filter-group">
            <Filter size={18} />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="technical">Technical</option>
              <option value="hr">HR</option>
              <option value="behavioral">Behavioral</option>
              <option value="final">Final</option>
              <option value="group">Group</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interviews List */}
      {sortedInterviews.length === 0 ? (
        <div className="no-results">
          <Calendar size={48} />
          <h3>No interviews found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="interviews-list">
          {sortedInterviews.map((interview) => (
            <div key={interview.id} className="interview-card">
              <div className="card-header">
                <div className="title-section">
                  <h3>{interview.position}</h3>
                  <div className="company-round">
                    <span className="company">{interview.company}</span>
                    <span className="round">Round {interview.round} of {interview.totalRounds}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <div 
                    className="type-badge"
                    style={{ 
                      backgroundColor: `${getTypeColor(interview.type)}20`,
                      color: getTypeColor(interview.type)
                    }}
                  >
                    {interview.type}
                  </div>
                  <div 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(interview.status)}20`,
                      color: getStatusColor(interview.status)
                    }}
                  >
                    {interview.status}
                  </div>
                </div>
              </div>

              <div className="card-content">
                <div className="interview-details">
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>{new Date(interview.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{interview.time} ({interview.duration} minutes)</span>
                  </div>
                  <div className="detail-item">
                    {getModeIcon(interview.mode)}
                    <span>{interview.mode === 'online' ? 'Online Meeting' : interview.mode === 'phone' ? 'Phone Call' : interview.location}</span>
                  </div>
                  <div className="detail-item">
                    <Users size={16} />
                    <span>{interview.interviewers.join(', ')}</span>
                  </div>
                </div>

                {interview.preparationMaterials && (
                  <div className="preparation-section">
                    <h4>Preparation Materials</h4>
                    <div className="materials-list">
                      {interview.preparationMaterials.map((material, index) => (
                        <span key={index} className="material-tag">
                          <FileText size={14} />
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {interview.notes && (
                  <div className="notes-section">
                    <h4>Notes</h4>
                    <p>{interview.notes}</p>
                  </div>
                )}

                {interview.feedback && (
                  <div className="feedback-section">
                    <h4>Interview Feedback</h4>
                    <p>{interview.feedback}</p>
                    {interview.result && (
                      <div className={`result-badge ${interview.result}`}>
                        {interview.result === 'passed' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                        {interview.result.toUpperCase()}
                      </div>
                    )}
                    {interview.nextRound && (
                      <div className="next-round">
                        <strong>Next Step:</strong> {interview.nextRound}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="card-footer">
                {interview.status === 'scheduled' && (
                  <>
                    <button className="action-btn secondary">
                      <Bell size={16} />
                      Set Reminder
                    </button>
                    <button className="action-btn secondary">
                      <MessageSquare size={16} />
                      Contact HR
                    </button>
                    <button className="action-btn primary">
                      {interview.mode === 'online' ? (
                        <>
                          <ExternalLink size={16} />
                          Join Meeting
                        </>
                      ) : interview.mode === 'phone' ? (
                        <>
                          <Phone size={16} />
                          Call Details
                        </>
                      ) : (
                        <>
                          <MapPin size={16} />
                          View Location
                        </>
                      )}
                    </button>
                  </>
                )}
                {interview.status === 'completed' && (
                  <>
                    <button className="action-btn secondary">
                      <Download size={16} />
                      Download Report
                    </button>
                    <button className="action-btn secondary">
                      <MessageSquare size={16} />
                      Add Notes
                    </button>
                    <button className="action-btn primary">
                      <ChevronRight size={16} />
                      View Details
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interviews;