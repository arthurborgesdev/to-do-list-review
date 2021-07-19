export function setToLocalStorage(data) {
  localStorage.setItem('todo', JSON.stringify(data));
}

export function getFromLocalStorage() {
  const todoList = localStorage.getItem('todo');
  return JSON.parse(todoList);
}
