'use client';

import './globals.css';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { wagmiConfig } from '@/lib/wagmi';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WagmiProvider config={wagmiConfig}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}