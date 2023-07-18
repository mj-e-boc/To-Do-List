import './style.css';
import reIcon from './recycle.png';
import tdIcon from './3dotd.png';
import adIcon from './enter.png';

// Selecting DOM elements
const inHead = document.querySelector('.div-heading');
const ulList = document.getElementById('to-do-list');
const addlistdiv = document.querySelector('.list-adding');

// Array of tasks
let tasks = JSON.parse(localStorage.getItem('ulList')) || [];

// Function to reset task indices
function setIndex() {
  tasks.forEach((task, index) => {
    task.id = index + 1;
  });
  localStorage.setItem('todolist', JSON.stringify(tasks));
}

class Create {
  constructor(newTask) {
    this.newTask = newTask;
  }

  createTodo() {
    // Creating elements for a new task
    const eachTask = document.createElement('li');
    const checkTag = document.createElement('div');
    const cbox = document.createElement('input');
    const tbox = document.createElement('input');
    const bbin = document.createElement('button');
    const threeDots = document.createElement('img');

    // Setting attributes and class names
    eachTask.className = 'each-task';
    checkTag.className = 'check-tag';
    cbox.className = 'task-check';
    cbox.setAttribute('type', 'checkbox');
    cbox.checked = this.newTask.complete;
    tbox.setAttribute('type', 'text');
    tbox.className = 'task-desc';
    tbox.value = this.newTask.description;
    bbin.className = 'delbin';
    bbin.setAttribute('type', 'button');
    bbin.setAttribute('id', this.newTask.id);
    threeDots.className = 'three-dots';
    threeDots.src = tdIcon;
    threeDots.alt = 'threedots';

    // Adding event listeners
    cbox.addEventListener('change', () => {
      this.newTask.complete = cbox.checked;

      if (this.newTask.complete) {
        eachTask.classList.add('checked');
        eachTask.style.background = '#f4f5Cf';
        eachTask.style.opacity = '0.5';
      } else {
        eachTask.classList.remove('checked');
        eachTask.style.background = 'none';
        eachTask.style.opacity = '1';
      }
      localStorage.setItem('todolist', JSON.stringify(tasks));
    });

    tbox.addEventListener('input', () => {
      this.newTask.description = tbox.value;
    });

    tbox.addEventListener('blur', () => {
      tbox.disabled = true;
      localStorage.setItem('todolist', JSON.stringify(tasks));
    });

    checkTag.addEventListener('click', () => {
      tbox.disabled = false;
      tbox.focus();
    });

    threeDots.addEventListener('click', () => {
      tasks = tasks.filter((task) => task.id !== this.newTask.id);
      eachTask.remove();
      setIndex();
      localStorage.setItem('todolist', JSON.stringify(tasks));
    });

    // Appending elements to the DOM
    checkTag.appendChild(cbox);
    checkTag.appendChild(tbox);
    eachTask.appendChild(checkTag);
    bbin.appendChild(threeDots);
    eachTask.appendChild(bbin);
    ulList.appendChild(eachTask);
  }
}

function addTaskToList(value) {
  const newTask = {
    id: tasks.length + 1,
    description: value,
    complete: false,
  };
  tasks.push(newTask);
  const task = new Create(newTask);
  task.createTodo();
  localStorage.setItem('todolist', JSON.stringify(tasks));
}

function displayTasks() {
  if (localStorage.getItem('todolist')) {
    tasks = JSON.parse(localStorage.getItem('todolist'));
    tasks.forEach((task) => {
      const newTask = new Create(task);
      newTask.createTodo();
    });
  }
}

// Creating and appending elements for the app heading
const reicon = new Image();
reicon.src = reIcon;
reicon.className = 'reload-image';
reicon.alt = 'reload-icon';
inHead.appendChild(reicon);

// Creating input element for adding tasks
const addlist = document.createElement('input');
addlist.type = 'text';
addlist.placeholder = 'Add to your list ...';
addlist.id = 'add-new-list';

// Creating button element for adding tasks
const addiconbutton = document.createElement('button');
addiconbutton.type = 'button';
addiconbutton.className = 'addbutton';

const addicon = new Image();
addicon.src = adIcon;
addicon.alt = 'addicon';
addicon.className = 'addicon';

addiconbutton.appendChild(addicon);
addlistdiv.appendChild(addlist);
addlistdiv.appendChild(addiconbutton);

// Event listener for adding tasks
addiconbutton.addEventListener('click', () => {
  if (addlist.value !== '') {
    addTaskToList(addlist.value);
    addlist.value = '';
  }
});

// Event listener to display tasks on page load
document.addEventListener('DOMContentLoaded', displayTasks());
