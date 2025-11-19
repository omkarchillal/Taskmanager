import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id || task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
