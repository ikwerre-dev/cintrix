import { Message } from './conversation';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Patient data interface matching the frontend
export interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  triage: string;
  waitTime: string;
  medicalHistory?: string[];
  allergies?: string[];
  medications?: string[];
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
    temperature?: number;
    oxygenSaturation?: number;
  };
  assignedDoctor?: number;
  assignedNurse?: number;
  admissionDate?: string;
  lastVisit?: string;
  insuranceProvider?: string;
  emergencyContact?: string;
}

// Extended patient data with detailed medical histories
export const patients: Patient[] = [
  { 
    id: 1, 
    name: 'John Smith', 
    age: 45, 
    condition: 'Chest Pain', 
    triage: 'Urgent', 
    waitTime: '25 mins',
    medicalHistory: ['Hypertension (diagnosed 2018)', 'Type 2 Diabetes (diagnosed 2019)', 'Appendectomy (2010)'],
    allergies: ['Penicillin', 'Shellfish'],
    medications: ['Lisinopril 10mg daily', 'Metformin 500mg twice daily', 'Aspirin 81mg daily'],
    vitalSigns: {
      bloodPressure: '145/92',
      heartRate: 88,
      respiratoryRate: 18,
      temperature: 37.1,
      oxygenSaturation: 97
    },
    assignedDoctor: 101,
    assignedNurse: 201,
    admissionDate: '2023-06-15T08:45:00',
    lastVisit: '2023-03-22',
    insuranceProvider: 'Blue Cross Blue Shield',
    emergencyContact: 'Mary Smith (Wife) - 555-123-4567'
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    age: 32, 
    condition: 'Broken Arm', 
    triage: 'Standard', 
    waitTime: '45 mins',
    medicalHistory: ['Asthma (childhood onset)', 'Anxiety disorder (diagnosed 2020)'],
    allergies: ['Latex', 'Sulfa drugs'],
    medications: ['Albuterol inhaler as needed', 'Sertraline 50mg daily'],
    vitalSigns: {
      bloodPressure: '118/75',
      heartRate: 82,
      respiratoryRate: 16,
      temperature: 36.8,
      oxygenSaturation: 99
    },
    assignedDoctor: 103,
    assignedNurse: 202,
    admissionDate: '2023-06-15T09:30:00',
    lastVisit: '2022-11-14',
    insuranceProvider: 'Aetna',
    emergencyContact: 'David Johnson (Brother) - 555-987-6543'
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    age: 67, 
    condition: 'Shortness of Breath', 
    triage: 'Emergency', 
    waitTime: '5 mins',
    medicalHistory: ['COPD (diagnosed 2015)', 'Coronary Artery Disease (diagnosed 2018)', 'Hip Replacement (2019)'],
    allergies: ['Codeine', 'Contrast dye'],
    medications: ['Symbicort inhaler twice daily', 'Atorvastatin 40mg daily', 'Clopidogrel 75mg daily'],
    vitalSigns: {
      bloodPressure: '160/95',
      heartRate: 102,
      respiratoryRate: 24,
      temperature: 37.9,
      oxygenSaturation: 88
    },
    assignedDoctor: 101,
    assignedNurse: 201,
    admissionDate: '2023-06-15T07:15:00',
    lastVisit: '2023-05-03',
    insuranceProvider: 'Medicare',
    emergencyContact: 'Jennifer Brown (Daughter) - 555-789-0123'
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    age: 28, 
    condition: 'Migraine', 
    triage: 'Standard', 
    waitTime: '50 mins',
    medicalHistory: ['Chronic migraines (diagnosed 2018)', 'Depression (diagnosed 2020)'],
    allergies: ['NSAIDs'],
    medications: ['Sumatriptan as needed', 'Propranolol 40mg daily', 'Fluoxetine 20mg daily'],
    vitalSigns: {
      bloodPressure: '110/70',
      heartRate: 75,
      respiratoryRate: 14,
      temperature: 36.6,
      oxygenSaturation: 99
    },
    assignedDoctor: 103,
    assignedNurse: 202,
    admissionDate: '2023-06-15T10:15:00',
    lastVisit: '2023-04-18',
    insuranceProvider: 'United Healthcare',
    emergencyContact: 'Michael Davis (Husband) - 555-456-7890'
  },
  { 
    id: 5, 
    name: 'Robert Wilson', 
    age: 72, 
    condition: 'Dizziness', 
    triage: 'Urgent', 
    waitTime: '30 mins',
    medicalHistory: ['Atrial Fibrillation (diagnosed 2016)', 'Stroke (2020)', 'Hyperlipidemia (diagnosed 2010)'],
    allergies: ['Amoxicillin'],
    medications: ['Warfarin 5mg daily', 'Digoxin 0.125mg daily', 'Atorvastatin 20mg daily'],
    vitalSigns: {
      bloodPressure: '135/85',
      heartRate: 92,
      respiratoryRate: 18,
      temperature: 37.0,
      oxygenSaturation: 96
    },
    assignedDoctor: 102,
    assignedNurse: 203,
    admissionDate: '2023-06-15T09:00:00',
    lastVisit: '2023-02-27',
    insuranceProvider: 'Medicare',
    emergencyContact: 'Susan Wilson (Wife) - 555-234-5678'
  },
  { 
    id: 6, 
    name: 'Jennifer Martinez', 
    age: 35, 
    condition: 'Abdominal Pain', 
    triage: 'Urgent', 
    waitTime: '35 mins',
    medicalHistory: ['Irritable Bowel Syndrome (diagnosed 2019)', 'Ovarian cyst removal (2021)'],
    allergies: ['Erythromycin'],
    medications: ['Dicyclomine 10mg as needed', 'Oral contraceptives'],
    vitalSigns: {
      bloodPressure: '125/80',
      heartRate: 88,
      respiratoryRate: 16,
      temperature: 37.8,
      oxygenSaturation: 98
    },
    assignedDoctor: 103,
    assignedNurse: 202,
    admissionDate: '2023-06-15T11:30:00',
    lastVisit: '2023-01-15',
    insuranceProvider: 'Cigna',
    emergencyContact: 'Carlos Martinez (Husband) - 555-345-6789'
  },
  { 
    id: 7, 
    name: 'William Taylor', 
    age: 58, 
    condition: 'Lower Back Pain', 
    triage: 'Standard', 
    waitTime: '55 mins',
    medicalHistory: ['Herniated disc L4-L5 (diagnosed 2017)', 'Hypertension (diagnosed 2015)'],
    allergies: ['None reported'],
    medications: ['Hydrochlorothiazide 25mg daily', 'Cyclobenzaprine 10mg as needed', 'Ibuprofen 800mg as needed'],
    vitalSigns: {
      bloodPressure: '142/88',
      heartRate: 76,
      respiratoryRate: 15,
      temperature: 36.7,
      oxygenSaturation: 98
    },
    assignedDoctor: 105,
    assignedNurse: 204,
    admissionDate: '2023-06-15T12:00:00',
    lastVisit: '2023-03-10',
    insuranceProvider: 'Humana',
    emergencyContact: 'Elizabeth Taylor (Wife) - 555-456-7890'
  },
  { 
    id: 8, 
    name: 'Sophia Lee', 
    age: 4, 
    condition: 'High Fever', 
    triage: 'Urgent', 
    waitTime: '20 mins',
    medicalHistory: ['Recurrent ear infections', 'Eczema (diagnosed 2021)'],
    allergies: ['Amoxicillin'],
    medications: ['Children\'s Tylenol as needed'],
    vitalSigns: {
      bloodPressure: '95/60',
      heartRate: 120,
      respiratoryRate: 22,
      temperature: 39.2,
      oxygenSaturation: 97
    },
    assignedDoctor: 104,
    assignedNurse: 204,
    admissionDate: '2023-06-15T10:45:00',
    lastVisit: '2023-05-22',
    insuranceProvider: 'Blue Cross Blue Shield',
    emergencyContact: 'Grace Lee (Mother) - 555-567-8901'
  },
  { 
    id: 9, 
    name: 'James Wilson', 
    age: 42, 
    condition: 'Laceration on Hand', 
    triage: 'Standard', 
    waitTime: '40 mins',
    medicalHistory: ['Type 1 Diabetes (diagnosed at age 15)', 'Mild depression (diagnosed 2020)'],
    allergies: ['Adhesive tape'],
    medications: ['Insulin (pump)', 'Escitalopram 10mg daily'],
    vitalSigns: {
      bloodPressure: '128/82',
      heartRate: 78,
      respiratoryRate: 16,
      temperature: 36.9,
      oxygenSaturation: 99
    },
    assignedDoctor: 106,
    assignedNurse: 206,
    admissionDate: '2023-06-15T11:15:00',
    lastVisit: '2023-04-05',
    insuranceProvider: 'Aetna',
    emergencyContact: 'Rebecca Wilson (Wife) - 555-678-9012'
  },
  { 
    id: 10, 
    name: 'Maria Garcia', 
    age: 68, 
    condition: 'Pneumonia', 
    triage: 'Emergency', 
    waitTime: '10 mins',
    medicalHistory: ['Breast cancer (remission since 2018)', 'Osteoporosis (diagnosed 2019)', 'Hypertension (diagnosed 2010)'],
    allergies: ['Sulfa drugs', 'Contrast dye'],
    medications: ['Alendronate 70mg weekly', 'Lisinopril 20mg daily', 'Calcium + Vitamin D supplement daily'],
    vitalSigns: {
      bloodPressure: '150/90',
      heartRate: 98,
      respiratoryRate: 22,
      temperature: 38.5,
      oxygenSaturation: 91
    },
    assignedDoctor: 102,
    assignedNurse: 203,
    admissionDate: '2023-06-15T08:30:00',
    lastVisit: '2023-05-15',
    insuranceProvider: 'Medicare',
    emergencyContact: 'Jose Garcia (Son) - 555-789-0123'
  }
];

