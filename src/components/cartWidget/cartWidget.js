import data from "./cartWidget.html?raw";
import "./cartWidget.scss";
import { createElementByHTML } from "#core/core.js";
import { createCartWidgetItem } from "#components/cartWidgetItem/cartWidgetItem.js";
import { updateWidget } from "#components/paymentWidget/paymentWidget.js";
import { useStore } from "#store/store.js";
import editIcon from '#assets/icons/cartWidgetItem/edit.svg?raw';

var store = useStore();
var cartWidgetElement = createElementByHTML(data);
var cartItemsWrapperElement = cartWidgetElement.querySelector('.cartItemsWrapper');

var btnNotesElement = cartWidgetElement.querySelector(".notesButton");
var btnNotesIconElement = cartWidgetElement.querySelector('.notesButtonIcon');
btnNotesIconElement.innerHTML = editIcon;

btnNotesElement.addEventListener("click", (e) => {
  console.log('notesButton:', e.type);
});

function updateCart(){
  cartItemsWrapperElement.replaceChildren();

  var lsCart = store.getCart();

  if (lsCart) {
    for (let item of lsCart) {
      var cartWidgetItem = createCartWidgetItem(item);
      cartItemsWrapperElement.appendChild(cartWidgetItem);
    }
  }
  
  updateWidget();
}

cartWidgetElement.addEventListener('quantityIncreased', (e) => {
  store.add(e.detail.product);
  updateCart();
});

cartWidgetElement.addEventListener('quantityDecreased', (e) => {
  store.remove(e.detail.product);
  updateCart();
});

updateCart();

export { cartWidgetElement, updateCart };
