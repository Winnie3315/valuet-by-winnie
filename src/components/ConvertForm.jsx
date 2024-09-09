import { useEffect, useState } from 'react';
import axios from 'axios';

const ConvertForm = () => {
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [symbols, setSymbols] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.get('/symbols')
            .then(res => setSymbols(Object.entries(res.data).map(([key, value]) => ({ key, value }))));
        
        axios.get(`http://localhost:8080/wallets?user_id=${user.id}`)
            .then(res => setWallets(res.data));
    }, [user.id]);

    useEffect(() => {
        if (selectedWallet) {
            axios.get(`https://api.apilayer.com/fixer/convert?to=aed&from=${selectedWallet.currency}&amount=${selectedWallet.balance}`, {
                headers: { "apikey": "5TMG56ZujEaGIngNJRUI1kq0AM7Oor52" }
            })
            .then(res => setConvertedAmount(res.data.result));
        }
    }, [selectedWallet]);

    const handleFromChange = (e) => {
        const id = e.target.value;
        const wallet = wallets.find(el => el.id === id);
        setSelectedWallet(wallet);
    };

    const handleToChange = (e) => {
        setSelectedCurrency(e.target.value);
        if (selectedWallet) {
            axios.get(`https://api.apilayer.com/fixer/convert?to=${e.target.value}&from=${selectedWallet.currency}&amount=${selectedWallet.balance}`, {
                headers: { "apikey": "5TMG56ZujEaGIngNJRUI1kq0AM7Oor52" }
            })
            .then(res => setConvertedAmount(res.data.result));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCurrency) {
            axios.get(`https://api.apilayer.com/fixer/convert?to=${selectedCurrency}&from=${selectedWallet.currency}&amount=${selectedWallet.balance}`, {
                headers: { "apikey": "5TMG56ZujEaGIngNJRUI1kq0AM7Oor52" }
            })
            .then(res => {
                return axios.patch(`/wallets/${selectedWallet.id}`, {
                    balance: res.data.result,
                    currency: res.data.query.to
                });
            })
            .then(() => window.location.reload());
        }
    };

    return (
        <div className="flex gap-8">
            <div className="flex-1 p-8 bg-gradient-to-b from-blue-900 to-blue-800 shadow-lg rounded-lg">
                <h2 className="text-white text-xl mb-5">Exchange</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex gap-6 text-white">
                        <div className="flex-1 bg-gradient-to-b from-indigo-600 to-indigo-800 p-8 rounded-lg shadow-md">
                            <p className="text-gray-400 text-sm mb-2">From</p>
                            <select
                                className="w-full bg-transparent text-white border-none mb-6"
                                value={selectedWallet?.id || ''}
                                onChange={handleFromChange}
                            >
                                <option value="" disabled>Select Wallet</option>
                                {wallets.map(wallet => (
                                    <option key={wallet.id} value={wallet.id}>
                                        {wallet.name}
                                    </option>
                                ))}
                            </select>
                            <div className="bg-gray-800 p-4 rounded-lg border-b-2 border-blue-500">
                                <h2 className="text-2xl">{selectedWallet?.balance.toLocaleString('ru')}</h2>
                                <h2>{selectedWallet?.currency}</h2>
                            </div>
                        </div>
                        <div className="flex-1 bg-gradient-to-b from-indigo-600 to-indigo-800 p-8 rounded-lg shadow-md">
                            <p className="text-gray-400 text-sm mb-2">To</p>
                            <select
                                className="w-full bg-transparent text-white border-none mb-6"
                                value={selectedCurrency || ''}
                                onChange={handleToChange}
                            >
                                <option value="" disabled>Select Currency</option>
                                {symbols.map(({ key, value }) => (
                                    <option key={key} value={key}>
                                        {key} - {value}
                                    </option>
                                ))}
                            </select>
                            <div className="bg-gray-800 p-4 rounded-lg border-b-2 border-blue-500">
                                <h2 className="text-2xl">{convertedAmount || '0'}</h2>
                                <h2>{selectedCurrency || 'Currency'}</h2>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg"
                    >
                        Convert
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConvertForm;