// Hospital data
export const hospitalData = {
  capacity: {
    current: 78,
    trend: '+5% from yesterday',
    departments: {
      emergency: 85,
      general: 72,
      icu: 90,
      pediatrics: 65,
      maternity: 70,
      surgery: 88
    },
    recommendation: 'Consider preparing additional beds in Ward C'
  },
  staffing: {
    emergency: { current: 8, recommended: 10 },
    general: { current: 15, recommended: 12 },
    icu: { current: 6, recommended: 6 },
    pediatrics: { current: 7, recommended: 8 },
    maternity: { current: 5, recommended: 5 },
    surgery: { current: 9, recommended: 10 }
  },
  patientFlow: {
    averageWaitTime: '37 minutes',
    bottlenecks: ['Radiology (average delay: 42 minutes)', 'Lab Tests (average delay: 28 minutes)'],
    recommendation: 'Add one additional technician to Radiology during peak hours (10am-2pm)'
  },
  doctors: [
    { id: 101, name: "Dr. James Wilson", specialty: "Emergency Medicine", shift: "Morning", patients: [1, 3] },
    { id: 102, name: "Dr. Lisa Chen", specialty: "Cardiology", shift: "Evening", patients: [5] },
    { id: 103, name: "Dr. Michael Rodriguez", specialty: "General Practice", shift: "Night", patients: [2, 4] },
    { id: 104, name: "Dr. Sarah Johnson", specialty: "Pediatrics", shift: "Morning", patients: [] },
    { id: 105, name: "Dr. Robert Williams", specialty: "Neurology", shift: "Evening", patients: [] },
    { id: 106, name: "Dr. Emily Davis", specialty: "Surgery", shift: "Morning", patients: [] }
  ],
  nurses: [
    { id: 201, name: "Nurse Emma Thompson", ward: "Emergency", shift: "Morning", patients: [1, 3] },
    { id: 202, name: "Nurse David Clark", ward: "General", shift: "Evening", patients: [2, 4] },
    { id: 203, name: "Nurse Maria Gonzalez", ward: "ICU", shift: "Night", patients: [5] },
    { id: 204, name: "Nurse John Smith", ward: "Pediatrics", shift: "Morning", patients: [] },
    { id: 205, name: "Nurse Patricia Lee", ward: "Maternity", shift: "Evening", patients: [] },
    { id: 206, name: "Nurse Thomas Brown", ward: "Surgery", shift: "Night", patients: [] }
  ],
  wards: [
    { id: 301, name: "Emergency Ward", beds: 20, occupiedBeds: 17, nurses: [201], doctors: [101] },
    { id: 302, name: "General Ward A", beds: 30, occupiedBeds: 22, nurses: [202], doctors: [103] },
    { id: 303, name: "ICU", beds: 15, occupiedBeds: 13, nurses: [203], doctors: [102] },
    { id: 304, name: "Pediatrics Ward", beds: 25, occupiedBeds: 16, nurses: [204], doctors: [104] },
    { id: 305, name: "Maternity Ward", beds: 20, occupiedBeds: 14, nurses: [205], doctors: [] },
    { id: 306, name: "Surgery Ward", beds: 25, occupiedBeds: 22, nurses: [206], doctors: [106] }
  ],
  equipment: {
    ventilators: { total: 25, inUse: 18 },
    xrayMachines: { total: 5, inUse: 4, maintenance: 1 },
    mriScanners: { total: 2, inUse: 2, waitlist: 7 },
    ctScanners: { total: 3, inUse: 2, waitlist: 3 },
    ambulances: { total: 8, available: 5, dispatched: 3 }
  }
};

