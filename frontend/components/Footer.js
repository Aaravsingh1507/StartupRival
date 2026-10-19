import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-sm bg-white text-black text-xs font-bold flex items-center justify-center">
                SR
              </div>
              <span className="font-semibold text-white text-sm tracking-tight">
                StartupRival
              </span>
            </Link>
            <p className="text-xs text-[#555] leading-relaxed">
              AI-driven market gap intelligence for aspiring founders across India. Real demand signals, zero fluff.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-[#888] mb-3">Product</h4>
            <div>
              <Link href="/gap-finder" className="text-sm text-[#555] hover:text-white transition block mb-2">
                Market Gap Finder
              </Link>
              <Link href="/funding" className="text-sm text-[#555] hover:text-white transition block mb-2">
                Funding Finder
              </Link>
              <Link href="/community" className="text-sm text-[#555] hover:text-white transition block mb-2">
                Founder Community
              </Link>
              <Link href="/dashboard" className="text-sm text-[#555] hover:text-white transition block mb-2">
                Founder Dashboard
              </Link>
            </div>
          </div>

          {/* Research & Data Sources */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-[#888] mb-3">Intelligence</h4>
            <div>
              <span className="text-sm text-[#555] transition block mb-2">Google Trends Momentum</span>
              <span className="text-sm text-[#555] transition block mb-2">data.gov.in Statistics</span>
              <span className="text-sm text-[#555] transition block mb-2">Regional MSME Indices</span>
              <span className="text-sm text-[#555] transition block mb-2">Competitor Density Maps</span>
            </div>
          </div>

          {/* Legal / Compliance */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-[#888] mb-3">Legal</h4>
            <div>
              <span className="text-sm text-[#555] hover:text-white cursor-pointer transition block mb-2">Privacy Policy</span>
              <span className="text-sm text-[#555] hover:text-white cursor-pointer transition block mb-2">Terms of Service</span>
              <span className="text-sm text-[#555] hover:text-white cursor-pointer transition block mb-2">Data Methodology</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between text-xs text-[#555] gap-4">
          <p>© 2026 StartupRival. Built for the Indian Entrepreneurial Ecosystem.</p>
          <p>India-First Engine · Monochrome UI v1.0</p>
        </div>
      </div>
    </footer>
  );
}
