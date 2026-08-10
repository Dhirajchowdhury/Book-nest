import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-12 sm:py-16 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-800">
          
          {/* Brand & Description */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-amber-300 font-bold text-sm">
                📖
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Book<span className="text-emerald-400">Nest</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              A personal space to organize and track your reading journey. Simple, clean, and reading-focused.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-emerald-400 transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information / Placeholders */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Contact & Info
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>Email: <span className="text-zinc-200">hello@booknest.app</span></li>
              <li>Support: <span className="text-zinc-200">help@booknest.app</span></li>
              <li>Location: Personal Reading Journal</li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} BookNest. All rights reserved.</p>
          <p className="text-zinc-500">Made for book lovers 📚</p>
        </div>

      </div>
    </footer>
  );
}
export default Footer;