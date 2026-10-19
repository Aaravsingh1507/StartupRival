import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] text-[#A3A3A3] text-sm py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-black text-xs">
                SR
              </div>
              <span className="font-semibold text-white tracking-tight text-base">
                Startup<span className="text-neutral-400 font-normal">Rival</span>
              </span>
            </Link>
            <p className="text-xs text-[#737373] leading-relaxed">
              AI-driven market gap intelligence for aspiring founders across India. Real demand signals, zero fluff.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/gap-finder" className="hover:text-white transition-colors">
                  Market Gap Finder
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  Validation Engine
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Founder Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Research & Data Sources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Intelligence</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="text-[#737373]">Google Trends Momentum</li>
              <li className="text-[#737373]">data.gov.in Statistics</li>
              <li className="text-[#737373]">Regional MSME Indices</li>
              <li className="text-[#737373]">Competitor Density Maps</li>
            </ul>
          </div>

          {/* Legal / Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Data Methodology</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#525252] gap-4">
          <p>© 2026 StartupRival. Built for the Indian Entrepreneurial Ecosystem.</p>
          <div className="flex items-center gap-6">
            <span>India-First Engine</span>
            <span>Monochrome UI v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
