function createRouter(routes) {
    var currentComponent = null;
    var contentContainer = document.createElement('div');
    contentContainer.className = 'router-content';

    function handleRouteChange() {
        var path = window.location.pathname;
        var route = routes.find(r => r.path === path) || routes.find(r => r.path === '*');
        
        if (route) {
            contentContainer.innerHTML = '';

            currentComponent = document.createElement('div');
            currentComponent.className = 'route-component';
            
            if (typeof route.component === 'function') {
                var componentResult = route.component();
                currentComponent.appendChild(componentResult);
            } else if (typeof route.component === 'string') {
                currentComponent.innerHTML = route.component;
            } else if (route.component instanceof HTMLElement) {
                currentComponent.appendChild(route.component);
            }

            contentContainer.appendChild(currentComponent);
        }
    }

    function navigateTo(path) {
        window.history.pushState({}, '', path);
        handleRouteChange();
    }

    window.addEventListener('popstate', handleRouteChange);
    document.addEventListener('click', (e) => {
        var routeElement = e.target.closest('[data-route]');
        if (routeElement) {
            e.preventDefault();
            console.log('routeElement', routeElement);
            navigateTo(routeElement.getAttribute('data-route'));
        }
    });

    handleRouteChange();

    return {
        navigateTo,
        contentContainer
    };
}

export { createRouter };