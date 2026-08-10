import Link from "next/link";

function Hero() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header & Visual Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Friendly Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider">
              <span>📖</span> Personal Reading Companion
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              A personal space to <span className="text-emerald-600 underline decoration-amber-300 decoration-wavy decoration-2">organize & track</span> your reading.
            </h1>

            {/* Short Explanation */}
            <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              BookNest gives you a simple, quiet place to store your personal library, track books you read, rate your favorites, and keep useful notes.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all text-center"
              >
                Start Your Reading Journal
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-zinc-700 hover:text-emerald-700 bg-zinc-100 hover:bg-emerald-50 rounded-xl transition-all text-center border border-zinc-200"
              >
                See How It Works ↓
              </a>
            </div>
          </div>

          {/* Visual Area: Handmade CSS/SVG Reading Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-amber-300"></div>

              {/* Decorative Card Header */}
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wide">My Reading Nest</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-200 text-amber-900 text-xs font-bold">In Progress</span>
              </div>

              {/* Book Preview Sample */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-emerald-100 flex gap-4 items-start shadow-2xs">
                  {/* Book Spine Icon */}
                  <div className="w-12 h-16 bg-emerald-600 rounded-md flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-xs">
                    📚
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-zinc-900 text-sm">The Great Gatsby</h3>
                    <p className="text-xs text-zinc-500">by F. Scott Fitzgerald</p>
                    <div className="flex items-center gap-1 text-amber-400 text-xs pt-1">
                      ★★★★★ <span className="text-zinc-400 text-[10px] ml-1">(5/5)</span>
                    </div>
                  </div>
                </div>

                {/* Personal Note Callout */}
                <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <p className="font-semibold flex items-center gap-1">
                    📝 Personal Note:
                  </p>
                  <p className="italic text-amber-800">
                    &ldquo;Loved the themes of hope and nostalgia. A timeless classic to revisit every summer.&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Section 3: WHAT YOU CAN EXPECT */}
        <div className="mt-16 pt-12 border-t border-zinc-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">What You Can Expect</h2>
            <p className="text-sm text-zinc-600 mt-1">Four simple promises for your reading habits.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Expectation Card 1 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                🗂️
              </div>
              <h3 className="font-bold text-zinc-900 text-base mb-1">Organized Reading</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Keep every book categorized and easy to access whenever you want.
              </p>
            </div>

            {/* Expectation Card 2 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                📚
              </div>
              <h3 className="font-bold text-zinc-900 text-base mb-1">Personal Library</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Build your own collection without clutter, ads, or distraction.
              </p>
            </div>

            {/* Expectation Card 3 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                📈
              </div>
              <h3 className="font-bold text-zinc-900 text-base mb-1">Track Progress</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Easily monitor what you are currently reading, completed, or plan to read.
              </p>
            </div>

            {/* Expectation Card 4 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                💡
              </div>
              <h3 className="font-bold text-zinc-900 text-base mb-1">Everything In One Place</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Store ratings, personal thoughts, and details in one comfortable nest.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
export default Hero;