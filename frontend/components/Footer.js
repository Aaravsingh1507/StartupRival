import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#030712] border-t border-[#39BAFF]/15 py-12 relative overflow-hidden">
      {/* Subtle bottom halo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#0866F5]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-6 h-6 rounded bg-[#0866F5] text-white text-xs font-bold flex items-center justify-center shadow-[0_0_12px_rgba(8,102,245,0.6)]">
                SR
              </div>
              <span className="font-semibold text-[#F4F8FF] text-sm tracking-tight">
                StartupRival
              </span>
            </Link>
            <p className="text-xs text-[#8EABCF] leading-relaxed">
              AI-driven market gap intelligence for aspiring founders across India. Real demand signals, verified public data, zero fluff.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#39BAFF] mb-3">Product</h4>
            <div>
              <Link href="/gap-finder" className="text-sm text-[#8EABCF] hover:text-[#F4F8FF] transition block mb-2">
                Market Gap Finder
              </Link>
              <Link href="/funding" className="text-sm text-[#8EABCF] hover:text-[#F4F8FF] transition block mb-2">
                Funding Finder
              </Link>
              <Link href="/community" className="text-sm text-[#8EABCF] hover:text-[#F4F8FF] transition block mb-2">
                Founder Community
              </Link>
              <Link href="/dashboard" className="text-sm text-[#8EABCF] hover:text-[#F4F8FF] transition block mb-2">
                Founder Workspace
              </Link>
            </div>
          </div>

          {/* Research & Data Sources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#39BAFF] mb-3">Intelligence</h4>
            <div>
              <span className="text-sm text-[#8EABCF] transition block mb-2">Google Trends 12mo Velocity</span>
              <span className="text-sm text-[#8EABCF] transition block mb-2">data.gov.in Sector Statistics</span>
              <span className="text-sm text-[#8EABCF] transition block mb-2">Regional MSME Cluster Indices</span>
              <span className="text-sm text-[#8EABCF] transition block mb-2">Competitor Density Maps</span>
            </div>
          </div>

          {/* Legal / Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#39BAFF] mb-3">Legal & Security</h4>
            <div>
              <span className="text-sm text-[#8EABCF] hover:text-[#F4F8FF] cursor-pointer transition block mb-2">Privacy Policy</span>
              <span className="text-sm text-[#8EABCF] hover:text-[#F4F8FF] cursor-pointer transition block mb-2">Terms of Service</span>
              <span className="text-sm text-[#8EABCF] hover:text-[#F4F8FF] cursor-pointer transition block mb-2">Verification Methodology</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#39BAFF]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#4B6485] gap-4">
          <p>© 2026 StartupRival. Built for the Indian Entrepreneurial Ecosystem.</p>
          <p className="text-[#8EABCF]/80">India-First Engine · Premium AI Platform v2.0</p>
        </div>
      </div>
    </footer>
  );
}
