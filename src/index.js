import _ from "lodash";
import "./style.css";
import reIcon from "./recycle.png";
import tdIcon from "./3dotd.png";
import adIcon from "./enter.png";

const inHead = document.querySelector(".div-heading");
const ulList = document.getElementById("to-do-list");
const clearall = document.querySelector(".clear-all");
const ifempty = document.querySelector(".ifempty");

// adding imported image for the app heading
const reicon = new Image();
reicon.src = reIcon;
reicon.className = "reload-image";
reicon.setAttribute("alt", "reload-icon");
inHead.appendChild(reicon);

// variables for the outer div of the to-do-list heading
const addlistdiv = document.querySelector(".list-adding");

// Creating input element that takes the task and adds the task
const addlist = document.createElement("input");
addlist.setAttribute("type", "text");
addlist.setAttribute("placeholder", "Add to your list ...");
addlist.setAttribute("id", "add-new-list");

const addiconbutton = document.createElement("button");
addiconbutton.type = "button";
addiconbutton.className = "addbutton";

const addicon = new Image();
addicon.src = adIcon;
addicon.setAttribute("alt", "addicon");
addicon.className = "addicon";

addiconbutton.appendChild(addicon);
addlistdiv.appendChild(addlist);
addlistdiv.appendChild(addiconbutton);

// Array of objects (empty at start)
let tasks = JSON.parse(localStorage.getItem("todolist")) || [];

// To reset index of tasks after deletions
function setindex() {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].id = i + 1;
  }
  localStorage.setItem("todolist", JSON.stringify(tasks));
}

class Create {
  constructor(newtask) {
    this.newtask = newtask;
  }

  // Method to create a to-do task, update the task, delete the task.
  createtodo() {
    // Creating the list item element
    const eachtask = document.createElement("li");
    eachtask.className = "each-task";

    // Creating an outer div to contain the checkbox and text field
    const checktag = document.createElement("div");
    checktag.className = "check-tag";

    // Creating checkbox
    const cbox = document.createElement("input");
    cbox.setAttribute("class", "task-check");
    cbox.setAttribute("type", "checkbox");
    cbox.checked = this.newtask.complete;

    // Adding the line-through decoration class as default
    if (this.newtask.complete) {
      eachtask.classList.add("checked");
    }

    // Creating text field
    const tbox = document.createElement("input");
    tbox.setAttribute("type", "text");
    tbox.setAttribute("class", "task-desc");
    tbox.value = this.newtask.description;

    // Creating a button for deleting the task
    const bbin = document.createElement("button");
    bbin.className = "delbin";
    bbin.setAttribute("type", "button");
    bbin.setAttribute("id", this.newtask.id);

    // Creating an image to place inside the button
    const threedots = new Image();
    threedots.className = "three-dots";
    threedots.src = tdIcon;
    threedots.setAttribute("alt", "threedots");

    // Appending the created elements
    checktag.appendChild(cbox);
    checktag.appendChild(tbox);

    eachtask.appendChild(checktag);
    bbin.appendChild(threedots);
    eachtask.appendChild(bbin);
    ulList.appendChild(eachtask);

    // Checking and updating the checkbox in localStorage and applying styles
    cbox.addEventListener("change", () => {
      this.newtask.complete = cbox.checked;

      if (this.newtask.complete) {
        eachtask.classList.add("checked");
        eachtask.style.background = "#f4f5Cf";
        eachtask.style.opacity = "0.5";
      } else {
        eachtask.classList.remove("checked");
        eachtask.style.background = "none";
        eachtask.style.opacity = "1";
      }

      localStorage.setItem("todolist", JSON.stringify(tasks));
    });

    // Update task in localStorage and display on clicking the text field outer div
    tbox.addEventListener("input", () => {
      this.newtask.description = tbox.value;
    });

    tbox.addEventListener("blur", () => {
      tbox.setAttribute("disabled", "");
      eachtask.style.background = "#eff9fd";
      localStorage.setItem("todolist", JSON.stringify(tasks));
    });

    checktag.addEventListener("click", () => {
      tbox.removeAttribute("disabled");
      tbox.focus();
    });

    // Deleting the task from the array, localStorage, and display when thrash image is clicked
    threedots.addEventListener("click", () => {
      tasks = tasks.filter((task) => task.id !== this.newtask.id);
      eachtask.remove();
      setindex();
      localStorage.setItem("todolist", JSON.stringify(tasks));
    });

    return {
      eachtask,
      tbox,
      checktag,
      threedots,
    };
  }
}

// Creating a new task object and using the class instance for feature implementation
function addlistfun(val) {
  const newtask = {
    id: tasks.length + 1,
    description: val,
    complete: false,
  };
  tasks.push(newtask);
  const n = new Create(newtask);
  n.createtodo();
  localStorage.setItem("todolist", JSON.stringify(tasks));
}

// Event to add the inputted task to the array and display it
addlistdiv.addEventListener("click", (e) => {
  e.preventDefault();

  addiconbutton.addEventListener("click", () => {
    if (addlist.value !== "") {
      addlistfun(addlist.value);
      addlist.value = "";
    }
  });
});

// Function to display the existing array of tasks in localStorage
function displaylist() {
  if (localStorage.getItem("todolist")) {
    tasks = JSON.parse(localStorage.getItem("todolist"));
    for (let i = 0; i < tasks.length; i += 1) {
      const newtask = tasks[i];
      const n = new Create(newtask);
      const { eachtask } = n.createtodo();
      if (newtask.complete) {
        eachtask.classList.add("checked");
        eachtask.style.background = "#f4f5Cf";
        eachtask.style.opacity = "0.5";
      } else {
        eachtask.classList.remove("checked");
        eachtask.style.background = "none";
        eachtask.style.opacity = "1";
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", displaylist());

// Method to clear the checked tasks
const clearchecked = () => {
  tasks = tasks.filter((task) => !task.complete);
  setindex();
  localStorage.setItem("todolist", JSON.stringify(tasks));
  ulList.innerHTML = "";
  displaylist();
};

clearall.addEventListener("click", clearchecked);

addiconbutton.addEventListener("click", () => {
  if (addlist.value === "") {
    ifempty.innerHTML = `
      <p>Enter a task to add to the list for today</p>
      <span class='smiley'>&#128512;</span>
    `;
    setTimeout(() => {
      ifempty.innerHTML = "";
    }, 4000);
  }
});
