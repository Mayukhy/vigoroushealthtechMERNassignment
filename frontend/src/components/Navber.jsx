
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../instance'

export default function Navber() {
const navigate = useNavigate()
const [currentUser,setCurrenUser] = useState(null)
  // defining that user is signed in or not
  useEffect(()=>{
  const getLoggedinUser=async()=>{
    await instance.get('/home')
    .then(({data})=>{
        setCurrenUser(data)
    })
    .catch(()=>console.log("incorrect email or password"))
  }
  getLoggedinUser()
  },[currentUser])
  return (
    
    <div
   
    className=' py-2 flex w-full justify-center border-b'>
{!currentUser ?    
<div className=' flex gap-3'>
<button
    onClick={()=>navigate('/register')}
    className=' rounded-3xl font-bold text-zinc-100 outline-none border-none px-7 bg-indigo-500 hover:bg-indigo-800 duration-200 transition-all py-3'>
    Sign Up
    </button>
    <button
    onClick={()=>navigate('/login')}
    className=' rounded-3xl font-bold text-zinc-100 outline-none border-none px-7 bg-blue-500 hover:bg-blue-800 duration-200 transition-all py-3'>
    Login
    </button>
 </div>:
 <div className=' flex gap-2'>
 <p className=' text-black text-xl font-bold my-auto'>
    {currentUser?.userName}
 </p>

 <button
    onClick={()=>localStorage.clear()}
    className=' rounded-3xl font-bold text-zinc-100 outline-none border-none px-7 bg-rose-600 hover:bg-rose-800 duration-200 transition-all py-3'>
    Logout
    </button>
 </div>
    }
    </div>
  )
}

