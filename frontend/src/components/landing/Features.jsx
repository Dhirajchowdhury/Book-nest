/**
 * Features Component
 * Purpose: Presents the 9 core capabilities of BookNest.
 * Displays only requested features cleanly without bloat.
 */
export default function Features() {
  // Array of exact 9 requested features
  const coreFeatures = [
    {
      title: "Add Books",
      description: "Quickly insert new books to your personal nest with title, author, and details.",
      icon: "➕",
    },
    {
      title: "View Books",
      description: "Browse your complete book collection in a clean, visual card layout.",
      icon: "📖",
    },
    {
      title: "Edit Books",
      description: "Update book details, authors, or genres whenever you need to make changes.",
      icon: "✏️",
    },
    {
      title: "Delete Books",
      description: "Remove books from your collection to keep your library clean and accurate.",
      icon: "🗑️",
    },
    {
      title: "Search Books",
      description: "Find any book instantly by searching for titles or author names.",
      icon: "🔍",
    },
    {
      title: "Filter Books",
      description: "Sort and view books by reading status like Currently Reading, Finished, or Want to Read.",
      icon: "🧹",
    },
    {
      title: "Track Reading Status",
      description: "Keep accurate tabs on what you've completed and what you plan to read next.",
      icon: "📌",
    },
    {
      title: "Add Ratings",
      description: "Give star ratings to your books so you always remember your favorites.",
      icon: "⭐",
    },
    {
      title: "Add Personal Notes",
      description: "Jot down meaningful quotes, takeaways, or personal thoughts for each book.",
      icon: "📝",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Everything You Need To Track Books
          </h2>
          <p className="text-zinc-600 mt-2 text-base">
            No bloated features. Just simple, essential tools for avid readers.
          </p>
        </div>

        {/* 9 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-400 hover:shadow-sm transition-all flex items-start gap-4"
            >
              {/* Icon Container with Yellow Touch */}
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex-shrink-0 flex items-center justify-center text-xl shadow-2xs">
                {feature.icon}
              </div>

              {/* Title & Text */}
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
