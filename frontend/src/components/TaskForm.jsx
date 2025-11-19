import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "pending");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    setError("");
    onSubmit({ title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h2>{initialData ? "Edit Task" : "Add New Task"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Title *</label>
        <br />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>

      <div>
        <label>Description</label>
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
      </div>

      <div>
        <label>Status</label>
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit" style={{ marginTop: "0.5rem" }}>
        {initialData ? "Update" : "Create"}
      </button>

      {initialData && (
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: "0.5rem" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
