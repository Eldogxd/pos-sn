import{i as En,s as X,G as lr,k as In,d as j,l as Nn,J as jn,D as Fn,E as Tn,c as Mn,o as h,w as Lt,b as bt,a as s,e as x,f as E,u as yt,n as F,t as _,F as pe,h as ve,g as he,z as Dn,m as te,y as ne,C as Ln,H as zn,q as xe}from"./app-BmyJ5f5g.js";import{_ as Rn}from"./AppLayout-NxtruGct.js";import{_ as Wn}from"./NavDelivery-BeTjwdel.js";import{s as _e}from"./index-CH_qFMfu.js";import{s as Un,a as qn}from"./confirmdialog.esm-C4l17191.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";/*!
 * Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */function Ht(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function Bn(e){if(Array.isArray(e))return e}function Vn(e){if(Array.isArray(e))return Ht(e)}function Yn(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Hn(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,ur(r.key),r)}}function Gn(e,t,a){return t&&Hn(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function _t(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=la(e))||t){a&&(e=a);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(f){throw f},f:i}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var c,l=!0,d=!1;return{s:function(){a=a.call(e)},n:function(){var f=a.next();return l=f.done,f},e:function(f){d=!0,c=f},f:function(){try{l||a.return==null||a.return()}finally{if(d)throw c}}}}function I(e,t,a){return(t=ur(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Kn(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Xn(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,i,c,l,d=[],f=!0,p=!1;try{if(c=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;f=!1}else for(;!(f=(r=c.call(a)).done)&&(d.push(r.value),d.length!==t);f=!0);}catch(g){p=!0,i=g}finally{try{if(!f&&a.return!=null&&(l=a.return(),Object(l)!==l))return}finally{if(p)throw i}}return d}}function Jn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qn(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ea(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),a.push.apply(a,r)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?Ea(Object(a),!0).forEach(function(r){I(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Ea(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function $t(e,t){return Bn(e)||Xn(e,t)||la(e,t)||Jn()}function ue(e){return Vn(e)||Kn(e)||la(e)||Qn()}function Zn(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function ur(e){var t=Zn(e,"string");return typeof t=="symbol"?t:t+""}function At(e){"@babel/helpers - typeof";return At=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},At(e)}function la(e,t){if(e){if(typeof e=="string")return Ht(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Ht(e,t):void 0}}var Ia=function(){},ua={},cr={},dr=null,fr={mark:Ia,measure:Ia};try{typeof window<"u"&&(ua=window),typeof document<"u"&&(cr=document),typeof MutationObserver<"u"&&(dr=MutationObserver),typeof performance<"u"&&(fr=performance)}catch{}var es=ua.navigator||{},Na=es.userAgent,ja=Na===void 0?"":Na,Ie=ua,L=cr,Fa=dr,ht=fr;Ie.document;var Se=!!L.documentElement&&!!L.head&&typeof L.addEventListener=="function"&&typeof L.createElement=="function",mr=~ja.indexOf("MSIE")||~ja.indexOf("Trident/"),zt,ts=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,as=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Slab Press|Slab|Whiteboard)?.*/i,pr={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"}},rs={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},vr=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],J="classic",lt="duotone",gr="sharp",br="sharp-duotone",yr="chisel",hr="etch",xr="jelly",_r="jelly-duo",wr="jelly-fill",kr="notdog",Ar="notdog-duo",Sr="slab",Cr="slab-press",Pr="thumbprint",$r="whiteboard",ns="Classic",ss="Duotone",is="Sharp",os="Sharp Duotone",ls="Chisel",us="Etch",cs="Jelly",ds="Jelly Duo",fs="Jelly Fill",ms="Notdog",ps="Notdog Duo",vs="Slab",gs="Slab Press",bs="Thumbprint",ys="Whiteboard",Or=[J,lt,gr,br,yr,hr,xr,_r,wr,kr,Ar,Sr,Cr,Pr,$r];zt={},I(I(I(I(I(I(I(I(I(I(zt,J,ns),lt,ss),gr,is),br,os),yr,ls),hr,us),xr,cs),_r,ds),wr,fs),kr,ms),I(I(I(I(I(zt,Ar,ps),Sr,vs),Cr,gs),Pr,bs),$r,ys);var hs={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"}},xs={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"}},_s=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),ws={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},whiteboard:{semibold:"fawsb"}},Er=["fak","fa-kit","fakd","fa-kit-duotone"],Ta={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},ks=["kit"],As="kit",Ss="kit-duotone",Cs="Kit",Ps="Kit Duotone";I(I({},As,Cs),Ss,Ps);var $s={kit:{"fa-kit":"fak"}},Os={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Es={kit:{fak:"fa-kit"}},Ma={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},Rt,xt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Is=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],Ns="classic",js="duotone",Fs="sharp",Ts="sharp-duotone",Ms="chisel",Ds="etch",Ls="jelly",zs="jelly-duo",Rs="jelly-fill",Ws="notdog",Us="notdog-duo",qs="slab",Bs="slab-press",Vs="thumbprint",Ys="whiteboard",Hs="Classic",Gs="Duotone",Ks="Sharp",Xs="Sharp Duotone",Js="Chisel",Qs="Etch",Zs="Jelly",ei="Jelly Duo",ti="Jelly Fill",ai="Notdog",ri="Notdog Duo",ni="Slab",si="Slab Press",ii="Thumbprint",oi="Whiteboard";Rt={},I(I(I(I(I(I(I(I(I(I(Rt,Ns,Hs),js,Gs),Fs,Ks),Ts,Xs),Ms,Js),Ds,Qs),Ls,Zs),zs,ei),Rs,ti),Ws,ai),I(I(I(I(I(Rt,Us,ri),qs,ni),Bs,si),Vs,ii),Ys,oi);var li="kit",ui="kit-duotone",ci="Kit",di="Kit Duotone";I(I({},li,ci),ui,di);var fi={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"}},mi={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"]},Gt={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"}},pi=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],Ir=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr"].concat(Is,pi),vi=["solid","regular","light","thin","duotone","brands","semibold"],Nr=[1,2,3,4,5,6,7,8,9,10],gi=Nr.concat([11,12,13,14,15,16,17,18,19,20]),bi=["aw","fw","pull-left","pull-right"],yi=[].concat(ue(Object.keys(mi)),vi,bi,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",xt.GROUP,xt.SWAP_OPACITY,xt.PRIMARY,xt.SECONDARY]).concat(Nr.map(function(e){return"".concat(e,"x")})).concat(gi.map(function(e){return"w-".concat(e)})),hi={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},ke="___FONT_AWESOME___",Kt=16,jr="fa",Fr="svg-inline--fa",We="data-fa-i2svg",Xt="data-fa-pseudo-element",xi="data-fa-pseudo-element-pending",ca="data-prefix",da="data-icon",Da="fontawesome-i2svg",_i="async",wi=["HTML","HEAD","STYLE","SCRIPT"],Tr=["::before","::after",":before",":after"],Mr=function(){try{return!0}catch{return!1}}();function ut(e){return new Proxy(e,{get:function(a,r){return r in a?a[r]:a[J]}})}var Dr=m({},pr);Dr[J]=m(m(m(m({},{"fa-duotone":"duotone"}),pr[J]),Ta.kit),Ta["kit-duotone"]);var ki=ut(Dr),Jt=m({},ws);Jt[J]=m(m(m(m({},{duotone:"fad"}),Jt[J]),Ma.kit),Ma["kit-duotone"]);var La=ut(Jt),Qt=m({},Gt);Qt[J]=m(m({},Qt[J]),Es.kit);var Lr=ut(Qt),Zt=m({},fi);Zt[J]=m(m({},Zt[J]),$s.kit);ut(Zt);var Ai=ts,zr="fa-layers-text",Si=as,Ci=m({},hs);ut(Ci);var Pi=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Wt=rs,$i=[].concat(ue(ks),ue(yi)),st=Ie.FontAwesomeConfig||{};function Oi(e){var t=L.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Ei(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(L&&typeof L.querySelector=="function"){var Ii=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Ii.forEach(function(e){var t=$t(e,2),a=t[0],r=t[1],i=Ei(Oi(a));i!=null&&(st[r]=i)})}var Rr={styleDefault:"solid",familyDefault:J,cssPrefix:jr,replacementClass:Fr,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};st.familyPrefix&&(st.cssPrefix=st.familyPrefix);var Xe=m(m({},Rr),st);Xe.autoReplaceSvg||(Xe.observeMutations=!1);var k={};Object.keys(Rr).forEach(function(e){Object.defineProperty(k,e,{enumerable:!0,set:function(a){Xe[e]=a,it.forEach(function(r){return r(k)})},get:function(){return Xe[e]}})});Object.defineProperty(k,"familyPrefix",{enumerable:!0,set:function(t){Xe.cssPrefix=t,it.forEach(function(a){return a(k)})},get:function(){return Xe.cssPrefix}});Ie.FontAwesomeConfig=k;var it=[];function Ni(e){return it.push(e),function(){it.splice(it.indexOf(e),1)}}var He=Kt,ge={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ji(e){if(!(!e||!Se)){var t=L.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=L.head.childNodes,r=null,i=a.length-1;i>-1;i--){var c=a[i],l=(c.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(l)>-1&&(r=c)}return L.head.insertBefore(t,r),e}}var Fi="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function za(){for(var e=12,t="";e-- >0;)t+=Fi[Math.random()*62|0];return t}function Je(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function fa(e){return e.classList?Je(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Wr(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ti(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(Wr(e[a]),'" ')},"").trim()}function Ot(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function ma(e){return e.size!==ge.size||e.x!==ge.x||e.y!==ge.y||e.rotate!==ge.rotate||e.flipX||e.flipY}function Mi(e){var t=e.transform,a=e.containerWidth,r=e.iconWidth,i={transform:"translate(".concat(a/2," 256)")},c="translate(".concat(t.x*32,", ").concat(t.y*32,") "),l="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),d="rotate(".concat(t.rotate," 0 0)"),f={transform:"".concat(c," ").concat(l," ").concat(d)},p={transform:"translate(".concat(r/2*-1," -256)")};return{outer:i,inner:f,path:p}}function Di(e){var t=e.transform,a=e.width,r=a===void 0?Kt:a,i=e.height,c=i===void 0?Kt:i,l="";return mr?l+="translate(".concat(t.x/He-r/2,"em, ").concat(t.y/He-c/2,"em) "):l+="translate(calc(-50% + ".concat(t.x/He,"em), calc(-50% + ").concat(t.y/He,"em)) "),l+="scale(".concat(t.size/He*(t.flipX?-1:1),", ").concat(t.size/He*(t.flipY?-1:1),") "),l+="rotate(".concat(t.rotate,"deg) "),l}var Li=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}`;function Ur(){var e=jr,t=Fr,a=k.cssPrefix,r=k.replacementClass,i=Li;if(a!==e||r!==t){var c=new RegExp("\\.".concat(e,"\\-"),"g"),l=new RegExp("\\--".concat(e,"\\-"),"g"),d=new RegExp("\\.".concat(t),"g");i=i.replace(c,".".concat(a,"-")).replace(l,"--".concat(a,"-")).replace(d,".".concat(r))}return i}var Ra=!1;function Ut(){k.autoAddCss&&!Ra&&(ji(Ur()),Ra=!0)}var zi={mixout:function(){return{dom:{css:Ur,insertCss:Ut}}},hooks:function(){return{beforeDOMElementCreation:function(){Ut()},beforeI2svg:function(){Ut()}}}},Ae=Ie||{};Ae[ke]||(Ae[ke]={});Ae[ke].styles||(Ae[ke].styles={});Ae[ke].hooks||(Ae[ke].hooks={});Ae[ke].shims||(Ae[ke].shims=[]);var le=Ae[ke],qr=[],Br=function(){L.removeEventListener("DOMContentLoaded",Br),St=1,qr.map(function(t){return t()})},St=!1;Se&&(St=(L.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(L.readyState),St||L.addEventListener("DOMContentLoaded",Br));function Ri(e){Se&&(St?setTimeout(e,0):qr.push(e))}function ct(e){var t=e.tag,a=e.attributes,r=a===void 0?{}:a,i=e.children,c=i===void 0?[]:i;return typeof e=="string"?Wr(e):"<".concat(t," ").concat(Ti(r),">").concat(c.map(ct).join(""),"</").concat(t,">")}function Wa(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var qt=function(t,a,r,i){var c=Object.keys(t),l=c.length,d=a,f,p,g;for(r===void 0?(f=1,g=t[c[0]]):(f=0,g=r);f<l;f++)p=c[f],g=d(g,t[p],p,t);return g};function Vr(e){return ue(e).length!==1?null:e.codePointAt(0).toString(16)}function Ua(e){return Object.keys(e).reduce(function(t,a){var r=e[a],i=!!r.icon;return i?t[r.iconName]=r.icon:t[a]=r,t},{})}function Yr(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,i=r===void 0?!1:r,c=Ua(t);typeof le.hooks.addPack=="function"&&!i?le.hooks.addPack(e,Ua(t)):le.styles[e]=m(m({},le.styles[e]||{}),c),e==="fas"&&Yr("fa",t)}var ot=le.styles,Wi=le.shims,Hr=Object.keys(Lr),Ui=Hr.reduce(function(e,t){return e[t]=Object.keys(Lr[t]),e},{}),pa=null,Gr={},Kr={},Xr={},Jr={},Qr={};function qi(e){return~$i.indexOf(e)}function Bi(e,t){var a=t.split("-"),r=a[0],i=a.slice(1).join("-");return r===e&&i!==""&&!qi(i)?i:null}var Zr=function(){var t=function(c){return qt(ot,function(l,d,f){return l[f]=qt(d,c,{}),l},{})};Gr=t(function(i,c,l){if(c[3]&&(i[c[3]]=l),c[2]){var d=c[2].filter(function(f){return typeof f=="number"});d.forEach(function(f){i[f.toString(16)]=l})}return i}),Kr=t(function(i,c,l){if(i[l]=l,c[2]){var d=c[2].filter(function(f){return typeof f=="string"});d.forEach(function(f){i[f]=l})}return i}),Qr=t(function(i,c,l){var d=c[2];return i[l]=l,d.forEach(function(f){i[f]=l}),i});var a="far"in ot||k.autoFetchSvg,r=qt(Wi,function(i,c){var l=c[0],d=c[1],f=c[2];return d==="far"&&!a&&(d="fas"),typeof l=="string"&&(i.names[l]={prefix:d,iconName:f}),typeof l=="number"&&(i.unicodes[l.toString(16)]={prefix:d,iconName:f}),i},{names:{},unicodes:{}});Xr=r.names,Jr=r.unicodes,pa=Et(k.styleDefault,{family:k.familyDefault})};Ni(function(e){pa=Et(e.styleDefault,{family:k.familyDefault})});Zr();function va(e,t){return(Gr[e]||{})[t]}function Vi(e,t){return(Kr[e]||{})[t]}function Re(e,t){return(Qr[e]||{})[t]}function en(e){return Xr[e]||{prefix:null,iconName:null}}function Yi(e){var t=Jr[e],a=va("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function Ne(){return pa}var tn=function(){return{prefix:null,iconName:null,rest:[]}};function Hi(e){var t=J,a=Hr.reduce(function(r,i){return r[i]="".concat(k.cssPrefix,"-").concat(i),r},{});return Or.forEach(function(r){(e.includes(a[r])||e.some(function(i){return Ui[r].includes(i)}))&&(t=r)}),t}function Et(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,r=a===void 0?J:a,i=ki[r][e];if(r===lt&&!e)return"fad";var c=La[r][e]||La[r][i],l=e in le.styles?e:null,d=c||l||null;return d}function Gi(e){var t=[],a=null;return e.forEach(function(r){var i=Bi(k.cssPrefix,r);i?a=i:r&&t.push(r)}),{iconName:a,rest:t}}function qa(e){return e.sort().filter(function(t,a,r){return r.indexOf(t)===a})}var Ba=Ir.concat(Er);function It(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,r=a===void 0?!1:a,i=null,c=qa(e.filter(function(S){return Ba.includes(S)})),l=qa(e.filter(function(S){return!Ba.includes(S)})),d=c.filter(function(S){return i=S,!vr.includes(S)}),f=$t(d,1),p=f[0],g=p===void 0?null:p,v=Hi(c),P=m(m({},Gi(l)),{},{prefix:Et(g,{family:v})});return m(m(m({},P),Qi({values:e,family:v,styles:ot,config:k,canonical:P,givenPrefix:i})),Ki(r,i,P))}function Ki(e,t,a){var r=a.prefix,i=a.iconName;if(e||!r||!i)return{prefix:r,iconName:i};var c=t==="fa"?en(i):{},l=Re(r,i);return i=c.iconName||l||i,r=c.prefix||r,r==="far"&&!ot.far&&ot.fas&&!k.autoFetchSvg&&(r="fas"),{prefix:r,iconName:i}}var Xi=Or.filter(function(e){return e!==J||e!==lt}),Ji=Object.keys(Gt).filter(function(e){return e!==J}).map(function(e){return Object.keys(Gt[e])}).flat();function Qi(e){var t=e.values,a=e.family,r=e.canonical,i=e.givenPrefix,c=i===void 0?"":i,l=e.styles,d=l===void 0?{}:l,f=e.config,p=f===void 0?{}:f,g=a===lt,v=t.includes("fa-duotone")||t.includes("fad"),P=p.familyDefault==="duotone",S=r.prefix==="fad"||r.prefix==="fa-duotone";if(!g&&(v||P||S)&&(r.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab"),!r.prefix&&Xi.includes(a)){var D=Object.keys(d).find(function(W){return Ji.includes(W)});if(D||p.autoFetchSvg){var N=_s.get(a).defaultShortPrefixId;r.prefix=N,r.iconName=Re(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||c==="fa")&&(r.prefix=Ne()||"fas"),r}var Zi=function(){function e(){Yn(this,e),this.definitions={}}return Gn(e,[{key:"add",value:function(){for(var a=this,r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];var l=i.reduce(this._pullDefinitions,{});Object.keys(l).forEach(function(d){a.definitions[d]=m(m({},a.definitions[d]||{}),l[d]),Yr(d,l[d]),Zr()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var i=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(i).map(function(c){var l=i[c],d=l.prefix,f=l.iconName,p=l.icon,g=p[2];a[d]||(a[d]={}),g.length>0&&g.forEach(function(v){typeof v=="string"&&(a[d][v]=p)}),a[d][f]=p}),a}}])}(),Va=[],Ge={},Ke={},eo=Object.keys(Ke);function to(e,t){var a=t.mixoutsTo;return Va=e,Ge={},Object.keys(Ke).forEach(function(r){eo.indexOf(r)===-1&&delete Ke[r]}),Va.forEach(function(r){var i=r.mixout?r.mixout():{};if(Object.keys(i).forEach(function(l){typeof i[l]=="function"&&(a[l]=i[l]),At(i[l])==="object"&&Object.keys(i[l]).forEach(function(d){a[l]||(a[l]={}),a[l][d]=i[l][d]})}),r.hooks){var c=r.hooks();Object.keys(c).forEach(function(l){Ge[l]||(Ge[l]=[]),Ge[l].push(c[l])})}r.provides&&r.provides(Ke)}),a}function ea(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),i=2;i<a;i++)r[i-2]=arguments[i];var c=Ge[e]||[];return c.forEach(function(l){t=l.apply(null,[t].concat(r))}),t}function Ue(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var i=Ge[e]||[];i.forEach(function(c){c.apply(null,a)})}function je(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Ke[e]?Ke[e].apply(null,t):void 0}function ta(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||Ne();if(t)return t=Re(a,t)||t,Wa(an.definitions,a,t)||Wa(le.styles,a,t)}var an=new Zi,ao=function(){k.autoReplaceSvg=!1,k.observeMutations=!1,Ue("noAuto")},ro={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Se?(Ue("beforeI2svg",t),je("pseudoElements2svg",t),je("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;k.autoReplaceSvg===!1&&(k.autoReplaceSvg=!0),k.observeMutations=!0,Ri(function(){so({autoReplaceSvgRoot:a}),Ue("watch",t)})}},no={icon:function(t){if(t===null)return null;if(At(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:Re(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=Et(t[0]);return{prefix:r,iconName:Re(r,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(k.cssPrefix,"-"))>-1||t.match(Ai))){var i=It(t.split(" "),{skipLookups:!0});return{prefix:i.prefix||Ne(),iconName:Re(i.prefix,i.iconName)||i.iconName}}if(typeof t=="string"){var c=Ne();return{prefix:c,iconName:Re(c,t)||t}}}},se={noAuto:ao,config:k,dom:ro,parse:no,library:an,findIconDefinition:ta,toHtml:ct},so=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,r=a===void 0?L:a;(Object.keys(le.styles).length>0||k.autoFetchSvg)&&Se&&k.autoReplaceSvg&&se.dom.i2svg({node:r})};function Nt(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return ct(r)})}}),Object.defineProperty(e,"node",{get:function(){if(Se){var r=L.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function io(e){var t=e.children,a=e.main,r=e.mask,i=e.attributes,c=e.styles,l=e.transform;if(ma(l)&&a.found&&!r.found){var d=a.width,f=a.height,p={x:d/f/2,y:.5};i.style=Ot(m(m({},c),{},{"transform-origin":"".concat(p.x+l.x/16,"em ").concat(p.y+l.y/16,"em")}))}return[{tag:"svg",attributes:i,children:t}]}function oo(e){var t=e.prefix,a=e.iconName,r=e.children,i=e.attributes,c=e.symbol,l=c===!0?"".concat(t,"-").concat(k.cssPrefix,"-").concat(a):c;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:m(m({},i),{},{id:l}),children:r}]}]}function lo(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function ga(e){var t=e.icons,a=t.main,r=t.mask,i=e.prefix,c=e.iconName,l=e.transform,d=e.symbol,f=e.maskId,p=e.extra,g=e.watchable,v=g===void 0?!1:g,P=r.found?r:a,S=P.width,D=P.height,N=[k.replacementClass,c?"".concat(k.cssPrefix,"-").concat(c):""].filter(function(U){return p.classes.indexOf(U)===-1}).filter(function(U){return U!==""||!!U}).concat(p.classes).join(" "),W={children:[],attributes:m(m({},p.attributes),{},{"data-prefix":i,"data-icon":c,class:N,role:p.attributes.role||"img",viewBox:"0 0 ".concat(S," ").concat(D)})};!lo(p.attributes)&&!p.attributes["aria-hidden"]&&(W.attributes["aria-hidden"]="true"),v&&(W.attributes[We]="");var b=m(m({},W),{},{prefix:i,iconName:c,main:a,mask:r,maskId:f,transform:l,symbol:d,styles:m({},p.styles)}),w=r.found&&a.found?je("generateAbstractMask",b)||{children:[],attributes:{}}:je("generateAbstractIcon",b)||{children:[],attributes:{}},T=w.children,B=w.attributes;return b.children=T,b.attributes=B,d?oo(b):io(b)}function Ya(e){var t=e.content,a=e.width,r=e.height,i=e.transform,c=e.extra,l=e.watchable,d=l===void 0?!1:l,f=m(m({},c.attributes),{},{class:c.classes.join(" ")});d&&(f[We]="");var p=m({},c.styles);ma(i)&&(p.transform=Di({transform:i,width:a,height:r}),p["-webkit-transform"]=p.transform);var g=Ot(p);g.length>0&&(f.style=g);var v=[];return v.push({tag:"span",attributes:f,children:[t]}),v}function uo(e){var t=e.content,a=e.extra,r=m(m({},a.attributes),{},{class:a.classes.join(" ")}),i=Ot(a.styles);i.length>0&&(r.style=i);var c=[];return c.push({tag:"span",attributes:r,children:[t]}),c}var Bt=le.styles;function aa(e){var t=e[0],a=e[1],r=e.slice(4),i=$t(r,1),c=i[0],l=null;return Array.isArray(c)?l={tag:"g",attributes:{class:"".concat(k.cssPrefix,"-").concat(Wt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(k.cssPrefix,"-").concat(Wt.SECONDARY),fill:"currentColor",d:c[0]}},{tag:"path",attributes:{class:"".concat(k.cssPrefix,"-").concat(Wt.PRIMARY),fill:"currentColor",d:c[1]}}]}:l={tag:"path",attributes:{fill:"currentColor",d:c}},{found:!0,width:t,height:a,icon:l}}var co={found:!1,width:512,height:512};function fo(e,t){!Mr&&!k.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function ra(e,t){var a=t;return t==="fa"&&k.styleDefault!==null&&(t=Ne()),new Promise(function(r,i){if(a==="fa"){var c=en(e)||{};e=c.iconName||e,t=c.prefix||t}if(e&&t&&Bt[t]&&Bt[t][e]){var l=Bt[t][e];return r(aa(l))}fo(e,t),r(m(m({},co),{},{icon:k.showMissingIcons&&e?je("missingIconAbstract")||{}:{}}))})}var Ha=function(){},na=k.measurePerformance&&ht&&ht.mark&&ht.measure?ht:{mark:Ha,measure:Ha},nt='FA "7.0.0"',mo=function(t){return na.mark("".concat(nt," ").concat(t," begins")),function(){return rn(t)}},rn=function(t){na.mark("".concat(nt," ").concat(t," ends")),na.measure("".concat(nt," ").concat(t),"".concat(nt," ").concat(t," begins"),"".concat(nt," ").concat(t," ends"))},ba={begin:mo,end:rn},wt=function(){};function Ga(e){var t=e.getAttribute?e.getAttribute(We):null;return typeof t=="string"}function po(e){var t=e.getAttribute?e.getAttribute(ca):null,a=e.getAttribute?e.getAttribute(da):null;return t&&a}function vo(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(k.replacementClass)}function go(){if(k.autoReplaceSvg===!0)return kt.replace;var e=kt[k.autoReplaceSvg];return e||kt.replace}function bo(e){return L.createElementNS("http://www.w3.org/2000/svg",e)}function yo(e){return L.createElement(e)}function nn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,r=a===void 0?e.tag==="svg"?bo:yo:a;if(typeof e=="string")return L.createTextNode(e);var i=r(e.tag);Object.keys(e.attributes||[]).forEach(function(l){i.setAttribute(l,e.attributes[l])});var c=e.children||[];return c.forEach(function(l){i.appendChild(nn(l,{ceFn:r}))}),i}function ho(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var kt={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(i){a.parentNode.insertBefore(nn(i),a)}),a.getAttribute(We)===null&&k.keepOriginalSource){var r=L.createComment(ho(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(t){var a=t[0],r=t[1];if(~fa(a).indexOf(k.replacementClass))return kt.replace(t);var i=new RegExp("".concat(k.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var c=r[0].attributes.class.split(" ").reduce(function(d,f){return f===k.replacementClass||f.match(i)?d.toSvg.push(f):d.toNode.push(f),d},{toNode:[],toSvg:[]});r[0].attributes.class=c.toSvg.join(" "),c.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",c.toNode.join(" "))}var l=r.map(function(d){return ct(d)}).join(`
`);a.setAttribute(We,""),a.innerHTML=l}};function Ka(e){e()}function sn(e,t){var a=typeof t=="function"?t:wt;if(e.length===0)a();else{var r=Ka;k.mutateApproach===_i&&(r=Ie.requestAnimationFrame||Ka),r(function(){var i=go(),c=ba.begin("mutate");e.map(i),c(),a()})}}var ya=!1;function on(){ya=!0}function sa(){ya=!1}var Ct=null;function Xa(e){if(Fa&&k.observeMutations){var t=e.treeCallback,a=t===void 0?wt:t,r=e.nodeCallback,i=r===void 0?wt:r,c=e.pseudoElementsCallback,l=c===void 0?wt:c,d=e.observeMutationsRoot,f=d===void 0?L:d;Ct=new Fa(function(p){if(!ya){var g=Ne();Je(p).forEach(function(v){if(v.type==="childList"&&v.addedNodes.length>0&&!Ga(v.addedNodes[0])&&(k.searchPseudoElements&&l(v.target),a(v.target)),v.type==="attributes"&&v.target.parentNode&&k.searchPseudoElements&&l([v.target],!0),v.type==="attributes"&&Ga(v.target)&&~Pi.indexOf(v.attributeName))if(v.attributeName==="class"&&po(v.target)){var P=It(fa(v.target)),S=P.prefix,D=P.iconName;v.target.setAttribute(ca,S||g),D&&v.target.setAttribute(da,D)}else vo(v.target)&&i(v.target)})}}),Se&&Ct.observe(f,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function xo(){Ct&&Ct.disconnect()}function _o(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(r,i){var c=i.split(":"),l=c[0],d=c.slice(1);return l&&d.length>0&&(r[l]=d.join(":").trim()),r},{})),a}function wo(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",i=It(fa(e));return i.prefix||(i.prefix=Ne()),t&&a&&(i.prefix=t,i.iconName=a),i.iconName&&i.prefix||(i.prefix&&r.length>0&&(i.iconName=Vi(i.prefix,e.innerText)||va(i.prefix,Vr(e.innerText))),!i.iconName&&k.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(i.iconName=e.firstChild.data)),i}function ko(e){var t=Je(e.attributes).reduce(function(a,r){return a.name!=="class"&&a.name!=="style"&&(a[r.name]=r.value),a},{});return t}function Ao(){return{iconName:null,prefix:null,transform:ge,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ja(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=wo(e),r=a.iconName,i=a.prefix,c=a.rest,l=ko(e),d=ea("parseNodeAttributes",{},e),f=t.styleParser?_o(e):[];return m({iconName:r,prefix:i,transform:ge,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:c,styles:f,attributes:l}},d)}var So=le.styles;function ln(e){var t=k.autoReplaceSvg==="nest"?Ja(e,{styleParser:!1}):Ja(e);return~t.extra.classes.indexOf(zr)?je("generateLayersText",e,t):je("generateSvgReplacementMutation",e,t)}function Co(){return[].concat(ue(Er),ue(Ir))}function Qa(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!Se)return Promise.resolve();var a=L.documentElement.classList,r=function(v){return a.add("".concat(Da,"-").concat(v))},i=function(v){return a.remove("".concat(Da,"-").concat(v))},c=k.autoFetchSvg?Co():vr.concat(Object.keys(So));c.includes("fa")||c.push("fa");var l=[".".concat(zr,":not([").concat(We,"])")].concat(c.map(function(g){return".".concat(g,":not([").concat(We,"])")})).join(", ");if(l.length===0)return Promise.resolve();var d=[];try{d=Je(e.querySelectorAll(l))}catch{}if(d.length>0)r("pending"),i("complete");else return Promise.resolve();var f=ba.begin("onTree"),p=d.reduce(function(g,v){try{var P=ln(v);P&&g.push(P)}catch(S){Mr||S.name==="MissingIcon"&&console.error(S)}return g},[]);return new Promise(function(g,v){Promise.all(p).then(function(P){sn(P,function(){r("active"),r("complete"),i("pending"),typeof t=="function"&&t(),f(),g()})}).catch(function(P){f(),v(P)})})}function Po(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;ln(e).then(function(a){a&&sn([a],t)})}function $o(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:ta(t||{}),i=a.mask;return i&&(i=(i||{}).icon?i:ta(i||{})),e(r,m(m({},a),{},{mask:i}))}}var Oo=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,i=r===void 0?ge:r,c=a.symbol,l=c===void 0?!1:c,d=a.mask,f=d===void 0?null:d,p=a.maskId,g=p===void 0?null:p,v=a.classes,P=v===void 0?[]:v,S=a.attributes,D=S===void 0?{}:S,N=a.styles,W=N===void 0?{}:N;if(t){var b=t.prefix,w=t.iconName,T=t.icon;return Nt(m({type:"icon"},t),function(){return Ue("beforeDOMElementCreation",{iconDefinition:t,params:a}),ga({icons:{main:aa(T),mask:f?aa(f.icon):{found:!1,width:null,height:null,icon:{}}},prefix:b,iconName:w,transform:m(m({},ge),i),symbol:l,maskId:g,extra:{attributes:D,styles:W,classes:P}})})}},Eo={mixout:function(){return{icon:$o(Oo)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=Qa,a.nodeCallback=Po,a}}},provides:function(t){t.i2svg=function(a){var r=a.node,i=r===void 0?L:r,c=a.callback,l=c===void 0?function(){}:c;return Qa(i,l)},t.generateSvgReplacementMutation=function(a,r){var i=r.iconName,c=r.prefix,l=r.transform,d=r.symbol,f=r.mask,p=r.maskId,g=r.extra;return new Promise(function(v,P){Promise.all([ra(i,c),f.iconName?ra(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(S){var D=$t(S,2),N=D[0],W=D[1];v([a,ga({icons:{main:N,mask:W},prefix:c,iconName:i,transform:l,symbol:d,maskId:p,extra:g,watchable:!0})])}).catch(P)})},t.generateAbstractIcon=function(a){var r=a.children,i=a.attributes,c=a.main,l=a.transform,d=a.styles,f=Ot(d);f.length>0&&(i.style=f);var p;return ma(l)&&(p=je("generateAbstractTransformGrouping",{main:c,transform:l,containerWidth:c.width,iconWidth:c.width})),r.push(p||c.icon),{children:r,attributes:i}}}},Io={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=r.classes,c=i===void 0?[]:i;return Nt({type:"layer"},function(){Ue("beforeDOMElementCreation",{assembler:a,params:r});var l=[];return a(function(d){Array.isArray(d)?d.map(function(f){l=l.concat(f.abstract)}):l=l.concat(d.abstract)}),[{tag:"span",attributes:{class:["".concat(k.cssPrefix,"-layers")].concat(ue(c)).join(" ")},children:l}]})}}}},No={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var i=r.classes,c=i===void 0?[]:i,l=r.attributes,d=l===void 0?{}:l,f=r.styles,p=f===void 0?{}:f;return Nt({type:"counter",content:a},function(){return Ue("beforeDOMElementCreation",{content:a,params:r}),uo({content:a.toString(),extra:{attributes:d,styles:p,classes:["".concat(k.cssPrefix,"-layers-counter")].concat(ue(c))}})})}}}},jo={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=r.transform,c=i===void 0?ge:i,l=r.classes,d=l===void 0?[]:l,f=r.attributes,p=f===void 0?{}:f,g=r.styles,v=g===void 0?{}:g;return Nt({type:"text",content:a},function(){return Ue("beforeDOMElementCreation",{content:a,params:r}),Ya({content:a,transform:m(m({},ge),c),extra:{attributes:p,styles:v,classes:["".concat(k.cssPrefix,"-layers-text")].concat(ue(d))}})})}}},provides:function(t){t.generateLayersText=function(a,r){var i=r.transform,c=r.extra,l=null,d=null;if(mr){var f=parseInt(getComputedStyle(a).fontSize,10),p=a.getBoundingClientRect();l=p.width/f,d=p.height/f}return Promise.resolve([a,Ya({content:a.innerHTML,width:l,height:d,transform:i,extra:c,watchable:!0})])}}},un=new RegExp('"',"ug"),Za=[1105920,1112319],er=m(m(m(m({},{FontAwesome:{normal:"fas",400:"fas"}}),xs),hi),Os),ia=Object.keys(er).reduce(function(e,t){return e[t.toLowerCase()]=er[t],e},{}),Fo=Object.keys(ia).reduce(function(e,t){var a=ia[t];return e[t]=a[900]||ue(Object.entries(a))[0][1],e},{});function To(e){var t=e.replace(un,"");return Vr(ue(t)[0]||"")}function Mo(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),r=a.replace(un,""),i=r.codePointAt(0),c=i>=Za[0]&&i<=Za[1],l=r.length===2?r[0]===r[1]:!1;return c||l||t}function Do(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),i=isNaN(r)?"normal":r;return(ia[a]||{})[i]||Fo[a]}function tr(e,t){var a="".concat(xi).concat(t.replace(":","-"));return new Promise(function(r,i){if(e.getAttribute(a)!==null)return r();var c=Je(e.children),l=c.filter(function(A){return A.getAttribute(Xt)===t})[0],d=Ie.getComputedStyle(e,t),f=d.getPropertyValue("font-family"),p=f.match(Si),g=d.getPropertyValue("font-weight"),v=d.getPropertyValue("content");if(l&&!p)return e.removeChild(l),r();if(p&&v!=="none"&&v!==""){var P=d.getPropertyValue("content"),S=Do(f,g),D=To(P),N=p[0].startsWith("FontAwesome"),W=Mo(d),b=va(S,D),w=b;if(N){var T=Yi(D);T.iconName&&T.prefix&&(b=T.iconName,S=T.prefix)}if(b&&!W&&(!l||l.getAttribute(ca)!==S||l.getAttribute(da)!==w)){e.setAttribute(a,w),l&&e.removeChild(l);var B=Ao(),U=B.extra;U.attributes[Xt]=t,ra(b,S).then(function(A){var ie=ga(m(m({},B),{},{icons:{main:A,mask:tn()},prefix:S,iconName:w,extra:U,watchable:!0})),qe=L.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(qe,e.firstChild):e.appendChild(qe),qe.outerHTML=ie.map(function(dt){return ct(dt)}).join(`
`),e.removeAttribute(a),r()}).catch(i)}else r()}else r()})}function Lo(e){return Promise.all([tr(e,"::before"),tr(e,"::after")])}function zo(e){return e.parentNode!==document.head&&!~wi.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Xt)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var Ro=function(t){return!!t&&Tr.some(function(a){return t.includes(a)})},Wo=function(t){if(!t)return[];for(var a=new Set,r=[t],i=[/(?=\s:)/,new RegExp("(?<=\\)\\)?[^,]*,)")],c=function(){var S=d[l];r=r.flatMap(function(D){return D.split(S).map(function(N){return N.replace(/,\s*$/,"").trim()})})},l=0,d=i;l<d.length;l++)c();r=r.flatMap(function(P){return P.includes("(")?P:P.split(",").map(function(S){return S.trim()})});var f=_t(r),p;try{for(f.s();!(p=f.n()).done;){var g=p.value;if(Ro(g)){var v=Tr.reduce(function(P,S){return P.replace(S,"")},g);v!==""&&v!=="*"&&a.add(v)}}}catch(P){f.e(P)}finally{f.f()}return a};function ar(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(Se){var a;if(t)a=e;else if(k.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var r=new Set,i=_t(document.styleSheets),c;try{for(i.s();!(c=i.n()).done;){var l=c.value;try{var d=_t(l.cssRules),f;try{for(d.s();!(f=d.n()).done;){var p=f.value,g=Wo(p.selectorText),v=_t(g),P;try{for(v.s();!(P=v.n()).done;){var S=P.value;r.add(S)}}catch(N){v.e(N)}finally{v.f()}}}catch(N){d.e(N)}finally{d.f()}}catch(N){k.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(l.href," (").concat(N.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(N){i.e(N)}finally{i.f()}if(!r.size)return;var D=Array.from(r).join(", ");try{a=e.querySelectorAll(D)}catch{}}return new Promise(function(N,W){var b=Je(a).filter(zo).map(Lo),w=ba.begin("searchPseudoElements");on(),Promise.all(b).then(function(){w(),sa(),N()}).catch(function(){w(),sa(),W()})})}}var Uo={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=ar,a}}},provides:function(t){t.pseudoElements2svg=function(a){var r=a.node,i=r===void 0?L:r;k.searchPseudoElements&&ar(i)}}},rr=!1,qo={mixout:function(){return{dom:{unwatch:function(){on(),rr=!0}}}},hooks:function(){return{bootstrap:function(){Xa(ea("mutationObserverCallbacks",{}))},noAuto:function(){xo()},watch:function(a){var r=a.observeMutationsRoot;rr?sa():Xa(ea("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},nr=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,i){var c=i.toLowerCase().split("-"),l=c[0],d=c.slice(1).join("-");if(l&&d==="h")return r.flipX=!0,r;if(l&&d==="v")return r.flipY=!0,r;if(d=parseFloat(d),isNaN(d))return r;switch(l){case"grow":r.size=r.size+d;break;case"shrink":r.size=r.size-d;break;case"left":r.x=r.x-d;break;case"right":r.x=r.x+d;break;case"up":r.y=r.y-d;break;case"down":r.y=r.y+d;break;case"rotate":r.rotate=r.rotate+d;break}return r},a)},Bo={mixout:function(){return{parse:{transform:function(a){return nr(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,r){var i=r.getAttribute("data-fa-transform");return i&&(a.transform=nr(i)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var r=a.main,i=a.transform,c=a.containerWidth,l=a.iconWidth,d={transform:"translate(".concat(c/2," 256)")},f="translate(".concat(i.x*32,", ").concat(i.y*32,") "),p="scale(".concat(i.size/16*(i.flipX?-1:1),", ").concat(i.size/16*(i.flipY?-1:1),") "),g="rotate(".concat(i.rotate," 0 0)"),v={transform:"".concat(f," ").concat(p," ").concat(g)},P={transform:"translate(".concat(l/2*-1," -256)")},S={outer:d,inner:v,path:P};return{tag:"g",attributes:m({},S.outer),children:[{tag:"g",attributes:m({},S.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:m(m({},r.icon.attributes),S.path)}]}]}}}},Vt={x:0,y:0,width:"100%",height:"100%"};function sr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Vo(e){return e.tag==="g"?e.children:[e]}var Yo={hooks:function(){return{parseNodeAttributes:function(a,r){var i=r.getAttribute("data-fa-mask"),c=i?It(i.split(" ").map(function(l){return l.trim()})):tn();return c.prefix||(c.prefix=Ne()),a.mask=c,a.maskId=r.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var r=a.children,i=a.attributes,c=a.main,l=a.mask,d=a.maskId,f=a.transform,p=c.width,g=c.icon,v=l.width,P=l.icon,S=Mi({transform:f,containerWidth:v,iconWidth:p}),D={tag:"rect",attributes:m(m({},Vt),{},{fill:"white"})},N=g.children?{children:g.children.map(sr)}:{},W={tag:"g",attributes:m({},S.inner),children:[sr(m({tag:g.tag,attributes:m(m({},g.attributes),S.path)},N))]},b={tag:"g",attributes:m({},S.outer),children:[W]},w="mask-".concat(d||za()),T="clip-".concat(d||za()),B={tag:"mask",attributes:m(m({},Vt),{},{id:w,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[D,b]},U={tag:"defs",children:[{tag:"clipPath",attributes:{id:T},children:Vo(P)},B]};return r.push(U,{tag:"rect",attributes:m({fill:"currentColor","clip-path":"url(#".concat(T,")"),mask:"url(#".concat(w,")")},Vt)}),{children:r,attributes:i}}}},Ho={provides:function(t){var a=!1;Ie.matchMedia&&(a=Ie.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],i={fill:"currentColor"},c={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:m(m({},i),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var l=m(m({},c),{},{attributeName:"opacity"}),d={tag:"circle",attributes:m(m({},i),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||d.children.push({tag:"animate",attributes:m(m({},c),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:m(m({},l),{},{values:"1;0;1;1;0;1;"})}),r.push(d),r.push({tag:"path",attributes:m(m({},i),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:m(m({},l),{},{values:"1;0;0;0;0;1;"})}]}),a||r.push({tag:"path",attributes:m(m({},i),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:m(m({},l),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Go={hooks:function(){return{parseNodeAttributes:function(a,r){var i=r.getAttribute("data-fa-symbol"),c=i===null?!1:i===""?!0:i;return a.symbol=c,a}}}},Ko=[zi,Eo,Io,No,jo,Uo,qo,Bo,Yo,Ho,Go];to(Ko,{mixoutsTo:se});se.noAuto;se.config;se.library;se.dom;var oa=se.parse;se.findIconDefinition;se.toHtml;var Xo=se.icon;se.layer;se.text;se.counter;function K(e,t,a){return(t=el(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function ir(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),a.push.apply(a,r)}return a}function we(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?ir(Object(a),!0).forEach(function(r){K(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ir(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function Jo(e,t){if(e==null)return{};var a,r,i=Qo(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)a=c[r],t.indexOf(a)===-1&&{}.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}function Qo(e,t){if(e==null)return{};var a={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;a[r]=e[r]}return a}function Zo(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function el(e){var t=Zo(e,"string");return typeof t=="symbol"?t:t+""}function Pt(e){"@babel/helpers - typeof";return Pt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pt(e)}function Yt(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?K({},e,t):{}}function tl(e){var t,a=(t={"fa-spin":e.spin,"fa-pulse":e.pulse,"fa-fw":e.fixedWidth,"fa-border":e.border,"fa-li":e.listItem,"fa-inverse":e.inverse,"fa-flip":e.flip===!0,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both"},K(K(K(K(K(K(K(K(K(K(t,"fa-".concat(e.size),e.size!==null),"fa-rotate-".concat(e.rotation),e.rotation!==null),"fa-rotate-by",e.rotateBy),"fa-pull-".concat(e.pull),e.pull!==null),"fa-swap-opacity",e.swapOpacity),"fa-bounce",e.bounce),"fa-shake",e.shake),"fa-beat",e.beat),"fa-fade",e.fade),"fa-beat-fade",e.beatFade),K(K(K(K(t,"fa-flash",e.flash),"fa-spin-pulse",e.spinPulse),"fa-spin-reverse",e.spinReverse),"fa-width-auto",e.widthAuto));return Object.keys(a).map(function(r){return a[r]?r:null}).filter(function(r){return r})}var al=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},cn={exports:{}};(function(e){(function(t){var a=function(b,w,T){if(!p(w)||v(w)||P(w)||S(w)||f(w))return w;var B,U=0,A=0;if(g(w))for(B=[],A=w.length;U<A;U++)B.push(a(b,w[U],T));else{B={};for(var ie in w)Object.prototype.hasOwnProperty.call(w,ie)&&(B[b(ie,T)]=a(b,w[ie],T))}return B},r=function(b,w){w=w||{};var T=w.separator||"_",B=w.split||/(?=[A-Z])/;return b.split(B).join(T)},i=function(b){return D(b)?b:(b=b.replace(/[\-_\s]+(.)?/g,function(w,T){return T?T.toUpperCase():""}),b.substr(0,1).toLowerCase()+b.substr(1))},c=function(b){var w=i(b);return w.substr(0,1).toUpperCase()+w.substr(1)},l=function(b,w){return r(b,w).toLowerCase()},d=Object.prototype.toString,f=function(b){return typeof b=="function"},p=function(b){return b===Object(b)},g=function(b){return d.call(b)=="[object Array]"},v=function(b){return d.call(b)=="[object Date]"},P=function(b){return d.call(b)=="[object RegExp]"},S=function(b){return d.call(b)=="[object Boolean]"},D=function(b){return b=b-0,b===b},N=function(b,w){var T=w&&"process"in w?w.process:w;return typeof T!="function"?b:function(B,U){return T(B,b,U)}},W={camelize:i,decamelize:l,pascalize:c,depascalize:l,camelizeKeys:function(b,w){return a(N(i,w),b)},decamelizeKeys:function(b,w){return a(N(l,w),b,w)},pascalizeKeys:function(b,w){return a(N(c,w),b)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=W:t.humps=W})(al)})(cn);var rl=cn.exports,nl=["class","style"];function sl(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,a){var r=a.indexOf(":"),i=rl.camelize(a.slice(0,r)),c=a.slice(r+1).trim();return t[i]=c,t},{})}function il(e){return e.split(/\s+/).reduce(function(t,a){return t[a]=!0,t},{})}function dn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var r=(e.children||[]).map(function(f){return dn(f)}),i=Object.keys(e.attributes||{}).reduce(function(f,p){var g=e.attributes[p];switch(p){case"class":f.class=il(g);break;case"style":f.style=sl(g);break;default:f.attrs[p]=g}return f},{attrs:{},class:{},style:{}});a.class;var c=a.style,l=c===void 0?{}:c,d=Jo(a,nl);return In(e.tag,we(we(we({},t),{},{class:i.class,style:we(we({},i.style),l)},i.attrs),d),r)}var fn=!1;try{fn=!0}catch{}function ol(){if(!fn&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function or(e){if(e&&Pt(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(oa.icon)return oa.icon(e);if(e===null)return null;if(Pt(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}var ll=En({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(t){return[!0,!1,"horizontal","vertical","both"].indexOf(t)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},maskId:{type:String,default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(t){return["right","left"].indexOf(t)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(t){return[90,180,270].indexOf(Number.parseInt(t,10))>-1}},rotateBy:{type:Boolean,default:!1},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(t)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},titleId:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1},widthAuto:{type:Boolean,default:!1}},setup:function(t,a){var r=a.attrs,i=X(function(){return or(t.icon)}),c=X(function(){return Yt("classes",tl(t))}),l=X(function(){return Yt("transform",typeof t.transform=="string"?oa.transform(t.transform):t.transform)}),d=X(function(){return Yt("mask",or(t.mask))}),f=X(function(){var g=we(we(we(we({},c.value),l.value),d.value),{},{symbol:t.symbol,maskId:t.maskId});return g.title=t.title,g.titleId=t.titleId,Xo(i.value,g)});lr(f,function(g){if(!g)return ol("Could not find one or more icon(s)",i.value,d.value)},{immediate:!0});var p=X(function(){return f.value?dn(f.value.abstract[0],{},r):null});return function(){return p.value}}});/*!
 * Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */var ul={prefix:"fas",iconName:"weight-scale",icon:[448,512,["weight"],"f496","M116.6 192c-3-10.1-4.6-20.9-4.6-32 0-61.9 50.1-112 112-112S336 98.1 336 160c0 11.1-1.6 21.9-4.6 32l-71 0 24.6-44.3c6.4-11.6 2.3-26.2-9.3-32.6s-26.2-2.3-32.6 9.3l-37.6 67.7-88.8 0zM128 32L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-64 0C293.3 11.9 260 0 224 0s-69.3 11.9-96 32z"]};const cl={class:"flex flex-col w-full bg-white"},dl={class:"flex items-start justify-between gap-3 px-5 pt-5 pb-3"},fl={class:"flex items-center min-w-0 gap-3"},ml={class:"text-base font-bold leading-tight text-gray-900"},pl={class:"px-5 pb-5"},vl={class:"text-sm leading-relaxed text-gray-600"},gl={class:"flex items-center justify-between gap-8 px-5 py-3.5 bg-gray-50 border-t border-gray-100"},bl=["onClick"],yl=["onClick"],hl={class:"p-3 mx-auto space-y-4 max-w-7xl sm:p-6"},xl={class:"flex items-center gap-2 pb-1 overflow-x-auto no-scrollbar"},_l={key:0,class:"p-10 text-center card"},wl={key:1,class:"grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"},kl=["onClick"],Al={class:"flex items-start justify-between gap-2"},Sl={class:"flex items-center min-w-0 gap-2"},Cl={class:"font-bold text-gray-900"},Pl={class:"text-base font-extrabold text-mantis-700 tabular-nums shrink-0"},$l={class:"mt-2.5 space-y-1"},Ol={class:"flex items-center justify-between gap-2"},El={class:"font-semibold text-gray-900 truncate"},Il={key:0,class:"text-xs text-gray-500 shrink-0 tabular-nums"},Nl={class:"text-xs text-gray-600 line-clamp-2"},jl={key:0,class:"flex flex-wrap gap-1 mt-3"},Fl={key:0,class:"px-2 py-0.5 text-[11px] font-semibold text-mantis-700 bg-mantis-50 rounded-md"},Tl=["onClick"],Ml={class:"truncate max-w-[115px]"},Dl={class:"flex items-center gap-1.5"},Ll=["onClick"],zl=["onClick"],Rl=["onClick"],Wl={key:0,class:"modal-backdrop"},Ul={class:"modal-sheet w-full max-w-6xl h-[92dvh] sm:h-[90vh]"},ql={class:"modal-header shrink-0"},Bl={class:"flex items-center gap-2.5 min-w-0"},Vl={class:"truncate modal-title"},Yl={class:"px-2.5 py-0.5 text-xs font-bold rounded-full bg-mantis-100 text-mantis-800 tabular-nums shrink-0"},Hl={class:"grid grid-cols-3 border-b border-gray-200 bg-gray-50 shrink-0 lg:hidden"},Gl={key:0,class:"w-1.5 h-1.5 rounded-full bg-mantis-600"},Kl={key:0,class:"text-white badge bg-mantis-600"},Xl={class:"flex flex-col flex-1 min-h-0 overflow-hidden lg:grid lg:grid-cols-12"},Jl={class:"relative"},Ql={class:"flex gap-1.5"},Zl={class:"relative flex-1"},eu={key:0,class:"absolute left-0 right-0 z-20 mt-1 overflow-y-auto bg-white border border-gray-200 divide-y divide-gray-100 shadow-lg rounded-xl max-h-52"},tu=["onClick"],au={class:"font-semibold text-gray-900"},ru={class:"text-xs text-gray-500"},nu={class:"grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"},su={key:0,class:"flex flex-wrap gap-1.5 mb-1.5"},iu=["onClick"],ou={class:"border border-gray-200 rounded-xl bg-gray-50/70"},lu={key:0,class:"grid grid-cols-1 gap-2 px-3 pb-3 sm:grid-cols-2 lg:grid-cols-1"},uu={class:"grid grid-cols-3 gap-1.5"},cu={key:0,class:"mt-2"},du={class:"grid grid-cols-1 gap-2"},fu={class:"pt-2 mt-auto lg:hidden"},mu={class:"p-3 space-y-2.5 bg-white border-b border-gray-200 shrink-0"},pu={class:"relative"},vu={class:"flex items-center gap-1.5 overflow-x-auto no-scrollbar"},gu=["onClick"],bu={class:"flex-1 min-h-0 p-3 space-y-4 overflow-y-auto"},yu={key:0,class:"py-10 text-sm text-center text-gray-500"},hu={class:"text-xs font-bold tracking-wider text-gray-400 uppercase"},xu={class:"grid grid-cols-2 gap-2 xl:grid-cols-3"},_u=["onClick"],wu={class:"flex items-start justify-between gap-1"},ku={class:"text-xs font-semibold text-left text-gray-800 line-clamp-2"},Au={key:0,class:"px-1.5 py-0.5 text-[10px] font-bold text-white rounded-full bg-mantis-600 shrink-0 tabular-nums"},Su={class:"flex items-center justify-between w-full pt-2 mt-auto"},Cu={class:"text-xs font-bold text-mantis-700 tabular-nums"},Pu={key:0,class:"pi pi-sliders-h text-[11px] text-amber-600"},$u={key:0,class:"p-3 bg-white border-t border-gray-200 shrink-0 lg:hidden"},Ou={class:"font-extrabold tabular-nums"},Eu={class:"flex-1 min-h-0 overflow-y-auto bg-white divide-y divide-gray-200/80"},Iu={key:0,class:"flex flex-col items-center justify-center h-full p-6 text-center text-gray-400"},Nu={class:"flex-1 min-w-0"},ju={class:"flex items-center gap-1.5 min-w-0"},Fu={class:"text-xs font-semibold text-gray-900 truncate"},Tu={key:0,class:"px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-100 rounded shrink-0"},Mu={class:"text-[11px] text-gray-500 tabular-nums"},Du={class:"flex items-center gap-2 shrink-0"},Lu={class:"stepper"},zu=["onClick"],Ru=["onClick"],Wu={class:"text-xs font-bold text-right text-gray-900 w-14 tabular-nums"},Uu=["onClick"],qu={class:"p-3 space-y-2.5 bg-white border-t border-gray-200 shrink-0"},Bu={class:"flex items-center justify-between cursor-pointer select-none"},Vu={key:0,class:"p-2.5 space-y-2 rounded-xl bg-amber-50/70 border border-amber-200"},Yu={class:"flex items-center gap-2"},Hu={class:"segmented shrink-0"},Gu={class:"space-y-1 text-xs"},Ku={class:"flex justify-between text-gray-600"},Xu={class:"font-medium tabular-nums"},Ju={key:0,class:"flex justify-between text-amber-700"},Qu={class:"font-medium tabular-nums"},Zu={class:"flex justify-between pt-1.5 text-base font-extrabold text-gray-900 border-t border-gray-100"},ec={class:"text-mantis-700 tabular-nums"},tc={class:"flex gap-2 pt-1 pb-safe"},ac={key:1,class:"modal-backdrop"},rc={class:"modal-sheet w-full max-w-3xl lg:h-auto lg:max-h-[90vh]"},nc={class:"modal-header shrink-0"},sc={class:"flex items-center gap-2.5"},ic={class:"modal-title"},oc={class:"flex-1 min-h-0 p-4 space-y-4 overflow-y-auto sm:p-5"},lc={class:"grid grid-cols-1 gap-4 md:grid-cols-5"},uc={class:"space-y-3 md:col-span-2"},cc={class:"p-3.5 space-y-2 border border-gray-200 rounded-xl bg-gray-50/60"},dc={class:"font-bold text-gray-900"},fc={key:0,class:"text-xs text-gray-600"},mc={class:"text-xs text-gray-700 whitespace-pre-line"},pc={class:"pt-2 space-y-1 text-xs text-gray-600 border-t border-gray-200"},vc={key:0},gc={class:"text-mantis-700"},bc={class:"p-3.5 space-y-1.5 border border-gray-200 rounded-xl bg-white"},yc={class:"flex justify-between text-xs text-gray-600"},hc={class:"font-medium tabular-nums"},xc={key:0,class:"text-xs text-amber-700"},_c={class:"flex justify-between"},wc={key:0},kc={class:"tabular-nums"},Ac={key:0,class:"text-[11px] text-amber-600 mt-0.5"},Sc={class:"flex justify-between pt-1.5 text-base font-extrabold border-t border-gray-100"},Cc={class:"text-mantis-700 tabular-nums"},Pc={class:"md:col-span-3"},$c={key:0,class:"overflow-hidden bg-white border border-gray-200 divide-y divide-gray-100 rounded-xl"},Oc={class:"min-w-0"},Ec={class:"font-medium text-gray-900 truncate"},Ic={class:"text-xs text-gray-500 tabular-nums"},Nc={class:"font-bold text-gray-900 tabular-nums shrink-0"},jc={key:1,class:"p-6 text-sm text-center text-gray-500 border border-gray-200 rounded-xl"},Fc={class:"flex-wrap justify-between gap-2 modal-footer pb-safe"},Tc={class:"flex flex-wrap gap-2"},Mc={class:"flex flex-wrap gap-2 ml-auto"},Dc={key:2,class:"modal-backdrop"},Lc={class:"w-full max-w-md modal-sheet lg:h-auto"},zc={class:"p-4 space-y-2 max-h-[60vh] overflow-y-auto"},Rc={key:0,class:"text-xs pi pi-check text-mantis-600"},Wc=["onClick"],Uc={class:"flex items-center gap-2"},qc={key:0,class:"text-xs pi pi-check text-mantis-600"},Bc={key:3,class:"modal-backdrop z-[70]"},Vc={class:"w-full max-w-sm modal-sheet lg:h-auto"},Yc={class:"modal-header"},Hc={class:"flex items-center gap-2 modal-title"},Gc={class:"p-4 space-y-3"},Kc={class:"justify-end gap-2 modal-footer pb-safe"},ad={__name:"index",props:{orders:{type:Array,default:()=>[]},products:{type:Array,default:()=>[]},riders:{type:Array,default:()=>[]}},setup(e){const t=j(window.innerWidth<768),a=()=>{t.value=window.innerWidth<768};Nn(()=>{window.addEventListener("resize",a)}),jn(()=>{window.removeEventListener("resize",a)});const r=Fn(),i=Tn(),c=e,l=j("all"),d=j("customer"),f=j(""),p=j("all"),g=j(!1),v=o=>(Number(o)||0).toFixed(2),P=(o,n)=>o.temp_id||(o.is_manual_price?`m-${o.id}-${n}`:`p-${o.id}`),S=X(()=>{const o=c.orders||[];return{all:o.length,abierta:o.filter(n=>n.status==="abierta").length,asignada:o.filter(n=>n.status==="asignada").length,en_camino:o.filter(n=>n.status==="en_camino").length}}),D=X(()=>{const o=c.orders||[];return l.value==="all"?o:o.filter(n=>n.status===l.value)});function N(o){switch(o){case"abierta":return{label:"Abierta",badge:"bg-amber-100 text-amber-800 border-amber-200"};case"asignada":return{label:"Asignada",badge:"bg-mantis-100 text-mantis-800 border-mantis-200"};case"en_camino":return{label:"En camino",badge:"bg-gray-900 text-white border-gray-900"};case"entregada":return{label:"Entregada",badge:"bg-gray-100 text-gray-700 border-gray-200"};case"cancelada":return{label:"Cancelada",badge:"bg-red-100 text-red-700 border-red-200"};default:return{label:(o||"Pendiente").replace("_"," "),badge:"bg-gray-100 text-gray-700 border-gray-200"}}}const W=X(()=>Object.keys(ha.value||{})),b=X(()=>{const o=ha.value||{},n=f.value.trim().toLowerCase();return(p.value==="all"?Object.keys(o):o[p.value]?[p.value]:[]).map(u=>({category:u,items:(o[u]||[]).filter(y=>!n||(y.name||"").toLowerCase().includes(n))})).filter(u=>u.items.length>0)}),w=X(()=>q.value.reduce((o,n)=>o+(Number(n.quantity)||0),0)),T=X(()=>{const o={};for(const n of q.value)o[n.id]=(o[n.id]||0)+(Number(n.quantity)||0);return o}),B=X(()=>pt(mt.value,oe.value)),U=j(!1),A=j(null),ie=j("");function qe(o){A.value=o,U.value=!0}function dt(){U.value=!1,A.value=null}const ha=X(()=>{const o=c.products.reduce((u,y)=>{const C=y.category||"Sin categoría";return u[C]||(u[C]=[]),u[C].push(y),u},{}),n=Object.keys(o).sort((u,y)=>{const C=u.toLowerCase()==="sopas",z=y.toLowerCase()==="sopas";return C&&!z?-1:!C&&z?1:u.localeCompare(y)}),O={};for(const u of n)O[u]=o[u];return O}),Be=j(!1),Ve=j(!1),ft=j(null),xa=()=>({id:null,name:"",phone:"",fiscal_name:"",fiscal_ruc:"",addresses:[],selectedAddress:""}),$=j(xa()),Fe=j(""),Ye=j([]),q=j([]);let _a=null;const Te=j(!1),ce=j("amount"),Ce=j(0),Pe=j(""),oe=j(null),Qe=j(!1),jt=j(null),Ze=j(0),et=j(""),ee=j(""),Me=j(0),tt=j("");function mn(){wa(),q.value=[],Ve.value=!1,ft.value=null,et.value="",ee.value="null",Me.value=0,tt.value="",Te.value=!1,ce.value="amount",Ce.value=0,Pe.value="",oe.value=null,d.value="customer",f.value="",p.value="all",g.value=!1,Be.value=!0}function wa(){$.value=xa(),Fe.value="",Ye.value=[]}function pn(){clearTimeout(_a),Ye.value=[],!(Fe.value.length<2)&&(_a=setTimeout(async()=>{try{const o=await xe.get(_e("customers.search"),{params:{term:Fe.value}});Ye.value=o.data}catch(o){console.error("Error buscando clientes:",o)}},300))}function vn(o){$.value.id=o.id,$.value.name=o.name,$.value.phone=o.phone,$.value.fiscal_name=o.fiscal_name,$.value.fiscal_ruc=o.fiscal_ruc,$.value.addresses=o.addresses,o.addresses&&o.addresses.length>0?$.value.selectedAddress=o.addresses[0].address:$.value.selectedAddress="",Fe.value=o.name,Ye.value=[]}function gn(o){if(o.is_generic){hn(o);return}const n=q.value.find(O=>O.id===o.id&&!O.is_manual_price);n?n.quantity+=1:q.value.push({...o,quantity:1,is_manual_price:!1})}function Ft(o){const n=q.value.indexOf(o);return n!==-1?n:q.value.findIndex(O=>O.temp_id&&O.temp_id===o.temp_id||!O.temp_id&&!o.temp_id&&O.id===o.id)}function bn(o){const n=Ft(o);if(n!==-1){if(q.value[n].is_active===!1){r.add({severity:"warn",summary:"Producto inactivo",detail:`No se pueden agregar más unidades de "${q.value[n].name}" porque ya no está activo.`,life:3500});return}q.value[n].quantity+=1}}function yn(o){const n=Ft(o);n!==-1&&(q.value[n].quantity>1?q.value[n].quantity-=1:ka(o))}function ka(o){const n=Ft(o);n!==-1&&q.value.splice(n,1)}const mt=X(()=>q.value.reduce((o,n)=>o+n.price*n.quantity,0)),at=X(()=>{const o=mt.value;if(!oe.value)return o;const n=pt(o,oe.value);return o-n});function pt(o,n){return!n||n.value<=0?0:n.type==="percent"?o*Math.min(n.value,100)/100:Math.min(n.value,o)}lr([Te,ce,Ce,Pe],([o])=>{if(!o){oe.value=null,Ce.value=0,Pe.value="";return}ce.value||(ce.value="amount");const n=Number(Ce.value)||0;oe.value=n>0?{type:ce.value,value:n,reason:Pe.value||""}:null});function hn(o){jt.value=o,Ze.value=0,Qe.value=!0}function Aa(){if(Ze.value<=0){r.add({severity:"warn",summary:"Precio Inválido",detail:"El precio debe ser mayor a 0.",life:3e3});return}const o={...jt.value,price:parseFloat(Ze.value),quantity:1,is_manual_price:!0,temp_id:`manual_${Date.now()}`};q.value.push(o),Qe.value=!1}function xn(){if(!A.value)return;const o=A.value;$.value={id:o.customer_id||null,name:o.customer_name||"",phone:o.customer_phone||"",fiscal_name:o.fiscal_name||"",fiscal_ruc:o.fiscal_ruc||"",addresses:[],selectedAddress:o.delivery_address||""},q.value=(o.items||[]).map(n=>({id:n.product_id,name:n.product_name,price:parseFloat(n.price),quantity:n.quantity,is_generic:!1,is_manual_price:!1,is_active:n.is_active??!0})),o.discount_type&&o.discount_value?(Te.value=!0,ce.value=o.discount_type,Ce.value=parseFloat(o.discount_value),Pe.value=o.discount_reason||"",oe.value={type:o.discount_type,value:parseFloat(o.discount_value),reason:o.discount_reason}):(Te.value=!1,oe.value=null,Ce.value=0,Pe.value=""),et.value=o.indications||"",ee.value=o.payment_method||"cash",Me.value=parseFloat(o.cash_amount||0),tt.value=o.delivery_notes||"",g.value=!!(o.fiscal_name||o.fiscal_ruc),d.value="order",f.value="",p.value="all",Ve.value=!0,ft.value=o.id,U.value=!1,Be.value=!0}function _n(){var O,u,y;if(!$.value.name){d.value="customer",r.add({severity:"error",summary:"Error de Validación",detail:"Por favor, complete el nombre del cliente.",life:4e3});return}if(!$.value.selectedAddress){d.value="customer",r.add({severity:"error",summary:"Error de Validación",detail:"Debe ingresar una dirección de entrega.",life:4e3});return}if(q.value.length===0){d.value="menu",r.add({severity:"error",summary:"Error de Validación",detail:"Debe agregar al menos un producto a la orden.",life:4e3});return}if(!ee.value||ee.value==="null"){d.value="customer",r.add({severity:"error",summary:"Error de Validación",detail:"Debe seleccionar un método de pago.",life:4e3});return}ee.value==="cash"&&Me.value>0&&Me.value<at.value&&r.add({severity:"warn",summary:"Aviso",detail:"El efectivo recibido es menor que el total de la orden.",life:5e3});const o={customer:{id:$.value.id,name:$.value.name,phone:$.value.phone,fiscal_name:$.value.fiscal_name,fiscal_ruc:$.value.fiscal_ruc},address:$.value.selectedAddress,products:q.value.map(C=>({id:C.id,quantity:C.quantity,price:C.price,is_generic:!!C.is_generic,is_manual_price:!!C.is_manual_price})),total:at.value,discount_type:((O=oe.value)==null?void 0:O.type)||null,discount_value:((u=oe.value)==null?void 0:u.value)||0,discount_reason:((y=oe.value)==null?void 0:y.reason)||"",calculated_discount:pt(mt.value,oe.value),indications:et.value,payment_method:ee.value,cash_amount:ee.value==="cash"?Me.value:0,delivery_notes:tt.value};(Ve.value?xe.put(_e("delivery.update",{order:ft.value}),o):xe.post(_e("delivery.store"),o)).then(()=>{Be.value=!1,r.add({severity:"success",summary:"Éxito",detail:Ve.value?"Orden actualizada.":"Orden de delivery creada correctamente.",life:3e3}),setTimeout(()=>location.reload(),800)}).catch(C=>{var Y,be,ye,$e,de,fe,me;console.error("Error guardando la orden:",((Y=C.response)==null?void 0:Y.data)||C);const z=((de=($e=(ye=(be=C.response)==null?void 0:be.data)==null?void 0:ye.errors)==null?void 0:$e.products)==null?void 0:de[0])||((me=(fe=C.response)==null?void 0:fe.data)==null?void 0:me.message)||"Hubo un error al guardar la orden. Revise los datos.";r.add({severity:"error",summary:"Error",detail:z,life:4e3})})}function wn(o){i.require({group:"delivery",message:"¿Estás seguro de que deseas anular esta orden? Esta acción no se puede deshacer y también anulará cualquier factura asociada.",header:"Confirmar Anulación",icon:"pi pi-exclamation-triangle",acceptLabel:"Sí, Anular",rejectLabel:"No",accept:()=>{kn(o)},reject:()=>{r.add({severity:"info",summary:"Cancelado",detail:"La anulación de la orden fue cancelada.",life:3e3})}})}async function kn(o){var n,O,u;try{const y=await xe.post(_e("delivery.cancel",{order:o.id}));r.add({severity:"success",summary:"Éxito",detail:y.data.message,life:4e3}),dt(),setTimeout(()=>location.reload(),1e3)}catch(y){console.error("Error al anular la orden:",((n=y.response)==null?void 0:n.data)||y);const C=((u=(O=y.response)==null?void 0:O.data)==null?void 0:u.message)||"No se pudo anular la orden.";r.add({severity:"error",summary:"Error",detail:C,life:5e3})}}const Tt=j(!1),ae=j({orderId:null,rider_id:null});function Sa(o){ae.value.orderId=o.id,ae.value.rider_id=o.assigned_to??(o.rider?o.rider.id:null),Tt.value=!0}function Mt(){ae.value={orderId:null,rider_id:null},Tt.value=!1}async function An(){var o,n;if(ae.value.orderId)try{const O=await xe.put(_e("delivery.assignRider",{order:ae.value.orderId}),{rider_id:ae.value.rider_id});r.add({severity:"success",summary:"OK",detail:"Rider asignado",life:2e3});const u=((o=O.data)==null?void 0:o.order)||c.orders.find(y=>y.id===ae.value.orderId)||A.value;u&&Sn(u),setTimeout(()=>location.reload(),800),Mt()}catch(O){console.error("Error asignando rider",((n=O.response)==null?void 0:n.data)||O),r.add({severity:"error",summary:"Error",detail:"No se pudo asignar el rider",life:4e3})}}function Sn(o){var re,Ee,gt,Ca;if(!o)return;const n={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0},O=new Date().toLocaleString("es-MX",n),u="Delivery",y=o.customer_name||((re=o.customer)==null?void 0:re.name)||o.fiscal_name||"—",C=o.customer_phone||((Ee=o.customer)==null?void 0:Ee.phone)||o.phone||"—",z=o.delivery_address||o.address||((gt=o.customer)==null?void 0:gt.selectedAddress)||"—",Y=o.indications||o.delivery_notes||"",ye={cash:"Efectivo",card:"Tarjeta",bank_transfer:"Transferencia"}[o.payment_method]||o.payment_method||"—",$e=o.cash_amount||0,de=(o.items||o.order_items||[]).map(G=>{var Oa;const Dt=G.product_name||G.name||((Oa=G.product)==null?void 0:Oa.name)||"Producto",Pa=Number(G.quantity??G.qty??1),$a=Number(G.price??G.unit_price??0),On=+(Pa*$a).toFixed(2);return{name:Dt,qty:Pa,price:$a,lineSubtotal:On}}),fe=de.reduce((G,Dt)=>G+Dt.lineSubtotal,0),me=Number(o.total??fe),De=de.map(G=>`
    <tr>
      <td style="padding:4px 6px; width:30px;">${V(G.qty)}</td>
      <td style="padding:4px 6px;">${V(G.name)}</td>
      <td style="padding:4px 6px; text-align:right; width:56px;">${G.price.toFixed(2)}</td>
      <td style="padding:4px 6px; text-align:right; width:64px;">${G.lineSubtotal.toFixed(2)}</td>
    </tr>
  `).join(""),Le=typeof c<"u"&&c.riders?c.riders.find(G=>G.id===o.assigned_to):null,ze=((Ca=o.rider)==null?void 0:Ca.name)||(Le==null?void 0:Le.name)||(o.assigned_to?`Rider #${o.assigned_to}`:"—"),Oe=Number(o.discount_amount??0),M=o.discount_type||null,R=o.discount_value!=null?Number(o.discount_value):null,Q=M==="percent"?`(${R??0}%)`:"",Z=`
    <html>
      <head>
        <meta charset="utf-8">
        <title>RiderPaper - Orden #${o.id}</title>
        <style>
          body { width: 57mm; font-family: Arial, sans-serif; font-size: 12px; margin:0; padding:8px; line-height:1.2; }
          .center { text-align:center; }
          .bold { font-weight:700; }
          table { width:100%; border-collapse:collapse; margin-top:8px; font-size:12px; }
          th, td { text-align:left; border-bottom:1px solid #eee; padding:4px 6px; }
          th.right, td.right { text-align:right; }
          .small { font-size:12px; color:#333; }
          .footer { margin-top:12px; font-size:12px; text-align:center; }
          .totals { margin-top:8px; font-weight:700; }
          @media print { @page { margin:0; } body { margin:0; padding:8px; } }
        </style>
      </head>
      <body>
        <div class="center bold">Sopas Nikas</div>
        <div class="mt-2 center small">Papel Delivery</div>
        <hr>

        <p><strong>Fecha:</strong> ${V(O)}</p>
        <p><strong>Tipo:</strong> ${V(u)}</p>

        ${`<p><strong>Cliente:</strong> ${V(y)}</p>`}
        ${`<p><strong>Teléfono:</strong> ${V(C)}</p>`}
        ${`<p><strong>Dirección:</strong> ${V(z)}</p>`}
        ${Y?`<p><strong>Indicaciones:</strong> ${V(Y)}</p>`:""}
        <p><strong>Método de Pago:</strong> ${V(ye)}</p>
        ${o.payment_method==="cash"?`<p><strong>Efectivo:</strong> C$${Number($e).toFixed(2)}</p>`:""}

        <table>
          <thead>
            <tr>
              <th style="width:30px;">Cant.</th>
              <th>Producto</th>
              <th class="right" style="width:56px;">Precio</th>
              <th class="right" style="width:64px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${De}
          </tbody>
        </table>

        <div class="totals">
          <div style="display:flex; justify-content:space-between; margin-top:6px;">
            <div>Subtotal:</div><div>C$${fe.toFixed(2)}</div>
          </div>
          ${Oe>0?`
            <div style="display:flex; justify-content:space-between;">
              <div>Descuento ${V(Q)}:</div><div>-C$${Number(Oe).toFixed(2)}</div>
            </div>
            ${o.discount_reason?`<div style="display:flex; justify-content:space-between; font-size: 11px; color: #555;"><div>&nbsp;&nbsp;↳ Razón:</div><div style="text-align:right;">${V(o.discount_reason)}</div></div>`:""}
          `:""}
          <div style="display:flex; justify-content:space-between; margin-top:6px; font-weight:800;">
            <div>Total:</div><div>C$${Number(me).toFixed(2)}</div>
          </div>
        </div>

        <div class="footer">Asignado a Rider: ${V(ze)}</div>
        <div style="margin-top: 50px;">.</div>

        <script>
          window.onload = function() { try { window.print(); } catch(e) {} };
        <\/script>
      </body>
    </html>
  `,H=window.open("","_blank");if(!H){alert("Por favor permite ventanas emergentes para imprimir el RiderPaper.");return}H.document.open(),H.document.write(Z),H.document.close()}async function Cn(){try{const n=await(await fetch("/next-invoice-number")).json();ie.value=n.invoice_number}catch(o){console.error("Error al obtener número de factura:",o),r.add({severity:"error",summary:"Error",detail:"No se pudo obtener el número de factura.",life:3e3})}}async function vt(o,n){var O,u,y;if(!(!o||!o.id))try{const C=await xe.put(_e("delivery.updateStatus",{order:o.id}),{status:n});r.add({severity:"success",summary:"OK",detail:"Estado actualizado",life:2e3});let z=null;try{const Y=await xe.get(_e("delivery.show",{order:o.id}));z=((O=Y.data)==null?void 0:O.order)||Y.data}catch(Y){console.warn("No se pudo obtener la orden completa tras cambiar estado, usando datos locales.",Y),z=((u=C.data)==null?void 0:u.order)||{...o,status:n}}n==="en_camino"&&(await Pn(z),window.location.reload()),n==="entregada"&&window.location.reload()}catch(C){console.error("Error cambiando estado",((y=C.response)==null?void 0:y.data)||C),r.add({severity:"error",summary:"Error",detail:"No se pudo cambiar el estado",life:4e3})}}async function Pn(o){var me,De,Le,ze,Oe;if(!o||!o.id){console.warn("generateDeliveryInvoice: faltó pasar la orden");return}if(!o.items||!o.items.length)try{const M=await xe.get(_e("delivery.show",{order:o.id}));o=((me=M.data)==null?void 0:me.order)||M.data||o}catch(M){console.warn("No se pudo obtener orden completa dentro de generateDeliveryInvoice, se continúa con lo disponible.",M)}if(ie.value||await Cn(),!ie.value){r.add({severity:"error",summary:"Error",detail:"No se obtuvo número de factura.",life:4e3});return}const n=A.value&&A.value.id===o.id?A.value:o,O=n.items||n.order_items||[],u=O.reduce((M,R)=>{const Q=Number(R.price??R.unit_price??0),Z=Number(R.quantity??R.qty??1);return M+Q*Z},0),y=n.discount_type||null,C=n.discount_value!=null?Number(n.discount_value):0;let z=Number(n.discount_amount??0);if((!z||z===0)&&y&&C)try{z=pt(u,{type:y==="percent"?"percent":"amount",value:C})}catch{z=y==="percent"?u*C/100:C}const Y=n.subtotal!=null?Number(n.subtotal):Number(u.toFixed(2)),be=z||0,ye=n.total!=null?Number(n.total):Number((Y-be).toFixed(2)),$e=n.fiscal_name||n.customer&&n.customer.fiscal_name||"",de=n.fiscal_ruc||n.customer&&n.customer.fiscal_ruc||"",fe={invoice_number:ie.value,order_id:n.id,fiscal_name:$e,fiscal_ruc:de,subtotal:Y,discount_type:y,discount_value:C,discount_reason:n.discount_reason||"",discount_amount:be,total:ye};try{const M=await xe.post(_e("invoices.delivery.store"),fe),R=((De=M.data)==null?void 0:De.invoice_number)||ie.value;ie.value="";let Q=((Le=M.data)==null?void 0:Le.invoice)??M.data;(!Q||!Q.items)&&(Q={invoice_number:R,created_at:new Date().toISOString(),order_id:n.id,fiscal_name:$e,fiscal_ruc:de,customer_name:n.customer_name||n.customer&&n.customer.name||"",customer_phone:n.customer_phone||n.customer&&n.customer.phone||"",delivery_address:n.delivery_address||n.address||"",items:O.map(re=>{var Ee;return{product_name:re.product_name||re.name||((Ee=re.product)==null?void 0:Ee.name)||"Producto",quantity:Number(re.quantity??re.qty??1),price:Number(re.price??re.unit_price??0)}}),subtotal:Y,discount_amount:be,discount_type:y,discount_value:C,discount_reason:n.discount_reason||"",total:ye,payment_method:n.payment_method||"",cash_amount:n.cash_amount||0,rider_name:n.rider_name||(n.assigned_to?`Rider #${n.assigned_to}`:"")});const Z=$n(Q),H=window.open("","_blank");return H?(H.document.open(),H.document.write(Z),H.document.close(),r.add({severity:"success",summary:"Éxito",detail:"Factura generada e impresa.",life:3e3}),M.data):(r.add({severity:"warn",summary:"Aviso",detail:"Permita ventanas emergentes para imprimir la factura.",life:4e3}),M.data)}catch(M){console.error("Error al generar factura de delivery:",M);const R=(ze=M==null?void 0:M.response)==null?void 0:ze.data;if(R!=null&&R.errors){const Q=Object.values(R.errors).flat().join(" — ");r.add({severity:"error",summary:"Validación",detail:Q,life:6e3})}else{const Q=(R==null?void 0:R.message)||(typeof R=="string"?R:null)||((Oe=M==null?void 0:M.response)==null?void 0:Oe.statusText)||"No se pudo generar la factura de entrega.";r.add({severity:"error",summary:"Error",detail:Q,life:5e3})}return null}}function rt(o){return Number(o??0).toFixed(2)}function V(o){return o==null?"":String(o).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function $n(o){var ze,Oe,M,R,Q;if(!o)return"";const n={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0},O=new Date(o.created_at||Date.now()).toLocaleString("es-MX",n),u=o.items||o.order_items||o.products||[],y=u.map(Z=>{const H=Z.product_name||Z.name||Z.description||"Producto",re=Number(Z.quantity??Z.qty??1),Ee=Number(Z.price??Z.unit_price??0),gt=re*Ee;return`
      <tr>
        <td style="padding:6px 4px; width:32px;">${re}</td>
        <td style="padding:6px 4px;">${V(H)}</td>
        <td style="padding:6px 4px; text-align:right; width:60px;">${rt(Ee)}</td>
        <td style="padding:6px 4px; text-align:right; width:70px;">${rt(gt)}</td>
      </tr>
    `}).join(""),C=Number(o.subtotal??u.reduce((Z,H)=>Z+Number(H.price??H.unit_price??0)*Number(H.quantity??H.qty??1),0)),z=Number(o.discount_amount??o.discount??0),Y=o.discount_type||(o.discount_percent?"percent":o.discount_amount?"amount":null),be=o.discount_value??o.discount_percent??null,ye=Number(o.total??C-z);({cash:"Efectivo",card:"Tarjeta",bank_transfer:"Transferencia"})[o.payment_method]||o.payment_method,Number(o.cash_amount??0);const de=Y==="percent"?`(${be??0}%)`:"",fe=o.fiscal_name||((ze=o.customer)==null?void 0:ze.fiscal_name)||"",me=o.fiscal_ruc||((Oe=o.customer)==null?void 0:Oe.fiscal_ruc)||"",De=o.customer_name||((M=o.customer)==null?void 0:M.name)||"";return o.customer_phone||(R=o.customer)!=null&&R.phone,o.delivery_address||o.address||(Q=o.customer)!=null&&Q.selectedAddress,`
    <html>
  <head>
    <meta charset="utf-8"/>
    <title>Factura N° ${V(String(o.invoice_number||o.invoiceNumber||"—"))}</title>
    <style>
      body { width: 57mm; font-size: 14px; margin: 0; padding: 4px; font-family: Arial, sans-serif; line-height: 1.2; color: #111; }
      .center { text-align: center; }
      .bold { font-weight: bold; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 6px; }
      th, td { text-align: left; padding: 2px 0; }
      th { border-bottom: 1px solid #000; } /* línea negra debajo del encabezado */
      td { border-bottom: 1px solid #ddd; } /* líneas finas grises en los productos */
      .right { text-align: right; }
      .total { text-align: right; font-weight: bold; font-size: 14px; margin-top: 6px; }
      .footer { margin-top: 16px; font-size: 14px; text-align: center; color: black; }
      img { max-width: 50%; height: auto; }
      .muted { color: #666; font-size: 11px; }
      @media print { 
        html, body { width: 57mm; max-height: 300mm; overflow: hidden; margin: 0; padding: 0; } 
      }
    </style>
  </head>
  <body>
    <!-- Logo -->
    <div class="center">
      <img src="/images/SopasLogo.png" alt="Logo" />
    </div>

    <!-- Encabezado -->
    <div class="center space">
      <p class="bold">Sopas Nikas</p>
      <p><strong>Dirección: Del Busto José Martí 2 cuadras al Este, 10 vrs al Norte.</strong></p>
      <p>Teléfono: +505 8352 9705</p>
       
      <p><strong>Factura N°:</strong> ${V(String(o.invoice_number||o.invoiceNumber||"—"))}</p>
     
    </div>

    <hr>

    <!-- Datos de factura -->
    <p><strong>Fecha:</strong> ${O}</p>
    ${De?`<p><strong>Cliente:</strong> ${V(De)}</p>`:""}
    ${fe?`<p><strong>Nombre Fiscal:</strong> ${V(fe)}</p>`:""}
    ${me?`<p><strong>RUC:</strong> ${V(me)}</p>`:""}
    
    
   

    <!-- Tabla de productos -->
    <table>
      <thead>
        <tr>
          <th>Cant.</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${y}
      </tbody>
    </table>

    <!-- Totales -->
    <div class="total">Subtotal: C$${rt(C)}</div>
    ${z>0?`
      <div class="total">Descuento ${de}: -C$${rt(z)}</div>
      ${o.discount_reason?'<div class="muted"></div>':""}
    `:""}
    <div class="total">Total: C$${rt(ye)}</div>

    

    <!-- Footer -->
    <div class="footer">
      <strong>¡Gracias por tu compra!</strong>
    </div>
     
    <div style="margin-top: 50px;">.</div>
    
    <script>
      window.onload = () => window.print();
    <\/script>
  </body>
</html>


  `}return(o,n)=>(h(),Mn(Rn,{title:"Delivery"},{header:Lt(()=>[bt(Wn)]),default:Lt(()=>{var O;return[bt(yt(Un)),bt(yt(qn),{group:"delivery"},{container:Lt(({message:u,acceptCallback:y,rejectCallback:C})=>[s("div",cl,[s("div",dl,[s("div",fl,[s("span",{class:F(["flex items-center justify-center w-10 h-10 rounded-xl shrink-0",["anul","cancel","elimin"].some(z=>((u==null?void 0:u.header)||"").toLowerCase().includes(z))?"bg-red-100 text-red-600":"bg-mantis-100 text-mantis-700"])},[s("i",{class:F([(u==null?void 0:u.icon)||"pi pi-question-circle","text-lg"])},null,2)],2),s("h3",ml,_((u==null?void 0:u.header)||"Confirmación"),1)])]),s("div",pl,[s("p",vl,_(u==null?void 0:u.message),1)]),s("div",gl,[s("button",{type:"button",onClick:C,class:"btn btn-outline min-w-[7rem] h-11 px-5"},_((u==null?void 0:u.rejectLabel)||"No"),9,bl),s("button",{type:"button",onClick:y,class:F(["btn min-w-[7.5rem] h-11 px-5",["anul","cancel","elimin"].some(z=>((u==null?void 0:u.header)||"").toLowerCase().includes(z))?"btn-danger":"btn-primary"])},_((u==null?void 0:u.acceptLabel)||"Sí"),11,yl)])])]),_:1}),s("div",hl,[s("div",{class:"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"},[n[43]||(n[43]=s("div",null,[s("h1",{class:"text-xl font-bold text-gray-900 sm:text-2xl"},"Órdenes Delivery"),s("p",{class:"text-xs text-gray-500"},"Gestiona pedidos activos, motorizados y facturación")],-1)),s("button",{onClick:mn,class:"w-full btn btn-primary sm:w-auto"},n[42]||(n[42]=[s("i",{class:"text-xs pi pi-plus"},null,-1),s("span",null,"Nueva orden",-1)]))]),s("div",xl,[s("button",{onClick:n[0]||(n[0]=u=>l.value="all"),class:F(["pill shrink-0",l.value==="all"?"pill-active":""])}," Todas ("+_(S.value.all)+") ",3),s("button",{onClick:n[1]||(n[1]=u=>l.value="abierta"),class:F(["pill shrink-0",l.value==="abierta"?"pill-active":""])}," Abiertas ("+_(S.value.abierta)+") ",3),s("button",{onClick:n[2]||(n[2]=u=>l.value="asignada"),class:F(["pill shrink-0",l.value==="asignada"?"pill-active":""])}," Asignadas ("+_(S.value.asignada)+") ",3),s("button",{onClick:n[3]||(n[3]=u=>l.value="en_camino"),class:F(["pill shrink-0",l.value==="en_camino"?"pill-active":""])}," En camino ("+_(S.value.en_camino)+") ",3)]),D.value.length===0?(h(),x("div",_l,[n[44]||(n[44]=s("i",{class:"text-3xl text-gray-300 pi pi-truck"},null,-1)),n[45]||(n[45]=s("p",{class:"mt-2 text-sm font-medium text-gray-600"},"No hay órdenes en esta vista",-1)),l.value!=="all"?(h(),x("button",{key:0,onClick:n[4]||(n[4]=u=>l.value="all"),class:"mt-3 text-xs btn btn-secondary"}," Ver todas las órdenes ")):E("",!0)])):(h(),x("div",wl,[(h(!0),x(pe,null,ve(D.value,u=>(h(),x("div",{key:u.id,onClick:y=>qe(u),class:"flex flex-col justify-between p-4 transition cursor-pointer card hover:shadow-md hover:border-mantis-300 active:scale-[0.99]"},[s("div",null,[s("div",Al,[s("div",Sl,[s("span",Cl,"#"+_(u.id),1),s("span",{class:F(["px-2 py-0.5 text-[11px] font-semibold border rounded-full",N(u.status).badge])},_(N(u.status).label),3)]),s("span",Pl," C$"+_(v(u.total)),1)]),s("div",$l,[s("div",Ol,[s("p",El,_(u.customer_name||"Sin cliente"),1),u.customer_phone?(h(),x("span",Il,[n[46]||(n[46]=s("i",{class:"pi pi-phone text-[10px] mr-0.5"},null,-1)),he(_(u.customer_phone),1)])):E("",!0)]),s("p",Nl,[n[47]||(n[47]=s("i",{class:"pi pi-map-marker text-[10px] mr-1 text-gray-400"},null,-1)),he(_(u.delivery_address||"Sin dirección"),1)])]),u.items&&u.items.length?(h(),x("div",jl,[(h(!0),x(pe,null,ve(u.items.slice(0,3),(y,C)=>(h(),x("span",{key:C,class:"px-2 py-0.5 text-[11px] font-medium text-gray-700 bg-gray-100 rounded-md truncate max-w-[180px]"},_(y.quantity)+"× "+_(y.product_name),1))),128)),u.items.length>3?(h(),x("span",Fl," +"+_(u.items.length-3)+" más ",1)):E("",!0)])):E("",!0)]),s("div",{class:"flex items-center justify-between gap-2 pt-3 mt-3 border-t border-gray-100",onClick:n[5]||(n[5]=Dn(()=>{},["stop"]))},[s("button",{onClick:y=>Sa(u),class:F(["inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition",u.rider_name?"bg-mantis-50 text-mantis-800 hover:bg-mantis-100":"bg-gray-100 text-gray-600 hover:bg-gray-200"])},[n[48]||(n[48]=s("i",{class:"pi pi-user text-[11px]"},null,-1)),s("span",Ml,_(u.rider_name||"Asignar rider"),1)],10,Tl),s("div",Dl,[u.status==="asignada"?(h(),x("button",{key:0,onClick:y=>vt(u,"en_camino"),class:"btn btn-primary py-1.5 px-2.5 text-xs"}," En camino ",8,Ll)):u.status==="en_camino"?(h(),x("button",{key:1,onClick:y=>vt(u,"entregada"),class:"btn btn-primary py-1.5 px-2.5 text-xs"}," Entregada ",8,zl)):E("",!0),s("button",{onClick:y=>qe(u),class:"btn btn-outline py-1.5 px-2.5 text-xs"}," Detalle ",8,Rl)])])],8,kl))),128))]))]),Be.value?(h(),x("div",Wl,[s("div",Ul,[s("div",ql,[s("div",Bl,[s("h2",Vl,_(Ve.value?`Editar Orden #${ft.value}`:"Nueva Orden Delivery"),1),s("span",Yl," C$"+_(v(at.value)),1)]),s("button",{onClick:n[6]||(n[6]=u=>Be.value=!1),class:"icon-btn","aria-label":"Cerrar"},n[49]||(n[49]=[s("i",{class:"text-sm pi pi-times"},null,-1)]))]),s("div",Hl,[s("button",{onClick:n[7]||(n[7]=u=>d.value="customer"),class:F(["tab",d.value==="customer"?"tab-active":""])},[n[50]||(n[50]=s("i",{class:"text-xs pi pi-user"},null,-1)),n[51]||(n[51]=s("span",null,"Cliente",-1)),$.value.name?(h(),x("span",Gl)):E("",!0)],2),s("button",{onClick:n[8]||(n[8]=u=>d.value="menu"),class:F(["tab",d.value==="menu"?"tab-active":""])},n[52]||(n[52]=[s("i",{class:"text-xs pi pi-th-large"},null,-1),s("span",null,"Menú",-1)]),2),s("button",{onClick:n[9]||(n[9]=u=>d.value="order"),class:F(["tab",d.value==="order"?"tab-active":""])},[n[53]||(n[53]=s("i",{class:"text-xs pi pi-shopping-cart"},null,-1)),n[54]||(n[54]=s("span",null,"Orden",-1)),w.value>0?(h(),x("span",Kl,_(w.value),1)):E("",!0)],2)]),s("div",Xl,[s("div",{class:F(["flex-col min-h-0 p-4 space-y-3 overflow-y-auto border-gray-200 lg:col-span-4 lg:border-r lg:flex",d.value==="customer"?"flex flex-1":"hidden"])},[s("div",Jl,[n[57]||(n[57]=s("label",{class:"label"},"Buscar cliente existente",-1)),s("div",Ql,[s("div",Zl,[n[55]||(n[55]=s("i",{class:"absolute text-xs text-gray-400 -translate-y-1/2 pointer-events-none pi pi-search left-3 top-1/2"},null,-1)),te(s("input",{"onUpdate:modelValue":n[10]||(n[10]=u=>Fe.value=u),onInput:pn,type:"text",placeholder:"Nombre o teléfono...",class:"pl-8 input"},null,544),[[ne,Fe.value]])]),$.value.id||Fe.value?(h(),x("button",{key:0,onClick:wa,type:"button",class:"px-3 btn btn-secondary shrink-0",title:"Limpiar cliente"},n[56]||(n[56]=[s("i",{class:"text-xs pi pi-times"},null,-1)]))):E("",!0)]),Ye.value.length>0?(h(),x("ul",eu,[(h(!0),x(pe,null,ve(Ye.value,u=>(h(),x("li",{key:u.id,onClick:y=>vn(u),class:"px-3 py-2.5 text-sm cursor-pointer hover:bg-mantis-50"},[s("p",au,_(u.name),1),s("p",ru,_(u.phone||"Sin teléfono"),1)],8,tu))),128))])):E("",!0)]),s("div",nu,[s("div",null,[n[58]||(n[58]=s("label",{class:"label"},"Nombre *",-1)),te(s("input",{"onUpdate:modelValue":n[11]||(n[11]=u=>$.value.name=u),type:"text",placeholder:"Nombre completo",class:"input"},null,512),[[ne,$.value.name]])]),s("div",null,[n[59]||(n[59]=s("label",{class:"label"},"Teléfono",-1)),te(s("input",{"onUpdate:modelValue":n[12]||(n[12]=u=>$.value.phone=u),type:"text",inputmode:"tel",placeholder:"8888-8888",class:"input"},null,512),[[ne,$.value.phone]])])]),s("div",null,[n[60]||(n[60]=s("label",{class:"label"},"Dirección de entrega *",-1)),$.value.addresses&&$.value.addresses.length?(h(),x("div",su,[(h(!0),x(pe,null,ve($.value.addresses,(u,y)=>(h(),x("button",{key:u.id||y,type:"button",onClick:C=>$.value.selectedAddress=u.address,class:F(["px-2.5 py-1 text-xs font-medium rounded-lg border transition text-left",$.value.selectedAddress===u.address?"bg-mantis-50 border-mantis-500 text-mantis-800":"bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"])},_(u.address),11,iu))),128))])):E("",!0),te(s("textarea",{"onUpdate:modelValue":n[13]||(n[13]=u=>$.value.selectedAddress=u),rows:"2",placeholder:"Dirección exacta y referencias...",class:"resize-none input"},null,512),[[ne,$.value.selectedAddress]])]),s("div",ou,[s("button",{type:"button",onClick:n[14]||(n[14]=u=>g.value=!g.value),class:"flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-700"},[n[61]||(n[61]=s("span",null,"Datos fiscales (Opcional)",-1)),s("i",{class:F([g.value?"pi pi-chevron-up":"pi pi-chevron-down","text-[11px]"])},null,2)]),g.value?(h(),x("div",lu,[te(s("input",{"onUpdate:modelValue":n[15]||(n[15]=u=>$.value.fiscal_name=u),type:"text",placeholder:"Nombre fiscal / Razón social",class:"input"},null,512),[[ne,$.value.fiscal_name]]),te(s("input",{"onUpdate:modelValue":n[16]||(n[16]=u=>$.value.fiscal_ruc=u),type:"text",placeholder:"RUC / Cédula",class:"input"},null,512),[[ne,$.value.fiscal_ruc]])])):E("",!0)]),s("div",null,[n[66]||(n[66]=s("label",{class:"label"},"Método de pago *",-1)),s("div",uu,[s("button",{type:"button",onClick:n[17]||(n[17]=u=>ee.value="cash"),class:F(["flex flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition border rounded-xl",ee.value==="cash"?"bg-mantis-50 border-mantis-500 text-mantis-800":"bg-white border-gray-200 text-gray-600 hover:bg-gray-50"])},n[62]||(n[62]=[s("i",{class:"text-sm pi pi-money-bill"},null,-1),s("span",null,"Efectivo",-1)]),2),s("button",{type:"button",onClick:n[18]||(n[18]=u=>ee.value="card"),class:F(["flex flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition border rounded-xl",ee.value==="card"?"bg-mantis-50 border-mantis-500 text-mantis-800":"bg-white border-gray-200 text-gray-600 hover:bg-gray-50"])},n[63]||(n[63]=[s("i",{class:"text-sm pi pi-credit-card"},null,-1),s("span",null,"Tarjeta",-1)]),2),s("button",{type:"button",onClick:n[19]||(n[19]=u=>ee.value="bank_transfer"),class:F(["flex flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition border rounded-xl",ee.value==="bank_transfer"?"bg-mantis-50 border-mantis-500 text-mantis-800":"bg-white border-gray-200 text-gray-600 hover:bg-gray-50"])},n[64]||(n[64]=[s("i",{class:"text-sm pi pi-building-columns"},null,-1),s("span",null,"Transf.",-1)]),2)]),ee.value==="cash"?(h(),x("div",cu,[n[65]||(n[65]=s("label",{class:"label"},"Con cuánto paga (C$)",-1)),te(s("input",{"onUpdate:modelValue":n[20]||(n[20]=u=>Me.value=u),type:"number",step:"0.01",min:"0",placeholder:"0.00",class:"input"},null,512),[[ne,Me.value,void 0,{number:!0}]])])):E("",!0)]),s("div",du,[s("div",null,[n[67]||(n[67]=s("label",{class:"label"},"Indicaciones de cocina / orden",-1)),te(s("input",{"onUpdate:modelValue":n[21]||(n[21]=u=>et.value=u),type:"text",placeholder:"Ej: Sin cebolla, cubiertos...",class:"input"},null,512),[[ne,et.value]])]),s("div",null,[n[68]||(n[68]=s("label",{class:"label"},"Notas para el motorizado",-1)),te(s("input",{"onUpdate:modelValue":n[22]||(n[22]=u=>tt.value=u),type:"text",placeholder:"Ej: Casa portón verde, llamar al llegar...",class:"input"},null,512),[[ne,tt.value]])])]),s("div",fu,[s("button",{onClick:n[23]||(n[23]=u=>d.value="menu"),type:"button",class:"w-full btn btn-primary"},n[69]||(n[69]=[s("span",null,"Continuar al menú",-1),s("i",{class:"text-xs pi pi-arrow-right"},null,-1)]))])],2),s("div",{class:F(["flex-col min-h-0 border-gray-200 lg:col-span-4 xl:col-span-5 lg:border-r lg:flex",d.value==="menu"?"flex flex-1":"hidden"])},[s("div",mu,[s("div",pu,[n[71]||(n[71]=s("i",{class:"absolute text-xs text-gray-400 -translate-y-1/2 pointer-events-none pi pi-search left-3 top-1/2"},null,-1)),te(s("input",{"onUpdate:modelValue":n[24]||(n[24]=u=>f.value=u),type:"text",placeholder:"Buscar producto...",class:"pl-8 pr-8 input"},null,512),[[ne,f.value]]),f.value?(h(),x("button",{key:0,onClick:n[25]||(n[25]=u=>f.value=""),type:"button",class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"},n[70]||(n[70]=[s("i",{class:"text-xs pi pi-times"},null,-1)]))):E("",!0)]),s("div",vu,[s("button",{onClick:n[26]||(n[26]=u=>p.value="all"),type:"button",class:F(["pill shrink-0",p.value==="all"?"pill-active":""])}," Todos ",2),(h(!0),x(pe,null,ve(W.value,u=>(h(),x("button",{key:u,onClick:y=>p.value=u,type:"button",class:F(["pill shrink-0",p.value===u?"pill-active":""])},_(u),11,gu))),128))])]),s("div",bu,[b.value.length===0?(h(),x("div",yu," No se encontraron productos ")):E("",!0),(h(!0),x(pe,null,ve(b.value,u=>(h(),x("div",{key:u.category,class:"space-y-2"},[s("h4",hu,_(u.category),1),s("div",xu,[(h(!0),x(pe,null,ve(u.items,y=>(h(),x("button",{key:y.id,onClick:C=>gn(y),type:"button",class:F(["product-tile",T.value[y.id]?"border-mantis-400 bg-mantis-50/40":""])},[s("div",wu,[s("span",ku,_(y.name),1),T.value[y.id]?(h(),x("span",Au,_(T.value[y.id]),1)):E("",!0)]),s("div",Su,[s("span",Cu,_(y.is_generic?"Precio manual":`C$${v(y.price)}`),1),y.is_generic?(h(),x("i",Pu)):E("",!0)])],10,_u))),128))])]))),128))]),w.value>0?(h(),x("div",$u,[s("button",{onClick:n[27]||(n[27]=u=>d.value="order"),type:"button",class:"justify-between w-full btn btn-primary"},[s("span",null,"Ver orden ("+_(w.value)+")",1),s("span",Ou,"C$"+_(v(at.value)),1)])])):E("",!0)],2),s("div",{class:F(["flex-col min-h-0 bg-gray-50/60 lg:col-span-4 xl:col-span-3 lg:flex",d.value==="order"?"flex flex-1":"hidden"])},[s("div",Eu,[q.value.length===0?(h(),x("div",Iu,n[72]||(n[72]=[s("i",{class:"pi pi-shopping-bag text-2xl mb-1.5"},null,-1),s("p",{class:"text-xs"},"Agrega productos del menú",-1)]))):E("",!0),(h(!0),x(pe,null,ve(q.value,(u,y)=>(h(),x("div",{key:P(u,y),class:"flex items-center justify-between gap-2 px-3 py-2"},[s("div",Nu,[s("div",ju,[s("p",Fu,_(u.name),1),u.is_active===!1?(h(),x("span",Tu,"Inactivo")):E("",!0)]),s("p",Mu,"C$"+_(v(u.price))+" c/u",1)]),s("div",Du,[s("div",Lu,[s("button",{onClick:C=>yn(u),type:"button","aria-label":"Disminuir"},n[73]||(n[73]=[s("i",{class:"pi pi-minus text-[10px]"},null,-1)]),8,zu),s("span",null,_(u.quantity),1),s("button",{onClick:C=>bn(u),class:F(u.is_active===!1?"!opacity-45":""),type:"button","aria-label":"Aumentar"},n[74]||(n[74]=[s("i",{class:"pi pi-plus text-[10px]"},null,-1)]),10,Ru)]),s("span",Wu," C$"+_(v(u.price*u.quantity)),1),s("button",{onClick:C=>ka(u),type:"button",class:"p-1 text-gray-400 transition hover:text-red-600",title:"Quitar"},n[75]||(n[75]=[s("i",{class:"text-xs pi pi-trash"},null,-1)]),8,Uu)])]))),128))]),s("div",qu,[s("label",Bu,[n[76]||(n[76]=s("span",{class:"text-xs font-semibold text-gray-700 flex items-center gap-1.5"},[s("i",{class:"pi pi-percentage text-[11px] text-amber-600"}),he(" Aplicar descuento ")],-1)),te(s("input",{"onUpdate:modelValue":n[28]||(n[28]=u=>Te.value=u),type:"checkbox",class:"checkbox"},null,512),[[Ln,Te.value]])]),Te.value?(h(),x("div",Vu,[s("div",Yu,[s("div",Hu,[s("button",{type:"button",onClick:n[29]||(n[29]=u=>ce.value="amount"),class:F(ce.value==="amount"?"bg-white shadow-sm text-gray-900":"")},"C$",2),s("button",{type:"button",onClick:n[30]||(n[30]=u=>ce.value="percent"),class:F(ce.value==="percent"?"bg-white shadow-sm text-gray-900":"")},"%",2)]),te(s("input",{"onUpdate:modelValue":n[31]||(n[31]=u=>Ce.value=u),type:"number",min:"0",step:"0.01",placeholder:"Valor",class:"input flex-1 py-1.5 text-xs"},null,512),[[ne,Ce.value,void 0,{number:!0}]])]),te(s("input",{"onUpdate:modelValue":n[32]||(n[32]=u=>Pe.value=u),type:"text",placeholder:"Motivo del descuento (opcional)",class:"input py-1.5 text-xs"},null,512),[[ne,Pe.value]])])):E("",!0),s("div",Gu,[s("div",Ku,[n[77]||(n[77]=s("span",null,"Subtotal",-1)),s("span",Xu,"C$"+_(v(mt.value)),1)]),B.value>0?(h(),x("div",Ju,[n[78]||(n[78]=s("span",null,"Descuento",-1)),s("span",Qu,"-C$"+_(v(B.value)),1)])):E("",!0),s("div",Zu,[n[79]||(n[79]=s("span",null,"Total",-1)),s("span",ec,"C$"+_(v(at.value)),1)])]),s("div",tc,[s("button",{onClick:n[33]||(n[33]=u=>Be.value=!1),type:"button",class:"flex-1 btn btn-secondary"}," Cancelar "),s("button",{onClick:_n,type:"button",class:"btn btn-primary flex-[2]"},[n[80]||(n[80]=s("i",{class:"text-xs pi pi-check"},null,-1)),s("span",null,_(Ve.value?"Actualizar":"Crear Orden"),1)])])])],2)])])])):E("",!0),U.value&&A.value?(h(),x("div",ac,[s("div",rc,[s("div",nc,[s("div",sc,[s("h3",ic,"Orden #"+_(A.value.id),1),s("span",{class:F(["px-2.5 py-0.5 text-xs font-semibold border rounded-full",N(A.value.status).badge])},_(N(A.value.status).label),3)]),s("button",{onClick:dt,class:"icon-btn"},n[81]||(n[81]=[s("i",{class:"text-sm pi pi-times"},null,-1)]))]),s("div",oc,[s("div",lc,[s("div",uc,[s("div",cc,[n[88]||(n[88]=s("p",{class:"text-[11px] font-bold tracking-wider text-gray-400 uppercase"},"Cliente",-1)),s("p",dc,_(A.value.customer_name),1),A.value.customer_phone?(h(),x("p",fc,[n[82]||(n[82]=s("i",{class:"pi pi-phone text-[10px] mr-1"},null,-1)),he(_(A.value.customer_phone),1)])):E("",!0),s("p",mc,[n[83]||(n[83]=s("i",{class:"pi pi-map-marker text-[10px] mr-1 text-gray-400"},null,-1)),he(_(A.value.delivery_address),1)]),s("div",pc,[s("p",null,[n[84]||(n[84]=s("span",{class:"text-gray-400"},"Fiscal:",-1)),he(" "+_(A.value.fiscal_name||"—"),1)]),s("p",null,[n[85]||(n[85]=s("span",{class:"text-gray-400"},"RUC:",-1)),he(" "+_(A.value.fiscal_ruc||"—"),1)]),A.value.rider_name?(h(),x("p",vc,[n[86]||(n[86]=s("span",{class:"text-gray-400"},"Rider:",-1)),n[87]||(n[87]=he()),s("strong",gc,_(A.value.rider_name),1)])):E("",!0)])]),s("div",bc,[n[92]||(n[92]=s("p",{class:"text-[11px] font-bold tracking-wider text-gray-400 uppercase"},"Resumen",-1)),s("div",yc,[n[89]||(n[89]=s("span",null,"Subtotal",-1)),s("span",hc," C$"+_(v(A.value.subtotal??(A.value.items?A.value.items.reduce((u,y)=>u+(parseFloat(y.price)||0)*y.quantity,0):0))),1)]),A.value.discount_amount&&A.value.discount_amount>0?(h(),x("div",xc,[s("div",_c,[s("span",null,[n[90]||(n[90]=he("Descuento")),A.value.discount_type==="percent"?(h(),x("span",wc," ("+_(A.value.discount_value)+"%)",1)):E("",!0)]),s("span",kc,"-C$"+_(v(A.value.discount_amount)),1)]),A.value.discount_reason?(h(),x("p",Ac," Motivo: "+_(A.value.discount_reason),1)):E("",!0)])):E("",!0),s("div",Sc,[n[91]||(n[91]=s("span",null,"Total",-1)),s("span",Cc,"C$"+_(v(A.value.total)),1)])])]),s("div",Pc,[n[93]||(n[93]=s("p",{class:"mb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase"},"Productos",-1)),A.value.items&&A.value.items.length?(h(),x("div",$c,[(h(!0),x(pe,null,ve(A.value.items,(u,y)=>(h(),x("div",{key:y,class:"flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm"},[s("div",Oc,[s("p",Ec,_(u.product_name),1),s("p",Ic,_(u.quantity)+" × C$"+_(v(u.price)),1)]),s("span",Nc," C$"+_(v(parseFloat(u.price)*u.quantity)),1)]))),128))])):(h(),x("p",jc," No hay items cargados. "))])])]),s("div",Fc,[s("div",Tc,[s("button",{onClick:xn,class:"text-xs btn btn-outline"},n[94]||(n[94]=[s("i",{class:"text-xs pi pi-pencil"},null,-1),s("span",null,"Editar",-1)])),A.value.status!=="entregada"&&A.value.status!=="cancelada"?(h(),x("button",{key:0,onClick:n[34]||(n[34]=u=>wn(A.value)),class:"text-xs btn btn-danger"},n[95]||(n[95]=[s("i",{class:"text-xs pi pi-ban"},null,-1),s("span",null,"Anular",-1)]))):E("",!0)]),s("div",Mc,[s("button",{onClick:n[35]||(n[35]=u=>Sa(A.value)),class:"text-xs btn btn-secondary"},[n[96]||(n[96]=s("i",{class:"text-xs pi pi-user"},null,-1)),s("span",null,_(A.value.rider_name?"Cambiar Rider":"Asignar Rider"),1)]),A.value.status==="asignada"?(h(),x("button",{key:0,onClick:n[36]||(n[36]=u=>vt(A.value,"en_camino")),class:"text-xs btn btn-primary"}," Marcar En Camino ")):E("",!0),A.value.status==="en_camino"?(h(),x("button",{key:1,onClick:n[37]||(n[37]=u=>vt(A.value,"entregada")),class:"text-xs btn btn-primary"}," Marcar Entregada ")):E("",!0)])])])])):E("",!0),Tt.value?(h(),x("div",Dc,[s("div",Lc,[s("div",{class:"modal-header"},[n[98]||(n[98]=s("h3",{class:"modal-title"},"Asignar Motorizado",-1)),s("button",{onClick:Mt,class:"icon-btn"},n[97]||(n[97]=[s("i",{class:"text-sm pi pi-times"},null,-1)]))]),s("div",zc,[s("button",{type:"button",onClick:n[38]||(n[38]=u=>ae.value.rider_id=null),class:F(["flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium border rounded-xl transition",ae.value.rider_id===null?"border-mantis-500 bg-mantis-50 text-mantis-800":"border-gray-200 hover:bg-gray-50 text-gray-700"])},[n[99]||(n[99]=s("span",null,"Sin asignar",-1)),ae.value.rider_id===null?(h(),x("i",Rc)):E("",!0)],2),(h(!0),x(pe,null,ve(c.riders,u=>(h(),x("button",{key:u.id,type:"button",onClick:y=>ae.value.rider_id=u.id,class:F(["flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium border rounded-xl transition",ae.value.rider_id===u.id?"border-mantis-500 bg-mantis-50 text-mantis-800":"border-gray-200 hover:bg-gray-50 text-gray-800"])},[s("span",Uc,[n[100]||(n[100]=s("i",{class:"text-xs text-gray-400 pi pi-user"},null,-1)),s("span",null,_(u.name),1)]),ae.value.rider_id===u.id?(h(),x("i",qc)):E("",!0)],10,Wc))),128))]),s("div",{class:"justify-end gap-2 modal-footer pb-safe"},[s("button",{onClick:Mt,type:"button",class:"btn btn-secondary"},"Cancelar"),s("button",{onClick:An,type:"button",class:"btn btn-primary"},"Guardar")])])])):E("",!0),Qe.value?(h(),x("div",Bc,[s("div",Vc,[s("div",Yc,[s("h3",Hc,[bt(yt(ll),{icon:yt(ul),class:"text-mantis-600"},null,8,["icon"]),s("span",null,_(((O=jt.value)==null?void 0:O.name)||"Precio manual"),1)]),s("button",{onClick:n[39]||(n[39]=u=>Qe.value=!1),class:"icon-btn"},n[101]||(n[101]=[s("i",{class:"text-sm pi pi-times"},null,-1)]))]),s("div",Gc,[s("div",null,[n[102]||(n[102]=s("label",{class:"label"},"Precio unitario (C$)",-1)),te(s("input",{"onUpdate:modelValue":n[40]||(n[40]=u=>Ze.value=u),type:"number",step:"0.01",min:"0",placeholder:"0.00",class:"text-lg font-bold input",onKeyup:zn(Aa,["enter"])},null,544),[[ne,Ze.value,void 0,{number:!0}]])])]),s("div",Kc,[s("button",{onClick:n[41]||(n[41]=u=>Qe.value=!1),type:"button",class:"btn btn-secondary"},"Cancelar"),s("button",{onClick:Aa,type:"button",class:"btn btn-primary"},"Agregar")])])])):E("",!0)]}),_:1}))}};export{ad as default};
