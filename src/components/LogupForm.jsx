import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useHttpRequest } from "../hooks/http.request";


function LogupForm({ switchForm }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { request, loading, error, clearError } = useHttpRequest('http://localhost:8080');

    const onSubmit = async (data) => {
        const { email, name, surname, password } = data;
    
        if (email && name && surname && password) {
            try {
                clearError();
    
                const existingUsers = await request(`/users?email=${email}`);
                console.log(existingUsers);
                
                
                // if (existingUsers && existingUsers.length > 0) {
                //     alert('Аккаунт уже существует');
                //     return;
                // }
    
                const userId = crypto.randomUUID();
    
                const newUser = {
                    user_id: userId,
                    email,
                    name,
                    surname,
                    password,
                };
    
                const postRes = await request('/users', 'post', newUser);
    
                if (postRes) {
                    delete newUser.id;
                    localStorage.setItem('user', JSON.stringify(newUser));
    
                    alert("Success");
                }
            } catch (e) {
                console.error('Ошибка при регистрации:', e);
                alert(`Ошибка: ${error}`);
            }
        }
    };
    

    return (
        <div className="w-[480px] h-[595px] shadow-none flex items-center justify-center flex-col bg-custom-radial">
            <h2 className="text-3xl leading-[42.19px] text-white mt-[40px] mb-[62px] text-center">Welcome</h2>
            <form className="flex flex-col w-[380px] gap-[26px]" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name" className="flex bg-[#2E3558] items-center h-[58px] rounded-md">
                    <div className="ring shadow-none">
                        <img src="/icons/email.svg" alt="email" className="absolute" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        id="name"  
                        className=" bg-[#2E3558] text-[#616A8B] w-[310px] h-[30px]" 
                        {...register("name", { 
                            required: "Name is required",
                            pattern: {
                                value: /^[A-Za-zА-Яа-яёЁ\s]+$/,
                                message: "Name must contain only letters"
                            }
                        })}
                    />
                </label>
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                
                <label htmlFor="surname" className="flex bg-[#2E3558] items-center h-[58px] rounded-md">
                    <div className="ring shadow-none">
                        <img src="/icons/email.svg" alt="email" className="absolute" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Surname" 
                        name="surname" 
                        id="surname"  
                        className=" bg-[#2E3558] text-[#616A8B] w-[310px] h-[30px]" 
                        {...register("surname", { 
                            required: "Surname is required",
                            pattern: {
                                value: /^[A-Za-zА-Яа-яёЁ\s]+$/,
                                message: "Surname must contain only letters"
                            }
                        })}
                    />
                </label>
                {errors.surname && <span className="text-red-500">{errors.surname.message}</span>}

                <label htmlFor="email" className="flex bg-[#2E3558] items-center h-[58px] rounded-md">
                    <div className="ring shadow-none">
                        <img src="/icons/email.svg" alt="email" className="absolute" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        id="email"  
                        className=" bg-[#2E3558] text-[#616A8B] w-[310px] h-[30px]" 
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
                        className="text-white bg-btn-cus-sign py-[12px] pe-[22px] ps-[22px] rounded-md"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'SIGN UP'}
                    </button>
                    <button 
                        className="bg-btn-cus py-[12px] pe-[22px] ps-[22px] rounded-md text-[#949EC0]"
                        type="button"
                        onClick={switchForm}
                    >
                        SIGN IN
                    </button>
                </div>
            </form>
            {error && <span className="text-red-500 mt-4">{error}</span>}
        </div>
    );
}

export default LogupForm;