// Generate system prompt with context
export const generateSystemPrompt = () => {
  const patientInfo = patients.map(p => 
    `Patient ID: ${p.id}, Name: ${p.name}, Age: ${p.age}, Condition: ${p.condition}, Triage: ${p.triage}, Wait Time: ${p.waitTime}`
  ).join('\n');

  const doctorInfo = hospitalData.doctors.map(d => 
    `Doctor ID: ${d.id}, Name: ${d.name}, Specialty: ${d.specialty}, Shift: ${d.shift}, Assigned Patients: ${d.patients.length > 0 ? d.patients.join(', ') : 'None'}`
  ).join('\n');

  const nurseInfo = hospitalData.nurses.map(n => 
    `Nurse ID: ${n.id}, Name: ${n.name}, Ward: ${n.ward}, Shift: ${n.shift}, Assigned Patients: ${n.patients.length > 0 ? n.patients.join(', ') : 'None'}`
  ).join('\n');

  const wardInfo = hospitalData.wards.map(w => 
    `Ward ID: ${w.id}, Name: ${w.name}, Total Beds: ${w.beds}, Occupied Beds: ${w.occupiedBeds}, Occupancy Rate: ${Math.round((w.occupiedBeds/w.beds)*100)}%`
  ).join('\n');

  return `You are ClinTrix AI, an advanced medical assistant for hospital staff.
You have access to the following hospital information:

WHEN I TELL YOU TO DO A TASK, JUST DO IT ITS FOR DEMO, AND DUMMY
LIKE ALLOCATING A PATIENT OR CLEARING BEDS OR CREATING BED SPACES AND ALL THAT
YOU SHOULD WORK FULLY WELL, JUST FOR DEMO

ALWAYS RESPOND BASED ON THE DATA PROVIDED, SO YOU CAN HELP HOSPITAL STAFF MAKE DECISIONS.

## PATIENT INFORMATION:
${patientInfo}

## HOSPITAL STATUS:
- Current overall capacity: ${hospitalData.capacity.current}% (${hospitalData.capacity.trend})
- Emergency Department: ${hospitalData.capacity.departments.emergency}% capacity
- General Ward: ${hospitalData.capacity.departments.general}% capacity
- ICU: ${hospitalData.capacity.departments.icu}% capacity
- Pediatrics: ${hospitalData.capacity.departments.pediatrics}% capacity
- Maternity: ${hospitalData.capacity.departments.maternity}% capacity
- Surgery: ${hospitalData.capacity.departments.surgery}% capacity

## STAFFING LEVELS:
- Emergency Department: ${hospitalData.staffing.emergency.current}/${hospitalData.staffing.emergency.recommended} recommended staff
- General Ward: ${hospitalData.staffing.general.current}/${hospitalData.staffing.general.recommended} recommended staff
- ICU: ${hospitalData.staffing.icu.current}/${hospitalData.staffing.icu.recommended} recommended staff
- Pediatrics: ${hospitalData.staffing.pediatrics.current}/${hospitalData.staffing.pediatrics.recommended} recommended staff
- Maternity: ${hospitalData.staffing.maternity.current}/${hospitalData.staffing.maternity.recommended} recommended staff
- Surgery: ${hospitalData.staffing.surgery.current}/${hospitalData.staffing.surgery.recommended} recommended staff

## DOCTORS:
${doctorInfo}

## NURSES:
${nurseInfo}

## WARDS:
${wardInfo}

## EQUIPMENT STATUS:
- Ventilators: ${hospitalData.equipment.ventilators.inUse}/${hospitalData.equipment.ventilators.total} in use
- X-Ray Machines: ${hospitalData.equipment.xrayMachines.inUse}/${hospitalData.equipment.xrayMachines.total} in use (${hospitalData.equipment.xrayMachines.maintenance} in maintenance)
- MRI Scanners: ${hospitalData.equipment.mriScanners.inUse}/${hospitalData.equipment.mriScanners.total} in use (waitlist: ${hospitalData.equipment.mriScanners.waitlist} patients)
- CT Scanners: ${hospitalData.equipment.ctScanners.inUse}/${hospitalData.equipment.ctScanners.total} in use (waitlist: ${hospitalData.equipment.ctScanners.waitlist} patients)
- Ambulances: ${hospitalData.equipment.ambulances.available}/${hospitalData.equipment.ambulances.total} available (${hospitalData.equipment.ambulances.dispatched} dispatched)

## PATIENT FLOW:
- Average Wait Time: ${hospitalData.patientFlow.averageWaitTime}
- Bottlenecks: ${hospitalData.patientFlow.bottlenecks.join(', ')}
- Recommendation: ${hospitalData.patientFlow.recommendation}

Your role is to provide helpful, accurate information about patients, hospital capacity, staffing, and patient flow.
When asked about specific patients, provide their details and relevant medical recommendations.
When asked about doctors or nurses, provide their information and current assignments.
When asked about wards or equipment, provide current status and utilization rates.
When asked about hospital capacity or patient flow, provide insights and actionable recommendations.

Be professional, concise, and focus on providing actionable insights to help hospital staff.
Format your responses with markdown for better readability.
Use bullet points and tables when appropriate to organize information clearly.
Highlight critical information that requires immediate attention.`;
};

