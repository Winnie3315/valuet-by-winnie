import React, { useEffect, useState } from 'react';
import SpendingChart from '../src/components/SpendingChart';
import MarketChart from '../src/components/MarketChart';
import Wallet from '../src/components/Wallet';
import News from '../src/components/News';
import { useHttpRequest } from '../src/hooks/http.request';
import BalanceCard from '../src/components/BalanceCard';

function Overview() {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { request, loading, error } = useHttpRequest('http://localhost:8080');
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchWallets = async () => {
      const walletData = await request('/wallets?user_id=' + user.user_id, 'get');
      if (walletData) {
        setWallets(walletData);
      }
    };

    const fetchTransactions = async () => {
      const transactionData = await request('/transactions?user_id=' + user.user_id, 'get');
      if (transactionData) {
        setTransactions(transactionData);
      }
    };

    fetchWallets();
    fetchTransactions();
  }, [request, user.user_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const backgroundColor = wallets.length > 0 ? wallets[0].background : '';

  return (
    <>
      <div className="head flex justify-between items-center mb-2">
        <div className="left">
          <h4 className="text-white text-lg">Overview</h4>
        </div>
      </div>

      <div className="body-top xs:w-full flex w-full max-w-[1200px] flex-col gap-2.5">
        <div className="top xs:flex xs:flex-col xs:justify-center xs:items-center grid gap-[40px]">
          <BalanceCard transactions={transactions} background={backgroundColor} />
          <SpendingChart />
          <div className="widget-container w-full grid ">
            {wallets.slice(0, 4).map((wallet, index) => (
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
        <div className="bottom xs:hidden flex w-[60%] max-w-[1200px]">
          <MarketChart />
          <div className="news bg-[#161245] w-[40%] p-[20px] max-w-[1200px]">
            <p className="text-xl text-white">Recent News</p>
            <div className="news-box h-[120px] overflow-auto flex flex-col gap-[12px] border-t-[#2D317A] border-t-2">
              <News />
              <News />
              <News />
              <News />
              <News />
              <News />
              <News />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
