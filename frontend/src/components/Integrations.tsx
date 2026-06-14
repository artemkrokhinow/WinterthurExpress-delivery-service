import { UploadCloud, Puzzle, Code, ArrowRight } from "lucide-react";

const integrations = [
  {
    title: "Bulk Upload",
    tag: "For Business",
    desc: "Upload hundreds of addresses via Excel/CSV. Free routing based on weight and delivery windows.",
    icon: <UploadCloud size={32} />,
    dark: false,
  },
  {
    title: "CMS Plugins",
    tag: "For Business",
    desc: "Plugins for WordPress, Shopify, Magento, and WooCommerce — connect in 5 minutes.",
    icon: <Puzzle size={32} />,
    dark: false,
  },
  {
    title: "API Integration",
    tag: "For Developers",
    desc: "Open RESTful API for deep logistics integration directly into your CRM or ERP system.",
    icon: <Code size={32} />,
    dark: true,
  },
];

export function Integrations() {
  return (
    <section className="pt-[12vw] pb-28 bg-brand-silver/8">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-base font-bold text-brand-grass uppercase tracking-widest mb-3">B2B Solutions</div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight mb-5">
            Speed Up Order Processing
          </h2>
          <p className="text-xl text-brand-charcoal/80 font-semibold">
            Automate logistics for your online store or company.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 max-w-6xl mx-auto">
          {integrations.map((item, idx) => (
            <div key={idx} className="group relative">
              {/* Solid block shadow behind the card */}
              <div className={`absolute inset-0 rounded-2xl translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4 ${item.dark ? "bg-brand-grass" : "bg-brand-charcoal"}`} />
              
              <div className={`relative rounded-2xl p-8 md:p-10 flex flex-col border transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1 cursor-pointer h-full ${
                item.dark
                  ? "bg-brand-charcoal border-brand-charcoal text-white"
                  : "bg-white border-brand-silver/20 hover:border-brand-grass"
              }`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 shadow-md ${
                  item.dark
                    ? "bg-brand-grass text-brand-charcoal"
                    : "bg-brand-charcoal text-brand-grass"
                }`}>
                  {item.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${item.dark ? "text-white" : "text-brand-charcoal"}`}>{item.title}</h3>
                <div className={`inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-5 ${
                  item.dark
                    ? "bg-brand-grass/20 text-brand-grass"
                    : "bg-brand-charcoal/10 text-brand-charcoal/80"
                }`}>
                  {item.tag}
                </div>
                <p className={`text-base font-medium leading-relaxed flex-grow mb-6 ${item.dark ? "text-white/90" : "text-brand-charcoal/80"}`}>
                  {item.desc}
                </p>
                <div className={`flex items-center gap-2 text-base font-bold transition-colors mt-auto ${
                  item.dark
                    ? "text-brand-grass hover:text-white"
                    : "text-brand-charcoal hover:text-brand-grass"
                }`}>
                  <span>Learn More</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
