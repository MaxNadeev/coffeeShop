import data from "./searchWidget.html?raw";
import "./searchWidget.scss";
import { createElementByHTML } from "#core/core.js";

import iconSearch  from '#assets/icons/search.svg?raw';
import iconClose from '#assets/icons/close.svg?raw';

var searchWidget = createElementByHTML(data);
var buttonElement = searchWidget.querySelector('.searchButton');
var inputElement = searchWidget.querySelector('.searchInput');

document.addEventListener('DOMContentLoaded', () => {
    buttonElement.innerHTML = iconSearch;
});

inputElement.addEventListener('focus', ({ target }) => {
    console.log(target);
    if (!target.value.trim()) {
        buttonElement.innerHTML = iconClose;
    }
});

inputElement.addEventListener('blur', () => {
    buttonElement.innerHTML = iconSearch;
});

inputElement.addEventListener('keyup', ({ target }) => {
    if (!target.value.trim()) {
        buttonElement.innerHTML = iconClose;
    } else {
        buttonElement.innerHTML = iconSearch;
    }
});

export { searchWidget }