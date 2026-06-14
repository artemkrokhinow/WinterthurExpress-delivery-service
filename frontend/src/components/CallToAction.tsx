import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative bg-brand-charcoal rounded-3xl px-8 md:px-20 py-20 text-center overflow-hidden shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-grass/15 rounded-full blur-[80px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-grass/10 rounded-full blur-[60px] mix-blend-screen pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-sm font-bold text-brand-grass uppercase tracking-widest mb-4">Ready to Start?</div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
              Book your first delivery<br/>
              <span className="text-brand-grass">in 2 minutes</span>
            </h2>
            <p className="text-brand-silver/70 font-medium max-w-lg mx-auto mb-10 text-base leading-relaxed">
              No registration, no hidden fees. Just enter the addresses — and we will calculate the cost instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/calculation" 
                className="px-10 py-4 bg-brand-grass hover:bg-[#72cc35] text-brand-charcoal font-black rounded-2xl transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-brand-grass/20"
              >
                Book Delivery
                <ArrowRight size={18} strokeWidth={3} />
              </Link>
              <a 
                href="tel:+41440000000" 
                className="px-10 py-4 border border-white/20 hover:border-brand-grass text-white hover:text-brand-grass font-bold rounded-2xl transition-all flex items-center gap-2"
              >
                <Phone size={18} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
