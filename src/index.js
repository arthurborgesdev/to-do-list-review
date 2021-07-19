import './style.css';
// eslint-disable-next-line
import { dragAndDrop, sortIndex} from './drag_drop.js';
// eslint-disable-next-line
import { setToLocalStorage, getFromLocalStorage } from './storage.js';
import statusUpdate from './status_update.js';
// eslint-disable-next-line
import { addEditHandlers, addButtonHandlers } from './add_remove.js';

import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

const todo = [];

const populateTodos = (todo, sort) => {
  let sortedTodo = [];
  if (sort) {
    sortedTodo = todo.sort((a, b) => a.index - b.index);
  } else {
    sortedTodo = todo;
  }

  for (let i = 0; i < sortedTodo.length; i += 1) {
    let style = '';
    let checkbox = '';
    if (sortedTodo[i].completed) {
      style = 'text-decoration: line-through;';
      checkbox = 'checked';
    } else {
      style = 'text-decoration: none;';
      checkbox = '';
    }

    document.getElementById('todo-list').insertAdjacentHTML('beforeend', `
      <div class="todo-item" draggable="true">
        <div>
          <input type="checkbox" name="item-${sortedTodo[i].index}" ${checkbox}>
          <label for="item-${sortedTodo[i].index}" style="${style}" contenteditable=true>
            ${sortedTodo[i].description} 
          </label>
        </div>
        <div class="dots-button">
          <span class="remove-button"><i id="item-${sortedTodo[i].index}" class="fas fa-trash"></i></span>
          <i class="fas fa-ellipsis-v"></i>
        </div> 
      </div>
    `);
  }
};

window.addEventListener('load', () => {
  const localStorageList = getFromLocalStorage();

  if (localStorageList == null) {
    setToLocalStorage(todo, true);
    populateTodos(todo);
  } else {
    const sortedList = sortIndex(localStorageList);
    populateTodos(sortedList, false);
  }
  dragAndDrop();
  statusUpdate();

  addEditHandlers();
  addButtonHandlers();
});