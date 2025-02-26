const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const creat = document.querySelector("#creat-elements");
const numbers = document.querySelector("#inf");
const clear = document.querySelector("#btn-2");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function openELements() {
    creat.innerHTML = "";
    todos.forEach((todo, index) => {
        const todoItem = document.createElement("div");
        todoItem.className = "card";
        const todoText = document.createElement("span");
        todoText.textContent = todo;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DEL";
        deleteBtn.onclick = () => {
            delTodo(index);
        };
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);
        creat.appendChild(todoItem);
    });
    numbers.textContent = `You have ${todos.length} pending tasks`;
}

function getNewTodo() {
    const todo = input.value.trim();
    if (todo) {
        todos.push(todo);
        input.value = "";
        saveTodo();
        openELements();
    }
}

function delTodo(index) {
    todos.splice(index, 1);
    saveTodo();
    openELements();
}

function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodo() {
    todos = [];
    saveTodo();
    openELements();
}
btn.addEventListener("click", getNewTodo);
clear.addEventListener("click", clearTodo);
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getNewTodo();
    }
});
openELements();