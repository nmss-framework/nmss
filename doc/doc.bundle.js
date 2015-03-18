(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
                '<link rel="stylesheet" href="css/themes/sportmaniacs.css?">' +
                '<link rel="stylesheet" href="css/doc.css">' +
                '</head>' +
                '<body class="wrapper-preview"><div class="content-preview">' + sectionCode.value.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '') +
                '</div></body></html>');
            previewer.contentWindow.document.close();
        }
    }
});
},{"./drag.js":2,"./vendor/emmet.min.js":4,"rest":7}],2:[function(require,module,exports){
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
},{"./elements.js":3}],3:[function(require,module,exports){
module.exports = {
    'button': {
        template: '<button class="button">This is a button</button>'
    },
    'input': {
        template: '<input type="text" class="input" placeholder="input">'
    },
    'grid': {
        template: '<div class="g"></div>'
    },
    'grid-item': {
        template: '<div class="g-u"></div>'
    }
};
},{}],4:[function(require,module,exports){
var _=function(){function e(a,b,c){if(a===b)return a!==0||1/a==1/b;if(a==null||b==null)return a===b;if(a._chain)a=a._wrapped;if(b._chain)b=b._wrapped;if(a.isEqual&&k.isFunction(a.isEqual))return a.isEqual(b);if(b.isEqual&&k.isFunction(b.isEqual))return b.isEqual(a);var g=f.call(a);if(g!=f.call(b))return!1;switch(g){case "[object String]":return a==String(b);case "[object Number]":return a!=+a?b!=+b:a==0?1/a==1/b:a==+b;case "[object Date]":case "[object Boolean]":return+a==+b;case "[object RegExp]":return a.source==
b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if(typeof a!="object"||typeof b!="object")return!1;for(var d=c.length;d--;)if(c[d]==a)return!0;c.push(a);var d=0,j=!0;if(g=="[object Array]"){if(d=a.length,j=d==b.length)for(;d--;)if(!(j=d in a==d in b&&e(a[d],b[d],c)))break}else{if("constructor"in a!="constructor"in b||a.constructor!=b.constructor)return!1;for(var l in a)if(k.has(a,l)&&(d++,!(j=k.has(b,l)&&e(a[l],b[l],c))))break;if(j){for(l in b)if(k.has(b,l)&&!d--)break;
j=!d}}c.pop();return j}var d=this,h=d._,i={},b=Array.prototype,c=Object.prototype,a=b.slice,g=b.unshift,f=c.toString,j=c.hasOwnProperty,l=b.forEach,n=b.map,m=b.reduce,o=b.reduceRight,p=b.filter,r=b.every,q=b.some,u=b.indexOf,s=b.lastIndexOf,c=Array.isArray,v=Object.keys,w=Function.prototype.bind,k=function(a){return new x(a)};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports)exports=module.exports=k;exports._=k}else d._=k;k.VERSION="1.3.3";var t=k.each=k.forEach=function(a,
b,c){if(a!=null)if(l&&a.forEach===l)a.forEach(b,c);else if(a.length===+a.length)for(var f=0,d=a.length;f<d;f++){if(f in a&&b.call(c,a[f],f,a)===i)break}else for(f in a)if(k.has(a,f)&&b.call(c,a[f],f,a)===i)break};k.map=k.collect=function(a,b,c){var f=[];if(a==null)return f;if(n&&a.map===n)return a.map(b,c);t(a,function(a,d,g){f[f.length]=b.call(c,a,d,g)});if(a.length===+a.length)f.length=a.length;return f};k.reduce=k.foldl=k.inject=function(a,b,c,f){var d=arguments.length>2;a==null&&(a=[]);if(m&&
a.reduce===m)return f&&(b=k.bind(b,f)),d?a.reduce(b,c):a.reduce(b);t(a,function(a,g,k){d?c=b.call(f,c,a,g,k):(c=a,d=!0)});if(!d)throw new TypeError("Reduce of empty array with no initial value");return c};k.reduceRight=k.foldr=function(a,b,c,f){var d=arguments.length>2;a==null&&(a=[]);if(o&&a.reduceRight===o)return f&&(b=k.bind(b,f)),d?a.reduceRight(b,c):a.reduceRight(b);var g=k.toArray(a).reverse();f&&!d&&(b=k.bind(b,f));return d?k.reduce(g,b,c,f):k.reduce(g,b)};k.find=k.detect=function(a,b,c){var f;
D(a,function(a,d,g){if(b.call(c,a,d,g))return f=a,!0});return f};k.filter=k.select=function(a,b,c){var f=[];if(a==null)return f;if(p&&a.filter===p)return a.filter(b,c);t(a,function(a,d,g){b.call(c,a,d,g)&&(f[f.length]=a)});return f};k.reject=function(a,b,c){var f=[];if(a==null)return f;t(a,function(a,d,g){b.call(c,a,d,g)||(f[f.length]=a)});return f};k.every=k.all=function(a,b,c){var f=!0;if(a==null)return f;if(r&&a.every===r)return a.every(b,c);t(a,function(a,d,g){if(!(f=f&&b.call(c,a,d,g)))return i});
return!!f};var D=k.some=k.any=function(a,b,c){b||(b=k.identity);var f=!1;if(a==null)return f;if(q&&a.some===q)return a.some(b,c);t(a,function(a,d,g){if(f||(f=b.call(c,a,d,g)))return i});return!!f};k.include=k.contains=function(a,b){var c=!1;return a==null?c:u&&a.indexOf===u?a.indexOf(b)!=-1:c=D(a,function(a){return a===b})};k.invoke=function(b,c){var f=a.call(arguments,2);return k.map(b,function(a){return(k.isFunction(c)?c||a:a[c]).apply(a,f)})};k.pluck=function(a,b){return k.map(a,function(a){return a[b]})};
k.max=function(a,b,c){if(!b&&k.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!b&&k.isEmpty(a))return-Infinity;var f={computed:-Infinity};t(a,function(a,d,g){d=b?b.call(c,a,d,g):a;d>=f.computed&&(f={value:a,computed:d})});return f.value};k.min=function(a,b,c){if(!b&&k.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!b&&k.isEmpty(a))return Infinity;var f={computed:Infinity};t(a,function(a,d,g){d=b?b.call(c,a,d,g):a;d<f.computed&&(f={value:a,computed:d})});return f.value};k.shuffle=
function(a){var b=[],c;t(a,function(a,f){c=Math.floor(Math.random()*(f+1));b[f]=b[c];b[c]=a});return b};k.sortBy=function(a,b,c){var f=k.isFunction(b)?b:function(a){return a[b]};return k.pluck(k.map(a,function(a,b,d){return{value:a,criteria:f.call(c,a,b,d)}}).sort(function(a,b){var c=a.criteria,f=b.criteria;return c===void 0?1:f===void 0?-1:c<f?-1:c>f?1:0}),"value")};k.groupBy=function(a,b){var c={},f=k.isFunction(b)?b:function(a){return a[b]};t(a,function(a,b){var d=f(a,b);(c[d]||(c[d]=[])).push(a)});
return c};k.sortedIndex=function(a,b,c){c||(c=k.identity);for(var f=0,d=a.length;f<d;){var g=f+d>>1;c(a[g])<c(b)?f=g+1:d=g}return f};k.toArray=function(b){return!b?[]:k.isArray(b)?a.call(b):k.isArguments(b)?a.call(b):b.toArray&&k.isFunction(b.toArray)?b.toArray():k.values(b)};k.size=function(a){return k.isArray(a)?a.length:k.keys(a).length};k.first=k.head=k.take=function(b,c,f){return c!=null&&!f?a.call(b,0,c):b[0]};k.initial=function(b,c,f){return a.call(b,0,b.length-(c==null||f?1:c))};k.last=function(b,
c,f){return c!=null&&!f?a.call(b,Math.max(b.length-c,0)):b[b.length-1]};k.rest=k.tail=function(b,c,f){return a.call(b,c==null||f?1:c)};k.compact=function(a){return k.filter(a,function(a){return!!a})};k.flatten=function(a,b){return k.reduce(a,function(a,c){if(k.isArray(c))return a.concat(b?c:k.flatten(c));a[a.length]=c;return a},[])};k.without=function(b){return k.difference(b,a.call(arguments,1))};k.uniq=k.unique=function(a,b,c){var c=c?k.map(a,c):a,f=[];a.length<3&&(b=!0);k.reduce(c,function(c,d,
g){if(b?k.last(c)!==d||!c.length:!k.include(c,d))c.push(d),f.push(a[g]);return c},[]);return f};k.union=function(){return k.uniq(k.flatten(arguments,!0))};k.intersection=k.intersect=function(b){var c=a.call(arguments,1);return k.filter(k.uniq(b),function(a){return k.every(c,function(b){return k.indexOf(b,a)>=0})})};k.difference=function(b){var c=k.flatten(a.call(arguments,1),!0);return k.filter(b,function(a){return!k.include(c,a)})};k.zip=function(){for(var b=a.call(arguments),c=k.max(k.pluck(b,"length")),
f=Array(c),d=0;d<c;d++)f[d]=k.pluck(b,""+d);return f};k.indexOf=function(a,b,c){if(a==null)return-1;var f;if(c)return c=k.sortedIndex(a,b),a[c]===b?c:-1;if(u&&a.indexOf===u)return a.indexOf(b);c=0;for(f=a.length;c<f;c++)if(c in a&&a[c]===b)return c;return-1};k.lastIndexOf=function(a,b){if(a==null)return-1;if(s&&a.lastIndexOf===s)return a.lastIndexOf(b);for(var c=a.length;c--;)if(c in a&&a[c]===b)return c;return-1};k.range=function(a,b,c){arguments.length<=1&&(b=a||0,a=0);for(var c=arguments[2]||1,
f=Math.max(Math.ceil((b-a)/c),0),d=0,g=Array(f);d<f;)g[d++]=a,a+=c;return g};var E=function(){};k.bind=function(b,c){var f,d;if(b.bind===w&&w)return w.apply(b,a.call(arguments,1));if(!k.isFunction(b))throw new TypeError;d=a.call(arguments,2);return f=function(){if(!(this instanceof f))return b.apply(c,d.concat(a.call(arguments)));E.prototype=b.prototype;var g=new E,k=b.apply(g,d.concat(a.call(arguments)));return Object(k)===k?k:g}};k.bindAll=function(b){var c=a.call(arguments,1);c.length==0&&(c=k.functions(b));
t(c,function(a){b[a]=k.bind(b[a],b)});return b};k.memoize=function(a,b){var c={};b||(b=k.identity);return function(){var f=b.apply(this,arguments);return k.has(c,f)?c[f]:c[f]=a.apply(this,arguments)}};k.delay=function(b,c){var f=a.call(arguments,2);return setTimeout(function(){return b.apply(null,f)},c)};k.defer=function(b){return k.delay.apply(k,[b,1].concat(a.call(arguments,1)))};k.throttle=function(a,b){var c,f,d,g,j,l,e=k.debounce(function(){j=g=!1},b);return function(){c=this;f=arguments;var k;
d||(d=setTimeout(function(){d=null;j&&a.apply(c,f);e()},b));g?j=!0:l=a.apply(c,f);e();g=!0;return l}};k.debounce=function(a,b,c){var f;return function(){var d=this,g=arguments;c&&!f&&a.apply(d,g);clearTimeout(f);f=setTimeout(function(){f=null;c||a.apply(d,g)},b)}};k.once=function(a){var b=!1,c;return function(){if(b)return c;b=!0;return c=a.apply(this,arguments)}};k.wrap=function(b,c){return function(){var f=[b].concat(a.call(arguments,0));return c.apply(this,f)}};k.compose=function(){var a=arguments;
return function(){for(var b=arguments,c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}};k.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};k.keys=v||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[],c;for(c in a)k.has(a,c)&&(b[b.length]=c);return b};k.values=function(a){return k.map(a,k.identity)};k.functions=k.methods=function(a){var b=[],c;for(c in a)k.isFunction(a[c])&&b.push(c);return b.sort()};k.extend=function(b){t(a.call(arguments,
1),function(a){for(var c in a)b[c]=a[c]});return b};k.pick=function(b){var c={};t(k.flatten(a.call(arguments,1)),function(a){a in b&&(c[a]=b[a])});return c};k.defaults=function(b){t(a.call(arguments,1),function(a){for(var c in a)b[c]==null&&(b[c]=a[c])});return b};k.clone=function(a){return!k.isObject(a)?a:k.isArray(a)?a.slice():k.extend({},a)};k.tap=function(a,b){b(a);return a};k.isEqual=function(a,b){return e(a,b,[])};k.isEmpty=function(a){if(a==null)return!0;if(k.isArray(a)||k.isString(a))return a.length===
0;for(var b in a)if(k.has(a,b))return!1;return!0};k.isElement=function(a){return!!(a&&a.nodeType==1)};k.isArray=c||function(a){return f.call(a)=="[object Array]"};k.isObject=function(a){return a===Object(a)};k.isArguments=function(a){return f.call(a)=="[object Arguments]"};if(!k.isArguments(arguments))k.isArguments=function(a){return!(!a||!k.has(a,"callee"))};k.isFunction=function(a){return f.call(a)=="[object Function]"};k.isString=function(a){return f.call(a)=="[object String]"};k.isNumber=function(a){return f.call(a)==
"[object Number]"};k.isFinite=function(a){return k.isNumber(a)&&isFinite(a)};k.isNaN=function(a){return a!==a};k.isBoolean=function(a){return a===!0||a===!1||f.call(a)=="[object Boolean]"};k.isDate=function(a){return f.call(a)=="[object Date]"};k.isRegExp=function(a){return f.call(a)=="[object RegExp]"};k.isNull=function(a){return a===null};k.isUndefined=function(a){return a===void 0};k.has=function(a,b){return j.call(a,b)};k.noConflict=function(){d._=h;return this};k.identity=function(a){return a};
k.times=function(a,b,c){for(var f=0;f<a;f++)b.call(c,f)};k.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};k.result=function(a,b){if(a==null)return null;var c=a[b];return k.isFunction(c)?c.call(a):c};k.mixin=function(a){t(k.functions(a),function(b){F(b,k[b]=a[b])})};var G=0;k.uniqueId=function(a){var b=G++;return a?a+b:b};k.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g};var z=/.^/,y={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},A;for(A in y)y[y[A]]=A;var H=/\\|'|\r|\n|\t|\u2028|\u2029/g,I=/\\(\\|'|r|n|t|u2028|u2029)/g,B=function(a){return a.replace(I,function(a,b){return y[b]})};k.template=function(a,b,c){c=k.defaults(c||{},k.templateSettings);a="__p+='"+a.replace(H,function(a){return"\\"+y[a]}).replace(c.escape||z,function(a,b){return"'+\n_.escape("+B(b)+")+\n'"}).replace(c.interpolate||z,function(a,b){return"'+\n("+
B(b)+")+\n'"}).replace(c.evaluate||z,function(a,b){return"';\n"+B(b)+"\n;__p+='"})+"';\n";c.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",f=new Function(c.variable||"obj","_",a);if(b)return f(b,k);b=function(a){return f.call(this,a,k)};b.source="function("+(c.variable||"obj")+"){\n"+a+"}";return b};k.chain=function(a){return k(a).chain()};var x=function(a){this._wrapped=a};k.prototype=x.prototype;
var C=function(a,b){return b?k(a).chain():a},F=function(b,c){x.prototype[b]=function(){var b=a.call(arguments);g.call(b,this._wrapped);return C(c.apply(k,b),this._chain)}};k.mixin(k);t(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var c=b[a];x.prototype[a]=function(){var b=this._wrapped;c.apply(b,arguments);var f=b.length;(a=="shift"||a=="splice")&&f===0&&delete b[0];return C(b,this._chain)}});t(["concat","join","slice"],function(a){var c=b[a];x.prototype[a]=function(){return C(c.apply(this._wrapped,
arguments),this._chain)}});x.prototype.chain=function(){this._chain=!0;return this};x.prototype.value=function(){return this._wrapped};return k}.call({}),emmet=function(e){function d(a,b,d){var l;l=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)};_.extend(l,a);c.prototype=a.prototype;l.prototype=new c;b&&_.extend(l.prototype,b);d&&_.extend(l,d);l.prototype.constructor=l;l.__super__=a.prototype;return l}function h(c){!(c in b)&&a&&a(c);return b[c]}if(typeof _=="undefined")try{_=
e.require("underscore")}catch(i){}if(typeof _=="undefined")throw"Cannot access to Underscore.js lib";var b={_:_},c=function(){},a=null;return{define:function(a,c){a in b||(b[a]=_.isFunction(c)?this.exec(c):c)},require:h,exec:function(a,b){return a.call(b||e,_.bind(h,this),_,this)},extend:function(a,b){var c=d(this,a,b);c.extend=this.extend;if(a.hasOwnProperty("toString"))c.prototype.toString=a.toString;return c},expandAbbreviation:function(a,b,c,d){if(!a)return"";var b=b||"html",e=h("filters"),i=
h("abbreviationParser"),c=h("profile").get(c,b);h("tabStops").resetTabstopIndex();a=e.extractFromAbbreviation(a);d=i.parse(a[0],{syntax:b,contextNode:d});b=e.composeList(b,c,a[1]);e.apply(d,b,c);return d.toString()},defaultSyntax:function(){return"html"},defaultProfile:function(){return"plain"},log:function(){e.console&&e.console.log&&e.console.log.apply(e.console,arguments)},setModuleLoader:function(b){a=b}}}(this);
if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports)exports=module.exports=emmet;exports.emmet=emmet}typeof define!=="undefined"&&define(emmet);
emmet.define("abbreviationParser",function(e,d){function h(){this.parent=null;this.children=[];this._attributes=[];this.abbreviation="";this.counter=1;this._name=null;this._text="";this.repeatCount=1;this.hasImplicitRepeat=!1;this._data={};this.padding=this.content=this.end=this.start=""}function i(a){return a.substring(1,a.length-1)}function b(a){for(var a=e("utils").trim(a),c=new h,f=c.addChild(),g,j=e("stringStream").create(a),a=1E3,l;!j.eol()&&--a>0;)switch(g=j.peek(),g){case "(":j.start=j.pos;
if(j.skipToPair("(",")"))g=b(i(j.current())),(l=j.match(/^\*(\d+)?/,!0))&&f._setRepeat(l[1]),d.each(g.children,function(a){f.addChild(a)});else throw'Invalid abbreviation: mo matching ")" found for character at '+j.pos;break;case ">":f=f.addChild();j.next();break;case "+":f=f.parent.addChild();j.next();break;case "^":g=f.parent||f;f=(g.parent||g).addChild();j.next();break;default:j.start=j.pos,j.eatWhile(function(a){if(a=="["||a=="{"){if(j.skipToPair(a,p[a]))return j.backUp(1),!0;throw'Invalid abbreviation: mo matching "'+
p[a]+'" found for character at '+j.pos;}return a=="+"?(j.next(),a=j.eol()||~"+>^*".indexOf(j.peek()),j.backUp(1),a):a!="("&&n(a)}),f.setAbbreviation(j.current()),j.start=j.pos}if(a<1)throw"Endless loop detected";return c}function c(a){var a=e("utils").trim(a),b=[],a=e("stringStream").create(a);for(a.eatSpace();!a.eol();)if(a.start=a.pos,a.eatWhile(o)){var c=a.current(),f="";if(a.peek()=="="){a.next();a.start=a.pos;var d=a.peek();if(d=='"'||d=="'"){a.next();a:{for(var f=a,g=void 0;g=f.next();)if(g===
d){f=!0;break a}f=!1}if(f)f=a.current(),f=f.substring(1,f.length-1);else throw"Invalid attribute value";}else if(a.eatWhile(/[^\s\]]/))f=a.current();else throw"Invalid attribute value";}b.push({name:c,value:f});a.eatSpace()}else break;return b}function a(a){for(var b=[],f={"#":"id",".":"class"},d=null,j=e("stringStream").create(a);!j.eol();)switch(j.peek()){case "#":case ".":if(d===null)d=j.pos;var l=f[j.peek()];j.next();j.start=j.pos;j.eatWhile(o);b.push({name:l,value:j.current()});break;case "[":if(d===
null)d=j.pos;j.start=j.pos;if(!j.skipToPair("[","]"))throw"Invalid attribute set definition";b=b.concat(c(i(j.current())));break;default:j.next()}return!b.length?null:{element:a.substring(0,d),attributes:g(b)}}function g(a){var a=d.map(a,function(a){return d.clone(a)}),b={};return d.filter(a,function(a){if(!(a.name in b))return b[a.name]=a;var c=b[a.name];a.name.toLowerCase()=="class"?c.value+=(c.value.length?" ":"")+a.value:c.value=a.value;return!1})}function f(a){if(!~a.indexOf("{"))return null;
for(var b=e("stringStream").create(a);!b.eol();)switch(b.peek()){case "[":case "(":b.skipToPair(b.peek(),p[b.peek()]);break;case "{":return b.start=b.pos,b.skipToPair("{","}"),{element:a.substring(0,b.start),text:i(b.current())};default:b.next()}}function j(a){for(var b=a.children.length-1,c,f,g;b>=0;b--)if(f=a.children[b],f.isRepeating()){g=c=f.repeatCount;f.repeatCount=1;f.updateProperty("counter",1);for(f.updateProperty("maxCount",g);--c>0;)f.parent.addChild(f.clone(),b+1).updateProperty("counter",
c+1).updateProperty("maxCount",g)}d.each(a.children,j);return a}function l(a){for(var b=a.children.length-1;b>=0;b--){var c=a.children[b];c.isGroup()?c.replace(l(c).children):c.isEmpty()&&c.remove()}d.each(a.children,l);return a}function n(a){var b=a.charCodeAt(0);return b>64&&b<91||b>96&&b<123||b>47&&b<58||"#.*:$-_!@|%".indexOf(a)!=-1}var m=/^[\w\-\$\:@\!%]+\+?$/i,o=/[\w\-:\$@]/,p={"[":"]","(":")","{":"}"},r=Array.prototype.splice,q=[],u=[],s=[];h.prototype={addChild:function(a,b){a=a||new h;a.parent=
this;d.isUndefined(b)?this.children.push(a):this.children.splice(b,0,a);return a},clone:function(){var a=new h;d.each(["abbreviation","counter","_name","_text","repeatCount","hasImplicitRepeat","start","end","content","padding"],function(b){a[b]=this[b]},this);a._attributes=d.map(this._attributes,function(a){return d.clone(a)});a._data=d.clone(this._data);a.children=d.map(this.children,function(b){b=b.clone();b.parent=a;return b});return a},remove:function(){if(this.parent)this.parent.children=d.without(this.parent.children,
this);return this},replace:function(){var a=this.parent,b=d.indexOf(a.children,this),c=d.flatten(arguments);r.apply(a.children,[b,1].concat(c));d.each(c,function(b){b.parent=a})},updateProperty:function(a,b){this[a]=b;d.each(this.children,function(c){c.updateProperty(a,b)});return this},find:function(a){return this.findAll(a)[0]},findAll:function(a){if(!d.isFunction(a))var b=a.toLowerCase(),a=function(a){return a.name().toLowerCase()==b};var c=[];d.each(this.children,function(b){a(b)&&c.push(b);c=
c.concat(b.findAll(a))});return d.compact(c)},data:function(a,b){if(arguments.length==2&&(this._data[a]=b,a=="resource"&&e("elements").is(b,"snippet")&&(this.content=b.data,this._text)))this.content=e("abbreviationUtils").insertChildContent(b.data,this._text);return this._data[a]},name:function(){var a=this.matchedResource();return e("elements").is(a,"element")?a.name:this._name},attributeList:function(){var a=[],b=this.matchedResource();e("elements").is(b,"element")&&d.isArray(b.attributes)&&(a=
a.concat(b.attributes));return g(a.concat(this._attributes))},attribute:function(a,b){if(arguments.length==2){var c=d.indexOf(d.pluck(this._attributes,"name"),a.toLowerCase());~c?this._attributes[c].value=b:this._attributes.push({name:a,value:b})}return(d.find(this.attributeList(),function(b){return b.name==a})||{}).value},matchedResource:function(){return this.data("resource")},index:function(){return this.parent?d.indexOf(this.parent.children,this):-1},_setRepeat:function(a){a?this.repeatCount=
parseInt(a,10)||1:this.hasImplicitRepeat=!0},setAbbreviation:function(b){var c=this;this.abbreviation=b=(b||"").replace(/\*(\d+)?$/,function(a,b){c._setRepeat(b);return""});var d=f(b);if(d)b=d.element,this.content=this._text=d.text;if(d=a(b))b=d.element,this._attributes=d.attributes;if((this._name=b)&&!m.test(this._name))throw"Invalid abbreviation";},toString:function(){var a=e("utils"),b=this.start,c=this.end,f=this.content,g=this;d.each(s,function(a){b=a(b,g,"start");f=a(f,g,"content");c=a(c,g,
"end")});var j=d.map(this.children,function(a){return a.toString()}).join(""),f=e("abbreviationUtils").insertChildContent(f,j,{keepVariable:!1});return b+a.padString(f,this.padding)+c},hasEmptyChildren:function(){return!!d.find(this.children,function(a){return a.isEmpty()})},hasImplicitName:function(){return!this._name&&!this.isTextNode()},isGroup:function(){return!this.abbreviation},isEmpty:function(){return!this.abbreviation&&!this.children.length},isRepeating:function(){return this.repeatCount>
1||this.hasImplicitRepeat},isTextNode:function(){return!this.name()&&!this.attributeList().length},isElement:function(){return!this.isEmpty()&&!this.isTextNode()},deepestChild:function(){if(!this.children.length)return null;for(var a=this;a.children.length;)a=d.last(a.children);return a}};s.push(function(a,b){return e("utils").replaceCounter(a,b.counter,b.maxCount)});return{parse:function(a,c){var c=c||{},f=b(a);if(c.contextNode){f._name=c.contextNode.name;var g={};d.each(f._attributes,function(a){g[a.name]=
a});d.each(c.contextNode.attributes,function(a){a.name in g?g[a.name].value=a.value:(a=d.clone(a),f._attributes.push(a),g[a.name]=a)})}d.each(q,function(a){a(f,c)});f=l(j(f));d.each(u,function(a){a(f,c)});return f},AbbreviationNode:h,addPreprocessor:function(a){d.include(q,a)||q.push(a)},removeFilter:function(a){preprocessor=d.without(q,a)},addPostprocessor:function(a){d.include(u,a)||u.push(a)},removePostprocessor:function(a){u=d.without(u,a)},addOutputProcessor:function(a){d.include(s,a)||s.push(a)},
removeOutputProcessor:function(a){s=d.without(s,a)},isAllowedChar:function(a){a=String(a);return n(a)||~">+^[](){}".indexOf(a)}}});
emmet.exec(function(e,d){function h(i,b){var c=e("resources"),a=e("elements"),g=e("abbreviationParser");d.each(d.clone(i.children),function(f){var j=c.getMatchedResource(f,b);if(d.isString(j))f.data("resource",a.create("snippet",j));else if(a.is(j,"reference")){j=g.parse(j.data,{syntax:b});if(f.repeatCount>1){var e=j.findAll(function(a){return a.hasImplicitRepeat});d.each(e,function(a){a.repeatCount=f.repeatCount;a.hasImplicitRepeat=!1})}var i=j.deepestChild();i&&d.each(f.children,function(a){i.addChild(a)});
d.each(j.children,function(a){d.each(f.attributeList(),function(b){a.attribute(b.name,b.value)})});f.replace(j.children)}else f.data("resource",j);h(f,b)})}e("abbreviationParser").addPreprocessor(function(d,b){var c=b.syntax||emmet.defaultSyntax();h(d,c)})});
emmet.exec(function(e,d){function h(a){for(var b=e("range"),c=[],a=e("stringStream").create(a);!a.eol();){if(a.peek()=="\\")a.next();else if(a.start=a.pos,a.match(g,!0)){c.push(b.create(a.start,g));continue}a.next()}return c}function i(a,b){var c=e("utils"),g=h(a);g.reverse();d.each(g,function(d){a=c.replaceSubstring(a,b,d)});return a}function b(a){return h(a.content).length?!0:!!d.find(a.attributeList(),function(a){return!!h(a.value).length})}function c(a,c,g){var h=a.findAll(function(a){return b(a)});
b(a)&&h.unshift(a);h.length?d.each(h,function(a){a.content=i(a.content,c);d.each(a._attributes,function(a){a.value=i(a.value,c)})}):(a=a.deepestChild()||a,a.content=g?c:e("abbreviationUtils").insertChildContent(a.content,c))}var a=e("abbreviationParser"),g="$#";a.addPreprocessor(function(a,b){if(b.pastedContent){var c=e("utils"),g=d.map(c.splitByLines(b.pastedContent,!0),c.trim);a.findAll(function(a){if(a.hasImplicitRepeat)return a.data("paste",g),a.repeatCount=g.length})}});a.addPostprocessor(function(a,
b){!a.findAll(function(a){var b=a.data("paste"),f="";d.isArray(b)?f=b[a.counter-1]:d.isFunction(b)?f=b(a.counter-1,a.content):b&&(f=b);f&&c(a,f,!!a.data("pasteOverwrites"));a.data("paste",null);return!!b}).length&&b.pastedContent&&c(a,b.pastedContent)})});emmet.exec(function(e,d){function h(i){var b=e("tagName");d.each(i.children,function(c){if(c.hasImplicitName()||c.data("forceNameResolving"))c._name=b.resolve(c.parent.name());h(c)});return i}e("abbreviationParser").addPostprocessor(h)});
emmet.define("cssParser",function(e,d){function h(a){return typeof a!=="undefined"}function i(){return{"char":f.chnum,line:f.linenum}}function b(a,b,c){var d=f,c=c||{};j.push({charstart:h(c["char"])?c["char"]:d.chnum,charend:h(c.charend)?c.charend:d.chnum,linestart:h(c.line)?c.line:d.linenum,lineend:h(c.lineend)?c.lineend:d.linenum,value:a,type:b||a})}function c(a,b){var c=f,d=b||{},g=h(d["char"])?d["char"]:c.chnum,d=h(d.line)?d.line:c.linenum;return{name:"ParseError",message:a+" at line "+(d+1)+
" char "+(g+1),walker:c,tokens:j}}function a(a){var c=f,d=c.ch,g=i(),j=a?a+d:d,d=c.nextChar();for(a&&(g["char"]-=a.length);n(d)||m(d);)j+=d,d=c.nextChar();b(j,"identifier",g)}function g(){var d=f.ch;if(d===" "||d==="\t"){for(var g=f.ch,j="",e=i();g===" "||g==="\t";)j+=g,g=f.nextChar();b(j,"white",e)}else{if(d==="/"){var g=f,d=e=g.ch,h,s=i();h=g.nextChar();if(h!=="*")s.charend=s["char"],s.lineend=s.line,j=b(d,d,s);else{for(;!(e==="*"&&h==="/");)d+=h,e=h,h=g.nextChar();d+=h;g.nextChar();b(d,"comment",
s)}return j}if(d==='"'||d==="'"){g=f;d=e=j=g.ch;s=i();for(j=g.nextChar();j!==e;){if(j==="\n")if(h=g.nextChar(),h==="\\")d+=j+h;else throw c("Unterminated string",s);else d+=j==="\\"?j+g.nextChar():j;j=g.nextChar()}d+=j;g.nextChar();b(d,"string",s)}else if(d==="("){g=f;j=g.ch;e=0;d=j;h=i();for(j=g.nextChar();j!==")"&&!e;){if(j==="(")e++;else if(j===")")e--;else if(j===!1)throw c("Unterminated brace",h);d+=j;j=g.nextChar()}d+=j;g.nextChar();b(d,"brace",h)}else{if(d==="-"||d==="."||m(d)){j=f;e=j.ch;
d=i();h=e;var s=h===".",v,e=j.nextChar();v=!m(e);if(s&&v)d.charend=d["char"],d.lineend=d.line,g=b(h,".",d);else if(h==="-"&&v)g=a("-");else{for(;e!==!1&&(m(e)||!s&&e===".");)e==="."&&(s=!0),h+=e,e=j.nextChar();b(h,"number",d)}return g}if(n(d))return a();if(l(d))return g=f,d=g.ch,j=i(),h=g.nextChar(),h==="="&&l(d,!0)?(d+=h,b(d,"match",j),g.nextChar(),e=void 0):(j.charend=j["char"]+1,j.lineend=j.line,b(d,d,j)),e;if(d==="\n")b("line"),f.nextChar();else throw c("Unrecognized character");}}}var f,j=[],
l,n,m;f={lines:null,total_lines:0,linenum:-1,line:"",ch:"",chnum:-1,init:function(a){var b=f;b.lines=a.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n");b.total_lines=b.lines.length;b.chnum=-1;b.linenum=-1;b.ch="";b.line="";b.nextLine();b.nextChar()},nextLine:function(){this.linenum+=1;this.line=this.total_lines<=this.linenum?!1:this.lines[this.linenum];if(this.chnum!==-1)this.chnum=0;return this.line},nextChar:function(){for(this.chnum+=1;this.line.charAt(this.chnum)==="";){if(this.nextLine()===
!1)return this.ch=!1;this.chnum=-1;return this.ch="\n"}return this.ch=this.line.charAt(this.chnum)},peek:function(){return this.line.charAt(this.chnum+1)}};n=function(a){return a=="&"||a==="_"||a==="-"||a>="a"&&a<="z"||a>="A"&&a<="Z"};m=function(a){return a!==!1&&a>="0"&&a<="9"};l=function(){for(var a="{}[]()+*=.,;:>~|\\%$#@^!".split(""),b="*^|$~".split(""),c={},d={},f=0;f<a.length;f+=1)c[a[f]]=!0;for(f=0;f<b.length;f+=1)d[b[f]]=!0;return function(a,b){return b?!!d[a]:!!c[a]}}();return{lex:function(a){f.init(a);
for(j=[];f.ch!==!1;)g();return j},parse:function(a){var b=0;return d.map(this.lex(a),function(c){if(c.type=="line")c.value=a.charAt(b)=="\r"&&a.charAt(b+1)=="\n"?"\r\n":a.charAt(b);return{type:c.type,start:b,end:b+=c.value.length}})},toSource:function(a){for(var b=0,c=a.length,d,f="";b<c;b+=1)d=a[b],f+=d.type==="line"?"\n":d.value;return f}}});
emmet.define("xmlParser",function(e){function d(a,d){function f(b){d.tokenize=b;return b(a,d)}var g=a.next();if(g=="<")if(a.eat("!"))return a.eat("[")?a.match("CDATA[")?f(b("atom","]]\>")):null:a.match("--")?f(b("comment","--\>")):a.match("DOCTYPE",!0,!0)?(a.eatWhile(/[\w\._\-]/),f(c(1))):null;else if(a.eat("?"))return a.eatWhile(/[\w\._\-]/),d.tokenize=b("meta","?>"),"meta";else{w=a.eat("/")?"closeTag":"openTag";a.eatSpace();for(v="";g=a.eat(/[^\s\u00a0=<>\"\'\/?]/);)v+=g;d.tokenize=h;return"tag"}else return g==
"&"?(a.eat("#")?a.eat("x")?a.eatWhile(/[a-fA-F\d]/)&&a.eat(";"):a.eatWhile(/[\d]/)&&a.eat(";"):a.eatWhile(/[\w\.\-:]/)&&a.eat(";"))?"atom":"error":(a.eatWhile(/[^&<]/),"text")}function h(a,b){var c=a.next();return c==">"||c=="/"&&a.eat(">")?(b.tokenize=d,w=c==">"?"endTag":"selfcloseTag","tag"):c=="="?(w="equals",null):/[\'\"]/.test(c)?(b.tokenize=i(c),b.tokenize(a,b)):(a.eatWhile(/[^\s\u00a0=<>\"\'\/?]/),"word")}function i(a){return function(b,c){for(;!b.eol();)if(b.next()==a){c.tokenize=h;break}return"string"}}
function b(a,b){return function(c,f){for(;!c.eol();){if(c.match(b)){f.tokenize=d;break}c.next()}return a}}function c(a){return function(b,f){for(var g;(g=b.next())!=null;)if(g=="<")return f.tokenize=c(a+1),f.tokenize(b,f);else if(g==">")if(a==1){f.tokenize=d;break}else return f.tokenize=c(a-1),f.tokenize(b,f);return"meta"}}function a(){for(var a=arguments.length-1;a>=0;a--)k.cc.push(arguments[a])}function g(){a.apply(null,arguments);return!0}function f(){if(k.context)k.context=k.context.prev}function j(a){if(a==
"openTag")return k.tagName=v,g(o,l(k.startOfLine));else if(a=="closeTag")return a=!1,k.context?k.context.tagName!=v&&(s.implicitlyClosed.hasOwnProperty(k.context.tagName.toLowerCase())&&f(),a=!k.context||k.context.tagName!=v):a=!0,a&&(t="error"),g(n(a));return g()}function l(a){return function(b){if(b=="selfcloseTag"||b=="endTag"&&s.autoSelfClosers.hasOwnProperty(k.tagName.toLowerCase()))return m(k.tagName.toLowerCase()),g();if(b=="endTag"){m(k.tagName.toLowerCase());var b=k.tagName,c=s.doNotIndent.hasOwnProperty(b)||
k.context&&k.context.noIndent;k.context={prev:k.context,tagName:b,indent:k.indented,startOfLine:a,noIndent:c}}return g()}}function n(a){return function(b){a&&(t="error");if(b=="endTag")return f(),g();t="error";return g(arguments.callee)}}function m(a){for(var b;;){if(!k.context)break;b=k.context.tagName.toLowerCase();if(!s.contextGrabbers.hasOwnProperty(b)||!s.contextGrabbers[b].hasOwnProperty(a))break;f()}}function o(b){if(b=="word")return t="attribute",g(p,o);if(b=="endTag"||b=="selfcloseTag")return a();
t="error";return g(o)}function p(b){if(b=="equals")return g(r,o);s.allowMissing||(t="error");return b=="endTag"||b=="selfcloseTag"?a():g()}function r(b){if(b=="string")return g(q);if(b=="word"&&s.allowUnquoted)return t="string",g();t="error";return b=="endTag"||b=="selfCloseTag"?a():g()}function q(b){return b=="string"?g(q):a()}function u(a,b){if(a.sol())b.startOfLine=!0,b.indented=0;if(a.eatSpace())return null;t=w=v=null;var c=b.tokenize(a,b);b.type=w;if((c||w)&&c!="comment")for(k=b;;)if((b.cc.pop()||
j)(w||c))break;b.startOfLine=!1;return t||c}var s={autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!0,allowMissing:!0},v=null,w=null,k=null,t;return{parse:function(a,b){for(var b=b||0,c={tokenize:d,cc:[],indented:0,startOfLine:!0,tagName:null,context:null},f=e("stringStream").create(a),g=[];!f.eol();)g.push({type:u(f,c),start:f.start+b,end:f.pos+b}),f.start=f.pos;return g}}});
emmet.define("string-score",function(){return{score:function(e,d,h){if(e==d)return 1;if(d=="")return 0;for(var i=0,b=d.length,c=e.length,a,g=1,f=0,j,l,n,m;f<b;++f){n=d.charAt(f);j=e.indexOf(n.toLowerCase());l=e.indexOf(n.toUpperCase());m=Math.min(j,l);l=m>-1?m:Math.max(j,l);if(l===-1)if(h){g+=1-h;continue}else return 0;else j=0.1;e[l]===n&&(j+=0.1);l===0?(j+=0.6,f===0&&(a=1)):e.charAt(l-1)===" "&&(j+=0.8);e=e.substring(l+1,c);i+=j}e=i/b;b=(e*(b/c)+e)/2;b/=g;a&&b+0.15<1&&(b+=0.15);return b}}});
emmet.define("utils",function(e,d){function h(b){this._data=[];this.length=0;b&&this.append(b)}var i="${0}";h.prototype={append:function(b){this._data.push(b);this.length+=b.length},toString:function(){return this._data.join("")},valueOf:function(){return this.toString()}};return{reTag:/<\/?[\w:\-]+(?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*\s*(\/?)>$/,endsWithTag:function(b){return this.reTag.test(b)},isNumeric:function(b){typeof b=="string"&&(b=b.charCodeAt(0));return b&&b>47&&
b<58},trim:function(b){return(b||"").replace(/^\s+|\s+$/g,"")},getNewline:function(){var b=e("resources");if(!b)return"\n";b=b.getVariable("newline");return d.isString(b)?b:"\n"},setNewline:function(b){var c=e("resources");c.setVariable("newline",b);c.setVariable("nl",b)},splitByLines:function(b,c){var a=this.getNewline(),a=(b||"").replace(/\r\n/g,"\n").replace(/\n\r/g,"\n").replace(/\r/g,"\n").replace(/\n/g,a).split(a);c&&(a=d.filter(a,function(a){return a.length&&!!this.trim(a)},this));return a},
normalizeNewline:function(b){return this.splitByLines(b).join(this.getNewline())},repeatString:function(b,c){for(var a=[],d=0;d<c;d++)a.push(b);return a.join("")},getStringsPads:function(b){var b=d.map(b,function(a){return d.isString(a)?a.length:+a}),c=d.max(b);return d.map(b,function(a){return(a=c-a)?this.repeatString(" ",a):""},this)},padString:function(b,c){var a=d.isNumber(c)?this.repeatString(e("resources").getVariable("indentation")||"\t",c):c,g=[],f=this.splitByLines(b),j=this.getNewline();
g.push(f[0]);for(var h=1;h<f.length;h++)g.push(j+a+f[h]);return g.join("")},zeroPadString:function(b,c){for(var a="",d=b.length;c>d++;)a+="0";return a+b},unindentString:function(b,c){for(var a=this.splitByLines(b),d=0;d<a.length;d++)a[d].search(c)==0&&(a[d]=a[d].substr(c.length));return a.join(this.getNewline())},replaceUnescapedSymbol:function(b,c,a){for(var g=0,f=b.length,j=c.length,e=0;g<f;)if(b.charAt(g)=="\\")g+=j+1;else if(b.substr(g,j)==c){var h=j;e++;var i=a;if(d.isFunction(a))(i=a(b,c,g,
e))?(h=i[0].length,i=i[1]):i=!1;i===!1?g++:(b=b.substring(0,g)+i+b.substring(g+h),f=b.length,g+=i.length)}else g++;return b},replaceVariables:function(b,c){var c=c||{},a=d.isFunction(c)?c:function(a,b){return b in c?c[b]:null},g=e("resources");return e("tabStops").processText(b,{variable:function(b){var c=a(b.token,b.name,b);c===null&&(c=g.getVariable(b.name));if(c===null||d.isUndefined(c))c=b.token;return c}})},replaceCounter:function(b,c,a){b=String(b);c=String(c);/^\-?\d+$/.test(c)&&(c=+c);var g=
this;return this.replaceUnescapedSymbol(b,"$",function(b,j,e){if(b.charAt(e+1)=="{"||g.isNumeric(b.charAt(e+1)))return!1;for(j=e+1;b.charAt(j)=="$"&&b.charAt(j+1)!="{";)j++;var h=j-e,i=0,o=!1,p;if(p=b.substr(j).match(/^@(\-?)(\d*)/))j+=p[0].length,p[1]&&(o=!0),i=parseInt(p[2]||1)-1;o&&a&&d.isNumber(c)&&(c=a-c+1);c+=i;return[b.substring(e,j),g.zeroPadString(c+"",h)]})},matchesTag:function(b){return this.reTag.test(b||"")},escapeText:function(b){return b.replace(/([\$\\])/g,"\\$1")},unescapeText:function(b){return b.replace(/\\(.)/g,
"$1")},getCaretPlaceholder:function(){return d.isFunction(i)?i.apply(this,arguments):i},setCaretPlaceholder:function(b){i=b},getLinePadding:function(b){return(b.match(/^(\s+)/)||[""])[0]},getLinePaddingFromPosition:function(b,c){return this.getLinePadding(this.findNewlineBounds(b,c).substring(b))},escapeForRegexp:function(b){return b.replace(RegExp("[.*+?|()\\[\\]{}\\\\]","g"),"\\$&")},prettifyNumber:function(b,c){return b.toFixed(typeof c=="undefined"?2:c).replace(/\.?0+$/,"")},stringBuilder:function(b){return new h(b)},
replaceSubstring:function(b,c,a,g){if(d.isObject(a)&&"end"in a)g=a.end,a=a.start;d.isString(g)&&(g=a+g.length);d.isUndefined(g)&&(g=a);return a<0||a>b.length?b:b.substring(0,a)+c+b.substring(g)},narrowToNonSpace:function(b,c,a){c=e("range").create(c,a);for(a=/[\s\n\r\u00a0]/;c.start<c.end;){if(!a.test(b.charAt(c.start)))break;c.start++}for(;c.end>c.start;)if(c.end--,!a.test(b.charAt(c.end))){c.end++;break}return c},findNewlineBounds:function(b,c){for(var a=b.length,d=0,f=a-1,j=c-1;j>0;j--){var h=
b.charAt(j);if(h=="\n"||h=="\r"){d=j+1;break}}for(j=c;j<a;j++)if(h=b.charAt(j),h=="\n"||h=="\r"){f=j;break}return e("range").create(d,f-d)},deepMerge:function(){var b,c,a,g,f,j=arguments[0]||{},e=1,h=arguments.length;for(!d.isObject(j)&&!d.isFunction(j)&&(j={});e<h;e++)if((b=arguments[e])!=null)for(c in b)a=j[c],g=b[c],j!==g&&(g&&(d.isObject(g)||(f=d.isArray(g)))?(f?(f=!1,a=a&&d.isArray(a)?a:[]):a=a&&d.isObject(a)?a:{},j[c]=this.deepMerge(a,g)):g!==void 0&&(j[c]=g));return j}}});
emmet.define("range",function(e,d){function h(b,c,a){switch(a){case "eq":case "==":return b===c;case "lt":case "<":return b<c;case "lte":case "<=":return b<=c;case "gt":case ">":return b>c;case "gte":case ">=":return b>=c}}function i(b,c){d.isObject(b)&&"start"in b?(this.start=Math.min(b.start,b.end),this.end=Math.max(b.start,b.end)):d.isArray(b)?(this.start=b[0],this.end=b[1]):(c=d.isString(c)?c.length:+c,this.start=b,this.end=b+c)}i.prototype={length:function(){return Math.abs(this.end-this.start)},
equal:function(b){return this.cmp(b,"eq","eq")},shift:function(b){this.start+=b;this.end+=b;return this},overlap:function(b){return b.start<=this.end&&b.end>=this.start},intersection:function(b){if(this.overlap(b)){var c=Math.max(b.start,this.start);return new i(c,Math.min(b.end,this.end)-c)}return null},union:function(b){if(this.overlap(b)){var c=Math.min(b.start,this.start);return new i(c,Math.max(b.end,this.end)-c)}return null},inside:function(b){return this.cmp(b,"lte","gt")},contains:function(b){return this.cmp(b,
"lt","gt")},include:function(){return this.cmp(loc,"lte","gte")},cmp:function(b,c,a){var d;b instanceof i?(d=b.start,b=b.end):d=b;return h(this.start,d,c||"<=")&&h(this.end,b,a||">")},substring:function(b){return this.length()>0?b.substring(this.start,this.end):""},clone:function(){return new i(this.start,this.length())},toArray:function(){return[this.start,this.end]},toString:function(){return"{"+this.start+", "+this.length()+"}"}};return{create:function(b,c){if(d.isUndefined(b)||b===null)return null;
if(b instanceof i)return b;if(d.isObject(b)&&"start"in b&&"end"in b)c=b.end-b.start,b=b.start;return new i(b,c)},create2:function(b,c){d.isNumber(b)&&d.isNumber(c)&&(c-=b);return this.create(b,c)}}});
emmet.define("handlerList",function(e,d){function h(){this._list=[]}h.prototype={add:function(e,b){this._list.push(d.extend({order:0},b||{},{fn:e}))},remove:function(e){this._list=d.without(this._list,d.find(this._list,function(b){return b.fn===e}))},list:function(){return d.sortBy(this._list,"order").reverse()},listFn:function(){return d.pluck(this.list(),"fn")},exec:function(e,b){var b=b||[],c=null;d.find(this.list(),function(a){c=a.fn.apply(a,b);if(c!==e)return!0});return c}};return{create:function(){return new h}}});
emmet.define("tokenIterator",function(e,d){function h(d){this.tokens=d;this._position=0;this.reset()}h.prototype={next:function(){if(this.hasNext()){var d=this.tokens[++this._i];this._position=d.start;return d}return null},current:function(){return this.tokens[this._i]},position:function(){return this._position},hasNext:function(){return this._i<this._il-1},reset:function(){this._i=-1;this._il=this.tokens.length},item:function(){return this.tokens[this._i]},itemNext:function(){return this.tokens[this._i+
1]},itemPrev:function(){return this.tokens[this._i-1]},nextUntil:function(e,b){for(var c,a=d.isString(e)?function(a){return a.type==e}:e;c=this.next();)if(b&&b.call(this,c),a.call(this,c))break}};return{create:function(d){return new h(d)}}});
emmet.define("stringStream",function(){function e(d){this.pos=this.start=0;this.string=d}e.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return this.pos==0},peek:function(){return this.string.charAt(this.pos)},next:function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},eat:function(d){var e=this.string.charAt(this.pos);if(typeof d=="string"?e==d:e&&(d.test?d.test(e):d(e)))return++this.pos,e},eatWhile:function(d){for(var e=this.pos;this.eat(d););
return this.pos>e},eatSpace:function(){for(var d=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>d},skipToEnd:function(){this.pos=this.string.length},skipTo:function(d){d=this.string.indexOf(d,this.pos);if(d>-1)return this.pos=d,!0},skipToPair:function(d,e){for(var i=0,b,c=this.pos,a=this.string.length;c<a;)if(b=this.string.charAt(c++),b==d)i++;else if(b==e&&(i--,i<1))return this.pos=c,!0;return!1},backUp:function(d){this.pos-=d},match:function(d,e,i){if(typeof d==
"string"){if(i=i?function(b){return b.toLowerCase()}:function(b){return b},i(this.string).indexOf(i(d),this.pos)==this.pos)return e!==!1&&(this.pos+=d.length),!0}else return(d=this.string.slice(this.pos).match(d))&&e!==!1&&(this.pos+=d[0].length),d},current:function(){return this.string.slice(this.start,this.pos)}};return{create:function(d){return new e(d)}}});
emmet.define("resources",function(e,d){function h(a,c,d){var g=e("utils"),c=g.replaceUnescapedSymbol(c,"|",g.getCaretPlaceholder());if(d=="snippets")return e("elements").create("snippet",c);if(d=="abbreviations"){d=c;e("utils").trim(a);var a=e("elements"),h;return(h=b.exec(d))?a.create("element",h[1],h[2],h[4]=="/"):a.create("reference",d)}}var i={},b=/^<(\w+\:?[\w\-]*)((?:\s+[\w\:\-]+\s*=\s*(['"]).*?\3)*)\s*(\/?)>/,c={},a={},g=e("handlerList").create();return{setVocabulary:function(b,d){i={};d==
"system"?c=b:a=b},getVocabulary:function(b){return b=="system"?c:a},getMatchedResource:function(a,b){return g.exec(null,d.toArray(arguments))||this.findSnippet(b,a.name())},getVariable:function(a){return(this.getSection("variables")||{})[a]},setVariable:function(a,b){var c=this.getVocabulary("user")||{};if(!("variables"in c))c.variables={};c.variables[a]=b;this.setVocabulary(c,"user")},hasSyntax:function(a){return a in this.getVocabulary("user")||a in this.getVocabulary("system")},addResolver:function(a,
b){g.add(a,b)},removeResolver:function(a){g.remove(a)},getSection:function(b){if(!b)return null;b in i||(i[b]=e("utils").deepMerge({},c[b],a[b]));for(var g=i[b],h=d.rest(arguments),n;g&&(n=h.shift());)if(n in g)g=g[n];else return null;return g},findItem:function(a,b){for(var c=this.getSection(a);c;){if(b in c)return c[b];c=this.getSection(c["extends"])}},findSnippet:function(a,b,c){if(!a||!b)return null;var c=c||[],g=[b];~b.indexOf("-")&&g.push(b.replace(/\-/g,":"));var e=this.getSection(a),i=null;
d.find(["snippets","abbreviations"],function(b){var c=this.getSection(a,b);if(c)return d.find(g,function(a){if(c[a])return i=h(a,c[a],b)})},this);c.push(a);return!i&&e["extends"]&&!d.include(c,e["extends"])?this.findSnippet(e["extends"],b,c):i},fuzzyFindSnippet:function(a,b,c){var c=c||0.3,a=this.getAllSnippets(a),g=e("string-score"),b=b.replace(/:$/,"").replace(/:/g,"-"),h=d.map(a,function(a,c){return{key:c,score:g.score(a.nk,b,0.1)}});if((h=d.last(d.sortBy(h,"score")))&&h.score>=c)return a[h.key].parsedValue},
getAllSnippets:function(a){var b="all-"+a;if(!i[b]){var c=[],g=[];do{var e=this.getSection(a);if(!e)break;d.each(["snippets","abbreviations"],function(a){var b={};d.each(e[a]||null,function(c,d){b[d]={nk:d.replace(/:$/,"").replace(/:/g,"-"),value:c,parsedValue:h(d,c,a),type:a}});c.push(b)});g.push(a);a=e["extends"]}while(a&&!d.include(g,a));i[b]=d.extend.apply(d,c.reverse())}return i[b]}}});
emmet.define("actions",function(e,d){function h(b){return e("utils").trim(b.charAt(0).toUpperCase()+b.substring(1).replace(/_[a-z]/g,function(b){return" "+b.charAt(1).toUpperCase()}))}var i={};return{add:function(b,c,a){b=b.toLowerCase();a=a||{};if(!a.label)a.label=h(b);i[b]={name:b,fn:c,options:a}},get:function(b){return i[b.toLowerCase()]},run:function(b,c){d.isArray(c)||(c=d.rest(arguments));var a=this.get(b);return a?a.fn.apply(emmet,c):(emmet.log('Action "%s" is not defined',b),!1)},getAll:function(){return i},
getList:function(){return d.values(this.getAll())},getMenu:function(b){var c=[],b=b||[];d.each(this.getList(),function(a){if(!a.options.hidden&&!d.include(b,a.name)){var g=h(a.name),f=c;if(a.options.label)for(var j=a.options.label.split("/"),g=j.pop(),e,i;e=j.shift();)i=d.find(f,function(a){return a.type=="submenu"&&a.name==e}),i||(i={name:e,type:"submenu",items:[]},f.push(i)),f=i.items;f.push({type:"action",name:a.name,label:g})}});return c},getActionNameForMenuTitle:function(b,c){var a=null;d.find(c||
this.getMenu(),function(c){if(c.type=="action"){if(c.label==b||c.name==b)return a=c.name}else return a=this.getActionNameForMenuTitle(b,c.items)},this);return a||null}}});
emmet.define("profile",function(e,d){function h(a){d.extend(this,g,a)}function i(a,b){switch(String(b||"").toLowerCase()){case "lower":return a.toLowerCase();case "upper":return a.toUpperCase()}return a}function b(b,c){return a[b.toLowerCase()]=new h(c)}function c(){b("xhtml");b("html",{self_closing_tag:!1});b("xml",{self_closing_tag:!0,tag_nl:!0});b("plain",{tag_nl:!1,indent:!1,place_cursor:!1});b("line",{tag_nl:!1,indent:!1,extraFilters:"s"})}var a={},g={tag_case:"asis",attr_case:"asis",attr_quotes:"double",
tag_nl:"decide",tag_nl_leaf:!1,place_cursor:!0,indent:!0,inline_break:3,self_closing_tag:"xhtml",filters:"",extraFilters:""};h.prototype={tagName:function(a){return i(a,this.tag_case)},attributeName:function(a){return i(a,this.attr_case)},attributeQuote:function(){return this.attr_quotes=="single"?"'":'"'},selfClosing:function(){return this.self_closing_tag=="xhtml"?" /":this.self_closing_tag===!0?"/":""},cursor:function(){return this.place_cursor?e("utils").getCaretPlaceholder():""}};c();return{create:function(a,
c){return arguments.length==2?b(a,c):new h(d.defaults(a||{},g))},get:function(b,c){if(!b&&c){var g=e("resources").findItem(c,"profile");g&&(b=g)}return!b?a.plain:b instanceof h?b:d.isString(b)&&b.toLowerCase()in a?a[b.toLowerCase()]:this.create(b)},remove:function(b){b=(b||"").toLowerCase();b in a&&delete a[b]},reset:function(){a={};c()},stringCase:i}});
emmet.define("editorUtils",function(e){return{isInsideTag:function(d,e){for(var i=/^<\/?\w[\w\:\-]*.*?>/,b=e;b>-1;){if(d.charAt(b)=="<")break;b--}return b!=-1&&(i=i.exec(d.substring(b)))&&e>b&&e<b+i[0].length?!0:!1},outputInfo:function(d,e,i){i=i||d.getProfileName();return{syntax:String(e||d.getSyntax()),profile:i?String(i):null,content:String(d.getContent())}},unindent:function(d,h){return e("utils").unindentString(h,this.getCurrentLinePadding(d))},getCurrentLinePadding:function(d){return e("utils").getLinePadding(d.getCurrentLine())}}});
emmet.define("actionUtils",function(e){return{mimeTypes:{gif:"image/gif",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",svg:"image/svg+xml",html:"text/html",htm:"text/html"},extractAbbreviation:function(d){for(var h=d.length,i=-1,b=0,c=0,a=0,g=e("utils"),f=e("abbreviationParser");;){h--;if(h<0){i=0;break}var j=d.charAt(h);if(j=="]")c++;else if(j=="["){if(!c){i=h+1;break}c--}else if(j=="}")a++;else if(j=="{"){if(!a){i=h+1;break}a--}else if(j==")")b++;else if(j=="("){if(!b){i=h+1;break}b--}else if(!c&&
!a&&(!f.isAllowedChar(j)||j==">"&&g.endsWithTag(d.substring(0,h+1)))){i=h+1;break}}return i!=-1&&!a&&!c&&!b?d.substring(i).replace(/^[\*\+\>\^]+/,""):""},getImageSize:function(d){var e=function(){return d.charCodeAt(i++)};if(d.substr(0,8)==="\u0089PNG\r\n\u001a\n"){var i=d.indexOf("IHDR")+4;return{width:e()<<24|e()<<16|e()<<8|e(),height:e()<<24|e()<<16|e()<<8|e()}}else if(d.substr(0,4)==="GIF8")return i=6,{width:e()|e()<<8,height:e()|e()<<8};else if(d.substr(0,2)==="\u00ff\u00d8")for(var i=2,b=d.length;i<
b;){if(e()!=255)break;var c=e();if(c==218)break;var a=e()<<8|e();if(c>=192&&c<=207&&!(c&4)&&!(c&8))return i+=1,{height:e()<<8|e(),width:e()<<8|e()};else i+=a-2}},captureContext:function(d){if(String(d.getSyntax())in{html:1,xml:1,xsl:1}){var h=String(d.getContent()),i=e("htmlMatcher").find(h,d.getCaretPos());if(i&&i.type=="tag"){for(var d=/([\w\-:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,i=i.open,h=i.range.substring(h).replace(/^<[\w\-\:]+/,""),i={name:i.name,attributes:[]},
b;b=d.exec(h);)i.attributes.push({name:b[1],value:b[2]});return i}}return null},findExpressionBounds:function(d,h){for(var i=String(d.getContent()),b=i.length,c=d.getCaretPos()-1,a=c+1;c>=0&&h(i.charAt(c),c,i);)c--;for(;a<b&&h(i.charAt(a),a,i);)a++;if(a>c)return e("range").create([++c,a])},compoundUpdate:function(d,e){if(e){var i=d.getSelectionRange();d.replaceContent(e.data,e.start,e.end,!0);d.createSelection(e.caret,e.caret+i.end-i.start);return!0}return!1},detectSyntax:function(d,h){var i=h||"html";
e("resources").hasSyntax(i)||(i="html");if(i=="html"&&(this.isStyle(d)||this.isInlineCSS(d)))i="css";return i},detectProfile:function(d){var h=d.getSyntax(),i=e("resources").findItem(h,"profile");if(i)return i;switch(h){case "xml":case "xsl":return"xml";case "css":if(this.isInlineCSS(d))return"line";break;case "html":return(i=e("resources").getVariable("profile"))||(i=this.isXHTML(d)?"xhtml":"html"),i}return"xhtml"},isXHTML:function(d){return d.getContent().search(/<!DOCTYPE[^>]+XHTML/i)!=-1},isStyle:function(d){var h=
String(d.getContent()),d=d.getCaretPos();return(h=e("htmlMatcher").tag(h,d))&&h.open.name.toLowerCase()=="style"&&h.innerRange.cmp(d,"lte","gte")},isInlineCSS:function(d){var h=String(d.getContent()),d=d.getCaretPos();return(h=e("xmlEditTree").parseFromPosition(h,d,!0))?(h=h.itemFromPosition(d,!0))&&h.name().toLowerCase()=="style"&&h.valueRange(!0).cmp(d,"lte","gte"):!1}}});
emmet.define("abbreviationUtils",function(e,d){return{isSnippet:function(d){return e("elements").is(d.matchedResource(),"snippet")},isUnary:function(d){return d.children.length||d._text||this.isSnippet(d)?!1:(d=d.matchedResource())&&d.is_empty},isInline:function(d){return d.isTextNode()||!d.name()||e("tagName").isInlineLevel(d.name())},isBlock:function(d){return this.isSnippet(d)||!this.isInline(d)},isSnippet:function(d){return e("elements").is(d.matchedResource(),"snippet")},hasTagsInContent:function(d){return e("utils").matchesTag(d.content)},
hasBlockChildren:function(e){return this.hasTagsInContent(e)&&this.isBlock(e)||d.any(e.children,function(d){return this.isBlock(d)},this)},insertChildContent:function(h,i,b){var b=d.extend({keepVariable:!0,appendIfNoChild:!0},b||{}),c=!1,a=e("utils"),h=a.replaceVariables(h,function(d,f,e){var l=d;f=="child"&&(l=a.padString(i,a.getLinePaddingFromPosition(h,e.start)),c=!0,b.keepVariable&&(l+=d));return l});!c&&b.appendIfNoChild&&(h+=i);return h}}});
emmet.define("base64",function(){return{encode:function(e){for(var d=[],h,i,b,c,a,g,f=0,j=e.length;f<j;)c=e.charCodeAt(f++),a=e.charCodeAt(f++),g=e.charCodeAt(f++),h=c&255,i=a&255,b=g&255,c=h>>2,h=(h&3)<<4|i>>4,i=(i&15)<<2|b>>6,b&=63,isNaN(a)?i=b=64:isNaN(g)&&(b=64),d.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(i)+
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b));return d.join("")},decode:function(e){var d,h,i,b,c,a=0,g=0,f=[],j=e.length;if(!e)return e;e+="";do d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(a++)),h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(a++)),b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(a++)),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(e.charAt(a++)),
i=d<<18|h<<12|b<<6|c,d=i>>16&255,h=i>>8&255,i&=255,b==64?f[g++]=String.fromCharCode(d):c==64?f[g++]=String.fromCharCode(d,h):f[g++]=String.fromCharCode(d,h,i);while(a<j);return f.join("")}}});
emmet.define("htmlMatcher",function(e,d){function h(b){var d={},j;return{open:function(a){return(a=this.matches(a))&&a.type=="open"?a:null},close:function(a){return(a=this.matches(a))&&a.type=="close"?a:null},matches:function(h){var i="p"+h;if(!(i in d)&&b.charAt(h)=="<"){var m=b.slice(h);d[i]=(j=m.match(c))?{name:j[1],selfClose:!!j[3],range:e("range").create(h,j[0]),type:"open"}:(j=m.match(a))?{name:j[1],range:e("range").create(h,j[0]),type:"close"}:!1}return d[i]},text:function(){return b}}}function i(a,
b,c){return a.substring(b,b+c.length)==c}function b(a,b){for(var c=[],e=null,h=b.text(),m=a.range.end,o=h.length;m<o;m++){if(i(h,m,"<\!--"))for(e=m;e<o;e++)if(i(h,e,"--\>")){m=e+3;break}if(e=b.matches(m))if(e.type=="open"&&!e.selfClose)c.push(e.name);else if(e.type=="close"){if(!c.length)return e.name==a.name?e:null;if(d.last(c)==e.name)c.pop();else{for(var p=!1;c.length&&!p;)c.pop()==e.name&&(p=!0);if(!c.length&&!p)return e.name==a.name?e:null}}}}var c=/^<([\w\:\-]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
a=/^<\/([\w\:\-]+)[^>]*>/;return{find:function(a,c){for(var j=e("range"),l=h(a),n=null,m=null,o=c;o>=0;o--)if(n=l.open(o))if(n.selfClose){if(n.range.cmp(c,"lt","gt"))break}else{if(m=b(n,l)){if(j.create2(n.range.start,m.range.end).contains(c))break}else if(n.range.contains(c))break;n=null}else if(i(a,o,"--\>"))for(var p=o-1;p>=0;p--)if(i(a,p,"--\>"))break;else{if(i(a,p,"<\!--")){o=p;break}}else if(i(a,o,"<\!--")){p=o+4;for(n=a.length;p<n;p++)if(i(a,p,"--\>")){p+=3;break}n={range:e("range").create(o,
d.isNumber(p)?p-o:p[0]),type:"comment"};break}if(n)return p=o=null,m?(o=j.create2(n.range.start,m.range.end),p=j.create2(n.range.end,m.range.start)):o=p=j.create2(n.range.start,n.range.end),n.type=="comment"&&(j=o.substring(a),p.start+=j.length-j.replace(/^<\!--\s*/,"").length,p.end-=j.length-j.replace(/\s*--\>$/,"").length),{open:n,close:m,type:n.type=="comment"?"comment":"tag",innerRange:p,innerContent:function(){return this.innerRange.substring(a)},outerRange:o,outerContent:function(){return this.outerRange.substring(a)},
range:!p.length()||!p.cmp(c,"lte","gte")?o:p,content:function(){return this.range.substring(a)},source:a}},tag:function(a,b){var c=this.find(a,b);if(c&&c.type=="tag")return c}}});
emmet.define("tabStops",function(e,d){var h=100,i=0,b={replaceCarets:!1,escape:function(b){return"\\"+b},tabstop:function(b){return b.token},variable:function(b){return b.token}};e("abbreviationParser").addOutputProcessor(function(b,a){var d=0,f=e("tabStops"),j=e("utils"),h={tabstop:function(a){var b=parseInt(a.group);if(b==0)return"${0}";b>d&&(d=b);return a.placeholder?(b+=i,a=f.processText(a.placeholder,h),"${"+b+":"+a+"}"):"${"+(b+i)+"}"}},b=f.processText(b,h),b=j.replaceVariables(b,f.variablesResolver(a));
i+=d+1;return b});return{extract:function(c,a){var g=e("utils"),f={carets:""},j=[],a=d.extend({},b,a,{tabstop:function(a){var b=a.token,c="";if(a.placeholder=="cursor")j.push({start:a.start,end:a.start+b.length,group:"carets",value:""});else{if("placeholder"in a)f[a.group]=a.placeholder;a.group in f&&(c=f[a.group]);j.push({start:a.start,end:a.start+b.length,group:a.group,value:c})}return b}});a.replaceCarets&&(c=c.replace(RegExp(g.escapeForRegexp(g.getCaretPlaceholder()),"g"),"${0:cursor}"));var c=
this.processText(c,a),h=g.stringBuilder(),i=0,g=d.map(j,function(a){h.append(c.substring(i,a.start));var b=h.length,d=f[a.group]||"";h.append(d);i=a.end;return{group:a.group,start:b,end:b+d.length}});h.append(c.substring(i));return{text:h.toString(),tabstops:d.sortBy(g,"start")}},processText:function(c,a){for(var a=d.extend({},b,a),g=e("utils").stringBuilder(),f=e("stringStream").create(c),j,h;j=f.next();)if(j=="\\"&&!f.eol())g.append(a.escape(f.next()));else{h=j;if(j=="$")if(f.start=f.pos-1,f.match(/^[0-9]+/))h=
a.tabstop({start:g.length,group:f.current().substr(1),token:f.current()});else if(j=f.match(/^\{([a-z_\-][\w\-]*)\}/))h=a.variable({start:g.length,name:j[1],token:f.current()});else if(j=f.match(/^\{([0-9]+)(:.+?)?\}/,!1)){f.skipToPair("{","}");h={start:g.length,group:j[1],token:f.current()};if(j=h.token.substring(h.group.length+2,h.token.length-1))h.placeholder=j.substr(1);h=a.tabstop(h)}g.append(h)}return g.toString()},upgrade:function(b,a){var g=0,f={tabstop:function(b){var c=parseInt(b.group);
c>g&&(g=c);return b.placeholder?"${"+(c+a)+":"+b.placeholder+"}":"${"+(c+a)+"}"}};d.each(["start","end","content"],function(a){b[a]=this.processText(b[a],f)},this);return g},variablesResolver:function(b){var a={},g=e("resources");return function(f,j){if(j=="child")return f;if(j=="cursor")return e("utils").getCaretPlaceholder();var i=b.attribute(j);if(!d.isUndefined(i)&&i!==f)return i;if(i=g.getVariable(j))return i;a[j]||(a[j]=h++);return"${"+a[j]+":"+j+"}"}},resetTabstopIndex:function(){i=0;h=100}}});
emmet.define("preferences",function(e,d){var h={},i={},b=null,c=null;return{define:function(a,b,c){var e=a;d.isString(a)&&(e={},e[a]={value:b,description:c});d.each(e,function(a,b){i[b]=d.isObject(a)&&"value"in a&&d.keys(a).length<3?a:{value:a}})},set:function(a,b){var c=a;d.isString(a)&&(c={},c[a]=b);d.each(c,function(a,b){if(!(b in i))throw'Property "'+b+'" is not defined. You should define it first with `define` method of current module';if(a!==i[b].value){switch(typeof i[b].value){case "boolean":var c=
a;d.isString(c)?(c=c.toLowerCase(),a=c=="yes"||c=="true"||c=="1"):a=!!c;break;case "number":a=parseInt(a+"",10)||0;break;default:a!==null&&(a+="")}h[b]=a}else b in h&&delete h[b]})},get:function(a){if(a in h)return h[a];if(a in i)return i[a].value},getArray:function(a){a=this.get(a);if(d.isUndefined(a)||a===null||a==="")return null;a=d.map(a.split(","),e("utils").trim);return!a.length?null:a},getDict:function(a){var b={};d.each(this.getArray(a),function(a){a=a.split(":");b[a[0]]=a[1]});return b},
description:function(a){return a in i?i[a].description:void 0},remove:function(a){d.isArray(a)||(a=[a]);d.each(a,function(a){a in h&&delete h[a];a in i&&delete i[a]})},list:function(){return d.map(d.keys(i).sort(),function(a){return{name:a,value:this.get(a),type:typeof i[a].value,description:i[a].description}},this)},load:function(a){d.each(a,function(a,b){this.set(b,a)},this)},exportModified:function(){return d.clone(h)},reset:function(){h={}},_startTest:function(){b=i;c=h;i={};h={}},_stopTest:function(){i=
b;h=c}}});
emmet.define("filters",function(e,d){function h(b){return!b?[]:d.isString(b)?b.split(/[\|,]/g):b}var i={};return{add:function(b,c){i[b]=c},apply:function(b,c,a){var g=e("utils"),a=e("profile").get(a);d.each(h(c),function(c){(c=g.trim(c.toLowerCase()))&&c in i&&(b=i[c](b,a))});return b},composeList:function(b,c,a){c=e("profile").get(c);b=h(c.filters||e("resources").findItem(b,"filters")||"html");c.extraFilters&&(b=b.concat(h(c.extraFilters)));a&&(b=b.concat(h(a)));if(!b||!b.length)b=h("html");return b},
extractFromAbbreviation:function(b){var c="",b=b.replace(/\|([\w\|\-]+)$/,function(a,b){c=b;return""});return[b,h(c)]}}});
emmet.define("elements",function(e,d){function h(a){return{data:a}}var i={},b=/([\w\-]+)\s*=\s*(['"])(.*?)\2/g,c={add:function(a,b){var c=this;i[a]=function(){var d=b.apply(c,arguments);if(d)d.type=a;return d}},get:function(a){return i[a]},create:function(a){var b=[].slice.call(arguments,1),c=this.get(a);return c?c.apply(this,b):null},is:function(a,b){return a&&a.type===b}};c.add("element",function(a,c,f){var e={name:a,is_empty:!!f};if(c)if(e.attributes=[],d.isArray(c))e.attributes=c;else if(d.isString(c))for(;a=
b.exec(c);)e.attributes.push({name:a[1],value:a[3]});else d.each(c,function(a,b){e.attributes.push({name:b,value:a})});return e});c.add("snippet",h);c.add("reference",h);c.add("empty",function(){return{}});return c});
emmet.define("editTree",function(e,d,h){function i(a,b){this.options=d.extend({offset:0},b);this.source=a;this._children=[];this._positions={name:0};this.initialize.apply(this,arguments)}function b(a,b,c){this.parent=a;this._name=b.value;this._value=c?c.value:"";this._positions={name:b.start,value:c?c.start:-1};this.initialize.apply(this,arguments)}var c=e("range").create;i.extend=h.extend;i.prototype={initialize:function(){},_updateSource:function(a,b,f){var j=c(b,d.isUndefined(f)?0:f-b),h=a.length-
j.length(),i=function(a){d.each(a,function(b,c){b>=j.end&&(a[c]+=h)})};i(this._positions);d.each(this.list(),function(a){i(a._positions)});this.source=e("utils").replaceSubstring(this.source,a,j)},add:function(a,c){var d=new b(a,c);this._children.push(d);return d},get:function(a){return d.isNumber(a)?this.list()[a]:d.isString(a)?d.find(this.list(),function(b){return b.name()===a}):a},getAll:function(a){d.isArray(a)||(a=[a]);var b=[],c=[];d.each(a,function(a){d.isString(a)?b.push(a):d.isNumber(a)&&
c.push(a)});return d.filter(this.list(),function(a,e){return d.include(c,e)||d.include(b,a.name())})},value:function(a,b,c){var e=this.get(a);if(e)return e.value(b);if(!d.isUndefined(b))return this.add(a,b,c)},values:function(a){return d.map(this.getAll(a),function(a){return a.value()})},remove:function(a){if(a=this.get(a))this._updateSource("",a.fullRange()),this._children=d.without(this._children,a)},list:function(){return this._children},indexOf:function(a){return d.indexOf(this.list(),this.get(a))},
name:function(a){if(!d.isUndefined(a)&&this._name!==(a=String(a)))this._updateSource(a,this._positions.name,this._positions.name+this._name.length),this._name=a;return this._name},nameRange:function(a){return c(this._positions.name+(a?this.options.offset:0),this.name())},range:function(a){return c(a?this.options.offset:0,this.toString())},itemFromPosition:function(a,b){return d.find(this.list(),function(c){return c.range(b).inside(a)})},toString:function(){return this.source}};b.extend=h.extend;b.prototype=
{initialize:function(){},_pos:function(a,b){return a+(b?this.parent.options.offset:0)},value:function(a){if(!d.isUndefined(a)&&this._value!==(a=String(a)))this.parent._updateSource(a,this.valueRange()),this._value=a;return this._value},name:function(a){if(!d.isUndefined(a)&&this._name!==(a=String(a)))this.parent._updateSource(a,this.nameRange()),this._name=a;return this._name},namePosition:function(a){return this._pos(this._positions.name,a)},valuePosition:function(a){return this._pos(this._positions.value,
a)},range:function(a){return c(this.namePosition(a),this.toString())},fullRange:function(a){return this.range(a)},nameRange:function(a){return c(this.namePosition(a),this.name())},valueRange:function(a){return c(this.valuePosition(a),this.value())},toString:function(){return this.name()+this.value()},valueOf:function(){return this.toString()}};return{EditContainer:i,EditElement:b,createToken:function(a,b,c){a={start:a||0,value:b||"",type:c};a.end=a.start+a.value.length;return a}}});
emmet.define("cssEditTree",function(e,d){function h(a,b){return e("range").create(a,b)}function i(a,b){var b=b||g|f,c=["white","line"];if((b&f)==f)for(;a.length&&d.include(c,d.last(a).type);)a.pop();if((b&g)==g)for(;a.length&&d.include(c,a[0].type);)a.shift();return a}function b(a){var b=["white","line",":"],c=[],e,j;a.nextUntil(function(){return!d.include(b,this.itemNext().type)});for(j=a.current().end;e=a.next();){if(e.type=="}"||e.type==";")return i(c,g|(e.type=="}"?f:0)),c.length?(j=c[0].start,
a=d.last(c).end):a=j,h(j,a-j);c.push(e)}if(c.length)return h(c[0].start,d.last(c).end-c[0].start)}function c(a){var b=e("stringStream").create(a),c=[],f=/[\s\u00a0,]/,g=function(){b.next();c.push(h(b.start,b.current()));b.start=b.pos};b.eatSpace();for(b.start=b.pos;a=b.next();)if(a=='"'||a=="'"){b.next();if(!b.skipTo(a))break;g()}else if(a=="("){b.backUp(1);if(!b.skipToPair("(",")"))break;b.backUp(1);g()}else if(f.test(a))c.push(h(b.start,b.current().length-1)),b.eatWhile(f),b.start=b.pos;g();return d.chain(c).filter(function(a){return!!a.length()}).uniq(!1,
function(a){return a.toString()}).value()}var a={styleBefore:"\n\t",styleSeparator:": ",offset:0},g=1,f=2,j=e("editTree").EditContainer.extend({initialize:function(c){d.defaults(this.options,a);var f=e("editTree"),g=e("tokenIterator").create(e("cssParser").parse(c)),j,r=[],q;for(j=g.position();q=g.next();){if(q.type=="{")break;r.push(q)}i(r);r.length?(j=r[0].start,r=d.last(r).end):r=j;j=h(j,r-j);this._positions.name=j.start;this._name=j.substring(c);if(!g.current()||g.current().type!="{")throw"Invalid CSS rule";
for(this._positions.contentStart=g.position()+1;j=g.next();){if(r=j.type=="identifier")a:{r=g.tokens;q=g._i+1;for(var u=r.length;q<u;q++){if(r[q].type==":"){r=!0;break a}if(r[q].type=="identifier"||r[q].type=="line"){r=!1;break a}}r=!1}r&&(j=h(j),r=b(g),q=g.current()&&g.current().type==";"?h(g.current()):h(r.end,0),this._children.push(new l(this,f.createToken(j.start,j.substring(c)),f.createToken(r.start,r.substring(c)),f.createToken(q.start,q.substring(c)))))}this._saveStyle()},_saveStyle:function(){var a=
this._positions.contentStart,b=this.source,c=e("utils");d.each(this.list(),function(f){f.styleBefore=b.substring(a,f.namePosition());var e=c.splitByLines(f.styleBefore);if(e.length>1)f.styleBefore="\n"+d.last(e);f.styleSeparator=b.substring(f.nameRange().end,f.valuePosition());f.styleBefore=d.last(f.styleBefore.split("*/"));f.styleSeparator=f.styleSeparator.replace(/\/\*.*?\*\//g,"");a=f.range().end})},add:function(a,b,c){var f=this.list(),g=this._positions.contentStart,j=d.pick(this.options,"styleBefore",
"styleSeparator"),h=e("editTree");if(d.isUndefined(c))c=f.length;var i=f[c];if(i)g=i.fullRange().start;else if(i=f[c-1])i.end(";"),g=i.range().end;i&&(j=d.pick(i,"styleBefore","styleSeparator"));a=h.createToken(g+j.styleBefore.length,a);b=h.createToken(a.end+j.styleSeparator.length,b);h=new l(this,a,b,h.createToken(b.end,";"));d.extend(h,j);this._updateSource(h.styleBefore+h.toString(),g);this._children.splice(c,0,h);return h}}),l=e("editTree").EditElement.extend({initialize:function(a,b,c,d){this.styleBefore=
a.options.styleBefore;this.styleSeparator=a.options.styleSeparator;this._end=d.value;this._positions.end=d.start},valueParts:function(a){var b=c(this.value());if(a){var f=this.valuePosition(!0);d.each(b,function(a){a.shift(f)})}return b},end:function(a){if(!d.isUndefined(a)&&this._end!==a)this.parent._updateSource(a,this._positions.end,this._positions.end+this._end.length),this._end=a;return this._end},fullRange:function(a){a=this.range(a);a.start-=this.styleBefore.length;return a},toString:function(){return this.name()+
this.styleSeparator+this.value()+this.end()}});return{parse:function(a,b){return new j(a,b)},parseFromPosition:function(a,b,c){c=this.extractRule(a,b,c);return!c||!c.inside(b)?null:this.parse(c.substring(a),{offset:c.start})},extractRule:function(a,b,c){for(var d="",f=a.length,g=-1,j;b>=0;){j=a.charAt(b);if(j=="{"){g=b;break}else if(j=="}"&&!c){b++;break}b--}for(;b<f;){j=a.charAt(b);if(j=="{")g=b;else if(j=="}"){g!=-1&&(d=a.substring(g,b+1));break}b++}if(d){b=g-1;for(c="";b>=0;){j=a.charAt(b);if("{}/\\<>\n\r".indexOf(j)!=
-1)break;b--}c=a.substring(b+1,g).replace(/^[\s\n\r]+/m,"");return e("range").create(g-c.length,d.length+c.length)}return null},baseName:function(a){return a.replace(/^\s*\-\w+\-/,"")},findParts:c}});
emmet.define("xmlEditTree",function(e,d){var h={styleBefore:" ",styleSeparator:"=",styleQuote:'"',offset:0},i=/^<([\w\:\-]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/m,b=e("editTree").EditContainer.extend({initialize:function(a){d.defaults(this.options,h);this._positions.name=1;var b=null,f=e("xmlParser").parse(a),j=e("range");d.each(f,function(d){d.value=j.create(d).substring(a);switch(d.type){case "tag":if(/^<[^\/]+/.test(d.value))this._name=d.value.substring(1);
break;case "attribute":b&&this._children.push(new c(this,b));b=d;break;case "string":this._children.push(new c(this,b,d)),b=null}},this);b&&this._children.push(new c(this,b));this._saveStyle()},_saveStyle:function(){var a=this.nameRange().end,b=this.source;d.each(this.list(),function(c){c.styleBefore=b.substring(a,c.namePosition());if(c.valuePosition()!==-1)c.styleSeparator=b.substring(c.namePosition()+c.name().length,c.valuePosition()-c.styleQuote.length);a=c.range().end})},add:function(a,b,f){var j=
this.list(),h=this.nameRange().end,i=e("editTree"),m=d.pick(this.options,"styleBefore","styleSeparator","styleQuote");if(d.isUndefined(f))f=j.length;var o=j[f];if(o)h=o.fullRange().start;else if(o=j[f-1])h=o.range().end;o&&(m=d.pick(o,"styleBefore","styleSeparator","styleQuote"));b=m.styleQuote+b+m.styleQuote;a=new c(this,i.createToken(h+m.styleBefore.length,a),i.createToken(h+m.styleBefore.length+a.length+m.styleSeparator.length,b));d.extend(a,m);this._updateSource(a.styleBefore+a.toString(),h);
this._children.splice(f,0,a);return a}}),c=e("editTree").EditElement.extend({initialize:function(a,b,c){this.styleBefore=a.options.styleBefore;this.styleSeparator=a.options.styleSeparator;b="";a=a.options.styleQuote;if(c)b=c.value,a=b.charAt(0),a=='"'||a=="'"?b=b.substring(1):a="",a&&b.charAt(b.length-1)==a&&(b=b.substring(0,b.length-1));this.styleQuote=a;this._value=b;this._positions.value=c?c.start+a.length:-1},fullRange:function(a){a=this.range(a);a.start-=this.styleBefore.length;return a},toString:function(){return this.name()+
this.styleSeparator+this.styleQuote+this.value()+this.styleQuote}});return{parse:function(a,c){return new b(a,c)},parseFromPosition:function(a,b,c){c=this.extractTag(a,b,c);return!c||!c.inside(b)?null:this.parse(c.substring(a),{offset:c.start})},extractTag:function(a,b,c){var d=a.length,h,n=e("range"),m=Math.min(2E3,d),o=null,p=function(b){var c;if(a.charAt(b)=="<"&&(c=a.substr(b,m).match(i)))return n.create(b,c[0])};for(h=b;h>=0;h--)if(o=p(h))break;if(o&&(o.inside(b)||c))return o;if(!o&&c)return null;
for(h=b;h<d;h++)if(o=p(h))return o}}});
emmet.define("expandAbbreviation",function(e,d){var h=e("handlerList").create(),i=null,b=e("actions");b.add("expand_abbreviation",function(b,a,g){var f=d.toArray(arguments),j=e("editorUtils").outputInfo(b,a,g);f[1]=j.syntax;f[2]=j.profile;return h.exec(!1,f)});b.add("expand_abbreviation_with_tab",function(c,a,d){var f=c.getSelection(),j=e("resources").getVariable("indentation");if(f)return d=e("utils"),a=e("range").create(c.getSelectionRange()),f=d.padString(f,j),c.replaceContent(j+"${0}",c.getCaretPos()),
j=e("range").create(c.getCaretPos(),a.length()),c.replaceContent(f,j.start,j.end,!0),c.createSelection(j.start,j.start+f.length),!0;b.run("expand_abbreviation",c,a,d)||c.replaceContent(j,c.getCaretPos());return!0},{hidden:!0});h.add(function(b,a,d){var f=b.getSelectionRange().end,j=i.findAbbreviation(b);return j&&(a=emmet.expandAbbreviation(j,a,d,e("actionUtils").captureContext(b)))?(b.replaceContent(a,f-j.length,f),!0):!1},{order:-1});return i={addHandler:function(b,a){h.add(b,a)},removeHandler:function(b){h.remove(b,
options)},findAbbreviation:function(b){var a=e("range").create(b.getSelectionRange()),d=String(b.getContent());if(a.length())return a.substring(d);b=b.getCurrentLineRange();return e("actionUtils").extractAbbreviation(d.substring(b.start,a.start))}}});
emmet.define("wrapWithAbbreviation",function(e){var d=null;e("actions").add("wrap_with_abbreviation",function(h,i,b,c){var b=e("editorUtils").outputInfo(h,b,c),a=e("utils"),c=e("editorUtils"),i=i||h.prompt("Enter abbreviation");if(!i)return null;var i=String(i),g=e("range").create(h.getSelectionRange());if(!g.length()){g=e("htmlMatcher").tag(b.content,g.start);if(!g)return!1;g=a.narrowToNonSpace(b.content,g.range)}a=a.escapeText(g.substring(b.content));return(i=d.wrap(i,c.unindent(h,a),b.syntax,b.profile,
e("actionUtils").captureContext(h)))?(h.replaceContent(i,g.start,g.end),!0):!1});return d={wrap:function(d,i,b,c,a){var g=e("filters"),f=e("utils"),b=b||emmet.defaultSyntax(),c=e("profile").get(c,b);e("tabStops").resetTabstopIndex();d=g.extractFromAbbreviation(d);return(i=e("abbreviationParser").parse(d[0],{syntax:b,pastedContent:i,contextNode:a}))?(b=g.composeList(b,c,d[1]),g.apply(i,b,c),f.replaceVariables(i.toString())):null}}});
emmet.exec(function(e,d){function h(b,a){var e=a-(b.options.offset||0),f=/^[\s\n\r]/;return d.find(b.list(),function(a){return a.range().end===e?f.test(b.source.charAt(e)):a.range().inside(e)})}function i(b,a,d,f){for(var j=-1,h=-1;a--;)if(b.substr(a,d.length)==d){j=a;break}if(j!=-1){a=j;for(d=b.length;d>=a++;)if(b.substr(a,f.length)==f){h=a+f.length;break}}return j!=-1&&h!=-1?e("range").create(j,h-j):null}function b(b,a,d,f){function j(b){return b.replace(RegExp("^"+p.escapeForRegexp(a)+"\\s*"),
function(a){m-=a.length;return""}).replace(RegExp("\\s*"+p.escapeForRegexp(d)+"$"),"")}var h=e("editorUtils"),n=h.outputInfo(b).content,m=b.getCaretPos(),o=null,p=e("utils");(o=i(n,m,a,d))&&o.overlap(f)?(f=o,o=j(f.substring(n))):(o=a+" "+f.substring(n).replace(RegExp(p.escapeForRegexp(a)+"\\s*|\\s*"+p.escapeForRegexp(d),"g"),"")+" "+d,m+=a.length+1);return o!==null?(o=p.escapeText(o),b.setCaretPos(f.start),b.replaceContent(h.unindent(b,o),f.start,f.end),b.setCaretPos(m),!0):!1}e("actions").add("toggle_comment",
function(c){var a=e("editorUtils").outputInfo(c);if(a.syntax=="css"){var d=c.getCaretPos(),f=e("htmlMatcher").tag(a.content,d);if(f&&f.open.range.inside(d))a.syntax="html"}if(a.syntax=="css"){f=e("range").create(c.getSelectionRange());a=e("editorUtils").outputInfo(c);if(!f.length()&&(d=e("cssEditTree").parseFromPosition(a.content,c.getCaretPos())))f=(f=h(d,c.getCaretPos()))?f.range(!0):e("range").create(d.nameRange(!0).start,d.source);f.length()||(f=e("range").create(c.getCurrentLineRange()),e("utils").narrowToNonSpace(a.content,
f));c=b(c,"/*","*/",f)}else{a=e("range").create(c.getSelectionRange());d=e("editorUtils").outputInfo(c);if(!a.length()&&(d=e("htmlMatcher").tag(d.content,c.getCaretPos())))a=d.outerRange;c=b(c,"<\!--","--\>",a)}return c})});
emmet.exec(function(e){function d(d,e,b){function c(b){for(var c=b;c>=0;){var d=a.charAt(c);if(d=="\n"||d=="\r")break;c--}return a.substring(c,b)}for(var e=e||1,b=d.getCaretPos()+(b||0),a=String(d.getContent()),d=a.length,g=-1,f=/^\s+$/;b<=d&&b>=0;){b+=e;var j=a.charAt(b),l=a.charAt(b+1),n=a.charAt(b-1);switch(j){case '"':case "'":l==j&&n=="="&&(g=b+1);break;case ">":l=="<"&&(g=b+1);break;case "\n":case "\r":f.test(c(b-1))&&(g=b)}if(g!=-1)break}return g}e=e("actions");e.add("prev_edit_point",function(e){var i=
e.getCaretPos(),b=d(e,-1);b==i&&(b=d(e,-1,-2));return b!=-1?(e.setCaretPos(b),!0):!1},{label:"Previous Edit Point"});e.add("next_edit_point",function(e){var i=d(e,1);return i!=-1?(e.setCaretPos(i),!0):!1})});
emmet.exec(function(e,d){function h(a,b,c,d){var f=e("range"),g=e("editorUtils").outputInfo(a).content,j=g.length,h,i=f.create(-1,0),l=f.create(a.getSelectionRange());h=l.start;for(var n=1E5;h>=0&&h<j&&--n>0;){if(f=c(g,h,b)){if(i.equal(f))break;i=f.clone();if(h=d(f.substring(g),f.start,l.clone()))return a.createSelection(h.start,h.end),!0;else h=b?f.start:f.end-1}h+=b?-1:1}return!1}function i(a){var b=!0;return h(a,!1,function(a,c){if(b){b=!1;var d;a:{d=c;for(var e;d>=0;){if(e=f(a,d)){d=e;break a}d--}d=
null}return d}else return f(a,c)},function(a,b,c){return g(a,b,c,!1)})}function b(a){return h(a,!0,f,function(a,b,c){return g(a,b,c,!0)})}function c(b,c,f){var f=f||0,g=e("range"),h=[],k=-1,i="",l="",n,o;d.each(c,function(c){switch(c.type){case "tag":o=b.substring(c.start,c.end);/^<[\w\:\-]/.test(o)&&h.push(g.create({start:c.start+1,end:c.end}));break;case "attribute":k=c.start;i=b.substring(c.start,c.end);break;case "string":h.push(g.create(k,c.end-k)),n=g.create(c),l=n.substring(b),j(l.charAt(0))&&
n.start++,j(l.charAt(l.length-1))&&n.end--,h.push(n),i=="class"&&(h=h.concat(a(n.substring(b),n.start)))}});d.each(h,function(a){a.shift(f)});return d.chain(h).filter(function(a){return!!a.length()}).uniq(!1,function(a){return a.toString()}).value()}function a(a,b){var b=b||0,c=[],d=e("stringStream").create(a),f=e("range");d.eatSpace();d.start=d.pos;for(var g;g=d.next();)if(/[\s\u00a0]/.test(g))c.push(f.create(d.start+b,d.pos-d.start-1)),d.eatSpace(),d.start=d.pos;c.push(f.create(d.start+b,d.pos-
d.start));return c}function g(a,b,f,g){a=c(a,e("xmlParser").parse(a),b);g&&a.reverse();return(b=d.find(a,function(a){return a.equal(f)}))?(g=d.indexOf(a,b),g<a.length-1?a[g+1]:null):g?d.find(a,function(a){return a.start<f.start}):!b&&(g=d.filter(a,function(a){return a.inside(f.end)}),g.length>1)?g[1]:d.find(a,function(a){return a.end>f.end})}function f(a,b){var c;if(a.charAt(b)=="<"&&(c=a.substring(b,a.length).match(p)))return e("range").create(b,c[0])}function j(a){return a=='"'||a=="'"}function l(a){var b=
a.valueRange(!0),c=[a.range(!0),b],f=e("stringStream"),g=e("cssEditTree"),j=e("range"),h=a.value();d.each(a.valueParts(),function(a){var e=a.clone();c.push(e.shift(b.start));var i=f.create(a.substring(h));if(i.match(/^[\w\-]+\(/,!0)){i.start=i.pos;i.skipToPair("(",")");var l=i.current();c.push(j.create(e.start+i.start,l));d.each(g.findParts(l),function(a){c.push(j.create(e.start+i.start+a.start,a.substring(l)))})}});return d.chain(c).filter(function(a){return!!a.length()}).uniq(!1,function(a){return a.toString()}).value()}
function n(a,b,c){var f=null,e=null,g=a.list(),j,h;c?(g.reverse(),j=function(a){return a.range(!0).start<=b.start},h=function(a){return a.start<b.start}):(j=function(a){return a.range(!0).end>=b.end},h=function(a){return a.end>b.start});for(;f=d.find(g,j);){a=l(f);c&&a.reverse();if(e=d.find(a,function(a){return a.equal(b)})){if(e=d.indexOf(a,e),e!=a.length-1){e=a[e+1];break}}else{e=d.filter(a,function(a){return a.inside(b.end)});if(e.length>1){e=e[1];break}if(e=d.find(a,h))break}e=null;b.start=b.end=
c?f.range(!0).start-1:f.range(!0).end+1}return e}function m(a,b,c){a=e("cssEditTree").parse(a,{offset:b});b=a.nameRange(!0);return c.end<b.end?b:n(a,c,!1)}function o(a,b,c){b=e("cssEditTree").parse(a,{offset:b});a=n(b,c,!0);return!a&&(b=b.nameRange(!0),c.start>b.start)?b:a}var p=/^<([\w\:\-]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,r=e("actions");r.add("select_next_item",function(a){return a.getSyntax()=="css"?h(a,!1,e("cssEditTree").extractRule,m):i(a)});r.add("select_previous_item",
function(a){return a.getSyntax()=="css"?h(a,!0,e("cssEditTree").extractRule,o):b(a)})});
emmet.exec(function(e){function d(c,a){var a=String((a||"out").toLowerCase()),d=e("editorUtils").outputInfo(c),f=e("range").create(c.getSelectionRange()),d=d.content;b&&!b.range.equal(f)&&(b=null);if(b&&f.length())if(a=="in")if(b.type=="tag"&&!b.close)return!1;else if(b.range.equal(b.outerRange))b.range=b.innerRange;else{var j=e("utils").narrowToNonSpace(d,b.innerRange);if((b=i.find(d,j.start+1))&&b.range.equal(f)&&b.outerRange.equal(f))b.range=b.innerRange}else if(!b.innerRange.equal(b.outerRange)&&
b.range.equal(b.innerRange)&&f.equal(b.range))b.range=b.outerRange;else{if((b=i.find(d,f.start))&&b.range.equal(f)&&b.innerRange.equal(f))b.range=b.outerRange}else b=i.find(d,f.start);if(b&&!b.range.equal(f))return c.createSelection(b.range.start,b.range.end),!0;b=null;return!1}var h=e("actions"),i=e("htmlMatcher"),b=null;h.add("match_pair",d,{hidden:!0});h.add("match_pair_inward",function(b){return d(b,"in")},{label:"HTML/Match Pair Tag (inward)"});h.add("match_pair_outward",function(b){return d(b,
"out")},{label:"HTML/Match Pair Tag (outward)"});h.add("matching_pair",function(b){var a=String(b.getContent()),d=b.getCaretPos();a.charAt(d)=="<"&&d++;return(a=i.tag(a,d))&&a.close?(a.open.range.inside(d)?b.setCaretPos(a.close.range.start):b.setCaretPos(a.open.range.start),!0):!1},{label:"HTML/Go To Matching Tag Pair"})});
emmet.exec(function(e){e("actions").add("remove_tag",function(d){var h=e("utils"),i=e("editorUtils").outputInfo(d),b=e("htmlMatcher").tag(i.content,d.getCaretPos());if(b){if(b.close){var c=h.narrowToNonSpace(i.content,b.innerRange),a=h.findNewlineBounds(i.content,c.start),a=h.getLinePadding(a.substring(i.content)),i=c.substring(i.content),i=h.unindentString(i,a);d.replaceContent(h.getCaretPlaceholder()+h.escapeText(i),b.outerRange.start,b.outerRange.end)}else d.replaceContent(h.getCaretPlaceholder(),
b.range.start,b.range.end);return!0}return!1},{label:"HTML/Remove Tag"})});
emmet.exec(function(e){e("actions").add("split_join_tag",function(d,h){var i=e("htmlMatcher"),b=e("editorUtils").outputInfo(d,null,h),c=e("profile").get(b.profile);if(i=i.tag(b.content,d.getCaretPos())){if(i.close){var b=e("utils"),c=c.selfClosing()||" /",c=i.open.range.substring(i.source).replace(/\s*>$/,c+">"),a=d.getCaretPos();c.length+i.outerRange.start<a&&(a=c.length+i.outerRange.start);c=b.escapeText(c);d.replaceContent(c,i.outerRange.start,i.outerRange.end)}else{var b=e("utils"),g=b.getNewline(),
f=e("resources").getVariable("indentation"),a=d.getCaretPos(),c=c.tag_nl===!0?g+f+g:"",g=i.outerContent().replace(/\s*\/>$/,">"),a=i.outerRange.start+g.length;g+=c+"</"+i.open.name+">";g=b.escapeText(g);d.replaceContent(g,i.outerRange.start,i.outerRange.end)}d.setCaretPos(a);i=!0}else i=!1;return i},{label:"HTML/Split\\Join Tag Declaration"})});
emmet.define("reflectCSSValue",function(e,d){function h(c){var a=e("cssEditTree"),d=e("editorUtils").outputInfo(c),c=c.getCaretPos();if(a=a.parseFromPosition(d.content,c))if(d=a.itemFromPosition(c,!0)){var f=a.source,j=a.options.offset,c=c-j-d.range().start;b.exec(!1,[d]);if(f!==a.source)return{data:a.source,start:j,end:j+f.length,caret:j+d.range().start+c}}}function i(b){var b=e("cssEditTree").baseName(b),a;if(b=="opacity"||b=="filter")return/^(?:\-\w+\-)?(?:opacity|filter)$/;else if(a=b.match(/^border-radius-(top|bottom)(left|right)/))return RegExp("^(?:\\-\\w+\\-)?(?:"+
b+"|border-"+a[1]+"-"+a[2]+"-radius)$");else if(a=b.match(/^border-(top|bottom)-(left|right)-radius/))return RegExp("^(?:\\-\\w+\\-)?(?:"+b+"|border-radius-"+a[1]+a[2]+")$");return RegExp("^(?:\\-\\w+\\-)?"+b+"$")}var b=e("handlerList").create();e("actions").add("reflect_css_value",function(b){return b.getSyntax()!="css"?!1:e("actionUtils").compoundUpdate(b,h(b))},{label:"CSS/Reflect Value"});b.add(function(b){var a=i(b.name());d.each(b.parent.list(),function(d){if(a.test(d.name())){var f;var j=b.name(),
h=b.value(),i=d.name();f=d.value();var m=e("cssEditTree"),o=e("utils"),j=m.baseName(j),i=m.baseName(i);f=j=="opacity"&&i=="filter"?f.replace(/opacity=[^)]*/i,"opacity="+Math.floor(parseFloat(h)*100)):j=="filter"&&i=="opacity"?(j=h.match(/opacity=([^)]*)/i))?o.prettifyNumber(parseInt(j[1])/100):f:h;d.value(f)}})},{order:-1});return{addHandler:function(c,a){b.add(c,a)},removeHandler:function(c){b.remove(c,options)}}});
emmet.exec(function(e){e("actions").add("evaluate_math_expression",function(d){var h=e("actionUtils"),i=e("utils"),b=String(d.getContent()),c=e("range").create(d.getSelectionRange());c.length()||(c=h.findExpressionBounds(d,function(a){return i.isNumeric(a)||".+-*/\\".indexOf(a)!=-1}));if(c&&c.length()){h=c.substring(b);h=h.replace(/([\d\.\-]+)\\([\d\.\-]+)/g,"Math.round($1/$2)");try{var a=i.prettifyNumber((new Function("return "+h))());d.replaceContent(a,c.start,c.end);d.setCaretPos(c.start+a.length);
return!0}catch(g){}}return!1},{label:"Numbers/Evaluate Math Expression"})});
emmet.exec(function(e,d){function h(b,a){var g=e("utils"),f=!1,j=!1,h=e("actionUtils").findExpressionBounds(b,function(a,b,c){return g.isNumeric(a)?!0:a=="."?!g.isNumeric(c.charAt(b+1))?!1:j?!1:j=!0:a=="-"?f?!1:f=!0:!1});if(h&&h.length()){var n=h.substring(String(b.getContent())),m=parseFloat(n);if(!d.isNaN(m)){m=g.prettifyNumber(m+a);if(/^(\-?)0+[1-9]/.test(n)){var o="";RegExp.$1&&(o="-",m=m.substring(1));m=m.split(".");m[0]=g.zeroPadString(m[0],i(n));m=o+m.join(".")}b.replaceContent(m,h.start,h.end);
b.createSelection(h.start,h.start+m.length);return!0}}return!1}function i(b){b=b.replace(/^\-/,"");return~b.indexOf(".")?b.split(".")[0].length:b.length}var b=e("actions");d.each([1,-1,10,-10,0.1,-0.1],function(c){var a=c>0?"increment":"decrement";b.add(a+"_number_by_"+String(Math.abs(c)).replace(".","").substring(0,2),function(a){return h(a,c)},{label:"Numbers/"+a.charAt(0).toUpperCase()+a.substring(1)+" number by "+Math.abs(c)})})});
emmet.exec(function(e,d){var h=e("actions"),i=e("preferences");i.define("css.closeBraceIndentation","\n","Indentation before closing brace of CSS rule. Some users prefere indented closing brace of CSS rule for better readability. This preference\u2019s value will be automatically inserted before closing brace when user adds newline in newly created CSS rule (e.g. when \u201cInsert formatted linebreak\u201d action will be performed in CSS file). If you\u2019re such user, you may want to write put a value like <code>\\n\\t</code> in this preference.");
h.add("insert_formatted_line_break_only",function(b){var c=e("utils"),a=e("resources"),g=e("editorUtils").outputInfo(b),f=b.getCaretPos(),j=c.getNewline();if(d.include(["html","xml","xsl"],g.syntax)){if(a=a.getVariable("indentation"),(g=e("htmlMatcher").tag(g.content,f))&&!g.innerRange.length())return b.replaceContent(j+a+c.getCaretPlaceholder()+j,f),!0}else if(g.syntax=="css"&&(g=g.content,f&&g.charAt(f-1)=="{")){var h=i.get("css.closeBraceIndentation"),a=a.getVariable("indentation"),n=g.charAt(f)==
"}";if(!n)for(var m=f,o=g.length,p;m<o;m++){p=g.charAt(m);if(p=="{")break;if(p=="}"){h="";n=!0;break}}n||(h+="}");c=j+a+c.getCaretPlaceholder()+h;b.replaceContent(c,f);return!0}return!1},{hidden:!0});h.add("insert_formatted_line_break",function(b){if(!h.run("insert_formatted_line_break_only",b)){for(var c=e("utils"),a=e("editorUtils").getCurrentLinePadding(b),d=String(b.getContent()),f=b.getCaretPos(),j=d.length,c=c.getNewline(),i="",n=b.getCurrentLineRange().end+1,m;n<j;n++)if(m=d.charAt(n),m==" "||
m=="\t")i+=m;else break;i.length>a.length?b.replaceContent(c+i,f,f,!0):b.replaceContent(c,f)}return!0},{hidden:!0})});
emmet.exec(function(e){e("actions").add("merge_lines",function(d){var h=e("htmlMatcher"),i=e("utils"),b=e("editorUtils").outputInfo(d),c=e("range").create(d.getSelectionRange());if(!c.length()&&(h=h.find(b.content,d.getCaretPos())))c=h.outerRange;if(c.length()){b=c.substring(b.content);b=i.splitByLines(b);for(h=1;h<b.length;h++)b[h]=b[h].replace(/^\s+/,"");b=b.join("").replace(/\s{2,}/," ");h=b.length;b=i.escapeText(b);d.replaceContent(b,c.start,c.end);d.createSelection(c.start,c.start+h);return!0}return!1})});
emmet.exec(function(e){function d(d,b,c){c=c||0;return b.charAt(c)==d.charAt(0)&&b.substr(c,d.length)==d}function h(d,b,c){var a=e("file"),g=e("actionUtils"),f=d.getFilePath();if(f===null)throw"You should save your file before using this action";var j=a.locateFile(f,b);if(j===null)throw"Can't find "+b+" file";a.read(j,function(f,h){if(f)throw"Unable to read "+j+": "+f;var m=e("base64").encode(String(h));if(!m)throw"Can't encode file content to base64";m="data:"+(g.mimeTypes[String(a.getExt(j))]||
"application/octet-stream")+";base64,"+m;d.replaceContent("$0"+m,c,c+b.length)});return!0}e("actions").add("encode_decode_data_url",function(i){var b=String(i.getSelection()),c=i.getCaretPos();if(!b)for(var a=String(i.getContent());c-- >=0;)if(d("src=",a,c)){if(a=a.substr(c).match(/^(src=(["'])?)([^'"<>\s]+)\1?/))b=a[3],c+=a[1].length;break}else if(d("url(",a,c)){if(a=a.substr(c).match(/^(url\((['"])?)([^'"\)\s]+)\1?/))b=a[3],c+=a[1].length;break}if(b)if(d("data:",b))if(a=String(i.prompt("Enter path to file (absolute or relative)"))){var g=
e("file"),f=g.createPath(i.getFilePath(),a);if(!f)throw"Can't save file";g.save(f,e("base64").decode(b.replace(/^data\:.+?;.+?,/,"")));i.replaceContent("$0"+a,c,c+b.length);i=!0}else i=!1;else i=h(i,b,c);else i=!1;return i},{label:"Encode\\Decode data:URL image"})});
emmet.exec(function(e,d){function h(c){var a=c.getCaretPos(),g=e("editorUtils").outputInfo(c),f=e("xmlEditTree").parseFromPosition(g.content,a,!0);f&&(f.name()||"").toLowerCase()=="img"&&b(c,f.value("src"),function(b){if(b){var g=f.range(!0);f.value("width",b.width);f.value("height",b.height,f.indexOf("width")+1);e("actionUtils").compoundUpdate(c,d.extend(g,{data:f.toString(),caret:a}))}})}function i(c){var a=c.getCaretPos(),g=e("editorUtils").outputInfo(c),f=e("cssEditTree").parseFromPosition(g.content,
a,!0);if(f){var g=f.itemFromPosition(a,!0),j;g&&(j=/url\((["']?)(.+?)\1\)/i.exec(g.value()||""))&&b(c,j[2],function(b){if(b){var j=f.range(!0);f.value("width",b.width+"px");f.value("height",b.height+"px",f.indexOf("width")+1);e("actionUtils").compoundUpdate(c,d.extend(j,{data:f.toString(),caret:a}))}})}}function b(b,a,d){var f=e("actionUtils");if(a){if(/^data:/.test(a))return b=e("base64").decode(a.replace(/^data\:.+?;.+?,/,"")),d(f.getImageSize(b));var j=e("file"),h=j.locateFile(b.getFilePath(),
a);if(h===null)throw"Can't find "+a+" file";j.read(h,function(a,b){if(a)throw"Unable to read "+h+": "+a;d(f.getImageSize(String(b)))})}}e("actions").add("update_image_size",function(b){d.include(["css","less","scss"],String(b.getSyntax()))?i(b):h(b);return!0})});
emmet.define("cssResolver",function(e,d){function h(a){var b=a&&a.charCodeAt(0);return a&&a=="."||b>47&&b<58}function i(a){a=e("utils").trim(a);if(~a.indexOf("/*")||/[\n\r]/.test(a))return!1;if(!/^[a-z0-9\-]+\s*\:/i.test(a))return!1;a=e("tabStops").processText(a,{replaceCarets:!0,tabstop:function(){return"value"}});return a.split(":").length==2}function b(a){a.charAt(0)=="-"&&!/^\-[\.\d]/.test(a)&&(a=a.replace(/^\-+/,""));if(a.charAt(0)=="#"){var b=a.replace(/^#+/,"")||"0";if(b.toLowerCase()=="t")a=
"transparent";else{var d=e("utils").repeatString,a=null;switch(b.length){case 1:a=d(b,6);break;case 2:a=d(b,3);break;case 3:a=b.charAt(0)+b.charAt(0)+b.charAt(1)+b.charAt(1)+b.charAt(2)+b.charAt(2);break;case 4:a=b+b.substr(0,2);break;case 5:a=b+b.charAt(0);break;default:a=b.substr(0,6)}q.get("css.color.short")&&(b=a.split(""),b[0]==b[1]&&b[2]==b[3]&&b[4]==b[5]&&(a=b[0]+b[2]+b[4]));switch(q.get("css.color.case")){case "upper":a=a.toUpperCase();break;case "lower":a=a.toLowerCase()}a="#"+a}}else a=
c(a);return a}function c(a){var b=q.getDict("css.keywordAliases");return a in b?b[a]:a}function a(a){return d.include(q.getArray("css.keywords"),c(a))}function g(a,b){var c=r[b];c||(c=d.find(r,function(a){return a.prefix==b}));return c&&c.supports(a)}function f(a,b){var c=[];d.each(r,function(b,d){g(a,d)&&c.push(d)});!c.length&&!b&&d.each(r,function(a,b){a.obsolete||c.push(b)});return c}function j(a,b){d.isString(b)&&(b={prefix:b});r[a]=d.extend({},p,b)}function l(a,b){if(b){var c=q.get(b+"."+a);
if(!d.isUndefined(c))return c}return q.get("css."+a)}function n(a,b,c){if(!d.isString(a))a=a.data;if(!i(a))return a;b&&(~a.indexOf(";")?a=a.split(";").join(" !important;"):a+=" !important");b=a.indexOf(":");a=a.substring(0,b).replace(/\s+$/,"")+l("valueSeparator",c)+e("utils").trim(a.substring(b+1));return a.replace(/\s*;\s*$/,l("propertyEnd",c))}function m(a){var b=q.getArray(a);d.each(q.getArray(a+"Addon"),function(a){a.charAt(0)=="-"?b=d.without(b,a.substr(1)):(a.charAt(0)=="+"&&(a=a.substr(1)),
b.push(a))});return b}var o=null,p={prefix:"emmet",obsolete:!1,transformName:function(a){return"-"+this.prefix+"-"+a},properties:function(){return m("css."+this.prefix+"Properties")||[]},supports:function(a){return d.include(this.properties(),a)}},r={},q=e("preferences");q.define("css.valueSeparator",": ","Defines a symbol that should be placed between CSS property and value when expanding CSS abbreviations.");q.define("css.propertyEnd",";","Defines a symbol that should be placed at the end of CSS property  when expanding CSS abbreviations.");
q.define("stylus.valueSeparator"," ","Defines a symbol that should be placed between CSS property and value when expanding CSS abbreviations in Stylus dialect.");q.define("stylus.propertyEnd","","Defines a symbol that should be placed at the end of CSS property  when expanding CSS abbreviations in Stylus dialect.");q.define("sass.propertyEnd","","Defines a symbol that should be placed at the end of CSS property  when expanding CSS abbreviations in SASS dialect.");q.define("css.autoInsertVendorPrefixes",
!0,"Automatically generate vendor-prefixed copies of expanded CSS property. By default, Emmet will generate vendor-prefixed properties only when you put dash before abbreviation (e.g. <code>-bxsh</code>). With this option enabled, you don\u2019t need dashes before abbreviations: Emmet will produce vendor-prefixed properties for you.");var u=d.template("A comma-separated list of CSS properties that may have <code><%= vendor %></code> vendor prefix. This list is used to generate a list of prefixed properties when expanding <code>-property</code> abbreviations. Empty list means that all possible CSS values may have <code><%= vendor %></code> prefix."),
s=d.template("A comma-separated list of <em>additional</em> CSS properties for <code>css.<%= vendor %>Preperties</code> preference. You should use this list if you want to add or remove a few CSS properties to original set. To add a new property, simply write its name, to remove it, precede property with hyphen.<br>For example, to add <em>foo</em> property and remove <em>border-radius</em> one, the preference value will look like this: <code>foo, -border-radius</code>.");d.each({webkit:"animation, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, appearance, backface-visibility, background-clip, background-composite, background-origin, background-size, border-fit, border-horizontal-spacing, border-image, border-vertical-spacing, box-align, box-direction, box-flex, box-flex-group, box-lines, box-ordinal-group, box-orient, box-pack, box-reflect, box-shadow, color-correction, column-break-after, column-break-before, column-break-inside, column-count, column-gap, column-rule-color, column-rule-style, column-rule-width, column-span, column-width, dashboard-region, font-smoothing, highlight, hyphenate-character, hyphenate-limit-after, hyphenate-limit-before, hyphens, line-box-contain, line-break, line-clamp, locale, margin-before-collapse, margin-after-collapse, marquee-direction, marquee-increment, marquee-repetition, marquee-style, mask-attachment, mask-box-image, mask-box-image-outset, mask-box-image-repeat, mask-box-image-slice, mask-box-image-source, mask-box-image-width, mask-clip, mask-composite, mask-image, mask-origin, mask-position, mask-repeat, mask-size, nbsp-mode, perspective, perspective-origin, rtl-ordering, text-combine, text-decorations-in-effect, text-emphasis-color, text-emphasis-position, text-emphasis-style, text-fill-color, text-orientation, text-security, text-stroke-color, text-stroke-width, transform, transition, transform-origin, transform-style, transition-delay, transition-duration, transition-property, transition-timing-function, user-drag, user-modify, user-select, writing-mode, svg-shadow, box-sizing, border-radius",
moz:"animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, appearance, backface-visibility, background-inline-policy, binding, border-bottom-colors, border-image, border-left-colors, border-right-colors, border-top-colors, box-align, box-direction, box-flex, box-ordinal-group, box-orient, box-pack, box-shadow, box-sizing, column-count, column-gap, column-rule-color, column-rule-style, column-rule-width, column-width, float-edge, font-feature-settings, font-language-override, force-broken-image-icon, hyphens, image-region, orient, outline-radius-bottomleft, outline-radius-bottomright, outline-radius-topleft, outline-radius-topright, perspective, perspective-origin, stack-sizing, tab-size, text-blink, text-decoration-color, text-decoration-line, text-decoration-style, text-size-adjust, transform, transform-origin, transform-style, transition, transition-delay, transition-duration, transition-property, transition-timing-function, user-focus, user-input, user-modify, user-select, window-shadow, background-clip, border-radius",
ms:"accelerator, backface-visibility, background-position-x, background-position-y, behavior, block-progression, box-align, box-direction, box-flex, box-line-progression, box-lines, box-ordinal-group, box-orient, box-pack, content-zoom-boundary, content-zoom-boundary-max, content-zoom-boundary-min, content-zoom-chaining, content-zoom-snap, content-zoom-snap-points, content-zoom-snap-type, content-zooming, filter, flow-from, flow-into, font-feature-settings, grid-column, grid-column-align, grid-column-span, grid-columns, grid-layer, grid-row, grid-row-align, grid-row-span, grid-rows, high-contrast-adjust, hyphenate-limit-chars, hyphenate-limit-lines, hyphenate-limit-zone, hyphens, ime-mode, interpolation-mode, layout-flow, layout-grid, layout-grid-char, layout-grid-line, layout-grid-mode, layout-grid-type, line-break, overflow-style, perspective, perspective-origin, perspective-origin-x, perspective-origin-y, scroll-boundary, scroll-boundary-bottom, scroll-boundary-left, scroll-boundary-right, scroll-boundary-top, scroll-chaining, scroll-rails, scroll-snap-points-x, scroll-snap-points-y, scroll-snap-type, scroll-snap-x, scroll-snap-y, scrollbar-arrow-color, scrollbar-base-color, scrollbar-darkshadow-color, scrollbar-face-color, scrollbar-highlight-color, scrollbar-shadow-color, scrollbar-track-color, text-align-last, text-autospace, text-justify, text-kashida-space, text-overflow, text-size-adjust, text-underline-position, touch-action, transform, transform-origin, transform-origin-x, transform-origin-y, transform-origin-z, transform-style, transition, transition-delay, transition-duration, transition-property, transition-timing-function, user-select, word-break, word-wrap, wrap-flow, wrap-margin, wrap-through, writing-mode",
o:"dashboard-region, animation, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, border-image, link, link-source, object-fit, object-position, tab-size, table-baseline, transform, transform-origin, transition, transition-delay, transition-duration, transition-property, transition-timing-function, accesskey, input-format, input-required, marquee-dir, marquee-loop, marquee-speed, marquee-style"},
function(a,b){q.define("css."+b+"Properties",a,u({vendor:b}));q.define("css."+b+"PropertiesAddon","",s({vendor:b}))});q.define("css.unitlessProperties","z-index, line-height, opacity, font-weight, zoom","The list of properties whose values \u200b\u200bmust not contain units.");q.define("css.intUnit","px","Default unit for integer values");q.define("css.floatUnit","em","Default unit for float values");q.define("css.keywords","auto, inherit","A comma-separated list of valid keywords that can be used in CSS abbreviations.");
q.define("css.keywordAliases","a:auto, i:inherit, s:solid, da:dashed, do:dotted, t:transparent","A comma-separated list of keyword aliases, used in CSS abbreviation. Each alias should be defined as <code>alias:keyword_name</code>.");q.define("css.unitAliases","e:em, p:%, x:ex, r:rem","A comma-separated list of unit aliases, used in CSS abbreviation. Each alias should be defined as <code>alias:unit_value</code>.");q.define("css.color.short",!0,"Should color values like <code>#ffffff</code> be shortened to <code>#fff</code> after abbreviation with color was expanded.");
q.define("css.color.case","keep","Letter case of color values generated by abbreviations with color (like <code>c#0</code>). Possible values are <code>upper</code>, <code>lower</code> and <code>keep</code>.");q.define("css.fuzzySearch",!0,"Enable fuzzy search among CSS snippet names. When enabled, every <em>unknown</em> snippet will be scored against available snippet names (not values or CSS properties!). The match with best score will be used to resolve snippet value. For example, with this preference enabled, the following abbreviations are equal: <code>ov:h</code> == <code>ov-h</code> == <code>o-h</code> == <code>oh</code>");
q.define("css.fuzzySearchMinScore",0.3,"The minium score (from 0 to 1) that fuzzy-matched abbreviation should achive. Lower values may produce many false-positive matches, higher values may reduce possible matches.");q.define("css.alignVendor",!1,"If set to <code>true</code>, all generated vendor-prefixed properties will be aligned by real property name.");j("w",{prefix:"webkit"});j("m",{prefix:"moz"});j("s",{prefix:"ms"});j("o",{prefix:"o"});var v=["css","less","sass","scss","stylus"];e("resources").addResolver(function(a,
b){return d.include(v,b)&&a.isElement()?o.expandToSnippet(a.abbreviation,b):null});var w=e("expandAbbreviation");w.addHandler(function(a,b,c){if(!d.include(v,b))return!1;var e=a.getSelectionRange().end,f=w.findAbbreviation(a);return f&&(b=emmet.expandAbbreviation(f,b,c))?(f=e-f.length,c=e,a.getContent().charAt(e)==";"&&b.charAt(b.length-1)==";"&&c++,a.replaceContent(b,f,c),!0):!1});return o={addPrefix:j,supportsPrefix:g,prefixed:function(a,b){return g(a,b)?"-"+b+"-"+a:a},listPrefixes:function(){return d.map(r,
function(a){return a.prefix})},getPrefix:function(a){return r[a]},removePrefix:function(a){a in r&&delete r[a]},extractPrefixes:function(a){if(a.charAt(0)!="-")return{property:a,prefixes:null};for(var b=1,c=a.length,d,e=[];b<c;){d=a.charAt(b);if(d=="-"){b++;break}if(d in r)e.push(d);else{e.length=0;b=1;break}b++}if(b==c-1)b=1,e.length=1;return{property:a.substring(b),prefixes:e.length?e:"all"}},findValuesInAbbreviation:function(b,c){for(var c=c||"css",d=0,f=b.length,j="",g;d<f;){g=b.charAt(d);if(h(g)||
g=="#"||g=="-"&&h(b.charAt(d+1))){j=b.substring(d);break}d++}g=b.substring(0,b.length-j.length);d=e("resources");for(f=[];~g.indexOf("-")&&!d.findSnippet(c,g);){g=g.split("-");var i=g.pop();if(!a(i))break;f.unshift(i);g=g.join("-")}return f.join("-")+j},parseValues:function(c){for(var f=e("stringStream").create(c),j=[],g=null;g=f.next();){if(g=="#")f.match(/^t|[0-9a-f]+/i,!0);else if(g=="-"){if(a(d.last(j))||f.start&&h(c.charAt(f.start-1)))f.start=f.pos;f.match(/^\-?[0-9]*(\.[0-9]+)?[a-z%\.]*/,!0)}else f.match(/^[0-9]*(\.[0-9]*)?[a-z%]*/,
!0);j.push(f.current());f.start=f.pos}return d.map(d.compact(j),b)},extractValues:function(a){var b=this.findValuesInAbbreviation(a);return!b?{property:a,values:null}:{property:a.substring(0,a.length-b.length).replace(/-$/,""),values:this.parseValues(b)}},normalizeValue:function(a,b){var b=(b||"").toLowerCase(),c=q.getArray("css.unitlessProperties");return a.replace(/^(\-?[0-9\.]+)([a-z]*)$/,function(a,f,e){if(!e&&(f=="0"||d.include(c,b)))return f;e?(a=q.getDict("css.unitAliases"),f+=e in a?a[e]:
e):f=f.replace(/\.$/,"")+q.get(~f.indexOf(".")?"css.floatUnit":"css.intUnit");return f})},expand:function(a,b,c){var c=c||"css",j=e("resources"),g=q.get("css.autoInsertVendorPrefixes"),h;if(h=/^(.+)\!$/.test(a))a=RegExp.$1;var l=j.findSnippet(c,a);if(l&&!g)return n(l,h,c);var a=this.extractPrefixes(a),o=this.extractValues(a.property),a=d.extend(a,o);l?a.values=null:l=j.findSnippet(c,a.property);!l&&q.get("css.fuzzySearch")&&(l=j.fuzzyFindSnippet(c,a.property,parseFloat(q.get("css.fuzzySearchMinScore"))));
if(l){if(!d.isString(l))l=l.data}else l=a.property+":${1};";if(!i(l))return l;var m=this.splitSnippet(l),p=[];!b&&a.values&&(b=d.map(a.values,function(a){return this.normalizeValue(a,m.name)},this).join(" ")+";");m.value=b||m.value;var b=a.prefixes=="all"||!a.prefixes&&g?f(m.name,g&&a.prefixes!="all"):a.prefixes,v=[],w;d.each(b,function(a){a in r&&(w=r[a].transformName(m.name),v.push(w),p.push(n(w+":"+m.value,h,c)))});p.push(n(m.name+":"+m.value,h,c));v.push(m.name);if(q.get("css.alignVendor"))var s=
e("utils").getStringsPads(v),p=d.map(p,function(a,b){return s[b]+a});return p},expandToSnippet:function(a,b){var c=this.expand(a,null,b);return d.isArray(c)?c.join("\n"):!d.isString(c)?c.data:String(c)},splitSnippet:function(a){var b=e("utils"),a=b.trim(a);if(a.indexOf(":")==-1)return{name:a,value:"${1};"};a=a.split(":");return{name:b.trim(a.shift()),value:b.trim(a.join(":")).replace(/^(\$\{0\}|\$0)(\s*;?)$/,"${1}$2")}},getSyntaxPreference:l,transformSnippet:n}});
emmet.define("cssGradient",function(e,d){function h(a){return e("utils").trim(a).replace(/\s+/g," ")}function i(a){var a=h(a),b=null,a=a.replace(/^(\w+\(.+?\))\s*/,function(a,c){b=c;return""});b||(a=a.split(" "),b=a[0],a=a[1]||"");var c={color:b};a&&a.replace(/^(\-?[\d\.]+)([a-z%]+)?$/,function(a,b,d){c.position=b;~b.indexOf(".")?d="":d||(d="%");if(d)c.unit=d});return c}function b(a){var b=0;d.each(a,function(c,f){if(!f)return c.position=c.position||0;if(f==a.length-1&&!("position"in c))c.position=
1;if("position"in c){var e=a[b].position||0,j=(c.position-e)/(f-b);d.each(a.slice(b,f),function(a,b){a.position=e+j*b});b=f}})}function c(a){var b=parseFloat(a);if(!d.isNaN(b))switch(b%360){case 0:return"left";case 90:return"bottom";case 180:return"right";case 240:return"top"}return a}function a(a){a=c(a);if(q.test(a))throw"The direction is an angle that can\u2019t be converted.";var b=function(b){return~a.indexOf(b)?"100%":"0"};return b("right")+" "+b("bottom")+", "+b("left")+" "+b("top")}function g(a){var b=
s.getArray("css.gradient.prefixes"),b=b?d.map(b,function(b){return"-"+b+"-"+a}):[];b.push(a);return b}function f(a,b){var c=[],f=e("cssResolver");s.get("css.gradient.fallback")&&~b.toLowerCase().indexOf("background")&&c.push({name:"background-color",value:"${1:"+a.colorStops[0].color+"}"});d.each(s.getArray("css.gradient.prefixes"),function(d){var e=f.prefixed(b,d);if(d=="webkit"&&s.get("css.gradient.oldWebkit"))try{c.push({name:e,value:p.oldWebkitLinearGradient(a)})}catch(j){}c.push({name:e,value:p.toString(a,
d)})});return c.sort(function(a,b){return b.name.length-a.name.length})}function j(a,b,c){var j=a.parent,h=e("utils"),i=e("preferences").get("css.alignVendor"),l=a.styleSeparator,o=a.styleBefore;d.each(j.getAll(g(a.name())),function(b){if(b!=a&&/gradient/i.test(b.value())){if(b.styleSeparator.length<l.length)l=b.styleSeparator;if(b.styleBefore.length<o.length)o=b.styleBefore;j.remove(b)}});if(i){if(o!=a.styleBefore){var m=a.fullRange();j._updateSource(o,m.start,m.start+a.styleBefore.length);a.styleBefore=
o}if(l!=a.styleSeparator)j._updateSource(l,a.nameRange().end,a.valueRange().start),a.styleSeparator=l}var n=a.value();c||(c=e("range").create(0,a.value()));a.value(function(a){return h.replaceSubstring(n,a,c)}(p.toString(b))+"${2}");b=f(b,a.name());if(i){i=d.pluck(b,"value");m=d.pluck(b,"name");i.push(a.value());m.push(a.name());var r=h.getStringsPads(d.map(i,function(a){return a.substring(0,a.indexOf("("))})),q=h.getStringsPads(m);a.name(d.last(q)+a.name());d.each(b,function(a,b){a.name=q[b]+a.name;
a.value=r[b]+a.value});a.value(d.last(r)+a.value())}d.each(b,function(b){j.add(b.name,b.value,j.indexOf(a))})}function l(a){var b=a.value(),c=null;return(a=d.find(a.valueParts(),function(a){return c=p.parse(a.substring(b))}))&&c?{gradient:c,valueRange:a}:null}function n(a,b){var c=s.get("css.gradient.defaultProperty");if(!c)return!1;var j=String(a.getContent()),g=e("range").create(a.getCurrentLineRange()),h=g.substring(j).replace(/^\s+/,function(a){g.start+=a.length;return""}).replace(/\s+$/,function(a){g.end-=
a.length;return""}),j=e("cssResolver");if(h=p.parse(h)){var i=f(h,c);i.push({name:c,value:p.toString(h)+"${2}"});var l=j.getSyntaxPreference("valueSeparator",b),o=j.getSyntaxPreference("propertyEnd",b);if(e("preferences").get("css.alignVendor")){var m=e("utils").getStringsPads(d.map(i,function(a){return a.value.substring(0,a.value.indexOf("("))}));d.each(i,function(a,b){a.value=m[b]+a.value})}i=d.map(i,function(a){return a.name+l+a.value+o});a.replaceContent(i.join("\n"),g.start,g.end);return!0}return!1}
function m(a,b){var c=null,f=e("cssEditTree").parseFromPosition(a,b,!0);f&&((c=f.itemFromPosition(b,!0))||(c=d.find(f.list(),function(a){return a.range(!0).end==b})));return{rule:f,property:c}}var o=["top","to bottom","0deg"],p=null,r=["css","less","sass","scss","stylus","styl"],q=/\d+deg/i,u=/top|bottom|left|right/i,s=e("preferences");s.define("css.gradient.prefixes","webkit, moz, o","A comma-separated list of vendor-prefixes for which values should be generated.");s.define("css.gradient.oldWebkit",
!0,"Generate gradient definition for old Webkit implementations");s.define("css.gradient.omitDefaultDirection",!0,"Do not output default direction definition in generated gradients.");s.define("css.gradient.defaultProperty","background-image","When gradient expanded outside CSS value context, it will produce properties with this name.");s.define("css.gradient.fallback",!1,"With this option enabled, CSS gradient generator will produce <code>background-color</code> property with gradient first color as fallback for old browsers.");
e("expandAbbreviation").addHandler(function(a,b,c){c=e("editorUtils").outputInfo(a,b,c);if(!d.include(r,c.syntax))return!1;var f=a.getCaretPos(),g=c.content,c=m(g,f);if(c.property){var h=l(c.property);if(h){var i=c.rule.options.offset||0,o=i+c.rule.toString().length;if(/[\n\r]/.test(c.property.value())){var p=c.property.valueRange(!0).start+h.valueRange.end,g=e("utils").replaceSubstring(g,";",p),f=m(g,f);f.property&&(h=l(f.property),c=f)}c.property.end(";");var f=c.property.name(),g=e("resources"),
p=e("preferences"),q=g.findSnippet(b,f);!q&&p.get("css.fuzzySearch")&&(q=g.fuzzyFindSnippet(b,f,parseFloat(p.get("css.fuzzySearchMinScore"))));if(q){if(!d.isString(q))q=q.data;b=e("cssResolver").splitSnippet(q).name}else b=void 0;b&&c.property.name(b);j(c.property,h.gradient,h.valueRange);a.replaceContent(c.rule.toString(),i,o,!0);return!0}}return n(a,b)});e("reflectCSSValue").addHandler(function(a){var b=e("utils"),c=l(a);if(!c)return!1;var f=a.value(),j=function(a){return b.replaceSubstring(f,a,
c.valueRange)};d.each(a.parent.getAll(g(a.name())),function(b){if(b!==a){var d=b.value().match(/^\s*(\-([a-z]+)\-)?linear\-gradient/);d?b.value(j(p.toString(c.gradient,d[2]||""))):b.value().match(/\s*\-webkit\-gradient/)&&b.value(j(p.oldWebkitLinearGradient(c.gradient)))}});return!0});return p={parse:function(a){var b=null;e("utils").trim(a).replace(/^([\w\-]+)\((.+?)\)$/,function(a,c,f){c=c.toLowerCase().replace(/^\-[a-z]+\-/,"");if(c=="linear-gradient"||c=="lg"){for(var a=o[0],f=e("stringStream").create(e("utils").trim(f)),
c=[],j;j=f.next();)f.peek()==","?(c.push(f.current()),f.next(),f.eatSpace(),f.start=f.pos):j=="("&&f.skipTo(")");c.push(f.current());c=d.compact(d.map(c,h));if(c.length){if(q.test(c[0])||u.test(c[0]))a=c.shift();b={type:"linear",direction:a,colorStops:d.map(c,i)}}else b=null;return""}return a});return b},oldWebkitLinearGradient:function(c){d.isString(c)&&(c=this.parse(c));if(!c)return null;var f=d.map(c.colorStops,d.clone);d.each(f,function(a){if("position"in a)if(~a.position.indexOf(".")||a.unit==
"%")a.position=parseFloat(a.position)/(a.unit=="%"?100:1);else throw"Can't convert color stop '"+(a.position+(a.unit||""))+"'";});b(f);f=d.map(f,function(a,b){return!a.position&&!b?"from("+a.color+")":a.position==1&&b==f.length-1?"to("+a.color+")":"color-stop("+a.position.toFixed(2).replace(/\.?0+$/,"")+", "+a.color+")"});return"-webkit-gradient(linear, "+a(c.direction)+", "+f.join(", ")+")"},toString:function(a,b){if(a.type=="linear"){var c=(b?"-"+b+"-":"")+"linear-gradient",f=d.map(a.colorStops,
function(a){return a.color+("position"in a?" "+a.position+(a.unit||""):"")});a.direction&&(!s.get("css.gradient.omitDefaultDirection")||!d.include(o,a.direction))&&f.unshift(a.direction);return c+"("+f.join(", ")+")"}}}});emmet.exec(function(e,d){var h=e("handlerList").create(),i=e("resources");d.extend(i,{addGenerator:function(b,c,a){d.isString(b)&&(b=RegExp(b));h.add(function(a,d){var e;return(e=b.exec(a.name()))?c(e,a,d):null},a)}});i.addResolver(function(b,c){return h.exec(null,d.toArray(arguments))})});
emmet.define("tagName",function(e,d){var h={empty:[],blockLevel:"address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,link,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul,h1,h2,h3,h4,h5,h6".split(","),inlineLevel:"a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var".split(",")},
i={p:"span",ul:"li",ol:"li",table:"tr",tr:"td",tbody:"tr",thead:"tr",tfoot:"tr",colgroup:"col",select:"option",optgroup:"option",audio:"source",video:"source",object:"param",map:"area"};return{resolve:function(b){b=(b||"").toLowerCase();return b in i?this.getMapping(b):this.isInlineLevel(b)?"span":"div"},getMapping:function(b){return i[b.toLowerCase()]},isInlineLevel:function(b){return this.isTypeOf(b,"inlineLevel")},isBlockLevel:function(b){return this.isTypeOf(b,"blockLevel")},isEmptyElement:function(b){return this.isTypeOf(b,
"empty")},isTypeOf:function(b,c){return d.include(h[c],b)},addMapping:function(b,c){i[b]=c},removeMapping:function(b){b in i&&delete i[b]},addElementToCollection:function(b,c){h[c]||(h[c]=[]);var a=this.getCollection(c);d.include(a,b)||a.push(b)},removeElementFromCollection:function(b,c){c in h&&(h[c]=d.without(this.getCollection(c),b))},getCollection:function(b){return h[b]}}});
emmet.exec(function(e,d){function h(){return{element:g.get("bem.elementSeparator"),modifier:g.get("bem.modifierSeparator")}}function i(a){if(e("abbreviationUtils").isSnippet(a))return a;a.__bem={block:"",element:"",modifier:""};var f=b(a.attribute("class")).split(" "),g=/^[a-z]\-/i;a.__bem.block=d.find(f,function(a){return g.test(a)});if(!a.__bem.block)g=/^[a-z]/i,a.__bem.block=d.find(f,function(a){return g.test(a)})||"";(f=d.chain(f).map(function(b){var d;d=c(b,a,"element");d=c(d,a,"modifier");var f=
"",e="",g="",b=h();~d.indexOf(b.element)?(f=d.split(b.element),g=f[1].split(b.modifier),f=f[0],e=g.shift(),g=g.join(b.modifier)):~d.indexOf(b.modifier)&&(g=d.split(b.modifier),f=g.shift(),g=g.join(b.modifier));if(f||e||g){if(!f)f=a.__bem.block;d=f;var i=[];e&&(d+=b.element+e);i.push(d);g&&i.push(d+b.modifier+g);a.__bem.block=f;a.__bem.element=e;a.__bem.modifier=g;b=i}else b=d;return b}).flatten().uniq().value().join(" "))&&a.attribute("class",f);return a}function b(a){var b=e("utils"),a=(" "+(a||
"")+" ").replace(/\s+/g," "),c=g.get("bem.shortElementPrefix");c&&(c=RegExp("\\s("+b.escapeForRegexp(c)+"+)","g"),a=a.replace(c,function(a,c){return" "+b.repeatString(h().element,c.length)}));return b.trim(a)}function c(a,b,c){var d=h(),f=RegExp("^("+d[c]+")+","g");if(f.test(a)){for(var e=0,f=a.replace(f,function(a){e=a.length/d[c].length;return""}),g=b;g.parent&&e--;)g=g.parent;if(!g||!g.__bem)g=b;if(g&&g.__bem)return a=g.__bem.block,c=="modifier"&&g.__bem.element&&(a+=d.element+g.__bem.element),
a+d[c]+f}return a}function a(b,c){b.name&&i(b,c);var g=e("abbreviationUtils");d.each(b.children,function(b){a(b,c);!g.isSnippet(b)&&b.start&&(f=!0)});return b}var g=e("preferences");g.define("bem.elementSeparator","__","Class name\u2019s element separator.");g.define("bem.modifierSeparator","_","Class name\u2019s modifier separator.");g.define("bem.shortElementPrefix","-","Symbol for describing short \u201cblock-element\u201d notation. Class names prefixed with this symbol will be treated as element name for parent\u2018s block name. Each symbol instance traverses one level up in parsed tree for block name lookup. Empty value will disable short notation.");
var f=!1;e("filters").add("bem",function(b,c){f=!1;b=a(b,c);f&&(b=e("filters").apply(b,"html",c));return b})});
emmet.exec(function(e,d){function h(c,a,g){var f=e("utils"),j=b.get("filter.commentTrigger");if(j=="*"||d.find(j.split(","),function(a){return!!c.attribute(f.trim(a))}))j={node:c,name:c.name(),padding:c.parent?c.parent.padding:"",attr:function(a,b,d){return(a=c.attribute(a))?(b||"")+a+(d||""):""}},a=f.normalizeNewline(a?a(j):""),g=f.normalizeNewline(g?g(j):""),c.start=c.start.replace(/</,a+"<"),c.end=c.end.replace(/>/,">"+g)}function i(b,a,g){var f=e("abbreviationUtils");d.each(b.children,function(b){f.isBlock(b)&&
h(b,a,g);i(b,a,g)});return b}var b=e("preferences");b.define("filter.commentAfter",'\n<\!-- /<%= attr("id", "#") %><%= attr("class", ".") %> --\>',"A definition of comment that should be placed <i>after</i> matched element when <code>comment</code> filter is applied. This definition is an ERB-style template passed to <code>_.template()</code> function (see Underscore.js docs for details). In template context, the following properties and functions are availabe:\n<ul><li><code>attr(name, before, after)</code> \u2013 a function that outputsspecified attribute value concatenated with <code>before</code> and <code>after</code> strings. If attribute doesn't exists, the empty string will be returned.</li><li><code>node</code> \u2013 current node (instance of <code>AbbreviationNode</code>)</li><li><code>name</code> \u2013 name of current tag</li><li><code>padding</code> \u2013 current string padding, can be used for formatting</li></ul>");
b.define("filter.commentBefore","","A definition of comment that should be placed <i>before</i> matched element when <code>comment</code> filter is applied. For more info, read description of <code>filter.commentAfter</code> property");b.define("filter.commentTrigger","id, class","A comma-separated list of attribute names that should exist in abbreviatoin where comment should be added. If you wish to add comment for every element, set this option to <code>*</code>");e("filters").add("c",function(c){var a=
d.template(b.get("filter.commentBefore")),e=d.template(b.get("filter.commentAfter"));return i(c,a,e)})});emmet.exec(function(e,d){function h(b){return b.replace(/([<>&])/g,function(b,a){return i[a]})}var i={"<":"&lt;",">":"&gt;","&":"&amp;"};e("filters").add("e",function c(a){d.each(a.children,function(a){a.start=h(a.start);a.end=h(a.end);a.content=h(a.content);c(a)});return a})});
emmet.exec(function(e,d){function h(a){return a.parent&&!a.parent.parent&&!a.index()}function i(a,c){var d=e("abbreviationUtils");return c.tag_nl===!0||d.isBlock(a)?!0:!a.parent||!c.inline_break?!1:b(a.parent,c)}function b(a,b){var c=0,h=e("abbreviationUtils");return!!d.find(a.children,function(a){a.isTextNode()||!h.isInline(a)?c=0:h.isInline(a)&&c++;if(c>=b.inline_break)return!0})}function c(a,c){var h=e("abbreviationUtils");return!d.any(a.children,function(a){return h.isSnippet(a)?!1:!h.isInline(a)})?
b(a,c):!0}var a=e("preferences");a.define("format.noIndentTags","html","A comma-separated list of tag names that should not get inner indentation.");a.define("format.forceIndentationForTags","body","A comma-separated list of tag names that should <em>always</em> get inner indentation.");e("filters").add("_format",function f(b,l,n){var n=n||0,m=e("abbreviationUtils");d.each(b.children,function(b){if(m.isSnippet(b)){if(b.start=b.end="",!h(b)&&l.tag_nl!==!1&&i(b,l)&&(!b.parent.parent||!e("abbreviationUtils").isInline(b.parent)))b.start=
e("utils").getNewline()+b.start}else{b.start=b.end="%s";var j=e("utils"),r=e("abbreviationUtils"),q=r.isUnary(b),j=j.getNewline(),u=d.include(a.getArray("format.noIndentTags")||[],b.name())?"":e("resources").getVariable("indentation");if(l.tag_nl!==!1){var s=l.tag_nl===!0&&(l.tag_nl_leaf||b.children.length);s||(s=d.include(a.getArray("format.forceIndentationForTags")||[],b.name()));if(!b.isTextNode()){if(i(b,l)){if(!h(b)&&(!r.isSnippet(b.parent)||b.index()))b.start=j+b.start;if(r.hasBlockChildren(b)||
b.children.length&&i(b.children[0],l)||s&&!q)b.end=j+b.end;if(r.hasTagsInContent(b)||s&&!b.children.length&&!q)b.start+=j+u}else if(r.isInline(b)&&b.parent&&e("abbreviationUtils").hasBlockChildren(b.parent)&&!h(b))b.start=j+b.start;else if(r.isInline(b)&&c(b,l))b.end=j+b.end;b.padding=u}}}f(b,l,n+1)});return b})});
emmet.exec(function(e,d){function h(h,b){var c="",a=[],g=b.attributeQuote(),f=b.cursor();d.each(h.attributeList(),function(d){var h=b.attributeName(d.name);switch(h.toLowerCase()){case "id":c+="#"+(d.value||f);break;case "class":c+="."+e("utils").trim(d.value||f).replace(/\s+/g,".");break;default:a.push(":"+h+" => "+g+(d.value||f)+g)}});a.length&&(c+="{"+a.join(", ")+"}");return c}e("filters").add("haml",function b(c,a,g){var g=g||0,f=e("abbreviationUtils");g||(c=e("filters").apply(c,"_format",a));
d.each(c.children,function(c){if(!f.isSnippet(c)&&c.parent){var d=e("abbreviationUtils"),n=e("utils"),m=h(c,a),o=a.cursor(),d=d.isUnary(c),p=a.self_closing_tag&&d?"/":"",r="",r="%"+a.tagName(c.name());r.toLowerCase()=="%div"&&m&&m.indexOf("{")==-1&&(r="");c.end="";c.start=n.replaceSubstring(c.start,r+m+p+" ",c.start.indexOf("%s"),"%s");!c.children.length&&!d&&(c.start+=o)}b(c,a,g+1)});return c})});
emmet.exec(function(e,d){function h(e,b){var c=b.attributeQuote(),a=b.cursor();return d.map(e.attributeList(),function(d){return" "+b.attributeName(d.name)+"="+c+(d.value||a)+c}).join("")}e("filters").add("html",function b(c,a,g){var g=g||0,f=e("abbreviationUtils");g||(c=e("filters").apply(c,"_format",a));d.each(c.children,function(c){if(!f.isSnippet(c)&&c.parent){var d=e("abbreviationUtils"),n=e("utils"),m=h(c,a),o=a.cursor(),d=d.isUnary(c),p="",r="";if(!c.isTextNode()){var q=a.tagName(c.name());
d?(p="<"+q+m+a.selfClosing()+">",c.end=""):(p="<"+q+m+">",r="</"+q+">")}c.start=n.replaceSubstring(c.start,p,c.start.indexOf("%s"),"%s");c.end=n.replaceSubstring(c.end,r,c.end.indexOf("%s"),"%s");!c.children.length&&!d&&!~c.content.indexOf(o)&&!e("tabStops").extract(c.content).tabstops.length&&(c.start+=o)}b(c,a,g+1)});return c})});
emmet.exec(function(e,d){var h=/^\s+/,i=/[\n\r]/g;e("filters").add("s",function c(a){var g=e("abbreviationUtils");d.each(a.children,function(a){if(!g.isSnippet(a))a.start=a.start.replace(h,""),a.end=a.end.replace(h,"");a.start=a.start.replace(i,"");a.end=a.end.replace(i,"");a.content=a.content.replace(i,"");c(a)});return a})});
emmet.exec(function(e,d){function h(e,b){d.each(e.children,function(c){if(c.content)c.content=c.content.replace(b,"");h(c,b)});return e}e("preferences").define("filter.trimRegexp","[\\s|\\u00a0]*[\\d|#|\\-|*|\\u2022]+\\.?\\s*","Regular expression used to remove list markers (numbers, dashes, bullets, etc.) in <code>t</code> (trim) filter. The trim filter is useful for wrapping with abbreviation lists, pased from other documents (for example, Word documents).");e("filters").add("t",function(d){var b=
RegExp(e("preferences").get("filter.trimRegexp"));return h(d,b)})});emmet.exec(function(e,d){var h={"xsl:variable":1,"xsl:with-param":1};e("filters").add("xsl",function b(c){var a=e("abbreviationUtils");d.each(c.children,function(c){if(!a.isSnippet(c)&&(c.name()||"").toLowerCase()in h&&c.children.length)c.start=c.start.replace(/\s+select\s*=\s*(['"]).*?\1/,"");b(c)});return c})});
emmet.define("lorem",function(e,d){function h(a,b){return Math.round(Math.random()*(b-a)+a)}function i(a,b){for(var c=a.length,e=Math.min(c,b),g=[];g.length<e;){var i=h(0,c-1);d.include(g,i)||g.push(i)}return d.map(g,function(b){return a[b]})}function b(a,b){a.length&&(a[0]=a[0].charAt(0).toUpperCase()+a[0].substring(1));return a.join(" ")+(b||(d.isString("?!...")?"?!...".charAt(h(0,4)):"?!..."[h(0,4)]))}function c(a){var b=a.length,c=0,c=b>3&&b<=6?h(0,1):b>6&&b<=12?h(0,2):h(1,4);d.each(d.range(c),
function(b){b<a.length-1&&(a[b]+=",")})}var a={en:{common:["lorem","ipsum","dolor","sit","amet","consectetur","adipisicing","elit"],words:["exercitationem","perferendis","perspiciatis","laborum","eveniet","sunt","iure","nam","nobis","eum","cum","officiis","excepturi","odio","consectetur","quasi","aut","quisquam","vel","eligendi","itaque","non","odit","tempore","quaerat","dignissimos","facilis","neque","nihil","expedita","vitae","vero","ipsum","nisi","animi","cumque","pariatur","velit","modi","natus",
"iusto","eaque","sequi","illo","sed","ex","et","voluptatibus","tempora","veritatis","ratione","assumenda","incidunt","nostrum","placeat","aliquid","fuga","provident","praesentium","rem","necessitatibus","suscipit","adipisci","quidem","possimus","voluptas","debitis","sint","accusantium","unde","sapiente","voluptate","qui","aspernatur","laudantium","soluta","amet","quo","aliquam","saepe","culpa","libero","ipsa","dicta","reiciendis","nesciunt","doloribus","autem","impedit","minima","maiores","repudiandae",
"ipsam","obcaecati","ullam","enim","totam","delectus","ducimus","quis","voluptates","dolores","molestiae","harum","dolorem","quia","voluptatem","molestias","magni","distinctio","omnis","illum","dolorum","voluptatum","ea","quas","quam","corporis","quae","blanditiis","atque","deserunt","laboriosam","earum","consequuntur","hic","cupiditate","quibusdam","accusamus","ut","rerum","error","minus","eius","ab","ad","nemo","fugit","officia","at","in","id","quos","reprehenderit","numquam","iste","fugiat","sit",
"inventore","beatae","repellendus","magnam","recusandae","quod","explicabo","doloremque","aperiam","consequatur","asperiores","commodi","optio","dolor","labore","temporibus","repellat","veniam","architecto","est","esse","mollitia","nulla","a","similique","eos","alias","dolore","tenetur","deleniti","porro","facere","maxime","corrupti"]},ru:{common:["\u0434\u0430\u043b\u0435\u043a\u043e-\u0434\u0430\u043b\u0435\u043a\u043e","\u0437\u0430","\u0441\u043b\u043e\u0432\u0435\u0441\u043d\u044b\u043c\u0438",
"\u0433\u043e\u0440\u0430\u043c\u0438","\u0432 \u0441\u0442\u0440\u0430\u043d\u0435","\u0433\u043b\u0430\u0441\u043d\u044b\u0445","\u0438 \u0441\u043e\u0433\u043b\u0430\u0441\u043d\u044b\u0445","\u0436\u0438\u0432\u0443\u0442","\u0440\u044b\u0431\u043d\u044b\u0435","\u0442\u0435\u043a\u0441\u0442\u044b"],words:["\u0432\u0434\u0430\u043b\u0438","\u043e\u0442 \u0432\u0441\u0435\u0445","\u043e\u043d\u0438","\u0431\u0443\u043a\u0432\u0435\u043d\u043d\u044b\u0445","\u0434\u043e\u043c\u0430\u0445","\u043d\u0430 \u0431\u0435\u0440\u0435\u0433\u0443",
"\u0441\u0435\u043c\u0430\u043d\u0442\u0438\u043a\u0430","\u0431\u043e\u043b\u044c\u0448\u043e\u0433\u043e","\u044f\u0437\u044b\u043a\u043e\u0432\u043e\u0433\u043e","\u043e\u043a\u0435\u0430\u043d\u0430","\u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0439","\u0440\u0443\u0447\u0435\u0435\u043a","\u0434\u0430\u043b\u044c","\u0436\u0443\u0440\u0447\u0438\u0442","\u043f\u043e \u0432\u0441\u0435\u0439","\u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0438\u0432\u0430\u0435\u0442","\u0435\u0435","\u0432\u0441\u0435\u043c\u0438",
"\u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u043c\u0438","\u043f\u0440\u0430\u0432\u0438\u043b\u0430\u043c\u0438","\u044d\u0442\u0430","\u043f\u0430\u0440\u0430\u0434\u0438\u0433\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f","\u0441\u0442\u0440\u0430\u043d\u0430","\u043a\u043e\u0442\u043e\u0440\u043e\u0439","\u0436\u0430\u0440\u0435\u043d\u043d\u044b\u0435","\u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f","\u0437\u0430\u043b\u0435\u0442\u0430\u044e\u0442",
"\u043f\u0440\u044f\u043c\u043e","\u0440\u043e\u0442","\u0434\u0430\u0436\u0435","\u0432\u0441\u0435\u043c\u043e\u0433\u0443\u0449\u0430\u044f","\u043f\u0443\u043d\u043a\u0442\u0443\u0430\u0446\u0438\u044f","\u043d\u0435","\u0438\u043c\u0435\u0435\u0442","\u0432\u043b\u0430\u0441\u0442\u0438","\u043d\u0430\u0434","\u0440\u044b\u0431\u043d\u044b\u043c\u0438","\u0442\u0435\u043a\u0441\u0442\u0430\u043c\u0438","\u0432\u0435\u0434\u0443\u0449\u0438\u043c\u0438","\u0431\u0435\u0437\u043e\u0440\u0444\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u043d\u044b\u0439",
"\u043e\u0431\u0440\u0430\u0437","\u0436\u0438\u0437\u043d\u0438","\u043e\u0434\u043d\u0430\u0436\u0434\u044b","\u043e\u0434\u043d\u0430","\u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0430\u044f","\u0441\u0442\u0440\u043e\u0447\u043a\u0430","\u0440\u044b\u0431\u043d\u043e\u0433\u043e","\u0442\u0435\u043a\u0441\u0442\u0430","\u0438\u043c\u0435\u043d\u0438","lorem","ipsum","\u0440\u0435\u0448\u0438\u043b\u0430","\u0432\u044b\u0439\u0442\u0438","\u0431\u043e\u043b\u044c\u0448\u043e\u0439","\u043c\u0438\u0440",
"\u0433\u0440\u0430\u043c\u043c\u0430\u0442\u0438\u043a\u0438","\u0432\u0435\u043b\u0438\u043a\u0438\u0439","\u043e\u043a\u0441\u043c\u043e\u043a\u0441","\u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0430\u043b","\u043e","\u0437\u043b\u044b\u0445","\u0437\u0430\u043f\u044f\u0442\u044b\u0445","\u0434\u0438\u043a\u0438\u0445","\u0437\u043d\u0430\u043a\u0430\u0445","\u0432\u043e\u043f\u0440\u043e\u0441\u0430","\u043a\u043e\u0432\u0430\u0440\u043d\u044b\u0445","\u0442\u043e\u0447\u043a\u0430\u0445",
"\u0437\u0430\u043f\u044f\u0442\u043e\u0439","\u043d\u043e","\u0442\u0435\u043a\u0441\u0442","\u0434\u0430\u043b","\u0441\u0431\u0438\u0442\u044c","\u0441\u0435\u0431\u044f","\u0442\u043e\u043b\u043a\u0443","\u043e\u043d","\u0441\u043e\u0431\u0440\u0430\u043b","\u0441\u0435\u043c\u044c","\u0441\u0432\u043e\u0438\u0445","\u0437\u0430\u0433\u043b\u0430\u0432\u043d\u044b\u0445","\u0431\u0443\u043a\u0432","\u043f\u043e\u0434\u043f\u043e\u044f\u0441\u0430\u043b","\u0438\u043d\u0438\u0446\u0438\u0430\u043b",
"\u0437\u0430","\u043f\u043e\u044f\u0441","\u043f\u0443\u0441\u0442\u0438\u043b\u0441\u044f","\u0434\u043e\u0440\u043e\u0433\u0443","\u0432\u0437\u043e\u0431\u0440\u0430\u0432\u0448\u0438\u0441\u044c","\u043f\u0435\u0440\u0432\u0443\u044e","\u0432\u0435\u0440\u0448\u0438\u043d\u0443","\u043a\u0443\u0440\u0441\u0438\u0432\u043d\u044b\u0445","\u0433\u043e\u0440","\u0431\u0440\u043e\u0441\u0438\u043b","\u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0439","\u0432\u0437\u0433\u043b\u044f\u0434","\u043d\u0430\u0437\u0430\u0434",
"\u0441\u0438\u043b\u0443\u044d\u0442","\u0441\u0432\u043e\u0435\u0433\u043e","\u0440\u043e\u0434\u043d\u043e\u0433\u043e","\u0433\u043e\u0440\u043e\u0434\u0430","\u0431\u0443\u043a\u0432\u043e\u0433\u0440\u0430\u0434","\u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a","\u0434\u0435\u0440\u0435\u0432\u043d\u0438","\u0430\u043b\u0444\u0430\u0432\u0438\u0442","\u043f\u043e\u0434\u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a","\u0441\u0432\u043e\u0435\u0433\u043e","\u043f\u0435\u0440\u0435\u0443\u043b\u043a\u0430",
"\u0433\u0440\u0443\u0441\u0442\u043d\u044b\u0439","\u0440\u0435\u0442\u043e\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0439","\u0432\u043e\u043f\u0440\u043e\u0441","\u0441\u043a\u0430\u0442\u0438\u043b\u0441\u044f","\u0435\u0433\u043e","\u0449\u0435\u043a\u0435","\u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u043b","\u0441\u0432\u043e\u0439","\u043f\u0443\u0442\u044c","\u0434\u043e\u0440\u043e\u0433\u0435","\u0432\u0441\u0442\u0440\u0435\u0442\u0438\u043b","\u0440\u0443\u043a\u043e\u043f\u0438\u0441\u044c",
"\u043e\u043d\u0430","\u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0434\u0438\u043b\u0430","\u043c\u043e\u0435\u0439","\u0432\u0441\u0435","\u043f\u0435\u0440\u0435\u043f\u0438\u0441\u044b\u0432\u0430\u0435\u0442\u0441\u044f","\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e","\u0440\u0430\u0437","\u0435\u0434\u0438\u043d\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0435","\u0447\u0442\u043e","\u043c\u0435\u043d\u044f","\u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c","\u044d\u0442\u043e",
"\u043f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430","\u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0439\u0441\u044f","\u0442\u044b","\u043b\u0443\u0447\u0448\u0435","\u0441\u0432\u043e\u044e","\u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u0443\u044e","\u0441\u0442\u0440\u0430\u043d\u0443","\u043f\u043e\u0441\u043b\u0443\u0448\u0430\u0432\u0448\u0438\u0441\u044c","\u0440\u0443\u043a\u043e\u043f\u0438\u0441\u0438","\u043d\u0430\u0448","\u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u043b",
"\u0441\u0432\u043e\u0439","\u043f\u0443\u0442\u044c","\u0432\u0441\u043a\u043e\u0440\u0435","\u0435\u043c\u0443","\u043f\u043e\u0432\u0441\u0442\u0440\u0435\u0447\u0430\u043b\u0441\u044f","\u043a\u043e\u0432\u0430\u0440\u043d\u044b\u0439","\u0441\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044c","\u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0445","\u0442\u0435\u043a\u0441\u0442\u043e\u0432","\u043d\u0430\u043f\u043e\u0438\u0432\u0448\u0438\u0439","\u044f\u0437\u044b\u043a\u043e\u043c",
"\u0440\u0435\u0447\u044c\u044e","\u0437\u0430\u043c\u0430\u043d\u0438\u0432\u0448\u0438\u0439","\u0441\u0432\u043e\u0435","\u0430\u0433\u0435\u043d\u0441\u0442\u0432\u043e","\u043a\u043e\u0442\u043e\u0440\u043e\u0435","\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043b\u043e","\u0441\u043d\u043e\u0432\u0430","\u0441\u043d\u043e\u0432\u0430","\u0441\u0432\u043e\u0438\u0445","\u043f\u0440\u043e\u0435\u043a\u0442\u0430\u0445","\u0435\u0441\u043b\u0438","\u043f\u0435\u0440\u0435\u043f\u0438\u0441\u0430\u043b\u0438",
"\u0442\u043e","\u0436\u0438\u0432\u0435\u0442","\u0442\u0430\u043c","\u0434\u043e","\u0441\u0438\u0445","\u043f\u043e\u0440"]}},g=e("preferences");g.define("lorem.defaultLang","en");e("abbreviationParser").addPreprocessor(function(d){var e=/^(?:lorem|lipsum)([a-z]{2})?(\d*)$/i,l;d.findAll(function(d){if(d._name&&(l=d._name.match(e))){var f=l[2]||30,o=l[1]||g.get("lorem.defaultLang")||"en";d._name="";d.data("forceNameResolving",d.isRepeating()||d.attributeList().length);d.data("pasteOverwrites",!0);
d.data("paste",function(d){var e;e=f;var g=!d;if(d=a[o]){var j=[],l=0;e=parseInt(e,10);g&&d.common&&(g=d.common.slice(0,e),g.length>5&&(g[4]+=","),l+=g.length,j.push(b(g,".")));for(;l<e;)g=i(d.words,Math.min(h(3,12)*h(1,5),e-l)),l+=g.length,c(g),j.push(b(g));e=j.join(" ")}else e="";return e})}})});return{addLang:function(b,c){d.isString(c)?c={words:d.compact(c.split(" "))}:d.isArray(c)&&(c={words:c});a[b]=c}}});
emmet.exec(function(e){e("actions").add("select_line",function(d){var e=d.getCurrentLineRange();d.createSelection(e.start,e.end);return!0})});
emmet.exec(function(e){e("resources").setVocabulary({variables:{lang:"en",locale:"en-US",charset:"UTF-8",indentation:"\t",newline:"\n"},css:{filters:"html",snippets:{"@i":"@import url(|);","@import":"@import url(|);","@m":"@media ${1:screen} {\n\t|\n}","@media":"@media ${1:screen} {\n\t|\n}","@f":"@font-face {\n\tfont-family:|;\n\tsrc:url(|);\n}","@f+":"@font-face {\n\tfont-family: '${1:FontName}';\n\tsrc: url('${2:FileName}.eot');\n\tsrc: url('${2:FileName}.eot?#iefix') format('embedded-opentype'),\n\t\t url('${2:FileName}.woff') format('woff'),\n\t\t url('${2:FileName}.ttf') format('truetype'),\n\t\t url('${2:FileName}.svg#${1:FontName}') format('svg');\n\tfont-style: ${3:normal};\n\tfont-weight: ${4:normal};\n}","@kf":"@-webkit-keyframes ${1:identifier} {\n\t${2:from} { ${3} }${6}\n\t${4:to} { ${5} }\n}\n@-o-keyframes ${1:identifier} {\n\t${2:from} { ${3} }${6}\n\t${4:to} { ${5} }\n}\n@-moz-keyframes ${1:identifier} {\n\t${2:from} { ${3} }${6}\n\t${4:to} { ${5} }\n}\n@keyframes ${1:identifier} {\n\t${2:from} { ${3} }${6}\n\t${4:to} { ${5} }\n}",
anim:"animation:|;","anim-":"animation:${1:name} ${2:duration} ${3:timing-function} ${4:delay} ${5:iteration-count} ${6:direction} ${7:fill-mode};",animdel:"animation-delay:${1:time};",animdir:"animation-direction:${1:normal};","animdir:n":"animation-direction:normal;","animdir:r":"animation-direction:reverse;","animdir:a":"animation-direction:alternate;","animdir:ar":"animation-direction:alternate-reverse;",animdur:"animation-duration:${1:0}s;",animfm:"animation-fill-mode:${1:both};","animfm:f":"animation-fill-mode:forwards;",
"animfm:b":"animation-fill-mode:backwards;","animfm:bt":"animation-fill-mode:both;","animfm:bh":"animation-fill-mode:both;",animic:"animation-iteration-count:${1:1};","animic:i":"animation-iteration-count:infinite;",animn:"animation-name:${1:none};",animps:"animation-play-state:${1:running};","animps:p":"animation-play-state:paused;","animps:r":"animation-play-state:running;",animtf:"animation-timing-function:${1:linear};","animtf:e":"animation-timing-function:ease;","animtf:ei":"animation-timing-function:ease-in;",
"animtf:eo":"animation-timing-function:ease-out;","animtf:eio":"animation-timing-function:ease-in-out;","animtf:l":"animation-timing-function:linear;","animtf:cb":"animation-timing-function:cubic-bezier(${1:0.1}, ${2:0.7}, ${3:1.0}, ${3:0.1});",ap:"appearance:${none};","!":"!important",pos:"position:${1:relative};","pos:s":"position:static;","pos:a":"position:absolute;","pos:r":"position:relative;","pos:f":"position:fixed;",t:"top:|;","t:a":"top:auto;",r:"right:|;","r:a":"right:auto;",b:"bottom:|;",
"b:a":"bottom:auto;",l:"left:|;","l:a":"left:auto;",z:"z-index:|;","z:a":"z-index:auto;",fl:"float:${1:left};","fl:n":"float:none;","fl:l":"float:left;","fl:r":"float:right;",cl:"clear:${1:both};","cl:n":"clear:none;","cl:l":"clear:left;","cl:r":"clear:right;","cl:b":"clear:both;",colm:"columns:|;",colmc:"column-count:|;",colmf:"column-fill:|;",colmg:"column-gap:|;",colmr:"column-rule:|;",colmrc:"column-rule-color:|;",colmrs:"column-rule-style:|;",colmrw:"column-rule-width:|;",colms:"column-span:|;",
colmw:"column-width:|;",d:"display:${1:block};","d:n":"display:none;","d:b":"display:block;","d:i":"display:inline;","d:ib":"display:inline-block;","d:li":"display:list-item;","d:ri":"display:run-in;","d:cp":"display:compact;","d:tb":"display:table;","d:itb":"display:inline-table;","d:tbcp":"display:table-caption;","d:tbcl":"display:table-column;","d:tbclg":"display:table-column-group;","d:tbhg":"display:table-header-group;","d:tbfg":"display:table-footer-group;","d:tbr":"display:table-row;","d:tbrg":"display:table-row-group;",
"d:tbc":"display:table-cell;","d:rb":"display:ruby;","d:rbb":"display:ruby-base;","d:rbbg":"display:ruby-base-group;","d:rbt":"display:ruby-text;","d:rbtg":"display:ruby-text-group;",v:"visibility:${1:hidden};","v:v":"visibility:visible;","v:h":"visibility:hidden;","v:c":"visibility:collapse;",ov:"overflow:${1:hidden};","ov:v":"overflow:visible;","ov:h":"overflow:hidden;","ov:s":"overflow:scroll;","ov:a":"overflow:auto;",ovx:"overflow-x:${1:hidden};","ovx:v":"overflow-x:visible;","ovx:h":"overflow-x:hidden;",
"ovx:s":"overflow-x:scroll;","ovx:a":"overflow-x:auto;",ovy:"overflow-y:${1:hidden};","ovy:v":"overflow-y:visible;","ovy:h":"overflow-y:hidden;","ovy:s":"overflow-y:scroll;","ovy:a":"overflow-y:auto;",ovs:"overflow-style:${1:scrollbar};","ovs:a":"overflow-style:auto;","ovs:s":"overflow-style:scrollbar;","ovs:p":"overflow-style:panner;","ovs:m":"overflow-style:move;","ovs:mq":"overflow-style:marquee;",zoo:"zoom:1;",zm:"zoom:1;",cp:"clip:|;","cp:a":"clip:auto;","cp:r":"clip:rect(${1:top} ${2:right} ${3:bottom} ${4:left});",
bxz:"box-sizing:${1:border-box};","bxz:cb":"box-sizing:content-box;","bxz:bb":"box-sizing:border-box;",bxsh:"box-shadow:${1:inset }${2:hoff} ${3:voff} ${4:blur} ${5:color};","bxsh:r":"box-shadow:${1:inset }${2:hoff} ${3:voff} ${4:blur} ${5:spread }rgb(${6:0}, ${7:0}, ${8:0});","bxsh:ra":"box-shadow:${1:inset }${2:h} ${3:v} ${4:blur} ${5:spread }rgba(${6:0}, ${7:0}, ${8:0}, .${9:5});","bxsh:n":"box-shadow:none;",m:"margin:|;","m:a":"margin:auto;",mt:"margin-top:|;","mt:a":"margin-top:auto;",mr:"margin-right:|;",
"mr:a":"margin-right:auto;",mb:"margin-bottom:|;","mb:a":"margin-bottom:auto;",ml:"margin-left:|;","ml:a":"margin-left:auto;",p:"padding:|;",pt:"padding-top:|;",pr:"padding-right:|;",pb:"padding-bottom:|;",pl:"padding-left:|;",w:"width:|;","w:a":"width:auto;",h:"height:|;","h:a":"height:auto;",maw:"max-width:|;","maw:n":"max-width:none;",mah:"max-height:|;","mah:n":"max-height:none;",miw:"min-width:|;",mih:"min-height:|;",mar:"max-resolution:${1:res};",mir:"min-resolution:${1:res};",ori:"orientation:|;",
"ori:l":"orientation:landscape;","ori:p":"orientation:portrait;",ol:"outline:|;","ol:n":"outline:none;",olo:"outline-offset:|;",olw:"outline-width:|;",ols:"outline-style:|;",olc:"outline-color:#${1:000};","olc:i":"outline-color:invert;",bd:"border:|;","bd+":"border:${1:1px} ${2:solid} ${3:#000};","bd:n":"border:none;",bdbk:"border-break:${1:close};","bdbk:c":"border-break:close;",bdcl:"border-collapse:|;","bdcl:c":"border-collapse:collapse;","bdcl:s":"border-collapse:separate;",bdc:"border-color:#${1:000};",
"bdc:t":"border-color:transparent;",bdi:"border-image:url(|);","bdi:n":"border-image:none;",bdti:"border-top-image:url(|);","bdti:n":"border-top-image:none;",bdri:"border-right-image:url(|);","bdri:n":"border-right-image:none;",bdbi:"border-bottom-image:url(|);","bdbi:n":"border-bottom-image:none;",bdli:"border-left-image:url(|);","bdli:n":"border-left-image:none;",bdci:"border-corner-image:url(|);","bdci:n":"border-corner-image:none;","bdci:c":"border-corner-image:continue;",bdtli:"border-top-left-image:url(|);",
"bdtli:n":"border-top-left-image:none;","bdtli:c":"border-top-left-image:continue;",bdtri:"border-top-right-image:url(|);","bdtri:n":"border-top-right-image:none;","bdtri:c":"border-top-right-image:continue;",bdbri:"border-bottom-right-image:url(|);","bdbri:n":"border-bottom-right-image:none;","bdbri:c":"border-bottom-right-image:continue;",bdbli:"border-bottom-left-image:url(|);","bdbli:n":"border-bottom-left-image:none;","bdbli:c":"border-bottom-left-image:continue;",bdf:"border-fit:${1:repeat};",
"bdf:c":"border-fit:clip;","bdf:r":"border-fit:repeat;","bdf:sc":"border-fit:scale;","bdf:st":"border-fit:stretch;","bdf:ow":"border-fit:overwrite;","bdf:of":"border-fit:overflow;","bdf:sp":"border-fit:space;",bdlen:"border-length:|;","bdlen:a":"border-length:auto;",bdsp:"border-spacing:|;",bds:"border-style:|;","bds:n":"border-style:none;","bds:h":"border-style:hidden;","bds:dt":"border-style:dotted;","bds:ds":"border-style:dashed;","bds:s":"border-style:solid;","bds:db":"border-style:double;","bds:dtds":"border-style:dot-dash;",
"bds:dtdtds":"border-style:dot-dot-dash;","bds:w":"border-style:wave;","bds:g":"border-style:groove;","bds:r":"border-style:ridge;","bds:i":"border-style:inset;","bds:o":"border-style:outset;",bdw:"border-width:|;",bdtw:"border-top-width:|;",bdrw:"border-right-width:|;",bdbw:"border-bottom-width:|;",bdlw:"border-left-width:|;",bdt:"border-top:|;",bt:"border-top:|;","bdt+":"border-top:${1:1px} ${2:solid} ${3:#000};","bdt:n":"border-top:none;",bdts:"border-top-style:|;","bdts:n":"border-top-style:none;",
bdtc:"border-top-color:#${1:000};","bdtc:t":"border-top-color:transparent;",bdr:"border-right:|;",br:"border-right:|;","bdr+":"border-right:${1:1px} ${2:solid} ${3:#000};","bdr:n":"border-right:none;",bdrst:"border-right-style:|;","bdrst:n":"border-right-style:none;",bdrc:"border-right-color:#${1:000};","bdrc:t":"border-right-color:transparent;",bdb:"border-bottom:|;",bb:"border-bottom:|;","bdb+":"border-bottom:${1:1px} ${2:solid} ${3:#000};","bdb:n":"border-bottom:none;",bdbs:"border-bottom-style:|;",
"bdbs:n":"border-bottom-style:none;",bdbc:"border-bottom-color:#${1:000};","bdbc:t":"border-bottom-color:transparent;",bdl:"border-left:|;",bl:"border-left:|;","bdl+":"border-left:${1:1px} ${2:solid} ${3:#000};","bdl:n":"border-left:none;",bdls:"border-left-style:|;","bdls:n":"border-left-style:none;",bdlc:"border-left-color:#${1:000};","bdlc:t":"border-left-color:transparent;",bdrs:"border-radius:|;",bdtrrs:"border-top-right-radius:|;",bdtlrs:"border-top-left-radius:|;",bdbrrs:"border-bottom-right-radius:|;",
bdblrs:"border-bottom-left-radius:|;",bg:"background:|;","bg+":"background:${1:#fff} url(${2}) ${3:0} ${4:0} ${5:no-repeat};","bg:n":"background:none;","bg:ie":"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${1:x}.png',sizingMethod='${2:crop}');",bgc:"background-color:#${1:fff};","bgc:t":"background-color:transparent;",bgi:"background-image:url(|);","bgi:n":"background-image:none;",bgr:"background-repeat:|;","bgr:n":"background-repeat:no-repeat;","bgr:x":"background-repeat:repeat-x;",
"bgr:y":"background-repeat:repeat-y;","bgr:sp":"background-repeat:space;","bgr:rd":"background-repeat:round;",bga:"background-attachment:|;","bga:f":"background-attachment:fixed;","bga:s":"background-attachment:scroll;",bgp:"background-position:${1:0} ${2:0};",bgpx:"background-position-x:|;",bgpy:"background-position-y:|;",bgbk:"background-break:|;","bgbk:bb":"background-break:bounding-box;","bgbk:eb":"background-break:each-box;","bgbk:c":"background-break:continuous;",bgcp:"background-clip:${1:padding-box};",
"bgcp:bb":"background-clip:border-box;","bgcp:pb":"background-clip:padding-box;","bgcp:cb":"background-clip:content-box;","bgcp:nc":"background-clip:no-clip;",bgo:"background-origin:|;","bgo:pb":"background-origin:padding-box;","bgo:bb":"background-origin:border-box;","bgo:cb":"background-origin:content-box;",bgsz:"background-size:|;","bgsz:a":"background-size:auto;","bgsz:ct":"background-size:contain;","bgsz:cv":"background-size:cover;",c:"color:#${1:000};","c:r":"color:rgb(${1:0}, ${2:0}, ${3:0});",
"c:ra":"color:rgba(${1:0}, ${2:0}, ${3:0}, .${4:5});",cm:"/* |${child} */",cnt:"content:'|';","cnt:n":"content:normal;","cnt:oq":"content:open-quote;","cnt:noq":"content:no-open-quote;","cnt:cq":"content:close-quote;","cnt:ncq":"content:no-close-quote;","cnt:a":"content:attr(|);","cnt:c":"content:counter(|);","cnt:cs":"content:counters(|);",tbl:"table-layout:|;","tbl:a":"table-layout:auto;","tbl:f":"table-layout:fixed;",cps:"caption-side:|;","cps:t":"caption-side:top;","cps:b":"caption-side:bottom;",
ec:"empty-cells:|;","ec:s":"empty-cells:show;","ec:h":"empty-cells:hide;",lis:"list-style:|;","lis:n":"list-style:none;",lisp:"list-style-position:|;","lisp:i":"list-style-position:inside;","lisp:o":"list-style-position:outside;",list:"list-style-type:|;","list:n":"list-style-type:none;","list:d":"list-style-type:disc;","list:c":"list-style-type:circle;","list:s":"list-style-type:square;","list:dc":"list-style-type:decimal;","list:dclz":"list-style-type:decimal-leading-zero;","list:lr":"list-style-type:lower-roman;",
"list:ur":"list-style-type:upper-roman;",lisi:"list-style-image:|;","lisi:n":"list-style-image:none;",q:"quotes:|;","q:n":"quotes:none;","q:ru":"quotes:'\\00AB' '\\00BB' '\\201E' '\\201C';","q:en":"quotes:'\\201C' '\\201D' '\\2018' '\\2019';",ct:"content:|;","ct:n":"content:normal;","ct:oq":"content:open-quote;","ct:noq":"content:no-open-quote;","ct:cq":"content:close-quote;","ct:ncq":"content:no-close-quote;","ct:a":"content:attr(|);","ct:c":"content:counter(|);","ct:cs":"content:counters(|);",coi:"counter-increment:|;",
cor:"counter-reset:|;",va:"vertical-align:${1:top};","va:sup":"vertical-align:super;","va:t":"vertical-align:top;","va:tt":"vertical-align:text-top;","va:m":"vertical-align:middle;","va:bl":"vertical-align:baseline;","va:b":"vertical-align:bottom;","va:tb":"vertical-align:text-bottom;","va:sub":"vertical-align:sub;",ta:"text-align:${1:left};","ta:l":"text-align:left;","ta:c":"text-align:center;","ta:r":"text-align:right;","ta:j":"text-align:justify;","ta-lst":"text-align-last:|;","tal:a":"text-align-last:auto;",
"tal:l":"text-align-last:left;","tal:c":"text-align-last:center;","tal:r":"text-align-last:right;",td:"text-decoration:${1:none};","td:n":"text-decoration:none;","td:u":"text-decoration:underline;","td:o":"text-decoration:overline;","td:l":"text-decoration:line-through;",te:"text-emphasis:|;","te:n":"text-emphasis:none;","te:ac":"text-emphasis:accent;","te:dt":"text-emphasis:dot;","te:c":"text-emphasis:circle;","te:ds":"text-emphasis:disc;","te:b":"text-emphasis:before;","te:a":"text-emphasis:after;",
th:"text-height:|;","th:a":"text-height:auto;","th:f":"text-height:font-size;","th:t":"text-height:text-size;","th:m":"text-height:max-size;",ti:"text-indent:|;","ti:-":"text-indent:-9999px;",tj:"text-justify:|;","tj:a":"text-justify:auto;","tj:iw":"text-justify:inter-word;","tj:ii":"text-justify:inter-ideograph;","tj:ic":"text-justify:inter-cluster;","tj:d":"text-justify:distribute;","tj:k":"text-justify:kashida;","tj:t":"text-justify:tibetan;",tov:"text-overflow:${ellipsis};","tov:e":"text-overflow:ellipsis;",
"tov:c":"text-overflow:clip;",to:"text-outline:|;","to+":"text-outline:${1:0} ${2:0} ${3:#000};","to:n":"text-outline:none;",tr:"text-replace:|;","tr:n":"text-replace:none;",tt:"text-transform:${1:uppercase};","tt:n":"text-transform:none;","tt:c":"text-transform:capitalize;","tt:u":"text-transform:uppercase;","tt:l":"text-transform:lowercase;",tw:"text-wrap:|;","tw:n":"text-wrap:normal;","tw:no":"text-wrap:none;","tw:u":"text-wrap:unrestricted;","tw:s":"text-wrap:suppress;",tsh:"text-shadow:${1:hoff} ${2:voff} ${3:blur} ${4:#000};",
"tsh:r":"text-shadow:${1:h} ${2:v} ${3:blur} rgb(${4:0}, ${5:0}, ${6:0});","tsh:ra":"text-shadow:${1:h} ${2:v} ${3:blur} rgba(${4:0}, ${5:0}, ${6:0}, .${7:5});","tsh+":"text-shadow:${1:0} ${2:0} ${3:0} ${4:#000};","tsh:n":"text-shadow:none;",trf:"transform:|;","trf:skx":"transform: skewX(${1:angle});","trf:sky":"transform: skewY(${1:angle});","trf:sc":"transform: scale(${1:x}, ${2:y});","trf:scx":"transform: scaleX(${1:x});","trf:scy":"transform: scaleY(${1:y});","trf:r":"transform: rotate(${1:angle});",
"trf:t":"transform: translate(${1:x}, ${2:y});","trf:tx":"transform: translateX(${1:x});","trf:ty":"transform: translateY(${1:y});",trfo:"transform-origin:|;",trfs:"transform-style:${1:preserve-3d};",trs:"transition:${1:prop} ${2:time};",trsde:"transition-delay:${1:time};",trsdu:"transition-duration:${1:time};",trsp:"transition-property:${1:prop};",trstf:"transition-timing-function:${1:tfunc};",lh:"line-height:|;",whs:"white-space:|;","whs:n":"white-space:normal;","whs:p":"white-space:pre;","whs:nw":"white-space:nowrap;",
"whs:pw":"white-space:pre-wrap;","whs:pl":"white-space:pre-line;",whsc:"white-space-collapse:|;","whsc:n":"white-space-collapse:normal;","whsc:k":"white-space-collapse:keep-all;","whsc:l":"white-space-collapse:loose;","whsc:bs":"white-space-collapse:break-strict;","whsc:ba":"white-space-collapse:break-all;",wob:"word-break:|;","wob:n":"word-break:normal;","wob:k":"word-break:keep-all;","wob:l":"word-break:loose;","wob:bs":"word-break:break-strict;","wob:ba":"word-break:break-all;",wos:"word-spacing:|;",
wow:"word-wrap:|;","wow:nm":"word-wrap:normal;","wow:n":"word-wrap:none;","wow:u":"word-wrap:unrestricted;","wow:s":"word-wrap:suppress;","wow:b":"word-wrap:break-word;",lts:"letter-spacing:|;",f:"font:|;","f+":"font:${1:1em} ${2:Arial,sans-serif};",fw:"font-weight:|;","fw:n":"font-weight:normal;","fw:b":"font-weight:bold;","fw:br":"font-weight:bolder;","fw:lr":"font-weight:lighter;",fs:"font-style:${italic};","fs:n":"font-style:normal;","fs:i":"font-style:italic;","fs:o":"font-style:oblique;",fv:"font-variant:|;",
"fv:n":"font-variant:normal;","fv:sc":"font-variant:small-caps;",fz:"font-size:|;",fza:"font-size-adjust:|;","fza:n":"font-size-adjust:none;",ff:"font-family:|;","ff:s":"font-family:serif;","ff:ss":"font-family:sans-serif;","ff:c":"font-family:cursive;","ff:f":"font-family:fantasy;","ff:m":"font-family:monospace;",fef:"font-effect:|;","fef:n":"font-effect:none;","fef:eg":"font-effect:engrave;","fef:eb":"font-effect:emboss;","fef:o":"font-effect:outline;",fem:"font-emphasize:|;",femp:"font-emphasize-position:|;",
"femp:b":"font-emphasize-position:before;","femp:a":"font-emphasize-position:after;",fems:"font-emphasize-style:|;","fems:n":"font-emphasize-style:none;","fems:ac":"font-emphasize-style:accent;","fems:dt":"font-emphasize-style:dot;","fems:c":"font-emphasize-style:circle;","fems:ds":"font-emphasize-style:disc;",fsm:"font-smooth:|;","fsm:a":"font-smooth:auto;","fsm:n":"font-smooth:never;","fsm:aw":"font-smooth:always;",fst:"font-stretch:|;","fst:n":"font-stretch:normal;","fst:uc":"font-stretch:ultra-condensed;",
"fst:ec":"font-stretch:extra-condensed;","fst:c":"font-stretch:condensed;","fst:sc":"font-stretch:semi-condensed;","fst:se":"font-stretch:semi-expanded;","fst:e":"font-stretch:expanded;","fst:ee":"font-stretch:extra-expanded;","fst:ue":"font-stretch:ultra-expanded;",op:"opacity:|;","op:ie":"filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);","op:ms":"-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';",rsz:"resize:|;","rsz:n":"resize:none;","rsz:b":"resize:both;","rsz:h":"resize:horizontal;",
"rsz:v":"resize:vertical;",cur:"cursor:${pointer};","cur:a":"cursor:auto;","cur:d":"cursor:default;","cur:c":"cursor:crosshair;","cur:ha":"cursor:hand;","cur:he":"cursor:help;","cur:m":"cursor:move;","cur:p":"cursor:pointer;","cur:t":"cursor:text;",pgbb:"page-break-before:|;","pgbb:au":"page-break-before:auto;","pgbb:al":"page-break-before:always;","pgbb:l":"page-break-before:left;","pgbb:r":"page-break-before:right;",pgbi:"page-break-inside:|;","pgbi:au":"page-break-inside:auto;","pgbi:av":"page-break-inside:avoid;",
pgba:"page-break-after:|;","pgba:au":"page-break-after:auto;","pgba:al":"page-break-after:always;","pgba:l":"page-break-after:left;","pgba:r":"page-break-after:right;",orp:"orphans:|;",us:"user-select:${none};",wid:"widows:|;",wfsm:"-webkit-font-smoothing:${antialiased};","wfsm:a":"-webkit-font-smoothing:antialiased;","wfsm:s":"-webkit-font-smoothing:subpixel-antialiased;","wfsm:sa":"-webkit-font-smoothing:subpixel-antialiased;","wfsm:n":"-webkit-font-smoothing:none;"}},html:{filters:"html",profile:"html",
snippets:{"!!!":"<!doctype html>","!!!4t":'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',"!!!4s":'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',"!!!xt":'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',"!!!xs":'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',"!!!xxs":'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
c:"<\!-- |${child} --\>","cc:ie6":"<\!--[if lte IE 6]>\n\t${child}|\n<![endif]--\>","cc:ie":"<\!--[if IE]>\n\t${child}|\n<![endif]--\>","cc:noie":"<\!--[if !IE]><\!--\>\n\t${child}|\n<\!--<![endif]--\>"},abbreviations:{"!":"html:5",a:'<a href="">',"a:link":'<a href="http://|">',"a:mail":'<a href="mailto:|">',abbr:'<abbr title="">',acronym:'<acronym title="">',base:'<base href="" />',basefont:"<basefont/>",br:"<br/>",frame:"<frame/>",hr:"<hr/>",bdo:'<bdo dir="">',"bdo:r":'<bdo dir="rtl">',"bdo:l":'<bdo dir="ltr">',
col:"<col/>",link:'<link rel="stylesheet" href="" />',"link:css":'<link rel="stylesheet" href="${1:style}.css" />',"link:print":'<link rel="stylesheet" href="${1:print}.css" media="print" />',"link:favicon":'<link rel="shortcut icon" type="image/x-icon" href="${1:favicon.ico}" />',"link:touch":'<link rel="apple-touch-icon" href="${1:favicon.png}" />',"link:rss":'<link rel="alternate" type="application/rss+xml" title="RSS" href="${1:rss.xml}" />',"link:atom":'<link rel="alternate" type="application/atom+xml" title="Atom" href="${1:atom.xml}" />',
meta:"<meta/>","meta:utf":'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />',"meta:win":'<meta http-equiv="Content-Type" content="text/html;charset=windows-1251" />',"meta:vp":'<meta name="viewport" content="width=${1:device-width}, user-scalable=${2:no}, initial-scale=${3:1.0}, maximum-scale=${4:1.0}, minimum-scale=${5:1.0}" />',"meta:compat":'<meta http-equiv="X-UA-Compatible" content="${1:IE=7}" />',style:"<style>",script:"<script>","script:src":'<script src="">',img:'<img src="" alt="" />',
iframe:'<iframe src="" frameborder="0">',embed:'<embed src="" type="" />',object:'<object data="" type="">',param:'<param name="" value="" />',map:'<map name="">',area:'<area shape="" coords="" href="" alt="" />',"area:d":'<area shape="default" href="" alt="" />',"area:c":'<area shape="circle" coords="" href="" alt="" />',"area:r":'<area shape="rect" coords="" href="" alt="" />',"area:p":'<area shape="poly" coords="" href="" alt="" />',form:'<form action="">',"form:get":'<form action="" method="get">',
"form:post":'<form action="" method="post">',label:'<label for="">',input:'<input type="${1:text}" />',inp:'<input type="${1:text}" name="" id="" />',"input:hidden":"input[type=hidden name]","input:h":"input:hidden","input:text":"inp","input:t":"inp","input:search":"inp[type=search]","input:email":"inp[type=email]","input:url":"inp[type=url]","input:password":"inp[type=password]","input:p":"input:password","input:datetime":"inp[type=datetime]","input:date":"inp[type=date]","input:datetime-local":"inp[type=datetime-local]",
"input:month":"inp[type=month]","input:week":"inp[type=week]","input:time":"inp[type=time]","input:number":"inp[type=number]","input:color":"inp[type=color]","input:checkbox":"inp[type=checkbox]","input:c":"input:checkbox","input:radio":"inp[type=radio]","input:r":"input:radio","input:range":"inp[type=range]","input:file":"inp[type=file]","input:f":"input:file","input:submit":'<input type="submit" value="" />',"input:s":"input:submit","input:image":'<input type="image" src="" alt="" />',"input:i":"input:image",
"input:button":'<input type="button" value="" />',"input:b":"input:button",isindex:"<isindex/>","input:reset":"input:button[type=reset]",select:'<select name="" id="">',option:'<option value="">',textarea:'<textarea name="" id="" cols="${1:30}" rows="${2:10}">',"menu:context":"menu[type=context]>","menu:c":"menu:context","menu:toolbar":"menu[type=toolbar]>","menu:t":"menu:toolbar",video:'<video src="">',audio:'<audio src="">',"html:xml":'<html xmlns="http://www.w3.org/1999/xhtml">',keygen:"<keygen/>",
command:"<command/>",bq:"blockquote",acr:"acronym",fig:"figure",figc:"figcaption",ifr:"iframe",emb:"embed",obj:"object",src:"source",cap:"caption",colg:"colgroup",fst:"fieldset",btn:"button","btn:b":"button[type=button]","btn:r":"button[type=reset]","btn:s":"button[type=submit]",optg:"optgroup",opt:"option",tarea:"textarea",leg:"legend",sect:"section",art:"article",hdr:"header",ftr:"footer",adr:"address",dlg:"dialog",str:"strong",prog:"progress",fset:"fieldset",datag:"datagrid",datal:"datalist",kg:"keygen",
out:"output",det:"details",cmd:"command",doc:"html>(head>meta[charset=UTF-8]+title{${1:Document}})+body",doc4:'html>(head>meta[http-equiv="Content-Type" content="text/html;charset=${charset}"]+title{${1:Document}})+body',"html:4t":"!!!4t+doc4[lang=${lang}]","html:4s":"!!!4s+doc4[lang=${lang}]","html:xt":"!!!xt+doc4[xmlns=http://www.w3.org/1999/xhtml xml:lang=${lang}]","html:xs":"!!!xs+doc4[xmlns=http://www.w3.org/1999/xhtml xml:lang=${lang}]","html:xxs":"!!!xxs+doc4[xmlns=http://www.w3.org/1999/xhtml xml:lang=${lang}]",
"html:5":"!!!+doc[lang=${lang}]","ol+":"ol>li","ul+":"ul>li","dl+":"dl>dt+dd","map+":"map>area","table+":"table>tr>td","colgroup+":"colgroup>col","colg+":"colgroup>col","tr+":"tr>td","select+":"select>option","optgroup+":"optgroup>option","optg+":"optgroup>option"}},xml:{"extends":"html",profile:"xml",filters:"html"},xsl:{"extends":"html",profile:"xml",filters:"html, xsl",abbreviations:{tm:'<xsl:template match="" mode="">',tmatch:"tm",tn:'<xsl:template name="">',tname:"tn",call:'<xsl:call-template name=""/>',
ap:'<xsl:apply-templates select="" mode=""/>',api:"<xsl:apply-imports/>",imp:'<xsl:import href=""/>',inc:'<xsl:include href=""/>',ch:"<xsl:choose>","xsl:when":'<xsl:when test="">',wh:"xsl:when",ot:"<xsl:otherwise>","if":'<xsl:if test="">',par:'<xsl:param name="">',pare:'<xsl:param name="" select=""/>',"var":'<xsl:variable name="">',vare:'<xsl:variable name="" select=""/>',wp:'<xsl:with-param name="" select=""/>',key:'<xsl:key name="" match="" use=""/>',elem:'<xsl:element name="">',attr:'<xsl:attribute name="">',
attrs:'<xsl:attribute-set name="">',cp:'<xsl:copy select=""/>',co:'<xsl:copy-of select=""/>',val:'<xsl:value-of select=""/>',each:'<xsl:for-each select="">',"for":"each",tex:"<xsl:text></xsl:text>",com:"<xsl:comment>",msg:'<xsl:message terminate="no">',fall:"<xsl:fallback>",num:'<xsl:number value=""/>',nam:'<namespace-alias stylesheet-prefix="" result-prefix=""/>',pres:'<xsl:preserve-space elements=""/>',strip:'<xsl:strip-space elements=""/>',proc:'<xsl:processing-instruction name="">',sort:'<xsl:sort select="" order=""/>',
"choose+":"xsl:choose>xsl:when+xsl:otherwise",xsl:"!!!+xsl:stylesheet[version=1.0 xmlns:xsl=http://www.w3.org/1999/XSL/Transform]>{\n|}"},snippets:{"!!!":'<?xml version="1.0" encoding="UTF-8"?>'}},haml:{filters:"haml","extends":"html",profile:"xml"},scss:{"extends":"css"},sass:{"extends":"css"},less:{"extends":"css"},stylus:{"extends":"css"}},"system")});
emmet.define("shortcut",function(){var e=/mac\s+os/i.test(navigator.userAgent),d={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},h={esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,"break":19,insert:45,home:36,"delete":46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,
pd:34,plus:187,minus:189,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},i={ctrl:"\u2303",control:"\u2303",meta:"\u2318",shift:"\u21e7",alt:"\u2325",enter:"\u23ce",tab:"\u21e5",left:"\u2190",right:"\u2192",up:"\u2191",down:"\u2193"},b={meta:"Ctrl",control:"Ctrl",left:"\u2190",right:"\u2192",up:"\u2191",down:"\u2193"},c={SHIFT:1,CTRL:2,ALT:4,META:8};return{compile:function(a){if(typeof a!="string")return a;for(var b=0,a=a.toLowerCase().split("+"),
d,h,i=0,n=a.length;i<n;i++)h=a[i],!e&&h=="meta"&&(h="ctrl"),h=="ctrl"||h=="control"?b|=c.CTRL:h=="shift"?b|=c.SHIFT:h=="alt"?b|=c.ALT:h=="meta"?b|=c.META:d=h;return{mask:b,key:d}},test:function(a,b){var e=0,i=this.compile(a);b.ctrlKey&&(e|=c.CTRL);b.shiftKey&&(e|=c.SHIFT);b.altKey&&(e|=c.ALT);b.metaKey&&(e|=c.META);var l=b.keyCode?b.keyCode:b.which,n=String.fromCharCode(l).toLowerCase();if(e!==i.mask)return!1;if(i.key.length>1)return h[i.key]==l;else{l==188&&(n=",");l==190&&(n=".");l==191&&(n="/");
if(n==i.key)return!0;if(b.shiftKey&&d[n])return d[n]==i.key}return!1},format:function(a){for(var c=e?i:b,d=e?"":"+",a=a.toLowerCase().split("+"),h=[],l,n=0;n<a.length;n++)l=a[n],h.push(l in c?c[l]:l.charAt().toUpperCase()+l.substring(1));return h.join(d)}}});
emmet.define("editor",function(e,d){var h=null,i=document.createElement("textarea");i.value="\n";e("utils").setNewline(i.value);i=null;return{setContext:function(b){h=b},getContext:function(){return h},getSelectionRange:function(){if("selectionStart"in h)return{start:h.selectionStart,end:h.selectionEnd};else if(document.selection){h.focus();var b=document.selection.createRange();if(b===null)return{start:0,end:this.getContent().length};var c=h.createTextRange(),a=c.duplicate();c.moveToBookmark(b.getBookmark());
a.setEndPoint("EndToStart",c);return{start:a.text.length,end:a.text.length+b.text.length}}else return null},createSelection:function(b,c){typeof c=="undefined"&&(c=b);if("setSelectionRange"in h)h.setSelectionRange(b,c);else if("createTextRange"in h){var a=h.createTextRange();a.collapse(!0);var d=e("utils"),f=d.splitByLines(this.getContent().substring(0,b)).length-1;c-=f+d.splitByLines(this.getContent().substring(b,c)).length-1;b-=f;a.moveStart("character",b);a.moveEnd("character",c-b);a.select()}},
getCurrentLineRange:function(){var b=this.getCaretPos();return b===null?null:e("utils").findNewlineBounds(this.getContent(),b)},getCaretPos:function(){var b=this.getSelectionRange();return b?b.start:null},setCaretPos:function(b){this.createSelection(b)},getCurrentLine:function(){var b=this.getCurrentLineRange();return b.start<b.end?this.getContent().substring(b.start,b.end):""},replaceContent:function(b,c,a,g){var f=this.getContent(),i=e("utils");d.isUndefined(a)&&(a=d.isUndefined(c)?f.length:c);
d.isUndefined(c)&&(c=0);g||(b=i.padString(b,i.getLinePaddingFromPosition(f,c)));g=emmet.require("tabStops").extract(b,{escape:function(a){return a}});b=g.text;(g=g.tabstops[0])?(g.start+=c,g.end+=c):g={start:b.length+c,end:b.length+c};try{h.value=i.replaceSubstring(f,b,c,a),this.createSelection(g.start,g.end)}catch(l){}},getContent:function(){return h.value||""},getSyntax:function(){return e("actionUtils").detectSyntax(this,e("textarea").getOption("syntax"))},getProfileName:function(){var b=e("textarea").getOption("profile");
return this.getSyntax()=="html"&&b?b:e("actionUtils").detectProfile(this)},prompt:function(b){return prompt(b)},getSelection:function(){var b=this.getSelectionRange();if(b)try{return this.getContent().substring(b.start,b.end)}catch(c){}return""},getFilePath:function(){return location.href}}});
emmet.define("textarea",function(e,d){function h(b){for(var c=e("editor").getContext().className||"",g=/\bemmet\-(\w+)\-(\w+)/g,h=d.extend({},a,f||{}),i;i=g.exec(c);){var j=i[1].toLowerCase();i=i[2].toLowerCase();if(i=="true"||i=="yes"||i=="1")i=!0;else if(i=="false"||i=="no"||i=="0")i=!1;h[j]=i}return h[b]}function i(a,b){g[a.toLowerCase()]={compiled:e("shortcut").compile(a),action:b}}function b(a){var a=a||window.event,b=a.target||a.srcElement,c=a.keyCode||a.which,f=e("editor"),i=e("shortcut");
if(b&&b.nodeType==1&&b.nodeName=="TEXTAREA"){if(~b.className.indexOf("no-emmet"))return!1;f.setContext(b);return!d.find(g,function(b){if(i.test(b.compiled,a)){b=b.action;switch(b){case "expand_abbreviation":if(c==9)if(h("use_tab"))b="expand_abbreviation_with_tab";else return!1;break;case "insert_formatted_line_break":if(c==13&&!h("pretty_break"))return!1}e("actions").run(b,f);b=a;b.cancelBubble=!0;b.returnValue=!1;b.stopPropagation&&(b.stopPropagation(),b.preventDefault());return!0}})}return!0}var c=
{"Meta+E":"expand_abbreviation",Tab:"expand_abbreviation","Meta+D":"match_pair_outward","Shift+Meta+D":"match_pair_inward","Shift+Meta+A":"wrap_with_abbreviation","Ctrl+Alt+Right":"next_edit_point","Ctrl+Alt+Left":"prev_edit_point","Meta+L":"select_line","Meta+Shift+M":"merge_lines","Meta+/":"toggle_comment","Meta+J":"split_join_tag","Meta+K":"remove_tag","Shift+Meta+Y":"evaluate_math_expression","Ctrl+Up":"increment_number_by_1","Ctrl+Down":"decrement_number_by_1","Alt+Up":"increment_number_by_01",
"Alt+Down":"decrement_number_by_01","Ctrl+Alt+Up":"increment_number_by_10","Ctrl+Alt+Down":"decrement_number_by_10","Meta+.":"select_next_item","Meta+,":"select_previous_item","Meta+Shift+B":"reflect_css_value",Enter:"insert_formatted_line_break"},a={syntax:"html",use_tab:!1,pretty_break:!1},g={},f={},j=document;j.addEventListener?j.addEventListener("keydown",b,!1):j.attachEvent?ele.attachEvent("onkeydown",b):j.onkeydown=func;f=d.extend({},a,{});typeof emmetKeymap!="undefined"&&(c=emmetKeymap);d.each(c,
function(a,b){i(b,a)});return{setOptions:function(b){f=d.extend({},a,b||{})},getOption:h,addShortcut:i,unbindShortcut:function(a){a=a.toLowerCase();a in g&&delete g[a]},getShortcuts:function(){var a=e("shortcut"),b=e("actions");return d.compact(d.map(g,function(c,e){var f=e.toLowerCase();return f=="tab"||f=="enter"?void 0:{keystroke:a.format(e),compiled:c.compiled,label:d.last((b.get(c.action).options.label||c.action).split("/")),action:c.action}}))},getInfo:function(){var a="This textareas on this page are powered by Emmet toolkit.\n\nAvailable shortcuts:\n",
b=d.map(this.getShortcuts(),function(a){return a.keystroke+" \u2014 "+a.label});a+=b.join("\n")+"\n\n";a+="More info on http://emmet.io/";return a},showInfo:function(){alert(this.getInfo())},setup:function(a){this.setOptions(a)}}});
},{}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define, location) {
	'use strict';

	var undef;

	define(function (require) {

		var mixin, origin, urlRE, absoluteUrlRE, fullyQualifiedUrlRE;

		mixin = require('./util/mixin');

		urlRE = /([a-z][a-z0-9\+\-\.]*:)\/\/([^@]+@)?(([^:\/]+)(:([0-9]+))?)?(\/[^?#]*)?(\?[^#]*)?(#\S*)?/i;
		absoluteUrlRE = /^([a-z][a-z0-9\-\+\.]*:\/\/|\/)/i;
		fullyQualifiedUrlRE = /([a-z][a-z0-9\+\-\.]*:)\/\/([^@]+@)?(([^:\/]+)(:([0-9]+))?)?\//i;

		/**
		 * Apply params to the template to create a URL.
		 *
		 * Parameters that are not applied directly to the template, are appended
		 * to the URL as query string parameters.
		 *
		 * @param {string} template the URI template
		 * @param {Object} params parameters to apply to the template
		 * @return {string} the resulting URL
		 */
		function buildUrl(template, params) {
			// internal builder to convert template with params.
			var url, name, queryStringParams, re;

			url = template;
			queryStringParams = {};

			if (params) {
				for (name in params) {
					/*jshint forin:false */
					re = new RegExp('\\{' + name + '\\}');
					if (re.test(url)) {
						url = url.replace(re, encodeURIComponent(params[name]), 'g');
					}
					else {
						queryStringParams[name] = params[name];
					}
				}
				for (name in queryStringParams) {
					url += url.indexOf('?') === -1 ? '?' : '&';
					url += encodeURIComponent(name);
					if (queryStringParams[name] !== null && queryStringParams[name] !== undefined) {
						url += '=';
						url += encodeURIComponent(queryStringParams[name]);
					}
				}
			}
			return url;
		}

		function startsWith(str, test) {
			return str.indexOf(test) === 0;
		}

		/**
		 * Create a new URL Builder
		 *
		 * @param {string|UrlBuilder} template the base template to build from, may be another UrlBuilder
		 * @param {Object} [params] base parameters
		 * @constructor
		 */
		function UrlBuilder(template, params) {
			if (!(this instanceof UrlBuilder)) {
				// invoke as a constructor
				return new UrlBuilder(template, params);
			}

			if (template instanceof UrlBuilder) {
				this._template = template.template;
				this._params = mixin({}, this._params, params);
			}
			else {
				this._template = (template || '').toString();
				this._params = params || {};
			}
		}

		UrlBuilder.prototype = {

			/**
			 * Create a new UrlBuilder instance that extends the current builder.
			 * The current builder is unmodified.
			 *
			 * @param {string} [template] URL template to append to the current template
			 * @param {Object} [params] params to combine with current params.  New params override existing params
			 * @return {UrlBuilder} the new builder
			 */
			append: function (template,  params) {
				// TODO consider query strings and fragments
				return new UrlBuilder(this._template + template, mixin({}, this._params, params));
			},

			/**
			 * Create a new UrlBuilder with a fully qualified URL based on the
			 * window's location or base href and the current templates relative URL.
			 *
			 * Path variables are preserved.
			 *
			 * *Browser only*
			 *
			 * @return {UrlBuilder} the fully qualified URL template
			 */
			fullyQualify: function () {
				if (!location) { return this; }
				if (this.isFullyQualified()) { return this; }

				var template = this._template;

				if (startsWith(template, '//')) {
					template = origin.protocol + template;
				}
				else if (startsWith(template, '/')) {
					template = origin.origin + template;
				}
				else if (!this.isAbsolute()) {
					template = origin.origin + origin.pathname.substring(0, origin.pathname.lastIndexOf('/') + 1);
				}

				if (template.indexOf('/', 8) === -1) {
					// default the pathname to '/'
					template = template + '/';
				}

				return new UrlBuilder(template, this._params);
			},

			/**
			 * True if the URL is absolute
			 *
			 * @return {boolean}
			 */
			isAbsolute: function () {
				return absoluteUrlRE.test(this.build());
			},

			/**
			 * True if the URL is fully qualified
			 *
			 * @return {boolean}
			 */
			isFullyQualified: function () {
				return fullyQualifiedUrlRE.test(this.build());
			},

			/**
			 * True if the URL is cross origin. The protocol, host and port must not be
			 * the same in order to be cross origin,
			 *
			 * @return {boolean}
			 */
			isCrossOrigin: function () {
				if (!origin) {
					return true;
				}
				var url = this.parts();
				return url.protocol !== origin.protocol ||
				       url.hostname !== origin.hostname ||
				       url.port !== origin.port;
			},

			/**
			 * Split a URL into its consituent parts following the naming convention of
			 * 'window.location'. One difference is that the port will contain the
			 * protocol default if not specified.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/DOM/window.location
			 *
			 * @returns {Object} a 'window.location'-like object
			 */
			parts: function () {
				/*jshint maxcomplexity:20 */
				var url, parts;
				url = this.fullyQualify().build().match(urlRE);
				parts = {
					href: url[0],
					protocol: url[1],
					host: url[3] || '',
					hostname: url[4] || '',
					port: url[6],
					pathname: url[7] || '',
					search: url[8] || '',
					hash: url[9] || ''
				};
				parts.origin = parts.protocol + '//' + parts.host;
				parts.port = parts.port || (parts.protocol === 'https:' ? '443' : parts.protocol === 'http:' ? '80' : '');
				return parts;
			},

			/**
			 * Expand the template replacing path variables with parameters
			 *
			 * @param {Object} [params] params to combine with current params.  New params override existing params
			 * @return {string} the expanded URL
			 */
			build: function (params) {
				return buildUrl(this._template, mixin({}, this._params, params));
			},

			/**
			 * @see build
			 */
			toString: function () {
				return this.build();
			}

		};

		origin = location ? new UrlBuilder(location.href).parts() : undef;

		return UrlBuilder;
	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); },
	typeof window !== 'undefined' ? window.location : void 0
	// Boilerplate for AMD and Node
));

},{"./util/mixin":11}],7:[function(require,module,exports){
/*
 * Copyright 2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (require) {

		var rest = require('./client/default'),
		    browser = require('./client/xhr');

		rest.setPlatformDefaultClient(browser);

		return rest;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
	// Boilerplate for AMD and Node
));

},{"./client/default":9,"./client/xhr":10}],8:[function(require,module,exports){
/*
 * Copyright 2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (/* require */) {

		/**
		 * Add common helper methods to a client impl
		 *
		 * @param {function} impl the client implementation
		 * @param {Client} [target] target of this client, used when wrapping other clients
		 * @returns {Client} the client impl with additional methods
		 */
		return function client(impl, target) {

			if (target) {

				/**
				 * @returns {Client} the target client
				 */
				impl.skip = function skip() {
					return target;
				};

			}

			/**
			 * Allow a client to easily be wrapped by an interceptor
			 *
			 * @param {Interceptor} interceptor the interceptor to wrap this client with
			 * @param [config] configuration for the interceptor
			 * @returns {Client} the newly wrapped client
			 */
			impl.wrap = function wrap(interceptor, config) {
				return interceptor(impl, config);
			};

			/**
			 * @deprecated
			 */
			impl.chain = function chain() {
				if (typeof console !== 'undefined') {
					console.log('rest.js: client.chain() is deprecated, use client.wrap() instead');
				}

				return impl.wrap.apply(this, arguments);
			};

			return impl;

		};

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
	// Boilerplate for AMD and Node
));

},{}],9:[function(require,module,exports){
/*
 * Copyright 2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	var undef;

	define(function (require) {

		/**
		 * Plain JS Object containing properties that represent an HTTP request.
		 *
		 * Depending on the capabilities of the underlying client, a request
		 * may be cancelable. If a request may be canceled, the client will add
		 * a canceled flag and cancel function to the request object. Canceling
		 * the request will put the response into an error state.
		 *
		 * @field {string} [method='GET'] HTTP method, commonly GET, POST, PUT, DELETE or HEAD
		 * @field {string|UrlBuilder} [path=''] path template with optional path variables
		 * @field {Object} [params] parameters for the path template and query string
		 * @field {Object} [headers] custom HTTP headers to send, in addition to the clients default headers
		 * @field [entity] the HTTP entity, common for POST or PUT requests
		 * @field {boolean} [canceled] true if the request has been canceled, set by the client
		 * @field {Function} [cancel] cancels the request if invoked, provided by the client
		 * @field {Client} [originator] the client that first handled this request, provided by the interceptor
		 *
		 * @class Request
		 */

		/**
		 * Plain JS Object containing properties that represent an HTTP response
		 *
		 * @field {Object} [request] the request object as received by the root client
		 * @field {Object} [raw] the underlying request object, like XmlHttpRequest in a browser
		 * @field {number} [status.code] status code of the response (i.e. 200, 404)
		 * @field {string} [status.text] status phrase of the response
		 * @field {Object] [headers] response headers hash of normalized name, value pairs
		 * @field [entity] the response body
		 *
		 * @class Response
		 */

		/**
		 * HTTP client particularly suited for RESTful operations.
		 *
		 * @field {function} wrap wraps this client with a new interceptor returning the wrapped client
		 *
		 * @param {Request} the HTTP request
		 * @returns {ResponsePromise<Response>} a promise the resolves to the HTTP response
		 *
		 * @class Client
		 */

		 /**
		  * Extended when.js Promises/A+ promise with HTTP specific helpers
		  *q
		  * @method entity promise for the HTTP entity
		  * @method status promise for the HTTP status code
		  * @method headers promise for the HTTP response headers
		  * @method header promise for a specific HTTP response header
		  *
		  * @class ResponsePromise
		  * @extends Promise
		  */

		var client, target, platformDefault;

		client = require('../client');

		/**
		 * Make a request with the default client
		 * @param {Request} the HTTP request
		 * @returns {Promise<Response>} a promise the resolves to the HTTP response
		 */
		function defaultClient() {
			return target.apply(undef, arguments);
		}

		/**
		 * Change the default client
		 * @param {Client} client the new default client
		 */
		defaultClient.setDefaultClient = function setDefaultClient(client) {
			target = client;
		};

		/**
		 * Obtain a direct reference to the current default client
		 * @returns {Client} the default client
		 */
		defaultClient.getDefaultClient = function getDefaultClient() {
			return target;
		};

		/**
		 * Reset the default client to the platform default
		 */
		defaultClient.resetDefaultClient = function resetDefaultClient() {
			target = platformDefault;
		};

		/**
		 * @private
		 */
		defaultClient.setPlatformDefaultClient = function setPlatformDefaultClient(client) {
			if (platformDefault) {
				throw new Error('Unable to redefine platformDefaultClient');
			}
			target = platformDefault = client;
		};

		return client(defaultClient);

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
	// Boilerplate for AMD and Node
));

},{"../client":8}],10:[function(require,module,exports){
/*
 * Copyright 2012-2014 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define, global) {
	'use strict';

	define(function (require) {

		var when, UrlBuilder, normalizeHeaderName, responsePromise, client, headerSplitRE;

		when = require('when');
		UrlBuilder = require('../UrlBuilder');
		normalizeHeaderName = require('../util/normalizeHeaderName');
		responsePromise = require('../util/responsePromise');
		client = require('../client');

		// according to the spec, the line break is '\r\n', but doesn't hold true in practice
		headerSplitRE = /[\r|\n]+/;

		function parseHeaders(raw) {
			// Note: Set-Cookie will be removed by the browser
			var headers = {};

			if (!raw) { return headers; }

			raw.trim().split(headerSplitRE).forEach(function (header) {
				var boundary, name, value;
				boundary = header.indexOf(':');
				name = normalizeHeaderName(header.substring(0, boundary).trim());
				value = header.substring(boundary + 1).trim();
				if (headers[name]) {
					if (Array.isArray(headers[name])) {
						// add to an existing array
						headers[name].push(value);
					}
					else {
						// convert single value to array
						headers[name] = [headers[name], value];
					}
				}
				else {
					// new, single value
					headers[name] = value;
				}
			});

			return headers;
		}

		function safeMixin(target, source) {
			Object.keys(source || {}).forEach(function (prop) {
				// make sure the property already exists as
				// IE 6 will blow up if we add a new prop
				if (source.hasOwnProperty(prop) && prop in target) {
					try {
						target[prop] = source[prop];
					}
					catch (e) {
						// ignore, expected for some properties at some points in the request lifecycle
					}
				}
			});

			return target;
		}

		return client(function xhr(request) {
			return responsePromise.promise(function (resolve, reject) {
				/*jshint maxcomplexity:20 */

				var client, method, url, headers, entity, headerName, response, XMLHttpRequest;

				request = typeof request === 'string' ? { path: request } : request || {};
				response = { request: request };

				if (request.canceled) {
					response.error = 'precanceled';
					reject(response);
					return;
				}

				XMLHttpRequest = request.engine || global.XMLHttpRequest;
				if (!XMLHttpRequest) {
					reject({ request: request, error: 'xhr-not-available' });
					return;
				}

				entity = request.entity;
				request.method = request.method || (entity ? 'POST' : 'GET');
				method = request.method;
				url = new UrlBuilder(request.path || '', request.params).build();

				try {
					client = response.raw = new XMLHttpRequest();

					// mixin extra request properties before and after opening the request as some properties require being set at different phases of the request
					safeMixin(client, request.mixin);
					client.open(method, url, true);
					safeMixin(client, request.mixin);

					headers = request.headers;
					for (headerName in headers) {
						/*jshint forin:false */
						if (headerName === 'Content-Type' && headers[headerName] === 'multipart/form-data') {
							// XMLHttpRequest generates its own Content-Type header with the
							// appropriate multipart boundary when sending multipart/form-data.
							continue;
						}

						client.setRequestHeader(headerName, headers[headerName]);
					}

					request.canceled = false;
					request.cancel = function cancel() {
						request.canceled = true;
						client.abort();
						reject(response);
					};

					client.onreadystatechange = function (/* e */) {
						if (request.canceled) { return; }
						if (client.readyState === (XMLHttpRequest.DONE || 4)) {
							response.status = {
								code: client.status,
								text: client.statusText
							};
							response.headers = parseHeaders(client.getAllResponseHeaders());
							response.entity = client.responseText;

							if (response.status.code > 0) {
								// check status code as readystatechange fires before error event
								resolve(response);
							}
							else {
								// give the error callback a chance to fire before resolving
								// requests for file:// URLs do not have a status code
								setTimeout(function () {
									resolve(response);
								}, 0);
							}
						}
					};

					try {
						client.onerror = function (/* e */) {
							response.error = 'loaderror';
							reject(response);
						};
					}
					catch (e) {
						// IE 6 will not support error handling
					}

					client.send(entity);
				}
				catch (e) {
					response.error = 'loaderror';
					reject(response);
				}

			});
		});

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); },
	typeof window !== 'undefined' ? window : void 0
	// Boilerplate for AMD and Node
));

},{"../UrlBuilder":6,"../client":8,"../util/normalizeHeaderName":12,"../util/responsePromise":13,"when":31}],11:[function(require,module,exports){
/*
 * Copyright 2012-2013 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	// derived from dojo.mixin
	define(function (/* require */) {

		var empty = {};

		/**
		 * Mix the properties from the source object into the destination object.
		 * When the same property occurs in more then one object, the right most
		 * value wins.
		 *
		 * @param {Object} dest the object to copy properties to
		 * @param {Object} sources the objects to copy properties from.  May be 1 to N arguments, but not an Array.
		 * @return {Object} the destination object
		 */
		function mixin(dest /*, sources... */) {
			var i, l, source, name;

			if (!dest) { dest = {}; }
			for (i = 1, l = arguments.length; i < l; i += 1) {
				source = arguments[i];
				for (name in source) {
					if (!(name in dest) || (dest[name] !== source[name] && (!(name in empty) || empty[name] !== source[name]))) {
						dest[name] = source[name];
					}
				}
			}

			return dest; // Object
		}

		return mixin;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
	// Boilerplate for AMD and Node
));

},{}],12:[function(require,module,exports){
/*
 * Copyright 2012 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (/* require */) {

		/**
		 * Normalize HTTP header names using the pseudo camel case.
		 *
		 * For example:
		 *   content-type         -> Content-Type
		 *   accepts              -> Accepts
		 *   x-custom-header-name -> X-Custom-Header-Name
		 *
		 * @param {string} name the raw header name
		 * @return {string} the normalized header name
		 */
		function normalizeHeaderName(name) {
			return name.toLowerCase()
				.split('-')
				.map(function (chunk) { return chunk.charAt(0).toUpperCase() + chunk.slice(1); })
				.join('-');
		}

		return normalizeHeaderName;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
	// Boilerplate for AMD and Node
));

},{}],13:[function(require,module,exports){
/*
 * Copyright 2014-2015 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

(function (define) {
	'use strict';

	define(function (require) {

		var when = require('when'),
			normalizeHeaderName = require('./normalizeHeaderName');

		function property(promise, name) {
			return promise.then(
				function (value) {
					return value && value[name];
				},
				function (value) {
					return when.reject(value && value[name]);
				}
			);
		}

		/**
		 * Obtain the response entity
		 *
		 * @returns {Promise} for the response entity
		 */
		function entity() {
			/*jshint validthis:true */
			return property(this, 'entity');
		}

		/**
		 * Obtain the response status
		 *
		 * @returns {Promise} for the response status
		 */
		function status() {
			/*jshint validthis:true */
			return property(property(this, 'status'), 'code');
		}

		/**
		 * Obtain the response headers map
		 *
		 * @returns {Promise} for the response headers map
		 */
		function headers() {
			/*jshint validthis:true */
			return property(this, 'headers');
		}

		/**
		 * Obtain a specific response header
		 *
		 * @param {String} headerName the header to retrieve
		 * @returns {Promise} for the response header's value
		 */
		function header(headerName) {
			/*jshint validthis:true */
			headerName = normalizeHeaderName(headerName);
			return property(this.headers(), headerName);
		}

		/**
		 * Follow a related resource
		 *
		 * The relationship to follow may be define as a plain string, an object
		 * with the rel and params, or an array containing one or more entries
		 * with the previous forms.
		 *
		 * Examples:
		 *   response.follow('next')
		 *
		 *   response.follow({ rel: 'next', params: { pageSize: 100 } })
		 *
		 *   response.follow([
		 *       { rel: 'items', params: { projection: 'noImages' } },
		 *       'search',
		 *       { rel: 'findByGalleryIsNull', params: { projection: 'noImages' } },
		 *       'items'
		 *   ])
		 *
		 * @param {String|Object|Array} rels one, or more, relationships to follow
		 * @returns ResponsePromise<Response> related resource
		 */
		function follow(rels) {
			/*jshint validthis:true */
			rels = [].concat(rels);
			return make(when.reduce(rels, function (response, rel) {
				if (typeof rel === 'string') {
					rel = { rel: rel };
				}
				if (typeof response.entity.clientFor !== 'function') {
					throw new Error('Hypermedia response expected');
				}
				var client = response.entity.clientFor(rel.rel);
				return client({ params: rel.params });
			}, this));
		}

		/**
		 * Wrap a Promise as an ResponsePromise
		 *
		 * @param {Promise<Response>} promise the promise for an HTTP Response
		 * @returns {ResponsePromise<Response>} wrapped promise for Response with additional helper methods
		 */
		function make(promise) {
			promise.status = status;
			promise.headers = headers;
			promise.header = header;
			promise.entity = entity;
			promise.follow = follow;
			return promise;
		}

		function responsePromise() {
			return make(when.apply(when, arguments));
		}

		responsePromise.make = make;
		responsePromise.reject = function (val) {
			return make(when.reject(val));
		};
		responsePromise.promise = function (func) {
			return make(when.promise(func));
		};

		return responsePromise;

	});

}(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
	// Boilerplate for AMD and Node
));

},{"./normalizeHeaderName":12,"when":31}],14:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function (require) {

	var makePromise = require('./makePromise');
	var Scheduler = require('./Scheduler');
	var async = require('./env').asap;

	return makePromise({
		scheduler: new Scheduler(async)
	});

});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });

},{"./Scheduler":15,"./env":27,"./makePromise":29}],15:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	// Credit to Twisol (https://github.com/Twisol) for suggesting
	// this type of extensible queue + trampoline approach for next-tick conflation.

	/**
	 * Async task scheduler
	 * @param {function} async function to schedule a single async function
	 * @constructor
	 */
	function Scheduler(async) {
		this._async = async;
		this._running = false;

		this._queue = this;
		this._queueLen = 0;
		this._afterQueue = {};
		this._afterQueueLen = 0;

		var self = this;
		this.drain = function() {
			self._drain();
		};
	}

	/**
	 * Enqueue a task
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.enqueue = function(task) {
		this._queue[this._queueLen++] = task;
		this.run();
	};

	/**
	 * Enqueue a task to run after the main task queue
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.afterQueue = function(task) {
		this._afterQueue[this._afterQueueLen++] = task;
		this.run();
	};

	Scheduler.prototype.run = function() {
		if (!this._running) {
			this._running = true;
			this._async(this.drain);
		}
	};

	/**
	 * Drain the handler queue entirely, and then the after queue
	 */
	Scheduler.prototype._drain = function() {
		var i = 0;
		for (; i < this._queueLen; ++i) {
			this._queue[i].run();
			this._queue[i] = void 0;
		}

		this._queueLen = 0;
		this._running = false;

		for (i = 0; i < this._afterQueueLen; ++i) {
			this._afterQueue[i].run();
			this._afterQueue[i] = void 0;
		}

		this._afterQueueLen = 0;
	};

	return Scheduler;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],16:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	/**
	 * Custom error type for promises rejected by promise.timeout
	 * @param {string} message
	 * @constructor
	 */
	function TimeoutError (message) {
		Error.call(this);
		this.message = message;
		this.name = TimeoutError.name;
		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(this, TimeoutError);
		}
	}

	TimeoutError.prototype = Object.create(Error.prototype);
	TimeoutError.prototype.constructor = TimeoutError;

	return TimeoutError;
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
},{}],17:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	makeApply.tryCatchResolve = tryCatchResolve;

	return makeApply;

	function makeApply(Promise, call) {
		if(arguments.length < 2) {
			call = tryCatchResolve;
		}

		return apply;

		function apply(f, thisArg, args) {
			var p = Promise._defer();
			var l = args.length;
			var params = new Array(l);
			callAndResolve({ f:f, thisArg:thisArg, args:args, params:params, i:l-1, call:call }, p._handler);

			return p;
		}

		function callAndResolve(c, h) {
			if(c.i < 0) {
				return call(c.f, c.thisArg, c.params, h);
			}

			var handler = Promise._handler(c.args[c.i]);
			handler.fold(callAndResolveNext, c, void 0, h);
		}

		function callAndResolveNext(c, x, h) {
			c.params[c.i] = x;
			c.i -= 1;
			callAndResolve(c, h);
		}
	}

	function tryCatchResolve(f, thisArg, args, resolver) {
		try {
			resolver.resolve(f.apply(thisArg, args));
		} catch(e) {
			resolver.reject(e);
		}
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));



},{}],18:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var state = require('../state');
	var applier = require('../apply');

	return function array(Promise) {

		var applyFold = applier(Promise);
		var toPromise = Promise.resolve;
		var all = Promise.all;

		var ar = Array.prototype.reduce;
		var arr = Array.prototype.reduceRight;
		var slice = Array.prototype.slice;

		// Additional array combinators

		Promise.any = any;
		Promise.some = some;
		Promise.settle = settle;

		Promise.map = map;
		Promise.filter = filter;
		Promise.reduce = reduce;
		Promise.reduceRight = reduceRight;

		/**
		 * When this promise fulfills with an array, do
		 * onFulfilled.apply(void 0, array)
		 * @param {function} onFulfilled function to apply
		 * @returns {Promise} promise for the result of applying onFulfilled
		 */
		Promise.prototype.spread = function(onFulfilled) {
			return this.then(all).then(function(array) {
				return onFulfilled.apply(this, array);
			});
		};

		return Promise;

		/**
		 * One-winner competitive race.
		 * Return a promise that will fulfill when one of the promises
		 * in the input array fulfills, or will reject when all promises
		 * have rejected.
		 * @param {array} promises
		 * @returns {Promise} promise for the first fulfilled value
		 */
		function any(promises) {
			var p = Promise._defer();
			var resolver = p._handler;
			var l = promises.length>>>0;

			var pending = l;
			var errors = [];

			for (var h, x, i = 0; i < l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				h = Promise._handler(x);
				if(h.state() > 0) {
					resolver.become(h);
					Promise._visitRemaining(promises, i, h);
					break;
				} else {
					h.visit(resolver, handleFulfill, handleReject);
				}
			}

			if(pending === 0) {
				resolver.reject(new RangeError('any(): array must not be empty'));
			}

			return p;

			function handleFulfill(x) {
				/*jshint validthis:true*/
				errors = null;
				this.resolve(x); // this === resolver
			}

			function handleReject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--pending === 0) {
					this.reject(errors);
				}
			}
		}

		/**
		 * N-winner competitive race
		 * Return a promise that will fulfill when n input promises have
		 * fulfilled, or will reject when it becomes impossible for n
		 * input promises to fulfill (ie when promises.length - n + 1
		 * have rejected)
		 * @param {array} promises
		 * @param {number} n
		 * @returns {Promise} promise for the earliest n fulfillment values
		 *
		 * @deprecated
		 */
		function some(promises, n) {
			/*jshint maxcomplexity:7*/
			var p = Promise._defer();
			var resolver = p._handler;

			var results = [];
			var errors = [];

			var l = promises.length>>>0;
			var nFulfill = 0;
			var nReject;
			var x, i; // reused in both for() loops

			// First pass: count actual array items
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}
				++nFulfill;
			}

			// Compute actual goals
			n = Math.max(n, 0);
			nReject = (nFulfill - n + 1);
			nFulfill = Math.min(n, nFulfill);

			if(n > nFulfill) {
				resolver.reject(new RangeError('some(): array must contain at least '
				+ n + ' item(s), but had ' + nFulfill));
			} else if(nFulfill === 0) {
				resolver.resolve(results);
			}

			// Second pass: observe each array item, make progress toward goals
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}

				Promise._handler(x).visit(resolver, fulfill, reject, resolver.notify);
			}

			return p;

			function fulfill(x) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				results.push(x);
				if(--nFulfill === 0) {
					errors = null;
					this.resolve(results);
				}
			}

			function reject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--nReject === 0) {
					results = null;
					this.reject(errors);
				}
			}
		}

		/**
		 * Apply f to the value of each promise in a list of promises
		 * and return a new list containing the results.
		 * @param {array} promises
		 * @param {function(x:*, index:Number):*} f mapping function
		 * @returns {Promise}
		 */
		function map(promises, f) {
			return Promise._traverse(f, promises);
		}

		/**
		 * Filter the provided array of promises using the provided predicate.  Input may
		 * contain promises and values
		 * @param {Array} promises array of promises and values
		 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
		 *  Must return truthy (or promise for truthy) for items to retain.
		 * @returns {Promise} promise that will fulfill with an array containing all items
		 *  for which predicate returned truthy.
		 */
		function filter(promises, predicate) {
			var a = slice.call(promises);
			return Promise._traverse(predicate, a).then(function(keep) {
				return filterSync(a, keep);
			});
		}

		function filterSync(promises, keep) {
			// Safe because we know all promises have fulfilled if we've made it this far
			var l = keep.length;
			var filtered = new Array(l);
			for(var i=0, j=0; i<l; ++i) {
				if(keep[i]) {
					filtered[j++] = Promise._handler(promises[i]).value;
				}
			}
			filtered.length = j;
			return filtered;

		}

		/**
		 * Return a promise that will always fulfill with an array containing
		 * the outcome states of all input promises.  The returned promise
		 * will never reject.
		 * @param {Array} promises
		 * @returns {Promise} promise for array of settled state descriptors
		 */
		function settle(promises) {
			return all(promises.map(settleOne));
		}

		function settleOne(p) {
			var h = Promise._handler(p);
			if(h.state() === 0) {
				return toPromise(p).then(state.fulfilled, state.rejected);
			}

			h._unreport();
			return state.inspect(h);
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduce(promises, f /*, initialValue */) {
			return arguments.length > 2 ? ar.call(promises, liftCombine(f), arguments[2])
					: ar.call(promises, liftCombine(f));
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduceRight()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduceRight(promises, f /*, initialValue */) {
			return arguments.length > 2 ? arr.call(promises, liftCombine(f), arguments[2])
					: arr.call(promises, liftCombine(f));
		}

		function liftCombine(f) {
			return function(z, x, i) {
				return applyFold(f, void 0, [z,x,i]);
			};
		}
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"../apply":17,"../state":30}],19:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function flow(Promise) {

		var resolve = Promise.resolve;
		var reject = Promise.reject;
		var origCatch = Promise.prototype['catch'];

		/**
		 * Handle the ultimate fulfillment value or rejection reason, and assume
		 * responsibility for all errors.  If an error propagates out of result
		 * or handleFatalError, it will be rethrown to the host, resulting in a
		 * loud stack track on most platforms and a crash on some.
		 * @param {function?} onResult
		 * @param {function?} onError
		 * @returns {undefined}
		 */
		Promise.prototype.done = function(onResult, onError) {
			this._handler.visit(this._handler.receiver, onResult, onError);
		};

		/**
		 * Add Error-type and predicate matching to catch.  Examples:
		 * promise.catch(TypeError, handleTypeError)
		 *   .catch(predicate, handleMatchedErrors)
		 *   .catch(handleRemainingErrors)
		 * @param onRejected
		 * @returns {*}
		 */
		Promise.prototype['catch'] = Promise.prototype.otherwise = function(onRejected) {
			if (arguments.length < 2) {
				return origCatch.call(this, onRejected);
			}

			if(typeof onRejected !== 'function') {
				return this.ensure(rejectInvalidPredicate);
			}

			return origCatch.call(this, createCatchFilter(arguments[1], onRejected));
		};

		/**
		 * Wraps the provided catch handler, so that it will only be called
		 * if the predicate evaluates truthy
		 * @param {?function} handler
		 * @param {function} predicate
		 * @returns {function} conditional catch handler
		 */
		function createCatchFilter(handler, predicate) {
			return function(e) {
				return evaluatePredicate(e, predicate)
					? handler.call(this, e)
					: reject(e);
			};
		}

		/**
		 * Ensures that onFulfilledOrRejected will be called regardless of whether
		 * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
		 * receive the promises' value or reason.  Any returned value will be disregarded.
		 * onFulfilledOrRejected may throw or return a rejected promise to signal
		 * an additional error.
		 * @param {function} handler handler to be called regardless of
		 *  fulfillment or rejection
		 * @returns {Promise}
		 */
		Promise.prototype['finally'] = Promise.prototype.ensure = function(handler) {
			if(typeof handler !== 'function') {
				return this;
			}

			return this.then(function(x) {
				return runSideEffect(handler, this, identity, x);
			}, function(e) {
				return runSideEffect(handler, this, reject, e);
			});
		};

		function runSideEffect (handler, thisArg, propagate, value) {
			var result = handler.call(thisArg);
			return maybeThenable(result)
				? propagateValue(result, propagate, value)
				: propagate(value);
		}

		function propagateValue (result, propagate, x) {
			return resolve(result).then(function () {
				return propagate(x);
			});
		}

		/**
		 * Recover from a failure by returning a defaultValue.  If defaultValue
		 * is a promise, it's fulfillment value will be used.  If defaultValue is
		 * a promise that rejects, the returned promise will reject with the
		 * same reason.
		 * @param {*} defaultValue
		 * @returns {Promise} new promise
		 */
		Promise.prototype['else'] = Promise.prototype.orElse = function(defaultValue) {
			return this.then(void 0, function() {
				return defaultValue;
			});
		};

		/**
		 * Shortcut for .then(function() { return value; })
		 * @param  {*} value
		 * @return {Promise} a promise that:
		 *  - is fulfilled if value is not a promise, or
		 *  - if value is a promise, will fulfill with its value, or reject
		 *    with its reason.
		 */
		Promise.prototype['yield'] = function(value) {
			return this.then(function() {
				return value;
			});
		};

		/**
		 * Runs a side effect when this promise fulfills, without changing the
		 * fulfillment value.
		 * @param {function} onFulfilledSideEffect
		 * @returns {Promise}
		 */
		Promise.prototype.tap = function(onFulfilledSideEffect) {
			return this.then(onFulfilledSideEffect)['yield'](this);
		};

		return Promise;
	};

	function rejectInvalidPredicate() {
		throw new TypeError('catch predicate must be a function');
	}

	function evaluatePredicate(e, predicate) {
		return isError(predicate) ? e instanceof predicate : predicate(e);
	}

	function isError(predicate) {
		return predicate === Error
			|| (predicate != null && predicate.prototype instanceof Error);
	}

	function maybeThenable(x) {
		return (typeof x === 'object' || typeof x === 'function') && x !== null;
	}

	function identity(x) {
		return x;
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],20:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @author Jeff Escalante */

