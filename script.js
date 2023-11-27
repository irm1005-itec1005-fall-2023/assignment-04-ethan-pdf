/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables
let todoItems = [];
let completedItems = [];


let taskInput = document.getElementById("taskInput");
let taskButton = document.getElementById("taskButton");
let taskList = document.getElementById("taskList");
let taskForm = document.getElementById("taskForm");
let completedList = document.getElementById("completedList");
let clearButton = document.getElementById("clear");
let completedCount = document.getElementById("completedCounter");

taskForm.addEventListener("submit", handleSubmit); 


function markToDoItemAsCompleted(todoId) {
  // Implement the logic to mark a task as completed heree

let comp = false;

  for (let i = 0; i < todoItems.length; i++) {
    if (todoId === todoItems[i].id) {
      todoItems[i].completed = true;
      comp = true;
      console.log('task', todoId, 'has been completed ✅');

      completedItems.push(todoItems[i]);
      todoItems.splice(i, 1);

      return;
    }
}
if (comp === false) {
    console.error("task", todoId, "does not exist ❌");
  }

}

function clearCompletedTasks() {

  for (i = 0; i < todoItems.length; i++) {
  if (todoItems[i].completed === true) {
    completedItems.push(todoItems[i]);
    todoItems.splice(i, 1);
    }
  }
  completedItems.splice(0, completedItems.length);
  console.log('completed tasks have successfully been removed');
  }

function removeToDoItem(todoId) {
 
  let removed = false;
  
  for (let i = 0; i < todoItems.length; i++) {
    if(todoId === todoItems[i].id) {
      todoItems.splice(i, 1);
      removed = true;
      console.log('task', todoId, 'has been removed');
      return; // i used a return here to exit the function just incase it called on the second if statement this was completely intentional - ethan
    }
    
    }
     if (removed === false){
      console.error("task", todoId, "does not exist ❌");
  }
  
}

function addToDoItem(text) {
  // Implement the logic to add a task here
  let identifier = 1;
    if (todoItems.length > 0) {
    identifier = todoItems[todoItems.length - 1].id + 1;
    }

  
  let task = {
   
    id: identifier,
    text: String(text),
    completed: false,
  
   };

  todoItems.push(task);
}



function renderToDoItem() {
  taskList.innerHTML = '';
  completedList.innerHTML = ''; 

  for (let i = 0; i < todoItems.length; i++) {
    let tempTask = document.createElement('li');
    tempTask.textContent = todoItems[i].text;

    let tempButton = document.createElement('button');
    tempButton.textContent = '✔';

    let tempRemove = document.createElement('button');
    tempRemove.textContent = '✖';

    tempButton.addEventListener('click', function () {
      markToDoItemAsCompleted(todoItems[i].id);
      completedCount.textContent = `You've completed ${completedItems.length} tasks`;
      counterColor();      
      renderToDoItem();
    });

    tempRemove.addEventListener('click', function () {
      removeToDoItem(todoItems[i].id);
      renderToDoItem();
    });

    tempTask.appendChild(tempRemove);
    tempTask.appendChild(tempButton);
    taskList.appendChild(tempTask);
    
  }

  
  for (let i = 0; i < completedItems.length; i++) {
    let completedTask = document.createElement('li');
    completedTask.textContent = completedItems[i].text;
    completedList.appendChild(completedTask);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const taskValue = taskInput.value.trim(); 

  if (taskValue !== '') 
  { 
    console.log("Task", taskValue, "created");
    addToDoItem(taskValue);
    taskForm.reset();
    renderToDoItem(); 
  } 
  else {
    console.log("Please enter a task."); 
  }
}

clearButton.addEventListener('click', function () {
  clearCompletedTasks();
  renderToDoItem();
});

function counterColor() {
  if (completedItems.length > 0) {
    completedCount.style.transition = 'color 1s';
    completedCount.style.color = 'rgb(30, 215, 96)';

  }
}