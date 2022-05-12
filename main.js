const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");

let all_tasks = [];
fillData();
function fillData() {
  const localData = localStorage.getItem("tasks");
  if (localData) {
    all_tasks = JSON.parse(localData);
  }
  console.log(all_tasks);
  all_tasks.map((t, index) => showTask({ value: t, index }));
}

const editTask = (value, index) => {
  all_tasks[index] = value;
  localStorage.setItem("tasks", JSON.stringify(all_tasks));
};

const deleteTask = (index) => {
  all_tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(all_tasks));
};

function showTask({ value, index }) {
  const task = value;
  console.log(value);
  const task_el = document.createElement("div");
  task_el.classList.add("task");

  const task_content_el = document.createElement("div");
  task_content_el.classList.add("content");

  task_el.appendChild(task_content_el);

  const task_input_el = document.createElement("input");
  task_input_el.classList.add("text");
  task_input_el.type = "text";
  task_input_el.value = task;
  task_input_el.setAttribute("readonly", "readonly");

  task_content_el.appendChild(task_input_el);

  const task_actions_el = document.createElement("div");
  task_actions_el.classList.add("actions");

  const task_edit_el = document.createElement("button");
  task_edit_el.classList.add("edit");
  task_edit_el.innerText = "Edit";

  const task_delete_el = document.createElement("button");
  task_delete_el.classList.add("delete");
  task_delete_el.innerText = "Delete";

  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_delete_el);

  task_el.appendChild(task_actions_el);

  list_el.appendChild(task_el);

  input.value = "";
  task_edit_el.addEventListener("click", (e) => {
    if (task_edit_el.innerText.toLowerCase() == "edit") {
      task_edit_el.innerText = "Save";
      task_input_el.removeAttribute("readonly");
      task_input_el.focus();
    } else {
      task_edit_el.innerText = "Edit";
      task_input_el.setAttribute("readonly", "readonly");
      editTask(task_input_el.value, index);
    }
  });
  task_delete_el.addEventListener("click", (e) => {
    list_el.removeChild(task_el);
    deleteTask(index);
  });
}
window.addEventListener("load", () => {
    form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim().length === 0) return;
    const val = input.value;
    all_tasks.push(val);
    localStorage.setItem("tasks", JSON.stringify(all_tasks));
    showTask({ value: val, index: all_tasks.length - 1 });
  });
});