import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for prototype
const mockUsers = {
  'student@example.com': {
    id: '1',
    email: 'student@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student' as const,
    studentId: 'CS2021001',
    department: 'Computer Science',
    year: 3,
    cgpa: 8.5,
    skills: ['React', 'JavaScript', 'Python', 'Java'],
    phone: '+91-9876543210'
  },
  'faculty@example.com': {
    id: '2',
    email: 'faculty@example.com',
    firstName: 'Dr. Jane',
    lastName: 'Smith',
    role: 'faculty' as const,
    employeeId: 'FAC001',
    department: 'Computer Science',
    designation: 'Professor'
  },
  'placement@example.com': {
    id: '3',
    email: 'placement@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'placement_cell' as const,
    employeeId: 'PC001',
    position: 'Placement Officer'
  },
  'recruiter@example.com': {
    id: '4',
    email: 'recruiter@example.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    role: 'recruiter' as const,
    companyName: 'TechCorp Solutions',
    position: 'HR Manager',
    companyWebsite: 'https://techcorp.com'
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('cipms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email as keyof typeof mockUsers];
    
    if (mockUser && mockUser.role === role) {
      setUser(mockUser);
      localStorage.setItem('cipms_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials or role mismatch');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cipms_user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};