import data from "./cartWidgetItem.html?raw";
import "./cartWidgetItem.scss";
import { createElementByHTML } from "#core/core.js";

import plusIcon from '#assets/icons/cartWidgetItem/plus.svg?raw';
import minusIcon from '#assets/icons/cartWidgetItem/minus.svg?raw';
import closeIcon from '#assets/icons/cartWidgetItem/close.svg?raw';
import editIcon from '#assets/icons/cartWidgetItem/edit.svg?raw';


var icons = {
    plusIcon: plusIcon,
    minusIcon: minusIcon,
    closeIcon: closeIcon,
    editIcon: editIcon,
}

function createCartWidgetItem (item) {
    var cartWidgetItemElement = createElementByHTML(data);

    var titleElement = cartWidgetItemElement.querySelector('.cartWidgetItemTitle');
    titleElement.innerHTML = item.product.title;


    /** Options string */
    var basicGroups = Object.values(item.product.optionsGroup).filter(group => group.basic);
    var selectedValues = [];
    basicGroups.forEach(basicGroup => {

        var basicValues = basicGroup.options.values;
        var basicSelected = basicGroup.options.selected;
        if (Number.isFinite(basicSelected)) {
            selectedValues.push(basicValues[basicSelected]);
        }
        
        if (basicGroup.options?.associated) {
            var selected = item.product.optionsGroup[basicGroup.options.associated[basicGroup.options.selected]].options.selected;
            var values = item.product.optionsGroup[basicGroup.options.associated[basicGroup.options.selected]].options.values;
            if (selected){
                selectedValues.push(values[selected]);
            }
        }

        selectedValues.sort();
    })

    var thubnailElement = cartWidgetItemElement.querySelector('.cartWidgetItemThubnail');
    if (item.product.image) {
        thubnailElement.src = `src/assets/item_photos/${item.product.image}`;
    } else {
        thubnailElement.src = `src/assets/item_photos/defaultThubnail.png`;
    }
    
    var optionsElement = cartWidgetItemElement.querySelector('.cartWidgetItemOptions');
    optionsElement.innerHTML = `${selectedValues.join(', ')}`;
    /** Options string END */

    var btnDecElement = cartWidgetItemElement.querySelector(".cartWidgetDecrementBtn");
    btnDecElement.innerHTML = icons.minusIcon;
    btnDecElement.addEventListener("click", handleQuantityClick('quantityDecreased', item));


    var quantityElement = cartWidgetItemElement.querySelector('.cartWidgetItemQuantityValue');
    quantityElement.innerHTML = item.quantity;


    var btnIncElement = cartWidgetItemElement.querySelector(".cartWidgetIncrementBtn");
    btnIncElement.innerHTML = icons.plusIcon;
    btnIncElement.addEventListener("click", handleQuantityClick('quantityIncreased', item));

    
    var priceElement = cartWidgetItemElement.querySelector('.cartWidgetItemPriceValue');
    priceElement.innerHTML = item.product.price;

    function handleQuantityClick(eventType, item) {
        return (e) => {
            var event = new CustomEvent(eventType, {
                detail: { product: item.product },
                bubbles: true
            });
            e.currentTarget.dispatchEvent(event);
        };
    }
    
    // var btnClsElement = cartWidgetItemElement.querySelector(".cartWidgetRemoveBtn");
    // btnClsElement.innerHTML = icons.closeIcon;

    // btnClsElement.addEventListener("click", (e) => {
    //     console.log('cartWidgetRemoveBtn:', e.type);
    // });

    
    return cartWidgetItemElement;
}

export { createCartWidgetItem };