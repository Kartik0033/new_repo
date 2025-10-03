import React from 'react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp,
  Plus,
  Eye,
  Star,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react';
import './RecruiterDashboard.css';

const RecruiterDashboard: React.FC = () => {
  // Mock data for prototype
  const stats = {
    activeJobs: 6,
    totalApplications: 42,
    interviewsScheduled: 8,
    selectedCandidates: 3
  };

  const myJobPostings = [
    {
      id: '1',
      title: 'Full Stack Developer Intern',
      location: 'Bangalore',
      stipend: 25000,
      applications: 15,
      shortlisted: 5,
      deadline: '2024-10-15',
      status: 'active'
    },
    {
      id: '2',
      title: 'Mobile App Developer',
      location: 'Remote',
      stipend: 22000,
      applications: 12,
      shortlisted: 3,
      deadline: '2024-10-20',
      status: 'active'
    },
    {
      id: '3',
      title: 'UI/UX Designer Intern',
      location: 'Mumbai',
      stipend: 20000,
      applications: 8,
      shortlisted: 2,
      deadline: '2024-10-08',
      status: 'closed'
    }
  ];

  const shortlistedCandidates = [
    {
      id: '1',
      name: 'John Doe',
      position: 'Full Stack Developer',
      university: 'ABC Engineering College',
      cgpa: 8.5,
      skills: ['React', 'Node.js', 'Python'],
      status: 'interview_scheduled',
      interviewDate: '2024-10-08'
    },
    {
      id: '2',
      name: 'Jane Smith',
      position: 'Mobile App Developer',
      university: 'XYZ Tech University',
      cgpa: 8.2,
      skills: ['React Native', 'Flutter', 'JavaScript'],
      status: 'pending_review',
      appliedDate: '2024-10-01'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      position: 'UI/UX Designer',
      university: 'Design Institute',
      cgpa: 7.8,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      status: 'selected',
      selectedDate: '2024-09-28'
    }
  ];

  const upcomingInterviews = [
    {
      id: '1',
      candidateName: 'John Doe',
      position: 'Full Stack Developer',
      date: '2024-10-08',
      time: '10:00 AM',
      mode: 'online',
      meetingLink: 'https://meet.google.com/abc-def-ghi'
    },
    {
      id: '2',
      candidateName: 'Sarah Wilson',
      position: 'Data Scientist',
      date: '2024-10-09',
      time: '2:00 PM',
      mode: 'online',
      meetingLink: 'https://meet.google.com/xyz-123-456'
    },
    {
      id: '3',
      candidateName: 'Alex Chen',
      position: 'Backend Developer',
      date: '2024-10-10',
      time: '11:00 AM',
      mode: 'offline',
      location: 'Office - Conference Room A'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="status-badge active">Active</span>;
      case 'closed':
        return <span className="status-badge closed">Closed</span>;
      case 'interview_scheduled':
        return <span className="status-badge scheduled">Interview Scheduled</span>;
      case 'pending_review':
        return <span className="status-badge pending">Pending Review</span>;
      case 'selected':
        return <span className="status-badge selected">Selected</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'interview_scheduled': return <Calendar className="status-icon scheduled" size={16} />;
      case 'pending_review': return <Clock className="status-icon pending" size={16} />;
      case 'selected': return <CheckCircle className="status-icon selected" size={16} />;
      default: return <Clock className="status-icon" size={16} />;
    }
  };

  return (
    <div className="recruiter-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Recruiter Dashboard</h1>
            <p>Manage job postings, review candidates, and schedule interviews.</p>
          </div>
          <button className="post-job-btn">
            <Plus size={18} />
            Post New Job
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card jobs">
          <div className="stat-icon">
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.activeJobs}</h3>
            <p>Active Job Postings</p>
          </div>
        </div>

        <div className="stat-card applications">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalApplications}</h3>
            <p>Total Applications</p>
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

        <div className="stat-card selected">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.selectedCandidates}</h3>
            <p>Selected Candidates</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* My Job Postings */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>My Job Postings</h3>
            <a href="/post-jobs" className="view-all">Manage Posts</a>
          </div>
          <div className="jobs-list">
            {myJobPostings.map((job) => (
              <div key={job.id} className="job-item">
                <div className="job-info">
                  <div className="job-header">
                    <h4>{job.title}</h4>
                    {getStatusBadge(job.status)}
                  </div>
                  <div className="job-details">
                    <span className="location">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="stipend">💰 ₹{job.stipend.toLocaleString()}/month</span>
                  </div>
                  <div className="job-metrics">
                    <div className="metric">
                      <span className="value">{job.applications}</span>
                      <span className="label">Applications</span>
                    </div>
                    <div className="metric">
                      <span className="value">{job.shortlisted}</span>
                      <span className="label">Shortlisted</span>
                    </div>
                  </div>
                  <span className="deadline">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
                <button className="view-candidates-btn">
                  <Eye size={16} />
                  View Candidates
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Shortlisted Candidates */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Shortlisted Candidates</h3>
            <a href="/candidates" className="view-all">View All</a>
          </div>
          <div className="candidates-list">
            {shortlistedCandidates.map((candidate) => (
              <div key={candidate.id} className="candidate-item">
                <div className="candidate-info">
                  <div className="candidate-header">
                    <h4>{candidate.name}</h4>
                    {getStatusIcon(candidate.status)}
                  </div>
                  <p className="position">{candidate.position}</p>
                  <p className="university">{candidate.university}</p>
                  <div className="candidate-details">
                    <div className="cgpa">
                      <Star size={14} />
                      CGPA: {candidate.cgpa}
                    </div>
                    <div className="skills">
                      {candidate.skills.slice(0, 2).map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                      {candidate.skills.length > 2 && (
                        <span className="skill-more">+{candidate.skills.length - 2}</span>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(candidate.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="dashboard-card full-width">
          <div className="card-header">
            <h3>Upcoming Interviews</h3>
            <a href="/interviews" className="view-all">View Schedule</a>
          </div>
          <div className="interviews-grid">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="interview-card">
                <div className="interview-header">
                  <h4>{interview.candidateName}</h4>
                  <span className="position">{interview.position}</span>
                </div>
                <div className="interview-details">
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>{new Date(interview.date).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{interview.time}</span>
                  </div>
                  <div className="detail-item">
                    {interview.mode === 'online' ? '🔗' : '🏢'}
                    <span>{interview.mode === 'online' ? 'Online' : interview.location}</span>
                  </div>
                </div>
                <div className="interview-actions">
                  {interview.mode === 'online' && (
                    <button className="join-meeting-btn">
                      Join Meeting
                    </button>
                  )}
                  <button className="reschedule-btn">
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;