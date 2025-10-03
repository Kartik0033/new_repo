import React, { useState, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Upload,
  Eye,
  Star,
  Award,
  Briefcase,
  TrendingUp,
  Phone,
  Mail,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Camera
} from 'lucide-react';
import './RecruiterProfile.css';

interface CompanyProfile {
  id: string;
  name: string;
  logo?: string;
  tagline: string;
  description: string;
  industry: string;
  companySize: string;
  foundedYear: number;
  headquarters: string;
  website: string;
  linkedIn?: string;
  twitter?: string;
  email: string;
  phone: string;
  locations: string[];
  benefits: string[];
  technologies: string[];
  certifications: string[];
  awards: string[];
  culture: {
    values: string[];
    workEnvironment: string;
    diversityAndInclusion: string;
  };
  stats: {
    totalEmployees: number;
    openPositions: number;
    hiringRate: number;
    averageRating: number;
  };
  gallery: string[];
  videos: string[];
  socialResponsibility: string;
  careerGrowth: string;
  workLifeBalance: string;
}

const RecruiterProfile: React.FC = () => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editedProfile, setEditedProfile] = useState<CompanyProfile | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  useEffect(() => {
    const mockProfile: CompanyProfile = {
      id: '1',
      name: 'TechCorp Solutions',
      tagline: 'Innovating the Future of Technology',
      description: 'TechCorp Solutions is a leading technology company specializing in cloud computing, artificial intelligence, and digital transformation solutions. We help businesses modernize their operations and achieve sustainable growth through cutting-edge technology.',
      industry: 'Information Technology',
      companySize: '1000-5000 employees',
      foundedYear: 2010,
      headquarters: 'San Francisco, CA',
      website: 'https://techcorp.com',
      linkedIn: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
      email: 'careers@techcorp.com',
      phone: '+1 (555) 123-4567',
      locations: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA'],
      benefits: [
        'Comprehensive Health Insurance',
        'Flexible Work Arrangements',
        'Professional Development Budget',
        'Stock Options',
        'Unlimited PTO',
        'Gym Membership',
        'Free Meals',
        'Mental Health Support'
      ],
      technologies: [
        'React', 'Node.js', 'Python', 'AWS', 'Docker', 
        'Kubernetes', 'TypeScript', 'GraphQL', 'MongoDB', 'PostgreSQL'
      ],
      certifications: [
        'ISO 27001 Certified',
        'SOC 2 Type II',
        'AWS Advanced Consulting Partner',
        'Google Cloud Partner'
      ],
      awards: [
        'Best Places to Work 2023',
        'Tech Innovation Award 2022',
        'Diversity & Inclusion Excellence 2023'
      ],
      culture: {
        values: ['Innovation', 'Integrity', 'Collaboration', 'Excellence', 'Diversity'],
        workEnvironment: 'We foster a collaborative and inclusive environment where every team member can thrive and contribute their unique perspectives.',
        diversityAndInclusion: 'We are committed to building a diverse workforce and creating an inclusive culture where everyone feels valued and empowered.'
      },
      stats: {
        totalEmployees: 2500,
        openPositions: 45,
        hiringRate: 85,
        averageRating: 4.6
      },
      gallery: [],
      videos: [],
      socialResponsibility: 'TechCorp is committed to making a positive impact on society through technology education initiatives, environmental sustainability programs, and community outreach.',
      careerGrowth: 'We provide clear career progression paths, mentorship programs, and continuous learning opportunities to help our employees reach their full potential.',
      workLifeBalance: 'We believe in maintaining a healthy work-life balance through flexible schedules, remote work options, and comprehensive wellness programs.'
    };

    setTimeout(() => {
      setProfile(mockProfile);
      setEditedProfile(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    if (editedProfile) {
      setProfile(editedProfile);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleInputChange = (field: string, value: any) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [field]: value
      });
    }
  };

  const handleArrayAdd = (field: string, value: string) => {
    if (editedProfile && value.trim()) {
      setEditedProfile({
        ...editedProfile,
        [field]: [...(editedProfile[field as keyof CompanyProfile] as string[]), value.trim()]
      });
    }
  };

  const handleArrayRemove = (field: string, index: number) => {
    if (editedProfile) {
      const array = editedProfile[field as keyof CompanyProfile] as string[];
      setEditedProfile({
        ...editedProfile,
        [field]: array.filter((_, i) => i !== index)
      });
    }
  };

  if (loading) {
    return (
      <div className="recruiter-profile-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading company profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="recruiter-profile-page">
        <div className="error-state">
          <Building2 size={48} />
          <h3>Company Profile Not Found</h3>
          <p>Unable to load company profile information.</p>
        </div>
      </div>
    );
  }

  const currentProfile = isEditing ? editedProfile : profile;

  return (
    <div className="recruiter-profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <div className="company-banner">
          <div className="banner-content">
            <div className="company-logo">
              {currentProfile?.logo ? (
                <img src={currentProfile.logo} alt={currentProfile.name} />
              ) : (
                <Building2 size={48} />
              )}
              {isEditing && (
                <button className="edit-logo-btn">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <div className="company-info">
              {isEditing ? (
                <div className="edit-company-info">
                  <input
                    type="text"
                    value={editedProfile?.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="company-name-input"
                  />
                  <input
                    type="text"
                    value={editedProfile?.tagline || ''}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    className="company-tagline-input"
                    placeholder="Company tagline"
                  />
                </div>
              ) : (
                <div>
                  <h1>{currentProfile?.name}</h1>
                  <p className="tagline">{currentProfile?.tagline}</p>
                </div>
              )}
              <div className="company-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{currentProfile?.headquarters}</span>
                </div>
                <div className="meta-item">
                  <Users size={16} />
                  <span>{currentProfile?.companySize}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>Founded {currentProfile?.foundedYear}</span>
                </div>
                <div className="meta-item">
                  <Star size={16} />
                  <span>{currentProfile?.stats.averageRating}/5.0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="header-actions">
            {isEditing ? (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  <Save size={16} />
                  Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <X size={16} />
                  Cancel
                </button>
              </div>
            ) : (
              <button className="edit-btn" onClick={handleEdit}>
                <Edit3 size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">{currentProfile?.stats.totalEmployees.toLocaleString()}</div>
            <div className="stat-label">Employees</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{currentProfile?.stats.openPositions}</div>
            <div className="stat-label">Open Positions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{currentProfile?.stats.hiringRate}%</div>
            <div className="stat-label">Hiring Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{currentProfile?.locations.length}</div>
            <div className="stat-label">Locations</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-navigation">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'culture' ? 'active' : ''}`}
          onClick={() => setActiveTab('culture')}
        >
          Culture & Values
        </button>
        <button 
          className={`nav-tab ${activeTab === 'benefits' ? 'active' : ''}`}
          onClick={() => setActiveTab('benefits')}
        >
          Benefits & Perks
        </button>
        <button 
          className={`nav-tab ${activeTab === 'technology' ? 'active' : ''}`}
          onClick={() => setActiveTab('technology')}
        >
          Technology Stack
        </button>
        <button 
          className={`nav-tab ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Info
        </button>
      </div>

      {/* Tab Content */}
      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="content-grid">
              <div className="main-content">
                <div className="section">
                  <h2>About Us</h2>
                  {isEditing ? (
                    <textarea
                      value={editedProfile?.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={6}
                      className="description-input"
                    />
                  ) : (
                    <p>{currentProfile?.description}</p>
                  )}
                </div>

                <div className="section">
                  <h2>Awards & Recognition</h2>
                  <div className="awards-list">
                    {currentProfile?.awards.map((award, index) => (
                      <div key={index} className="award-item">
                        <Award size={20} />
                        <span>{award}</span>
                        {isEditing && (
                          <button 
                            onClick={() => handleArrayRemove('awards', index)}
                            className="remove-btn"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="add-item">
                        <input
                          type="text"
                          placeholder="Add new award"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleArrayAdd('awards', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="section">
                  <h2>Certifications</h2>
                  <div className="certifications-list">
                    {currentProfile?.certifications.map((cert, index) => (
                      <div key={index} className="certification-item">
                        <FileText size={20} />
                        <span>{cert}</span>
                        {isEditing && (
                          <button 
                            onClick={() => handleArrayRemove('certifications', index)}
                            className="remove-btn"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="add-item">
                        <input
                          type="text"
                          placeholder="Add new certification"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleArrayAdd('certifications', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="sidebar">
                <div className="info-card">
                  <h3>Company Details</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="label">Industry:</span>
                      <span>{currentProfile?.industry}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Company Size:</span>
                      <span>{currentProfile?.companySize}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Founded:</span>
                      <span>{currentProfile?.foundedYear}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Headquarters:</span>
                      <span>{currentProfile?.headquarters}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <h3>Locations</h3>
                  <div className="locations-list">
                    {currentProfile?.locations.map((location, index) => (
                      <div key={index} className="location-item">
                        <MapPin size={16} />
                        <span>{location}</span>
                        {isEditing && (
                          <button 
                            onClick={() => handleArrayRemove('locations', index)}
                            className="remove-btn"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="add-item">
                        <input
                          type="text"
                          placeholder="Add new location"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleArrayAdd('locations', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="culture-tab">
            <div className="section">
              <h2>Company Values</h2>
              <div className="values-grid">
                {currentProfile?.culture.values.map((value, index) => (
                  <div key={index} className="value-card">
                    <span>{value}</span>
                    {isEditing && (
                      <button 
                        onClick={() => {
                          const newValues = currentProfile.culture.values.filter((_, i) => i !== index);
                          handleInputChange('culture', {
                            ...currentProfile.culture,
                            values: newValues
                          });
                        }}
                        className="remove-btn"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="add-value">
                    <input
                      type="text"
                      placeholder="Add new value"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          const newValues = [...currentProfile!.culture.values, e.currentTarget.value.trim()];
                          handleInputChange('culture', {
                            ...currentProfile!.culture,
                            values: newValues
                          });
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="section">
              <h2>Work Environment</h2>
              {isEditing ? (
                <textarea
                  value={editedProfile?.culture.workEnvironment || ''}
                  onChange={(e) => handleInputChange('culture', {
                    ...editedProfile!.culture,
                    workEnvironment: e.target.value
                  })}
                  rows={4}
                  className="environment-input"
                />
              ) : (
                <p>{currentProfile?.culture.workEnvironment}</p>
              )}
            </div>

            <div className="section">
              <h2>Diversity & Inclusion</h2>
              {isEditing ? (
                <textarea
                  value={editedProfile?.culture.diversityAndInclusion || ''}
                  onChange={(e) => handleInputChange('culture', {
                    ...editedProfile!.culture,
                    diversityAndInclusion: e.target.value
                  })}
                  rows={4}
                  className="diversity-input"
                />
              ) : (
                <p>{currentProfile?.culture.diversityAndInclusion}</p>
              )}
            </div>

            <div className="section">
              <h2>Career Growth</h2>
              {isEditing ? (
                <textarea
                  value={editedProfile?.careerGrowth || ''}
                  onChange={(e) => handleInputChange('careerGrowth', e.target.value)}
                  rows={4}
                  className="career-input"
                />
              ) : (
                <p>{currentProfile?.careerGrowth}</p>
              )}
            </div>

            <div className="section">
              <h2>Work-Life Balance</h2>
              {isEditing ? (
                <textarea
                  value={editedProfile?.workLifeBalance || ''}
                  onChange={(e) => handleInputChange('workLifeBalance', e.target.value)}
                  rows={4}
                  className="balance-input"
                />
              ) : (
                <p>{currentProfile?.workLifeBalance}</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="benefits-tab">
            <div className="section">
              <h2>Employee Benefits</h2>
              <div className="benefits-grid">
                {currentProfile?.benefits.map((benefit, index) => (
                  <div key={index} className="benefit-card">
                    <TrendingUp size={24} />
                    <span>{benefit}</span>
                    {isEditing && (
                      <button 
                        onClick={() => handleArrayRemove('benefits', index)}
                        className="remove-btn"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="add-benefit">
                    <Plus size={24} />
                    <input
                      type="text"
                      placeholder="Add new benefit"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleArrayAdd('benefits', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technology' && (
          <div className="technology-tab">
            <div className="section">
              <h2>Technology Stack</h2>
              <div className="tech-grid">
                {currentProfile?.technologies.map((tech, index) => (
                  <div key={index} className="tech-tag">
                    <span>{tech}</span>
                    {isEditing && (
                      <button 
                        onClick={() => handleArrayRemove('technologies', index)}
                        className="remove-btn"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="add-tech">
                    <input
                      type="text"
                      placeholder="Add technology"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleArrayAdd('technologies', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="contact-tab">
            <div className="contact-grid">
              <div className="contact-section">
                <h2>Contact Information</h2>
                <div className="contact-details">
                  <div className="contact-item">
                    <Mail size={20} />
                    <div>
                      <label>Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedProfile?.email || ''}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      ) : (
                        <span>{currentProfile?.email}</span>
                      )}
                    </div>
                  </div>
                  <div className="contact-item">
                    <Phone size={20} />
                    <div>
                      <label>Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedProfile?.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      ) : (
                        <span>{currentProfile?.phone}</span>
                      )}
                    </div>
                  </div>
                  <div className="contact-item">
                    <Globe size={20} />
                    <div>
                      <label>Website</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={editedProfile?.website || ''}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                        />
                      ) : (
                        <a href={currentProfile?.website} target="_blank" rel="noopener noreferrer">
                          {currentProfile?.website}
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="social-section">
                <h2>Social Media</h2>
                <div className="social-links">
                  <div className="social-item">
                    <span>LinkedIn</span>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editedProfile?.linkedIn || ''}
                        onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                        placeholder="LinkedIn URL"
                      />
                    ) : (
                      currentProfile?.linkedIn && (
                        <a href={currentProfile.linkedIn} target="_blank" rel="noopener noreferrer">
                          View Profile <ExternalLink size={14} />
                        </a>
                      )
                    )}
                  </div>
                  <div className="social-item">
                    <span>Twitter</span>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editedProfile?.twitter || ''}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        placeholder="Twitter URL"
                      />
                    ) : (
                      currentProfile?.twitter && (
                        <a href={currentProfile.twitter} target="_blank" rel="noopener noreferrer">
                          Follow Us <ExternalLink size={14} />
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfile;