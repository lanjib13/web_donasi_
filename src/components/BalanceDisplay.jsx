import { useEffect, useState } from "react";
import { ethers } from "ethers";

function BalanceDisplay({ account }) {
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    const loadBalance = async () => {
      if (!account || !window.ethereum) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const bal = await provider.getBalance(account);      
        const formattedBal = parseFloat(ethers.formatEther(bal)).toFixed(4);
        setBalance(formattedBal);
      } catch (err) {
        console.error("Gagal mengambil saldo:", err);
      }
    };

    loadBalance();
    
    
    const interval = setInterval(loadBalance, 15000);
    return () => clearInterval(interval);
  }, [account]);

  if (!account) return null;

  return (
    <div className="balance-card">
      <div className="balance-label">Total Saldo Wallet</div>
      <div className="balance-value">
        <span className="eth-symbol">Ξ</span> {balance} 
        <span className="currency-unit">ETH</span>
      </div>
      <div className="network-tag">Ethereum Network</div>
    </div>
  );
}

export default BalanceDisplay;