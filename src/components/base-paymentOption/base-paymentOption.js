import data from "./base-paymentOption.html?raw";
import "./base-paymentOption.scss";
import { createElementByHTML } from "#core/core.js";
import "../../colors.scss";
import { useStore } from "#store/store.js";


import iconCardOutline  from '#assets/icons/paymentOption/cardOutline.svg?raw';
import iconCardFill     from '#assets/icons/paymentOption/cardFill.svg?raw';
import iconCashOutline  from '#assets/icons/paymentOption/cashOutline.svg?raw';
import iconCashFill     from '#assets/icons/paymentOption/cashFill.svg?raw';
import iconSbpOutline    from '#assets/icons/paymentOption/sbpOutline.svg?raw';
import iconSbpFill       from '#assets/icons/paymentOption/sbpFill.svg?raw';

var icons = {
    cardOutline:    iconCardOutline,
    cardFill:       iconCardFill,
    cashOutline:    iconCashOutline,
    cashFill:       iconCashFill,
    sbpOutline:     iconSbpOutline,
    sbpFill:        iconSbpFill
};

function createPaymentOption (paymentMethod) {
    var store = useStore();
    var paymentOption = createElementByHTML(data);
    var paymentOptionTitle = paymentOption.querySelector(".paymentOption-title");
    paymentOptionTitle.innerText = paymentMethod.title;

    var selected = paymentMethod.selected;
    if (selected) {
        paymentOption.classList.add('selected');
    }

    setIcon();
 
    paymentOption.addEventListener("click", (e) => {
        if (!selected) {
            store.selectPaymentMethod(paymentMethod.id);
            setIcon(e.type);

            var paymentChangedEvent = new CustomEvent('paymentMethodChanged', {
                detail: { paymentMethodId: paymentMethod.id },
                bubbles: true
            });
            paymentOption.dispatchEvent(paymentChangedEvent);
        }
    });

    paymentOption.addEventListener("mouseenter", (e) => {
        setIcon(e.type);
    });
    
    paymentOption.addEventListener("mouseleave", (e) => {
        setIcon(e.type);
    });
    
    
    ///////////////////////////////// function in function
    /// код один в один кроме переменных, подумать, что сделать

    function setIcon (mouseevent){
        var objectElement = paymentOption.querySelector(".paymentOption-icon");
        var colorVariable;
        var iconKey;

        switch (mouseevent) {
            case "mouseenter":
                if (!selected) {
                    colorVariable = '--paymentMethod-accent';
                    iconKey = paymentMethod.icon_accent;
                }
                break;
            case "click":
                colorVariable = selected ? '--paymentMethod-accent' : '--paymentMethod-main';
                iconKey = selected ? paymentMethod.icon_accent : paymentMethod.icon_default;
                break;
            case "mouseleave":
            default:
                if (!selected) {
                    colorVariable = '--paymentMethod-main';
                    iconKey = paymentMethod.icon_default;
                } else {
                    colorVariable = '--paymentMethod-accent';
                    iconKey = paymentMethod.icon_accent;
                }
        }

        var color = getComputedStyle(document.documentElement)
            .getPropertyValue(colorVariable)
            .trim();

        var svgContent = icons[iconKey];
        if (svgContent) {
            objectElement.innerHTML = svgContent;
            var svg = objectElement.querySelector('svg');
            if (svg){
                var paths = svg.querySelectorAll("path");
                paths.forEach(path => {
                    var stroke = path.getAttribute('stroke');
                    var fill = path.getAttribute('fill');
                    if (stroke && stroke != 'none'){
                        path.setAttribute('stroke', color);
                    }
                    if (fill && fill != 'none'){
                        path.setAttribute('fill', color);
                    }
                });
            } else {
                console.error("SVG not found", iconKey);
            }
        }
    }

    return paymentOption;
}

export { createPaymentOption };