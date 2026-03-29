import data from "./uWidget.html?raw";
import "./uWidget.scss";
import { createElementByHTML } from "#core/core.js";

import iconOutline  from '#assets/icons/sidebar/BellOutline.svg?raw';
import iconFill from '#assets/icons/sidebar/BellFill.svg?raw';
import iconBadgeOutline from '#assets/icons/sidebar/BellBadgeOutline.svg?raw';
import iconBadgeFill from '#assets/icons/sidebar/BellBadgeFill.svg?raw';

var icons = {
    iconOutline:        iconOutline,
    iconFill:           iconFill,
    iconBadgeOutline:   iconBadgeOutline,
    iconBadgeFill:      iconBadgeFill
};

var uWidget = createElementByHTML(data);
var uThubnailElement = uWidget.querySelector('.uThubnail');
uThubnailElement.setAttribute('src', '#') ///////////////

var uStatusElement = uWidget.querySelector('.uStatus');
uStatusElement.innerText = "Ценитель кофе 🎯 ";

var uNameElement = uWidget.querySelector('.uName');
uNameElement.innerText = "Иван Иванов";

var uIconElement = uWidget.querySelector('.uNotificationIcon');
uIconElement.innerHTML = iconOutline;

var uButtonElement = uWidget.querySelector('.uNotificationButton');
uButtonElement.addEventListener("mouseenter", (e) => {
    console.log(e.type);
    setIcon(e.type);
});

uButtonElement.addEventListener("mouseleave", (e) => {
    console.log(e.type);
    setIcon(e.type);
});

function setIcon (mouseevent){
    switch (mouseevent) {
        case "mouseenter":
            uIconElement.innerHTML = iconFill;
            break;
        case "mouseleave":
        default:
            uIconElement.innerHTML = iconOutline;
    } 

    /////////// MouseLeave не всегда срабатывает

}

export { uWidget }