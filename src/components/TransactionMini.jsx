function TransactionsMini({sender, time, amount, recipient}) {
    return ( <>
        <div className="transactions-mini flex items-center w-full">
            <div className="left !pr-5">
                <p className="text-xl text-white">{time}</p>
            </div>
            <div className="center flex items-center justify-around w-full">
                <div className="info flex flex-col items-center ">
                    <p className="text-xl text-white">Sent</p>
                    <p className="text-sm text-white">{sender} {recipient}</p>  
                </div>

                <div className="money text-xl text-white">
                    {amount}
                </div>
            </div>
        </div>
    </> );
}

export default TransactionsMini;