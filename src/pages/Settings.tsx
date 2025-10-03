import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Eye, 
  EyeOff,
  Save,
  Upload,
  Download,
  Trash2,
  Shield,
  Globe,
  Smartphone,
  Calendar,
  FileText,
  Settings as SettingsIcon,
  ChevronRight,
  Clock
} from 'lucide-react';
import './Settings.css';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    studentId: 'STU2024001',
    branch: 'Computer Science',
    year: '3rd Year',
    bio: 'Passionate computer science student with experience in full-stack development and machine learning.'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    applicationUpdates: true,
    interviewReminders: true,
    newOpportunities: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowRecruiterContact: true,
    shareAnalytics: true
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light'
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile updated:', profileData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // Handle password change
    console.log('Password changed');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy({ ...privacy, [key]: value });
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'data', label: 'Data & Export', icon: Download }
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-container">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
                <ChevronRight size={16} className="nav-arrow" />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Profile Information</h2>
                <p>Update your personal information and profile details</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="profile-form">
                <div className="profile-avatar">
                  <div className="avatar-container">
                    <div className="avatar">
                      <User size={48} />
                    </div>
                    <button type="button" className="avatar-upload">
                      <Upload size={16} />
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Student ID</label>
                    <input
                      type="text"
                      value={profileData.studentId}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Branch</label>
                    <select
                      value={profileData.branch}
                      onChange={(e) => setProfileData({ ...profileData, branch: e.target.value })}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="Chemical">Chemical</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <select
                      value={profileData.year}
                      onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Security Settings</h2>
                <p>Manage your password and account security</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="security-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="password-input">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-input">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="password-input">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    <Lock size={16} />
                    Change Password
                  </button>
                </div>
              </form>

              <div className="security-options">
                <h3>Two-Factor Authentication</h3>
                <div className="security-option">
                  <div className="option-info">
                    <Smartphone size={20} />
                    <div>
                      <h4>SMS Authentication</h4>
                      <p>Receive verification codes via SMS</p>
                    </div>
                  </div>
                  <button className="enable-btn">Enable</button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Notification Preferences</h2>
                <p>Choose how you want to be notified about updates</p>
              </div>

              <div className="notifications-grid">
                <div className="notification-category">
                  <h3>
                    <Mail size={20} />
                    Email Notifications
                  </h3>
                  <div className="notification-options">
                    <div className="notification-item">
                      <div className="notification-info">
                        <h4>Email Notifications</h4>
                        <p>Receive notifications via email</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="notification-item">
                      <div className="notification-info">
                        <h4>Application Updates</h4>
                        <p>Get notified about application status changes</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notifications.applicationUpdates}
                          onChange={(e) => handleNotificationChange('applicationUpdates', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="notification-item">
                      <div className="notification-info">
                        <h4>New Opportunities</h4>
                        <p>Be the first to know about new internships</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notifications.newOpportunities}
                          onChange={(e) => handleNotificationChange('newOpportunities', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="notification-category">
                  <h3>
                    <Smartphone size={20} />
                    SMS Notifications
                  </h3>
                  <div className="notification-options">
                    <div className="notification-item">
                      <div className="notification-info">
                        <h4>SMS Notifications</h4>
                        <p>Receive notifications via SMS</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notifications.smsNotifications}
                          onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="notification-item">
                      <div className="notification-info">
                        <h4>Interview Reminders</h4>
                        <p>Get SMS reminders for upcoming interviews</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notifications.interviewReminders}
                          onChange={(e) => handleNotificationChange('interviewReminders', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="notification-category">
                  <h3>
                    <Calendar size={20} />
                    Digest & Marketing
                  </h3>
                  <div className="notification-options">
                    <div className="notification-item">
                      <div className="notification-info">
                        <h4>Weekly Digest</h4>
                        <p>Receive a weekly summary of your activity</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notifications.weeklyDigest}
                          onChange={(e) => handleNotificationChange('weeklyDigest', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="notification-item">
                      <div className="notification-info">
                        <h4>Marketing Emails</h4>
                        <p>Receive promotional emails and tips</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notifications.marketingEmails}
                          onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="save-btn">
                  <Save size={16} />
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Privacy Settings</h2>
                <p>Control your privacy and data sharing preferences</p>
              </div>

              <div className="privacy-options">
                <div className="privacy-group">
                  <h3>Profile Visibility</h3>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="public"
                        checked={privacy.profileVisibility === 'public'}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      />
                      <span className="radio-custom"></span>
                      <div>
                        <strong>Public</strong>
                        <p>Your profile is visible to all recruiters and companies</p>
                      </div>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="limited"
                        checked={privacy.profileVisibility === 'limited'}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      />
                      <span className="radio-custom"></span>
                      <div>
                        <strong>Limited</strong>
                        <p>Only pre-approved companies can view your profile</p>
                      </div>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="private"
                        checked={privacy.profileVisibility === 'private'}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      />
                      <span className="radio-custom"></span>
                      <div>
                        <strong>Private</strong>
                        <p>Your profile is only visible to you</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="privacy-group">
                  <h3>Contact Information</h3>
                  <div className="privacy-toggles">
                    <div className="privacy-item">
                      <div className="privacy-info">
                        <h4>Show Email Address</h4>
                        <p>Allow recruiters to see your email address</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={privacy.showEmail}
                          onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="privacy-item">
                      <div className="privacy-info">
                        <h4>Show Phone Number</h4>
                        <p>Allow recruiters to see your phone number</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={privacy.showPhone}
                          onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="privacy-group">
                  <h3>Recruiter Communication</h3>
                  <div className="privacy-toggles">
                    <div className="privacy-item">
                      <div className="privacy-info">
                        <h4>Allow Recruiter Contact</h4>
                        <p>Let recruiters contact you directly</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={privacy.allowRecruiterContact}
                          onChange={(e) => handlePrivacyChange('allowRecruiterContact', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="privacy-item">
                      <div className="privacy-info">
                        <h4>Share Analytics</h4>
                        <p>Help improve the platform with anonymous usage data</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={privacy.shareAnalytics}
                          onChange={(e) => handlePrivacyChange('shareAnalytics', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="save-btn">
                  <Save size={16} />
                  Save Privacy Settings
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>General Preferences</h2>
                <p>Customize your experience and interface preferences</p>
              </div>

              <div className="preferences-grid">
                <div className="form-group">
                  <label>
                    <Globe size={16} />
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <Clock size={16} />
                    Timezone
                  </label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  >
                    <option value="America/New_York">Eastern Time (EST)</option>
                    <option value="America/Chicago">Central Time (CST)</option>
                    <option value="America/Denver">Mountain Time (MST)</option>
                    <option value="America/Los_Angeles">Pacific Time (PST)</option>
                    <option value="Asia/Kolkata">India Standard Time (IST)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <Calendar size={16} />
                    Date Format
                  </label>
                  <select
                    value={preferences.dateFormat}
                    onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <Eye size={16} />
                    Theme
                  </label>
                  <select
                    value={preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="save-btn">
                  <Save size={16} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Data & Export Tab */}
          {activeTab === 'data' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Data Management</h2>
                <p>Download your data or delete your account</p>
              </div>

              <div className="data-options">
                <div className="data-option">
                  <div className="option-info">
                    <Download size={24} />
                    <div>
                      <h3>Export Your Data</h3>
                      <p>Download a copy of all your data including profile, applications, and activity history</p>
                    </div>
                  </div>
                  <button className="export-btn">
                    <FileText size={16} />
                    Request Export
                  </button>
                </div>

                <div className="data-option danger">
                  <div className="option-info">
                    <Trash2 size={24} />
                    <div>
                      <h3>Delete Account</h3>
                      <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                    </div>
                  </div>
                  <button className="delete-btn">
                    <Trash2 size={16} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;