(function(define) { 'use strict';
define(function() {

	return function fold(Promise) {

		Promise.prototype.fold = function(f, z) {
			var promise = this._beget();

			this._handler.fold(function(z, x, to) {
				Promise._handler(z).fold(function(x, z, to) {
					to.resolve(f.call(this, z, x));
				}, x, this, to);
			}, z, promise._handler.receiver, promise._handler);

			return promise;
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],21:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var inspect = require('../state').inspect;

	return function inspection(Promise) {

		Promise.prototype.inspect = function() {
			return inspect(Promise._handler(this));
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"../state":30}],22:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function generate(Promise) {

		var resolve = Promise.resolve;

		Promise.iterate = iterate;
		Promise.unfold = unfold;

		return Promise;

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.iterate
		 * Generate a (potentially infinite) stream of promised values:
		 * x, f(x), f(f(x)), etc. until condition(x) returns true
		 * @param {function} f function to generate a new x from the previous x
		 * @param {function} condition function that, given the current x, returns
		 *  truthy when the iterate should stop
		 * @param {function} handler function to handle the value produced by f
		 * @param {*|Promise} x starting value, may be a promise
		 * @return {Promise} the result of the last call to f before
		 *  condition returns true
		 */
		function iterate(f, condition, handler, x) {
			return unfold(function(x) {
				return [x, f(x)];
			}, condition, handler, x);
		}

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.unfold
		 * Generate a (potentially infinite) stream of promised values
		 * by applying handler(generator(seed)) iteratively until
		 * condition(seed) returns true.
		 * @param {function} unspool function that generates a [value, newSeed]
		 *  given a seed.
		 * @param {function} condition function that, given the current seed, returns
		 *  truthy when the unfold should stop
		 * @param {function} handler function to handle the value produced by unspool
		 * @param x {*|Promise} starting value, may be a promise
		 * @return {Promise} the result of the last value produced by unspool before
		 *  condition returns true
		 */
		function unfold(unspool, condition, handler, x) {
			return resolve(x).then(function(seed) {
				return resolve(condition(seed)).then(function(done) {
					return done ? seed : resolve(unspool(seed)).spread(next);
				});
			});

			function next(item, newSeed) {
				return resolve(handler(item)).then(function() {
					return unfold(unspool, condition, handler, newSeed);
				});
			}
		}
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],23:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function progress(Promise) {

		/**
		 * @deprecated
		 * Register a progress handler for this promise
		 * @param {function} onProgress
		 * @returns {Promise}
		 */
		Promise.prototype.progress = function(onProgress) {
			return this.then(void 0, void 0, onProgress);
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],24:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var env = require('../env');
	var TimeoutError = require('../TimeoutError');

	function setTimeout(f, ms, x, y) {
		return env.setTimer(function() {
			f(x, y, ms);
		}, ms);
	}

	return function timed(Promise) {
		/**
		 * Return a new promise whose fulfillment value is revealed only
		 * after ms milliseconds
		 * @param {number} ms milliseconds
		 * @returns {Promise}
		 */
		Promise.prototype.delay = function(ms) {
			var p = this._beget();
			this._handler.fold(handleDelay, ms, void 0, p._handler);
			return p;
		};

		function handleDelay(ms, x, h) {
			setTimeout(resolveDelay, ms, x, h);
		}

		function resolveDelay(x, h) {
			h.resolve(x);
		}

		/**
		 * Return a new promise that rejects after ms milliseconds unless
		 * this promise fulfills earlier, in which case the returned promise
		 * fulfills with the same value.
		 * @param {number} ms milliseconds
		 * @param {Error|*=} reason optional rejection reason to use, defaults
		 *   to a TimeoutError if not provided
		 * @returns {Promise}
		 */
		Promise.prototype.timeout = function(ms, reason) {
			var p = this._beget();
			var h = p._handler;

			var t = setTimeout(onTimeout, ms, reason, p._handler);

			this._handler.visit(h,
				function onFulfill(x) {
					env.clearTimer(t);
					this.resolve(x); // this = h
				},
				function onReject(x) {
					env.clearTimer(t);
					this.reject(x); // this = h
				},
				h.notify);

			return p;
		};

		function onTimeout(reason, h, ms) {
			var e = typeof reason === 'undefined'
				? new TimeoutError('timed out after ' + ms + 'ms')
				: reason;
			h.reject(e);
		}

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"../TimeoutError":16,"../env":27}],25:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var setTimer = require('../env').setTimer;
	var format = require('../format');

	return function unhandledRejection(Promise) {

		var logError = noop;
		var logInfo = noop;
		var localConsole;

		if(typeof console !== 'undefined') {
			// Alias console to prevent things like uglify's drop_console option from
			// removing console.log/error. Unhandled rejections fall into the same
			// category as uncaught exceptions, and build tools shouldn't silence them.
			localConsole = console;
			logError = typeof localConsole.error !== 'undefined'
				? function (e) { localConsole.error(e); }
				: function (e) { localConsole.log(e); };

			logInfo = typeof localConsole.info !== 'undefined'
				? function (e) { localConsole.info(e); }
				: function (e) { localConsole.log(e); };
		}

		Promise.onPotentiallyUnhandledRejection = function(rejection) {
			enqueue(report, rejection);
		};

		Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
			enqueue(unreport, rejection);
		};

		Promise.onFatalRejection = function(rejection) {
			enqueue(throwit, rejection.value);
		};

		var tasks = [];
		var reported = [];
		var running = null;

		function report(r) {
			if(!r.handled) {
				reported.push(r);
				logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
			}
		}

		function unreport(r) {
			var i = reported.indexOf(r);
			if(i >= 0) {
				reported.splice(i, 1);
				logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
			}
		}

		function enqueue(f, x) {
			tasks.push(f, x);
			if(running === null) {
				running = setTimer(flush, 0);
			}
		}

		function flush() {
			running = null;
			while(tasks.length > 0) {
				tasks.shift()(tasks.shift());
			}
		}

		return Promise;
	};

	function throwit(e) {
		throw e;
	}

	function noop() {}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"../env":27,"../format":28}],26:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function addWith(Promise) {
		/**
		 * Returns a promise whose handlers will be called with `this` set to
		 * the supplied receiver.  Subsequent promises derived from the
		 * returned promise will also have their handlers called with receiver
		 * as `this`. Calling `with` with undefined or no arguments will return
		 * a promise whose handlers will again be called in the usual Promises/A+
		 * way (no `this`) thus safely undoing any previous `with` in the
		 * promise chain.
		 *
		 * WARNING: Promises returned from `with`/`withThis` are NOT Promises/A+
		 * compliant, specifically violating 2.2.5 (http://promisesaplus.com/#point-41)
		 *
		 * @param {object} receiver `this` value for all handlers attached to
		 *  the returned promise.
		 * @returns {Promise}
		 */
		Promise.prototype['with'] = Promise.prototype.withThis = function(receiver) {
			var p = this._beget();
			var child = p._handler;
			child.receiver = receiver;
			this._handler.chain(child, receiver);
			return p;
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));


},{}],27:[function(require,module,exports){
(function (process){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
(function(define) { 'use strict';
define(function(require) {
	/*jshint maxcomplexity:6*/

	// Sniff "best" async scheduling option
	// Prefer process.nextTick or MutationObserver, then check for
	// setTimeout, and finally vertx, since its the only env that doesn't
	// have setTimeout

	var MutationObs;
	var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;

	// Default env
	var setTimer = function(f, ms) { return setTimeout(f, ms); };
	var clearTimer = function(t) { return clearTimeout(t); };
	var asap = function (f) { return capturedSetTimeout(f, 0); };

	// Detect specific env
	if (isNode()) { // Node
		asap = function (f) { return process.nextTick(f); };

	} else if (MutationObs = hasMutationObserver()) { // Modern browser
		asap = initMutationObserver(MutationObs);

	} else if (!capturedSetTimeout) { // vert.x
		var vertxRequire = require;
		var vertx = vertxRequire('vertx');
		setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
		clearTimer = vertx.cancelTimer;
		asap = vertx.runOnLoop || vertx.runOnContext;
	}

	return {
		setTimer: setTimer,
		clearTimer: clearTimer,
		asap: asap
	};

	function isNode () {
		return typeof process !== 'undefined' && process !== null &&
			typeof process.nextTick === 'function';
	}

	function hasMutationObserver () {
		return (typeof MutationObserver === 'function' && MutationObserver) ||
			(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
	}

	function initMutationObserver(MutationObserver) {
		var scheduled;
		var node = document.createTextNode('');
		var o = new MutationObserver(run);
		o.observe(node, { characterData: true });

		function run() {
			var f = scheduled;
			scheduled = void 0;
			f();
		}

		var i = 0;
		return function (f) {
			scheduled = f;
			node.data = (i ^= 1);
		};
	}
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

}).call(this,require('_process'))
},{"_process":5}],28:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return {
		formatError: formatError,
		formatObject: formatObject,
		tryStringify: tryStringify
	};

	/**
	 * Format an error into a string.  If e is an Error and has a stack property,
	 * it's returned.  Otherwise, e is formatted using formatObject, with a
	 * warning added about e not being a proper Error.
	 * @param {*} e
	 * @returns {String} formatted string, suitable for output to developers
	 */
	function formatError(e) {
		var s = typeof e === 'object' && e !== null && e.stack ? e.stack : formatObject(e);
		return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
	}

	/**
	 * Format an object, detecting "plain" objects and running them through
	 * JSON.stringify if possible.
	 * @param {Object} o
	 * @returns {string}
	 */
	function formatObject(o) {
		var s = String(o);
		if(s === '[object Object]' && typeof JSON !== 'undefined') {
			s = tryStringify(o, s);
		}
		return s;
	}

	/**
	 * Try to return the result of JSON.stringify(x).  If that fails, return
	 * defaultValue
	 * @param {*} x
	 * @param {*} defaultValue
	 * @returns {String|*} JSON.stringify(x) or defaultValue
	 */
	function tryStringify(x, defaultValue) {
		try {
			return JSON.stringify(x);
		} catch(e) {
			return defaultValue;
		}
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],29:[function(require,module,exports){
(function (process){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function makePromise(environment) {

		var tasks = environment.scheduler;
		var emitRejection = initEmitRejection();

		var objectCreate = Object.create ||
			function(proto) {
				function Child() {}
				Child.prototype = proto;
				return new Child();
			};

		/**
		 * Create a promise whose fate is determined by resolver
		 * @constructor
		 * @returns {Promise} promise
		 * @name Promise
		 */
		function Promise(resolver, handler) {
			this._handler = resolver === Handler ? handler : init(resolver);
		}

		/**
		 * Run the supplied resolver
		 * @param resolver
		 * @returns {Pending}
		 */
		function init(resolver) {
			var handler = new Pending();

			try {
				resolver(promiseResolve, promiseReject, promiseNotify);
			} catch (e) {
				promiseReject(e);
			}

			return handler;

			/**
			 * Transition from pre-resolution state to post-resolution state, notifying
			 * all listeners of the ultimate fulfillment or rejection
			 * @param {*} x resolution value
			 */
			function promiseResolve (x) {
				handler.resolve(x);
			}
			/**
			 * Reject this promise with reason, which will be used verbatim
			 * @param {Error|*} reason rejection reason, strongly suggested
			 *   to be an Error type
			 */
			function promiseReject (reason) {
				handler.reject(reason);
			}

			/**
			 * @deprecated
			 * Issue a progress event, notifying all progress listeners
			 * @param {*} x progress event payload to pass to all listeners
			 */
			function promiseNotify (x) {
				handler.notify(x);
			}
		}

		// Creation

		Promise.resolve = resolve;
		Promise.reject = reject;
		Promise.never = never;

		Promise._defer = defer;
		Promise._handler = getHandler;

		/**
		 * Returns a trusted promise. If x is already a trusted promise, it is
		 * returned, otherwise returns a new trusted Promise which follows x.
		 * @param  {*} x
		 * @return {Promise} promise
		 */
		function resolve(x) {
			return isPromise(x) ? x
				: new Promise(Handler, new Async(getHandler(x)));
		}

		/**
		 * Return a reject promise with x as its reason (x is used verbatim)
		 * @param {*} x
		 * @returns {Promise} rejected promise
		 */
		function reject(x) {
			return new Promise(Handler, new Async(new Rejected(x)));
		}

		/**
		 * Return a promise that remains pending forever
		 * @returns {Promise} forever-pending promise.
		 */
		function never() {
			return foreverPendingPromise; // Should be frozen
		}

		/**
		 * Creates an internal {promise, resolver} pair
		 * @private
		 * @returns {Promise}
		 */
		function defer() {
			return new Promise(Handler, new Pending());
		}

		// Transformation and flow control

		/**
		 * Transform this promise's fulfillment value, returning a new Promise
		 * for the transformed result.  If the promise cannot be fulfilled, onRejected
		 * is called with the reason.  onProgress *may* be called with updates toward
		 * this promise's fulfillment.
		 * @param {function=} onFulfilled fulfillment handler
		 * @param {function=} onRejected rejection handler
		 * @param {function=} onProgress @deprecated progress handler
		 * @return {Promise} new promise
		 */
		Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
			var parent = this._handler;
			var state = parent.join().state();

			if ((typeof onFulfilled !== 'function' && state > 0) ||
				(typeof onRejected !== 'function' && state < 0)) {
				// Short circuit: value will not change, simply share handler
				return new this.constructor(Handler, parent);
			}

			var p = this._beget();
			var child = p._handler;

			parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);

			return p;
		};

		/**
		 * If this promise cannot be fulfilled due to an error, call onRejected to
		 * handle the error. Shortcut for .then(undefined, onRejected)
		 * @param {function?} onRejected
		 * @return {Promise}
		 */
		Promise.prototype['catch'] = function(onRejected) {
			return this.then(void 0, onRejected);
		};

		/**
		 * Creates a new, pending promise of the same type as this promise
		 * @private
		 * @returns {Promise}
		 */
		Promise.prototype._beget = function() {
			return begetFrom(this._handler, this.constructor);
		};

		function begetFrom(parent, Promise) {
			var child = new Pending(parent.receiver, parent.join().context);
			return new Promise(Handler, child);
		}

		// Array combinators

		Promise.all = all;
		Promise.race = race;
		Promise._traverse = traverse;

		/**
		 * Return a promise that will fulfill when all promises in the
		 * input array have fulfilled, or will reject when one of the
		 * promises rejects.
		 * @param {array} promises array of promises
		 * @returns {Promise} promise for array of fulfillment values
		 */
		function all(promises) {
			return traverseWith(snd, null, promises);
		}

		/**
		 * Array<Promise<X>> -> Promise<Array<f(X)>>
		 * @private
		 * @param {function} f function to apply to each promise's value
		 * @param {Array} promises array of promises
		 * @returns {Promise} promise for transformed values
		 */
		function traverse(f, promises) {
			return traverseWith(tryCatch2, f, promises);
		}

		function traverseWith(tryMap, f, promises) {
			var handler = typeof f === 'function' ? mapAt : settleAt;

			var resolver = new Pending();
			var pending = promises.length >>> 0;
			var results = new Array(pending);

			for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
				x = promises[i];

				if (x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				traverseAt(promises, handler, i, x, resolver);
			}

			if(pending === 0) {
				resolver.become(new Fulfilled(results));
			}

			return new Promise(Handler, resolver);

			function mapAt(i, x, resolver) {
				if(!resolver.resolved) {
					traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
				}
			}

			function settleAt(i, x, resolver) {
				results[i] = x;
				if(--pending === 0) {
					resolver.become(new Fulfilled(results));
				}
			}
		}

		function traverseAt(promises, handler, i, x, resolver) {
			if (maybeThenable(x)) {
				var h = getHandlerMaybeThenable(x);
				var s = h.state();

				if (s === 0) {
					h.fold(handler, i, void 0, resolver);
				} else if (s > 0) {
					handler(i, h.value, resolver);
				} else {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
				}
			} else {
				handler(i, x, resolver);
			}
		}

		Promise._visitRemaining = visitRemaining;
		function visitRemaining(promises, start, handler) {
			for(var i=start; i<promises.length; ++i) {
				markAsHandled(getHandler(promises[i]), handler);
			}
		}

		function markAsHandled(h, handler) {
			if(h === handler) {
				return;
			}

			var s = h.state();
			if(s === 0) {
				h.visit(h, void 0, h._unreport);
			} else if(s < 0) {
				h._unreport();
			}
		}

		/**
		 * Fulfill-reject competitive race. Return a promise that will settle
		 * to the same state as the earliest input promise to settle.
		 *
		 * WARNING: The ES6 Promise spec requires that race()ing an empty array
		 * must return a promise that is pending forever.  This implementation
		 * returns a singleton forever-pending promise, the same singleton that is
		 * returned by Promise.never(), thus can be checked with ===
		 *
		 * @param {array} promises array of promises to race
		 * @returns {Promise} if input is non-empty, a promise that will settle
		 * to the same outcome as the earliest input promise to settle. if empty
		 * is empty, returns a promise that will never settle.
		 */
		function race(promises) {
			if(typeof promises !== 'object' || promises === null) {
				return reject(new TypeError('non-iterable passed to race()'));
			}

			// Sigh, race([]) is untestable unless we return *something*
			// that is recognizable without calling .then() on it.
			return promises.length === 0 ? never()
				 : promises.length === 1 ? resolve(promises[0])
				 : runRace(promises);
		}

		function runRace(promises) {
			var resolver = new Pending();
			var i, x, h;
			for(i=0; i<promises.length; ++i) {
				x = promises[i];
				if (x === void 0 && !(i in promises)) {
					continue;
				}

				h = getHandler(x);
				if(h.state() !== 0) {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
					break;
				} else {
					h.visit(resolver, resolver.resolve, resolver.reject);
				}
			}
			return new Promise(Handler, resolver);
		}

		// Promise internals
		// Below this, everything is @private

		/**
		 * Get an appropriate handler for x, without checking for cycles
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandler(x) {
			if(isPromise(x)) {
				return x._handler.join();
			}
			return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
		}

		/**
		 * Get a handler for thenable x.
		 * NOTE: You must only call this if maybeThenable(x) == true
		 * @param {object|function|Promise} x
		 * @returns {object} handler
		 */
		function getHandlerMaybeThenable(x) {
			return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
		}

		/**
		 * Get a handler for potentially untrusted thenable x
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandlerUntrusted(x) {
			try {
				var untrustedThen = x.then;
				return typeof untrustedThen === 'function'
					? new Thenable(untrustedThen, x)
					: new Fulfilled(x);
			} catch(e) {
				return new Rejected(e);
			}
		}

		/**
		 * Handler for a promise that is pending forever
		 * @constructor
		 */
		function Handler() {}

		Handler.prototype.when
			= Handler.prototype.become
			= Handler.prototype.notify // deprecated
			= Handler.prototype.fail
			= Handler.prototype._unreport
			= Handler.prototype._report
			= noop;

		Handler.prototype._state = 0;

		Handler.prototype.state = function() {
			return this._state;
		};

		/**
		 * Recursively collapse handler chain to find the handler
		 * nearest to the fully resolved value.
		 * @returns {object} handler nearest the fully resolved value
		 */
		Handler.prototype.join = function() {
			var h = this;
			while(h.handler !== void 0) {
				h = h.handler;
			}
			return h;
		};

		Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
			this.when({
				resolver: to,
				receiver: receiver,
				fulfilled: fulfilled,
				rejected: rejected,
				progress: progress
			});
		};

		Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
			this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
		};

		Handler.prototype.fold = function(f, z, c, to) {
			this.when(new Fold(f, z, c, to));
		};

		/**
		 * Handler that invokes fail() on any handler it becomes
		 * @constructor
		 */
		function FailIfRejected() {}

		inherit(Handler, FailIfRejected);

		FailIfRejected.prototype.become = function(h) {
			h.fail();
		};

		var failIfRejected = new FailIfRejected();

		/**
		 * Handler that manages a queue of consumers waiting on a pending promise
		 * @constructor
		 */
		function Pending(receiver, inheritedContext) {
			Promise.createContext(this, inheritedContext);

			this.consumers = void 0;
			this.receiver = receiver;
			this.handler = void 0;
			this.resolved = false;
		}

		inherit(Handler, Pending);

		Pending.prototype._state = 0;

		Pending.prototype.resolve = function(x) {
			this.become(getHandler(x));
		};

		Pending.prototype.reject = function(x) {
			if(this.resolved) {
				return;
			}

			this.become(new Rejected(x));
		};

		Pending.prototype.join = function() {
			if (!this.resolved) {
				return this;
			}

			var h = this;

			while (h.handler !== void 0) {
				h = h.handler;
				if (h === this) {
					return this.handler = cycle();
				}
			}

			return h;
		};

		Pending.prototype.run = function() {
			var q = this.consumers;
			var handler = this.handler;
			this.handler = this.handler.join();
			this.consumers = void 0;

			for (var i = 0; i < q.length; ++i) {
				handler.when(q[i]);
			}
		};

		Pending.prototype.become = function(handler) {
			if(this.resolved) {
				return;
			}

			this.resolved = true;
			this.handler = handler;
			if(this.consumers !== void 0) {
				tasks.enqueue(this);
			}

			if(this.context !== void 0) {
				handler._report(this.context);
			}
		};

		Pending.prototype.when = function(continuation) {
			if(this.resolved) {
				tasks.enqueue(new ContinuationTask(continuation, this.handler));
			} else {
				if(this.consumers === void 0) {
					this.consumers = [continuation];
				} else {
					this.consumers.push(continuation);
				}
			}
		};

		/**
		 * @deprecated
		 */
		Pending.prototype.notify = function(x) {
			if(!this.resolved) {
				tasks.enqueue(new ProgressTask(x, this));
			}
		};

		Pending.prototype.fail = function(context) {
			var c = typeof context === 'undefined' ? this.context : context;
			this.resolved && this.handler.join().fail(c);
		};

		Pending.prototype._report = function(context) {
			this.resolved && this.handler.join()._report(context);
		};

		Pending.prototype._unreport = function() {
			this.resolved && this.handler.join()._unreport();
		};

		/**
		 * Wrap another handler and force it into a future stack
		 * @param {object} handler
		 * @constructor
		 */
		function Async(handler) {
			this.handler = handler;
		}

		inherit(Handler, Async);

		Async.prototype.when = function(continuation) {
			tasks.enqueue(new ContinuationTask(continuation, this));
		};

		Async.prototype._report = function(context) {
			this.join()._report(context);
		};

		Async.prototype._unreport = function() {
			this.join()._unreport();
		};

		/**
		 * Handler that wraps an untrusted thenable and assimilates it in a future stack
		 * @param {function} then
		 * @param {{then: function}} thenable
		 * @constructor
		 */
		function Thenable(then, thenable) {
			Pending.call(this);
			tasks.enqueue(new AssimilateTask(then, thenable, this));
		}

		inherit(Pending, Thenable);

		/**
		 * Handler for a fulfilled promise
		 * @param {*} x fulfillment value
		 * @constructor
		 */
		function Fulfilled(x) {
			Promise.createContext(this);
			this.value = x;
		}

		inherit(Handler, Fulfilled);

		Fulfilled.prototype._state = 1;

		Fulfilled.prototype.fold = function(f, z, c, to) {
			runContinuation3(f, z, this, c, to);
		};

		Fulfilled.prototype.when = function(cont) {
			runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
		};

		var errorId = 0;

		/**
		 * Handler for a rejected promise
		 * @param {*} x rejection reason
		 * @constructor
		 */
		function Rejected(x) {
			Promise.createContext(this);

			this.id = ++errorId;
			this.value = x;
			this.handled = false;
			this.reported = false;

			this._report();
		}

		inherit(Handler, Rejected);

		Rejected.prototype._state = -1;

		Rejected.prototype.fold = function(f, z, c, to) {
			to.become(this);
		};

		Rejected.prototype.when = function(cont) {
			if(typeof cont.rejected === 'function') {
				this._unreport();
			}
			runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
		};

		Rejected.prototype._report = function(context) {
			tasks.afterQueue(new ReportTask(this, context));
		};

		Rejected.prototype._unreport = function() {
			if(this.handled) {
				return;
			}
			this.handled = true;
			tasks.afterQueue(new UnreportTask(this));
		};

		Rejected.prototype.fail = function(context) {
			this.reported = true;
			emitRejection('unhandledRejection', this);
			Promise.onFatalRejection(this, context === void 0 ? this.context : context);
		};

		function ReportTask(rejection, context) {
			this.rejection = rejection;
			this.context = context;
		}

		ReportTask.prototype.run = function() {
			if(!this.rejection.handled && !this.rejection.reported) {
				this.rejection.reported = true;
				emitRejection('unhandledRejection', this.rejection) ||
					Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
			}
		};

		function UnreportTask(rejection) {
			this.rejection = rejection;
		}

		UnreportTask.prototype.run = function() {
			if(this.rejection.reported) {
				emitRejection('rejectionHandled', this.rejection) ||
					Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
			}
		};

		// Unhandled rejection hooks
		// By default, everything is a noop

		Promise.createContext
			= Promise.enterContext
			= Promise.exitContext
			= Promise.onPotentiallyUnhandledRejection
			= Promise.onPotentiallyUnhandledRejectionHandled
			= Promise.onFatalRejection
			= noop;

		// Errors and singletons

		var foreverPendingHandler = new Handler();
		var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

		function cycle() {
			return new Rejected(new TypeError('Promise cycle'));
		}

		// Task runners

		/**
		 * Run a single consumer
		 * @constructor
		 */
		function ContinuationTask(continuation, handler) {
			this.continuation = continuation;
			this.handler = handler;
		}

		ContinuationTask.prototype.run = function() {
			this.handler.join().when(this.continuation);
		};

		/**
		 * Run a queue of progress handlers
		 * @constructor
		 */
		function ProgressTask(value, handler) {
			this.handler = handler;
			this.value = value;
		}

		ProgressTask.prototype.run = function() {
			var q = this.handler.consumers;
			if(q === void 0) {
				return;
			}

			for (var c, i = 0; i < q.length; ++i) {
				c = q[i];
				runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
			}
		};

		/**
		 * Assimilate a thenable, sending it's value to resolver
		 * @param {function} then
		 * @param {object|function} thenable
		 * @param {object} resolver
		 * @constructor
		 */
		function AssimilateTask(then, thenable, resolver) {
			this._then = then;
			this.thenable = thenable;
			this.resolver = resolver;
		}

		AssimilateTask.prototype.run = function() {
			var h = this.resolver;
			tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

			function _resolve(x) { h.resolve(x); }
			function _reject(x)  { h.reject(x); }
			function _notify(x)  { h.notify(x); }
		};

		function tryAssimilate(then, thenable, resolve, reject, notify) {
			try {
				then.call(thenable, resolve, reject, notify);
			} catch (e) {
				reject(e);
			}
		}

		/**
		 * Fold a handler value with z
		 * @constructor
		 */
		function Fold(f, z, c, to) {
			this.f = f; this.z = z; this.c = c; this.to = to;
			this.resolver = failIfRejected;
			this.receiver = this;
		}

		Fold.prototype.fulfilled = function(x) {
			this.f.call(this.c, this.z, x, this.to);
		};

		Fold.prototype.rejected = function(x) {
			this.to.reject(x);
		};

		Fold.prototype.progress = function(x) {
			this.to.notify(x);
		};

		// Other helpers

		/**
		 * @param {*} x
		 * @returns {boolean} true iff x is a trusted Promise
		 */
		function isPromise(x) {
			return x instanceof Promise;
		}

		/**
		 * Test just enough to rule out primitives, in order to take faster
		 * paths in some code
		 * @param {*} x
		 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
		 */
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}

		function runContinuation1(f, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject(f, h.value, receiver, next);
			Promise.exitContext();
		}

		function runContinuation3(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject3(f, x, h.value, receiver, next);
			Promise.exitContext();
		}

		/**
		 * @deprecated
		 */
		function runNotify(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.notify(x);
			}

			Promise.enterContext(h);
			tryCatchReturn(f, x, receiver, next);
			Promise.exitContext();
		}

		function tryCatch2(f, a, b) {
			try {
				return f(a, b);
			} catch(e) {
				return reject(e);
			}
		}

		/**
		 * Return f.call(thisArg, x), or if it throws return a rejected promise for
		 * the thrown exception
		 */
		function tryCatchReject(f, x, thisArg, next) {
			try {
				next.become(getHandler(f.call(thisArg, x)));
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * Same as above, but includes the extra argument parameter.
		 */
		function tryCatchReject3(f, x, y, thisArg, next) {
			try {
				f.call(thisArg, x, y, next);
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * @deprecated
		 * Return f.call(thisArg, x), or if it throws, *return* the exception
		 */
		function tryCatchReturn(f, x, thisArg, next) {
			try {
				next.notify(f.call(thisArg, x));
			} catch(e) {
				next.notify(e);
			}
		}

		function inherit(Parent, Child) {
			Child.prototype = objectCreate(Parent.prototype);
			Child.prototype.constructor = Child;
		}

		function snd(x, y) {
			return y;
		}

		function noop() {}

		function initEmitRejection() {
			/*global process, self, CustomEvent*/
			if(typeof process !== 'undefined' && process !== null
				&& typeof process.emit === 'function') {
				// Returning falsy here means to call the default
				// onPotentiallyUnhandledRejection API.  This is safe even in
				// browserify since process.emit always returns falsy in browserify:
				// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
				return function(type, rejection) {
					return type === 'unhandledRejection'
						? process.emit(type, rejection.value, rejection)
						: process.emit(type, rejection);
				};
			} else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {
				return (function(noop, self, CustomEvent) {
					var hasCustomEvent = false;
					try {
						var ev = new CustomEvent('unhandledRejection');
						hasCustomEvent = ev instanceof CustomEvent;
					} catch (e) {}

					return !hasCustomEvent ? noop : function(type, rejection) {
						var ev = new CustomEvent(type, {
							detail: {
								reason: rejection.value,
								key: rejection
							},
							bubbles: false,
							cancelable: true
						});

						return !self.dispatchEvent(ev);
					};
				}(noop, self, CustomEvent));
			}

			return noop;
		}

		return Promise;
	};
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

}).call(this,require('_process'))
},{"_process":5}],30:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return {
		pending: toPendingState,
		fulfilled: toFulfilledState,
		rejected: toRejectedState,
		inspect: inspect
	};

	function toPendingState() {
		return { state: 'pending' };
	}

	function toRejectedState(e) {
		return { state: 'rejected', reason: e };
	}

	function toFulfilledState(x) {
		return { state: 'fulfilled', value: x };
	}

	function inspect(handler) {
		var state = handler.state();
		return state === 0 ? toPendingState()
			 : state > 0   ? toFulfilledState(handler.value)
			               : toRejectedState(handler.value);
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],31:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */

/**
 * Promises/A+ and when() implementation
 * when is part of the cujoJS family of libraries (http://cujojs.com/)
 * @author Brian Cavalier
 * @author John Hann
 * @version 3.7.2
 */
(function(define) { 'use strict';
define(function (require) {

	var timed = require('./lib/decorators/timed');
	var array = require('./lib/decorators/array');
	var flow = require('./lib/decorators/flow');
	var fold = require('./lib/decorators/fold');
	var inspect = require('./lib/decorators/inspect');
	var generate = require('./lib/decorators/iterate');
	var progress = require('./lib/decorators/progress');
	var withThis = require('./lib/decorators/with');
	var unhandledRejection = require('./lib/decorators/unhandledRejection');
	var TimeoutError = require('./lib/TimeoutError');

	var Promise = [array, flow, fold, generate, progress,
		inspect, withThis, timed, unhandledRejection]
		.reduce(function(Promise, feature) {
			return feature(Promise);
		}, require('./lib/Promise'));

	var apply = require('./lib/apply')(Promise);

	// Public API

	when.promise     = promise;              // Create a pending promise
	when.resolve     = Promise.resolve;      // Create a resolved promise
	when.reject      = Promise.reject;       // Create a rejected promise

	when.lift        = lift;                 // lift a function to return promises
	when['try']      = attempt;              // call a function and return a promise
	when.attempt     = attempt;              // alias for when.try

	when.iterate     = Promise.iterate;      // DEPRECATED (use cujojs/most streams) Generate a stream of promises
	when.unfold      = Promise.unfold;       // DEPRECATED (use cujojs/most streams) Generate a stream of promises

	when.join        = join;                 // Join 2 or more promises

	when.all         = all;                  // Resolve a list of promises
	when.settle      = settle;               // Settle a list of promises

	when.any         = lift(Promise.any);    // One-winner race
	when.some        = lift(Promise.some);   // Multi-winner race
	when.race        = lift(Promise.race);   // First-to-settle race

	when.map         = map;                  // Array.map() for promises
	when.filter      = filter;               // Array.filter() for promises
	when.reduce      = lift(Promise.reduce);       // Array.reduce() for promises
	when.reduceRight = lift(Promise.reduceRight);  // Array.reduceRight() for promises

	when.isPromiseLike = isPromiseLike;      // Is something promise-like, aka thenable

	when.Promise     = Promise;              // Promise constructor
	when.defer       = defer;                // Create a {promise, resolve, reject} tuple

	// Error types

	when.TimeoutError = TimeoutError;

	/**
	 * Get a trusted promise for x, or by transforming x with onFulfilled
	 *
	 * @param {*} x
	 * @param {function?} onFulfilled callback to be called when x is
	 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
	 *   will be invoked immediately.
	 * @param {function?} onRejected callback to be called when x is
	 *   rejected.
	 * @param {function?} onProgress callback to be called when progress updates
	 *   are issued for x. @deprecated
	 * @returns {Promise} a new promise that will fulfill with the return
	 *   value of callback or errback or the completion value of promiseOrValue if
	 *   callback and/or errback is not supplied.
	 */
	function when(x, onFulfilled, onRejected, onProgress) {
		var p = Promise.resolve(x);
		if (arguments.length < 2) {
			return p;
		}

		return p.then(onFulfilled, onRejected, onProgress);
	}

	/**
	 * Creates a new promise whose fate is determined by resolver.
	 * @param {function} resolver function(resolve, reject, notify)
	 * @returns {Promise} promise whose fate is determine by resolver
	 */
	function promise(resolver) {
		return new Promise(resolver);
	}

	/**
	 * Lift the supplied function, creating a version of f that returns
	 * promises, and accepts promises as arguments.
	 * @param {function} f
	 * @returns {Function} version of f that returns promises
	 */
	function lift(f) {
		return function() {
			for(var i=0, l=arguments.length, a=new Array(l); i<l; ++i) {
				a[i] = arguments[i];
			}
			return apply(f, this, a);
		};
	}

	/**
	 * Call f in a future turn, with the supplied args, and return a promise
	 * for the result.
	 * @param {function} f
	 * @returns {Promise}
	 */
	function attempt(f /*, args... */) {
		/*jshint validthis:true */
		for(var i=0, l=arguments.length-1, a=new Array(l); i<l; ++i) {
			a[i] = arguments[i+1];
		}
		return apply(f, this, a);
	}

	/**
	 * Creates a {promise, resolver} pair, either or both of which
	 * may be given out safely to consumers.
	 * @return {{promise: Promise, resolve: function, reject: function, notify: function}}
	 */
	function defer() {
		return new Deferred();
	}

	function Deferred() {
		var p = Promise._defer();

		function resolve(x) { p._handler.resolve(x); }
		function reject(x) { p._handler.reject(x); }
		function notify(x) { p._handler.notify(x); }

		this.promise = p;
		this.resolve = resolve;
		this.reject = reject;
		this.notify = notify;
		this.resolver = { resolve: resolve, reject: reject, notify: notify };
	}

	/**
	 * Determines if x is promise-like, i.e. a thenable object
	 * NOTE: Will return true for *any thenable object*, and isn't truly
	 * safe, since it may attempt to access the `then` property of x (i.e.
	 *  clever/malicious getters may do weird things)
	 * @param {*} x anything
	 * @returns {boolean} true if x is promise-like
	 */
	function isPromiseLike(x) {
		return x && typeof x.then === 'function';
	}

	/**
	 * Return a promise that will resolve only once all the supplied arguments
	 * have resolved. The resolution value of the returned promise will be an array
	 * containing the resolution values of each of the arguments.
	 * @param {...*} arguments may be a mix of promises and values
	 * @returns {Promise}
	 */
	function join(/* ...promises */) {
		return Promise.all(arguments);
	}

	/**
	 * Return a promise that will fulfill once all input promises have
	 * fulfilled, or reject when any one input promise rejects.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise}
	 */
	function all(promises) {
		return when(promises, Promise.all);
	}

	/**
	 * Return a promise that will always fulfill with an array containing
	 * the outcome states of all input promises.  The returned promise
	 * will only reject if `promises` itself is a rejected promise.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise} promise for array of settled state descriptors
	 */
	function settle(promises) {
		return when(promises, Promise.settle);
	}

	/**
	 * Promise-aware array map function, similar to `Array.prototype.map()`,
	 * but input array may contain promises or values.
	 * @param {Array|Promise} promises array of anything, may contain promises and values
	 * @param {function(x:*, index:Number):*} mapFunc map function which may
	 *  return a promise or value
	 * @returns {Promise} promise that will fulfill with an array of mapped values
	 *  or reject if any input promise rejects.
	 */
	function map(promises, mapFunc) {
		return when(promises, function(promises) {
			return Promise.map(promises, mapFunc);
		});
	}

	/**
	 * Filter the provided array of promises using the provided predicate.  Input may
	 * contain promises and values
	 * @param {Array|Promise} promises array of promises and values
	 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
	 *  Must return truthy (or promise for truthy) for items to retain.
	 * @returns {Promise} promise that will fulfill with an array containing all items
	 *  for which predicate returned truthy.
	 */
	function filter(promises, predicate) {
		return when(promises, function(promises) {
			return Promise.filter(promises, predicate);
		});
	}

	return when;
});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });

},{"./lib/Promise":14,"./lib/TimeoutError":16,"./lib/apply":17,"./lib/decorators/array":18,"./lib/decorators/flow":19,"./lib/decorators/fold":20,"./lib/decorators/inspect":21,"./lib/decorators/iterate":22,"./lib/decorators/progress":23,"./lib/decorators/timed":24,"./lib/decorators/unhandledRejection":25,"./lib/decorators/with":26}]},{},[1]);
