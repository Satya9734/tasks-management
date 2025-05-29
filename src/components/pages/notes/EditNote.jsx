import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "./EditNotes.css"
import { deleteNote, saveNote, updateNote } from '../../../redux/noteSlice';
import { myerror, mysuccess } from '../../tost';
import axios from 'axios';
function EditNote() {
  const {id}=useParams();
  const {noteLoding,notes}=useSelector((state)=>state.notes);

  const [question,setQuestion]=useState("");
  const [answer,setAnswer]=useState("");
  useEffect(()=>{
    notes?.forEach((note) => {
      if(note.id==id){
        setQuestion(note.question);
        setAnswer(note.answer);
        return;
      }
    });
  },[])
const dispatch=useDispatch();

const handleDelete=async()=>{
  const data={
   id:id
  }
  try{
  const response=await dispatch(deleteNote(data)).unwrap();
  setAnswer("")
  setQuestion("")
   mysuccess(response.message);
   return setTimeout(() => {
    navigate("/note/show")
   }, 1000);
  
  }catch(err){
   
    return myerror("some issue during deleting")
  }
}

const handleUpdate=async()=>{
  if(answer.length<3 || question.length<3 ){
    return myerror("title and note sholud have atlist 3 character")
  }
const data={
  id:id,
  question:question,
  answer:answer
}
try{
const response=await dispatch(updateNote(data)).unwrap();
return mysuccess(response.message)
}catch(err){
  return myerror(" some issue during updating");
}
}
const navigate=useNavigate();
const loginCheck=async()=>{
  const response=await axios.post("http://localhost:3000/user/islogin",{},{
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
       <h3>your note...</h3>
      <input
        type="text"
        className="note-title"
        placeholder="Update your note title..."
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
      />
      <textarea
        className="note-body"
        placeholder=" Re-writing your note..."
        value={answer}
        onChange={(e)=>setAnswer(e.target.value)}
      ></textarea>

      <p className='saving'>{noteLoding?"save changes...":""}</p>

      <div className="note-actions">
        <button className="note-button clear" onClick={()=>{
          setQuestion("");
          setAnswer("");
        }}>Clear</button>
        <button className="note-button update" onClick={handleUpdate} >Update</button>
        <button className="note-button delete" onClick={handleDelete}>Delete</button>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default EditNote
