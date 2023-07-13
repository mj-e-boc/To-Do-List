import './todo.css'

const task = (description,completed,index) => {
description,
completed,
index
};

const tasks = [{
description:'first',
completed:true,
index:1
}];


const createTasks = (tasks) => {
tasks.forEach(({ description, completed, index }) => {
  const taskElement = document.createElement("li");
  taskElement.classList.add("task");
  taskElement.innerHTML = `
<h1>${description}</h1>
<h2>${completed}</h2>
<p>${index}</p>
`;
  document.querySelector(".todo").appendChild(taskElement);
});
}

createTasks(tasks);