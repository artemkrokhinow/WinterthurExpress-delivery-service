import { MapPin, Navigation, Map as MapIcon } from "lucide-react";

export default function GeographyPage() {
  return (
    <div className="pt-32 pb-24 bg-brand-silver/10 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-brand-charcoal text-brand-grass rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-xl">
            <MapIcon size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal mb-6 tracking-tight">Delivery Zones</h1>
          <p className="text-xl text-brand-charcoal/80 font-medium leading-relaxed">
            We provide express delivery throughout Switzerland. Main hubs are located in key cities for maximum speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-brand-charcoal/5 border border-brand-silver/30">
            <h3 className="text-2xl font-black text-brand-charcoal mb-6 flex items-center gap-3">
              <MapPin className="text-brand-grass" /> Main Cities
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-brand-silver/20 pb-4">
                <span className="font-bold text-brand-charcoal">Winterthur</span>
                <span className="text-brand-grass font-black text-sm uppercase tracking-wider bg-brand-grass/10 px-3 py-1 rounded-full">Hub</span>
              </li>
              <li className="flex justify-between items-center border-b border-brand-silver/20 pb-4">
                <span className="font-bold text-brand-charcoal">Zürich</span>
                <span className="text-brand-charcoal/50 font-bold text-sm">30 min</span>
              </li>
              <li className="flex justify-between items-center border-b border-brand-silver/20 pb-4">
                <span className="font-bold text-brand-charcoal">Basel</span>
                <span className="text-brand-charcoal/50 font-bold text-sm">90 min</span>
              </li>
              <li className="flex justify-between items-center border-b border-brand-silver/20 pb-4">
                <span className="font-bold text-brand-charcoal">Bern</span>
                <span className="text-brand-charcoal/50 font-bold text-sm">120 min</span>
              </li>
              <li className="flex justify-between items-center pt-2">
                <span className="font-bold text-brand-charcoal">Genève</span>
                <span className="text-brand-charcoal/50 font-bold text-sm">180 min</span>
              </li>
            </ul>
          </div>

          <div className="bg-brand-charcoal p-10 rounded-3xl shadow-xl shadow-brand-charcoal/20 border border-brand-charcoal">
             <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              <Navigation className="text-brand-grass" /> Remote Regions
            </h3>
            <p className="text-white/80 font-medium mb-8 leading-relaxed">
              Delivery to mountainous and remote areas of Switzerland is carried out at a special tariff. Time and cost are calculated individually.
            </p>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
              <p className="text-white font-bold mb-2">Need delivery to the mountains?</p>
              <p className="text-white/60 text-sm mb-4">Our couriers in all-wheel drive electric vehicles are ready for any conditions.</p>
              <button className="text-brand-grass font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:text-white transition-colors">
                Calculate Tariff <Navigation size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
