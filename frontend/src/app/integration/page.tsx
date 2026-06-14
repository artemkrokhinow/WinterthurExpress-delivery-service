import { Code2, Terminal, Server, ArrowRight } from "lucide-react";

export default function IntegrationPage() {
  return (
    <div className="pt-32 pb-24 bg-brand-charcoal min-h-screen text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-brand-grass/20 text-brand-grass rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-xl">
            <Code2 size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">API Integration</h1>
          <p className="text-xl text-white/80 font-medium leading-relaxed">
            Open RESTful API for deep integration of logistics directly into your CRM, ERP, or CMS system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20 items-center">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-grass flex-shrink-0">
                <Terminal size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Simple Documentation</h3>
                <p className="text-white/60 font-medium leading-relaxed">Swagger UI with request examples in popular programming languages. Integration takes from 2 hours.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-grass flex-shrink-0">
                <Server size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">99.9% Reliability</h3>
                <p className="text-white/60 font-medium leading-relaxed">Fault-tolerant architecture withstands any peak loads during sales and holidays.</p>
              </div>
            </div>

            <div className="pt-4">
              <button className="px-8 py-4 bg-brand-grass hover:bg-[#72c938] text-brand-charcoal font-black rounded-xl transition-all shadow-lg uppercase tracking-widest flex items-center gap-2">
                Read Documentation <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="bg-[#1E293B] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="bg-[#0F172A] px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs font-mono text-white/40">POST /api/v1/orders</span>
            </div>
            <div className="p-6 overflow-x-auto text-sm font-mono text-white/80">
              <pre className="text-green-400">curl <span className="text-white">-X POST https://api.winterthurexpress.ch/v1/orders \</span></pre>
              <pre className="text-white">  -H <span className="text-yellow-300">"Authorization: Bearer YOUR_API_KEY"</span> \</pre>
              <pre className="text-white">  -H <span className="text-yellow-300">"Content-Type: application/json"</span> \</pre>
              <pre className="text-white">  -d <span className="text-yellow-300">'{'{'}</span></pre>
              <pre className="text-white">    <span className="text-blue-300">"pickup"</span>: <span className="text-yellow-300">"Technikumstrasse 9, Winterthur"</span>,</pre>
              <pre className="text-white">    <span className="text-blue-300">"dropoff"</span>: <span className="text-yellow-300">"Bahnhofstrasse 1, Zurich"</span>,</pre>
              <pre className="text-white">    <span className="text-blue-300">"weight"</span>: <span className="text-purple-400">2.5</span>,</pre>
              <pre className="text-white">    <span className="text-blue-300">"type"</span>: <span className="text-yellow-300">"express"</span></pre>
              <pre className="text-yellow-300">  {'}'}'</pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
