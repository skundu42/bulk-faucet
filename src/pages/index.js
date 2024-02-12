import { useState } from 'react';

export default function Home() {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidAddress(address)) {
      alert('Please enter a valid Ethereum address.');
      return;
    }
    const response = await fetch('/api/collectAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });

    if (response.ok) {
      console.log('Address submitted:', address);
      setAddress(''); // Clear the input after submission
      setMessage('Address successfully submitted. It will be included in the next distribution cycle.');
      setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
    } else {
      const errorData = await response.json();
      alert(`Error submitting address: ${errorData.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter ETH Address"
          required
        />
        <button type="submit">Submit Address</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
