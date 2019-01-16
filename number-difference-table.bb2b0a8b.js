parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"cKoJ":[function(require,module,exports) {

},{}],"lH+g":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e={theSequence:[],getSequence:function(e){return this.reset(),this.calculateSequence(e),this.returnTheSequence()},calculateSequence:function(e){for(var t=[],n=e.length,u=0;u<n-1;u++){var c=this.calculateDifference(e[u],e[u+1]);t.push(c)}this.theSequence.push(t),!0!==this.isIdentical(t)&&this.calculateSequence(t)},calculateDifference:function(e,t){return t-e},reset:function(){this.theSequence=[]},isIdentical:function(e){for(var t=0;t<e.length-1;t++)if(e[t]!==e[t+1])return!1;return!0},isEven:function(e){return e%2==0},returnTheSequence:function(){return this.theSequence}},t=e;exports.default=t;
},{}],"zdNP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e={solve:function(e,t){var n=this.isDivergent(t[t.length-1]),r=this.solveTheDifferences(t);return{isDivergent:n,solvedDifferences:r,solvedSequenceValue:this.solveTheOriginal(e[e.length-1],r[r.length-1])}},solveTheDifferences:function(e){for(var t=[],n=0,r=e.length;r>0;r--){var i=0===e[r-1].length?e[r-1]:e[r-1][e[r-1].length-1];t.push(i+n),n=i}return t},solveTheOriginal:function(e,t){return e+t},isDivergent:function(e){var t=e[0];return 1===t||t<0}},t=e;exports.default=t;
},{}],"OSwK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("tachyons");var e=n(require("./calculations")),t=n(require("./solveSequence"));function n(e){return e&&e.__esModule?e:{default:e}}function i(e){return c(e)||a(e)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function c(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var l={container:null,originalSequence:[],theDifferences:[],selectMin:3,selectMax:20,inputWidth:120,inputHeight:60,gap:30,btnBaseStyle:"pa3 mr2 sans-serif dark-gray ba bw2 bg-transparent bg-animate pointer outline-0",init:function(e){e&&(this.container=e,this.container.innerHTML="",this.generateSelect())},resetApp:function(){e.default.reset(),this.originalSequence=[],this.theDifferences=[],this.clearApp(),this.generateSelect()},clearApp:function(){this.container.innerHTML=""},generateSelect:function(){var e=document.createDocumentFragment(),t=document.createElement("select"),n=document.createElement("p"),i=document.createElement("option");i.value="-1",i.innerHTML="Select",t.className="ml3 pa2 outline-0",t.appendChild(i);for(var r=this.selectMin;r<=this.selectMax;r++){var a=document.createElement("option");a.value=r,a.innerHTML=r,t.appendChild(a)}n.className="ma0 sans-serif",n.innerHTML="Select sequence length (max ".concat(this.selectMax,")"),n.appendChild(t),t.addEventListener("change",this.selectHandler.bind(this)),e.appendChild(n),this.container.appendChild(e)},selectHandler:function(e){var t=Number(e.target.value);!0!==Number.isNaN(t)?(this.clearApp(),this.generateScrollContainer(),this.generateInputs(t)):console.error("Value is not a number")},generateScrollContainer:function(){var e=document.createElement("div");e.id="theScroller",e.className="overflow-x-auto overflow-y-hidden",this.container.appendChild(e)},generateInputs:function(e){var t=document.createElement("p"),n=document.createElement("div"),i=document.createDocumentFragment(),r=this.inputWidth*e+this.gap*(e-1);t.className="ma0 mb3 f3 lh-title sans-serif",t.innerHTML="Please enter sequence into inputs below:",n.id="theSequence",n.className="overflow-hidden",n.style="width: ".concat(r,"px; margin: 0 auto 0.5rem");for(var a=1;a<=e;a++){var c=document.createElement("input"),l=a===e?0:this.gap;c.name="number-".concat(a),c.className="ph2 tc sans-serif dark-gray bn bg-light-yellow outline-0",c.style="width: ".concat(this.inputWidth,"px; height: ").concat(this.inputHeight,"px; margin-right: ").concat(l,"px"),i.appendChild(c)}n.appendChild(t),n.appendChild(i),this.generateActions(),document.getElementById("theScroller").appendChild(n)},generateActions:function(){var e=document.createElement("div"),t=document.createDocumentFragment(),n=this.generateCalculateBtn(),i=this.generateSolveBtn(),r=this.generateResetBtn();e.id="theActions",e.className="pb4 mb4 flex bb bw2 b--black-20",t.appendChild(n),t.appendChild(i),t.appendChild(r),e.appendChild(t),this.container.insertBefore(e,this.container.firstChild)},generateCalculateBtn:function(){var e=document.createElement("button");return e.id="calculateSequence",e.className="".concat(this.btnBaseStyle," b--light-green hover-bg-light-green"),e.innerHTML="Calculate differences",e.addEventListener("click",this.calculateHandler.bind(this)),e},calculateHandler:function(){var t=i(document.querySelectorAll("#theSequence input")),n=t.filter(function(e){return""===e.value}),r=t.filter(function(e){return!1===Number.isInteger(Number(e.value))});if(n.length>0||r.length>0)console.error("Empty inputs or not numbers");else{var a=t.map(function(e){return Number(e.value)});this.originalSequence=a,null!==document.getElementById("theDifferences")&&document.getElementById("theDifferences").remove(),this.generateDifferences(e.default.getSequence(a))}},generateSolveBtn:function(){var e=document.createElement("button");return e.id="solveSequence",e.className="".concat(this.btnBaseStyle," b--light-blue hover-bg-light-blue"),e.innerHTML="Solve sequence",e.addEventListener("click",this.solveHandler.bind(this)),e},solveHandler:function(){if(0!==this.originalSequence.length||0!==this.theDifferences.length){var e=t.default.solve(this.originalSequence,this.theDifferences);this.generateSolution(e)}else console.error("Nothing to solve")},generateSolution:function(e){var t=e.isDivergent?"bg-red":"bg-green",n=document.createElement("div");n.className="dit ph2 tc sans-serif ".concat(t),n.style="width: ".concat(this.inputWidth,"; margin-left: ").concat(this.gap,"; line-height: ").concat(this.inputHeight,"px;"),n.innerHTML=e.solvedSequenceValue;var i=document.getElementById("theSequence"),r=i.offsetWidth+(this.gap+this.inputWidth);i.style="width: ".concat(r,"px; margin: 0 auto 0.5rem"),i.appendChild(n)},generateResetBtn:function(){var e=document.createElement("button");return e.id="resetSequence",e.className="".concat(this.btnBaseStyle," b--light-red hover-bg-light-red"),e.innerHTML="Reset",e.addEventListener("click",this.resetApp.bind(this)),e},generateDifferences:function(e){this.theDifferences=e;var t=document.createElement("div"),n=document.createDocumentFragment(),i=e.length;t.id="theDifferences",t.className="flex flex-column items-center";for(var r=0;r<i;r++){var a=e[r],c=document.createElement("div"),l=this.inputWidth*a.length+this.gap*(a.length-1);c.id="rows-".concat(r),c.className="mb2 overflow-hidden",c.style="width: ".concat(l,"px;"),c.appendChild(this.generateRow(a)),n.appendChild(c)}t.appendChild(n),document.getElementById("theScroller").appendChild(t)},generateRow:function(e){for(var t=e.length,n=document.createDocumentFragment(),i=0;i<t;i++){var r=document.createElement("div"),a=i===t-1?0:this.gap;r.className="dit ph2 tc sans-serif bg-light-gray",r.style="width: ".concat(this.inputWidth,"px; height: ").concat(this.inputHeight,"px; margin-right: ").concat(a,"px; line-height: ").concat(this.inputHeight,"px;"),r.innerHTML=e[i],n.appendChild(r)}return n}},s=l;exports.default=s;
},{"tachyons":"cKoJ","./calculations":"lH+g","./solveSequence":"zdNP"}],"Focm":[function(require,module,exports) {
"use strict";var e=t(require("./src/numberDifferenceTableUI.js"));function t(e){return e&&e.__esModule?e:{default:e}}e.default.init(document.getElementById("app"));
},{"./src/numberDifferenceTableUI.js":"OSwK"}]},{},["Focm"], null)