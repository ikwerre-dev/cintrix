import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#001f4d] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">ClinTrix AI</h3>
          <p className="text-gray-300">
            Clinical management system optimizing Emergency Department flow with AI-assisted triage, dynamic queues, staffing insights, and transparent audit trails.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
            <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
            <li><Link href="/providers" className="text-gray-300 hover:text-white">Resource Dashboard</Link></li>
           </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><Link href="/features" className="text-gray-300 hover:text-white">AI Triage</Link></li>
            <li><Link href="/features" className="text-gray-300 hover:text-white">Dynamic Queue</Link></li>
            <li><Link href="/features" className="text-gray-300 hover:text-white">Staffing Suggestions</Link></li>
            <li><Link href="/features" className="text-gray-300 hover:text-white">Explainability & Audit</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Email: support@ClinTrix.ai</li>
            <li>Phone: +1(555)MED-FLOW</li>
            <li>Emergency: 24/7 Support</li>
           </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
        <p>&copy; {new Date().getFullYear()} ClinTrix AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;