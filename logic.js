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
    <input type="checkbox" class="task-checkbox" style="visibility: hidden;">
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

// Update the taskList event listener to toggle the visibility of the checkboxes and "Delete Selected" button
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("mark-done")) {
    const taskItem = event.target.parentElement;
    taskItem.style.backgroundColor = "#037592";
    event.target.disabled = true;
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

  const taskItems = taskList.getElementsByClassName("task");
  const checkboxes = Array.from(taskItems).map((taskItem) => {
    return taskItem.querySelector(".task-checkbox");
  });

  // Toggle checkbox visibility based on the presence of the delete icon
  if (event.target.classList.contains("delete-task")) {
    checkboxes.forEach((checkbox) => {
      checkbox.style.visibility = "visible"; // Show the checkboxes
    });
  }

  // Show "Delete Selected" button if any checkbox is checked
  const anyCheckboxChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
  if (anyCheckboxChecked) {
    deleteSelectedButton.style.display = "block"; // Show the "Delete Selected" button
  } else {
    deleteSelectedButton.style.display = "none"; // Hide the "Delete Selected" button
  }
});

// Add "Delete Selected" button with initial display set to "none"
const deleteSelectedButton = document.createElement("button");
deleteSelectedButton.textContent = "Delete Selected";
deleteSelectedButton.id = "delete-selected";
deleteSelectedButton.style.display = "none"; // Initially hidden
document.body.appendChild(deleteSelectedButton);

// Add event listener to the "Delete Selected" button
deleteSelectedButton.addEventListener("click", () => {
  const taskItems = taskList.getElementsByClassName("task");
  const selectedTasks = Array.from(taskItems).filter((taskItem) => {
    return taskItem.querySelector(".task-checkbox").checked;
  });
  selectedTasks.forEach((taskItem) => {
    taskList.removeChild(taskItem);
  });

  // Hide the "Delete Selected" button after performing the deletion
  deleteSelectedButton.style.display = "none";

  // Hide the checkboxes after deletion
  const taskItemsAfterDeletion = taskList.getElementsByClassName("task");
  const checkboxesAfterDeletion = Array.from(taskItemsAfterDeletion).map((taskItem) => {
    return taskItem.querySelector(".task-checkbox");
  });
  checkboxesAfterDeletion.forEach((checkbox) => {
    checkbox.style.visibility = "hidden"; // Hide the checkboxes
  });
});
