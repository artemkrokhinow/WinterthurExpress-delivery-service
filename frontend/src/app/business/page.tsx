import { Building2, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

export default function BusinessPage() {
  return (
    <div className="pt-32 pb-24 bg-brand-silver/10 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-brand-charcoal text-brand-grass rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-xl">
            <Building2 size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal mb-6 tracking-tight">Logistics for Business</h1>
          <p className="text-xl text-brand-charcoal/80 font-medium leading-relaxed">
            Reliable partnership for your online store, restaurant, or corporation. Automate delivery and save.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-3xl border border-brand-silver/30 shadow-xl shadow-brand-charcoal/5">
            <div className="w-12 h-12 bg-brand-grass/20 rounded-xl flex items-center justify-center text-brand-charcoal mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-3">Wholesale Discounts</h3>
            <p className="text-brand-charcoal/70 font-medium">Tariff reduction up to 40% for volumes over 100 deliveries per month. Individual conditions.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-brand-silver/30 shadow-xl shadow-brand-charcoal/5">
            <div className="w-12 h-12 bg-brand-grass/20 rounded-xl flex items-center justify-center text-brand-charcoal mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-3">Personal Manager</h3>
            <p className="text-brand-charcoal/70 font-medium">Direct 24/7 support line to resolve any logistics issues for your business.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-brand-silver/30 shadow-xl shadow-brand-charcoal/5">
            <div className="w-12 h-12 bg-brand-grass/20 rounded-xl flex items-center justify-center text-brand-charcoal mb-6">
              <Building2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-3">Payment by Invoice</h3>
            <p className="text-brand-charcoal/70 font-medium">Bank transfers, acts of completed works, and full accounting reports.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-brand-charcoal rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl font-black text-white mb-6">Leave a partnership request</h2>
          <p className="text-white/80 font-medium mb-10">We will prepare a customized commercial offer for your company.</p>
          
          <form className="space-y-4 max-w-md mx-auto text-left">
            <input type="text" placeholder="Company Name" className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-brand-grass" />
            <input type="email" placeholder="Email" className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-brand-grass" />
            <input type="tel" placeholder="Phone" className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-brand-grass" />
            <button className="w-full py-4 mt-4 bg-brand-grass hover:bg-[#72c938] text-brand-charcoal font-black rounded-xl transition-all shadow-lg uppercase tracking-widest flex justify-center items-center gap-2">
              Send <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
