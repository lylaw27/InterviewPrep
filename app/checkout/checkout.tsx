'use client'
import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import Nav from '@/components/navbar';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
  const fetchClientSecret = useCallback(async() => {
    return fetch("/api/checkout_sessions", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);
  const options = {fetchClientSecret};

  return (
      <div className='p-8 box-border'>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
        >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
        </div>
  )
}