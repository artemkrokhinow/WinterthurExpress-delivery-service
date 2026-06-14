"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/calculation?payment_success=true`,
      },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message || "Payment failed");
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-2xl shadow-lg border border-brand-silver/20">
      <PaymentElement />
      {error && <div className="text-red-500 mt-4 text-sm font-bold text-center">{error}</div>}
      <button 
        disabled={!stripe || processing} 
        className="w-full mt-6 py-4 bg-brand-grass hover:bg-[#72cc35] text-brand-charcoal font-black text-lg rounded-xl transition-all disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
}
