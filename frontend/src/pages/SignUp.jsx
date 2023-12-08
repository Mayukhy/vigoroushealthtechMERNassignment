import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import instance from '../instance';
export default function SignUp() {
  
    const [registerData, setRegisterData] = useState({ userName: '', email: '', password: '' })
    const navigate = useNavigate()
    //register function
    const signUp = () => {
if (registerData?.password?.length > 7) {
    const register = async () => {
        await instance.post('/user/register', registerData)
            .then(({ data }) => {
                toast('registration Successfull !') 
                setRegisterData({email:'',userName:'',password:''})
                navigate('/login')
            })    
    }
    register()   
}

        
        else  {
            toast('Password length must be greater than 7')   
        }
    }

    return (
        <div className=' grid md:grid-cols-2 grid-cols-1'>

            <img className=' animate-[slideleft_0.4s]  md:h-[calc(100vh-65px)] h-full w-full object-cover' src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className="flex h-[calc(100vh-65px)]  md:overflow-y-scroll scroll-smooth animate-[slideright_0.4s] min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create New account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                onSubmit={(e)=>{
                    e.preventDefault()
                    signUp()
                }}
                className="space-y-6" action="#" method="POST">

                    {/* username */}
                    <div>
                        <label for="username" className=" flex  text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input
                                value={registerData?.userName}
                                onChange={(e) => setRegisterData({ ...registerData, userName: e.target.value })}
                                id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    {/* user email */}
                    <div>
                        <label for="email" className=" flex  text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input
                                value={registerData?.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    {/* password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                            value={registerData?.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already Registered ?
                    <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> {" "} Login</Link>
                </p>
            </div>
        </div>

        </div>


    )
}
