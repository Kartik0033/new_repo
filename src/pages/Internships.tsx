import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Clock, 
  Briefcase, 
  Star,
  Eye,
  Heart,
  ExternalLink
} from 'lucide-react';
import './Internships.css';

const Internships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    stipend: '',
    duration: '',
    type: ''
  });
  const [savedJobs, setSavedJobs] = useState<string[]>(['1', '3']);

  const internships = [
    {
      id: '1',
      title: 'Full Stack Developer Intern',
      company: 'TechCorp Solutions',
      location: 'Bangalore',
      type: 'internship',
      stipend: 25000,
      duration: '6 months',
      deadline: '2024-10-15',
      postedDate: '2024-09-20',
      description: 'Work on cutting-edge web applications using React, Node.js, and MongoDB. Perfect opportunity to gain hands-on experience in full-stack development.',
      requirements: [
        'Proficiency in JavaScript, React, and Node.js',
        'Basic understanding of databases (MongoDB/MySQL)',
        'Strong problem-solving skills',
        'Good communication skills'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Express.js'],
      applicants: 45,
      isUrgent: false,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Data Science Intern',
      company: 'DataTech Industries',
      location: 'Hyderabad',
      type: 'internship',
      stipend: 22000,
      duration: '4 months',
      deadline: '2024-10-12',
      postedDate: '2024-09-18',
      description: 'Join our data science team to work on machine learning projects and data analysis. Gain experience with Python, pandas, and scikit-learn.',
      requirements: [
        'Strong foundation in Python programming',
        'Knowledge of data analysis libraries (pandas, numpy)',
        'Basic understanding of machine learning concepts',
        'Statistical analysis skills'
      ],
      skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL'],
      applicants: 32,
      isUrgent: true,
      rating: 4.6
    },
    {
      id: '3',
      title: 'Mobile App Developer',
      company: 'MobileTech Solutions',
      location: 'Mumbai',
      type: 'internship',
      stipend: 20000,
      duration: '5 months',
      deadline: '2024-10-20',
      postedDate: '2024-09-25',
      description: 'Develop cross-platform mobile applications using React Native. Work with our experienced team on real-world projects.',
      requirements: [
        'Experience with React Native or Flutter',
        'JavaScript/TypeScript proficiency',
        'Understanding of mobile app architecture',
        'Version control with Git'
      ],
      skills: ['React Native', 'JavaScript', 'TypeScript', 'Redux', 'Firebase'],
      applicants: 28,
      isUrgent: false,
      rating: 4.5
    },
    {
      id: '4',
      title: 'UI/UX Design Intern',
      company: 'DesignHub Creative',
      location: 'Pune',
      type: 'internship',
      stipend: 18000,
      duration: '3 months',
      deadline: '2024-10-18',
      postedDate: '2024-09-22',
      description: 'Create beautiful and intuitive user interfaces. Work on web and mobile app designs using modern design tools.',
      requirements: [
        'Proficiency in Figma, Adobe XD, or Sketch',
        'Understanding of UI/UX principles',
        'Portfolio showcasing design work',
        'Creative thinking and attention to detail'
      ],
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      applicants: 38,
      isUrgent: false,
      rating: 4.7
    },
    {
      id: '5',
      title: 'DevOps Engineering Intern',
      company: 'CloudOps Technologies',
      location: 'Chennai',
      type: 'internship',
      stipend: 24000,
      duration: '6 months',
      deadline: '2024-10-25',
      postedDate: '2024-09-28',
      description: 'Learn cloud infrastructure, CI/CD pipelines, and containerization technologies. Work with AWS, Docker, and Kubernetes.',
      requirements: [
        'Basic knowledge of Linux systems',
        'Understanding of cloud concepts',
        'Familiarity with Docker or containerization',
        'Problem-solving mindset'
      ],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Jenkins'],
      applicants: 19,
      isUrgent: true,
      rating: 4.9
    },
    {
      id: '6',
      title: 'Backend Developer Intern',
      company: 'ServerSide Systems',
      location: 'Delhi',
      type: 'internship',
      stipend: 21000,
      duration: '4 months',
      deadline: '2024-10-22',
      postedDate: '2024-09-26',
      description: 'Build scalable backend systems using Python/Django or Java/Spring. Work on RESTful APIs and database design.',
      requirements: [
        'Strong programming skills in Python or Java',
        'Understanding of REST API development',
        'Database knowledge (PostgreSQL/MySQL)',
        'Version control with Git'
      ],
      skills: ['Python', 'Django', 'PostgreSQL', 'REST API', 'Redis'],
      applicants: 41,
      isUrgent: false,
      rating: 4.4
    }
  ];

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyBadge = (isUrgent: boolean, deadline: string) => {
    const daysRemaining = getDaysRemaining(deadline);
    
    if (isUrgent || daysRemaining <= 3) {
      return <span className="urgency-badge urgent">Urgent</span>;
    } else if (daysRemaining <= 7) {
      return <span className="urgency-badge moderate">Closing Soon</span>;
    }
    return null;
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !selectedFilters.location || internship.location === selectedFilters.location;
    const matchesType = !selectedFilters.type || internship.type === selectedFilters.type;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="internships-page">
      <div className="page-header">
        <h1>Available Internships</h1>
        <p>Discover exciting internship opportunities that match your skills and interests</p>
      </div>

      {/* Search and Filters */}
      <div className="search-filters-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by title, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <Filter size={18} />
            <select 
              value={selectedFilters.location}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
            >
              <option value="">All Locations</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div className="filter-group">
            <select 
              value={selectedFilters.type}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="">All Types</option>
              <option value="internship">Internship</option>
              <option value="placement">Full-time</option>
            </select>
          </div>

          <div className="filter-group">
            <select 
              value={selectedFilters.stipend}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, stipend: e.target.value }))}
            >
              <option value="">All Stipends</option>
              <option value="15000-20000">₹15,000 - ₹20,000</option>
              <option value="20000-25000">₹20,000 - ₹25,000</option>
              <option value="25000+">₹25,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <span>{filteredInternships.length} internships found</span>
        <span>Showing opportunities from top companies</span>
      </div>

      {/* Internships Grid */}
      <div className="internships-grid">
        {filteredInternships.map((internship) => (
          <div key={internship.id} className="internship-card">
            <div className="card-header">
              <div className="title-section">
                <h3>{internship.title}</h3>
                <div className="company-rating">
                  <span className="company-name">{internship.company}</span>
                  <div className="rating">
                    <Star size={14} fill="#ffd700" color="#ffd700" />
                    <span>{internship.rating}</span>
                  </div>
                </div>
              </div>
              <div className="card-actions">
                {getUrgencyBadge(internship.isUrgent, internship.deadline)}
                <button 
                  className={`save-btn ${savedJobs.includes(internship.id) ? 'saved' : ''}`}
                  onClick={() => handleSaveJob(internship.id)}
                >
                  <Heart size={16} fill={savedJobs.includes(internship.id) ? '#e74c3c' : 'none'} />
                </button>
              </div>
            </div>

            <div className="card-content">
              <div className="internship-details">
                <div className="detail-item">
                  <MapPin size={16} />
                  <span>{internship.location}</span>
                </div>
                <div className="detail-item">
                  <Briefcase size={16} />
                  <span>₹{internship.stipend.toLocaleString()}/month</span>
                </div>
                <div className="detail-item">
                  <Clock size={16} />
                  <span>{internship.duration}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="description">
                <p>{internship.description}</p>
              </div>

              <div className="skills-section">
                <h4>Required Skills:</h4>
                <div className="skills-list">
                  {internship.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="applicants-info">
                <div className="applicants-count">
                  <Eye size={14} />
                  <span>{internship.applicants} applicants</span>
                </div>
                <span className="posted-date">
                  Posted {new Date(internship.postedDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="card-footer">
              <button className="view-details-btn">
                <ExternalLink size={16} />
                View Details
              </button>
              <button className="apply-btn">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <div className="no-results">
          <h3>No internships found</h3>
          <p>Try adjusting your search criteria or filters to find more opportunities.</p>
        </div>
      )}
    </div>
  );
};

export default Internships;