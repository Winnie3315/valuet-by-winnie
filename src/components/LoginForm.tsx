import React from "react";

function LoginForm() {
    return ( <>
        <div className="w-[480px] h-[595px] shadow-none flex items-center justify-center flex-col bg-custom-radial">
            <h2 className="text-3xl leading-[42.19px] text-white mt-[82px] mb-[62px] text-center">Welcome</h2>
            <form className="flex flex-col w-[380px] gap-[26px]">
                <label htmlFor="email" className="flex bg-[#2E3558] items-center h-[58px] rounded-md">
                    <div className="ring shadow-none">
                        <img src="/icons/email.svg" alt="email" className="absolute" />
                    </div>
                    <input type="text" name="email" id="email"  className=" bg-[#2E3558] text-[#616A8B] w-[310px] h-[30px]" />
                </label>


                <label htmlFor="password" className="flex bg-[#2E3558] items-center h-[58px] rounded-md border-b-4 border-b-[#1288E8]">
                    <div className="ring shadow-none">
                        <img src="/icons/lock.svg" alt="email" className="absolute" />
                    </div>
                    <input type="password" name="password" id="password" className="bg-[#2E3558] w-[310px] text-[#616A8B] " />
                </label>
                
                <div className="buttons flex items-center justify-center gap-[32px] mt-[30px] ">
                    <button className="text-[#949EC0] bg-btn-cus py-[12px] pe-[22px] ps-[22px] rounded-md">SIGN UP</button>
                    <button className="bg-btn-cus-sign py-[12px] pe-[22px] ps-[22px] rounded-md text-white">SIGN IN</button>
                </div>
            </form>

            <a href="#" className="text-[#5FB2FF] mt-[90px]">Forgot your password?</a>
        </div>
    </> );
}

export default LoginForm;