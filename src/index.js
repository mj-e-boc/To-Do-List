import './style.css';
import reIcon from './recycle.png';
import tdIcon from './3dotd.png';
import adIcon from './enter.png';
import { updateStatus, clearCompleted } from './status.js';

// DOM elements
const inHead = document.querySelector('.div-heading');
const ulList = document.getElementById('to-do-list');
const clearall = document.querySelector('.clear-all');
const ifempty = document.querySelector('.ifempty');
const addlistdiv = document.querySelector('.list-adding');

// Create the app heading image
const reicon = new Image();
reicon.src = reIcon;
reicon.className = 'reload-image';
reicon.setAttribute('alt', 'reload-icon');
inHead.appendChild(reicon);

// Create input element to add tasks
const addlist = document.createElement('input');
addlist.setAttribute('type', 'text');
addlist.setAttribute('placeholder', 'Add to your list ...');
addlist.setAttribute('id', 'add-new-list');

// Create button for adding tasks
const addiconbutton = document.createElement('button');
addiconbutton.type = 'button';
addiconbutton.className = 'addbutton';

// Create image for add button
const addicon = new Image();
addicon.src = adIcon;
addicon.setAttribute('alt', 'addicon');
addicon.className = 'addicon';

// Append elements to the add list div
addiconbutton.appendChild(addicon);
addlistdiv.appendChild(addlist);
addlistdiv.appendChild(addiconbutton);

// Array of objects (empty at start)
let tasks = JSON.parse(localStorage.getItem('todolist')) || [];

// Helper function to reset task indices after deletions
function setIndex() {
  tasks.forEach((task, index) => {
    task.id = index + 1;
  });
  localStorage.setItem('todolist', JSON.stringify(tasks));
}

class Create {
  constructor(newtask) {
    this.newtask = newtask;
  }

  // Method to create, update, and delete tasks
  createTodo() {
    const eachtask = document.createElement('li');
    eachtask.className = 'each-task';

    const checktag = document.createElement('div');
    checktag.className = 'check-tag';

    const cbox = document.createElement('input');
    cbox.setAttribute('class', 'task-check');
    cbox.setAttribute('type', 'checkbox');
    cbox.checked = this.newtask.complete;

    if (this.newtask.complete) {
      eachtask.classList.add('checked');
    }

    const tbox = document.createElement('input');
    tbox.setAttribute('type', 'text');
    tbox.setAttribute('class', 'task-desc');
    tbox.value = this.newtask.description;

    const bbin = document.createElement('button');
    bbin.className = 'delbin';
    bbin.setAttribute('type', 'button');
    bbin.setAttribute('id', this.newtask.id);

    const threedots = new Image();
    threedots.className = 'three-dots';
    threedots.src = tdIcon;
    threedots.setAttribute('alt', 'threedots');

    checktag.appendChild(cbox);
    checktag.appendChild(tbox);

    eachtask.appendChild(checktag);
    bbin.appendChild(threedots);
    eachtask.appendChild(bbin);
    ulList.appendChild(eachtask);

    cbox.addEventListener('change', () => {
      this.newtask.complete = cbox.checked;

      if (this.newtask.complete) {
        eachtask.classList.add('checked');
        eachtask.style.background = '#f4f5Cf';
        eachtask.style.opacity = '0.5';
      } else {
        eachtask.classList.remove('checked');
        eachtask.style.background = 'none';
        eachtask.style.opacity = '1';
      }

      updateStatus(this.newtask.id, this.newtask.complete, tasks);
    });

    tbox.addEventListener('input', () => {
      this.newtask.description = tbox.value;
    });

    tbox.addEventListener('blur', () => {
      tbox.setAttribute('disabled', '');
      eachtask.style.background = '#eff9fd';
      localStorage.setItem('todolist', JSON.stringify(tasks));
    });

    checktag.addEventListener('click', () => {
      tbox.removeAttribute('disabled');
      tbox.focus();
    });

    threedots.addEventListener('click', () => {
      tasks = tasks.filter((task) => task.id !== this.newtask.id);
      eachtask.remove();
      setIndex();
      localStorage.setItem('todolist', JSON.stringify(tasks));
    });

    return {
      eachtask,
      tbox,
      checktag,
      threedots,
    };
  }
}

function addTask(val) {
  const newtask = {
    id: tasks.length + 1,
    description: val,
    complete: false,
  };
  tasks.push(newtask);
  const n = new Create(newtask);
  n.createTodo();
  localStorage.setItem('todolist', JSON.stringify(tasks));
}

addlistdiv.addEventListener('click', (e) => {
  e.preventDefault();

  addiconbutton.addEventListener('click', () => {
    if (addlist.value !== '') {
      addTask(addlist.value);
      addlist.value = '';
    }
  });
});

function displayList() {
  if (localStorage.getItem('todolist')) {
    tasks = JSON.parse(localStorage.getItem('todolist'));
    tasks.forEach((task) => {
      const n = new Create(task);
      const { eachtask } = n.createTodo();
      if (task.complete) {
        eachtask.classList.add('checked');
        eachtask.style.background = '#f4f5Cf';
        eachtask.style.opacity = '0.5';
      } else {
        eachtask.classList.remove('checked');
        eachtask.style.background = 'none';
        eachtask.style.opacity = '1';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', displayList);

const clearCheckedTasks = () => {
  clearCompleted(tasks, setIndex, ulList, displayList);
};

clearall.addEventListener('click', clearCheckedTasks);

addiconbutton.addEventListener('click', () => {
  if (addlist.value === '') {
    ifempty.innerHTML = `
      <p>Enter a task to add to the list for today</p>
      <span class='smiley'>&#128512;</span>
    `;
    setTimeout(() => {
      ifempty.innerHTML = '';
    }, 4000);
  }
});
