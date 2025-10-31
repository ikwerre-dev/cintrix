"use client";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AlertCircle, Activity, Heart, Thermometer, Loader2 } from "lucide-react";
import { dummyTriageExplanations } from "@/data/dummyData";
import ReactMarkdown from 'react-markdown';

interface TriageFormData {
  name: string;
  age: string;
  symptoms: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  arrivalMode: string;
}

export default function TriagePage() {
  const [formData, setFormData] = useState<TriageFormData>({
    name: "",
    age: "",
    symptoms: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    arrivalMode: "walk-in"
  });

  const [triageResult, setTriageResult] = useState<{
    level: "Critical" | "Moderate" | "Low" | null;
    explanation: string | null;
  }>({
    level: null,
    explanation: null
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Determine triage level based on vitals
    const systolic = parseInt(formData.bloodPressure.split('/')[0]);
    const heartRate = parseInt(formData.heartRate);
    const hasChestPain = formData.symptoms.toLowerCase().includes('chest pain');
    
    let triageLevel: "Critical" | "Moderate" | "Low" = "Low";
    let explanation = "";

    if (systolic > 180 || heartRate > 120 || hasChestPain) {
      triageLevel = "Critical";
      explanation = "High blood pressure and elevated heart rate indicate potential cardiac event. Immediate attention required.";
    } else if (systolic > 140 || heartRate > 100) {
      triageLevel = "Moderate";
      explanation = "Elevated vitals suggest urgent medical attention needed, but not immediately life-threatening.";
    } else {
      triageLevel = "Low";
      explanation = "Stable vitals with no immediate risk indicators present.";
    }

    setTriageResult({
      level: triageLevel,
      explanation: explanation
    });
    
    // Connect to AI for detailed analysis
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Patient Triage Assessment:
Name: ${formData.name}
Age: ${formData.age}
Symptoms: ${formData.symptoms}
Blood Pressure: ${formData.bloodPressure}
Heart Rate: ${formData.heartRate}
Temperature: ${formData.temperature}
Arrival Mode: ${formData.arrivalMode}

Based on this information, provide a detailed triage assessment, recommended actions, and potential diagnosis. The initial triage level is ${triageLevel}.`
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      const data = await response.json();
      setAiResponse(data.message.content);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse("Error connecting to AI assistant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">New Patient Triage</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    placeholder="120/80"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <Activity className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heart Rate
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleInputChange}
                    placeholder="BPM"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <Heart className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    placeholder="°C"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <Thermometer className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            {/* Arrival Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arrival Mode
              </label>
              <select
                name="arrivalMode"
                value={formData.arrivalMode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="walk-in">Walk-in</option>
                <option value="ambulance">Ambulance</option>
                <option value="wheelchair">Wheelchair</option>
                <option value="stretcher">Stretcher</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Analyze with AI
            </button>
          </form>
        </div>

        {/* Triage Result */}
        {triageResult.level && (
          <div className={`bg-white rounded-xl shadow-sm p-6 ${
            triageResult.level === "Critical" ? "border-l-4 border-red-500" :
            triageResult.level === "Moderate" ? "border-l-4 border-yellow-500" :
            "border-l-4 border-green-500"
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${
                triageResult.level === "Critical" ? "bg-red-100" :
                triageResult.level === "Moderate" ? "bg-yellow-100" :
                "bg-green-100"
              }`}>
                <AlertCircle className={`w-6 h-6 ${
                  triageResult.level === "Critical" ? "text-red-600" :
                  triageResult.level === "Moderate" ? "text-yellow-600" :
                  "text-green-600"
                }`} />
              </div>
              <div className="w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  AI Triage Recommendation
                </h2>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Urgency Level:</span>
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                      triageResult.level === "Critical" ? "bg-red-100 text-red-800" :
                      triageResult.level === "Moderate" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {triageResult.level}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Initial Assessment:</span>
                    <p className="mt-1 text-sm text-gray-800">{triageResult.explanation}</p>
                  </div>
                  
                  {/* AI Detailed Response */}
                  {isLoading ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      <span className="ml-3 text-gray-600">Getting AI analysis...</span>
                    </div>
                  ) : aiResponse ? (
                    <div className="mt-4 border-t pt-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">AI Detailed Analysis</h3>
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{aiResponse}</ReactMarkdown>
                      </div>
                    </div>
                  ) : null}
                  
                  <div className="pt-4 border-t">
                    <button 
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Confirm & Add to Queue
                    </button>
                    <button 
                      type="button"
                      className="ml-3 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Override
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}