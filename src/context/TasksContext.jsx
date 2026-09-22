import { createContext, useReducer, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const TasksContext = createContext();

function reducer(state, action){
  if(action.type === "ADD_TASK"){
    return[
      ...state,
      {
      id: Date.now(),
      name: action.name,
      done: false
      }
    ]
  }

  if(action.type === "DELETE_TASK"){
    return state.filter((task) => task.id !== action.id)
  }

  if(action.type === "TOGGLE_DONE"){
    return state.map((task) => 
      task.id === action.id 
    ? {...task, done: !task.done}
    : task /* if no leave the task alone */
    )
  }
  return state;
}

function TasksProvider({children}){
  const [savedTasks, setSavedTasks] = useLocalStorage("tasks", []);
  const [tasks, dispatch] = useReducer(reducer, savedTasks);

  useEffect(() => {
    setSavedTasks(tasks);
  }, [tasks, setSavedTasks])

  return(
    <TasksContext.Provider value={{tasks, dispatch}}>
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider;