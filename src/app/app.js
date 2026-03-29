import data from "./app.html?raw";
import "./app.scss";
import { createElementByHTML } from "#core/core.js";
import { initMenu } from "#components/menu/menu.js";
import { createContent } from "#components/content/content.js";
import sidebar from "#components/sidebar/sidebar.js";
import { createRouter } from "#components/router.js";

var app = createElementByHTML(data);
var routes = [
    { path: '/', component: '<content><h1>Coffee Shop</h1></content>' }, // заглушка
    { path: '/menu', component: createContent },
    { path: '/offers', component: '<content><h1>Акции</h1></content>' }, // заглушка
    { path: '*', component: '<content><h1>404</h1></content>' }          // заглушка
];

var router = createRouter(routes);
var menu = initMenu(router);

app.appendChild(menu);
app.appendChild(router.contentContainer);
app.appendChild(sidebar);

document.body.appendChild(app);

export default app;