const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 1. Load tasks from localStorage when page starts
window.onload = loadTasks;

// 2. Function to add a new task
addBtn.addEventListener('click', () => {
    const taskValue = taskInput.value.trim();
    if (taskValue === "") return;

    const taskObj = { text: taskValue, completed: false };
    createTaskElement(taskObj);
    saveTask(taskObj);
    taskInput.value = "";
});

// 3. Create the HTML elements for a task
function createTaskElement(taskObj) {
    const li = document.createElement('li');
    if (taskObj.completed) li.classList.add('completed');

    li.innerHTML = `
        <span>${taskObj.text}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Click text to toggle complete
    li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    // Click button to delete
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
    });

    taskList.appendChild(li);
}

// 4. LocalStorage: Save single task
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 5. LocalStorage: Update entire list
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 6. LocalStorage: Load all tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));
}