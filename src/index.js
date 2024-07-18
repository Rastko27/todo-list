// Should have title, description, dueDate and priority
// Title and description simple text
// dueDate formatting using date-fns
// Write priority function which will sort the item order based on priority
// Write a function that controls DOM, should clear and rewrite all items once a new one is added or an existing one is deleted
// Each one should have a delete button

import './style.css';

window.projectList = [];

class Project {
    constructor(name) {
        this.name = name;
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
}

class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

// Project dialog open
const addProject = document.getElementById('add-project');
const projectDialog = document.getElementById('dialog-project');
addProject.addEventListener("click", () => {
    projectDialog.style.display = "flex";
    projectDialog.showModal();
});
// Project dialog close
const projectDialogClose = document.getElementById('dialog-project-close');
projectDialogClose.addEventListener("click", () => {
    projectDialog.close();
    projectDialog.style.display = "none";
});

// Add project
const projectForm = document.getElementById('project-form');
const projectTitleInput = document.getElementById('title-input-project');

projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let newProject = new Project(projectTitleInput.value);
    console.log("New project added: ", newProject);
    projectList.push(newProject);
    console.log("New project pushed, project list: ", projectList);
});

// When a project is created add a tab to sidebar and make clicking on it show the project similar to restaurant
// On every project tab have add item button with different ID and each add item button corresponds to the project it is in and adds the item to the project it is in