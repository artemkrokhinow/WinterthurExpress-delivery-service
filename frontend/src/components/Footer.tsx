import Link from "next/link";
import { Globe, Mail, MessageCircle, MapPin, PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-silver/20 text-brand-charcoal pt-48 pb-10 relative overflow-hidden">
      {/* Top curve — deep sweeping white arc */}
      <div className="absolute top-0 left-0 w-full">
        <svg className="block w-full" viewBox="0 0 1440 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,160 Q720,0 1440,160 L1440,0 L0,0 Z" fill="white"/>
        </svg>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Блок бренда */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-brand-charcoal flex items-center justify-center text-brand-grass font-bold text-xl shadow-lg">
                W
              </div>
              <h2 className="text-2xl font-black tracking-tight text-brand-charcoal">
                Winterthur<span className="text-brand-grass">Express</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-brand-charcoal/80 font-medium">
              Premium express courier delivery service. Reliable, eco-friendly, and always on time across Switzerland.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-white hover:bg-brand-grass hover:text-brand-charcoal transition-all duration-300"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-white hover:bg-brand-grass hover:text-brand-charcoal transition-all duration-300"><Mail size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-white hover:bg-brand-grass hover:text-brand-charcoal transition-all duration-300"><MessageCircle size={18} /></a>
            </div>
          </div>

          {/* Навигация 1 */}
          <div>
            <h4 className="text-brand-charcoal font-black mb-6 text-sm tracking-widest uppercase">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-brand-charcoal/80">
              <li><Link href="/about" className="hover:text-brand-grass transition-colors flex items-center gap-2">About Us</Link></li>
              <li><Link href="/tariffs" className="hover:text-brand-grass transition-colors flex items-center gap-2">Tariffs</Link></li>
              <li><Link href="/geography" className="hover:text-brand-grass transition-colors flex items-center gap-2">Delivery Zones</Link></li>
              <li><Link href="/careers" className="hover:text-brand-grass transition-colors flex items-center gap-2">Careers</Link></li>
            </ul>
          </div>

          {/* Навигация 2 */}
          <div>
            <h4 className="text-brand-charcoal font-black mb-6 text-sm tracking-widest uppercase">Services</h4>
            <ul className="space-y-4 text-sm font-bold text-brand-charcoal/80">
              <li><Link href="/tracking" className="hover:text-brand-grass transition-colors flex items-center gap-2">Order Tracking</Link></li>
              <li><Link href="/business" className="hover:text-brand-grass transition-colors flex items-center gap-2">For Business</Link></li>
              <li><Link href="/integration" className="hover:text-brand-grass transition-colors flex items-center gap-2">API Integration</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-brand-charcoal font-black mb-6 text-sm tracking-widest uppercase">Contacts</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-grass flex-shrink-0 shadow-sm">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <span className="block text-brand-charcoal/60 text-xs font-bold uppercase tracking-wider mb-1">Hotline</span>
                  <a href="tel:+41440000000" className="text-brand-charcoal font-black hover:text-brand-grass text-base">+41 44 000 00 00</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-grass flex-shrink-0 shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-brand-charcoal/60 text-xs font-bold uppercase tracking-wider mb-1">Office</span>
                  <span className="text-brand-charcoal font-bold">Schweiz, 8400 Winterthur, <br />Technikumstrasse 9</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Нижняя часть */}
        <div className="pt-8 border-t border-brand-silver/40 flex flex-col md:flex-row justify-between items-center gap-6 text-brand-charcoal/70 font-bold">
          <p className="text-sm">
            © {new Date().getFullYear()} WinterthurExpress GmbH. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-brand-grass transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-grass transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
