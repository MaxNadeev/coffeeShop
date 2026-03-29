import pMethods from "#assets/data/paymentMethods.json";
import pricelist from "#assets/data/pricelist.json";

var store = {
    pricelist: [],
    paymentMethods: [],
    items: [],
    lastId: 0,
    // order: {},

    async init() {
        this.pricelist = pricelist;

        
        /** ITEMS IN CART */
        this.items = [];



        /** PAYMENT METHODS */
        this.paymentMethods = [];

        this.paymentMethods = pMethods.map(item => ({
            id: item.id,
            title: item.title,
            icon_default: item.icon_default,
            icon_accent: item.icon_accent,
            description: item.description,
            selected: false
        }));

        if (this.paymentMethods.length > 0) {
            this.paymentMethods[0].selected = true;
        }
        console.log('store inited: ', this);
        
        return this;

    },

    add: function (item) {
        var itemString = JSON.stringify(item);

        var itemInCart = this.items.find(storeItem => 
            JSON.stringify(storeItem.product) === itemString
        );

        if (itemInCart){
            itemInCart.quantity++;
        } else {
            var itemCopy = {}
            itemCopy.product = JSON.parse(itemString);
            itemCopy.quantity = 1;
            this.items.push(itemCopy);
        }

        localStorage.setItem("cart", JSON.stringify(this.items));
    },

    remove: function (item) {
        var cart = this.getCart();
        var itemString = JSON.stringify(item);

        var itemInCart = cart.find(item => 
            JSON.stringify(item.product) === itemString
        );

        if (itemInCart.quantity > 1) {
            itemInCart.quantity--;
            this.items = cart;
        } else {
            var filteredItems = cart.filter(item => 
                JSON.stringify(item.product) !== itemString
            );
            this.items = filteredItems;
        }
        
        localStorage.setItem("cart", JSON.stringify(this.items));

    },

    getCart: function() {
        var cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) return cart;
    },

    cleanCart: function() {
        localStorage.setItem("cart", '[]');
    },

    // send: function() {
    //     var cart = JSON.parse(localStorage.getItem('cart'));
    //     // var orderLocalStorage = this.getOrder();
    //     // var product = JSON.parse(item.product);
    //     // var b = product.price * 0.1
    //     // var bonuses = parseFloat(b.toFixed(2));


    //     // if (orderLocalStorage){
    //     //     console.log('orderLocalStorage', orderLocalStorage);
    //     // } else {
    //     //     console.log('orderLocalStorage is empty', orderLocalStorage);
            

    //         // this.order = {
    //         //     product: product,
    //         //     bonuses: bonuses,
    //         //     paymentMethod: item.paymentMethod,
    //         //     grandTotal: item.grandTotal
    //         // }

    //     // [{"product":{"id":1,"category":1,"title":"Шоколадный Фрапучино","image":"#","description":"Сладкий шоколад, кофе, молоко, и взбитые сливки","price":345.99,"optionsGroup":{"moods":{"name":"Настроение","basic":true,"options":{"required":true,"values":["hot","cold"],"associated":["temperature","ice"],"selected":0}},"sizes":{"name":"Размер","basic":true,"options":{"required":true,"values":["S","M","L"],"selected":1}},"sugar":{"name":"Сахар","basic":true,"options":{"required":false,"values":["small","standart","extra"],"selected":null}},"temperature":{"name":"Температура","basic":false,"options":{"required":true,"values":["lower","regular","hotter"],"selected":1}},"ice":{"name":"Лёд","basic":false,"options":{"required":false,"values":["few","some","more"],"selected":null}}}},"quantity":1}]	

        

    //     // }
    // },

    selectPaymentMethod(id) {
        this.paymentMethods.forEach(paymentMethod => {
            paymentMethod.selected = false;
        });
        
        var paymentMethod = this.paymentMethods.find(pM => pM.id === id);
        if (paymentMethod) {
            paymentMethod.selected = true;
        }
    },

    selectOption(detail){
        var { optionsGroup, selected } = this.pricelist.products.find(p => p.id === detail.productId);
        var options = optionsGroup[detail.optionsGroup].options;

        options.selected = (!options.required && options.selected === detail.selected) ? null : detail.selected;
    }

}

store.init();

var useStore = () => store;

export { useStore };