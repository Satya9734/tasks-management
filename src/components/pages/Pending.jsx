import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allTasks, deleteTask, isDone } from '../../redux/tasksSlice';
import { myerror } from '../tost';
import { Link, useNavigate } from 'react-router-dom';

function Pending() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loding, tasks } = useSelector((state) => state.tasks);
  const [pendingTasks, setPendingTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      await dispatch(allTasks("")).unwrap();
    } catch (err) {
      myerror(err);
      if (err === "fist you have to login.") {
        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTask({ id })).unwrap();
    } catch (err) {
      myerror(err);
      if (err === "fist you have to login.") {
        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      }
    }
  };

  const handleIsDone = async (id, status) => {
    try {
      await dispatch(isDone({ id, status })).unwrap();
    } catch (err) {
      myerror(err);
      if (err === "fist you have to login.") {
        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks?.filter((task) => !task.isdone);
    setPendingTasks(filtered);
  }, [tasks]);

  return (
    <div className="taskContainer">
      <h3>My Pending Tasks</h3>
      <p>{loding ? "Loading..." : ""}</p>

      {pendingTasks.length > 0 ? (
        <div className="taskGrid">
          {pendingTasks.map((task) => (
            <div className="taskBox" key={task.id}>
              <p className="taskTitle"><em>{task.title}</em></p>
              <p className="taskDesc">{task.task}</p>
              <div className="taskActions">
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <button
                  className={task.isdone ? "done" : "notDone"}
                  onClick={() => handleIsDone(task.id, task.isdone)}
                >
                  DONE
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="noTasksBox">
          <p>You don't have any pending tasks.</p>
          <Link to="/dashbord">Add some task</Link>
        </div>
      )}
    </div>
  );
}

export default Pending;
