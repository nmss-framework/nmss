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

document.addEventListener("DOMContentLoaded", function(event, rest) {

    var emmet = require('./vendor/emmet.min.js');
    var rest = require('rest');

    var sectionCode = document.querySelector('#section-code');
    var previewer = document.querySelector('#section-preview');

    rest('style.html').then(function(response) {
        console.log(response);
        sectionCode.value = response.entity;
    });

    emmet.require('textarea').setup({
        pretty_break: true, // enable formatted line breaks (when inserting
        // between opening and closing tag)
        use_tab: true // expand abbreviations by Tab key
    });

    setInterval(rePaint, 1000);

    function rePaint(e) {
        previewer.contentWindow.document.open();
        previewer.contentWindow.document.write(
            '<!DOCTYPE html>' +
            '<html><head><title>My dynamic document</title>' +
            '<link rel="stylesheet" href="css/nmss.css">' +
            '<link rel="stylesheet" href="css/doc.css">' +
            '</head>' +
            '<body class="wrapper-preview"><div class="content-preview">' + sectionCode.value.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '') +
            '</div></body></html>');
        previewer.contentWindow.document.close();
    }

});