'use client';
import { useConnect } from 'wagmi';
import { WalletConnectConnector } from '@wagmi/connectors';

export default function ConnectButton() {
  const { connect } = useConnect({
    connector: new WalletConnectConnector({
      options: { projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID }
    })
  });

  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => connect()}>
      Connect Wallet
    </button>
  );
}