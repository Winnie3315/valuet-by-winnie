import React from 'react';

function Widget() {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 rounded-xl text-white shadow-lg w-[300px] h-[148px]">
            <h2 className="text-xl font-semibold mb-2">Bitoc</h2>
            <div className="box flex flex-nowrap gap-[19px]">
            <div className="flex items-center mb-2">
                <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mr-3">
                    <img src="/public/icons/bitoc.png" alt="" className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-xl font-bold">600 ETH</h3>
                    <p className="text-sm text-gray-400">$30,000,000</p>
                </div>
            </div>
            <div className='widget-box'>
                <div className="flex justify-between items-center text-xs mb-1">
                    <p>$1,200 = 0.074 ETH</p>
                    <span className="text-green-500 font-bold">↑</span>
                </div>
                <p className="text-7px">1 ETH = $6,542.35</p>
                <div className="flex justify-between items-center text-xs mb-1">
                    <p>$1,200 = 0.034 ETH</p>
                    <span className="text-red-500 font-bold">↓</span>
                </div>
                <p className="text-7px">1 ETH = $6,264.35</p>
                <div className="flex justify-between items-center text-xs">
                    <p>$1,200 = 0.075 ETH</p>
                    <span className="text-red-500 font-bold">↓</span>
                </div>
                <p className="text-7px">1 ETH = $6,642.22</p>
            </div>
            </div>
        </div>
    );
};

export default Widget;