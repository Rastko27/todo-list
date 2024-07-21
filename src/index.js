import './style.css';
import { format, parseISO} from 'date-fns';

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
    constructor(name, description, priority, dueDate) {
        this.name = name;
        this.description = description;
        this.priority = parseInt(priority);
        this.dueDate = dueDate;
    }
}

// Project dialog selector
const projectDialog = document.getElementById('dialog-project');

// Item dialog selector
const itemDialog = document.getElementById('dialog-item');

// Buttons wrapper selector
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

    // Item expand

    function itemExpand(item) {
        item.classList.toggle("expanded");
        console.log("Toggled expand on item: " + item);
    }

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
            let itemWrapperTop = document.createElement('div');
            let itemDescription = document.createElement('div');
            let itemLeft = document.createElement('div');
            let itemTitle = document.createElement('div');
            let itemRight = document.createElement('div');
            let priorityTag = document.createElement('div');
            let itemDueDate = document.createElement('div');
            let itemExpandButton = document.createElement('button');

            item.classList.add("item");
            itemWrapperTop.classList.add('item-wrapper-top');
            itemLeft.classList.add("item-left");
            itemRight.classList.add("item-right");

            itemTitle.textContent = project.items[i].name;
            itemTitle.classList.add("item-title");

            priorityTag.textContent = project.priorityToString(project.items[i].priority);
            priorityTag.classList.add("item-priority");
            priorityTag.style.backgroundColor = priorityCheck(project.items[i].priority);

            const dueDate = parseISO(project.items[i].dueDate);
            const formattedDueDate = format(dueDate, 'MMM dd, yyyy');
            itemDueDate.textContent = "Due: " + formattedDueDate;
            itemDueDate.classList.add("item-due-date");

            itemExpandButton.innerHTML = "<img src='images/down.png' alt=''>";
            itemExpandButton.classList.add("item-expand-button");

            itemDescription.textContent = project.items[i].description;
            itemDescription.classList.add("item-description");

            // Item expand event listener

            itemExpandButton.addEventListener("click", () => {
                itemExpand(item);
            });

            itemLeft.appendChild(itemTitle);
            itemRight.appendChild(itemDueDate);
            itemRight.appendChild(priorityTag);
            itemRight.appendChild(itemExpandButton);

            itemWrapperTop.appendChild(itemLeft);
            itemWrapperTop.appendChild(itemRight);

            item.appendChild(itemWrapperTop);
            item.appendChild(itemDescription);

            items.appendChild(item);
        }
    }

    // Render item buttons

    return { addToSidebar, renderAddProject, renderItems };
})();

// Dialog Methods

const dialogMethods = (function() {
    // Project Form Submit
    const projectForm = document.getElementById('project-form');
    const projectTitleInput = document.getElementById('title-input-project');

    const handleProjectFormSubmit = (event) => {
        event.preventDefault();

        // Check if form is filled
        if(projectTitleInput.value !== '') {
            let newProject = new Project(projectTitleInput.value.toUpperCase());
            projectList.push(newProject);
            let index = projectList.length - 1;

            DOM.addToSidebar(newProject, index);
        }
        else {
            alert("Please enter project title");
        }
    };

    projectForm.addEventListener("submit", handleProjectFormSubmit);

    // Item Form Submit
    const itemForm = document.getElementById('item-form');
    const itemTitleInput = document.getElementById('title-input-item');
    const itemDescriptionInput = document.getElementById('description-input');
    const itemDueDate = document.getElementById('due-date-input');

    const handleItemFormSubmit = (event) => {
        event.preventDefault();

        // Get priority
        let priority = '';

        const radioButtons = document.querySelectorAll('input[name="priority-input"]');
        
        radioButtons.forEach((radio) => {
            if(radio.checked) {
                priority = radio.value;
            }
        });

        // Check if everything is filled out
        if(itemTitleInput.value !== '' && itemDescriptionInput.value && priority !== '' && itemDueDate.value !== '') {

            let newItem = new Item(itemTitleInput.value, itemDescriptionInput.value, priority, itemDueDate.value);

            projectList[currentProjectIndex].addItem(newItem);

        }
        else {
            alert("Please fill out all the information.")
        }

        DOM.renderItems(projectList[currentProjectIndex]);
    };

    itemForm.addEventListener("submit", handleItemFormSubmit);

    return { handleProjectFormSubmit, handleItemFormSubmit };
})();

// Initial render

DOM.renderAddProject(buttonsWrapper);