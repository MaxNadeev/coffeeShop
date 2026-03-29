import data from "./paymentWidget.html?raw";
import "./paymentWidget.scss";
import { createElementByHTML } from "#core/core.js";
import { createPaymentOption } from "#components/base-paymentOption/base-paymentOption.js";
import { updateCart } from "#components/cartWidget/cartWidget.js";
import { useStore } from "#store/store.js";

var store = useStore();
var paymentWidget = createElementByHTML(data);
var paymentMethodsElement = paymentWidget.querySelector(".paymentMethods");
var payValueElement = paymentWidget.querySelector(".payAmount");
var grandTotal = 0

function updateWidget() {
  paymentMethodsElement.replaceChildren();
  store.paymentMethods.forEach(paymentMethod => {
    var paymentMethodOption = createPaymentOption(paymentMethod);
    paymentMethodsElement.appendChild(paymentMethodOption);
  });

  var cart = store.getCart();

  grandTotal = 0
  if (cart) {
    cart.forEach(item => {
      grandTotal += item.quantity * item.product.price;
    })
  }
    
  payValueElement.innerText = grandTotal;
}

updateWidget();

paymentMethodsElement.addEventListener('paymentMethodChanged', (e) => {
  updateWidget();
});

var payButton = paymentWidget.querySelector('.payButton');

payButton.addEventListener('click', (e) => {
  var cart = store.getCart();
  var paymentMethod = store.paymentMethods
    .filter(method => method.selected === true)
    .map(method => method.id)[0];
  
  var order = {
    date: new Date().toLocaleDateString('ru-ru'),
    cart: cart,
    paymentMethod: paymentMethod,
    grandTotal: grandTotal
  };

  store.cleanCart();
  updateCart();
  store.items = [];
  console.log('order', order);
});

export { paymentWidget, updateWidget }