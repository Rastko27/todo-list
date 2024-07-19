import './style.css';

window.projectList = [];
let currentProjectIndex = null;

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
    constructor(name, description, priority) {
        this.name = name;
        this.description = description;
        this.priority = priority;
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
    function renderAddItem(buttonsWrapper) {
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
        currentProjectIndex = index;
        const projectObject = projectList[index];

        const projectHeading = document.getElementById('project-heading');
        projectHeading.textContent = projectObject.name;

        buttonsWrapper.innerHTML = '';
        renderAddProject(buttonsWrapper);
        
        renderItems(projectObject);

        renderAddItem(buttonsWrapper);
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

    // Render Items

    function renderItems(project) {
        const items = document.getElementById('items');
        items.innerHTML = '';
        for(let i = 0; i < project.items.length; i++) {
            let item = document.createElement('div');
            let itemLeft = document.createElement('div');
            let itemTitle = document.createElement('div');
            let itemDescription = document.createElement('div');
            let itemRight = document.createElement('div');
            item.classList.add("item");
            itemLeft.classList.add("item-left");
            itemRight.classList.add("item-right");
            itemTitle.textContent = project.items[i].name;
            itemTitle.classList.add("item-title");
            itemDescription.textContent = project.items[i].description;
            itemLeft.appendChild(itemTitle);
            itemLeft.appendChild(itemDescription);
            item.appendChild(itemLeft);
            item.appendChild(itemRight);
            items.appendChild(item);
        }
    }

    // Render item buttons

    return { addToSidebar, renderAddProject, renderItems };
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

// Add item
const itemForm = document.getElementById('item-form');
const itemTitleInput = document.getElementById('title-input-item');
const itemDescriptionInput = document.getElementById('description-input');

itemForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let newItem = new Item(itemTitleInput.value, itemDescriptionInput.value);
    console.log("New item added: ", newItem);

    projectList[currentProjectIndex].items.push(newItem);
    console.log("New item pushed, item list: ", projectList[currentProjectIndex].items);

    DOM.renderItems(projectList[currentProjectIndex]);
})

DOM.renderAddProject(buttonsWrapper);