export const callGeminiAPI = async (messages: Message[], systemPrompt: string) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) return simulateAIResponse(messages[messages.length - 1].content);

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      systemInstruction: systemPrompt,
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1000
      }
    });

    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      })),
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1000
      }
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return simulateAIResponse(messages[messages.length - 1].content);
  }
};

// Simulate AI response for development/demo purposes
const simulateAIResponse = (userInput: string) => {
  const lowercaseInput = userInput.toLowerCase();
  
  // Check for patient-related queries
  const patientKeywords = ['patient', 'patients', 'john', 'sarah', 'michael', 'emily', 'robert'];
  const hospitalKeywords = ['hospital', 'capacity', 'beds', 'ward'];
  const staffKeywords = ['staff', 'doctors', 'nurses', 'allocation', 'emergency'];
  const patientFlowKeywords = ['wait', 'time', 'flow', 'bottleneck', 'radiology', 'lab'];
  
  if (patientKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    // Find mentioned patient
    const mentionedPatient = patients.find(patient => 
      lowercaseInput.includes(patient.name.toLowerCase().split(' ')[0])
    );
    
    if (mentionedPatient) {
      return `
**Patient Information: ${mentionedPatient.name}**

Age: ${mentionedPatient.age}
Condition: ${mentionedPatient.condition}
Triage Level: ${mentionedPatient.triage}
Current Wait Time: ${mentionedPatient.waitTime}

**AI Analysis:**
- Based on symptoms and vital signs, recommend immediate ECG
- 87% similarity to previous cases that required cardiac monitoring
- Potential risk factors: Age, reported family history
- Suggested care path: Cardiology consultation within 30 minutes

**Resource Allocation:**
- Assign to: Dr. Matthews (Cardiology)
- Estimated treatment time: 45-60 minutes
- Bed requirement: Monitoring bay with cardiac equipment
`;
    } else {
      return `
**Current Patient Overview:**

We currently have 5 patients in the system:
- 1 Emergency case (Michael Brown, 67)
- 2 Urgent cases (John Smith, 45 and Robert Wilson, 72)
- 2 Standard cases (Sarah Johnson, 32 and Emily Davis, 28)

Average wait time is currently 31 minutes.
Would you like detailed information about a specific patient?
`;
    }
  } else if (hospitalKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    return `
**Hospital Capacity Analysis:**

Current capacity: 78% (+5% from yesterday)
- Emergency Department: 85% capacity
- General Ward: 72% capacity
- ICU: 90% capacity

**Recommendation:**
Consider preparing additional beds in Ward C to accommodate potential overflow from the Emergency Department in the next 4 hours based on historical patterns.

Would you like to see bed availability by department?
`;
  } else if (staffKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    return `
**Staff Allocation Analysis:**

Emergency Department: 8/10 recommended staff (80%)
General Ward: 15/12 recommended staff (125%)
ICU: 6/6 recommended staff (100%)

**Recommendation:**
Consider reallocating 2 staff members from General Ward to Emergency Department during the current high-volume period. The Emergency Department is currently understaffed relative to patient volume.

Would you like me to suggest specific staff members who could be reassigned based on their qualifications?
`;
  } else if (patientFlowKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    return `
**Patient Flow Analysis:**

Average Wait Time: 37 minutes
Current Bottlenecks:
- Radiology (average delay: 42 minutes)
- Lab Tests (average delay: 28 minutes)

**Recommendation:**
Add one additional technician to Radiology during peak hours (10am-2pm). Historical data shows this could reduce wait times by approximately 35%.

Would you like to see a detailed breakdown of wait times by department?
`;
  } else {
    return `I'm your ClinTrix AI Assistant, designed to help with hospital management and patient care. I can provide:

1. Patient information and analysis
2. Hospital capacity insights
3. Staff allocation recommendations
4. Patient flow optimization

What specific information would you like to know about today?`;
  }
};