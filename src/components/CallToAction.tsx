"use client";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="bg-[#194dbe] text-white py-16 rounded-2xl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to modernize hospital operations?</h2>
        <p className="text-white/90 mb-8">Use AI to streamline triage, staffing, and bed utilization with Clintrix ES.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/login">
            <button className="bg-white text-[#194dbe] px-6 py-3 rounded-md font-medium hover:bg-gray-100">Login</button>
          </Link>
          <Link href="/features">
            <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-[#194dbe]">Explore Features</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;