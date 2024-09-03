import React, { useEffect, useState } from "react";
import { useHttpRequest } from "../src/hooks/http.request";
import { useNavigate } from "react-router-dom";
import TransactionCard from "../src/components/TransactonCard";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const { request } = useHttpRequest('http://localhost:8080');
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await request('/transactions?user_id=' + user.user_id, 'get');
                if (data) {
                    setTransactions(data);
                }
            } catch (err) {
                console.error("Error fetching transactions:", err);
            }
        };

        fetchTransactions();
    }, [request, user.user_id]);

    const handleAddTransaction = () => {
        navigate("/add-transaction");
    };

    return (
        <>
            <div className="head flex justify-between items-center mb-2">
                <div className="left">
                    <h4 className="text-white text-lg">Transactions</h4>
                </div>
                <div className="right">
                    <button 
                        onClick={handleAddTransaction} 
                        className="widget bg-btn-cus-sign py-[5px] pe-[22px] ps-[22px] text-white"
                    >
                        Add Transaction
                    </button>
                </div>
            </div>

            <div className="transactions-container flex gap-[20px] flex-col">
                {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <TransactionCard
                            key={transaction.id || index} 
                            id={transaction.id} 
                            time={transaction.updated_at} 
                            amount={transaction.amount} 
                        />
                    ))
                ) : (
                    <p className="text-white">No transactions available</p>
                )}
            </div>
        </>
    );
}

export default Transactions;
