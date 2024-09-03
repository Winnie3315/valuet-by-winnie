import { useEffect, useState } from "react";
import { useHttpRequest } from "../hooks/http.request";

function TotalTransactionsAmount() {
    const { request, loading, error } = useHttpRequest('http://localhost:8080');
    const [totalAmount, setTotalAmount] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactions = await request('/transactions?user_id=' + user.user_id, 'get');
                if (transactions) {
                    const total = transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
                    setTotalAmount(total);
                }
            } catch (err) {
                console.error("Error fetching transactions:", err);
            }
        };

        fetchTransactions();
    }, [request]);
    return ( <>
         <div>
             {loading ? <p>Loading...</p> : <p>{totalAmount.toFixed(2)}</p>}
             {error && <p>Error: {error}</p>}
         </div>
    </> );
}

export default TotalTransactionsAmount;