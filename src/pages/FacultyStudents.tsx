import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  GraduationCap,
  TrendingUp,
  Award,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Building,
  Edit,
  Plus
} from 'lucide-react';
import './FacultyStudents.css';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  branch: string;
  year: string;
  cgpa: number;
  profilePicture?: string;
  skills: string[];
  appliedJobs: number;
  interviewsScheduled: number;
  offersReceived: number;
  status: 'active' | 'placed' | 'inactive';
  placementStatus: 'seeking' | 'placed' | 'not-interested';
  placedCompany?: string;
  placedRole?: string;
  packageAmount?: string;
  lastActive: string;
}

const FacultyStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);

  // Mock data
  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@university.edu',
        phone: '+1 (555) 123-4567',
        studentId: 'STU2024001',
        branch: 'Computer Science',
        year: '4th Year',
        cgpa: 8.5,
        skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
        appliedJobs: 15,
        interviewsScheduled: 5,
        offersReceived: 2,
        status: 'active',
        placementStatus: 'placed',
        placedCompany: 'Google',
        placedRole: 'Software Engineer',
        packageAmount: '$120,000',
        lastActive: '2024-01-20'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@university.edu',
        phone: '+1 (555) 234-5678',
        studentId: 'STU2024002',
        branch: 'Information Technology',
        year: '3rd Year',
        cgpa: 9.2,
        skills: ['Java', 'Spring Boot', 'Angular', 'AWS'],
        appliedJobs: 12,
        interviewsScheduled: 8,
        offersReceived: 0,
        status: 'active',
        placementStatus: 'seeking',
        lastActive: '2024-01-19'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@university.edu',
        phone: '+1 (555) 345-6789',
        studentId: 'STU2024003',
        branch: 'Electronics',
        year: '4th Year',
        cgpa: 7.8,
        skills: ['Embedded Systems', 'IoT', 'C++', 'Arduino'],
        appliedJobs: 8,
        interviewsScheduled: 3,
        offersReceived: 1,
        status: 'active',
        placementStatus: 'placed',
        placedCompany: 'Intel',
        placedRole: 'Hardware Engineer',
        packageAmount: '$95,000',
        lastActive: '2024-01-18'
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@university.edu',
        phone: '+1 (555) 456-7890',
        studentId: 'STU2024004',
        branch: 'Computer Science',
        year: '3rd Year',
        cgpa: 8.9,
        skills: ['Data Science', 'Python', 'TensorFlow', 'SQL'],
        appliedJobs: 20,
        interviewsScheduled: 12,
        offersReceived: 3,
        status: 'active',
        placementStatus: 'seeking',
        lastActive: '2024-01-20'
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@university.edu',
        phone: '+1 (555) 567-8901',
        studentId: 'STU2024005',
        branch: 'Mechanical',
        year: '4th Year',
        cgpa: 7.5,
        skills: ['CAD', 'SolidWorks', 'Manufacturing', 'Quality Control'],
        appliedJobs: 6,
        interviewsScheduled: 2,
        offersReceived: 0,
        status: 'active',
        placementStatus: 'not-interested',
        lastActive: '2024-01-15'
      }
    ];

    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed': return '#27ae60';
      case 'seeking': return '#3498db';
      case 'not-interested': return '#95a5a6';
      default: return '#6c757d';
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === 'all' || student.branch === filterBranch;
    const matchesYear = filterYear === 'all' || student.year === filterYear;
    const matchesStatus = filterStatus === 'all' || student.placementStatus === filterStatus;
    
    return matchesSearch && matchesBranch && matchesYear && matchesStatus;
  });

  const getStats = () => {
    const total = students.length;
    const placed = students.filter(s => s.placementStatus === 'placed').length;
    const seeking = students.filter(s => s.placementStatus === 'seeking').length;
    const avgCGPA = students.reduce((sum, s) => sum + s.cgpa, 0) / students.length;
    const placementRate = (placed / total) * 100;

    return { total, placed, seeking, avgCGPA, placementRate };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="faculty-students-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="faculty-students-page">
      <div className="page-header">
        <div>
          <h1>Students Management</h1>
          <p>Monitor and manage student progress and placements</p>
        </div>
        <div className="header-actions">
          <button className="export-btn">
            <Download size={20} />
            Export Data
          </button>
          <button 
            className="add-student-btn"
            onClick={() => setShowAddStudent(true)}
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon placed">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.placed}</div>
            <div className="stat-label">Placed Students</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon seeking">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.seeking}</div>
            <div className="stat-label">Seeking Placement</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cgpa">
            <Star size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.avgCGPA.toFixed(1)}</div>
            <div className="stat-label">Average CGPA</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon rate">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.placementRate.toFixed(1)}%</div>
            <div className="stat-label">Placement Rate</div>
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
              placeholder="Search students by name, email, or ID..."
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
                <option value="Civil">Civil</option>
                <option value="Chemical">Chemical</option>
              </select>
            </div>
            <div className="filter-group">
              <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                <option value="all">All Years</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div className="filter-group">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="seeking">Seeking Placement</option>
                <option value="placed">Placed</option>
                <option value="not-interested">Not Interested</option>
              </select>
            </div>
          </div>
        </div>
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="results-summary">
        <span>Showing {filteredStudents.length} of {students.length} students</span>
      </div>

      {/* Students Display */}
      {filteredStudents.length === 0 ? (
        <div className="no-results">
          <Users size={48} />
          <h3>No students found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className={`students-container ${viewMode}`}>
          {filteredStudents.map((student) => (
            <div key={student.id} className="student-card">
              <div className="card-header">
                <div className="student-info">
                  <div className="student-avatar">
                    <GraduationCap size={32} />
                  </div>
                  <div className="student-details">
                    <h3>{student.name}</h3>
                    <p className="student-id">{student.studentId}</p>
                    <div className="academic-info">
                      <span className="branch">{student.branch}</span>
                      <span className="year">{student.year}</span>
                      <span className="cgpa">CGPA: {student.cgpa}</span>
                    </div>
                  </div>
                </div>
                <div className="status-badge" style={{ backgroundColor: `${getStatusColor(student.placementStatus)}20`, color: getStatusColor(student.placementStatus) }}>
                  {student.placementStatus === 'placed' && <CheckCircle size={16} />}
                  {student.placementStatus === 'seeking' && <Clock size={16} />}
                  {student.placementStatus === 'not-interested' && <XCircle size={16} />}
                  {student.placementStatus.replace('-', ' ').toUpperCase()}
                </div>
              </div>

              <div className="card-content">
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>{student.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>{student.phone}</span>
                  </div>
                </div>

                <div className="skills-section">
                  <h4>Skills</h4>
                  <div className="skills-list">
                    {student.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                    {student.skills.length > 4 && (
                      <span className="skill-tag more">+{student.skills.length - 4} more</span>
                    )}
                  </div>
                </div>

                <div className="placement-stats">
                  <div className="stat-item">
                    <FileText size={16} />
                    <span>{student.appliedJobs} Applications</span>
                  </div>
                  <div className="stat-item">
                    <Calendar size={16} />
                    <span>{student.interviewsScheduled} Interviews</span>
                  </div>
                  <div className="stat-item">
                    <Award size={16} />
                    <span>{student.offersReceived} Offers</span>
                  </div>
                </div>

                {student.placementStatus === 'placed' && student.placedCompany && (
                  <div className="placement-info">
                    <div className="placement-details">
                      <Building size={16} />
                      <div>
                        <strong>{student.placedCompany}</strong>
                        <p>{student.placedRole} • {student.packageAmount}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="card-footer">
                <button 
                  className="action-btn secondary"
                  onClick={() => setSelectedStudent(student)}
                >
                  <Eye size={16} />
                  View Profile
                </button>
                <button className="action-btn secondary">
                  <MessageSquare size={16} />
                  Message
                </button>
                <button className="action-btn primary">
                  <Edit size={16} />
                  Edit Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Student Detail Modal - Add this later if needed */}
    </div>
  );
};

export default FacultyStudents;