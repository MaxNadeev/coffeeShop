import data from "./option.html?raw";
import "./option.scss";
import { createElementByHTML } from "#core/core.js";
import { createOptionButtons } from "#components/optionButtons/optionButtons.js";


function createOption (product, group) {
    var optionContainer = createElementByHTML(data);
    var optionsGroup = product.optionsGroup?.[group];

    if (!optionsGroup) {
        return null;
    }

    var optionTitle = optionContainer.querySelector(".option-name");
    optionTitle.innerText = optionsGroup.name;

    var buttonsGroup = createOptionButtons(product, optionsGroup.options, group);
    optionContainer.appendChild(buttonsGroup);

    return optionContainer;
}


export { createOption };