import './style.css';
import reIcon from './recycle.png';
import tdIcon from './3dotd.png';
import adIcon from './enter.png';

class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('todolist')) || [];
    this.ulList = document.getElementById('to-do-list');
    this.addListInput = document.createElement('input');
    this.addListButton = document.createElement('button');
  }

  initialize() {
    this.renderTasks();
    this.setupEventListeners();
    this.setupAddTaskInput();
  }

  renderTasks() {
    this.ulList.innerHTML = ''; // Clear the previous list before rendering
    this.tasks.forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'each-task';

      const checkTag = document.createElement('div');
      checkTag.className = 'check-tag';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-check';
      checkbox.checked = task.complete;

      const taskDesc = document.createElement('input');
      taskDesc.type = 'text';
      taskDesc.className = 'task-desc';
      taskDesc.value = task.description;

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delbin';
      deleteButton.type = 'button';

      const deleteButtonImg = new Image();
      deleteButtonImg.src = tdIcon;
      deleteButtonImg.alt = 'threedots';
      deleteButtonImg.className = 'three-dots';

      checkTag.appendChild(checkbox);
      checkTag.appendChild(taskDesc);
      taskItem.appendChild(checkTag);
      deleteButton.appendChild(deleteButtonImg);
      taskItem.appendChild(deleteButton);

      checkbox.addEventListener('change', () => {
        task.complete = checkbox.checked;
        localStorage.setItem('todolist', JSON.stringify(this.tasks));
        taskItem.classList.toggle('checked');
      });

      taskDesc.addEventListener('input', () => {
        task.description = taskDesc.value;
        localStorage.setItem('todolist', JSON.stringify(this.tasks));
      });

      deleteButton.addEventListener('click', () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        localStorage.setItem('todolist', JSON.stringify(this.tasks));
        this.renderTasks();
      });

      if (task.complete) {
        taskItem.classList.add('checked');
      }

      this.ulList.appendChild(taskItem);
    });
  }

  addTask(description) {
    const newTask = {
      id: this.tasks.length + 1,
      description,
      complete: false,
    };
    this.tasks.push(newTask);
    localStorage.setItem('todolist', JSON.stringify(this.tasks));
    this.renderTasks();
  }

  setupAddTaskInput() {
    const addListDiv = document.querySelector('.list-adding');
    this.addListInput.setAttribute('type', 'text');
    this.addListInput.setAttribute('placeholder', 'Add to your list ...');
    this.addListInput.setAttribute('id', 'add-new-list');
    this.addListButton.type = 'button';
    this.addListButton.className = 'addbutton';
    const addListButtonImg = new Image();
    addListButtonImg.src = adIcon;
    addListButtonImg.setAttribute('alt', 'addicon');
    addListButtonImg.className = 'addicon';
    this.addListButton.appendChild(addListButtonImg);
    addListDiv.appendChild(this.addListInput);
    addListDiv.appendChild(this.addListButton);
  }

  setupEventListeners() {
    this.addListButton.addEventListener('click', () => {
      const description = this.addListInput.value.trim();
      if (description) {
        this.addTask(description);
        this.addListInput.value = '';
      }
    });
  }
}

const todoList = new ToDoList();
const inHead = document.querySelector('.div-heading');
const reicon = new Image();
reicon.src = reIcon;
reicon.className = 'reload-image';
reicon.setAttribute('alt', 'reload-icon');
inHead.appendChild(reicon);

document.addEventListener('DOMContentLoaded', () => {
  todoList.initialize();
});
