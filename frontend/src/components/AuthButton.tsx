"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-brand-silver/20 animate-pulse"></div>;
  }

  if (session && session.user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user.image ? (
            <Image 
              src={session.user.image} 
              alt={session.user.name || "User"} 
              width={32} 
              height={32} 
              className="rounded-full border-2 border-brand-grass/50 shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-charcoal text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {session.user.name?.charAt(0) || "U"}
            </div>
          )}
          <span className="text-sm font-bold text-brand-charcoal hidden lg:block">
            {session.user.name?.split(" ")[0]}
          </span>
        </div>
        <button 
          onClick={() => signOut()}
          className="text-xs font-medium text-brand-charcoal/60 hover:text-red-500 transition-colors"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <Link 
      href="/login"
      className="text-sm font-bold text-white/90 hover:text-brand-grass transition-colors flex items-center gap-2"
    >
      Log in
    </Link>
  );
}
