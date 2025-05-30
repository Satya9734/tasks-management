import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allTasks, deleteTask, isDone } from '../../redux/tasksSlice';
import { myerror } from '../tost';
import { Link, useNavigate } from 'react-router-dom';

function Alltask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loding, tasks = [], error } = useSelector((state) => state.tasks); // default [] if undefined

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
      await fetchTasks(); // refetch after delete
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
      await fetchTasks(); // refetch after update
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

  return (
    <div>
      <h3>My Tasks</h3>
      <p>{loding ? "Loading..." : ""}</p>

      <div className="task-container">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <div key={task.id} className="task-box">
              <p>{task.title}</p>
              <p>{task.task}</p>
              <button onClick={() => handleDelete(task.id)}>DELETE</button>
              <button
                className={task.isdone ? "done" : "notDone"}
                onClick={() => handleIsDone(task.id, task.isdone)}
              >
                {task.isdone ? "DONE" : "PENDING"}
              </button>
            </div>
          ))}
      </div>

      {tasks.length === 0 && (
        <div>
          You don't have any task{" "}
          <Link to="/dashbord">
            Add some task
          </Link>
        </div>
      )}
    </div>
  );
}

export default Alltask;
