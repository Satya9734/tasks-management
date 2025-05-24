import axios from 'axios'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import { myerror, mysuccess } from '../../tost';
import {useNavigate} from "react-router-dom"
function Logout() {
  const navigate=useNavigate();
  const handleLogout=async()=>{
try{
  const response=await axios.post("http://localhost:3000/user/logout",{}, 
  {
  withCredentials:true
});
const data=await response.data;
if(data.success){
  mysuccess(data.message);
  localStorage.removeItem("name")
  setTimeout(() => {
    navigate("/")
  }, 1000);
}
else{
  myerror(data.message)
  setTimeout(() => {
    navigate("/user/login")
  }, 1000);
}
}
catch(err){
  const message =
    err.response?.data?.error?.details?.[0]?.message || 
    err.response?.data?.message ||                    
    "Something went wrong";
    myerror(message)
    setTimeout(() => {
      navigate("/user/login");
    }, 1000);
}
  }
  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
      <ToastContainer/>
    </div>
  )
}

export default Logout
