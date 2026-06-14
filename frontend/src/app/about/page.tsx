import { Building, Truck, ShieldCheck, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-brand-charcoal text-brand-grass rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-xl">
            <Building size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal mb-6 tracking-tight">
            About Winterthur<span className="text-brand-grass">Express</span>
          </h1>
          <p className="text-xl text-brand-charcoal/80 font-medium leading-relaxed">
            We are a premium express courier delivery service. Our goal is to make logistics in Switzerland as fast, reliable, and eco-friendly as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-brand-silver/10 p-8 rounded-3xl border border-brand-silver/30">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-grass mb-6 shadow-sm">
              <Truck size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-3">Speed</h3>
            <p className="text-brand-charcoal/70 font-medium">Lightning-fast courier dispatch and same-day express delivery along key routes.</p>
          </div>
          <div className="bg-brand-silver/10 p-8 rounded-3xl border border-brand-silver/30">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-grass mb-6 shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-3">Reliability</h3>
            <p className="text-brand-charcoal/70 font-medium">Full financial responsibility and transparent tracking at every stage.</p>
          </div>
          <div className="bg-brand-silver/10 p-8 rounded-3xl border border-brand-silver/30">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-grass mb-6 shadow-sm">
              <Leaf size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-3">Eco-friendliness</h3>
            <p className="text-brand-charcoal/70 font-medium">Use of electric vehicles and route optimization to reduce carbon footprint.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
