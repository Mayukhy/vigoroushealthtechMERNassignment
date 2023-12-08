import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../instance'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const navigate = useNavigate()
  const [email,setMail] = useState('')

  //password changing function
  const newPassword=()=>{
  const changePassword=async()=>{
    await instance.post('/user/forgotpassword',email)
    .then(({data})=>{
        toast("Password reset mail is sent")
        // setTimeout(() => {
        // navigate('/login')   
        // }, 500);
        })
    .catch(()=>{
        toast("Something went wrong")
        console.log("incorrect email or password")})
  }
changePassword()
  }
  return (

    <div className=' grid md:grid-cols-2 grid-cols-1 '>
  <div
  className="flex h-[calc(100vh-65px)]  md:overflow-y-scroll scroll-smooth animate-[slideleft_0.4s]  min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Password with Email</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
      onSubmit={(e)=>{
        e.preventDefault()
        newPassword()
      }}
      className="space-y-6" action="#" method="POST">
        <div>
          <label for="email" className=" flex  text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
            <input
            value={email}
            onChange={(e)=>setMail(e.target.value)}
            id="email" name="email" type="email" required className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generate Link</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-gray-500">
        New User?
        <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> {" "} Sign Up</Link>
      </p>
    </div>
  </div>
  <img className=' animate-[slideright_0.4s] md:h-[calc(100vh-65px)] h-full w-full object-cover' src="https://images.unsplash.com/photo-1624696612050-73b5891cafcf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
  </div>
  
  )
}
