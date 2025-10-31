export type UserRole = 'admin' | 'doctor' | 'nurse' | 'staff';

export interface MedflowUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  specialization?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Ward {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  staffAssigned: string[];
  specialization?: string;
  status: 'operational' | 'maintenance' | 'full';
}

export interface AIAllocation {
  wardId: string;
  recommendedStaff: {
    role: 'doctor' | 'nurse';
    count: number;
    reason: string;
  }[];
  occupancyPrediction: number;
  urgencyLevel: 'low' | 'medium' | 'high';
  suggestedActions: string[];
}

export interface AIChat {
  id: string;
  timestamp: string;
  role: 'user' | 'assistant';
  content: string;
  context?: {
    patientId?: string;
    wardId?: string;
    dataReferences?: string[];
  };
}

export interface Settings {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    urgentOnly: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    contrast: 'normal' | 'high';
  };
  permissions: {
    role: UserRole;
    allowedActions: string[];
  };
}