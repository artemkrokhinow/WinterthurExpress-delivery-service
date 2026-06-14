"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface AddressAutocompleteProps {
  placeholder: string;
  label: string;
  isGrass?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

interface GeoapifyFeature {
  properties: {
    formatted: string;
    place_id: string;
  };
}

export function AddressAutocomplete({ placeholder, label, isGrass = false, value = "", onChange }: AddressAutocompleteProps) {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);
  const [suggestions, setSuggestions] = useState<GeoapifyFeature[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (text: string) => {
    if (!text || text.length < 2) {
      setSuggestions([]);
      return;
    }
    
    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
    if (!apiKey) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&format=json&apiKey=${apiKey}`
      );
      const data = await response.json();
      if (data.results) {
        setSuggestions(data.results.map((r: any) => ({
          properties: { formatted: r.formatted, place_id: r.place_id }
        })));
      }
    } catch (error) {
      console.error("Geoapify autocomplete error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query, fetchSuggestions]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onChange) onChange(val);
    setIsOpen(true);
  };

  const handleSelect = (description: string) => {
    setQuery(description);
    if (onChange) onChange(description);
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div className={`flex-1 w-full relative ${isOpen ? 'z-50' : 'z-10'}`} ref={wrapperRef}>
      <div className="flex items-center bg-brand-silver/10 hover:bg-brand-silver/20 transition-colors rounded-2xl px-5 py-4 border border-brand-silver/30 h-full">
        <MapPin className={`${isGrass ? "text-brand-grass" : "text-brand-charcoal/70"} mr-3 shrink-0`} size={26} />
        <div className="flex flex-col w-full relative">
          <span className="text-xs text-brand-charcoal/70 font-bold uppercase tracking-widest mb-1">{label}</span>
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={handleInput}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className="bg-transparent border-none outline-none text-brand-charcoal font-black text-lg placeholder:text-brand-charcoal/40 w-full pr-8"
            />
            {isLoading && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Loader2 className="animate-spin text-brand-charcoal/40" size={18} />
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-3 bg-white border border-brand-silver/30 rounded-2xl shadow-xl z-50 overflow-y-auto max-h-[300px] animate-fade-in-up custom-scrollbar" style={{ animationDuration: '0.2s', animationDelay: '0s' }}>
          {suggestions.map((feature) => (
              <li
              key={feature.properties.place_id}
              onClick={() => handleSelect(feature.properties.formatted)}
              className="px-5 py-3 hover:bg-brand-silver/10 cursor-pointer transition-colors border-b border-brand-silver/10 last:border-0 flex items-start gap-3"
            >
              <MapPin className="text-brand-charcoal/40 shrink-0 mt-0.5" size={18} />
              <span className="text-brand-charcoal font-medium leading-snug">{feature.properties.formatted}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
