import data from "./sidebar.html?raw";
import "./sidebar.scss";
import { createElementByHTML } from "#core/core.js";
import { uWidget } from "#components/uWidget/uWidget.js";
import { cartWidgetElement } from "#components/cartWidget/cartWidget.js";
import { paymentWidget } from "#components/paymentWidget/paymentWidget.js";

var sidebar = createElementByHTML(data);

var topCol = sidebar.querySelector('.flex1col');
topCol.appendChild(uWidget);
topCol.appendChild(cartWidgetElement);

sidebar.appendChild(paymentWidget);

export default sidebar;