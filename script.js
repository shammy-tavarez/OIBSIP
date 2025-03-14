function addTask() {
    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();
    let taskList = document.getElementById("taskList");

    if (title === "" || description === "") {
        alert("Please fill out both fields.");
        return;
    }

    let row = taskList.insertRow();
    row.innerHTML = `
        <td>${title}</td>
        <td>${description}</td>
        <td><button class="delete-btn" onclick="deleteTask(this)">X</button></td>
    `;

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
}