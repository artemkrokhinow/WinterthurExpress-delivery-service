import { Briefcase, Heart, Zap, ArrowRight } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-brand-grass/20 text-brand-grass rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-xl">
            <Briefcase size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal mb-6 tracking-tight">Careers at WinterthurExpress</h1>
          <p className="text-xl text-brand-charcoal/80 font-medium leading-relaxed">
            Join the team that is changing logistics in Switzerland. We are looking for couriers, managers, and developers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-brand-silver/10 p-8 rounded-3xl border border-brand-silver/30 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-brand-grass transition-colors cursor-pointer">
            <div>
              <div className="inline-block bg-brand-charcoal text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Logistics</div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-2 group-hover:text-brand-grass transition-colors">Electric Vehicle Courier</h3>
              <p className="text-brand-charcoal/60 font-medium">Winterthur / Zürich • Full-time • from 4500 CHF</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-charcoal text-brand-grass flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <ArrowRight size={20} />
            </div>
          </div>

          <div className="bg-brand-silver/10 p-8 rounded-3xl border border-brand-silver/30 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-brand-grass transition-colors cursor-pointer">
            <div>
              <div className="inline-block bg-brand-grass text-brand-charcoal text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">IT / Development</div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-2 group-hover:text-brand-grass transition-colors">Backend Developer (Node.js)</h3>
              <p className="text-brand-charcoal/60 font-medium">Winterthur / Remote • Full-time</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-charcoal text-brand-grass flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <ArrowRight size={20} />
            </div>
          </div>
          
          <div className="bg-brand-silver/10 p-8 rounded-3xl border border-brand-silver/30 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-brand-grass transition-colors cursor-pointer">
            <div>
              <div className="inline-block bg-brand-charcoal text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Support</div>
              <h3 className="text-2xl font-black text-brand-charcoal mb-2 group-hover:text-brand-grass transition-colors">Customer Support Specialist</h3>
              <p className="text-brand-charcoal/60 font-medium">Winterthur • Flexible Schedule</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-charcoal text-brand-grass flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 bg-brand-charcoal rounded-3xl p-10 flex flex-col items-center text-center">
          <h3 className="text-2xl font-black text-white mb-4">Didn't find a suitable vacancy?</h3>
          <p className="text-white/80 font-medium mb-8 max-w-lg">We are always looking for talent. Send us your resume, and we will contact you when a suitable position becomes available.</p>
          <button className="px-8 py-4 bg-brand-grass text-brand-charcoal font-bold uppercase tracking-widest rounded-xl hover:bg-[#72c938] transition-colors shadow-lg shadow-brand-grass/20">
            Submit Resume
          </button>
        </div>
      </div>
    </div>
  );
}
