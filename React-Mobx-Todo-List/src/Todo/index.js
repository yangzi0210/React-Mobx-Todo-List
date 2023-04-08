import "./index.css";
import { useStore } from "../store";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import uuid from 'react-uuid';
function Task() {
  const { taskStore } = useStore();
  //单选受控 mobx store去维护 input 把e.target.value 交给store修改
  function onChange(id, e) {
    console.log(e.target.value);
    taskStore.singleCheck(id, e.target.checked);
  }

  function allChange(e) {
    console.log(e);
    taskStore.allCheck(e.target.checked);
  }
  // 删除
  function delTask(id) {
    taskStore.delTask(id);
  }
  // 增加
  const [taskValue,setTaskValue] = useState('')
  function addTask(e){
    console.log(e)
    //回车事件
    if(e.key === 'Enter'){
      taskStore.addTask(
        {
        id:uuid(),
        name:taskValue,
        isDone:false
        }
      )
      setTaskValue('')
    }
   
  }
  return (
    <section className="todoapp">
      <header className="header">
        <h1>To-do list</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          onChange={(e)=>setTaskValue(e.target.value)}
          onKeyUp={addTask}   
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={allChange}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {taskStore.list.map((item) => (
            <li
              className={item.isDone ? "todo completed" : "todo"}
              key={item.id}
            >
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={item.isDone}
                  onChange={(e) => onChange(item.id, e)}
                />
                <label>{item.name}</label>
                <button
                  className="destroy"
                  onClick={() => delTask(item.id)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          Total Tasks: {taskStore.list.length}&nbsp;&nbsp;&nbsp;&nbsp; Done: {taskStore.isFinishedLength()}
        </span>
      </footer>
    </section>
  );
}

export default observer(Task);
