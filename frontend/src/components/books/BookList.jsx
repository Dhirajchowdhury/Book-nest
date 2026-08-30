'use client';

export default function BookList({
  books,
  search,
  statusFilter,
  onSearchChange,
  onFilterChange,
  onOpenAddModal,
  onViewBook,
  onEditBook,
  onDeleteBook,
  loading,
}) {
  // Helper to render status badge colors
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Finished':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Reading':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Want to Read':
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Status Filter Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        {/* Status Dropdown Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
            Filter Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="All">All Books</option>
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Finished">Finished</option>
          </select>
        </div>
      </div>

      {/* Book Records Table / Card List */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-zinc-200 text-center shadow-xs">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-sm font-semibold text-zinc-500">Loading your books...</p>
        </div>
      ) : books.length === 0 ? (
        /* Empty State */
        <div className="bg-white p-10 sm:p-14 rounded-2xl border border-zinc-200 text-center shadow-xs space-y-4">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mx-auto font-bold">
            📖
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-900">No books found</h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
              {search || statusFilter !== 'All'
                ? 'No books match your current search or filter criteria. Try clearing your filters.'
                : 'Your shelf is empty! Start building your reading collection.'}
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onOpenAddModal}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
            >
              Add Your First Book +
            </button>
          </div>
        </div>
      ) : (
        /* Book Table */
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Title & Author</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-zinc-50/80 transition-colors">
                    {/* Title & Author */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-900">{book.title}</span>
                        {book.document && (
                          <span
                            className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-extrabold rounded-md border border-emerald-200"
                            title={`PDF attached: ${book.document.file_name}`}
                          >
                            <span>📄</span> PDF
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 font-medium">by {book.author}</div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-lg border ${getStatusBadge(
                          book.status
                        )}`}
                      >
                        {book.status}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {book.status === 'Finished' && book.rating ? (
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                          <span>★</span>
                          <span className="text-zinc-800">{book.rating}/5</span>
                        </div>
                      ) : (
                        <span className="text-zinc-400 text-xs">—</span>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewBook(book)}
                          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          View
                        </button>

                        <button
                          onClick={() => onEditBook(book)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDeleteBook(book.id, book.title)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-lg border border-red-200 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
