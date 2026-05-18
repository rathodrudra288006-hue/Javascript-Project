let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const colunms = [todo, progress, done];
let dragElement = null;

function addTask(title, desc, colunm) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");
  div.innerHTML = `
            <h2>${title}</h2>
            <p>${desc}</p>
            <button>Delete</button>`;
  todo.appendChild(div);
  div.addEventListener("drag", () => {
    dragElement = div;
  });
  const deleteButton = div.querySelector("button");
  deleteButton.addEventListener("click", () => {
    div.remove();
    updateTaskCount();
  });
  return div;
}
function updateTaskCount() {
  colunms.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");
    tasksData[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    count.innerText = tasks.length;
  });
}

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  for (const col in data) {
    const colunm = document.querySelector(`#${col}`);
    data[col].forEach((task) => {
      addTask(task.title, task.desc, colunm);
    });
  }
  updateTaskCount();
}

const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    dragElement = task;
  });
});

function addDragEventsOnColunm(colunm) {
  colunm.addEventListener("dragenter", (e) => {
    e.preventDefault();
    colunm.classList.add("hover-over");
  });
  colunm.addEventListener("dragleave", (e) => {
    e.preventDefault();
    colunm.classList.remove("hover-over");
  });
  colunm.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  colunm.addEventListener("drop", (e) => {
    e.preventDefault();

    colunm.appendChild(dragElement);
    colunm.classList.remove("hover-over");
    updateTaskCount();
  });
}
addDragEventsOnColunm(todo);
addDragEventsOnColunm(progress);
addDragEventsOnColunm(done);

const toggleModalButton = document.querySelector("#toggle-modal");
const modalbg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");
toggleModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});
modalbg.addEventListener("click", () => {
  modal.classList.remove("active");
});
addTaskButton.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDesc = document.querySelector("#task-desc-input").value;
  addTask(taskTitle, taskDesc, todo);
  updateTaskCount();
  modal.classList.remove("active");
  document.querySelector("#task-title-input").value = "";
  document.querySelector("#task-desc-input").value = "";
});
