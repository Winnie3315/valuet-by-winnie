import React from 'react';

const TransactionCard = ({time, id, amount}) => {
    return (
        <div className=" transaction flex items-center justify-between bg-[#161245] p-4 rounded-xl text-white shadow-lg !w-full h-[70px]">
            <div className="flex items-center">
                <span className="text-lg font-semibold">{time}</span>
            </div>
            <div className="flex items-center">
                <span className="mx-4">→</span>
                <span className="text-gray-300">{id}</span>
            </div>
            <div className="flex items-center">
                <span className="text-lg font-bold">{amount}</span>
                <button className="ml-4 bg-[#00E8ACBF] rounded-lg px-3 py-[14px] text-xs font-semibold hover:bg-blue-500">
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TransactionCard;
