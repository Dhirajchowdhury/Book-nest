'use client';
import Image from "next/image";

export default function BookHeader({ userEmail, onOpenAddModal, onLogout }) {
  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-10 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
            📚
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-emerald-900 tracking-tight">
              Book<span className="text-emerald-500">Nest</span>
            </h1>
            <p className="text-xs text-zinc-500 font-medium">Books details recorder</p>
          </div>
        </div>

        {/* User Email & Primary Actions */}
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {userEmail && (
            <div className="text-xs text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200 flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">👤</span>
              <span className="font-semibold text-zinc-800 truncate max-w-[180px] sm:max-w-[220px]">
                {userEmail}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span> Add Book</span>
              <span className="text-base font-bold">+</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 bg-zinc-100 hover:bg-red-50 text-zinc-700 hover:text-red-600 font-semibold text-xs sm:text-sm rounded-xl border border-zinc-200 hover:border-red-200 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
