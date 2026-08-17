'use client'
export default function username ({ userEmail }){
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {userEmail && (
            <div className="text-xs text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200 flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">👤</span>

              <span className="font-semibold text-zinc-800 truncate max-w-180px sm:max-w-220px">

                
                {userEmail}
              </span>
            </div>
          )}
          </div>
        }
 
        
