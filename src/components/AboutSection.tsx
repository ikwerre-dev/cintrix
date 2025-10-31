"use client";
import Image from "next/image";
import { Users, Globe, Shield, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const counterRef = useRef<HTMLDivElement>(null);
  const [countersVisible, setCountersVisible] = useState(false);
  const [counts, setCounts] = useState({
    activePatients: 0,
    criticalCases: 0,
    availableBeds: 0,
    staffOnDuty: 0
  });

  const finalCounts = {
    activePatients: 120,
    criticalCases: 18,
    availableBeds: 6,
    staffOnDuty: 12
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (countersVisible) {
      const duration = 2000;
      const interval = 20;
      const steps = duration / interval;

      const timer = setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = { ...prevCounts };
          let allComplete = true;

          Object.keys(finalCounts).forEach(key => {
            const finalValue = finalCounts[key as keyof typeof finalCounts];
            const currentValue = prevCounts[key as keyof typeof prevCounts];
            const increment = finalValue / steps;

            if (currentValue < finalValue) {
              newCounts[key as keyof typeof newCounts] = Math.min(
                currentValue + increment,
                finalValue
              );
              allComplete = false;
            }
          });

          if (allComplete) {
            clearInterval(timer);
          }

          return newCounts;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [countersVisible]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M+`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K+`;
    }
    return num.toFixed(1);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block text-[#194dbe] font-medium mb-2 px-4 py-1 bg-blue-50 rounded-full">Our Mission</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Optimize Emergency Care at Metro General</h2>

            <div className="mb-8">
              <div className="flex border-b border-gray-200">
                <button
                  className={`py-3 px-5 font-medium text-sm ${activeTab === 'mission' ? 'text-[#194dbe] border-b-2 border-[#194dbe]' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('mission')}
                >
                  Mission
                </button>
                <button
                  className={`py-3 px-5 font-medium text-sm ${activeTab === 'values' ? 'text-[#194dbe] border-b-2 border-[#194dbe]' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('values')}
                >
                  Values
                </button>
                <button
                  className={`py-3 px-5 font-medium text-sm ${activeTab === 'story' ? 'text-[#194dbe] border-b-2 border-[#194dbe]' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('story')}
                >
                  Story
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'mission' && (
                <div>
                    <p className="text-gray-700 mb-4">
                      ClinTrix AI reduces 8+ hour waits with AI‑assisted triage, dynamic queueing, staffing insights, and transparent audits. Equity and safety guide every decision.
                    </p>
                    <p className="text-gray-700">
                      Built for clinicians, nurses, and administrators to restore flow, protect patient safety, and prevent burnout during peak demand.
                    </p>
                </div>
              )}

              {activeTab === 'values' && (
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-50 rounded-lg mr-3">
                        <Shield className="w-5 h-5 text-[#194dbe]" />
                      </div>
                      <div>
                          <h4 className="font-medium text-gray-900">Safety</h4>
                          <p className="text-sm text-gray-600">Protect patients with explainable, human‑in‑loop AI</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-50 rounded-lg mr-3">
                        <Globe className="w-5 h-5 text-[#194dbe]" />
                      </div>
                      <div>
                          <h4 className="font-medium text-gray-900">Equity</h4>
                          <p className="text-sm text-gray-600">Reduce bias across language and socioeconomic factors</p>
                      </div>
                    </div>
                    <div className="flex items-start mt-4">
                      <div className="p-2 bg-blue-50 rounded-lg mr-3">
                        <Users className="w-5 h-5 text-[#194dbe]" />
                      </div>
                      <div>
                          <h4 className="font-medium text-gray-900">Clinician First</h4>
                          <p className="text-sm text-gray-600">Support nurses and doctors with clear, actionable insights</p>
                      </div>
                    </div>
                    <div className="flex items-start mt-4">
                      <div className="p-2 bg-blue-50 rounded-lg mr-3">
                        <Award className="w-5 h-5 text-[#194dbe]" />
                      </div>
                      <div>
                          <h4 className="font-medium text-gray-900">Transparency</h4>
                          <p className="text-sm text-gray-600">Audit trails and ethics dashboard built‑in</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div>
                    <p className="text-gray-700 mb-4">
                      Born from frontline ED experience, ClinTrix AI focuses on safe, equitable patient flow. Built to help teams manage surges while maintaining quality care.
                    </p>
                    <p className="text-gray-700">
                      We combine data on arrivals, acuity, staffing, and outcomes to guide real‑time decisions and maintain transparency.
                    </p>
                </div>
              )}
            </div>
          </div>
          </div>

          <div className="relative">
            <div className="absolute -z-10 w-full h-full bg-blue-50 rounded-3xl transform -rotate-3 translate-x-4 translate-y-4"></div>
            <Image
              src="/images/5.png"
              alt="VelTrust Team"
              width={600}
              height={400}
              className="rounded-3xl relative z-10"
            />
          </div>
        </div>

        <div ref={counterRef} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#194dbe] mb-2">
              {formatNumber(counts.activePatients)}
            </div>
            <p className="text-gray-600">Active Patients</p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-[#194dbe] mb-2">
              {formatNumber(counts.criticalCases)}
            </div>
            <p className="text-gray-600">Critical Cases</p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-[#194dbe] mb-2">
              {counts.availableBeds.toFixed(0)}
            </div>
            <p className="text-gray-600">Available Beds</p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-[#194dbe] mb-2">
              {counts.staffOnDuty.toFixed(0)}
            </div>
            <p className="text-gray-600">Staff On Duty</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;