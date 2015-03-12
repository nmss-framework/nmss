document.addEventListener("DOMContentLoaded", function(event) {

    Drag = require('./drag.js');
    window.drag = new Drag();

    var emmet = require('./vendor/emmet.min.js');
    var rest = require('rest');

    var pause = false;

    var sectionCode = document.querySelector('#section-code');
    var previewer = document.querySelector('#section-preview');

    rest('tpl/nmss.tpl').then(function(response) {
        sectionCode.value = response.entity;
    });

    emmet.require('textarea').setup({
        pretty_break: true, // enable formatted line breaks (when inserting
        // between opening and closing tag)
        use_tab: true // expand abbreviations by Tab key
    });

    window.addEventListener("keydown", keyDownTextField, false);

    function keyDownTextField (e) {
    var keyCode = e.keyCode;
        if (keyCode === 80) {
            pause = pause? false : true;
        }
    }


    setInterval(rePaint, 1000);

    function rePaint(e) {
        if(!pause) {
            previewer.contentWindow.document.open();
            previewer.contentWindow.document.write(
                '<!DOCTYPE html>' +
                '<html><head><title>My dynamic document</title>' +
                '<link rel="stylesheet" href="css/nmss.css?">' +
                '<link rel="stylesheet" href="css/doc.css">' +
                '</head>' +
                '<body class="wrapper-preview"><div class="content-preview">' + sectionCode.value.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '') +
                '</div></body></html>');
            previewer.contentWindow.document.close();
        }
    }
});