// import BalanceCard from "../src/components/BalanceCard";
// import SpendingChart from "../src/components/SpendingChart";
// import Widget from "../src/components/Widget";
// import MarketChart from "../src/components/MarketChart";
import TransactionCard from "../src/components/TransactonCard";
import Wallet from "../src/components/Wallet";

function Overview() {
    return ( <>
        <div className="head flex justify-between items-center">
            <div className="left">
                <h4 className="text-white text-lg">Overview</h4>
            </div>
            <div className="right">
                <button className="widget bg-btn-cus-sign py-[5px] pe-[22px] ps-[22px]  text-white">Add Widget</button>
            </div>

        </div>

        <div className="body-top flex">
        git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Winnie3315/valuet-by-winnie.git
git push -u origin main
        </div>
    </> );
}

export default Overview;