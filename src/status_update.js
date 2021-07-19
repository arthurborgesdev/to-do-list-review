// eslint-disable-next-line
import { refreshLocalStorage } from './drag_drop.js';

function updateTodo(todoItem) {
  const checkbox = todoItem.children[0].children[0];

  if (checkbox.checked) {
    checkbox.setAttribute('checked', true);
    checkbox.nextElementSibling.style.textDecoration = 'line-through';
  } else {
    checkbox.removeAttribute('checked');
    checkbox.nextElementSibling.style.textDecoration = 'none';
  }

  refreshLocalStorage();
}

export default function statusUpdate() {
  const todoItems = document.getElementsByClassName('todo-item');

  [...todoItems].forEach((todoItem) => {
    todoItem.children[0].children[0].addEventListener('change', () => {
      updateTodo(todoItem);
    });
  });
}
