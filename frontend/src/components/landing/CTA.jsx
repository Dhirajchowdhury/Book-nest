import Link from "next/link";

function CTA() {
  return (
    <section className="bg-emerald-900 text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Decorative Warm Accent Background Shapes */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-amber-400 opacity-20 blur-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 rounded-full bg-emerald-500 opacity-30 blur-xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        {/* Warm Icon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <span>📚</span> Join BookNest Today
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Ready to organize your reading?
        </h2>

        {/* Paragraph */}
        <p className="text-emerald-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Create your free personal reading space now and keep all your books, ratings, and notes in one cozy nest.
        </p>

        {/* CTA Link Button */}
        <div className="pt-4">
          <Link
            href="/signup"
            className="inline-block px-8 py-3.5 text-base font-bold text-emerald-950 bg-amber-300 hover:bg-amber-400 rounded-xl shadow-md transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </section>
  );
}
export default CTA;