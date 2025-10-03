import React from 'react';
import { 
  Briefcase, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  MapPin
} from 'lucide-react';
import './StudentDashboard.css';

const StudentDashboard: React.FC = () => {
  // Mock data for prototype
  const stats = {
    totalApplications: 8,
    activeApplications: 3,
    interviewsScheduled: 2,
    offersReceived: 1
  };

  const recentApplications = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Software Development Intern',
      status: 'interview_scheduled',
      appliedDate: '2024-10-01',
      interviewDate: '2024-10-08'
    },
    {
      id: '2',
      company: 'DataTech Industries',
      position: 'Data Science Intern',
      status: 'pending',
      appliedDate: '2024-09-28'
    },
    {
      id: '3',
      company: 'WebFlow Inc',
      position: 'Frontend Developer Intern',
      status: 'approved',
      appliedDate: '2024-09-25'
    }
  ];

  const upcomingInterviews = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Software Development Intern',
      date: '2024-10-08',
      time: '10:00 AM',
      mode: 'online',
      meetingLink: 'https://meet.google.com/abc-def-ghi'
    },
    {
      id: '2',
      company: 'AI Solutions',
      position: 'Machine Learning Intern',
      date: '2024-10-10',
      time: '2:00 PM',
      mode: 'offline',
      location: 'Block A, Room 301'
    }
  ];

  const recommendedInternships = [
    {
      id: '1',
      title: 'Full Stack Developer Intern',
      company: 'StartupXYZ',
      location: 'Bangalore',
      stipend: 15000,
      skills: ['React', 'Node.js', 'MongoDB'],
      deadline: '2024-10-15'
    },
    {
      id: '2',
      title: 'Mobile App Developer Intern',
      company: 'MobileTech',
      location: 'Hyderabad',
      stipend: 12000,
      skills: ['React Native', 'JavaScript'],
      deadline: '2024-10-20'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="status-icon pending" size={16} />;
      case 'approved': return <CheckCircle className="status-icon approved" size={16} />;
      case 'interview_scheduled': return <Calendar className="status-icon scheduled" size={16} />;
      case 'rejected': return <AlertCircle className="status-icon rejected" size={16} />;
      default: return <Clock className="status-icon" size={16} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Under Review';
      case 'approved': return 'Approved';
      case 'interview_scheduled': return 'Interview Scheduled';
      case 'rejected': return 'Not Selected';
      default: return status;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome back! Here's your internship journey overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card applications">
          <div className="stat-icon">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalApplications}</h3>
            <p>Total Applications</p>
          </div>
        </div>

        <div className="stat-card active">
          <div className="stat-icon">
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.activeApplications}</h3>
            <p>Active Applications</p>
          </div>
        </div>

        <div className="stat-card interviews">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.interviewsScheduled}</h3>
            <p>Interviews Scheduled</p>
          </div>
        </div>

        <div className="stat-card offers">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.offersReceived}</h3>
            <p>Offers Received</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Applications */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Applications</h3>
            <a href="/applications" className="view-all">View All</a>
          </div>
          <div className="applications-list">
            {recentApplications.map((app) => (
              <div key={app.id} className="application-item">
                <div className="application-info">
                  <h4>{app.company}</h4>
                  <p>{app.position}</p>
                  <span className="apply-date">Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="application-status">
                  {getStatusIcon(app.status)}
                  <span className={`status-label ${app.status}`}>
                    {getStatusLabel(app.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Upcoming Interviews</h3>
            <a href="/interviews" className="view-all">View All</a>
          </div>
          <div className="interviews-list">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="interview-item">
                <div className="interview-info">
                  <h4>{interview.company}</h4>
                  <p>{interview.position}</p>
                  <div className="interview-details">
                    <span className="interview-date">
                      <Calendar size={14} />
                      {new Date(interview.date).toLocaleDateString()} at {interview.time}
                    </span>
                    <span className={`interview-mode ${interview.mode}`}>
                      {interview.mode === 'online' ? (
                        <>📹 Online</>
                      ) : (
                        <>🏢 {interview.location}</>
                      )}
                    </span>
                  </div>
                </div>
                <button className="join-btn">
                  {interview.mode === 'online' ? 'Join Meeting' : 'View Details'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Internships */}
        <div className="dashboard-card full-width">
          <div className="card-header">
            <h3>Recommended for You</h3>
            <a href="/internships" className="view-all">Browse All</a>
          </div>
          <div className="internships-grid">
            {recommendedInternships.map((internship) => (
              <div key={internship.id} className="internship-card">
                <div className="internship-header">
                  <h4>{internship.title}</h4>
                  <span className="company">{internship.company}</span>
                </div>
                <div className="internship-details">
                  <div className="detail-item">
                    <MapPin size={14} />
                    <span>{internship.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="stipend">₹{internship.stipend.toLocaleString()}/month</span>
                  </div>
                </div>
                <div className="skills-tags">
                  {internship.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <div className="internship-footer">
                  <span className="deadline">Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
                  <button className="apply-btn">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;