import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { myerror, mysuccess } from '../../tost';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setName } from '../../../redux/tasksSlice';
function Login() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleSubmit=async(e)=>{
e.preventDefault();
let info={
  email:email,
  password:password
}

if(!email || !password){
  return myerror("email and password is require");
}
else{
  try{
const response=await axios.post("https://task-back-rosy.vercel.app/user/login",info,{
  withCredentials:true
});
const data=response.data;
if(data.success){
  localStorage.setItem("name",data.name);
  dispatch(setName());
  mysuccess(data.message);
  setTimeout(() => {
    navigate("/dashbord");
  }, 1000);
}
else{
myerror(data.message)
}
  }
  catch(err){
 const message =
  err.response?.data?.error?.details?.[0]?.message || 
  err.response?.data?.message ||                    
  "Something went wrong";
  myerror(message)

  }
}
setEmail("");
setPassword("");
  }

  const loginCheck=async()=>{
    const response=await axios.post("https://task-back-rosy.vercel.app/user/islogin",{},{
      withCredentials:true
    });
    const data=await response.data;
    
    if(data.islogin==true){
      setTimeout(()=>{
        navigate("/dashbord");
      },500)
    }
  }


  useEffect(()=>{
    loginCheck();
  })
    return (
    <div>
  <div>login</div>
  <div>
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">Email</label><br />
      <input 
      type="text"
       value={email}
        onChange={(e)=>{setEmail(e.target.value)}} 
        /><br/>

      <label htmlFor="">Password</label><br />
      <input 
      type="password" 
      value={password} 
      onChange={(e)=>{setPassword(e.target.value)}} 
      /><br/>
      <button type="submit">Login</button>
    </form>
    <span>
    don't have any acount go and<Link to="/user/signin">Sign in</Link>
    </span>
  </div>
  <ToastContainer/>
    </div>
  )
}

export default Login
