import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
    const navigate = useNavigate()
    function logout(){
        localStorage.removeItem("user")
        navigate("/login")
    }
    function findLocation(location){
        navigate(location)
    }
    let user = JSON.parse(localStorage.getItem('user'))
    return ( <>
        <div className="wrapper">
            <div className="wrap flex">
                        <aside className="w-[220px] h-[100vh] flex flex-col justify-between bg-aside-bg">
                            <div className="top mt-[17px]">
                                <div className="logo flex items-center justify-center mb-[40px]">
                                    <img className="w-[99px]" src="/icons/valuet.svg" alt="logo" />
                                </div>
                                <div className="pages flex flex-col gap-[20px]">
                                    <div
                                    onClick={() => findLocation("/")}
                                    className="pt-[13px] pr-[78px] pb-[13px] pl-[16px] flex items-center gap-3 text-white">
                                        <img src="/icons/overview.svg" alt="" />
                                        <p>Overview</p>
                                    </div>
                                    <div 
                                    onClick={() => findLocation("/wallet")} 
                                    className="pt-[13px] pr-[78px] pb-[13px] pl-[16px] flex items-center gap-3 text-white">
                                        <img src="/icons/wallet.svg" alt="" />
                                        <p>Wallets</p>
                                    </div>
                                    <div
                                    onClick={() => findLocation("/transactions")}  
                                    className="pt-[13px] pr-[78px] pb-[13px] pl-[16px] flex items-center gap-3 text-white">
                                        <img src="/icons/transactions.svg" alt="" />
                                        <p>Transictions</p>
                                    </div>
                                    <div className="pt-[13px] pr-[78px] pb-[13px] pl-[16px] flex items-center gap-3 text-white">
                                        <img src="/icons/exchange.svg" alt="" />
                                        <p>Exchange</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="line w-[200px] h-0.5 bg-[#018FFF]"></div>
                                    <div className="pt-[13px] pr-[78px] pb-[13px] pl-[16px] flex items-center gap-3 text-white">
                                        <img className="w-[21px] h-[21px]" src="/icons/ring.svg" alt="" />
                                        <p className="flex">{user.name} </p>
                                    </div>
                                    <div
                                    onClick={logout}
                                    className="pt-[13px] pr-[78px] pb-[13px] pl-[16px] flex items-center gap-3 text-white">
                                        <img className="w-[21px] h-[21px]" src="/icons/out.svg" alt="" />
                                        <p className="cursor-pointer">Log out</p>
                                    </div>
                            </div>
                        </aside>


                        <main className="w-[100%] pl-[20px]">
                            <header className="flex justify-between w-[100%] h-[88px] items-center p-[20px] border-b-[#2D317A] border-b-2 mb-[20px]">
                                <div className="left">
                                    <div className="search">
                                        <label htmlFor="search" className="flex search-label bg-[#161245] rounded-lg h-[32px]">
                                            <input type="text" name="search" id="search" className="bg-[#161245] text-white max-w[300px] w-[100%]" />
                                            <img src="/icons/search.svg" alt="search" />
                                        </label>
                                    </div>
                                </div>
                                <div className="right flex items-center justify-center gap-8">
                                    <a href="#" className="w-[32px] h-[32px]">
                                        <img className="object-contain w-[32px] h-[32px]" src="/public/icons/mail.svg" alt="mail" />
                                    </a>
                                    <a href="#" className="w-[36px] h-[32px]">
                                        <img  className="object-cover w-[36px] h-[43px]" src="/public/icons/notification.svg" alt="mail" />
                                    </a>
                                </div>

                            </header>
                            {<Outlet />}
                        </main>
                    </div>
                   
        </div>

    </> );
}

export default Layout;