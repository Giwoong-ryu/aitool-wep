// src/app/api/paypal/order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';

export const POST = async () => {
  const env = new paypal.core.SandboxEnvironment(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    process.env.PAYPAL_SECRET!
  );
  const client = new paypal.core.PayPalHttpClient(env);

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{ amount: { currency_code: 'USD', value: '10.00' } }],
  });

  const order = await client.execute(request);
  return NextResponse.json({ id: order.result.id });
};