import React, { useState } from 'react';
import { 
  Plus, 
  Save, 
  X, 
  Building, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Tag, 
  Globe, 
  Phone, 
  Mail,
  Upload,
  Eye,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import './PostJob.css';

interface JobFormData {
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  workMode: 'remote' | 'hybrid' | 'onsite';
  jobType: 'internship' | 'full-time' | 'part-time' | 'contract';
  experience: string;
  salary: {
    min: string;
    max: string;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  skills: string[];
  benefits: string[];
  applicationDeadline: string;
  startDate: string;
  duration: string;
  positions: string;
  eligibility: {
    branches: string[];
    years: string[];
    minCGPA: string;
  };
  contactInfo: {
    recruiterName: string;
    email: string;
    phone: string;
    website?: string;
  };
  companyInfo: {
    size: string;
    industry: string;
    founded: string;
    about: string;
  };
}

const PostJob: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    description: '',
    requirements: '',
    responsibilities: '',
    location: '',
    workMode: 'onsite',
    jobType: 'internship',
    experience: '',
    salary: {
      min: '',
      max: '',
      currency: 'USD',
      period: 'monthly'
    },
    skills: [],
    benefits: [],
    applicationDeadline: '',
    startDate: '',
    duration: '',
    positions: '1',
    eligibility: {
      branches: [],
      years: [],
      minCGPA: ''
    },
    contactInfo: {
      recruiterName: '',
      email: '',
      phone: ''
    },
    companyInfo: {
      size: '',
      industry: '',
      founded: '',
      about: ''
    }
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const branches = [
    'Computer Science', 'Information Technology', 'Electronics', 
    'Mechanical', 'Civil', 'Chemical', 'Electrical', 'Aerospace'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Media', 'Government', 'Non-Profit', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-500 employees', '501-1000 employees', '1000+ employees'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof JobFormData] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addBenefit = () => {
    if (currentBenefit.trim() && !formData.benefits.includes(currentBenefit.trim())) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, currentBenefit.trim()]
      }));
      setCurrentBenefit('');
    }
  };

  const removeBenefit = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(b => b !== benefit)
    }));
  };

  const handleBranchToggle = (branch: string) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        branches: prev.eligibility.branches.includes(branch)
          ? prev.eligibility.branches.filter(b => b !== branch)
          : [...prev.eligibility.branches, branch]
      }
    }));
  };

  const handleYearToggle = (year: string) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        years: prev.eligibility.years.includes(year)
          ? prev.eligibility.years.filter(y => y !== year)
          : [...prev.eligibility.years, year]
      }
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.salary.min.trim()) newErrors['salary.min'] = 'Minimum salary is required';
    if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
    if (!formData.contactInfo.email.trim()) newErrors['contactInfo.email'] = 'Contact email is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (formData.eligibility.branches.length === 0) newErrors.branches = 'At least one branch must be selected';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Job posting submitted:', formData);
      
      alert('Job posted successfully!');
      
      // Reset form or redirect
      setFormData({
        title: '',
        company: '',
        description: '',
        requirements: '',
        responsibilities: '',
        location: '',
        workMode: 'onsite',
        jobType: 'internship',
        experience: '',
        salary: {
          min: '',
          max: '',
          currency: 'USD',
          period: 'monthly'
        },
        skills: [],
        benefits: [],
        applicationDeadline: '',
        startDate: '',
        duration: '',
        positions: '1',
        eligibility: {
          branches: [],
          years: [],
          minCGPA: ''
        },
        contactInfo: {
          recruiterName: '',
          email: '',
          phone: ''
        },
        companyInfo: {
          size: '',
          industry: '',
          founded: '',
          about: ''
        }
      });
      
    } catch (error) {
      alert('Error posting job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-job-page">
      <div className="page-header">
        <div>
          <h1>Post New Job</h1>
          <p>Create and publish a new job opportunity for students</p>
        </div>
        <div className="header-actions">
          <button 
            className="preview-btn"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye size={20} />
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="job-form">
          {/* Basic Information */}
          <div className="form-section">
            <h2>
              <Building size={20} />
              Basic Information
            </h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g. Software Engineering Intern"
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="e.g. Google Inc."
                  className={errors.company ? 'error' : ''}
                />
                {errors.company && <span className="error-message">{errors.company}</span>}
              </div>

              <div className="form-group">
                <label>Job Type</label>
                <select
                  value={formData.jobType}
                  onChange={(e) => handleInputChange('jobType', e.target.value)}
                >
                  <option value="internship">Internship</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div className="form-group">
                <label>Work Mode</label>
                <select
                  value={formData.workMode}
                  onChange={(e) => handleInputChange('workMode', e.target.value)}
                >
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                  className={errors.location ? 'error' : ''}
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>

              <div className="form-group">
                <label>Number of Positions</label>
                <input
                  type="number"
                  min="1"
                  value={formData.positions}
                  onChange={(e) => handleInputChange('positions', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Job Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the role, what the intern will be doing, and what they'll learn..."
                rows={6}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group full-width">
              <label>Key Responsibilities</label>
              <textarea
                value={formData.responsibilities}
                onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                placeholder="List the main tasks and responsibilities..."
                rows={4}
              />
            </div>

            <div className="form-group full-width">
              <label>Requirements</label>
              <textarea
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="List the required qualifications and skills..."
                rows={4}
              />
            </div>
          </div>

          {/* Compensation */}
          <div className="form-section">
            <h2>
              <DollarSign size={20} />
              Compensation & Duration
            </h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Minimum Salary *</label>
                <div className="salary-input">
                  <select
                    value={formData.salary.currency}
                    onChange={(e) => handleInputChange('salary.currency', e.target.value)}
                    className="currency-select"
                  >
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <input
                    type="number"
                    value={formData.salary.min}
                    onChange={(e) => handleInputChange('salary.min', e.target.value)}
                    placeholder="5000"
                    className={errors['salary.min'] ? 'error' : ''}
                  />
                  <select
                    value={formData.salary.period}
                    onChange={(e) => handleInputChange('salary.period', e.target.value)}
                    className="period-select"
                  >
                    <option value="hourly">per hour</option>
                    <option value="monthly">per month</option>
                    <option value="yearly">per year</option>
                  </select>
                </div>
                {errors['salary.min'] && <span className="error-message">{errors['salary.min']}</span>}
              </div>

              <div className="form-group">
                <label>Maximum Salary</label>
                <input
                  type="number"
                  value={formData.salary.max}
                  onChange={(e) => handleInputChange('salary.max', e.target.value)}
                  placeholder="8000"
                />
              </div>

              <div className="form-group">
                <label>Application Deadline *</label>
                <input
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                  className={errors.applicationDeadline ? 'error' : ''}
                />
                {errors.applicationDeadline && <span className="error-message">{errors.applicationDeadline}</span>}
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g. 3 months, 6 months"
                />
              </div>

              <div className="form-group">
                <label>Experience Level</label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                >
                  <option value="">Select experience level</option>
                  <option value="entry">Entry Level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="senior">Senior Level</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills & Benefits */}
          <div className="form-section">
            <h2>
              <Tag size={20} />
              Skills & Benefits
            </h2>
            
            <div className="form-group">
              <label>Required Skills *</label>
              <div className="skills-input">
                <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Add a skill and press Enter"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <button type="button" onClick={addSkill} className="add-btn">
                  <Plus size={16} />
                </button>
              </div>
              <div className="tags-list">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              {errors.skills && <span className="error-message">{errors.skills}</span>}
            </div>

            <div className="form-group">
              <label>Benefits & Perks</label>
              <div className="skills-input">
                <input
                  type="text"
                  value={currentBenefit}
                  onChange={(e) => setCurrentBenefit(e.target.value)}
                  placeholder="Add a benefit and press Enter"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                />
                <button type="button" onClick={addBenefit} className="add-btn">
                  <Plus size={16} />
                </button>
              </div>
              <div className="tags-list">
                {formData.benefits.map((benefit, index) => (
                  <span key={index} className="tag">
                    {benefit}
                    <button type="button" onClick={() => removeBenefit(benefit)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="form-section">
            <h2>
              <Users size={20} />
              Eligibility Criteria
            </h2>
            
            <div className="form-group">
              <label>Eligible Branches *</label>
              <div className="checkbox-grid">
                {branches.map(branch => (
                  <label key={branch} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.eligibility.branches.includes(branch)}
                      onChange={() => handleBranchToggle(branch)}
                    />
                    <span className="checkmark"></span>
                    {branch}
                  </label>
                ))}
              </div>
              {errors.branches && <span className="error-message">{errors.branches}</span>}
            </div>

            <div className="form-group">
              <label>Eligible Years</label>
              <div className="checkbox-grid">
                {years.map(year => (
                  <label key={year} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.eligibility.years.includes(year)}
                      onChange={() => handleYearToggle(year)}
                    />
                    <span className="checkmark"></span>
                    {year}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Minimum CGPA</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.eligibility.minCGPA}
                onChange={(e) => handleInputChange('eligibility.minCGPA', e.target.value)}
                placeholder="e.g. 7.0"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h2>
              <Phone size={20} />
              Contact Information
            </h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Recruiter Name</label>
                <input
                  type="text"
                  value={formData.contactInfo.recruiterName}
                  onChange={(e) => handleInputChange('contactInfo.recruiterName', e.target.value)}
                  placeholder="John Smith"
                />
              </div>

              <div className="form-group">
                <label>Contact Email *</label>
                <input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                  placeholder="recruiter@company.com"
                  className={errors['contactInfo.email'] ? 'error' : ''}
                />
                {errors['contactInfo.email'] && <span className="error-message">{errors['contactInfo.email']}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label>Company Website</label>
                <input
                  type="url"
                  value={formData.contactInfo.website}
                  onChange={(e) => handleInputChange('contactInfo.website', e.target.value)}
                  placeholder="https://company.com"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="form-section">
            <h2>
              <Building size={20} />
              Company Information
            </h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Company Size</label>
                <select
                  value={formData.companyInfo.size}
                  onChange={(e) => handleInputChange('companyInfo.size', e.target.value)}
                >
                  <option value="">Select company size</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Industry</label>
                <select
                  value={formData.companyInfo.industry}
                  onChange={(e) => handleInputChange('companyInfo.industry', e.target.value)}
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Founded Year</label>
                <input
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                  value={formData.companyInfo.founded}
                  onChange={(e) => handleInputChange('companyInfo.founded', e.target.value)}
                  placeholder="2020"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>About Company</label>
              <textarea
                value={formData.companyInfo.about}
                onChange={(e) => handleInputChange('companyInfo.about', e.target.value)}
                placeholder="Brief description about the company..."
                rows={4}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-btn">
              Cancel
            </button>
            <button type="button" className="save-draft-btn">
              Save as Draft
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Posting Job...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  Post Job
                </>
              )}
            </button>
          </div>
        </form>

        {/* Preview Panel - Add if showPreview is true */}
        {showPreview && (
          <div className="preview-panel">
            <h3>Job Preview</h3>
            <div className="job-preview">
              <div className="preview-header">
                <h4>{formData.title || 'Job Title'}</h4>
                <p>{formData.company || 'Company Name'}</p>
                <div className="preview-meta">
                  <span><MapPin size={14} />{formData.location || 'Location'}</span>
                  <span><Clock size={14} />{formData.workMode}</span>
                  <span><Building size={14} />{formData.jobType}</span>
                </div>
              </div>
              <div className="preview-content">
                <div className="preview-section">
                  <h5>Description</h5>
                  <p>{formData.description || 'Job description will appear here...'}</p>
                </div>
                {formData.skills.length > 0 && (
                  <div className="preview-section">
                    <h5>Required Skills</h5>
                    <div className="preview-skills">
                      {formData.skills.map((skill, index) => (
                        <span key={index} className="preview-skill">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="preview-section">
                  <h5>Salary</h5>
                  <p>
                    {formData.salary.currency} {formData.salary.min}
                    {formData.salary.max && ` - ${formData.salary.max}`}
                    {` ${formData.salary.period}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostJob;