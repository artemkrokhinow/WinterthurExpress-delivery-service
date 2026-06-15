"use client";

import { MapPin, Calculator, UserCheck, Truck, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Enter Addresses",
    desc: "Enter pickup and drop-off locations. The system automatically calculates the optimal route.",
    icon: <MapPin size={28} />,
  },
  {
    num: "02",
    title: "Get Calculation",
    desc: "Instant cost calculation based on distance, weight, and urgency. No hidden fees.",
    icon: <Calculator size={28} />,
  },
  {
    num: "03",
    title: "Courier Assigned",
    desc: "The nearest available top-rated courier accepts the order within 7 minutes.",
    icon: <UserCheck size={28} />,
  },
  {
    num: "04",
    title: "Delivery Completed",
    desc: "Track the courier in real-time. Photo report and confirmation upon delivery.",
    icon: <Truck size={28} />,
  },
];

export function HowItWorks() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #424B54 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-base font-bold text-brand-grass uppercase tracking-widest mb-3">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight mb-5">
            4 simple steps to{" "}
            <span className="text-brand-grass">fast delivery</span>
          </h2>
          <p className="text-xl text-brand-charcoal/80 font-semibold">
            From request to delivery — the entire process takes less than an hour.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-brand-grass/40 via-brand-silver/40 to-brand-grass/40" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Number circle */}
              <div className="relative z-10 w-[5.5rem] h-[5.5rem] mx-auto mb-8 rounded-full bg-white border-2 border-brand-silver/40 flex items-center justify-center transition-all duration-500 group-hover:border-brand-grass group-hover:shadow-xl group-hover:shadow-brand-grass/10 group-hover:scale-110">
                <div className="w-16 h-16 rounded-full bg-brand-charcoal flex items-center justify-center text-brand-grass transition-all duration-300 group-hover:bg-brand-grass group-hover:text-brand-charcoal">
                  {step.icon}
                </div>
              </div>

              {/* Card */}
              <div className="text-center px-2">
                <div className="text-xs font-black text-brand-grass tracking-widest mb-2">
                  STEP {step.num}
                </div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-charcoal/80 text-base font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="/calculation"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-brand-charcoal hover:bg-brand-charcoal/90 text-white font-black text-lg rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-charcoal/30 active:translate-y-0 active:scale-[0.92]"
          >
            Try It Now
            <ArrowRight size={20} strokeWidth={3} className="transition-transform duration-300 group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
