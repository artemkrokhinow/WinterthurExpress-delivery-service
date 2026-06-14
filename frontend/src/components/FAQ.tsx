"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How much does delivery within Winterthur cost?",
    a: "Cost depends on distance and weight. Minimum rate is from 9.90 CHF for documents within the city. You can calculate the exact cost in our calculator in 2 seconds.",
  },
  {
    q: "How fast will the courier arrive?",
    a: "Average arrival time is 15 minutes in Winterthur and 30 minutes in other cities. In express mode, the courier will be there in 7-10 minutes.",
  },
  {
    q: "Can I order delivery without registration?",
    a: "Yes! No registration is needed for one-off orders. Just provide addresses and contact info. We recommend business clients to register for discounts and API access.",
  },
  {
    q: "What is the maximum package weight?",
    a: "Standard couriers deliver up to 30 kg. For heavy and oversized cargo (up to 1.5 tons), we use specialized transport. Contact us for a quote.",
  },
  {
    q: "How does cargo insurance work?",
    a: "Every package is automatically insured up to 500 CHF. Extended insurance up to 10,000 CHF is available for an extra fee. In case of damage, we compensate the full value.",
  },
  {
    q: "Is there an API to integrate with my store?",
    a: "Yes, we provide a full RESTful API with documentation. Plugins for WordPress, Shopify, and more are also available. Setup takes 5 minutes.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 bg-brand-silver/8 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-32">
            <div className="text-base font-bold text-brand-grass uppercase tracking-widest mb-3">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight leading-tight mb-6">
              Frequently
              <br />
              Asked Questions
            </h2>
            <p className="text-brand-charcoal/80 font-semibold text-lg leading-relaxed mb-8 max-w-md">
              Didn't find an answer? Contact us — we are available 7 days a week from 7:00 to 22:00.
            </p>
            <a
              href="tel:+41440000000"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-charcoal text-brand-charcoal font-bold rounded-2xl hover:bg-brand-charcoal hover:text-white transition-all duration-300"
            >
              Contact Support
            </a>
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-white border-brand-grass shadow-lg shadow-brand-grass/5"
                      : "bg-white border-brand-silver/40 hover:border-brand-silver"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between p-6 md:p-7 text-left gap-4"
                  >
                    <span
                      className={`text-lg font-bold transition-colors ${
                        isOpen ? "text-brand-charcoal" : "text-brand-charcoal/90"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-brand-grass text-brand-charcoal rotate-0"
                          : "bg-brand-silver/20 text-brand-charcoal/60 rotate-0"
                      }`}
                    >
                      {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 md:px-7 pb-6 md:pb-7 text-brand-charcoal/80 font-medium text-base leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
