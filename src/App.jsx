// taskName    → current value
// setTaskName → change the value
import { useState, useContext, useMemo, useRef, useCallback } from "react";
import { TasksContext } from "./context/TasksContext";
import useTimer from "./hooks/useTimer";
import useLocalStorage from "./hooks/useLocalStorage";
import { ThemeContext } from "./context/ThemeContext";
import TaskItem from "./components/TaskItem";


function App() {
  const { tasks, dispatch } = useContext(TasksContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const [taskName, setTaskName] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [sessions, setSessions] = useLocalStorage("sessions", [])

  const taskInputRef = useRef(null)


  const selectedTask = tasks.find(
    (task) => task.id === Number(selectedTaskId)
  );

  const { secondsLeft, isRunning, start, pause, reset } =
    useTimer(addSession);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedSeconds = String(seconds).padStart(2, "0");

  function toggleTheme(){
    if(theme === "light"){
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  function handleStart() {
    if (selectedTaskId === "") {
      return;
    }

    start();
  }

  function addSession(){
    if(!selectedTask){
      return;
    }

    const newSession = {
      id: Date.now(),
      taskName: selectedTask.name,
      minutes: 25,
      completedAt: new Date().toISOString()
    }

    setSessions([
      ...sessions,
      newSession
    ])
  }

  const todayFocusMinutes = useMemo(() => {
    /* Whenever sessions changes, get today's date → find all sessions completed today → add up their minutes → store the answer in todayFocusMinutes.*/
    console.log("Calculating today's focus minutes");
    const today = new Date().toDateString();

    const todaySessions = sessions.filter((session) => {
      return new Date(session.completedAt).toDateString() === today;
    });

    return todaySessions.reduce((total, session) => {
      return total + session.minutes;
    }, 0);

  }, [sessions])

  const cardTheme =
    theme === "dark"
      ? "bg-gray-800 text-white"
      : "bg-white text-black";

  const inputTheme =
    theme === "dark"
      ? "bg-gray-700 text-white border-gray-600"
      : "bg-white text-black border-gray-300";

  const handleToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_DONE",
      id: id
    });
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch({
      type: "DELETE_TASK",
      id: id
    });
  }, [dispatch]);

  return (
    <div className={`min-h-screen p-8 ${
      theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
    }`}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Focus Tracker</h1>
        </div>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            ref={taskInputRef}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            type="text"
            placeholder="Type task name"
            className={`flex-1 border rounded-lg px-4 py-2 ${inputTheme}`}
          />

          <button
            onClick={() => {
              if(taskName.trim() === ""){
                return;
              }

              dispatch({
              type: "ADD_TASK",
              name: taskName,
            });
            setTaskName("");
            taskInputRef.current.focus()
          }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add Task
          </button>
        </div>

          {/* Tasks */}
          <div className={`${cardTheme} rounded-xl shadow p-5 mb-6`}>
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>

            {/* CHANGED: TaskItem now handles how each task looks */}
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>

        {/* Timer */}
        <div className={`${cardTheme} rounded-xl shadow p-5 mb-6 text-center`}>
          <h2 className="text-xl font-semibold mb-3">Timer</h2>

          <select 
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
          className={`border rounded-lg px-3 py-2 mb-4 ${inputTheme}`}
          >
            <option value="">Select a task</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>{task.name}</option>
            ))}

          </select>

          <p className="text-5xl font-bold mb-5">{minutes}:{formattedSeconds}</p>

          <div className="flex justify-center gap-3">
            <button onClick={handleStart} className="bg-green-500 text-white    px-4 py-2 rounded-lg">
              {!isRunning && secondsLeft < 25 * 60 && secondsLeft > 0 ? "Resume" : "Start"}
            </button>

            <button onClick={pause} className="bg-yellow-500 px-4 py-2 rounded-lg">
              Pause
            </button>

            <button onClick={reset} className="bg-gray-300 px-4 py-2 rounded-lg">
              Reset
            </button>

          </div>
        </div>

        {/* Today's Stats */}
        <div className={`${cardTheme} rounded-xl shadow p-5 mb-6`}>
          <h2 className="text-xl font-semibold mb-2">Today's Stats</h2>
          <p>Focus minutes: {todayFocusMinutes}</p>
        </div>

        {/* Session History */}
        <div className={`${cardTheme} rounded-xl shadow p-5`}>
          <h2 className="text-xl font-semibold mb-2">Session History</h2>
          {sessions.length === 0 ? (
            <p className="text-gray-500">No sessions yet</p>
          ) : (
            sessions.map((session) => (
              <p key={session.id}>
                {session.taskName} - {session.minutes} minutes - {new Date(session.completedAt).toLocaleString()}
              </p>
            ))
          )}
        </div>

        {/* Theme Toggle */}
        <div className="mt-6 text-center">
          <button onClick={toggleTheme} className="bg-gray-800 text-white px-4 py-2 rounded-lg">
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;