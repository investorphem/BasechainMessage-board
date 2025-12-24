export const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS";

export const CONTRACT_ABI = [
  {
    "inputs": [{"internalType":"string","name":"_text","type":"string"}],
    "name":"writeMessage",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"string","name":"_text","type":"string"}],
    "name":"updateMessage",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"_user","type":"address"}],
    "name":"likeMessage",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"_user","type":"address"}],
    "name":"getMessage",
    "outputs":[
      {"internalType":"string","name":"text","type":"string"},
      {"internalType":"uint256","name":"likes","type":"uint256"}
    ],
    "stateMutability":"view",
    "type":"function"
  }
];