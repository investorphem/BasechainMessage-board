'use client';

import { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';

export default function LikeButton({ messageId }) {
  const { data: walletClient } = useWalletClient();
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);

  async function like() {
    if (!walletClient) return;

    // 🚀 Optimistic update
    setLikes(likes + 1);
    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      await contract.likeMessage(messageId);
    } catch (err) {
      // rollback on failure
      setLikes(likes);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={like}
      disabled={loading}
      className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
    >
      ❤️ {likes}
    </button>
  );
}