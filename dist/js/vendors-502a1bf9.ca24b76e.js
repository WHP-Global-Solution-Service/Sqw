"use strict";(self["webpackChunksqw"]=self["webpackChunksqw"]||[]).push([[159],{1924:function(t,e,n){n.d(e,{XR:function(){return ie},qk:function(){return se},c7:function(){return ae},KR:function(){return ce},D:function(){return oe}});n(4114),n(6573),n(8100),n(7936),n(8111),n(2489),n(7588),n(1701),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(9577),n(1549),n(9797),n(9631),n(5623),n(4979);var r=n(6086),o=n(2455),s=n(798);
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
const i="firebasestorage.googleapis.com",c="storageBucket",a=12e4,u=6e5;
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
class h extends o.g{constructor(t,e,n=0){super(d(t),`Firebase Storage: ${e} (${d(t)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,h.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return d(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var l,f;function d(t){return"storage/"+t}function p(){const t="An unknown error occurred, please check the error payload for server response.";return new h(l.UNKNOWN,t)}function _(t){return new h(l.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function g(t){return new h(l.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function b(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new h(l.UNAUTHENTICATED,t)}function m(){return new h(l.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function E(t){return new h(l.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function y(){return new h(l.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function w(){return new h(l.CANCELED,"User canceled the upload/download.")}function A(t){return new h(l.INVALID_URL,"Invalid URL '"+t+"'.")}function C(t){return new h(l.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function T(){return new h(l.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+c+"' property when initializing the app?")}function R(){return new h(l.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function O(){return new h(l.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function v(t){return new h(l.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function k(t){return new h(l.INVALID_ARGUMENT,t)}function S(){return new h(l.APP_DELETED,"The Firebase app was deleted.")}function I(t){return new h(l.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function N(t,e){return new h(l.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function U(t){throw new h(l.INTERNAL_ERROR,"Internal error: "+t)}
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
 */(function(t){t["UNKNOWN"]="unknown",t["OBJECT_NOT_FOUND"]="object-not-found",t["BUCKET_NOT_FOUND"]="bucket-not-found",t["PROJECT_NOT_FOUND"]="project-not-found",t["QUOTA_EXCEEDED"]="quota-exceeded",t["UNAUTHENTICATED"]="unauthenticated",t["UNAUTHORIZED"]="unauthorized",t["UNAUTHORIZED_APP"]="unauthorized-app",t["RETRY_LIMIT_EXCEEDED"]="retry-limit-exceeded",t["INVALID_CHECKSUM"]="invalid-checksum",t["CANCELED"]="canceled",t["INVALID_EVENT_NAME"]="invalid-event-name",t["INVALID_URL"]="invalid-url",t["INVALID_DEFAULT_BUCKET"]="invalid-default-bucket",t["NO_DEFAULT_BUCKET"]="no-default-bucket",t["CANNOT_SLICE_BLOB"]="cannot-slice-blob",t["SERVER_FILE_WRONG_SIZE"]="server-file-wrong-size",t["NO_DOWNLOAD_URL"]="no-download-url",t["INVALID_ARGUMENT"]="invalid-argument",t["INVALID_ARGUMENT_COUNT"]="invalid-argument-count",t["APP_DELETED"]="app-deleted",t["INVALID_ROOT_OPERATION"]="invalid-root-operation",t["INVALID_FORMAT"]="invalid-format",t["INTERNAL_ERROR"]="internal-error",t["UNSUPPORTED_ENVIRONMENT"]="unsupported-environment"})(l||(l={}));class D{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=D.makeFromUrl(t,e)}catch(r){return new D(t,"")}if(""===n.path)return n;throw C(t)}static makeFromUrl(t,e){let n=null;const r="([A-Za-z0-9.\\-_]+)";function o(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}const s="(/(.*))?$",c=new RegExp("^gs://"+r+s,"i"),a={bucket:1,path:3};function u(t){t.path_=decodeURIComponent(t.path)}const h="v[A-Za-z0-9_]+",l=e.replace(/[.]/g,"\\."),f="(/([^?#]*).*)?$",d=new RegExp(`^https?://${l}/${h}/b/${r}/o${f}`,"i"),p={bucket:1,path:3},_=e===i?"(?:storage.googleapis.com|storage.cloud.google.com)":e,g="([^?#]*)",b=new RegExp(`^https?://${_}/${r}/${g}`,"i"),m={bucket:1,path:2},E=[{regex:c,indices:a,postModify:o},{regex:d,indices:p,postModify:u},{regex:b,indices:m,postModify:u}];for(let i=0;i<E.length;i++){const e=E[i],r=e.regex.exec(t);if(r){const t=r[e.indices.bucket];let o=r[e.indices.path];o||(o=""),n=new D(t,o),e.postModify(n);break}}if(null==n)throw A(t);return n}}class x{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}
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
 */function P(t,e,n){let r=1,o=null,s=null,i=!1,c=0;function a(){return 2===c}let u=!1;function h(...t){u||(u=!0,e.apply(null,t))}function l(e){o=setTimeout(()=>{o=null,t(d,a())},e)}function f(){s&&clearTimeout(s)}function d(t,...e){if(u)return void f();if(t)return f(),void h.call(null,t,...e);const n=a()||i;if(n)return f(),void h.call(null,t,...e);let o;r<64&&(r*=2),1===c?(c=2,o=0):o=1e3*(r+Math.random()),l(o)}let p=!1;function _(t){p||(p=!0,f(),u||(null!==o?(t||(c=2),clearTimeout(o),l(0)):t||(c=1)))}return l(0),s=setTimeout(()=>{i=!0,_(!0)},n),_}function L(t){t(!1)}
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
 */function B(t){return void 0!==t}function M(t){return"object"===typeof t&&!Array.isArray(t)}function j(t){return"string"===typeof t||t instanceof String}function F(t){return V()&&t instanceof Blob}function V(){return"undefined"!==typeof Blob}function W(t,e,n,r){if(r<e)throw k(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw k(`Invalid value for '${t}'. Expected ${n} or less.`)}
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
 */function $(t,e,n){let r=e;return null==n&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function z(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const o=e(r)+"="+e(t[r]);n=n+o+"&"}return n=n.slice(0,-1),n}
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
function H(t,e){const n=t>=500&&t<600,r=[408,429],o=-1!==r.indexOf(t),s=-1!==e.indexOf(t);return n||o||s}
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
 */(function(t){t[t["NO_ERROR"]=0]="NO_ERROR",t[t["NETWORK_ERROR"]=1]="NETWORK_ERROR",t[t["ABORT"]=2]="ABORT"})(f||(f={}));class K{constructor(t,e,n,r,o,s,i,c,a,u,h,l=!0,f=!1){this.url_=t,this.method_=e,this.headers_=n,this.body_=r,this.successCodes_=o,this.additionalRetryCodes_=s,this.callback_=i,this.errorCallback_=c,this.timeout_=a,this.progressCallback_=u,this.connectionFactory_=h,this.retry=l,this.isUsingEmulator=f,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((t,e)=>{this.resolve_=t,this.reject_=e,this.start_()})}start_(){const t=(t,e)=>{if(e)return void t(!1,new q(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=t=>{const e=t.loaded,n=t.lengthComputable?t.total:-1;null!==this.progressCallback_&&this.progressCallback_(e,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const e=n.getErrorCode()===f.NO_ERROR,o=n.getStatus();if(!e||H(o,this.additionalRetryCodes_)&&this.retry){const e=n.getErrorCode()===f.ABORT;return void t(!1,new q(!1,null,e))}const s=-1!==this.successCodes_.indexOf(o);t(!0,new q(s,n))})},e=(t,e)=>{const n=this.resolve_,r=this.reject_,o=e.connection;if(e.wasSuccessCode)try{const t=this.callback_(o,o.getResponse());B(t)?n(t):n()}catch(s){r(s)}else if(null!==o){const t=p();t.serverResponse=o.getErrorText(),this.errorCallback_?r(this.errorCallback_(o,t)):r(t)}else if(e.canceled){const t=this.appDelete_?S():w();r(t)}else{const t=y();r(t)}};this.canceled_?e(!1,new q(!1,null,!0)):this.backoffId_=P(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&L(this.backoffId_),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class q{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}function Z(t,e){null!==e&&e.length>0&&(t["Authorization"]="Firebase "+e)}function J(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function X(t,e){e&&(t["X-Firebase-GMPID"]=e)}function G(t,e){null!==e&&(t["X-Firebase-AppCheck"]=e)}function Y(t,e,n,r,o,s,i=!0,c=!1){const a=z(t.urlParams),u=t.url+a,h=Object.assign({},t.headers);return X(h,e),Z(h,n),J(h,s),G(h,r),new K(u,t.method,h,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,o,i,c)}
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
 */function Q(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function tt(...t){const e=Q();if(void 0!==e){const n=new e;for(let e=0;e<t.length;e++)n.append(t[e]);return n.getBlob()}if(V())return new Blob(t);throw new h(l.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}function et(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}
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
 */function nt(t){if("undefined"===typeof atob)throw v("base-64");return atob(t)}
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
 */const rt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ot{constructor(t,e){this.data=t,this.contentType=e||null}}function st(t,e){switch(t){case rt.RAW:return new ot(it(e));case rt.BASE64:case rt.BASE64URL:return new ot(at(t,e));case rt.DATA_URL:return new ot(ht(e),lt(e))}throw p()}function it(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|63&r);else if(55296===(64512&r)){const o=n<t.length-1&&56320===(64512&t.charCodeAt(n+1));if(o){const o=r,s=t.charCodeAt(++n);r=65536|(1023&o)<<10|1023&s,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else e.push(239,191,189)}else 56320===(64512&r)?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(e)}function ct(t){let e;try{e=decodeURIComponent(t)}catch(n){throw N(rt.DATA_URL,"Malformed data URL.")}return it(e)}function at(t,e){switch(t){case rt.BASE64:{const n=-1!==e.indexOf("-"),r=-1!==e.indexOf("_");if(n||r){const e=n?"-":"_";throw N(t,"Invalid character '"+e+"' found: is it base64url encoded?")}break}case rt.BASE64URL:{const n=-1!==e.indexOf("+"),r=-1!==e.indexOf("/");if(n||r){const e=n?"+":"/";throw N(t,"Invalid character '"+e+"' found: is it base64 encoded?")}e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=nt(e)}catch(o){if(o.message.includes("polyfill"))throw o;throw N(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class ut{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(null===e)throw N(rt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=e[1]||null;null!=n&&(this.base64=ft(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=t.substring(t.indexOf(",")+1)}}function ht(t){const e=new ut(t);return e.base64?at(rt.BASE64,e.rest):ct(e.rest)}function lt(t){const e=new ut(t);return e.contentType}function ft(t,e){const n=t.length>=e.length;return!!n&&t.substring(t.length-e.length)===e}
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
 */class dt{constructor(t,e){let n=0,r="";F(t)?(this.data_=t,n=t.size,r=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),n=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),n=t.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(t,e){if(F(this.data_)){const n=this.data_,r=et(n,t,e);return null===r?null:new dt(r)}{const n=new Uint8Array(this.data_.buffer,t,e-t);return new dt(n,!0)}}static getBlob(...t){if(V()){const e=t.map(t=>t instanceof dt?t.data_:t);return new dt(tt.apply(null,e))}{const e=t.map(t=>j(t)?st(rt.RAW,t).data:t.data_);let n=0;e.forEach(t=>{n+=t.byteLength});const r=new Uint8Array(n);let o=0;return e.forEach(t=>{for(let e=0;e<t.length;e++)r[o++]=t[e]}),new dt(r,!0)}}uploadData(){return this.data_}}
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
 */function pt(t){let e;try{e=JSON.parse(t)}catch(n){return null}return M(e)?e:null}
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
 */function _t(t){if(0===t.length)return null;const e=t.lastIndexOf("/");if(-1===e)return"";const n=t.slice(0,e);return n}function gt(t,e){const n=e.split("/").filter(t=>t.length>0).join("/");return 0===t.length?n:t+"/"+n}function bt(t){const e=t.lastIndexOf("/",t.length-2);return-1===e?t:t.slice(e+1)}
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
 */function mt(t,e){return e}class Et{constructor(t,e,n,r){this.server=t,this.local=e||t,this.writable=!!n,this.xform=r||mt}}let yt=null;function wt(t){return!j(t)||t.length<2?t:bt(t)}function At(){if(yt)return yt;const t=[];function e(t,e){return wt(e)}t.push(new Et("bucket")),t.push(new Et("generation")),t.push(new Et("metageneration")),t.push(new Et("name","fullPath",!0));const n=new Et("name");function r(t,e){return void 0!==e?Number(e):e}n.xform=e,t.push(n);const o=new Et("size");return o.xform=r,t.push(o),t.push(new Et("timeCreated")),t.push(new Et("updated")),t.push(new Et("md5Hash",null,!0)),t.push(new Et("cacheControl",null,!0)),t.push(new Et("contentDisposition",null,!0)),t.push(new Et("contentEncoding",null,!0)),t.push(new Et("contentLanguage",null,!0)),t.push(new Et("contentType",null,!0)),t.push(new Et("metadata","customMetadata",!0)),yt=t,yt}function Ct(t,e){function n(){const n=t["bucket"],r=t["fullPath"],o=new D(n,r);return e._makeStorageReference(o)}Object.defineProperty(t,"ref",{get:n})}function Tt(t,e,n){const r={type:"file"},o=n.length;for(let s=0;s<o;s++){const t=n[s];r[t.local]=t.xform(r,e[t.server])}return Ct(r,t),r}function Rt(t,e,n){const r=pt(e);if(null===r)return null;const o=r;return Tt(t,o,n)}function Ot(t,e,n,r){const o=pt(e);if(null===o)return null;if(!j(o["downloadTokens"]))return null;const s=o["downloadTokens"];if(0===s.length)return null;const i=encodeURIComponent,c=s.split(","),a=c.map(e=>{const o=t["bucket"],s=t["fullPath"],c="/b/"+i(o)+"/o/"+i(s),a=$(c,n,r),u=z({alt:"media",token:e});return a+u});return a[0]}function vt(t,e){const n={},r=e.length;for(let o=0;o<r;o++){const r=e[o];r.writable&&(n[r.server]=t[r.local])}return JSON.stringify(n)}
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
 */class kt{constructor(t,e,n,r){this.url=t,this.method=e,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
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
 */function St(t){if(!t)throw p()}function It(t,e){function n(n,r){const o=Rt(t,r,e);return St(null!==o),o}return n}function Nt(t,e){function n(n,r){const o=Rt(t,r,e);return St(null!==o),Ot(o,r,t.host,t._protocol)}return n}function Ut(t){function e(e,n){let r;return r=401===e.getStatus()?e.getErrorText().includes("Firebase App Check token is invalid")?m():b():402===e.getStatus()?g(t.bucket):403===e.getStatus()?E(t.path):n,r.status=e.getStatus(),r.serverResponse=n.serverResponse,r}return e}function Dt(t){const e=Ut(t);function n(n,r){let o=e(n,r);return 404===n.getStatus()&&(o=_(t.path)),o.serverResponse=r.serverResponse,o}return n}function xt(t,e,n){const r=e.fullServerUrl(),o=$(r,t.host,t._protocol),s="GET",i=t.maxOperationRetryTime,c=new kt(o,s,Nt(t,n),i);return c.errorHandler=Dt(e),c}function Pt(t,e){const n=e.fullServerUrl(),r=$(n,t.host,t._protocol),o="DELETE",s=t.maxOperationRetryTime;function i(t,e){}const c=new kt(r,o,i,s);return c.successCodes=[200,204],c.errorHandler=Dt(e),c}function Lt(t,e){return t&&t["contentType"]||e&&e.type()||"application/octet-stream"}function Bt(t,e,n){const r=Object.assign({},n);return r["fullPath"]=t.path,r["size"]=e.size(),r["contentType"]||(r["contentType"]=Lt(null,e)),r}function Mt(t,e,n,r,o){const s=e.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"};function c(){let t="";for(let e=0;e<2;e++)t+=Math.random().toString().slice(2);return t}const a=c();i["Content-Type"]="multipart/related; boundary="+a;const u=Bt(e,r,o),h=vt(u,n),l="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+h+"\r\n--"+a+"\r\nContent-Type: "+u["contentType"]+"\r\n\r\n",f="\r\n--"+a+"--",d=dt.getBlob(l,r,f);if(null===d)throw R();const p={name:u["fullPath"]},_=$(s,t.host,t._protocol),g="POST",b=t.maxUploadRetryTime,m=new kt(_,g,It(t,n),b);return m.urlParams=p,m.headers=i,m.body=d.uploadData(),m.errorHandler=Ut(e),m}
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
let jt=null;class Ft{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=f.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=f.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=f.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,e,n,r,s){if(this.sent_)throw U("cannot .send() more than once");if((0,o.zJ)(t)&&n&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(e,t,!0),void 0!==s)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw U("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw U("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}}getResponse(){if(!this.sent_)throw U("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw U("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",t)}}class Vt extends Ft{initXhr(){this.xhr_.responseType="text"}}function Wt(){return jt?jt():new Vt}
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
class $t{constructor(t,e){this._service=t,this._location=e instanceof D?e:D.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new $t(t,e)}get root(){const t=new D(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return bt(this._location.path)}get storage(){return this._service}get parent(){const t=_t(this._location.path);if(null===t)return null;const e=new D(this._location.bucket,t);return new $t(this._service,e)}_throwIfRoot(t){if(""===this._location.path)throw I(t)}}function zt(t,e,n){t._throwIfRoot("uploadBytes");const r=Mt(t.storage,t._location,At(),new dt(e,!0),n);return t.storage.makeRequestWithTokens(r,Wt).then(e=>({metadata:e,ref:t}))}function Ht(t){t._throwIfRoot("getDownloadURL");const e=xt(t.storage,t._location,At());return t.storage.makeRequestWithTokens(e,Wt).then(t=>{if(null===t)throw O();return t})}function Kt(t){t._throwIfRoot("deleteObject");const e=Pt(t.storage,t._location);return t.storage.makeRequestWithTokens(e,Wt)}function qt(t,e){const n=gt(t._location.path,e),r=new D(t._location.bucket,n);return new $t(t.storage,r)}
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
 */function Zt(t){return/^[A-Za-z]+:\/\//.test(t)}function Jt(t,e){return new $t(t,e)}function Xt(t,e){if(t instanceof te){const n=t;if(null==n._bucket)throw T();const r=new $t(n,n._bucket);return null!=e?Xt(r,e):r}return void 0!==e?qt(t,e):t}function Gt(t,e){if(e&&Zt(e)){if(t instanceof te)return Jt(t,e);throw k("To use ref(service, url), the first argument must be a Storage instance.")}return Xt(t,e)}function Yt(t,e){const n=e?.[c];return null==n?null:D.makeFromBucketSpec(n,t)}function Qt(t,e,n,r={}){t.host=`${e}:${n}`;const s=(0,o.zJ)(e);s&&((0,o.gE)(`https://${t.host}/b`),(0,o.P1)("Storage",!0)),t._isUsingEmulator=!0,t._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(t._overrideAuthToken="string"===typeof i?i:(0,o.Fy)(i,t.app.options.projectId))}class te{constructor(t,e,n,r,o,s=!1){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._url=r,this._firebaseVersion=o,this._isUsingEmulator=s,this._bucket=null,this._host=i,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=a,this._maxUploadRetryTime=u,this._requests=new Set,this._bucket=null!=r?D.makeFromBucketSpec(r,this._host):Yt(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,null!=this._url?this._bucket=D.makeFromBucketSpec(this._url,t):this._bucket=Yt(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){W("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){W("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(null!==e)return e.accessToken}return null}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();return e.token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new $t(this,t)}_makeRequest(t,e,n,r,o=!0){if(this._deleted)return new x(S());{const s=Y(t,this._appId,n,r,e,this._firebaseVersion,o,this._isUsingEmulator);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(t,e){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,n,r).getPromise()}}const ee="@firebase/storage",ne="0.14.0",re="storage";function oe(t,e,n){return t=(0,o.Ku)(t),zt(t,e,n)}function se(t){return t=(0,o.Ku)(t),Ht(t)}function ie(t){return t=(0,o.Ku)(t),Kt(t)}function ce(t,e){return t=(0,o.Ku)(t),Gt(t,e)}function ae(t=(0,r.Sx)(),e){t=(0,o.Ku)(t);const n=(0,r.j6)(t,re),s=n.getImmediate({identifier:e}),i=(0,o.yU)("storage");return i&&ue(s,...i),s}function ue(t,e,n,r={}){Qt(t,e,n,r)}
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
 */function he(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),o=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new te(n,o,s,e,r.MF)}function le(){(0,r.om)(new s.uA(re,he,"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(ee,ne,""),(0,r.KO)(ee,ne,"esm2020")}le()},2455:function(t,e,n){n.d(e,{cY:function(){return O},FA:function(){return q},g:function(){return K},gz:function(){return ht},dM:function(){return z},vA:function(){return s},Hk:function(){return i},K3:function(){return u},u:function(){return d},KA:function(){return l},Uj:function(){return f},p9:function(){return At},gR:function(){return et},Fy:function(){return S},tD:function(){return lt},A4:function(){return p},bD:function(){return st},dI:function(){return _t},hp:function(){return ut},T9:function(){return T},Tj:function(){return A},yU:function(){return C},XA:function(){return R},Ku:function(){return Ct},ZQ:function(){return P},qc:function(){return tt},sr:function(){return M},zJ:function(){return v},c1:function(){return B},Im:function(){return rt},lT:function(){return F},zW:function(){return W},jZ:function(){return L},$g:function(){return V},lV:function(){return j},Cv:function(){return Q},$L:function(){return X},kH:function(){return ot},gE:function(){return k},Am:function(){return ct},I9:function(){return at},yw:function(){return nt},OE:function(){return bt},kj:function(){return gt},As:function(){return G},P1:function(){return x},eX:function(){return $}});n(4114),n(8111),n(7588),n(4979),n(4603),n(7566),n(8721);const r=()=>{},o={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},s=function(t,e){if(!t)throw i(e)},i=function(t){return new Error("Firebase Database ("+o.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)},c=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let o=t.charCodeAt(r);o<128?e[n++]=o:o<2048?(e[n++]=o>>6|192,e[n++]=63&o|128):55296===(64512&o)&&r+1<t.length&&56320===(64512&t.charCodeAt(r+1))?(o=65536+((1023&o)<<10)+(1023&t.charCodeAt(++r)),e[n++]=o>>18|240,e[n++]=o>>12&63|128,e[n++]=o>>6&63|128,e[n++]=63&o|128):(e[n++]=o>>12|224,e[n++]=o>>6&63|128,e[n++]=63&o|128)}return e},a=function(t){const e=[];let n=0,r=0;while(n<t.length){const o=t[n++];if(o<128)e[r++]=String.fromCharCode(o);else if(o>191&&o<224){const s=t[n++];e[r++]=String.fromCharCode((31&o)<<6|63&s)}else if(o>239&&o<365){const s=t[n++],i=t[n++],c=t[n++],a=((7&o)<<18|(63&s)<<12|(63&i)<<6|63&c)-65536;e[r++]=String.fromCharCode(55296+(a>>10)),e[r++]=String.fromCharCode(56320+(1023&a))}else{const s=t[n++],i=t[n++];e[r++]=String.fromCharCode((15&o)<<12|(63&s)<<6|63&i)}}return e.join("")},u={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let o=0;o<t.length;o+=3){const e=t[o],s=o+1<t.length,i=s?t[o+1]:0,c=o+2<t.length,a=c?t[o+2]:0,u=e>>2,h=(3&e)<<4|i>>4;let l=(15&i)<<2|a>>6,f=63&a;c||(f=64,s||(l=64)),r.push(n[u],n[h],n[l],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(c(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):a(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let o=0;o<t.length;){const e=n[t.charAt(o++)],s=o<t.length,i=s?n[t.charAt(o)]:0;++o;const c=o<t.length,a=c?n[t.charAt(o)]:64;++o;const u=o<t.length,l=u?n[t.charAt(o)]:64;if(++o,null==e||null==i||null==a||null==l)throw new h;const f=e<<2|i>>4;if(r.push(f),64!==a){const t=i<<4&240|a>>2;if(r.push(t),64!==l){const t=a<<6&192|l;r.push(t)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class h extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const l=function(t){const e=c(t);return u.encodeByteArray(e,!0)},f=function(t){return l(t).replace(/\./g,"")},d=function(t){try{return u.decodeString(t,!0)}catch(e){}return null};
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
function p(t){return _(void 0,t)}function _(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:void 0===t&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)e.hasOwnProperty(n)&&g(n)&&(t[n]=_(t[n],e[n]));return t}function g(t){return"__proto__"!==t}
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
 */function b(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof n.g)return n.g;throw new Error("Unable to locate global object.")}
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
 */const m=()=>b().__FIREBASE_DEFAULTS__,E=()=>{if("undefined"===typeof process)return;const t={NODE_ENV:"production",VUE_APP_FIREBASE_apiKey:"AIzaSyBDdOt1ajdsBOu7tVdcWOm3c_A61yvdytk",VUE_APP_FIREBASE_appId:"1:828044311671:web:c6fe41d320716830591a72",VUE_APP_FIREBASE_authDomain:"chattestproject-42024.firebaseapp.com",VUE_APP_FIREBASE_databaseURL:"https://chattestproject-42024-default-rtdb.asia-southeast1.firebasedatabase.app",VUE_APP_FIREBASE_measurementId:"G-6H2BLTSKLW",VUE_APP_FIREBASE_messagingSenderId:"828044311671",VUE_APP_FIREBASE_projectId:"chattestproject-42024",VUE_APP_FIREBASE_storageBucket:"chattestproject-42024.firebasestorage.app",BASE_URL:""}.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0},y=()=>{if("undefined"===typeof document)return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const e=t&&d(t[1]);return e&&JSON.parse(e)},w=()=>{try{return r()||m()||E()||y()}catch(t){return}},A=t=>w()?.emulatorHosts?.[t],C=t=>{const e=A(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return"["===e[0]?[e.substring(1,n-1),r]:[e.substring(0,n),r]},T=()=>w()?.config,R=t=>w()?.[`_${t}`];
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
class O{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"===typeof t&&(this.promise.catch(()=>{}),1===t.length?t(e):t(e,n))}}}
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
 */function v(t){try{const e=t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t;return e.endsWith(".cloudworkstations.dev")}catch{return!1}}async function k(t){const e=await fetch(t,{credentials:"include"});return e.ok}
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
 */function S(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",o=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i={iss:`https://securetoken.google.com/${r}`,aud:r,iat:o,exp:o+3600,auth_time:o,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t},c="";return[f(JSON.stringify(n)),f(JSON.stringify(i)),c].join(".")}const I={};function N(){const t={prod:[],emulator:[]};for(const e of Object.keys(I))I[e]?t.emulator.push(e):t.prod.push(e);return t}function U(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let D=!1;function x(t,e){if("undefined"===typeof window||"undefined"===typeof document||!v(window.location.host)||I[t]===e||I[t]||D)return;function n(t){return`__firebase__banner__${t}`}I[t]=e;const r="__firebase__banner",o=N(),s=o.prod.length>0;function i(){const t=document.getElementById(r);t&&t.remove()}function c(t){t.style.display="flex",t.style.background="#7faaf0",t.style.position="fixed",t.style.bottom="5px",t.style.left="5px",t.style.padding=".5em",t.style.borderRadius="5px",t.style.alignItems="center"}function a(t,e){t.setAttribute("width","24"),t.setAttribute("id",e),t.setAttribute("height","24"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.style.marginLeft="-6px"}function u(){const t=document.createElement("span");return t.style.cursor="pointer",t.style.marginLeft="16px",t.style.fontSize="24px",t.innerHTML=" &times;",t.onclick=()=>{D=!0,i()},t}function h(t,e){t.setAttribute("id",e),t.innerText="Learn more",t.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",t.setAttribute("target","__blank"),t.style.paddingLeft="5px",t.style.textDecoration="underline"}function l(){const t=U(r),e=n("text"),o=document.getElementById(e)||document.createElement("span"),i=n("learnmore"),l=document.getElementById(i)||document.createElement("a"),f=n("preprendIcon"),d=document.getElementById(f)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(t.created){const e=t.element;c(e),h(l,i);const n=u();a(d,f),e.append(d,o,l,n),document.body.appendChild(e)}s?(o.innerText="Preview backend disconnected.",d.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(d.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",e)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",l):l()}
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
 */function P(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""}function L(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(P())}function B(){return"undefined"!==typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function M(){const t="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof t&&void 0!==t.id}function j(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]}function F(){const t=P();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function V(){return!0===o.NODE_CLIENT||!0===o.NODE_ADMIN}function W(){try{return"object"===typeof indexedDB}catch(t){return!1}}function $(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{e(o.error?.message||"")}}catch(n){e(n)}})}function z(){return!("undefined"===typeof navigator||!navigator.cookieEnabled)}
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
 */const H="FirebaseError";class K extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=H,Object.setPrototypeOf(this,K.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,q.prototype.create)}}class q{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},r=`${this.service}/${t}`,o=this.errors[t],s=o?Z(o,n):"Error",i=`${this.serviceName}: ${s} (${r}).`,c=new K(r,i,n);return c}}function Z(t,e){return t.replace(J,(t,n)=>{const r=e[n];return null!=r?String(r):`<${n}?>`})}const J=/\{\$([^}]+)}/g;
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
 */function X(t){return JSON.parse(t)}function G(t){return JSON.stringify(t)}
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
 */const Y=function(t){let e={},n={},r={},o="";try{const s=t.split(".");e=X(d(s[0])||""),n=X(d(s[1])||""),o=s[2],r=n["d"]||{},delete n["d"]}catch(s){}return{header:e,claims:n,data:r,signature:o}},Q=function(t){const e=Y(t),n=e.claims;return!!n&&"object"===typeof n&&n.hasOwnProperty("iat")},tt=function(t){const e=Y(t).claims;return"object"===typeof e&&!0===e["admin"]};
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
function et(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function nt(t,e){return Object.prototype.hasOwnProperty.call(t,e)?t[e]:void 0}function rt(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ot(t,e,n){const r={};for(const o in t)Object.prototype.hasOwnProperty.call(t,o)&&(r[o]=e.call(n,t[o],o,t));return r}function st(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const o of n){if(!r.includes(o))return!1;const n=t[o],s=e[o];if(it(n)&&it(s)){if(!st(n,s))return!1}else if(n!==s)return!1}for(const o of r)if(!n.includes(o))return!1;return!0}function it(t){return null!==t&&"object"===typeof t}
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
function ct(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(t=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(t))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function at(t){const e={},n=t.replace(/^\?/,"").split("&");return n.forEach(t=>{if(t){const[n,r]=t.split("=");e[decodeURIComponent(n)]=decodeURIComponent(r)}}),e}function ut(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}
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
 */class ht{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(t,e){e||(e=0);const n=this.W_;if("string"===typeof t)for(let h=0;h<16;h++)n[h]=t.charCodeAt(e)<<24|t.charCodeAt(e+1)<<16|t.charCodeAt(e+2)<<8|t.charCodeAt(e+3),e+=4;else for(let h=0;h<16;h++)n[h]=t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3],e+=4;for(let h=16;h<80;h++){const t=n[h-3]^n[h-8]^n[h-14]^n[h-16];n[h]=4294967295&(t<<1|t>>>31)}let r,o,s=this.chain_[0],i=this.chain_[1],c=this.chain_[2],a=this.chain_[3],u=this.chain_[4];for(let h=0;h<80;h++){h<40?h<20?(r=a^i&(c^a),o=1518500249):(r=i^c^a,o=1859775393):h<60?(r=i&c|a&(i|c),o=2400959708):(r=i^c^a,o=3395469782);const t=(s<<5|s>>>27)+r+u+o+n[h]&4294967295;u=a,a=c,c=4294967295&(i<<30|i>>>2),i=s,s=t}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+c&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(t,e){if(null==t)return;void 0===e&&(e=t.length);const n=e-this.blockSize;let r=0;const o=this.buf_;let s=this.inbuf_;while(r<e){if(0===s)while(r<=n)this.compress_(t,r),r+=this.blockSize;if("string"===typeof t){while(r<e)if(o[s]=t.charCodeAt(r),++s,++r,s===this.blockSize){this.compress_(o),s=0;break}}else while(r<e)if(o[s]=t[r],++s,++r,s===this.blockSize){this.compress_(o),s=0;break}}this.inbuf_=s,this.total_+=e}digest(){const t=[];let e=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=255&e,e/=256;this.compress_(this.buf_);let n=0;for(let r=0;r<5;r++)for(let e=24;e>=0;e-=8)t[n]=this.chain_[r]>>e&255,++n;return t}}function lt(t,e){const n=new ft(t,e);return n.subscribe.bind(n)}class ft{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(t=>{this.error(t)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,n){let r;if(void 0===t&&void 0===e&&void 0===n)throw new Error("Missing Observer.");r=dt(t,["next","error","complete"])?t:{next:t,error:e,complete:n},void 0===r.next&&(r.next=pt),void 0===r.error&&(r.error=pt),void 0===r.complete&&(r.complete=pt);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(t){}}),this.observers.push(r),o}unsubscribeOne(t){void 0!==this.observers&&void 0!==this.observers[t]&&(delete this.observers[t],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[t])try{e(this.observers[t])}catch(n){"undefined"!==typeof console&&console.error}})}close(t){this.finalized||(this.finalized=!0,void 0!==t&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function dt(t,e){if("object"!==typeof t||null===t)return!1;for(const n of e)if(n in t&&"function"===typeof t[n])return!0;return!1}function pt(){}
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
 */function _t(t,e){return`${t} failed: ${e} argument `}
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
const gt=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let o=t.charCodeAt(r);if(o>=55296&&o<=56319){const e=o-55296;r++,s(r<t.length,"Surrogate pair missing trail surrogate.");const n=t.charCodeAt(r)-56320;o=65536+(e<<10)+n}o<128?e[n++]=o:o<2048?(e[n++]=o>>6|192,e[n++]=63&o|128):o<65536?(e[n++]=o>>12|224,e[n++]=o>>6&63|128,e[n++]=63&o|128):(e[n++]=o>>18|240,e[n++]=o>>12&63|128,e[n++]=o>>6&63|128,e[n++]=63&o|128)}return e},bt=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e},mt=1e3,Et=2,yt=144e5,wt=.5;function At(t,e=mt,n=Et){const r=e*Math.pow(n,t),o=Math.round(wt*r*(Math.random()-.5)*2);return Math.min(yt,r+o)}
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
function Ct(t){return t&&t._delegate?t._delegate:t}}}]);