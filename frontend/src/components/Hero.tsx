import Link from "next/link";
import { MapPin, ArrowRight, ShieldCheck, Clock, Zap, TrendingUp, Package, Star } from "lucide-react";
import { FloatingBoxes } from "./FloatingBoxes";
import { DeliverySearchBox } from "./ui/DeliverySearchBox";

export function Hero() {
  return (
    <section className="relative w-full min-h-[100vh] pt-28 pb-24 flex flex-col items-center justify-center bg-white">
      {/* Floating boxes canvas */}
      <div className="animate-fade-in" style={{ animationDuration: '1.5s' }}>
        <FloatingBoxes />
      </div>

      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-charcoal text-white font-bold text-base mb-8 shadow-lg animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.1s' }}>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-grass animate-pulse"></div>
          <span className="tracking-wide">Swiss Delivery Quality</span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-brand-charcoal leading-[0.95] tracking-tighter text-center max-w-5xl mb-8 animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.2s' }}>
          Delivered{" "}
          <span className="relative inline-block">
            <span className="text-brand-grass">faster</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
              <path d="M2 6C50 2 150 2 198 6" stroke="#85E743" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </span>,<br/>
          than you expect
        </h1>
        
        <p className="text-xl md:text-2xl text-brand-charcoal/80 font-semibold max-w-3xl mx-auto text-center mb-14 leading-relaxed animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
          Innovative express delivery platform for individuals and businesses. Online tracking, 100% safety guarantee.
        </p>

        {/* Calculator card */}
        <div className="w-full max-w-4xl relative animate-fade-in-up z-[100]" style={{ opacity: 0, animationDelay: '0.4s' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-grass/30 via-brand-silver/30 to-brand-grass/30 rounded-[2.5rem] blur-xl"></div>
          <DeliverySearchBox />
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mt-16 animate-fade-in-up relative z-0" style={{ opacity: 0, animationDelay: '0.5s' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-grass/20 flex items-center justify-center">
              <Clock size={24} className="text-brand-charcoal" />
            </div>
            <div>
              <div className="text-2xl font-black text-brand-charcoal">15 мин</div>
              <div className="text-sm text-brand-charcoal/70 font-bold">Courier Arrival</div>
            </div>
          </div>

          <div className="w-px h-12 bg-brand-silver/60 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-grass/20 flex items-center justify-center">
              <ShieldCheck size={24} className="text-brand-charcoal" />
            </div>
            <div>
              <div className="text-2xl font-black text-brand-charcoal">10,000 CHF</div>
              <div className="text-sm text-brand-charcoal/70 font-bold">Cargo Insurance</div>
            </div>
          </div>

          <div className="w-px h-12 bg-brand-silver/60 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-grass/20 flex items-center justify-center">
              <TrendingUp size={24} className="text-brand-charcoal" />
            </div>
            <div>
              <div className="text-2xl font-black text-brand-charcoal">4.9 ★</div>
              <div className="text-sm text-brand-charcoal/70 font-bold">Service Rating</div>
            </div>
          </div>

          <div className="w-px h-12 bg-brand-silver/60 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-grass/20 flex items-center justify-center">
              <Package size={24} className="text-brand-charcoal" />
            </div>
            <div>
              <div className="text-2xl font-black text-brand-charcoal">12,000+</div>
              <div className="text-sm text-brand-charcoal/70 font-bold">Deliveries per month</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
