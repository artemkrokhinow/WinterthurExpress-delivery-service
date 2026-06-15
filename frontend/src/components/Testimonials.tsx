"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Marco Fischer",
    role: "CEO, TechSwiss GmbH",
    text: "Winterthur Express completely changed our logistics. We used to spend 2 hours organizing each delivery, now it's done in a couple of clicks. Couriers are always punctual.",
    rating: 5,
    initials: "MF",
    color: "bg-brand-grass",
  },
  {
    name: "Anna Müller",
    role: "Online Store Owner",
    text: "API integration was up and running in one evening. Our clients are thrilled with the delivery speed and real-time tracking. I recommend it to all e-commerce projects.",
    rating: 5,
    initials: "AM",
    color: "bg-brand-charcoal",
  },
  {
    name: "Lukas Weber",
    role: "Logistics Manager, BioMed AG",
    text: "We deliver sensitive medical equipment — maximum care is required. Over 200 orders without a single incident. Cargo insurance covers everything.",
    rating: 5,
    initials: "LW",
    color: "bg-brand-grass",
  },
  {
    name: "Sophia Brunner",
    role: "Private Client",
    text: "Ordered urgent document delivery for a notary — the courier arrived in 12 minutes! Very polite and professional. Prices are absolutely reasonable.",
    rating: 5,
    initials: "SB",
    color: "bg-brand-charcoal",
  },
  {
    name: "David Steiner",
    role: "CTO, FinBridge SA",
    text: "Connected the plugin — works like a clock. Clients see the delivery status directly in their personal account. Tech support replies in minutes.",
    rating: 5,
    initials: "DS",
    color: "bg-brand-grass",
  },
  {
    name: "Elena Kramer",
    role: "Director, Swiss Flowers",
    text: "Flower delivery requires a special approach — Winterthur Express couriers were instructed and know how to handle fragile goods. Best service in the region.",
    rating: 5,
    initials: "EK",
    color: "bg-brand-charcoal",
  },
];

export function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="py-28 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="text-base font-bold text-brand-grass uppercase tracking-widest mb-3">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight leading-tight">
              Trusted by
              <br />
              <span className="text-brand-charcoal/60">over 3,000 clients</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-12 h-12 rounded-full border border-brand-silver/40 flex items-center justify-center text-brand-charcoal hover:border-brand-grass hover:text-brand-grass transition-all disabled:opacity-30 disabled:hover:border-brand-silver/40 disabled:hover:text-brand-charcoal"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-12 h-12 rounded-full border border-brand-silver/40 flex items-center justify-center text-brand-charcoal hover:border-brand-grass hover:text-brand-grass transition-all disabled:opacity-30 disabled:hover:border-brand-silver/40 disabled:hover:text-brand-charcoal"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 mt-6">
          {visible.map((t, idx) => (
            <div key={page * perPage + idx} className="group relative">
              {/* Solid block shadow behind the card */}
              <div className="absolute inset-0 bg-brand-charcoal rounded-2xl translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
              
              <div className="relative bg-white border border-brand-silver/20 rounded-2xl p-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:border-brand-grass h-full flex flex-col">
                {/* Quote icon */}
                <div className="absolute top-6 right-7">
                  <Quote
                    size={40}
                    className="text-brand-silver/20 group-hover:text-brand-grass/20 transition-colors"
                  />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-brand-grass fill-brand-grass"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-brand-charcoal/80 text-base font-medium leading-relaxed mb-8 flex-grow">
                  &laquo;{t.text}&raquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-brand-silver/30 mt-auto">
                  <div
                    className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-black text-sm`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-base font-bold text-brand-charcoal">
                      {t.name}
                    </div>
                    <div className="text-sm text-brand-charcoal/60 font-medium">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Page indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page
                  ? "w-8 bg-brand-grass"
                  : "w-2 bg-brand-silver/40 hover:bg-brand-silver"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
