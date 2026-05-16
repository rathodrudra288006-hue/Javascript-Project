const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;

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
  });
}
addDragEventsOnColunm(todo);
addDragEventsOnColunm(progress);
addDragEventsOnColunm(done);
