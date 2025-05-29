import React, { useEffect, useState } from 'react';
import './SaveNote.css';
import { nanoid } from '@reduxjs/toolkit';
import {useDispatch,useSelector} from "react-redux"
import { saveNote } from '../../../redux/noteSlice';
import { myerror, mysuccess } from '../../tost';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function SaveNote() {
  const {noteLoding}=useSelector((state)=>state.notes)
  const [question,setQuestion]=useState("");
  const [answer,setAnswer]=useState("");
const dispatch=useDispatch();
const handleSave=async()=>{
   if(answer.length<3 || question.length<3 ){
      return myerror("title and note sholud have atlist 3 character");
    }
const data={
  id:nanoid(),
  question:question,
  answer:answer
}
try{
const response=await dispatch(saveNote(data)).unwrap();
setAnswer("")
setQuestion("")
return mysuccess(response.message);

}catch(err){
  // console.log("err",err);
  return myerror(err)
}
}
const navigate=useNavigate()
const loginCheck=async()=>{
  const response=await axios.post("https://task-back-rosy.vercel.app/user/islogin",{},{
    withCredentials:true
  });
  const data=await response.data;
  
  if(data.islogin==false){
    myerror("first you have to login");
    setTimeout(()=>{
      navigate("/user/login");
    },1500)
  }
}

useEffect(()=>{
    loginCheck();
  })

  return (
    <div className="note-container">
      <h3>save your notes here...</h3>
      <input
        type="text"
        className="note-title"
        placeholder="Title your note..."
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
      />
      <textarea
        className="note-body"
        placeholder="Start writing your note here..."
        value={answer}
        onChange={(e)=>setAnswer(e.target.value)}
      ></textarea>

<p className='saving'>{noteLoding?"saving...":""}</p>

      <div className="note-actions">
        <button className="note-button clear" onClick={()=>{
          setQuestion("")
          setAnswer("")
        }}>Clear</button>
        <button className="note-button save" onClick={handleSave}>Save Note</button>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default SaveNote;
