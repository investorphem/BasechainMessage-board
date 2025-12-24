'use client';

import { useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESS, ABI } from '@/lib/contract';

export default function MessageList() {
  const { data: authors } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getAllAuthors'
  });

  const { writeContract } = useWriteContract();

  if (!authors) return null;

  return (
    <div className="space-y-4">
      {authors.map(author => (
        <Message key={author} author={author} like={writeContract} />
      ))}
    </div>
  );
}

function Message({ author, like }) {
  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'messages',
    args: [author]
  });

  if (!data || !data[0]) return null;

  return (
    <div className="bg-slate-900 p-4 rounded">
      <p>{data[0]}</p>
      <div className="flex justify-between mt-2">
        <span>❤️ {Number(data[1])}</span>
        <button
          onClick={() =>
            like({
              address: CONTRACT_ADDRESS,
              abi: ABI,
              functionName: 'likeMessage',
              args: [author],
            })
          }
          className="text-blue-400"
        >
          Like
        </button>
      </div>
    </div>
  );
}