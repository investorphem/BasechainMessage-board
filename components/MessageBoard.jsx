'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function MessageBoard() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [message, setMessage] = useState('');

  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getMessage',
    args: address ? [address] : undefined,
  });

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 rounded bg-slate-800"
        placeholder="Write your on-chain message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={() =>
          writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'writeMessage',
            args: [message],
          })
        }
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Post Message
      </button>

      {data && (
        <div className="bg-slate-900 p-4 rounded">
          <p className="text-lg">{data[0]}</p>
          <p className="text-sm text-gray-400">Likes: {Number(data[1])}</p>
        </div>
      )}
    </div>
  );
}