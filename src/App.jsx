import { useEffect, useState } from "react";
import WalletConnect from "./components/WalletConnect.jsx";
import BalanceDisplay from "./components/BalanceDisplay.jsx";
import TransactionList from "./components/TransactionList.jsx";
import DonateForm from "./components/DonateForm.jsx";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    const res = await fetch("https://cobaklagi-production.up.railway.app/api/transactions");
    const json = await res.json();
    setTransactions(json.data || []);
  };

 useEffect(() => {
    const fetchData = async () => {
      await loadTransactions();
    };
    fetchData();
  }, []);
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Web Donasi Blockchain</h1>
        <p className="app-subtitle">Sistem Donasi Transparan & Aman</p>
      </header>
      <div className="dashboard-content">
        <div className="left-panel">
          <div className="card wallet-info">
            <WalletConnect setAccount={setAccount} />
            <BalanceDisplay account={account} />
          </div>

          <div className="card form-container">
            <h3 className="section-label">Kirim Donasi</h3>
            <DonateForm onSuccess={loadTransactions} />
          </div>
        </div>

        <div className="right-panel">
          <div className="card list-container">
            
            <TransactionList
              transactions={transactions}
              reload={loadTransactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;