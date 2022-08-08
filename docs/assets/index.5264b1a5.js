const D=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}};D();function T(t,e,n){const r=t.length,a=t[0].length,i=new Map;for(let d=0;d<r;d++)for(let l=0;l<a;l++)i.set(`${d}:${l}`,{peso:t[d][l],actual:1/0,camino:[]});const o=[],s=new Set;s.add(e),i.get(e).actual=0;let u=e;for(;!s.has(n)&&u;){let d=i.get(u),[l,f]=u.split(":");l=parseInt(l),f=parseInt(f);let h=[i.get(`${l+1}:${f}`),i.get(`${l}:${f+1}`),i.get(`${l-1}:${f}`),i.get(`${l}:${f-1}`)];for(const c of h)!c||d.actual+c.peso<c.actual&&(c.actual=d.actual+c.peso,c.camino=[...d.camino],c.camino.push(u));s.add(u),o.push(u),u=A(s,i)}let m=i.get(n);return m.camino.length==0?(alert("es imposible llegar a destino"),null):[o,m.camino]}function A(t,e){let n=1/0,r;for(const a of t){let i=e.get(a),[o,s]=a.split(":");o=parseInt(o),s=parseInt(s);let u=[`${o+1}:${s}`,`${o}:${s+1}`,`${o-1}:${s}`,`${o}:${s-1}`];for(const m of u){let d=e.get(m);!d||t.has(m)||i.actual+d.peso<n&&(n=i.actual+d.peso,r=m)}}return r}const v=75;function g(t,e){!t||(t.classList.remove(t.classList[1]),t.classList.add(e))}function j(s,u){const n=document.getElementById("grilla");let r=window.innerWidth,a=window.innerHeight,i=r/v;i<20&&(i=20);const o=Math.floor(a*.8/i);var s=`${Math.floor(o/2)}:2`,u=`${Math.floor(o/2)}:${v-3}`;n.innerHTML="";for(let l=0;l<o;l++){const f=document.createElement("tr");for(let h=0;h<v;h++){const c=document.createElement("td"),x=document.createTextNode("");c.classList.add("celda"),c.classList.add("vacio"),c.setAttribute("id",`${l}:${h}`),c.style.width=`${i}px`,c.style.height=`${i}px`,c.appendChild(x),f.appendChild(c)}f.classList.add("fila"),n.appendChild(f)}let m=document.getElementById(s),d=document.getElementById(u);return g(m,"origen"),g(d,"destino"),m.setAttribute("draggable",!0),d.setAttribute("draggable",!0),[o,v,s,u]}function E(t){document.getElementById("grilla").childNodes.forEach(e=>{e.childNodes.forEach(n=>{(t||!n.classList.contains("wall"))&&g(n,"vacio")})}),k()}function k(){let t=document.getElementById(origen),e=document.getElementById(destino);g(t,"origen"),g(e,"destino"),t.setAttribute("draggable",!0),e.setAttribute("draggable",!0)}let y=null;class b{static get state(){return y||(y=new b)}constructor(){this._state={},window.Context=this}get state(){return this._state}set(e,n){this._state[e]=n}get(e){return this._state[e]}}let{instance:I}=b;function O(t,e){console.log("instance",I.get("origen")),I.set("origen","200");let n=5,r=0;for(let a=1;a<t.length-1;a++){r+=n;let i=document.getElementById(t[a]);setTimeout(()=>{g(i,"visitados")},r)}for(let a=1;a<e.length;a++){let i=document.getElementById(e[a]);setTimeout(()=>{g(i,"path")},r),r+=n}setTimeout(()=>{window.animating=!1,window.isClean=!1},r)}const L=1,B=new Map([["Dijkstra",T]]);window.N=0;window.M=0;window.origen=void 0;window.destino=void 0;var p=[];window.animating=!1;window.isClean=!0;window.addEventListener("load",()=>{[N,M,origen,destino]=j(origen,destino);for(let e=0;e<N;e++){let n=[];for(let r=0;r<M;r++)n.push(L);p.push(n)}const t=document.getElementById("select-algorithm");B.forEach((e,n)=>{const r=document.createElement("option");r.value=n,r.innerText=n,t.appendChild(r)})});const w=document.getElementById("grilla");let $=!1;w.addEventListener("mousedown",t=>{if(window.animating||t.target.id==origen||t.target.id==destino)return;window.isClean||E(),$=!0;let[e,n]=t.target.id.split(":");p[+e][+n]=1/0,g(t.target,"wall")});window.addEventListener("mouseup",()=>{$=!1});w.addEventListener("mouseover",t=>{if(window.animating||t.target.id==origen||t.target.id==destino||!$)return;let[e,n]=t.target.id.split(":");p[+e][+n]=1/0,g(t.target,"wall")});document.getElementById("clean-grilla").addEventListener("click",()=>{if(!window.animating){E(!0),p=[];for(let t=0;t<N;t++){let e=[];for(let n=0;n<M;n++)e.push(L);p.push(e)}window.isClean=!0}});w.addEventListener("contextmenu",t=>{if(t.preventDefault(),window.animating||t.target.id==origen||t.target.id==destino)return;let[e,n]=t.target.id.split(":");p[+e][+n]=L,g(t.target,"vacio")});function _(t,e){if(!!t){switch(e){case"origen":let n=document.getElementById(origen);n.setAttribute("draggable",!1),g(n,"vacio"),g(t,"origen"),origen=t.id;break;case"destino":let r=document.getElementById(destino);r.setAttribute("draggable",!1),g(r,"vacio"),g(t,"destino"),destino=t.id;break}t.setAttribute("draggable",!0)}}w.addEventListener("dragstart",t=>{if(!window.animating)if(t.target.id==origen)t.dataTransfer.setData("dragging","origen");else if(t.target.id==destino)t.dataTransfer.setData("dragging","destino");else return});w.addEventListener("dragenter",t=>{t.preventDefault(),!(window.animating||t.target.id==origen||t.target.id==destino||t.target.classList.contains("wall")||t.target.nodeName!="TD")&&t.target.classList.add("droppable")});w.addEventListener("dragover",t=>{t.preventDefault(),window.animating});w.addEventListener("dragleave",t=>{t.preventDefault(),!(t.target.id==origen||t.target.id==destino)&&t.target.classList.remove("droppable")});w.addEventListener("drop",t=>{if(window.animating||t.target.id==origen||t.target.id==destino||t.target.classList.contains("wall")||t.target.nodeName!="TD")return;const e=t.dataTransfer.getData("dragging");t.target.classList.remove("droppable"),_(t.target,e),e=="origen"&&!isClean&&C()});document.getElementById("start-algorithm").addEventListener("click",()=>{C()});function C(){if(window.animating)return;window.animating=!0,window.isClean||E();const t=document.getElementById("select-algorithm"),e=B.get(t.value)(p,origen,destino);if(!e){window.animating=!1;return}O(e[0],e[1])}