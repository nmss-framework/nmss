var elements = require('./elements.js');

module.exports = function(elements) {
    'use strict';

    var state = {
        cElement: undefined
    };

    function dragStart(e) {
        console.log('dragStart');
        console.log(e);
        e.dataTransfer.setData('element', e.target.id);
    }

    function dragEnter(e) {
        console.log('dragEnter');
        e.preventDefault();
        return true;
    }

    function dragOver(e) {
        console.log('dragOver');
        e.preventDefault();
    }

    function dragDrop(e) {
        console.log('dragDrop');
        var elementType = e.dataTransfer.getData('element');
        e.target.value += elements[elementType].template;
        e.stopPropagation();
        return false;
    }

    return {
        dragStart: dragStart,
        dragEnter: dragEnter,
        dragOver: dragOver,
        dragDrop: dragDrop
    };
};