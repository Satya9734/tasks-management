import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { allNotes } from '../../../redux/noteSlice';
import { useNavigate } from 'react-router-dom';
import "./ShowNotes.css"
import { myerror } from '../../tost';
import axios from 'axios';
function ShowNotes() {
  const navigate=useNavigate();
  const {noteLoding,notes}=useSelector((state)=>state.notes);
  const dispatch=useDispatch();
  
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
   const fun=async()=>{
    await loginCheck();
    await dispatch(allNotes({}));
   }
   fun();
  },[])

  return (
    <div>
    <h3>My all Notes</h3>
    <p>{noteLoding ? "loding..." : ""}</p>
  
    {
      notes?.length > 0 ? (
        <div className="note-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card"
            onClick={()=>{
              navigate(`/note/edit/${note.id}`)
            }}
            >
              <div className='answer-topic'>{note.question}</div>
              <div className='answer-body'>{note.answer}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-notes">
          there was no any note
          <br />
          <button onClick={() => navigate("/note/save")}>add some note</button>
        </div>
      )
    }
  </div>
  
  )
}

export default ShowNotes
