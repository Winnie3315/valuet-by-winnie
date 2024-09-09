import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useHttpRequest } from '../src/hooks/http.request';

function AddWallet() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { request, loading, error, clearError } = useHttpRequest('http://localhost:8080');

    function getRandomBg() {
        let random = () => Math.floor(Math.random() * 255);

        let color1 = `rgb(${random()}, ${random()}, ${random()})`;
        let color2 = `rgb(${random()}, ${random()}, ${random()})`;
        let color3 = `rgb(${random()}, ${random()}, ${random()})`;

        return `linear-gradient(90deg, ${color1}, ${color2}, ${color3})`;
    }

    const onSubmit = async (data) => {
        const user = JSON.parse(localStorage.getItem('user'));

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
            background: getRandomBg(),
            ...data,
        };

        try {
            const response = await request('/wallets', 'post', wallet);

            if (response) {
                alert('Success');
                navigate('/wallet');
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
                <label htmlFor="wallet" className="flex p-[20px] bg-[#2E3558] items-center h-[58px] rounded-md">
                    <input
                        type="text"
                        placeholder="Wallet Name"
                        name="wallet"
                        id="wallet"
                        className="bg-[#2E3558] text-[#616A8B] w-[310px] h-[30px]"
                        {...register('wallet', { required: 'Wallet name is required' })}
                    />
                </label>
                {errors.wallet && <span className="text-red-500">{errors.wallet.message}</span>}

                <label htmlFor="balance" className="flex p-[20px] bg-[#2E3558] items-center h-[58px] rounded-md">
                    <input
                        type="number"
                        placeholder="Balance"
                        name="balance"
                        id="balance"
                        className="bg-[#2E3558] text-[#616A8B] w-[310px]"
                        {...register('balance', { required: 'Balance is required' })}
                    />
                </label>
                {errors.balance && <span className="text-red-500">{errors.balance.message}</span>}

                <label htmlFor="currency" className="flex p-[20px] bg-[#2E3558] items-center h-[58px] rounded-md">
                    <input
                        type="text"
                        placeholder="Currency"
                        name="currency"
                        id="currency"
                        className="bg-[#2E3558] text-[#616A8B] w-[310px]"
                        {...register('currency', { required: 'Currency is required' })}
                    />
                </label>
                {errors.currency && <span className="text-red-500">{errors.currency.message}</span>}

                <div className="buttons flex items-center justify-center gap-[32px] mt-[30px]">
                    <button
                        className="bg-btn-cus-sign py-[12px] pe-[22px] ps-[22px] rounded-md text-white"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Wallet'}
                    </button>
                </div>
            </form>
        </center>
    );
}

export default AddWallet;
