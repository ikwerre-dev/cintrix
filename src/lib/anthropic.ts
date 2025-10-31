import { Message } from './conversation';

// Patient data interface matching the frontend
export interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  triage: string;
  waitTime: string;
}

// Sample patient data (same as in the frontend)
export const patients: Patient[] = [
  { id: 1, name: 'John Smith', age: 45, condition: 'Chest Pain', triage: 'Urgent', waitTime: '25 mins' },
  { id: 2, name: 'Sarah Johnson', age: 32, condition: 'Broken Arm', triage: 'Standard', waitTime: '45 mins' },
  { id: 3, name: 'Michael Brown', age: 67, condition: 'Shortness of Breath', triage: 'Emergency', waitTime: '5 mins' },
  { id: 4, name: 'Emily Davis', age: 28, condition: 'Migraine', triage: 'Standard', waitTime: '50 mins' },
  { id: 5, name: 'Robert Wilson', age: 72, condition: 'Dizziness', triage: 'Urgent', waitTime: '30 mins' }
];

// Hospital data
export const hospitalData = {
  capacity: {
    current: 78,
    trend: '+5% from yesterday',
    departments: {
      emergency: 85,
      general: 72,
      icu: 90
    },
    recommendation: 'Consider preparing additional beds in Ward C'
  },
  staffing: {
    emergency: { current: 8, recommended: 10 },
    general: { current: 15, recommended: 12 },
    icu: { current: 6, recommended: 6 }
  },
  patientFlow: {
    averageWaitTime: '37 minutes',
    bottlenecks: ['Radiology (average delay: 42 minutes)', 'Lab Tests (average delay: 28 minutes)'],
    recommendation: 'Add one additional technician to Radiology during peak hours (10am-2pm)'
  }
};

// Format messages for Gemini API
export const formatMessagesForGemini = (messages: Message[]) => {
  return messages.map(message => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }]
  }));
};

// Generate system prompt with context
export const generateSystemPrompt = () => {
  const patientInfo = patients.map(p => 
    `Patient ID: ${p.id}, Name: ${p.name}, Age: ${p.age}, Condition: ${p.condition}, Triage: ${p.triage}, Wait Time: ${p.waitTime}`
  ).join('\n');

  return `You are ClinTrix AI, an advanced medical assistant for hospital staff.
You have access to the following patient information:

${patientInfo}

Hospital Status:
- Current capacity: ${hospitalData.capacity.current}% (${hospitalData.capacity.trend})
- Emergency Department: ${hospitalData.capacity.departments.emergency}% capacity
- General Ward: ${hospitalData.capacity.departments.general}% capacity
- ICU: ${hospitalData.capacity.departments.icu}% capacity

Staffing:
- Emergency Department: ${hospitalData.staffing.emergency.current}/${hospitalData.staffing.emergency.recommended} recommended staff
- General Ward: ${hospitalData.staffing.general.current}/${hospitalData.staffing.general.recommended} recommended staff
- ICU: ${hospitalData.staffing.icu.current}/${hospitalData.staffing.icu.recommended} recommended staff

Patient Flow:
- Average Wait Time: ${hospitalData.patientFlow.averageWaitTime}
- Bottlenecks: ${hospitalData.patientFlow.bottlenecks.join(', ')}

Your role is to provide helpful, accurate information about patients, hospital capacity, staffing, and patient flow.
When asked about specific patients, provide their details and relevant medical recommendations.
Be professional, concise, and focus on providing actionable insights to help hospital staff.
Format your responses with markdown for better readability.`;
};

// Call Gemini API
export const callGeminiAPI = async (messages: Message[], systemPrompt: string) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    // For development/demo purposes, return a simulated response if API key is not available
    return simulateAIResponse(messages[messages.length - 1].content);
  }

  try {
    // Format messages for Gemini API
    const formattedMessages = formatMessagesForGemini(messages);
    
    // Add system prompt as the first user message if there are no messages yet
    if (formattedMessages.length === 0 || formattedMessages[0].role !== 'user') {
      formattedMessages.unshift({
        role: 'user',
        parts: [{ text: systemPrompt }]
      });
    }
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
          topP: 0.95
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Fallback to simulated response in case of API errors
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