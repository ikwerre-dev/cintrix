'use client';

import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';

export default function AIPage() {
   const [selectedPatient, setSelectedPatient] = useState(null);
  const [aiInsights, setAiInsights] = useState('');
  
  // Dummy patient data
  const patients = [
    { id: 1, name: 'John Smith', age: 45, condition: 'Chest Pain', triage: 'Urgent', waitTime: '25 mins' },
    { id: 2, name: 'Sarah Johnson', age: 32, condition: 'Broken Arm', triage: 'Standard', waitTime: '45 mins' },
    { id: 3, name: 'Michael Brown', age: 67, condition: 'Shortness of Breath', triage: 'Emergency', waitTime: '5 mins' },
    { id: 4, name: 'Emily Davis', age: 28, condition: 'Migraine', triage: 'Standard', waitTime: '50 mins' },
    { id: 5, name: 'Robert Wilson', age: 72, condition: 'Dizziness', triage: 'Urgent', waitTime: '30 mins' }
  ];
  
  // Dummy AI analysis data
  const aiAnalysisData = {
    hospitalCapacity: {
      current: 78,
      trend: '+5% from yesterday',
      recommendation: 'Consider preparing additional beds in Ward C'
    },
    staffAllocation: {
      emergency: { current: 8, recommended: 10 },
      general: { current: 15, recommended: 12 },
      icu: { current: 6, recommended: 6 }
    },
    patientFlow: {
      averageWaitTime: '37 minutes',
      bottlenecks: ['Radiology', 'Lab Tests'],
      recommendation: 'Add one additional technician to Radiology during peak hours'
    }
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    
    // Simulate AI generating insights
    setTimeout(() => {
      const insights = `
        Patient: ${patient.name}, ${patient.age}
        Condition: ${patient.condition}
        Triage Level: ${patient.triage}
        
        AI ANALYSIS:
        - Based on symptoms and vital signs, recommend immediate ECG
        - 87% similarity to previous cases that required cardiac monitoring
        - Potential risk factors: Age, reported family history
        - Suggested care path: Cardiology consultation within 30 minutes
        
        RESOURCE ALLOCATION:
        - Assign to: Dr. Matthews (Cardiology)
        - Estimated treatment time: 45-60 minutes
        - Bed requirement: Monitoring bay with cardiac equipment
      `;
      setAiInsights(insights);
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">MedFlow AI Assistant</h1>
        <p className="text-gray-500">AI-powered insights and recommendations for optimal patient care</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Patient list */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Current Patients</h2>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="overflow-hidden">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '8px', fontWeight: 'semibold' }}>Name</th>
                  <th style={{ padding: '8px', fontWeight: 'semibold' }}>Condition</th>
                  <th style={{ padding: '8px', fontWeight: 'semibold' }}>Triage</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr 
                    key={patient.id} 
                    onClick={() => handlePatientSelect(patient)}
                    style={{ 
                      borderBottom: '1px solid #e2e8f0', 
                      cursor: 'pointer',
                      backgroundColor: selectedPatient?.id === patient.id ? '#ebf5ff' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '8px' }}>{patient.name}</td>
                    <td style={{ padding: '8px' }}>{patient.condition}</td>
                    <td style={{ padding: '8px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        backgroundColor: 
                          patient.triage === 'Emergency' ? '#fee2e2' : 
                          patient.triage === 'Urgent' ? '#fef3c7' : 
                          '#e0f2fe',
                        color: 
                          patient.triage === 'Emergency' ? '#b91c1c' : 
                          patient.triage === 'Urgent' ? '#92400e' : 
                          '#0369a1'
                      }}>
                        {patient.triage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Middle column - AI Analysis */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">AI Patient Analysis</h2>
          
          {selectedPatient ? (
            <div>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="font-medium">{selectedPatient.name}, {selectedPatient.age}</div>
                <div className="text-sm text-gray-600">Condition: {selectedPatient.condition}</div>
                <div className="text-sm text-gray-600">Wait time: {selectedPatient.waitTime}</div>
              </div>
              
              <div className="whitespace-pre-line bg-gray-50 p-3 rounded-lg text-sm">
                {aiInsights || 'Generating AI insights...'}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              Select a patient to view AI analysis
            </div>
          )}
        </div>
        
        {/* Right column - Hospital Insights */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Hospital Capacity</h2>
            <div className="flex items-end mb-2">
              <span className="text-2xl font-bold">{aiAnalysisData.hospitalCapacity.current}%</span>
              <span className="ml-2 text-sm text-green-600">{aiAnalysisData.hospitalCapacity.trend}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${aiAnalysisData.hospitalCapacity.current}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{aiAnalysisData.hospitalCapacity.recommendation}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Staff Allocation</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Emergency Department</span>
                  <span>{aiAnalysisData.staffAllocation.emergency.current}/{aiAnalysisData.staffAllocation.emergency.recommended}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-red-500 h-2.5 rounded-full" 
                    style={{ width: `${(aiAnalysisData.staffAllocation.emergency.current / aiAnalysisData.staffAllocation.emergency.recommended) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>General Ward</span>
                  <span>{aiAnalysisData.staffAllocation.general.current}/{aiAnalysisData.staffAllocation.general.recommended}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-yellow-500 h-2.5 rounded-full" 
                    style={{ width: `${(aiAnalysisData.staffAllocation.general.current / aiAnalysisData.staffAllocation.general.recommended) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>ICU</span>
                  <span>{aiAnalysisData.staffAllocation.icu.current}/{aiAnalysisData.staffAllocation.icu.recommended}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${(aiAnalysisData.staffAllocation.icu.current / aiAnalysisData.staffAllocation.icu.recommended) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Patient Flow</h2>
            <div className="mb-2">
              <span className="text-sm text-gray-600">Average Wait Time:</span>
              <span className="ml-2 font-medium">{aiAnalysisData.patientFlow.averageWaitTime}</span>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-600">Bottlenecks:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {aiAnalysisData.patientFlow.bottlenecks.map((item, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{aiAnalysisData.patientFlow.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}