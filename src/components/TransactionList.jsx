export default function TransactionList({ transactions, reload }) {
  return (
    <div className="transaction-container">
      <div className="list-header">
        <h2 className="list-title card">  Riwayat Donasi</h2>
        <button className="refresh-btn-small" onClick={reload}>
          ↻ Refresh
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <p>Belum ada aktivitas donasi ditemukan.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount</th>
                <th>Tx Hash</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.tx_hash}>
                  <td className="address-cell" title={tx.donor_address}>
                    {tx.donor_address.slice(0, 6)}...{tx.donor_address.slice(-4)}
                  </td>
                  <td className="amount-cell">
                    <span className="eth-badge">{tx.amount_eth} ETH</span>
                  </td>
                  <td>
                    <a
                      className="tx-link"
                      href={`https://sepolia.etherscan.io/tx/${tx.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tx.tx_hash.slice(0, 8)}...
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}