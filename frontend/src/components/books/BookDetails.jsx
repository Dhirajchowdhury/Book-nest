'use client';

import { useState } from 'react';

export default function BookDetails({ book, onClose, onDeleteDocument }) {
  const [loadingPdfUrl, setLoadingPdfUrl] = useState(false);
  const [pdfError, setPdfError] = useState('');

  if (!book) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleOpenPdf = async () => {
    setLoadingPdfUrl(true);
    setPdfError('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/books/${book.id}/document/url`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch PDF URL.');
      }

      if (data.signedUrl) {
        window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('No signed URL returned.');
      }
    } catch (err) {
      console.error('Error fetching PDF URL:', err.message);
      setPdfError(err.message);
    } finally {
      setLoadingPdfUrl(false);
    }
  };

  const document = book.document;

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

          {/* Book PDF Section */}
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 space-y-2">
            <span className="block text-xs font-bold text-emerald-950 uppercase tracking-wider">
              Book PDF Document
            </span>

            {document ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 bg-white p-3 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="text-2xl shrink-0">📄</span>
                    <div className="truncate">
                      <span className="text-xs font-bold text-zinc-900 block truncate">
                        {document.file_name}
                      </span>
                      <span className="text-[11px] font-semibold text-zinc-500">
                        {formatBytes(document.file_size)} • {document.mime_type}
                      </span>
                    </div>
                  </div>

                  <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md uppercase tracking-wider border border-emerald-200 shrink-0">
                    {document.processing_status || 'uploaded'}
                  </span>
                </div>

                {pdfError && (
                  <p className="text-xs font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
                    ⚠️ {pdfError}
                  </p>
                )}

                <div className="flex items-center gap-2 justify-end">
                  {onDeleteDocument && (
                    <button
                      onClick={() => onDeleteDocument(book.id)}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-lg border border-red-200 transition-colors cursor-pointer"
                    >
                      Delete PDF
                    </button>
                  )}

                  <button
                    onClick={handleOpenPdf}
                    disabled={loadingPdfUrl}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span>{loadingPdfUrl ? 'Generating Link...' : 'View / Download PDF'}</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-500 font-medium">No PDF document attached to this book.</p>
            )}
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
