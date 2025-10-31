export interface Patient {
  id: string;
  name: string;
  age: number;
  symptoms: string[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
  };
  triageLevel: 'Critical' | 'Moderate' | 'Low';
  waitTime: number;
  status: 'Waiting' | 'Under Care' | 'Discharged';
  arrivalTime: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Admin';
  status: 'On Duty' | 'Off Duty';
  department: string;
}

export interface ResourceMetrics {
  totalBeds: number;
  occupiedBeds: number;
  availableStaff: number;
  totalStaff: number;
  averageWaitTime: number;
  criticalCases: number;
}

// Dummy data for patients
export const dummyPatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Smith',
    age: 55,
    symptoms: ['chest pain', 'nausea', 'dizziness'],
    vitals: {
      bloodPressure: '160/95',
      heartRate: 110,
      temperature: 37.8,
    },
    triageLevel: 'Critical',
    waitTime: 0,
    status: 'Under Care',
    arrivalTime: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: 'P002',
    name: 'Sarah Johnson',
    age: 28,
    symptoms: ['headache', 'fever'],
    vitals: {
      bloodPressure: '120/80',
      heartRate: 85,
      temperature: 38.5,
    },
    triageLevel: 'Moderate',
    waitTime: 45,
    status: 'Waiting',
    arrivalTime: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: 'P003',
    name: 'Robert Davis',
    age: 42,
    symptoms: ['back pain'],
    vitals: {
      bloodPressure: '130/85',
      heartRate: 75,
      temperature: 37.0,
    },
    triageLevel: 'Low',
    waitTime: 90,
    status: 'Waiting',
    arrivalTime: new Date(Date.now() - 90 * 60000).toISOString(),
  },
];

// Dummy data for staff
export const dummyStaff: StaffMember[] = [
  {
    id: 'S001',
    name: 'Dr. Emily Wilson',
    role: 'Doctor',
    status: 'On Duty',
    department: 'Emergency',
  },
  {
    id: 'S002',
    name: 'Nurse Michael Chen',
    role: 'Nurse',
    status: 'On Duty',
    department: 'Emergency',
  },
  {
    id: 'S003',
    name: 'Dr. James Brown',
    role: 'Doctor',
    status: 'Off Duty',
    department: 'Emergency',
  },
];

// Dummy resource metrics
export const dummyResourceMetrics: ResourceMetrics = {
  totalBeds: 50,
  occupiedBeds: 35,
  availableStaff: 8,
  totalStaff: 12,
  averageWaitTime: 45,
  criticalCases: 3,
};

// Dummy AI triage explanations
export const dummyTriageExplanations = {
  'P001': 'High blood pressure (160/95) and elevated heart rate (110 bpm) combined with chest pain indicate potential cardiac event. Immediate attention required.',
  'P002': 'Fever of 38.5°C with headache suggests possible infection. Monitor for deterioration but not immediately life-threatening.',
  'P003': 'Stable vitals with localized back pain. No immediate risk indicators present.',
};

// Weekly patient flow data
export const dummyWeeklyFlow = [
  { day: 'Mon', count: 45 },
  { day: 'Tue', count: 38 },
  { day: 'Wed', count: 52 },
  { day: 'Thu', count: 41 },
  { day: 'Fri', count: 48 },
  { day: 'Sat', count: 37 },
  { day: 'Sun', count: 33 },
];

// Staff allocation suggestions
export const dummyStaffingSuggestions = [
  {
    id: 'SUG001',
    message: 'High number of critical cases (3) - recommend allocating 2 additional nurses to emergency triage',
    priority: 'High',
    department: 'Emergency',
  },
  {
    id: 'SUG002',
    message: 'Current wait time exceeding threshold - consider opening additional triage station',
    priority: 'Medium',
    department: 'Triage',
  },
];