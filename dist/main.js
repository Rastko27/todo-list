/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://todo-list/./src/style.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n\n\nwindow.projectList = [];\nlet currentProjectIndex = null;\n\nclass Project {\n    constructor(name) {\n        this.name = name;\n        this.items = [];\n    }\n    addItem(item) {\n        this.items.push(item);\n        this.sortItems();\n    }\n    priorityToString(priorityValue) {\n        switch (priorityValue) {\n            case 1:\n                return \"HIGH\";\n            case 2:\n                return \"MEDIUM\";\n            case 3:\n                return \"LOW\";\n            default:\n                return \"UNKNOWN\";\n        }\n    }\n    sortItems(project) {\n        this.items.sort((item1, item2) => item1.priority - item2.priority);\n    }\n}\n\nclass Item {\n    constructor(name, description, priority) {\n        this.name = name;\n        this.description = description;\n        this.priority = parseInt(priority);\n    }\n}\n\nconst projectDialog = document.getElementById('dialog-project');\nconst itemDialog = document.getElementById('dialog-item');\nconst buttonsWrapper = document.getElementById('buttons-wrapper');\n\n// Project dialog close\nconst projectDialogClose = document.getElementById('dialog-project-close');\nprojectDialogClose.addEventListener(\"click\", () => {\n    projectDialog.close();\n    projectDialog.style.display = \"none\";\n});\n\n// Item dialog close\nconst itemDialogClose = document.getElementById('dialog-item-close');\nitemDialogClose.addEventListener(\"click\", () => {\n    itemDialog.close();\n    itemDialog.style.display = \"none\";\n});\n\n// DOM Manipulation\nconst DOM = (function() {\n\n    // Button renders\n\n    // Render Add Project Button\n    function renderAddProject(buttonsWrapper) {\n        const addProjectButton = document.createElement('button');\n        addProjectButton.textContent = \"Add Project\";\n        addProjectButton.classList.add(\"cta\");\n        addProjectButton.id = \"add-project\";\n        buttonsWrapper.appendChild(addProjectButton);\n\n        addProjectButton.addEventListener(\"click\", () => {\n            // Project dialog open\n            projectDialog.style.display = \"flex\";\n            projectDialog.showModal();\n        });\n    }\n\n    // Render Add Item Button\n    function renderAddItem(buttonsWrapper) {\n        const addItemButton = document.createElement('button');\n        addItemButton.textContent = \"Add Item\";\n        addItemButton.classList.add(\"cta\");\n        addItemButton.id = \"add-item\";\n        buttonsWrapper.appendChild(addItemButton);\n\n        addItemButton.addEventListener(\"click\", () => {\n            // Item dialog open\n            itemDialog.style.display = \"flex\";\n            itemDialog.showModal();\n        });\n    }\n\n    // Switch Project\n\n    function switchProject(index) {\n        currentProjectIndex = index;\n        const projectObject = projectList[index];\n\n        const projectHeading = document.getElementById('project-heading');\n        projectHeading.textContent = projectObject.name;\n\n        buttonsWrapper.innerHTML = '';\n        renderAddProject(buttonsWrapper);\n        \n        renderItems(projectObject);\n\n        renderAddItem(buttonsWrapper);\n    }\n\n    // Append Project to DOM\n\n    function addToSidebar(project, index) {\n        const sidebar = document.getElementById('sidebar');\n        let newProject = document.createElement('div');\n        newProject.textContent = project.name;\n        newProject.id = \"project-\" + index;\n        newProject.classList.add(\"sidebar-project\");\n        sidebar.appendChild(newProject);\n\n        newProject.addEventListener(\"click\", () => {\n            switchProject(index);\n        });\n    }\n\n    // Priority color check\n\n    function priorityCheck(itemPriority) {\n        switch (itemPriority) {\n            case 3:\n                return \"#008000\";\n            case 2:\n                return \"#FFD700\";\n            case 1:\n                return \"#A50021\";\n            default:\n                return \"#000000\";\n        }\n    }\n\n    // Render Items\n\n    function renderItems(project) {\n        const items = document.getElementById('items');\n        items.innerHTML = '';\n        for(let i = 0; i < project.items.length; i++) {\n            let item = document.createElement('div');\n            let itemLeft = document.createElement('div');\n            let itemTitle = document.createElement('div');\n            let itemDescription = document.createElement('div');\n            let itemRight = document.createElement('div');\n            let priorityTag = document.createElement('div');\n            item.classList.add(\"item\");\n            itemLeft.classList.add(\"item-left\");\n            itemRight.classList.add(\"item-right\");\n            itemTitle.textContent = project.items[i].name;\n            itemTitle.classList.add(\"item-title\");\n            itemDescription.textContent = project.items[i].description;\n            priorityTag.textContent = project.priorityToString(project.items[i].priority);\n            priorityTag.classList.add(\"item-priority\");\n            priorityTag.style.backgroundColor = priorityCheck(project.items[i].priority);\n            itemLeft.appendChild(itemTitle);\n            itemLeft.appendChild(itemDescription);\n            itemRight.appendChild(priorityTag);\n            item.appendChild(itemLeft);\n            item.appendChild(itemRight);\n            items.appendChild(item);\n        }\n    }\n\n    // Render item buttons\n\n    return { addToSidebar, renderAddProject, renderItems };\n})();\n\n// Project Form Submit\nconst projectForm = document.getElementById('project-form');\nconst projectTitleInput = document.getElementById('title-input-project');\n\nprojectForm.addEventListener(\"submit\", (event) => {\n    event.preventDefault();\n\n    let newProject = new Project(projectTitleInput.value.toUpperCase());\n    projectList.push(newProject);\n    let index = projectList.length - 1;\n\n    DOM.addToSidebar(newProject, index);\n});\n\n// Item Form Submit\nconst itemForm = document.getElementById('item-form');\nconst itemTitleInput = document.getElementById('title-input-item');\nconst itemDescriptionInput = document.getElementById('description-input');\n\nitemForm.addEventListener(\"submit\", (event) => {\n    event.preventDefault();\n\n    // Get priority\n\n    let priority = '';\n\n    const radioButtons = document.querySelectorAll('input[name=\"priority-input\"]');\n    \n    radioButtons.forEach((radio) => {\n        if(radio.checked) {\n            priority = radio.value;\n        }\n    });\n\n    let newItem = new Item(itemTitleInput.value, itemDescriptionInput.value, priority);\n\n    projectList[currentProjectIndex].addItem(newItem);\n\n    DOM.renderItems(projectList[currentProjectIndex]);\n})\n\nDOM.renderAddProject(buttonsWrapper);\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;