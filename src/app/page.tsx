"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import EmergencyModeSection from "@/components/EmergencyModeSection";
// import InvestmentSection from "@/components/InvestmentSection"; // Will be transformed to HealthcareProviders
// import BusinessSolutions from "@/components/BusinessSolutions"; // Will be transformed to PatientSolutions
// import MobileBanking from "@/components/MobileBanking"; // Will be transformed to MobileHealth
import CallToAction from "@/components/CallToAction";
// import FinancialPlanning from "@/components/FinancialPlanning"; // Will be transformed to HealthPlanning
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="min-h-screen overflow flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        {/* <AboutSection /> */}
        <FeaturesSection />

        {/* How It Works */}
        <section className="mx-4 md:mx-auto md:max-w-4xl mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800">How It Works</h2>
          <p className="text-sm text-gray-600 mt-2">
            Streamline ED flow with AI‑assisted triage, dynamic queueing, and staffing insights under clinician oversight.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li>Input triage details to get a suggested urgency and reasoning.</li>
            <li>Confirm classifications; the queue updates by status and severity.</li>
            <li>View staffing guidance based on inflow and capacity metrics.</li>
            <li>Share a patient card for rapid handoffs and emergency context.</li>
          </ul>
        </section>

        {/* Privacy & Audit */}
        <section className="mx-4 md:mx-auto md:max-w-4xl mt-6 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800">Privacy & Audit</h2>
          <p className="text-sm text-gray-600 mt-2">
            Patient data stays protected with strict visibility controls and complete audit trails.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li>Field‑level permissions for sensitive information.</li>
            <li>Access and overrides recorded with timestamps and user identity.</li>
            <li>Explainable decisions to support safety, fairness, and compliance.</li>
          </ul>
        </section>

        {/* On‑Chain Storage */}
        <section className="mx-4 md:mx-auto md:max-w-4xl mt-6 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800">On‑Chain Storage</h2>
          <p className="text-sm text-gray-600 mt-2">
            Minimal metadata and proofs are anchored on‑chain for auditability; bulk encrypted records stay off‑chain.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li>Anchors include content hashes, timestamps, and issuer signatures.</li>
            <li>DAG‑style links connect related records for efficient verification.</li>
            <li>Privacy is preserved by never putting PHI directly on‑chain.</li>
          </ul>
        </section>

        <EmergencyModeSection />
        {/* Temporarily commenting out sections that need transformation */}
        {/* <InvestmentSection /> */}
        {/* <BusinessSolutions /> */}
        {/* <MobileBanking /> */}
        <CallToAction />
        {/* <FinancialPlanning /> */}
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
