"use client";

import { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { AddressAutocomplete } from "@/components/ui/AddressAutocomplete";
import Link from "next/link";
import { createOrder } from "@/lib/api";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './components/CheckoutForm';
import { 
  MapPin, 
  User, 
  Phone, 
  Package, 
  FileText, 
  Calendar, 
  Clock, 
  Shield, 
  CreditCard, 
  Building,
  Check,
  Printer,
  Download,
  Mail,
  CheckCircle2,
  ArrowLeft,
  Search,
  X
} from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock');

interface FormState {
  addressFrom: string;
  addressTo: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  recipientName: string;
  recipientPhone: string;
  fullRecipientInfo: boolean;
  packageType: "documents" | "cargo";
  weightCategory: "1kg" | "2kg" | "5kg" | null;
  pickupDate: string;
  pickupTime: string;
  deliveryDate: string;
  deliveryTime: string;
  declaredValue: string;
  paymentMethod: "card" | "invoice";
  saveForm: boolean;
  agreement: boolean;
}

export default function CalculationPage() {
  const [state, setState] = useState<FormState>({
    addressFrom: "",
    addressTo: "",
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    recipientName: "",
    recipientPhone: "",
    fullRecipientInfo: false,
    packageType: "cargo" as const,
    weightCategory: "2kg",
    pickupDate: "",
    pickupTime: "",
    deliveryDate: "",
    deliveryTime: "",
    declaredValue: "",
    paymentMethod: "card" as const,
    saveForm: false,
    agreement: false
  });

  const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    const saved = localStorage.getItem('we_calc_form_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to load form state", e);
      }
    }
    setMounted(true);
  }, []);

  
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('we_calc_form_state', JSON.stringify(state));
    }
  }, [state, mounted]);

  const updateState = (field: keyof FormState, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleTimeChange = (field: keyof FormState, val: string) => {
    let v = val.replace(/\D/g, '');
    if (v.length > 4) v = v.slice(0, 4);
    
    if (v.length >= 2) {
      let hours = parseInt(v.slice(0, 2));
      if (hours > 23) v = '23' + v.slice(2);
    }
    if (v.length >= 4) {
      let mins = parseInt(v.slice(2, 4));
      if (mins > 59) v = v.slice(0, 2) + '59';
    }

    let formatted = v;
    if (v.length >= 3) {
      formatted = `${v.slice(0, 2)}:${v.slice(2)}`;
    }
    
    updateState(field, formatted);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  
  
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'PAYPAL' | 'TWINT' | null>(null);
  const [showTwintQR, setShowTwintQR] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success">("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const handleSendEmail = () => {
    setEmailStatus("loading");
    
    setTimeout(() => {
      setEmailStatus("success");
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async () => {
    if (!state.agreement) {
      setSubmitError("Data processing consent is required");
      return;
    }

    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!state.addressFrom || state.addressFrom.length < 5) newErrors.addressFrom = "Enter full address";
    if (!state.addressTo || state.addressTo.length < 5) newErrors.addressTo = "Enter full address";

    
    const hasDigits = /\d/;
    if (!state.senderName || state.senderName.trim().length < 2 || hasDigits.test(state.senderName)) {
      newErrors.senderName = "Enter a real name";
    }
    
    
    const sPhoneClean = (state.senderPhone || '').replace(/\s/g, '');
    if (!/^\+41[1-9]\d{8}$/.test(sPhoneClean)) {
      newErrors.senderPhone = "Format: +41 7X XXX XX XX";
    }
    
    
    if (!state.senderEmail || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(state.senderEmail)) {
      newErrors.senderEmail = "Enter a valid email";
    }
    
    if (!state.recipientName || state.recipientName.trim().length < 2 || hasDigits.test(state.recipientName)) {
      newErrors.recipientName = "Enter a real name";
    }
    
    const rPhoneClean = (state.recipientPhone || '').replace(/\s/g, '');
    if (!/^\+41[1-9]\d{8}$/.test(rPhoneClean)) {
      newErrors.recipientPhone = "Format: +41 7X XXX XX XX";
    }

    const today = new Date().toISOString().split('T')[0];
    if (!state.pickupDate) {
      newErrors.pickupDate = "Select a date";
    } else if (state.pickupDate < today) {
      newErrors.pickupDate = "Cannot be in the past";
    }

    if (!state.deliveryDate) {
      newErrors.deliveryDate = "Select a date";
    } else if (state.pickupDate && state.deliveryDate < state.pickupDate) {
      newErrors.deliveryDate = "Cannot be earlier than pickup";
    }

    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!state.pickupTime || !timeRegex.test(state.pickupTime)) newErrors.pickupTime = "Format HH:MM";
    if (!state.deliveryTime || !timeRegex.test(state.deliveryTime)) newErrors.deliveryTime = "Format HH:MM";
    
    const declaredVal = parseInt(state.declaredValue || '0');
    if (isNaN(declaredVal) || declaredVal < 0) {
      newErrors.declaredValue = "Enter a valid amount";
    } else if (declaredVal > 50000) {
      newErrors.declaredValue = "Max. 50,000 CHF";
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setSubmitError("Please fill in all required fields");
      return;
    }
    setFieldErrors({});

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const payload = {
        senderEmail: state.senderEmail || undefined,
        senderName: state.senderName || 'Not specified',
        senderPhone: state.senderPhone || 'Not specified',
        recipientName: state.recipientName || 'Not specified',
        recipientPhone: state.recipientPhone || 'Not specified',
        routeFrom: state.addressFrom || 'Not specified',
        routeTo: state.addressTo || 'Not specified',
        packageType: state.packageType,
        weightCategory: state.weightCategory || '1kg',
        declaredValueAmount: state.declaredValue ? parseInt(state.declaredValue) : 0,
      };

      const res = await createOrder(payload);
      const newOrderId = res.orderId;
      setCreatedOrderId(newOrderId);
      
      
      try {
        const paymentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: newOrderId, amount: parseFloat(totalCost.toString()) })
        });
        if (!paymentRes.ok) throw new Error("Payment intent failed");
        
        const paymentData = await paymentRes.json();
        if (paymentData.clientSecret) {
          setClientSecret(paymentData.clientSecret);
        } else {
          setSubmitError("Failed to initialize payment");
        }
      } catch (err: any) {
        console.error(err);
        setSubmitError("Error connecting to payment gateway");
      }
      setIsSubmitting(false);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Error creating order");
      setIsSubmitting(false);
    }
  };

  
  const calculatedPrice = state.weightCategory === "5kg" ? 1200 : state.weightCategory === "2kg" ? 800 : 500;
  const insuranceCost = state.declaredValue ? Math.max(0, parseInt(state.declaredValue) * 0.01) : 0;
  const totalCost = calculatedPrice + insuranceCost;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight mb-12">
          Delivery Booking
        </h1>

        {submitSuccess ? (
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-brand-charcoal/10 border border-brand-silver/30 max-w-4xl mx-auto text-center print:shadow-none print:border-none print:p-0">
            <div className="w-24 h-24 bg-brand-grass rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-grass/20 -rotate-3 print:hidden">
              <CheckCircle2 size={48} className="text-brand-charcoal" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-brand-charcoal mb-4">
              Order successfully created!
            </h2>
            <p className="text-brand-charcoal/60 font-medium text-lg mb-4">
              Your tracking number:
            </p>
            <div className="inline-block bg-[#f8f9fa] border border-brand-silver/30 rounded-2xl px-8 py-4 mb-10 shadow-inner">
              <span className="font-mono font-bold text-3xl md:text-4xl text-brand-charcoal tracking-wider">
                #{createdOrderId?.split('-')[0].toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 print:hidden">
              <button 
                onClick={handlePrint}
                className="py-4 px-8 bg-brand-charcoal text-white font-bold rounded-xl hover:bg-brand-charcoal/90 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl"
              >
                <Printer size={20} />
                Print PDF
              </button>
              <button 
                onClick={handleSendEmail}
                disabled={emailStatus !== "idle"}
                className={`py-4 px-8 border-2 border-brand-charcoal text-brand-charcoal font-bold rounded-xl hover:bg-brand-charcoal/5 transition-all active:scale-95 flex items-center justify-center gap-3 ${emailStatus === 'success' ? 'bg-brand-grass/10' : ''}`}
              >
                {emailStatus === "loading" ? "Sending..." : emailStatus === "success" ? "Sent!" : <><Mail size={20} /> Send to Email</>}
              </button>
            </div>

            {/* Оплачено бейджик */}
            <div className="mb-12 print:hidden">
               <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold border border-green-200">
                 <CheckCircle2 size={18} />
                 Paid via Stripe
               </div>
            </div>

            <div className="pt-10 border-t border-brand-silver/30 print:hidden">
              <button 
                onClick={() => {
                  setSubmitSuccess(false);
                  setPaymentStep(false);
                  setPaymentMethod(null);
                  setShowTwintQR(false);
                  const resetState = {
                    addressFrom: "", addressTo: "", senderName: "", senderPhone: "", senderEmail: "",
                    recipientName: "", recipientPhone: "", fullRecipientInfo: false,
                    packageType: "cargo" as const, weightCategory: "2kg" as const,
                    pickupDate: "", pickupTime: "", deliveryDate: "", deliveryTime: "",
                    declaredValue: "", paymentMethod: "card" as const, saveForm: false, agreement: false
                  };
                  setState(resetState);
                  localStorage.removeItem('we_calc_form_state');
                }}
                className="text-brand-charcoal/60 hover:text-brand-charcoal font-bold transition-colors flex items-center gap-2 mx-auto"
              >
                <ArrowLeft size={18} />
                Create new order
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start print:hidden">
          
          {/* Left Column - Form */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* 1. Маршрут */}
            <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-brand-charcoal/5 border border-brand-silver/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center font-bold">1</div>
                <h2 className="text-2xl font-black text-brand-charcoal">Route</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-charcoal/70 uppercase">From:</label>
                  <AddressAutocomplete 
                    placeholder="Sender Address" 
                    value={state.addressFrom}
                    onChange={(v) => { updateState('addressFrom', v); setFieldErrors(p => ({...p, addressFrom: undefined})) }}
                  />
                  {fieldErrors.addressFrom && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.addressFrom}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-charcoal/70 uppercase">To:</label>
                  <AddressAutocomplete 
                    placeholder="Delivery Address" 
                    isGrass
                    value={state.addressTo}
                    onChange={(v) => { updateState('addressTo', v); setFieldErrors(p => ({...p, addressTo: undefined})) }}
                  />
                  {fieldErrors.addressTo && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.addressTo}</span>}
                </div>
              </div>
            </section>

            {/* 2. Контактные данные */}
            <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-brand-charcoal/5 border border-brand-silver/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center font-bold">2</div>
                <h2 className="text-2xl font-black text-brand-charcoal">Contact Information</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                {/* Отправитель */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-brand-charcoal border-b border-brand-silver/20 pb-2">Sender:</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-charcoal/70">Sender Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={18} />
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className={`w-full bg-[#f8f9fa] border ${fieldErrors.senderName ? 'border-red-500' : 'border-brand-silver/40'} rounded-xl pl-11 pr-4 py-3 outline-none focus:border-brand-grass transition-colors font-medium`}
                        value={state.senderName || ''}
                        onChange={(e) => { updateState('senderName', e.target.value); setFieldErrors(p => ({...p, senderName: undefined})) }}
                      />
                    </div>
                    {fieldErrors.senderName && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.senderName}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-charcoal/70">Phone:</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={18} />
                      <IMaskInput 
                        mask="+41 00 000 00 00"
                        lazy={false}
                        placeholderChar="x"
                        className={`w-full bg-[#f8f9fa] border ${fieldErrors.senderPhone ? 'border-red-500' : 'border-brand-silver/40'} rounded-xl pl-11 pr-4 py-3 outline-none focus:border-brand-grass transition-colors font-medium tracking-wide`}
                        value={state.senderPhone || ''}
                        onAccept={(value) => { updateState('senderPhone', value); setFieldErrors(p => ({...p, senderPhone: undefined})) }}
                      />
                    </div>
                    {fieldErrors.senderPhone && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.senderPhone}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-charcoal/70">Email:</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="example@mail.com"
                        className={`w-full bg-[#f8f9fa] border ${fieldErrors.senderEmail ? 'border-red-500' : 'border-brand-silver/40'} rounded-xl px-4 py-3 outline-none focus:border-brand-grass transition-colors font-medium`}
                        value={state.senderEmail || ''}
                        onChange={(e) => { updateState('senderEmail', e.target.value); setFieldErrors(p => ({...p, senderEmail: undefined})) }}
                      />
                    </div>
                    {fieldErrors.senderEmail && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.senderEmail}</span>}
                  </div>
                </div>

                {/* Получатель */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-brand-charcoal border-b border-brand-silver/20 pb-2">Recipient:</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-charcoal/70">Recipient Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={18} />
                      <input 
                        type="text" 
                        placeholder="Jane Smith"
                        className={`w-full bg-[#f8f9fa] border ${fieldErrors.recipientName ? 'border-red-500' : 'border-brand-silver/40'} rounded-xl pl-11 pr-4 py-3 outline-none focus:border-brand-grass transition-colors font-medium`}
                        value={state.recipientName || ''}
                        onChange={(e) => { updateState('recipientName', e.target.value); setFieldErrors(p => ({...p, recipientName: undefined})) }}
                      />
                    </div>
                    {fieldErrors.recipientName && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.recipientName}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-charcoal/70">Phone:</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={18} />
                      <IMaskInput 
                        mask="+41 00 000 00 00"
                        lazy={false}
                        placeholderChar="x"
                        className={`w-full bg-[#f8f9fa] border ${fieldErrors.recipientPhone ? 'border-red-500' : 'border-brand-silver/40'} rounded-xl pl-11 pr-4 py-3 outline-none focus:border-brand-grass transition-colors font-medium tracking-wide`}
                        value={state.recipientPhone || ''}
                        onAccept={(value) => { updateState('recipientPhone', value); setFieldErrors(p => ({...p, recipientPhone: undefined})) }}
                      />
                    </div>
                    {fieldErrors.recipientPhone && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.recipientPhone}</span>}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 cursor-pointer group" onClick={() => updateState('fullRecipientInfo', !state.fullRecipientInfo)}>
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${state.fullRecipientInfo ? 'bg-brand-grass text-brand-charcoal' : 'bg-brand-silver/20 text-transparent group-hover:bg-brand-silver/40'}`}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="font-semibold text-brand-charcoal/80 select-none">Provide full recipient information</span>
              </div>
            </section>

            {/* 3. Что везем */}
            <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-brand-charcoal/5 border border-brand-silver/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center font-bold">3</div>
                <h2 className="text-2xl font-black text-brand-charcoal">Package Details</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-brand-charcoal/70 uppercase">Package Type:</label>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => updateState('packageType', 'documents')}
                      className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${state.packageType === 'documents' ? 'border-brand-grass bg-brand-grass/10 text-brand-charcoal' : 'border-brand-silver/30 text-brand-charcoal/60 hover:border-brand-silver/60'}`}
                    >
                      <FileText size={20} />
                      Documents
                    </button>
                    <button 
                      onClick={() => updateState('packageType', 'cargo')}
                      className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${state.packageType === 'cargo' ? 'border-brand-grass bg-brand-grass/10 text-brand-charcoal' : 'border-brand-silver/30 text-brand-charcoal/60 hover:border-brand-silver/60'}`}
                    >
                      <Package size={20} />
                      Cargo
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {['1kg', '2kg', '5kg'].map((weight) => (
                    <button 
                      key={weight}
                      onClick={() => updateState('weightCategory', weight)}
                      className={`py-3 px-6 rounded-xl font-bold transition-all border-2 ${state.weightCategory === weight ? 'bg-brand-charcoal border-brand-charcoal text-brand-grass' : 'bg-[#f8f9fa] border-[#f8f9fa] text-brand-charcoal/70 hover:bg-brand-silver/20'}`}
                    >
                      up to {weight.replace('kg', '')} kg
                    </button>
                  ))}
                  <button className="py-3 px-6 rounded-xl font-bold transition-all border-2 border-dashed border-brand-silver/60 text-brand-charcoal/70 hover:border-brand-charcoal hover:text-brand-charcoal bg-transparent flex items-center gap-2">
                    + Add package
                  </button>
                </div>
              </div>
            </section>

            {/* 4. Расчетное время */}
            <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-brand-charcoal/5 border border-brand-silver/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center font-bold">4</div>
                <h2 className="text-2xl font-black text-brand-charcoal">Estimated Time</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-brand-charcoal/70 uppercase">Pickup Date</label>
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={18} />
                      <input 
                        type="date" 
                        lang="en-US"
                        min={new Date().toISOString().split('T')[0]}
                        max="2030-12-31"
                        className="w-full bg-[#f8f9fa] border border-brand-silver/40 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-brand-grass transition-colors font-medium text-brand-charcoal"
                        value={state.pickupDate}
                        onChange={(e) => { updateState('pickupDate', e.target.value); setFieldErrors(p => ({...p, pickupDate: undefined})) }}
                      />
                    </div>
                    {fieldErrors.pickupDate && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.pickupDate}</span>}
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={18} />
                      <input 
                        type="text" 
                        placeholder="14:30"
                        className={`w-full bg-[#f8f9fa] border ${fieldErrors.pickupTime ? 'border-red-500' : 'border-brand-silver/40'} rounded-xl pl-11 pr-4 py-3 outline-none focus:border-brand-grass transition-colors font-medium text-brand-charcoal tracking-widest`}
                        value={state.pickupTime}
                        onChange={(e) => { handleTimeChange('pickupTime', e.target.value); setFieldErrors(p => ({...p, pickupTime: undefined})) }}
                      />
                    </div>
                    {fieldErrors.pickupTime && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.pickupTime}</span>}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-brand-charcoal/70 uppercase">Delivery Date</label>
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={18} />
                      <input 
                        type="date" 
                        lang="en-US"
                        min={new Date().toISOString().split('T')[0]}
                        max="2030-12-31"
                        className="w-full bg-[#f8f9fa] border border-brand-silver/40 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-brand-grass transition-colors font-medium text-brand-charcoal"
                        value={state.deliveryDate}
                        onChange={(e) => { updateState('deliveryDate', e.target.value); setFieldErrors(p => ({...p, deliveryDate: undefined})) }}
                      />
                    </div>
                    {fieldErrors.deliveryDate && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.deliveryDate}</span>}
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={18} />
                      <input 
                        type="text" 
                        placeholder="18:00"
                        className={`w-full bg-[#f8f9fa] border ${fieldErrors.deliveryTime ? 'border-red-500' : 'border-brand-silver/40'} rounded-xl pl-11 pr-4 py-3 outline-none focus:border-brand-grass transition-colors font-medium text-brand-charcoal tracking-widest`}
                        value={state.deliveryTime}
                        onChange={(e) => { handleTimeChange('deliveryTime', e.target.value); setFieldErrors(p => ({...p, deliveryTime: undefined})) }}
                      />
                    </div>
                    {fieldErrors.deliveryTime && <span className="text-red-500 text-xs font-bold block mt-1">{fieldErrors.deliveryTime}</span>}
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Ценность посылки */}
            <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-brand-charcoal/5 border border-brand-silver/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center font-bold">5</div>
                <h2 className="text-2xl font-black text-brand-charcoal">Declared Value</h2>
              </div>

              <div className="space-y-4">
                <div className="relative max-w-md">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grass" size={20} />
                  <input 
                    type="number" 
                    min="0"
                    placeholder="Enter value in CHF"
                    className="w-full bg-[#f8f9fa] border border-brand-silver/40 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-brand-grass transition-colors font-black text-lg text-brand-charcoal"
                    value={state.declaredValue}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (e.target.value === '' || (!isNaN(val) && val >= 0)) {
                        updateState('declaredValue', e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                        e.preventDefault();
                      }
                    }}
                  />
                  {fieldErrors.declaredValue && <span className="text-red-500 text-xs font-bold block mt-2">{fieldErrors.declaredValue}</span>}
                </div>
                <div className="inline-block px-4 py-2 bg-brand-grass/20 text-brand-charcoal font-bold rounded-lg text-sm">
                  plus {insuranceCost.toFixed(0)} CHF to order
                </div>
                <p className="text-brand-charcoal/70 text-sm font-medium leading-relaxed max-w-2xl mt-4">
                  We compensate the value of lost items and revenue within three business days according to regulations.<br/><br/>
                  <span className="font-bold text-brand-charcoal">Maximum compensation - 50,000 CHF.</span>
                </p>
              </div>
            </section>

            {/* 6. Способ оплаты */}
            <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-brand-charcoal/5 border border-brand-silver/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center font-bold">6</div>
                <h2 className="text-2xl font-black text-brand-charcoal">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-brand-charcoal/70 uppercase">Select payment method:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => updateState('paymentMethod', 'card')}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${state.paymentMethod === 'card' ? 'border-brand-grass bg-brand-grass/10 text-brand-charcoal' : 'border-brand-silver/30 text-brand-charcoal/60 hover:border-brand-silver/60'}`}
                  >
                    <CreditCard size={32} className="mb-3" />
                    <span className="font-bold text-lg">Online by Card</span>
                  </button>
                  <button 
                    onClick={() => updateState('paymentMethod', 'invoice')}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${state.paymentMethod === 'invoice' ? 'border-brand-grass bg-brand-grass/10 text-brand-charcoal' : 'border-brand-silver/30 text-brand-charcoal/60 hover:border-brand-silver/60'}`}
                  >
                    <Building size={32} className="mb-3" />
                    <span className="font-bold text-center text-sm px-4">To pay via bank transfer, you must be registered as a Legal Entity</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Additional Toggles & Submit */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => updateState('saveForm', !state.saveForm)}>
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${state.saveForm ? 'bg-brand-grass text-brand-charcoal' : 'bg-brand-silver/20 text-transparent group-hover:bg-brand-silver/40'}`}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="font-bold text-brand-charcoal text-lg select-none">Save delivery form</span>
              </div>

              <div className="flex items-start gap-3 cursor-pointer group" onClick={() => updateState('agreement', !state.agreement)}>
                <div className={`w-6 h-6 shrink-0 rounded flex items-center justify-center transition-all mt-0.5 ${state.agreement ? 'bg-brand-grass text-brand-charcoal' : 'bg-brand-silver/20 text-transparent group-hover:bg-brand-silver/40'}`}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="font-medium text-brand-charcoal/60 text-sm select-none leading-relaxed">
                  I agree to the processing of personal data according to the privacy policy
                </span>
              </div>
            </div>

          </div>

          {/* Right Column - Sticky Summary */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-28">
            <div className="bg-brand-charcoal rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-grass opacity-10 blur-[80px] rounded-full pointer-events-none"></div>
              
              <h3 className="text-xl font-bold text-brand-silver mb-6">Total:</h3>
              
              <div className="flex items-end gap-2 mb-8 border-b border-white/10 pb-8">
                <span className="text-6xl font-black text-brand-grass tracking-tighter tabular-nums leading-none">
                  {totalCost}
                </span>
                <span className="text-2xl font-bold text-white mb-1">CHF</span>
              </div>

              <p className="text-sm font-medium text-brand-silver/80 leading-relaxed mb-8">
                Price includes VAT. The calculation is preliminary, the final cost may differ and is determined during processing by Express2you staff.
              </p>

              {submitError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-sm font-medium text-center">
                  {submitError}
                </div>
              )}
              
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-5 bg-brand-grass hover:bg-[#72cc35] text-brand-charcoal font-black text-lg rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-grass/20"
              >
                {isSubmitting ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Stripe Overlay Modal */}
        {clientSecret && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#f8f9fa] rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
              <button 
                onClick={() => setClientSecret(null)}
                className="absolute top-4 right-4 text-brand-charcoal/50 hover:text-brand-charcoal"
              >
                <X size={24} />
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-brand-charcoal">Order Payment</h2>
                <p className="text-brand-charcoal/60 mt-2 font-medium">Secure payment via Stripe</p>
                <div className="text-4xl font-black text-brand-grass tracking-tighter mt-4">{totalCost} CHF</div>
              </div>
              
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                <CheckoutForm onSuccess={() => {
                  setClientSecret(null);
                  setSubmitSuccess(true);
                }} />
              </Elements>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
