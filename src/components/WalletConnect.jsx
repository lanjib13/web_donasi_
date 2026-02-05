import { ethers } from "ethers";
import { useState } from "react";

function WalletConnect({ setAccount }) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask belum terinstall");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const balanceWei = await provider.getBalance(userAddress);
      const balanceEth = ethers.formatEther(balanceWei);

      setAddress(userAddress);
      setBalance(Number(balanceEth).toFixed(4)); 
      setAccount(userAddress);
      setConnected(true);
    } catch (err) {
      console.error(err);
      alert("Gagal connect wallet");
    }
  };

  return (
    <div className="wallet-connect-wrapper">
      {!connected ? (
        <button className="connect-btn-main" onClick={connectWallet}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1504/1504928.png"
            alt="Wallet"
            className="wallet-icon"
          />
          Connect MetaMask
        </button>
      ) : (
        <div className="account-badge">
          <div className="status-dot"></div>
          <div className="wallet-info">
            <span className="address-text">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <span className="balance-text">
              {balance} ETH
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
