import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { allTasks, deleteTask, isDone } from '../../redux/tasksSlice';
import { myerror } from '../tost';
import { Link, useNavigate } from 'react-router-dom';
function Alltask() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loding,tasks,error}=useSelector((state)=>state.tasks)
  
 const fetchTasks=async()=>{
  const abcd="";
  try{

    await dispatch(allTasks(abcd)).unwrap();
  }
  catch(err){
    myerror(err);
    if(err=="fist you have to login."){
      setTimeout(() => {
       navigate("/user/login");
      }, 1500);
    }
  }
  }

  //delete
  const handleDelete=async(id)=>{
const info={
  id:id
}
try{

  await dispatch(deleteTask(info)).unwrap();
}
catch(err){
  myerror(err);
  if(err=="fist you have to login."){
    setTimeout(() => {
     navigate("/user/login");
    }, 1500);
  }
}
  }


  //done
  const handleIsDone=async(id,status)=>{
const info={
  id:id,
  status:status
}
try{

  await dispatch(isDone(info)).unwrap();
}
catch(err){
  myerror(err);
  if(err=="fist you have to login."){
    setTimeout(() => {
     navigate("/user/login");
    }, 1500);
  }
}
  }



console.log(tasks)
useEffect(()=>{
fetchTasks();
},[])
  return (
    <div>
      <h3>My Tasks</h3>
      {
      
tasks.length>=0? tasks.map((task)=>{
  return(
    <div key={task.id}>
      <p>{task.title}</p>
      <p>{task.task}</p>
      <button onClick={()=>handleDelete(task.id)}>DELETE</button>
      <button
       className={task.isdone?"done":"notDone" } 
onClick={()=>handleIsDone(task.id,task.isdone)}

       >
        {/* {task.isdone?"DONE":"PENDING"} */}
        DONE
       </button>

    </div>
  )
}):""
      }

     { tasks.length==0?
     <div>
Your dont have any task   
<Link to="/addtask">
Add some task
</Link>
      </div>
      :""}
    </div>
  )
}

export default Alltask
