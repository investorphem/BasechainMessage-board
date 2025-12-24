'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';
import LikeButton from './LikeButton';

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const provider = new ethers.JsonRpcProvider(
      "https://mainnet.base.org"
    );

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );

    const events = await contract.queryFilter("MessageCreated");

    const formatted = events.map(e => ({
      id: Number(e.args.id),
      author: e.args.author,
      text: e.args.text,
      timestamp: Number(e.args.timestamp),
      likes: 0 // hydrated optimistically
    })).reverse();

    setMessages(formatted);
    setLoading(false);
  }

  if (loading) {
    return <p className="text-center text-gray-400">Loading messages…</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map(msg => (
        <div
          key={msg.id}
          className="rounded-xl bg-slate-900 p-4 border border-slate-800"
        >
          <p className="text-sm text-gray-300 mb-2">{msg.text}</p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <a
              href={`https://basescan.org/address/${msg.author}`}
              target="_blank"
              className="hover:underline"
            >
              {msg.author.slice(0, 6)}…{msg.author.slice(-4)}
            </a>

            <LikeButton messageId={msg.id} />
          </div>
        </div>
      ))}
    </div>
  );
}