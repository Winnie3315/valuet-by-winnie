import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useHttpRequest } from "../hooks/http.request";

function LoginForm({ switchForm }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { request, loading, error, clearError } = useHttpRequest('http://localhost:8080');

    const onSubmit = async (data) => {
        const { email, password } = data;

        if (email && password) {
            try {
                clearError();

                const res = await request('/users?email=' + email);
                const [res_user] = res;

                if (!res_user) {
                    alert('Такого пользователя не существует', 'error');
                    return;
                }

                if (res_user.password !== password) {
                    alert('Неверный пароль!', 'error');
                    return;
                }

                delete res_user.password;

                localStorage.setItem("user", JSON.stringify(res_user));

                navigate('/');
            } catch (e) {
                console.error('Ошибка при попытке входа:', e);
                alert('Произошла ошибка при попытке входа. Попробуйте еще раз.');
            }
        }
    };

    return (
        <div className="w-[480px] h-[595px] shadow-none flex items-center justify-center flex-col bg-custom-radial">
            <h2 className="text-3xl leading-[42.19px] text-white mt-[82px] mb-[62px] text-center">Welcome</h2>
            <form className="flex flex-col w-[380px] gap-[26px]" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="flex bg-[#2E3558] items-center h-[58px] rounded-md">
                    <div className="ring shadow-none">
                        <img src="/icons/email.svg" alt="email" className="absolute" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        id="email"  
                        className="bg-[#2E3558] text-[#616A8B] w-[310px] h-[30px]"
                        {...register("email", { 
                            required: "Email is required", 
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address"
                            }
                        })}
                    />
                </label>
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                <label htmlFor="password" className="flex bg-[#2E3558] items-center h-[58px] rounded-md border-b-4 border-b-[#1288E8]">
                    <div className="ring shadow-none">
                        <img src="/icons/lock.svg" alt="lock" className="absolute" />
                    </div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        id="password" 
                        className="bg-[#2E3558] w-[310px] text-[#616A8B]"
                        {...register("password", { 
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long"
                            }
                        })}
                    />
                </label>
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                <div className="buttons flex items-center justify-center gap-[32px] mt-[30px]">
                    <button
                        className="text-[#949EC0] bg-btn-cus py-[12px] pe-[22px] ps-[22px] rounded-md"
                        onClick={switchForm}
                        type="button"
                    >
                        SIGN UP
                    </button>
                    <button
                        className="bg-btn-cus-sign py-[12px] pe-[22px] ps-[22px] rounded-md text-white" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'SIGN IN'}
                    </button>
                </div>
            </form>

            <a href="#" className="text-[#5FB2FF] mt-[90px]">Forgot your password?</a>
            {error && <span className="text-red-500 mt-4">{error}</span>}
        </div>
    );
}

export default LoginForm;
