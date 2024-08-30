import React from "react";
import LoginForm from "../src/components/LoginForm";

function Login() {
    return ( <>
            <div className="main mt-0 mb-0 mx-auto w-[1200px] h-[100%] flex !justify-around relative ">
                <div className="left">
                    <LoginForm />
                </div>
                <div className="right flex justify-center items-center flex-col">
                    
                    <img src="/public/icons/valuet.svg" alt="" />
                    <p className="text-white">Your currency dashboard</p>
                </div>
                {/* <img className="absolute bottom-0 right-0 bg-transparent" src="/images/bg1.png" alt="bg" />
                <img className="absolute bottom-0 right-0 bg-transparent" src="/images/bg2.png" alt="bg" /> */}
            </div>
    </> );
}

export default Login;