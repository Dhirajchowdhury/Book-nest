'use client';

/**
 * BookDetails Component
 * 
 * Displays complete information for a selected book record in a clean modal view.
 */
export default function BookDetails({ book, onClose }) {
  if (!book) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-xl max-w-lg w-full p-6 space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="text-lg font-extrabold text-emerald-950">Book Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 font-bold text-lg p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {/* Cover Image & Primary Info */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            {book.cover_image_url ? (
              <img
                src={book.cover_image_url}
                alt={book.title}
                className="w-24 h-36 object-cover rounded-xl border border-zinc-200 shadow-xs shrink-0 mx-auto sm:mx-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-24 h-36 bg-emerald-50 border border-emerald-100 rounded-xl flex flex-col items-center justify-center text-emerald-600 shrink-0 mx-auto sm:mx-0">
                <span className="text-3xl">📚</span>
                <span className="text-[10px] font-bold mt-1 text-emerald-800">No Cover</span>
              </div>
            )}

            <div className="space-y-2 text-center sm:text-left flex-1">
              <h3 className="text-xl font-extrabold text-zinc-900 leading-tight">{book.title}</h3>
              <p className="text-sm font-semibold text-zinc-600">by {book.author}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                  {book.status}
                </span>

                {book.status === 'Finished' && book.rating && (
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg border border-amber-200">
                    ★ {book.rating} / 5
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Personal Notes */}
          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 space-y-1">
            <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Personal Notes
            </span>
            <p className="text-sm text-zinc-800 font-medium whitespace-pre-line leading-relaxed">
              {book.personal_notes || 'No personal notes recorded for this book.'}
            </p>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
              <span className="block font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                Added On
              </span>
              <span className="font-semibold text-zinc-700">{formatDate(book.created_at)}</span>
            </div>

            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
              <span className="block font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                Last Updated
              </span>
              <span className="font-semibold text-zinc-700">{formatDate(book.updated_at)}</span>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="pt-2 border-t border-zinc-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
