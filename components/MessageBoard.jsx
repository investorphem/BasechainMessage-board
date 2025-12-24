'use client';
import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function MessageBoard() {
  const [text, setText] = useState('');
  const { writeContract, isPending } = useWriteContract();

  function submit() {
    if (!text.trim()) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'writeMessage',
      args: [text],
    });
    setText('');
  }

  return (
    <div className="bg-slate-900/70 backdrop-blur rounded-2xl p-4 shadow-lg">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something on-chain…"
        rows={3}
        className="w-full bg-transparent resize-none outline-none text-base placeholder-gray-500"
      />
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-500">
          Stored permanently on Base
        </span>
        <button
          onClick={submit}
          disabled={isPending}
          className="bg-blue-600 active:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
        >
          {isPending ? 'Posting…' : 'Post'}
        </button>
      </div>
    </div>
  );
}