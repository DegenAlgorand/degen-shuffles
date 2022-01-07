import{$ as e,a0 as s,a1 as t,Q as n,a2 as r,a3 as a,T as i,a4 as o,S as c,i as l,s as u,t as d,m as f,a as h,Z as p,d as m,g as $,k as g,l as v,n as b,p as w,f as x,j as y,w as E,e as I,a5 as A,v as C,X as k,c as N,h as T,o as U,q as W,r as L,u as O,a6 as V,a7 as R,E as D,Y as S,U as F,z as P,A as _,a8 as q,F as z,G as j,H as M,C as B,y as G,D as H,a9 as Y,aa as X,ab as Z,I as Q,P as J,ac as K,O as ee,ad as se,K as te,J as ne,L as re,ae,M as ie}from"./client.9b2dd98d.js";class oe extends e{constructor(e){super(),this.data=e}require(e){const s=this.data[e];return!("boolean"!=typeof s&&!Boolean(s))||(this.addError({key:e,code:"REQUIRED",message:"This field is required"}),!1)}checkType(e,s="string"){const t=this.data[e];return!t||(typeof t===s||(this.addError({key:e,code:"WRONG_TYPE",message:`This field should be a ${s}`}),!1))}maxLength(e,s=144){const t=this.data[e];if(!t)return!0;return!!this.checkType(e,"string")&&(!(t.length>s)||(this.addError({key:e,code:"TOO_LONG",message:`The maximum length is ${s} characters`}),!1))}}const ce={assetId:void 0,assetName:"",creatorAddress:void 0,url:void 0,twitter:void 0,description:void 0,requireOptin:!0,decreasePrevWinners:!0,useLogScale:!1,creatorCanWin:!1};class le{constructor(){this.configs=ce}resetConfigs(){this.clearErrors(),this.configs=ce}setConfigs(e){return this.clearErrors(),this.validateConfigs(e)}getConfigsObj(){return s.omit(this.configs,["assetId","assetName","creatorAddress"])}validateConfigs(e){const t=Object.keys(ce);this.clearErrors();let n={...this.configs,...e};n=s.pickBy(n,((e,s)=>t.includes(s)));const r=new oe(n);return r.require("assetName"),r.maxLength("assetName",32),r.maxLength("url",96),r.maxLength("twitter",16),r.maxLength("description",300),this.errors=r.errors,this.hasErrors||(this.configs=n,this.dispatchUpdate()),!this.hasErrors}}class ue{async create(){if(this.hasErrors)return;const e=t(n);if(!e.currentAddress)return;const s=this.getConfigsObj();return await r.txn({fee:1e3,flatFee:!0,type:"acfg",from:e.currentAddress,assetName:this.configs.assetName,assetUnitName:a.SHUFFLE_UNIT,assetDecimals:0,assetTotal:1,assetURL:"degenshuffles.xyz",assetManager:e.currentAddress,assetReserve:e.currentAddress,assetDefaultFrozen:!1,note:r.encodeNote(s)})}}class de{async read(e){if(!e)return;this.resetConfigs();let s=!0;const t=await r.lookupAssetByID(e);if(!t||!t.asset)return!1;const n=t.asset;if(!("DGNSHUFF"===n.params["unit-name"]))return!1;if(s=this.setConfigs({assetId:n.index,assetName:n.params.name,creatorAddress:n.params.creator}),!s)return!1;const a=await r.lookupAssetTransactions(this.configs.assetId,{address:this.configs.creatorAddress,"address-role":"sender","tx-type":"acfg",loop:!0});if(!(a&&a.transactions&&a.transactions.length))return!1;const i=a.transactions.sort(((e,s)=>s["round-time"]-e["round-time"]))[0],o=r.decodeNote(i.note);if(s=this.setConfigs(o),!s)return!1;const c=await r.lookupAssetBalances(this.configs.assetId);this.optIns=c.balances.map((e=>e.address));return await this.getWinnersHistory()||console.log("Could not retreive winners history"),!0}}class fe{async update(){if(this.hasErrors)return;const e=t(n);if(!e.currentAddress)return;const s=this.getConfigsObj(),a=await r.txn({assetIndex:this.configs.assetId,fee:1e3,flatFee:!0,type:"acfg",from:e.currentAddress,assetReserve:e.currentAddress,assetManager:e.currentAddress,note:r.encodeNote(s)});return this.setConfigs(s),a}}class he{constructor(){this.optIns=[]}get optedIn(){const e=t(n);return!(!e.currentAddress||!this.optIns.length)&&this.optIns.includes(e.currentAddress)}async optIn(){if(this.hasErrors)return;const e=t(n);if(!e.currentAddress)return;const s=await r.txn({type:"axfer",from:e.currentAddress,to:e.currentAddress,assetIndex:this.configs.assetId,amount:0});return s?(this.optIns.push(e.currentAddress),this.dispatchUpdate(),s):void 0}async optOut(){if(this.hasErrors)return;const e=t(n);if(!e.currentAddress)return;const s=await r.txn({type:"axfer",from:e.currentAddress,to:e.currentAddress,closeRemainderTo:this.configs.creatorAddress,assetIndex:this.configs.assetId,amount:0});return s?(this.optIns=this.optIns.filter((s=>s!==e.currentAddress)),this.dispatchUpdate(),s):void 0}}class pe{async pick(e){if(!e)return!1;let s=[],t=[...i.all];this.configs.requireOptin&&(t=t.filter((e=>this.optIns.includes(e.address)))),this.configs.creatorCanWin||(t=t.filter((e=>e.address!==this.configs.creatorAddress))),t.forEach((e=>{e.weight=e.amount,this.configs.useLogScale&&(e.weight=Math.log(e.weight)),this.configs.decreasePrevWinners&&(e.previousWins=this.getWinnerCount(e.address),e.weight=e.weight/(e.previousWins+1))}));for(let n=0;n<e;n++){let e=0;t.forEach((s=>{e+=s.weight}));const n=Math.random()*e;let r,a=0;for(let e=0;e<t.length;e++){if(a+=t[e].weight,n<=a){r=t[e];break}r=t[e]}if(s.push(r),t=t.filter((e=>e.address!==r.address)),!t.length)break}if(!s.length)return this.popError("No winner picked... Please try again. If the problem persists, contact the Degen team"),!1;const n=await this.saveWinners(s);if(n)return this.dispatchUpdate(),n;this.popError("Oops... Could not save winners to blockchain")}async saveWinners(e=[]){const s={_type:"winners",round:this.currentWinnersRound+1,winners:e.map((e=>({address:e.address})))},t=await r.txn({assetIndex:this.configs.assetId,amount:0,type:"axfer",from:this.configs.creatorAddress,to:this.configs.creatorAddress,note:r.encodeNote(s)});return t&&this.addWinnersRound(s),t}}class me{constructor(){this.rounds=[],this.winners=[]}async getWinnersHistory(){const e=await r.lookupAssetTransactions(this.configs.assetId,{address:this.configs.creatorAddress,"address-role":"sender","tx-type":"axfer","note-prefix":a.WINNERS_NOTE_PREFIX});if(!(e&&e.transactions&&e.transactions.length))return!1;return e.transactions.map((e=>r.decodeNote(e.note))).forEach((e=>{this.addWinnersRound(e)})),this.dispatchUpdate(),this.winners}addWinnersRound(e){if(e&&e.round&&e.winners){this.rounds.push(e),this.rounds.sort(((e,s)=>s.round-e.round));for(let s=0;s<e.winners.length;s++){const t=e.winners[s],n=this.winners.findIndex((e=>e.address===t.address));-1===n?this.winners.push({address:t.address,count:1}):this.winners[n].count+=1}}}getWinnerCount(e){if(!this.winners.length)return 0;const s=this.winners.find((s=>s.address===e));return s?s.count:0}get currentWinnersRound(){if(!this.rounds.length)return 0;return this.rounds.reduce(((e,s)=>s.round>e?s.round:e),0)}}class $e{subscribe(e){return this.subscribers||(this.subscribers=[]),this.subscribers.push(e),()=>{const s=this.subscribers.indexOf(e);-1!==s&&this.subscribers.splice(s,1)}}dispatchUpdate(){this.subscribers&&this.subscribers.length&&this.subscribers.forEach((e=>e(this)))}}class ge extends(o(e,le,ue,de,fe,he,me,pe,$e)){}function ve(e){let s;return{c(){s=d(e[1])},l(t){s=f(t,e[1])},m(e,t){h(e,s,t)},p(e,t){2&t&&p(s,e[1])},d(e){e&&m(s)}}}function be(e){let s,t;return{c(){s=$("span"),t=d(e[2]),this.h()},l(n){s=g(n,"SPAN",{class:!0});var r=v(s);t=f(r,e[2]),r.forEach(m),this.h()},h(){b(s,"class","info svelte-181ixxb")},m(e,n){h(e,s,n),w(s,t)},p(e,s){4&s&&p(t,e[2])},d(e){e&&m(s)}}}function we(e){let s,t,n=e[1]&&ve(e),r=e[2]&&be(e);return{c(){s=$("label"),n&&n.c(),t=x(),r&&r.c(),this.h()},l(e){s=g(e,"LABEL",{for:!0,class:!0});var a=v(s);n&&n.l(a),t=y(a),r&&r.l(a),a.forEach(m),this.h()},h(){b(s,"for",e[0]),b(s,"class","label svelte-181ixxb")},m(e,a){h(e,s,a),n&&n.m(s,null),w(s,t),r&&r.m(s,null)},p(e,[a]){e[1]?n?n.p(e,a):(n=ve(e),n.c(),n.m(s,t)):n&&(n.d(1),n=null),e[2]?r?r.p(e,a):(r=be(e),r.c(),r.m(s,null)):r&&(r.d(1),r=null),1&a&&b(s,"for",e[0])},i:E,o:E,d(e){e&&m(s),n&&n.d(),r&&r.d()}}}function xe(e,s,t){let{name:n}=s,{label:r}=s,{info:a}=s;return e.$$set=e=>{"name"in e&&t(0,n=e.name),"label"in e&&t(1,r=e.label),"info"in e&&t(2,a=e.info)},[n,r,a]}class ye extends c{constructor(e){super(),l(this,e,xe,we,u,{name:0,label:1,info:2})}}const Ee={DEFAULT:"An error occured"};function Ie(e){return Ee[e.toUpperCase()]||Ee.DEFAULT}function Ae(e,s){const n=t(s);if(!n.errors)return;const r=n.errors.find((s=>s.key===e));return r?r.message||Ie(r.code):void 0}function Ce(e,s){const n=t(s);if(!n.errors)return;const r=n.errors.findIndex((s=>s.key===e));r>-1&&s.update((e=>(e.errors.splice(r,1),e)))}function ke(e){let s,t;return{c(){s=$("div"),t=d(e[1]),this.h()},l(n){s=g(n,"DIV",{class:!0});var r=v(s);t=f(r,e[1]),r.forEach(m),this.h()},h(){b(s,"class","message error-message svelte-1155zcs")},m(e,n){h(e,s,n),w(s,t)},p(e,s){2&s&&p(t,e[1])},d(e){e&&m(s)}}}function Ne(e){let s,t=e[0]&&ke(e);return{c(){t&&t.c(),s=I()},l(e){t&&t.l(e),s=I()},m(e,n){t&&t.m(e,n),h(e,s,n)},p(e,[n]){e[0]?t?t.p(e,n):(t=ke(e),t.c(),t.m(s.parentNode,s)):t&&(t.d(1),t=null)},i:E,o:E,d(e){t&&t.d(e),e&&m(s)}}}function Te(e,s,t){let n,r,{name:a}=s,{code:i}=s,o=!1;const c=A("form");function l(){t(1,r=a?Ae(a,c):Ie(i)),t(0,o=!!r)}return C(e,c,(e=>t(5,n=e))),k(l),e.$$set=e=>{"name"in e&&t(3,a=e.name),"code"in e&&t(4,i=e.code)},e.$$.update=()=>{32&e.$$.dirty&&l()},[o,r,c,a,i,n]}class Ue extends c{constructor(e){super(),l(this,e,Te,Ne,u,{name:3,code:4})}}function We(e){let s,t;return s=new ye({props:{label:e[3],info:e[4],name:e[2]}}),{c(){N(s.$$.fragment)},l(e){T(s.$$.fragment,e)},m(e,n){U(s,e,n),t=!0},p(e,t){const n={};8&t&&(n.label=e[3]),16&t&&(n.info=e[4]),4&t&&(n.name=e[2]),s.$set(n)},i(e){t||(W(s.$$.fragment,e),t=!0)},o(e){L(s.$$.fragment,e),t=!1},d(e){O(s,e)}}}function Le(e){let s,t,n,r,a,i,o,c,l,u=(e[3]||e[4])&&We(e);const d=[{name:e[2]},e[6]];function f(s){e[9](s)}var p=e[1];function E(e){let s={};for(let e=0;e<d.length;e+=1)s=G(s,d[e]);return void 0!==e[0]&&(s.value=e[0]),{props:s}}p&&(n=new p(E(e)),V.push((()=>R(n,"value",f)))),i=new Ue({props:{name:e[2]}});const I=e[8].default,A=D(I,e,e[7],null);return{c(){s=$("div"),u&&u.c(),t=x(),n&&N(n.$$.fragment),a=x(),N(i.$$.fragment),o=x(),A&&A.c(),this.h()},l(e){s=g(e,"DIV",{class:!0});var r=v(s);u&&u.l(r),t=y(r),n&&T(n.$$.fragment,r),a=y(r),T(i.$$.fragment,r),o=y(r),A&&A.l(r),r.forEach(m),this.h()},h(){b(s,"class",c="field "+e[5])},m(e,r){h(e,s,r),u&&u.m(s,null),w(s,t),n&&U(n,s,null),w(s,a),U(i,s,null),w(s,o),A&&A.m(s,null),l=!0},p(e,[o]){e[3]||e[4]?u?(u.p(e,o),24&o&&W(u,1)):(u=We(e),u.c(),W(u,1),u.m(s,t)):u&&(S(),L(u,1,1,(()=>{u=null})),F());const h=68&o?P(d,[4&o&&{name:e[2]},64&o&&_(e[6])]):{};if(!r&&1&o&&(r=!0,h.value=e[0],q((()=>r=!1))),p!==(p=e[1])){if(n){S();const e=n;L(e.$$.fragment,1,0,(()=>{O(e,1)})),F()}p?(n=new p(E(e)),V.push((()=>R(n,"value",f))),N(n.$$.fragment),W(n.$$.fragment,1),U(n,s,a)):n=null}else p&&n.$set(h);const m={};4&o&&(m.name=e[2]),i.$set(m),A&&A.p&&(!l||128&o)&&z(A,I,e,e[7],l?M(I,e[7],o,null):j(e[7]),null),(!l||32&o&&c!==(c="field "+e[5]))&&b(s,"class",c)},i(e){l||(W(u),n&&W(n.$$.fragment,e),W(i.$$.fragment,e),W(A,e),l=!0)},o(e){L(u),n&&L(n.$$.fragment,e),L(i.$$.fragment,e),L(A,e),l=!1},d(e){e&&m(s),u&&u.d(),n&&O(n),O(i),A&&A.d(e)}}}function Oe(e,s,t){const n=["component","name","label","info","value","fieldClass"];let r=B(s,n),{$$slots:a={},$$scope:i}=s,{component:o}=s,{name:c}=s,{label:l}=s,{info:u}=s,{value:d}=s,{fieldClass:f}=s;return e.$$set=e=>{s=G(G({},s),H(e)),t(6,r=B(s,n)),"component"in e&&t(1,o=e.component),"name"in e&&t(2,c=e.name),"label"in e&&t(3,l=e.label),"info"in e&&t(4,u=e.info),"value"in e&&t(0,d=e.value),"fieldClass"in e&&t(5,f=e.fieldClass),"$$scope"in e&&t(7,i=e.$$scope)},[d,o,c,l,u,f,r,i,a,function(e){d=e,t(0,d)}]}class Ve extends c{constructor(e){super(),l(this,e,Oe,Le,u,{component:1,name:2,label:3,info:4,value:0,fieldClass:5})}}function Re(e){return"string"!=typeof e?e:e.replace(/<\/?[^>]+(>|$)/g,"")}function De(e){return e.startsWith("http://")||e.startsWith("https://")?e:`https://${e}`}function Se(e){return`https://twitter.com/${e.replace("@","")}`}function Fe(e){let s,t,n,r=[{id:e[1]},{name:e[1]},{type:"text"},{class:"input text-input"},e[4]],a={};for(let e=0;e<r.length;e+=1)a=G(a,r[e]);return{c(){s=$("input"),this.h()},l(e){s=g(e,"INPUT",{id:!0,name:!0,type:!0,class:!0}),this.h()},h(){X(s,a)},m(r,a){h(r,s,a),s.autofocus&&s.focus(),Z(s,e[0]),t||(n=[Q(s,"input",e[6]),Q(s,"blur",e[3])],t=!0)},p(e,[t]){X(s,a=P(r,[2&t&&{id:e[1]},2&t&&{name:e[1]},{type:"text"},{class:"input text-input"},16&t&&e[4]])),1&t&&s.value!==e[0]&&Z(s,e[0])},i:E,o:E,d(e){e&&m(s),t=!1,J(n)}}}function Pe(e,t,n){const r=["name","value","defaultValue"];let a,i=B(t,r),{name:o}=t,{value:c}=t,{defaultValue:l}=t,u=!1;const d=A("form");function f(){u&&(d.update((e=>s.set(e,o,c))),Ae(o,d)&&Ce(o,d))}return C(e,d,(e=>n(8,a=e))),k((()=>{void 0===c&&n(0,c=s.get(a,o)),void 0===c&&n(0,c=l),u=!0})),e.$$set=e=>{t=G(G({},t),H(e)),n(4,i=B(t,r)),"name"in e&&n(1,o=e.name),"value"in e&&n(0,c=e.value),"defaultValue"in e&&n(5,l=e.defaultValue)},e.$$.update=()=>{1&e.$$.dirty&&f()},[c,o,d,function(){n(0,c=Re(c)),f()},i,l,function(){c=this.value,n(0,c)}]}Y((function(e){var s=e.exports={array:{del:function(e,s){var t=e.indexOf(s);return-1!=t?0==t?e.slice(1):e.slice(0,t).concat(e.slice(t+1)):e},first:function(e){return e[0]},last:function(e){return e[e.length-1]}},string:{gsub:function(e,t,n){var r,a,i,o,c,l,u;if(null==t||null==n)return s.string.value(e);for(l="",u=e;u.length>0;)if(a=u.match(t)){if(l+=u.slice(0,a.index),"function"==typeof n)a[1]=a[1]||a[0],l+=n(a);else if(n.match(/\$[1-9]/)){for(o=a,i=s.array.del(a,void 0);i!==o;)o=i,i=s.array.del(i,void 0);for(a[1]=a[1]||a[0],c=n,r=1;r<=9;r++)i[r]&&(c=s.string.gsub(c,new RegExp("\\$"+r),i[r]));l+=c}else l+=n;u=u.slice(a.index+a[0].length)}else l+=u,u="";return l},upcase:function(e){var t=s.string.gsub(e,/_([a-z])/,(function(e){return"_"+e[1].toUpperCase()}));return(t=s.string.gsub(t,/\/([a-z])/,(function(e){return"/"+e[1].toUpperCase()})))[0].toUpperCase()+t.substr(1)},capitalize:function(e,t){if(!e.length)return e;var n=e.toLowerCase();return t||(n=s.string.gsub(n,/\s([a-z])/,(function(e){return" "+e[1].toUpperCase()}))),n[0].toUpperCase()+n.substr(1)},downcase:function(e){var t=s.string.gsub(e,/_([A-Z])/,(function(e){return"_"+e[1].toLowerCase()}));return(t=s.string.gsub(t,/\/([A-Z])/,(function(e){return"/"+e[1].toLowerCase()})))[0].toLowerCase()+t.substr(1)},value:function(e){return e.substr(0)}}}}));class _e extends c{constructor(e){super(),l(this,e,Pe,Fe,u,{name:1,value:0,defaultValue:5})}}function qe(e){let s;const t=e[1].default,n=D(t,e,e[2],null);return{c(){n&&n.c()},l(e){n&&n.l(e)},m(e,t){n&&n.m(e,t),s=!0},p(e,r){n&&n.p&&(!s||4&r)&&z(n,t,e,e[2],s?M(t,e[2],r,null):j(e[2]),null)},i(e){s||(W(n,e),s=!0)},o(e){L(n,e),s=!1},d(e){n&&n.d(e)}}}function ze(e){let s,t;const n=[{component:_e},e[0]];let r={$$slots:{default:[qe]},$$scope:{ctx:e}};for(let e=0;e<n.length;e+=1)r=G(r,n[e]);return s=new Ve({props:r}),{c(){N(s.$$.fragment)},l(e){T(s.$$.fragment,e)},m(e,n){U(s,e,n),t=!0},p(e,[t]){const r=1&t?P(n,[0&t&&{component:_e},1&t&&_(e[0])]):{};4&t&&(r.$$scope={dirty:t,ctx:e}),s.$set(r)},i(e){t||(W(s.$$.fragment,e),t=!0)},o(e){L(s.$$.fragment,e),t=!1},d(e){O(s,e)}}}function je(e,s,t){const n=[];let r=B(s,n),{$$slots:a={},$$scope:i}=s;return e.$$set=e=>{s=G(G({},s),H(e)),t(0,r=B(s,n)),"$$scope"in e&&t(2,i=e.$$scope)},[r,a,i]}class Me extends c{constructor(e){super(),l(this,e,je,ze,u,{})}}function Be(e){let s,t,n,r=[{id:e[1]},{name:e[1]},{type:"text"},{class:"input textarea-input"},e[4]],a={};for(let e=0;e<r.length;e+=1)a=G(a,r[e]);return{c(){s=$("textarea"),this.h()},l(e){s=g(e,"TEXTAREA",{id:!0,name:!0,type:!0,class:!0}),v(s).forEach(m),this.h()},h(){X(s,a)},m(r,a){h(r,s,a),s.autofocus&&s.focus(),Z(s,e[0]),t||(n=[Q(s,"input",e[6]),Q(s,"blur",e[3])],t=!0)},p(e,[t]){X(s,a=P(r,[2&t&&{id:e[1]},2&t&&{name:e[1]},{type:"text"},{class:"input textarea-input"},16&t&&e[4]])),1&t&&Z(s,e[0])},i:E,o:E,d(e){e&&m(s),t=!1,J(n)}}}function Ge(e,t,n){const r=["name","value","defaultValue"];let a,i=B(t,r),{name:o}=t,{value:c}=t,{defaultValue:l}=t,u=!1;const d=A("form");function f(){u&&(d.update((e=>s.set(e,o,c))),Ae(o,d)&&Ce(o,d))}return C(e,d,(e=>n(8,a=e))),k((()=>{void 0===c&&n(0,c=s.get(a,o)),void 0===c&&n(0,c=l),u=!0})),e.$$set=e=>{t=G(G({},t),H(e)),n(4,i=B(t,r)),"name"in e&&n(1,o=e.name),"value"in e&&n(0,c=e.value),"defaultValue"in e&&n(5,l=e.defaultValue)},e.$$.update=()=>{1&e.$$.dirty&&f()},[c,o,d,function(){n(0,c=Re(c)),f()},i,l,function(){c=this.value,n(0,c)}]}class He extends c{constructor(e){super(),l(this,e,Ge,Be,u,{name:1,value:0,defaultValue:5})}}function Ye(e){let s;const t=e[1].default,n=D(t,e,e[2],null);return{c(){n&&n.c()},l(e){n&&n.l(e)},m(e,t){n&&n.m(e,t),s=!0},p(e,r){n&&n.p&&(!s||4&r)&&z(n,t,e,e[2],s?M(t,e[2],r,null):j(e[2]),null)},i(e){s||(W(n,e),s=!0)},o(e){L(n,e),s=!1},d(e){n&&n.d(e)}}}function Xe(e){let s,t;const n=[{component:He},e[0]];let r={$$slots:{default:[Ye]},$$scope:{ctx:e}};for(let e=0;e<n.length;e+=1)r=G(r,n[e]);return s=new Ve({props:r}),{c(){N(s.$$.fragment)},l(e){T(s.$$.fragment,e)},m(e,n){U(s,e,n),t=!0},p(e,[t]){const r=1&t?P(n,[0&t&&{component:He},1&t&&_(e[0])]):{};4&t&&(r.$$scope={dirty:t,ctx:e}),s.$set(r)},i(e){t||(W(s.$$.fragment,e),t=!0)},o(e){L(s.$$.fragment,e),t=!1},d(e){O(s,e)}}}function Ze(e,s,t){const n=[];let r=B(s,n),{$$slots:a={},$$scope:i}=s;return e.$$set=e=>{s=G(G({},s),H(e)),t(0,r=B(s,n)),"$$scope"in e&&t(2,i=e.$$scope)},[r,a,i]}class Qe extends c{constructor(e){super(),l(this,e,Ze,Xe,u,{})}}function Je(e){let s,t,n,r,a,i=[{id:e[1]},{name:e[1]},{type:"checkbox"},{class:"hidden-input"},e[4]],o={};for(let e=0;e<i.length;e+=1)o=G(o,i[e]);return{c(){s=$("input"),t=x(),n=$("span"),this.h()},l(e){s=g(e,"INPUT",{id:!0,name:!0,type:!0,class:!0}),t=y(e),n=g(e,"SPAN",{class:!0}),v(n).forEach(m),this.h()},h(){X(s,o),b(n,"class","toggle-input"),K(n,"checked",e[0])},m(i,o){h(i,s,o),s.autofocus&&s.focus(),s.checked=e[0],h(i,t,o),h(i,n,o),r||(a=[Q(s,"change",e[6]),Q(n,"click",ee(e[3]))],r=!0)},p(e,[t]){X(s,o=P(i,[2&t&&{id:e[1]},2&t&&{name:e[1]},{type:"checkbox"},{class:"hidden-input"},16&t&&e[4]])),1&t&&(s.checked=e[0]),1&t&&K(n,"checked",e[0])},i:E,o:E,d(e){e&&m(s),e&&m(t),e&&m(n),r=!1,J(a)}}}function Ke(e,t,n){const r=["name","value","defaultValue"];let a,i=B(t,r),{name:o}=t,{value:c}=t,{defaultValue:l}=t,u=!1;const d=A("form");return C(e,d,(e=>n(8,a=e))),k((()=>{void 0===c&&n(0,c=s.get(a,o)),void 0===c&&n(0,c=l),u=!0})),e.$$set=e=>{t=G(G({},t),H(e)),n(4,i=B(t,r)),"name"in e&&n(1,o=e.name),"value"in e&&n(0,c=e.value),"defaultValue"in e&&n(5,l=e.defaultValue)},e.$$.update=()=>{1&e.$$.dirty&&u&&(d.update((e=>s.set(e,o,c))),Ae(o,d)&&Ce(o,d))},[c,o,d,function(){n(0,c=!c)},i,l,function(){c=this.checked,n(0,c)}]}class es extends c{constructor(e){super(),l(this,e,Ke,Je,u,{name:1,value:0,defaultValue:5})}}function ss(e){let s;const t=e[1].default,n=D(t,e,e[2],null);return{c(){n&&n.c()},l(e){n&&n.l(e)},m(e,t){n&&n.m(e,t),s=!0},p(e,r){n&&n.p&&(!s||4&r)&&z(n,t,e,e[2],s?M(t,e[2],r,null):j(e[2]),null)},i(e){s||(W(n,e),s=!0)},o(e){L(n,e),s=!1},d(e){n&&n.d(e)}}}function ts(e){let s,t;const n=[{component:es},{fieldClass:"toggle"},e[0]];let r={$$slots:{default:[ss]},$$scope:{ctx:e}};for(let e=0;e<n.length;e+=1)r=G(r,n[e]);return s=new Ve({props:r}),{c(){N(s.$$.fragment)},l(e){T(s.$$.fragment,e)},m(e,n){U(s,e,n),t=!0},p(e,[t]){const r=1&t?P(n,[0&t&&{component:es},n[1],1&t&&_(e[0])]):{};4&t&&(r.$$scope={dirty:t,ctx:e}),s.$set(r)},i(e){t||(W(s.$$.fragment,e),t=!0)},o(e){L(s.$$.fragment,e),t=!1},d(e){O(s,e)}}}function ns(e,s,t){const n=[];let r=B(s,n),{$$slots:a={},$$scope:i}=s;return e.$$set=e=>{s=G(G({},s),H(e)),t(0,r=B(s,n)),"$$scope"in e&&t(2,i=e.$$scope)},[r,a,i]}class rs extends c{constructor(e){super(),l(this,e,ns,ts,u,{})}}function as(e){let s,t,n,r,a,i,o,c,l,u,I,A,C,k;return{c(){s=$("div"),t=$("h2"),n=$("i"),r=d("\n    Your shuffle was minted!"),a=x(),i=$("p"),o=d("Asset id : "),c=d(e[0]),l=x(),u=$("a"),I=d("Go check it out"),this.h()},l(d){s=g(d,"DIV",{class:!0});var h=v(s);t=g(h,"H2",{class:!0});var p=v(t);n=g(p,"I",{class:!0}),v(n).forEach(m),r=f(p,"\n    Your shuffle was minted!"),p.forEach(m),a=y(h),i=g(h,"P",{class:!0});var $=v(i);o=f($,"Asset id : "),c=f($,e[0]),$.forEach(m),l=y(h),u=g(h,"A",{class:!0,href:!0});var b=v(u);I=f(b,"Go check it out"),b.forEach(m),h.forEach(m),this.h()},h(){b(n,"class","fas fa-check-circle svelte-1sx3nc0"),b(t,"class","title svelte-1sx3nc0"),b(i,"class","svelte-1sx3nc0"),b(u,"class","dark-btn"),b(u,"href",A="/shuffle?id="+e[0]),b(s,"class","wrapper svelte-1sx3nc0")},m(d,f){h(d,s,f),w(s,t),w(t,n),w(t,r),w(s,a),w(s,i),w(i,o),w(i,c),w(s,l),w(s,u),w(u,I),C||(k=Q(u,"click",e[1]),C=!0)},p(e,[s]){1&s&&p(c,e[0]),1&s&&A!==(A="/shuffle?id="+e[0])&&b(u,"href",A)},i:E,o:E,d(e){e&&m(s),C=!1,k()}}}function is(e,s,t){let{asaId:n="..."}=s;const r=se();return e.$$set=e=>{"asaId"in e&&t(0,n=e.asaId)},[n,function(){r("close")}]}class os extends c{constructor(e){super(),l(this,e,is,as,u,{asaId:0})}}function cs(e){let s,t;return s=new Me({props:{label:"Shuffle Name",info:"This is the ASA name. It cannot be modified later. 32 characters max.",name:"assetName"}}),{c(){N(s.$$.fragment)},l(e){T(s.$$.fragment,e)},m(e,n){U(s,e,n),t=!0},i(e){t||(W(s.$$.fragment,e),t=!0)},o(e){L(s.$$.fragment,e),t=!1},d(e){O(s,e)}}}function ls(e){let s,t,n,r,a,i,o,c,l,u,p,E,I,A,C,k,V,R,D,P,_,q,z,j="create"===e[0]&&cs();return r=new Me({props:{label:"Project URL",name:"url"}}),i=new Me({props:{label:"Twitter handle",name:"twitter"}}),c=new Qe({props:{label:"Description",info:"Tell us about the shuffle. 300 characters max.",name:"description",rows:"4"}}),u=new rs({props:{label:"Require Opt-In",info:"Users must opt-in to participate.",name:"requireOptin"}}),E=new rs({props:{label:"Decrease previous winners odds",info:"The odds of a wallet to be picked decrease after each win.",name:"decreasePrevWinners"}}),A=new rs({props:{label:"Use logarithmic scale",info:"Use a logarithmic scale to calculate each account weight. This helps reduce the odds of whales to win, but can lead people to split their bags into multiple accounts to increase their chances.",name:"useLogScale"}}),k=new rs({props:{label:"Shuffle creator can win",info:"Can the creator be a winner? Might be useful if you're running the shuffles for someone else.",name:"creatorCanWin"}}),{c(){s=$("form"),j&&j.c(),t=x(),n=$("div"),N(r.$$.fragment),a=x(),N(i.$$.fragment),o=x(),N(c.$$.fragment),l=x(),N(u.$$.fragment),p=x(),N(E.$$.fragment),I=x(),N(A.$$.fragment),C=x(),N(k.$$.fragment),V=x(),R=$("div"),D=$("button"),P=d("Submit"),this.h()},l(e){s=g(e,"FORM",{class:!0});var d=v(s);j&&j.l(d),t=y(d),n=g(d,"DIV",{class:!0});var h=v(n);T(r.$$.fragment,h),a=y(h),T(i.$$.fragment,h),h.forEach(m),o=y(d),T(c.$$.fragment,d),l=y(d),T(u.$$.fragment,d),p=y(d),T(E.$$.fragment,d),I=y(d),T(A.$$.fragment,d),C=y(d),T(k.$$.fragment,d),V=y(d),R=g(d,"DIV",{class:!0});var $=v(R);D=g($,"BUTTON",{type:!0,class:!0});var b=v(D);P=f(b,"Submit"),b.forEach(m),$.forEach(m),d.forEach(m),this.h()},h(){b(n,"class","columns"),b(D,"type","submit"),b(D,"class","btn"),b(R,"class","actions"),b(s,"class","svelte-14ibn5r")},m(d,f){h(d,s,f),j&&j.m(s,null),w(s,t),w(s,n),U(r,n,null),w(n,a),U(i,n,null),w(s,o),U(c,s,null),w(s,l),U(u,s,null),w(s,p),U(E,s,null),w(s,I),U(A,s,null),w(s,C),U(k,s,null),w(s,V),w(s,R),w(R,D),w(D,P),_=!0,q||(z=Q(s,"submit",e[2]),q=!0)},p(e,[n]){"create"===e[0]?j?1&n&&W(j,1):(j=cs(),j.c(),W(j,1),j.m(s,t)):j&&(S(),L(j,1,1,(()=>{j=null})),F())},i(e){_||(W(j),W(r.$$.fragment,e),W(i.$$.fragment,e),W(c.$$.fragment,e),W(u.$$.fragment,e),W(E.$$.fragment,e),W(A.$$.fragment,e),W(k.$$.fragment,e),_=!0)},o(e){L(j),L(r.$$.fragment,e),L(i.$$.fragment,e),L(c.$$.fragment,e),L(u.$$.fragment,e),L(E.$$.fragment,e),L(A.$$.fragment,e),L(k.$$.fragment,e),_=!1},d(e){e&&m(s),j&&j.d(),O(r),O(i),O(c),O(u),O(E),O(A),O(k),q=!1,z()}}}function us(e,t,n){let r,{shuffle:a=new ge}=t,{mode:i="edit"}=t;const o=te(a.configs);return C(e,o,(e=>n(4,r=e))),ne("form",o),e.$$set=e=>{"shuffle"in e&&n(3,a=e.shuffle),"mode"in e&&n(0,i=e.mode)},[i,o,async function(e){if(e.preventDefault(),re.set(!0),a.validateConfigs(s.omit(r,["errors"])),o.set({...a.configs,errors:a.errors}),a.hasErrors)re.set(!1);else{if("create"===i){const e=await a.create();await ae(),e["asset-index"]&&ie.open(os,{asaId:e["asset-index"]})}"edit"===i&&(await a.update(),ie.close()),re.set(!1)}},a]}class ds extends c{constructor(e){super(),l(this,e,us,ls,u,{shuffle:3,mode:0})}}export{Ve as F,ge as S,_e as T,ds as a,Se as t,De as u};
