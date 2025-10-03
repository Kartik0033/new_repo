export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'faculty' | 'placement_cell' | 'recruiter';
  avatar?: string;
}

export interface Student extends User {
  studentId: string;
  department: string;
  year: number;
  cgpa?: number;
  skills: string[];
  resumeUrl?: string;
  phone?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface Faculty extends User {
  employeeId: string;
  department: string;
  designation: string;
}

export interface PlacementCell extends User {
  employeeId: string;
  position: string;
}

export interface Recruiter extends User {
  companyName: string;
  position: string;
  companyWebsite?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  skills: string[];
  stipend?: number;
  duration: string;
  location: string;
  type: 'internship' | 'placement';
  applicationDeadline: string;
  postedDate: string;
  postedBy: string;
  isActive: boolean;
  seats: number;
  appliedCount: number;
}

export interface Application {
  id: string;
  studentId: string;
  internshipId: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview_scheduled' | 'selected' | 'completed';
  appliedDate: string;
  coverLetter?: string;
  facultyApprovalStatus: 'pending' | 'approved' | 'rejected';
  facultyComments?: string;
  interviewDate?: string;
  feedback?: string;
  rating?: number;
}

export interface Interview {
  id: string;
  applicationId: string;
  date: string;
  time: string;
  mode: 'online' | 'offline';
  location?: string;
  meetingLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: string;
  result?: 'selected' | 'rejected' | 'pending';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface DashboardStats {
  totalApplications?: number;
  activeInternships?: number;
  placedStudents?: number;
  pendingApprovals?: number;
  totalStudents?: number;
  totalRecruiters?: number;
  upcomingInterviews?: number;
  completedInternships?: number;
}