"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Shield, Heart, CreditCard, Database } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div className="md:w-1/2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-[#194dbe] font-medium mb-3 inline-block bg-blue-100 px-4 py-1 rounded-full">
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                Explainable. Ethical. Efficient Emergency Care
              </span>
            </div>
            
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#194dbe] mb-6 leading-tight">
              Clintrix ES: Optimize Emergency Department Flow
            </h1>
            
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Metro General faces 8+ hour waits for non‑critical patients. ClinTrix AI reduces overcrowding with AI‑assisted triage, dynamic queueing, staffing suggestions, and transparent audit trails—keeping care equitable and safe.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <button className="bg-[#194dbe] text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-all font-medium">
                  Open Dashboard
                </button>
              </Link>
              
              <Link href="/login">
                <button className="border-2 border-[#194dbe] text-[#194dbe] px-8 py-3 rounded-md hover:bg-[#194dbe] hover:text-white transition-all font-medium">
                  Start Triage
                </button>
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-500 mb-4">System Capabilities</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <Database className="w-5 h-5 text-[#194dbe]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">AI Triage</p>
                    <p className="text-sm text-gray-600">Suggests urgency with reasoning</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <CreditCard className="w-5 h-5 text-[#194dbe]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Dynamic Queue</p>
                    <p className="text-sm text-gray-600">Real‑time prioritization</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <Shield className="w-5 h-5 text-[#194dbe]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Explainability</p>
                    <p className="text-sm text-gray-600">Plain‑language reasoning for decisions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <Heart className="w-5 h-5 text-[#194dbe]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Staffing Insights</p>
                    <p className="text-sm text-gray-600">Predictive reallocation guidance</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="md:w-1/2 relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative">
              <div className="bg-[#194dbe] rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Heart className="w-6 h-6 text-[#194dbe]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Triage Recommendation</p>
                        <p className="text-sm text-gray-500">With reasoning</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-[#194dbe] rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Case:</span>
                      <span className="font-medium">Chest pain, nausea</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Urgency:</span>
                      <span className="font-medium text-[#194dbe]">Critical</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reason:</span>
                      <span className="font-medium">Elevated BP, HR 110</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-3">
                    <CreditCard className="w-8 h-8 text-white mr-2" />
                    <span className="text-white font-medium">Queue Updated</span>
                  </div>
                  <p className="text-white/80 text-sm text-center">
                    Prioritization reflects clinician oversight and fairness policies
                  </p>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-12 h-12 bg-[#194dbe] rounded-full flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;