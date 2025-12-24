'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function MessageList() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const authors = await contract.getAllAuthors();
      const data = await Promise.all(authors.map(async (addr) => {
        const msg = await contract.messages(addr);
        return { author: addr, text: msg.text, likes: msg.likes.toNumber() };
      }));
      setMessages(data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="space-y-2">
      {messages.map((m, i) => (
        <div key={i} className="p-2 border rounded flex justify-between items-center">
          <span>{m.text}</span>
          <span className="text-sm text-gray-400">❤️ {m.likes}</span>
        </div>
      ))}
    </div>
  );
}