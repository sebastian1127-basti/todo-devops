"use client";

import { useState } from "react";

type Task = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        text: task.trim(),
        completed: false,
      },
    ]);

    setTask("");
  };

  const completeTask = (index: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (index: number) => {
    setTasks((currentTasks) => currentTasks.filter((_, i) => i !== index));
  };

  const completed = tasks.filter((item) => item.completed).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <main className="app-shell">
      <div className="page-wrap">
        <header className="hero-card">
          <div className="hero-topline">
            <span className="eyebrow">Focus board</span>
            <span className="status-dot">Live</span>
          </div>

          <div className="hero-copy">
            <h1>My Task Flow</h1>
            <p>
              Organize your day with a clean, readable list that keeps your priorities
              in view.
            </p>
          </div>

          <div className="hero-actions">
            <button type="button" className="primary-btn" onClick={addTask}>
              + Add task
            </button>
            <button type="button" className="secondary-btn">
              Quick plan
            </button>
          </div>
        </header>

        <section className="board-panel">
          <div className="board-header">
            <div>
              <span className="section-kicker">Today</span>
              <h2>Your tasks</h2>
            </div>
            <span className="header-badge">{progress}% done</span>
          </div>

          <div className="task-input-row">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
              placeholder="What do you need to do?"
              aria-label="New task"
              className="task-input"
            />
            <button type="button" className="primary-btn compact" onClick={addTask}>
              Add task
            </button>
          </div>

          <div className="summary-row">
            <div className="stat-card accent">
              <span>Completed</span>
              <strong>{completed}</strong>
            </div>
            <div className="stat-card">
              <span>Pending</span>
              <strong>{tasks.length - completed}</strong>
            </div>
            <div className="stat-card">
              <span>Total</span>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="task-list-header">
            <h3>All tasks</h3>
            <span>{tasks.length} items</span>
          </div>

          <ul className="task-list">
            {tasks.length === 0 ? (
              <li className="empty-state">No tasks yet. Add one to get started.</li>
            ) : (
              tasks.map((item, index) => (
                <li
                  key={`${item.text}-${index}`}
                  className={`task-card ${item.completed ? "is-done" : ""}`}
                >
                  <button
                    type="button"
                    className="task-check"
                    onClick={() => completeTask(index)}
                    aria-label={`Mark ${item.text} as ${item.completed ? "incomplete" : "complete"}`}
                  >
                    <span className={`checkmark ${item.completed ? "checked" : ""}`} aria-hidden="true" />
                  </button>

                  <span className="task-text">{item.text}</span>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}