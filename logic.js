document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("add-task");
  const taskInput = document.getElementById("task");
  const descriptionInput = document.getElementById("description");
  const statusInput = document.getElementById("status");
  const deadlineInput = document.getElementById("deadline");
  const taskList = document.getElementById("task-list");
  const deleteSelectedButton = document.getElementById("delete-selected");
  deleteSelectedButton.style.display = "none"; // Initially hide the "Delete Selected" button

  addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const description = descriptionInput.value;
    const status = statusInput.value;
    const deadline = deadlineInput.value;
    if (task.trim() === "" || deadline === "") {
      alert("Please enter a task and select a deadline.");
      return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
      <input type="checkbox" class="task-checkbox" style="display: none;">
      <p>Task: ${task}</p>
      <p>Description: ${description}</p>
      <p>Status: ${status}</p>
      <p>Deadline: ${deadline}</p>
      <button class="mark-done">Mark Done</button>
      <i class="fas fa-edit edit-task"></i>
      <i class="fas fa-trash-alt delete-task"></i>
    `;

    taskList.appendChild(taskItem);

    taskInput.value = "";
    descriptionInput.value = "";
    statusInput.value = "Begin";
    deadlineInput.value = "";
  });

  taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
      const taskItem = event.target.parentElement;
      taskItem.style.backgroundColor = "#037592";
      event.target.disabled = true;
    }

    if (event.target.classList.contains("edit-task")) {
      const taskItem = event.target.parentElement;
      const taskText = taskItem.querySelector('p:nth-of-type(1)').textContent.replace('Task: ', '');
      const descriptionText = taskItem.querySelector('p:nth-of-type(2)').textContent.replace('Description: ', '');
      const statusText = taskItem.querySelector('p:nth-of-type(3)').textContent.replace('Status: ', '');
      const deadlineText = taskItem.querySelector('p:nth-of-type(4)').textContent.replace('Deadline: ', '');

      taskInput.value = taskText;
      descriptionInput.value = descriptionText;
      statusInput.value = statusText;
      deadlineInput.value = deadlineText;

      const updateButton = document.createElement("button");
      updateButton.innerText = "Update";
      updateButton.classList.add("update-task");
      taskItem.appendChild(updateButton);

      // Disable other edit icons while in edit mode
      const editIcons = taskList.querySelectorAll('.edit-task');
      editIcons.forEach((icon) => {
        icon.style.pointerEvents = "none";
      });

      updateButton.addEventListener("click", () => {
        const updatedTask = taskInput.value;
        const updatedDescription = descriptionInput.value;
        const updatedStatus = statusInput.value;
        const updatedDeadline = deadlineInput.value;
        
        // Update task details
        taskItem.querySelector('p:nth-of-type(1)').textContent = `Task: ${updatedTask}`;
        taskItem.querySelector('p:nth-of-type(2)').textContent = `Description: ${updatedDescription}`;
        taskItem.querySelector('p:nth-of-type(3)').textContent = `Status: ${updatedStatus}`;
        taskItem.querySelector('p:nth-of-type(4)').textContent = `Deadline: ${updatedDeadline}`;

        // Remove update button and enable edit icons again
        updateButton.remove();
        editIcons.forEach((icon) => {
          icon.style.pointerEvents = "auto";
        });

        // Clear input fields after update
        taskInput.value = "";
        descriptionInput.value = "";
        statusInput.value = "Begin";
        deadlineInput.value = "";
      });
    }

    if (event.target.classList.contains("delete-task")) {
      const checkboxes = taskList.querySelectorAll('.task-checkbox');
      checkboxes.forEach((checkbox) => {
        checkbox.style.display = "block"; // Show the checkboxes
      });
    }

    if (event.target.classList.contains("task-checkbox")) {
      const checkedTasks = taskList.querySelectorAll('.task input[type="checkbox"]:checked');
      if (checkedTasks.length > 0) {
        deleteSelectedButton.style.display = "block"; // Display the "Delete Selected" button
      } else {
        deleteSelectedButton.style.display = "none"; // Hide the "Delete Selected" button
      }
    }
  });

  deleteSelectedButton.addEventListener("click", () => {
    const selectedTasks = taskList.querySelectorAll('.task input[type="checkbox"]:checked');
    selectedTasks.forEach((task) => {
      task.parentElement.remove();
    });

    // Hide checkboxes and "Delete Selected" button after deletion
    const checkboxes = taskList.querySelectorAll('.task-checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.style.display = "none";
    });
    deleteSelectedButton.style.display = "none";
  });
});
