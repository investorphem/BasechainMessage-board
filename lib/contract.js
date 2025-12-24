export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const CONTRACT_ABI = [
  {
    "inputs":[{"internalType":"string","name":"_text","type":"string"}],
    "name":"writeMessage","outputs":[],"stateMutability":"nonpayable","type":"function"
  },
  {
    "inputs":[{"internalType":"string","name":"_text","type":"string"}],
    "name":"updateMessage","outputs":[],"stateMutability":"nonpayable","type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"_author","type":"address"}],
    "name":"likeMessage","outputs":[],"stateMutability":"nonpayable","type":"function"
  },
  {
    "inputs":[],"name":"getAllAuthors","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],
    "stateMutability":"view","type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"","type":"address"}],
    "name":"messages","outputs":[
      {"internalType":"string","name":"text","type":"string"},
      {"internalType":"uint256","name":"likes","type":"uint256"}
    ],
    "stateMutability":"view","type":"function"
  }
];