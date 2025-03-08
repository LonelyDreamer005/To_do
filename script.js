// DOM Elements
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const currentTime = document.getElementById('current-time');
const tasksLeft = document.getElementById('tasks-left');

// Update Time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  currentTime.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

// Add Todo
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${todoText}</span>
    <i class="fas fa-trash"></i>
  `;
  todoList.appendChild(li);
  todoInput.value = '';

  // Add event listener to delete button
  li.querySelector('i').addEventListener('click', () => {
    li.remove();
    updateTasksLeft();
  });

  updateTasksLeft();
}

// Add Todo on Enter Key
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// Add Todo on Button Click
addTodoButton.addEventListener('click', addTodo);

// Update Tasks Left
function updateTasksLeft() {
  const tasks = todoList.querySelectorAll('li').length;
  tasksLeft.textContent = `${tasks} tasks left`;
}

// Initial Tasks Left Update
updateTasksLeft();