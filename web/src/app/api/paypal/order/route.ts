import { NextResponse } from 'next/server';

// PayPal API 자격 증명을 환경 변수에서 가져옵니다.
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const APP_SECRET = process.env.PAYPAL_SECRET!;

// PayPal API 기본 URL
const base = 'https://api-m.sandbox.paypal.com';

/**
 * PayPal API 액세스 토큰을 생성합니다.
 */
const generateAccessToken = async () => {
  try {
    if (!CLIENT_ID || !APP_SECRET) {
      throw new Error('MISSING_API_CREDENTIALS');
    }
    const auth = Buffer.from(`${CLIENT_ID}:${APP_SECRET}`).toString('base64');
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Failed to generate Access Token:', error);
    // 실제 프로덕션에서는 더 정교한 오류 처리가 필요합니다.
    throw new Error('Failed to generate Access Token');
  }
};

/**
 * PayPal 주문을 생성합니다.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async () => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '10.00', // 예시 금액
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.json();
};

/**
 * POST 요청을 처리하여 PayPal 주문을 생성하고 주문 ID를 반환합니다.
 */
export const POST = async () => {
  try {
    const order = await createOrder();
    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { error: 'Failed to create order.' },
      { status: 500 }
    );
  }
};