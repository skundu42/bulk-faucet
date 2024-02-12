// lib/blockchainService.js
const { ethers } = require('ethers');

const distributeEther = async (addresses) => {
  const provider = new ethers.providers.getDefaultProvider('rinkeby');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, [
    "function distribute1ETHToMultiple(address payable[] memory _to) public"
  ], wallet);

  if (addresses.length > 0) {
    try {
      const tx = await contract.distribute1ETHToMultiple(addresses);
      await tx.wait();
      console.log(`Transaction successful: ${tx.hash}`);
      return { success: true, txHash: tx.hash };
    } catch (error) {
      console.error(`Error in transaction: ${error.message}`);
      return { success: false, error: error.message };
    }
  } else {
    console.log("No addresses collected.");
    return { success: false, error: "No addresses collected." };
  }
};

module.exports = { distributeEther };
