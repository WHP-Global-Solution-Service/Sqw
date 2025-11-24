(self["webpackChunksqw"]=self["webpackChunksqw"]||[]).push([[504],{34:function(e,t,n){"use strict";var r=n(4901);e.exports=function(e){return"object"==typeof e?null!==e:r(e)}},81:function(e,t,n){"use strict";var r=n(9565),i=n(9306),s=n(8551),o=n(6823),a=n(851),c=TypeError;e.exports=function(e,t){var n=arguments.length<2?a(e):t;if(i(n))return s(r(n,e));throw new c(o(e)+" is not iterable")}},116:function(e,t,n){"use strict";var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),l=n(9539),u=n(4549),h=u("find",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{find:function(e){a(this);try{o(e)}catch(r){l(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;return s(t,function(t,r){if(e(t,n++))return r(t)},{IS_RECORD:!0,INTERRUPTED:!0}).result}})},144:function(e,t,n){"use strict";n.d(t,{C4:function(){return E},EW:function(){return De},Gc:function(){return _e},IG:function(){return Te},KR:function(){return xe},Kh:function(){return ge},Pr:function(){return Me},R1:function(){return Oe},Tm:function(){return be},X2:function(){return l},a1:function(){return ke},bl:function(){return T},fE:function(){return Ce},g8:function(){return we},hV:function(){return Ve},hZ:function(){return D},i9:function(){return Pe},ju:function(){return Ie},lJ:function(){return Se},qA:function(){return U},u4:function(){return L},ux:function(){return Ee},wB:function(){return $e},yC:function(){return o}});n(4114),n(8111),n(2489),n(7588),n(1701),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(4232);let i,s;class o{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=i,!e&&i&&(this.index=(i.scopes||(i.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=i;try{return i=this,e()}finally{i=t}}else 0}on(){1===++this._on&&(this.prevScope=i,i=this)}off(){this._on>0&&0===--this._on&&(i=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){let t,n;for(this._active=!1,t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}}function a(){return i}const c=new WeakSet;class l{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,i&&i.active&&i.effects.push(this)}pause(){this.flags|=64}resume(){64&this.flags&&(this.flags&=-65,c.has(this)&&(c.delete(this),this.trigger()))}notify(){2&this.flags&&!(32&this.flags)||8&this.flags||f(this)}run(){if(!(1&this.flags))return this.fn();this.flags|=2,S(this),g(this);const e=s,t=C;s=this,C=!0;try{return this.fn()}finally{0,_(this),s=e,C=t,this.flags&=-3}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)w(e);this.deps=this.depsTail=void 0,S(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){64&this.flags?c.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){v(this)&&this.run()}get dirty(){return v(this)}}let u,h,d=0;function f(e,t=!1){if(e.flags|=8,t)return e.next=h,void(h=e);e.next=u,u=e}function p(){d++}function m(){if(--d>0)return;if(h){let e=h;h=void 0;while(e){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;while(u){let n=u;u=void 0;while(n){const r=n.next;if(n.next=void 0,n.flags&=-9,1&n.flags)try{n.trigger()}catch(t){e||(e=t)}n=r}}if(e)throw e}function g(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function _(e){let t,n=e.depsTail,r=n;while(r){const e=r.prevDep;-1===r.version?(r===n&&(n=e),w(r),b(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function v(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(y(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function y(e){if(4&e.flags&&!(16&e.flags))return;if(e.flags&=-17,e.globalVersion===k)return;if(e.globalVersion=k,!e.isSSR&&128&e.flags&&(!e.deps&&!e._dirty||!v(e)))return;e.flags|=2;const t=e.dep,n=s,i=C;s=e,C=!0;try{g(e);const n=e.fn(e._value);(0===t.version||(0,r.$H)(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(o){throw t.version++,o}finally{s=n,C=i,_(e),e.flags&=-3}}function w(e,t=!1){const{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)w(e,!0)}t||--n.sc||!n.map||n.map.delete(n.key)}function b(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let C=!0;const I=[];function E(){I.push(C),C=!1}function T(){const e=I.pop();C=void 0===e||e}function S(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const e=s;s=void 0;try{t()}finally{s=e}}}let k=0;class P{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class x{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!s||!C||s===this.computed)return;let t=this.activeLink;if(void 0===t||t.sub!==s)t=this.activeLink=new P(s,this),s.deps?(t.prevDep=s.depsTail,s.depsTail.nextDep=t,s.depsTail=t):s.deps=s.depsTail=t,A(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){const e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=s.depsTail,t.nextDep=void 0,s.depsTail.nextDep=t,s.depsTail=t,s.deps===t&&(s.deps=e)}return t}trigger(e){this.version++,k++,this.notify(e)}notify(e){p();try{0;for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{m()}}}function A(e){if(e.dep.sc++,4&e.sub.flags){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)A(e)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const R=new WeakMap,O=Symbol(""),N=Symbol(""),M=Symbol("");function L(e,t,n){if(C&&s){let t=R.get(e);t||R.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new x),r.map=t,r.key=n),r.track()}}function D(e,t,n,i,s,o){const a=R.get(e);if(!a)return void k++;const c=e=>{e&&e.trigger()};if(p(),"clear"===t)a.forEach(c);else{const s=(0,r.cy)(e),o=s&&(0,r.yI)(n);if(s&&"length"===n){const e=Number(i);a.forEach((t,n)=>{("length"===n||n===M||!(0,r.Bm)(n)&&n>=e)&&c(t)})}else switch((void 0!==n||a.has(void 0))&&c(a.get(n)),o&&c(a.get(M)),t){case"add":s?o&&c(a.get("length")):(c(a.get(O)),(0,r.CE)(e)&&c(a.get(N)));break;case"delete":s||(c(a.get(O)),(0,r.CE)(e)&&c(a.get(N)));break;case"set":(0,r.CE)(e)&&c(a.get(O));break}}m()}function F(e){const t=Ee(e);return t===e?t:(L(t,"iterate",M),Ce(e)?t:t.map(Se))}function U(e){return L(e=Ee(e),"iterate",M),e}const j={__proto__:null,[Symbol.iterator](){return B(this,Symbol.iterator,Se)},concat(...e){return F(this).concat(...e.map(e=>(0,r.cy)(e)?F(e):e))},entries(){return B(this,"entries",e=>(e[1]=Se(e[1]),e))},every(e,t){return V(this,"every",e,t,void 0,arguments)},filter(e,t){return V(this,"filter",e,t,e=>e.map(Se),arguments)},find(e,t){return V(this,"find",e,t,Se,arguments)},findIndex(e,t){return V(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return V(this,"findLast",e,t,Se,arguments)},findLastIndex(e,t){return V(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return V(this,"forEach",e,t,void 0,arguments)},includes(...e){return W(this,"includes",e)},indexOf(...e){return W(this,"indexOf",e)},join(e){return F(this).join(e)},lastIndexOf(...e){return W(this,"lastIndexOf",e)},map(e,t){return V(this,"map",e,t,void 0,arguments)},pop(){return H(this,"pop")},push(...e){return H(this,"push",e)},reduce(e,...t){return q(this,"reduce",e,t)},reduceRight(e,...t){return q(this,"reduceRight",e,t)},shift(){return H(this,"shift")},some(e,t){return V(this,"some",e,t,void 0,arguments)},splice(...e){return H(this,"splice",e)},toReversed(){return F(this).toReversed()},toSorted(e){return F(this).toSorted(e)},toSpliced(...e){return F(this).toSpliced(...e)},unshift(...e){return H(this,"unshift",e)},values(){return B(this,"values",Se)}};function B(e,t,n){const r=U(e),i=r[t]();return r===e||Ce(e)||(i._next=i.next,i.next=()=>{const e=i._next();return e.value&&(e.value=n(e.value)),e}),i}const $=Array.prototype;function V(e,t,n,r,i,s){const o=U(e),a=o!==e&&!Ce(e),c=o[t];if(c!==$[t]){const t=c.apply(e,s);return a?Se(t):t}let l=n;o!==e&&(a?l=function(t,r){return n.call(this,Se(t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));const u=c.call(o,l,r);return a&&i?i(u):u}function q(e,t,n,r){const i=U(e);let s=n;return i!==e&&(Ce(e)?n.length>3&&(s=function(t,r,i){return n.call(this,t,r,i,e)}):s=function(t,r,i){return n.call(this,t,Se(r),i,e)}),i[t](s,...r)}function W(e,t,n){const r=Ee(e);L(r,"iterate",M);const i=r[t](...n);return-1!==i&&!1!==i||!Ie(n[0])?i:(n[0]=Ee(n[0]),r[t](...n))}function H(e,t,n=[]){E(),p();const r=Ee(e)[t].apply(e,n);return m(),T(),r}const z=(0,r.pD)("__proto__,__v_isRef,__isVue"),K=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>"arguments"!==e&&"caller"!==e).map(e=>Symbol[e]).filter(r.Bm));function G(e){(0,r.Bm)(e)||(e=String(e));const t=Ee(this);return L(t,"has",e),t.hasOwnProperty(e)}class Y{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if("__v_skip"===t)return e["__v_skip"];const i=this._isReadonly,s=this._isShallow;if("__v_isReactive"===t)return!i;if("__v_isReadonly"===t)return i;if("__v_isShallow"===t)return s;if("__v_raw"===t)return n===(i?s?fe:de:s?he:ue).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const o=(0,r.cy)(e);if(!i){let e;if(o&&(e=j[t]))return e;if("hasOwnProperty"===t)return G}const a=Reflect.get(e,t,Pe(e)?e:n);return((0,r.Bm)(t)?K.has(t):z(t))?a:(i||L(e,"get",t),s?a:Pe(a)?o&&(0,r.yI)(t)?a:a.value:(0,r.Gv)(a)?i?ve(a):ge(a):a)}}class Z extends Y{constructor(e=!1){super(!1,e)}set(e,t,n,i){let s=e[t];if(!this._isShallow){const t=be(s);if(Ce(n)||be(n)||(s=Ee(s),n=Ee(n)),!(0,r.cy)(e)&&Pe(s)&&!Pe(n))return!t&&(s.value=n,!0)}const o=(0,r.cy)(e)&&(0,r.yI)(t)?Number(t)<e.length:(0,r.$3)(e,t),a=Reflect.set(e,t,n,Pe(e)?e:i);return e===Ee(i)&&(o?(0,r.$H)(n,s)&&D(e,"set",t,n,s):D(e,"add",t,n)),a}deleteProperty(e,t){const n=(0,r.$3)(e,t),i=e[t],s=Reflect.deleteProperty(e,t);return s&&n&&D(e,"delete",t,void 0,i),s}has(e,t){const n=Reflect.has(e,t);return(0,r.Bm)(t)&&K.has(t)||L(e,"has",t),n}ownKeys(e){return L(e,"iterate",(0,r.cy)(e)?"length":O),Reflect.ownKeys(e)}}class J extends Y{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const X=new Z,Q=new J,ee=new Z(!0),te=e=>e,ne=e=>Reflect.getPrototypeOf(e);function re(e,t,n){return function(...i){const s=this["__v_raw"],o=Ee(s),a=(0,r.CE)(o),c="entries"===e||e===Symbol.iterator&&a,l="keys"===e&&a,u=s[e](...i),h=n?te:t?ke:Se;return!t&&L(o,"iterate",l?N:O),{next(){const{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[h(e[0]),h(e[1])]:h(e),done:t}},[Symbol.iterator](){return this}}}}function ie(e){return function(...t){return"delete"!==e&&("clear"===e?void 0:this)}}function se(e,t){const n={get(n){const i=this["__v_raw"],s=Ee(i),o=Ee(n);e||((0,r.$H)(n,o)&&L(s,"get",n),L(s,"get",o));const{has:a}=ne(s),c=t?te:e?ke:Se;return a.call(s,n)?c(i.get(n)):a.call(s,o)?c(i.get(o)):void(i!==s&&i.get(n))},get size(){const t=this["__v_raw"];return!e&&L(Ee(t),"iterate",O),Reflect.get(t,"size",t)},has(t){const n=this["__v_raw"],i=Ee(n),s=Ee(t);return e||((0,r.$H)(t,s)&&L(i,"has",t),L(i,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)},forEach(n,r){const i=this,s=i["__v_raw"],o=Ee(s),a=t?te:e?ke:Se;return!e&&L(o,"iterate",O),s.forEach((e,t)=>n.call(r,a(e),a(t),i))}};(0,r.X$)(n,e?{add:ie("add"),set:ie("set"),delete:ie("delete"),clear:ie("clear")}:{add(e){t||Ce(e)||be(e)||(e=Ee(e));const n=Ee(this),r=ne(n),i=r.has.call(n,e);return i||(n.add(e),D(n,"add",e,e)),this},set(e,n){t||Ce(n)||be(n)||(n=Ee(n));const i=Ee(this),{has:s,get:o}=ne(i);let a=s.call(i,e);a||(e=Ee(e),a=s.call(i,e));const c=o.call(i,e);return i.set(e,n),a?(0,r.$H)(n,c)&&D(i,"set",e,n,c):D(i,"add",e,n),this},delete(e){const t=Ee(this),{has:n,get:r}=ne(t);let i=n.call(t,e);i||(e=Ee(e),i=n.call(t,e));const s=r?r.call(t,e):void 0,o=t.delete(e);return i&&D(t,"delete",e,void 0,s),o},clear(){const e=Ee(this),t=0!==e.size,n=void 0,r=e.clear();return t&&D(e,"clear",void 0,void 0,n),r}});const i=["keys","values","entries",Symbol.iterator];return i.forEach(r=>{n[r]=re(r,e,t)}),n}function oe(e,t){const n=se(e,t);return(t,i,s)=>"__v_isReactive"===i?!e:"__v_isReadonly"===i?e:"__v_raw"===i?t:Reflect.get((0,r.$3)(n,i)&&i in t?n:t,i,s)}const ae={get:oe(!1,!1)},ce={get:oe(!1,!0)},le={get:oe(!0,!1)};const ue=new WeakMap,he=new WeakMap,de=new WeakMap,fe=new WeakMap;function pe(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function me(e){return e["__v_skip"]||!Object.isExtensible(e)?0:pe((0,r.Zf)(e))}function ge(e){return be(e)?e:ye(e,!1,X,ae,ue)}function _e(e){return ye(e,!1,ee,ce,he)}function ve(e){return ye(e,!0,Q,le,de)}function ye(e,t,n,i,s){if(!(0,r.Gv)(e))return e;if(e["__v_raw"]&&(!t||!e["__v_isReactive"]))return e;const o=me(e);if(0===o)return e;const a=s.get(e);if(a)return a;const c=new Proxy(e,2===o?i:n);return s.set(e,c),c}function we(e){return be(e)?we(e["__v_raw"]):!(!e||!e["__v_isReactive"])}function be(e){return!(!e||!e["__v_isReadonly"])}function Ce(e){return!(!e||!e["__v_isShallow"])}function Ie(e){return!!e&&!!e["__v_raw"]}function Ee(e){const t=e&&e["__v_raw"];return t?Ee(t):e}function Te(e){return!(0,r.$3)(e,"__v_skip")&&Object.isExtensible(e)&&(0,r.yQ)(e,"__v_skip",!0),e}const Se=e=>(0,r.Gv)(e)?ge(e):e,ke=e=>(0,r.Gv)(e)?ve(e):e;function Pe(e){return!!e&&!0===e["__v_isRef"]}function xe(e){return Ae(e,!1)}function Ae(e,t){return Pe(e)?e:new Re(e,t)}class Re{constructor(e,t){this.dep=new x,this["__v_isRef"]=!0,this["__v_isShallow"]=!1,this._rawValue=t?e:Ee(e),this._value=t?e:Se(e),this["__v_isShallow"]=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,n=this["__v_isShallow"]||Ce(e)||be(e);e=n?e:Ee(e),(0,r.$H)(e,t)&&(this._rawValue=e,this._value=n?e:Se(e),this.dep.trigger())}}function Oe(e){return Pe(e)?e.value:e}const Ne={get:(e,t,n)=>"__v_raw"===t?e:Oe(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const i=e[t];return Pe(i)&&!Pe(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Me(e){return we(e)?e:new Proxy(e,Ne)}class Le{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new x(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=k-1,this.next=void 0,this.effect=this,this["__v_isReadonly"]=!t,this.isSSR=n}notify(){if(this.flags|=16,!(8&this.flags||s===this))return f(this,!0),!0}get value(){const e=this.dep.track();return y(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function De(e,t,n=!1){let i,s;(0,r.Tn)(e)?i=e:(i=e.get,s=e.set);const o=new Le(i,s,n);return o}const Fe={},Ue=new WeakMap;let je;function Be(e,t=!1,n=je){if(n){let t=Ue.get(n);t||Ue.set(n,t=[]),t.push(e)}else 0}function $e(e,t,n=r.MZ){const{immediate:i,deep:s,once:o,scheduler:c,augmentJob:u,call:h}=n,d=e=>s?e:Ce(e)||!1===s||0===s?Ve(e,1):Ve(e);let f,p,m,g,_=!1,v=!1;if(Pe(e)?(p=()=>e.value,_=Ce(e)):we(e)?(p=()=>d(e),_=!0):(0,r.cy)(e)?(v=!0,_=e.some(e=>we(e)||Ce(e)),p=()=>e.map(e=>Pe(e)?e.value:we(e)?d(e):(0,r.Tn)(e)?h?h(e,2):e():void 0)):p=(0,r.Tn)(e)?t?h?()=>h(e,2):e:()=>{if(m){E();try{m()}finally{T()}}const t=je;je=f;try{return h?h(e,3,[g]):e(g)}finally{je=t}}:r.tE,t&&s){const e=p,t=!0===s?1/0:s;p=()=>Ve(e(),t)}const y=a(),w=()=>{f.stop(),y&&y.active&&(0,r.TF)(y.effects,f)};if(o&&t){const e=t;t=(...t)=>{e(...t),w()}}let b=v?new Array(e.length).fill(Fe):Fe;const C=e=>{if(1&f.flags&&(f.dirty||e))if(t){const e=f.run();if(s||_||(v?e.some((e,t)=>(0,r.$H)(e,b[t])):(0,r.$H)(e,b))){m&&m();const n=je;je=f;try{const n=[e,b===Fe?void 0:v&&b[0]===Fe?[]:b,g];b=e,h?h(t,3,n):t(...n)}finally{je=n}}}else f.run()};return u&&u(C),f=new l(p),f.scheduler=c?()=>c(C,!1):C,g=e=>Be(e,!1,f),m=f.onStop=()=>{const e=Ue.get(f);if(e){if(h)h(e,4);else for(const t of e)t();Ue.delete(f)}},t?i?C(!0):b=f.run():c?c(C.bind(null,!0),!0):f.run(),w.pause=f.pause.bind(f),w.resume=f.resume.bind(f),w.stop=w,w}function Ve(e,t=1/0,n){if(t<=0||!(0,r.Gv)(e)||e["__v_skip"])return e;if(n=n||new Set,n.has(e))return e;if(n.add(e),t--,Pe(e))Ve(e.value,t,n);else if((0,r.cy)(e))for(let r=0;r<e.length;r++)Ve(e[r],t,n);else if((0,r.vM)(e)||(0,r.CE)(e))e.forEach(e=>{Ve(e,t,n)});else if((0,r.Qd)(e)){for(const r in e)Ve(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Ve(e[r],t,n)}return e}},283:function(e,t,n){"use strict";var r=n(9504),i=n(9039),s=n(4901),o=n(9297),a=n(3724),c=n(350).CONFIGURABLE,l=n(3706),u=n(1181),h=u.enforce,d=u.get,f=String,p=Object.defineProperty,m=r("".slice),g=r("".replace),_=r([].join),v=a&&!i(function(){return 8!==p(function(){},"length",{value:8}).length}),y=String(String).split("String"),w=e.exports=function(e,t,n){"Symbol("===m(f(t),0,7)&&(t="["+g(f(t),/^Symbol\(([^)]*)\).*$/,"$1")+"]"),n&&n.getter&&(t="get "+t),n&&n.setter&&(t="set "+t),(!o(e,"name")||c&&e.name!==t)&&(a?p(e,"name",{value:t,configurable:!0}):e.name=t),v&&n&&o(n,"arity")&&e.length!==n.arity&&p(e,"length",{value:n.arity});try{n&&o(n,"constructor")&&n.constructor?a&&p(e,"prototype",{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(i){}var r=h(e);return o(r,"source")||(r.source=_(y,"string"==typeof t?t:"")),e};Function.prototype.toString=w(function(){return s(this)&&d(this).source||l(this)},"toString")},350:function(e,t,n){"use strict";var r=n(3724),i=n(9297),s=Function.prototype,o=r&&Object.getOwnPropertyDescriptor,a=i(s,"name"),c=a&&"something"===function(){}.name,l=a&&(!r||r&&o(s,"name").configurable);e.exports={EXISTS:a,PROPER:c,CONFIGURABLE:l}},397:function(e,t,n){"use strict";var r=n(7751);e.exports=r("document","documentElement")},421:function(e){"use strict";e.exports={}},456:function(e,t,n){"use strict";var r=n(6518),i=n(4576),s=n(9504),o=n(4154),a=n(5169),c=s(1.1.toString),l=i.Uint8Array,u=!l||!l.prototype.toHex||!function(){try{var e=new l([255,255,255,255,255,255,255,255]);return"ffffffffffffffff"===e.toHex()}catch(t){return!1}}();l&&r({target:"Uint8Array",proto:!0,forced:u},{toHex:function(){o(this),a(this.buffer);for(var e="",t=0,n=this.length;t<n;t++){var r=c(this[t],16);e+=1===r.length?"0"+r:r}return e}})},507:function(e,t,n){"use strict";var r=n(9565);e.exports=function(e,t,n){var i,s,o=n?e:e.iterator,a=e.next;while(!(i=r(a,o)).done)if(s=t(i.value),void 0!==s)return s}},616:function(e,t,n){"use strict";var r=n(9039);e.exports=!r(function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")})},655:function(e,t,n){"use strict";var r=n(6955),i=String;e.exports=function(e){if("Symbol"===r(e))throw new TypeError("Cannot convert a Symbol value to a string");return i(e)}},679:function(e,t,n){"use strict";var r=n(1625),i=TypeError;e.exports=function(e,t){if(r(t,e))return e;throw new i("Incorrect invocation")}},684:function(e){"use strict";e.exports=function(e,t){var n="function"==typeof Iterator&&Iterator.prototype[e];if(n)try{n.call({next:null},t).next()}catch(r){return!0}}},741:function(e){"use strict";var t=Math.ceil,n=Math.floor;e.exports=Math.trunc||function(e){var r=+e;return(r>0?n:t)(r)}},757:function(e,t,n){"use strict";var r=n(7751),i=n(4901),s=n(1625),o=n(7040),a=Object;e.exports=o?function(e){return"symbol"==typeof e}:function(e){var t=r("Symbol");return i(t)&&s(t.prototype,a(e))}},798:function(e,t,n){"use strict";n.d(t,{h1:function(){return l},uA:function(){return i}});n(8111),n(2489),n(1701),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(2455);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.cY;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(n)return null;throw r}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(c(e))try{this.getOrInitializeService({instanceIdentifier:s})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,s]of this.instancesDeferred.entries()){const e=this.normalizeInstanceIdentifier(i);n===e&&s.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:a(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}function a(e){return e===s?void 0:e}function c(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){const t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},851:function(e,t,n){"use strict";var r=n(6955),i=n(5966),s=n(4117),o=n(6269),a=n(8227),c=a("iterator");e.exports=function(e){if(!s(e))return i(e,c)||i(e,"@@iterator")||o[r(e)]}},944:function(e){"use strict";var t=TypeError;e.exports=function(e){var n=e&&e.alphabet;if(void 0===n||"base64"===n||"base64url"===n)return n||"base64";throw new t("Incorrect `alphabet` option")}},1072:function(e,t,n){"use strict";var r=n(1828),i=n(8727);e.exports=Object.keys||function(e){return r(e,i)}},1108:function(e,t,n){"use strict";var r=n(6955);e.exports=function(e){var t=r(e);return"BigInt64Array"===t||"BigUint64Array"===t}},1148:function(e,t,n){"use strict";var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),l=n(9539),u=n(4549),h=u("every",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{every:function(e){a(this);try{o(e)}catch(r){l(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;return!s(t,function(t,r){if(!e(t,n++))return r()},{IS_RECORD:!0,INTERRUPTED:!0}).stopped}})},1181:function(e,t,n){"use strict";var r,i,s,o=n(8622),a=n(4576),c=n(34),l=n(6699),u=n(9297),h=n(7629),d=n(6119),f=n(421),p="Object already initialized",m=a.TypeError,g=a.WeakMap,_=function(e){return s(e)?i(e):r(e,{})},v=function(e){return function(t){var n;if(!c(t)||(n=i(t)).type!==e)throw new m("Incompatible receiver, "+e+" required");return n}};if(o||h.state){var y=h.state||(h.state=new g);y.get=y.get,y.has=y.has,y.set=y.set,r=function(e,t){if(y.has(e))throw new m(p);return t.facade=e,y.set(e,t),t},i=function(e){return y.get(e)||{}},s=function(e){return y.has(e)}}else{var w=d("state");f[w]=!0,r=function(e,t){if(u(e,w))throw new m(p);return t.facade=e,l(e,w,t),t},i=function(e){return u(e,w)?e[w]:{}},s=function(e){return u(e,w)}}e.exports={set:r,get:i,has:s,enforce:_,getterFor:v}},1239:function(e,t,n){"use strict";n.d(t,{Jt:function(){return ca},C3:function(){return ba},yX:function(){return ra},Zy:function(){return da},VC:function(){return ia},KR:function(){return ta},TF:function(){return sa},O5:function(){return Ta},yo:function(){return aa}});n(4114),n(8111),n(1148),n(2489),n(116),n(7588),n(1701),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(6086),i=n(798),s=n(2455),o=n(6189);const a="@firebase/database",c="1.1.0";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let l="";function u(e){l=e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){null==t?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),(0,s.As)(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return null==t?null:(0,s.$L)(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){null==t?delete this.cache_[e]:this.cache_[e]=t}get(e){return(0,s.gR)(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(e){try{if("undefined"!==typeof window&&"undefined"!==typeof window[e]){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new h(t)}}catch(t){}return new d},p=f("localStorage"),m=f("sessionStorage"),g=new o.Vy("@firebase/database"),_=function(){let e=1;return function(){return e++}}(),v=function(e){const t=(0,s.kj)(e),n=new s.gz;n.update(t);const r=n.digest();return s.K3.encodeByteArray(r)},y=function(...e){let t="";for(let n=0;n<e.length;n++){const r=e[n];Array.isArray(r)||r&&"object"===typeof r&&"number"===typeof r.length?t+=y.apply(null,r):t+="object"===typeof r?(0,s.As)(r):r,t+=" "}return t};let w=null,b=!0;const C=function(e,t){(0,s.vA)(!t||!0===e||!1===e,"Can't turn on custom loggers persistently."),!0===e?(g.logLevel=o.$b.VERBOSE,w=g.log.bind(g),t&&m.set("logging_enabled",!0)):"function"===typeof e?w=e:(w=null,m.remove("logging_enabled"))},I=function(...e){if(!0===b&&(b=!1,null===w&&!0===m.get("logging_enabled")&&C(!0)),w){const t=y.apply(null,e);w(t)}},E=function(e){return function(...t){I(e,...t)}},T=function(...e){const t="FIREBASE INTERNAL ERROR: "+y(...e);g.error(t)},S=function(...e){const t=`FIREBASE FATAL ERROR: ${y(...e)}`;throw g.error(t),new Error(t)},k=function(...e){const t="FIREBASE WARNING: "+y(...e);g.warn(t)},P=function(){"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&k("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},x=function(e){return"number"===typeof e&&(e!==e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},A=function(e){if((0,s.$g)()||"complete"===document.readyState)e();else{let t=!1;const n=function(){document.body?t||(t=!0,e()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{"complete"===document.readyState&&n()}),window.attachEvent("onload",n))}},R="[MIN_NAME]",O="[MAX_NAME]",N=function(e,t){if(e===t)return 0;if(e===R||t===O)return-1;if(t===R||e===O)return 1;{const n=z(e),r=z(t);return null!==n?null!==r?n-r===0?e.length-t.length:n-r:-1:null!==r?1:e<t?-1:1}},M=function(e,t){return e===t?0:e<t?-1:1},L=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+(0,s.As)(t))},D=function(e){if("object"!==typeof e||null===e)return(0,s.As)(e);const t=[];for(const r in e)t.push(r);t.sort();let n="{";for(let r=0;r<t.length;r++)0!==r&&(n+=","),n+=(0,s.As)(t[r]),n+=":",n+=D(e[t[r]]);return n+="}",n},F=function(e,t){const n=e.length;if(n<=t)return[e];const r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function U(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const j=function(e){(0,s.vA)(!x(e),"Invalid JSON number");const t=11,n=52,r=(1<<t-1)-1;let i,o,a,c,l;0===e?(o=0,a=0,i=1/e===-1/0?1:0):(i=e<0,e=Math.abs(e),e>=Math.pow(2,1-r)?(c=Math.min(Math.floor(Math.log(e)/Math.LN2),r),o=c+r,a=Math.round(e*Math.pow(2,n-c)-Math.pow(2,n))):(o=0,a=Math.round(e/Math.pow(2,1-r-n))));const u=[];for(l=n;l;l-=1)u.push(a%2?1:0),a=Math.floor(a/2);for(l=t;l;l-=1)u.push(o%2?1:0),o=Math.floor(o/2);u.push(i?1:0),u.reverse();const h=u.join("");let d="";for(l=0;l<64;l+=8){let e=parseInt(h.substr(l,8),2).toString(16);1===e.length&&(e="0"+e),d+=e}return d.toLowerCase()},B=function(){return!("object"!==typeof window||!window["chrome"]||!window["chrome"]["extension"]||/^chrome/.test(window.location.href))},$=function(){return"object"===typeof Windows&&"object"===typeof Windows.UI};function V(e,t){let n="Unknown Error";"too_big"===e?n="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"===e?n="Client doesn't have permission to access the desired data.":"unavailable"===e&&(n="The service is unavailable");const r=new Error(e+" at "+t._path.toString()+": "+n);return r.code=e.toUpperCase(),r}const q=new RegExp("^-?(0*)\\d{1,10}$"),W=-2147483648,H=2147483647,z=function(e){if(q.test(e)){const t=Number(e);if(t>=W&&t<=H)return t}return null},K=function(e){try{e()}catch(t){setTimeout(()=>{const e=t.stack||"";throw k("Exception was thrown by user callback.",e),t},Math.floor(0))}},G=function(){const e="object"===typeof window&&window["navigator"]&&window["navigator"]["userAgent"]||"";return e.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Y=function(e,t){const n=setTimeout(e,t);return"number"===typeof n&&"undefined"!==typeof Deno&&Deno["unrefTimer"]?Deno.unrefTimer(n):"object"===typeof n&&n["unref"]&&n["unref"](),n};
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Z{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,(0,r.xZ)(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(e=>this.appCheck=e)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){k(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(e=>this.auth_=e)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(e=>e&&"auth/token-not-initialized"===e.code?(I("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',k(e)}}class X{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}X.OWNER="owner";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Q="5",ee="v",te="s",ne="r",re="f",ie=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,se="ls",oe="p",ae="ac",ce="websocket",le="long_polling";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ue{constructor(e,t,n,r,i=!1,s="",o=!1,a=!1,c=null){this.secure=t,this.namespace=n,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=s,this.includeNamespaceInQueryParams=o,this.isUsingEmulator=a,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=p.get("host:"+e)||this._host}isCacheableHost(){return"s-"===this.internalHost.substr(0,2)}isCustomHost(){return"firebaseio.com"!==this._domain&&"firebaseio-demo.com"!==this._domain}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&p.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function he(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams}function de(e,t,n){let r;if((0,s.vA)("string"===typeof t,"typeof type must == string"),(0,s.vA)("object"===typeof n,"typeof params must == object"),t===ce)r=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else{if(t!==le)throw new Error("Unknown connection type: "+t);r=(e.secure?"https://":"http://")+e.internalHost+"/.lp?"}he(e)&&(n["ns"]=e.namespace);const i=[];return U(n,(e,t)=>{i.push(e+"="+t)}),r+i.join("&")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(){this.counters_={}}incrementCounter(e,t=1){(0,s.gR)(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return(0,s.A4)(this.counters_)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pe={},me={};function ge(e){const t=e.toString();return pe[t]||(pe[t]=new fe),pe[t]}function _e(e,t){const n=e.toString();return me[n]||(me[n]=t()),me[n]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){this.pendingResponses[e]=t;while(this.pendingResponses[this.currentResponseNum]){const e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&K(()=>{this.onMessage_(e[t])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye="start",we="close",be="pLPCommand",Ce="pRTLPCB",Ie="id",Ee="pw",Te="ser",Se="cb",ke="seg",Pe="ts",xe="d",Ae="dframe",Re=1870,Oe=30,Ne=Re-Oe,Me=25e3,Le=3e4;class De{constructor(e,t,n,r,i,s,o){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.transportSessionId=s,this.lastSessionId=o,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=E(e),this.stats_=ge(t),this.urlFn=e=>(this.appCheckToken&&(e[ae]=this.appCheckToken),de(t,le,e))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new ve(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Le)),A(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Fe((...e)=>{const[t,n,r,i,s]=e;if(this.incrementIncomingBytes_(e),this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,t===ye)this.id=n,this.password=r;else{if(t!==we)throw new Error("Unrecognized command received: "+t);n?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(n,()=>{this.onClosed_()})):this.onClosed_()}},(...e)=>{const[t,n]=e;this.incrementIncomingBytes_(e),this.myPacketOrderer.handleResponse(t,n)},()=>{this.onClosed_()},this.urlFn);const e={};e[ye]="t",e[Te]=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(e[Se]=this.scriptTagHolder.uniqueCallbackIdentifier),e[ee]=Q,this.transportSessionId&&(e[te]=this.transportSessionId),this.lastSessionId&&(e[se]=this.lastSessionId),this.applicationId&&(e[oe]=this.applicationId),this.appCheckToken&&(e[ae]=this.appCheckToken),"undefined"!==typeof location&&location.hostname&&ie.test(location.hostname)&&(e[ne]=re);const t=this.urlFn(e);this.log_("Connecting via long-poll to "+t),this.scriptTagHolder.addTag(t,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){De.forceAllow_=!0}static forceDisallow(){De.forceDisallow_=!0}static isAvailable(){return!(0,s.$g)()&&(!!De.forceAllow_||!De.forceDisallow_&&"undefined"!==typeof document&&null!=document.createElement&&!B()&&!$())}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=(0,s.As)(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=(0,s.KA)(t),r=F(n,Ne);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if((0,s.$g)())return;this.myDisconnFrame=document.createElement("iframe");const n={};n[Ae]="t",n[Ie]=e,n[Ee]=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=(0,s.As)(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Fe{constructor(e,t,n,r){if(this.onDisconnect=n,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0,(0,s.$g)())this.commandCB=e,this.onMessageCB=t;else{this.uniqueCallbackIdentifier=_(),window[be+this.uniqueCallbackIdentifier]=e,window[Ce+this.uniqueCallbackIdentifier]=t,this.myIFrame=Fe.createIFrame_();let n="";if(this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,11)){const e=document.domain;n='<script>document.domain="'+e+'";<\/script>'}const r="<html><body>"+n+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(r),this.myIFrame.doc.close()}catch(i){I("frame writing exception"),i.stack&&I(i.stack),I(i)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(e);try{const t=e.contentWindow.document;t||I("No IE domain setting required")}catch(t){const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{null!==this.myIFrame&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){this.myID=e,this.myPW=t,this.alive=!0;while(this.newRequest_());}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ie]=this.myID,e[Ee]=this.myPW,e[Te]=this.currentSerial;let t=this.urlFn(e),n="",r=0;while(this.pendingSegs.length>0){const e=this.pendingSegs[0];if(!(e.d.length+Oe+n.length<=Re))break;{const e=this.pendingSegs.shift();n=n+"&"+ke+r+"="+e.seg+"&"+Pe+r+"="+e.ts+"&"+xe+r+"="+e.d,r++}}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(n,Math.floor(Me)),i=()=>{clearTimeout(r),n()};this.addTag(e,i)}addTag(e,t){(0,s.$g)()?this.doNodeLongPoll(e,t):setTimeout(()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const e=n.readyState;e&&"loaded"!==e&&"complete"!==e||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{I("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch(n){}},Math.floor(1))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ue=16384,je=45e3;let Be=null;"undefined"!==typeof MozWebSocket?Be=MozWebSocket:"undefined"!==typeof WebSocket&&(Be=WebSocket);class $e{constructor(e,t,n,r,i,s,o){this.connId=e,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=E(this.connId),this.stats_=ge(t),this.connURL=$e.connectionURL_(t,s,o,r,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,r,i){const o={};return o[ee]=Q,!(0,s.$g)()&&"undefined"!==typeof location&&location.hostname&&ie.test(location.hostname)&&(o[ne]=re),t&&(o[te]=t),n&&(o[se]=n),r&&(o[ae]=r),i&&(o[oe]=i),de(e,ce,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,p.set("previous_websocket_failure",!0);try{let e;if((0,s.$g)()){const t=this.nodeAdmin?"AdminNode":"Node";e={headers:{"User-Agent":`Firebase/${Q}/${l}/${process.platform}/${t}`,"X-Firebase-GMPID":this.applicationId||""}},this.authToken&&(e.headers["Authorization"]=`Bearer ${this.authToken}`),this.appCheckToken&&(e.headers["X-Firebase-AppCheck"]=this.appCheckToken);const n={NODE_ENV:"production",VUE_APP_FIREBASE_apiKey:"AIzaSyBDdOt1ajdsBOu7tVdcWOm3c_A61yvdytk",VUE_APP_FIREBASE_appId:"1:828044311671:web:c6fe41d320716830591a72",VUE_APP_FIREBASE_authDomain:"chattestproject-42024.firebaseapp.com",VUE_APP_FIREBASE_databaseURL:"https://chattestproject-42024-default-rtdb.asia-southeast1.firebasedatabase.app",VUE_APP_FIREBASE_measurementId:"G-6H2BLTSKLW",VUE_APP_FIREBASE_messagingSenderId:"828044311671",VUE_APP_FIREBASE_projectId:"chattestproject-42024",VUE_APP_FIREBASE_storageBucket:"chattestproject-42024.firebasestorage.app",BASE_URL:"/"},r=0===this.connURL.indexOf("wss://")?n["HTTPS_PROXY"]||n["https_proxy"]:n["HTTP_PROXY"]||n["http_proxy"];r&&(e["proxy"]={origin:r})}this.mySock=new Be(this.connURL,[],e)}catch(n){this.log_("Error instantiating WebSocket.");const e=n.message||n.data;return e&&this.log_(e),void this.onClosed_()}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_("WebSocket error.  Closing connection.");const t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){$e.forceDisallow_=!0}static isAvailable(){let e=!1;if("undefined"!==typeof navigator&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&null!==Be&&!$e.forceDisallow_}static previouslyFailed(){return p.isInMemoryStorage||!0===p.get("previous_websocket_failure")}markConnectionHealthy(){p.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const t=(0,s.$L)(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if((0,s.vA)(null===this.frames,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(null===this.mySock)return;const t=e["data"];if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(t);else{const e=this.extractFrameCount_(t);null!==e&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();const t=(0,s.As)(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=F(t,Ue);n.length>1&&this.sendString_(String(n.length));for(let r=0;r<n.length;r++)this.sendString_(n[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(je))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}$e.responsesRequiredToBeHealthy=2,$e.healthyTimeout=3e4;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ve{static get ALL_TRANSPORTS(){return[De,$e]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=$e&&$e["isAvailable"]();let n=t&&!$e.previouslyFailed();if(e.webSocketOnly&&(t||k("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[$e];else{const e=this.transports_=[];for(const t of Ve.ALL_TRANSPORTS)t&&t["isAvailable"]()&&e.push(t);Ve.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ve.globalTransportInitialized_=!1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const qe=6e4,We=5e3,He=10240,ze=102400,Ke="t",Ge="d",Ye="s",Ze="r",Je="e",Xe="o",Qe="a",et="n",tt="p",nt="h";class rt{constructor(e,t,n,r,i,s,o,a,c,l){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=s,this.onReady_=o,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=l,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=E("c:"+this.id+":"),this.transportManager_=new Ve(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e["responsesRequiredToBeHealthy"]||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},Math.floor(0));const r=e["healthyTimeout"]||0;r>0&&(this.healthyTimeout_=Y(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ze?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>He?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{2!==this.state_&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ke in e){const t=e[Ke];t===Qe?this.upgradeIfSecondaryHealthy_():t===Ze?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):t===Xe&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=L("t",e),n=L("d",e);if("c"===t)this.onSecondaryControl_(n);else{if("d"!==t)throw new Error("Unknown protocol layer: "+t);this.pendingDataMessages.push(n)}}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:tt,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Qe,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:et,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=L("t",e),n=L("d",e);"c"===t?this.onControl_(n):"d"===t&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=L(Ke,e);if(Ge in e){const n=e[Ge];if(t===nt){const e={...n};this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if(t===et){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Ye?this.onConnectionShutdown_(n):t===Ze?this.onReset_(n):t===Je?T("Server Error: "+n):t===Xe?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):T("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,0===this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Q!==n&&k("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e["responsesRequiredToBeHealthy"]||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),Y(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(qe))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,1===this.state_?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Y(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(We))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:tt,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==e&&this.rx_!==e||this.close()}onConnectionLost_(e){this.conn_=null,e||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(p.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(e)}close(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{put(e,t,n,r){}merge(e,t,n,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.allowedEvents_=e,this.listeners_={},(0,s.vA)(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let e=0;e<n.length;e++)n[e].callback.apply(n[e].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const r=this.getInitialEvent(e);r&&t.apply(n,r)}off(e,t,n){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===t&&(!n||n===r[i].context))return void r.splice(i,1)}validateEventType_(e){(0,s.vA)(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot extends st{static getInstance(){return new ot}constructor(){super(["online"]),this.online_=!0,"undefined"===typeof window||"undefined"===typeof window.addEventListener||(0,s.jZ)()||(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return(0,s.vA)("online"===e,"Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at=32,ct=768;class lt{constructor(e,t){if(void 0===t){this.pieces_=e.split("/");let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)""!==this.pieces_[t]&&(e+="/"+this.pieces_[t]);return e||"/"}}function ut(){return new lt("")}function ht(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function dt(e){return e.pieces_.length-e.pieceNum_}function ft(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new lt(e.pieces_,t)}function pt(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function mt(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)""!==e.pieces_[n]&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}function gt(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function _t(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new lt(t,0)}function vt(e,t){const n=[];for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);if(t instanceof lt)for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);else{const e=t.split("/");for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new lt(n,0)}function yt(e){return e.pieceNum_>=e.pieces_.length}function wt(e,t){const n=ht(e),r=ht(t);if(null===n)return t;if(n===r)return wt(ft(e),ft(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function bt(e,t){const n=gt(e,0),r=gt(t,0);for(let i=0;i<n.length&&i<r.length;i++){const e=N(n[i],r[i]);if(0!==e)return e}return n.length===r.length?0:n.length<r.length?-1:1}function Ct(e,t){if(dt(e)!==dt(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function It(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(dt(e)>dt(t))return!1;while(n<e.pieces_.length){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}class Et{constructor(e,t){this.errorPrefix_=t,this.parts_=gt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=(0,s.OE)(this.parts_[n]);kt(this)}}function Tt(e,t){e.parts_.length>0&&(e.byteLength_+=1),e.parts_.push(t),e.byteLength_+=(0,s.OE)(t),kt(e)}function St(e){const t=e.parts_.pop();e.byteLength_-=(0,s.OE)(t),e.parts_.length>0&&(e.byteLength_-=1)}function kt(e){if(e.byteLength_>ct)throw new Error(e.errorPrefix_+"has a key path longer than "+ct+" bytes ("+e.byteLength_+").");if(e.parts_.length>at)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+at+") or object contains a cycle "+Pt(e))}function Pt(e){return 0===e.parts_.length?"":"in property '"+e.parts_.join(".")+"'"}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends st{static getInstance(){return new xt}constructor(){let e,t;super(["visible"]),"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document["hidden"]?(t="visibilitychange",e="hidden"):"undefined"!==typeof document["mozHidden"]?(t="mozvisibilitychange",e="mozHidden"):"undefined"!==typeof document["msHidden"]?(t="msvisibilitychange",e="msHidden"):"undefined"!==typeof document["webkitHidden"]&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger("visible",t))},!1)}getInitialEvent(e){return(0,s.vA)("visible"===e,"Unknown event type: "+e),[this.visible_]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=1e3,Rt=3e5,Ot=3e4,Nt=1.3,Mt=3e4,Lt="server_kill",Dt=3;class Ft extends it{constructor(e,t,n,r,i,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=Ft.nextPersistentConnectionId_++,this.log_=E("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=At,this.maxReconnectDelay_=Rt,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c&&!(0,s.$g)())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");xt.getInstance().on("visible",this.onVisible_,this),-1===e.host.indexOf("fblocal")&&ot.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const r=++this.requestNumber_,i={r:r,a:e,b:t};this.log_((0,s.As)(i)),(0,s.vA)(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),n&&(this.requestCBHash_[r]=n)}get(e){this.initConnection_();const t=new s.cY,n={p:e._path.toString(),q:e._queryObject},r={action:"g",request:n,onComplete:e=>{const n=e["d"];"ok"===e["s"]?t.resolve(n):t.reject(n)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),t.promise}listen(e,t,n,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),(0,s.vA)(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),(0,s.vA)(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:t,query:e,tag:n};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(e){const t=e.query,n=t._path.toString(),r=t._queryIdentifier;this.log_("Listen on "+n+" for "+r);const i={p:n},s="q";e.tag&&(i["q"]=t._queryObject,i["t"]=e.tag),i["h"]=e.hashFn(),this.sendRequest(s,i,i=>{const s=i["d"],o=i["s"];Ft.warnOnListenWarnings_(s,t);const a=this.listens.get(n)&&this.listens.get(n).get(r);a===e&&(this.log_("listen response",i),"ok"!==o&&this.removeListen_(n,r),e.onComplete&&e.onComplete(o,s))})}static warnOnListenWarnings_(e,t){if(e&&"object"===typeof e&&(0,s.gR)(e,"w")){const n=(0,s.yw)(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const e='".indexOn": "'+t._queryParams.getIndex().toString()+'"',n=t._path.toString();k(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){const t=e&&40===e.length;(t||(0,s.qc)(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ot)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=(0,s.Cv)(e)?"auth":"gauth",n={cred:e};null===this.authOverride_?n["noauth"]=!0:"object"===typeof this.authOverride_&&(n["authvar"]=this.authOverride_),this.sendRequest(t,n,t=>{const n=t["s"],r=t["d"]||"error";this.authToken_===e&&("ok"===n?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,r))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e["s"],n=e["d"]||"error";"ok"===t?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){const n=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+r),(0,s.vA)(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");const i=this.removeListen_(n,r);i&&this.connected_&&this.sendUnlisten_(n,r,e._queryObject,t)}sendUnlisten_(e,t,n,r){this.log_("Unlisten on "+e+" for "+t);const i={p:e},s="n";r&&(i["q"]=n,i["t"]=r),this.sendRequest(s,i)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,r){const i={p:t,d:n};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,e=>{r&&setTimeout(()=>{r(e["s"],e["d"])},Math.floor(0))})}put(e,t,n,r){this.putInternal("p",e,t,n,r)}merge(e,t,n,r){this.putInternal("m",e,t,n,r)}putInternal(e,t,n,r,i){this.initConnection_();const s={p:t,d:n};void 0!==i&&(s["h"]=i),this.outstandingPuts_.push({action:e,request:s,onComplete:r}),this.outstandingPutCount_++;const o=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(o):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,n=>{this.log_(t+" response",n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,0===this.outstandingPutCount_&&(this.outstandingPuts_=[]),r&&r(n["s"],n["d"])})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,e=>{const t=e["s"];if("ok"!==t){const t=e["d"];this.log_("reportStats","Error sending stats: "+t)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+(0,s.As)(e));const t=e["r"],n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e["b"]))}else{if("error"in e)throw"A server-side error has occurred: "+e["error"];"a"in e&&this.onDataPush_(e["a"],e["b"])}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),"d"===e?this.onDataUpdate_(t["p"],t["d"],!1,t["t"]):"m"===e?this.onDataUpdate_(t["p"],t["d"],!0,t["t"]):"c"===e?this.onListenRevoked_(t["p"],t["q"]):"ac"===e?this.onAuthRevoked_(t["s"],t["d"]):"apc"===e?this.onAppCheckRevoked_(t["s"],t["d"]):"sd"===e?this.onSecurityDebugPacket_(t):T("Unrecognized action received from server: "+(0,s.As)(e)+"\nAre you using the latest client?")}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=(new Date).getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){(0,s.vA)(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=At,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=At,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(this.visible_){if(this.lastConnectionEstablishedTime_){const e=(new Date).getTime()-this.lastConnectionEstablishedTime_;e>Mt&&(this.reconnectDelay_=At),this.lastConnectionEstablishedTime_=null}}else this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=(new Date).getTime();const e=Math.max(0,(new Date).getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Nt)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=(new Date).getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+Ft.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,n())},l=function(e){(0,s.vA)(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(e)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[s,c]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?I("getToken() completed but was canceled"):(I("getToken() completed. Creating connection."),this.authToken_=s&&s.accessToken,this.appCheckToken_=c&&c.token,a=new rt(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,e=>{k(e+" ("+this.repoInfo_.toString()+")"),this.interrupt(Lt)},i))}catch(T){this.log_("Failed to get token: "+T),o||(this.repoInfo_.nodeAdmin&&k(T),c())}}}interrupt(e){I("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){I("Resuming connection for reason: "+e),delete this.interruptReasons_[e],(0,s.Im)(this.interruptReasons_)&&(this.reconnectDelay_=At,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-(new Date).getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map(e=>D(e)).join("$"):"default";const r=this.removeListen_(e,n);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,t){const n=new lt(e).toString();let r;if(this.listens.has(n)){const e=this.listens.get(n);r=e.get(t),e.delete(t),0===e.size&&this.listens.delete(n)}else r=void 0;return r}onAuthRevoked_(e,t){I("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Dt&&(this.reconnectDelay_=Ot,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){I("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Dt&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e["msg"].replace("\n","\nFIREBASE: "))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);while(this.onDisconnectRequestQueue_.length){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";(0,s.$g)()&&(t=this.repoInfo_.nodeAdmin?"admin_node":"node"),e["sdk."+t+"."+l.replace(/\./g,"-")]=1,(0,s.jZ)()?e["framework.cordova"]=1:(0,s.lV)()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ot.getInstance().currentlyOnline();return(0,s.Im)(this.interruptReasons_)&&e}}Ft.nextPersistentConnectionId_=0,Ft.nextConnectionId_=0;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ut{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new Ut(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new Ut(R,e),r=new Ut(R,t);return 0!==this.compare(n,r)}minPost(){return Ut.MIN}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bt;class $t extends jt{static get __EMPTY_NODE(){return Bt}static set __EMPTY_NODE(e){Bt=e}compare(e,t){return N(e.name,t.name)}isDefinedOn(e){throw(0,s.Hk)("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return Ut.MIN}maxPost(){return new Ut(O,Bt)}makePost(e,t){return(0,s.vA)("string"===typeof e,"KeyIndex indexValue must always be a string."),new Ut(e,Bt)}toString(){return".key"}}const Vt=new $t;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t,n,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let s=1;while(!e.isEmpty())if(s=t?n(e.key,t):1,r&&(s*=-1),s<0)e=this.isReverse_?e.left:e.right;else{if(0===s){this.nodeStack_.push(e);break}this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}}getNext(){if(0===this.nodeStack_.length)return null;let e,t=this.nodeStack_.pop();if(e=this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value},this.isReverse_){t=t.left;while(!t.isEmpty())this.nodeStack_.push(t),t=t.right}else{t=t.right;while(!t.isEmpty())this.nodeStack_.push(t),t=t.left}return e}hasNext(){return this.nodeStack_.length>0}peek(){if(0===this.nodeStack_.length)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Wt{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:Wt.RED,this.left=null!=r?r:zt.EMPTY_NODE,this.right=null!=i?i:zt.EMPTY_NODE}copy(e,t,n,r,i){return new Wt(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return zt.EMPTY_NODE;let e=this;return e.left.isRed_()||e.left.left.isRed_()||(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,r;if(n=this,t(e,n.key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===t(e,n.key)){if(n.right.isEmpty())return zt.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Wt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Wt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Wt.RED=!0,Wt.BLACK=!1;class Ht{copy(e,t,n,r,i){return this}insert(e,t,n){return new Wt(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class zt{constructor(e,t=zt.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new zt(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Wt.BLACK,null,null))}remove(e){return new zt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Wt.BLACK,null,null))}get(e){let t,n=this.root_;while(!n.isEmpty()){if(t=this.comparator_(e,n.key),0===t)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,r=null;while(!n.isEmpty()){if(t=this.comparator_(e,n.key),0===t){if(n.left.isEmpty())return r?r.key:null;n=n.left;while(!n.right.isEmpty())n=n.right;return n.key}t<0?n=n.left:t>0&&(r=n,n=n.right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new qt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new qt(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new qt(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new qt(this.root_,null,this.comparator_,!0,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Kt(e,t){return N(e.name,t.name)}function Gt(e,t){return N(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yt;function Zt(e){Yt=e}zt.EMPTY_NODE=new Ht;const Jt=function(e){return"number"===typeof e?"number:"+j(e):"string:"+e},Xt=function(e){if(e.isLeafNode()){const t=e.val();(0,s.vA)("string"===typeof t||"number"===typeof t||"object"===typeof t&&(0,s.gR)(t,".sv"),"Priority must be a string or number.")}else(0,s.vA)(e===Yt||e.isEmpty(),"priority of unexpected type.");(0,s.vA)(e===Yt||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Qt,en,tn;class nn{static set __childrenNodeConstructor(e){Qt=e}static get __childrenNodeConstructor(){return Qt}constructor(e,t=nn.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,(0,s.vA)(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),Xt(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new nn(this.value_,e)}getImmediateChild(e){return".priority"===e?this.priorityNode_:nn.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return yt(e)?this:".priority"===ht(e)?this.priorityNode_:nn.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return".priority"===e?this.updatePriority(t):t.isEmpty()&&".priority"!==e?this:nn.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=ht(e);return null===n?t:t.isEmpty()&&".priority"!==n?this:((0,s.vA)(".priority"!==n||1===dt(e),".priority must be the last token in a path"),this.updateImmediateChild(n,nn.__childrenNodeConstructor.EMPTY_NODE.updateChild(ft(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(null===this.lazyHash_){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Jt(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",e+="number"===t?j(this.value_):this.value_,this.lazyHash_=v(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===nn.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof nn.__childrenNodeConstructor?-1:((0,s.vA)(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,r=nn.VALUE_TYPE_ORDER.indexOf(t),i=nn.VALUE_TYPE_ORDER.indexOf(n);return(0,s.vA)(r>=0,"Unknown leaf type: "+t),(0,s.vA)(i>=0,"Unknown leaf type: "+n),r===i?"object"===n?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}return!1}}function rn(e){en=e}function sn(e){tn=e}nn.VALUE_TYPE_ORDER=["object","boolean","number","string"];class on extends jt{compare(e,t){const n=e.node.getPriority(),r=t.node.getPriority(),i=n.compareTo(r);return 0===i?N(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return Ut.MIN}maxPost(){return new Ut(O,new nn("[PRIORITY-POST]",tn))}makePost(e,t){const n=en(e);return new Ut(t,new nn("[PRIORITY-POST]",n))}toString(){return".priority"}}const an=new on,cn=Math.log(2);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e){const t=e=>parseInt(Math.log(e)/cn,10),n=e=>parseInt(Array(e+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const r=n(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const un=function(e,t,n,r){e.sort(t);const i=function(t,r){const s=r-t;let o,a;if(0===s)return null;if(1===s)return o=e[t],a=n?n(o):o,new Wt(a,o.node,Wt.BLACK,null,null);{const c=parseInt(s/2,10)+t,l=i(t,c),u=i(c+1,r);return o=e[c],a=n?n(o):o,new Wt(a,o.node,Wt.BLACK,l,u)}},s=function(t){let r=null,s=null,o=e.length;const a=function(t,r){const s=o-t,a=o;o-=t;const l=i(s+1,a),u=e[s],h=n?n(u):u;c(new Wt(h,u.node,r,null,l))},c=function(e){r?(r.left=e,r=e):(s=e,r=e)};for(let e=0;e<t.count;++e){const n=t.nextBitIsOne(),r=Math.pow(2,t.count-(e+1));n?a(r,Wt.BLACK):(a(r,Wt.BLACK),a(r,Wt.RED))}return s},o=new ln(e.length),a=s(o);return new zt(r||t,a)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hn;const dn={};class fn{static get Default(){return(0,s.vA)(dn&&an,"ChildrenNode.ts has not been loaded"),hn=hn||new fn({".priority":dn},{".priority":an}),hn}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=(0,s.yw)(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof zt?t:null}hasIndex(e){return(0,s.gR)(this.indexSet_,e.toString())}addIndex(e,t){(0,s.vA)(e!==Vt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let r=!1;const i=t.getIterator(Ut.Wrap);let o,a=i.getNext();while(a)r=r||e.isDefinedOn(a.node),n.push(a),a=i.getNext();o=r?un(n,e.getCompare()):dn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=o,new fn(u,l)}addToIndexes(e,t){const n=(0,s.kH)(this.indexes_,(n,r)=>{const i=(0,s.yw)(this.indexSet_,r);if((0,s.vA)(i,"Missing index implementation for "+r),n===dn){if(i.isDefinedOn(e.node)){const n=[],r=t.getIterator(Ut.Wrap);let s=r.getNext();while(s)s.name!==e.name&&n.push(s),s=r.getNext();return n.push(e),un(n,i.getCompare())}return dn}{const r=t.get(e.name);let i=n;return r&&(i=i.remove(new Ut(e.name,r))),i.insert(e,e.node)}});return new fn(n,this.indexSet_)}removeFromIndexes(e,t){const n=(0,s.kH)(this.indexes_,n=>{if(n===dn)return n;{const r=t.get(e.name);return r?n.remove(new Ut(e.name,r)):n}});return new fn(n,this.indexSet_)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pn;class mn{static get EMPTY_NODE(){return pn||(pn=new mn(new zt(Gt),null,fn.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Xt(this.priorityNode_),this.children_.isEmpty()&&(0,s.vA)(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||pn}updatePriority(e){return this.children_.isEmpty()?this:new mn(this.children_,e,this.indexMap_)}getImmediateChild(e){if(".priority"===e)return this.getPriority();{const t=this.children_.get(e);return null===t?pn:t}}getChild(e){const t=ht(e);return null===t?this:this.getImmediateChild(t).getChild(ft(e))}hasChild(e){return null!==this.children_.get(e)}updateImmediateChild(e,t){if((0,s.vA)(t,"We should always be passing snapshot nodes"),".priority"===e)return this.updatePriority(t);{const n=new Ut(e,t);let r,i;t.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(n,this.children_)):(r=this.children_.insert(e,t),i=this.indexMap_.addToIndexes(n,this.children_));const s=r.isEmpty()?pn:this.priorityNode_;return new mn(r,s,i)}}updateChild(e,t){const n=ht(e);if(null===n)return t;{(0,s.vA)(".priority"!==ht(e)||1===dt(e),".priority must be the last token in a path");const r=this.getImmediateChild(n).updateChild(ft(e),t);return this.updateImmediateChild(n,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,r=0,i=!0;if(this.forEachChild(an,(s,o)=>{t[s]=o.val(e),n++,i&&mn.INTEGER_REGEXP_.test(s)?r=Math.max(r,Number(s)):i=!1}),!e&&i&&r<2*n){const e=[];for(const n in t)e[n]=t[n];return e}return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(null===this.lazyHash_){let e="";this.getPriority().isEmpty()||(e+="priority:"+Jt(this.getPriority().val())+":"),this.forEachChild(an,(t,n)=>{const r=n.hash();""!==r&&(e+=":"+t+":"+r)}),this.lazyHash_=""===e?"":v(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const r=this.resolveIndex_(n);if(r){const n=r.getPredecessorKey(new Ut(e,t));return n?n.name:null}return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.minKey();return e&&e.name}return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new Ut(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.maxKey();return e&&e.name}return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new Ut(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal(e=>t(e.name,e.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,e=>e);{const n=this.children_.getIteratorFrom(e.name,Ut.Wrap);let r=n.peek();while(null!=r&&t.compare(r,e)<0)n.getNext(),r=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,e=>e);{const n=this.children_.getReverseIteratorFrom(e.name,Ut.Wrap);let r=n.peek();while(null!=r&&t.compare(r,e)>0)n.getNext(),r=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===_n?-1:0}withIndex(e){if(e===Vt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new mn(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Vt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority())){if(this.children_.count()===t.children_.count()){const e=this.getIterator(an),n=t.getIterator(an);let r=e.getNext(),i=n.getNext();while(r&&i){if(r.name!==i.name||!r.node.equals(i.node))return!1;r=e.getNext(),i=n.getNext()}return null===r&&null===i}return!1}return!1}}resolveIndex_(e){return e===Vt?null:this.indexMap_.get(e.toString())}}mn.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class gn extends mn{constructor(){super(new zt(Gt),mn.EMPTY_NODE,fn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return mn.EMPTY_NODE}isEmpty(){return!1}}const _n=new gn;Object.defineProperties(Ut,{MIN:{value:new Ut(R,mn.EMPTY_NODE)},MAX:{value:new Ut(O,_n)}}),$t.__EMPTY_NODE=mn.EMPTY_NODE,nn.__childrenNodeConstructor=mn,Zt(_n),sn(_n);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const vn=!0;function yn(e,t=null){if(null===e)return mn.EMPTY_NODE;if("object"===typeof e&&".priority"in e&&(t=e[".priority"]),(0,s.vA)(null===t||"string"===typeof t||"number"===typeof t||"object"===typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"===typeof e&&".value"in e&&null!==e[".value"]&&(e=e[".value"]),"object"!==typeof e||".sv"in e){const n=e;return new nn(n,yn(t))}if(e instanceof Array||!vn){let n=mn.EMPTY_NODE;return U(e,(t,r)=>{if((0,s.gR)(e,t)&&"."!==t.substring(0,1)){const e=yn(r);!e.isLeafNode()&&e.isEmpty()||(n=n.updateImmediateChild(t,e))}}),n.updatePriority(yn(t))}{const n=[];let r=!1;const i=e;if(U(i,(e,t)=>{if("."!==e.substring(0,1)){const i=yn(t);i.isEmpty()||(r=r||!i.getPriority().isEmpty(),n.push(new Ut(e,i)))}}),0===n.length)return mn.EMPTY_NODE;const s=un(n,Kt,e=>e.name,Gt);if(r){const e=un(n,an.getCompare());return new mn(s,yn(t),new fn({".priority":e},{".priority":an}))}return new mn(s,yn(t),fn.Default)}}rn(yn);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wn extends jt{constructor(e){super(),this.indexPath_=e,(0,s.vA)(!yt(e)&&".priority"!==ht(e),"Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),r=this.extractChild(t.node),i=n.compareTo(r);return 0===i?N(e.name,t.name):i}makePost(e,t){const n=yn(e),r=mn.EMPTY_NODE.updateChild(this.indexPath_,n);return new Ut(t,r)}maxPost(){const e=mn.EMPTY_NODE.updateChild(this.indexPath_,_n);return new Ut(O,e)}toString(){return gt(this.indexPath_,0).join("/")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn extends jt{compare(e,t){const n=e.node.compareTo(t.node);return 0===n?N(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return Ut.MIN}maxPost(){return Ut.MAX}makePost(e,t){const n=yn(e);return new Ut(t,n)}toString(){return".value"}}const Cn=new bn;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(e){return{type:"value",snapshotNode:e}}function En(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function Tn(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function Sn(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}function kn(e,t){return{type:"child_moved",snapshotNode:t,childName:e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(e){this.index_=e}updateChild(e,t,n,r,i,o){(0,s.vA)(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(r).equals(n.getChild(r))&&a.isEmpty()===n.isEmpty()?e:(null!=o&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(Tn(t,a)):(0,s.vA)(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(En(t,n)):o.trackChildChange(Sn(t,n,a))),e.isLeafNode()&&n.isEmpty()?e:e.updateImmediateChild(t,n).withIndex(this.index_))}updateFullNode(e,t,n){return null!=n&&(e.isLeafNode()||e.forEachChild(an,(e,r)=>{t.hasChild(e)||n.trackChildChange(Tn(e,r))}),t.isLeafNode()||t.forEachChild(an,(t,r)=>{if(e.hasChild(t)){const i=e.getImmediateChild(t);i.equals(r)||n.trackChildChange(Sn(t,r,i))}else n.trackChildChange(En(t,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?mn.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e){this.indexedFilter_=new Pn(e.getIndex()),this.index_=e.getIndex(),this.startPost_=xn.getStartPost_(e),this.endPost_=xn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,r,i,s){return this.matches(new Ut(t,n))||(n=mn.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,r,i,s)}updateFullNode(e,t,n){t.isLeafNode()&&(t=mn.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(mn.EMPTY_NODE);const i=this;return t.forEachChild(an,(e,t)=>{i.matches(new Ut(e,t))||(r=r.updateImmediateChild(e,mn.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}return e.getIndex().maxPost()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{const t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{const t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new xn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,r,i,s){return this.rangedFilter_.matches(new Ut(t,n))||(n=mn.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,r,i,s):this.fullLimitUpdateChild_(e,t,n,i,s)}updateFullNode(e,t,n){let r;if(t.isLeafNode()||t.isEmpty())r=mn.EMPTY_NODE.withIndex(this.index_);else if(2*this.limit_<t.numChildren()&&t.isIndexed(this.index_)){let e;r=mn.EMPTY_NODE.withIndex(this.index_),e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;while(e.hasNext()&&n<this.limit_){const t=e.getNext();if(this.withinDirectionalStart(t)){if(!this.withinDirectionalEnd(t))break;r=r.updateImmediateChild(t.name,t.node),n++}}}else{let e;r=t.withIndex(this.index_),r=r.updatePriority(mn.EMPTY_NODE),e=this.reverse_?r.getReverseIterator(this.index_):r.getIterator(this.index_);let n=0;while(e.hasNext()){const t=e.getNext(),i=n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t);i?n++:r=r.updateImmediateChild(t.name,mn.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,r,i){let o;if(this.reverse_){const e=this.index_.getCompare();o=(t,n)=>e(n,t)}else o=this.index_.getCompare();const a=e;(0,s.vA)(a.numChildren()===this.limit_,"");const c=new Ut(t,n),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(t)){const e=a.getImmediateChild(t);let s=r.getChildAfterChild(this.index_,l,this.reverse_);while(null!=s&&(s.name===t||a.hasChild(s.name)))s=r.getChildAfterChild(this.index_,s,this.reverse_);const h=null==s?1:o(s,c),d=u&&!n.isEmpty()&&h>=0;if(d)return null!=i&&i.trackChildChange(Sn(t,n,e)),a.updateImmediateChild(t,n);{null!=i&&i.trackChildChange(Tn(t,e));const n=a.updateImmediateChild(t,mn.EMPTY_NODE),r=null!=s&&this.rangedFilter_.matches(s);return r?(null!=i&&i.trackChildChange(En(s.name,s.node)),n.updateImmediateChild(s.name,s.node)):n}}return n.isEmpty()?e:u&&o(l,c)>=0?(null!=i&&(i.trackChildChange(Tn(l.name,l.node)),i.trackChildChange(En(t,n))),a.updateImmediateChild(t,n).updateImmediateChild(l.name,mn.EMPTY_NODE)):e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=an}hasStart(){return this.startSet_}isViewFromLeft(){return""===this.viewFrom_?this.startSet_:"l"===this.viewFrom_}getIndexStartValue(){return(0,s.vA)(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return(0,s.vA)(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:R}hasEnd(){return this.endSet_}getIndexEndValue(){return(0,s.vA)(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return(0,s.vA)(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:O}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&""!==this.viewFrom_}getLimit(){return(0,s.vA)(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===an}copy(){const e=new Rn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function On(e){return e.loadsAllData()?new Pn(e.getIndex()):e.hasLimit()?new An(e):new xn(e)}function Nn(e){const t={};if(e.isDefault())return t;let n;if(e.index_===an?n="$priority":e.index_===Cn?n="$value":e.index_===Vt?n="$key":((0,s.vA)(e.index_ instanceof wn,"Unrecognized index type!"),n=e.index_.toString()),t["orderBy"]=(0,s.As)(n),e.startSet_){const n=e.startAfterSet_?"startAfter":"startAt";t[n]=(0,s.As)(e.indexStartValue_),e.startNameSet_&&(t[n]+=","+(0,s.As)(e.indexStartName_))}if(e.endSet_){const n=e.endBeforeSet_?"endBefore":"endAt";t[n]=(0,s.As)(e.indexEndValue_),e.endNameSet_&&(t[n]+=","+(0,s.As)(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t["limitToFirst"]=e.limit_:t["limitToLast"]=e.limit_),t}function Mn(e){const t={};if(e.startSet_&&(t["sp"]=e.indexStartValue_,e.startNameSet_&&(t["sn"]=e.indexStartName_),t["sin"]=!e.startAfterSet_),e.endSet_&&(t["ep"]=e.indexEndValue_,e.endNameSet_&&(t["en"]=e.indexEndName_),t["ein"]=!e.endBeforeSet_),e.limitSet_){t["l"]=e.limit_;let n=e.viewFrom_;""===n&&(n=e.isViewFromLeft()?"l":"r"),t["vf"]=n}return e.index_!==an&&(t["i"]=e.index_.toString()),t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln extends it{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return void 0!==t?"tag$"+t:((0,s.vA)(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=r,this.log_=E("p:rest:"),this.listens_={}}listen(e,t,n,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Ln.getListenId_(e,n),a={};this.listens_[o]=a;const c=Nn(e._queryParams);this.restRequest_(i+".json",c,(e,t)=>{let c=t;if(404===e&&(c=null,e=null),null===e&&this.onDataUpdate_(i,c,!1,n),(0,s.yw)(this.listens_,o)===a){let t;t=e?401===e?"permission_denied":"rest_error:"+e:"ok",r(t,null)}})}unlisten(e,t){const n=Ln.getListenId_(e,t);delete this.listens_[n]}get(e){const t=Nn(e._queryParams),n=e._path.toString(),r=new s.cY;return this.restRequest_(n+".json",t,(e,t)=>{let i=t;404===e&&(i=null,e=null),null===e?(this.onDataUpdate_(n,i,!1,null),r.resolve(i)):r.reject(new Error(i))}),r.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t["format"]="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(t["auth"]=r.accessToken),i&&i.token&&(t["ac"]=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+(0,s.Am)(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(n&&4===a.readyState){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let t=null;if(a.status>=200&&a.status<300){try{t=(0,s.$L)(a.responseText)}catch(e){k("Failed to parse JSON response for "+o+": "+a.responseText)}n(null,t)}else 401!==a.status&&404!==a.status&&k("Got unsuccessful REST response for "+o+" Status: "+a.status),n(a.status);n=null}},a.open("GET",o,!0),a.send()})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(){this.rootNode_=mn.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(){return{value:null,children:new Map}}function Un(e,t,n){if(yt(t))e.value=n,e.children.clear();else if(null!==e.value)e.value=e.value.updateChild(t,n);else{const r=ht(t);e.children.has(r)||e.children.set(r,Fn());const i=e.children.get(r);t=ft(t),Un(i,t,n)}}function jn(e,t){if(yt(t))return e.value=null,e.children.clear(),!0;if(null!==e.value){if(e.value.isLeafNode())return!1;{const n=e.value;return e.value=null,n.forEachChild(an,(t,n)=>{Un(e,new lt(t),n)}),jn(e,t)}}if(e.children.size>0){const n=ht(t);if(t=ft(t),e.children.has(n)){const r=jn(e.children.get(n),t);r&&e.children.delete(n)}return 0===e.children.size}return!0}function Bn(e,t,n){null!==e.value?n(t,e.value):$n(e,(e,r)=>{const i=new lt(t.toString()+"/"+e);Bn(r,i,n)})}function $n(e,t){e.children.forEach((e,n)=>{t(n,e)})}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&U(this.last_,(e,n)=>{t[e]=t[e]-n}),this.last_=e,t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn=1e4,Wn=3e4,Hn=3e5;class zn{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Vn(e);const n=qn+(Wn-qn)*Math.random();Y(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;U(e,(e,r)=>{r>0&&(0,s.gR)(this.statsToReport_,e)&&(t[e]=r,n=!0)}),n&&this.server_.reportStats(t),Y(this.reportStats_.bind(this),Math.floor(2*Math.random()*Hn))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Kn;function Gn(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Yn(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Zn(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(e){e[e["OVERWRITE"]=0]="OVERWRITE",e[e["MERGE"]=1]="MERGE",e[e["ACK_USER_WRITE"]=2]="ACK_USER_WRITE",e[e["LISTEN_COMPLETE"]=3]="LISTEN_COMPLETE"})(Kn||(Kn={}));class Jn{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=Kn.ACK_USER_WRITE,this.source=Gn()}operationForChild(e){if(yt(this.path)){if(null!=this.affectedTree.value)return(0,s.vA)(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new lt(e));return new Jn(ut(),t,this.revert)}}return(0,s.vA)(ht(this.path)===e,"operationForChild called for unrelated child."),new Jn(ft(this.path),this.affectedTree,this.revert)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e,t){this.source=e,this.path=t,this.type=Kn.LISTEN_COMPLETE}operationForChild(e){return yt(this.path)?new Xn(this.source,ut()):new Xn(this.source,ft(this.path))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=Kn.OVERWRITE}operationForChild(e){return yt(this.path)?new Qn(this.source,ut(),this.snap.getImmediateChild(e)):new Qn(this.source,ft(this.path),this.snap)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=Kn.MERGE}operationForChild(e){if(yt(this.path)){const t=this.children.subtree(new lt(e));return t.isEmpty()?null:t.value?new Qn(this.source,ut(),t.value):new er(this.source,ut(),t)}return(0,s.vA)(ht(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new er(this.source,ft(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(yt(e))return this.isFullyInitialized()&&!this.filtered_;const t=ht(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function rr(e,t,n,r){const i=[],s=[];return t.forEach(t=>{"child_changed"===t.type&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&s.push(kn(t.childName,t.snapshotNode))}),ir(e,i,"child_removed",t,r,n),ir(e,i,"child_added",t,r,n),ir(e,i,"child_moved",s,r,n),ir(e,i,"child_changed",t,r,n),ir(e,i,"value",t,r,n),i}function ir(e,t,n,r,i,s){const o=r.filter(e=>e.type===n);o.sort((t,n)=>or(e,t,n)),o.forEach(n=>{const r=sr(e,n,s);i.forEach(i=>{i.respondsTo(n.type)&&t.push(i.createEvent(r,e.query_))})})}function sr(e,t,n){return"value"===t.type||"child_removed"===t.type||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}function or(e,t,n){if(null==t.childName||null==n.childName)throw(0,s.Hk)("Should only compare child_ events.");const r=new Ut(t.childName,t.snapshotNode),i=new Ut(n.childName,n.snapshotNode);return e.index_.compare(r,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ar(e,t){return{eventCache:e,serverCache:t}}function cr(e,t,n,r){return ar(new tr(t,n,r),e.serverCache)}function lr(e,t,n,r){return ar(e.eventCache,new tr(t,n,r))}function ur(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function hr(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dr;const fr=()=>(dr||(dr=new zt(M)),dr);class pr{static fromObject(e){let t=new pr(null);return U(e,(e,n)=>{t=t.set(new lt(e),n)}),t}constructor(e,t=fr()){this.value=e,this.children=t}isEmpty(){return null===this.value&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(null!=this.value&&t(this.value))return{path:ut(),value:this.value};if(yt(e))return null;{const n=ht(e),r=this.children.get(n);if(null!==r){const i=r.findRootMostMatchingPathAndValue(ft(e),t);if(null!=i){const e=vt(new lt(n),i.path);return{path:e,value:i.value}}return null}return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(yt(e))return this;{const t=ht(e),n=this.children.get(t);return null!==n?n.subtree(ft(e)):new pr(null)}}set(e,t){if(yt(e))return new pr(t,this.children);{const n=ht(e),r=this.children.get(n)||new pr(null),i=r.set(ft(e),t),s=this.children.insert(n,i);return new pr(this.value,s)}}remove(e){if(yt(e))return this.children.isEmpty()?new pr(null):new pr(null,this.children);{const t=ht(e),n=this.children.get(t);if(n){const r=n.remove(ft(e));let i;return i=r.isEmpty()?this.children.remove(t):this.children.insert(t,r),null===this.value&&i.isEmpty()?new pr(null):new pr(this.value,i)}return this}}get(e){if(yt(e))return this.value;{const t=ht(e),n=this.children.get(t);return n?n.get(ft(e)):null}}setTree(e,t){if(yt(e))return t;{const n=ht(e),r=this.children.get(n)||new pr(null),i=r.setTree(ft(e),t);let s;return s=i.isEmpty()?this.children.remove(n):this.children.insert(n,i),new pr(this.value,s)}}fold(e){return this.fold_(ut(),e)}fold_(e,t){const n={};return this.children.inorderTraversal((r,i)=>{n[r]=i.fold_(vt(e,r),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,ut(),t)}findOnPath_(e,t,n){const r=!!this.value&&n(t,this.value);if(r)return r;if(yt(e))return null;{const r=ht(e),i=this.children.get(r);return i?i.findOnPath_(ft(e),vt(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ut(),t)}foreachOnPath_(e,t,n){if(yt(e))return this;{this.value&&n(t,this.value);const r=ht(e),i=this.children.get(r);return i?i.foreachOnPath_(ft(e),vt(t,r),n):new pr(null)}}foreach(e){this.foreach_(ut(),e)}foreach_(e,t){this.children.inorderTraversal((n,r)=>{r.foreach_(vt(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e){this.writeTree_=e}static empty(){return new mr(new pr(null))}}function gr(e,t,n){if(yt(t))return new mr(new pr(n));{const r=e.writeTree_.findRootMostValueAndPath(t);if(null!=r){const i=r.path;let s=r.value;const o=wt(i,t);return s=s.updateChild(o,n),new mr(e.writeTree_.set(i,s))}{const r=new pr(n),i=e.writeTree_.setTree(t,r);return new mr(i)}}}function _r(e,t,n){let r=e;return U(n,(e,n)=>{r=gr(r,vt(t,e),n)}),r}function vr(e,t){if(yt(t))return mr.empty();{const n=e.writeTree_.setTree(t,new pr(null));return new mr(n)}}function yr(e,t){return null!=wr(e,t)}function wr(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return null!=n?e.writeTree_.get(n.path).getChild(wt(n.path,t)):null}function br(e){const t=[],n=e.writeTree_.value;return null!=n?n.isLeafNode()||n.forEachChild(an,(e,n)=>{t.push(new Ut(e,n))}):e.writeTree_.children.inorderTraversal((e,n)=>{null!=n.value&&t.push(new Ut(e,n.value))}),t}function Cr(e,t){if(yt(t))return e;{const n=wr(e,t);return new mr(null!=n?new pr(n):e.writeTree_.subtree(t))}}function Ir(e){return e.writeTree_.isEmpty()}function Er(e,t){return Tr(ut(),e.writeTree_,t)}function Tr(e,t,n){if(null!=t.value)return n.updateChild(e,t.value);{let r=null;return t.children.inorderTraversal((t,i)=>{".priority"===t?((0,s.vA)(null!==i.value,"Priority writes must always be leaf nodes"),r=i.value):n=Tr(vt(e,t),i,n)}),n.getChild(e).isEmpty()||null===r||(n=n.updateChild(vt(e,".priority"),r)),n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sr(e,t){return Yr(t,e)}function kr(e,t,n,r,i){(0,s.vA)(r>e.lastWriteId,"Stacking an older write on top of newer ones"),void 0===i&&(i=!0),e.allWrites.push({path:t,snap:n,writeId:r,visible:i}),i&&(e.visibleWrites=gr(e.visibleWrites,t,n)),e.lastWriteId=r}function Pr(e,t,n,r){(0,s.vA)(r>e.lastWriteId,"Stacking an older merge on top of newer ones"),e.allWrites.push({path:t,children:n,writeId:r,visible:!0}),e.visibleWrites=_r(e.visibleWrites,t,n),e.lastWriteId=r}function xr(e,t){for(let n=0;n<e.allWrites.length;n++){const r=e.allWrites[n];if(r.writeId===t)return r}return null}function Ar(e,t){const n=e.allWrites.findIndex(e=>e.writeId===t);(0,s.vA)(n>=0,"removeWrite called with nonexistent writeId.");const r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,o=!1,a=e.allWrites.length-1;while(i&&a>=0){const t=e.allWrites[a];t.visible&&(a>=n&&Rr(t,r.path)?i=!1:It(r.path,t.path)&&(o=!0)),a--}if(i){if(o)return Or(e),!0;if(r.snap)e.visibleWrites=vr(e.visibleWrites,r.path);else{const t=r.children;U(t,t=>{e.visibleWrites=vr(e.visibleWrites,vt(r.path,t))})}return!0}return!1}function Rr(e,t){if(e.snap)return It(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&It(vt(e.path,n),t))return!0;return!1}function Or(e){e.visibleWrites=Mr(e.allWrites,Nr,ut()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}function Nr(e){return e.visible}function Mr(e,t,n){let r=mr.empty();for(let i=0;i<e.length;++i){const o=e[i];if(t(o)){const e=o.path;let t;if(o.snap)It(n,e)?(t=wt(n,e),r=gr(r,t,o.snap)):It(e,n)&&(t=wt(e,n),r=gr(r,ut(),o.snap.getChild(t)));else{if(!o.children)throw(0,s.Hk)("WriteRecord should have .snap or .children");if(It(n,e))t=wt(n,e),r=_r(r,t,o.children);else if(It(e,n))if(t=wt(e,n),yt(t))r=_r(r,ut(),o.children);else{const e=(0,s.yw)(o.children,ht(t));if(e){const n=e.getChild(ft(t));r=gr(r,ut(),n)}}}}}return r}function Lr(e,t,n,r,i){if(r||i){const s=Cr(e.visibleWrites,t);if(!i&&Ir(s))return n;if(i||null!=n||yr(s,ut())){const s=function(e){return(e.visible||i)&&(!r||!~r.indexOf(e.writeId))&&(It(e.path,t)||It(t,e.path))},o=Mr(e.allWrites,s,t),a=n||mn.EMPTY_NODE;return Er(o,a)}return null}{const r=wr(e.visibleWrites,t);if(null!=r)return r;{const r=Cr(e.visibleWrites,t);if(Ir(r))return n;if(null!=n||yr(r,ut())){const e=n||mn.EMPTY_NODE;return Er(r,e)}return null}}}function Dr(e,t,n){let r=mn.EMPTY_NODE;const i=wr(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(an,(e,t)=>{r=r.updateImmediateChild(e,t)}),r;if(n){const i=Cr(e.visibleWrites,t);return n.forEachChild(an,(e,t)=>{const n=Er(Cr(i,new lt(e)),t);r=r.updateImmediateChild(e,n)}),br(i).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}{const n=Cr(e.visibleWrites,t);return br(n).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}}function Fr(e,t,n,r,i){(0,s.vA)(r||i,"Either existingEventSnap or existingServerSnap must exist");const o=vt(t,n);if(yr(e.visibleWrites,o))return null;{const t=Cr(e.visibleWrites,o);return Ir(t)?i.getChild(n):Er(t,i.getChild(n))}}function Ur(e,t,n,r){const i=vt(t,n),s=wr(e.visibleWrites,i);if(null!=s)return s;if(r.isCompleteForChild(n)){const t=Cr(e.visibleWrites,i);return Er(t,r.getNode().getImmediateChild(n))}return null}function jr(e,t){return wr(e.visibleWrites,t)}function Br(e,t,n,r,i,s,o){let a;const c=Cr(e.visibleWrites,t),l=wr(c,ut());if(null!=l)a=l;else{if(null==n)return[];a=Er(c,n)}if(a=a.withIndex(o),a.isEmpty()||a.isLeafNode())return[];{const e=[],t=o.getCompare(),n=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let c=n.getNext();while(c&&e.length<i)0!==t(c,r)&&e.push(c),c=n.getNext();return e}}function $r(){return{visibleWrites:mr.empty(),allWrites:[],lastWriteId:-1}}function Vr(e,t,n,r){return Lr(e.writeTree,e.treePath,t,n,r)}function qr(e,t){return Dr(e.writeTree,e.treePath,t)}function Wr(e,t,n,r){return Fr(e.writeTree,e.treePath,t,n,r)}function Hr(e,t){return jr(e.writeTree,vt(e.treePath,t))}function zr(e,t,n,r,i,s){return Br(e.writeTree,e.treePath,t,n,r,i,s)}function Kr(e,t,n){return Ur(e.writeTree,e.treePath,t,n)}function Gr(e,t){return Yr(vt(e.treePath,t),e.writeTree)}function Yr(e,t){return{treePath:e,writeTree:t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;(0,s.vA)("child_added"===t||"child_changed"===t||"child_removed"===t,"Only child changes supported for tracking"),(0,s.vA)(".priority"!==n,"Only non-priority child changes can be tracked.");const r=this.changeMap.get(n);if(r){const i=r.type;if("child_added"===t&&"child_removed"===i)this.changeMap.set(n,Sn(n,e.snapshotNode,r.snapshotNode));else if("child_removed"===t&&"child_added"===i)this.changeMap.delete(n);else if("child_removed"===t&&"child_changed"===i)this.changeMap.set(n,Tn(n,r.oldSnap));else if("child_changed"===t&&"child_added"===i)this.changeMap.set(n,En(n,e.snapshotNode));else{if("child_changed"!==t||"child_changed"!==i)throw(0,s.Hk)("Illegal combination of changes: "+e+" occurred after "+r);this.changeMap.set(n,Sn(n,e.snapshotNode,r.oldSnap))}}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}}const Xr=new Jr;class Qr{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const t=null!=this.optCompleteServerCache_?new tr(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Kr(this.writes_,e,t)}}getChildAfterChild(e,t,n){const r=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:hr(this.viewCache_),i=zr(this.writes_,r,t,1,n,e);return 0===i.length?null:i[0]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(e){return{filter:e}}function ti(e,t){(0,s.vA)(t.eventCache.getNode().isIndexed(e.filter.getIndex()),"Event snap not indexed"),(0,s.vA)(t.serverCache.getNode().isIndexed(e.filter.getIndex()),"Server snap not indexed")}function ni(e,t,n,r,i){const o=new Zr;let a,c;if(n.type===Kn.OVERWRITE){const l=n;l.source.fromUser?a=oi(e,t,l.path,l.snap,r,i,o):((0,s.vA)(l.source.fromServer,"Unknown source."),c=l.source.tagged||t.serverCache.isFiltered()&&!yt(l.path),a=si(e,t,l.path,l.snap,r,i,c,o))}else if(n.type===Kn.MERGE){const l=n;l.source.fromUser?a=ci(e,t,l.path,l.children,r,i,o):((0,s.vA)(l.source.fromServer,"Unknown source."),c=l.source.tagged||t.serverCache.isFiltered(),a=ui(e,t,l.path,l.children,r,i,c,o))}else if(n.type===Kn.ACK_USER_WRITE){const s=n;a=s.revert?fi(e,t,s.path,r,i,o):hi(e,t,s.path,s.affectedTree,r,i,o)}else{if(n.type!==Kn.LISTEN_COMPLETE)throw(0,s.Hk)("Unknown operation type: "+n.type);a=di(e,t,n.path,r,o)}const l=o.getChanges();return ri(t,a,l),{viewCache:a,changes:l}}function ri(e,t,n){const r=t.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=ur(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push(In(ur(t)))}}function ii(e,t,n,r,i,o){const a=t.eventCache;if(null!=Hr(r,n))return t;{let c,l;if(yt(n))if((0,s.vA)(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const n=hr(t),i=n instanceof mn?n:mn.EMPTY_NODE,s=qr(r,i);c=e.filter.updateFullNode(t.eventCache.getNode(),s,o)}else{const n=Vr(r,hr(t));c=e.filter.updateFullNode(t.eventCache.getNode(),n,o)}else{const u=ht(n);if(".priority"===u){(0,s.vA)(1===dt(n),"Can't have a priority with additional path components");const i=a.getNode();l=t.serverCache.getNode();const o=Wr(r,n,i,l);c=null!=o?e.filter.updatePriority(i,o):a.getNode()}else{const s=ft(n);let h;if(a.isCompleteForChild(u)){l=t.serverCache.getNode();const e=Wr(r,n,a.getNode(),l);h=null!=e?a.getNode().getImmediateChild(u).updateChild(s,e):a.getNode().getImmediateChild(u)}else h=Kr(r,u,t.serverCache);c=null!=h?e.filter.updateChild(a.getNode(),u,h,s,i,o):a.getNode()}}return cr(t,c,a.isFullyInitialized()||yt(n),e.filter.filtersNodes())}}function si(e,t,n,r,i,s,o,a){const c=t.serverCache;let l;const u=o?e.filter:e.filter.getIndexedFilter();if(yt(n))l=u.updateFullNode(c.getNode(),r,null);else if(u.filtersNodes()&&!c.isFiltered()){const e=c.getNode().updateChild(n,r);l=u.updateFullNode(c.getNode(),e,null)}else{const e=ht(n);if(!c.isCompleteForPath(n)&&dt(n)>1)return t;const i=ft(n),s=c.getNode().getImmediateChild(e),o=s.updateChild(i,r);l=".priority"===e?u.updatePriority(c.getNode(),o):u.updateChild(c.getNode(),e,o,i,Xr,null)}const h=lr(t,l,c.isFullyInitialized()||yt(n),u.filtersNodes()),d=new Qr(i,h,s);return ii(e,h,n,i,d,a)}function oi(e,t,n,r,i,s,o){const a=t.eventCache;let c,l;const u=new Qr(i,t,s);if(yt(n))l=e.filter.updateFullNode(t.eventCache.getNode(),r,o),c=cr(t,l,!0,e.filter.filtersNodes());else{const i=ht(n);if(".priority"===i)l=e.filter.updatePriority(t.eventCache.getNode(),r),c=cr(t,l,a.isFullyInitialized(),a.isFiltered());else{const s=ft(n),l=a.getNode().getImmediateChild(i);let h;if(yt(s))h=r;else{const e=u.getCompleteChild(i);h=null!=e?".priority"===pt(s)&&e.getChild(_t(s)).isEmpty()?e:e.updateChild(s,r):mn.EMPTY_NODE}if(l.equals(h))c=t;else{const n=e.filter.updateChild(a.getNode(),i,h,s,u,o);c=cr(t,n,a.isFullyInitialized(),e.filter.filtersNodes())}}}return c}function ai(e,t){return e.eventCache.isCompleteForChild(t)}function ci(e,t,n,r,i,s,o){let a=t;return r.foreach((r,c)=>{const l=vt(n,r);ai(t,ht(l))&&(a=oi(e,a,l,c,i,s,o))}),r.foreach((r,c)=>{const l=vt(n,r);ai(t,ht(l))||(a=oi(e,a,l,c,i,s,o))}),a}function li(e,t,n){return n.foreach((e,n)=>{t=t.updateChild(e,n)}),t}function ui(e,t,n,r,i,s,o,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let c,l=t;c=yt(n)?r:new pr(null).setTree(n,r);const u=t.serverCache.getNode();return c.children.inorderTraversal((n,r)=>{if(u.hasChild(n)){const c=t.serverCache.getNode().getImmediateChild(n),u=li(e,c,r);l=si(e,l,new lt(n),u,i,s,o,a)}}),c.children.inorderTraversal((n,r)=>{const c=!t.serverCache.isCompleteForChild(n)&&null===r.value;if(!u.hasChild(n)&&!c){const c=t.serverCache.getNode().getImmediateChild(n),u=li(e,c,r);l=si(e,l,new lt(n),u,i,s,o,a)}}),l}function hi(e,t,n,r,i,s,o){if(null!=Hr(i,n))return t;const a=t.serverCache.isFiltered(),c=t.serverCache;if(null!=r.value){if(yt(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return si(e,t,n,c.getNode().getChild(n),i,s,a,o);if(yt(n)){let r=new pr(null);return c.getNode().forEachChild(Vt,(e,t)=>{r=r.set(new lt(e),t)}),ui(e,t,n,r,i,s,a,o)}return t}{let l=new pr(null);return r.foreach((e,t)=>{const r=vt(n,e);c.isCompleteForPath(r)&&(l=l.set(e,c.getNode().getChild(r)))}),ui(e,t,n,l,i,s,a,o)}}function di(e,t,n,r,i){const s=t.serverCache,o=lr(t,s.getNode(),s.isFullyInitialized()||yt(n),s.isFiltered());return ii(e,o,n,r,Xr,i)}function fi(e,t,n,r,i,o){let a;if(null!=Hr(r,n))return t;{const c=new Qr(r,t,i),l=t.eventCache.getNode();let u;if(yt(n)||".priority"===ht(n)){let n;if(t.serverCache.isFullyInitialized())n=Vr(r,hr(t));else{const e=t.serverCache.getNode();(0,s.vA)(e instanceof mn,"serverChildren would be complete if leaf node"),n=qr(r,e)}u=e.filter.updateFullNode(l,n,o)}else{const i=ht(n);let s=Kr(r,i,t.serverCache);null==s&&t.serverCache.isCompleteForChild(i)&&(s=l.getImmediateChild(i)),u=null!=s?e.filter.updateChild(l,i,s,ft(n),c,o):t.eventCache.getNode().hasChild(i)?e.filter.updateChild(l,i,mn.EMPTY_NODE,ft(n),c,o):l,u.isEmpty()&&t.serverCache.isFullyInitialized()&&(a=Vr(r,hr(t)),a.isLeafNode()&&(u=e.filter.updateFullNode(u,a,o)))}return a=t.serverCache.isFullyInitialized()||null!=Hr(r,ut()),cr(t,u,a,e.filter.filtersNodes())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,r=new Pn(n.getIndex()),i=On(n);this.processor_=ei(i);const s=t.serverCache,o=t.eventCache,a=r.updateFullNode(mn.EMPTY_NODE,s.getNode(),null),c=i.updateFullNode(mn.EMPTY_NODE,o.getNode(),null),l=new tr(a,s.isFullyInitialized(),r.filtersNodes()),u=new tr(c,o.isFullyInitialized(),i.filtersNodes());this.viewCache_=ar(u,l),this.eventGenerator_=new nr(this.query_)}get query(){return this.query_}}function mi(e){return e.viewCache_.serverCache.getNode()}function gi(e){return ur(e.viewCache_)}function _i(e,t){const n=hr(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!yt(t)&&!n.getImmediateChild(ht(t)).isEmpty())?n.getChild(t):null}function vi(e){return 0===e.eventRegistrations_.length}function yi(e,t){e.eventRegistrations_.push(t)}function wi(e,t,n){const r=[];if(n){(0,s.vA)(null==t,"A cancel should cancel all event registrations.");const i=e.query._path;e.eventRegistrations_.forEach(e=>{const t=e.createCancelEvent(n,i);t&&r.push(t)})}if(t){let n=[];for(let r=0;r<e.eventRegistrations_.length;++r){const i=e.eventRegistrations_[r];if(i.matches(t)){if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(r+1));break}}else n.push(i)}e.eventRegistrations_=n}else e.eventRegistrations_=[];return r}function bi(e,t,n,r){t.type===Kn.MERGE&&null!==t.source.queryId&&((0,s.vA)(hr(e.viewCache_),"We should always have a full cache before handling merges"),(0,s.vA)(ur(e.viewCache_),"Missing event cache, even though we have a server cache"));const i=e.viewCache_,o=ni(e.processor_,i,t,n,r);return ti(e.processor_,o.viewCache),(0,s.vA)(o.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=o.viewCache,Ii(e,o.changes,o.viewCache.eventCache.getNode(),null)}function Ci(e,t){const n=e.viewCache_.eventCache,r=[];if(!n.getNode().isLeafNode()){const e=n.getNode();e.forEachChild(an,(e,t)=>{r.push(En(e,t))})}return n.isFullyInitialized()&&r.push(In(n.getNode())),Ii(e,r,n.getNode(),t)}function Ii(e,t,n,r){const i=r?[r]:e.eventRegistrations_;return rr(e.eventGenerator_,t,n,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ei,Ti;class Si{constructor(){this.views=new Map}}function ki(e){(0,s.vA)(!Ei,"__referenceConstructor has already been defined"),Ei=e}function Pi(){return(0,s.vA)(Ei,"Reference.ts has not been loaded"),Ei}function xi(e){return 0===e.views.size}function Ai(e,t,n,r){const i=t.source.queryId;if(null!==i){const o=e.views.get(i);return(0,s.vA)(null!=o,"SyncTree gave us an op for an invalid query."),bi(o,t,n,r)}{let i=[];for(const s of e.views.values())i=i.concat(bi(s,t,n,r));return i}}function Ri(e,t,n,r,i){const s=t._queryIdentifier,o=e.views.get(s);if(!o){let e=Vr(n,i?r:null),s=!1;e?s=!0:r instanceof mn?(e=qr(n,r),s=!1):(e=mn.EMPTY_NODE,s=!1);const o=ar(new tr(e,s,!1),new tr(r,i,!1));return new pi(t,o)}return o}function Oi(e,t,n,r,i,s){const o=Ri(e,t,r,i,s);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,o),yi(o,n),Ci(o,n)}function Ni(e,t,n,r){const i=t._queryIdentifier,s=[];let o=[];const a=Ui(e);if("default"===i)for(const[c,l]of e.views.entries())o=o.concat(wi(l,n,r)),vi(l)&&(e.views.delete(c),l.query._queryParams.loadsAllData()||s.push(l.query));else{const t=e.views.get(i);t&&(o=o.concat(wi(t,n,r)),vi(t)&&(e.views.delete(i),t.query._queryParams.loadsAllData()||s.push(t.query)))}return a&&!Ui(e)&&s.push(new(Pi())(t._repo,t._path)),{removed:s,events:o}}function Mi(e){const t=[];for(const n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function Li(e,t){let n=null;for(const r of e.views.values())n=n||_i(r,t);return n}function Di(e,t){const n=t._queryParams;if(n.loadsAllData())return ji(e);{const n=t._queryIdentifier;return e.views.get(n)}}function Fi(e,t){return null!=Di(e,t)}function Ui(e){return null!=ji(e)}function ji(e){for(const t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bi(e){(0,s.vA)(!Ti,"__referenceConstructor has already been defined"),Ti=e}function $i(){return(0,s.vA)(Ti,"Reference.ts has not been loaded"),Ti}let Vi=1;class qi{constructor(e){this.listenProvider_=e,this.syncPointTree_=new pr(null),this.pendingWriteTree_=$r(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Wi(e,t,n,r,i){return kr(e.pendingWriteTree_,t,n,r,i),i?rs(e,new Qn(Gn(),t,n)):[]}function Hi(e,t,n,r){Pr(e.pendingWriteTree_,t,n,r);const i=pr.fromObject(n);return rs(e,new er(Gn(),t,i))}function zi(e,t,n=!1){const r=xr(e.pendingWriteTree_,t),i=Ar(e.pendingWriteTree_,t);if(i){let t=new pr(null);return null!=r.snap?t=t.set(ut(),!0):U(r.children,e=>{t=t.set(new lt(e),!0)}),rs(e,new Jn(r.path,t,n))}return[]}function Ki(e,t,n){return rs(e,new Qn(Yn(),t,n))}function Gi(e,t,n){const r=pr.fromObject(n);return rs(e,new er(Yn(),t,r))}function Yi(e,t){return rs(e,new Xn(Yn(),t))}function Zi(e,t,n){const r=ls(e,n);if(r){const n=us(r),i=n.path,s=n.queryId,o=wt(i,t),a=new Xn(Zn(s),o);return hs(e,i,a)}return[]}function Ji(e,t,n,r,i=!1){const s=t._path,o=e.syncPointTree_.get(s);let a=[];if(o&&("default"===t._queryIdentifier||Fi(o,t))){const c=Ni(o,t,n,r);xi(o)&&(e.syncPointTree_=e.syncPointTree_.remove(s));const l=c.removed;if(a=c.events,!i){const n=-1!==l.findIndex(e=>e._queryParams.loadsAllData()),i=e.syncPointTree_.findOnPath(s,(e,t)=>Ui(t));if(n&&!i){const t=e.syncPointTree_.subtree(s);if(!t.isEmpty()){const n=ds(t);for(let t=0;t<n.length;++t){const r=n[t],i=r.query,s=os(e,r);e.listenProvider_.startListening(fs(i),as(e,i),s.hashFn,s.onComplete)}}}if(!i&&l.length>0&&!r)if(n){const n=null;e.listenProvider_.stopListening(fs(t),n)}else l.forEach(t=>{const n=e.queryToTagMap.get(cs(t));e.listenProvider_.stopListening(fs(t),n)})}ps(e,l)}return a}function Xi(e,t,n,r){const i=ls(e,r);if(null!=i){const r=us(i),s=r.path,o=r.queryId,a=wt(s,t),c=new Qn(Zn(o),a,n);return hs(e,s,c)}return[]}function Qi(e,t,n,r){const i=ls(e,r);if(i){const r=us(i),s=r.path,o=r.queryId,a=wt(s,t),c=pr.fromObject(n),l=new er(Zn(o),a,c);return hs(e,s,l)}return[]}function es(e,t,n,r=!1){const i=t._path;let o=null,a=!1;e.syncPointTree_.foreachOnPath(i,(e,t)=>{const n=wt(e,i);o=o||Li(t,n),a=a||Ui(t)});let c,l=e.syncPointTree_.get(i);if(l?(a=a||Ui(l),o=o||Li(l,ut())):(l=new Si,e.syncPointTree_=e.syncPointTree_.set(i,l)),null!=o)c=!0;else{c=!1,o=mn.EMPTY_NODE;const t=e.syncPointTree_.subtree(i);t.foreachChild((e,t)=>{const n=Li(t,ut());n&&(o=o.updateImmediateChild(e,n))})}const u=Fi(l,t);if(!u&&!t._queryParams.loadsAllData()){const n=cs(t);(0,s.vA)(!e.queryToTagMap.has(n),"View does not exist, but we have a tag");const r=ms();e.queryToTagMap.set(n,r),e.tagToQueryMap.set(r,n)}const h=Sr(e.pendingWriteTree_,i);let d=Oi(l,t,n,h,o,c);if(!u&&!a&&!r){const n=Di(l,t);d=d.concat(gs(e,t,n))}return d}function ts(e,t,n){const r=!0,i=e.pendingWriteTree_,s=e.syncPointTree_.findOnPath(t,(e,n)=>{const r=wt(e,t),i=Li(n,r);if(i)return i});return Lr(i,t,s,n,r)}function ns(e,t){const n=t._path;let r=null;e.syncPointTree_.foreachOnPath(n,(e,t)=>{const i=wt(e,n);r=r||Li(t,i)});let i=e.syncPointTree_.get(n);i?r=r||Li(i,ut()):(i=new Si,e.syncPointTree_=e.syncPointTree_.set(n,i));const s=null!=r,o=s?new tr(r,!0,!1):null,a=Sr(e.pendingWriteTree_,t._path),c=Ri(i,t,a,s?o.getNode():mn.EMPTY_NODE,s);return gi(c)}function rs(e,t){return is(t,e.syncPointTree_,null,Sr(e.pendingWriteTree_,ut()))}function is(e,t,n,r){if(yt(e.path))return ss(e,t,n,r);{const i=t.get(ut());null==n&&null!=i&&(n=Li(i,ut()));let s=[];const o=ht(e.path),a=e.operationForChild(o),c=t.children.get(o);if(c&&a){const e=n?n.getImmediateChild(o):null,t=Gr(r,o);s=s.concat(is(a,c,e,t))}return i&&(s=s.concat(Ai(i,e,r,n))),s}}function ss(e,t,n,r){const i=t.get(ut());null==n&&null!=i&&(n=Li(i,ut()));let s=[];return t.children.inorderTraversal((t,i)=>{const o=n?n.getImmediateChild(t):null,a=Gr(r,t),c=e.operationForChild(t);c&&(s=s.concat(ss(c,i,o,a)))}),i&&(s=s.concat(Ai(i,e,r,n))),s}function os(e,t){const n=t.query,r=as(e,n);return{hashFn:()=>{const e=mi(t)||mn.EMPTY_NODE;return e.hash()},onComplete:t=>{if("ok"===t)return r?Zi(e,n._path,r):Yi(e,n._path);{const r=V(t,n);return Ji(e,n,null,r)}}}}function as(e,t){const n=cs(t);return e.queryToTagMap.get(n)}function cs(e){return e._path.toString()+"$"+e._queryIdentifier}function ls(e,t){return e.tagToQueryMap.get(t)}function us(e){const t=e.indexOf("$");return(0,s.vA)(-1!==t&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new lt(e.substr(0,t))}}function hs(e,t,n){const r=e.syncPointTree_.get(t);(0,s.vA)(r,"Missing sync point for query tag that we're tracking");const i=Sr(e.pendingWriteTree_,t);return Ai(r,n,i,null)}function ds(e){return e.fold((e,t,n)=>{if(t&&Ui(t)){const e=ji(t);return[e]}{let e=[];return t&&(e=Mi(t)),U(n,(t,n)=>{e=e.concat(n)}),e}})}function fs(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new($i())(e._repo,e._path):e}function ps(e,t){for(let n=0;n<t.length;++n){const r=t[n];if(!r._queryParams.loadsAllData()){const t=cs(r),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}function ms(){return Vi++}function gs(e,t,n){const r=t._path,i=as(e,t),o=os(e,n),a=e.listenProvider_.startListening(fs(t),i,o.hashFn,o.onComplete),c=e.syncPointTree_.subtree(r);if(i)(0,s.vA)(!Ui(c.value),"If we're adding a query, it shouldn't be shadowed");else{const t=c.fold((e,t,n)=>{if(!yt(e)&&t&&Ui(t))return[ji(t).query];{let e=[];return t&&(e=e.concat(Mi(t).map(e=>e.query))),U(n,(t,n)=>{e=e.concat(n)}),e}});for(let n=0;n<t.length;++n){const r=t[n];e.listenProvider_.stopListening(fs(r),as(e,r))}}return a}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new _s(t)}node(){return this.node_}}class vs{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=vt(this.path_,e);return new vs(this.syncTree_,t)}node(){return ts(this.syncTree_,this.path_)}}const ys=function(e){return e=e||{},e["timestamp"]=e["timestamp"]||(new Date).getTime(),e},ws=function(e,t,n){return e&&"object"===typeof e?((0,s.vA)(".sv"in e,"Unexpected leaf node or priority contents"),"string"===typeof e[".sv"]?bs(e[".sv"],t,n):"object"===typeof e[".sv"]?Cs(e[".sv"],t):void(0,s.vA)(!1,"Unexpected server value: "+JSON.stringify(e,null,2))):e},bs=function(e,t,n){switch(e){case"timestamp":return n["timestamp"];default:(0,s.vA)(!1,"Unexpected server value: "+e)}},Cs=function(e,t,n){e.hasOwnProperty("increment")||(0,s.vA)(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const r=e["increment"];"number"!==typeof r&&(0,s.vA)(!1,"Unexpected increment value: "+r);const i=t.node();if((0,s.vA)(null!==i&&"undefined"!==typeof i,"Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i,a=o.getValue();return"number"!==typeof a?r:a+r},Is=function(e,t,n,r){return Ts(t,new vs(n,e),r)},Es=function(e,t,n){return Ts(e,new _s(t),n)};function Ts(e,t,n){const r=e.getPriority().val(),i=ws(r,t.getImmediateChild(".priority"),n);let s;if(e.isLeafNode()){const r=e,s=ws(r.getValue(),t,n);return s!==r.getValue()||i!==r.getPriority().val()?new nn(s,yn(i)):e}{const r=e;return s=r,i!==r.getPriority().val()&&(s=s.updatePriority(new nn(i))),r.forEachChild(an,(e,r)=>{const i=Ts(r,t.getImmediateChild(e),n);i!==r&&(s=s.updateImmediateChild(e,i))}),s}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function ks(e,t){let n=t instanceof lt?t:new lt(t),r=e,i=ht(n);while(null!==i){const e=(0,s.yw)(r.node.children,i)||{children:{},childCount:0};r=new Ss(i,r,e),n=ft(n),i=ht(n)}return r}function Ps(e){return e.node.value}function xs(e,t){e.node.value=t,Ds(e)}function As(e){return e.node.childCount>0}function Rs(e){return void 0===Ps(e)&&!As(e)}function Os(e,t){U(e.node.children,(n,r)=>{t(new Ss(n,e,r))})}function Ns(e,t,n,r){n&&!r&&t(e),Os(e,e=>{Ns(e,t,!0,r)}),n&&r&&t(e)}function Ms(e,t,n){let r=n?e:e.parent;while(null!==r){if(t(r))return!0;r=r.parent}return!1}function Ls(e){return new lt(null===e.parent?e.name:Ls(e.parent)+"/"+e.name)}function Ds(e){null!==e.parent&&Fs(e.parent,e.name,e)}function Fs(e,t,n){const r=Rs(n),i=(0,s.gR)(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,Ds(e)):r||i||(e.node.children[t]=n.node,e.node.childCount++,Ds(e))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us=/[\[\].#$\/\u0000-\u001F\u007F]/,js=/[\[\].#$\u0000-\u001F\u007F]/,Bs=10485760,$s=function(e){return"string"===typeof e&&0!==e.length&&!Us.test(e)},Vs=function(e){return"string"===typeof e&&0!==e.length&&!js.test(e)},qs=function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),Vs(e)},Ws=function(e){return null===e||"string"===typeof e||"number"===typeof e&&!x(e)||e&&"object"===typeof e&&(0,s.gR)(e,".sv")},Hs=function(e,t,n,r){r&&void 0===t||zs((0,s.dI)(e,"value"),t,n)},zs=function(e,t,n){const r=n instanceof lt?new Et(n,e):n;if(void 0===t)throw new Error(e+"contains undefined "+Pt(r));if("function"===typeof t)throw new Error(e+"contains a function "+Pt(r)+" with contents = "+t.toString());if(x(t))throw new Error(e+"contains "+t.toString()+" "+Pt(r));if("string"===typeof t&&t.length>Bs/3&&(0,s.OE)(t)>Bs)throw new Error(e+"contains a string greater than "+Bs+" utf8 bytes "+Pt(r)+" ('"+t.substring(0,50)+"...')");if(t&&"object"===typeof t){let n=!1,i=!1;if(U(t,(t,s)=>{if(".value"===t)n=!0;else if(".priority"!==t&&".sv"!==t&&(i=!0,!$s(t)))throw new Error(e+" contains an invalid key ("+t+") "+Pt(r)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');Tt(r,t),zs(e,s,r),St(r)}),n&&i)throw new Error(e+' contains ".value" child '+Pt(r)+" in addition to actual children.")}},Ks=function(e,t){let n,r;for(n=0;n<t.length;n++){r=t[n];const i=gt(r);for(let t=0;t<i.length;t++)if(".priority"===i[t]&&t===i.length-1);else if(!$s(i[t]))throw new Error(e+"contains an invalid key ("+i[t]+") in path "+r.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')}t.sort(bt);let i=null;for(n=0;n<t.length;n++){if(r=t[n],null!==i&&It(i,r))throw new Error(e+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},Gs=function(e,t,n,r){if(r&&void 0===t)return;const i=(0,s.dI)(e,"values");if(!t||"object"!==typeof t||Array.isArray(t))throw new Error(i+" must be an object containing the children to replace.");const o=[];U(t,(e,t)=>{const r=new lt(e);if(zs(i,t,vt(n,r)),".priority"===pt(r)&&!Ws(t))throw new Error(i+"contains an invalid value for '"+r.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(r)}),Ks(i,o)},Ys=function(e,t,n){if(!n||void 0!==t){if(x(t))throw new Error((0,s.dI)(e,"priority")+"is "+t.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Ws(t))throw new Error((0,s.dI)(e,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")}},Zs=function(e,t,n,r){if((!r||void 0!==n)&&!Vs(n))throw new Error((0,s.dI)(e,t)+'was an invalid path = "'+n+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')},Js=function(e,t,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Zs(e,t,n,r)},Xs=function(e,t){if(".info"===ht(t))throw new Error(e+" failed = Can't modify data under /.info/")},Qs=function(e,t){const n=t.path.toString();if("string"!==typeof t.repoInfo.host||0===t.repoInfo.host.length||!$s(t.repoInfo.namespace)&&"localhost"!==t.repoInfo.host.split(":")[0]||0!==n.length&&!qs(n))throw new Error((0,s.dI)(e,"url")+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class eo{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function to(e,t){let n=null;for(let r=0;r<t.length;r++){const i=t[r],s=i.getPath();null===n||Ct(s,n.path)||(e.eventLists_.push(n),n=null),null===n&&(n={events:[],path:s}),n.events.push(i)}n&&e.eventLists_.push(n)}function no(e,t,n){to(e,n),io(e,e=>Ct(e,t))}function ro(e,t,n){to(e,n),io(e,e=>It(e,t)||It(t,e))}function io(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){const i=e.eventLists_[r];if(i){const s=i.path;t(s)?(so(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function so(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(null!==n){e.events[t]=null;const r=n.getEventRunner();w&&I("event: "+n.toString()),K(r)}}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oo="repo_interrupt",ao=25;class co{constructor(e,t,n,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new eo,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Fn(),this.transactionQueueTree_=new Ss,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function lo(e,t,n){if(e.stats_=ge(e.repoInfo_),e.forceRestClient_||G())e.server_=new Ln(e.repoInfo_,(t,n,r,i)=>{fo(e,t,n,r,i)},e.authTokenProvider_,e.appCheckProvider_),setTimeout(()=>po(e,!0),0);else{if("undefined"!==typeof n&&null!==n){if("object"!==typeof n)throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{(0,s.As)(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}e.persistentConnection_=new Ft(e.repoInfo_,t,(t,n,r,i)=>{fo(e,t,n,r,i)},t=>{po(e,t)},t=>{mo(e,t)},e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener(t=>{e.server_.refreshAuthToken(t)}),e.appCheckProvider_.addTokenChangeListener(t=>{e.server_.refreshAppCheckToken(t.token)}),e.statsReporter_=_e(e.repoInfo_,()=>new zn(e.stats_,e.server_)),e.infoData_=new Dn,e.infoSyncTree_=new qi({startListening:(t,n,r,i)=>{let s=[];const o=e.infoData_.getNode(t._path);return o.isEmpty()||(s=Ki(e.infoSyncTree_,t._path,o),setTimeout(()=>{i("ok")},0)),s},stopListening:()=>{}}),go(e,"connected",!1),e.serverSyncTree_=new qi({startListening:(t,n,r,i)=>(e.server_.listen(t,r,n,(n,r)=>{const s=i(n,r);ro(e.eventQueue_,t._path,s)}),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function uo(e){const t=e.infoData_.getNode(new lt(".info/serverTimeOffset")),n=t.val()||0;return(new Date).getTime()+n}function ho(e){return ys({timestamp:uo(e)})}function fo(e,t,n,r,i){e.dataUpdateCount++;const o=new lt(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let a=[];if(i)if(r){const t=(0,s.kH)(n,e=>yn(e));a=Qi(e.serverSyncTree_,o,t,i)}else{const t=yn(n);a=Xi(e.serverSyncTree_,o,t,i)}else if(r){const t=(0,s.kH)(n,e=>yn(e));a=Gi(e.serverSyncTree_,o,t)}else{const t=yn(n);a=Ki(e.serverSyncTree_,o,t)}let c=o;a.length>0&&(c=Mo(e,o)),ro(e.eventQueue_,c,a)}function po(e,t){go(e,"connected",t),!1===t&&bo(e)}function mo(e,t){U(t,(t,n)=>{go(e,t,n)})}function go(e,t,n){const r=new lt("/.info/"+t),i=yn(n);e.infoData_.updateSnapshot(r,i);const s=Ki(e.infoSyncTree_,r,i);ro(e.eventQueue_,r,s)}function _o(e){return e.nextWriteId_++}function vo(e,t,n){const r=ns(e.serverSyncTree_,t);return null!=r?Promise.resolve(r):e.server_.get(t).then(r=>{const i=yn(r).withIndex(t._queryParams.getIndex());let s;if(es(e.serverSyncTree_,t,n,!0),t._queryParams.loadsAllData())s=Ki(e.serverSyncTree_,t._path,i);else{const n=as(e.serverSyncTree_,t);s=Xi(e.serverSyncTree_,t._path,i,n)}return ro(e.eventQueue_,t._path,s),Ji(e.serverSyncTree_,t,n,null,!0),i},n=>(xo(e,"get for query "+(0,s.As)(t)+" failed: "+n),Promise.reject(new Error(n))))}function yo(e,t,n,r,i){xo(e,"set",{path:t.toString(),value:n,priority:r});const s=ho(e),o=yn(n,r),a=ts(e.serverSyncTree_,t),c=Es(o,a,s),l=_o(e),u=Wi(e.serverSyncTree_,t,c,l,!0);to(e.eventQueue_,u),e.server_.put(t.toString(),o.val(!0),(n,r)=>{const s="ok"===n;s||k("set at "+t+" failed: "+n);const o=zi(e.serverSyncTree_,l,!s);ro(e.eventQueue_,t,o),Ao(e,i,n,r)});const h=Bo(e,t);Mo(e,h),ro(e.eventQueue_,h,[])}function wo(e,t,n,r){xo(e,"update",{path:t.toString(),value:n});let i=!0;const s=ho(e),o={};if(U(n,(n,r)=>{i=!1,o[n]=Is(vt(t,n),yn(r),e.serverSyncTree_,s)}),i)I("update() called with empty data.  Don't do anything."),Ao(e,r,"ok",void 0);else{const i=_o(e),s=Hi(e.serverSyncTree_,t,o,i);to(e.eventQueue_,s),e.server_.merge(t.toString(),n,(n,s)=>{const o="ok"===n;o||k("update at "+t+" failed: "+n);const a=zi(e.serverSyncTree_,i,!o),c=a.length>0?Mo(e,t):t;ro(e.eventQueue_,c,a),Ao(e,r,n,s)}),U(n,n=>{const r=Bo(e,vt(t,n));Mo(e,r)}),ro(e.eventQueue_,t,[])}}function bo(e){xo(e,"onDisconnectEvents");const t=ho(e),n=Fn();Bn(e.onDisconnect_,ut(),(r,i)=>{const s=Is(r,i,e.serverSyncTree_,t);Un(n,r,s)});let r=[];Bn(n,ut(),(t,n)=>{r=r.concat(Ki(e.serverSyncTree_,t,n));const i=Bo(e,t);Mo(e,i)}),e.onDisconnect_=Fn(),ro(e.eventQueue_,ut(),r)}function Co(e,t,n){e.server_.onDisconnectCancel(t.toString(),(r,i)=>{"ok"===r&&jn(e.onDisconnect_,t),Ao(e,n,r,i)})}function Io(e,t,n,r){const i=yn(n);e.server_.onDisconnectPut(t.toString(),i.val(!0),(n,s)=>{"ok"===n&&Un(e.onDisconnect_,t,i),Ao(e,r,n,s)})}function Eo(e,t,n,r,i){const s=yn(n,r);e.server_.onDisconnectPut(t.toString(),s.val(!0),(n,r)=>{"ok"===n&&Un(e.onDisconnect_,t,s),Ao(e,i,n,r)})}function To(e,t,n,r){if((0,s.Im)(n))return I("onDisconnect().update() called with empty data.  Don't do anything."),void Ao(e,r,"ok",void 0);e.server_.onDisconnectMerge(t.toString(),n,(i,s)=>{"ok"===i&&U(n,(n,r)=>{const i=yn(r);Un(e.onDisconnect_,vt(t,n),i)}),Ao(e,r,i,s)})}function So(e,t,n){let r;r=".info"===ht(t._path)?es(e.infoSyncTree_,t,n):es(e.serverSyncTree_,t,n),no(e.eventQueue_,t._path,r)}function ko(e,t,n){let r;r=".info"===ht(t._path)?Ji(e.infoSyncTree_,t,n):Ji(e.serverSyncTree_,t,n),no(e.eventQueue_,t._path,r)}function Po(e){e.persistentConnection_&&e.persistentConnection_.interrupt(oo)}function xo(e,...t){let n="";e.persistentConnection_&&(n=e.persistentConnection_.id+":"),I(n,...t)}function Ao(e,t,n,r){t&&K(()=>{if("ok"===n)t(null);else{const e=(n||"error").toUpperCase();let i=e;r&&(i+=": "+r);const s=new Error(i);s.code=e,t(s)}})}function Ro(e,t,n){return ts(e.serverSyncTree_,t,n)||mn.EMPTY_NODE}function Oo(e,t=e.transactionQueueTree_){if(t||jo(e,t),Ps(t)){const n=Fo(e,t);(0,s.vA)(n.length>0,"Sending zero length transaction queue");const r=n.every(e=>0===e.status);r&&No(e,Ls(t),n)}else As(t)&&Os(t,t=>{Oo(e,t)})}function No(e,t,n){const r=n.map(e=>e.currentWriteId),i=Ro(e,t,r);let o=i;const a=i.hash();for(let u=0;u<n.length;u++){const e=n[u];(0,s.vA)(0===e.status,"tryToSendTransactionQueue_: items in queue should all be run."),e.status=1,e.retryCount++;const r=wt(t,e.path);o=o.updateChild(r,e.currentOutputSnapshotRaw)}const c=o.val(!0),l=t;e.server_.put(l.toString(),c,r=>{xo(e,"transaction put response",{path:l.toString(),status:r});let i=[];if("ok"===r){const r=[];for(let t=0;t<n.length;t++)n[t].status=2,i=i.concat(zi(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&r.push(()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved)),n[t].unwatcher();jo(e,ks(e.transactionQueueTree_,t)),Oo(e,e.transactionQueueTree_),ro(e.eventQueue_,t,i);for(let e=0;e<r.length;e++)K(r[e])}else{if("datastale"===r)for(let e=0;e<n.length;e++)3===n[e].status?n[e].status=4:n[e].status=0;else{k("transaction at "+l.toString()+" failed: "+r);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=r}Mo(e,t)}},a)}function Mo(e,t){const n=Do(e,t),r=Ls(n),i=Fo(e,n);return Lo(e,i,r),r}function Lo(e,t,n){if(0===t.length)return;const r=[];let i=[];const o=t.filter(e=>0===e.status),a=o.map(e=>e.currentWriteId);for(let c=0;c<t.length;c++){const o=t[c],l=wt(n,o.path);let u,h=!1;if((0,s.vA)(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null."),4===o.status)h=!0,u=o.abortReason,i=i.concat(zi(e.serverSyncTree_,o.currentWriteId,!0));else if(0===o.status)if(o.retryCount>=ao)h=!0,u="maxretry",i=i.concat(zi(e.serverSyncTree_,o.currentWriteId,!0));else{const n=Ro(e,o.path,a);o.currentInputSnapshot=n;const r=t[c].update(n.val());if(void 0!==r){zs("transaction failed: Data returned ",r,o.path);let t=yn(r);const c="object"===typeof r&&null!=r&&(0,s.gR)(r,".priority");c||(t=t.updatePriority(n.getPriority()));const l=o.currentWriteId,u=ho(e),h=Es(t,n,u);o.currentOutputSnapshotRaw=t,o.currentOutputSnapshotResolved=h,o.currentWriteId=_o(e),a.splice(a.indexOf(l),1),i=i.concat(Wi(e.serverSyncTree_,o.path,h,o.currentWriteId,o.applyLocally)),i=i.concat(zi(e.serverSyncTree_,l,!0))}else h=!0,u="nodata",i=i.concat(zi(e.serverSyncTree_,o.currentWriteId,!0))}ro(e.eventQueue_,n,i),i=[],h&&(t[c].status=2,function(e){setTimeout(e,Math.floor(0))}(t[c].unwatcher),t[c].onComplete&&("nodata"===u?r.push(()=>t[c].onComplete(null,!1,t[c].currentInputSnapshot)):r.push(()=>t[c].onComplete(new Error(u),!1,null))))}jo(e,e.transactionQueueTree_);for(let s=0;s<r.length;s++)K(r[s]);Oo(e,e.transactionQueueTree_)}function Do(e,t){let n,r=e.transactionQueueTree_;n=ht(t);while(null!==n&&void 0===Ps(r))r=ks(r,n),t=ft(t),n=ht(t);return r}function Fo(e,t){const n=[];return Uo(e,t,n),n.sort((e,t)=>e.order-t.order),n}function Uo(e,t,n){const r=Ps(t);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);Os(t,t=>{Uo(e,t,n)})}function jo(e,t){const n=Ps(t);if(n){let e=0;for(let t=0;t<n.length;t++)2!==n[t].status&&(n[e]=n[t],e++);n.length=e,xs(t,n.length>0?n:void 0)}Os(t,t=>{jo(e,t)})}function Bo(e,t){const n=Ls(Do(e,t)),r=ks(e.transactionQueueTree_,t);return Ms(r,t=>{$o(e,t)}),$o(e,r),Ns(r,t=>{$o(e,t)}),n}function $o(e,t){const n=Ps(t);if(n){const r=[];let i=[],o=-1;for(let t=0;t<n.length;t++)3===n[t].status||(1===n[t].status?((0,s.vA)(o===t-1,"All SENT items should be at beginning of queue."),o=t,n[t].status=3,n[t].abortReason="set"):((0,s.vA)(0===n[t].status,"Unexpected transaction status in abort"),n[t].unwatcher(),i=i.concat(zi(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&r.push(n[t].onComplete.bind(null,new Error("set"),!1,null))));-1===o?xs(t,void 0):n.length=o+1,ro(e.eventQueue_,Ls(t),i);for(let e=0;e<r.length;e++)K(r[e])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(e){let t="";const n=e.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let e=n[i];try{e=decodeURIComponent(e.replace(/\+/g," "))}catch(r){}t+="/"+e}return t}function qo(e){const t={};"?"===e.charAt(0)&&(e=e.substring(1));for(const n of e.split("&")){if(0===n.length)continue;const r=n.split("=");2===r.length?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):k(`Invalid query segment '${n}' in query '${e}'`)}return t}const Wo=function(e,t){const n=Ho(e),r=n.namespace;"firebase.com"===n.domain&&S(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),r&&"undefined"!==r||"localhost"===n.domain||S("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||P();const i="ws"===n.scheme||"wss"===n.scheme;return{repoInfo:new ue(n.host,n.secure,r,i,t,"",r!==n.subdomain),path:new lt(n.pathString)}},Ho=function(e){let t="",n="",r="",i="",s="",o=!0,a="https",c=443;if("string"===typeof e){let l=e.indexOf("//");l>=0&&(a=e.substring(0,l-1),e=e.substring(l+2));let u=e.indexOf("/");-1===u&&(u=e.length);let h=e.indexOf("?");-1===h&&(h=e.length),t=e.substring(0,Math.min(u,h)),u<h&&(i=Vo(e.substring(u,h)));const d=qo(e.substring(Math.min(e.length,h)));l=t.indexOf(":"),l>=0?(o="https"===a||"wss"===a,c=parseInt(t.substring(l+1),10)):l=t.length;const f=t.slice(0,l);if("localhost"===f.toLowerCase())n="localhost";else if(f.split(".").length<=2)n=f;else{const e=t.indexOf(".");r=t.substring(0,e).toLowerCase(),n=t.substring(e+1),s=r}"ns"in d&&(s=d["ns"])}return{host:t,port:c,domain:n,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}},zo="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Ko=function(){let e=0;const t=[];return function(n){const r=n===e;let i;e=n;const o=new Array(8);for(i=7;i>=0;i--)o[i]=zo.charAt(n%64),n=Math.floor(n/64);(0,s.vA)(0===n,"Cannot push at time == 0");let a=o.join("");if(r){for(i=11;i>=0&&63===t[i];i--)t[i]=0;t[i]++}else for(i=0;i<12;i++)t[i]=Math.floor(64*Math.random());for(i=0;i<12;i++)a+=zo.charAt(t[i]);return(0,s.vA)(20===a.length,"nextPushId: Length should be 20."),a}}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Go{constructor(e,t,n,r){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=r}getPath(){const e=this.snapshot.ref;return"value"===this.eventType?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+(0,s.As)(this.snapshot.exportVal())}}class Yo{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return(0,s.vA)(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||void 0!==this.snapshotCallback.userCallback&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new s.cY;return Co(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Xs("OnDisconnect.remove",this._path);const e=new s.cY;return Io(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Xs("OnDisconnect.set",this._path),Hs("OnDisconnect.set",e,this._path,!1);const t=new s.cY;return Io(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){Xs("OnDisconnect.setWithPriority",this._path),Hs("OnDisconnect.setWithPriority",e,this._path,!1),Ys("OnDisconnect.setWithPriority",t,!1);const n=new s.cY;return Eo(this._repo,this._path,e,t,n.wrapCallback(()=>{})),n.promise}update(e){Xs("OnDisconnect.update",this._path),Gs("OnDisconnect.update",e,this._path,!1);const t=new s.cY;return To(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(e,t,n,r){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=r}get key(){return yt(this._path)?null:pt(this._path)}get ref(){return new Qo(this._repo,this._path)}get _queryIdentifier(){const e=Mn(this._queryParams),t=D(e);return"{}"===t?"default":t}get _queryObject(){return Mn(this._queryParams)}isEqual(e){if(e=(0,s.Ku)(e),!(e instanceof Xo))return!1;const t=this._repo===e._repo,n=Ct(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return t&&n&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+mt(this._path)}}class Qo extends Xo{constructor(e,t){super(e,t,new Rn,!1)}get parent(){const e=_t(this._path);return null===e?null:new Qo(this._repo,e)}get root(){let e=this;while(null!==e.parent)e=e.parent;return e}}class ea{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new lt(e),n=na(this.ref,e);return new ea(this._node.getChild(t),n,an)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){if(this._node.isLeafNode())return!1;const t=this._node;return!!t.forEachChild(this._index,(t,n)=>e(new ea(n,na(this.ref,t),an)))}hasChild(e){const t=new lt(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return!this._node.isLeafNode()&&!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ta(e,t){return e=(0,s.Ku)(e),e._checkNotDeleted("ref"),void 0!==t?na(e._root,t):e._root}function na(e,t){return e=(0,s.Ku)(e),null===ht(e._path)?Js("child","path",t,!1):Zs("child","path",t,!1),new Qo(e._repo,vt(e._path,t))}function ra(e){return e=(0,s.Ku)(e),new Jo(e._repo,e._path)}function ia(e,t){e=(0,s.Ku)(e),Xs("push",e._path),Hs("push",t,e._path,!0);const n=uo(e._repo),r=Ko(n),i=na(e,r),o=na(e,r);let a;return a=null!=t?oa(o,t).then(()=>o):Promise.resolve(o),i.then=a.then.bind(a),i.catch=a.then.bind(a,void 0),i}function sa(e){return Xs("remove",e._path),oa(e,null)}function oa(e,t){e=(0,s.Ku)(e),Xs("set",e._path),Hs("set",t,e._path,!1);const n=new s.cY;return yo(e._repo,e._path,t,null,n.wrapCallback(()=>{})),n.promise}function aa(e,t){Gs("update",t,e._path,!1);const n=new s.cY;return wo(e._repo,e._path,t,n.wrapCallback(()=>{})),n.promise}function ca(e){e=(0,s.Ku)(e);const t=new Zo(()=>{}),n=new la(t);return vo(e._repo,e,n).then(t=>new ea(t,new Qo(e._repo,e._path),e._queryParams.getIndex()))}class la{constructor(e){this.callbackContext=e}respondsTo(e){return"value"===e}createEvent(e,t){const n=t._queryParams.getIndex();return new Go("value",this,new ea(e.snapshotNode,new Qo(t._repo,t._path),n))}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Yo(this,e,t):null}matches(e){return e instanceof la&&(!e.callbackContext||!this.callbackContext||e.callbackContext.matches(this.callbackContext))}hasAnyCallback(){return null!==this.callbackContext}}class ua{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t="children_added"===e?"child_added":e;return t="children_removed"===t?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Yo(this,e,t):null}createEvent(e,t){(0,s.vA)(null!=e.childName,"Child events should have a childName.");const n=na(new Qo(t._repo,t._path),e.childName),r=t._queryParams.getIndex();return new Go(e.type,this,new ea(e.snapshotNode,n,r),e.prevName)}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ua&&(this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)))}hasAnyCallback(){return!!this.callbackContext}}function ha(e,t,n,r,i){let s;if("object"===typeof r&&(s=void 0,i=r),"function"===typeof r&&(s=r),i&&i.onlyOnce){const t=n,r=(n,r)=>{ko(e._repo,e,a),t(n,r)};r.userCallback=n.userCallback,r.context=n.context,n=r}const o=new Zo(n,s||void 0),a="value"===t?new la(o):new ua(t,o);return So(e._repo,e,a),()=>ko(e._repo,e,a)}function da(e,t,n,r){return ha(e,"value",t,n,r)}ki(Qo),Bi(Qo);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fa="FIREBASE_DATABASE_EMULATOR_HOST",pa={};let ma=!1;function ga(e,t,n,r){const i=t.lastIndexOf(":"),o=t.substring(0,i),a=(0,s.zJ)(o);e.repoInfo_=new ue(t,a,e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(e.authTokenProvider_=r)}function _a(e,t,n,r,i){let s=r||e.options.databaseURL;void 0===s&&(e.options.projectId||S("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),I("Using default host for project ",e.options.projectId),s=`${e.options.projectId}-default-rtdb.firebaseio.com`);let o,a,c=Wo(s,i),l=c.repoInfo;"undefined"!==typeof process&&(a={NODE_ENV:"production",VUE_APP_FIREBASE_apiKey:"AIzaSyBDdOt1ajdsBOu7tVdcWOm3c_A61yvdytk",VUE_APP_FIREBASE_appId:"1:828044311671:web:c6fe41d320716830591a72",VUE_APP_FIREBASE_authDomain:"chattestproject-42024.firebaseapp.com",VUE_APP_FIREBASE_databaseURL:"https://chattestproject-42024-default-rtdb.asia-southeast1.firebasedatabase.app",VUE_APP_FIREBASE_measurementId:"G-6H2BLTSKLW",VUE_APP_FIREBASE_messagingSenderId:"828044311671",VUE_APP_FIREBASE_projectId:"chattestproject-42024",VUE_APP_FIREBASE_storageBucket:"chattestproject-42024.firebasestorage.app",BASE_URL:"/"}[fa]),a?(o=!0,s=`http://${a}?ns=${l.namespace}`,c=Wo(s,i),l=c.repoInfo):o=!c.repoInfo.secure;const u=i&&o?new X(X.OWNER):new J(e.name,e.options,t);Qs("Invalid Firebase Database URL",c),yt(c.path)||S("Database URL must point to the root of a Firebase Database (not including a child path).");const h=ya(l,e,u,new Z(e,n));return new wa(h,e)}function va(e,t){const n=pa[t];n&&n[e.key]===e||S(`Database ${t}(${e.repoInfo_}) has already been deleted.`),Po(e),delete n[e.key]}function ya(e,t,n,r){let i=pa[t.name];i||(i={},pa[t.name]=i);let s=i[e.toURLString()];return s&&S("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new co(e,ma,n,r),i[e.toURLString()]=s,s}class wa{constructor(e,t){this._repoInternal=e,this.app=t,this["type"]="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(lo(this._repoInternal,this.app.options.appId,this.app.options["databaseAuthVariableOverride"]),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Qo(this._repo,ut())),this._rootInternal}_delete(){return null!==this._rootInternal&&(va(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){null===this._rootInternal&&S("Cannot call "+e+" on a deleted database.")}}function ba(e=(0,r.Sx)(),t){const n=(0,r.j6)(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){const e=(0,s.yU)("database");e&&Ca(n,...e)}return n}function Ca(e,t,n,r={}){e=(0,s.Ku)(e),e._checkNotDeleted("useEmulator");const i=`${t}:${n}`,o=e._repoInternal;if(e._instanceStarted){if(i===e._repoInternal.repoInfo_.host&&(0,s.bD)(r,o.repoInfo_.emulatorOptions))return;S("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let a;if(o.repoInfo_.nodeAdmin)r.mockUserToken&&S('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),a=new X(X.OWNER);else if(r.mockUserToken){const t="string"===typeof r.mockUserToken?r.mockUserToken:(0,s.Fy)(r.mockUserToken,e.app.options.projectId);a=new X(t)}(0,s.zJ)(t)&&((0,s.gE)(t),(0,s.P1)("Database",!0)),ga(o,i,r,a)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ia(e){u(r.MF),(0,r.om)(new i.uA("database",(e,{instanceIdentifier:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return _a(n,r,i,t)},"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(a,c,e),(0,r.KO)(a,c,"esm2020")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea={".sv":"timestamp"};function Ta(){return Ea}Ft.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)},Ft.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)};Ia()},1241:function(e,t){"use strict";t.A=(e,t)=>{const n=e.__vccOpts||e;for(const[r,i]of t)n[r]=i;return n}},1291:function(e,t,n){"use strict";var r=n(741);e.exports=function(e){var t=+e;return t!==t||0===t?0:r(t)}},1385:function(e,t,n){"use strict";var r=n(9539);e.exports=function(e,t,n){for(var i=e.length-1;i>=0;i--)if(void 0!==e[i])try{n=r(e[i].iterator,t,n)}catch(s){t="throw",n=s}if("throw"===t)throw n;return n}},1548:function(e,t,n){"use strict";var r=n(4576),i=n(9039),s=n(9519),o=n(4215),a=r.structuredClone;e.exports=!!a&&!i(function(){if("DENO"===o&&s>92||"NODE"===o&&s>94||"BROWSER"===o&&s>97)return!1;var e=new ArrayBuffer(8),t=a(e,{transfer:[e]});return 0!==e.byteLength||8!==t.byteLength})},1549:function(e,t,n){"use strict";n(6632)},1625:function(e,t,n){"use strict";var r=n(9504);e.exports=r({}.isPrototypeOf)},1698:function(e,t,n){"use strict";var r=n(6518),i=n(4204),s=n(9835),o=n(4916),a=!o("union")||!s("union");r({target:"Set",proto:!0,real:!0,forced:a},{union:i})},1701:function(e,t,n){"use strict";var r=n(6518),i=n(9565),s=n(9306),o=n(8551),a=n(1767),c=n(9462),l=n(6319),u=n(9539),h=n(684),d=n(4549),f=n(6395),p=!f&&!h("map",function(){}),m=!f&&!p&&d("map",TypeError),g=f||p||m,_=c(function(){var e=this.iterator,t=o(i(this.next,e)),n=this.done=!!t.done;if(!n)return l(e,this.mapper,[t.value,this.counter++],!0)});r({target:"Iterator",proto:!0,real:!0,forced:g},{map:function(e){o(this);try{s(e)}catch(t){u(this,"throw",t)}return m?i(m,this,e):new _(a(this),{mapper:e})}})},1767:function(e){"use strict";e.exports=function(e){return{iterator:e,next:e.next,done:!1}}},1828:function(e,t,n){"use strict";var r=n(9504),i=n(9297),s=n(5397),o=n(9617).indexOf,a=n(421),c=r([].push);e.exports=function(e,t){var n,r=s(e),l=0,u=[];for(n in r)!i(a,n)&&i(r,n)&&c(u,n);while(t.length>l)i(r,n=t[l++])&&(~o(u,n)||c(u,n));return u}},2106:function(e,t,n){"use strict";var r=n(283),i=n(4913);e.exports=function(e,t,n){return n.get&&r(n.get,t,{getter:!0}),n.set&&r(n.set,t,{setter:!0}),i.f(e,t,n)}},2140:function(e,t,n){"use strict";var r=n(8227),i=r("toStringTag"),s={};s[i]="z",e.exports="[object z]"===String(s)},2195:function(e,t,n){"use strict";var r=n(9504),i=r({}.toString),s=r("".slice);e.exports=function(e){return s(i(e),8,-1)}},2211:function(e,t,n){"use strict";var r=n(9039);e.exports=!r(function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})},2215:function(e,t,n){"use strict";n.d(t,{P5:function(){return wt}});n(4114),n(8111),n(116),n(7588),n(1701);var r=n(6086),i=n(6189),s=n(2455),o=n(798),a=(n(6573),n(8100),n(7936),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(9577),n(1549),n(9797),n(9631),n(5623),n(4979),n(8071));const c="@firebase/installations",l="0.6.19",u=1e4,h=`w:${l}`,d="FIS_v2",f="https://firebaseinstallations.googleapis.com/v1",p=36e5,m="installations",g="Installations",_={["missing-app-config-values"]:'Missing App configuration value: "{$valueName}"',["not-registered"]:"Firebase Installation is not registered.",["installation-not-found"]:"Firebase Installation not found.",["request-failed"]:'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',["app-offline"]:"Could not process request. Application offline.",["delete-pending-registration"]:"Can't delete installation while there is a pending registration request."},v=new s.FA(m,g,_);function y(e){return e instanceof s.g&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w({projectId:e}){return`${f}/projects/${e}/installations`}function b(e){return{token:e.token,requestStatus:2,expiresIn:S(e.expiresIn),creationTime:Date.now()}}async function C(e,t){const n=await t.json(),r=n.error;return v.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function I({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function E(e,{refreshToken:t}){const n=I(e);return n.append("Authorization",k(t)),n}async function T(e){const t=await e();return t.status>=500&&t.status<600?e():t}function S(e){return Number(e.replace("s","000"))}function k(e){return`${d} ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function P({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=w(e),i=I(e),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={fid:n,authVersion:d,appId:e.appId,sdkVersion:h},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await T(()=>fetch(r,a));if(c.ok){const e=await c.json(),t={fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:b(e.authToken)};return t}throw await C("Create Installation",c)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e){return new Promise(t=>{setTimeout(t,e)})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A(e){const t=btoa(String.fromCharCode(...e));return t.replace(/\+/g,"-").replace(/\//g,"_")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R=/^[cdef][\w-]{21}$/,O="";function N(){try{const e=new Uint8Array(17),t=self.crypto||self.msCrypto;t.getRandomValues(e),e[0]=112+e[0]%16;const n=M(e);return R.test(n)?n:O}catch{return O}}function M(e){const t=A(e);return t.substr(0,22)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D=new Map;function F(e,t){const n=L(e);U(n,t),j(n,t)}function U(e,t){const n=D.get(e);if(n)for(const r of n)r(t)}function j(e,t){const n=$();n&&n.postMessage({key:e,fid:t}),V()}let B=null;function $(){return!B&&"BroadcastChannel"in self&&(B=new BroadcastChannel("[Firebase] FID Change"),B.onmessage=e=>{U(e.data.key,e.data.fid)}),B}function V(){0===D.size&&B&&(B.close(),B=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q="firebase-installations-database",W=1,H="firebase-installations-store";let z=null;function K(){return z||(z=(0,a.P2)(q,W,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(H)}}})),z}async function G(e,t){const n=L(e),r=await K(),i=r.transaction(H,"readwrite"),s=i.objectStore(H),o=await s.get(n);return await s.put(t,n),await i.done,o&&o.fid===t.fid||F(e,t.fid),t}async function Y(e){const t=L(e),n=await K(),r=n.transaction(H,"readwrite");await r.objectStore(H).delete(t),await r.done}async function Z(e,t){const n=L(e),r=await K(),i=r.transaction(H,"readwrite"),s=i.objectStore(H),o=await s.get(n),a=t(o);return void 0===a?await s.delete(n):await s.put(a,n),await i.done,!a||o&&o.fid===a.fid||F(e,a.fid),a}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J(e){let t;const n=await Z(e.appConfig,n=>{const r=X(n),i=Q(e,r);return t=i.registrationPromise,i.installationEntry});return n.fid===O?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function X(e){const t=e||{fid:N(),registrationStatus:0};return re(t)}function Q(e,t){if(0===t.registrationStatus){if(!navigator.onLine){const e=Promise.reject(v.create("app-offline"));return{installationEntry:t,registrationPromise:e}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=ee(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:te(e)}:{installationEntry:t}}async function ee(e,t){try{const n=await P(e,t);return G(e.appConfig,n)}catch(n){throw y(n)&&409===n.customData.serverCode?await Y(e.appConfig):await G(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function te(e){let t=await ne(e.appConfig);while(1===t.registrationStatus)await x(100),t=await ne(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await J(e);return n||t}return t}function ne(e){return Z(e,e=>{if(!e)throw v.create("installation-not-found");return re(e)})}function re(e){return ie(e)?{fid:e.fid,registrationStatus:0}:e}function ie(e){return 1===e.registrationStatus&&e.registrationTime+u<Date.now()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function se({appConfig:e,heartbeatServiceProvider:t},n){const r=oe(e,n),i=E(e,n),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={installation:{sdkVersion:h,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await T(()=>fetch(r,a));if(c.ok){const e=await c.json(),t=b(e);return t}throw await C("Generate Auth Token",c)}function oe(e,{fid:t}){return`${w(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ae(e,t=!1){let n;const r=await Z(e.appConfig,r=>{if(!he(r))throw v.create("not-registered");const i=r.authToken;if(!t&&de(i))return r;if(1===i.requestStatus)return n=ce(e,t),r;{if(!navigator.onLine)throw v.create("app-offline");const t=pe(r);return n=ue(e,t),t}}),i=n?await n:r.authToken;return i}async function ce(e,t){let n=await le(e.appConfig);while(1===n.authToken.requestStatus)await x(100),n=await le(e.appConfig);const r=n.authToken;return 0===r.requestStatus?ae(e,t):r}function le(e){return Z(e,e=>{if(!he(e))throw v.create("not-registered");const t=e.authToken;return me(t)?{...e,authToken:{requestStatus:0}}:e})}async function ue(e,t){try{const n=await se(e,t),r={...t,authToken:n};return await G(e.appConfig,r),n}catch(n){if(!y(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await G(e.appConfig,n)}else await Y(e.appConfig);throw n}}function he(e){return void 0!==e&&2===e.registrationStatus}function de(e){return 2===e.requestStatus&&!fe(e)}function fe(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+p}function pe(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function me(e){return 1===e.requestStatus&&e.requestTime+u<Date.now()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ge(e){const t=e,{installationEntry:n,registrationPromise:r}=await J(t);return r?r.catch(console.error):ae(t).catch(console.error),n.fid}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _e(e,t=!1){const n=e;await ve(n);const r=await ae(n,t);return r.token}async function ve(e){const{registrationPromise:t}=await J(e);t&&await t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ye(e){if(!e||!e.options)throw we("App Configuration");if(!e.name)throw we("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw we(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function we(e){return v.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be="installations",Ce="installations-internal",Ie=e=>{const t=e.getProvider("app").getImmediate(),n=ye(t),i=(0,r.j6)(t,"heartbeat"),s={app:t,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()};return s},Ee=e=>{const t=e.getProvider("app").getImmediate(),n=(0,r.j6)(t,be).getImmediate(),i={getId:()=>ge(n),getToken:e=>_e(n,e)};return i};function Te(){(0,r.om)(new o.uA(be,Ie,"PUBLIC")),(0,r.om)(new o.uA(Ce,Ee,"PRIVATE"))}Te(),(0,r.KO)(c,l),(0,r.KO)(c,l,"esm2020");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Se="analytics",ke="firebase_id",Pe="origin",xe=6e4,Ae="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Re="https://www.googletagmanager.com/gtag/js",Oe=new i.Vy("@firebase/analytics"),Ne={["already-exists"]:"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",["already-initialized"]:"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.",["already-initialized-settings"]:"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",["interop-component-reg-failed"]:"Firebase Analytics Interop Component failed to instantiate: {$reason}",["invalid-analytics-context"]:"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["indexeddb-unavailable"]:"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["fetch-throttle"]:"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",["config-fetch-failed"]:"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",["no-api-key"]:'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',["no-app-id"]:'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',["no-client-id"]:'The "client_id" field is empty.',["invalid-gtag-resource"]:"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Me=new s.FA("analytics","Analytics",Ne);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Le(e){if(!e.startsWith(Re)){const t=Me.create("invalid-gtag-resource",{gtagURL:e});return Oe.warn(t.message),""}return e}function De(e){return Promise.all(e.map(e=>e.catch(e=>e)))}function Fe(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function Ue(e,t){const n=Fe("firebase-js-sdk-policy",{createScriptURL:Le}),r=document.createElement("script"),i=`${Re}?l=${e}&id=${t}`;r.src=n?n?.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function je(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function Be(e,t,n,r,i,s){const o=r[i];try{if(o)await t[o];else{const e=await De(n),r=e.find(e=>e.measurementId===i);r&&await t[r.appId]}}catch(a){Oe.error(a)}e("config",i,s)}async function $e(e,t,n,r,i){try{let s=[];if(i&&i["send_to"]){let e=i["send_to"];Array.isArray(e)||(e=[e]);const r=await De(n);for(const n of e){const e=r.find(e=>e.measurementId===n),i=e&&t[e.appId];if(!i){s=[];break}s.push(i)}}0===s.length&&(s=Object.values(t)),await Promise.all(s),e("event",r,i||{})}catch(s){Oe.error(s)}}function Ve(e,t,n,r){async function i(i,...s){try{if("event"===i){const[r,i]=s;await $e(e,t,n,r,i)}else if("config"===i){const[i,o]=s;await Be(e,t,n,r,i,o)}else if("consent"===i){const[t,n]=s;e("consent",t,n)}else if("get"===i){const[t,n,r]=s;e("get",t,n,r)}else if("set"===i){const[t]=s;e("set",t)}else e(i,...s)}catch(o){Oe.error(o)}}return i}function qe(e,t,n,r,i){let s=function(...e){window[r].push(arguments)};return window[i]&&"function"===typeof window[i]&&(s=window[i]),window[i]=Ve(s,e,t,n),{gtagCore:s,wrappedGtag:window[i]}}function We(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Re)&&n.src.includes(e))return n;return null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He=30,ze=1e3;class Ke{constructor(e={},t=ze){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ge=new Ke;function Ye(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Ze(e){const{appId:t,apiKey:n}=e,r={method:"GET",headers:Ye(n)},i=Ae.replace("{app-id}",t),s=await fetch(i,r);if(200!==s.status&&304!==s.status){let e="";try{const t=await s.json();t.error?.message&&(e=t.error.message)}catch(o){}throw Me.create("config-fetch-failed",{httpStatus:s.status,responseMessage:e})}return s.json()}async function Je(e,t=Ge,n){const{appId:r,apiKey:i,measurementId:s}=e.options;if(!r)throw Me.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw Me.create("no-api-key")}const o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new tt;return setTimeout(async()=>{a.abort()},void 0!==n?n:xe),Xe({appId:r,apiKey:i,measurementId:s},o,a,t)}async function Xe(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=Ge){const{appId:o,measurementId:a}=e;try{await Qe(r,t)}catch(c){if(a)return Oe.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:o,measurementId:a};throw c}try{const t=await Ze(e);return i.deleteThrottleMetadata(o),t}catch(c){const t=c;if(!et(t)){if(i.deleteThrottleMetadata(o),a)return Oe.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${t?.message}]`),{appId:o,measurementId:a};throw c}const l=503===Number(t?.customData?.httpStatus)?(0,s.p9)(n,i.intervalMillis,He):(0,s.p9)(n,i.intervalMillis),u={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return i.setThrottleMetadata(o,u),Oe.debug(`Calling attemptFetch again in ${l} millis`),Xe(e,u,r,i)}}function Qe(e,t){return new Promise((n,r)=>{const i=Math.max(t-Date.now(),0),s=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(s),r(Me.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function et(e){if(!(e instanceof s.g)||!e.customData)return!1;const t=Number(e.customData["httpStatus"]);return 429===t||500===t||503===t||504===t}class tt{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nt,rt;async function it(e,t,n,r,i){if(i&&i.global)e("event",n,r);else{const i=await t,s={...r,send_to:i};e("event",n,s)}}function st(e){rt=e}function ot(e){nt=e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function at(){if(!(0,s.zW)())return Oe.warn(Me.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await(0,s.eX)()}catch(e){return Oe.warn(Me.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}return!0}async function ct(e,t,n,r,i,s,o){const a=Je(e);a.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Oe.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>Oe.error(e)),t.push(a);const c=at().then(e=>e?r.getId():void 0),[l,u]=await Promise.all([a,c]);We(s)||Ue(s,l.measurementId),rt&&(i("consent","default",rt),st(void 0)),i("js",new Date);const h=o?.config??{};return h[Pe]="firebase",h.update=!0,null!=u&&(h[ke]=u),i("config",l.measurementId,h),nt&&(i("set",nt),ot(void 0)),l.measurementId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.app=e}_delete(){return delete ut[this.app.options.appId],Promise.resolve()}}let ut={},ht=[];const dt={};let ft,pt,mt="dataLayer",gt="gtag",_t=!1;function vt(){const e=[];if((0,s.sr)()&&e.push("This is a browser extension environment."),(0,s.dM)()||e.push("Cookies are not available."),e.length>0){const t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=Me.create("invalid-analytics-context",{errorInfo:t});Oe.warn(n.message)}}function yt(e,t,n){vt();const r=e.options.appId;if(!r)throw Me.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw Me.create("no-api-key");Oe.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=ut[r])throw Me.create("already-exists",{id:r});if(!_t){je(mt);const{wrappedGtag:e,gtagCore:t}=qe(ut,ht,dt,mt,gt);pt=e,ft=t,_t=!0}ut[r]=ct(e,ht,dt,t,ft,mt,n);const i=new lt(e);return i}function wt(e=(0,r.Sx)()){e=(0,s.Ku)(e);const t=(0,r.j6)(e,Se);return t.isInitialized()?t.getImmediate():bt(e)}function bt(e,t={}){const n=(0,r.j6)(e,Se);if(n.isInitialized()){const e=n.getImmediate();if((0,s.bD)(t,n.getOptions()))return e;throw Me.create("already-initialized")}const i=n.initialize({options:t});return i}function Ct(e,t,n,r){e=(0,s.Ku)(e),it(pt,ut[e.app.options.appId],t,n,r).catch(e=>Oe.error(e))}const It="@firebase/analytics",Et="0.10.18";function Tt(){function e(e){try{const t=e.getProvider(Se).getImmediate();return{logEvent:(e,n,r)=>Ct(t,e,n,r)}}catch(t){throw Me.create("interop-component-reg-failed",{reason:t})}}(0,r.om)(new o.uA(Se,(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return yt(n,r,t)},"PUBLIC")),(0,r.om)(new o.uA("analytics-internal",e,"PRIVATE")),(0,r.KO)(It,Et),(0,r.KO)(It,Et,"esm2020")}Tt()},2303:function(e,t,n){"use strict";var r=n(4576),i=n(9504),s=r.Uint8Array,o=r.SyntaxError,a=r.parseInt,c=Math.min,l=/[^\da-f]/i,u=i(l.exec),h=i("".slice);e.exports=function(e,t){var n=e.length;if(n%2!==0)throw new o("String should be an even number of characters");var r=t?c(t.length,n/2):n/2,i=t||new s(r),d=0,f=0;while(f<r){var p=h(e,d,d+=2);if(u(l,p))throw new o("String should only contain hex characters");i[f++]=a(p,16)}return{bytes:i,read:d}}},2360:function(e,t,n){"use strict";var r,i=n(8551),s=n(6801),o=n(8727),a=n(421),c=n(397),l=n(4055),u=n(6119),h=">",d="<",f="prototype",p="script",m=u("IE_PROTO"),g=function(){},_=function(e){return d+p+h+e+d+"/"+p+h},v=function(e){e.write(_("")),e.close();var t=e.parentWindow.Object;return e=null,t},y=function(){var e,t=l("iframe"),n="java"+p+":";return t.style.display="none",c.appendChild(t),t.src=String(n),e=t.contentWindow.document,e.open(),e.write(_("document.F=Object")),e.close(),e.F},w=function(){try{r=new ActiveXObject("htmlfile")}catch(t){}w="undefined"!=typeof document?document.domain&&r?v(r):y():v(r);var e=o.length;while(e--)delete w[f][o[e]];return w()};a[m]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(g[f]=i(e),n=new g,g[f]=null,n[m]=e):n=w(),void 0===t?n:s.f(n,t)}},2455:function(e,t,n){"use strict";n.d(t,{cY:function(){return S},FA:function(){return K},g:function(){return z},gz:function(){return ue},dM:function(){return W},vA:function(){return s},Hk:function(){return o},K3:function(){return l},u:function(){return f},KA:function(){return h},Uj:function(){return d},p9:function(){return Ce},gR:function(){return te},Fy:function(){return x},tD:function(){return he},A4:function(){return p},bD:function(){return se},dI:function(){return me},hp:function(){return le},T9:function(){return E},Tj:function(){return C},yU:function(){return I},XA:function(){return T},Ku:function(){return Ie},ZQ:function(){return L},qc:function(){return ee},sr:function(){return U},zJ:function(){return k},c1:function(){return F},Im:function(){return re},lT:function(){return B},zW:function(){return V},jZ:function(){return D},$g:function(){return $},lV:function(){return j},Cv:function(){return Q},$L:function(){return Z},kH:function(){return ie},gE:function(){return P},Am:function(){return ae},I9:function(){return ce},yw:function(){return ne},OE:function(){return _e},kj:function(){return ge},As:function(){return J},P1:function(){return M},eX:function(){return q}});n(4114),n(8111),n(7588),n(4979),n(4603),n(7566),n(8721);const r=()=>{},i={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},s=function(e,t){if(!e)throw o(t)},o=function(e){return new Error("Firebase Database ("+i.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)},a=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296===(64512&i)&&r+1<e.length&&56320===(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},c=function(e){const t=[];let n=0,r=0;while(n<e.length){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=e[n++],o=e[n++],a=e[n++],c=((7&i)<<18|(63&s)<<12|(63&o)<<6|63&a)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(1023&c))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")},l={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],s=i+1<e.length,o=s?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,l=t>>2,u=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,s||(h=64)),r.push(n[l],n[u],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(a(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):c(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],s=i<e.length,o=s?n[e.charAt(i)]:0;++i;const a=i<e.length,c=a?n[e.charAt(i)]:64;++i;const l=i<e.length,h=l?n[e.charAt(i)]:64;if(++i,null==t||null==o||null==c||null==h)throw new u;const d=t<<2|o>>4;if(r.push(d),64!==c){const e=o<<4&240|c>>2;if(r.push(e),64!==h){const e=c<<6&192|h;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class u extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const h=function(e){const t=a(e);return l.encodeByteArray(t,!0)},d=function(e){return h(e).replace(/\./g,"")},f=function(e){try{return l.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function p(e){return m(void 0,e)}function m(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:const n=t;return new Date(n.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&g(n)&&(e[n]=m(e[n],t[n]));return e}function g(e){return"__proto__"!==e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof n.g)return n.g;throw new Error("Unable to locate global object.")}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v=()=>_().__FIREBASE_DEFAULTS__,y=()=>{if("undefined"===typeof process)return;const e={NODE_ENV:"production",VUE_APP_FIREBASE_apiKey:"AIzaSyBDdOt1ajdsBOu7tVdcWOm3c_A61yvdytk",VUE_APP_FIREBASE_appId:"1:828044311671:web:c6fe41d320716830591a72",VUE_APP_FIREBASE_authDomain:"chattestproject-42024.firebaseapp.com",VUE_APP_FIREBASE_databaseURL:"https://chattestproject-42024-default-rtdb.asia-southeast1.firebasedatabase.app",VUE_APP_FIREBASE_measurementId:"G-6H2BLTSKLW",VUE_APP_FIREBASE_messagingSenderId:"828044311671",VUE_APP_FIREBASE_projectId:"chattestproject-42024",VUE_APP_FIREBASE_storageBucket:"chattestproject-42024.firebasestorage.app",BASE_URL:"/"}.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0},w=()=>{if("undefined"===typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&f(e[1]);return t&&JSON.parse(t)},b=()=>{try{return r()||v()||y()||w()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},C=e=>b()?.emulatorHosts?.[e],I=e=>{const t=C(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},E=()=>b()?.config,T=e=>b()?.[`_${e}`];
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class S{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"===typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(e){try{const t=e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e;return t.endsWith(".cloudworkstations.dev")}catch{return!1}}async function P(e){const t=await fetch(e,{credentials:"include"});return t.ok}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",i=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e},a="";return[d(JSON.stringify(n)),d(JSON.stringify(o)),a].join(".")}const A={};function R(){const e={prod:[],emulator:[]};for(const t of Object.keys(A))A[t]?e.emulator.push(t):e.prod.push(t);return e}function O(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}let N=!1;function M(e,t){if("undefined"===typeof window||"undefined"===typeof document||!k(window.location.host)||A[e]===t||A[e]||N)return;function n(e){return`__firebase__banner__${e}`}A[e]=t;const r="__firebase__banner",i=R(),s=i.prod.length>0;function o(){const e=document.getElementById(r);e&&e.remove()}function a(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}function c(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}function l(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{N=!0,o()},e}function u(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}function h(){const e=O(r),t=n("text"),i=document.getElementById(t)||document.createElement("span"),o=n("learnmore"),h=document.getElementById(o)||document.createElement("a"),d=n("preprendIcon"),f=document.getElementById(d)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;a(t),u(h,o);const n=l();c(f,d),t.append(f,i,h,n),document.body.appendChild(t)}s?(i.innerText="Preview backend disconnected.",f.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(f.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',i.innerText="Preview backend running in this workspace."),i.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",h):h()}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""}function D(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(L())}function F(){return"undefined"!==typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function U(){const e="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof e&&void 0!==e.id}function j(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]}function B(){const e=L();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function $(){return!0===i.NODE_CLIENT||!0===i.NODE_ADMIN}function V(){try{return"object"===typeof indexedDB}catch(e){return!1}}function q(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}})}function W(){return!("undefined"===typeof navigator||!navigator.cookieEnabled)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H="FirebaseError";class z extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=H,Object.setPrototypeOf(this,z.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,K.prototype.create)}}class K{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?G(i,n):"Error",o=`${this.serviceName}: ${s} (${r}).`,a=new z(r,o,n);return a}}function G(e,t){return e.replace(Y,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}const Y=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e){return JSON.parse(e)}function J(e){return JSON.stringify(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X=function(e){let t={},n={},r={},i="";try{const s=e.split(".");t=Z(f(s[0])||""),n=Z(f(s[1])||""),i=s[2],r=n["d"]||{},delete n["d"]}catch(s){}return{header:t,claims:n,data:r,signature:i}},Q=function(e){const t=X(e),n=t.claims;return!!n&&"object"===typeof n&&n.hasOwnProperty("iat")},ee=function(e){const t=X(e).claims;return"object"===typeof t&&!0===t["admin"]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function te(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function ne(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function re(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function ie(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function se(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],s=t[i];if(oe(n)&&oe(s)){if(!se(n,s))return!1}else if(n!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function oe(e){return null!==e&&"object"===typeof e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ae(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function ce(e){const t={},n=e.replace(/^\?/,"").split("&");return n.forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function le(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"===typeof e)for(let u=0;u<16;u++)n[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)n[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const e=n[u-3]^n[u-8]^n[u-14]^n[u-16];n[u]=4294967295&(e<<1|e>>>31)}let r,i,s=this.chain_[0],o=this.chain_[1],a=this.chain_[2],c=this.chain_[3],l=this.chain_[4];for(let u=0;u<80;u++){u<40?u<20?(r=c^o&(a^c),i=1518500249):(r=o^a^c,i=1859775393):u<60?(r=o&a|c&(o|a),i=2400959708):(r=o^a^c,i=3395469782);const e=(s<<5|s>>>27)+r+l+i+n[u]&4294967295;l=c,c=a,a=4294967295&(o<<30|o>>>2),o=s,s=e}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const n=t-this.blockSize;let r=0;const i=this.buf_;let s=this.inbuf_;while(r<t){if(0===s)while(r<=n)this.compress_(e,r),r+=this.blockSize;if("string"===typeof e){while(r<t)if(i[s]=e.charCodeAt(r),++s,++r,s===this.blockSize){this.compress_(i),s=0;break}}else while(r<t)if(i[s]=e[r],++s,++r,s===this.blockSize){this.compress_(i),s=0;break}}this.inbuf_=s,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let r=0;r<5;r++)for(let t=24;t>=0;t-=8)e[n]=this.chain_[r]>>t&255,++n;return e}}function he(e,t){const n=new de(e,t);return n.subscribe.bind(n)}class de{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=fe(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=pe),void 0===r.error&&(r.error=pe),void 0===r.complete&&(r.complete=pe);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fe(e,t){if("object"!==typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"===typeof e[n])return!0;return!1}function pe(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(e,t){return`${e} failed: ${t} argument `}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ge=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319){const t=i-55296;r++,s(r<e.length,"Surrogate pair missing trail surrogate.");const n=e.charCodeAt(r)-56320;i=65536+(t<<10)+n}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},_e=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t},ve=1e3,ye=2,we=144e5,be=.5;function Ce(e,t=ve,n=ye){const r=t*Math.pow(n,e),i=Math.round(be*r*(Math.random()-.5)*2);return Math.min(we,r+i)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ie(e){return e&&e._delegate?e._delegate:e}},2475:function(e,t,n){"use strict";var r=n(6518),i=n(8527),s=n(4916),o=!s("isSupersetOf",function(e){return!e});r({target:"Set",proto:!0,real:!0,forced:o},{isSupersetOf:i})},2489:function(e,t,n){"use strict";var r=n(6518),i=n(9565),s=n(9306),o=n(8551),a=n(1767),c=n(9462),l=n(6319),u=n(6395),h=n(9539),d=n(684),f=n(4549),p=!u&&!d("filter",function(){}),m=!u&&!p&&f("filter",TypeError),g=u||p||m,_=c(function(){var e,t,n,r=this.iterator,s=this.predicate,a=this.next;while(1){if(e=o(i(a,r)),t=this.done=!!e.done,t)return;if(n=e.value,l(r,s,[n,this.counter++],!0))return n}});r({target:"Iterator",proto:!0,real:!0,forced:g},{filter:function(e){o(this);try{s(e)}catch(t){h(this,"throw",t)}return m?i(m,this,e):new _(a(this),{predicate:e})}})},2529:function(e){"use strict";e.exports=function(e,t){return{value:e,done:t}}},2603:function(e,t,n){"use strict";var r=n(655);e.exports=function(e,t){return void 0===e?arguments.length<2?"":t:r(e)}},2652:function(e,t,n){"use strict";var r=n(6080),i=n(9565),s=n(8551),o=n(6823),a=n(4209),c=n(6198),l=n(1625),u=n(81),h=n(851),d=n(9539),f=TypeError,p=function(e,t){this.stopped=e,this.result=t},m=p.prototype;e.exports=function(e,t,n){var g,_,v,y,w,b,C,I=n&&n.that,E=!(!n||!n.AS_ENTRIES),T=!(!n||!n.IS_RECORD),S=!(!n||!n.IS_ITERATOR),k=!(!n||!n.INTERRUPTED),P=r(t,I),x=function(e){return g&&d(g,"normal"),new p(!0,e)},A=function(e){return E?(s(e),k?P(e[0],e[1],x):P(e[0],e[1])):k?P(e,x):P(e)};if(T)g=e.iterator;else if(S)g=e;else{if(_=h(e),!_)throw new f(o(e)+" is not iterable");if(a(_)){for(v=0,y=c(e);y>v;v++)if(w=A(e[v]),w&&l(m,w))return w;return new p(!1)}g=u(e,_)}b=T?e.next:g.next;while(!(C=i(b,g)).done){try{w=A(C.value)}catch(R){d(g,"throw",R)}if("object"==typeof w&&w&&l(m,w))return w}return new p(!1)}},2777:function(e,t,n){"use strict";var r=n(9565),i=n(34),s=n(757),o=n(5966),a=n(4270),c=n(8227),l=TypeError,u=c("toPrimitive");e.exports=function(e,t){if(!i(e)||s(e))return e;var n,c=o(e,u);if(c){if(void 0===t&&(t="default"),n=r(c,e,t),!i(n)||s(n))return n;throw new l("Can't convert object to primitive value")}return void 0===t&&(t="number"),a(e,t)}},2787:function(e,t,n){"use strict";var r=n(9297),i=n(4901),s=n(8981),o=n(6119),a=n(2211),c=o("IE_PROTO"),l=Object,u=l.prototype;e.exports=a?l.getPrototypeOf:function(e){var t=s(e);if(r(t,c))return t[c];var n=t.constructor;return i(n)&&t instanceof n?n.prototype:t instanceof l?u:null}},2796:function(e,t,n){"use strict";var r=n(9039),i=n(4901),s=/#|\.prototype\./,o=function(e,t){var n=c[a(e)];return n===u||n!==l&&(i(t)?r(t):!!t)},a=o.normalize=function(e){return String(e).replace(s,".").toLowerCase()},c=o.data={},l=o.NATIVE="N",u=o.POLYFILL="P";e.exports=o},2804:function(e){"use strict";var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t+"+/",r=t+"-_",i=function(e){for(var t={},n=0;n<64;n++)t[e.charAt(n)]=n;return t};e.exports={i2c:n,c2i:i(n),i2cUrl:r,c2iUrl:i(r)}},2812:function(e){"use strict";var t=TypeError;e.exports=function(e,n){if(e<n)throw new t("Not enough arguments");return e}},2839:function(e,t,n){"use strict";var r=n(4576),i=r.navigator,s=i&&i.userAgent;e.exports=s?String(s):""},2967:function(e,t,n){"use strict";var r=n(6706),i=n(34),s=n(7750),o=n(3506);e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{e=r(Object.prototype,"__proto__","set"),e(n,[]),t=n instanceof Array}catch(a){}return function(n,r){return s(n),o(r),i(n)?(t?e(n,r):n.__proto__=r,n):n}}():void 0)},3167:function(e,t,n){"use strict";var r=n(4901),i=n(34),s=n(2967);e.exports=function(e,t,n){var o,a;return s&&r(o=t.constructor)&&o!==n&&i(a=o.prototype)&&a!==n.prototype&&s(e,a),e}},3238:function(e,t,n){"use strict";var r=n(4576),i=n(7811),s=n(7394),o=r.DataView;e.exports=function(e){if(!i||0!==s(e))return!1;try{return new o(e),!1}catch(t){return!0}}},3392:function(e,t,n){"use strict";var r=n(9504),i=0,s=Math.random(),o=r(1.1.toString);e.exports=function(e){return"Symbol("+(void 0===e?"":e)+")_"+o(++i+s,36)}},3440:function(e,t,n){"use strict";var r=n(7080),i=n(4402),s=n(9286),o=n(5170),a=n(3789),c=n(8469),l=n(507),u=i.has,h=i.remove;e.exports=function(e){var t=r(this),n=a(e),i=s(t);return o(t)<=n.size?c(t,function(e){n.includes(e)&&h(i,e)}):l(n.getIterator(),function(e){u(i,e)&&h(i,e)}),i}},3463:function(e){"use strict";var t=TypeError;e.exports=function(e){if("string"==typeof e)return e;throw new t("Argument is not a string")}},3506:function(e,t,n){"use strict";var r=n(3925),i=String,s=TypeError;e.exports=function(e){if(r(e))return e;throw new s("Can't set "+i(e)+" as a prototype")}},3579:function(e,t,n){"use strict";var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),l=n(9539),u=n(4549),h=u("some",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{some:function(e){a(this);try{o(e)}catch(r){l(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;return s(t,function(t,r){if(e(t,n++))return r()},{IS_RECORD:!0,INTERRUPTED:!0}).stopped}})},3650:function(e,t,n){"use strict";var r=n(7080),i=n(4402),s=n(9286),o=n(3789),a=n(507),c=i.add,l=i.has,u=i.remove;e.exports=function(e){var t=r(this),n=o(e).getIterator(),i=s(t);return a(n,function(e){l(t,e)?u(i,e):c(i,e)}),i}},3706:function(e,t,n){"use strict";var r=n(9504),i=n(4901),s=n(7629),o=r(Function.toString);i(s.inspectSource)||(s.inspectSource=function(e){return o(e)}),e.exports=s.inspectSource},3717:function(e,t){"use strict";t.f=Object.getOwnPropertySymbols},3724:function(e,t,n){"use strict";var r=n(9039);e.exports=!r(function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]})},3789:function(e,t,n){"use strict";var r=n(9306),i=n(8551),s=n(9565),o=n(1291),a=n(1767),c="Invalid size",l=RangeError,u=TypeError,h=Math.max,d=function(e,t){this.set=e,this.size=h(t,0),this.has=r(e.has),this.keys=r(e.keys)};d.prototype={getIterator:function(){return a(i(s(this.keys,this.set)))},includes:function(e){return s(this.has,this.set,e)}},e.exports=function(e){i(e);var t=+e.size;if(t!==t)throw new u(c);var n=o(t);if(n<0)throw new l(c);return new d(e,n)}},3838:function(e,t,n){"use strict";var r=n(7080),i=n(5170),s=n(8469),o=n(3789);e.exports=function(e){var t=r(this),n=o(e);return!(i(t)>n.size)&&!1!==s(t,function(e){if(!n.includes(e))return!1},!0)}},3853:function(e,t,n){"use strict";var r=n(6518),i=n(4449),s=n(4916),o=!s("isDisjointFrom",function(e){return!e});r({target:"Set",proto:!0,real:!0,forced:o},{isDisjointFrom:i})},3925:function(e,t,n){"use strict";var r=n(34);e.exports=function(e){return r(e)||null===e}},3972:function(e,t,n){"use strict";var r=n(34),i=String,s=TypeError;e.exports=function(e){if(void 0===e||r(e))return e;throw new s(i(e)+" is not an object or undefined")}},4055:function(e,t,n){"use strict";var r=n(4576),i=n(34),s=r.document,o=i(s)&&i(s.createElement);e.exports=function(e){return o?s.createElement(e):{}}},4114:function(e,t,n){"use strict";var r=n(6518),i=n(8981),s=n(6198),o=n(4527),a=n(6837),c=n(9039),l=c(function(){return 4294967297!==[].push.call({length:4294967296},1)}),u=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},h=l||!u();r({target:"Array",proto:!0,arity:1,forced:h},{push:function(e){var t=i(this),n=s(t),r=arguments.length;a(n+r);for(var c=0;c<r;c++)t[n]=arguments[c],n++;return o(t,n),n}})},4117:function(e){"use strict";e.exports=function(e){return null===e||void 0===e}},4154:function(e,t,n){"use strict";var r=n(6955),i=TypeError;e.exports=function(e){if("Uint8Array"===r(e))return e;throw new i("Argument is not an Uint8Array")}},4204:function(e,t,n){"use strict";var r=n(7080),i=n(4402).add,s=n(9286),o=n(3789),a=n(507);e.exports=function(e){var t=r(this),n=o(e).getIterator(),c=s(t);return a(n,function(e){i(c,e)}),c}},4209:function(e,t,n){"use strict";var r=n(8227),i=n(6269),s=r("iterator"),o=Array.prototype;e.exports=function(e){return void 0!==e&&(i.Array===e||o[s]===e)}},4215:function(e,t,n){"use strict";var r=n(4576),i=n(2839),s=n(2195),o=function(e){return i.slice(0,e.length)===e};e.exports=function(){return o("Bun/")?"BUN":o("Cloudflare-Workers")?"CLOUDFLARE":o("Deno/")?"DENO":o("Node.js/")?"NODE":r.Bun&&"string"==typeof Bun.version?"BUN":r.Deno&&"object"==typeof Deno.version?"DENO":"process"===s(r.process)?"NODE":r.window&&r.document?"BROWSER":"REST"}()},4226:function(e,t,n){"use strict";var r=n(6518),i=n(4576),s=n(3463),o=n(4154),a=n(5169),c=n(2303);i.Uint8Array&&r({target:"Uint8Array",proto:!0},{setFromHex:function(e){o(this),s(e),a(this.buffer);var t=c(e,this).read;return{read:t,written:t/2}}})},4232:function(e,t,n){"use strict";n.d(t,{$3:function(){return f},$H:function(){return F},BH:function(){return H},BX:function(){return ne},Bm:function(){return b},C4:function(){return J},CE:function(){return m},CP:function(){return l},DY:function(){return U},Gv:function(){return C},J$:function(){return Q},Kg:function(){return w},MZ:function(){return i},Mp:function(){return c},NO:function(){return a},Oj:function(){return s},PT:function(){return O},Qd:function(){return k},Ro:function(){return $},SU:function(){return x},TF:function(){return h},Tg:function(){return M},Tn:function(){return y},Tr:function(){return z},We:function(){return q},X$:function(){return u},Y2:function(){return ee},ZH:function(){return L},Zf:function(){return S},bB:function(){return B},cy:function(){return p},gd:function(){return v},pD:function(){return r},rU:function(){return D},tE:function(){return o},u3:function(){return re},vM:function(){return g},v_:function(){return se},yI:function(){return P},yL:function(){return I},yQ:function(){return j}});n(4114),n(8111),n(2489),n(7588);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
function r(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return e=>e in t}const i={},s=[],o=()=>{},a=()=>!1,c=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),l=e=>e.startsWith("onUpdate:"),u=Object.assign,h=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},d=Object.prototype.hasOwnProperty,f=(e,t)=>d.call(e,t),p=Array.isArray,m=e=>"[object Map]"===T(e),g=e=>"[object Set]"===T(e),_=e=>"[object Date]"===T(e),v=e=>"[object RegExp]"===T(e),y=e=>"function"===typeof e,w=e=>"string"===typeof e,b=e=>"symbol"===typeof e,C=e=>null!==e&&"object"===typeof e,I=e=>(C(e)||y(e))&&y(e.then)&&y(e.catch),E=Object.prototype.toString,T=e=>E.call(e),S=e=>T(e).slice(8,-1),k=e=>"[object Object]"===T(e),P=e=>w(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,x=r(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),A=e=>{const t=Object.create(null);return n=>{const r=t[n];return r||(t[n]=e(n))}},R=/-(\w)/g,O=A(e=>e.replace(R,(e,t)=>t?t.toUpperCase():"")),N=/\B([A-Z])/g,M=A(e=>e.replace(N,"-$1").toLowerCase()),L=A(e=>e.charAt(0).toUpperCase()+e.slice(1)),D=A(e=>{const t=e?`on${L(e)}`:"";return t}),F=(e,t)=>!Object.is(e,t),U=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},j=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},B=e=>{const t=parseFloat(e);return isNaN(t)?e:t},$=e=>{const t=w(e)?Number(e):NaN;return isNaN(t)?e:t};let V;const q=()=>V||(V="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof n.g?n.g:{});const W="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",H=r(W);function z(e){if(p(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],i=w(r)?Z(r):z(r);if(i)for(const e in i)t[e]=i[e]}return t}if(w(e)||C(e))return e}const K=/;(?![^(]*\))/g,G=/:([^]+)/,Y=/\/\*[^]*?\*\//g;function Z(e){const t={};return e.replace(Y,"").split(K).forEach(e=>{if(e){const n=e.split(G);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function J(e){let t="";if(w(e))t=e;else if(p(e))for(let n=0;n<e.length;n++){const r=J(e[n]);r&&(t+=r+" ")}else if(C(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const X="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Q=r(X);function ee(e){return!!e||""===e}function te(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=ne(e[r],t[r]);return n}function ne(e,t){if(e===t)return!0;let n=_(e),r=_(t);if(n||r)return!(!n||!r)&&e.getTime()===t.getTime();if(n=b(e),r=b(t),n||r)return e===t;if(n=p(e),r=p(t),n||r)return!(!n||!r)&&te(e,t);if(n=C(e),r=C(t),n||r){if(!n||!r)return!1;const i=Object.keys(e).length,s=Object.keys(t).length;if(i!==s)return!1;for(const n in e){const r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!ne(e[n],t[n]))return!1}}return String(e)===String(t)}function re(e,t){return e.findIndex(e=>ne(e,t))}const ie=e=>!(!e||!0!==e["__v_isRef"]),se=e=>w(e)?e:null==e?"":p(e)||C(e)&&(e.toString===E||!y(e.toString))?ie(e)?se(e.value):JSON.stringify(e,oe,2):String(e),oe=(e,t)=>ie(t)?oe(e,t.value):m(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[ae(t,r)+" =>"]=n,e),{})}:g(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>ae(e))}:b(t)?ae(t):!C(t)||p(t)||k(t)?t:String(t),ae=(e,t="")=>{var n;return b(e)?`Symbol(${null!=(n=e.description)?n:t})`:e}},4270:function(e,t,n){"use strict";var r=n(9565),i=n(4901),s=n(34),o=TypeError;e.exports=function(e,t){var n,a;if("string"===t&&i(n=e.toString)&&!s(a=r(n,e)))return a;if(i(n=e.valueOf)&&!s(a=r(n,e)))return a;if("string"!==t&&i(n=e.toString)&&!s(a=r(n,e)))return a;throw new o("Can't convert object to primitive value")}},4376:function(e,t,n){"use strict";var r=n(2195);e.exports=Array.isArray||function(e){return"Array"===r(e)}},4388:function(e,t,n){"use strict";n.d(t,{HF:function(){return Tt},eJ:function(){return Ut},xI:function(){return ii},hg:function(){return Wt},x9:function(){return jt},df:function(){return Gn},CI:function(){return Ht},r7:function(){return $t}});n(4114),n(8111),n(2489),n(116),n(7588),n(1701),n(8237),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(4603),n(7566),n(8721);var r=n(6086),i=n(2455),s=n(6189),o=n(798);function a(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const c=a,l=new i.FA("auth","Firebase",a()),u=new s.Vy("@firebase/auth");function h(e,...t){u.logLevel<=s.$b.WARN&&u.warn(`Auth (${r.MF}): ${e}`,...t)}function d(e,...t){u.logLevel<=s.$b.ERROR&&u.error(`Auth (${r.MF}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(e,...t){throw v(e,...t)}function p(e,...t){return v(e,...t)}function m(e,t,n){const r={...c(),[t]:n},s=new i.FA("auth","Firebase",r);return s.create(t,{appName:e.name})}function g(e){return m(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function _(e,t,n){const r=n;if(!(t instanceof r))throw r.name!==t.constructor.name&&f(e,"argument-error"),m(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function v(e,...t){if("string"!==typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return l.create(e,...t)}function y(e,t,...n){if(!e)throw v(t,...n)}function w(e){const t="INTERNAL ASSERTION FAILED: "+e;throw d(t),new Error(t)}function b(e,t){e||w(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(){return"undefined"!==typeof self&&self.location?.href||""}function I(){return"http:"===E()||"https:"===E()}function E(){return"undefined"!==typeof self&&self.location?.protocol||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(){return!("undefined"!==typeof navigator&&navigator&&"onLine"in navigator&&"boolean"===typeof navigator.onLine&&(I()||(0,i.sr)()||"connection"in navigator))||navigator.onLine}function S(){if("undefined"===typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e,t){this.shortDelay=e,this.longDelay=t,b(t>e,"Short delay should be less than long delay!"),this.isMobile=(0,i.jZ)()||(0,i.lV)()}get(){return T()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(e,t){b(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!==typeof self&&"fetch"in self?self.fetch:"undefined"!==typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!==typeof fetch?fetch:void w("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!==typeof self&&"Headers"in self?self.Headers:"undefined"!==typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!==typeof Headers?Headers:void w("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!==typeof self&&"Response"in self?self.Response:"undefined"!==typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!==typeof Response?Response:void w("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A={["CREDENTIAL_MISMATCH"]:"custom-token-mismatch",["MISSING_CUSTOM_TOKEN"]:"internal-error",["INVALID_IDENTIFIER"]:"invalid-email",["MISSING_CONTINUE_URI"]:"internal-error",["INVALID_PASSWORD"]:"wrong-password",["MISSING_PASSWORD"]:"missing-password",["INVALID_LOGIN_CREDENTIALS"]:"invalid-credential",["EMAIL_EXISTS"]:"email-already-in-use",["PASSWORD_LOGIN_DISABLED"]:"operation-not-allowed",["INVALID_IDP_RESPONSE"]:"invalid-credential",["INVALID_PENDING_TOKEN"]:"invalid-credential",["FEDERATED_USER_ID_ALREADY_LINKED"]:"credential-already-in-use",["MISSING_REQ_TYPE"]:"internal-error",["EMAIL_NOT_FOUND"]:"user-not-found",["RESET_PASSWORD_EXCEED_LIMIT"]:"too-many-requests",["EXPIRED_OOB_CODE"]:"expired-action-code",["INVALID_OOB_CODE"]:"invalid-action-code",["MISSING_OOB_CODE"]:"internal-error",["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]:"requires-recent-login",["INVALID_ID_TOKEN"]:"invalid-user-token",["TOKEN_EXPIRED"]:"user-token-expired",["USER_NOT_FOUND"]:"user-token-expired",["TOO_MANY_ATTEMPTS_TRY_LATER"]:"too-many-requests",["PASSWORD_DOES_NOT_MEET_REQUIREMENTS"]:"password-does-not-meet-requirements",["INVALID_CODE"]:"invalid-verification-code",["INVALID_SESSION_INFO"]:"invalid-verification-id",["INVALID_TEMPORARY_PROOF"]:"invalid-credential",["MISSING_SESSION_INFO"]:"missing-verification-id",["SESSION_EXPIRED"]:"code-expired",["MISSING_ANDROID_PACKAGE_NAME"]:"missing-android-pkg-name",["UNAUTHORIZED_DOMAIN"]:"unauthorized-continue-uri",["INVALID_OAUTH_CLIENT_ID"]:"invalid-oauth-client-id",["ADMIN_ONLY_OPERATION"]:"admin-restricted-operation",["INVALID_MFA_PENDING_CREDENTIAL"]:"invalid-multi-factor-session",["MFA_ENROLLMENT_NOT_FOUND"]:"multi-factor-info-not-found",["MISSING_MFA_ENROLLMENT_ID"]:"missing-multi-factor-info",["MISSING_MFA_PENDING_CREDENTIAL"]:"missing-multi-factor-session",["SECOND_FACTOR_EXISTS"]:"second-factor-already-in-use",["SECOND_FACTOR_LIMIT_EXCEEDED"]:"maximum-second-factor-count-exceeded",["BLOCKING_FUNCTION_ERROR_RESPONSE"]:"internal-error",["RECAPTCHA_NOT_ENABLED"]:"recaptcha-not-enabled",["MISSING_RECAPTCHA_TOKEN"]:"missing-recaptcha-token",["INVALID_RECAPTCHA_TOKEN"]:"invalid-recaptcha-token",["INVALID_RECAPTCHA_ACTION"]:"invalid-recaptcha-action",["MISSING_CLIENT_TYPE"]:"missing-client-type",["MISSING_RECAPTCHA_VERSION"]:"missing-recaptcha-version",["INVALID_RECAPTCHA_VERSION"]:"invalid-recaptcha-version",["INVALID_REQ_TYPE"]:"invalid-req-type"},R=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],O=new k(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function M(e,t,n,r,s={}){return L(e,s,async()=>{let s={},o={};r&&("GET"===t?o=r:s={body:JSON.stringify(r)});const a=(0,i.Am)({key:e.config.apiKey,...o}).slice(1),c=await e._getAdditionalHeaders();c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode);const l={method:t,headers:c,...s};return(0,i.c1)()||(l.referrerPolicy="no-referrer"),e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(l.credentials="include"),x.fetch()(await F(e,e.config.apiHost,n,a),l)})}async function L(e,t,n){e._canInitEmulator=!1;const r={...A,...t};try{const t=new j(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw B(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const t=i.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw B(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw B(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw B(e,"user-disabled",s);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw m(e,a,o);f(e,a)}}catch(s){if(s instanceof i.g)throw s;f(e,"network-request-failed",{message:String(s)})}}async function D(e,t,n,r,i={}){const s=await M(e,t,n,r,i);return"mfaPendingCredential"in s&&f(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function F(e,t,n,r){const i=`${t}${n}?${r}`,s=e,o=s.config.emulator?P(e.config,i):`${e.config.apiScheme}://${i}`;if(R.includes(n)&&(await s._persistenceManagerAvailable,"COOKIE"===s._getPersistenceType())){const e=s._getPersistence();return e._getFinalTarget(o).toString()}return o}function U(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class j{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(p(this.auth,"network-request-failed")),O.get())})}}function B(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=p(e,t,r);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e){return void 0!==e&&void 0!==e.enterprise}class V{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return U(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function q(e,t){return M(e,"GET","/v2/recaptchaConfig",N(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W(e,t){return M(e,"POST","/v1/accounts:delete",t)}async function H(e,t){return M(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K(e,t=!1){const n=(0,i.Ku)(e),r=await n.getIdToken(t),s=Y(r);y(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const o="object"===typeof s.firebase?s.firebase:void 0,a=o?.["sign_in_provider"];return{claims:s,token:r,authTime:z(G(s.auth_time)),issuedAtTime:z(G(s.iat)),expirationTime:z(G(s.exp)),signInProvider:a||null,signInSecondFactor:o?.["sign_in_second_factor"]||null}}function G(e){return 1e3*Number(e)}function Y(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return d("JWT malformed, contained fewer than 3 sections"),null;try{const e=(0,i.u)(n);return e?JSON.parse(e):(d("Failed to decode base64 JWT payload"),null)}catch(s){return d("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Z(e){const t=Y(e);return y(t,"internal-error"),y("undefined"!==typeof t.exp,"internal-error"),y("undefined"!==typeof t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof i.g&&X(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}function X({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=this.user.stsTokenManager.expirationTime??0,t=e-Date.now()-3e5;return Math.max(0,t)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=z(this.lastLoginAt),this.creationTime=z(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function te(e){const t=e.auth,n=await e.getIdToken(),r=await J(e,H(t,{idToken:n}));y(r?.users.length,t,"internal-error");const i=r.users[0];e._notifyReloadListener(i);const s=i.providerUserInfo?.length?ie(i.providerUserInfo):[],o=re(e.providerData,s),a=e.isAnonymous,c=!(e.email&&i.passwordHash)&&!o?.length,l=!!a&&c,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new ee(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(e,u)}async function ne(e){const t=(0,i.Ku)(e);await te(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function re(e,t){const n=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...n,...t]}function ie(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function se(e,t){const n=await L(e,{},async()=>{const n=(0,i.Am)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,o=await F(e,r,"/v1/token",`key=${s}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:n};return e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(c.credentials="include"),x.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function oe(e,t){return M(e,"POST","/v2/accounts:revokeToken",N(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){y(e.idToken,"internal-error"),y("undefined"!==typeof e.idToken,"internal-error"),y("undefined"!==typeof e.refreshToken,"internal-error");const t="expiresIn"in e&&"undefined"!==typeof e.expiresIn?Number(e.expiresIn):Z(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){y(0!==e.length,"internal-error");const t=Z(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:i}=await se(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new ae;return n&&(y("string"===typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(y("string"===typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(y("number"===typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ae,this.toJSON())}_performRefresh(){return w("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(e,t){y("string"===typeof e||"undefined"===typeof e,"internal-error",{appName:t})}class le{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new Q(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ee(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await J(this,this.stsTokenManager.getToken(this.auth,e));return y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return K(this,e)}reload(){return ne(this)}_assign(e){this!==e&&(y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new le({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await te(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,r.xZ)(this.auth.app))return Promise.reject(g(this.auth));const e=await this.getIdToken();return await J(this,W(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,l=t.lastLoginAt??void 0,{uid:u,emailVerified:h,isAnonymous:d,providerData:f,stsTokenManager:p}=t;y(u&&p,e,"internal-error");const m=ae.fromJSON(this.name,p);y("string"===typeof u,e,"internal-error"),ce(n,e.name),ce(r,e.name),y("boolean"===typeof h,e,"internal-error"),y("boolean"===typeof d,e,"internal-error"),ce(i,e.name),ce(s,e.name),ce(o,e.name),ce(a,e.name),ce(c,e.name),ce(l,e.name);const g=new le({uid:u,auth:e,email:r,emailVerified:h,displayName:n,isAnonymous:d,photoURL:s,phoneNumber:i,tenantId:o,stsTokenManager:m,createdAt:c,lastLoginAt:l});return f&&Array.isArray(f)&&(g.providerData=f.map(e=>({...e}))),a&&(g._redirectEventId=a),g}static async _fromIdTokenResponse(e,t,n=!1){const r=new ae;r.updateFromServerResponse(t);const i=new le({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await te(i),i}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];y(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?ie(r.providerUserInfo):[],s=!(r.email&&r.passwordHash)&&!i?.length,o=new ae;o.updateFromIdToken(n);const a=new le({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:s}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new ee(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(a,c),a}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new Map;function he(e){b(e instanceof Function,"Expected a class definition");let t=ue.get(e);return t?(b(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,ue.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}de.type="NONE";const fe=de;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(e,t,n){return`firebase:${e}:${t}:${n}`}class me{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=pe(this.userKey,r.apiKey,i),this.fullPersistenceKey=pe("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"===typeof e){const t=await H(this.auth,{idToken:e}).catch(()=>{});return t?le._fromGetAccountInfoResponse(this.auth,t,e):null}return le._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new me(he(fe),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let i=r[0]||he(fe);const s=pe(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(s);if(t){let n;if("string"===typeof t){const r=await H(e,{idToken:t}).catch(()=>{});if(!r)break;n=await le._fromGetAccountInfoResponse(e,r,t)}else n=le._fromJSON(e,t);c!==i&&(o=n),i=c;break}}catch{}const a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch{}})),new me(i,e,n)):new me(i,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(we(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(_e(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Ce(t))return"Blackberry";if(Ie(t))return"Webos";if(ve(t))return"Safari";if((t.includes("chrome/")||ye(t))&&!t.includes("edge/"))return"Chrome";if(be(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function _e(e=(0,i.ZQ)()){return/firefox\//i.test(e)}function ve(e=(0,i.ZQ)()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ye(e=(0,i.ZQ)()){return/crios\//i.test(e)}function we(e=(0,i.ZQ)()){return/iemobile/i.test(e)}function be(e=(0,i.ZQ)()){return/android/i.test(e)}function Ce(e=(0,i.ZQ)()){return/blackberry/i.test(e)}function Ie(e=(0,i.ZQ)()){return/webos/i.test(e)}function Ee(e=(0,i.ZQ)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Te(e=(0,i.ZQ)()){return Ee(e)&&!!window.navigator?.standalone}function Se(){return(0,i.lT)()&&10===document.documentMode}function ke(e=(0,i.ZQ)()){return Ee(e)||be(e)||Ie(e)||Ce(e)||/windows phone/i.test(e)||we(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(e,t=[]){let n;switch(e){case"Browser":n=ge((0,i.ZQ)());break;case"Worker":n=`${ge((0,i.ZQ)())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${r.MF}/${s}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{const r=e(t);n(r)}catch(i){r(i)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ae(e,t={}){return M(e,"GET","/v2/passwordPolicy",N(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Re=6;class Oe{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Re,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Le(this),this.idTokenSubscription=new Le(this),this.beforeStateQueue=new xe(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=l,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=he(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await me.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(n){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await H(this,{idToken:e}),n=await le._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if((0,r.xZ)(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,r=n?._redirectEventId,s=await this.tryRedirectSignIn(e);t&&t!==r||!s?.user||(n=s.user,i=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(n)}catch(s){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await te(e)}catch(t){if("auth/network-request-failed"!==t?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=S()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,r.xZ)(this.app))return Promise.reject(g(this));const t=e?(0,i.Ku)(e):null;return t&&y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(0,r.xZ)(this.app)?Promise.reject(g(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,r.xZ)(this.app)?Promise.reject(g(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(he(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Ae(this),t=new Oe(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new i.FA("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};null!=this.tenantId&&(n.tenantId=this.tenantId),await oe(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&he(e)||this._popupRedirectResolver;y(t,this,"argument-error"),this.redirectPersistenceManager=await me.create(this,[he(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"===typeof t?t:t.next.bind(t);let s=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(y(o,this,"internal-error"),o.then(()=>{s||i(this.currentUser)}),"function"===typeof t){const i=e.addObserver(t,n,r);return()=>{s=!0,i()}}{const n=e.addObserver(t);return()=>{s=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Pe(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&h(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Me(e){return(0,i.Ku)(e)}class Le{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,i.tD)(e=>this.observer=e)}get next(){return y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let De={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Fe(e){De=e}function Ue(e){return De.loadJS(e)}function je(){return De.recaptchaEnterpriseScript}function Be(){return De.gapiScript}function $e(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(){this.enterprise=new qe}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class qe{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const We="recaptcha-enterprise",He="NO_RECAPTCHA";class ze{constructor(e){this.type=We,this.auth=Me(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{q(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new V(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function r(t,n,r){const i=window.grecaptcha;$(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(He)})}):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){const e=new Ve;return e.execute("siteKey",{action:"verify"})}return new Promise((e,i)=>{n(this.auth).then(n=>{if(!t&&$(window.grecaptcha))r(n,e,i);else{if("undefined"===typeof window)return void i(new Error("RecaptchaVerifier is only supported in browser"));let t=je();0!==t.length&&(t+=n),Ue(t).then(()=>{r(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function Ke(e,t,n,r=!1,i=!1){const s=new ze(e);let o;if(i)o=He;else try{o=await s.verify(n)}catch(c){o=await s.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ge(e,t,n,r,i){if("EMAIL_PASSWORD_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Ke(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch(async i=>{if("auth/missing-recaptcha-token"===i.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const i=await Ke(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)})}if("PHONE_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await Ke(e,t,n);return r(e,i).catch(async i=>{if("AUDIT"===e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const i=await Ke(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)})}{const i=await Ke(e,t,n,!1,!0);return r(e,i)}}return Promise.reject(i+" provider is not supported.")}async function Ye(e){const t=Me(e),n=await q(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new V(n);if(null==t.tenantId?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()){const e=new ze(t);e.verify()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(e,t){const n=(0,r.j6)(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),r=n.getOptions();if((0,i.bD)(r,t??{}))return e;f(e,"already-initialized")}const s=n.initialize({options:t});return s}function Je(e,t){const n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(he);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function Xe(e,t,n){const r=Me(e);y(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!!n?.disableWarnings,o=Qe(t),{host:a,port:c}=et(t),l=null===c?"":`:${c}`,u={url:`${o}//${a}${l}/`},h=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator)return y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void y((0,i.bD)(u,r.config.emulator)&&(0,i.bD)(h,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=u,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,(0,i.zJ)(a)?((0,i.gE)(`${o}//${a}${l}`),(0,i.P1)("Auth",!0)):s||nt()}function Qe(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function et(e){const t=Qe(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:tt(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:tt(t)}}}function tt(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function nt(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!==typeof console&&"function"===typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!==typeof window&&"undefined"!==typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return w("not implemented")}_getIdTokenResponse(e){return w("not implemented")}_linkToIdToken(e,t){return w("not implemented")}_getReauthenticationResolver(e){return w("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function it(e,t){return M(e,"POST","/v1/accounts:signUp",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function st(e,t){return D(e,"POST","/v1/accounts:signInWithPassword",N(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ot(e,t){return D(e,"POST","/v1/accounts:signInWithEmailLink",N(e,t))}async function at(e,t){return D(e,"POST","/v1/accounts:signInWithEmailLink",N(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends rt{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new ct(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new ct(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ge(e,t,"signInWithPassword",st,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ot(e,{email:this._email,oobCode:this._password});default:f(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ge(e,n,"signUpPassword",it,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return at(e,{idToken:t,email:this._email,oobCode:this._password});default:f(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lt(e,t){return D(e,"POST","/v1/accounts:signInWithIdp",N(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="http://localhost";class ht extends rt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ht(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):f("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...i}=t;if(!n||!r)return null;const s=new ht(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){const t=this.buildRequest();return lt(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,lt(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,lt(e,t)}buildRequest(){const e={requestUri:ut,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t["id_token"]=this.idToken),this.accessToken&&(t["access_token"]=this.accessToken),this.secret&&(t["oauth_token_secret"]=this.secret),t["providerId"]=this.providerId,this.nonce&&!this.pendingToken&&(t["nonce"]=this.nonce),e.postBody=(0,i.Am)(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dt(e,t){return M(e,"POST","/v1/accounts:sendVerificationCode",N(e,t))}async function ft(e,t){return D(e,"POST","/v1/accounts:signInWithPhoneNumber",N(e,t))}async function pt(e,t){const n=await D(e,"POST","/v1/accounts:signInWithPhoneNumber",N(e,t));if(n.temporaryProof)throw B(e,"account-exists-with-different-credential",n);return n}const mt={["USER_NOT_FOUND"]:"user-not-found"};async function gt(e,t){const n={...t,operation:"REAUTH"};return D(e,"POST","/v1/accounts:signInWithPhoneNumber",N(e,n),mt)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends rt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new _t({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new _t({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return ft(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return pt(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return gt(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"===typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new _t({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function yt(e){const t=(0,i.I9)((0,i.hp)(e))["link"],n=t?(0,i.I9)((0,i.hp)(t))["deep_link_id"]:null,r=(0,i.I9)((0,i.hp)(e))["deep_link_id"],s=r?(0,i.I9)((0,i.hp)(r))["link"]:null;return s||r||n||t||e}class wt{constructor(e){const t=(0,i.I9)((0,i.hp)(e)),n=t["apiKey"]??null,r=t["oobCode"]??null,s=vt(t["mode"]??null);y(n&&r&&s,"argument-error"),this.apiKey=n,this.operation=s,this.code=r,this.continueUrl=t["continueUrl"]??null,this.languageCode=t["lang"]??null,this.tenantId=t["tenantId"]??null}static parseLink(e){const t=yt(e);try{return new wt(t)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bt{constructor(){this.providerId=bt.PROVIDER_ID}static credential(e,t){return ct._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=wt.parseLink(t);return y(n,"argument-error"),ct._fromEmailAndCode(e,n.code,n.tenantId)}}bt.PROVIDER_ID="password",bt.EMAIL_PASSWORD_SIGN_IN_METHOD="password",bt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ct{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It extends Ct{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Et extends It{constructor(){super("facebook.com")}static credential(e){return ht._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Et.credential(e.oauthAccessToken)}catch{return null}}}Et.FACEBOOK_SIGN_IN_METHOD="facebook.com",Et.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tt extends It{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ht._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Tt.credential(t,n)}catch{return null}}}Tt.GOOGLE_SIGN_IN_METHOD="google.com",Tt.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class St extends It{constructor(){super("github.com")}static credential(e){return ht._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.GITHUB_SIGN_IN_METHOD="github.com",St.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class kt extends It{constructor(){super("twitter.com")}static credential(e,t){return ht._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return kt.credential(t,n)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Pt(e,t){return D(e,"POST","/v1/accounts:signUp",N(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt.TWITTER_SIGN_IN_METHOD="twitter.com",kt.PROVIDER_ID="twitter.com";class xt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await le._fromIdTokenResponse(e,n,r),s=At(n),o=new xt({user:i,providerId:s,_tokenResponse:n,operationType:t});return o}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=At(n);return new xt({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function At(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rt extends i.g{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,Rt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new Rt(e,t,n,r)}}function Ot(e,t,n,r){const i="reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e);return i.catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Rt._fromErrorAndOperation(e,n,t,r);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nt(e,t,n=!1){const r=await J(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return xt._forOperation(e,"link",r)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Mt(e,t,n=!1){const{auth:i}=e;if((0,r.xZ)(i.app))return Promise.reject(g(i));const s="reauthenticate";try{const r=await J(e,Ot(i,s,t,e),n);y(r.idToken,i,"internal-error");const o=Y(r.idToken);y(o,i,"internal-error");const{sub:a}=o;return y(e.uid===a,i,"user-mismatch"),xt._forOperation(e,s,r)}catch(o){throw"auth/user-not-found"===o?.code&&f(i,"user-mismatch"),o}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lt(e,t,n=!1){if((0,r.xZ)(e.app))return Promise.reject(g(e));const i="signIn",s=await Ot(e,i,t),o=await xt._fromIdTokenResponse(e,i,s);return n||await e._updateCurrentUser(o.user),o}async function Dt(e,t){return Lt(Me(e),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Ft(e){const t=Me(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function Ut(e,t,n){if((0,r.xZ)(e.app))return Promise.reject(g(e));const i=Me(e),s={returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},o=Ge(i,s,"signUpPassword",Pt,"EMAIL_PASSWORD_PROVIDER"),a=await o.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Ft(e),t}),c=await xt._fromIdTokenResponse(i,"signIn",a);return await i._updateCurrentUser(c.user),c}function jt(e,t,n){return(0,r.xZ)(e.app)?Promise.reject(g(e)):Dt((0,i.Ku)(e),bt.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Ft(e),t})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Bt(e,t){return M(e,"POST","/v1/accounts:update",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $t(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const r=(0,i.Ku)(e),s=await r.getIdToken(),o={idToken:s,displayName:t,photoUrl:n,returnSecureToken:!0},a=await J(r,Bt(r.auth,o));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const c=r.providerData.find(({providerId:e})=>"password"===e);c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function Vt(e,t,n,r){return(0,i.Ku)(e).onIdTokenChanged(t,n,r)}function qt(e,t,n){return(0,i.Ku)(e).beforeAuthStateChanged(t,n)}function Wt(e,t,n,r){return(0,i.Ku)(e).onAuthStateChanged(t,n,r)}function Ht(e){return(0,i.Ku)(e).signOut()}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function zt(e,t){return M(e,"POST","/v2/accounts/mfaEnrollment:start",N(e,t))}function Kt(e,t){return M(e,"POST","/v2/accounts/mfaEnrollment:finalize",N(e,t))}function Gt(e,t){return M(e,"POST","/v2/accounts/mfaEnrollment:start",N(e,t))}function Yt(e,t){return M(e,"POST","/v2/accounts/mfaEnrollment:finalize",N(e,t))}new WeakMap;const Zt="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Zt,"1"),this.storage.removeItem(Zt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt=1e3,Qt=10;class en extends Jt{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ke(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);Se()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Qt):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Xt)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}en.type="LOCAL";const tn=en,nn=1e3;
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(e){const t=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function sn(e){const t="http:"===window.location.protocol;return`${t?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}class on{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(void 0===typeof window)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!("boolean"===typeof isSecureContext&&!isSecureContext)&&("undefined"!==typeof navigator&&"undefined"!==typeof document&&(navigator.cookieEnabled??!0))}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=sn(e);if(window.cookieStore){const e=await window.cookieStore.get(t);return e?.value}return rn(t)}async _remove(e){if(!this._isAvailable())return;const t=await this._get(e);if(!t)return;const n=sn(e);document.cookie=`${n}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const n=sn(e);if(window.cookieStore){const e=e=>{const r=e.changed.find(e=>e.name===n);r&&t(r.value);const i=e.deleted.find(e=>e.name===n);i&&t(null)},r=()=>window.cookieStore.removeEventListener("change",e);return this.listenerUnsubscribes.set(t,r),window.cookieStore.addEventListener("change",e)}let r=rn(n);const i=setInterval(()=>{const e=rn(n);e!==r&&(t(e),r=e)},nn),s=()=>clearInterval(i);this.listenerUnsubscribes.set(t,s)}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}on.type="COOKIE";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class an extends Jt{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}an.type="SESSION";const cn=an;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ln(e){return Promise.all(e.map(async e=>{try{const t=await e;return{fulfilled:!0,value:t}}catch(t){return{fulfilled:!1,reason:t}}}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new un(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!s?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map(async e=>e(t.origin,i)),a=await ln(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function hn(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */un.receivers=[];class dn{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!==typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((o,a)=>{const c=hn("",20);r.port1.start();const l=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(l),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(l),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(){return window}function pn(e){fn().location.href=e}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mn(){return"undefined"!==typeof fn()["WorkerGlobalScope"]&&"function"===typeof fn()["importScripts"]}async function gn(){if(!navigator?.serviceWorker)return null;try{const e=await navigator.serviceWorker.ready;return e.active}catch{return null}}function _n(){return navigator?.serviceWorker?.controller||null}function vn(){return mn()?self:null}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn="firebaseLocalStorageDb",wn=1,bn="firebaseLocalStorage",Cn="fbase_key";class In{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function En(e,t){return e.transaction([bn],t?"readwrite":"readonly").objectStore(bn)}function Tn(){const e=indexedDB.deleteDatabase(yn);return new In(e).toPromise()}function Sn(){const e=indexedDB.open(yn,wn);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(bn,{keyPath:Cn})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(bn)?t(n):(n.close(),await Tn(),t(await Sn()))})})}async function kn(e,t,n){const r=En(e,!0).put({[Cn]:t,value:n});return new In(r).toPromise()}async function Pn(e,t){const n=En(e,!1).get(t),r=await new In(n).toPromise();return void 0===r?null:r.value}function xn(e,t){const n=En(e,!0).delete(t);return new In(n).toPromise()}const An=800,Rn=3;class On{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await Sn()),this.db}async _withRetries(e){let t=0;while(1)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>Rn)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return mn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=un._getInstance(vn()),this.receiver._subscribe("keyChanged",async(e,t)=>{const n=await this._poll();return{keyProcessed:n.includes(t.key)}}),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await gn(),!this.activeServiceWorker)return;this.sender=new dn(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&_n()===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Sn();return await kn(e,Zt,"1"),await xn(e,Zt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>kn(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>Pn(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>xn(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=En(e,!1).getAll();return new In(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),An)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}On.type="LOCAL";const Nn=On;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mn(e,t){return M(e,"POST","/v2/accounts/mfaSignIn:start",N(e,t))}function Ln(e,t){return M(e,"POST","/v2/accounts/mfaSignIn:finalize",N(e,t))}function Dn(e,t){return M(e,"POST","/v2/accounts/mfaSignIn:finalize",N(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */$e("rcb"),new k(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Fn="recaptcha";async function Un(e,t,n){if(!e._getRecaptchaConfig())try{await Ye(e)}catch(r){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(r="string"===typeof t?{phoneNumber:t}:t,"session"in r){const t=r.session;if("phoneNumber"in r){y("enroll"===t.type,e,"internal-error");const i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===He){y(n?.type===Fn,e,"argument-error");const r=await jn(e,t,n);return zt(e,r)}return zt(e,t)},o=Ge(e,i,"mfaSmsEnrollment",s,"PHONE_PROVIDER"),a=await o.catch(e=>Promise.reject(e));return a.phoneSessionInfo.sessionInfo}{y("signin"===t.type,e,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;y(i,e,"missing-multi-factor-info");const s={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},o=async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===He){y(n?.type===Fn,e,"argument-error");const r=await jn(e,t,n);return Mn(e,r)}return Mn(e,t)},a=Ge(e,s,"mfaSmsSignIn",o,"PHONE_PROVIDER"),c=await a.catch(e=>Promise.reject(e));return c.phoneResponseInfo.sessionInfo}}{const t={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=async(e,t)=>{if(t.captchaResponse===He){y(n?.type===Fn,e,"argument-error");const r=await jn(e,t,n);return dt(e,r)}return dt(e,t)},s=Ge(e,t,"sendVerificationCode",i,"PHONE_PROVIDER"),o=await s.catch(e=>Promise.reject(e));return o.sessionInfo}}finally{n?._reset()}}async function jn(e,t,n){y(n.type===Fn,e,"argument-error");const r=await n.verify();y("string"===typeof r,e,"argument-error");const i={...t};if("phoneEnrollmentInfo"in i){const e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:s}}),i}if("phoneSignInInfo"in i){const e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}return Object.assign(i,{recaptchaToken:r}),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e){this.providerId=Bn.PROVIDER_ID,this.auth=Me(e)}verifyPhoneNumber(e,t){return Un(this.auth,e,(0,i.Ku)(t))}static credential(e,t){return _t._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Bn.credentialFromTaggedObject(t)}static credentialFromError(e){return Bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?_t._fromTokenResponse(t,n):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function $n(e,t){return t?he(t):(y(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Bn.PROVIDER_ID="phone",Bn.PHONE_SIGN_IN_METHOD="phone";class Vn extends rt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return lt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return lt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return lt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function qn(e){return Lt(e.auth,new Vn(e),e.bypassAuthState)}function Wn(e){const{auth:t,user:n}=e;return y(n,t,"internal-error"),Mt(n,new Vn(e),e.bypassAuthState)}async function Hn(e){const{auth:t,user:n}=e;return y(n,t,"internal-error"),Nt(n,new Vn(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return qn;case"linkViaPopup":case"linkViaRedirect":return Hn;case"reauthViaPopup":case"reauthViaRedirect":return Wn;default:f(this.auth,"internal-error")}}resolve(e){b(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){b(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn=new k(2e3,1e4);async function Gn(e,t,n){if((0,r.xZ)(e.app))return Promise.reject(p(e,"operation-not-supported-in-this-environment"));const i=Me(e);_(e,t,Ct);const s=$n(i,n),o=new Yn(i,"signInViaPopup",t,s);return o.executeNotNull()}class Yn extends zn{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,Yn.currentPopupAction&&Yn.currentPopupAction.cancel(),Yn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return y(e,this.auth,"internal-error"),e}async onExecution(){b(1===this.filter.length,"Popup operations only handle one event");const e=hn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Yn.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,Kn.get())};e()}}Yn.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Zn="pendingRedirect",Jn=new Map;class Xn extends zn{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Jn.get(this.auth._key());if(!e){try{const t=await Qn(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Jn.set(this.auth._key(),e)}return this.bypassAuthState||Jn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function Qn(e,t){const n=nr(t),r=tr(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}function er(e,t){Jn.set(e._key(),t)}function tr(e){return he(e._redirectPersistence)}function nr(e){return pe(Zn,e.config.apiKey,e.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rr(e,t,n=!1){if((0,r.xZ)(e.app))return Promise.reject(g(e));const i=Me(e),s=$n(i,t),o=new Xn(i,s,n),a=await o.execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,t)),a}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ir=6e5;class sr{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cr(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!ar(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(p(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ir&&this.cachedEventUids.clear(),this.cachedEventUids.has(or(e))}saveEventToCache(e){this.cachedEventUids.add(or(e)),this.lastProcessedEventTime=Date.now()}}function or(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function ar({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}function cr(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ar(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lr(e,t={}){return M(e,"GET","/v1/projects",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,hr=/^https?/;async function dr(e){if(e.config.emulator)return;const{authorizedDomains:t}=await lr(e);for(const n of t)try{if(fr(n))return}catch{}f(e,"unauthorized-domain")}function fr(e){const t=C(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!hr.test(n))return!1;if(ur.test(e))return r===e;const i=e.replace(/\./g,"\\."),s=new RegExp("^(.+\\."+i+"|"+i+")$","i");return s.test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=new k(3e4,6e4);function mr(){const e=fn().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function gr(e){return new Promise((t,n)=>{function r(){mr(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{mr(),n(p(e,"network-request-failed"))},timeout:pr.get()})}if(fn().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!fn().gapi?.load){const t=$e("iframefcb");return fn()[t]=()=>{gapi.load?r():n(p(e,"network-request-failed"))},Ue(`${Be()}?onload=${t}`).catch(e=>n(e))}r()}}).catch(e=>{throw _r=null,e})}let _r=null;function vr(e){return _r=_r||gr(e),_r}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=new k(5e3,15e3),wr="__/auth/iframe",br="emulator/auth/iframe",Cr={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ir=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Er(e){const t=e.config;y(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?P(t,br):`https://${e.config.authDomain}/${wr}`,s={apiKey:t.apiKey,appName:e.name,v:r.MF},o=Ir.get(e.config.apiHost);o&&(s.eid=o);const a=e._getFrameworks();return a.length&&(s.fw=a.join(",")),`${n}?${(0,i.Am)(s).slice(1)}`}async function Tr(e){const t=await vr(e),n=fn().gapi;return y(n,e,"internal-error"),t.open({where:document.body,url:Er(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Cr,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=p(e,"network-request-failed"),s=fn().setTimeout(()=>{r(i)},yr.get());function o(){fn().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},kr=500,Pr=600,xr="_blank",Ar="http://localhost";class Rr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Or(e,t,n,r=kr,s=Pr){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...Sr,width:r.toString(),height:s.toString(),top:o,left:a},u=(0,i.ZQ)().toLowerCase();n&&(c=ye(u)?xr:n),_e(u)&&(t=t||Ar,l.scrollbars="yes");const h=Object.entries(l).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(Te(u)&&"_self"!==c)return Nr(t||"",c),new Rr(null);const d=window.open(t||"",c,h);y(d,e,"popup-blocked");try{d.focus()}catch(f){}return new Rr(d)}function Nr(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr="__/auth/handler",Lr="emulator/auth/handler",Dr=encodeURIComponent("fac");async function Fr(e,t,n,s,o,a){y(e.config.authDomain,e,"auth-domain-config-required"),y(e.config.apiKey,e,"invalid-api-key");const c={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:r.MF,eventId:o};if(t instanceof Ct){t.setDefaultLanguage(e.languageCode),c.providerId=t.providerId||"",(0,i.Im)(t.getCustomParameters())||(c.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(a||{}))c[e]=t}if(t instanceof It){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(c.scopes=e.join(","))}e.tenantId&&(c.tid=e.tenantId);const l=c;for(const r of Object.keys(l))void 0===l[r]&&delete l[r];const u=await e._getAppCheckToken(),h=u?`#${Dr}=${encodeURIComponent(u)}`:"";return`${Ur(e)}?${(0,i.Am)(l).slice(1)}${h}`}function Ur({config:e}){return e.emulator?P(e,Lr):`https://${e.authDomain}/${Mr}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jr="webStorageSupport";class Br{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cn,this._completeRedirectFn=rr,this._overrideRedirectResult=er}async _openPopup(e,t,n,r){b(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Fr(e,t,n,C(),r);return Or(e,i,hn())}async _openRedirect(e,t,n,r){await this._originValidation(e);const i=await Fr(e,t,n,C(),r);return pn(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(b(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Tr(e),n=new sr(e);return t.register("authEvent",t=>{y(t?.authEvent,e,"invalid-auth-event");const r=n.onEvent(t.authEvent);return{status:r?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){const n=this.iframes[e._key()];n.send(jr,{type:jr},n=>{const r=n?.[0]?.[jr];void 0!==r&&t(!!r),f(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=dr(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ke()||ve()||Ee()}}const $r=Br;class Vr{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return w("unexpected MultiFactorSessionType")}}}class qr extends Vr{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new qr(e)}_finalizeEnroll(e,t,n){return Kt(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Ln(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Wr{constructor(){}static assertion(e){return qr._fromCredential(e)}}Wr.FACTOR_ID="phone";class Hr{static assertionForEnrollment(e,t){return zr._fromSecret(e,t)}static assertionForSignIn(e,t){return zr._fromEnrollmentId(e,t)}static async generateSecret(e){const t=e;y("undefined"!==typeof t.user?.auth,"internal-error");const n=await Gt(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Kr._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}}Hr.FACTOR_ID="totp";class zr extends Vr{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new zr(t,void 0,e)}static _fromEnrollmentId(e,t){return new zr(t,e)}async _finalizeEnroll(e,t,n){return y("undefined"!==typeof this.secret,e,"argument-error"),Yt(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){y(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");const n={verificationCode:this.otp};return Dn(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}}class Kr{constructor(e,t,n,r,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new Kr(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let n=!1;return(Gr(e)||Gr(t))&&(n=!0),n&&(Gr(e)&&(e=this.auth.currentUser?.email||"unknownuser"),Gr(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function Gr(e){return"undefined"===typeof e||0===e?.length}var Yr="@firebase/auth",Zr="1.11.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Jr{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;const t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xr(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Qr(e){(0,r.om)(new o.uA("auth",(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),s=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Pe(e)},l=new Ne(r,i,s,c);return Je(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{const r=e.getProvider("auth-internal");r.initialize()})),(0,r.om)(new o.uA("auth-internal",e=>{const t=Me(e.getProvider("auth").getImmediate());return(e=>new Jr(e))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),(0,r.KO)(Yr,Zr,Xr(e)),(0,r.KO)(Yr,Zr,"esm2020")}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei=300,ti=(0,i.XA)("authIdTokenMaxAge")||ei;let ni=null;const ri=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&((new Date).getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>ti)return;const i=n?.token;ni!==i&&(ni=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ii(e=(0,r.Sx)()){const t=(0,r.j6)(e,"auth");if(t.isInitialized())return t.getImmediate();const n=Ze(e,{popupRedirectResolver:$r,persistence:[Nn,tn,cn]}),s=(0,i.XA)("authTokenSyncURL");if(s&&"boolean"===typeof isSecureContext&&isSecureContext){const e=new URL(s,location.origin);if(location.origin===e.origin){const t=ri(e.toString());qt(n,t,()=>t(n.currentUser)),Vt(n,e=>t(e))}}const o=(0,i.Tj)("auth");return o&&Xe(n,`http://${o}`),n}function si(){return document.getElementsByTagName("head")?.[0]??document}Fe({loadJS(e){return new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=p("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",si().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="}),Qr("Browser")},4402:function(e,t,n){"use strict";var r=n(9504),i=Set.prototype;e.exports={Set:Set,add:r(i.add),has:r(i.has),remove:r(i["delete"]),proto:i}},4449:function(e,t,n){"use strict";var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(8469),c=n(507),l=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<=n.size)return!1!==a(t,function(e){if(n.includes(e))return!1},!0);var u=n.getIterator();return!1!==c(u,function(e){if(i(t,e))return l(u,"normal",!1)})}},4483:function(e,t,n){"use strict";var r,i,s,o,a=n(4576),c=n(9429),l=n(1548),u=a.structuredClone,h=a.ArrayBuffer,d=a.MessageChannel,f=!1;if(l)f=function(e){u(e,{transfer:[e]})};else if(h)try{d||(r=c("worker_threads"),r&&(d=r.MessageChannel)),d&&(i=new d,s=new h(2),o=function(e){i.port1.postMessage(null,[e])},2===s.byteLength&&(o(s),0===s.byteLength&&(f=o)))}catch(p){}e.exports=f},4495:function(e,t,n){"use strict";var r=n(9519),i=n(9039),s=n(4576),o=s.String;e.exports=!!Object.getOwnPropertySymbols&&!i(function(){var e=Symbol("symbol detection");return!o(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&r&&r<41})},4527:function(e,t,n){"use strict";var r=n(3724),i=n(4376),s=TypeError,o=Object.getOwnPropertyDescriptor,a=r&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}();e.exports=a?function(e,t){if(i(e)&&!o(e,"length").writable)throw new s("Cannot set read only .length");return e.length=t}:function(e,t){return e.length=t}},4549:function(e,t,n){"use strict";var r=n(4576);e.exports=function(e,t){var n=r.Iterator,i=n&&n.prototype,s=i&&i[e],o=!1;if(s)try{s.call({next:function(){return{done:!0}},return:function(){o=!0}},-1)}catch(a){a instanceof t||(o=!1)}if(!o)return s}},4576:function(e,t,n){"use strict";var r=function(e){return e&&e.Math===Math&&e};e.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||r("object"==typeof this&&this)||function(){return this}()||Function("return this")()},4603:function(e,t,n){"use strict";var r=n(6840),i=n(9504),s=n(655),o=n(2812),a=URLSearchParams,c=a.prototype,l=i(c.append),u=i(c["delete"]),h=i(c.forEach),d=i([].push),f=new a("a=1&a=2&b=3");f["delete"]("a",1),f["delete"]("b",void 0),f+""!=="a=2"&&r(c,"delete",function(e){var t=arguments.length,n=t<2?void 0:arguments[1];if(t&&void 0===n)return u(this,e);var r=[];h(this,function(e,t){d(r,{key:t,value:e})}),o(t,1);var i,a=s(e),c=s(n),f=0,p=0,m=!1,g=r.length;while(f<g)i=r[f++],m||i.key===a?(m=!0,u(this,i.key)):p++;while(p<g)i=r[p++],i.key===a&&i.value===c||l(this,i.key,i.value)},{enumerable:!0,unsafe:!0})},4644:function(e,t,n){"use strict";var r,i,s,o=n(7811),a=n(3724),c=n(4576),l=n(4901),u=n(34),h=n(9297),d=n(6955),f=n(6823),p=n(6699),m=n(6840),g=n(2106),_=n(1625),v=n(2787),y=n(2967),w=n(8227),b=n(3392),C=n(1181),I=C.enforce,E=C.get,T=c.Int8Array,S=T&&T.prototype,k=c.Uint8ClampedArray,P=k&&k.prototype,x=T&&v(T),A=S&&v(S),R=Object.prototype,O=c.TypeError,N=w("toStringTag"),M=b("TYPED_ARRAY_TAG"),L="TypedArrayConstructor",D=o&&!!y&&"Opera"!==d(c.opera),F=!1,U={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},j={BigInt64Array:8,BigUint64Array:8},B=function(e){if(!u(e))return!1;var t=d(e);return"DataView"===t||h(U,t)||h(j,t)},$=function(e){var t=v(e);if(u(t)){var n=E(t);return n&&h(n,L)?n[L]:$(t)}},V=function(e){if(!u(e))return!1;var t=d(e);return h(U,t)||h(j,t)},q=function(e){if(V(e))return e;throw new O("Target is not a typed array")},W=function(e){if(l(e)&&(!y||_(x,e)))return e;throw new O(f(e)+" is not a typed array constructor")},H=function(e,t,n,r){if(a){if(n)for(var i in U){var s=c[i];if(s&&h(s.prototype,e))try{delete s.prototype[e]}catch(o){try{s.prototype[e]=t}catch(l){}}}A[e]&&!n||m(A,e,n?t:D&&S[e]||t,r)}},z=function(e,t,n){var r,i;if(a){if(y){if(n)for(r in U)if(i=c[r],i&&h(i,e))try{delete i[e]}catch(s){}if(x[e]&&!n)return;try{return m(x,e,n?t:D&&x[e]||t)}catch(s){}}for(r in U)i=c[r],!i||i[e]&&!n||m(i,e,t)}};for(r in U)i=c[r],s=i&&i.prototype,s?I(s)[L]=i:D=!1;for(r in j)i=c[r],s=i&&i.prototype,s&&(I(s)[L]=i);if((!D||!l(x)||x===Function.prototype)&&(x=function(){throw new O("Incorrect invocation")},D))for(r in U)c[r]&&y(c[r],x);if((!D||!A||A===R)&&(A=x.prototype,D))for(r in U)c[r]&&y(c[r].prototype,A);if(D&&v(P)!==A&&y(P,A),a&&!h(A,N))for(r in F=!0,g(A,N,{configurable:!0,get:function(){return u(this)?this[M]:void 0}}),U)c[r]&&p(c[r],M,r);e.exports={NATIVE_ARRAY_BUFFER_VIEWS:D,TYPED_ARRAY_TAG:F&&M,aTypedArray:q,aTypedArrayConstructor:W,exportTypedArrayMethod:H,exportTypedArrayStaticMethod:z,getTypedArrayConstructor:$,isView:B,isTypedArray:V,TypedArray:x,TypedArrayPrototype:A}},4659:function(e,t,n){"use strict";var r=n(3724),i=n(4913),s=n(6980);e.exports=function(e,t,n){r?i.f(e,t,s(0,n)):e[t]=n}},4901:function(e){"use strict";var t="object"==typeof document&&document.all;e.exports="undefined"==typeof t&&void 0!==t?function(e){return"function"==typeof e||e===t}:function(e){return"function"==typeof e}},4913:function(e,t,n){"use strict";var r=n(3724),i=n(5917),s=n(8686),o=n(8551),a=n(6969),c=TypeError,l=Object.defineProperty,u=Object.getOwnPropertyDescriptor,h="enumerable",d="configurable",f="writable";t.f=r?s?function(e,t,n){if(o(e),t=a(t),o(n),"function"===typeof e&&"prototype"===t&&"value"in n&&f in n&&!n[f]){var r=u(e,t);r&&r[f]&&(e[t]=n.value,n={configurable:d in n?n[d]:r[d],enumerable:h in n?n[h]:r[h],writable:!1})}return l(e,t,n)}:l:function(e,t,n){if(o(e),t=a(t),o(n),i)try{return l(e,t,n)}catch(r){}if("get"in n||"set"in n)throw new c("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},4916:function(e,t,n){"use strict";var r=n(7751),i=function(e){return{size:e,has:function(){return!1},keys:function(){return{next:function(){return{done:!0}}}}}},s=function(e){return{size:e,has:function(){return!0},keys:function(){throw new Error("e")}}};e.exports=function(e,t){var n=r("Set");try{(new n)[e](i(0));try{return(new n)[e](i(-1)),!1}catch(a){if(!t)return!0;try{return(new n)[e](s(-1/0)),!1}catch(c){var o=new n;return o.add(1),o.add(2),t(o[e](s(1/0)))}}}catch(c){return!1}}},4979:function(e,t,n){"use strict";var r=n(6518),i=n(4576),s=n(7751),o=n(6980),a=n(4913).f,c=n(9297),l=n(679),u=n(3167),h=n(2603),d=n(5002),f=n(6193),p=n(3724),m=n(6395),g="DOMException",_=s("Error"),v=s(g),y=function(){l(this,w);var e=arguments.length,t=h(e<1?void 0:arguments[0]),n=h(e<2?void 0:arguments[1],"Error"),r=new v(t,n),i=new _(t);return i.name=g,a(r,"stack",o(1,f(i.stack,1))),u(r,this,y),r},w=y.prototype=v.prototype,b="stack"in new _(g),C="stack"in new v(1,2),I=v&&p&&Object.getOwnPropertyDescriptor(i,g),E=!!I&&!(I.writable&&I.configurable),T=b&&!E&&!C;r({global:!0,constructor:!0,forced:m||T},{DOMException:T?y:v});var S=s(g),k=S.prototype;if(k.constructor!==S)for(var P in m||a(k,"constructor",o(1,S)),d)if(c(d,P)){var x=d[P],A=x.s;c(S,A)||a(S,A,o(6,x.c))}},5002:function(e){"use strict";e.exports={IndexSizeError:{s:"INDEX_SIZE_ERR",c:1,m:1},DOMStringSizeError:{s:"DOMSTRING_SIZE_ERR",c:2,m:0},HierarchyRequestError:{s:"HIERARCHY_REQUEST_ERR",c:3,m:1},WrongDocumentError:{s:"WRONG_DOCUMENT_ERR",c:4,m:1},InvalidCharacterError:{s:"INVALID_CHARACTER_ERR",c:5,m:1},NoDataAllowedError:{s:"NO_DATA_ALLOWED_ERR",c:6,m:0},NoModificationAllowedError:{s:"NO_MODIFICATION_ALLOWED_ERR",c:7,m:1},NotFoundError:{s:"NOT_FOUND_ERR",c:8,m:1},NotSupportedError:{s:"NOT_SUPPORTED_ERR",c:9,m:1},InUseAttributeError:{s:"INUSE_ATTRIBUTE_ERR",c:10,m:1},InvalidStateError:{s:"INVALID_STATE_ERR",c:11,m:1},SyntaxError:{s:"SYNTAX_ERR",c:12,m:1},InvalidModificationError:{s:"INVALID_MODIFICATION_ERR",c:13,m:1},NamespaceError:{s:"NAMESPACE_ERR",c:14,m:1},InvalidAccessError:{s:"INVALID_ACCESS_ERR",c:15,m:1},ValidationError:{s:"VALIDATION_ERR",c:16,m:0},TypeMismatchError:{s:"TYPE_MISMATCH_ERR",c:17,m:1},SecurityError:{s:"SECURITY_ERR",c:18,m:1},NetworkError:{s:"NETWORK_ERR",c:19,m:1},AbortError:{s:"ABORT_ERR",c:20,m:1},URLMismatchError:{s:"URL_MISMATCH_ERR",c:21,m:1},QuotaExceededError:{s:"QUOTA_EXCEEDED_ERR",c:22,m:1},TimeoutError:{s:"TIMEOUT_ERR",c:23,m:1},InvalidNodeTypeError:{s:"INVALID_NODE_TYPE_ERR",c:24,m:1},DataCloneError:{s:"DATA_CLONE_ERR",c:25,m:1}}},5024:function(e,t,n){"use strict";var r=n(6518),i=n(3650),s=n(9835),o=n(4916),a=!o("symmetricDifference")||!s("symmetricDifference");r({target:"Set",proto:!0,real:!0,forced:a},{symmetricDifference:i})},5031:function(e,t,n){"use strict";var r=n(7751),i=n(9504),s=n(8480),o=n(3717),a=n(8551),c=i([].concat);e.exports=r("Reflect","ownKeys")||function(e){var t=s.f(a(e)),n=o.f;return n?c(t,n(e)):t}},5130:function(e,t,n){"use strict";n.d(t,{Ef:function(){return Se},Jo:function(){return pe},aG:function(){return F},eB:function(){return y},jR:function(){return Ce},lH:function(){return me},u1:function(){return _e}});n(4114),n(8111),n(2489),n(7588),n(1701),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(6768),i=n(4232);n(144);
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let s;const o="undefined"!==typeof window&&window.trustedTypes;if(o)try{s=o.createPolicy("vue",{createHTML:e=>e})}catch(xe){}const a=s?e=>s.createHTML(e):e=>e,c="http://www.w3.org/2000/svg",l="http://www.w3.org/1998/Math/MathML",u="undefined"!==typeof document?document:null,h=u&&u.createElement("template"),d={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const i="svg"===t?u.createElementNS(c,e):"mathml"===t?u.createElementNS(l,e):n?u.createElement(e,{is:n}):u.createElement(e);return"select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>u.createTextNode(e),createComment:e=>u.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>u.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,i,s){const o=n?n.previousSibling:t.lastChild;if(i&&(i===s||i.nextSibling)){while(1)if(t.insertBefore(i.cloneNode(!0),n),i===s||!(i=i.nextSibling))break}else{h.innerHTML=a("svg"===r?`<svg>${e}</svg>`:"mathml"===r?`<math>${e}</math>`:e);const i=h.content;if("svg"===r||"mathml"===r){const e=i.firstChild;while(e.firstChild)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},f="transition",p="animation",m=Symbol("_vtc"),g={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},_=(0,i.X$)({},r.QP,g),v=e=>(e.displayName="Transition",e.props=_,e),y=v((e,{slots:t})=>(0,r.h)(r.pR,C(e),t)),w=(e,t=[])=>{(0,i.cy)(e)?e.forEach(e=>e(...t)):e&&e(...t)},b=e=>!!e&&((0,i.cy)(e)?e.some(e=>e.length>1):e.length>1);function C(e){const t={};for(const i in e)i in g||(t[i]=e[i]);if(!1===e.css)return t;const{name:n="v",type:r,duration:s,enterFromClass:o=`${n}-enter-from`,enterActiveClass:a=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:l=o,appearActiveClass:u=a,appearToClass:h=c,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:p=`${n}-leave-to`}=e,m=I(s),_=m&&m[0],v=m&&m[1],{onBeforeEnter:y,onEnter:C,onEnterCancelled:E,onLeave:P,onLeaveCancelled:A,onBeforeAppear:R=y,onAppear:O=C,onAppearCancelled:M=E}=t,L=(e,t,n,r)=>{e._enterCancelled=r,S(e,t?h:c),S(e,t?u:a),n&&n()},D=(e,t)=>{e._isLeaving=!1,S(e,d),S(e,p),S(e,f),t&&t()},F=e=>(t,n)=>{const i=e?O:C,s=()=>L(t,e,n);w(i,[t,s]),k(()=>{S(t,e?l:o),T(t,e?h:c),b(i)||x(t,r,_,s)})};return(0,i.X$)(t,{onBeforeEnter(e){w(y,[e]),T(e,o),T(e,a)},onBeforeAppear(e){w(R,[e]),T(e,l),T(e,u)},onEnter:F(!1),onAppear:F(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>D(e,t);T(e,d),e._enterCancelled?(T(e,f),N()):(N(),T(e,f)),k(()=>{e._isLeaving&&(S(e,d),T(e,p),b(P)||x(e,r,v,n))}),w(P,[e,n])},onEnterCancelled(e){L(e,!1,void 0,!0),w(E,[e])},onAppearCancelled(e){L(e,!0,void 0,!0),w(M,[e])},onLeaveCancelled(e){D(e),w(A,[e])}})}function I(e){if(null==e)return null;if((0,i.Gv)(e))return[E(e.enter),E(e.leave)];{const t=E(e);return[t,t]}}function E(e){const t=(0,i.Ro)(e);return t}function T(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[m]||(e[m]=new Set)).add(t)}function S(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));const n=e[m];n&&(n.delete(t),n.size||(e[m]=void 0))}function k(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let P=0;function x(e,t,n,r){const i=e._endId=++P,s=()=>{i===e._endId&&r()};if(null!=n)return setTimeout(s,n);const{type:o,timeout:a,propCount:c}=A(e,t);if(!o)return r();const l=o+"end";let u=0;const h=()=>{e.removeEventListener(l,d),s()},d=t=>{t.target===e&&++u>=c&&h()};setTimeout(()=>{u<c&&h()},a+1),e.addEventListener(l,d)}function A(e,t){const n=window.getComputedStyle(e),r=e=>(n[e]||"").split(", "),i=r(`${f}Delay`),s=r(`${f}Duration`),o=R(i,s),a=r(`${p}Delay`),c=r(`${p}Duration`),l=R(a,c);let u=null,h=0,d=0;t===f?o>0&&(u=f,h=o,d=s.length):t===p?l>0&&(u=p,h=l,d=c.length):(h=Math.max(o,l),u=h>0?o>l?f:p:null,d=u?u===f?s.length:c.length:0);const m=u===f&&/\b(transform|all)(,|$)/.test(r(`${f}Property`).toString());return{type:u,timeout:h,propCount:d,hasTransform:m}}function R(e,t){while(e.length<t.length)e=e.concat(e);return Math.max(...t.map((t,n)=>O(t)+O(e[n])))}function O(e){return"auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function N(){return document.body.offsetHeight}function M(e,t,n){const r=e[m];r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const L=Symbol("_vod"),D=Symbol("_vsh"),F={beforeMount(e,{value:t},{transition:n}){e[L]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):U(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!==!n&&(r?t?(r.beforeEnter(e),U(e,!0),r.enter(e)):r.leave(e,()=>{U(e,!1)}):U(e,t))},beforeUnmount(e,{value:t}){U(e,t)}};function U(e,t){e.style.display=t?e[L]:"none",e[D]=!t}const j=Symbol("");const B=/(^|;)\s*display\s*:/;function $(e,t,n){const r=e.style,s=(0,i.Kg)(n);let o=!1;if(n&&!s){if(t)if((0,i.Kg)(t))for(const e of t.split(";")){const t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&q(r,t,"")}else for(const e in t)null==n[e]&&q(r,e,"");for(const e in n)"display"===e&&(o=!0),q(r,e,n[e])}else if(s){if(t!==n){const e=r[j];e&&(n+=";"+e),r.cssText=n,o=B.test(n)}}else t&&e.removeAttribute("style");L in e&&(e[L]=o?r.display:"",e[D]&&(r.display="none"))}const V=/\s*!important$/;function q(e,t,n){if((0,i.cy)(n))n.forEach(n=>q(e,t,n));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=z(e,t);V.test(n)?e.setProperty((0,i.Tg)(r),n.replace(V,""),"important"):e[r]=n}}const W=["Webkit","Moz","ms"],H={};function z(e,t){const n=H[t];if(n)return n;let r=(0,i.PT)(t);if("filter"!==r&&r in e)return H[t]=r;r=(0,i.ZH)(r);for(let i=0;i<W.length;i++){const n=W[i]+r;if(n in e)return H[t]=n}return t}const K="http://www.w3.org/1999/xlink";function G(e,t,n,r,s,o=(0,i.J$)(t)){r&&t.startsWith("xlink:")?null==n?e.removeAttributeNS(K,t.slice(6,t.length)):e.setAttributeNS(K,t,n):null==n||o&&!(0,i.Y2)(n)?e.removeAttribute(t):e.setAttribute(t,o?"":(0,i.Bm)(n)?String(n):n)}function Y(e,t,n,r,s){if("innerHTML"===t||"textContent"===t)return void(null!=n&&(e[t]="innerHTML"===t?a(n):n));const o=e.tagName;if("value"===t&&"PROGRESS"!==o&&!o.includes("-")){const r="OPTION"===o?e.getAttribute("value")||"":e.value,i=null==n?"checkbox"===e.type?"on":"":String(n);return r===i&&"_value"in e||(e.value=i),null==n&&e.removeAttribute(t),void(e._value=n)}let c=!1;if(""===n||null==n){const r=typeof e[t];"boolean"===r?n=(0,i.Y2)(n):null==n&&"string"===r?(n="",c=!0):"number"===r&&(n=0,c=!0)}try{e[t]=n}catch(xe){0}c&&e.removeAttribute(s||t)}function Z(e,t,n,r){e.addEventListener(t,n,r)}function J(e,t,n,r){e.removeEventListener(t,n,r)}const X=Symbol("_vei");function Q(e,t,n,r,i=null){const s=e[X]||(e[X]={}),o=s[t];if(r&&o)o.value=r;else{const[n,a]=te(t);if(r){const o=s[t]=se(r,i);Z(e,n,o,a)}else o&&(J(e,n,o,a),s[t]=void 0)}}const ee=/(?:Once|Passive|Capture)$/;function te(e){let t;if(ee.test(e)){let n;t={};while(n=e.match(ee))e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}const n=":"===e[2]?e.slice(3):(0,i.Tg)(e.slice(2));return[n,t]}let ne=0;const re=Promise.resolve(),ie=()=>ne||(re.then(()=>ne=0),ne=Date.now());function se(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();(0,r.qL)(oe(e,n.value),t,5,[e])};return n.value=e,n.attached=ie(),n}function oe(e,t){if((0,i.cy)(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}return t}const ae=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,ce=(e,t,n,r,s,o)=>{const a="svg"===s;"class"===t?M(e,r,a):"style"===t?$(e,n,r):(0,i.Mp)(t)?(0,i.CP)(t)||Q(e,t,n,r,o):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):le(e,t,r,a))?(Y(e,t,r),e.tagName.includes("-")||"value"!==t&&"checked"!==t&&"selected"!==t||G(e,t,r,a,o,"value"!==t)):!e._isVueCE||!/[A-Z]/.test(t)&&(0,i.Kg)(r)?("true-value"===t?e._trueValue=r:"false-value"===t&&(e._falseValue=r),G(e,t,r,a)):Y(e,(0,i.PT)(t),r,o,t)};function le(e,t,n,r){if(r)return"innerHTML"===t||"textContent"===t||!!(t in e&&ae(t)&&(0,i.Tn)(n));if("spellcheck"===t||"draggable"===t||"translate"===t||"autocorrect"===t)return!1;if("form"===t)return!1;if("list"===t&&"INPUT"===e.tagName)return!1;if("type"===t&&"TEXTAREA"===e.tagName)return!1;if("width"===t||"height"===t){const t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return!1}return(!ae(t)||!(0,i.Kg)(n))&&t in e}
/*! #__NO_SIDE_EFFECTS__ */
"undefined"!==typeof HTMLElement&&HTMLElement;Symbol("_moveCb"),Symbol("_enterCb");const ue=e=>{const t=e.props["onUpdate:modelValue"]||!1;return(0,i.cy)(t)?e=>(0,i.DY)(t,e):t};function he(e){e.target.composing=!0}function de(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const fe=Symbol("_assign"),pe={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[fe]=ue(s);const o=r||s.props&&"number"===s.props.type;Z(e,t?"change":"input",t=>{if(t.target.composing)return;let r=e.value;n&&(r=r.trim()),o&&(r=(0,i.bB)(r)),e[fe](r)}),n&&Z(e,"change",()=>{e.value=e.value.trim()}),t||(Z(e,"compositionstart",he),Z(e,"compositionend",de),Z(e,"change",de))},mounted(e,{value:t}){e.value=null==t?"":t},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:s,number:o}},a){if(e[fe]=ue(a),e.composing)return;const c=!o&&"number"!==e.type||/^0\d/.test(e.value)?e.value:(0,i.bB)(e.value),l=null==t?"":t;if(c!==l){if(document.activeElement===e&&"range"!==e.type){if(r&&t===n)return;if(s&&e.value.trim()===l)return}e.value=l}}},me={deep:!0,created(e,t,n){e[fe]=ue(n),Z(e,"change",()=>{const t=e._modelValue,n=ye(e),r=e.checked,s=e[fe];if((0,i.cy)(t)){const e=(0,i.u3)(t,n),o=-1!==e;if(r&&!o)s(t.concat(n));else if(!r&&o){const n=[...t];n.splice(e,1),s(n)}}else if((0,i.vM)(t)){const e=new Set(t);r?e.add(n):e.delete(n),s(e)}else s(we(e,r))})},mounted:ge,beforeUpdate(e,t,n){e[fe]=ue(n),ge(e,t,n)}};function ge(e,{value:t,oldValue:n},r){let s;if(e._modelValue=t,(0,i.cy)(t))s=(0,i.u3)(t,r.props.value)>-1;else if((0,i.vM)(t))s=t.has(r.props.value);else{if(t===n)return;s=(0,i.BX)(t,we(e,!0))}e.checked!==s&&(e.checked=s)}const _e={deep:!0,created(e,{value:t,modifiers:{number:n}},s){const o=(0,i.vM)(t);Z(e,"change",()=>{const t=Array.prototype.filter.call(e.options,e=>e.selected).map(e=>n?(0,i.bB)(ye(e)):ye(e));e[fe](e.multiple?o?new Set(t):t:t[0]),e._assigning=!0,(0,r.dY)(()=>{e._assigning=!1})}),e[fe]=ue(s)},mounted(e,{value:t}){ve(e,t)},beforeUpdate(e,t,n){e[fe]=ue(n)},updated(e,{value:t}){e._assigning||ve(e,t)}};function ve(e,t){const n=e.multiple,r=(0,i.cy)(t);if(!n||r||(0,i.vM)(t)){for(let s=0,o=e.options.length;s<o;s++){const o=e.options[s],a=ye(o);if(n)if(r){const e=typeof a;o.selected="string"===e||"number"===e?t.some(e=>String(e)===String(a)):(0,i.u3)(t,a)>-1}else o.selected=t.has(a);else if((0,i.BX)(ye(o),t))return void(e.selectedIndex!==s&&(e.selectedIndex=s))}n||-1===e.selectedIndex||(e.selectedIndex=-1)}}function ye(e){return"_value"in e?e._value:e.value}function we(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const be={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Ce=(e,t)=>{const n=e._withKeys||(e._withKeys={}),r=t.join(".");return n[r]||(n[r]=n=>{if(!("key"in n))return;const r=(0,i.Tg)(n.key);return t.some(e=>e===r||be[e]===r)?e(n):void 0})},Ie=(0,i.X$)({patchProp:ce},d);let Ee;function Te(){return Ee||(Ee=(0,r.K9)(Ie))}const Se=(...e)=>{const t=Te().createApp(...e);const{mount:n}=t;return t.mount=e=>{const r=Pe(e);if(!r)return;const s=t._component;(0,i.Tn)(s)||s.render||s.template||(s.template=r.innerHTML),1===r.nodeType&&(r.textContent="");const o=n(r,!1,ke(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},t};function ke(e){return e instanceof SVGElement?"svg":"function"===typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function Pe(e){if((0,i.Kg)(e)){const t=document.querySelector(e);return t}return e}},5169:function(e,t,n){"use strict";var r=n(3238),i=TypeError;e.exports=function(e){if(r(e))throw new i("ArrayBuffer is detached");return e}},5170:function(e,t,n){"use strict";var r=n(6706),i=n(4402);e.exports=r(i.proto,"size","get")||function(e){return e.size}},5397:function(e,t,n){"use strict";var r=n(7055),i=n(7750);e.exports=function(e){return r(i(e))}},5610:function(e,t,n){"use strict";var r=n(1291),i=Math.max,s=Math.min;e.exports=function(e,t){var n=r(e);return n<0?i(n+t,0):s(n,t)}},5623:function(e,t,n){"use strict";n(456)},5636:function(e,t,n){"use strict";var r=n(4576),i=n(9504),s=n(6706),o=n(7696),a=n(5169),c=n(7394),l=n(4483),u=n(1548),h=r.structuredClone,d=r.ArrayBuffer,f=r.DataView,p=Math.min,m=d.prototype,g=f.prototype,_=i(m.slice),v=s(m,"resizable","get"),y=s(m,"maxByteLength","get"),w=i(g.getInt8),b=i(g.setInt8);e.exports=(u||l)&&function(e,t,n){var r,i=c(e),s=void 0===t?i:o(t),m=!v||!v(e);if(a(e),u&&(e=h(e,{transfer:[e]}),i===s&&(n||m)))return e;if(i>=s&&(!n||m))r=_(e,0,s);else{var g=n&&!m&&y?{maxByteLength:y(e)}:void 0;r=new d(s,g);for(var C=new f(e),I=new f(r),E=p(s,i),T=0;T<E;T++)b(I,T,w(C,T))}return u||l(e),r}},5745:function(e,t,n){"use strict";var r=n(7629);e.exports=function(e,t){return r[e]||(r[e]=t||{})}},5854:function(e,t,n){"use strict";var r=n(2777),i=TypeError;e.exports=function(e){var t=r(e,"number");if("number"==typeof t)throw new i("Can't convert number to bigint");return BigInt(t)}},5876:function(e,t,n){"use strict";var r=n(6518),i=n(3838),s=n(4916),o=!s("isSubsetOf",function(e){return e});r({target:"Set",proto:!0,real:!0,forced:o},{isSubsetOf:i})},5917:function(e,t,n){"use strict";var r=n(3724),i=n(9039),s=n(4055);e.exports=!r&&!i(function(){return 7!==Object.defineProperty(s("div"),"a",{get:function(){return 7}}).a})},5966:function(e,t,n){"use strict";var r=n(9306),i=n(4117);e.exports=function(e,t){var n=e[t];return i(n)?void 0:r(n)}},6080:function(e,t,n){"use strict";var r=n(7476),i=n(9306),s=n(616),o=r(r.bind);e.exports=function(e,t){return i(e),void 0===t?e:s?o(e,t):function(){return e.apply(t,arguments)}}},6086:function(e,t,n){"use strict";n.d(t,{KO:function(){return ee},MF:function(){return J},Sx:function(){return Q},Wp:function(){return X},j6:function(){return z},om:function(){return H},xZ:function(){return K}});n(4114),n(8111),n(2489),n(1701),n(3579);var r=n(798),i=n(6189),s=n(2455),o=n(8071);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class a{constructor(e){this.container=e}getPlatformInfoString(){const e=this.container.getProviders();return e.map(e=>{if(c(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}function c(e){const t=e.getComponent();return"VERSION"===t?.type}const l="@firebase/app",u="0.14.1",h=new i.Vy("@firebase/app"),d="@firebase/app-compat",f="@firebase/analytics-compat",p="@firebase/analytics",m="@firebase/app-check-compat",g="@firebase/app-check",_="@firebase/auth",v="@firebase/auth-compat",y="@firebase/database",w="@firebase/data-connect",b="@firebase/database-compat",C="@firebase/functions",I="@firebase/functions-compat",E="@firebase/installations",T="@firebase/installations-compat",S="@firebase/messaging",k="@firebase/messaging-compat",P="@firebase/performance",x="@firebase/performance-compat",A="@firebase/remote-config",R="@firebase/remote-config-compat",O="@firebase/storage",N="@firebase/storage-compat",M="@firebase/firestore",L="@firebase/ai",D="@firebase/firestore-compat",F="firebase",U="12.1.0",j="[DEFAULT]",B={[l]:"fire-core",[d]:"fire-core-compat",[p]:"fire-analytics",[f]:"fire-analytics-compat",[g]:"fire-app-check",[m]:"fire-app-check-compat",[_]:"fire-auth",[v]:"fire-auth-compat",[y]:"fire-rtdb",[w]:"fire-data-connect",[b]:"fire-rtdb-compat",[C]:"fire-fn",[I]:"fire-fn-compat",[E]:"fire-iid",[T]:"fire-iid-compat",[S]:"fire-fcm",[k]:"fire-fcm-compat",[P]:"fire-perf",[x]:"fire-perf-compat",[A]:"fire-rc",[R]:"fire-rc-compat",[O]:"fire-gcs",[N]:"fire-gcs-compat",[M]:"fire-fst",[D]:"fire-fst-compat",[L]:"fire-vertex","fire-js":"fire-js",[F]:"fire-js-all"},$=new Map,V=new Map,q=new Map;function W(e,t){try{e.container.addComponent(t)}catch(n){h.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function H(e){const t=e.name;if(q.has(t))return h.debug(`There were multiple attempts to register component ${t}.`),!1;q.set(t,e);for(const n of $.values())W(n,e);for(const n of V.values())W(n,e);return!0}function z(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function K(e){return null!==e&&void 0!==e&&void 0!==e.settings}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const G={["no-app"]:"No Firebase App '{$appName}' has been created - call initializeApp() first",["bad-app-name"]:"Illegal App name: '{$appName}'",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["server-app-deleted"]:"Firebase Server App has been deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",["finalization-registry-not-supported"]:"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",["invalid-server-app-environment"]:"FirebaseServerApp is not for use in browser environments."},Y=new s.FA("app","Firebase",G);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Z{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.uA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Y.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const J=U;function X(e,t={}){let n=e;if("object"!==typeof t){const e=t;t={name:e}}const i={name:j,automaticDataCollectionEnabled:!0,...t},o=i.name;if("string"!==typeof o||!o)throw Y.create("bad-app-name",{appName:String(o)});if(n||(n=(0,s.T9)()),!n)throw Y.create("no-options");const a=$.get(o);if(a){if((0,s.bD)(n,a.options)&&(0,s.bD)(i,a.config))return a;throw Y.create("duplicate-app",{appName:o})}const c=new r.h1(o);for(const r of q.values())c.addComponent(r);const l=new Z(n,i,c);return $.set(o,l),l}function Q(e=j){const t=$.get(e);if(!t&&e===j&&(0,s.T9)())return X();if(!t)throw Y.create("no-app",{appName:e});return t}function ee(e,t,n){let i=B[e]??e;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const e=[`Unable to register library "${i}" with version "${t}":`];return s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void h.warn(e.join(" "))}H(new r.uA(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const te="firebase-heartbeat-database",ne=1,re="firebase-heartbeat-store";let ie=null;function se(){return ie||(ie=(0,o.P2)(te,ne,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(re)}catch(n){console.warn(n)}}}}).catch(e=>{throw Y.create("idb-open",{originalErrorMessage:e.message})})),ie}async function oe(e){try{const t=await se(),n=t.transaction(re),r=await n.objectStore(re).get(ce(e));return await n.done,r}catch(t){if(t instanceof s.g)h.warn(t.message);else{const e=Y.create("idb-get",{originalErrorMessage:t?.message});h.warn(e.message)}}}async function ae(e,t){try{const n=await se(),r=n.transaction(re,"readwrite"),i=r.objectStore(re);await i.put(t,ce(e)),await r.done}catch(n){if(n instanceof s.g)h.warn(n.message);else{const e=Y.create("idb-set",{originalErrorMessage:n?.message});h.warn(e.message)}}}function ce(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le=1024,ue=30;class he{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new pe(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),n=de();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(e=>e.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>ue){const e=ge(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){h.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=de(),{heartbeatsToSend:t,unsentEntries:n}=fe(this._heartbeatsCache.heartbeats),r=(0,s.Uj)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return h.warn(e),""}}}function de(){const e=new Date;return e.toISOString().substring(0,10)}function fe(e,t=le){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),me(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),me(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class pe{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,s.zW)()&&(0,s.eX)().then(()=>!0).catch(()=>!1)}async read(){const e=await this._canUseIndexedDBPromise;if(e){const e=await oe(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return ae(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return ae(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function me(e){return(0,s.Uj)(JSON.stringify({version:2,heartbeats:e})).length}function ge(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(e){H(new r.uA("platform-logger",e=>new a(e),"PRIVATE")),H(new r.uA("heartbeat",e=>new he(e),"PRIVATE")),ee(l,u,e),ee(l,u,"esm2020"),ee("fire-js","")}_e("")},6119:function(e,t,n){"use strict";var r=n(5745),i=n(3392),s=r("keys");e.exports=function(e){return s[e]||(s[e]=i(e))}},6189:function(e,t,n){"use strict";n.d(t,{$b:function(){return i},Vy:function(){return l}});n(4114),n(8111),n(2489),n(1701);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const r=[];var i;(function(e){e[e["DEBUG"]=0]="DEBUG",e[e["VERBOSE"]=1]="VERBOSE",e[e["INFO"]=2]="INFO",e[e["WARN"]=3]="WARN",e[e["ERROR"]=4]="ERROR",e[e["SILENT"]=5]="SILENT"})(i||(i={}));const s={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},o=i.INFO,a={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},c=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=a[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class l{constructor(e){this.name=e,this._logLevel=o,this._logHandler=c,this._userLogHandler=null,r.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"===typeof e?s[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...e),this._logHandler(this,i.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...e),this._logHandler(this,i.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,i.INFO,...e),this._logHandler(this,i.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,i.WARN,...e),this._logHandler(this,i.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,i.ERROR,...e),this._logHandler(this,i.ERROR,...e)}}},6193:function(e,t,n){"use strict";var r=n(9504),i=Error,s=r("".replace),o=function(e){return String(new i(e).stack)}("zxcasd"),a=/\n\s*at [^:]*:[^\n]*/,c=a.test(o);e.exports=function(e,t){if(c&&"string"==typeof e&&!i.prepareStackTrace)while(t--)e=s(e,a,"");return e}},6198:function(e,t,n){"use strict";var r=n(8014);e.exports=function(e){return r(e.length)}},6269:function(e){"use strict";e.exports={}},6279:function(e,t,n){"use strict";var r=n(6840);e.exports=function(e,t,n){for(var i in t)r(e,i,t[i],n);return e}},6319:function(e,t,n){"use strict";var r=n(8551),i=n(9539);e.exports=function(e,t,n,s){try{return s?t(r(n)[0],n[1]):t(n)}catch(o){i(e,"throw",o)}}},6395:function(e){"use strict";e.exports=!1},6400:function(e,t,n){"use strict";n.d(t,{Wp:function(){return r.Wp}});var r=n(6086),i="firebase",s="12.1.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0,r.KO)(i,s,"app")},6518:function(e,t,n){"use strict";var r=n(4576),i=n(7347).f,s=n(6699),o=n(6840),a=n(9433),c=n(7740),l=n(2796);e.exports=function(e,t){var n,u,h,d,f,p,m=e.target,g=e.global,_=e.stat;if(u=g?r:_?r[m]||a(m,{}):r[m]&&r[m].prototype,u)for(h in t){if(f=t[h],e.dontCallGetSet?(p=i(u,h),d=p&&p.value):d=u[h],n=l(g?h:m+(_?".":"#")+h,e.forced),!n&&void 0!==d){if(typeof f==typeof d)continue;c(f,d)}(e.sham||d&&d.sham)&&s(f,"sham",!0),o(u,h,f,e)}}},6573:function(e,t,n){"use strict";var r=n(3724),i=n(2106),s=n(3238),o=ArrayBuffer.prototype;r&&!("detached"in o)&&i(o,"detached",{configurable:!0,get:function(){return s(this)}})},6632:function(e,t,n){"use strict";var r=n(6518),i=n(4576),s=n(9143),o=n(4154),a=i.Uint8Array,c=!a||!a.prototype.setFromBase64||!function(){var e=new a([255,255,255,255,255]);try{return void e.setFromBase64("",null)}catch(t){}try{return void e.setFromBase64("a")}catch(t){}try{e.setFromBase64("MjYyZg===")}catch(t){return 50===e[0]&&54===e[1]&&50===e[2]&&255===e[3]&&255===e[4]}}();a&&r({target:"Uint8Array",proto:!0,forced:c},{setFromBase64:function(e){o(this);var t=s(e,arguments.length>1?arguments[1]:void 0,this,this.length);return{read:t.read,written:t.written}}})},6699:function(e,t,n){"use strict";var r=n(3724),i=n(4913),s=n(6980);e.exports=r?function(e,t,n){return i.f(e,t,s(1,n))}:function(e,t,n){return e[t]=n,e}},6706:function(e,t,n){"use strict";var r=n(9504),i=n(9306);e.exports=function(e,t,n){try{return r(i(Object.getOwnPropertyDescriptor(e,t)[n]))}catch(s){}}},6768:function(e,t,n){"use strict";n.d(t,{$u:function(){return ue},CE:function(){return Qt},Df:function(){return K},EW:function(){return $n},FK:function(){return Vt},Fv:function(){return dn},Gy:function(){return L},K9:function(){return mt},Lk:function(){return on},MZ:function(){return z},OW:function(){return q},Q3:function(){return fn},QP:function(){return F},bF:function(){return an},bo:function(){return x},dY:function(){return g},eW:function(){return hn},g2:function(){return ve},h:function(){return Vn},k6:function(){return P},nI:function(){return In},pI:function(){return Ce},pR:function(){return $},qL:function(){return o},sV:function(){return ce},uX:function(){return Gt},xo:function(){return he}});n(4114),n(8111),n(1148),n(2489),n(7588),n(1701),n(8237),n(3579),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698);var r=n(144),i=n(4232);function s(e,t,n,r){try{return r?e(...r):e()}catch(i){a(i,t,n)}}function o(e,t,n,r){if((0,i.Tn)(e)){const o=s(e,t,n,r);return o&&(0,i.yL)(o)&&o.catch(e=>{a(e,t,n)}),o}if((0,i.cy)(e)){const i=[];for(let s=0;s<e.length;s++)i.push(o(e[s],t,n,r));return i}}function a(e,t,n,o=!0){const a=t?t.vnode:null,{errorHandler:l,throwUnhandledErrorInProduction:u}=t&&t.appContext.config||i.MZ;if(t){let i=t.parent;const o=t.proxy,a=`https://vuejs.org/error-reference/#runtime-${n}`;while(i){const t=i.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,o,a))return;i=i.parent}if(l)return(0,r.C4)(),s(l,null,10,[e,o,a]),void(0,r.bl)()}c(e,n,a,o,u)}function c(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}const l=[];let u=-1;const h=[];let d=null,f=0;const p=Promise.resolve();let m=null;function g(e){const t=m||p;return e?t.then(this?e.bind(this):e):t}function _(e){let t=u+1,n=l.length;while(t<n){const r=t+n>>>1,i=l[r],s=I(i);s<e||s===e&&2&i.flags?t=r+1:n=r}return t}function v(e){if(!(1&e.flags)){const t=I(e),n=l[l.length-1];!n||!(2&e.flags)&&t>=I(n)?l.push(e):l.splice(_(t),0,e),e.flags|=1,y()}}function y(){m||(m=p.then(E))}function w(e){(0,i.cy)(e)?h.push(...e):d&&-1===e.id?d.splice(f+1,0,e):1&e.flags||(h.push(e),e.flags|=1),y()}function b(e,t,n=u+1){for(0;n<l.length;n++){const t=l[n];if(t&&2&t.flags){if(e&&t.id!==e.uid)continue;0,l.splice(n,1),n--,4&t.flags&&(t.flags&=-2),t(),4&t.flags||(t.flags&=-2)}}}function C(e){if(h.length){const e=[...new Set(h)].sort((e,t)=>I(e)-I(t));if(h.length=0,d)return void d.push(...e);for(d=e,f=0;f<d.length;f++){const e=d[f];0,4&e.flags&&(e.flags&=-2),8&e.flags||e(),e.flags&=-2}d=null,f=0}}const I=e=>null==e.id?2&e.flags?-1:1/0:e.id;function E(e){i.tE;try{for(u=0;u<l.length;u++){const e=l[u];!e||8&e.flags||(4&e.flags&&(e.flags&=-2),s(e,e.i,e.i?15:14),4&e.flags||(e.flags&=-2))}}finally{for(;u<l.length;u++){const e=l[u];e&&(e.flags&=-2)}u=-1,l.length=0,C(e),m=null,(l.length||h.length)&&E(e)}}let T=null,S=null;function k(e){const t=T;return T=e,S=e&&e.type.__scopeId||null,t}function P(e,t=T,n){if(!t)return e;if(e._n)return e;const r=(...n)=>{r._d&&Jt(-1);const i=k(t);let s;try{s=e(...n)}finally{k(i),r._d&&Jt(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function x(e,t){if(null===T)return e;const n=Un(T),s=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[e,a,c,l=i.MZ]=t[o];e&&((0,i.Tn)(e)&&(e={mounted:e,updated:e}),e.deep&&(0,r.hV)(a),s.push({dir:e,instance:n,value:a,oldValue:void 0,arg:c,modifiers:l}))}return e}function A(e,t,n,i){const s=e.dirs,a=t&&t.dirs;for(let c=0;c<s.length;c++){const l=s[c];a&&(l.oldValue=a[c].value);let u=l.dir[i];u&&((0,r.C4)(),o(u,n,8,[e.el,l,e,t]),(0,r.bl)())}}const R=Symbol("_vte"),O=e=>e.__isTeleport;const N=Symbol("_leaveCb"),M=Symbol("_enterCb");function L(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return ce(()=>{e.isMounted=!0}),he(()=>{e.isUnmounting=!0}),e}const D=[Function,Array],F={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:D,onEnter:D,onAfterEnter:D,onEnterCancelled:D,onBeforeLeave:D,onLeave:D,onAfterLeave:D,onLeaveCancelled:D,onBeforeAppear:D,onAppear:D,onAfterAppear:D,onAppearCancelled:D},U=e=>{const t=e.subTree;return t.component?U(t.component):t},j={name:"BaseTransition",props:F,setup(e,{slots:t}){const n=In(),i=L();return()=>{const s=t.default&&K(t.default(),!0);if(!s||!s.length)return;const o=B(s),a=(0,r.ux)(e),{mode:c}=a;if(i.isLeaving)return W(o);const l=H(o);if(!l)return W(o);let u=q(l,a,i,n,e=>u=e);l.type!==Wt&&z(l,u);let h=n.subTree&&H(n.subTree);if(h&&h.type!==Wt&&!nn(l,h)&&U(n).type!==Wt){let e=q(h,a,i,n);if(z(h,e),"out-in"===c&&l.type!==Wt)return i.isLeaving=!0,e.afterLeave=()=>{i.isLeaving=!1,8&n.job.flags||n.update(),delete e.afterLeave,h=void 0},W(o);"in-out"===c&&l.type!==Wt?e.delayLeave=(e,t,n)=>{const r=V(i,h);r[String(h.key)]=h,e[N]=()=>{t(),e[N]=void 0,delete u.delayedLeave,h=void 0},u.delayedLeave=()=>{n(),delete u.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return o}}};function B(e){let t=e[0];if(e.length>1){let n=!1;for(const r of e)if(r.type!==Wt){0,t=r,n=!0;break}}return t}const $=j;function V(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function q(e,t,n,r,s){const{appear:a,mode:c,persisted:l=!1,onBeforeEnter:u,onEnter:h,onAfterEnter:d,onEnterCancelled:f,onBeforeLeave:p,onLeave:m,onAfterLeave:g,onLeaveCancelled:_,onBeforeAppear:v,onAppear:y,onAfterAppear:w,onAppearCancelled:b}=t,C=String(e.key),I=V(n,e),E=(e,t)=>{e&&o(e,r,9,t)},T=(e,t)=>{const n=t[1];E(e,t),(0,i.cy)(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},S={mode:c,persisted:l,beforeEnter(t){let r=u;if(!n.isMounted){if(!a)return;r=v||u}t[N]&&t[N](!0);const i=I[C];i&&nn(e,i)&&i.el[N]&&i.el[N](),E(r,[t])},enter(e){let t=h,r=d,i=f;if(!n.isMounted){if(!a)return;t=y||h,r=w||d,i=b||f}let s=!1;const o=e[M]=t=>{s||(s=!0,E(t?i:r,[e]),S.delayedLeave&&S.delayedLeave(),e[M]=void 0)};t?T(t,[e,o]):o()},leave(t,r){const i=String(e.key);if(t[M]&&t[M](!0),n.isUnmounting)return r();E(p,[t]);let s=!1;const o=t[N]=n=>{s||(s=!0,r(),E(n?_:g,[t]),t[N]=void 0,I[i]===e&&delete I[i])};I[i]=e,m?T(m,[t,o]):o()},clone(e){const i=q(e,t,n,r,s);return s&&s(i),i}};return S}function W(e){if(J(e))return e=un(e),e.children=null,e}function H(e){if(!J(e))return O(e.type)&&e.children?B(e.children):e;if(e.component)return e.component.subTree;const{shapeFlag:t,children:n}=e;if(n){if(16&t)return n[0];if(32&t&&(0,i.Tn)(n.default))return n.default()}}function z(e,t){6&e.shapeFlag&&e.component?(e.transition=t,z(e.component.subTree,t)):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function K(e,t=!1,n){let r=[],i=0;for(let s=0;s<e.length;s++){let o=e[s];const a=null==n?o.key:String(n)+String(null!=o.key?o.key:s);o.type===Vt?(128&o.patchFlag&&i++,r=r.concat(K(o.children,t,a))):(t||o.type!==Wt)&&r.push(null!=a?un(o,{key:a}):o)}if(i>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}
/*! #__NO_SIDE_EFFECTS__ */function G(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Y(e,t,n,o,a=!1){if((0,i.cy)(e))return void e.forEach((e,r)=>Y(e,t&&((0,i.cy)(t)?t[r]:t),n,o,a));if(Z(o)&&!a)return void(512&o.shapeFlag&&o.type.__asyncResolved&&o.component.subTree.component&&Y(e,t,n,o.component.subTree));const c=4&o.shapeFlag?Un(o.component):o.el,l=a?null:c,{i:u,r:h}=e;const d=t&&t.r,f=u.refs===i.MZ?u.refs={}:u.refs,p=u.setupState,m=(0,r.ux)(p),g=p===i.MZ?()=>!1:e=>(0,i.$3)(m,e);if(null!=d&&d!==h&&((0,i.Kg)(d)?(f[d]=null,g(d)&&(p[d]=null)):(0,r.i9)(d)&&(d.value=null)),(0,i.Tn)(h))s(h,u,12,[l,f]);else{const t=(0,i.Kg)(h),s=(0,r.i9)(h);if(t||s){const r=()=>{if(e.f){const n=t?g(h)?p[h]:f[h]:h.value;a?(0,i.cy)(n)&&(0,i.TF)(n,c):(0,i.cy)(n)?n.includes(c)||n.push(c):t?(f[h]=[c],g(h)&&(p[h]=f[h])):(h.value=[c],e.k&&(f[e.k]=h.value))}else t?(f[h]=l,g(h)&&(p[h]=l)):s&&(h.value=l,e.k&&(f[e.k]=l))};l?(r.id=-1,pt(r,n)):r()}else 0}}(0,i.We)().requestIdleCallback,(0,i.We)().cancelIdleCallback;const Z=e=>!!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */const J=e=>e.type.__isKeepAlive;RegExp,RegExp;function X(e,t){return(0,i.cy)(e)?e.some(e=>X(e,t)):(0,i.Kg)(e)?e.split(",").includes(t):!!(0,i.gd)(e)&&(e.lastIndex=0,e.test(t))}function Q(e,t){te(e,"a",t)}function ee(e,t){te(e,"da",t)}function te(e,t,n=Cn){const r=e.__wdc||(e.__wdc=()=>{let t=n;while(t){if(t.isDeactivated)return;t=t.parent}return e()});if(se(t,r,n),n){let e=n.parent;while(e&&e.parent)J(e.parent.vnode)&&ne(r,t,n,e),e=e.parent}}function ne(e,t,n,r){const s=se(t,e,r,!0);de(()=>{(0,i.TF)(r[t],s)},n)}function re(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function ie(e){return 128&e.shapeFlag?e.ssContent:e}function se(e,t,n=Cn,i=!1){if(n){const s=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...i)=>{(0,r.C4)();const s=Sn(n),a=o(t,n,e,i);return s(),(0,r.bl)(),a});return i?s.unshift(a):s.push(a),a}}const oe=e=>(t,n=Cn)=>{Rn&&"sp"!==e||se(e,(...e)=>t(...e),n)},ae=oe("bm"),ce=oe("m"),le=oe("bu"),ue=oe("u"),he=oe("bum"),de=oe("um"),fe=oe("sp"),pe=oe("rtg"),me=oe("rtc");function ge(e,t=Cn){se("ec",e,t)}const _e="components";function ve(e,t){return we(_e,e,!0,t)||e}const ye=Symbol.for("v-ndc");function we(e,t,n=!0,r=!1){const s=T||Cn;if(s){const n=s.type;if(e===_e){const e=jn(n,!1);if(e&&(e===t||e===(0,i.PT)(t)||e===(0,i.ZH)((0,i.PT)(t))))return n}const o=be(s[e]||n[e],t)||be(s.appContext[e],t);return!o&&r?n:o}}function be(e,t){return e&&(e[t]||e[(0,i.PT)(t)]||e[(0,i.ZH)((0,i.PT)(t))])}function Ce(e,t,n,s){let o;const a=n&&n[s],c=(0,i.cy)(e);if(c||(0,i.Kg)(e)){const n=c&&(0,r.g8)(e);let i=!1,s=!1;n&&(i=!(0,r.fE)(e),s=(0,r.Tm)(e),e=(0,r.qA)(e)),o=new Array(e.length);for(let c=0,l=e.length;c<l;c++)o[c]=t(i?s?(0,r.a1)((0,r.lJ)(e[c])):(0,r.lJ)(e[c]):e[c],c,void 0,a&&a[c])}else if("number"===typeof e){0,o=new Array(e);for(let n=0;n<e;n++)o[n]=t(n+1,n,void 0,a&&a[n])}else if((0,i.Gv)(e))if(e[Symbol.iterator])o=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{const n=Object.keys(e);o=new Array(n.length);for(let r=0,i=n.length;r<i;r++){const i=n[r];o[r]=t(e[i],i,r,a&&a[r])}}else o=[];return n&&(n[s]=o),o}const Ie=e=>e?Pn(e)?Un(e):Ie(e.parent):null,Ee=(0,i.X$)(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ie(e.parent),$root:e=>Ie(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Ne(e),$forceUpdate:e=>e.f||(e.f=()=>{v(e.update)}),$nextTick:e=>e.n||(e.n=g.bind(e.proxy)),$watch:e=>Pt.bind(e)}),Te=(e,t)=>e!==i.MZ&&!e.__isScriptSetup&&(0,i.$3)(e,t),Se={get({_:e},t){if("__v_skip"===t)return!0;const{ctx:n,setupState:s,data:o,props:a,accessCache:c,type:l,appContext:u}=e;let h;if("$"!==t[0]){const r=c[t];if(void 0!==r)switch(r){case 1:return s[t];case 2:return o[t];case 4:return n[t];case 3:return a[t]}else{if(Te(s,t))return c[t]=1,s[t];if(o!==i.MZ&&(0,i.$3)(o,t))return c[t]=2,o[t];if((h=e.propsOptions[0])&&(0,i.$3)(h,t))return c[t]=3,a[t];if(n!==i.MZ&&(0,i.$3)(n,t))return c[t]=4,n[t];Pe&&(c[t]=0)}}const d=Ee[t];let f,p;return d?("$attrs"===t&&(0,r.u4)(e.attrs,"get",""),d(e)):(f=l.__cssModules)&&(f=f[t])?f:n!==i.MZ&&(0,i.$3)(n,t)?(c[t]=4,n[t]):(p=u.config.globalProperties,(0,i.$3)(p,t)?p[t]:void 0)},set({_:e},t,n){const{data:r,setupState:s,ctx:o}=e;return Te(s,t)?(s[t]=n,!0):r!==i.MZ&&(0,i.$3)(r,t)?(r[t]=n,!0):!(0,i.$3)(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(o[t]=n,!0))},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,propsOptions:o}},a){let c;return!!n[a]||e!==i.MZ&&(0,i.$3)(e,a)||Te(t,a)||(c=o[0])&&(0,i.$3)(c,a)||(0,i.$3)(r,a)||(0,i.$3)(Ee,a)||(0,i.$3)(s.config.globalProperties,a)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:(0,i.$3)(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function ke(e){return(0,i.cy)(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}let Pe=!0;function xe(e){const t=Ne(e),n=e.proxy,s=e.ctx;Pe=!1,t.beforeCreate&&Re(t.beforeCreate,e,"bc");const{data:o,computed:a,methods:c,watch:l,provide:u,inject:h,created:d,beforeMount:f,mounted:p,beforeUpdate:m,updated:g,activated:_,deactivated:v,beforeDestroy:y,beforeUnmount:w,destroyed:b,unmounted:C,render:I,renderTracked:E,renderTriggered:T,errorCaptured:S,serverPrefetch:k,expose:P,inheritAttrs:x,components:A,directives:R,filters:O}=t,N=null;if(h&&Ae(h,s,N),c)for(const r in c){const e=c[r];(0,i.Tn)(e)&&(s[r]=e.bind(n))}if(o){0;const t=o.call(n,n);0,(0,i.Gv)(t)&&(e.data=(0,r.Kh)(t))}if(Pe=!0,a)for(const r in a){const e=a[r],t=(0,i.Tn)(e)?e.bind(n,n):(0,i.Tn)(e.get)?e.get.bind(n,n):i.tE;0;const o=!(0,i.Tn)(e)&&(0,i.Tn)(e.set)?e.set.bind(n):i.tE,c=$n({get:t,set:o});Object.defineProperty(s,r,{enumerable:!0,configurable:!0,get:()=>c.value,set:e=>c.value=e})}if(l)for(const r in l)Oe(l[r],s,n,r);if(u){const e=(0,i.Tn)(u)?u.call(n):u;Reflect.ownKeys(e).forEach(t=>{Ke(t,e[t])})}function M(e,t){(0,i.cy)(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(d&&Re(d,e,"c"),M(ae,f),M(ce,p),M(le,m),M(ue,g),M(Q,_),M(ee,v),M(ge,S),M(me,E),M(pe,T),M(he,w),M(de,C),M(fe,k),(0,i.cy)(P))if(P.length){const t=e.exposed||(e.exposed={});P.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||(e.exposed={});I&&e.render===i.tE&&(e.render=I),null!=x&&(e.inheritAttrs=x),A&&(e.components=A),R&&(e.directives=R),k&&G(e)}function Ae(e,t,n=i.tE){(0,i.cy)(e)&&(e=Ue(e));for(const s in e){const n=e[s];let o;o=(0,i.Gv)(n)?"default"in n?Ge(n.from||s,n.default,!0):Ge(n.from||s):Ge(n),(0,r.i9)(o)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:e=>o.value=e}):t[s]=o}}function Re(e,t,n){o((0,i.cy)(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function Oe(e,t,n,r){let s=r.includes(".")?xt(n,r):()=>n[r];if((0,i.Kg)(e)){const n=t[e];(0,i.Tn)(n)&&St(s,n)}else if((0,i.Tn)(e))St(s,e.bind(n));else if((0,i.Gv)(e))if((0,i.cy)(e))e.forEach(e=>Oe(e,t,n,r));else{const r=(0,i.Tn)(e.handler)?e.handler.bind(n):t[e.handler];(0,i.Tn)(r)&&St(s,r,e)}else 0}function Ne(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:o,config:{optionMergeStrategies:a}}=e.appContext,c=o.get(t);let l;return c?l=c:s.length||n||r?(l={},s.length&&s.forEach(e=>Me(l,e,a,!0)),Me(l,t,a)):l=t,(0,i.Gv)(t)&&o.set(t,l),l}function Me(e,t,n,r=!1){const{mixins:i,extends:s}=t;s&&Me(e,s,n,!0),i&&i.forEach(t=>Me(e,t,n,!0));for(const o in t)if(r&&"expose"===o);else{const r=Le[o]||n&&n[o];e[o]=r?r(e[o],t[o]):t[o]}return e}const Le={data:De,props:$e,emits:$e,methods:Be,computed:Be,beforeCreate:je,created:je,beforeMount:je,mounted:je,beforeUpdate:je,updated:je,beforeDestroy:je,beforeUnmount:je,destroyed:je,unmounted:je,activated:je,deactivated:je,errorCaptured:je,serverPrefetch:je,components:Be,directives:Be,watch:Ve,provide:De,inject:Fe};function De(e,t){return t?e?function(){return(0,i.X$)((0,i.Tn)(e)?e.call(this,this):e,(0,i.Tn)(t)?t.call(this,this):t)}:t:e}function Fe(e,t){return Be(Ue(e),Ue(t))}function Ue(e){if((0,i.cy)(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function je(e,t){return e?[...new Set([].concat(e,t))]:t}function Be(e,t){return e?(0,i.X$)(Object.create(null),e,t):t}function $e(e,t){return e?(0,i.cy)(e)&&(0,i.cy)(t)?[...new Set([...e,...t])]:(0,i.X$)(Object.create(null),ke(e),ke(null!=t?t:{})):t}function Ve(e,t){if(!e)return t;if(!t)return e;const n=(0,i.X$)(Object.create(null),e);for(const r in t)n[r]=je(e[r],t[r]);return n}function qe(){return{app:null,config:{isNativeTag:i.NO,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let We=0;function He(e,t){return function(n,r=null){(0,i.Tn)(n)||(n=(0,i.X$)({},n)),null==r||(0,i.Gv)(r)||(r=null);const s=qe(),a=new WeakSet,c=[];let l=!1;const u=s.app={_uid:We++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:qn,get config(){return s.config},set config(e){0},use(e,...t){return a.has(e)||(e&&(0,i.Tn)(e.install)?(a.add(e),e.install(u,...t)):(0,i.Tn)(e)&&(a.add(e),e(u,...t))),u},mixin(e){return s.mixins.includes(e)||s.mixins.push(e),u},component(e,t){return t?(s.components[e]=t,u):s.components[e]},directive(e,t){return t?(s.directives[e]=t,u):s.directives[e]},mount(i,o,a){if(!l){0;const c=u._ceVNode||an(n,r);return c.appContext=s,!0===a?a="svg":!1===a&&(a=void 0),o&&t?t(c,i):e(c,i,a),l=!0,u._container=i,i.__vue_app__=u,Un(c.component)}},onUnmount(e){c.push(e)},unmount(){l&&(o(c,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(e,t){return s.provides[e]=t,u},runWithContext(e){const t=ze;ze=u;try{return e()}finally{ze=t}}};return u}}let ze=null;function Ke(e,t){if(Cn){let n=Cn.provides;const r=Cn.parent&&Cn.parent.provides;r===n&&(n=Cn.provides=Object.create(r)),n[e]=t}else 0}function Ge(e,t,n=!1){const r=In();if(r||ze){let s=ze?ze._context.provides:r?null==r.parent||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&(0,i.Tn)(t)?t.call(r&&r.proxy):t}else 0}const Ye={},Ze=()=>Object.create(Ye),Je=e=>Object.getPrototypeOf(e)===Ye;function Xe(e,t,n,i=!1){const s={},o=Ze();e.propsDefaults=Object.create(null),et(e,t,s,o);for(const r in e.propsOptions[0])r in s||(s[r]=void 0);n?e.props=i?s:(0,r.Gc)(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function Qe(e,t,n,s){const{props:o,attrs:a,vnode:{patchFlag:c}}=e,l=(0,r.ux)(o),[u]=e.propsOptions;let h=!1;if(!(s||c>0)||16&c){let r;et(e,t,o,a)&&(h=!0);for(const s in l)t&&((0,i.$3)(t,s)||(r=(0,i.Tg)(s))!==s&&(0,i.$3)(t,r))||(u?!n||void 0===n[s]&&void 0===n[r]||(o[s]=tt(u,l,s,void 0,e,!0)):delete o[s]);if(a!==l)for(const e in a)t&&(0,i.$3)(t,e)||(delete a[e],h=!0)}else if(8&c){const n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let s=n[r];if(Nt(e.emitsOptions,s))continue;const c=t[s];if(u)if((0,i.$3)(a,s))c!==a[s]&&(a[s]=c,h=!0);else{const t=(0,i.PT)(s);o[t]=tt(u,l,t,c,e,!1)}else c!==a[s]&&(a[s]=c,h=!0)}}h&&(0,r.hZ)(e.attrs,"set","")}function et(e,t,n,s){const[o,a]=e.propsOptions;let c,l=!1;if(t)for(let r in t){if((0,i.SU)(r))continue;const u=t[r];let h;o&&(0,i.$3)(o,h=(0,i.PT)(r))?a&&a.includes(h)?(c||(c={}))[h]=u:n[h]=u:Nt(e.emitsOptions,r)||r in s&&u===s[r]||(s[r]=u,l=!0)}if(a){const t=(0,r.ux)(n),s=c||i.MZ;for(let r=0;r<a.length;r++){const c=a[r];n[c]=tt(o,t,c,s[c],e,!(0,i.$3)(s,c))}}return l}function tt(e,t,n,r,s,o){const a=e[n];if(null!=a){const e=(0,i.$3)(a,"default");if(e&&void 0===r){const e=a.default;if(a.type!==Function&&!a.skipFactory&&(0,i.Tn)(e)){const{propsDefaults:i}=s;if(n in i)r=i[n];else{const o=Sn(s);r=i[n]=e.call(null,t),o()}}else r=e;s.ce&&s.ce._setProp(n,r)}a[0]&&(o&&!e?r=!1:!a[1]||""!==r&&r!==(0,i.Tg)(n)||(r=!0))}return r}const nt=new WeakMap;function rt(e,t,n=!1){const r=n?nt:t.propsCache,s=r.get(e);if(s)return s;const o=e.props,a={},c=[];let l=!1;if(!(0,i.Tn)(e)){const r=e=>{l=!0;const[n,r]=rt(e,t,!0);(0,i.X$)(a,n),r&&c.push(...r)};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}if(!o&&!l)return(0,i.Gv)(e)&&r.set(e,i.Oj),i.Oj;if((0,i.cy)(o))for(let h=0;h<o.length;h++){0;const e=(0,i.PT)(o[h]);it(e)&&(a[e]=i.MZ)}else if(o){0;for(const e in o){const t=(0,i.PT)(e);if(it(t)){const n=o[e],r=a[t]=(0,i.cy)(n)||(0,i.Tn)(n)?{type:n}:(0,i.X$)({},n),s=r.type;let l=!1,u=!0;if((0,i.cy)(s))for(let e=0;e<s.length;++e){const t=s[e],n=(0,i.Tn)(t)&&t.name;if("Boolean"===n){l=!0;break}"String"===n&&(u=!1)}else l=(0,i.Tn)(s)&&"Boolean"===s.name;r[0]=l,r[1]=u,(l||(0,i.$3)(r,"default"))&&c.push(t)}}}const u=[a,c];return(0,i.Gv)(e)&&r.set(e,u),u}function it(e){return"$"!==e[0]&&!(0,i.SU)(e)}const st=e=>"_"===e||"__"===e||"_ctx"===e||"$stable"===e,ot=e=>(0,i.cy)(e)?e.map(pn):[pn(e)],at=(e,t,n)=>{if(t._n)return t;const r=P((...e)=>ot(t(...e)),n);return r._c=!1,r},ct=(e,t,n)=>{const r=e._ctx;for(const s in e){if(st(s))continue;const n=e[s];if((0,i.Tn)(n))t[s]=at(s,n,r);else if(null!=n){0;const e=ot(n);t[s]=()=>e}}},lt=(e,t)=>{const n=ot(t);e.slots.default=()=>n},ut=(e,t,n)=>{for(const r in t)!n&&st(r)||(e[r]=t[r])},ht=(e,t,n)=>{const r=e.slots=Ze();if(32&e.vnode.shapeFlag){const e=t.__;e&&(0,i.yQ)(r,"__",e,!0);const s=t._;s?(ut(r,t,n),n&&(0,i.yQ)(r,"_",s,!0)):ct(t,r)}else t&&lt(e,t)},dt=(e,t,n)=>{const{vnode:r,slots:s}=e;let o=!0,a=i.MZ;if(32&r.shapeFlag){const e=t._;e?n&&1===e?o=!1:ut(s,t,n):(o=!t.$stable,ct(t,s)),a=t}else t&&(lt(e,t),a={default:1});if(o)for(const i in s)st(i)||null!=a[i]||delete s[i]};function ft(){"boolean"!==typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__&&((0,i.We)().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__=!1)}const pt=$t;function mt(e){return gt(e)}function gt(e,t){ft();const n=(0,i.We)();n.__VUE__=!0;const{insert:s,remove:o,patchProp:a,createElement:c,createText:l,createComment:u,setText:h,setElementText:d,parentNode:f,nextSibling:p,setScopeId:m=i.tE,insertStaticContent:g}=e,_=(e,t,n,r=null,i=null,s=null,o=void 0,a=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!nn(e,t)&&(r=Q(e),H(e,i,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:l,ref:u,shapeFlag:h}=t;switch(l){case qt:y(e,t,n,r);break;case Wt:w(e,t,n,r);break;case Ht:null==e&&I(t,n,r,o);break;case Vt:L(e,t,n,r,i,s,o,a,c);break;default:1&h?S(e,t,n,r,i,s,o,a,c):6&h?D(e,t,n,r,i,s,o,a,c):(64&h||128&h)&&l.process(e,t,n,r,i,s,o,a,c,ne)}null!=u&&i?Y(u,e&&e.ref,s,t||e,!t):null==u&&e&&null!=e.ref&&Y(e.ref,null,s,e,!0)},y=(e,t,n,r)=>{if(null==e)s(t.el=l(t.children),n,r);else{const n=t.el=e.el;t.children!==e.children&&h(n,t.children)}},w=(e,t,n,r)=>{null==e?s(t.el=u(t.children||""),n,r):t.el=e.el},I=(e,t,n,r)=>{[e.el,e.anchor]=g(e.children,t,n,r,e.el,e.anchor)},E=({el:e,anchor:t},n,r)=>{let i;while(e&&e!==t)i=p(e),s(e,n,r),e=i;s(t,n,r)},T=({el:e,anchor:t})=>{let n;while(e&&e!==t)n=p(e),o(e),e=n;o(t)},S=(e,t,n,r,i,s,o,a,c)=>{"svg"===t.type?o="svg":"math"===t.type&&(o="mathml"),null==e?k(t,n,r,i,s,o,a,c):O(e,t,i,s,o,a,c)},k=(e,t,n,r,o,l,u,h)=>{let f,p;const{props:m,shapeFlag:g,transition:_,dirs:v}=e;if(f=e.el=c(e.type,l,m&&m.is,m),8&g?d(f,e.children):16&g&&x(e.children,f,null,r,o,_t(e,l),u,h),v&&A(e,null,r,"created"),P(f,e,e.scopeId,u,r),m){for(const e in m)"value"===e||(0,i.SU)(e)||a(f,e,null,m[e],l,r);"value"in m&&a(f,"value",null,m.value,l),(p=m.onVnodeBeforeMount)&&vn(p,r,e)}v&&A(e,null,r,"beforeMount");const y=yt(o,_);y&&_.beforeEnter(f),s(f,t,n),((p=m&&m.onVnodeMounted)||y||v)&&pt(()=>{p&&vn(p,r,e),y&&_.enter(f),v&&A(e,null,r,"mounted")},o)},P=(e,t,n,r,i)=>{if(n&&m(e,n),r)for(let s=0;s<r.length;s++)m(e,r[s]);if(i){let n=i.subTree;if(t===n||Bt(n.type)&&(n.ssContent===t||n.ssFallback===t)){const t=i.vnode;P(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},x=(e,t,n,r,i,s,o,a,c=0)=>{for(let l=c;l<e.length;l++){const c=e[l]=a?mn(e[l]):pn(e[l]);_(null,c,t,n,r,i,s,o,a)}},O=(e,t,n,r,s,o,c)=>{const l=t.el=e.el;let{patchFlag:u,dynamicChildren:h,dirs:f}=t;u|=16&e.patchFlag;const p=e.props||i.MZ,m=t.props||i.MZ;let g;if(n&&vt(n,!1),(g=m.onVnodeBeforeUpdate)&&vn(g,n,t,e),f&&A(t,e,n,"beforeUpdate"),n&&vt(n,!0),(p.innerHTML&&null==m.innerHTML||p.textContent&&null==m.textContent)&&d(l,""),h?N(e.dynamicChildren,h,l,n,r,_t(t,s),o):c||$(e,t,l,null,n,r,_t(t,s),o,!1),u>0){if(16&u)M(l,p,m,n,s);else if(2&u&&p.class!==m.class&&a(l,"class",null,m.class,s),4&u&&a(l,"style",p.style,m.style,s),8&u){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const r=e[t],i=p[r],o=m[r];o===i&&"value"!==r||a(l,r,i,o,s,n)}}1&u&&e.children!==t.children&&d(l,t.children)}else c||null!=h||M(l,p,m,n,s);((g=m.onVnodeUpdated)||f)&&pt(()=>{g&&vn(g,n,t,e),f&&A(t,e,n,"updated")},r)},N=(e,t,n,r,i,s,o)=>{for(let a=0;a<t.length;a++){const c=e[a],l=t[a],u=c.el&&(c.type===Vt||!nn(c,l)||198&c.shapeFlag)?f(c.el):n;_(c,l,u,null,r,i,s,o,!0)}},M=(e,t,n,r,s)=>{if(t!==n){if(t!==i.MZ)for(const o in t)(0,i.SU)(o)||o in n||a(e,o,t[o],null,s,r);for(const o in n){if((0,i.SU)(o))continue;const c=n[o],l=t[o];c!==l&&"value"!==o&&a(e,o,l,c,s,r)}"value"in n&&a(e,"value",t.value,n.value,s)}},L=(e,t,n,r,i,o,a,c,u)=>{const h=t.el=e?e.el:l(""),d=t.anchor=e?e.anchor:l("");let{patchFlag:f,dynamicChildren:p,slotScopeIds:m}=t;m&&(c=c?c.concat(m):m),null==e?(s(h,n,r),s(d,n,r),x(t.children||[],n,d,i,o,a,c,u)):f>0&&64&f&&p&&e.dynamicChildren?(N(e.dynamicChildren,p,n,i,o,a,c),(null!=t.key||i&&t===i.subTree)&&wt(e,t,!0)):$(e,t,n,d,i,o,a,c,u)},D=(e,t,n,r,i,s,o,a,c)=>{t.slotScopeIds=a,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,o,c):F(t,n,r,i,s,o,c):U(e,t,c)},F=(e,t,n,r,i,s,o)=>{const a=e.component=bn(e,r,i);if(J(e)&&(a.ctx.renderer=ne),On(a,!1,o),a.asyncDep){if(i&&i.registerDep(a,j,o),!e.el){const r=a.subTree=an(Wt);w(null,r,t,n),e.placeholder=r.el}}else j(a,e,t,n,i,s,o)},U=(e,t,n)=>{const r=t.component=e.component;if(Ft(e,t,n)){if(r.asyncDep&&!r.asyncResolved)return void B(r,t,n);r.next=t,r.update()}else t.el=e.el,r.vnode=t},j=(e,t,n,s,o,a,c)=>{const l=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:u}=e;{const n=Ct(e);if(n)return t&&(t.el=u.el,B(e,t,c)),void n.asyncDep.then(()=>{e.isUnmounted||l()})}let h,d=t;0,vt(e,!1),t?(t.el=u.el,B(e,t,c)):t=u,n&&(0,i.DY)(n),(h=t.props&&t.props.onVnodeBeforeUpdate)&&vn(h,s,t,u),vt(e,!0);const p=Mt(e);0;const m=e.subTree;e.subTree=p,_(m,p,f(m.el),Q(m),e,o,a),t.el=p.el,null===d&&jt(e,p.el),r&&pt(r,o),(h=t.props&&t.props.onVnodeUpdated)&&pt(()=>vn(h,s,t,u),o)}else{let r;const{el:c,props:l}=t,{bm:u,m:h,parent:d,root:f,type:p}=e,m=Z(t);if(vt(e,!1),u&&(0,i.DY)(u),!m&&(r=l&&l.onVnodeBeforeMount)&&vn(r,d,t),vt(e,!0),c&&ie){const t=()=>{e.subTree=Mt(e),ie(c,e.subTree,e,o,null)};m&&p.__asyncHydrate?p.__asyncHydrate(c,e,t):t()}else{f.ce&&!1!==f.ce._def.shadowRoot&&f.ce._injectChildStyle(p);const r=e.subTree=Mt(e);0,_(null,r,n,s,e,o,a),t.el=r.el}if(h&&pt(h,o),!m&&(r=l&&l.onVnodeMounted)){const e=t;pt(()=>vn(r,d,e),o)}(256&t.shapeFlag||d&&Z(d.vnode)&&256&d.vnode.shapeFlag)&&e.a&&pt(e.a,o),e.isMounted=!0,t=n=s=null}};e.scope.on();const u=e.effect=new r.X2(l);e.scope.off();const h=e.update=u.run.bind(u),d=e.job=u.runIfDirty.bind(u);d.i=e,d.id=e.uid,u.scheduler=()=>v(d),vt(e,!0),h()},B=(e,t,n)=>{t.component=e;const i=e.vnode.props;e.vnode=t,e.next=null,Qe(e,t.props,i,n),dt(e,t.children,n),(0,r.C4)(),b(e),(0,r.bl)()},$=(e,t,n,r,i,s,o,a,c=!1)=>{const l=e&&e.children,u=e?e.shapeFlag:0,h=t.children,{patchFlag:f,shapeFlag:p}=t;if(f>0){if(128&f)return void q(l,h,n,r,i,s,o,a,c);if(256&f)return void V(l,h,n,r,i,s,o,a,c)}8&p?(16&u&&X(l,i,s),h!==l&&d(n,h)):16&u?16&p?q(l,h,n,r,i,s,o,a,c):X(l,i,s,!0):(8&u&&d(n,""),16&p&&x(h,n,r,i,s,o,a,c))},V=(e,t,n,r,s,o,a,c,l)=>{e=e||i.Oj,t=t||i.Oj;const u=e.length,h=t.length,d=Math.min(u,h);let f;for(f=0;f<d;f++){const r=t[f]=l?mn(t[f]):pn(t[f]);_(e[f],r,n,null,s,o,a,c,l)}u>h?X(e,s,o,!0,!1,d):x(t,n,r,s,o,a,c,l,d)},q=(e,t,n,r,s,o,a,c,l)=>{let u=0;const h=t.length;let d=e.length-1,f=h-1;while(u<=d&&u<=f){const r=e[u],i=t[u]=l?mn(t[u]):pn(t[u]);if(!nn(r,i))break;_(r,i,n,null,s,o,a,c,l),u++}while(u<=d&&u<=f){const r=e[d],i=t[f]=l?mn(t[f]):pn(t[f]);if(!nn(r,i))break;_(r,i,n,null,s,o,a,c,l),d--,f--}if(u>d){if(u<=f){const e=f+1,i=e<h?t[e].el:r;while(u<=f)_(null,t[u]=l?mn(t[u]):pn(t[u]),n,i,s,o,a,c,l),u++}}else if(u>f)while(u<=d)H(e[u],s,o,!0),u++;else{const p=u,m=u,g=new Map;for(u=m;u<=f;u++){const e=t[u]=l?mn(t[u]):pn(t[u]);null!=e.key&&g.set(e.key,u)}let v,y=0;const w=f-m+1;let b=!1,C=0;const I=new Array(w);for(u=0;u<w;u++)I[u]=0;for(u=p;u<=d;u++){const r=e[u];if(y>=w){H(r,s,o,!0);continue}let i;if(null!=r.key)i=g.get(r.key);else for(v=m;v<=f;v++)if(0===I[v-m]&&nn(r,t[v])){i=v;break}void 0===i?H(r,s,o,!0):(I[i-m]=u+1,i>=C?C=i:b=!0,_(r,t[i],n,null,s,o,a,c,l),y++)}const E=b?bt(I):i.Oj;for(v=E.length-1,u=w-1;u>=0;u--){const e=m+u,i=t[e],d=t[e+1],f=e+1<h?d.el||d.placeholder:r;0===I[u]?_(null,i,n,f,s,o,a,c,l):b&&(v<0||u!==E[v]?W(i,n,f,2):v--)}}},W=(e,t,n,r,i=null)=>{const{el:a,type:c,transition:l,children:u,shapeFlag:h}=e;if(6&h)return void W(e.component.subTree,t,n,r);if(128&h)return void e.suspense.move(t,n,r);if(64&h)return void c.move(e,t,n,ne);if(c===Vt){s(a,t,n);for(let e=0;e<u.length;e++)W(u[e],t,n,r);return void s(e.anchor,t,n)}if(c===Ht)return void E(e,t,n);const d=2!==r&&1&h&&l;if(d)if(0===r)l.beforeEnter(a),s(a,t,n),pt(()=>l.enter(a),i);else{const{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?o(a):s(a,t,n)},h=()=>{r(a,()=>{u(),c&&c()})};i?i(a,u,h):h()}else s(a,t,n)},H=(e,t,n,i=!1,s=!1)=>{const{type:o,props:a,ref:c,children:l,dynamicChildren:u,shapeFlag:h,patchFlag:d,dirs:f,cacheIndex:p}=e;if(-2===d&&(s=!1),null!=c&&((0,r.C4)(),Y(c,null,n,e,!0),(0,r.bl)()),null!=p&&(t.renderCache[p]=void 0),256&h)return void t.ctx.deactivate(e);const m=1&h&&f,g=!Z(e);let _;if(g&&(_=a&&a.onVnodeBeforeUnmount)&&vn(_,t,e),6&h)G(e.component,n,i);else{if(128&h)return void e.suspense.unmount(n,i);m&&A(e,null,t,"beforeUnmount"),64&h?e.type.remove(e,t,n,ne,i):u&&!u.hasOnce&&(o!==Vt||d>0&&64&d)?X(u,t,n,!1,!0):(o===Vt&&384&d||!s&&16&h)&&X(l,t,n),i&&z(e)}(g&&(_=a&&a.onVnodeUnmounted)||m)&&pt(()=>{_&&vn(_,t,e),m&&A(e,null,t,"unmounted")},n)},z=e=>{const{type:t,el:n,anchor:r,transition:i}=e;if(t===Vt)return void K(n,r);if(t===Ht)return void T(e);const s=()=>{o(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(1&e.shapeFlag&&i&&!i.persisted){const{leave:t,delayLeave:r}=i,o=()=>t(n,s);r?r(e.el,s,o):o()}else s()},K=(e,t)=>{let n;while(e!==t)n=p(e),o(e),e=n;o(t)},G=(e,t,n)=>{const{bum:r,scope:s,job:o,subTree:a,um:c,m:l,a:u,parent:h,slots:{__:d}}=e;It(l),It(u),r&&(0,i.DY)(r),h&&(0,i.cy)(d)&&d.forEach(e=>{h.renderCache[e]=void 0}),s.stop(),o&&(o.flags|=8,H(a,e,t,n)),c&&pt(c,t),pt(()=>{e.isUnmounted=!0},t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve())},X=(e,t,n,r=!1,i=!1,s=0)=>{for(let o=s;o<e.length;o++)H(e[o],t,n,r,i)},Q=e=>{if(6&e.shapeFlag)return Q(e.component.subTree);if(128&e.shapeFlag)return e.suspense.next();const t=p(e.anchor||e.el),n=t&&t[R];return n?p(n):t};let ee=!1;const te=(e,t,n)=>{null==e?t._vnode&&H(t._vnode,null,null,!0):_(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ee||(ee=!0,b(),C(),ee=!1)},ne={p:_,um:H,m:W,r:z,mt:F,mc:x,pc:$,pbc:N,n:Q,o:e};let re,ie;return t&&([re,ie]=t(ne)),{render:te,hydrate:re,createApp:He(te,re)}}function _t({type:e,props:t},n){return"svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function vt({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function yt(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function wt(e,t,n=!1){const r=e.children,s=t.children;if((0,i.cy)(r)&&(0,i.cy)(s))for(let i=0;i<r.length;i++){const e=r[i];let t=s[i];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=s[i]=mn(s[i]),t.el=e.el),n||-2===t.patchFlag||wt(e,t)),t.type===qt&&(t.el=e.el),t.type!==Wt||t.el||(t.el=e.el)}}function bt(e){const t=e.slice(),n=[0];let r,i,s,o,a;const c=e.length;for(r=0;r<c;r++){const c=e[r];if(0!==c){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}s=0,o=n.length-1;while(s<o)a=s+o>>1,e[n[a]]<c?s=a+1:o=a;c<e[n[s]]&&(s>0&&(t[r]=n[s-1]),n[s]=r)}}s=n.length,o=n[s-1];while(s-- >0)n[s]=o,o=t[o];return n}function Ct(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Ct(t)}function It(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const Et=Symbol.for("v-scx"),Tt=()=>{{const e=Ge(Et);return e}};function St(e,t,n){return kt(e,t,n)}function kt(e,t,n=i.MZ){const{immediate:s,deep:a,flush:c,once:l}=n;const u=(0,i.X$)({},n);const h=t&&s||!t&&"post"!==c;let d;if(Rn)if("sync"===c){const e=Tt();d=e.__watcherHandles||(e.__watcherHandles=[])}else if(!h){const e=()=>{};return e.stop=i.tE,e.resume=i.tE,e.pause=i.tE,e}const f=Cn;u.call=(e,t,n)=>o(e,f,t,n);let p=!1;"post"===c?u.scheduler=e=>{pt(e,f&&f.suspense)}:"sync"!==c&&(p=!0,u.scheduler=(e,t)=>{t?e():v(e)}),u.augmentJob=e=>{t&&(e.flags|=4),p&&(e.flags|=2,f&&(e.id=f.uid,e.i=f))};const m=(0,r.wB)(e,t,u);return Rn&&(d?d.push(m):h&&m()),m}function Pt(e,t,n){const r=this.proxy,s=(0,i.Kg)(e)?e.includes(".")?xt(r,e):()=>r[e]:e.bind(r,r);let o;(0,i.Tn)(t)?o=t:(o=t.handler,n=t);const a=Sn(this),c=kt(s,o.bind(r),n);return a(),c}function xt(e,t){const n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}const At=(e,t)=>"modelValue"===t||"model-value"===t?e.modelModifiers:e[`${t}Modifiers`]||e[`${(0,i.PT)(t)}Modifiers`]||e[`${(0,i.Tg)(t)}Modifiers`];function Rt(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||i.MZ;let s=n;const a=t.startsWith("update:"),c=a&&At(r,t.slice(7));let l;c&&(c.trim&&(s=n.map(e=>(0,i.Kg)(e)?e.trim():e)),c.number&&(s=n.map(i.bB)));let u=r[l=(0,i.rU)(t)]||r[l=(0,i.rU)((0,i.PT)(t))];!u&&a&&(u=r[l=(0,i.rU)((0,i.Tg)(t))]),u&&o(u,e,6,s);const h=r[l+"Once"];if(h){if(e.emitted){if(e.emitted[l])return}else e.emitted={};e.emitted[l]=!0,o(h,e,6,s)}}function Ot(e,t,n=!1){const r=t.emitsCache,s=r.get(e);if(void 0!==s)return s;const o=e.emits;let a={},c=!1;if(!(0,i.Tn)(e)){const r=e=>{const n=Ot(e,t,!0);n&&(c=!0,(0,i.X$)(a,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return o||c?((0,i.cy)(o)?o.forEach(e=>a[e]=null):(0,i.X$)(a,o),(0,i.Gv)(e)&&r.set(e,a),a):((0,i.Gv)(e)&&r.set(e,null),null)}function Nt(e,t){return!(!e||!(0,i.Mp)(t))&&(t=t.slice(2).replace(/Once$/,""),(0,i.$3)(e,t[0].toLowerCase()+t.slice(1))||(0,i.$3)(e,(0,i.Tg)(t))||(0,i.$3)(e,t))}function Mt(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[o],slots:c,attrs:l,emit:u,render:h,renderCache:d,props:f,data:p,setupState:m,ctx:g,inheritAttrs:_}=e,v=k(e);let y,w;try{if(4&n.shapeFlag){const e=s||r,t=e;y=pn(h.call(t,e,d,f,m,p,g)),w=l}else{const e=t;0,y=pn(e.length>1?e(f,{attrs:l,slots:c,emit:u}):e(f,null)),w=t.props?l:Lt(l)}}catch(C){zt.length=0,a(C,e,1),y=an(Wt)}let b=y;if(w&&!1!==_){const e=Object.keys(w),{shapeFlag:t}=b;e.length&&7&t&&(o&&e.some(i.CP)&&(w=Dt(w,o)),b=un(b,w,!1,!0))}return n.dirs&&(b=un(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&z(b,n.transition),y=b,k(v),y}const Lt=e=>{let t;for(const n in e)("class"===n||"style"===n||(0,i.Mp)(n))&&((t||(t={}))[n]=e[n]);return t},Dt=(e,t)=>{const n={};for(const r in e)(0,i.CP)(r)&&r.slice(9)in t||(n[r]=e[r]);return n};function Ft(e,t,n){const{props:r,children:i,component:s}=e,{props:o,children:a,patchFlag:c}=t,l=s.emitsOptions;if(t.dirs||t.transition)return!0;if(!(n&&c>=0))return!(!i&&!a||a&&a.$stable)||r!==o&&(r?!o||Ut(r,o,l):!!o);if(1024&c)return!0;if(16&c)return r?Ut(r,o,l):!!o;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(o[n]!==r[n]&&!Nt(l,n))return!0}}return!1}function Ut(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(t[s]!==e[s]&&!Nt(n,s))return!0}return!1}function jt({vnode:e,parent:t},n){while(t){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r!==e)break;(e=t.vnode).el=n,t=t.parent}}const Bt=e=>e.__isSuspense;function $t(e,t){t&&t.pendingBranch?(0,i.cy)(e)?t.effects.push(...e):t.effects.push(e):w(e)}const Vt=Symbol.for("v-fgt"),qt=Symbol.for("v-txt"),Wt=Symbol.for("v-cmt"),Ht=Symbol.for("v-stc"),zt=[];let Kt=null;function Gt(e=!1){zt.push(Kt=e?null:[])}function Yt(){zt.pop(),Kt=zt[zt.length-1]||null}let Zt=1;function Jt(e,t=!1){Zt+=e,e<0&&Kt&&t&&(Kt.hasOnce=!0)}function Xt(e){return e.dynamicChildren=Zt>0?Kt||i.Oj:null,Yt(),Zt>0&&Kt&&Kt.push(e),e}function Qt(e,t,n,r,i,s){return Xt(on(e,t,n,r,i,s,!0))}function en(e,t,n,r,i){return Xt(an(e,t,n,r,i,!0))}function tn(e){return!!e&&!0===e.__v_isVNode}function nn(e,t){return e.type===t.type&&e.key===t.key}const rn=({key:e})=>null!=e?e:null,sn=({ref:e,ref_key:t,ref_for:n})=>("number"===typeof e&&(e=""+e),null!=e?(0,i.Kg)(e)||(0,r.i9)(e)||(0,i.Tn)(e)?{i:T,r:e,k:t,f:!!n}:e:null);function on(e,t=null,n=null,r=0,s=null,o=(e===Vt?0:1),a=!1,c=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&rn(t),ref:t&&sn(t),scopeId:S,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:T};return c?(gn(l,n),128&o&&e.normalize(l)):n&&(l.shapeFlag|=(0,i.Kg)(n)?8:16),Zt>0&&!a&&Kt&&(l.patchFlag>0||6&o)&&32!==l.patchFlag&&Kt.push(l),l}const an=cn;function cn(e,t=null,n=null,s=0,o=null,a=!1){if(e&&e!==ye||(e=Wt),tn(e)){const r=un(e,t,!0);return n&&gn(r,n),Zt>0&&!a&&Kt&&(6&r.shapeFlag?Kt[Kt.indexOf(e)]=r:Kt.push(r)),r.patchFlag=-2,r}if(Bn(e)&&(e=e.__vccOpts),t){t=ln(t);let{class:e,style:n}=t;e&&!(0,i.Kg)(e)&&(t.class=(0,i.C4)(e)),(0,i.Gv)(n)&&((0,r.ju)(n)&&!(0,i.cy)(n)&&(n=(0,i.X$)({},n)),t.style=(0,i.Tr)(n))}const c=(0,i.Kg)(e)?1:Bt(e)?128:O(e)?64:(0,i.Gv)(e)?4:(0,i.Tn)(e)?2:0;return on(e,t,n,s,o,c,a,!0)}function ln(e){return e?(0,r.ju)(e)||Je(e)?(0,i.X$)({},e):e:null}function un(e,t,n=!1,r=!1){const{props:s,ref:o,patchFlag:a,children:c,transition:l}=e,u=t?_n(s||{},t):s,h={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&rn(u),ref:t&&t.ref?n&&o?(0,i.cy)(o)?o.concat(sn(t)):[o,sn(t)]:sn(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:c,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Vt?-1===a?16:16|a:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&un(e.ssContent),ssFallback:e.ssFallback&&un(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&r&&z(h,l.clone(h)),h}function hn(e=" ",t=0){return an(qt,null,e,t)}function dn(e,t){const n=an(Ht,null,e);return n.staticCount=t,n}function fn(e="",t=!1){return t?(Gt(),en(Wt,null,e)):an(Wt,null,e)}function pn(e){return null==e||"boolean"===typeof e?an(Wt):(0,i.cy)(e)?an(Vt,null,e.slice()):tn(e)?mn(e):an(qt,null,String(e))}function mn(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:un(e)}function gn(e,t){let n=0;const{shapeFlag:r}=e;if(null==t)t=null;else if((0,i.cy)(t))n=16;else if("object"===typeof t){if(65&r){const n=t.default;return void(n&&(n._c&&(n._d=!1),gn(e,n()),n._c&&(n._d=!0)))}{n=32;const r=t._;r||Je(t)?3===r&&T&&(1===T.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=T}}else(0,i.Tn)(t)?(t={default:t,_ctx:T},n=32):(t=String(t),64&r?(n=16,t=[hn(t)]):n=8);e.children=t,e.shapeFlag|=n}function _n(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const e in r)if("class"===e)t.class!==r.class&&(t.class=(0,i.C4)([t.class,r.class]));else if("style"===e)t.style=(0,i.Tr)([t.style,r.style]);else if((0,i.Mp)(e)){const n=t[e],s=r[e];!s||n===s||(0,i.cy)(n)&&n.includes(s)||(t[e]=n?[].concat(n,s):s)}else""!==e&&(t[e]=r[e])}return t}function vn(e,t,n,r=null){o(e,t,7,[n,r])}const yn=qe();let wn=0;function bn(e,t,n){const s=e.type,o=(t?t.appContext:e.appContext)||yn,a={uid:wn++,vnode:e,type:s,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new r.yC(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:rt(s,o),emitsOptions:Ot(s,o),emit:null,emitted:null,propsDefaults:i.MZ,inheritAttrs:s.inheritAttrs,ctx:i.MZ,data:i.MZ,props:i.MZ,attrs:i.MZ,slots:i.MZ,refs:i.MZ,setupState:i.MZ,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=Rt.bind(null,a),e.ce&&e.ce(a),a}let Cn=null;const In=()=>Cn||T;let En,Tn;{const e=(0,i.We)(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};En=t("__VUE_INSTANCE_SETTERS__",e=>Cn=e),Tn=t("__VUE_SSR_SETTERS__",e=>Rn=e)}const Sn=e=>{const t=Cn;return En(e),e.scope.on(),()=>{e.scope.off(),En(t)}},kn=()=>{Cn&&Cn.scope.off(),En(null)};function Pn(e){return 4&e.vnode.shapeFlag}let xn,An,Rn=!1;function On(e,t=!1,n=!1){t&&Tn(t);const{props:r,children:i}=e.vnode,s=Pn(e);Xe(e,r,s,t),ht(e,i,n||t);const o=s?Nn(e,t):void 0;return t&&Tn(!1),o}function Nn(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Se);const{setup:o}=n;if(o){(0,r.C4)();const n=e.setupContext=o.length>1?Fn(e):null,c=Sn(e),l=s(o,e,0,[e.props,n]),u=(0,i.yL)(l);if((0,r.bl)(),c(),!u&&!e.sp||Z(e)||G(e),u){if(l.then(kn,kn),t)return l.then(n=>{Mn(e,n,t)}).catch(t=>{a(t,e,0)});e.asyncDep=l}else Mn(e,l,t)}else Ln(e,t)}function Mn(e,t,n){(0,i.Tn)(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:(0,i.Gv)(t)&&(e.setupState=(0,r.Pr)(t)),Ln(e,n)}function Ln(e,t,n){const s=e.type;if(!e.render){if(!t&&xn&&!s.render){const t=s.template||Ne(e).template;if(t){0;const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:o,compilerOptions:a}=s,c=(0,i.X$)((0,i.X$)({isCustomElement:n,delimiters:o},r),a);s.render=xn(t,c)}}e.render=s.render||i.tE,An&&An(e)}{const t=Sn(e);(0,r.C4)();try{xe(e)}finally{(0,r.bl)(),t()}}}const Dn={get(e,t){return(0,r.u4)(e,"get",""),e[t]}};function Fn(e){const t=t=>{e.exposed=t||{}};return{attrs:new Proxy(e.attrs,Dn),slots:e.slots,emit:e.emit,expose:t}}function Un(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy((0,r.Pr)((0,r.IG)(e.exposed)),{get(t,n){return n in t?t[n]:n in Ee?Ee[n](e):void 0},has(e,t){return t in e||t in Ee}})):e.proxy}function jn(e,t=!0){return(0,i.Tn)(e)?e.displayName||e.name:e.name||t&&e.__name}function Bn(e){return(0,i.Tn)(e)&&"__vccOpts"in e}const $n=(e,t)=>{const n=(0,r.EW)(e,t,Rn);return n};function Vn(e,t,n){const r=arguments.length;return 2===r?(0,i.Gv)(t)&&!(0,i.cy)(t)?tn(t)?an(e,null,[t]):an(e,t):an(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):3===r&&tn(n)&&(n=[n]),an(e,t,n))}const qn="3.5.18"},6801:function(e,t,n){"use strict";var r=n(3724),i=n(8686),s=n(4913),o=n(8551),a=n(5397),c=n(1072);t.f=r&&!i?Object.defineProperties:function(e,t){o(e);var n,r=a(t),i=c(t),l=i.length,u=0;while(l>u)s.f(e,n=i[u++],r[n]);return e}},6823:function(e){"use strict";var t=String;e.exports=function(e){try{return t(e)}catch(n){return"Object"}}},6837:function(e){"use strict";var t=TypeError,n=9007199254740991;e.exports=function(e){if(e>n)throw t("Maximum allowed index exceeded");return e}},6840:function(e,t,n){"use strict";var r=n(4901),i=n(4913),s=n(283),o=n(9433);e.exports=function(e,t,n,a){a||(a={});var c=a.enumerable,l=void 0!==a.name?a.name:t;if(r(n)&&s(n,l,a),a.global)c?e[t]=n:o(t,n);else{try{a.unsafe?e[t]&&(c=!0):delete e[t]}catch(u){}c?e[t]=n:i.f(e,t,{value:n,enumerable:!1,configurable:!a.nonConfigurable,writable:!a.nonWritable})}return e}},6955:function(e,t,n){"use strict";var r=n(2140),i=n(4901),s=n(2195),o=n(8227),a=o("toStringTag"),c=Object,l="Arguments"===s(function(){return arguments}()),u=function(e,t){try{return e[t]}catch(n){}};e.exports=r?s:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=u(t=c(e),a))?n:l?s(t):"Object"===(r=s(t))&&i(t.callee)?"Arguments":r}},6969:function(e,t,n){"use strict";var r=n(2777),i=n(757);e.exports=function(e){var t=r(e,"string");return i(t)?t:t+""}},6980:function(e){"use strict";e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},7040:function(e,t,n){"use strict";var r=n(4495);e.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},7055:function(e,t,n){"use strict";var r=n(9504),i=n(9039),s=n(2195),o=Object,a=r("".split);e.exports=i(function(){return!o("z").propertyIsEnumerable(0)})?function(e){return"String"===s(e)?a(e,""):o(e)}:o},7080:function(e,t,n){"use strict";var r=n(4402).has;e.exports=function(e){return r(e),e}},7347:function(e,t,n){"use strict";var r=n(3724),i=n(9565),s=n(8773),o=n(6980),a=n(5397),c=n(6969),l=n(9297),u=n(5917),h=Object.getOwnPropertyDescriptor;t.f=r?h:function(e,t){if(e=a(e),t=c(t),u)try{return h(e,t)}catch(n){}if(l(e,t))return o(!i(s.f,e,t),e[t])}},7394:function(e,t,n){"use strict";var r=n(4576),i=n(6706),s=n(2195),o=r.ArrayBuffer,a=r.TypeError;e.exports=o&&i(o.prototype,"byteLength","get")||function(e){if("ArrayBuffer"!==s(e))throw new a("ArrayBuffer expected");return e.byteLength}},7476:function(e,t,n){"use strict";var r=n(2195),i=n(9504);e.exports=function(e){if("Function"===r(e))return i(e)}},7566:function(e,t,n){"use strict";var r=n(6840),i=n(9504),s=n(655),o=n(2812),a=URLSearchParams,c=a.prototype,l=i(c.getAll),u=i(c.has),h=new a("a=1");!h.has("a",2)&&h.has("a",void 0)||r(c,"has",function(e){var t=arguments.length,n=t<2?void 0:arguments[1];if(t&&void 0===n)return u(this,e);var r=l(this,e);o(t,1);var i=s(n),a=0;while(a<r.length)if(r[a++]===i)return!0;return!1},{enumerable:!0,unsafe:!0})},7588:function(e,t,n){"use strict";var r=n(6518),i=n(9565),s=n(2652),o=n(9306),a=n(8551),c=n(1767),l=n(9539),u=n(4549),h=u("forEach",TypeError);r({target:"Iterator",proto:!0,real:!0,forced:h},{forEach:function(e){a(this);try{o(e)}catch(r){l(this,"throw",r)}if(h)return i(h,this,e);var t=c(this),n=0;s(t,function(t){e(t,n++)},{IS_RECORD:!0})}})},7629:function(e,t,n){"use strict";var r=n(6395),i=n(4576),s=n(9433),o="__core-js_shared__",a=e.exports=i[o]||s(o,{});(a.versions||(a.versions=[])).push({version:"3.45.0",mode:r?"pure":"global",copyright:"© 2014-2025 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.45.0/LICENSE",source:"https://github.com/zloirock/core-js"})},7642:function(e,t,n){"use strict";var r=n(6518),i=n(3440),s=n(9039),o=n(4916),a=!o("difference",function(e){return 0===e.size}),c=a||s(function(){var e={size:1,has:function(){return!0},keys:function(){var e=0;return{next:function(){var n=e++>1;return t.has(1)&&t.clear(),{done:n,value:2}}}}},t=new Set([1,2,3,4]);return 3!==t.difference(e).size});r({target:"Set",proto:!0,real:!0,forced:c},{difference:i})},7657:function(e,t,n){"use strict";var r,i,s,o=n(9039),a=n(4901),c=n(34),l=n(2360),u=n(2787),h=n(6840),d=n(8227),f=n(6395),p=d("iterator"),m=!1;[].keys&&(s=[].keys(),"next"in s?(i=u(u(s)),i!==Object.prototype&&(r=i)):m=!0);var g=!c(r)||o(function(){var e={};return r[p].call(e)!==e});g?r={}:f&&(r=l(r)),a(r[p])||h(r,p,function(){return this}),e.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:m}},7696:function(e,t,n){"use strict";var r=n(1291),i=n(8014),s=RangeError;e.exports=function(e){if(void 0===e)return 0;var t=r(e),n=i(t);if(t!==n)throw new s("Wrong length or index");return n}},7740:function(e,t,n){"use strict";var r=n(9297),i=n(5031),s=n(7347),o=n(4913);e.exports=function(e,t,n){for(var a=i(t),c=o.f,l=s.f,u=0;u<a.length;u++){var h=a[u];r(e,h)||n&&r(n,h)||c(e,h,l(t,h))}}},7750:function(e,t,n){"use strict";var r=n(4117),i=TypeError;e.exports=function(e){if(r(e))throw new i("Can't call method on "+e);return e}},7751:function(e,t,n){"use strict";var r=n(4576),i=n(4901),s=function(e){return i(e)?e:void 0};e.exports=function(e,t){return arguments.length<2?s(r[e]):r[e]&&r[e][t]}},7811:function(e){"use strict";e.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},7936:function(e,t,n){"use strict";var r=n(6518),i=n(5636);i&&r({target:"ArrayBuffer",proto:!0},{transferToFixedLength:function(){return i(this,arguments.length?arguments[0]:void 0,!1)}})},8004:function(e,t,n){"use strict";var r=n(6518),i=n(9039),s=n(8750),o=n(4916),a=!o("intersection",function(e){return 2===e.size&&e.has(1)&&e.has(2)})||i(function(){return"3,2"!==String(Array.from(new Set([1,2,3]).intersection(new Set([3,2]))))});r({target:"Set",proto:!0,real:!0,forced:a},{intersection:s})},8014:function(e,t,n){"use strict";var r=n(1291),i=Math.min;e.exports=function(e){var t=r(e);return t>0?i(t,9007199254740991):0}},8071:function(e,t,n){"use strict";n.d(t,{P2:function(){return b}});n(8111),n(3579),n(4979);const r=(e,t)=>t.some(t=>e instanceof t);let i,s;function o(){return i||(i=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function a(){return s||(s=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const c=new WeakMap,l=new WeakMap,u=new WeakMap,h=new WeakMap,d=new WeakMap;function f(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(y(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&c.set(t,e)}).catch(()=>{}),d.set(t,e),t}function p(e){if(l.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});l.set(e,t)}let m={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return l.get(e);if("objectStoreNames"===t)return e.objectStoreNames||u.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return y(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e}};function g(e){m=e(m)}function _(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?a().includes(e)?function(...t){return e.apply(w(this),t),y(c.get(this))}:function(...t){return y(e.apply(w(this),t))}:function(t,...n){const r=e.call(w(this),t,...n);return u.set(r,t.sort?t.sort():[t]),y(r)}}function v(e){return"function"===typeof e?_(e):(e instanceof IDBTransaction&&p(e),r(e,o())?new Proxy(e,m):e)}function y(e){if(e instanceof IDBRequest)return f(e);if(h.has(e))return h.get(e);const t=v(e);return t!==e&&(h.set(e,t),d.set(t,e)),t}const w=e=>d.get(e);function b(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=y(o);return r&&o.addEventListener("upgradeneeded",e=>{r(y(o.result),e.oldVersion,e.newVersion,y(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}const C=["get","getKey","getAll","getAllKeys","count"],I=["put","add","delete","clear"],E=new Map;function T(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(E.get(t))return E.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=I.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!C.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,i?"readwrite":"readonly");let o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return E.set(t,s),s}g(e=>({...e,get:(t,n,r)=>T(t,n)||e.get(t,n,r),has:(t,n)=>!!T(t,n)||e.has(t,n)}))},8100:function(e,t,n){"use strict";var r=n(6518),i=n(5636);i&&r({target:"ArrayBuffer",proto:!0},{transfer:function(){return i(this,arguments.length?arguments[0]:void 0,!0)}})},8111:function(e,t,n){"use strict";var r=n(6518),i=n(4576),s=n(679),o=n(8551),a=n(4901),c=n(2787),l=n(2106),u=n(4659),h=n(9039),d=n(9297),f=n(8227),p=n(7657).IteratorPrototype,m=n(3724),g=n(6395),_="constructor",v="Iterator",y=f("toStringTag"),w=TypeError,b=i[v],C=g||!a(b)||b.prototype!==p||!h(function(){b({})}),I=function(){if(s(this,p),c(this)===p)throw new w("Abstract class Iterator not directly constructable")},E=function(e,t){m?l(p,e,{configurable:!0,get:function(){return t},set:function(t){if(o(this),this===p)throw new w("You can't redefine this property");d(this,e)?this[e]=t:u(this,e,t)}}):p[e]=t};d(p,y)||E(y,v),!C&&d(p,_)&&p[_]!==Object||E(_,I),I.prototype=p,r({global:!0,constructor:!0,forced:C},{Iterator:I})},8227:function(e,t,n){"use strict";var r=n(4576),i=n(5745),s=n(9297),o=n(3392),a=n(4495),c=n(7040),l=r.Symbol,u=i("wks"),h=c?l["for"]||l:l&&l.withoutSetter||o;e.exports=function(e){return s(u,e)||(u[e]=a&&s(l,e)?l[e]:h("Symbol."+e)),u[e]}},8237:function(e,t,n){"use strict";var r=n(6518),i=n(2652),s=n(9306),o=n(8551),a=n(1767),c=n(9539),l=n(4549),u=n(8745),h=n(9039),d=TypeError,f=h(function(){[].keys().reduce(function(){},void 0)}),p=!f&&l("reduce",d);r({target:"Iterator",proto:!0,real:!0,forced:f||p},{reduce:function(e){o(this);try{s(e)}catch(h){c(this,"throw",h)}var t=arguments.length<2,n=t?void 0:arguments[1];if(p)return u(p,this,t?[e]:[e,n]);var r=a(this),l=0;if(i(r,function(r){t?(t=!1,n=r):n=e(n,r,l),l++},{IS_RECORD:!0}),t)throw new d("Reduce of empty iterator with no initial value");return n}})},8252:function(e,t,n){n(4114),n(8111),n(1148),n(2489),n(7588),n(1701),n(4979),n(4603),n(7566),n(8721),e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="fb15")}({"0384":function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,".ldmap-vue-custom-ui[data-v-ec61ad9c]{position:absolute}.ldmap-vue-custom-ui-top[data-v-ec61ad9c]{top:0}.ldmap-vue-custom-ui-bottom[data-v-ec61ad9c]{bottom:0}.ldmap-vue-custom-ui-right[data-v-ec61ad9c]{right:0}.ldmap-vue-custom-ui-left[data-v-ec61ad9c]{left:0}.ldmap-vue-custom-ui-center-x[data-v-ec61ad9c]{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.ldmap-vue-custom-ui-center-y[data-v-ec61ad9c]{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.ldmap-vue-custom-ui-center[data-v-ec61ad9c]{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}",""]),e.exports=t},"0fa1":function(e,t,n){var r=n("23f7");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=n("499e").default;i("9b0f5784",r,!0,{sourceMap:!1,shadowMode:!1})},"117a":function(e,t,n){"use strict";n("0fa1")},"23f7":function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,".ldmap-vue-lock-screen[data-v-f7d580b0]{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}.ldmap-vue-lock-screen-unlock[data-v-f7d580b0]{pointer-events:none}.ldmap-vue-lock-screen-button-container[data-v-f7d580b0]{display:inline-block;pointer-events:auto}.ldmap-vue-lock-screen-button[data-v-f7d580b0]{position:absolute;bottom:0;left:0;color:#fff;background-color:#2a5082;font-size:.875rem;line-height:1.25rem;font-weight:700;border:0;border-radius:.25rem;margin:0 0 1rem 1rem;padding:.5rem 1rem .5rem 1rem;cursor:pointer;opacity:.05;-webkit-box-shadow:2px 3px 4px rgba(0,0,0,.2);box-shadow:2px 3px 4px rgba(0,0,0,.2);-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-timing-function:linear;transition-timing-function:linear;-webkit-transition-duration:.5s;transition-duration:.5s}.ldmap-vue-lock-screen:hover .ldmap-vue-lock-screen-button[data-v-f7d580b0]{opacity:1}.ldmap-vue-lock-screen-area[data-v-f7d580b0]{height:100%;width:100%;overflow:hidden;opacity:0;background-color:rgba(0,0,0,.5);-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-timing-function:linear;transition-timing-function:linear;-webkit-transition-duration:.5s;transition-duration:.5s}.ldmap-vue-lock-screen-area-message[data-v-f7d580b0]{top:50%;position:relative;padding:0 .5rem;transform:translateY(-50%);-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);text-align:center;font-size:1.5rem;line-height:2rem;color:#fff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ldmap-vue-lock-screen-area-active[data-v-f7d580b0]{opacity:1}",""]),e.exports=t},"24fb":function(e,t,n){"use strict";function r(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"===typeof btoa){var s=i(r),o=r.sources.map(function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")});return[n].concat(o).concat([s]).join("\n")}return[n].join("\n")}function i(e){var t=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t);return"/*# ".concat(n," */")}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=r(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n}).join("")},t.i=function(e,n,r){"string"===typeof e&&(e=[[null,e,""]]);var i={};if(r)for(var s=0;s<this.length;s++){var o=this[s][0];null!=o&&(i[o]=!0)}for(var a=0;a<e.length;a++){var c=[].concat(e[a]);r&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},"33be":function(e,t,n){"use strict";n("77e7")},"3c6a":function(e,t,n){var r=n("e6b4");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=n("499e").default;i("675c9ed0",r,!0,{sourceMap:!1,shadowMode:!1})},4544:function(e,t,n){"use strict";n("6f84")},"499e":function(e,t,n){"use strict";function r(e,t){for(var n=[],r={},i=0;i<t.length;i++){var s=t[i],o=s[0],a=s[1],c=s[2],l=s[3],u={id:e+":"+i,css:a,media:c,sourceMap:l};r[o]?r[o].parts.push(u):n.push(r[o]={id:o,parts:[u]})}return n}n.r(t),n.d(t,"default",function(){return p});var i="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},o=i&&(document.head||document.getElementsByTagName("head")[0]),a=null,c=0,l=!1,u=function(){},h=null,d="data-vue-ssr-id",f="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(e,t,n,i){l=n,h=i||{};var o=r(e,t);return m(o),function(t){for(var n=[],i=0;i<o.length;i++){var a=o[i],c=s[a.id];c.refs--,n.push(c)}t?(o=r(e,t),m(o)):o=[];for(i=0;i<n.length;i++){c=n[i];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete s[c.id]}}}}function m(e){for(var t=0;t<e.length;t++){var n=e[t],r=s[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(_(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var o=[];for(i=0;i<n.parts.length;i++)o.push(_(n.parts[i]));s[n.id]={id:n.id,refs:1,parts:o}}}}function g(){var e=document.createElement("style");return e.type="text/css",o.appendChild(e),e}function _(e){var t,n,r=document.querySelector("style["+d+'~="'+e.id+'"]');if(r){if(l)return u;r.parentNode.removeChild(r)}if(f){var i=c++;r=a||(a=g()),t=y.bind(null,r,i,!1),n=y.bind(null,r,i,!0)}else r=g(),t=w.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}var v=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function y(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(t,i);else{var s=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(s,o[t]):e.appendChild(s)}}function w(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),h.ssrId&&e.setAttribute(d,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{while(e.firstChild)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},"56dd":function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,".ldmap-vue-container[data-v-15e6d8f1]{position:relative;font-family:Tahoma,sans-serif}.ldmap-vue-container[data-v-15e6d8f1],.ldmap-vue-placeholder[data-v-15e6d8f1]{width:100%;height:100%}",""]),e.exports=t},"60cc":function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,".ldmap-vue-panorama{width:100%;height:100%}",""]),e.exports=t},6532:function(e,t,n){var r=n("56dd");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=n("499e").default;i("af4d9b50",r,!0,{sourceMap:!1,shadowMode:!1})},"6f84":function(e,t,n){var r=n("0384");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=n("499e").default;i("7f9adbbc",r,!0,{sourceMap:!1,shadowMode:!1})},7397:function(e,t,n){var r,i;(function(s,o,a){e.exports?e.exports=a():(r=a,i="function"===typeof r?r.call(t,n,t,e):r,void 0===i||(e.exports=i))})(0,0,function(){var e={defaultRadius:40,defaultRenderer:"canvas2d",defaultGradient:{.25:"rgb(0,0,255)",.55:"rgb(0,255,0)",.85:"yellow",1:"rgb(255,0,0)"},defaultMaxOpacity:1,defaultMinOpacity:0,defaultBlur:.85,defaultXField:"x",defaultYField:"y",defaultValueField:"value",plugins:{}},t=function(){var t=function(e){this._coordinator={},this._data=[],this._radi=[],this._min=10,this._max=1,this._xField=e["xField"]||e.defaultXField,this._yField=e["yField"]||e.defaultYField,this._valueField=e["valueField"]||e.defaultValueField,e["radius"]&&(this._cfgRadius=e["radius"])},n=e.defaultRadius;return t.prototype={_organiseData:function(e,t){var r=e[this._xField],i=e[this._yField],s=this._radi,o=this._data,a=this._max,c=this._min,l=e[this._valueField]||1,u=e.radius||this._cfgRadius||n;o[r]||(o[r]=[],s[r]=[]),o[r][i]?o[r][i]+=l:(o[r][i]=l,s[r][i]=u);var h=o[r][i];return h>a?(t?this.setDataMax(h):this._max=h,!1):h<c?(t?this.setDataMin(h):this._min=h,!1):{x:r,y:i,value:l,radius:u,min:c,max:a}},_unOrganizeData:function(){var e=[],t=this._data,n=this._radi;for(var r in t)for(var i in t[r])e.push({x:r,y:i,radius:n[r][i],value:t[r][i]});return{min:this._min,max:this._max,data:e}},_onExtremaChange:function(){this._coordinator.emit("extremachange",{min:this._min,max:this._max})},addData:function(){if(arguments[0].length>0){var e=arguments[0],t=e.length;while(t--)this.addData.call(this,e[t])}else{var n=this._organiseData(arguments[0],!0);n&&(0===this._data.length&&(this._min=this._max=n.value),this._coordinator.emit("renderpartial",{min:this._min,max:this._max,data:[n]}))}return this},setData:function(e){var t=e.data,n=t.length;this._data=[],this._radi=[];for(var r=0;r<n;r++)this._organiseData(t[r],!1);return this._max=e.max,this._min=e.min||0,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this},removeData:function(){},setDataMax:function(e){return this._max=e,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this},setDataMin:function(e){return this._min=e,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this},setCoordinator:function(e){this._coordinator=e},_getInternalData:function(){return{max:this._max,min:this._min,data:this._data,radi:this._radi}},getData:function(){return this._unOrganizeData()}},t}(),n=function(){var e=function(e){var t=e.gradient||e.defaultGradient,n=document.createElement("canvas"),r=n.getContext("2d");n.width=256,n.height=1;var i=r.createLinearGradient(0,0,256,1);for(var s in t)i.addColorStop(s,t[s]);return r.fillStyle=i,r.fillRect(0,0,256,1),r.getImageData(0,0,256,1).data},t=function(e,t){var n=document.createElement("canvas"),r=n.getContext("2d"),i=e,s=e;if(n.width=n.height=2*e,1==t)r.beginPath(),r.arc(i,s,e,0,2*Math.PI,!1),r.fillStyle="rgba(0,0,0,1)",r.fill();else{var o=r.createRadialGradient(i,s,e*t,i,s,e);o.addColorStop(0,"rgba(0,0,0,1)"),o.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=o,r.fillRect(0,0,2*e,2*e)}return n},n=function(e){var t=[],n=e.min,r=e.max,i=e.radi,s=(e=e.data,Object.keys(e)),o=s.length;while(o--){var a=s[o],c=Object.keys(e[a]),l=c.length;while(l--){var u=c[l],h=e[a][u],d=i[a][u];t.push({x:a,y:u,value:h,radius:d})}}return{min:n,max:r,data:t}};function r(t){var n=t.container,r=this.shadowCanvas=document.createElement("canvas"),i=this.canvas=t.canvas||document.createElement("canvas"),s=(this._renderBoundaries=[1e4,1e4,0,0],getComputedStyle(t.container)||{});i.className="heatmap-canvas",this._width=i.width=r.width=t.width||+s.width.replace(/px/,""),this._height=i.height=r.height=t.height||+s.height.replace(/px/,""),this.shadowCtx=r.getContext("2d"),this.ctx=i.getContext("2d"),i.style.cssText=r.style.cssText="position:absolute;left:0;top:0;",n.style.position="relative",n.appendChild(i),this._palette=e(t),this._templates={},this._setStyles(t)}return r.prototype={renderPartial:function(e){e.data.length>0&&(this._drawAlpha(e),this._colorize())},renderAll:function(e){this._clear(),e.data.length>0&&(this._drawAlpha(n(e)),this._colorize())},_updateGradient:function(t){this._palette=e(t)},updateConfig:function(e){e["gradient"]&&this._updateGradient(e),this._setStyles(e)},setDimensions:function(e,t){this._width=e,this._height=t,this.canvas.width=this.shadowCanvas.width=e,this.canvas.height=this.shadowCanvas.height=t},_clear:function(){this.shadowCtx.clearRect(0,0,this._width,this._height),this.ctx.clearRect(0,0,this._width,this._height)},_setStyles:function(e){this._blur=0==e.blur?0:e.blur||e.defaultBlur,e.backgroundColor&&(this.canvas.style.backgroundColor=e.backgroundColor),this._width=this.canvas.width=this.shadowCanvas.width=e.width||this._width,this._height=this.canvas.height=this.shadowCanvas.height=e.height||this._height,this._opacity=255*(e.opacity||0),this._maxOpacity=255*(e.maxOpacity||e.defaultMaxOpacity),this._minOpacity=255*(e.minOpacity||e.defaultMinOpacity),this._useGradientOpacity=!!e.useGradientOpacity},_drawAlpha:function(e){var n=this._min=e.min,r=this._max=e.max,i=(e=e.data||[],e.length),s=1-this._blur;while(i--){var o,a=e[i],c=a.x,l=a.y,u=a.radius,h=Math.min(a.value,r),d=c-u,f=l-u,p=this.shadowCtx;this._templates[u]?o=this._templates[u]:this._templates[u]=o=t(u,s);var m=(h-n)/(r-n);p.globalAlpha=m<.01?.01:m,p.drawImage(o,d,f),d<this._renderBoundaries[0]&&(this._renderBoundaries[0]=d),f<this._renderBoundaries[1]&&(this._renderBoundaries[1]=f),d+2*u>this._renderBoundaries[2]&&(this._renderBoundaries[2]=d+2*u),f+2*u>this._renderBoundaries[3]&&(this._renderBoundaries[3]=f+2*u)}},_colorize:function(){var e=this._renderBoundaries[0],t=this._renderBoundaries[1],n=this._renderBoundaries[2]-e,r=this._renderBoundaries[3]-t,i=this._width,s=this._height,o=this._opacity,a=this._maxOpacity,c=this._minOpacity,l=this._useGradientOpacity;e<0&&(e=0),t<0&&(t=0),e+n>i&&(n=i-e),t+r>s&&(r=s-t);for(var u=this.shadowCtx.getImageData(e,t,n,r),h=u.data,d=h.length,f=this._palette,p=3;p<d;p+=4){var m,g=h[p],_=4*g;if(_)m=o>0?o:g<a?g<c?c:g:a,h[p-3]=f[_],h[p-2]=f[_+1],h[p-1]=f[_+2],h[p]=l?f[_+3]:m}u.data=h,this.ctx.putImageData(u,e,t),this._renderBoundaries=[1e3,1e3,0,0]},getValueAt:function(e){var t,n=this.shadowCtx,r=n.getImageData(e.x,e.y,1,1),i=r.data[3],s=this._max,o=this._min;return t=Math.abs(s-o)*(i/255)|0,t},getDataURL:function(){return this.canvas.toDataURL()}},r}(),r=function(){var t=!1;return"canvas2d"===e["defaultRenderer"]&&(t=n),t}(),i={merge:function(){for(var e={},t=arguments.length,n=0;n<t;n++){var r=arguments[n];for(var i in r)e[i]=r[i]}return e}},s=function(){var n=function(){function e(){this.cStore={}}return e.prototype={on:function(e,t,n){var r=this.cStore;r[e]||(r[e]=[]),r[e].push(function(e){return t.call(n,e)})},emit:function(e,t){var n=this.cStore;if(n[e])for(var r=n[e].length,i=0;i<r;i++){var s=n[e][i];s(t)}}},e}(),s=function(e){var t=e._renderer,n=e._coordinator,r=e._store;n.on("renderpartial",t.renderPartial,t),n.on("renderall",t.renderAll,t),n.on("extremachange",function(t){e._config.onExtremaChange&&e._config.onExtremaChange({min:t.min,max:t.max,gradient:e._config["gradient"]||e._config["defaultGradient"]})}),r.setCoordinator(n)};function o(){var o=this._config=i.merge(e,arguments[0]||{});if(this._coordinator=new n,o["plugin"]){var a=o["plugin"];if(!e.plugins[a])throw new Error("Plugin '"+a+"' not found. Maybe it was not registered.");var c=e.plugins[a];this._renderer=new c.renderer(o),this._store=new c.store(o)}else this._renderer=new r(o),this._store=new t(o);s(this)}return o.prototype={addData:function(){return this._store.addData.apply(this._store,arguments),this},removeData:function(){return this._store.removeData&&this._store.removeData.apply(this._store,arguments),this},setData:function(){return this._store.setData.apply(this._store,arguments),this},setDataMax:function(){return this._store.setDataMax.apply(this._store,arguments),this},setDataMin:function(){return this._store.setDataMin.apply(this._store,arguments),this},configure:function(e){return this._config=i.merge(this._config,e),this._renderer.updateConfig(this._config),this._coordinator.emit("renderall",this._store._getInternalData()),this},repaint:function(){return this._coordinator.emit("renderall",this._store._getInternalData()),this},getData:function(){return this._store.getData()},getDataURL:function(){return this._renderer.getDataURL()},getValueAt:function(e){return this._store.getValueAt?this._store.getValueAt(e):this._renderer.getValueAt?this._renderer.getValueAt(e):null}},o}(),o={create:function(e){return new s(e)},register:function(t,n){e.plugins[t]=n}};return o})},"77e7":function(e,t,n){var r=n("60cc");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=n("499e").default;i("431352b1",r,!0,{sourceMap:!1,shadowMode:!1})},8875:function(e,t,n){var r,i,s;(function(n,o){i=[],r=o,s="function"===typeof r?r.apply(t,i):r,void 0===s||(e.exports=s)})("undefined"!==typeof self&&self,function(){function e(){var t=Object.getOwnPropertyDescriptor(document,"currentScript");if(!t&&"currentScript"in document&&document.currentScript)return document.currentScript;if(t&&t.get!==e&&document.currentScript)return document.currentScript;try{throw new Error}catch(f){var n,r,i,s=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,o=/@([^@]*):(\d+):(\d+)\s*$/gi,a=s.exec(f.stack)||o.exec(f.stack),c=a&&a[1]||!1,l=a&&a[2]||!1,u=document.location.href.replace(document.location.hash,""),h=document.getElementsByTagName("script");c===u&&(n=document.documentElement.outerHTML,r=new RegExp("(?:[^\\n]+?\\n){0,"+(l-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),i=n.replace(r,"$1").trim());for(var d=0;d<h.length;d++){if("interactive"===h[d].readyState)return h[d];if(h[d].src===c)return h[d];if(c===u&&h[d].innerHTML&&h[d].innerHTML.trim()===i)return h[d]}return null}}return e})},d7d2:function(e,t,n){"use strict";n("6532")},e6b4:function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,".marker-cluster-small{background-color:rgba(181,226,140,.6)}.marker-cluster-small div{background-color:rgba(110,204,57,.6)}.marker-cluster-medium{background-color:rgba(241,211,87,.6)}.marker-cluster-medium div{background-color:rgba(240,194,12,.6)}.marker-cluster-large{background-color:rgba(253,156,115,.6)}.marker-cluster-large div{background-color:rgba(241,128,23,.6)}.marker-cluster{background-clip:padding-box;border-radius:20px;cursor:pointer}.marker-cluster div{width:34px;height:34px;margin-left:5px;margin-top:5px;text-align:center;border-radius:15px;font:12px Helvetica Neue,Arial,Helvetica,sans-serif}.marker-cluster span{line-height:34px}",""]),e.exports=t},e8ba:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}n.r(t),n.d(t,"default",function(){return N});var o=window.longdo,a=function(){function e(t){r(this,e),this._projection=o.Projections.EPSG3857,this._locationList=t.slice(),this._originalLocationList=this._locationList.slice(),t.length>0&&(this._bounds=o.Util.locationBound(this._locationList))}return s(e,[{key:"getBounds",value:function(){return{minLon:this._bounds.minLon,minLat:this._bounds.minLat,maxLon:this._bounds.maxLon,maxLat:this._bounds.maxLat}}},{key:"LT",value:function(){return{lon:this._bounds.minLon,lat:this._bounds.maxLat}}},{key:"RT",value:function(){return{lon:this._bounds.maxLon,lat:this._bounds.maxLat}}},{key:"LB",value:function(){return{lon:this._bounds.minLon,lat:this._bounds.minLat}}},{key:"RB",value:function(){return{lon:this._bounds.maxLon,lat:this._bounds.minLat}}},{key:"getMinimumBounds",value:function(){var e=o.Util.locationBound(this._originalLocationList);return e}},{key:"add",value:function(e){this._locationList.push(e),this._originalLocationList.push(e),this._bounds=o.Util.locationBound(this._locationList)}},{key:"remove",value:function(e){this._locationList=this._locationList.filter(function(t){return t!==e}),this._originalLocationList=this._originalLocationList.filter(function(t){return t!==e}),this._bounds=this.empty()?null:o.Util.locationBound(this._locationList)}},{key:"empty",value:function(){return 0===this._locationList.length}},{key:"getLocations",value:function(){return this._locationList.slice()}},{key:"isLocInBounds",value:function(e){var t=o.Util.contains(e,this.getRectVertex());return null===t||t}},{key:"extendSize",value:function(e){var t=this._bounds,n=this._projection.latToNorm(t.maxLat)+e,r=this._projection.latToNorm(t.minLat)-e;return this._locationList.push({lon:t.minLon-e,lat:this._projection.normToLat(r)}),this._locationList.push({lon:t.minLon-e,lat:this._projection.normToLat(n)}),this._locationList.push({lon:t.minLon+e,lat:this._projection.normToLat(r)}),this._locationList.push({lon:t.maxLon+e,lat:this._projection.normToLat(n)}),this._bounds=o.Util.locationBound(this._locationList),this}},{key:"getRectVertex",value:function(){return[{lon:this._bounds.minLon,lat:this._bounds.minLat},{lon:this._bounds.minLon,lat:this._bounds.maxLat},{lon:this._bounds.maxLon,lat:this._bounds.maxLat},{lon:this._bounds.maxLon,lat:this._bounds.minLat}]}},{key:"drawArea",value:function(e){this._poly=new o.Polygon(this.getRectVertex()),e.Overlays.add(this._poly)}},{key:"removeArea",value:function(e){this._poly&&this._poly.active()&&(e.Overlays.remove(this._poly),delete this._poly)}},{key:"getNxNGridCord",value:function(e,t){if(!this.isLocInBounds(e))return null;var n=(this._bounds.maxLon-this._bounds.minLon)/t,r=(this._lat2y(this._bounds.maxLat)-this._lat2y(this._bounds.minLat))/t,i=e.lon-this._bounds.minLon,s=-this._lat2y(e.lat)+this._lat2y(this._bounds.maxLat),o=Math.floor(i/n),a=Math.floor(s/r);return{u:o,v:a}}},{key:"_y2lat",value:function(e){return 90*(Math.atan(Math.exp(e/(180/Math.PI)))/(Math.PI/4)-1)}},{key:"_lat2y",value:function(e){return Math.log(Math.tan((e/90+1)*(Math.PI/4)))*(180/Math.PI)}}],[{key:"generateFrom",value:function(t){return new e([{lon:t.minLon,lat:t.minLat},{lon:t.maxLon,lat:t.maxLat}])}},{key:"generateRect",value:function(t,n){return n||(n=t),new e([t,n])}}]),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t&&c(e.prototype,t),n&&c(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var h=l(function e(t){u(this,e),this.maxZoom=t.maxZoom||null,this.minClusterSize=t.minClusterSize||2,this.textColor=t.textColor||"black",this.customOuterClusterCSS=t.customOuterClusterCSS||{},this.customInnerClusterCSS=t.customInnerClusterCSS||{},this.customTextClusterCSS=t.customTextClusterCSS||{},this.gridSize=t.gridSize||120,this.clusterRadius=t.clusterRadius||this.gridSize,this.averageCenter=t.averageCenter,this.drawMarkerArea=t.drawMarkerArea,this.swarmModeEnabled=t.swarmModeEnabled,this.swarmAlg=t.swarmAlg?parseInt(t.swarmAlg,10):null,this.styles=t.styles||null,this.swarmGridLength=t.swarmGridLength?parseInt(t.swarmGridLength,10):null,this.swarmMarkersMaxLimit=t.swarmMarkersMaxLimit?parseInt(t.swarmMarkersMaxLimit,10):null,this.swarmMarkersAmountAdjust=t.swarmMarkersAmountAdjust,this.swarmMarkersMaxAmountPerTile=t.swarmMarkersMaxAmountPerTile?parseInt(t.swarmMarkersMaxAmountPerTile,10):null,this.swarmMarkersConstPerGrid=t.swarmMarkersConstPerGrid?parseInt(t.swarmMarkersConstPerGrid,10):null});function d(e){return g(e)||m(e)||p(e)||f()}function f(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function p(e,t){if(e){if("string"===typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}function m(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function g(e){if(Array.isArray(e))return _(e)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(e,t,n){return t&&y(e.prototype,t),n&&y(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var b=window.longdo,C=function(){function e(t,n,r){v(this,e),this._cluster=t,this._config=n,this._iloader=r,this._center=null,this._map=t._map,this._sums=null,this._clusterMarker=new b.Marker({lat:0,lon:0},{icon:this._cluster._markerCluster._iloader.getIcon(0),weight:b.OverlayWeight.Top})}return w(e,[{key:"show",value:function(){var e=this._cluster._markers.length;if(this._config.swarmModeEnabled){if(1===this._config.swarmAlg){var t=new Array(this._config.swarmGridLength*this._config.swarmGridLength).fill(0),n=0;while(e--){if(n>=this._config.swarmMarkersMaxAmountPerTile)break;var r=this._cluster._markers[e],i=this._cluster._gridids[e],s=i.u*this._config.swarmGridLength+i.v;t[s]%this._config.swarmMarkersConstPerGrid===0&&(r.active()||this._map.Overlays.add(r),n++),t[s]++}}else if(2===this._config.swarmAlg){this._calculateMarkersDispAmount();var o=0;while(e--){if(o>this._config.swarmMarkersMaxLimit)break;var a=this._cluster._markers[e];this.swarmAlg2Decider(o,this._cluster._markers.length-e-1)&&(a.active()||this._map.Overlays.add(a),o++)}return}}else{var c=this._center;if(this._cluster._markers.length<this._config.minClusterSize){var l=this._cluster._markers[0];return void(l.active()||this._map.Overlays.add(l))}var u=this._map.zoom(),h=this._config.maxZoom;if(h&&u>h||20===u){while(e--){var d=this._cluster._markers[e];d.active()||this._cluster._map.Overlays.add(d)}return}this._clusterMarker.active()?this._map.Overlays.move(this._clusterMarker,c):(this._clusterMarker.setLocation(c),this._map.Overlays.add(this._clusterMarker),this._poly&&this._map.Overlays.remove(this._poly),this._config.drawMarkerArea&&(this._poly=new b.Polygon(this._cluster._bounds.getRectVertex(),{fillColor:"rgba(0,0,0,0.3)"}),this._map.Overlays.add(this._poly)))}}},{key:"_calculateMarkersDispAmount",value:function(){var e=function(e,t,n){if(0===e)return 0;var r=e/t*49-13,i=Math.round(n*(1/(1+Math.exp(-r))));return 0===i?1:i};this._maxDispAmount=e(this._cluster._markers.length,this._cluster._markerCluster._maxClusterSize,this._config.swarmMarkersMaxLimit)}},{key:"swarmAlg2Decider",value:function(e,t){return this._config.swarmMarkersAmountAdjust?this._maxDispAmount>e:e<=5||t%10===0}},{key:"remove",value:function(){this._map.Overlays.remove(this._clusterMarker),this._poly&&(this._map.Overlays.remove(this._poly),this._poly=null)}},{key:"setCenter",value:function(e){this._center=e}},{key:"setSums",value:function(e){this._sums&&e===this._sums||(this._sums=e,this._clusterMarker&&this._clusterMarker.element()&&this._iloader.changeNumber(this._clusterMarker.element(),this._sums))}}]),e}(),I=function(){function e(t,n){v(this,e),this._markerCluster=t,this._config=n,this._images=new Map,this.ready=!0,this.useDefault=!0,this._config.styles&&this.loadStyles(this._config.styles)}return w(e,[{key:"load",value:function(e,t,n,r,i){this.ready=!1,this.useDefault=!1;var s=new Image(t,n);this._images.set(s,{ready:!1,minThreshold:r});var o=this;return s.onload=function(){o._images.get(s).ready=!0,d(o._images.values()).every(function(e){return e.ready})&&(o.ready=!0,o._markerCluster.resetViewport(),o._markerCluster._createClusters()),i&&i()},s.src=e,this._images.keys.length-1}},{key:"loadStyles",value:function(e){e.sort(function(e,t){return e.minThreshold<t.minThreshold?1:e.minThreshold===t.minThreshold?0:-1});var t=e.length,n=this;while(t--){var r=e[t];this.load(r.url,r.width,r.height,r.minThreshold,0===t?function(){return n.ready=!0}:null)}}},{key:"getIcon",value:function(e){var t={offset:{x:0,y:0}};if(this.useDefault||"undefined"===typeof e){var n=document.createElement("div"),r=document.createElement("div"),i=document.createElement("span");if(n.appendChild(r),r.appendChild(i),n.style.width="44px",n.style.height="44px",n.style.marginLeft="-22px",n.style.marginTop="-22px",n.style.overflow="hidden",n.style.color="".concat(this._config.textColor),n.className="marker-cluster marker-cluster-small leaflet-marker-icon",this._config.customOuterClusterCSS)for(var s in this._config.customOuterClusterCSS)if(Object.hasOwnProperty.call(this._config.customOuterClusterCSS,s)){var o=this._config.customOuterClusterCSS[s];n.style[s]=o}if(this._config.customInnerClusterCSS)for(var a in this._config.customInnerClusterCSS)if(Object.hasOwnProperty.call(this._config.customInnerClusterCSS,a)){var c=this._config.customInnerClusterCSS[a];r.style[a]=c}if(this._config.customTextClusterCSS)for(var l in this._config.customTextClusterCSS)if(Object.hasOwnProperty.call(this._config.customTextClusterCSS,l)){var u=this._config.customTextClusterCSS[l];i.style[l]=u}t.html=n.outerHTML,t.size={width:44,height:44}}else{var h=d(this._images.keys())[e],f=document.createElement("div");if(f.style.width="".concat(h.width,"px"),f.style.height="".concat(h.height,"px"),f.style.marginLeft="-".concat(h.width/2,"px"),f.style.marginTop="-".concat(h.height/2,"px"),f.style.background="url('".concat(encodeURI(h.src),"') no-repeat center top"),f.style.lineHeight=f.style.height,f.style.color="".concat(this._config.textColor),f.style.fontWeight="bold",f.style.textAlign="center",this._config.customTextClusterCSS)for(var p in this._config.customTextClusterCSS)if(Object.hasOwnProperty.call(this._config.customTextClusterCSS,p)){var m=this._config.customTextClusterCSS[p];f.style[p]=m}t.html=f.outerHTML,t.size={width:h.width,height:h.height}}return t}},{key:"changeNumber",value:function(e,t){if(this.useDefault)e.children[0].children[0].children[0].innerText="".concat(t.toLocaleString()),e.children[0].className=t<10?"marker-cluster marker-cluster-small":t<100?"marker-cluster marker-cluster-medium":"marker-cluster marker-cluster-large";else{e.children[0].innerText="".concat(t.toLocaleString());var n=d(this._images.keys()),r=n.length;while(r--){var i=n[r];if(t>=this._images.get(i).minThreshold){var s=e;s.style.width="".concat(i.width,"px"),s.style.height="".concat(i.height,"px"),s=s.children[0],s.style.background="url('".concat(encodeURI(i.src),"') no-repeat center top"),s.style.width="".concat(i.width,"px"),s.style.height="".concat(i.height,"px"),s.style.lineHeight=s.style.height;break}}}}}]),e}();function E(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e,t,n){return t&&T(e.prototype,t),n&&T(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var k=window.longdo,P=function(){function e(t,n,r){E(this,e),this._markerCluster=t,this._config=n,this._map=t._map,this._center=null,this._markers=[],this._bounds=null,this._clusterIcon=new C(this,this._config,r)}return S(e,[{key:"addMarker",value:function(e,t){return this._center?this._config.averageCenter&&(this._center=k.Util.averageLocation(k.Projections.EPSG3857,this._center,e.location()),this._calculateBounds()):(this._center=e.location(),this._calculateBounds()),e.isAdded=!0,this._markers.push(e),this._config.drawMarkerArea&&this._bounds.drawArea(this._map),this._config.swarmModeEnabled&&1===this._config.swarmAlg&&(this._gridids||(this._gridids=[]),this._gridids.push(a.generateFrom(k.Util.boundOfTile(k.Projections.EPSG3857,t)).getNxNGridCord(e.location(),this._config.swarmGridSize))),!0}},{key:"remove",value:function(){this._clusterIcon.remove(),this._markers.length=0,delete this._markers,this._bounds.removeArea(this._map)}},{key:"_calculateBounds",value:function(){this._bounds=a.generateRect(this._center).extendSize(this._config.gridSize*Math.pow(2,-this._map.zoom()))}},{key:"isMarkerInClusterBounds",value:function(e){return this._bounds.isLocInBounds(e.location())}},{key:"finalize",value:function(){this._clusterIcon.setSums(this._markers.length),this._clusterIcon.setCenter(this._center),this._clusterIcon.show()}}]),e}();function x(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t,n){return t&&A(e.prototype,t),n&&A(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}if("undefined"===typeof window.longdo)throw new Error("longdo API must be loaded before the longdomap markercluster plugin");var O=window.longdo,N=function(){function e(t,n){x(this,e),this._map=t,this._markers=[],this._clusters=[],this._prevZoom=2,this._ready=!1,this.overlay=[],this.config=new h(n),this._iloader=new I(this,this.config);var r=this;this._map.Event.bind("ready",function(){r._ready&&r._iloader.ready&&(r._prevZoom=r._map.zoom,r.resetViewport(),r._createClusters())}),this._map.Event.bind("zoom",function(){r._ready&&r._iloader.ready&&r.resetViewport()}),this._map.Event.bind("overlayClick",function(e){if(r.setSelectedMarker(e),r._ready&&r._iloader.ready){var t=r._clusters.length;while(t--){var n=r._clusters[t];if(e===n._clusterIcon._clusterMarker){var i=[],s=n._markers.length;while(s--)i.push(n._markers[s].location());return void r._map.bound(O.Util.locationBound(i))}}}}),this._map.Event.bind("loadTile",function(e){"start"!==e&&r._ready&&r._iloader.ready&&(r.resetViewport(),r._createClusters())})}return R(e,[{key:"addMarkers",value:function(e){e instanceof O.Marker&&(e=[e]);var t=e.length;while(t--){var n=e[t];this._markers.push(n)}this.config.swarmModeEnabled&&this.shuffle()}},{key:"shuffle",value:function(){for(var e=this._markers.length-1;e>0;e--){var t=Math.floor(Math.random()*(e+1)),n=this._markers[e];this._markers[e]=this._markers[t],this._markers[t]=n}}},{key:"getSelectedMarker",value:function(){return this.overlay?this.overlay:null}},{key:"setSelectedMarker",value:function(e){e&&e.element()&&e.element().classList.contains("ldmap_clickable")&&(this.overlay=e)}},{key:"render",value:function(){this._ready=!0,this._iloader.ready&&(this.resetViewport(),this._createClusters())}},{key:"_createClusters",value:function(){var e=a.generateFrom(this._map.bound()),t=e.extendSize(this.config.gridSize*Math.pow(2,-this._map.zoom())),n=this._markers.length;while(n--){var r=this._markers[n],i=r.location();!r.isAdded&&t.isLocInBounds(i)&&(this.config.swarmModeEnabled?2===this.config.swarmAlg?this._addToClosestCluster(r):this._addToTiledCluster(r):this._addToClosestCluster(r))}n=this._clusters.length;while(n--){var s=this._clusters[n];s.finalize()}}},{key:"_addToClosestCluster",value:function(e){var t=Number.POSITIVE_INFINITY,n=null,r=this._clusters.length;while(r--){var i=this._clusters[r],s=i._center;if(s){var o=O.Util.distance([s,e.location()]);o<t&&(t=o,n=i)}}if(n&&n.isMarkerInClusterBounds(e))n.addMarker(e),this._maxClusterSize&&(this._maxClusterSize,n._markers.length),this._maxClusterSize=n._markers.length;else{var a=new P(this,this.config,this._iloader);a.addMarker(e),this._clusters.push(a),this._maxClusterSize&&(this._maxClusterSize,a._markers.length),this._maxClusterSize=a._markers.length}}},{key:"_addToTiledCluster",value:function(e){var t=this,n=function(e){var n=O.Util.locationToPoint(O.Projections.EPSG3857,e);return n.z=20-t._map.zoom(),O.Util.pointToTile(n)},r=n(e.location()),i=this._clusters.length;while(i--){var s=this._clusters[i];if(s.u===r.u&&s.v===r.v)return void s.addMarker(e,r)}var o=new P(this,this.config,this._iloader);o.u=r.u,o.v=r.v,o.addMarker(e,r),this._clusters.push(o)}},{key:"_removeMarker",value:function(e){var t=this._markers.indexOf(e);return-1!==t&&(this._map.Overlays.remove(e),this._markers.splice(t,1),!0)}},{key:"removeMarker",value:function(e){var t=this._removeMarker(e);return!!t&&(this.resetViewport(),this._createClusters(),!0)}},{key:"removeMarkers",value:function(e){var t=e===this._markers?this._markers.slice():e,n=!1,r=t.length;while(r--){var i=this._removeMarker(t[r]);n=n||i}return!!n&&(this.resetViewport(),this._createClusters(),!0)}},{key:"clearMarkers",value:function(){this.resetViewport();var e=this._markers.length;while(e--){var t=this._markers[e];this._map.Overlays.remove(t)}this._markers=[]}},{key:"resetViewport",value:function(){var e=this._clusters.length;while(e--)this._clusters[e].remove();e=this._markers.length;while(e--){var t=this._markers[e];t.isAdded=!1,this._map.Overlays.remove(t)}this._clusters=[]}}]),e}()},fb15:function(e,t,n){"use strict";if(n.r(t),n.d(t,"LongdoMap",function(){return y}),n.d(t,"LongdoMapMarker",function(){return I}),n.d(t,"LongdoMapDot",function(){return S}),n.d(t,"LongdoMapCircle",function(){return k}),n.d(t,"LongdoMapRectangle",function(){return P}),n.d(t,"LongdoMapPolygon",function(){return x}),n.d(t,"LongdoMapPolyline",function(){return A}),n.d(t,"LongdoMapPolycurve",function(){return R}),n.d(t,"LongdoMapLockScreen",function(){return F}),n.d(t,"LongdoMapLockMap",function(){return q}),n.d(t,"LongdoMapMenuBar",function(){return W}),n.d(t,"LongdoMapTagPanel",function(){return H}),n.d(t,"LongdoMapCustomControl",function(){return z}),n.d(t,"LongdoMapCustomUi",function(){return X}),n.d(t,"LongdoMapMarkerCluster",function(){return ie}),n.d(t,"LongdoMapHeatmap",function(){return le}),n.d(t,"LongdoMapPanorama",function(){return _e}),"undefined"!==typeof window){var r=window.document.currentScript,i=n("8875");r=i(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:i});var s=r&&r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);s&&(n.p=s[1])}var o={apiKey:null,src:"https://api.longdo.com/map/",promise:null,beforeInit:null,debug:!1,load:function(e){var t=e.apiKey,n=void 0===t?null:t,r=e.src,i=void 0===r?null:r,s=e.beforeInit,o=void 0===s?null:s,a=e.debug,c=void 0!==a&&a;if("undefined"!==typeof window)if(window.longdo)console.warn("Longdo Map Vue: Longdo Map API is already loaded");else{var l=this.src;i&&(l=i,this.src=i);var u={};n&&(u["key"]=n,this.apiKey=n),c&&(u["debug"]=!0,this.debug=!0);var h=new URLSearchParams(u);h&&(l+="?".concat(h)),o&&(this.beforeInit=o),this.importLongdoMap(l)}},initLongdoMap:function(e){if(!window.longdo)throw new Error("Longdo Map Vue: Longdo Map API is not found");this.beforeInit&&this.beforeInit(window.longdo),e()},importLongdoMap:function(e){this.promise=new Promise(function(t,n){var r=document.createElement("script");r.onload=function(){t()},r.onerror=function(){n()},r.async=!0,r.src=e,document.body.appendChild(r)})}},a=o,c=function(){var e=this,t=e._self._c;return t("div",{staticClass:"ldmap-vue-container"},[t("div",{ref:"map",staticClass:"ldmap-vue-placeholder"}),e._t("default")],2)},l=[];function u(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=h(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){a=!0,s=e},f:function(){try{o||null==n.return||n.return()}finally{if(a)throw s}}}}function h(e,t){if(e){if("string"===typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f={projection:{type:String,default:null},layer:{type:Array,default:null},zoom:{type:Number,default:null},zoomRange:{type:Object,default:null},location:{type:Object,default:null},ui:{type:String,default:null},input:{type:Boolean,default:null},autoResize:{type:Boolean,default:null},lastView:{type:Boolean,default:null},smoothZoom:{type:Boolean,default:null},language:{type:String,default:null}},p={props:f,methods:{getMapOptions:function(){var e={};for(var t in f)null!==this[t]&&("projection"===t?e.projection=window.longdo.Projections[this.projection]:"layer"===t?e.layer=this.getLayers(this.layer):"ui"===t?e.ui=window.longdo.UiComponent[this.ui]:e[t]=this[t]);return e},getLayers:function(e){var t,n=[],r=u(e);try{for(r.s();!(t=r.n()).done;){var i=t.value;n.push(window.longdo.Layers[i])}}catch(s){r.e(s)}finally{r.f()}return n}}},m={name:"LongdoMap",mixins:[p],data:function(){return{map:null,mapPromise:null}},created:function(){var e=this;this.mapPromise=a.promise,this.mapPromise.then(function(){a.initLongdoMap(e.initLongdoMap)})},methods:{initLongdoMap:function(){var e=this,t=this.getMapOptions();t.placeholder=this.$refs.map,this.map=new window.longdo.Map(t),t.zoomRange&&this.map.zoomRange(t.zoomRange),this.$emit("load",this.map),this.map.Event.bind("ready",function(){e.$emit("mapReady")})}},init:function(e){var t=e.apiKey,n=e.src,r=void 0===n?void 0:n,i=e.checkApiKey,s=void 0===i||i;a.load({apiKey:t,src:r,checkApiKey:s})}},g=m;n("d7d2");function _(e,t,n,r,i,s,o,a){var c,l="function"===typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),s&&(l._scopeId="data-v-"+s),o?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=c):i&&(c=a?function(){i.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:i),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(e,t){return c.call(t),u(e,t)}}else{var h=l.beforeCreate;l.beforeCreate=h?[].concat(h,c):[c]}return{exports:e,options:l}}var v=_(g,c,l,!1,null,"15e6d8f1",null),y=v.exports,w={data:function(){var e=this;return{mapReady:new Promise(function(t){e.$parent.$on("mapReady",function(){t()})})}},render:function(){return""}},b={location:{type:Object,default:null},title:{type:String,default:null},icon:{type:Object,default:null},detail:{type:String,default:null},popup:{type:Object,default:null},visibleRange:{type:Object,default:null},clickable:{type:Boolean,default:null},draggable:{type:Boolean,default:null},weight:{type:String,default:null},rotate:{type:Number,default:null},iconStyle:{type:String,default:null}},C={props:b,methods:{getMarkerOptions:function(){var e={};for(var t in b)if(null!==this[t])if("weight"===t){var n=window.longdo.OverlayWeight[this.weight];n&&(e.weight=n)}else"iconStyle"===t?e.style=this[t]:e[t]=this[t];return e}}},I={name:"LongdoMarker",mixins:[w,C],data:function(){return{marker:null}},mounted:function(){var e=this;this.mapReady.then(function(){e.addMarker(e.location,e.getMarkerOptions())})},destroyed:function(){this.$parent.map.Overlays.remove(this.marker)},methods:{addMarker:function(e,t){this.marker=new window.longdo.Marker(e,t),this.$parent.map.Overlays.add(this.marker),this.$emit("add",this.marker)}}},E={location:{type:Object|Array,default:null},radius:{type:Number,default:null},size:{type:Number|Object,default:null},title:{type:String,default:null},detail:{type:String,default:null},label:{type:String,default:null},labelOptions:{type:Object,default:null},popup:{type:Object,default:null},visibleRange:{type:Object,default:null},lineWidth:{type:Number,default:null},lineColor:{type:String,default:null},fillColor:{type:String,default:null},lineStyle:{type:String,default:null},pivot:{type:Object,default:null},clickable:{type:Boolean,default:null},editable:{type:Boolean,default:null},pointer:{type:Boolean,default:null},draggable:{type:Boolean,default:null},rotatable:{type:Boolean,default:null},weight:{type:String,default:null},texture:{type:String,default:null},textureAlpha:{type:Number,default:null},linePattern:{type:String,default:null}},T={props:E,methods:{getGeometryOptions:function(){var e={};for(var t in E)if(null!==this[t])if("weight"===t){var n=window.longdo.OverlayWeight[this.weight];n&&(e.weight=n)}else"lineStyle"===t?e.lineStyle=window.longdo.LineStyle[this.lineStyle]:e[t]=this[t];return e}}},S={name:"LongdoDot",mixins:[w,T],data:function(){return{dot:null}},mounted:function(){var e=this;this.mapReady.then(function(){e.addDot(e.location,e.getGeometryOptions())})},destroyed:function(){this.$parent.map.Overlays.remove(this.dot)},methods:{addDot:function(e,t){this.dot=new window.longdo.Dot(e,t),this.$parent.map.Overlays.add(this.dot),this.$emit("add",this.dot)}}},k={name:"LongdoCircle",mixins:[w,T],data:function(){return{circle:null}},mounted:function(){var e=this;this.mapReady.then(function(){e.addCircle(e.location,e.radius,e.getGeometryOptions())})},destroyed:function(){this.$parent.map.Overlays.remove(this.circle)},methods:{addCircle:function(e,t,n){this.circle=new window.longdo.Circle(e,t,n),this.$parent.map.Overlays.add(this.circle),this.$emit("add",this.circle)}}},P={name:"LongdoRectangle",mixins:[w,T],data:function(){return{rectangle:null}},mounted:function(){var e=this;this.mapReady.then(function(){e.addRectangle(e.location,e.size,e.getGeometryOptions())})},destroyed:function(){this.$parent.map.Overlays.remove(this.rectangle)},methods:{addRectangle:function(e,t,n){this.rectangle=new window.longdo.Rectangle(e,t,n),this.$parent.map.Overlays.add(this.rectangle),this.$emit("add",this.rectangle)}}},x={name:"LongdoPolygon",mixins:[w,T],data:function(){return{polygon:null}},mounted:function(){var e=this;this.mapReady.then(function(){e.addPolygon(e.location,e.getGeometryOptions())})},destroyed:function(){this.$parent.map.Overlays.remove(this.polygon)},methods:{addPolygon:function(e,t){this.polygon=new window.longdo.Polygon(e,t),this.$parent.map.Overlays.add(this.polygon),this.$emit("add",this.polygon)}}},A={name:"LongdoPolyline",mixins:[w,T],data:function(){return{polyline:null}},mounted:function(){var e=this;this.mapReady.then(function(){e.addPolyline(e.location,e.getGeometryOptions())})},destroyed:function(){this.$parent.map.Overlays.remove(this.polyline)},methods:{addPolyline:function(e,t){this.polyline=new window.longdo.Polyline(e,t),this.$parent.map.Overlays.add(this.polyline),this.$emit("add",this.polyline)}}},R={name:"LongdoPolycurve",mixins:[w,T],data:function(){return{polycurve:null}},mounted:function(){var e=this;this.mapReady.then(function(){e.addPolycurve(e.location,e.getGeometryOptions())})},destroyed:function(){this.$parent.map.Overlays.remove(this.polycurve)},methods:{addPolycurve:function(e,t){this.polycurve=new window.longdo.Polycurve(e,t),this.$parent.map.Overlays.add(this.polycurve),this.$emit("add",this.polycurve)}}},O=function(){var e=this,t=e._self._c;return t("div",{directives:[{name:"show",rawName:"v-show",value:e.lockScreenReady,expression:"lockScreenReady"}],class:["ldmap-vue-lock-screen",{"ldmap-vue-lock-screen-unlock":!e.value}]},["touch"===e.mode?t("div",{ref:"areaTouchMode",staticClass:"ldmap-vue-lock-screen-area",on:{touchstart:e.touchStartEvent,touchmove:e.touchMoveEvent,touchend:e.touchEndEvent}},[t("div",{staticClass:"ldmap-vue-lock-screen-area-message"},[e._v(" "+e._s(e.unlockMessageTouch)+" ")])]):"keyboard"===e.mode?t("div",{ref:"areaKeyboardMode",staticClass:"ldmap-vue-lock-screen-area",on:{wheel:e.wheelEvent,click:e.clickEvent}},[t("div",{staticClass:"ldmap-vue-lock-screen-area-message"},[e._v(" "+e._s(e.unlockMessageKeyboard)+" ")])]):e.hideButton?e._e():t("div",{staticClass:"ldmap-vue-lock-screen-button-container"},[e._t("button",function(){return[t("button",{staticClass:"ldmap-vue-lock-screen-button",on:{click:function(t){return e.lockMap(!e.value)}}},[e._v(" "+e._s(e.value?e.unlockMessage:e.lockMessage)+" ")])]})],2)])},N=[],M={name:"LockScreen",mixins:[w],props:{value:{type:Boolean,default:!0},mode:{type:String,default:"button"},lockMessage:{type:String,default:"Lock"},unlockMessage:{type:String,default:"Unlock"},unlockMessageTouch:{type:String,default:"Use two fingers to move the map"},unlockMessageKeyboard:{type:String,default:"Press and hold ".concat(-1!=navigator.appVersion.indexOf("Mac")?"⌘":"Ctrl"," to move the map")},hideButton:{type:Boolean,default:!1}},data:function(){return{lockScreenReady:!1,wheelTimeout:void 0}},mounted:function(){var e=this;this.mapReady.then(function(){e.lockScreenReady=!0,"keyboard"===e.mode&&e.setKeyboardMode()})},methods:{keyDownEvent:function(e){"Meta"!==e.key&&"Control"!==e.key||this.lockMap(!1)},keyUpEvent:function(e){"Meta"!==e.key&&"Control"!==e.key||this.lockMap(!0)},wheelEvent:function(){var e=this;"keyboard"===this.mode&&!this.wheelTimeout&&this.$refs.areaKeyboardMode&&(this.$refs.areaKeyboardMode.classList.add("ldmap-vue-lock-screen-area-active"),this.wheelTimeout=setTimeout(function(){e.$refs.areaKeyboardMode.classList.remove("ldmap-vue-lock-screen-area-active"),e.wheelTimeout=void 0},1e3))},setKeyboardMode:function(){window.addEventListener("keydown",this.keyDownEvent),window.addEventListener("keyup",this.keyUpEvent)},clickEvent:function(){var e=this;"keyboard"===this.mode&&!this.wheelTimeout&&this.$refs.areaKeyboardMode&&(this.$refs.areaKeyboardMode.classList.add("ldmap-vue-lock-screen-area-active"),this.wheelTimeout=setTimeout(function(){e.$refs.areaKeyboardMode.classList.remove("ldmap-vue-lock-screen-area-active"),e.wheelTimeout=void 0},1e3))},touchStartEvent:function(e){"touch"===this.mode&&e.touches.length>0&&(this.lockMap(!1),this.$refs.areaTouchMode.classList.add("ldmap-vue-lock-screen-area-active"))},touchMoveEvent:function(e){"touch"===this.mode&&e.touches.length>1&&this.$refs.areaTouchMode.classList.remove("ldmap-vue-lock-screen-area-active")},touchEndEvent:function(){"touch"===this.mode&&(this.lockMap(!0),this.$refs.areaTouchMode.classList.remove("ldmap-vue-lock-screen-area-active"))},clearKeyboardModeEvent:function(){window.removeEventListener("keydown",this.keyDownEvent),window.removeEventListener("keyup",this.keyUpEvent)},lockMap:function(e){this.$emit("input",e)}},watch:{mode:function(e){this.clearKeyboardModeEvent(),"keyboard"===e&&this.setKeyboardMode()}}},L=M,D=(n("117a"),_(L,O,N,!1,null,"f7d580b0",null)),F=D.exports,U=function(){var e=this,t=e._self._c;return t("div",{ref:"container",staticClass:"ldmap-vue-lock-map"},[e._t("default")],2)},j=[],B={name:"LockMap",mixins:[w],props:{lock:{type:Boolean,default:!0}},mounted:function(){var e=this;this.mapReady.then(function(){if(e.$parent.map.Ui.lockMap(),e.$slots.default){var t=e.$refs.container,n=document.getElementsByClassName("ldmap_lock_button")[0];n?n.parentNode.replaceChild(t,n):console.warn("Longdo Map Vue: lockMap can be called only once")}})},methods:{lockOverlay:function(e){var t=document.getElementsByClassName("ldmap_lock_overlay")[0];t&&(t.style.display=e?"block":"none")}},watch:{lock:function(e){this.lockOverlay(e)}}},$=B,V=_($,U,j,!1,null,null,null),q=V.exports,W={name:"MenuBar",mixins:[w],data:function(){return{menuBar:null}},props:{button:{type:Array,default:function(){return[]}},dropdown:{type:Array,default:function(){return[]}},dropdownLabel:{type:String,default:null},change:{type:Function,default:null}},mounted:function(){var e=this;this.mapReady.then(function(){e.addMenuBar()})},destroyed:function(){this.$parent.map.Ui.remove(this.menuBar)},methods:{addMenuBar:function(){var e={};this.button.length&&(e.button=this.button),this.dropdown.length&&(e.dropdown=this.dropdown),this.dropdownLabel&&(e.dropdownLabel=this.dropdownLabel),this.change&&(e.change=this.change),this.menuBar=new window.longdo.MenuBar(e),this.$parent.map.Ui.add(this.menuBar),this.$emit("add",this.menuBar)}}},H={name:"TagPanel",mixins:[w],data:function(){return{tagPanel:null}},props:{tag:{type:Array,default:null}},mounted:function(){var e=this;this.mapReady.then(function(){e.addTagPanel()})},destroyed:function(){this.$parent.map.Ui.remove(this.tagPanel)},methods:{addTagPanel:function(){this.tagPanel=this.tag?new window.longdo.TagPanel({tag:this.tag}):new window.longdo.TagPanel,this.$parent.map.Ui.add(this.tagPanel),this.$emit("add",this.tagPanel)}}},z={name:"CustomControl",mixins:[w],data:function(){return{customControl:null}},props:{html:{type:String,default:""}},mounted:function(){var e=this;this.mapReady.then(function(){e.addCustomControl()})},destroyed:function(){this.$parent.map.Ui.remove(this.customControl)},methods:{addCustomControl:function(){this.customControl=new window.longdo.CustomControl({html:this.html}),this.$parent.map.Ui.add(this.customControl),this.$emit("add",this.customControl)}}},K=function(){var e=this,t=e._self._c;return t("div",{class:e.position},[e._t("default")],2)},G=[],Y={name:"CustomUi",mixins:[w],props:{vertical:{type:String,default:"top"},horizontal:{type:String,default:"left"},custom:{type:Boolean,default:!1}},computed:{position:function(){if(!this.custom){var e="center"===this.vertical&&"center"===this.horizontal,t="top"!==this.vertical&&"center"!==this.vertical&&"bottom"!==this.vertical;return{"ldmap-vue-custom-ui":!0,"ldmap-vue-custom-ui-top":"top"===this.vertical||t,"ldmap-vue-custom-ui-bottom":"bottom"===this.vertical,"ldmap-vue-custom-ui-right":"right"===this.horizontal,"ldmap-vue-custom-ui-left":"left"===this.horizontal,"ldmap-vue-custom-ui-center-y":"center"===this.vertical&&!e,"ldmap-vue-custom-ui-center-x":"center"===this.horizontal&&!e,"ldmap-vue-custom-ui-center":e}}}}},Z=Y,J=(n("4544"),_(Z,K,G,!1,null,"ec61ad9c",null)),X=J.exports,Q={markerList:{type:Array,default:[]},maxZoom:{type:Number,default:null},minClusterSize:{type:Number,default:null},textColor:{type:String,default:null},customOuterClusterCSS:{type:Object,default:null},customInnerClusterCSS:{type:Object,default:null},customTextClusterCSS:{type:Object,default:null},gridSize:{type:Number,default:null},clusterRadius:{type:Number,default:null},averageCenter:{type:Boolean,default:null},drawMarkerArea:{type:Boolean,default:null},swarmModeEnabled:{type:Boolean,default:null},swarmAlg:{type:Number,default:null},styles:{type:Array,default:null},swarmGridLength:{type:Number,default:null},swarmMarkersMaxLimit:{type:Number,default:null},swarmMarkersAmountAdjust:{type:Boolean,default:null},swarmMarkersMaxAmountPerTile:{type:Number,default:null},swarmMarkersConstPerGrid:{type:Number,default:null},defaultCss:{type:Boolean,default:!0}},ee={props:Q,methods:{getMarkerClusterOptions:function(){var e={};for(var t in Q)"markerList"!==t&&null!==this[t]&&(e[t]=this[t]);return e}}};function te(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=ne(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){a=!0,s=e},f:function(){try{o||null==n.return||n.return()}finally{if(a)throw s}}}}function ne(e,t){if(e){if("string"===typeof e)return re(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?re(e,t):void 0}}function re(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var ie={name:"LongdoMarkerCluster",mixins:[w,ee],data:function(){return{markerCluster:null}},mounted:function(){var e=this;this.mapReady.then(function(){var t=n("e8ba").default;e.markerCluster=new t(e.$parent.map,e.getMarkerClusterOptions()),e.$emit("add",e.markerCluster),e.renderMarkerCluster(),e.defaultCss&&n("3c6a")})},destroyed:function(){this.markerCluster.clearMarkers()},methods:{renderMarkerCluster:function(){this.markerCluster&&this.markerCluster.clearMarkers();var e,t=te(this.markerList);try{for(t.s();!(e=t.n()).done;){var n=e.value,r=new window.longdo.Marker(n.location,n.options);this.markerCluster.addMarkers(r)}}catch(i){t.e(i)}finally{t.f()}this.markerCluster.render()}},watch:{markerList:function(){this.renderMarkerCluster()}}},se={data:{type:Object,default:null},backgroundColor:{type:String,default:null},gradient:{type:Object,default:null},radius:{type:Number,default:null},opacity:{type:Number,default:null},maxOpacity:{type:Number,default:null},minOpacity:{type:Number,default:null},onExtremaChange:{type:Function,default:null},blur:{type:Number,default:null},xField:{type:String,default:null},yField:{type:String,default:null},valueField:{type:String,default:null},scaleRadius:{type:Boolean,default:null},useLocalExtrema:{type:Boolean,default:null}},oe={props:se,methods:{getHeatmapOptions:function(){var e={};for(var t in se)"data"!==t&&null!==this[t]&&(e[t]=this[t]);return e}}},ae=n("7397"),ce={heatmap:function(e){var t=function(e){this._initialize(e);var t=this;longdo.Layer.call(this,"heatmaplayer",{type:longdo.LayerType.Custom,defer:function(e,n,r,i){setTimeout(function(){var s=t._getURL(n,r,i);e.src=s},0)}})};return t.prototype=Object.create(longdo.Layer.prototype),t.prototype.constructor=t,t.prototype._initialize=function(t){this.cfg=t,this._data=[],this._max=1,this._min=0,this.Cache=[],this.tileNumSqrtX=this.tileNumSqrtY=4,this.tileResSqrt=256,this.cfg.container=document.createElement("div"),this.cfg.container.style.cssText="width:"+this.tileResSqrt+"px;height:"+this.tileResSqrt+"px",this.cfg.width=this.cfg.height=this.tileResSqrt,this._heatmap=e.create(this.cfg)},t.prototype._getURL=function(e,t,n){this.tileNumSqrtX=2<<n-1,this.tileNumSqrtY=e==longdo.Projections.EPSG4326?this.tileNumSqrtX/2:this.tileNumSqrtX;var r=this._data.length,i={data:[],max:this._max,min:this._min},s=!1;if(0==this._data.length)return this._heatmap&&this._heatmap.setData(i),"";var o=0,a=0;while(r--){var c=this._data[r],l=this._getTileIncludeLatlon(c,e),u=2<<n-1,h=this.cfg.scaleRadius?u:1,d=c.radius?c.radius*h:(this.cfg.radius||2)*h,f=1+d/this.tileResSqrt;if(Math.abs(l.u-t.u)<=Math.ceil(f)&&Math.abs(l.v-t.v)<=Math.ceil(f)){var p=360/this.tileNumSqrtX,m=c.lon+180-t.u*p,g=180/this.tileNumSqrtY,_=e==longdo.Projections.EPSG4326?90-c.lat-g*t.v:90-this._lat2y(c.lat)/2-g*t.v,v=Math.floor(m*(this.tileResSqrt/p)),y=Math.floor(_*(this.tileResSqrt/g));s=s||v<0||v>this.tileResSqrt||y<0||y>this.tileResSqrt,i.data.push({x:v,y:y,value:c.value,radius:d})}o=Math.max(c.value,o),a=Math.min(c.value,a)}return this.Cache[t.u+"-"+t.v+"-"+t.w]?this.Cache[t.u+"-"+t.v+"-"+t.w]:(this.cfg.useLocalExtrema&&(i.max=o,i.min=a),s&&i.data.push({x:1,y:1,value:-Number.EPSILON,radius:0}),this._heatmap.setData(i),this.Cache[t.u+"-"+t.v+"-"+t.w]=this._heatmap.getDataURL(),this._heatmap.getDataURL())},t.prototype.setData=function(e){this._max=e.max||this._max,this._min=e.min||this._min,this._data=[];e=e.data;var t=e.length;while(t--){var n=e[t],r={lat:n.lat,lon:n.lon,value:n.value};n.radius&&(r.radius=n.radius),this._data.push(r)}},t.prototype._getTileIncludeLatlon=function(e,t){var n=e.lon+180,r=t==longdo.Projections.EPSG4326?90-e.lat:180-this._lat2y(e.lat),i=360/this.tileNumSqrtX,s=t==longdo.Projections.EPSG4326?180/this.tileNumSqrtY:360/this.tileNumSqrtY;return{u:Math.floor(n/i),v:Math.floor(r/s)}},t.prototype._clearCache=function(){this.Cache=[]},t.prototype._y2lat=function(e){return 90*(Math.atan(Math.exp(e/(180/Math.PI)))/(Math.PI/4)-1)},t.prototype._lat2y=function(e){return Math.log(Math.tan((e/90+1)*(Math.PI/4)))*(180/Math.PI)},t}},le={name:"LongdoHeatmap",mixins:[w,oe],data:function(){return{heatmapLayer:null}},mounted:function(){var e=this;this.mapReady.then(function(){var t=ce.heatmap(ae);e.heatmapLayer=new t(e.getHeatmapOptions()),e.$emit("add",e.heatmapLayer),e.setHeatmapLayer()})},destroyed:function(){this.$parent.map.Layers.remove(this.heatmapLayer)},methods:{setHeatmapLayer:function(){this.$parent.map.Layers.remove(this.heatmapLayer),this.heatmapLayer._clearCache(),this.heatmapLayer.setData(this.data),this.$parent.map.Layers.add(this.heatmapLayer)}},watch:{data:function(){this.setHeatmapLayer()}}},ue=function(){var e=this,t=e._self._c;return t("div",{ref:"panorama",staticClass:"ldmap-vue-panorama"})},he=[],de={map:{required:!0},showPath:{type:Boolean,default:null},getLength:{type:Boolean,default:null},showPathDetail:{type:Boolean,default:null},location:{type:Object,default:null},tilt:{type:Number,default:null},rhead:{type:Number,default:null},fixDirection:{type:Boolean,default:null},messageBox:{type:Boolean,default:null},debug:{type:Boolean,default:null},callBack:{type:Object,default:null},sphere:{type:Boolean,default:null},seekStep:{type:Number,default:null},seekPlayStep:{type:Number,default:null},server:{type:String,default:null},wsURL:{type:String,default:null},roadPathURL:{type:String,default:null},imageURL:{type:String,default:null},imageHDURL:{type:String,default:null},isHD:{type:Boolean,default:null},autoStart:{type:Boolean,default:null},lang:{type:String,default:null},mmsLayer:{type:Object,default:null},forceWebgl1:{type:Boolean,default:null},loadingUi:{type:Boolean,default:null},panoControlUi:{type:Boolean,default:null},panoWidgetUi:{type:Boolean,default:null},panoRenderUi:{type:Boolean,default:null},panoDirectionUi:{type:Boolean,default:null},hasLaser:{type:Boolean,default:null},alwaysDrawLaserUsingUV:{type:Boolean,default:null},measureLineVerticalAngle:{type:Boolean,default:null},showSurveyPath:{type:Boolean,default:null},alwaysShowPath:{type:Boolean,default:null}},fe={props:de,methods:{getPanoramaOptions:function(){var e={};for(var t in de)null!==this[t]&&(e[t]=this[t]);return e}}},pe={name:"LongdoPanorama",mixins:[fe],data:function(){return{src:"//api.longdo.com/pano/pano-api.min.js",isInit:!1,panorama:null}},mounted:function(){var e=this;this.panoramaReady().then(function(){e.initPano()})},destroyed:function(){this.destroyPano()},methods:{initPano:function(){if("undefined"!==typeof window.longdo&&this.map&&!this.isInit&&"undefined"!==typeof window.longdo.PanoramaViewer)if(this.map instanceof window.longdo.Map){var e=this.getPanoramaOptions();e.placeholder=this.$refs.panorama,this.panorama=new window.longdo.PanoramaViewer(e),this.$emit("load",this.panorama),this.isInit=!0}else console.error("Longdo Map Vue: Incorrect Longdo Map object")},panoramaReady:function(){var e=this,t="ldmapVuePanorama";return new Promise(function(n,r){if(document.getElementById(t))n();else{var i=document.createElement("script");i.onload=function(){n()},i.onerror=function(){r()},i.id=t,i.async=!0,i.src=e.src,document.body.appendChild(i)}})},destroyPano:function(){var e=this;this.map.Overlays.remove(this.panorama.currentLocationMarker());var t=document.getElementById("pano-current-location-pointer");t&&this.map.placeholder().removeChild(t),this.panorama.hidePath(),this.map.Overlays.list().forEach(function(t){(t.isPanoPoint||t.isPanoLine)&&e.map.Overlays.remove(t)})}},watch:{map:function(){var e=this;this.isInit||this.panoramaReady().then(function(){e.initPano()})}}},me=pe,ge=(n("33be"),_(me,ue,he,!1,null,null,null)),_e=ge.exports;function ve(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function ye(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ve(Object(n),!0).forEach(function(t){we(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ve(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function we(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var be={install:function(e,t){var n=ye({installComponents:!0,tagPrefix:""},t);if(n.load&&a.load(n.load),n.installComponents){var r=""!==n.tagPrefix?"".concat(n.tagPrefix,"-"):n.tagPrefix;e.component("".concat(r,"longdo-map"),y),e.component("".concat(r,"longdo-map-marker"),I),e.component("".concat(r,"longdo-map-dot"),S),e.component("".concat(r,"longdo-map-circle"),k),e.component("".concat(r,"longdo-map-rectangle"),P),e.component("".concat(r,"longdo-map-polygon"),x),e.component("".concat(r,"longdo-map-polyline"),A),e.component("".concat(r,"longdo-map-polycurve"),R),e.component("".concat(r,"longdo-map-lock-screen"),F),e.component("".concat(r,"longdo-map-lock-map"),q),e.component("".concat(r,"longdo-map-menu-bar"),W),e.component("".concat(r,"longdo-map-tag-panel"),H),e.component("".concat(r,"longdo-map-custom-control"),z),e.component("".concat(r,"longdo-map-custom-ui"),X),e.component("".concat(r,"longdo-map-marker-cluster"),ie),e.component("".concat(r,"longdo-map-heatmap"),le),e.component("".concat(r,"longdo-map-panorama"),_e)}}},Ce=be;t["default"]=Ce}})},8469:function(e,t,n){"use strict";var r=n(9504),i=n(507),s=n(4402),o=s.Set,a=s.proto,c=r(a.forEach),l=r(a.keys),u=l(new o).next;e.exports=function(e,t,n){return n?i({iterator:l(e),next:u},t):c(e,t)}},8480:function(e,t,n){"use strict";var r=n(1828),i=n(8727),s=i.concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,s)}},8527:function(e,t,n){"use strict";var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(507),c=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<n.size)return!1;var l=n.getIterator();return!1!==a(l,function(e){if(!i(t,e))return c(l,"normal",!1)})}},8551:function(e,t,n){"use strict";var r=n(34),i=String,s=TypeError;e.exports=function(e){if(r(e))return e;throw new s(i(e)+" is not an object")}},8574:function(e,t,n){"use strict";var r=n(4215);e.exports="NODE"===r},8622:function(e,t,n){"use strict";var r=n(4576),i=n(4901),s=r.WeakMap;e.exports=i(s)&&/native code/.test(String(s))},8686:function(e,t,n){"use strict";var r=n(3724),i=n(9039);e.exports=r&&i(function(){return 42!==Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype})},8721:function(e,t,n){"use strict";var r=n(3724),i=n(9504),s=n(2106),o=URLSearchParams.prototype,a=i(o.forEach);r&&!("size"in o)&&s(o,"size",{get:function(){var e=0;return a(this,function(){e++}),e},configurable:!0,enumerable:!0})},8727:function(e){"use strict";e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},8745:function(e,t,n){"use strict";var r=n(616),i=Function.prototype,s=i.apply,o=i.call;e.exports="object"==typeof Reflect&&Reflect.apply||(r?o.bind(s):function(){return o.apply(s,arguments)})},8750:function(e,t,n){"use strict";var r=n(7080),i=n(4402),s=n(5170),o=n(3789),a=n(8469),c=n(507),l=i.Set,u=i.add,h=i.has;e.exports=function(e){var t=r(this),n=o(e),i=new l;return s(t)>n.size?c(n.getIterator(),function(e){h(t,e)&&u(i,e)}):a(t,function(e){n.includes(e)&&u(i,e)}),i}},8773:function(e,t){"use strict";var n={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,i=r&&!n.call({1:2},1);t.f=i?function(e){var t=r(this,e);return!!t&&t.enumerable}:n},8981:function(e,t,n){"use strict";var r=n(7750),i=Object;e.exports=function(e){return i(r(e))}},9039:function(e){"use strict";e.exports=function(e){try{return!!e()}catch(t){return!0}}},9143:function(e,t,n){"use strict";var r=n(4576),i=n(9504),s=n(3972),o=n(3463),a=n(9297),c=n(2804),l=n(944),u=n(5169),h=c.c2i,d=c.c2iUrl,f=r.SyntaxError,p=r.TypeError,m=i("".charAt),g=function(e,t){for(var n=e.length;t<n;t++){var r=m(e,t);if(" "!==r&&"\t"!==r&&"\n"!==r&&"\f"!==r&&"\r"!==r)break}return t},_=function(e,t,n){var r=e.length;r<4&&(e+=2===r?"AA":"A");var i=(t[m(e,0)]<<18)+(t[m(e,1)]<<12)+(t[m(e,2)]<<6)+t[m(e,3)],s=[i>>16&255,i>>8&255,255&i];if(2===r){if(n&&0!==s[1])throw new f("Extra bits");return[s[0]]}if(3===r){if(n&&0!==s[2])throw new f("Extra bits");return[s[0],s[1]]}return s},v=function(e,t,n){for(var r=t.length,i=0;i<r;i++)e[n+i]=t[i];return n+r};e.exports=function(e,t,n,r){o(e),s(t);var i="base64"===l(t)?h:d,c=t?t.lastChunkHandling:void 0;if(void 0===c&&(c="loose"),"loose"!==c&&"strict"!==c&&"stop-before-partial"!==c)throw new p("Incorrect `lastChunkHandling` option");n&&u(n.buffer);var y=e.length,w=n||[],b=0,C=0,I="",E=0;if(r)while(1){if(E=g(e,E),E===y){if(I.length>0){if("stop-before-partial"===c)break;if("loose"!==c)throw new f("Missing padding");if(1===I.length)throw new f("Malformed padding: exactly one additional character");b=v(w,_(I,i,!1),b)}C=y;break}var T=m(e,E);if(++E,"="===T){if(I.length<2)throw new f("Padding is too early");if(E=g(e,E),2===I.length){if(E===y){if("stop-before-partial"===c)break;throw new f("Malformed padding: only one =")}"="===m(e,E)&&(++E,E=g(e,E))}if(E<y)throw new f("Unexpected character after padding");b=v(w,_(I,i,"strict"===c),b),C=y;break}if(!a(i,T))throw new f("Unexpected character");var S=r-b;if(1===S&&2===I.length||2===S&&3===I.length)break;if(I+=T,4===I.length&&(b=v(w,_(I,i,!1),b),I="",C=E,b===r))break}return{bytes:w,read:C,written:b}}},9286:function(e,t,n){"use strict";var r=n(4402),i=n(8469),s=r.Set,o=r.add;e.exports=function(e){var t=new s;return i(e,function(e){o(t,e)}),t}},9297:function(e,t,n){"use strict";var r=n(9504),i=n(8981),s=r({}.hasOwnProperty);e.exports=Object.hasOwn||function(e,t){return s(i(e),t)}},9306:function(e,t,n){"use strict";var r=n(4901),i=n(6823),s=TypeError;e.exports=function(e){if(r(e))return e;throw new s(i(e)+" is not a function")}},9429:function(e,t,n){"use strict";var r=n(4576),i=n(8574);e.exports=function(e){if(i){try{return r.process.getBuiltinModule(e)}catch(t){}try{return Function('return require("'+e+'")')()}catch(t){}}}},9433:function(e,t,n){"use strict";var r=n(4576),i=Object.defineProperty;e.exports=function(e,t){try{i(r,e,{value:t,configurable:!0,writable:!0})}catch(n){r[e]=t}return t}},9462:function(e,t,n){"use strict";var r=n(9565),i=n(2360),s=n(6699),o=n(6279),a=n(8227),c=n(1181),l=n(5966),u=n(7657).IteratorPrototype,h=n(2529),d=n(9539),f=n(1385),p=a("toStringTag"),m="IteratorHelper",g="WrapForValidIterator",_="normal",v="throw",y=c.set,w=function(e){var t=c.getterFor(e?g:m);return o(i(u),{next:function(){var n=t(this);if(e)return n.nextHandler();if(n.done)return h(void 0,!0);try{var r=n.nextHandler();return n.returnHandlerResult?r:h(r,n.done)}catch(i){throw n.done=!0,i}},return:function(){var n=t(this),i=n.iterator;if(n.done=!0,e){var s=l(i,"return");return s?r(s,i):h(void 0,!0)}if(n.inner)try{d(n.inner.iterator,_)}catch(o){return d(i,v,o)}if(n.openIters)try{f(n.openIters,_)}catch(o){return d(i,v,o)}return i&&d(i,_),h(void 0,!0)}})},b=w(!0),C=w(!1);s(C,p,"Iterator Helper"),e.exports=function(e,t,n){var r=function(r,i){i?(i.iterator=r.iterator,i.next=r.next):i=r,i.type=t?g:m,i.returnHandlerResult=!!n,i.nextHandler=e,i.counter=0,i.done=!1,y(this,i)};return r.prototype=t?b:C,r}},9486:function(e,t,n){"use strict";var r=n(6518),i=n(4576),s=n(9504),o=n(3972),a=n(4154),c=n(5169),l=n(2804),u=n(944),h=l.i2c,d=l.i2cUrl,f=s("".charAt),p=i.Uint8Array,m=!p||!p.prototype.toBase64||!function(){try{var e=new p;e.toBase64(null)}catch(t){return!0}}();p&&r({target:"Uint8Array",proto:!0,forced:m},{toBase64:function(){var e=a(this),t=arguments.length?o(arguments[0]):void 0,n="base64"===u(t)?h:d,r=!!t&&!!t.omitPadding;c(this.buffer);for(var i,s="",l=0,p=e.length,m=function(e){return f(n,i>>6*e&63)};l+2<p;l+=3)i=(e[l]<<16)+(e[l+1]<<8)+e[l+2],s+=m(3)+m(2)+m(1)+m(0);return l+2===p?(i=(e[l]<<16)+(e[l+1]<<8),s+=m(3)+m(2)+m(1)+(r?"":"=")):l+1===p&&(i=e[l]<<16,s+=m(3)+m(2)+(r?"":"==")),s}})},9504:function(e,t,n){"use strict";var r=n(616),i=Function.prototype,s=i.call,o=r&&i.bind.bind(s,s);e.exports=r?o:function(e){return function(){return s.apply(e,arguments)}}},9519:function(e,t,n){"use strict";var r,i,s=n(4576),o=n(2839),a=s.process,c=s.Deno,l=a&&a.versions||c&&c.version,u=l&&l.v8;u&&(r=u.split("."),i=r[0]>0&&r[0]<4?1:+(r[0]+r[1])),!i&&o&&(r=o.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=o.match(/Chrome\/(\d+)/),r&&(i=+r[1]))),e.exports=i},9539:function(e,t,n){"use strict";var r=n(9565),i=n(8551),s=n(5966);e.exports=function(e,t,n){var o,a;i(e);try{if(o=s(e,"return"),!o){if("throw"===t)throw n;return n}o=r(o,e)}catch(c){a=!0,o=c}if("throw"===t)throw n;if(a)throw o;return i(o),n}},9565:function(e,t,n){"use strict";var r=n(616),i=Function.prototype.call;e.exports=r?i.bind(i):function(){return i.apply(i,arguments)}},9577:function(e,t,n){"use strict";var r=n(9928),i=n(4644),s=n(1108),o=n(1291),a=n(5854),c=i.aTypedArray,l=i.getTypedArrayConstructor,u=i.exportTypedArrayMethod,h=function(){try{new Int8Array(1)["with"](2,{valueOf:function(){throw 8}})}catch(e){return 8===e}}(),d=h&&function(){try{new Int8Array(1)["with"](-.5,1)}catch(e){return!0}}();u("with",{with:function(e,t){var n=c(this),i=o(e),u=s(n)?a(t):+t;return r(n,l(n),i,u)}}["with"],!h||d)},9617:function(e,t,n){"use strict";var r=n(5397),i=n(5610),s=n(6198),o=function(e){return function(t,n,o){var a=r(t),c=s(a);if(0===c)return!e&&-1;var l,u=i(o,c);if(e&&n!==n){while(c>u)if(l=a[u++],l!==l)return!0}else for(;c>u;u++)if((e||u in a)&&a[u]===n)return e||u||0;return!e&&-1}};e.exports={includes:o(!0),indexOf:o(!1)}},9631:function(e,t,n){"use strict";n(9486)},9797:function(e,t,n){"use strict";n(4226)},9835:function(e){"use strict";e.exports=function(e){try{var t=new Set,n={size:0,has:function(){return!0},keys:function(){return Object.defineProperty({},"next",{get:function(){return t.clear(),t.add(4),function(){return{done:!0}}}})}},r=t[e](n);return 1===r.size&&4===r.values().next().value}catch(i){return!1}}},9928:function(e,t,n){"use strict";var r=n(6198),i=n(1291),s=RangeError;e.exports=function(e,t,n,o){var a=r(e),c=i(n),l=c<0?a+c:c;if(l>=a||l<0)throw new s("Incorrect index");for(var u=new t(a),h=0;h<a;h++)u[h]=h===l?o:e[h];return u}}}]);
//# sourceMappingURL=chunk-vendors.aba98355.js.map