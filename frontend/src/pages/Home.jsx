
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../instance'

export default function Home() {
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
    <div className=' w-screen'>
    


    </div>
  )
}
