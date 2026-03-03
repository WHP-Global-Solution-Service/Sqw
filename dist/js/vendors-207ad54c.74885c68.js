"use strict";(self["webpackChunksqw"]=self["webpackChunksqw"]||[]).push([[585],{3329:function(e,t,a){a.d(t,{HF:function(){return r.Y},eJ:function(){return r.ab},xI:function(){return r.p},hg:function(){return r.z},zK:function(){return r.a1},x9:function(){return r.ac},df:function(){return r.d},CI:function(){return r.D},r7:function(){return r.al}});var r=a(1581);a(6086),a(2455),a(6189),a(798)},6086:function(e,t,a){a.d(t,{KO:function(){return ee},MF:function(){return Z},Sx:function(){return Q},Wp:function(){return G},j6:function(){return K},om:function(){return W},xZ:function(){return L}});a(4114),a(8111),a(2489),a(1701),a(3579);var r=a(798),n=a(6189),i=a(2455),s=a(8071);
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
class o{constructor(e){this.container=e}getPlatformInfoString(){const e=this.container.getProviders();return e.map(e=>{if(c(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}function c(e){const t=e.getComponent();return"VERSION"===t?.type}const h="@firebase/app",f="0.14.1",p=new n.Vy("@firebase/app"),u="@firebase/app-compat",b="@firebase/analytics-compat",l="@firebase/analytics",d="@firebase/app-check-compat",g="@firebase/app-check",m="@firebase/auth",w="@firebase/auth-compat",_="@firebase/database",D="@firebase/data-connect",C="@firebase/database-compat",v="@firebase/functions",y="@firebase/functions-compat",E="@firebase/installations",S="@firebase/installations-compat",I="@firebase/messaging",$="@firebase/messaging-compat",k="@firebase/performance",A="@firebase/performance-compat",P="@firebase/remote-config",x="@firebase/remote-config-compat",F="@firebase/storage",N="@firebase/storage-compat",j="@firebase/firestore",H="@firebase/ai",O="@firebase/firestore-compat",B="firebase",M="12.1.0",U="[DEFAULT]",T={[h]:"fire-core",[u]:"fire-core-compat",[l]:"fire-analytics",[b]:"fire-analytics-compat",[g]:"fire-app-check",[d]:"fire-app-check-compat",[m]:"fire-auth",[w]:"fire-auth-compat",[_]:"fire-rtdb",[D]:"fire-data-connect",[C]:"fire-rtdb-compat",[v]:"fire-fn",[y]:"fire-fn-compat",[E]:"fire-iid",[S]:"fire-iid-compat",[I]:"fire-fcm",[$]:"fire-fcm-compat",[k]:"fire-perf",[A]:"fire-perf-compat",[P]:"fire-rc",[x]:"fire-rc-compat",[F]:"fire-gcs",[N]:"fire-gcs-compat",[j]:"fire-fst",[O]:"fire-fst-compat",[H]:"fire-vertex","fire-js":"fire-js",[B]:"fire-js-all"},z=new Map,R=new Map,V=new Map;function J(e,t){try{e.container.addComponent(t)}catch(a){p.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,a)}}function W(e){const t=e.name;if(V.has(t))return p.debug(`There were multiple attempts to register component ${t}.`),!1;V.set(t,e);for(const a of z.values())J(a,e);for(const a of R.values())J(a,e);return!0}function K(e,t){const a=e.container.getProvider("heartbeat").getImmediate({optional:!0});return a&&a.triggerHeartbeat(),e.container.getProvider(t)}function L(e){return null!==e&&void 0!==e&&void 0!==e.settings}
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
const q={["no-app"]:"No Firebase App '{$appName}' has been created - call initializeApp() first",["bad-app-name"]:"Illegal App name: '{$appName}'",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["server-app-deleted"]:"Firebase Server App has been deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",["finalization-registry-not-supported"]:"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",["invalid-server-app-environment"]:"FirebaseServerApp is not for use in browser environments."},X=new i.FA("app","Firebase",q);
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
class Y{constructor(e,t,a){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=a,this.container.addComponent(new r.uA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw X.create("app-deleted",{appName:this._name})}}
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
const Z=M;function G(e,t={}){let a=e;if("object"!==typeof t){const e=t;t={name:e}}const n={name:U,automaticDataCollectionEnabled:!0,...t},s=n.name;if("string"!==typeof s||!s)throw X.create("bad-app-name",{appName:String(s)});if(a||(a=(0,i.T9)()),!a)throw X.create("no-options");const o=z.get(s);if(o){if((0,i.bD)(a,o.options)&&(0,i.bD)(n,o.config))return o;throw X.create("duplicate-app",{appName:s})}const c=new r.h1(s);for(const r of V.values())c.addComponent(r);const h=new Y(a,n,c);return z.set(s,h),h}function Q(e=U){const t=z.get(e);if(!t&&e===U&&(0,i.T9)())return G();if(!t)throw X.create("no-app",{appName:e});return t}function ee(e,t,a){let n=T[e]??e;a&&(n+=`-${a}`);const i=n.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const e=[`Unable to register library "${n}" with version "${t}":`];return i&&e.push(`library name "${n}" contains illegal characters (whitespace or "/")`),i&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void p.warn(e.join(" "))}W(new r.uA(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}
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
const te="firebase-heartbeat-database",ae=1,re="firebase-heartbeat-store";let ne=null;function ie(){return ne||(ne=(0,s.P2)(te,ae,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(re)}catch(a){}}}}).catch(e=>{throw X.create("idb-open",{originalErrorMessage:e.message})})),ne}async function se(e){try{const t=await ie(),a=t.transaction(re),r=await a.objectStore(re).get(ce(e));return await a.done,r}catch(t){if(t instanceof i.g)p.warn(t.message);else{const e=X.create("idb-get",{originalErrorMessage:t?.message});p.warn(e.message)}}}async function oe(e,t){try{const a=await ie(),r=a.transaction(re,"readwrite"),n=r.objectStore(re);await n.put(t,ce(e)),await r.done}catch(a){if(a instanceof i.g)p.warn(a.message);else{const e=X.create("idb-set",{originalErrorMessage:a?.message});p.warn(e.message)}}}function ce(e){return`${e.name}!${e.options.appId}`}
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
 */const he=1024,fe=30;class pe{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new le(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),a=ue();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(e=>e.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:t}),this._heartbeatsCache.heartbeats.length>fe){const e=ge(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){p.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=ue(),{heartbeatsToSend:t,unsentEntries:a}=be(this._heartbeatsCache.heartbeats),r=(0,i.Uj)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return p.warn(e),""}}}function ue(){const e=new Date;return e.toISOString().substring(0,10)}function be(e,t=he){const a=[];let r=e.slice();for(const n of e){const e=a.find(e=>e.agent===n.agent);if(e){if(e.dates.push(n.date),de(a)>t){e.dates.pop();break}}else if(a.push({agent:n.agent,dates:[n.date]}),de(a)>t){a.pop();break}r=r.slice(1)}return{heartbeatsToSend:a,unsentEntries:r}}class le{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,i.zW)()&&(0,i.eX)().then(()=>!0).catch(()=>!1)}async read(){const e=await this._canUseIndexedDBPromise;if(e){const e=await se(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return oe(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return oe(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function de(e){return(0,i.Uj)(JSON.stringify({version:2,heartbeats:e})).length}function ge(e){if(0===e.length)return-1;let t=0,a=e[0].date;for(let r=1;r<e.length;r++)e[r].date<a&&(a=e[r].date,t=r);return t}
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
 */function me(e){W(new r.uA("platform-logger",e=>new o(e),"PRIVATE")),W(new r.uA("heartbeat",e=>new pe(e),"PRIVATE")),ee(h,f,e),ee(h,f,"esm2020"),ee("fire-js","")}me("")},6400:function(e,t,a){a.d(t,{Wp:function(){return r.Wp}});var r=a(6086),n="firebase",i="12.1.0";
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
(0,r.KO)(n,i,"app")}}]);