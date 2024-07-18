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

// DOM Manipulation
const DOM = (function() {

    // Append Project to DOM

    function addToSidebar(project, index) {
        const sidebar = document.getElementById('sidebar');
        let newProject = document.createElement('div');
        newProject.textContent = project.name;
        newProject.id = "project-" + index;
        newProject.classList.add("sidebar-project");
        console.log(newProject);
        sidebar.appendChild(newProject);
        console.log("Added to sidebar");
    }

    return { addToSidebar };
})();

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

    let newProject = new Project(projectTitleInput.value.toUpperCase());
    console.log("New project added: ", newProject);
    projectList.push(newProject);
    console.log("New project pushed, project list: ", projectList);
    let index = projectList.length - 1;

    DOM.addToSidebar(newProject, index);
});