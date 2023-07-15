import './style.css';
import reIcon from './recycle.png';
import tdIcon from './3dotd.png';

const inHead = document.querySelector('.div-heading');
const ulList = document.getElementById('to-do-list');
const reicon = new Image();
reicon.src = reIcon;
reicon.className = 'reload-image';
reicon.setAttribute('alt', 'reload-icon');
inHead.appendChild(reicon);

const tasks = [
  {
    description: 'Wash the dishes',
    completed: true,
    index: 4,
  },
  {
    description: 'Complete to do list',
    completed: true,
    index: 3,
  },
  {
    description: 'Make a Cake',
    completed: true,
    index: 2,
  },
  {
    description: 'Shopping for the weekend',
    completed: true,
    index: 1,
  },
];

const sortedTasks = [...tasks];

const render = () => {
  sortedTasks.sort((a, b) => a.index - b.index);

  for (let i = 0; i < sortedTasks.length; i += 1) {
    ulList.innerHTML += `
      <li class='each-task'>
        <div class='check-tag'>
          <input type='checkbox' id='task-desc'>
          <lable for='task-desc'>${sortedTasks[i].description}</label>
        </div>
        <img src=${tdIcon} class='three-dots' alt='three dots'/>
      </li>
    `;
  }
};

document.addEventListener('DOMContentLoaded', render);
