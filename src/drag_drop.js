// eslint-disable-next-line
import { setToLocalStorage } from './storage.js';
// eslint-disable-next-line
import statusUpdate from './status_update.js';
// eslint-disable-next-line
import { addButtonHandlers, addEditHandlers } from './add_remove.js';

let dragSrcEl = null;

export function sortIndex(list) {
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i;
  }
  return list;
}

function generateListFromDOM() {
  const list = document.getElementsByClassName('todo-item');
  const resultList = [];
  for (let i = 0; i < list.length; i += 1) {
    const description = list[i].children[0].children[1].innerText;
    const completed = list[i].children[0].children[0].checked;
    const index = list[i].children[0].children[0].name.split('-')[1];

    resultList.push({
      description,
      completed,
      index,
    });
  }
  return resultList;
}

export function refreshLocalStorage() {
  const resultList = generateListFromDOM();
  const sortedList = sortIndex(resultList);

  setToLocalStorage(sortedList);
}

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = e.currentTarget;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', dragSrcEl.innerHTML);
}

function dragEnd() {
  this.style.opacity = '1';
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();

  const dropDestEl = e.currentTarget;

  if (dragSrcEl !== dropDestEl) {
    const currentId = dragSrcEl.children[0]
      .children[0]
      .getAttribute('name')
      .split('-')[1];

    const destinyId = dropDestEl.children[0]
      .children[0]
      .getAttribute('name')
      .split('-')[1];

    const checkedSource = dragSrcEl.children[0]
      .children[0].checked;

    const checkedDestiny = dropDestEl.children[0]
      .children[0].checked;

    dragSrcEl.innerHTML = dropDestEl.innerHTML;
    dropDestEl.innerHTML = e.dataTransfer.getData('text/html');

    // Set values for source element
    dragSrcEl.children[0]
      .children[0]
      .setAttribute('name', `item-${destinyId}`);

    dragSrcEl.children[0]
      .children[1]
      .setAttribute('for', `item-${destinyId}`);

    // Set values for destiny element
    dropDestEl.children[0]
      .children[0]
      .setAttribute('name', `item-${currentId}`);

    dropDestEl.children[0]
      .children[1]
      .setAttribute('for', `item-${currentId}`);

    // Set checked attribute
    if (checkedSource === true && checkedDestiny === false) {
      dragSrcEl.children[0].children[0].checked = false;
      dropDestEl.children[0].children[0].checked = true;
    } else if (checkedSource === false && checkedDestiny === true) {
      dragSrcEl.children[0].children[0].checked = true;
      dropDestEl.children[0].children[0].checked = false;
    }
  }

  addButtonHandlers();
  addEditHandlers();
  statusUpdate();
  refreshLocalStorage();
  return false;
}

export function dragAndDrop() {
  const todoItems = document.getElementsByClassName('todo-item');
  [...todoItems].forEach((todoItem) => {
    todoItem.addEventListener('dragstart', dragStart, false);
    todoItem.addEventListener('dragend', dragEnd, false);
    todoItem.addEventListener('drop', drop, false);
    todoItem.addEventListener('dragover', dragOver, false);
  });
}
