'use client';

import { useState, useEffect } from 'react';

export default function BookForm({ initialData, onSave, onCancel, submitting }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover_image_url: '',
    status: 'Want to Read',
    rating: '',
    personal_notes: '',
  });

  const [formError, setFormError] = useState('');

  // Populate form if initialData is passed (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        cover_image_url: initialData.cover_image_url || '',
        status: initialData.status || 'Want to Read',
        rating: initialData.rating !== null && initialData.rating !== undefined ? String(initialData.rating) : '',
        personal_notes: initialData.personal_notes || '',
      });
    }
  }, [initialData]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // If status is changed away from Finished, clear rating automatically
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

    // Simple Frontend Validation
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

    // Call parent save handler
    onSave({
      title: formData.title.trim(),
      author: formData.author.trim(),
      cover_image_url: formData.cover_image_url.trim() || null,
      status: formData.status,
      rating: formData.status === 'Finished' && formData.rating ? Number(formData.rating) : null,
      personal_notes: formData.personal_notes.trim() || null,
    });
  };

  const isEditMode = Boolean(initialData);

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
              placeholder="e.g. Darius Foroux."
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

          {/* Rating (Only shown/enabled when status === 'Finished') */}
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
              rows={3}
              value={formData.personal_notes}
              onChange={handleChange}
              placeholder="Write your personal thoughts or favorite quotes..."
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
            />
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
