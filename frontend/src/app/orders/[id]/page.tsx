"use client";

import { useEffect, useState, use } from "react";
import { getOrderById } from "@/lib/api";
import { Package, MapPin, Calendar, User, Shield, ArrowLeft, Clock, Printer, CheckCircle2, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const statusMap: Record<string, { label: string; color: string; icon: any; progress: number }> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock, progress: 25 },
  IN_TRANSIT: { label: "In Transit", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Truck, progress: 65 },
  DELIVERED: { label: "Delivered", color: "bg-brand-grass/20 text-brand-charcoal border-brand-grass/40", icon: CheckCircle2, progress: 100 },
  CANCELED: { label: "Canceled", color: "bg-red-100 text-red-800 border-red-200", icon: Package, progress: 0 },
};

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        const data = await getOrderById(resolvedParams.id);
        if (!data) {
          setError("Order not found");
        } else {
          setOrder(data);
        }
      } catch (err: any) {
        setError(err.message || "Error loading order");
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-brand-grass border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-brand-charcoal/60 font-medium">Searching for shipment...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-[2rem] p-12 text-center shadow-xl shadow-brand-charcoal/5 border border-brand-silver/30 max-w-lg w-full">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Shipment not found</h2>
          <p className="text-brand-charcoal/60 mb-8">
            {error || "An order with this number does not exist in our database."}
          </p>
          <button 
            onClick={() => router.back()}
            className="w-full py-4 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 font-bold rounded-xl transition-all active:scale-95"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const status = statusMap[order.status] || statusMap.PENDING;
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 print:bg-white print:pt-0 print:pb-0">
      <div className="container mx-auto px-4 max-w-4xl print:px-0 print:max-w-none">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 print:hidden">
          <button 
            onClick={() => router.back()}
            className="text-brand-charcoal/60 hover:text-brand-charcoal font-bold transition-colors flex items-center gap-2 w-fit"
          >
            <ArrowLeft size={18} />
            To orders list
          </button>
          <button 
            onClick={() => window.print()}
            className="py-2.5 px-5 bg-white border border-brand-silver/40 text-brand-charcoal hover:bg-brand-silver/10 font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm w-fit"
          >
            <Printer size={16} />
            Print
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-brand-charcoal/5 border border-brand-silver/20 print:shadow-none print:border-none print:p-0">
          
          {/* Status & ID */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <span className="text-brand-charcoal/40 font-bold uppercase tracking-widest text-xs block mb-2">
                Tracking Number
              </span>
              <h1 className="text-3xl md:text-5xl font-mono font-black text-brand-charcoal tracking-tight">
                #{order.id.split('-')[0].toUpperCase()}
              </h1>
            </div>
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${status.color}`}>
              <StatusIcon size={20} />
              <span className="font-bold uppercase tracking-wider text-sm">{status.label}</span>
            </div>
          </div>

          {/* Progress Bar */}
          {order.status !== 'CANCELED' && (
            <div className="mb-14">
              <div className="flex justify-between mb-3">
                <span className="text-xs font-bold text-brand-charcoal/40 uppercase">Accepted</span>
                <span className="text-xs font-bold text-brand-charcoal/40 uppercase">In Transit</span>
                <span className="text-xs font-bold text-brand-charcoal/40 uppercase">Delivered</span>
              </div>
              <div className="h-3 bg-[#f8f9fa] rounded-full overflow-hidden border border-brand-silver/20 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-brand-grass transition-all duration-1000 ease-out"
                  style={{ width: `${status.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Route */}
            <div className="md:col-span-2 bg-[#f8f9fa] p-8 rounded-3xl border border-brand-silver/30 relative print:bg-white print:border-brand-charcoal">
              <h3 className="font-bold text-brand-charcoal/40 uppercase text-xs mb-6">Delivery Route</h3>
              <div className="relative">
                <div className="absolute left-6 top-[28px] bottom-[28px] w-0.5 bg-brand-silver/40 border-l border-dashed border-brand-charcoal/20 print:border-brand-charcoal"></div>
                <div className="flex flex-col gap-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-brand-silver/40 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <div className="w-3 h-3 rounded-full bg-brand-charcoal"></div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-charcoal/40 uppercase block mb-1">From</span>
                      <p className="font-bold text-brand-charcoal text-lg mb-1">{order.routeFrom}</p>
                      <p className="text-brand-charcoal/60 text-sm font-medium">{order.senderName} • {order.senderPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-charcoal border border-brand-charcoal flex items-center justify-center shrink-0 shadow-lg mt-0.5">
                      <MapPin size={20} className="text-brand-grass" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-charcoal/40 uppercase block mb-1">To</span>
                      <p className="font-bold text-brand-charcoal text-lg mb-1">{order.routeTo}</p>
                      <p className="text-brand-charcoal/60 text-sm font-medium">{order.recipientName} • {order.recipientPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Params */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-charcoal/40 uppercase block mb-2">Package Details</span>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] flex items-center justify-center text-brand-charcoal">
                      <Package size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-brand-charcoal/50 block font-medium">Type</span>
                      <span className="font-bold text-brand-charcoal text-sm">{order.packageType === 'documents' ? 'Documents' : 'Cargo'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] flex items-center justify-center text-brand-charcoal">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-brand-charcoal/50 block font-medium">Weight</span>
                      <span className="font-bold text-brand-charcoal text-sm">{order.weightCategory}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financials & Dates */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-charcoal/40 uppercase block mb-2">Financials & Dates</span>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] flex items-center justify-center text-brand-charcoal">
                      <Shield size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-brand-charcoal/50 block font-medium">Declared Value</span>
                      <span className="font-bold text-brand-charcoal text-sm">{order.declaredValueAmount} {order.declaredValueCurrency}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] flex items-center justify-center text-brand-charcoal">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-brand-charcoal/50 block font-medium">Creation Date</span>
                      <span className="font-bold text-brand-charcoal text-sm">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
