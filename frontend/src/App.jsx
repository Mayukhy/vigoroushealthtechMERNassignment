import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import Home from './pages/Home'
import { ToastContainer} from 'react-toastify';
import Navber from './components/Navber'
import ResetPassword from './pages/ResetPassword'
function App() {


  return (
<BrowserRouter>
<Navber/>
<ToastContainer />
<Routes>
<Route path='/register' element={<SignUp/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/forgetpassword' element={<ForgetPassword/>}/>
<Route path="/resetpassword/:id/:token" element={<ResetPassword />}></Route>
<Route path='/' element={<Home/>}/>


</Routes>
</BrowserRouter>
  )
}

export default App
