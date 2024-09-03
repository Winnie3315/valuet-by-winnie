import { useForm } from "react-hook-form";
import { useHttpRequest } from "../src/hooks/http.request";
import { useNavigate } from "react-router-dom";

function AddWallet() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { request, loading, error, clearError } = useHttpRequest('http://localhost:8080');

    const onSubmit = async (data) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert('User not found');
            return;
        }

        const wallet = {
            id: crypto.randomUUID(),
            created_at: new Date().toLocaleDateString(),
            updated_at: new Date().toLocaleDateString(),
            user_id: user.user_id,
            balance: parseFloat(data.balance),
            ...data
        };

        try {
            const response = await request('/wallets', 'post', wallet);

            if (response) {
                alert('Success');
                navigate("/wallet");
            } else {
                alert('Failed to add wallet');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <center>        
        <form className="flex flex-col w-[380px] gap-[26px]" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="wallet" className="flex bg-[#2E3558] items-center h-[58px] rounded-md">
            <input
                type="text"
                placeholder="Wallet"
                name="wallet"
                id="wallet"
                className="bg-[#2E3558] text-[#616A8B] w-[310px] h-[30px]"
                {...register("wallet", {
                    required: "Wallet is required"
                })}
            />
        </label>
        {errors.wallet && <span className="text-red-500">{errors.wallet.message}</span>}

        <label htmlFor="balance" className="flex bg-[#2E3558] items-center h-[58px] rounded-md border-b-4 border-b-[#1288E8]">
            <img src="/icons/wallet.svg" alt="wallet" className="absolute" />
            <input
                type="balance"
                placeholder="balance"
                name="balance"
                id="balance"
                className="bg-[#2E3558] w-[310px] text-[#616A8B]"
                {...register("balance", {
                    required: "balance is required"
                })}
            />
        </label>

        <label htmlFor="currency" className="flex bg-[#2E3558] items-center h-[58px] rounded-md border-b-4 border-b-[#1288E8]">
            <img src="/icons/wallet.svg" alt="wallet" className="absolute" />
            <input
                type="currency"
                placeholder="currency"
                name="currency"
                id="currency"
                className="bg-[#2E3558] w-[310px] text-[#616A8B]"
                {...register("currency", {
                    required: "currency is required"
                })}
            />
        </label>
        {errors.balance && <span className="text-red-500">{errors.balance.message}</span>}

        <div className="buttons flex items-center justify-center gap-[32px] mt-[30px]">
            <button
                className="bg-btn-cus-sign py-[12px] pe-[22px] ps-[22px] rounded-md text-white"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Signing In...' : 'SIGN IN'}
            </button>
        </div>
    </form>
    </center>
    );
}

export default AddWallet;
