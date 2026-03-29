import data from "./content.html?raw";
import "./content.scss";
import { createElementByHTML } from "#core/core.js";
import { createCard } from "#components/card/card.js"
import { searchWidget } from "#components/searchWidget/searchWidget.js";
import { createCategoryItem } from "#components/categoryItem/categoryItem.js";
import { useStore } from "#store/store.js";

function createContent() {
    var store = useStore();
    var pricelist = store.pricelist;

    var mainElement = createElementByHTML(data);
    var itemsContainer = document.createElement('div');
    itemsContainer.className = 'items';
    mainElement.appendChild(itemsContainer);

    /** SEARCH */
    var titleContainerElement = mainElement.querySelector(".titleContainer");
    titleContainerElement.appendChild(searchWidget);

    var titleElement = titleContainerElement.querySelector('h1');
    searchWidget.addEventListener('focusin', () => {
        titleElement.style.display = 'none';
    });

    searchWidget.addEventListener('focusout', () => {
        titleElement.style.display = 'block';
    });

    /** CATEGORIES */
    var categoryContainerElement = mainElement.querySelector(".categoriesContainer");
    var all = {
        id: 0,
        image: "#",
        thubnail: "#",
        title: "Все",
        description: "Описание всех напитков",
        resultsTitle: "Все напитки"
    }

    function updateCategories(id = 0) {
        categoryContainerElement.replaceChildren();
        categoryContainerElement.removeEventListener('categoryChanged', handleCategoryChanged);

        all.selected = (id == 0) ? true : false;
        categoryContainerElement.appendChild(createCategoryItem(all));

        var usedCategoryIds = [...new Set(pricelist.products.map(product => product.category))];
        
        for (let category of pricelist.categories) {
            var inStock = usedCategoryIds.includes(category.id);
            var selected = category.id === id;

            category.inStock = inStock ? true : false;
            category.selected = selected ? true : false;

            categoryContainerElement.appendChild(createCategoryItem(category));
            categoryContainerElement.addEventListener('categoryChanged', handleCategoryChanged);
        }
    }

    function handleCategoryChanged(e) {
        var id = e.detail.id;
        console.log('id', id)
        updateCategories(id);
        updateResultsTitle(id);
        updateCards(id);
        e.stopPropagation();
    }

    /** PRODUCT CARDS */
    function updateCards(categoryId = 0) {
        itemsContainer.replaceChildren();
        var quantityCounter = 0;

        for (let product of pricelist.products) {
            if (categoryId == 0 || product.category == categoryId) {
                itemsContainer.appendChild(createCard(product));
                quantityCounter++;
            }
        }

        // console.log('categoryId', categoryId)
        // updateResultsTitle(categoryId);

        var quantityValueElement = mainElement.querySelector('.quantityValue');
        quantityValueElement.innerText = quantityCounter;
    }

    function updateResultsTitle(id = 0){
        var resultsTitleElement = mainElement.querySelector('.resultsTitle');
        var resultsTitle = id == 0 ? all.resultsTitle : pricelist.categories[id - 1].resultsTitle        
        resultsTitleElement.innerText = resultsTitle;
    }

    updateCategories();
    updateResultsTitle()
    updateCards();

    return mainElement;
}

export { createContent }