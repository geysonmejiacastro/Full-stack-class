
let tasks = []; // { name, description, deadline, completed }

// Optional persistence
try {
  const raw = localStorage.getItem("tasks_v1");
  if (raw) tasks = JSON.parse(raw);
} catch {}

// ===== Cached Element Refs =====
const taskForm = document.getElementById("taskForm");
const taskNameEl = document.getElementById("taskName");
const taskDescEl = document.getElementById("taskDescription");
const taskDateEl = document.getElementById("taskDeadline");

// Prefer a dedicated <tbody id="taskBody">, but gracefully fall back to #taskTable
let taskBody = document.getElementById("taskBody");
const taskTable = document.getElementById("taskTable");
if (!taskBody && taskTable) {
  // if there is no tbody with id, use the first/toplevel tbody or the table itself
  taskBody = taskTable.tBodies[0] || taskTable;
}

function save() {
  try { localStorage.setItem("tasks_v1", JSON.stringify(tasks)); } catch {}
}

function validate({ name, deadline }) {
  if (!name || !name.trim()) return "Task name is required.";
  if (!deadline) return "Deadline is required.";
  return null;
}

function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(iso) { return iso || ""; }

// ===== Rendering =====
function render() {
  if (!taskBody) return; // nothing to render into

  if (!tasks.length) {
    // If we’re rendering directly to <table>, include a row. If to <tbody>, same.
    taskBody.innerHTML = `
      <tr><td colspan="5" style="text-align:center; color:#6b7280; padding:18px;">
        No tasks yet
      </td></tr>`;
    return;
  }

  const rows = tasks.map((t, i) => {
    const statusBadge = t.completed
      ? `<span class="badge done">Completed</span>`
      : `<span class="badge">Open</span>`;
    const trClass = t.completed ? "completed" : "";

    return `
      <tr class="${trClass}" data-index="${i}">
        <td>${escapeHTML(t.name)}</td>
        <td>${escapeHTML(t.description || "")}</td>
        <td>${formatDate(t.deadline)}</td>
        <td>${statusBadge}</td>
        <td>
          <div class="actions">
            <button class="secondary" data-action="toggle">${t.completed ? "Undo" : "Complete"}</button>
            <button class="danger" data-action="remove">Remove</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  // If taskBody actually points to the whole <table> (no tbody),
  // ensure there is a thead so we don’t wipe headers.
  if (taskBody === taskTable) {
    taskBody.innerHTML = `
      <thead>
        <tr>
          <th>Task</th><th>Description</th><th>Deadline</th><th>Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    `;
  } else {
    taskBody.innerHTML = rows;
  }
}

// ===== Events =====
function handleSubmission(e) {
  e.preventDefault();
  const task = {
    name: taskNameEl?.value || "",
    description: taskDescEl?.value || "",
    deadline: taskDateEl?.value || "",
    completed: false,
  };

  const err = validate(task);
  if (err) { alert(err); return; }

  tasks.push(task);
  save();
  render();
  taskForm?.reset();
  taskNameEl?.focus();
}

function handleTableClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;
  const tr = btn.closest("tr[data-index]");
  if (!tr) return;

  const idx = Number(tr.getAttribute("data-index"));
  const action = btn.getAttribute("data-action");

  if (action === "toggle") {
    tasks[idx].completed = !tasks[idx].completed;
    save(); render();
  } else if (action === "remove") {
    tasks.splice(idx, 1);
    save(); render();
  }
}

// ===== Init =====
function init() {
  render();
  taskForm?.addEventListener("submit", handleSubmission);

  // Clicks on either tbody or table (depending on what exists)
  const clickTarget = taskBody === taskTable ? taskTable : taskBody;
  clickTarget?.addEventListener("click", handleTableClick);
}
init();
