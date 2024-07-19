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

const projectDialog = document.getElementById('dialog-project');
const itemDialog = document.getElementById('dialog-item');
const buttonsWrapper = document.getElementById('buttons-wrapper');

// Project dialog close
const projectDialogClose = document.getElementById('dialog-project-close');
projectDialogClose.addEventListener("click", () => {
    projectDialog.close();
    projectDialog.style.display = "none";
});

// Item dialog close
const itemDialogClose = document.getElementById('dialog-item-close');
itemDialogClose.addEventListener("click", () => {
    itemDialog.close();
    itemDialog.style.display = "none";
});

// DOM Manipulation
const DOM = (function() {

    // Button renders

    // Render Add Project Button
    function renderAddProject(buttonsWrapper) {
        const addProjectButton = document.createElement('button');
        addProjectButton.textContent = "Add Project";
        addProjectButton.classList.add("cta");
        addProjectButton.id = "add-project";
        buttonsWrapper.appendChild(addProjectButton);

        addProjectButton.addEventListener("click", () => {
            // Project dialog open
            projectDialog.style.display = "flex";
            projectDialog.showModal();
        });
    }

    // Render Add Item Button
    function renderItemProject(buttonsWrapper) {
        const addItemButton = document.createElement('button');
        addItemButton.textContent = "Add Item";
        addItemButton.classList.add("cta");
        addItemButton.id = "add-item";
        buttonsWrapper.appendChild(addItemButton);

        addItemButton.addEventListener("click", () => {
            // Item dialog open
            itemDialog.style.display = "flex";
            itemDialog.showModal();
        });
    }

    // Switch Project

    function switchProject(index) {
        const projectObject = projectList[index];

        const projectHeading = document.getElementById('project-heading');
        projectHeading.textContent = '';
        projectHeading.textContent = projectObject.name;

        const items = document.getElementById('items');
        items.innerHTML = '';

        buttonsWrapper.innerHTML = '';
        renderAddProject(buttonsWrapper);

        for(let i = 0; i < projectObject.items.length; i++) {
            let item = document.createElement('div');
            let itemLeft = document.createElement('div');
            let itemTitle = document.createElement('div');
            let itemDescription = document.createElement('div');
            let itemRight = document.createElement('div');
            item.classList.add("item");
            itemLeft.classList.add("item-left");
            itemRight.classList.add("item-right");
            itemTitle.textContent = projectObject.items[i].name;
            itemDescription.textContent = projectObject.items[i].description;
            itemLeft.appendChild(itemTitle);
            itemLeft.appendChild(itemDescription);
            item.appendChild(itemLeft);
            item.appendChild(itemRight);
            items.appendChild(item);
        }

        renderItemProject(buttonsWrapper);
    }

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

        newProject.addEventListener("click", () => {
            switchProject(index);
        });
    }

    return { addToSidebar, renderAddProject };
})();

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

DOM.renderAddProject(buttonsWrapper);