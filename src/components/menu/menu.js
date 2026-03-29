import data from "./menu.html?raw";
import "./menu.scss";
import { createElementByHTML } from "#core/core.js";
import { createMenuItem } from "#components/menuitem/menuitem.js";
import itemdata from "#assets/data/menuitems.json";

function initMenu(router) {
  var menu = createElementByHTML(data);
  var menuElement = menu.querySelector(".menu");

  function updateMenu(){
    menuElement.replaceChildren();
    itemdata.forEach(item => {
      var menuItemElement = createMenuItem(item);
      menuElement.appendChild(menuItemElement);
            
      if (item.route) {
        menuItemElement.setAttribute('data-route', item.route);
      }

      if (menuItemElement.getAttribute('data-route') == window.location.pathname){
        menuItemElement.classList.add('selected');
      }
    });
  }

  menuElement.addEventListener('menuChanged', (e) => {
    router.navigateTo(e.detail.route);
    updateMenu();
  });

  function updateAuthButton(){
    var authButtonElement = menu.querySelector(".authButton");
    authButtonElement.replaceChildren();
    var authButtonData = {
        "id": 0,
        "title": "Выйти",
        "route": "/auth",
        "icon_default": "logOutOutline",
        "icon_accent": "logOutFill",
        "icon": "logOut"
      }

    var authButtonItemElement = createMenuItem(authButtonData);
    authButtonElement.appendChild(authButtonItemElement);
  }

  updateMenu();
  updateAuthButton();
  

  return menu;
}



export { initMenu };