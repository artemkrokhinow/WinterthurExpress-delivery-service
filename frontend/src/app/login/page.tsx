import Link from "next/link";
import Image from "next/image";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      
      {/* Left Column - Image/Branding */}
      <div className="hidden lg:block w-5/12 bg-brand-charcoal relative">
        <Image 
          src="/images/delivery-illustration.png" 
          alt="Winterthur Express"
          fill
          className="object-cover opacity-80 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent"></div>
        
        <div className="absolute bottom-12 left-12 right-12 z-10 text-white">
          <div className="inline-block px-4 py-2 bg-brand-grass/20 backdrop-blur-md rounded-full text-brand-grass font-bold text-sm mb-6 border border-brand-grass/30">
            Welcome back
          </div>
          <h2 className="text-4xl font-black mb-4 leading-tight">We missed you.</h2>
          <p className="text-brand-silver/80">
            Log in to your personal account to manage your shipments, track packages, and save time.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-7/12 bg-white flex flex-col justify-center px-8 sm:px-16 md:px-24 py-24">
        
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-black text-brand-charcoal mb-2 tracking-tight">Welcome back.</h1>
          <p className="text-brand-charcoal/60 mb-8">Log into your account to continue.</p>
          
          <div className="mb-8">
            <GoogleSignInButton />
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 border-t border-brand-silver/30"></div>
            <div className="text-xs font-bold text-brand-charcoal/40 uppercase tracking-widest">or with email</div>
            <div className="flex-1 border-t border-brand-silver/30"></div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-2 pl-1">Email</label>
              <input 
                type="email" 
                placeholder="hello@example.com"
                className="w-full px-5 py-4 bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl focus:ring-2 focus:ring-brand-grass/50 focus:border-brand-grass outline-none transition-all font-medium text-brand-charcoal placeholder:text-brand-charcoal/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-2 pl-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl focus:ring-2 focus:ring-brand-grass/50 focus:border-brand-grass outline-none transition-all font-medium text-brand-charcoal placeholder:text-brand-charcoal/30"
              />
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="rounded text-brand-grass focus:ring-brand-grass cursor-pointer" />
                <span className="text-sm font-medium text-brand-charcoal/70 group-hover:text-brand-charcoal transition-colors">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm font-bold text-brand-grass hover:underline transition-colors">
                Forgot password?
              </a>
            </div>

            <button className="w-full mt-4 py-5 bg-brand-charcoal hover:bg-black text-white font-black text-lg rounded-2xl transition-all shadow-xl active:scale-[0.98]">
              Log in
            </button>
          </form>
          
          <p className="text-center text-brand-charcoal/60 mt-10 font-medium">
            Don't have an account? <Link href="/register" className="text-brand-grass font-black hover:underline ml-1">Sign up</Link>
          </p>

        </div>
      </div>

    </div>
  );
}
