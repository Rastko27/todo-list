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
        this.sortItems();
    }
    priorityToString(priorityValue) {
        switch (priorityValue) {
            case 1:
                return "HIGH";
            case 2:
                return "MEDIUM";
            case 3:
                return "LOW";
            default:
                return "UNKNOWN";
        }
    }
    sortItems(project) {
        this.items.sort((item1, item2) => item1.priority - item2.priority);
    }
}

class Item {
    constructor(name, description, priority) {
        this.name = name;
        this.description = description;
        this.priority = parseInt(priority);
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
        sidebar.appendChild(newProject);

        newProject.addEventListener("click", () => {
            switchProject(index);
        });
    }

    // Priority color check

    function priorityCheck(itemPriority) {
        switch (itemPriority) {
            case 3:
                return "#008000";
            case 2:
                return "#FFD700";
            case 1:
                return "#A50021";
            default:
                return "#000000";
        }
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
            let priorityTag = document.createElement('div');
            item.classList.add("item");
            itemLeft.classList.add("item-left");
            itemRight.classList.add("item-right");
            itemTitle.textContent = project.items[i].name;
            itemTitle.classList.add("item-title");
            itemDescription.textContent = project.items[i].description;
            priorityTag.textContent = project.priorityToString(project.items[i].priority);
            priorityTag.classList.add("item-priority");
            priorityTag.style.backgroundColor = priorityCheck(project.items[i].priority);
            itemLeft.appendChild(itemTitle);
            itemLeft.appendChild(itemDescription);
            itemRight.appendChild(priorityTag);
            item.appendChild(itemLeft);
            item.appendChild(itemRight);
            items.appendChild(item);
        }
    }

    // Render item buttons

    return { addToSidebar, renderAddProject, renderItems };
})();

// Project Form Submit
const projectForm = document.getElementById('project-form');
const projectTitleInput = document.getElementById('title-input-project');

projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let newProject = new Project(projectTitleInput.value.toUpperCase());
    projectList.push(newProject);
    let index = projectList.length - 1;

    DOM.addToSidebar(newProject, index);
});

// Item Form Submit
const itemForm = document.getElementById('item-form');
const itemTitleInput = document.getElementById('title-input-item');
const itemDescriptionInput = document.getElementById('description-input');

itemForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get priority

    let priority = '';

    const radioButtons = document.querySelectorAll('input[name="priority-input"]');
    
    radioButtons.forEach((radio) => {
        if(radio.checked) {
            priority = radio.value;
        }
    });

    let newItem = new Item(itemTitleInput.value, itemDescriptionInput.value, priority);

    projectList[currentProjectIndex].addItem(newItem);

    DOM.renderItems(projectList[currentProjectIndex]);
})

DOM.renderAddProject(buttonsWrapper);