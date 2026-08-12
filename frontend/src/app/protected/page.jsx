'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import BookHeader from '@/components/books/BookHeader';
import BookList from '@/components/books/BookList';
import BookForm from '@/components/books/BookForm';
import BookDetails from '@/components/books/BookDetails';

export default function ProtectedDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [viewingBook, setViewingBook] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  // 1. Verify Authentication Status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/auth/me`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Unauthenticated access. Please log in.');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error('Auth verification failed:', err.message);
        router.push('/login');
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [backendUrl, router]);

  // 2. Fetch User Books (with Search & Status Filter)
  const fetchBooks = useCallback(async () => {
    if (!user) return;

    setBooksLoading(true);
    setError('');

    try {
      const queryParams = new URLSearchParams();
      if (search.trim()) queryParams.append('search', search.trim());
      if (statusFilter && statusFilter !== 'All') queryParams.append('status', statusFilter);

      const url = `${backendUrl}/api/books?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to fetch books.');
      }

      const data = await response.json();
      setBooks(data.books || []);
    } catch (err) {
      console.error('Error fetching books:', err.message);
      setError(err.message);
    } finally {
      setBooksLoading(false);
    }
  }, [backendUrl, user, search, statusFilter]);

  // Trigger book fetch whenever user, search, or statusFilter changes
  useEffect(() => {
    if (user) {
      fetchBooks();
    }
  }, [user, fetchBooks]);

  // Temporary Toast Helper
  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // 3. Handle Logout
  const handleLogout = async () => {
    try {
      await fetch(`${backendUrl}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err.message);
      router.push('/login');
    }
  };

  // 4. Handle Create or Update Book Save
  const handleSaveBook = async (formData) => {
    setFormSubmitting(true);
    setError('');

    try {
      const isEdit = Boolean(editingBook);
      const url = isEdit
        ? `${backendUrl}/api/books/${editingBook.id}`
        : `${backendUrl}/api/books`;

      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Sends HttpOnly cookie
        body: JSON.stringify(formData), // NEVER sends user_id
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Failed to save book.');
      }

      showSuccess(isEdit ? 'Book updated successfully!' : 'Book created successfully!');
      setIsFormOpen(false);
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error('Save book error:', err.message);
      setError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 5. Handle Delete Book
  const handleDeleteBook = async (bookId, bookTitle) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${bookTitle}"?`);
    if (!confirmed) return;

    setError('');

    try {
      const response = await fetch(`${backendUrl}/api/books/${bookId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to delete book.');
      }

      showSuccess(`Deleted "${bookTitle}" successfully.`);
      fetchBooks();
    } catch (err) {
      console.error('Delete book error:', err.message);
      setError(err.message);
    }
  };

  // Render Loading Screen while verifying auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center shadow-xs max-w-sm w-full">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-zinc-600 font-bold text-sm">Loading BookNest Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans text-zinc-900">
      {/* Header Bar */}
      <BookHeader
        userEmail={user.email}
        onOpenAddModal={() => {
          setEditingBook(null);
          setIsFormOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        {/* Global Toast / Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-800 font-bold ml-2">
              ✕
            </button>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between">
            <span>✅ {successMessage}</span>
            <button onClick={() => setSuccessMessage('')} className="text-emerald-600 hover:text-emerald-900 font-bold ml-2">
              ✕
            </button>
          </div>
        )}

        {/* Dashboard Title Banner */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">My Book Collection</h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Manage your personal reading shelf, track progress, and record notes.
            </p>
          </div>
        </div>

        {/* Book Search, Filter, and Table List Component */}
        <BookList
          books={books}
          search={search}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onFilterChange={setStatusFilter}
          onOpenAddModal={() => {
            setEditingBook(null);
            setIsFormOpen(true);
          }}
          onViewBook={(book) => setViewingBook(book)}
          onEditBook={(book) => {
            setEditingBook(book);
            setIsFormOpen(true);
          }}
          onDeleteBook={handleDeleteBook}
          loading={booksLoading}
        />
      </main>

      {/* Reusable Form Modal (Add / Edit) */}
      {isFormOpen && (
        <BookForm
          initialData={editingBook}
          onSave={handleSaveBook}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingBook(null);
          }}
          submitting={formSubmitting}
        />
      )}

      {/* Book Details Modal */}
      {viewingBook && (
        <BookDetails
          book={viewingBook}
          onClose={() => setViewingBook(null)}
        />
      )}
    </div>
  );
}
