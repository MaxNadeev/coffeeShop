import data from "./categoryItem.html?raw";
import "./categoryItem.scss";
import { createElementByHTML } from "#core/core.js";


function createCategoryItem (category) {
    var categoryElement = createElementByHTML(data);
    var titleElement = categoryElement.querySelector(".categoryTitle");
    titleElement.innerText = category.title;

    var thubnailElement = categoryElement.querySelector('.categoryThubnail');
    thubnailElement.setAttribute("src", category.thubnail);

    if (!category.inStock && !category.id == 0) {
        categoryElement.classList.add('outOfStock');
    }

    if (category.selected) {
        categoryElement.classList.add('selected');
    }

    categoryElement.addEventListener("click", (e) => { 
        var categoryChangedEvent = new CustomEvent('categoryChanged', {
                detail: { 
                    id: category.id
                },
                bubbles: true
            });
        categoryElement.dispatchEvent(categoryChangedEvent);
    });

    return categoryElement;
}

export { createCategoryItem };