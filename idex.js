const form = document.getElementById("form");
const input = document.getElementById("input");
const todoList = document.querySelector(".todoList");

const todoFromLs = JSON.parse(localStorage.getItem("todo"));

if (todoFromLs) {
  todoFromLs.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todoFromLs) {
  let todoWord = input.value;
  if (todoFromLs) {
    todoWord = todoFromLs.text;
  }
  if (todoWord) {
    const li = document.createElement("li");
    if (todoFromLs && todoFromLs.completed) {
      todoFromLs.classList.add("completed");
    }
    li.innerText = todoWord;
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      toLs();
    });
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      li.remove();
      toLs();
    });
    toLs();
    todoList.appendChild(li);
    input.value = "";
  }
}

function toLs() {
  const allLi = document.querySelectorAll("li");
  const todoArray = [];
  allLi.forEach((li) =>
    todoArray.push({
      text: li.innerText,
      completed: li.classList.contains("completed"),
    })
  );
  localStorage.setItem("todo", JSON.stringify(todoArray));
}
