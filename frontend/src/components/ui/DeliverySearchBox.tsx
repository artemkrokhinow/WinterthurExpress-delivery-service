"use client";

import { AddressAutocomplete } from "./AddressAutocomplete";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function DeliverySearchBox() {
  return (
    <div className="relative z-50 bg-white border border-brand-silver/40 p-4 md:p-5 rounded-[2rem] shadow-2xl shadow-brand-charcoal/5 flex flex-col md:flex-row items-center gap-3 w-full">
      <AddressAutocomplete label="From" placeholder="Winterthur" />
      <div className="hidden md:flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-brand-silver/20 z-10">
        <ArrowRight className="text-brand-charcoal/60" size={20} />
      </div>
      <AddressAutocomplete label="To" placeholder="Zürich, Bern, Basel..." isGrass />

      <Link 
        href="/calculation" 
        className="w-full md:w-auto px-10 py-5 bg-brand-grass hover:bg-[#72cc35] text-brand-charcoal font-black text-lg rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-brand-grass/25 hover:shadow-xl hover:shadow-brand-grass/40 h-[76px]"
      >
        Calculate Price
        <ArrowRight size={20} strokeWidth={3} />
      </Link>
    </div>
  );
}
