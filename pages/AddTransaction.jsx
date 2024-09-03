import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHttpRequest } from "../src/hooks/http.request";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

function AddTransaction() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { request, loading, error } = useHttpRequest('http://localhost:8080');
    const navigate = useNavigate();
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [recipientWallet, setRecipientWallet] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const data = await request('/wallets?user_id=' + user.user_id, 'get');
                if (data) {
                    setWallets(data);
                    setSelectedWallet(data[0]);
                }
            } catch (err) {
                console.error("Error fetching wallets:", err);
            }
        };

        fetchWallets();
    }, [request, user.user_id]);

    const onSubmit = async (data) => {
        console.log("Selected wallet:", selectedWallet);
        console.log("Recipient wallet:", recipientWallet);

        if (!selectedWallet || !recipientWallet) {
            alert("Please select both sender and recipient wallets.");
            return;
        }

        const commissionRate = 0.02;
        const commission = data.amount * commissionRate;
        const totalAmountWithCommission = +data.amount + commission;

        if (selectedWallet.balance < totalAmountWithCommission) {
            alert("Insufficient balance to cover the transfer and commission.");
            return;
        }

        const transaction = {
            id: crypto.randomUUID(),
            created_at: moment().format("YYYYMMDD, HH:mm"),
            updated_at: moment().format("HH:mm:ss"),
            user_id: user.user_id,
            amount: parseFloat(data.amount),
            commission: commission,
            category: data.category,
            description: data.description,
            sender_wallet_id: selectedWallet.id,
            recipient_wallet_id: recipientWallet.id,
            sender_wallet: {
                created_at: selectedWallet.created_at,
                updated_at: selectedWallet.updated_at,
                name: selectedWallet.wallet,
                currency: selectedWallet.currency,
                balance: selectedWallet.balance - totalAmountWithCommission,
            },
            recipient_wallet: {
                created_at: recipientWallet.created_at,
                updated_at: recipientWallet.updated_at,
                name: recipientWallet.wallet,
                currency: recipientWallet.currency,
                balance: recipientWallet.balance + +data.amount,
            }
        };

        const updatedSenderBalance = selectedWallet.balance - totalAmountWithCommission;
        const updatedRecipientBalance = recipientWallet.balance + +data.amount;

        const updateSenderWalletData = { balance: updatedSenderBalance };
        const updateRecipientWalletData = { balance: updatedRecipientBalance };

        try {
            const updateSenderRes = await request(`/wallets/${selectedWallet.id}`, 'patch', updateSenderWalletData);
            const updateRecipientRes = await request(`/wallets/${recipientWallet.id}`, 'patch', updateRecipientWalletData);

            if (updateSenderRes && updateRecipientRes) {
                const res = await request('/transactions', 'post', transaction);
                if (res) {
                    alert('Transaction added successfully');
                    navigate('/transactions');
                }
            }
        } catch (err) {
            console.error("Error processing transaction:", err);
            alert("Transaction failed.");
        }
    };

    return (
        <>
            <center>
                <form className="flex flex-col w-[380px] gap-[26px]" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="senderWallet" className="flex p-[20px] bg-[#2E3558] items-center h-[58px] rounded-md">
                        <select
                            name="senderWallet"
                            id="senderWallet"
                            className="bg-[#2E3558] text-[#616A8B] w-[310px] h-[30px]"
                            onChange={(e) => {
                                const wallet = wallets.find(w => w.id === e.target.value);
                                setSelectedWallet(wallet);
                            }}
                            {...register("senderWallet", {
                                required: "Sender Wallet is required",
                            })}
                        >
                            {wallets.map(wallet => (
                                <option key={wallet.id} value={wallet.id}>
                                    {wallet.wallet} ({wallet.currency})
                                </option>
                            ))}
                        </select>
                    </label>
                    {errors.senderWallet && <span className="text-red-500">{errors.senderWallet.message}</span>}

                    <label htmlFor="recipientWallet" className="flex p-[20px] bg-[#2E3558] items-center h-[58px] rounded-md">
                        <input
                            type="text"
                            placeholder="Recipient Wallet ID"
                            name="recipientWallet"
                            id="recipientWallet"
                            className="bg-[#2E3558] w-[310px] text-[#616A8B]"
                            onChange={(e) => {
                                const walletId = e.target.value.trim();
                                const wallet = wallets.find(w => w.id === walletId);
                                if (wallet) {
                                    setRecipientWallet(wallet);
                                } else {
                                    alert("Recipient wallet not found.");
                                    setRecipientWallet(null);
                                }
                            }}
                            {...register("recipientWallet", {
                                required: "Recipient Wallet ID is required",
                            })}
                        />
                    </label>
                    {errors.recipientWallet && <span className="text-red-500">{errors.recipientWallet.message}</span>}

                    <label htmlFor="amount" className="flex p-[20px] bg-[#2E3558] items-center h-[58px] rounded-md">
                        <input
                            type="number"
                            placeholder="Amount"
                            name="amount"
                            id="amount"
                            className="bg-[#2E3558] w-[310px] text-[#616A8B]"
                            {...register("amount", {
                                required: "Amount is required",
                                validate: value => value > 0 || "Amount must be greater than zero"
                            })}
                        />
                    </label>
                    {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}

                    <label htmlFor="currency" className="flex p-[20px] bg-[#2E3558] items-center h-[58px] rounded-md">
                        <input
                            type="text"
                            placeholder="Currency"
                            name="currency"
                            id="currency"
                            className="bg-[#2E3558] w-[310px] text-[#616A8B]"
                            defaultValue={selectedWallet?.currency || ''}
                            readOnly
                        />
                    </label>

                    <label htmlFor="category" className="flex p-[20px] bg-[#2E3558] items-center h-[58px] rounded-md">
                        <input
                            type="text"
                            placeholder="Category"
                            name="category"
                            id="category"
                            className="bg-[#2E3558] w-[310px] text-[#616A8B]"
                            {...register("category", {
                                required: "Category is required",
                            })}
                        />
                    </label>
                    {errors.category && <span className="text-red-500">{errors.category.message}</span>}

                    <label htmlFor="description" className="flex p-[20px] bg-[#2E3558] items-center h-[58px] rounded-md">
                        <input
                            type="text"
                            placeholder="Description"
                            name="description"
                            id="description"
                            className="bg-[#2E3558] w-[310px] text-[#616A8B]"
                            {...register("description", {
                                required: "Description is required",
                            })}
                        />
                    </label>
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}

                    <div className="buttons flex items-center justify-center gap-[32px] mt-[30px]">
                        <button
                            className="bg-btn-cus-sign py-[12px] pe-[22px] ps-[22px] rounded-md text-white"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </center>
        </>
    );
}

export default AddTransaction;
