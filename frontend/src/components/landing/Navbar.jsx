import Link from "next/link";
import Image from "next/image";
function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
       7
        <Link href="/" className="flex items-center gap-2 group">
    
         <div className="w-9 h-9 rounded-lg">
            <Image
              src="/icon01.png"
              alt="BookNest logo"
              width={36}
              height={36}
            />
           </div>
          <span className="text-xl font-bold text-emerald-600 tracking-tight">
            BookNest
          </span>
        </Link>

        
        <nav className="flex items-center gap-3 sm:gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-semibold text-emerald-900 hover:text-emerald-600 transition-colors" >
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors">
            Sign Up
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;