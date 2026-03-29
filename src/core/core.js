function createApp(element) {
    element.mount = function (id) {
        document.querySelector(id).replaceWith(this);
    };
    return element;
}

function createElementByHTML(html) {
    var element = document.createElement('template');
    element.innerHTML = html;
    return element.content.firstChild;
}

export { createApp, createElementByHTML };