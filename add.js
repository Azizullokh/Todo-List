document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const addButton = document.getElementById("btn");
    const taskList = document.getElementById("task-list");
    const clearAllButton = document.getElementById("btn-2");
    const infoText = document.getElementById("inf");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function loadTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => addTaskToDOM(task.text, task.completed, index));
        updateInfo();
    }
    addButton.addEventListener("click", () => {
        if (input.value.trim() !== "") {
            const newTask = { text: input.value, completed: false };
            tasks.push(newTask);
            saveTasks();
            addTaskToDOM(newTask.text, newTask.completed, tasks.length - 1);
            input.value = "";
            updateInfo();
        }
    });

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "Complete";
    completeBtn.classList.add("complete-btn");


    function addTaskToDOM(text, completed, index) {
        const row = document.createElement("tr");
        row.setAttribute("data-index", index);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="task-text ${completed ? "completed" : ""}">${text}</td>
            <td class="btns">
                <button class="complete-btn">✔</button>
                <button class="delete-btn">🗑</button>
            </td>
        `;
        taskList.appendChild(row);
    }
    taskList.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const index = row.getAttribute("data-index");

        if (e.target.classList.contains("complete-btn")) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            row.querySelector(".task-text").classList.toggle("completed");
        }

        if (e.target.classList.contains("delete-btn")) {
            tasks.splice(index, 1);
            saveTasks();
            loadTasks();
        }
    });
    clearAllButton.addEventListener("click", () => {
        tasks = [];
        saveTasks();
        loadTasks();
    });

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateInfo() {
        infoText.textContent = `You have ${tasks.length} pending task${tasks.length !== 1 ? "s" : ""}`;
    }

    loadTasks();
});