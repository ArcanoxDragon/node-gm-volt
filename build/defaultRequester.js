"use strict";var __assign=this&&this.__assign||Object.assign||function(t){for(var e,r=1,s=arguments.length;r<s;r++){e=arguments[r];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};exports.__esModule=!0;var req=require("request-promise-native"),DefaultRequester=function(){function t(){this.jar=req.jar(),this.req=req.defaults({jar:this.jar})}return t.prototype.setDefaultOptions=function(t){this.req=req.defaults(__assign({jar:this.jar},t))},t.prototype.get=function(t,e){return this.req.get(t,e)},t.prototype.postForm=function(t,e,r){return this.req.post(t,__assign({form:e},r))},t.prototype.getCookie=function(t,e){var r=this.jar.getCookies(t),s=r.find(function(t){return t.key.toLowerCase()===e.toLowerCase()});return s?s.value:null},t}();exports.DefaultRequester=DefaultRequester;