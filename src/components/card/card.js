import data from "./card.html?raw";
import "./card.scss";
import { createElementByHTML } from "#core/core.js";
import { createOption } from "#components/option/option.js";
import { createButton } from "#components/base-Button/base-Button.js";
import { useStore } from "#store/store.js";
import { updateCart } from "#components/cartWidget/cartWidget.js";

var store = useStore();

function createCard(product) {
    var card = createElementByHTML(data);

    var titleElement = card.querySelector(".title");
    titleElement.innerText = product.title; 

    var imageElement = card.querySelector(".cardImage");
    imageElement.setAttribute("src", `src/assets/item_photos/${product.image}`); 

    var descriptionElement = card.querySelector(".description");
    descriptionElement.innerText = product.description;

    var priceElement = card.querySelector(".price-value");
    priceElement.innerText = product.price;


    function updateOptions() {
        if (!product.optionsGroup) return;

        var optionsGroupElement = card.querySelector('.optionsGroup');
        optionsGroupElement.replaceChildren();
        optionsGroupElement.removeEventListener('optionChanged', handleOptionChanged);

        for (let group in product.optionsGroup) {
            var currentGroup = product.optionsGroup[group];

            if (currentGroup.basic) {
                optionsGroupElement.appendChild(createOption(product, group));
            }
            
            var associated = currentGroup.options?.associated;
            if (associated && associated.length > 0) {
                var selected = currentGroup.options.selected;
                var associatedGroup = associated[selected];
                optionsGroupElement.appendChild(createOption(product, associatedGroup));
            }
        }

        optionsGroupElement.addEventListener('optionChanged', handleOptionChanged);
    }

    function handleOptionChanged(e) {
        store.selectOption(e.detail);
        updateOptions();
        e.stopPropagation();
    }

    updateOptions();

    var baseAddButtonElement = createButton(product);
    card.appendChild(baseAddButtonElement);

    baseAddButtonElement.addEventListener('productAdd', (e) => {
        var product = e.detail.product;
        store.add(product);
        updateCart();
        
    });

    return card
}

export { createCard }