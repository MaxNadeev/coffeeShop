import data from "./optionButtons.html?raw";
import "./optionButtons.scss";
import { createElementByHTML } from "#core/core.js";


function createOptionButtons(product, options, group) {
    var buttonsGroupElement = document.createElement('div');
    buttonsGroupElement.classList.add('option-button-group');

    for (let i in options.values) {
        var value = options.values[i];

        var button = createElementByHTML(data);

        var iconElement = button.querySelector(".icon");
        iconElement.src = `../../src/assets/icons/base-option-btn/${value}.png`;

        if (i == options.selected){
            button.classList.add('selected');
        }

        button.addEventListener("click", (e) => {
            var optionChangedEvent = new CustomEvent('optionChanged', {
                detail: { 
                    productId: product.id,
                    optionsGroup: group,
                    selected: Number(i)
                },
                bubbles: true
            });
            button.dispatchEvent(optionChangedEvent);
        });

        buttonsGroupElement.appendChild(button);
    }
    
    return buttonsGroupElement;
}

export { createOptionButtons };