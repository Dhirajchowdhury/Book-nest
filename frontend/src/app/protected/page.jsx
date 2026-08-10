'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';

/**
 * Protected Page Component
 * 
 * Demonstrates:
 * 1. Verification of JWT stored in HttpOnly cookie by calling GET /api/auth/me
 * 2. Auth persistence across browser page refreshes
 * 3. Logout capability (clearing HttpOnly cookie via backend POST /api/auth/logout)
 */
export default function ProtectedPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch current authenticated user on page mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${backendUrl}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Includes HttpOnly JWT cookie automatically
        });

        if (!response.ok) {
          throw new Error('Unauthenticated access. Please log in.');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${backendUrl}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        {loading && (
          <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center shadow-xs">
            <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-zinc-600 font-semibold text-sm">Verifying authentication status...</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-white p-8 rounded-2xl border border-red-200 text-center shadow-xs space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl mx-auto font-bold">
              🔒
            </div>
            <h2 className="text-xl font-bold text-zinc-900">Protected Route Access Denied</h2>
            <p className="text-sm text-zinc-600 max-w-md mx-auto">{error}</p>
            <div>
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}

        {!loading && user && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <span className="inline-block px-3 py-1 bg-amber-300 text-amber-950 font-bold text-xs rounded-md uppercase tracking-wider">
                  ✅ Authentication Verified
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome to BookNest!</h1>
                <p className="text-emerald-100 text-sm">
                  You are viewing a protected backend endpoint (<code className="bg-emerald-950 px-2 py-0.5 rounded text-amber-300 font-mono text-xs">GET /api/auth/me</code>).
                </p>
              </div>
            </div>

            {/* Authenticated User Info Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-emerald-950 border-b border-zinc-100 pb-3 flex items-center gap-2">
                <span>👤</span> User Account Profile
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    User Identifier (ID)
                  </span>
                  <span className="font-mono text-xs text-emerald-900 break-all">{user.id}</span>
                </div>

                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Email Address
                  </span>
                  <span className="font-semibold text-zinc-900">{user.email}</span>
                </div>

                {user.created_at && (
                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 sm:col-span-2">
                    <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Account Creation Timestamp
                    </span>
                    <span className="text-xs text-zinc-700">{new Date(user.created_at).toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Technical Verification Details */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-1.5">
                <p className="font-bold flex items-center gap-1.5">
                  <span>ℹ️</span> Verification Proof:
                </p>
                <ul className="list-disc list-inside space-y-1 text-amber-800">
                  <li>JWT is securely stored in an <strong>HttpOnly cookie</strong> (invisible to client JavaScript).</li>
                  <li>Password hash is <strong>never</strong> returned by the backend.</li>
                  <li>Refreshing this page maintains your login session seamlessly.</li>
                </ul>
              </div>

              {/* Logout Action */}
              <div className="pt-4 border-t border-zinc-100 flex justify-end">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
