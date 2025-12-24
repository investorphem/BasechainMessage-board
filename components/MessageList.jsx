'use client';
import { useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import Skeleton from './Skeleton';
import { useDisplayName } from '@/lib/useName';
import PullToRefresh from 'react-pull-to-refresh';

export default function MessageList() {
  const { data: authors } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllAuthors',
  });

  if (!authors) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => <Skeleton key={i} />)}
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={() => window.location.reload()}>
      <div className="space-y-4">
        {[...authors].reverse().map((author) => (
          <MessageCard key={author} author={author} />
        ))}
      </div>
    </PullToRefresh>
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
  const [optimisticLikes, setOptimisticLikes] = useState(Number(data?.[1] ?? 0));
  const displayName = useDisplayName(author);

  if (!data || !data[0]) return null;

  return (
    <div className="bg-slate-900/80 rounded-2xl p-4 shadow">
      <p className="text-base leading-relaxed">{data[0]}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">{displayName}</span>
        <button
          onClick={() => {
            setOptimisticLikes((l) => l + 1);
            writeContract({
              address: CONTRACT_ADDRESS,
              abi: CONTRACT_ABI,
              functionName: 'likeMessage',
              args: [author],
            });
          }}
          disabled={isPending}
          className="flex items-center gap-1 text-sm active:scale-95 transition"
        >
          ❤️ {optimisticLikes}
        </button>
      </div>
    </div>
  );
}