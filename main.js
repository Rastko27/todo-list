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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n// Should have title, description, dueDate and priority\n// Title and description simple text\n// dueDate formatting using date-fns\n// Write priority function which will sort the item order based on priority\n// Write a function that controls DOM, should clear and rewrite all items once a new one is added or an existing one is deleted\n// Each one should have a delete button\n\n\n\nwindow.projectList = [];\n\nclass Project {\n    constructor(name) {\n        this.name = name;\n        this.items = [];\n    }\n    addItem(item) {\n        this.items.push(item);\n    }\n}\n\nclass Item {\n    constructor(name, description) {\n        this.name = name;\n        this.description = description;\n    }\n}\n\n// Project dialog open\nconst addProject = document.getElementById('add-project');\nconst projectDialog = document.getElementById('dialog-project');\naddProject.addEventListener(\"click\", () => {\n    projectDialog.style.display = \"flex\";\n    projectDialog.showModal();\n});\n// Project dialog close\nconst projectDialogClose = document.getElementById('dialog-project-close');\nprojectDialogClose.addEventListener(\"click\", () => {\n    projectDialog.close();\n    projectDialog.style.display = \"none\";\n});\n\n// Add project\nconst projectForm = document.getElementById('project-form');\nconst projectTitleInput = document.getElementById('title-input-project');\n\nprojectForm.addEventListener(\"submit\", (event) => {\n    event.preventDefault();\n\n    let newProject = new Project(projectTitleInput.value);\n    console.log(\"New project added: \", newProject);\n    projectList.push(newProject);\n    console.log(\"New project pushed, project list: \", projectList);\n});\n\n// When a project is created add a tab to sidebar and make clicking on it show the project similar to restaurant\n// On every project tab have add item button with different ID and each add item button corresponds to the project it is in and adds the item to the project it is in\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

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