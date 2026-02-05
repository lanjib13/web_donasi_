import { useState } from "react";
import { ethers } from "ethers";
import abi from "../DonationABI.json";

const CONTRACT_ADDRESS = "0x772425Ad5c7877BBE493706DaBfFe64447AcB9F6";

export default function DonateForm({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask belum terhubung");
        return;
      }

      if (!amount || Number(amount) <= 0) {
        alert("Masukkan jumlah ETH yang valid");
        return;
      }

      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.donate({
        value: ethers.parseEther(amount)
      });

      await tx.wait();

      await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_address: await signer.getAddress(),
          amount_eth: amount,
          tx_hash: tx.hash
        })
      });

      setAmount("");
      if (onSuccess) onSuccess();
      alert("Donasi berhasil ");
    } catch (err) {
      console.error(err);
      alert("Donasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-form-container">
      <div className="input-group">
        <label htmlFor="amount" className="input-label">Jumlah Donasi</label>
        <div className="input-wrapper">
          <input
            id="amount"
            className="donate-input"
            type="number"
            step="0.001"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="input-suffix">ETH</span>
        </div>
      </div>

      <button 
        className={`donate-btn ${loading ? 'loading' : ''}`} 
        onClick={handleDonate} 
        disabled={loading}
      >
        {loading ? (
          <span className="spinner-text">Memproses Transaksi...</span>
        ) : (
          "Konfirmasi Donasi"
        )}
      </button>
      <p className="helper-text">Pastikan saldo Anda cukup untuk gas fee.</p>
    </div>
  );
}