"use strict";(self["webpackChunksqw"]=self["webpackChunksqw"]||[]).push([[807],{4964:function(e,t,n){n.d(t,{P5:function(){return te}});n(4114),n(8111),n(116),n(7588),n(1701);var i=n(6086),a=n(6189),s=n(2455),r=n(798);n(7560);
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
const o="analytics",c="firebase_id",l="origin",d=6e4,u="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",p="https://www.googletagmanager.com/gtag/js",f=new a.Vy("@firebase/analytics"),h={["already-exists"]:"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",["already-initialized"]:"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.",["already-initialized-settings"]:"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",["interop-component-reg-failed"]:"Firebase Analytics Interop Component failed to instantiate: {$reason}",["invalid-analytics-context"]:"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["indexeddb-unavailable"]:"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",["fetch-throttle"]:"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",["config-fetch-failed"]:"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",["no-api-key"]:'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',["no-app-id"]:'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',["no-client-id"]:'The "client_id" field is empty.',["invalid-gtag-resource"]:"Trusted Types detected an invalid gtag resource: {$gtagURL}."},m=new s.FA("analytics","Analytics",h);
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
function g(e){if(!e.startsWith(p)){const t=m.create("invalid-gtag-resource",{gtagURL:e});return f.warn(t.message),""}return e}function w(e){return Promise.all(e.map(e=>e.catch(e=>e)))}function y(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function I(e,t){const n=y("firebase-js-sdk-policy",{createScriptURL:g}),i=document.createElement("script"),a=`${p}?l=${e}&id=${t}`;i.src=n?n?.createScriptURL(a):a,i.async=!0,document.head.appendChild(i)}function b(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function v(e,t,n,i,a,s){const r=i[a];try{if(r)await t[r];else{const e=await w(n),i=e.find(e=>e.measurementId===a);i&&await t[i.appId]}}catch(o){f.error(o)}e("config",a,s)}async function T(e,t,n,i,a){try{let s=[];if(a&&a["send_to"]){let e=a["send_to"];Array.isArray(e)||(e=[e]);const i=await w(n);for(const n of e){const e=i.find(e=>e.measurementId===n),a=e&&t[e.appId];if(!a){s=[];break}s.push(a)}}0===s.length&&(s=Object.values(t)),await Promise.all(s),e("event",i,a||{})}catch(s){f.error(s)}}function A(e,t,n,i){async function a(a,...s){try{if("event"===a){const[i,a]=s;await T(e,t,n,i,a)}else if("config"===a){const[a,r]=s;await v(e,t,n,i,a,r)}else if("consent"===a){const[t,n]=s;e("consent",t,n)}else if("get"===a){const[t,n,i]=s;e("get",t,n,i)}else if("set"===a){const[t]=s;e("set",t)}else e(a,...s)}catch(r){f.error(r)}}return a}function D(e,t,n,i,a){let s=function(...e){window[i].push(arguments)};return window[a]&&"function"===typeof window[a]&&(s=window[a]),window[a]=A(s,e,t,n),{gtagCore:s,wrappedGtag:window[a]}}function F(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(p)&&n.src.includes(e))return n;return null}
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
 */const M=30,$=1e3;class k{constructor(e={},t=$){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const x=new k;function z(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function C(e){const{appId:t,apiKey:n}=e,i={method:"GET",headers:z(n)},a=u.replace("{app-id}",t),s=await fetch(a,i);if(200!==s.status&&304!==s.status){let e="";try{const t=await s.json();t.error?.message&&(e=t.error.message)}catch(r){}throw m.create("config-fetch-failed",{httpStatus:s.status,responseMessage:e})}return s.json()}async function E(e,t=x,n){const{appId:i,apiKey:a,measurementId:s}=e.options;if(!i)throw m.create("no-app-id");if(!a){if(s)return{measurementId:s,appId:i};throw m.create("no-api-key")}const r=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new S;return setTimeout(async()=>{o.abort()},void 0!==n?n:d),P({appId:i,apiKey:a,measurementId:s},r,o,t)}async function P(e,{throttleEndTimeMillis:t,backoffCount:n},i,a=x){const{appId:r,measurementId:o}=e;try{await j(i,t)}catch(c){if(o)return f.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:r,measurementId:o};throw c}try{const t=await C(e);return a.deleteThrottleMetadata(r),t}catch(c){const t=c;if(!K(t)){if(a.deleteThrottleMetadata(r),o)return f.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${t?.message}]`),{appId:r,measurementId:o};throw c}const l=503===Number(t?.customData?.httpStatus)?(0,s.p9)(n,a.intervalMillis,M):(0,s.p9)(n,a.intervalMillis),d={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return a.setThrottleMetadata(r,d),f.debug(`Calling attemptFetch again in ${l} millis`),P(e,d,i,a)}}function j(e,t){return new Promise((n,i)=>{const a=Math.max(t-Date.now(),0),s=setTimeout(n,a);e.addEventListener(()=>{clearTimeout(s),i(m.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function K(e){if(!(e instanceof s.g)||!e.customData)return!1;const t=Number(e.customData["httpStatus"]);return 429===t||500===t||503===t||504===t}class S{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}
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
 */let L,q;async function O(e,t,n,i,a){if(a&&a.global)e("event",n,i);else{const a=await t,s={...i,send_to:a};e("event",n,s)}}function U(e){q=e}function _(e){L=e}
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
 */async function R(){if(!(0,s.zW)())return f.warn(m.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await(0,s.eX)()}catch(e){return f.warn(m.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}return!0}async function B(e,t,n,i,a,s,r){const o=E(e);o.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&f.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>f.error(e)),t.push(o);const d=R().then(e=>e?i.getId():void 0),[u,p]=await Promise.all([o,d]);F(s)||I(s,u.measurementId),q&&(a("consent","default",q),U(void 0)),a("js",new Date);const h=r?.config??{};return h[l]="firebase",h.update=!0,null!=p&&(h[c]=p),a("config",u.measurementId,h),L&&(a("set",L),_(void 0)),u.measurementId}
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
 */class W{constructor(e){this.app=e}_delete(){return delete G[this.app.options.appId],Promise.resolve()}}let G={},N=[];const V={};let H,X,J="dataLayer",Q="gtag",Y=!1;function Z(){const e=[];if((0,s.sr)()&&e.push("This is a browser extension environment."),(0,s.dM)()||e.push("Cookies are not available."),e.length>0){const t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=m.create("invalid-analytics-context",{errorInfo:t});f.warn(n.message)}}function ee(e,t,n){Z();const i=e.options.appId;if(!i)throw m.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw m.create("no-api-key");f.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=G[i])throw m.create("already-exists",{id:i});if(!Y){b(J);const{wrappedGtag:e,gtagCore:t}=D(G,N,V,J,Q);X=e,H=t,Y=!0}G[i]=B(e,N,V,t,H,J,n);const a=new W(e);return a}function te(e=(0,i.Sx)()){e=(0,s.Ku)(e);const t=(0,i.j6)(e,o);return t.isInitialized()?t.getImmediate():ne(e)}function ne(e,t={}){const n=(0,i.j6)(e,o);if(n.isInitialized()){const e=n.getImmediate();if((0,s.bD)(t,n.getOptions()))return e;throw m.create("already-initialized")}const a=n.initialize({options:t});return a}function ie(e,t,n,i){e=(0,s.Ku)(e),O(X,G[e.app.options.appId],t,n,i).catch(e=>f.error(e))}const ae="@firebase/analytics",se="0.10.18";function re(){function e(e){try{const t=e.getProvider(o).getImmediate();return{logEvent:(e,n,i)=>ie(t,e,n,i)}}catch(t){throw m.create("interop-component-reg-failed",{reason:t})}}(0,i.om)(new r.uA(o,(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return ee(n,i,t)},"PUBLIC")),(0,i.om)(new r.uA("analytics-internal",e,"PRIVATE")),(0,i.KO)(ae,se),(0,i.KO)(ae,se,"esm2020")}re()}}]);