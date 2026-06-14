"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/api";
import { Package, MapPin, Calendar, User, Shield, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  routeFrom: string;
  routeTo: string;
  packageType: string;
  weightCategory: string;
  declaredValueAmount: number;
  declaredValueCurrency: string;
  status: string;
  createdAt: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  IN_TRANSIT: { label: "In Transit", color: "bg-blue-100 text-blue-800 border-blue-200" },
  DELIVERED: { label: "Delivered", color: "bg-brand-grass/20 text-brand-charcoal border-brand-grass/40" },
  CANCELED: { label: "Canceled", color: "bg-red-100 text-red-800 border-red-200" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        const sortedOrders = data.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sortedOrders);
      } catch (err: any) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-brand-grass border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-brand-charcoal/60 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight mb-2">
              Orders Database
            </h1>
            <p className="text-brand-charcoal/60 font-medium text-lg">
              Internal logistics management system
            </p>
          </div>
          <Link href="/calculation">
            <button className="py-4 px-8 bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-grass font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-brand-charcoal/10">
              <Package size={20} />
              New Order
            </button>
          </Link>
        </div>

        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 font-medium mb-8 text-center">
            {error}
          </div>
        )}

        {!loading && orders.length > 0 && !error && (
          <div className="mb-8 relative max-w-3xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={20} />
            <input 
              type="text"
              placeholder="Search by number, name, phone, address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-brand-silver/30 rounded-2xl pl-14 pr-6 py-4 shadow-lg shadow-brand-charcoal/5 focus:border-brand-grass outline-none transition-colors font-medium text-brand-charcoal"
            />
          </div>
        )}

        {!loading && orders.length === 0 && !error ? (
          <div className="bg-white rounded-[2rem] p-16 text-center shadow-xl shadow-brand-charcoal/5 border border-brand-silver/30">
            <div className="w-24 h-24 bg-[#f8f9fa] rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-brand-charcoal/30" />
            </div>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-2">No orders yet</h2>
            <p className="text-brand-charcoal/60 mb-8 max-w-md mx-auto">
              There are no registered shipments in the database yet.
            </p>
            <Link href="/calculation">
              <button className="py-3 px-8 bg-brand-grass hover:bg-[#72cc35] text-brand-charcoal font-bold rounded-xl transition-all active:scale-95">
                Create first order
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.filter(order => {
              const q = searchQuery.toLowerCase();
              return (
                order.id.toLowerCase().includes(q) ||
                order.senderName.toLowerCase().includes(q) ||
                order.recipientName.toLowerCase().includes(q) ||
                order.senderPhone.includes(q) ||
                order.recipientPhone.includes(q) ||
                order.routeFrom.toLowerCase().includes(q) ||
                order.routeTo.toLowerCase().includes(q)
              );
            }).map((order) => {
              const status = statusMap[order.status] || statusMap.PENDING;
              
              return (
                <div key={order.id} className="bg-white rounded-3xl p-6 shadow-lg shadow-brand-charcoal/5 border border-brand-silver/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-brand-charcoal/40 font-mono text-xs">
                      #{order.id.split('-')[0]}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-3 mb-6 bg-[#f8f9fa] p-4 rounded-2xl relative overflow-hidden">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-0.5 h-1/2 bg-brand-silver/30"></div>
                    <div className="flex flex-col gap-4 relative z-10 w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-charcoal flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-grass"></div>
                        </div>
                        <span className="font-bold text-brand-charcoal text-sm truncate">{order.routeFrom}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-grass flex items-center justify-center shrink-0">
                          <MapPin size={12} className="text-brand-charcoal" />
                        </div>
                        <span className="font-bold text-brand-charcoal text-sm truncate">{order.routeTo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 flex-grow">
                    <div>
                      <span className="text-xs font-bold text-brand-charcoal/40 uppercase block mb-1">Package Type</span>
                      <div className="flex items-center gap-1.5 font-semibold text-brand-charcoal text-sm">
                        <Package size={14} className="text-brand-grass" />
                        {order.packageType === 'documents' ? 'Documents' : 'Cargo'}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-charcoal/40 uppercase block mb-1">Weight</span>
                      <div className="font-semibold text-brand-charcoal text-sm">
                        {order.weightCategory}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs font-bold text-brand-charcoal/40 uppercase block mb-1">Value</span>
                      <div className="flex items-center gap-1.5 font-semibold text-brand-charcoal text-sm">
                        <Shield size={14} className="text-brand-grass" />
                        {order.declaredValueAmount} {order.declaredValueCurrency}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-brand-silver/20 flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-2 text-brand-charcoal/50 text-xs font-medium">
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                    <Link href={`/orders/${order.id}`}>
                      <button className="w-8 h-8 rounded-full bg-[#f8f9fa] group-hover:bg-brand-charcoal group-hover:text-brand-grass text-brand-charcoal flex items-center justify-center transition-colors">
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
