

function on(el, event, handler){
    el.addEventListener(event, handler, false);
    }

    function getElement(selector){
        let element = document.querySelector(selector);
        return element;
    }

    function getHeight(el){
        el.style.display = 'block';
        let height = el.clientHeight;
        el.style.display = 'none';
        return height;
    }

    function getTarget(el){
        return el.dataset.target;
    }

    function addClass(el, name){
        el.classList.add(name);
    }

    function removeClass(el, name){
        el.classList.remove(name);
    }

    function hasClass(el, name){
        return el.classList.contains(name);
    }


module.exports = {
    on: on,
    getElement: getElement,
    getHeight: getHeight,
    getTarget: getTarget,
    addClass: addClass,
    removeClass: removeClass,
    hasClass:hasClass
}

