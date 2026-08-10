import Link from "next/link";

/**
 * Navbar Component
 * Purpose: Top navigation bar for the BookNest landing page.
 * Displays the brand logo/name on the left and navigation links (Login & Signup) on the right.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Simple handmade book icon container with yellow accent */}
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-amber-300 font-bold shadow-xs">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 3v14.5c-2.5-1.5-6-1.5-8 0V4c2-1.5 5.5-1.5 8 0zm0 0c2.5-1.5 6-1.5 8 0v13.5c-2-1.5-5.5-1.5-8 0V3z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-emerald-950 tracking-tight">
            Book<span className="text-emerald-600">Nest</span>
          </span>
        </Link>

        {/* Right Side: Simple Navigation Links (No authentication logic) */}
        <nav className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-emerald-900 hover:text-emerald-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
          >
            Sign Up
          </Link>
        </nav>

      </div>
    </header>
  );
}
