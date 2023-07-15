"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebpack_to_do_list"] = self["webpackChunkwebpack_to_do_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _3dotd_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3dotd.png */ \"./src/3dotd.png\");\n/* harmony import */ var _enter_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enter.png */ \"./src/enter.png\");\n/* harmony import */ var _recycle_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recycle.png */ \"./src/recycle.png\");\n// Set an array of to-do tasks\n\n\n\nconst tasks = [\n  { description: \"Task 1\", completed: false, index: 1 },\n  { description: \"Task 2\", completed: true, index: 2 },\n  { description: \"Task 3\", completed: false, index: 3 },\n];\n\n// Function to render the tasks\nfunction renderTasks() {\n  const todoList = document.getElementById(\"todo-list\");\n  todoList.innerHTML = \"\";\n\n  tasks.sort((a, b) => a.index - b.index);\n\n  for (const task of tasks) {\n    const listItem = document.createElement(\"li\");\n\n    const taskText = document.createElement(\"span\");\n    taskText.textContent = task.description;\n    listItem.appendChild(taskText);\n\n    const icon = document.createElement(\"img\");\n    icon.src = \"icon_dots\"; // Replace with the path to your icon image\n    icon.alt = \"Check Icon\";\n    icon.classList.add(\"task-icon\");\n    listItem.appendChild(icon);\n\n    if (task.completed) {\n      listItem.classList.add(\"completed\");\n    }\n\n    todoList.appendChild(listItem);\n  }\n}\n\n// Call the renderTasks function on page load\ndocument.addEventListener(\"DOMContentLoaded\", renderTasks);\n\n\n//# sourceURL=webpack://webpack-to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/3dotd.png":
/*!***********************!*\
  !*** ./src/3dotd.png ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"17decd1170c3067d4a78.png\";\n\n//# sourceURL=webpack://webpack-to-do-list/./src/3dotd.png?");

/***/ }),

/***/ "./src/enter.png":
/*!***********************!*\
  !*** ./src/enter.png ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"7e0086f04889a92d616c.png\";\n\n//# sourceURL=webpack://webpack-to-do-list/./src/enter.png?");

/***/ }),

/***/ "./src/recycle.png":
/*!*************************!*\
  !*** ./src/recycle.png ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"7e509053833305aa6a3d.png\";\n\n//# sourceURL=webpack://webpack-to-do-list/./src/recycle.png?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);