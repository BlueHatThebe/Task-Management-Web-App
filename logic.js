const taskInput = document.getElementById("task");
const statusInput = document.getElementById("status");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
  const task = taskInput.value;
  const status = statusInput.value;
  const deadline = deadlineInput.value;
  if (task.trim() === "" || deadline === "") {
    alert("Please select an upcoming date for the deadline.");
    return; // Don't add task if task or deadline is empty
  }

  const selectedDate = new Date(deadline);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert("Please select an upcoming date for the deadline.");
    return; // Don't add task if deadline is not in the future
  }

  const taskItem = document.createElement("div");
  taskItem.classList.add("task");
  taskItem.innerHTML = `
    <p>${task}</p>
    <p>Status: ${status}</p>
    <p>Deadline: ${deadline}</p>
	<button class="mark-done">Mark Done</button>
	<i class="fas fa-edit edit-task"></i>
	<i class="fas fa-trash-alt delete-task"></i>
  `;

  taskList.appendChild(taskItem);

  taskInput.value = "";
  statusInput.value = "top";
  deadlineInput.value = "";
});

taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("mark-done")) {
    const taskItem = event.target.parentElement;
    taskItem.style.backgroundColor = "#037592";
    event.target.disabled = true;
  }

  if (event.target.classList.contains("delete-task")) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
  }

  if (event.target.classList.contains("edit-task")) {
    const taskItem = event.target.parentElement;
    const taskText = taskItem.querySelector('p:first-child').textContent;
    const statusText = taskItem.querySelector('p:nth-child(2)').textContent;
    const deadlineText = taskItem.querySelector('p:nth-child(3)').textContent;

    taskInput.value = taskText;
    statusInput.value = statusText.split(": ")[1];
    deadlineInput.value = deadlineText.split(": ")[1];

    taskList.removeChild(taskItem);
  }
});
