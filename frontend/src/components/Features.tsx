import { CheckCircle2, ArrowRight } from "lucide-react";
import bgImage from "../../Union (1).svg";

const features = [
  "Instant cost calculation right in the form, no page reloads.",
  "Assignment of the nearest top-rated courier in 7 minutes.",
  "Booking delivery without mandatory registration.",
  "Route can be changed on the go — the courier is notified instantly.",
  "Card payment at any address. Cashless payments for businesses.",
  "SMS notifications at every stage of the order.",
  "Delivery of cargo up to 1.5 tons: documents, electronics, furniture.",
];

export function Features() {
  return (
    <section className="pt-32 pb-10 text-white relative bg-[#424B54]">
      {/* Декоративная кривая — выступает за нижнюю границу секции */}
      <div className="absolute left-0 w-full -bottom-[10vw] pointer-events-none">
        <svg 
          className="w-full block" 
          viewBox="0 400 1905 480" 
          fill="none" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '10vw' }}
        >
          <rect x="0" y="400" width="1905" height="480" fill="white"/>
          <path d="M1904 437.812H1904.39V823.986C1895.58 615.705 1785.65 449.444 1648.73 438.312H0V400H1904V437.812Z" fill="#424B54"/>
          <path d="M1904.39 879.745L1904.31 879.621C1904.34 879.083 1904.36 878.545 1904.39 878.006V879.745Z" fill="#424B54"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side */}
          <div className="space-y-8">
            <div className="text-base font-bold text-brand-grass uppercase tracking-widest">Why Choose Us</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
              Revolution<br/>
              <span className="text-brand-grass">in</span><br/>
              Logistics
            </h2>
            
            <div className="space-y-4 pt-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <CheckCircle2 className="text-brand-grass shrink-0 mt-0.5" size={24} />
                  <p className="text-white/90 text-base leading-relaxed font-semibold group-hover:text-white transition-colors">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-4 px-10 py-5 bg-brand-grass hover:bg-[#72cc35] text-brand-charcoal font-black text-lg rounded-2xl transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-brand-grass/15 hover:shadow-brand-grass/30">
              Calculate Cost
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Right side — Dashboard mockup */}
          <div className="relative">
            {/* Decorative glow behind card */}
            <div className="absolute -inset-10 bg-brand-grass/5 rounded-full blur-3xl"></div>
            
            <div className="relative bg-[#2E353B] rounded-3xl border border-white/10 p-8 shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                <div className="h-8 flex-1 ml-3 bg-white/10 rounded-lg flex items-center px-4">
                  <span className="text-xs text-white/50 font-mono">winterthurexpress.ch/dashboard</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="space-y-5">
                {/* Status bar */}
                <div className="flex items-center justify-between bg-brand-grass/10 border border-brand-grass/20 rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-brand-grass animate-pulse"></div>
                    <span className="text-brand-grass text-base font-bold">3 active deliveries</span>
                  </div>
                  <span className="text-brand-grass/80 text-sm font-mono font-bold">Live</span>
                </div>

                {/* Rows */}
                <div className="bg-white/5 rounded-xl p-5 flex items-center justify-between border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-grass/20 flex items-center justify-center text-brand-grass text-sm font-black">W</div>
                    <div>
                      <div className="text-white text-base font-bold">Winterthur → Zürich</div>
                      <div className="text-white/60 text-sm font-medium mt-0.5">Documents · 2.4 kg</div>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-brand-grass/20 text-brand-grass text-sm font-bold rounded-full">In Transit</div>
                </div>

                <div className="bg-white/5 rounded-xl p-5 flex items-center justify-between border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-silver/20 flex items-center justify-center text-brand-silver text-sm font-black">B</div>
                    <div>
                      <div className="text-white text-base font-bold">Bern → Basel</div>
                      <div className="text-white/60 text-sm font-medium mt-0.5">Electronics · 12 kg</div>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-white/10 text-white/80 text-sm font-bold rounded-full">Pending</div>
                </div>

                <div className="bg-white/5 rounded-xl p-5 flex items-center justify-between border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-grass flex items-center justify-center text-brand-charcoal text-sm font-black">L</div>
                    <div>
                      <div className="text-white text-base font-bold">Luzern → Genève</div>
                      <div className="text-white/60 text-sm font-medium mt-0.5">Furniture · 85 kg</div>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-brand-grass text-brand-charcoal text-sm font-bold rounded-full">Delivered ✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
