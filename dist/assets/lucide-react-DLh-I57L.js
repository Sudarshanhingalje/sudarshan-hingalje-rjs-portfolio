import{r as s}from"./react-CFCE4xZu.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),f=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,r)=>r?r.toUpperCase():o.toLowerCase()),l=t=>{const e=f(t);return e.charAt(0).toUpperCase()+e.slice(1)},i=(...t)=>t.filter((e,o,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===o).join(" ").trim(),w=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=s.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:n="",children:a,iconNode:u,...c},p)=>s.createElement("svg",{ref:p,...k,width:e,height:e,stroke:t,strokeWidth:r?Number(o)*24/Number(e):o,className:i("lucide",n),...!a&&!w(c)&&{"aria-hidden":"true"},...c},[...u.map(([h,m])=>s.createElement(h,m)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(t,e)=>{const o=s.forwardRef(({className:r,...n},a)=>s.createElement(g,{ref:a,iconNode:e,className:i(`lucide-${C(l(t))}`,`lucide-${t}`,r),...n}));return o.displayName=l(t),o};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],v=d("check",y);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M12 13v8l-4-4",key:"1f5nwf"}],["path",{d:"m12 21 4-4",key:"1lfcce"}],["path",{d:"M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284",key:"ui1hmy"}]],x=d("cloud-download",A);export{x as C,v as a};
