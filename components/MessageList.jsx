'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';
import LikeButton from './LikeButton';

const DEPLOYMENT_BLOCK = 39908272; // ✅ your contract creation block

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const provider = new ethers.JsonRpcProvider(
        'https://base-mainnet.public.blastapi.io'
      );

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      // ✅ CORRECT EVENT + fromBlock
      const events = await contract.queryFilter(
        contract.filters.MessageWritten(),
        DEPLOYMENT_BLOCK,
        'latest'
      );

      const formatted = events
        .map(e => ({
          author: e.args.user,
          text: e.args.text,
          txHash: e.transactionHash,
          likes: 0 // optimistic, hydrated in LikeButton
        }))
        .reverse();

      setMessages(formatted);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false); // 🔥 prevents infinite loading
    }
  }

  if (loading) {
    return <p className="text-center text-gray-400">Loading messages…</p>;
  }

  if (!messages.length) {
    return <p className="text-center text-gray-500">No messages yet</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className="rounded-xl bg-slate-900 p-4 border border-slate-800"
        >
          <p className="text-sm text-gray-300 mb-2">{msg.text}</p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <a
              href={`https://basescan.org/address/${msg.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {msg.author.slice(0, 6)}…{msg.author.slice(-4)}
            </a>

            <div className="flex items-center gap-3">
              <LikeButton author={msg.author} />

              <a
                href={`https://basescan.org/tx/${msg.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                tx
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}