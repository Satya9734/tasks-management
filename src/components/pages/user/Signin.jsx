import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import axios from "axios"
import { myerror, mysuccess } from '../../tost';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setName } from '../../../redux/tasksSlice';
function Signin() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
const info={
  name:name,
  email:email,
  password:password
}

if(!name || !email || !password){
  return myerror("please fill all the informations")
}
else{
try{
const response=await axios.post("https://task-back-rosy.vercel.app/user/signin",info,{withCredentials:true});
const data=response.data;
if(data.success){
  localStorage.setItem("name",name);
  dispatch(setName());
mysuccess(data.message);
setTimeout(() => {
  navigate("/dashbord")
}, 2000);
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

    setname("");
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
    <div className="signin-container">
      <div className="signin-header">Sign In</div>
      <form className="signin-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>

      <div className="signin-footer">
        Already have an account? <Link to="/user/login">Login</Link>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Signin;
