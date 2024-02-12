// pages/api/collectAddress.js
const { distributeEther } = require('../lib/blockchainService');
let addresses = [];
let collectionInterval = null;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { address } = req.body;
    addresses.push(address);

    // Initialize or reset the 10-second timer upon each address collection
    if (collectionInterval) clearTimeout(collectionInterval);
    collectionInterval = setTimeout(async () => {
      const result = await distributeEther(addresses);
      addresses = []; // Reset the addresses array after distribution
      if (!result.success) {
        console.error(result.error);
      }
    }, 10000); // 10 seconds

    res.status(200).json({ message: 'Address collected' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
