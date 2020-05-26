"use strict";

const util = require('./util.js');

const on = util.on;
const getElement = util.getElement;
const getHeight = util.getHeight;
const getTarget = util.getTarget;
const addClass = util.addClass;
const removeClass = util.removeClass;
const hasClass = util.hasClass;


function roll(selector) {
  // click event element
  var el = getElement(selector); // target selector

    var view_height = 162;
  var target_selector = getTarget(el); // element to roll

  var target = getElement(target_selector);
  var target_height = getHeight(target) + 16;
    
    
    if(target_height <= view_height){
        target.style.display = 'none';
        target.style.height = target_height;
        target.offsetHeight;
        target.style.display = 'block';
    } else {
        el.style.display = 'inline-block';
        el.parentNode.style.display = 'block';
        target.style.display = 'block';
        target.style.height = view_height + 'px';
        var show = 'show';
        on(el, 'click', setHandle);
    }


  function out() {
    target.style.display = 'block';
    target.style.height = view_height + 'px';
    target.offsetHeight;
    target.style.height = target_height + 'px';
    el.innerHTML = 'Weniger Infos'  
    addClass(target, show);
  }

  function up() {
    target.style.height = view_height + 'px';
    el.innerHTML = 'Weitere Infos'; 
    removeClass(target, show);
  }

  function setHandle() {
    if (hasClass(target, show)) {
      return up();
    } else {
      return out();
    }
  }

  return {
    show: out
  };
}
module.exports = {
    roll: roll
}
