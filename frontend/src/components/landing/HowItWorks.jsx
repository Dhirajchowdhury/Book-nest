/**
 * HowItWorks Component
 * Purpose: Explains the simple 6-step reading journey on BookNest visually.
 * Gives visitors a clear picture of how the application flows from creating 
 * an account to tracking reading progress.
 */
function HowItWorks() {
  // Simple data array for the 6 steps of the user journey
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up in seconds to set up your personal reading nest.",
      icon: "👤",
    },
    {
      number: "02",
      title: "Login",
      description: "Access your library securely anytime from any device.",
      icon: "🔑",
    },
    {
      number: "03",
      title: "Enter Library",
      description: "Open your personal dashboard displaying your full collection.",
      icon: "📖",
    },
    {
      number: "04",
      title: "Add Book",
      description: "Input book details like title, author, and reading status.",
      icon: "➕",
    },
    {
      number: "05",
      title: "View Details",
      description: "See all information, personal ratings, and notes in one spot.",
      icon: "🔍",
    },
    {
      number: "06",
      title: "Track & Update",
      description: "Update reading progress as you finish chapters or books.",
      icon: "✅",
    },
  ];

  return (
    <section id="how-it-works" className="bg-emerald-50/40 py-16 sm:py-20 border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Simple Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            How BookNest Works
          </h2>
          <p className="text-zinc-600 mt-2 text-base">
            From sign-up to daily tracking — organized in 6 easy steps.
          </p>
        </div>

        {/* 6-Step Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs hover:shadow-xs transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-emerald-600 text-amber-300 text-lg flex items-center justify-center font-bold shadow-2xs">
                    {step.icon}
                  </span>
                  <span className="text-2xl font-black text-amber-400 opacity-90 font-mono">
                    #{step.number}
                  </span>
                </div>

                {/* Step Title & Description */}
                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Visual Bottom Accent Indicator */}
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center text-[11px] font-medium text-emerald-700">
                <span>Reading Workflow</span>
                <span className="ml-auto">↓</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default HowItWorks;