"use strict";

const util = require('./util.js');

const on = util.on;
const getElement = util.getElement;
const getHeight = util.getHeight;
const getTarget = util.getTarget;
const addClass = util.addClass;
const removeClass = util.removeClass;
const hasClass = util.hasClass;


function cta(selector) {
    var el = getElement(selector); // target selector
    var jpcta = getElement('.jpcta');
    var jpcta_item = getElement('.jpcta-item');

    if( sessionStorage.getItem('cta') != 1){    
        setTimeout (function() { showCta() },800);
        addClass(jpcta, 'show');
        sessionStorage.setItem('cta', '1');
    } else {
        showCta();
    }

    on(el, 'click', setHandle);

    function showCta(){
        removeClass(jpcta,'hidden');
        // Save data to sessionStorage
    }

    function setStateOpen(){
        removeClass(jpcta,'state-close')
        addClass(jpcta,'state-open') 
    }

    function setStateClose(){
        removeClass(jpcta,'state-open');
        addClass(jpcta,'state-close');
    }

    function setActive(){
        addClass(jpcta_item,'active');
        addClass(jpcta_item,'visible');
    }

    function setInactive(){
        removeClass(jpcta_item,'active');
        removeClass(jpcta_item,'visible');
    }

    function offClick(){
        setStateClose();
        setInactive();
        document.removeEventListener('click',offClick);
    }

    function setHandle(e){
        e.stopPropagation();
        if(hasClass(jpcta,'state-close')){
            setStateOpen(); 
            setTimeout (function() { setActive() },200);
            if(hasClass(jpcta,'state-open')){
                document.addEventListener('click', offClick);
            }
        } else {
            setStateClose();
            setInactive();
        }
    }



}

module.exports = {
    cta:cta
}
