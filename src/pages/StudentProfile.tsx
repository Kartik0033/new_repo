import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Star, Edit, Save, Camera } from 'lucide-react';
import './StudentProfile.css';

const StudentProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91-9876543210',
    studentId: 'CS2021001',
    department: 'Computer Science',
    year: 3,
    cgpa: 8.5,
    address: 'Mumbai, Maharashtra',
    dateOfBirth: '2001-05-15',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    githubUrl: 'https://github.com/johndoe',
    skills: ['React', 'JavaScript', 'Python', 'Java', 'Node.js', 'MongoDB'],
    languages: ['English', 'Hindi', 'Marathi'],
    achievements: [
      'Winner - State Level Coding Competition 2023',
      'Best Student Award - Computer Science Department',
      'Google Developer Student Club Lead'
    ],
    projects: [
      {
        title: 'E-Commerce Web Application',
        description: 'Full-stack web application built with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        link: 'https://github.com/johndoe/ecommerce-app'
      },
      {
        title: 'Task Management Mobile App',
        description: 'Cross-platform mobile app built with React Native',
        technologies: ['React Native', 'Firebase', 'Redux'],
        link: 'https://github.com/johndoe/task-manager'
      }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profile);
  };

  const handleSkillAdd = (newSkill: string) => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="student-profile">
      <div className="profile-header">
        <div className="header-content">
          <h1>My Profile</h1>
          <button 
            className={`edit-btn ${isEditing ? 'save' : 'edit'}`}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? <Save size={18} /> : <Edit size={18} />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="profile-content">
        {/* Basic Information */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Basic Information</h3>
          </div>
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <User size={40} />
              <button className="avatar-edit-btn">
                <Camera size={16} />
              </button>
            </div>
            <div className="profile-basic-info">
              <h2>{profile.firstName} {profile.lastName}</h2>
              <p className="student-id">Student ID: {profile.studentId}</p>
              <p className="department">{profile.department} • Year {profile.year}</p>
              <div className="cgpa-display">
                <Star size={16} />
                <span>CGPA: {profile.cgpa}/10</span>
              </div>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <Mail size={18} />
              <div>
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>
            </div>

            <div className="info-item">
              <Phone size={18} />
              <div>
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="info-item">
              <MapPin size={18} />
              <div>
                <label>Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  />
                ) : (
                  <p>{profile.address}</p>
                )}
              </div>
            </div>

            <div className="info-item">
              <Calendar size={18} />
              <div>
                <label>Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                ) : (
                  <p>{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Skills & Technologies</h3>
          </div>
          <div className="skills-section">
            <div className="skills-list">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  {isEditing && (
                    <button onClick={() => handleSkillRemove(skill)}>×</button>
                  )}
                </span>
              ))}
              {isEditing && (
                <input
                  type="text"
                  placeholder="Add skill..."
                  className="skill-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSkillAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Academic Projects */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Academic Projects</h3>
          </div>
          <div className="projects-list">
            {profile.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h4>{project.title}</h4>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Achievements & Awards</h3>
          </div>
          <div className="achievements-list">
            {profile.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <Star size={16} />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Social Links</h3>
          </div>
          <div className="social-links">
            <div className="social-item">
              <label>LinkedIn</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.linkedinUrl}
                  onChange={(e) => setProfile(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                />
              ) : (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  {profile.linkedinUrl}
                </a>
              )}
            </div>
            <div className="social-item">
              <label>GitHub</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.githubUrl}
                  onChange={(e) => setProfile(prev => ({ ...prev, githubUrl: e.target.value }))}
                />
              ) : (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                  {profile.githubUrl}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;