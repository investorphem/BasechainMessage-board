import WalletConnect from '@/components/ConnectButton';
import MessageBoard from '@/components/MessageBoard';
import MessageList from '@/components/MessageList';

export default function Home() {
  return (
    <main className="max-w-xl mx-auto mt-16 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Base Message Board
      </h1>
      <WalletConnect />
      <MessageBoard />
      <MessageList />
    </main>
  );
}