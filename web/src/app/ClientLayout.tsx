'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Script from 'next/script';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{}}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
        {children}
      </PayPalScriptProvider>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { send_page_view: false });
        `}
      </Script>
    </ClerkProvider>
  )
}