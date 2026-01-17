const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");

window.addEventListener("load", loadTasks);

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") addTask();
});

clearAllBtn.addEventListener("click", clearAllTasks);

function addTask(){
    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }
    createTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
}
function createTask(text) {
  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔";
  doneBtn.className = "done-btn";

  const delBtn = document.createElement("button");
  delBtn.textContent = "✖";
  delBtn.className = "delete-btn";

  doneBtn.addEventListener("click", () => {
    li.classList.toggle("done");
    updateStorage();
  });

  delBtn.addEventListener("click", () => {
    li.remove();
    updateStorage();
  });

  actions.appendChild(doneBtn);
  actions.appendChild(delBtn);

  li.appendChild(taskText);
  li.appendChild(actions);
  taskList.appendChild(li);
}

function saveTask(task){
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks(){
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks(){
    const tasks = getTasks();
    tasks.forEach(createTask);
}

function updateStorage(){
    const tasks =[];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks(){
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
}