import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter,
  Star,
  Download,
  MessageSquare,
  Calendar,
  Eye,
  UserCheck,
  UserX,
  Clock,
  Award,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  Heart,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import './RecruiterCandidates.css';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  branch: string;
  year: string;
  cgpa: number;
  university: string;
  profilePicture?: string;
  skills: string[];
  experience: string[];
  projects: string[];
  resume: string;
  appliedJobs: {
    jobId: string;
    jobTitle: string;
    appliedDate: string;
    status: 'applied' | 'screening' | 'interview' | 'selected' | 'rejected';
  }[];
  interviewScore?: number;
  notes: string;
  tags: string[];
  isShortlisted: boolean;
  availability: string;
  expectedSalary: string;
  lastActive: string;
}

const RecruiterCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSkill, setFilterSkill] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // Mock data
  useEffect(() => {
    const mockCandidates: Candidate[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice.johnson@university.edu',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        branch: 'Computer Science',
        year: '4th Year',
        cgpa: 9.1,
        university: 'Stanford University',
        skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'AWS'],
        experience: ['Software Engineering Intern at Meta', 'Research Assistant'],
        projects: ['E-commerce Platform', 'ML Recommendation System', 'Mobile App'],
        resume: 'alice_johnson_resume.pdf',
        appliedJobs: [
          {
            jobId: '101',
            jobTitle: 'Software Engineering Intern',
            appliedDate: '2024-01-15',
            status: 'interview'
          }
        ],
        interviewScore: 8.5,
        notes: 'Strong technical background, excellent communication skills',
        tags: ['Top Candidate', 'Technical'],
        isShortlisted: true,
        availability: 'Summer 2024',
        expectedSalary: '$8000/month',
        lastActive: '2024-01-20'
      },
      {
        id: '2',
        name: 'Bob Chen',
        email: 'bob.chen@university.edu',
        phone: '+1 (555) 234-5678',
        location: 'Seattle, WA',
        branch: 'Information Technology',
        year: '3rd Year',
        cgpa: 8.7,
        university: 'University of Washington',
        skills: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'Docker'],
        experience: ['Backend Developer Intern at Amazon'],
        projects: ['Microservices Architecture', 'RESTful API Development'],
        resume: 'bob_chen_resume.pdf',
        appliedJobs: [
          {
            jobId: '102',
            jobTitle: 'Backend Developer Intern',
            appliedDate: '2024-01-18',
            status: 'screening'
          }
        ],
        notes: 'Good backend experience, needs improvement in frontend',
        tags: ['Backend Specialist'],
        isShortlisted: false,
        availability: 'Fall 2024',
        expectedSalary: '$7000/month',
        lastActive: '2024-01-19'
      },
      {
        id: '3',
        name: 'Carol Davis',
        email: 'carol.davis@university.edu',
        phone: '+1 (555) 345-6789',
        location: 'Austin, TX',
        branch: 'Computer Science',
        year: '4th Year',
        cgpa: 8.9,
        university: 'University of Texas at Austin',
        skills: ['Data Science', 'Python', 'TensorFlow', 'SQL', 'Tableau'],
        experience: ['Data Analyst Intern at Google'],
        projects: ['Predictive Analytics Dashboard', 'NLP Sentiment Analysis'],
        resume: 'carol_davis_resume.pdf',
        appliedJobs: [
          {
            jobId: '103',
            jobTitle: 'Data Science Intern',
            appliedDate: '2024-01-12',
            status: 'selected'
          }
        ],
        interviewScore: 9.2,
        notes: 'Exceptional analytical skills, great cultural fit',
        tags: ['Selected', 'Data Science'],
        isShortlisted: true,
        availability: 'Summer 2024',
        expectedSalary: '$8500/month',
        lastActive: '2024-01-20'
      },
      {
        id: '4',
        name: 'David Wilson',
        email: 'david.wilson@university.edu',
        phone: '+1 (555) 456-7890',
        location: 'Boston, MA',
        branch: 'Electronics',
        year: '3rd Year',
        cgpa: 7.8,
        university: 'MIT',
        skills: ['Embedded Systems', 'C++', 'IoT', 'Hardware Design'],
        experience: ['Hardware Engineering Intern at Intel'],
        projects: ['IoT Home Automation', 'Embedded Control Systems'],
        resume: 'david_wilson_resume.pdf',
        appliedJobs: [
          {
            jobId: '104',
            jobTitle: 'Hardware Engineering Intern',
            appliedDate: '2024-01-10',
            status: 'rejected'
          }
        ],
        notes: 'Good technical skills but lacks communication',
        tags: ['Hardware'],
        isShortlisted: false,
        availability: 'Spring 2024',
        expectedSalary: '$6500/month',
        lastActive: '2024-01-15'
      }
    ];

    setTimeout(() => {
      setCandidates(mockCandidates);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return '#3498db';
      case 'screening': return '#f39c12';
      case 'interview': return '#9b59b6';
      case 'selected': return '#27ae60';
      case 'rejected': return '#e74c3c';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <Clock size={16} />;
      case 'screening': return <Eye size={16} />;
      case 'interview': return <MessageSquare size={16} />;
      case 'selected': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const allSkills = Array.from(new Set(candidates.flatMap(c => c.skills)));

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBranch = filterBranch === 'all' || candidate.branch === filterBranch;
    const matchesStatus = filterStatus === 'all' || 
                         candidate.appliedJobs.some(job => job.status === filterStatus);
    const matchesSkill = filterSkill === 'all' || candidate.skills.includes(filterSkill);
    
    return matchesSearch && matchesBranch && matchesStatus && matchesSkill;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'cgpa':
        return b.cgpa - a.cgpa;
      case 'applied':
        return new Date(b.appliedJobs[0]?.appliedDate || '').getTime() - 
               new Date(a.appliedJobs[0]?.appliedDate || '').getTime();
      case 'score':
        return (b.interviewScore || 0) - (a.interviewScore || 0);
      default:
        return 0;
    }
  });

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on candidates:`, selectedCandidates);
    // Implement bulk actions here
    setSelectedCandidates([]);
  };

  const handleShortlist = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, isShortlisted: !candidate.isShortlisted }
          : candidate
      )
    );
  };

  if (loading) {
    return (
      <div className="recruiter-candidates-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recruiter-candidates-page">
      <div className="page-header">
        <div>
          <h1>Candidate Management</h1>
          <p>Review and manage job applicants</p>
        </div>
        <div className="header-actions">
          {selectedCandidates.length > 0 && (
            <div className="bulk-actions">
              <button 
                className="bulk-btn shortlist"
                onClick={() => handleBulkAction('shortlist')}
              >
                <Heart size={16} />
                Shortlist ({selectedCandidates.length})
              </button>
              <button 
                className="bulk-btn schedule"
                onClick={() => handleBulkAction('schedule')}
              >
                <Calendar size={16} />
                Schedule Interview
              </button>
              <button 
                className="bulk-btn export"
                onClick={() => handleBulkAction('export')}
              >
                <Download size={16} />
                Export
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{candidates.length}</div>
            <div className="stat-label">Total Candidates</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon shortlisted">
            <Heart size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{candidates.filter(c => c.isShortlisted).length}</div>
            <div className="stat-label">Shortlisted</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon interviewed">
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">
              {candidates.filter(c => c.appliedJobs.some(j => j.status === 'interview')).length}
            </div>
            <div className="stat-label">In Interview</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon selected">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">
              {candidates.filter(c => c.appliedJobs.some(j => j.status === 'selected')).length}
            </div>
            <div className="stat-label">Selected</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="search-filter">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search candidates by name, email, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filters">
            <div className="filter-group">
              <Filter size={18} />
              <select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
                <option value="all">All Branches</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
              </select>
            </div>
            <div className="filter-group">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="filter-group">
              <select value={filterSkill} onChange={(e) => setFilterSkill(e.target.value)}>
                <option value="all">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Sort by Name</option>
                <option value="cgpa">Sort by CGPA</option>
                <option value="applied">Sort by Applied Date</option>
                <option value="score">Sort by Interview Score</option>
              </select>
            </div>
          </div>
        </div>
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="results-summary">
        <span>Showing {sortedCandidates.length} of {candidates.length} candidates</span>
      </div>

      {/* Candidates Display */}
      {sortedCandidates.length === 0 ? (
        <div className="no-results">
          <Users size={48} />
          <h3>No candidates found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className={`candidates-container ${viewMode}`}>
          {sortedCandidates.map((candidate) => (
            <div key={candidate.id} className={`candidate-card ${candidate.isShortlisted ? 'shortlisted' : ''}`}>
              <div className="card-header">
                <div className="candidate-select">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => handleCandidateSelect(candidate.id)}
                  />
                </div>
                <div className="candidate-info">
                  <div className="candidate-avatar">
                    <GraduationCap size={32} />
                  </div>
                  <div className="candidate-details">
                    <h3>{candidate.name}</h3>
                    <p className="university">{candidate.university}</p>
                    <div className="academic-info">
                      <span className="branch">{candidate.branch}</span>
                      <span className="year">{candidate.year}</span>
                      <span className="cgpa">CGPA: {candidate.cgpa}</span>
                    </div>
                  </div>
                </div>
                <div className="card-actions">
                  <button 
                    className={`shortlist-btn ${candidate.isShortlisted ? 'active' : ''}`}
                    onClick={() => handleShortlist(candidate.id)}
                  >
                    <Heart size={16} />
                  </button>
                  {candidate.appliedJobs.map((job, index) => (
                    <div 
                      key={index}
                      className="status-badge"
                      style={{ 
                        backgroundColor: `${getStatusColor(job.status)}20`,
                        color: getStatusColor(job.status)
                      }}
                    >
                      {getStatusIcon(job.status)}
                      {job.status.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-content">
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail size={14} />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={14} />
                    <span>{candidate.phone}</span>
                  </div>
                  <div className="contact-item">
                    <MapPin size={14} />
                    <span>{candidate.location}</span>
                  </div>
                </div>

                <div className="skills-section">
                  <h4>Skills</h4>
                  <div className="skills-list">
                    {candidate.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                    {candidate.skills.length > 4 && (
                      <span className="skill-tag more">+{candidate.skills.length - 4}</span>
                    )}
                  </div>
                </div>

                {candidate.experience.length > 0 && (
                  <div className="experience-section">
                    <h4>Experience</h4>
                    <ul>
                      {candidate.experience.slice(0, 2).map((exp, index) => (
                        <li key={index}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {candidate.interviewScore && (
                  <div className="score-section">
                    <h4>Interview Score</h4>
                    <div className="score-display">
                      <Star size={16} />
                      <span>{candidate.interviewScore}/10</span>
                    </div>
                  </div>
                )}

                {candidate.notes && (
                  <div className="notes-section">
                    <h4>Notes</h4>
                    <p>{candidate.notes}</p>
                  </div>
                )}

                <div className="candidate-meta">
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>Available: {candidate.availability}</span>
                  </div>
                  <div className="meta-item">
                    <DollarSign size={14} />
                    <span>Expected: {candidate.expectedSalary}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button className="action-btn secondary">
                  <FileText size={16} />
                  View Resume
                </button>
                <button className="action-btn secondary">
                  <MessageSquare size={16} />
                  Message
                </button>
                <button className="action-btn secondary">
                  <Calendar size={16} />
                  Schedule
                </button>
                <button className="action-btn primary">
                  <Eye size={16} />
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterCandidates;