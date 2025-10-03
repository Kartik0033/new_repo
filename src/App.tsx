import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import PlacementCellDashboard from './pages/PlacementCellDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import StudentProfile from './pages/StudentProfile';
import Internships from './pages/Internships';
import Applications from './pages/Applications';
import Interviews from './pages/Interviews';
import Settings from './pages/Settings';
import FacultyStudents from './pages/FacultyStudents';
import PostJob from './pages/PostJob';
import RecruiterCandidates from './pages/RecruiterCandidates';
import RecruiterProfile from './pages/RecruiterProfile';
import './App.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// Main Layout Component
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

// Dashboard Router Component
const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Route based on user role
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'placement_cell':
      return <PlacementCellDashboard />;
    case 'recruiter':
      return <RecruiterDashboard />;
    default:
      return <div className="dashboard"><h1>Dashboard</h1><p>Role not recognized</p></div>;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DashboardRouter />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <StudentProfile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/internships"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Internships />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Applications />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/interviews"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Interviews />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/students"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <FacultyStudents />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/placement/post-job"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <PostJob />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/candidates"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <RecruiterCandidates />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <RecruiterProfile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
