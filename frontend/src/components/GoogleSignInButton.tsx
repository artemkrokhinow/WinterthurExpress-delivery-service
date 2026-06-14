"use client";

import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  return (
    <button 
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl transition-all shadow-sm mb-6"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.81 15.69 17.59V20.34H19.26C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.59C14.71 18.25 13.46 18.66 12 18.66C9.18 18.66 6.78 16.75 5.92 14.18H2.22V17.05C4.02 20.63 7.71 23 12 23Z" fill="#34A853"/>
        <path d="M5.92 14.18C5.7 13.52 5.57 12.78 5.57 12C5.57 11.22 5.7 10.48 5.92 9.82V6.95H2.22C1.47 8.44 1.04 10.17 1.04 12C1.04 13.83 1.47 15.56 2.22 17.05L5.92 14.18Z" fill="#FBBC05"/>
        <path d="M12 5.34C13.62 5.34 15.06 5.89 16.2 6.98L19.34 3.84C17.46 2.08 14.97 1 12 1C7.71 1 4.02 3.37 2.22 6.95L5.92 9.82C6.78 7.25 9.18 5.34 12 5.34Z" fill="#EA4335"/>
      </svg>
      Continue with Google
    </button>
  );
}
