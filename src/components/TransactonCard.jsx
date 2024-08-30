import React from 'react';

const TransactionCard = () => {
    return (
        <div className=" transaction flex items-center justify-between bg-[#161245] p-4 rounded-xl text-white shadow-lg !w-full h-[70px]">
            <div className="flex items-center">
                <span className="text-lg font-semibold">AM 01:16</span>
                <span className="mx-2 text-gray-400">| 24 dec 2018</span>
                <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-blue-900">
                    <span className="font-bold">₿</span>
                </div>
            </div>
            <div className="flex items-center">
                <span className="mx-4">→</span>
                <span className="text-gray-300">74EKRJMXkhKDR5dj3457gfjrwE22sfg</span>
            </div>
            <div className="flex items-center">
                <span className="text-lg font-bold">0.0085 BTC</span>
                <button className="ml-4 bg-btn-cus rounded-lg px-3 py-[14px] text-xs font-semibold hover:bg-blue-500">
                    Waiting
                </button>
            </div>
        </div>
    );
};

export default TransactionCard;
