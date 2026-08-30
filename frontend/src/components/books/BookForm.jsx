'use client';

import { useState, useEffect } from 'react';

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function BookForm({ initialData, onSave, onCancel, submitting }) {
  const [formData, setFormData] = useState(() => ({
    title: initialData?.title || '',
    author: initialData?.author || '',
    cover_image_url: initialData?.cover_image_url || '',
    status: initialData?.status || 'Want to Read',
    rating: initialData?.rating !== null && initialData?.rating !== undefined ? String(initialData.rating) : '',
    personal_notes: initialData?.personal_notes || '',
  }));

  const [pdfFile, setPdfFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formError, setFormError] = useState('');

  // Format Bytes helper
  const formatBytes = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Validate & Select File
  const handleSelectFile = (file) => {
    setFormError('');

    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setFormError('Only PDF files (.pdf) are allowed.');
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setFormError(`PDF size exceeds the maximum limit of ${MAX_SIZE_MB}MB.`);
      return;
    }

    setPdfFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSelectFile(file);
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleSelectFile(file);
    }
  };

  // Handle Text/Select Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'status' && value !== 'Finished') {
        updated.rating = '';
      }
      return updated;
    });
  };

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) {
      setFormError('Book title is required.');
      return;
    }
    if (!formData.author.trim()) {
      setFormError('Author name is required.');
      return;
    }

    if (formData.status === 'Finished' && formData.rating) {
      const parsedRating = Number(formData.rating);
      if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        setFormError('Rating must be between 1 and 5.');
        return;
      }
    }

    // Call parent save handler with metadata & selected PDF file
    onSave(
      {
        title: formData.title.trim(),
        author: formData.author.trim(),
        cover_image_url: formData.cover_image_url.trim() || null,
        status: formData.status,
        rating: formData.status === 'Finished' && formData.rating ? Number(formData.rating) : null,
        personal_notes: formData.personal_notes.trim() || null,
      },
      pdfFile
    );
  };

  const isEditMode = Boolean(initialData);
  const existingDocument = initialData?.document;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-xl max-w-md w-full p-6 space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h2 className="text-lg font-extrabold text-emerald-950">
            {isEditMode ? '✏️ Edit Book' : '➕ Add New Book'}
          </h2>
          <button
            onClick={onCancel}
            className="text-zinc-400 hover:text-zinc-600 font-bold text-lg p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Error Alert */}
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-semibold">
            {formError}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Do It Today"
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. Darius Foroux"
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              required
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">
              Cover Image URL <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          {/* Reading Status */}
          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">
              Reading Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
            >
              <option value="Want to Read">Want to Read</option>
              <option value="Reading">Reading</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          {/* Rating */}
          {formData.status === 'Finished' && (
            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 space-y-1">
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                Rating (1 to 5 Stars)
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-white border border-emerald-200 rounded-xl font-semibold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="">Select a rating (Optional)</option>
                <option value="1">★ 1 - Poor</option>
                <option value="2">★★ 2 - Fair</option>
                <option value="3">★★★ 3 - Good</option>
                <option value="4">★★★★ 4 - Very Good</option>
                <option value="5">★★★★★ 5 - Excellent</option>
              </select>
            </div>
          )}

          {/* Personal Notes */}
          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">
              Personal Notes <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <textarea
              name="personal_notes"
              rows={2}
              value={formData.personal_notes}
              onChange={handleChange}
              placeholder="Write your personal thoughts or favorite quotes..."
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
            />
          </div>

          {/* Book PDF Upload Dropzone */}
          <div className="pt-1">
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1">
              Book PDF <span className="text-zinc-400 font-normal">(Optional - Max {MAX_SIZE_MB}MB)</span>
            </label>

            {/* Existing Attached PDF Info */}
            {existingDocument && !pdfFile && (
              <div className="mb-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-lg">📄</span>
                  <div className="truncate">
                    <span className="text-xs font-bold text-emerald-900 block truncate">
                      {existingDocument.file_name}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700">
                      Current PDF • {formatBytes(existingDocument.file_size)} • {existingDocument.processing_status}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  Attached
                </span>
              </div>
            )}

            {/* Selected New File Banner */}
            {pdfFile ? (
              <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="text-xl">📄</span>
                  <div className="truncate">
                    <span className="text-xs font-bold text-zinc-900 block truncate">{pdfFile.name}</span>
                    <span className="text-[11px] font-semibold text-emerald-800">{formatBytes(pdfFile.size)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPdfFile(null)}
                  className="text-xs font-bold text-red-600 hover:text-red-800 px-2 py-1 bg-white rounded-lg border border-red-200 transition-colors cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              /* Dropzone Container */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-zinc-200 hover:border-emerald-400 bg-zinc-50/50'
                }`}
                onClick={() => document.getElementById('pdf-file-input')?.click()}
              >
                <input
                  id="pdf-file-input"
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">📥</span>
                  <p className="text-xs font-bold text-zinc-700">
                    {existingDocument ? 'Click or drag to replace PDF' : 'Click or drag PDF to upload'}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-medium">PDF only (Max {MAX_SIZE_MB}MB)</p>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
