!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.WebIDL2=t():e.WebIDL2=t()}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t,n,r,s){function a(n){return n>0?e.slice(t,t+n):e.slice(Math.max(t+n,0),t)}function i(n,{precedes:r}={}){const s=n.map(e=>e.trivia+e.value).join(""),a=e[t];return"eof"===a.type?s:r?s+a.trivia:s.slice(a.trivia.length)}const o="eof"!==e[t].type?e[t].line:e.length>1?e[t-1].line:1,u=function(e){const t=e.split("\n");return t[t.length-1]}(i(a(-5),{precedes:!0})),c=a(5),l=i(c),p=u+l.split("\n")[0]+"\n"+(" ".repeat(u.length)+"^ "+r);return{message:`${s} error at line ${o}${n?`, ${"Syntax"===s?"since":"inside"} \`${n.partial?"partial ":""}${n.type} ${n.name}\``:""}:\n${p}`,line:o,input:l,tokens:c}}function s(e,t,n,s){return r(e,t.index,n,s,"Validation").message}n.r(t);const a={decimal:/-?(?=[0-9]*\.|[0-9]+[eE])(([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)([Ee][-+]?[0-9]+)?|[0-9]+[Ee][-+]?[0-9]+)/y,integer:/-?(0([Xx][0-9A-Fa-f]+|[0-7]*)|[1-9][0-9]*)/y,identifier:/[_-]?[A-Za-z][0-9A-Z_a-z-]*/y,string:/"[^"]*"/y,whitespace:/[\t\n\r ]+/y,comment:/((\/(\/.*|\*([^*]|\*[^\/])*\*\/)[\t\n\r ]*)+)/y,other:/[^\t\n\r 0-9A-Za-z]/y},i=["ByteString","DOMString","USVString"],o=["attribute","callback","const","deleter","dictionary","enum","getter","includes","inherit","interface","iterable","maplike","namespace","partial","required","setlike","setter","static","stringifier","typedef","unrestricted"],u=["-Infinity","FrozenArray","Infinity","NaN","Promise","boolean","byte","double","false","float","implements","legacyiterable","long","mixin","null","octet","optional","or","readonly","record","sequence","short","true","unsigned","void"].concat(o,i),c=["(",")",",","...",":",";","<","=",">","?","[","]","{","}"];class l{constructor(e){this.source=function(e){const t=[];let n=0,r="",s=1,i=0;for(;n<e.length;){const a=e.charAt(n);let l=-1;if(/[\t\n\r ]/.test(a)?l=o("whitespace",{noFlushTrivia:!0}):"/"===a&&(l=o("comment",{noFlushTrivia:!0})),-1!==l){const e=t.pop().value;s+=(e.match(/\n/g)||[]).length,r+=e,i-=1}else if(/[-0-9.A-Z_a-z]/.test(a)){if(-1===(l=o("decimal"))&&(l=o("integer")),-1===l){l=o("identifier");const e=t[t.length-1];-1!==l&&u.includes(e.value)&&(e.type=e.value)}}else'"'===a&&(l=o("string"));for(const a of c)if(e.startsWith(a,n)){t.push({type:a,value:a,trivia:r,line:s,index:i}),r="",l=n+=a.length;break}if(-1===l&&(l=o("other")),-1===l)throw new Error("Token stream not progressing");n=l,i+=1}return t.push({type:"eof",value:"",trivia:r}),t;function o(o,{noFlushTrivia:u}={}){const c=a[o];c.lastIndex=n;const l=c.exec(e);return l?(t.push({type:o,value:l[0],trivia:r,line:s,index:i}),u||(r=""),c.lastIndex):-1}}(e),this.position=0}error(e,t){throw new p(function(e,t,n,s){return r(e,t,n,s,"Syntax")}(this.source,this.position,e,t))}probe(e){return this.source.length>this.position&&this.source[this.position].type===e}consume(...e){for(const t of e){if(!this.probe(t))continue;const e=this.source[this.position];return this.position++,e}}unconsume(e){this.position=e}}class p extends Error{constructor({message:e,line:t,input:n,tokens:r}){super(e),this.name="WebIDLParseError",this.line=t,this.input=n,this.tokens=r}}class d{constructor({source:e,tokens:t}){Object.defineProperties(this,{source:{value:e},tokens:{value:t}})}toJSON(){const e={type:void 0,name:void 0};let t=this;for(;t!==Object.prototype;){const n=Object.getOwnPropertyDescriptors(t);for(const[t,r]of Object.entries(n))(r.enumerable||r.get)&&(e[t]=this[t]);t=Object.getPrototypeOf(t)}return e}}class f extends d{static parser(e,t){return()=>{const n=e.consume(t);if(n)return new f({source:e.source,tokens:{value:n}})}}get value(){return this.tokens.value.value}}function m(e){return e.startsWith("_")?e.slice(1):e}function y(e,{parser:t,allowDangler:n,listName:r="list"}){const s=t();if(!s)return[];s.tokens.separator=e.consume(",");const a=[s];for(;s.tokens.separator;){const s=t(e);if(!s){n||error(`Trailing comma in ${r}`);break}if(s.tokens.separator=e.consume(","),a.push(s),!s.tokens.separator)break}return a}function k(e){return e.consume("true","false","Infinity","-Infinity","NaN","decimal","integer")}function b({type:e,value:t}){switch(e){case"true":case"false":return{type:"boolean",value:"true"===e};case"Infinity":case"-Infinity":return{type:"Infinity",negative:e.startsWith("-")};case"[":return{type:"sequence",value:[]};case"decimal":case"integer":return{type:"number",value:t};case"string":return{type:"string",value:t.slice(1,-1)};default:return{type:e}}}class g extends d{static parse(e){const t=e.consume("identifier");if(!t)return;const n={target:t};if(n.includes=e.consume("includes"),n.includes)return n.mixin=e.consume("identifier")||e.error("Incomplete includes statement"),n.termination=e.consume(";")||e.error("No terminating ; for includes statement"),new g({source:e.source,tokens:n});e.unconsume(t.index)}get type(){return"includes"}get target(){return m(this.tokens.target.value)}get includes(){return m(this.tokens.mixin.value)}}class h extends d{static parse(e){const t=e.consume("=");if(!t)return null;const n=k(e)||e.consume("string","null","[")||e.error("No value for default"),r=[n];if("["===n.type){const t=e.consume("]")||error("Default sequence value must be empty");r.push(t)}return new h({source:e.source,tokens:{assign:t},expression:r})}constructor({source:e,tokens:t,expression:n}){super({source:e,tokens:t}),Object.defineProperty(this,"expression",{value:n})}get type(){return b(this.expression[0]).type}get value(){return b(this.expression[0]).value}get negative(){return b(this.expression[0]).negative}}function v(e){const t=e.source;let n=null;const r="decimal",s="integer",a="identifier",u="string";function c(t){e.error(n,t)}function l(t){return e.probe(t)}function p(...t){return e.consume(...t)}function v(t){return e.unconsume(t)}function x(){const e=function(){const e=p("unsigned"),n=p("short","long");if(n){const r=p("long");return new T({source:t,tokens:{prefix:e,base:n,postfix:r}})}e&&c("Failed to parse integer type")}()||function(){const e=p("unrestricted"),n=p("float","double");if(n)return new T({source:t,tokens:{prefix:e,base:n}});e&&c("Failed to parse float type")}();if(e)return e;const n=p("boolean","byte","octet");return n?new T({source:t,tokens:{base:n}}):void 0}function w(e){const t=p("?");t&&(e.tokens.nullable=t),l("?")&&c("Can't nullable more than once")}class T extends d{constructor({source:e,tokens:t}){super({source:e,tokens:t}),Object.defineProperty(this,"subtype",{value:[]}),this.extAttrs=null}get generic(){return""}get nullable(){return!!this.tokens.nullable}get union(){return!1}get idlType(){if(this.subtype.length)return this.subtype;return m([this.tokens.prefix,this.tokens.base,this.tokens.postfix].filter(e=>e).map(e=>e.value).join(" "))}}class N extends T{static parse(e){const n=p("FrozenArray","Promise","sequence","record");if(!n)return;const r=new N({source:t,tokens:{base:n}});switch(r.tokens.open=p("<")||c(`No opening bracket after ${n.type}`),n.type){case"Promise":{l("[")&&c("Promise type cannot have extended attribute");const t=F(e)||c("Missing Promise subtype");r.subtype.push(t);break}case"sequence":case"FrozenArray":{const t=j(e)||c(`Missing ${n.type} subtype`);r.subtype.push(t);break}case"record":{l("[")&&c("Record key cannot have extended attribute");const n=p(...i)||c(`Record key must be one of: ${i.join(", ")}`),s=new T({source:t,tokens:{base:n}});s.tokens.separator=p(",")||c("Missing comma after record key type"),s.type=e;const a=j(e)||c("Error parsing generic type record");r.subtype.push(s,a);break}}return r.idlType||c(`Error parsing generic type ${n.type}`),r.tokens.close=p(">")||c(`Missing closing bracket after ${n.type}`),r}get generic(){return this.tokens.base.value}}class A extends T{static parse(e){const n={};if(n.open=p("("),!n.open)return;const r=new A({source:t,tokens:n});for(r.type=e||null;;){const e=j()||c("No type after open parenthesis or 'or' in union type");"any"===e.idlType&&c("Type `any` cannot be included in a union type"),r.subtype.push(e);const t=p("or");if(!t)break;e.tokens.separator=t}return r.idlType.length<2&&c("At least two types are expected in a union type but found less"),n.close=p(")")||c("Unterminated union type"),w(r),r}get union(){return!0}}function $(e){return function(e){let n=N.parse(e)||x();if(!n){const e=p(a,...i);if(!e)return;n=new T({source:t,tokens:{base:e}}),l("<")&&c(`Unsupported generic type ${e.value}`)}return"Promise"===n.generic&&l("?")&&c("Promise type cannot be nullable"),n.type=e||null,w(n),n.nullable&&"any"===n.idlType&&c("Type `any` cannot be made nullable"),n}(e)||A.parse(e)}function j(e){const t=U.parse(),n=$(e);return n&&(n.extAttrs=t),n}class M extends d{static parse(){const n=e.position,r={},s=new M({source:t,tokens:r});return r.optional=p("optional"),s.idlType=j("argument-type"),s.idlType?(r.optional||(r.variadic=p("...")),r.name=p(a,...o),r.name?(s.default=r.optional?h.parse(e):null,s):v(n)):v(n)}get optional(){return!!this.tokens.optional}get variadic(){return!!this.tokens.variadic}get name(){return m(this.tokens.name.value)}}function O(){return y(e,{parser:M.parse,listName:"arguments list"})}class P extends d{static parse(){const n={assign:p("=")},i=new P({source:t,tokens:n});return n.assign&&(n.secondaryName=p(a,r,s,u)),n.open=p("("),n.open?(i.list="identifier-list"===i.rhsType?function(){const t=y(e,{parser:f.parser(e,a),listName:"identifier list"});return t.length||c("Expected identifiers but none found"),t}():O(),n.close=p(")")||c("Unexpected token in extended attribute argument list")):i.hasRhs&&!n.secondaryName&&c("No right hand side to extended attribute assignment"),i}get rhsType(){return this.tokens.assign?this.tokens.secondaryName?this.tokens.secondaryName.type:"identifier-list":null}}class q extends d{static parse(){const e=p(a);if(e)return new q({tokens:{name:e},params:P.parse()})}constructor({source:e,tokens:t,params:n}){super({source:e,tokens:t}),Object.defineProperty(this,"params",{value:n})}get type(){return"extended-attribute"}get name(){return this.tokens.name.value}get rhs(){const{rhsType:e,tokens:t,list:n}=this.params;return e?{type:e,value:"identifier-list"===e?n:t.secondaryName.value}:null}get arguments(){const{rhsType:e,list:t}=this.params;return t&&"identifier-list"!==e?t:[]}}class U extends d{static parse(){const n={};if(n.open=p("["),!n.open)return null;const r=new U({source:t,tokens:n});return r.items=y(e,{parser:q.parse,listName:"extended attribute"}),n.close=p("]")||c("Unexpected form of extended attribute"),r.items.length||c("Found an empty extended attribute"),r}}class I extends d{static parse(){const n={};if(n.base=p("const"),!n.base)return;let r=x();if(!r){const e=p(a)||c("No type for const");r=new T({source:t,tokens:{base:e}})}l("?")&&c("Unexpected nullable constant type"),r.type="const-type",n.name=p(a)||c("No name for const"),n.assign=p("=")||c("No value assignment for const"),n.value=k(e)||c("No value for const"),n.termination=p(";")||c("Unterminated const");const s=new I({source:t,tokens:n});return s.idlType=r,s}get type(){return"const"}get name(){return m(this.tokens.name.value)}get value(){return b(this.tokens.value)}}class S extends d{static parse(e){const r={base:e},s=new S({source:t,tokens:r});return r.name=p(a)||c("No name for callback"),n=s,r.assign=p("=")||c("No assignment in callback"),s.idlType=F()||c("Missing return type"),r.open=p("(")||c("No arguments in callback"),s.arguments=O(),r.close=p(")")||c("Unterminated callback"),r.termination=p(";")||c("Unterminated callback"),s}get type(){return"callback"}get name(){return m(this.tokens.name.value)}}class E extends d{static parse({special:n,noInherit:r=!1,readonly:s=!1}={}){const i=e.position,o={special:n},u=new E({source:t,tokens:o});if(n||r||(o.special=p("inherit")),o.readonly=p("readonly"),s&&!o.readonly&&l("attribute")&&c("Attributes must be readonly in this context"),o.base=p("attribute"),o.base){switch(u.idlType=j("attribute-type")||c("No type in attribute"),u.idlType.generic){case"sequence":case"record":c(`Attributes cannot accept ${u.idlType.generic} types`)}return o.name=p(a,"required")||c("No name in attribute"),o.termination=p(";")||c("Unterminated attribute"),u}v(i)}get type(){return"attribute"}get special(){return this.tokens.special?this.tokens.special.value:""}get readonly(){return!!this.tokens.readonly}get name(){return m(this.tokens.name.value)}}function F(e){const n=$(e||"return-type");if(n)return n;const r=p("void");if(r){const e=new T({source:t,tokens:{base:r}});return e.type="return-type",e}}class _ extends d{static parse(){const e={},n=new _({source:t,tokens:e});return n.idlType=F()||c("Missing return type"),e.name=p(a),e.open=p("(")||c("Invalid operation"),n.arguments=O(),e.close=p(")")||c("Unterminated operation"),n}get name(){const{name:e}=this.tokens;return e?m(e.value):""}}class D extends d{static parse({special:e,regular:n}={}){const r={special:e},s=new D({source:t,tokens:r});return e&&"stringifier"===e.value&&(r.termination=p(";"),r.termination)?(s.body=null,s):(e||n||(r.special=p("getter","setter","deleter")),s.body=_.parse(),r.termination=p(";")||c("Unterminated attribute"),s)}get type(){return"operation"}get name(){return this.body&&this.body.name||""}get special(){return this.tokens.special?this.tokens.special.value:""}}function z(){const e=p("static");if(e)return E.parse({special:e})||D.parse({special:e})||c("No body in static member")}function R(){const e=p("stringifier");if(e)return E.parse({special:e})||D.parse({special:e})||c("Unterminated stringifier")}class W extends d{static parse(){const n=e.position,r={},s=new W({source:t,tokens:r});if(r.readonly=p("readonly"),r.base=r.readonly?p("maplike","setlike"):p("iterable","maplike","setlike"),!r.base)return void v(n);const{type:a}=s,i="maplike"===a,o=i||"iterable"===a;r.open=p("<")||c(`Error parsing ${a} declaration`);const u=j()||c(`Error parsing ${a} declaration`);return s.idlType=[u],o&&(u.tokens.separator=p(","),u.tokens.separator?s.idlType.push(j()):i&&c(`Missing second type argument in ${a} declaration`)),r.close=p(">")||c(`Unterminated ${a} declaration`),r.termination=p(";")||c(`Missing semicolon after ${a} declaration`),s}get type(){return this.tokens.base.value}get readonly(){return!!this.tokens.readonly}}class Z extends d{static parse(){const e=p(":");if(!e)return;const n=p(a)||c("No type in inheritance");return new Z({source:t,tokens:{colon:e,name:n}})}get name(){return m(this.tokens.name.value)}}class B extends d{static parse(e,{type:t,inheritable:r,allowedMembers:s}){const{tokens:i}=e;for(i.name=p(a)||c("No name for interface"),n=e,r&&(e.inheritance=Z.parse()||null),i.open=p("{")||c(`Bodyless ${t}`),e.members=[];;){if(i.close=p("}"),i.close)return i.termination=p(";")||c(`Missing semicolon after ${t}`),e;const n=U.parse();let r;for(const[e,...t]of s)if(r=e(...t))break;r||c("Unknown member"),r.extAttrs=n,e.members.push(r)}}get partial(){return!!this.tokens.partial}get name(){return m(this.tokens.name.value)}}class L extends B{static parse(e,{callback:n=null,partial:r=null}={}){const s={callback:n,partial:r,base:e};return B.parse(new L({source:t,tokens:s}),{type:"interface",inheritable:!r,allowedMembers:[[I.parse],[z],[R],[W.parse],[E.parse],[D.parse]]})}get type(){return this.tokens.callback?"callback interface":"interface"}}class V extends B{static parse(e,{partial:n}={}){const r={partial:n,base:e};if(r.mixin=p("mixin"),r.mixin)return B.parse(new V({source:t,tokens:r}),{type:"interface mixin",allowedMembers:[[I.parse],[R],[E.parse,{noInherit:!0}],[D.parse,{regular:!0}]]})}get type(){return"interface mixin"}}function C(e){const t=p("interface");if(t)return V.parse(t,e)||L.parse(t,e)||c("Interface has no proper body")}class J extends B{static parse({partial:e}={}){const n={partial:e};if(n.base=p("namespace"),n.base)return B.parse(new J({source:t,tokens:n}),{type:"namespace",allowedMembers:[[E.parse,{noInherit:!0,readonly:!0}],[D.parse,{regular:!0}]]})}get type(){return"namespace"}}class X extends B{static parse({partial:e}={}){const n={partial:e};if(n.base=p("dictionary"),n.base)return B.parse(new X({source:t,tokens:n}),{type:"dictionary",inheritable:!e,allowedMembers:[[G.parse]]})}get type(){return"dictionary"}}class G extends d{static parse(){const n={},r=new G({source:t,tokens:n});return r.extAttrs=U.parse(),n.required=p("required"),r.idlType=j("dictionary-type")||c("No type for dictionary member"),n.name=p(a)||c("No name for dictionary member"),r.default=h.parse(e),n.required&&r.default&&c("Required member must not have a default"),n.termination=p(";")||c("Unterminated dictionary member"),r}get type(){return"field"}get name(){return m(this.tokens.name.value)}get required(){return!!this.tokens.required}}class H extends d{static parse(){const r={};if(r.base=p("enum"),r.base)return r.name=p(a)||c("No name for enum"),n=new H({source:t,tokens:r}),r.open=p("{")||c("Bodyless enum"),n.values=y(e,{parser:K.parse,allowDangler:!0,listName:"enumeration"}),l(u)&&c("No comma between enum values"),r.close=p("}")||c("Unexpected value in enum"),n.values.length||c("No value in enum"),r.termination=p(";")||c("No semicolon after enum"),n}get type(){return"enum"}get name(){return m(this.tokens.name.value)}}class K extends f{static parse(){const e=p(u);if(e)return new K({source:t,tokens:{value:e}})}get type(){return"enum-value"}get value(){return super.value.slice(1,-1)}}class Q extends d{static parse(){const e={},r=new Q({source:t,tokens:e});if(e.base=p("typedef"),e.base)return r.idlType=j("typedef-type")||c("No type in typedef"),e.name=p(a)||c("No name in typedef"),n=r,e.termination=p(";")||c("Unterminated typedef"),r}get type(){return"typedef"}get name(){return m(this.tokens.name.value)}}function Y(){return function(){const e=p("callback");if(!e)return;const t=p("interface");return t?L.parse(t,{callback:e}):S.parse(e)}()||C()||function(){const e=p("partial");if(e)return X.parse({partial:e})||C({partial:e})||J.parse({partial:e})||c("Partial doesn't apply to anything")}()||X.parse()||H.parse()||Q.parse()||g.parse(e)||J.parse()}const ee=function(){if(!t.length)return[];const e=[];for(;;){const t=U.parse(),n=Y();if(!n){t&&c("Stray extended attributes");break}n.extAttrs=t,e.push(n)}return e.push(p("eof")),e}();return e.position<t.length&&c("Unrecognised tokens"),ee}function x(e){return v(new l(e))}function w(e){return e}const T={wrap:e=>e.join(""),trivia:w,name:w,reference:w,type:w,generic:w,inheritance:w,definition:w,extendedAttribute:w,extendedAttributeReference:w};function N(e,{templates:t=T}={}){function n(e,n){return t.reference(e,n||e)}function r(e,n=w,...r){if(!e)return"";const s=n(e.value,...r);return t.wrap([t.trivia(e.trivia),s])}function s(e,t){return r(e,n,t)}function a(e,n){return r(e,t.name,n)}function i(e){if(e.union||e.generic)return t.wrap([r(e.tokens.base,t.generic),r(e.tokens.open),...e.subtype.map(o),r(e.tokens.close)]);const s=e.tokens.prefix||e.tokens.base,a=e.tokens.prefix?[e.tokens.prefix.value,t.trivia(e.tokens.base.trivia)]:[],i=n(t.wrap([...a,e.tokens.base.value,r(e.tokens.postfix)]),e.idlType);return t.wrap([t.trivia(s.trivia),i])}function o(e){return t.wrap([d(e.extAttrs),i(e),r(e.tokens.nullable),r(e.tokens.separator)])}function u(e){return e?t.wrap([r(e.tokens.assign),...e.expression.map(e=>r(e))]):""}function c(e){return t.wrap([d(e.extAttrs),r(e.tokens.optional),t.type(o(e.idlType)),r(e.tokens.variadic),a(e.tokens.name,{data:e}),u(e.default),r(e.tokens.separator)])}function l(e){return t.wrap([s(e.tokens.value),r(e.tokens.separator)])}function p(e){const{rhsType:n}=e.params;return t.wrap([t.trivia(e.tokens.name.trivia),t.extendedAttribute(t.wrap([t.extendedAttributeReference(e.name),r(e.params.tokens.assign),s(e.params.tokens.secondaryName),r(e.params.tokens.open),...e.params.list?e.params.list.map("identifier-list"===n?l:c):[],r(e.params.tokens.close)])),r(e.tokens.separator)])}function d(e){return e?t.wrap([r(e.tokens.open),...e.items.map(p),r(e.tokens.close)]):""}function f(e){return t.definition(t.wrap([d(e.extAttrs),r(e.tokens.callback),r(e.tokens.partial),r(e.tokens.base),r(e.tokens.mixin),a(e.tokens.name,{data:e}),(s=e.inheritance,s?t.wrap([r(s.tokens.colon),t.trivia(s.tokens.name.trivia),t.inheritance(n(s.tokens.name.value,s.name))]):""),r(e.tokens.open),k(e.members,e),r(e.tokens.close),r(e.tokens.termination)]),{data:e});var s}function m(e,n){return t.definition(t.wrap([d(e.extAttrs),r(e.tokens.readonly),r(e.tokens.base,t.generic),r(e.tokens.open),t.wrap(e.idlType.map(o)),r(e.tokens.close),r(e.tokens.termination)]),{data:e,parent:n})}t=Object.assign({},T,t);const y={interface:f,"interface mixin":f,namespace:f,operation:function(e,n){const s=e.body?[t.type(o(e.body.idlType)),a(e.body.tokens.name,{data:e,parent:n}),r(e.body.tokens.open),t.wrap(e.body.arguments.map(c)),r(e.body.tokens.close)]:[];return t.definition(t.wrap([d(e.extAttrs),r(e.tokens.special),...s,r(e.tokens.termination)]),{data:e,parent:n})},attribute:function(e,n){return t.definition(t.wrap([d(e.extAttrs),r(e.tokens.special),r(e.tokens.readonly),r(e.tokens.base),t.type(o(e.idlType)),a(e.tokens.name,{data:e,parent:n}),r(e.tokens.termination)]),{data:e,parent:n})},dictionary:f,field:function(e,n){return t.definition(t.wrap([d(e.extAttrs),r(e.tokens.required),t.type(o(e.idlType)),a(e.tokens.name,{data:e,parent:n}),u(e.default),r(e.tokens.termination)]),{data:e,parent:n})},const:function(e,n){return t.definition(t.wrap([d(e.extAttrs),r(e.tokens.base),t.type(o(e.idlType)),a(e.tokens.name,{data:e,parent:n}),r(e.tokens.assign),r(e.tokens.value),r(e.tokens.termination)]),{data:e,parent:n})},typedef:function(e){return t.definition(t.wrap([d(e.extAttrs),r(e.tokens.base),t.type(o(e.idlType)),a(e.tokens.name,{data:e}),r(e.tokens.termination)]),{data:e})},includes:function(e){return t.definition(t.wrap([d(e.extAttrs),s(e.tokens.target,e.target),r(e.tokens.includes),s(e.tokens.mixin,e.includes),r(e.tokens.termination)]),{data:e})},callback:function(e){return t.definition(t.wrap([d(e.extAttrs),r(e.tokens.base),a(e.tokens.name,{data:e}),r(e.tokens.assign),t.type(o(e.idlType)),r(e.tokens.open),...e.arguments.map(c),r(e.tokens.close),r(e.tokens.termination)]),{data:e})},enum:function(e){return t.definition(t.wrap([d(e.extAttrs),r(e.tokens.base),a(e.tokens.name,{data:e}),r(e.tokens.open),k(e.values,e),r(e.tokens.close),r(e.tokens.termination)]),{data:e})},"enum-value":function(e,n){return t.wrap([t.trivia(e.tokens.value.trivia),t.definition(t.wrap(['"',t.name(e.value,{data:e,parent:n}),'"']),{data:e,parent:n}),r(e.tokens.separator)])},iterable:m,legacyiterable:m,maplike:m,setlike:m,"callback interface":f,eof:function(e){return t.trivia(e.trivia)}};function k(e,n){if(!e)return;const r=e.map(e=>(function(e,t){if(!y[e.type])throw new Error(`Type "${e.type}" is unsupported`);return y[e.type](e,t)})(e,n));return t.wrap(r)}return k(e)}function*A({unique:e,duplicates:t}){for(const n of t){const{name:t}=n,r=`The name "${t}" of type "${e.get(t).type}" was already seen`;yield s(n.source,n.tokens.name,n,r)}}function*$(e){const t=[...e.unique.values()].filter(e=>"interface"===e.type),n=function(){const t=new Map,n=e.all.filter(e=>"includes"===e.type);for(const r of n){const n=t.get(r.target),s=e.unique.get(r.includes);s&&(n?n.push(s):t.set(r.target,[s]))}return t}();for(const e of t)yield*r(e);function*r(t){const r=new Set(i(t).map(e=>e.name)),s=e.partials.get(t.name)||[],o=n.get(t.name)||[];for(const e of[...s,...o]){const n=i(e);yield*a(n,r,e,t);for(const e of n)r.add(e.name)}}function*a(e,t,n,r){for(const a of e){const{name:e}=a;if(e&&t.has(e)){const t=`The operation "${e}" has already been defined for the base interface "${r.name}" either in itself or in a mixin`;yield s(n.source,a.body.tokens.name,n,t)}}}function i(e){return e.members.filter(({type:e})=>"operation"===e)}}function j(e){const t=function(e){const t=new Map,n=new Set,r=new Map;for(const s of e)if(s.partial){const e=r.get(s.name);e?e.push(s):r.set(s.name,[s])}else s.name&&(t.has(s.name)?n.add(s):t.set(s.name,s));return{all:e,unique:t,partials:r,duplicates:n}}(e);return[...A(t),...$(t)]}n.d(t,"parse",function(){return x}),n.d(t,"write",function(){return N}),n.d(t,"validate",function(){return j})}])});
//# sourceMappingURL=webidl2.js.map