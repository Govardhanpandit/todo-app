let inputValue = document.getElementById("inputValue");
let inputBtn = document.getElementById("inputBtn");
let mainToDoElement = document.getElementById("mainToDoElement");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("youtubeTodoList"));
};

const addTodoListLocalStorage = (localTodoLists) => {
  return localStorage.setItem(
    "youtubeTodoList",
    JSON.stringify(localTodoLists)
  );
};

let localTodoLists = getTodoListFromLocal() || [];

const addTodoDynamicElement = (element) => {
  let divElem = document.createElement("div");
  divElem.classList.add("main_todo_list");
  divElem.innerHTML = `<li>${element}</li> <button class="deleteBtn">Delete</button>`;
  mainToDoElement.append(divElem);
  inputValue.value = "";
};

let addTodoElem = (e) => {
  e.preventDefault();

  const TodoListValue = inputValue.value.trim();

  if (TodoListValue != "" && !localTodoLists.includes(TodoListValue)) {
    localTodoLists.push(TodoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    console.log(localTodoLists);
    localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoLists));

    addTodoDynamicElement(TodoListValue);
  } else {
    alert("This is already available.");
    inputValue.value = "";
  }
};

const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  console.log(todoListContent);

  localTodoLists = localTodoLists.filter((element) => {
    return element != todoListContent;
  });
  console.log(localTodoLists);

  addTodoListLocalStorage(localTodoLists);

  let parentElem = todoToRemove.parentElement;
  parentElem.remove();
  console.log(parentElem);
};

const steTodoList = () => {
  console.log(localTodoLists);
  localTodoLists.forEach((element) => {
    addTodoDynamicElement(element);
  });
};

steTodoList();

mainToDoElement.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deleteBtn")) {
    removeTodoElem(e);
  }
});

inputBtn.addEventListener("click", (e) => {
  addTodoElem(e);
});
