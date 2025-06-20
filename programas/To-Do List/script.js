const todoList = document.getElementById('todoList');
const counter = document.getElementById('counter');
let dragSrcEl = null;

function updateCounter() {
  counter.textContent = todoList.children.length;
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.draggable = true;
  li.innerHTML = `<span>${text}</span><span class="remove" onclick="removeTask(this)">&#10006;</span>`;
  addDragEvents(li);
  todoList.appendChild(li);
  input.value = '';
  updateCounter();
}

function removeTask(el) {
  el.parentElement.remove();
  updateCounter();
}

function addDragEvents(li) {
  li.addEventListener('dragstart', function() {
    dragSrcEl = this;
    this.classList.add('dragging');
  });
  li.addEventListener('dragend', function() {
    this.classList.remove('dragging');
  });
  li.addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  li.addEventListener('drop', function(e) {
    e.preventDefault();
    if (dragSrcEl !== this) {
      todoList.insertBefore(dragSrcEl, this.nextSibling);
      updateCounter();
    }
  });
}
todoList.addEventListener('dragover', function(e) { e.preventDefault(); });
function toggleTheme() {
  document.body.classList.toggle('light');
}
document.querySelectorAll('li').forEach(addDragEvents);
document.getElementById('taskInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});