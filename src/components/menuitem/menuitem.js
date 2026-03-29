import data from "./menuitem.html?raw";
import "./menuitem.scss";
import { createElementByHTML } from "#core/core.js";
import "../../colors.scss";

import iconHomeOutline  from '#assets/icons/menu/homeOutline.svg?raw';
import iconHomeFill     from '#assets/icons/menu/homeFill.svg?raw';
import iconMenuOutline  from '#assets/icons/menu/menuOutline.svg?raw';
import iconMenuFill     from '#assets/icons/menu/menuFill.svg?raw';
import iconFireOutline  from '#assets/icons/menu/fireOutline.svg?raw';
import iconFireFill     from '#assets/icons/menu/fireFill.svg?raw';
import iconLogOutOutline  from '#assets/icons/menu/logOutOutline.svg?raw';
import iconLogOutFill     from '#assets/icons/menu/logOutFill.svg?raw';

var icons = {
    homeOutline:    iconHomeOutline,
    homeFill:       iconHomeFill,
    menuOutline:    iconMenuOutline,
    menuFill:       iconMenuFill,
    fireOutline:    iconFireOutline,
    fireFill:       iconFireFill,
    logOutOutline:  iconLogOutOutline,
    logOutFill:     iconLogOutFill
};


function createMenuItem (item) {
    var menuitem = createElementByHTML(data);
    var menutitle = menuitem.querySelector(".menuitem-title");
    menutitle.innerText = item.title;

    (item.route == window.location.pathname) ? setIcon('click') : setIcon();

    menuitem.addEventListener("click", (e) => {
        setIcon(e.type);

        e.preventDefault();
        var menuChangedEvent = new CustomEvent('menuChanged', {
                detail: { route: item.route },
                bubbles: true
            });
            menuitem.dispatchEvent(menuChangedEvent);
    });

    menuitem.addEventListener("mouseenter", (e) => {
        var selected = menuitem.classList.contains('selected');
        if (!selected) setIcon(e.type);
    });
    
    menuitem.addEventListener("mouseleave", (e) => {
        var selected = menuitem.classList.contains('selected');
        if (!selected) setIcon(e.type);
    });
    

    function setIcon (mouseevent){
        var colorVariable;
        var iconKey;

        switch (mouseevent) {
            case "mouseenter":
                colorVariable = '--menu-accent';
                iconKey = item.icon_accent;
                break;
            case "click":
                colorVariable = '--menu-inverted';
                iconKey = item.icon_accent;
                break;
            case "mouseleave":
            default:
                colorVariable = '--menu-main';
                iconKey = item.icon_default;
        }

        var objectElement = menuitem.querySelector(".menuitem-icon");
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


    return menuitem;
}

export { createMenuItem };