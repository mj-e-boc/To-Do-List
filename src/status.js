export function updateStatus(taskId, complete, tasks) {
  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.complete = complete;
    }
  });

  localStorage.setItem('todolist', JSON.stringify(tasks));
}

export function clearCompleted(tasks, setIndex, ulList, displayList) {
  tasks = tasks.filter((task) => !task.complete);
  setIndex();
  localStorage.setItem('todolist', JSON.stringify(tasks));
  ulList.innerHTML = '';
  displayList();
}
