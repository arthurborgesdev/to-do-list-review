// eslint-disable-next-line
import { getFromLocalStorage, setToLocalStorage } from './storage.js';
// eslint-disable-next-line
import { dragAndDrop, refreshLocalStorage } from './drag_drop.js';
// eslint-disable-next-line
import statusUpdate from './status_update.js';

export function addEditHandlers() {
  const todoList = document.getElementsByClassName('todo-item');
  for (let i = 0; i < todoList.length; i += 1) {
    const labelElem = todoList[i].children[0].children[1];
    labelElem.addEventListener('input', () => {
      refreshLocalStorage();
    });
  }
}

export function addButtonHandlers() {
  const buttons = document.getElementsByClassName('remove-button');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', () => {
      const index = `item-${i}`;
      const inputItem = document.getElementsByName(index)[0];
      inputItem.parentElement.parentElement.remove();
      refreshLocalStorage();
    });
  }
}

function appendToDOM(todo) {
  document.getElementById('todo-list').insertAdjacentHTML('beforeend', `
    <div class="todo-item" draggable="true">
      <div>
        <input type="checkbox" name="item-${todo.index}" readonly="true">
        <label for="item-${todo.index}" style="text-decoration: none;" contenteditable=true>
          ${todo.description}
        </label>
      </div>
      <div class="dots-button">
        <span class="remove-button"><i id="item-${todo.index}" class="fas fa-trash"></i></span>
        <i class="fas fa-ellipsis-v"></i>
      </div> 
    </div>
  `);
}

export function addTodo(description) {
  const newTodo = {
    description,
    completed: false,
  };

  const currentTodoList = getFromLocalStorage();
  const todoLength = currentTodoList.length;
  if (todoLength === 0) {
    newTodo.index = 0;
  } else {
    newTodo.index = todoLength;
  }

  currentTodoList.push(newTodo);
  setToLocalStorage(currentTodoList);
  appendToDOM(newTodo);
  dragAndDrop();

  statusUpdate();
  addEditHandlers();
  addButtonHandlers();
}

document.querySelector('.todo-new > input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo(e.target.value);
    e.target.value = '';
  }
});

document.getElementById('clear-all').addEventListener('click', () => {
  const todoList = document.getElementsByClassName('todo-item');
  [...todoList].filter((todoItem) => todoItem.children[0].children[0].checked)
    .forEach((item) => item.remove());
  refreshLocalStorage();
});
