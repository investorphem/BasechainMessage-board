'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { wagmiConfig } from '@/lib/wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';

// Create query client once
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Domain Verification */}
        <meta
          name="talentapp:project_verification"
          content="3b7f9f317de9a4de5f152edfee9518ed647e99c84d404b66292c415dc7c6eb883f08294b9c2b4992d48ae445cde0e2bbb1f999afaf0a12933b0f5cf42eb37938"
        />
      </head>

      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}