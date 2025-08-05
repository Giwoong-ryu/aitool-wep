'use client';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useAuth } from '@clerk/nextjs';

export default function Pay() {
  const { userId } = useAuth();

  return (
    <div className="p-8">
      <PayPalButtons
        createOrder={async () => {
          const r = await fetch('/api/paypal/order', { method: 'POST' });
          const { id } = await r.json();
          return id;
        }}
        onApprove={async (data) => {
          await fetch(`/api/paypal/capture?orderID=${data.orderID}&userId=${userId}`);
          alert('결제 완료!');
        }}
      />
    </div>
  );
}