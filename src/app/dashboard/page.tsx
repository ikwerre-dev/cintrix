"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { FileText, User, AlertCircle, Activity, Users, Clock, BedDouble } from "lucide-react";
import {
  dummyPatients,
  dummyResourceMetrics,
  dummyWeeklyFlow,
  dummyStaffingSuggestions
} from "@/data/dummyData";

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // In a real app, these would come from an API
  const metrics = dummyResourceMetrics;
  const patients = dummyPatients;
  const staffingSuggestions = dummyStaffingSuggestions;
  const weeklyFlow = dummyWeeklyFlow;

  const criticalPatients = patients.filter(p => p.triageLevel === 'Critical').length;
  const waitingPatients = patients.filter(p => p.status === 'Waiting').length;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Stats and Patient Flow */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency Department Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <span className="text-xs font-medium text-red-600">Critical</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-red-700">{criticalPatients}</p>
                <p className="text-sm text-red-600">Critical Cases</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">Waiting</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-blue-700">{waitingPatients}</p>
                <p className="text-sm text-blue-600">In Queue</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <BedDouble className="w-6 h-6 text-green-600" />
                  <span className="text-xs font-medium text-green-600">Beds</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-green-700">
                  {metrics.totalBeds - metrics.occupiedBeds}
                </p>
                <p className="text-sm text-green-600">Available</p>
              </div>
            </div>
          </div>

          {/* Patient Flow Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Patient Flow</h2>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="text-sm border rounded-lg px-3 py-2"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
            <div className="h-64 w-full">
              {/* Chart would go here - using dummy display for now */}
              <div className="flex items-end justify-between h-full px-2">
                {weeklyFlow.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center w-1/7">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(day.count / 60) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/dashboard/triage" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800 text-center">New Triage</span>
              </Link>
              
              <Link href="/dashboard/queue" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800 text-center">Patient Queue</span>
              </Link>

              <Link href="/dashboard/resources" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <BedDouble className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800 text-center">Resources</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right column - Alerts and Suggestions */}
        <div className="space-y-6">
          {/* Staff Allocation Suggestions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Suggestions</h2>
            <div className="space-y-4">
              {staffingSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className={`p-4 rounded-lg ${
                    suggestion.priority === 'High' ? 'bg-red-50' : 'bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium ${
                      suggestion.priority === 'High' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {suggestion.priority} Priority
                    </span>
                    <span className="text-xs text-gray-500">{suggestion.department}</span>
                  </div>
                  <p className="text-sm text-gray-800">{suggestion.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resource Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Staff Available</span>
                  <span className="text-sm font-medium text-gray-800">
                    {metrics.availableStaff}/{metrics.totalStaff}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(metrics.availableStaff / metrics.totalStaff) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Beds Available</span>
                  <span className="text-sm font-medium text-gray-800">
                    {metrics.totalBeds - metrics.occupiedBeds}/{metrics.totalBeds}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${((metrics.totalBeds - metrics.occupiedBeds) / metrics.totalBeds) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Avg. Wait Time</span>
                  <span className="text-sm font-medium text-gray-800">
                    {metrics.averageWaitTime} min
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metrics.averageWaitTime > 60 ? 'bg-red-600' : 'bg-yellow-600'
                    }`}
                    style={{ width: `${Math.min((metrics.averageWaitTime / 120) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}