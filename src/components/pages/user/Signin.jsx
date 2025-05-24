import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import axios from "axios"
import { myerror, mysuccess } from '../../tost';
import { useNavigate } from 'react-router-dom';
function Signin() {
  const navigate=useNavigate();
  const [name, setName] = useState("");
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
mysuccess(data.message);
// localStorage.setItem("name",data.name);
setTimeout(() => {
  navigate("/alltasks")
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

    setName("");
    setEmail("");
    setPassword("");
  }
 useEffect(()=>{
    if(localStorage.getItem("name")){
      myerror("you are alredy login");
      setTimeout(()=>{
        navigate("/dashbord");
      },2000)
    }
  },[])
  return (
    <div className="signin-container">
      <div className="signin-header">Sign In</div>
      <form className="signin-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
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
