'use client';

import { useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function MessageList() {
  const { data: authors } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllAuthors',
  });

  if (!authors || authors.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center mt-6">
        No messages yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {[...authors].reverse().map((author) => (
        <MessageCard key={author} author={author} />
      ))}
    </div>
  );
}

function MessageCard({ author }) {
  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'messages',
    args: [author],
  });

  const { writeContract, isPending } = useWriteContract();

  if (!data || !data[0]) return null;

  return (
    <div className="bg-slate-900/80 rounded-2xl p-4 shadow">
      <p className="text-base leading-relaxed">
        {data[0]}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">
          {author.slice(0, 6)}…{author.slice(-4)}
        </span>

        <button
          onClick={() =>
            writeContract({
              address: CONTRACT_ADDRESS,
              abi: CONTRACT_ABI,
              functionName: 'likeMessage',
              args: [author],
            })
          }
          disabled={isPending}
          className="flex items-center gap-1 text-sm active:scale-95 transition"
        >
          ❤️ {Number(data[1])}
        </button>
      </div>
    </div>
  );
}