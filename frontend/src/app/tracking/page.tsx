import { Search, Package, MapPin, Clock } from "lucide-react";

export default function TrackingPage() {
  return (
    <div className="pt-32 pb-24 bg-brand-silver/10 min-h-screen">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="w-20 h-20 bg-brand-grass text-brand-charcoal rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-grass/20">
          <Search size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal mb-6 tracking-tight text-center">Order Tracking</h1>
        <p className="text-xl text-brand-charcoal/80 font-medium mb-12 text-center max-w-2xl">
          Enter your order number or tracking code to find out the current location of the courier and delivery status.
        </p>
        
        <div className="w-full max-w-3xl bg-white shadow-2xl shadow-brand-charcoal/5 rounded-3xl p-8 md:p-12 border border-brand-silver/30">
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Package className="absolute left-5 top-5 text-brand-charcoal/40" size={24} />
              <input 
                type="text" 
                placeholder="Example: WEX-123456789"
                className="w-full pl-14 pr-6 py-5 bg-brand-silver/10 border-2 border-brand-silver/30 rounded-2xl focus:border-brand-grass focus:ring-4 focus:ring-brand-grass/20 outline-none transition-all font-bold text-brand-charcoal text-lg placeholder:text-brand-charcoal/40"
              />
            </div>
            <button className="px-10 py-5 bg-brand-grass hover:bg-[#72c938] text-brand-charcoal font-black rounded-2xl transition-all shadow-lg shadow-brand-grass/30 text-lg uppercase tracking-wider">
              Track
            </button>
          </div>

          <div className="border-t border-brand-silver/30 pt-8 mt-8">
            <h3 className="text-lg font-bold text-brand-charcoal mb-6">How to find the tracking number?</h3>
            <ul className="space-y-4 text-brand-charcoal/70 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-charcoal/10 flex items-center justify-center text-brand-charcoal"><Clock size={16}/></div>
                The number was sent to you via SMS when you placed your order.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-charcoal/10 flex items-center justify-center text-brand-charcoal"><MapPin size={16}/></div>
                You can also find it on the receipt provided by the courier.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
