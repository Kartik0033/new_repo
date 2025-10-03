import React from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Calendar,
  Eye,
  Plus,
  BarChart3,
  FileText,
  Clock
} from 'lucide-react';
import './PlacementCellDashboard.css';

const PlacementCellDashboard: React.FC = () => {
  // Mock data for prototype
  const stats = {
    totalStudents: 150,
    activeInternships: 25,
    placedStudents: 89,
    activeRecruiters: 18
  };

  const recentJobs = [
    {
      id: '1',
      title: 'Full Stack Developer Intern',
      company: 'TechCorp Solutions',
      location: 'Bangalore',
      stipend: 25000,
      applications: 15,
      deadline: '2024-10-15',
      status: 'active'
    },
    {
      id: '2',
      title: 'Data Science Intern',
      company: 'DataTech Industries',
      location: 'Hyderabad',
      stipend: 20000,
      applications: 8,
      deadline: '2024-10-12',
      status: 'active'
    },
    {
      id: '3',
      title: 'UI/UX Designer Intern',
      company: 'DesignHub',
      location: 'Mumbai',
      stipend: 18000,
      applications: 12,
      deadline: '2024-10-08',
      status: 'expired'
    }
  ];

  const upcomingInterviews = [
    {
      id: '1',
      studentName: 'John Doe',
      company: 'TechCorp Solutions',
      position: 'Full Stack Developer',
      date: '2024-10-08',
      time: '10:00 AM',
      mode: 'online'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      company: 'DataTech Industries',
      position: 'Data Scientist',
      date: '2024-10-09',
      time: '2:00 PM',
      mode: 'offline'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      company: 'AI Solutions',
      position: 'ML Engineer',
      date: '2024-10-10',
      time: '11:00 AM',
      mode: 'online'
    }
  ];

  const topCompanies = [
    { name: 'TechCorp Solutions', placements: 12, avgStipend: 25000 },
    { name: 'DataTech Industries', placements: 8, avgStipend: 22000 },
    { name: 'AI Solutions', placements: 6, avgStipend: 28000 },
    { name: 'StartupXYZ', placements: 5, avgStipend: 20000 }
  ];

  const departmentStats = [
    { department: 'Computer Science', students: 45, placed: 32, percentage: 71 },
    { department: 'Information Technology', students: 40, placed: 28, percentage: 70 },
    { department: 'Electronics', students: 35, placed: 18, percentage: 51 },
    { department: 'Mechanical', students: 30, placed: 11, percentage: 37 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="status-badge active">Active</span>;
      case 'expired':
        return <span className="status-badge expired">Expired</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="placement-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Placement Cell Dashboard</h1>
            <p>Manage internships, track placements, and monitor student progress.</p>
          </div>
          <button className="add-job-btn">
            <Plus size={18} />
            Post New Job
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
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
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.activeInternships}</h3>
            <p>Active Internships</p>
          </div>
        </div>

        <div className="stat-card placements">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.placedStudents}</h3>
            <p>Placed Students</p>
          </div>
        </div>

        <div className="stat-card recruiters">
          <div className="stat-icon">
            <Eye size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.activeRecruiters}</h3>
            <p>Active Recruiters</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Job Postings */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Job Postings</h3>
            <a href="/manage-jobs" className="view-all">Manage All</a>
          </div>
          <div className="jobs-list">
            {recentJobs.map((job) => (
              <div key={job.id} className="job-item">
                <div className="job-info">
                  <div className="job-header">
                    <h4>{job.title}</h4>
                    {getStatusBadge(job.status)}
                  </div>
                  <p className="company-name">{job.company}</p>
                  <div className="job-details">
                    <span className="location">📍 {job.location}</span>
                    <span className="stipend">💰 ₹{job.stipend.toLocaleString()}/month</span>
                  </div>
                  <div className="job-stats">
                    <span className="applications">{job.applications} applications</span>
                    <span className="deadline">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <button className="view-applications-btn">
                  <FileText size={16} />
                  View Applications
                </button>
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
                  <h4>{interview.studentName}</h4>
                  <p className="position">{interview.position}</p>
                  <p className="company">{interview.company}</p>
                  <div className="interview-schedule">
                    <span className="date">
                      <Calendar size={14} />
                      {new Date(interview.date).toLocaleDateString()}
                    </span>
                    <span className="time">
                      <Clock size={14} />
                      {interview.time}
                    </span>
                    <span className={`mode ${interview.mode}`}>
                      {interview.mode === 'online' ? '🔗 Online' : '🏢 Offline'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companies */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Top Recruiting Companies</h3>
            <a href="/recruiters" className="view-all">View All</a>
          </div>
          <div className="companies-list">
            {topCompanies.map((company, index) => (
              <div key={index} className="company-item">
                <div className="company-info">
                  <h4>{company.name}</h4>
                  <div className="company-stats">
                    <span className="placements">{company.placements} placements</span>
                    <span className="avg-stipend">Avg: ₹{company.avgStipend.toLocaleString()}</span>
                  </div>
                </div>
                <div className="company-rank">#{index + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Analytics */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Department-wise Placement</h3>
            <a href="/analytics" className="view-all">
              <BarChart3 size={16} />
              View Analytics
            </a>
          </div>
          <div className="departments-list">
            {departmentStats.map((dept, index) => (
              <div key={index} className="department-item">
                <div className="department-info">
                  <h4>{dept.department}</h4>
                  <div className="placement-stats">
                    <span className="placed">{dept.placed}/{dept.students} placed</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${dept.percentage}%` }}
                      ></div>
                    </div>
                    <span className="percentage">{dept.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementCellDashboard;