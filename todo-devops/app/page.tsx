const sampleTasks = [
  { id: 1, text: "Finish DevOps assignment", completed: false },
  { id: 2, text: "Study Next.js fundamentals", completed: false },
  { id: 3, text: "Set up Git repository", completed: true },
];

export default function Home() {
  const completed = sampleTasks.filter((task) => task.completed).length;
  const progress = Math.round((completed / sampleTasks.length) * 100);

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
              An organized rhythm for the day, built to keep your priorities clear
              and visible.
            </p>
          </div>

          <div className="hero-actions">
            <button type="button" className="primary-btn">
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
              placeholder="What do you need to do?"
              aria-label="New task"
              className="task-input"
            />
            <button type="button" className="primary-btn compact">
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
              <strong>{sampleTasks.length - completed}</strong>
            </div>
            <div className="stat-card">
              <span>Total</span>
              <strong>{sampleTasks.length}</strong>
            </div>
          </div>

          <div className="task-list-header">
            <h3>All tasks</h3>
            <span>{sampleTasks.length} items</span>
          </div>

          <ul className="task-list">
            {sampleTasks.map((task) => (
              <li
                key={task.id}
                className={`task-card ${task.completed ? "is-done" : ""}`}
              >
                <label className="task-check">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    aria-label={`Complete ${task.text}`}
                  />
                  <span className="checkmark" aria-hidden="true" />
                </label>

                <span className="task-text">{task.text}</span>

                <button type="button" className="delete-btn">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}