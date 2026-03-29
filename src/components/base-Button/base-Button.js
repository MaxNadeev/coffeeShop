import data from "./base-Button.html?raw";
import "./base-Button.scss";
import { createElementByHTML } from "#core/core.js";

function createButton (product) {
    var btnAddElement = createElementByHTML(data);
    btnAddElement.querySelector(".base-Button"); // Поиск кнопки добавления внутри карточки
    btnAddElement.addEventListener("click", (e) => { // Добавление обработчика клика на кнопку
        e.stopPropagation(); // Остановка всплытия события, чтобы клик не срабатывал на родительских элементах
        var buttonClickEvent = new CustomEvent('productAdd', {
                detail: { 
                    product: product
                },
                bubbles: true
            });
            btnAddElement.dispatchEvent(buttonClickEvent);
    });

    return btnAddElement;
}

export { createButton };