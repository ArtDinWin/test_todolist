var nowDate = new Date();
console.log("Приложение cписок Todo ЗАПУЩЕННО,", nowDate.toString());

let tasks = []; // Массив для хранения данных о задачах
let taskElem = document.getElementById("add-task"); // Форма добавления новой задачи
let iconAdd = document.getElementById("icon-add"); // Иконка кнопки добавить новую задачу
let itemList = document.getElementById("list"); // Список ul задач
let iconArrow = document.getElementsByClassName("icon-arrow"); // Иконка кнопки добавить новую задачу
const storage = localStorage.getItem("toDoApp"); // Получение значения localStorage для key = toDoApp (тип данных Json)
let clearList = document.getElementById("trash"); // Иконка кнопки очистить список задач

taskElem.addEventListener("submit", addTask); // событие по submit (подтвердить новую задачу)
iconAdd.addEventListener("click", addTask); //  событие по кнопке добавить новую задачу
itemList.addEventListener("click", removeTask); // событие удалить задачу
itemList.addEventListener("click", setReady); // событие сделать задачу выполненной
clearList.addEventListener("click", clearTasks); // событие сделать задачу выполненной

// Функция добавления новой задачи в список
function addTask(e) {
  e.preventDefault();
  const newTaskInput = document.getElementById("input");
  let newElemInput = newTaskInput.value;

  if (newElemInput) {
    addElemHTML(newElemInput);
    tasks.push(newElemInput);
    resaveStorage(tasks);
  }
  newTaskInput.value = "";
}

// Функция добавления новой задачи в html
function addElemHTML(taskText) {
  let newElement = document.createElement("li");
  let svgArrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let svgns = "http://www.w3.org/2000/svg";
  let xlinkns = "http://www.w3.org/1999/xlink";
  let useArrow = document.createElementNS(svgns, "use");
  let div = document.createElement("div");
  let elemText = document.createTextNode(taskText);
  let svgDelete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let useDelete = document.createElementNS(svgns, "use");

  newElement.className = "task";
  svgArrow.setAttribute("class", "icon-arrow");
  svgArrow.setAttribute("viewBox", "0 0 21 21");
  svgArrow.setAttribute("width", "21");
  svgArrow.setAttribute("height", "21");
  svgArrow.dataset.action = "ready";
  useArrow.setAttributeNS(xlinkns, "href", "#arrow_1");
  svgArrow.appendChild(useArrow);
  newElement.appendChild(svgArrow);
  div.className = "text";
  div.appendChild(elemText);
  newElement.appendChild(div);
  svgDelete.setAttribute("class", "icon-delete");
  svgDelete.setAttribute("viewBox", "0 0 21 21");
  svgDelete.setAttribute("width", "21");
  svgDelete.setAttribute("height", "21");
  svgDelete.dataset.action = "delete";
  useDelete.setAttributeNS(xlinkns, "href", "#delete_1");
  svgDelete.appendChild(useDelete);
  newElement.appendChild(svgDelete);
  itemList.prepend(newElement);
}

// Функция удаления задачи из списка
function removeTask(e) {
  if (
    e.target.hasAttribute("data-action") &&
    e.target.getAttribute("data-action") == "delete"
  ) {
    let taskName = e.target.parentElement.querySelector("div").innerText;

    if (confirm(`Удалить задачу: ${taskName}?`)) {
      e.target.parentNode.remove();
      let indexTask = tasks.findIndex((i) => i == taskName);
      tasks.splice(indexTask, 1);
      resaveStorage(tasks);
    }
  }
}

// Функция которая делает задачу выполненной
function setReady(e) {
  if (
    e.target.hasAttribute("data-action") &&
    e.target.getAttribute("data-action") == "ready"
  ) {
    let name = e.target.parentNode.classList.toggle("ready");
    console.log(name);
  }
}

// функция перезаписи localStorage
function resaveStorage(tasks) {
  // устанавливаем localStorage для key = toDoApp (тип данных JSON от массива)
  localStorage.setItem("toDoApp", JSON.stringify(tasks));
}

// функция очищения списка задач
function clearTasks() {
  tasks = [];
  localStorage.clear();
  // location.reload();
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

// выводим список задач если они есть в localStorage
if (storage) {
  tasks = JSON.parse(storage);
  tasks.forEach((value) => addElemHTML(value));
}
