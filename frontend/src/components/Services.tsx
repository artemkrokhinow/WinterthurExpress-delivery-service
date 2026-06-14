import { ShieldCheck, Truck, Briefcase, CreditCard, Receipt, Repeat } from "lucide-react";

const services = [
  {
    title: "Cash Purchase of Goods",
    desc: "The courier will purchase goods with their own funds, and the buyer pays upon delivery.",
    icon: <CreditCard size={28} />,
  },
  {
    title: "Cash Management Services",
    desc: "Electronic receipt in accordance with the law, even without your own cash register.",
    icon: <Receipt size={28} />,
  },
  {
    title: "Revenue Transfer",
    desc: "The courier will collect cash from buyers and securely transfer it to your account.",
    icon: <Repeat size={28} />,
  },
  {
    title: "Valuable Cargo Delivery",
    desc: "Armored vehicles, sealing, and escort by trained specialists.",
    icon: <ShieldCheck size={28} />,
  },
  {
    title: "Mass Document Mailing",
    desc: "From 100 letters per week with reliable couriers throughout Winterthur.",
    icon: <Briefcase size={28} />,
  },
  {
    title: "Industrial Equipment",
    desc: "Heavy equipment and large industrial components.",
    icon: <Truck size={28} />,
  },
];

export function Services() {
  return (
    <section className="pt-[calc(10vw+2rem)] pb-28 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="text-base font-bold text-brand-grass uppercase tracking-widest mb-3">Our Services</div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight leading-tight">
              Full range of services<br/>
              <span className="text-brand-charcoal/60">for any task</span>
            </h2>
          </div>
          <p className="text-brand-charcoal/80 font-semibold max-w-md text-lg leading-relaxed">
            From simple document delivery to cash collection and complex logistics chains across Switzerland.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {services.map((service, idx) => (
            <div key={idx} className="group relative">
              {/* Solid block shadow behind the card */}
              <div className="absolute inset-0 bg-brand-grass rounded-2xl translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
              
              <div className="relative bg-white border border-brand-silver/20 p-8 rounded-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1 cursor-pointer h-full flex flex-col">
                {/* Number */}
                <div className="absolute top-6 right-7 text-6xl font-black text-brand-silver/30 select-none leading-none group-hover:text-brand-grass/40 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-brand-charcoal text-brand-grass flex items-center justify-center mb-6 group-hover:bg-brand-grass group-hover:text-brand-charcoal transition-all duration-300 group-hover:scale-110 shadow-md">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-3 relative z-10">{service.title}</h3>
                <p className="text-brand-charcoal/80 text-base font-medium leading-relaxed relative z-10">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
