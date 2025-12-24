'use client';
import { useConnect } from 'wagmi';
import { walletConnect } from 'wagmi/connectors'; //

export default function ConnectButton() {
  const { connect } = useConnect(); //

  const handleConnect = () => {
    connect({ 
      connector: walletConnect({ 
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID 
      }) 
    });
  };

  return (
    <button 
      className="bg-blue-600 text-white px-4 py-2 rounded" 
      onClick={handleConnect}
    >
      Connect Wallet
    </button>
  );
}
