class TaskListObserver {
  // instance properties 
  items = [];
  completed = []; 
  observers = [];

  // add item 
  addItem(item, isChecked) {
    // add item to items
    if (!this.items.includes(item)) {
      this.items.push(item);
    }
    const index = this.completed.indexOf(item);
    if (isChecked && index === -1) {
      this.completed.push(item);
    } else if (!isChecked && index > -1) {
      this.completed.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(this.items))
    localStorage.setItem('completed', JSON.stringify(this.completed))
    // notify all subscribers that an item has been added
    this.notifyAll();
    pendingTasks();
  }

  removeItem(item){
    this.items = this.items.filter((task) => task !== item);
    this.completed = this.completed.filter((task) => task !== item);
    localStorage.setItem('tasks', JSON.stringify(this.items))
    localStorage.setItem('completed', JSON.stringify(this.completed)) 
    this.notifyAll();
    pendingTasks();
  } 

  checkItem(item, isChecked){
    const index = this.completed.indexOf(item);
    if (isChecked && index === -1) {
      this.completed.push(item);
    } else if (!isChecked && index > -1) {
      this.completed.splice(index, 1);
    }
    localStorage.setItem('completed', JSON.stringify(this.completed));
    localStorage.setItem('tasks', JSON.stringify(this.items));
    pendingTasks();
  }

  // add subscriber to observers 
  subscribe(observer) {
    this.observers.push(observer);
  }

  // broadcast information to all subscribers
  notifyAll() {
    this.observers.forEach(observer => observer.update())
  }
}

// instance creation 
const TaskList = new TaskListObserver;

// get Task List elements
const listElement = document.getElementById('tasks-list');
const button = document.querySelector('.button');
const inputElement = document.querySelector('input');
const divContainer = document.querySelector('.input-group');

//event listener
inputElement.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    button.click();
    inputElement.value = ''
  }
});

button.addEventListener('click', function() {
  const item = document.querySelector('input').value;
  addItemToList(item);
  document.querySelector('input').value = '';
  pendingTasks()
});

//local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completed = JSON.parse(localStorage.getItem("completed")) || []; 
if (completed) {
  localStorage.setItem('newCompletedItems', JSON.stringify(completed));
}
tasks.forEach((task) => {
  let isChecked = completed.includes(task);
  addItemToList(task, isChecked); 
})
pendingTasks()


//add items
function addItemToList(item, isChecked){
  isChecked = completed.includes(item);
  // get item
  if(item === ''){
    alert('Please enter task');
    return
  }else{
    //Create Li
    const itemGroup = document.createElement('li');
    itemGroup.classList.add('task-group')
    const itemElement = document.createElement('p');
    itemElement.classList.add('task-name');
    itemElement.innerText = item

    // Create Check MARK and Trash
    const checkmark = document.createElement('input');
    checkmark.setAttribute('type', 'checkbox');
    checkmark.checked = isChecked;
    const trash = document.createElement('button');
    trash.classList.add('trash', 'remove');
    trash.innerText = 'Delete';

    // Add event listener to trash button
    trash.addEventListener('click', function() {
      // Get the value of the p element
      let itemValue = this.parentElement.querySelector('p').innerText;
      let parentElement = this.parentElement;
      parentElement.classList.add('slide-down');
      
      // Remove item from list and DOM
      setTimeout(function() {
        TaskList.removeItem(itemValue);
        parentElement.remove();
      }, 1500);

    });

    // Add event Listener to CheckBox
    checkmark.addEventListener('change', function() {
      // Get the task name element
      const taskNameElement = this.parentElement.querySelector('.task-name');   
      // Check if the checkbox is checked
      if (this.checked) {
        // If checked, add 'crossed-out' class name element
        taskNameElement.classList.add('crossed-out');
        TaskList.checkItem(taskNameElement.innerText, true);
      } else {
        // If unchecked, remove 'crossed-out' 
        taskNameElement.classList.remove('crossed-out');
        TaskList.addItem(taskNameElement.innerText, false);
      }
    });
    if (isChecked) {
      itemElement.classList.add('crossed-out');
    }
    TaskList.addItem(item, isChecked)
    pendingTasks()
    // add to html
    listElement.appendChild(itemGroup);
    itemGroup.appendChild(itemElement)
    itemGroup.appendChild(checkmark);
    itemGroup.appendChild(trash);

  }

}

function pendingTasks(){
  let total = TaskList.items.length - TaskList.completed.length;
  const remaining = document.querySelector('#remaining');
  remaining.innerText = `${total} tasks pending`;
  listElement.appendChild(remaining)
}
