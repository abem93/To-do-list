class TaskListObserver {
  // instance properties 
  items = [];
  observers = [];

  // add item 
  addItem(item) {
    // add item to items
    console.log(item); 
    this.items.push(item);
    localStorage.setItem('tasks', JSON.stringify(this.items))
    // notify all subscribers that an item has been added
    this.notifyAll();
  }
  removeItem(item){
    this.items = this.items.filter((item) => item !== fn)
    this.notifyAll();
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
const trashButton = document.querySelectorAll('.trash');


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
button.addEventListener('click', addItemToList);


console.log(trashButton);
console.log('hi');
console.log


//functions

//local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => {
  const item = task;
  TaskList.addItem(item)
   //Create Li
   const itemGroup = document.createElement('li');
   const itemElement = document.createElement('p');
   itemElement.classList.add('task-items');
   itemElement.innerText = item

   // Create Check MARK and Trash
   const checkmark = document.createElement('input');
   checkmark.setAttribute('type', 'checkbox');
   const trash = document.createElement('button');
   trash.classList.add('trash', 'remove');
   trash.innerText = 'Delete';


   // add to html
   listElement.appendChild(itemGroup);
   itemGroup.appendChild(itemElement)
   itemGroup.appendChild(checkmark);
   itemGroup.appendChild(trash);
})
function addItemToList(item){
  // get item
  item = document.querySelector('input').value
  if(item === ''){
    alert('Please enter task');
    return
  }else{
    // adjust the content
    TaskList.addItem(item)
    //console.log(item);

    //Create Li
    const itemGroup = document.createElement('li');
    itemGroup.classList.add('task-group')
    const itemElement = document.createElement('p');
    itemElement.classList.add('task-name');
    itemElement.innerText = item

    // Create Check MARK and Trash
    const checkmark = document.createElement('input');
    checkmark.setAttribute('type', 'checkbox');
    const trash = document.createElement('button');
    trash.classList.add('trash', 'remove');
    trash.innerText = 'Delete';


    // add to html
    listElement.appendChild(itemGroup);
    itemGroup.appendChild(itemElement)
    itemGroup.appendChild(checkmark);
    itemGroup.appendChild(trash);

  }

}

function removeFromList(){
  console.log('hello')
  
}
trashButton.forEach(button => button.addEventListener('click', removeFromList));










