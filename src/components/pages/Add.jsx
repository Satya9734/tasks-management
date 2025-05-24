import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { addTasks } from '../../redux/tasksSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { myerror } from '../tost';
function Add() {
const [title,setTitle]=useState("");
const [task,setTask]=useState("");
const [message,setmessage]=useState(false);


  const navigate=useNavigate();
  const dispatch=useDispatch();
  // const {loding,tasks,error}=useSelector((state)=>state.tasks)
  const fetching=async(e)=>{
    e.preventDefault();
    if(task.length<3 || title.length<3){
       return setmessage(false);
    }
   const info=
    {
     title:title,
     task:task,
     id:nanoid()
    }
    try{

      await dispatch(addTasks(info)).unwrap();
      setTitle("")
      setTask("")
      setmessage(true);
    }
    catch(err){
myerror("my code my error "+err);
setTimeout(()=>{
navigate("/user/login");
},1500)
    }
  }
  
  return (
    <div>
<h3>Add Your Tasks</h3>
      <form action="" onSubmit={fetching}>
        <label htmlFor="">Title</label><br />
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/> <br />

        <label htmlFor="">Task</label><br />
        <input type="text" value={task} onChange={(e)=>setTask(e.target.value)}/> <br />
<span className={message?"added":"notadded"}>{message?"task added":"title and task must be 3 character"}</span>
      <button>Add</button>
      </form>
    </div>
   
  )
}

export default Add
