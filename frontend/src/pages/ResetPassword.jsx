import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import instance from '../instance'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {

  const navigate = useNavigate()
  const [password,setPassword] = useState('')
  const [confirmPass,setConfirmPass] = useState('')
  const {id, token} = useParams()

  //password changing function
  const newPassword=()=>{

  if ( password === confirmPass) {
    const changePassword=async()=>{
        await instance.post(`/resetpassword/${id}/${token}`, {password})
       .then(({data})=>{
           toast("Password is Changed Successfully")
           setTimeout(() => {
           navigate('/login')   
           }, 500);
           })
       .catch(()=>{
           toast("Password length should be greater than 7")
           console.log("wrong password")})
     }
   changePassword() 
  }
  else{
    toast("Passwords are not matched")
  }

  }
  return (

    <div className=' grid md:grid-cols-2 grid-cols-1 '>

<img className=' animate-[slideright_0.4s] md:h-[calc(100vh-65px)] h-full w-full object-cover'
   src="https://media.istockphoto.com/id/1204592089/photo/profile-photo-of-it-specialist-two-guy-lady-business-people-together-sitting-late-night.jpg?s=612x612&w=0&k=20&c=nOXTDbf1ajjCVjkTme7HyJPiK_yy6jdiIQCNgFEW19I=" alt="" />
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

        {/* new password */}
        <div>
          <label for="password" className=" flex  text-sm font-medium leading-6 text-gray-900">New Password</label>
          <div className="mt-2">
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password" name="password" type="password" required className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        {/* for confirming password */}
        <div>
          <label for="password" className=" flex  text-sm font-medium leading-6 text-gray-900">Rewrite Password</label>
          <div className="mt-2">
            <input
            value={confirmPass}
            onChange={(e)=>setConfirmPass(e.target.value)}
            id="password" name="password" type="text" required className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Change Password</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-gray-500">
        New User?
        <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> {" "} Sign Up</Link>
      </p>
    </div>
  </div>
  </div>
  
  )
}
