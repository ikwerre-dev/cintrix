'use client';

import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';

export default function AnalyticsPage() {
   const [timeRange, setTimeRange] = useState('week');

  // Dummy data
  const patientStats = {
    total: 1245,
    admitted: 342,
    discharged: 298,
    emergency: 187
  };

  const departmentData = [
    { name: 'Emergency', patients: 187, capacity: 200, percentage: 93.5 },
    { name: 'ICU', patients: 45, capacity: 50, percentage: 90 },
    { name: 'Cardiology', patients: 78, capacity: 100, percentage: 78 },
    { name: 'Pediatrics', patients: 56, capacity: 80, percentage: 70 },
    { name: 'Neurology', patients: 34, capacity: 60, percentage: 56.7 }
  ];

  const weeklyTrends = [
    { day: 'Mon', patients: 145 },
    { day: 'Tue', patients: 132 },
    { day: 'Wed', patients: 164 },
    { day: 'Thu', patients: 187 },
    { day: 'Fri', patients: 201 },
    { day: 'Sat', patients: 176 },
    { day: 'Sun', patients: 129 }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-500">Hospital performance metrics and patient statistics</p>
      </div>

      {/* Time range selector */}
      <div className="mb-6 flex space-x-2">
        <button 
          onClick={() => setTimeRange('day')}
          className={`px-4 py-2 rounded-md ${timeRange === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Day
        </button>
        <button 
          onClick={() => setTimeRange('week')}
          className={`px-4 py-2 rounded-md ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Week
        </button>
        <button 
          onClick={() => setTimeRange('month')}
          className={`px-4 py-2 rounded-md ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          Month
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Patients</h3>
          <p className="text-2xl font-bold">{patientStats.total}</p>
          <div className="mt-2 text-green-600 text-sm">↑ 12% from last {timeRange}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Admitted</h3>
          <p className="text-2xl font-bold">{patientStats.admitted}</p>
          <div className="mt-2 text-green-600 text-sm">↑ 8% from last {timeRange}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Discharged</h3>
          <p className="text-2xl font-bold">{patientStats.discharged}</p>
          <div className="mt-2 text-red-600 text-sm">↓ 3% from last {timeRange}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Emergency Cases</h3>
          <p className="text-2xl font-bold">{patientStats.emergency}</p>
          <div className="mt-2 text-green-600 text-sm">↑ 15% from last {timeRange}</div>
        </div>
      </div>

      {/* Department capacity */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Department Capacity</h2>
        <div className="space-y-4">
          {departmentData.map((dept) => (
            <div key={dept.name}>
              <div className="flex justify-between mb-1">
                <span>{dept.name}</span>
                <span>{dept.patients}/{dept.capacity} ({dept.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    dept.percentage > 90 ? 'bg-red-600' : 
                    dept.percentage > 75 ? 'bg-yellow-400' : 'bg-green-600'
                  }`}
                  style={{ width: `${dept.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly trends */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Weekly Patient Trends</h2>
        <div className="flex items-end h-64 space-x-6">
          {weeklyTrends.map((day) => {
            const height = (day.patients / 201) * 100; // 201 is max value
            return (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="mt-2 text-sm">{day.day}</div>
                <div className="text-xs text-gray-500">{day.patients}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}