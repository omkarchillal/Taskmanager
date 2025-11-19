export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <h3>
        {task.title}{" "}
        <span style={{ fontSize: "0.8rem", color: "#666" }}>
          ({task.status})
        </span>
      </h3>
      {task.description && <p>{task.description}</p>}

      <button onClick={() => onEdit(task)}>Edit</button>
      <button
        onClick={() => onDelete(task._id)}
        style={{ marginLeft: "0.5rem" }}
      >
        Delete
      </button>
    </div>
  );
}
