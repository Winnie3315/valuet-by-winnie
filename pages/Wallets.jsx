import React, { useEffect, useState } from 'react';
import TotalCard from '../src/components/TotalCard';
import Wallet from '../src/components/Wallet';
import BalanceChart from '../src/components/BalanceChart';
import { useHttpRequest } from '../src/hooks/http.request';
import TransactionsMini from '../src/components/TransactionMini';
import { useNavigate } from 'react-router-dom';

function Wallets() {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { request, loading, error } = useHttpRequest('http://localhost:8080');
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const walletData = await request(`/wallets?user_id=${user.user_id}`, 'get');
      if (walletData) {
        setWallets(walletData);
      }

      const transactionData = await request(`/transactions?user_id=${user.user_id}`, 'get');
      if (transactionData) {
        setTransactions(transactionData);
      }
    };

    fetchData();
  }, [request, user.user_id]);

    const handleAddWallet = () => {
        navigate("/add-wallet");
    };

  const calculateAssets = () => {
    return wallets.map(wallet => ({
      name: wallet.wallet,
      value: wallet.balance
    }));
  };

  const assets = calculateAssets();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="head flex justify-between items-center mb-2">
        <div className="left">
          <h4 className="text-white text-lg">Wallets</h4>
        </div>
        <div className="right">
          <button onClick={handleAddWallet} className="widget bg-btn-cus-sign py-[5px] pe-[22px] ps-[22px] text-white">Add Wallets</button>
        </div>
      </div>

      <div className="wallet-body flex flex-col gap-[20px]">
        <div className="wallet-top flex ">
          <TotalCard assets={assets} display={"flex"} />
          <div className="wallet-container flex overflow-y-auto w-full">
            {wallets.map((wallet, index) => (
              <Wallet 
                key={wallet.id || index} 
                balance={wallet.balance} 
                name={wallet.wallet} 
                currency={wallet.currency}
                walletId={wallet.id}
                background={wallet.background}
              />
            ))}
          </div>
        </div>
        <div className="wallet-bottom grid gap-4">
          <BalanceChart transactions={transactions} />
          <div className="transactions bg-[#161245] p-5">
            <h4 className="text-1xl text-white">RECENT TRANSACTIONS</h4>
            <div className="transactions-box">
              {transactions.map((transaction, index) => (
                <TransactionsMini
                  key={transaction.id || index}
                  amount={transaction.amount}
                  time={transaction.updated_at}
                  sender={user.name}
                  recipient={"Unkown"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallets;
