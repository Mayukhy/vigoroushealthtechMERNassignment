import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../instance'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const navigate = useNavigate()
  const [loginData,setLoginData] = useState({userName:'',password:''})
  //signin function
  const signIn=()=>{
  const login=async()=>{
    await instance.post('/user/login',loginData)
    .then(({data})=>{
        toast("Login Successfull !")
        setTimeout(() => {
        navigate('/')   
        }, 500);
        })
    .catch(()=>{
        toast("Incorrect Username or Password")
        console.log("incorrect email or password")})
  }
login()
  }
  return (

    <div className=' grid md:grid-cols-2 grid-cols-1 '>
  <div
  className="flex h-[calc(100vh-65px)]  md:overflow-y-scroll scroll-smooth animate-[slideleft_0.4s]  min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
      onSubmit={(e)=>{
        e.preventDefault()
        signIn()
      }}
      className="space-y-6" action="#" method="POST">
        <div>
          <label for="username" className=" flex  text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
            <input
            value={loginData?.userName}
            onChange={(e)=>setLoginData({...loginData,userName:e.target.value})}
            id="username" name="username" type="text" required className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
              <Link to='/forgetpassword' className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
            </div>
          </div>
          <div className="mt-2">
            <input
            value={loginData?.password}
             onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
            id="password" name="password" type="password" autocomplete="current-password" required className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-gray-500">
        New User?
        <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> {" "} Sign Up</Link>
      </p>
    </div>
  </div>
  <img className=' animate-[slideright_0.4s] md:h-[calc(100vh-65px)] h-full w-full object-cover' src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg" alt="" />
  </div>
  
  )
}
