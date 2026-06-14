import Link from "next/link";
import { Search, Menu, ArrowRight, Package } from "lucide-react";
import { AuthButton } from "./AuthButton";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-brand-silver/30 shadow-sm print:hidden">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Логотип */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-charcoal flex items-center justify-center text-brand-grass font-bold text-xl shadow-lg transition-transform group-hover:scale-105">
              W
            </div>
            <h1 className="text-2xl font-black tracking-tight text-brand-charcoal">
              Winterthur<span className="text-brand-grass">Express</span>
            </h1>
          </Link>
        </div>

        {/* Десктопная навигация */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <Link href="/tracking" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal hover:text-brand-grass transition-colors">
            <Search size={18} />
            <span>Track Package</span>
          </Link>

          <Link 
            href="/orders" 
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-brand-charcoal text-brand-charcoal text-sm font-bold hover:bg-brand-charcoal/5 transition-all active:scale-95"
          >
            <Package size={16} />
            <span>My Orders</span>
          </Link>

          <Link 
            href="/calculation" 
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-grass text-brand-charcoal text-sm font-bold hover:bg-[#72c938] transition-all active:scale-95 group shadow-lg shadow-brand-grass/20"
          >
            <span className="hidden sm:inline">Book Delivery</span>
            <span className="sm:hidden">Book</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex items-center border-l border-brand-charcoal/10 pl-5 lg:pl-6 ml-1 lg:ml-2">
            <AuthButton />
          </div>
        </div>

        {/* Мобильная кнопка */}
        <button className="md:hidden p-2 text-white hover:text-brand-grass transition-colors">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}
