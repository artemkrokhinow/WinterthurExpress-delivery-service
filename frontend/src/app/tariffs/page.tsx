import { CreditCard, Zap, Weight, ArrowRight } from "lucide-react";

export default function TariffsPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="w-20 h-20 bg-brand-grass/20 text-brand-grass rounded-2xl flex items-center justify-center mb-8 mx-auto">
            <CreditCard size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal mb-6 tracking-tight">Delivery Tariffs</h1>
          <p className="text-xl text-brand-charcoal/80 font-medium">
            Transparent pricing with no hidden fees. Choose the tariff that suits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Tariff 1 */}
          <div className="bg-white rounded-3xl p-10 border-2 border-brand-silver/20 hover:border-brand-grass hover:shadow-2xl hover:shadow-brand-grass/10 transition-all flex flex-col">
            <h3 className="text-2xl font-black text-brand-charcoal mb-2">Standard</h3>
            <p className="text-brand-charcoal/60 font-medium mb-6">Same-day delivery</p>
            <div className="text-4xl font-black text-brand-charcoal mb-8">from 15 CHF</div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-brand-charcoal font-medium">
                <div className="w-6 h-6 rounded-full bg-brand-grass/20 flex items-center justify-center text-brand-grass"><Weight size={14}/></div>
                Up to 5 kg
              </li>
              <li className="flex items-center gap-3 text-brand-charcoal font-medium">
                <div className="w-6 h-6 rounded-full bg-brand-grass/20 flex items-center justify-center text-brand-grass"><Zap size={14}/></div>
                Pickup within 2 hours
              </li>
            </ul>
            <button className="w-full py-4 bg-brand-silver/20 hover:bg-brand-silver/30 text-brand-charcoal font-bold rounded-xl transition-all">
              Select
            </button>
          </div>

          {/* Tariff 2 */}
          <div className="bg-brand-charcoal rounded-3xl p-10 border-2 border-brand-charcoal shadow-2xl shadow-brand-charcoal/20 relative flex flex-col transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-grass text-brand-charcoal font-bold px-4 py-1 rounded-full text-sm uppercase tracking-widest">Popular</div>
            <h3 className="text-2xl font-black text-white mb-2">Express</h3>
            <p className="text-white/60 font-medium mb-6">Delivery in 90 minutes</p>
            <div className="text-4xl font-black text-brand-grass mb-8">from 25 CHF</div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-white font-medium">
                <div className="w-6 h-6 rounded-full bg-brand-grass/20 flex items-center justify-center text-brand-grass"><Weight size={14}/></div>
                Up to 20 kg
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <div className="w-6 h-6 rounded-full bg-brand-grass/20 flex items-center justify-center text-brand-grass"><Zap size={14}/></div>
                Courier pickup in 15 minutes
              </li>
            </ul>
            <button className="w-full py-4 bg-brand-grass hover:bg-[#72c938] text-brand-charcoal font-bold rounded-xl transition-all shadow-lg shadow-brand-grass/20">
              Select
            </button>
          </div>

          {/* Tariff 3 */}
          <div className="bg-white rounded-3xl p-10 border-2 border-brand-silver/20 hover:border-brand-grass hover:shadow-2xl hover:shadow-brand-grass/10 transition-all flex flex-col">
            <h3 className="text-2xl font-black text-brand-charcoal mb-2">Cargo</h3>
            <p className="text-brand-charcoal/60 font-medium mb-6">For bulky goods</p>
            <div className="text-4xl font-black text-brand-charcoal mb-8">from 80 CHF</div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-brand-charcoal font-medium">
                <div className="w-6 h-6 rounded-full bg-brand-grass/20 flex items-center justify-center text-brand-grass"><Weight size={14}/></div>
                Up to 1500 kg
              </li>
              <li className="flex items-center gap-3 text-brand-charcoal font-medium">
                <div className="w-6 h-6 rounded-full bg-brand-grass/20 flex items-center justify-center text-brand-grass"><Zap size={14}/></div>
                Pickup within an hour
              </li>
            </ul>
            <button className="w-full py-4 bg-brand-silver/20 hover:bg-brand-silver/30 text-brand-charcoal font-bold rounded-xl transition-all">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
