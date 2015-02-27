var nmss = (function() {
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

})(elements);

var elements = {
    button: {
        template: '<button class="button">This is a button</button>'
    },
    input: {
        template: '<input type="text" class="input" placeholder="input">'
    }
};

document.addEventListener("DOMContentLoaded", function(event) {

    var observable = document.querySelector('#section-code');
    var previewer = document.querySelector('#section-preview');
    var editor = new Behave({
        textarea: observable
    });

// requestanimationframe?

    setInterval(rePaint, 10);

    function rePaint(e) {
        previewer.contentWindow.document.open();
        previewer.contentWindow.document.write(
            '<!DOCTYPE html>' +
            '<html><head><title>My dynamic document</title>' +
            '<link rel="stylesheet" href="css/nmss.css">' +
            '<link rel="stylesheet" href="css/doc.css">' +
            '</head>' +
            '<body>' + observable.value.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '') +
            '</body></html>');
        previewer.contentWindow.document.close();
    }

});
