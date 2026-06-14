import Link from "next/link";
import Image from "next/image";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export default function RegisterPage() {
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
            Premium Service
          </div>
          <h2 className="text-4xl font-black mb-4 leading-tight">Fast and reliable delivery.</h2>
          <p className="text-brand-silver/80">
            Join thousands of satisfied customers in Switzerland and send packages with comfort.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-7/12 bg-white flex flex-col justify-center px-8 sm:px-16 md:px-24 py-24">
        
        <div className="w-full max-w-xl mx-auto">
          <h1 className="text-4xl font-black text-brand-charcoal mb-2 tracking-tight">Create Account</h1>
          <p className="text-brand-charcoal/60 mb-8">Get started with Winterthur Express.</p>
          
          <div className="mb-8">
            <GoogleSignInButton />
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 border-t border-brand-silver/30"></div>
            <div className="text-xs font-bold text-brand-charcoal/40 uppercase tracking-widest">or with email</div>
            <div className="flex-1 border-t border-brand-silver/30"></div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-2 pl-1">First Name</label>
                <input 
                  type="text" 
                  placeholder="John"
                  className="w-full px-5 py-4 bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl focus:ring-2 focus:ring-brand-grass/50 focus:border-brand-grass outline-none transition-all font-medium text-brand-charcoal placeholder:text-brand-charcoal/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-2 pl-1">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  className="w-full px-5 py-4 bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl focus:ring-2 focus:ring-brand-grass/50 focus:border-brand-grass outline-none transition-all font-medium text-brand-charcoal placeholder:text-brand-charcoal/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-2 pl-1">Phone</label>
                <input 
                  type="tel" 
                  placeholder="+41"
                  className="w-full px-5 py-4 bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl focus:ring-2 focus:ring-brand-grass/50 focus:border-brand-grass outline-none transition-all font-medium text-brand-charcoal placeholder:text-brand-charcoal/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-2 pl-1">Email</label>
                <input 
                  type="email" 
                  placeholder="hello@example.com"
                  className="w-full px-5 py-4 bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl focus:ring-2 focus:ring-brand-grass/50 focus:border-brand-grass outline-none transition-all font-medium text-brand-charcoal placeholder:text-brand-charcoal/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-2 pl-1">Address (Country, City, Street)</label>
              <input 
                type="text" 
                placeholder="Switzerland, Winterthur, Bahnhofplatz 1"
                className="w-full px-5 py-4 bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl focus:ring-2 focus:ring-brand-grass/50 focus:border-brand-grass outline-none transition-all font-medium text-brand-charcoal placeholder:text-brand-charcoal/30"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-2 pl-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl focus:ring-2 focus:ring-brand-grass/50 focus:border-brand-grass outline-none transition-all font-medium text-brand-charcoal placeholder:text-brand-charcoal/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-2 pl-1">Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl focus:ring-2 focus:ring-brand-grass/50 focus:border-brand-grass outline-none transition-all font-medium text-brand-charcoal placeholder:text-brand-charcoal/30"
                />
              </div>
            </div>
            
            <div className="pt-2 flex flex-col gap-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 rounded text-brand-grass focus:ring-brand-grass cursor-pointer" />
                <span className="text-sm text-brand-charcoal/70 group-hover:text-brand-charcoal transition-colors">
                  I want to receive news and special offers from Winterthur Express.
                </span>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 rounded text-brand-grass focus:ring-brand-grass cursor-pointer" />
                <span className="text-sm text-brand-charcoal/70 group-hover:text-brand-charcoal transition-colors">
                  I agree to the <a href="#" className="text-brand-grass hover:underline font-bold">Terms of Service</a> and <a href="#" className="text-brand-grass hover:underline font-bold">Privacy Policy</a>.
                </span>
              </label>
            </div>

            <button className="w-full mt-4 py-5 bg-brand-charcoal hover:bg-black text-white font-black text-lg rounded-2xl transition-all shadow-xl active:scale-[0.98]">
              Sign Up
            </button>
          </form>
          
          <p className="text-center text-brand-charcoal/60 mt-10 font-medium">
            Already have an account? <Link href="/login" className="text-brand-grass font-black hover:underline ml-1">Log in</Link>
          </p>

        </div>
      </div>

    </div>
  );
}
