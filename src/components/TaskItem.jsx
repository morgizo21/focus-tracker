import { memo } from "react";

function TaskItem({ task, onToggle, onDelete }) {
  console.log("TaskItem rendered:", task.name);
  return (
    <div className="flex items-center gap-3 border-b py-3">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      <span>{task.name}</span>

      <button
        onClick={() => onDelete(task.id)}
        className="ml-auto bg-red-500 text-white px-3 py-1 rounded-lg"
      >
        Delete
      </button>
    </div>
  );
}

export default memo(TaskItem);