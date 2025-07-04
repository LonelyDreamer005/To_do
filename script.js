// DOM Elements
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const currentTime = document.getElementById('current-time');
const tasksLeft = document.getElementById('tasks-left');

// Load Todos from Local Storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

// Update Time
function updateTime() {
  const now = new Date();
  currentTime.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Add Todo
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === '') return;

  const todoItem = { text: todoText, completed: false };
  todos.push(todoItem);
  saveTodos();
  renderTodos();
  todoInput.value = '';
}

// Render Todos
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <i class="fas fa-trash"></i>
    `;
    // Toggle Complete
    li.querySelector('span').addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });
    // Delete
    li.querySelector('i').addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });
    todoList.appendChild(li);
  });
  updateTasksLeft();
}

// Save to Local Storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

const toggleDark = document.getElementById('toggle-dark');

toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Update Tasks Left
function updateTasksLeft() {
  const remaining = todos.filter(todo => !todo.completed).length;
  tasksLeft.textContent = `${remaining} tasks left`;
}

// Add Todo on Enter Key
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Add Todo on Button Click
addTodoButton.addEventListener('click', addTodo);
