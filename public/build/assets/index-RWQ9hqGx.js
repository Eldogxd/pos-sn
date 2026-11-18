import{i as En,s as X,G as lr,k as In,d as j,l as Nn,J as jn,D as Fn,E as Tn,c as Mn,o as h,w as Oa,b as yt,a as i,e as x,f as E,u as bt,n as M,t as _,F as pe,h as ve,g as he,z as Dn,m as te,y as ne,C as zn,H as Ln,q as xe}from"./app-BduIdonj.js";import{_ as Rn}from"./AppLayout-DRuYPfDF.js";import{_ as Wn}from"./NavDelivery-BN4CoLBS.js";import{s as we}from"./index-CH_qFMfu.js";import{s as Un,a as qn}from"./confirmdialog.esm-uifkDEiL.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";/*!
 * Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */function Yt(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function Bn(e){if(Array.isArray(e))return e}function Vn(e){if(Array.isArray(e))return Yt(e)}function Yn(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Hn(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,ur(r.key),r)}}function Gn(e,t,a){return t&&Hn(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function wt(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=oa(e))||t){a&&(e=a);var r=0,s=function(){};return{s,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(f){throw f},f:s}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var u,l=!0,c=!1;return{s:function(){a=a.call(e)},n:function(){var f=a.next();return l=f.done,f},e:function(f){c=!0,u=f},f:function(){try{l||a.return==null||a.return()}finally{if(c)throw u}}}}function I(e,t,a){return(t=ur(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Kn(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Xn(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,s,u,l,c=[],f=!0,p=!1;try{if(u=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;f=!1}else for(;!(f=(r=u.call(a)).done)&&(c.push(r.value),c.length!==t);f=!0);}catch(g){p=!0,s=g}finally{try{if(!f&&a.return!=null&&(l=a.return(),Object(l)!==l))return}finally{if(p)throw s}}return c}}function Jn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qn(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ea(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),a.push.apply(a,r)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?Ea(Object(a),!0).forEach(function(r){I(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Ea(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function $t(e,t){return Bn(e)||Xn(e,t)||oa(e,t)||Jn()}function ue(e){return Vn(e)||Kn(e)||oa(e)||Qn()}function Zn(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function ur(e){var t=Zn(e,"string");return typeof t=="symbol"?t:t+""}function At(e){"@babel/helpers - typeof";return At=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},At(e)}function oa(e,t){if(e){if(typeof e=="string")return Yt(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Yt(e,t):void 0}}var Ia=function(){},la={},dr={},cr=null,fr={mark:Ia,measure:Ia};try{typeof window<"u"&&(la=window),typeof document<"u"&&(dr=document),typeof MutationObserver<"u"&&(cr=MutationObserver),typeof performance<"u"&&(fr=performance)}catch{}var es=la.navigator||{},Na=es.userAgent,ja=Na===void 0?"":Na,Ie=la,z=dr,Fa=cr,ht=fr;Ie.document;var Se=!!z.documentElement&&!!z.head&&typeof z.addEventListener=="function"&&typeof z.createElement=="function",mr=~ja.indexOf("MSIE")||~ja.indexOf("Trident/"),zt,ts=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,as=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Slab Press|Slab|Whiteboard)?.*/i,pr={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"}},rs={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},vr=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],J="classic",lt="duotone",gr="sharp",yr="sharp-duotone",br="chisel",hr="etch",xr="jelly",wr="jelly-duo",_r="jelly-fill",kr="notdog",Ar="notdog-duo",Sr="slab",Cr="slab-press",Pr="thumbprint",$r="whiteboard",ns="Classic",ss="Duotone",is="Sharp",os="Sharp Duotone",ls="Chisel",us="Etch",ds="Jelly",cs="Jelly Duo",fs="Jelly Fill",ms="Notdog",ps="Notdog Duo",vs="Slab",gs="Slab Press",ys="Thumbprint",bs="Whiteboard",Or=[J,lt,gr,yr,br,hr,xr,wr,_r,kr,Ar,Sr,Cr,Pr,$r];zt={},I(I(I(I(I(I(I(I(I(I(zt,J,ns),lt,ss),gr,is),yr,os),br,ls),hr,us),xr,ds),wr,cs),_r,fs),kr,ms),I(I(I(I(I(zt,Ar,ps),Sr,vs),Cr,gs),Pr,ys),$r,bs);var hs={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"}},xs={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"}},ws=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),_s={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},whiteboard:{semibold:"fawsb"}},Er=["fak","fa-kit","fakd","fa-kit-duotone"],Ta={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},ks=["kit"],As="kit",Ss="kit-duotone",Cs="Kit",Ps="Kit Duotone";I(I({},As,Cs),Ss,Ps);var $s={kit:{"fa-kit":"fak"}},Os={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Es={kit:{fak:"fa-kit"}},Ma={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},Lt,xt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Is=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],Ns="classic",js="duotone",Fs="sharp",Ts="sharp-duotone",Ms="chisel",Ds="etch",zs="jelly",Ls="jelly-duo",Rs="jelly-fill",Ws="notdog",Us="notdog-duo",qs="slab",Bs="slab-press",Vs="thumbprint",Ys="whiteboard",Hs="Classic",Gs="Duotone",Ks="Sharp",Xs="Sharp Duotone",Js="Chisel",Qs="Etch",Zs="Jelly",ei="Jelly Duo",ti="Jelly Fill",ai="Notdog",ri="Notdog Duo",ni="Slab",si="Slab Press",ii="Thumbprint",oi="Whiteboard";Lt={},I(I(I(I(I(I(I(I(I(I(Lt,Ns,Hs),js,Gs),Fs,Ks),Ts,Xs),Ms,Js),Ds,Qs),zs,Zs),Ls,ei),Rs,ti),Ws,ai),I(I(I(I(I(Lt,Us,ri),qs,ni),Bs,si),Vs,ii),Ys,oi);var li="kit",ui="kit-duotone",di="Kit",ci="Kit Duotone";I(I({},li,di),ui,ci);var fi={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"}},mi={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"]},Ht={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"}},pi=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],Ir=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr"].concat(Is,pi),vi=["solid","regular","light","thin","duotone","brands","semibold"],Nr=[1,2,3,4,5,6,7,8,9,10],gi=Nr.concat([11,12,13,14,15,16,17,18,19,20]),yi=["aw","fw","pull-left","pull-right"],bi=[].concat(ue(Object.keys(mi)),vi,yi,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",xt.GROUP,xt.SWAP_OPACITY,xt.PRIMARY,xt.SECONDARY]).concat(Nr.map(function(e){return"".concat(e,"x")})).concat(gi.map(function(e){return"w-".concat(e)})),hi={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},ke="___FONT_AWESOME___",Gt=16,jr="fa",Fr="svg-inline--fa",We="data-fa-i2svg",Kt="data-fa-pseudo-element",xi="data-fa-pseudo-element-pending",ua="data-prefix",da="data-icon",Da="fontawesome-i2svg",wi="async",_i=["HTML","HEAD","STYLE","SCRIPT"],Tr=["::before","::after",":before",":after"],Mr=function(){try{return!0}catch{return!1}}();function ut(e){return new Proxy(e,{get:function(a,r){return r in a?a[r]:a[J]}})}var Dr=m({},pr);Dr[J]=m(m(m(m({},{"fa-duotone":"duotone"}),pr[J]),Ta.kit),Ta["kit-duotone"]);var ki=ut(Dr),Xt=m({},_s);Xt[J]=m(m(m(m({},{duotone:"fad"}),Xt[J]),Ma.kit),Ma["kit-duotone"]);var za=ut(Xt),Jt=m({},Ht);Jt[J]=m(m({},Jt[J]),Es.kit);var zr=ut(Jt),Qt=m({},fi);Qt[J]=m(m({},Qt[J]),$s.kit);ut(Qt);var Ai=ts,Lr="fa-layers-text",Si=as,Ci=m({},hs);ut(Ci);var Pi=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Rt=rs,$i=[].concat(ue(ks),ue(bi)),st=Ie.FontAwesomeConfig||{};function Oi(e){var t=z.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Ei(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(z&&typeof z.querySelector=="function"){var Ii=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Ii.forEach(function(e){var t=$t(e,2),a=t[0],r=t[1],s=Ei(Oi(a));s!=null&&(st[r]=s)})}var Rr={styleDefault:"solid",familyDefault:J,cssPrefix:jr,replacementClass:Fr,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};st.familyPrefix&&(st.cssPrefix=st.familyPrefix);var Xe=m(m({},Rr),st);Xe.autoReplaceSvg||(Xe.observeMutations=!1);var k={};Object.keys(Rr).forEach(function(e){Object.defineProperty(k,e,{enumerable:!0,set:function(a){Xe[e]=a,it.forEach(function(r){return r(k)})},get:function(){return Xe[e]}})});Object.defineProperty(k,"familyPrefix",{enumerable:!0,set:function(t){Xe.cssPrefix=t,it.forEach(function(a){return a(k)})},get:function(){return Xe.cssPrefix}});Ie.FontAwesomeConfig=k;var it=[];function Ni(e){return it.push(e),function(){it.splice(it.indexOf(e),1)}}var He=Gt,ge={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ji(e){if(!(!e||!Se)){var t=z.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=z.head.childNodes,r=null,s=a.length-1;s>-1;s--){var u=a[s],l=(u.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(l)>-1&&(r=u)}return z.head.insertBefore(t,r),e}}var Fi="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function La(){for(var e=12,t="";e-- >0;)t+=Fi[Math.random()*62|0];return t}function Je(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function ca(e){return e.classList?Je(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Wr(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ti(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(Wr(e[a]),'" ')},"").trim()}function Ot(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function fa(e){return e.size!==ge.size||e.x!==ge.x||e.y!==ge.y||e.rotate!==ge.rotate||e.flipX||e.flipY}function Mi(e){var t=e.transform,a=e.containerWidth,r=e.iconWidth,s={transform:"translate(".concat(a/2," 256)")},u="translate(".concat(t.x*32,", ").concat(t.y*32,") "),l="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),c="rotate(".concat(t.rotate," 0 0)"),f={transform:"".concat(u," ").concat(l," ").concat(c)},p={transform:"translate(".concat(r/2*-1," -256)")};return{outer:s,inner:f,path:p}}function Di(e){var t=e.transform,a=e.width,r=a===void 0?Gt:a,s=e.height,u=s===void 0?Gt:s,l="";return mr?l+="translate(".concat(t.x/He-r/2,"em, ").concat(t.y/He-u/2,"em) "):l+="translate(calc(-50% + ".concat(t.x/He,"em), calc(-50% + ").concat(t.y/He,"em)) "),l+="scale(".concat(t.size/He*(t.flipX?-1:1),", ").concat(t.size/He*(t.flipY?-1:1),") "),l+="rotate(".concat(t.rotate,"deg) "),l}var zi=`:root, :host {
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
}`;function Ur(){var e=jr,t=Fr,a=k.cssPrefix,r=k.replacementClass,s=zi;if(a!==e||r!==t){var u=new RegExp("\\.".concat(e,"\\-"),"g"),l=new RegExp("\\--".concat(e,"\\-"),"g"),c=new RegExp("\\.".concat(t),"g");s=s.replace(u,".".concat(a,"-")).replace(l,"--".concat(a,"-")).replace(c,".".concat(r))}return s}var Ra=!1;function Wt(){k.autoAddCss&&!Ra&&(ji(Ur()),Ra=!0)}var Li={mixout:function(){return{dom:{css:Ur,insertCss:Wt}}},hooks:function(){return{beforeDOMElementCreation:function(){Wt()},beforeI2svg:function(){Wt()}}}},Ae=Ie||{};Ae[ke]||(Ae[ke]={});Ae[ke].styles||(Ae[ke].styles={});Ae[ke].hooks||(Ae[ke].hooks={});Ae[ke].shims||(Ae[ke].shims=[]);var le=Ae[ke],qr=[],Br=function(){z.removeEventListener("DOMContentLoaded",Br),St=1,qr.map(function(t){return t()})},St=!1;Se&&(St=(z.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(z.readyState),St||z.addEventListener("DOMContentLoaded",Br));function Ri(e){Se&&(St?setTimeout(e,0):qr.push(e))}function dt(e){var t=e.tag,a=e.attributes,r=a===void 0?{}:a,s=e.children,u=s===void 0?[]:s;return typeof e=="string"?Wr(e):"<".concat(t," ").concat(Ti(r),">").concat(u.map(dt).join(""),"</").concat(t,">")}function Wa(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var Ut=function(t,a,r,s){var u=Object.keys(t),l=u.length,c=a,f,p,g;for(r===void 0?(f=1,g=t[u[0]]):(f=0,g=r);f<l;f++)p=u[f],g=c(g,t[p],p,t);return g};function Vr(e){return ue(e).length!==1?null:e.codePointAt(0).toString(16)}function Ua(e){return Object.keys(e).reduce(function(t,a){var r=e[a],s=!!r.icon;return s?t[r.iconName]=r.icon:t[a]=r,t},{})}function Yr(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,s=r===void 0?!1:r,u=Ua(t);typeof le.hooks.addPack=="function"&&!s?le.hooks.addPack(e,Ua(t)):le.styles[e]=m(m({},le.styles[e]||{}),u),e==="fas"&&Yr("fa",t)}var ot=le.styles,Wi=le.shims,Hr=Object.keys(zr),Ui=Hr.reduce(function(e,t){return e[t]=Object.keys(zr[t]),e},{}),ma=null,Gr={},Kr={},Xr={},Jr={},Qr={};function qi(e){return~$i.indexOf(e)}function Bi(e,t){var a=t.split("-"),r=a[0],s=a.slice(1).join("-");return r===e&&s!==""&&!qi(s)?s:null}var Zr=function(){var t=function(u){return Ut(ot,function(l,c,f){return l[f]=Ut(c,u,{}),l},{})};Gr=t(function(s,u,l){if(u[3]&&(s[u[3]]=l),u[2]){var c=u[2].filter(function(f){return typeof f=="number"});c.forEach(function(f){s[f.toString(16)]=l})}return s}),Kr=t(function(s,u,l){if(s[l]=l,u[2]){var c=u[2].filter(function(f){return typeof f=="string"});c.forEach(function(f){s[f]=l})}return s}),Qr=t(function(s,u,l){var c=u[2];return s[l]=l,c.forEach(function(f){s[f]=l}),s});var a="far"in ot||k.autoFetchSvg,r=Ut(Wi,function(s,u){var l=u[0],c=u[1],f=u[2];return c==="far"&&!a&&(c="fas"),typeof l=="string"&&(s.names[l]={prefix:c,iconName:f}),typeof l=="number"&&(s.unicodes[l.toString(16)]={prefix:c,iconName:f}),s},{names:{},unicodes:{}});Xr=r.names,Jr=r.unicodes,ma=Et(k.styleDefault,{family:k.familyDefault})};Ni(function(e){ma=Et(e.styleDefault,{family:k.familyDefault})});Zr();function pa(e,t){return(Gr[e]||{})[t]}function Vi(e,t){return(Kr[e]||{})[t]}function Re(e,t){return(Qr[e]||{})[t]}function en(e){return Xr[e]||{prefix:null,iconName:null}}function Yi(e){var t=Jr[e],a=pa("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function Ne(){return ma}var tn=function(){return{prefix:null,iconName:null,rest:[]}};function Hi(e){var t=J,a=Hr.reduce(function(r,s){return r[s]="".concat(k.cssPrefix,"-").concat(s),r},{});return Or.forEach(function(r){(e.includes(a[r])||e.some(function(s){return Ui[r].includes(s)}))&&(t=r)}),t}function Et(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,r=a===void 0?J:a,s=ki[r][e];if(r===lt&&!e)return"fad";var u=za[r][e]||za[r][s],l=e in le.styles?e:null,c=u||l||null;return c}function Gi(e){var t=[],a=null;return e.forEach(function(r){var s=Bi(k.cssPrefix,r);s?a=s:r&&t.push(r)}),{iconName:a,rest:t}}function qa(e){return e.sort().filter(function(t,a,r){return r.indexOf(t)===a})}var Ba=Ir.concat(Er);function It(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,r=a===void 0?!1:a,s=null,u=qa(e.filter(function(S){return Ba.includes(S)})),l=qa(e.filter(function(S){return!Ba.includes(S)})),c=u.filter(function(S){return s=S,!vr.includes(S)}),f=$t(c,1),p=f[0],g=p===void 0?null:p,v=Hi(u),C=m(m({},Gi(l)),{},{prefix:Et(g,{family:v})});return m(m(m({},C),Qi({values:e,family:v,styles:ot,config:k,canonical:C,givenPrefix:s})),Ki(r,s,C))}function Ki(e,t,a){var r=a.prefix,s=a.iconName;if(e||!r||!s)return{prefix:r,iconName:s};var u=t==="fa"?en(s):{},l=Re(r,s);return s=u.iconName||l||s,r=u.prefix||r,r==="far"&&!ot.far&&ot.fas&&!k.autoFetchSvg&&(r="fas"),{prefix:r,iconName:s}}var Xi=Or.filter(function(e){return e!==J||e!==lt}),Ji=Object.keys(Ht).filter(function(e){return e!==J}).map(function(e){return Object.keys(Ht[e])}).flat();function Qi(e){var t=e.values,a=e.family,r=e.canonical,s=e.givenPrefix,u=s===void 0?"":s,l=e.styles,c=l===void 0?{}:l,f=e.config,p=f===void 0?{}:f,g=a===lt,v=t.includes("fa-duotone")||t.includes("fad"),C=p.familyDefault==="duotone",S=r.prefix==="fad"||r.prefix==="fa-duotone";if(!g&&(v||C||S)&&(r.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab"),!r.prefix&&Xi.includes(a)){var D=Object.keys(c).find(function(R){return Ji.includes(R)});if(D||p.autoFetchSvg){var N=ws.get(a).defaultShortPrefixId;r.prefix=N,r.iconName=Re(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||u==="fa")&&(r.prefix=Ne()||"fas"),r}var Zi=function(){function e(){Yn(this,e),this.definitions={}}return Gn(e,[{key:"add",value:function(){for(var a=this,r=arguments.length,s=new Array(r),u=0;u<r;u++)s[u]=arguments[u];var l=s.reduce(this._pullDefinitions,{});Object.keys(l).forEach(function(c){a.definitions[c]=m(m({},a.definitions[c]||{}),l[c]),Yr(c,l[c]),Zr()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var s=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(s).map(function(u){var l=s[u],c=l.prefix,f=l.iconName,p=l.icon,g=p[2];a[c]||(a[c]={}),g.length>0&&g.forEach(function(v){typeof v=="string"&&(a[c][v]=p)}),a[c][f]=p}),a}}])}(),Va=[],Ge={},Ke={},eo=Object.keys(Ke);function to(e,t){var a=t.mixoutsTo;return Va=e,Ge={},Object.keys(Ke).forEach(function(r){eo.indexOf(r)===-1&&delete Ke[r]}),Va.forEach(function(r){var s=r.mixout?r.mixout():{};if(Object.keys(s).forEach(function(l){typeof s[l]=="function"&&(a[l]=s[l]),At(s[l])==="object"&&Object.keys(s[l]).forEach(function(c){a[l]||(a[l]={}),a[l][c]=s[l][c]})}),r.hooks){var u=r.hooks();Object.keys(u).forEach(function(l){Ge[l]||(Ge[l]=[]),Ge[l].push(u[l])})}r.provides&&r.provides(Ke)}),a}function Zt(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),s=2;s<a;s++)r[s-2]=arguments[s];var u=Ge[e]||[];return u.forEach(function(l){t=l.apply(null,[t].concat(r))}),t}function Ue(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var s=Ge[e]||[];s.forEach(function(u){u.apply(null,a)})}function je(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Ke[e]?Ke[e].apply(null,t):void 0}function ea(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||Ne();if(t)return t=Re(a,t)||t,Wa(an.definitions,a,t)||Wa(le.styles,a,t)}var an=new Zi,ao=function(){k.autoReplaceSvg=!1,k.observeMutations=!1,Ue("noAuto")},ro={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Se?(Ue("beforeI2svg",t),je("pseudoElements2svg",t),je("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;k.autoReplaceSvg===!1&&(k.autoReplaceSvg=!0),k.observeMutations=!0,Ri(function(){so({autoReplaceSvgRoot:a}),Ue("watch",t)})}},no={icon:function(t){if(t===null)return null;if(At(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:Re(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=Et(t[0]);return{prefix:r,iconName:Re(r,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(k.cssPrefix,"-"))>-1||t.match(Ai))){var s=It(t.split(" "),{skipLookups:!0});return{prefix:s.prefix||Ne(),iconName:Re(s.prefix,s.iconName)||s.iconName}}if(typeof t=="string"){var u=Ne();return{prefix:u,iconName:Re(u,t)||t}}}},se={noAuto:ao,config:k,dom:ro,parse:no,library:an,findIconDefinition:ea,toHtml:dt},so=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,r=a===void 0?z:a;(Object.keys(le.styles).length>0||k.autoFetchSvg)&&Se&&k.autoReplaceSvg&&se.dom.i2svg({node:r})};function Nt(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return dt(r)})}}),Object.defineProperty(e,"node",{get:function(){if(Se){var r=z.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function io(e){var t=e.children,a=e.main,r=e.mask,s=e.attributes,u=e.styles,l=e.transform;if(fa(l)&&a.found&&!r.found){var c=a.width,f=a.height,p={x:c/f/2,y:.5};s.style=Ot(m(m({},u),{},{"transform-origin":"".concat(p.x+l.x/16,"em ").concat(p.y+l.y/16,"em")}))}return[{tag:"svg",attributes:s,children:t}]}function oo(e){var t=e.prefix,a=e.iconName,r=e.children,s=e.attributes,u=e.symbol,l=u===!0?"".concat(t,"-").concat(k.cssPrefix,"-").concat(a):u;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:m(m({},s),{},{id:l}),children:r}]}]}function lo(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function va(e){var t=e.icons,a=t.main,r=t.mask,s=e.prefix,u=e.iconName,l=e.transform,c=e.symbol,f=e.maskId,p=e.extra,g=e.watchable,v=g===void 0?!1:g,C=r.found?r:a,S=C.width,D=C.height,N=[k.replacementClass,u?"".concat(k.cssPrefix,"-").concat(u):""].filter(function(W){return p.classes.indexOf(W)===-1}).filter(function(W){return W!==""||!!W}).concat(p.classes).join(" "),R={children:[],attributes:m(m({},p.attributes),{},{"data-prefix":s,"data-icon":u,class:N,role:p.attributes.role||"img",viewBox:"0 0 ".concat(S," ").concat(D)})};!lo(p.attributes)&&!p.attributes["aria-hidden"]&&(R.attributes["aria-hidden"]="true"),v&&(R.attributes[We]="");var y=m(m({},R),{},{prefix:s,iconName:u,main:a,mask:r,maskId:f,transform:l,symbol:c,styles:m({},p.styles)}),w=r.found&&a.found?je("generateAbstractMask",y)||{children:[],attributes:{}}:je("generateAbstractIcon",y)||{children:[],attributes:{}},F=w.children,B=w.attributes;return y.children=F,y.attributes=B,c?oo(y):io(y)}function Ya(e){var t=e.content,a=e.width,r=e.height,s=e.transform,u=e.extra,l=e.watchable,c=l===void 0?!1:l,f=m(m({},u.attributes),{},{class:u.classes.join(" ")});c&&(f[We]="");var p=m({},u.styles);fa(s)&&(p.transform=Di({transform:s,width:a,height:r}),p["-webkit-transform"]=p.transform);var g=Ot(p);g.length>0&&(f.style=g);var v=[];return v.push({tag:"span",attributes:f,children:[t]}),v}function uo(e){var t=e.content,a=e.extra,r=m(m({},a.attributes),{},{class:a.classes.join(" ")}),s=Ot(a.styles);s.length>0&&(r.style=s);var u=[];return u.push({tag:"span",attributes:r,children:[t]}),u}var qt=le.styles;function ta(e){var t=e[0],a=e[1],r=e.slice(4),s=$t(r,1),u=s[0],l=null;return Array.isArray(u)?l={tag:"g",attributes:{class:"".concat(k.cssPrefix,"-").concat(Rt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(k.cssPrefix,"-").concat(Rt.SECONDARY),fill:"currentColor",d:u[0]}},{tag:"path",attributes:{class:"".concat(k.cssPrefix,"-").concat(Rt.PRIMARY),fill:"currentColor",d:u[1]}}]}:l={tag:"path",attributes:{fill:"currentColor",d:u}},{found:!0,width:t,height:a,icon:l}}var co={found:!1,width:512,height:512};function fo(e,t){!Mr&&!k.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function aa(e,t){var a=t;return t==="fa"&&k.styleDefault!==null&&(t=Ne()),new Promise(function(r,s){if(a==="fa"){var u=en(e)||{};e=u.iconName||e,t=u.prefix||t}if(e&&t&&qt[t]&&qt[t][e]){var l=qt[t][e];return r(ta(l))}fo(e,t),r(m(m({},co),{},{icon:k.showMissingIcons&&e?je("missingIconAbstract")||{}:{}}))})}var Ha=function(){},ra=k.measurePerformance&&ht&&ht.mark&&ht.measure?ht:{mark:Ha,measure:Ha},nt='FA "7.0.0"',mo=function(t){return ra.mark("".concat(nt," ").concat(t," begins")),function(){return rn(t)}},rn=function(t){ra.mark("".concat(nt," ").concat(t," ends")),ra.measure("".concat(nt," ").concat(t),"".concat(nt," ").concat(t," begins"),"".concat(nt," ").concat(t," ends"))},ga={begin:mo,end:rn},_t=function(){};function Ga(e){var t=e.getAttribute?e.getAttribute(We):null;return typeof t=="string"}function po(e){var t=e.getAttribute?e.getAttribute(ua):null,a=e.getAttribute?e.getAttribute(da):null;return t&&a}function vo(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(k.replacementClass)}function go(){if(k.autoReplaceSvg===!0)return kt.replace;var e=kt[k.autoReplaceSvg];return e||kt.replace}function yo(e){return z.createElementNS("http://www.w3.org/2000/svg",e)}function bo(e){return z.createElement(e)}function nn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,r=a===void 0?e.tag==="svg"?yo:bo:a;if(typeof e=="string")return z.createTextNode(e);var s=r(e.tag);Object.keys(e.attributes||[]).forEach(function(l){s.setAttribute(l,e.attributes[l])});var u=e.children||[];return u.forEach(function(l){s.appendChild(nn(l,{ceFn:r}))}),s}function ho(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var kt={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(s){a.parentNode.insertBefore(nn(s),a)}),a.getAttribute(We)===null&&k.keepOriginalSource){var r=z.createComment(ho(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(t){var a=t[0],r=t[1];if(~ca(a).indexOf(k.replacementClass))return kt.replace(t);var s=new RegExp("".concat(k.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var u=r[0].attributes.class.split(" ").reduce(function(c,f){return f===k.replacementClass||f.match(s)?c.toSvg.push(f):c.toNode.push(f),c},{toNode:[],toSvg:[]});r[0].attributes.class=u.toSvg.join(" "),u.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",u.toNode.join(" "))}var l=r.map(function(c){return dt(c)}).join(`
`);a.setAttribute(We,""),a.innerHTML=l}};function Ka(e){e()}function sn(e,t){var a=typeof t=="function"?t:_t;if(e.length===0)a();else{var r=Ka;k.mutateApproach===wi&&(r=Ie.requestAnimationFrame||Ka),r(function(){var s=go(),u=ga.begin("mutate");e.map(s),u(),a()})}}var ya=!1;function on(){ya=!0}function na(){ya=!1}var Ct=null;function Xa(e){if(Fa&&k.observeMutations){var t=e.treeCallback,a=t===void 0?_t:t,r=e.nodeCallback,s=r===void 0?_t:r,u=e.pseudoElementsCallback,l=u===void 0?_t:u,c=e.observeMutationsRoot,f=c===void 0?z:c;Ct=new Fa(function(p){if(!ya){var g=Ne();Je(p).forEach(function(v){if(v.type==="childList"&&v.addedNodes.length>0&&!Ga(v.addedNodes[0])&&(k.searchPseudoElements&&l(v.target),a(v.target)),v.type==="attributes"&&v.target.parentNode&&k.searchPseudoElements&&l([v.target],!0),v.type==="attributes"&&Ga(v.target)&&~Pi.indexOf(v.attributeName))if(v.attributeName==="class"&&po(v.target)){var C=It(ca(v.target)),S=C.prefix,D=C.iconName;v.target.setAttribute(ua,S||g),D&&v.target.setAttribute(da,D)}else vo(v.target)&&s(v.target)})}}),Se&&Ct.observe(f,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function xo(){Ct&&Ct.disconnect()}function wo(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(r,s){var u=s.split(":"),l=u[0],c=u.slice(1);return l&&c.length>0&&(r[l]=c.join(":").trim()),r},{})),a}function _o(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",s=It(ca(e));return s.prefix||(s.prefix=Ne()),t&&a&&(s.prefix=t,s.iconName=a),s.iconName&&s.prefix||(s.prefix&&r.length>0&&(s.iconName=Vi(s.prefix,e.innerText)||pa(s.prefix,Vr(e.innerText))),!s.iconName&&k.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(s.iconName=e.firstChild.data)),s}function ko(e){var t=Je(e.attributes).reduce(function(a,r){return a.name!=="class"&&a.name!=="style"&&(a[r.name]=r.value),a},{});return t}function Ao(){return{iconName:null,prefix:null,transform:ge,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ja(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=_o(e),r=a.iconName,s=a.prefix,u=a.rest,l=ko(e),c=Zt("parseNodeAttributes",{},e),f=t.styleParser?wo(e):[];return m({iconName:r,prefix:s,transform:ge,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:u,styles:f,attributes:l}},c)}var So=le.styles;function ln(e){var t=k.autoReplaceSvg==="nest"?Ja(e,{styleParser:!1}):Ja(e);return~t.extra.classes.indexOf(Lr)?je("generateLayersText",e,t):je("generateSvgReplacementMutation",e,t)}function Co(){return[].concat(ue(Er),ue(Ir))}function Qa(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!Se)return Promise.resolve();var a=z.documentElement.classList,r=function(v){return a.add("".concat(Da,"-").concat(v))},s=function(v){return a.remove("".concat(Da,"-").concat(v))},u=k.autoFetchSvg?Co():vr.concat(Object.keys(So));u.includes("fa")||u.push("fa");var l=[".".concat(Lr,":not([").concat(We,"])")].concat(u.map(function(g){return".".concat(g,":not([").concat(We,"])")})).join(", ");if(l.length===0)return Promise.resolve();var c=[];try{c=Je(e.querySelectorAll(l))}catch{}if(c.length>0)r("pending"),s("complete");else return Promise.resolve();var f=ga.begin("onTree"),p=c.reduce(function(g,v){try{var C=ln(v);C&&g.push(C)}catch(S){Mr||S.name==="MissingIcon"&&console.error(S)}return g},[]);return new Promise(function(g,v){Promise.all(p).then(function(C){sn(C,function(){r("active"),r("complete"),s("pending"),typeof t=="function"&&t(),f(),g()})}).catch(function(C){f(),v(C)})})}function Po(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;ln(e).then(function(a){a&&sn([a],t)})}function $o(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:ea(t||{}),s=a.mask;return s&&(s=(s||{}).icon?s:ea(s||{})),e(r,m(m({},a),{},{mask:s}))}}var Oo=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,s=r===void 0?ge:r,u=a.symbol,l=u===void 0?!1:u,c=a.mask,f=c===void 0?null:c,p=a.maskId,g=p===void 0?null:p,v=a.classes,C=v===void 0?[]:v,S=a.attributes,D=S===void 0?{}:S,N=a.styles,R=N===void 0?{}:N;if(t){var y=t.prefix,w=t.iconName,F=t.icon;return Nt(m({type:"icon"},t),function(){return Ue("beforeDOMElementCreation",{iconDefinition:t,params:a}),va({icons:{main:ta(F),mask:f?ta(f.icon):{found:!1,width:null,height:null,icon:{}}},prefix:y,iconName:w,transform:m(m({},ge),s),symbol:l,maskId:g,extra:{attributes:D,styles:R,classes:C}})})}},Eo={mixout:function(){return{icon:$o(Oo)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=Qa,a.nodeCallback=Po,a}}},provides:function(t){t.i2svg=function(a){var r=a.node,s=r===void 0?z:r,u=a.callback,l=u===void 0?function(){}:u;return Qa(s,l)},t.generateSvgReplacementMutation=function(a,r){var s=r.iconName,u=r.prefix,l=r.transform,c=r.symbol,f=r.mask,p=r.maskId,g=r.extra;return new Promise(function(v,C){Promise.all([aa(s,u),f.iconName?aa(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(S){var D=$t(S,2),N=D[0],R=D[1];v([a,va({icons:{main:N,mask:R},prefix:u,iconName:s,transform:l,symbol:c,maskId:p,extra:g,watchable:!0})])}).catch(C)})},t.generateAbstractIcon=function(a){var r=a.children,s=a.attributes,u=a.main,l=a.transform,c=a.styles,f=Ot(c);f.length>0&&(s.style=f);var p;return fa(l)&&(p=je("generateAbstractTransformGrouping",{main:u,transform:l,containerWidth:u.width,iconWidth:u.width})),r.push(p||u.icon),{children:r,attributes:s}}}},Io={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=r.classes,u=s===void 0?[]:s;return Nt({type:"layer"},function(){Ue("beforeDOMElementCreation",{assembler:a,params:r});var l=[];return a(function(c){Array.isArray(c)?c.map(function(f){l=l.concat(f.abstract)}):l=l.concat(c.abstract)}),[{tag:"span",attributes:{class:["".concat(k.cssPrefix,"-layers")].concat(ue(u)).join(" ")},children:l}]})}}}},No={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var s=r.classes,u=s===void 0?[]:s,l=r.attributes,c=l===void 0?{}:l,f=r.styles,p=f===void 0?{}:f;return Nt({type:"counter",content:a},function(){return Ue("beforeDOMElementCreation",{content:a,params:r}),uo({content:a.toString(),extra:{attributes:c,styles:p,classes:["".concat(k.cssPrefix,"-layers-counter")].concat(ue(u))}})})}}}},jo={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=r.transform,u=s===void 0?ge:s,l=r.classes,c=l===void 0?[]:l,f=r.attributes,p=f===void 0?{}:f,g=r.styles,v=g===void 0?{}:g;return Nt({type:"text",content:a},function(){return Ue("beforeDOMElementCreation",{content:a,params:r}),Ya({content:a,transform:m(m({},ge),u),extra:{attributes:p,styles:v,classes:["".concat(k.cssPrefix,"-layers-text")].concat(ue(c))}})})}}},provides:function(t){t.generateLayersText=function(a,r){var s=r.transform,u=r.extra,l=null,c=null;if(mr){var f=parseInt(getComputedStyle(a).fontSize,10),p=a.getBoundingClientRect();l=p.width/f,c=p.height/f}return Promise.resolve([a,Ya({content:a.innerHTML,width:l,height:c,transform:s,extra:u,watchable:!0})])}}},un=new RegExp('"',"ug"),Za=[1105920,1112319],er=m(m(m(m({},{FontAwesome:{normal:"fas",400:"fas"}}),xs),hi),Os),sa=Object.keys(er).reduce(function(e,t){return e[t.toLowerCase()]=er[t],e},{}),Fo=Object.keys(sa).reduce(function(e,t){var a=sa[t];return e[t]=a[900]||ue(Object.entries(a))[0][1],e},{});function To(e){var t=e.replace(un,"");return Vr(ue(t)[0]||"")}function Mo(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),r=a.replace(un,""),s=r.codePointAt(0),u=s>=Za[0]&&s<=Za[1],l=r.length===2?r[0]===r[1]:!1;return u||l||t}function Do(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),s=isNaN(r)?"normal":r;return(sa[a]||{})[s]||Fo[a]}function tr(e,t){var a="".concat(xi).concat(t.replace(":","-"));return new Promise(function(r,s){if(e.getAttribute(a)!==null)return r();var u=Je(e.children),l=u.filter(function(A){return A.getAttribute(Kt)===t})[0],c=Ie.getComputedStyle(e,t),f=c.getPropertyValue("font-family"),p=f.match(Si),g=c.getPropertyValue("font-weight"),v=c.getPropertyValue("content");if(l&&!p)return e.removeChild(l),r();if(p&&v!=="none"&&v!==""){var C=c.getPropertyValue("content"),S=Do(f,g),D=To(C),N=p[0].startsWith("FontAwesome"),R=Mo(c),y=pa(S,D),w=y;if(N){var F=Yi(D);F.iconName&&F.prefix&&(y=F.iconName,S=F.prefix)}if(y&&!R&&(!l||l.getAttribute(ua)!==S||l.getAttribute(da)!==w)){e.setAttribute(a,w),l&&e.removeChild(l);var B=Ao(),W=B.extra;W.attributes[Kt]=t,aa(y,S).then(function(A){var ie=va(m(m({},B),{},{icons:{main:A,mask:tn()},prefix:S,iconName:w,extra:W,watchable:!0})),qe=z.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(qe,e.firstChild):e.appendChild(qe),qe.outerHTML=ie.map(function(ct){return dt(ct)}).join(`
`),e.removeAttribute(a),r()}).catch(s)}else r()}else r()})}function zo(e){return Promise.all([tr(e,"::before"),tr(e,"::after")])}function Lo(e){return e.parentNode!==document.head&&!~_i.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Kt)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var Ro=function(t){return!!t&&Tr.some(function(a){return t.includes(a)})},Wo=function(t){if(!t)return[];for(var a=new Set,r=[t],s=[/(?=\s:)/,new RegExp("(?<=\\)\\)?[^,]*,)")],u=function(){var S=c[l];r=r.flatMap(function(D){return D.split(S).map(function(N){return N.replace(/,\s*$/,"").trim()})})},l=0,c=s;l<c.length;l++)u();r=r.flatMap(function(C){return C.includes("(")?C:C.split(",").map(function(S){return S.trim()})});var f=wt(r),p;try{for(f.s();!(p=f.n()).done;){var g=p.value;if(Ro(g)){var v=Tr.reduce(function(C,S){return C.replace(S,"")},g);v!==""&&v!=="*"&&a.add(v)}}}catch(C){f.e(C)}finally{f.f()}return a};function ar(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(Se){var a;if(t)a=e;else if(k.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var r=new Set,s=wt(document.styleSheets),u;try{for(s.s();!(u=s.n()).done;){var l=u.value;try{var c=wt(l.cssRules),f;try{for(c.s();!(f=c.n()).done;){var p=f.value,g=Wo(p.selectorText),v=wt(g),C;try{for(v.s();!(C=v.n()).done;){var S=C.value;r.add(S)}}catch(N){v.e(N)}finally{v.f()}}}catch(N){c.e(N)}finally{c.f()}}catch(N){k.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(l.href," (").concat(N.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(N){s.e(N)}finally{s.f()}if(!r.size)return;var D=Array.from(r).join(", ");try{a=e.querySelectorAll(D)}catch{}}return new Promise(function(N,R){var y=Je(a).filter(Lo).map(zo),w=ga.begin("searchPseudoElements");on(),Promise.all(y).then(function(){w(),na(),N()}).catch(function(){w(),na(),R()})})}}var Uo={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=ar,a}}},provides:function(t){t.pseudoElements2svg=function(a){var r=a.node,s=r===void 0?z:r;k.searchPseudoElements&&ar(s)}}},rr=!1,qo={mixout:function(){return{dom:{unwatch:function(){on(),rr=!0}}}},hooks:function(){return{bootstrap:function(){Xa(Zt("mutationObserverCallbacks",{}))},noAuto:function(){xo()},watch:function(a){var r=a.observeMutationsRoot;rr?na():Xa(Zt("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},nr=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,s){var u=s.toLowerCase().split("-"),l=u[0],c=u.slice(1).join("-");if(l&&c==="h")return r.flipX=!0,r;if(l&&c==="v")return r.flipY=!0,r;if(c=parseFloat(c),isNaN(c))return r;switch(l){case"grow":r.size=r.size+c;break;case"shrink":r.size=r.size-c;break;case"left":r.x=r.x-c;break;case"right":r.x=r.x+c;break;case"up":r.y=r.y-c;break;case"down":r.y=r.y+c;break;case"rotate":r.rotate=r.rotate+c;break}return r},a)},Bo={mixout:function(){return{parse:{transform:function(a){return nr(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,r){var s=r.getAttribute("data-fa-transform");return s&&(a.transform=nr(s)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var r=a.main,s=a.transform,u=a.containerWidth,l=a.iconWidth,c={transform:"translate(".concat(u/2," 256)")},f="translate(".concat(s.x*32,", ").concat(s.y*32,") "),p="scale(".concat(s.size/16*(s.flipX?-1:1),", ").concat(s.size/16*(s.flipY?-1:1),") "),g="rotate(".concat(s.rotate," 0 0)"),v={transform:"".concat(f," ").concat(p," ").concat(g)},C={transform:"translate(".concat(l/2*-1," -256)")},S={outer:c,inner:v,path:C};return{tag:"g",attributes:m({},S.outer),children:[{tag:"g",attributes:m({},S.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:m(m({},r.icon.attributes),S.path)}]}]}}}},Bt={x:0,y:0,width:"100%",height:"100%"};function sr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Vo(e){return e.tag==="g"?e.children:[e]}var Yo={hooks:function(){return{parseNodeAttributes:function(a,r){var s=r.getAttribute("data-fa-mask"),u=s?It(s.split(" ").map(function(l){return l.trim()})):tn();return u.prefix||(u.prefix=Ne()),a.mask=u,a.maskId=r.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var r=a.children,s=a.attributes,u=a.main,l=a.mask,c=a.maskId,f=a.transform,p=u.width,g=u.icon,v=l.width,C=l.icon,S=Mi({transform:f,containerWidth:v,iconWidth:p}),D={tag:"rect",attributes:m(m({},Bt),{},{fill:"white"})},N=g.children?{children:g.children.map(sr)}:{},R={tag:"g",attributes:m({},S.inner),children:[sr(m({tag:g.tag,attributes:m(m({},g.attributes),S.path)},N))]},y={tag:"g",attributes:m({},S.outer),children:[R]},w="mask-".concat(c||La()),F="clip-".concat(c||La()),B={tag:"mask",attributes:m(m({},Bt),{},{id:w,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[D,y]},W={tag:"defs",children:[{tag:"clipPath",attributes:{id:F},children:Vo(C)},B]};return r.push(W,{tag:"rect",attributes:m({fill:"currentColor","clip-path":"url(#".concat(F,")"),mask:"url(#".concat(w,")")},Bt)}),{children:r,attributes:s}}}},Ho={provides:function(t){var a=!1;Ie.matchMedia&&(a=Ie.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],s={fill:"currentColor"},u={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:m(m({},s),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var l=m(m({},u),{},{attributeName:"opacity"}),c={tag:"circle",attributes:m(m({},s),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||c.children.push({tag:"animate",attributes:m(m({},u),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:m(m({},l),{},{values:"1;0;1;1;0;1;"})}),r.push(c),r.push({tag:"path",attributes:m(m({},s),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:m(m({},l),{},{values:"1;0;0;0;0;1;"})}]}),a||r.push({tag:"path",attributes:m(m({},s),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:m(m({},l),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Go={hooks:function(){return{parseNodeAttributes:function(a,r){var s=r.getAttribute("data-fa-symbol"),u=s===null?!1:s===""?!0:s;return a.symbol=u,a}}}},Ko=[Li,Eo,Io,No,jo,Uo,qo,Bo,Yo,Ho,Go];to(Ko,{mixoutsTo:se});se.noAuto;se.config;se.library;se.dom;var ia=se.parse;se.findIconDefinition;se.toHtml;var Xo=se.icon;se.layer;se.text;se.counter;function K(e,t,a){return(t=el(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function ir(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),a.push.apply(a,r)}return a}function _e(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?ir(Object(a),!0).forEach(function(r){K(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ir(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function Jo(e,t){if(e==null)return{};var a,r,s=Qo(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)a=u[r],t.indexOf(a)===-1&&{}.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}function Qo(e,t){if(e==null)return{};var a={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;a[r]=e[r]}return a}function Zo(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function el(e){var t=Zo(e,"string");return typeof t=="symbol"?t:t+""}function Pt(e){"@babel/helpers - typeof";return Pt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pt(e)}function Vt(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?K({},e,t):{}}function tl(e){var t,a=(t={"fa-spin":e.spin,"fa-pulse":e.pulse,"fa-fw":e.fixedWidth,"fa-border":e.border,"fa-li":e.listItem,"fa-inverse":e.inverse,"fa-flip":e.flip===!0,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both"},K(K(K(K(K(K(K(K(K(K(t,"fa-".concat(e.size),e.size!==null),"fa-rotate-".concat(e.rotation),e.rotation!==null),"fa-rotate-by",e.rotateBy),"fa-pull-".concat(e.pull),e.pull!==null),"fa-swap-opacity",e.swapOpacity),"fa-bounce",e.bounce),"fa-shake",e.shake),"fa-beat",e.beat),"fa-fade",e.fade),"fa-beat-fade",e.beatFade),K(K(K(K(t,"fa-flash",e.flash),"fa-spin-pulse",e.spinPulse),"fa-spin-reverse",e.spinReverse),"fa-width-auto",e.widthAuto));return Object.keys(a).map(function(r){return a[r]?r:null}).filter(function(r){return r})}var al=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},dn={exports:{}};(function(e){(function(t){var a=function(y,w,F){if(!p(w)||v(w)||C(w)||S(w)||f(w))return w;var B,W=0,A=0;if(g(w))for(B=[],A=w.length;W<A;W++)B.push(a(y,w[W],F));else{B={};for(var ie in w)Object.prototype.hasOwnProperty.call(w,ie)&&(B[y(ie,F)]=a(y,w[ie],F))}return B},r=function(y,w){w=w||{};var F=w.separator||"_",B=w.split||/(?=[A-Z])/;return y.split(B).join(F)},s=function(y){return D(y)?y:(y=y.replace(/[\-_\s]+(.)?/g,function(w,F){return F?F.toUpperCase():""}),y.substr(0,1).toLowerCase()+y.substr(1))},u=function(y){var w=s(y);return w.substr(0,1).toUpperCase()+w.substr(1)},l=function(y,w){return r(y,w).toLowerCase()},c=Object.prototype.toString,f=function(y){return typeof y=="function"},p=function(y){return y===Object(y)},g=function(y){return c.call(y)=="[object Array]"},v=function(y){return c.call(y)=="[object Date]"},C=function(y){return c.call(y)=="[object RegExp]"},S=function(y){return c.call(y)=="[object Boolean]"},D=function(y){return y=y-0,y===y},N=function(y,w){var F=w&&"process"in w?w.process:w;return typeof F!="function"?y:function(B,W){return F(B,y,W)}},R={camelize:s,decamelize:l,pascalize:u,depascalize:l,camelizeKeys:function(y,w){return a(N(s,w),y)},decamelizeKeys:function(y,w){return a(N(l,w),y,w)},pascalizeKeys:function(y,w){return a(N(u,w),y)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=R:t.humps=R})(al)})(dn);var rl=dn.exports,nl=["class","style"];function sl(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,a){var r=a.indexOf(":"),s=rl.camelize(a.slice(0,r)),u=a.slice(r+1).trim();return t[s]=u,t},{})}function il(e){return e.split(/\s+/).reduce(function(t,a){return t[a]=!0,t},{})}function cn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var r=(e.children||[]).map(function(f){return cn(f)}),s=Object.keys(e.attributes||{}).reduce(function(f,p){var g=e.attributes[p];switch(p){case"class":f.class=il(g);break;case"style":f.style=sl(g);break;default:f.attrs[p]=g}return f},{attrs:{},class:{},style:{}});a.class;var u=a.style,l=u===void 0?{}:u,c=Jo(a,nl);return In(e.tag,_e(_e(_e({},t),{},{class:s.class,style:_e(_e({},s.style),l)},s.attrs),c),r)}var fn=!1;try{fn=!0}catch{}function ol(){if(!fn&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function or(e){if(e&&Pt(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(ia.icon)return ia.icon(e);if(e===null)return null;if(Pt(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}var ll=En({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(t){return[!0,!1,"horizontal","vertical","both"].indexOf(t)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},maskId:{type:String,default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(t){return["right","left"].indexOf(t)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(t){return[90,180,270].indexOf(Number.parseInt(t,10))>-1}},rotateBy:{type:Boolean,default:!1},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(t)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},titleId:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1},widthAuto:{type:Boolean,default:!1}},setup:function(t,a){var r=a.attrs,s=X(function(){return or(t.icon)}),u=X(function(){return Vt("classes",tl(t))}),l=X(function(){return Vt("transform",typeof t.transform=="string"?ia.transform(t.transform):t.transform)}),c=X(function(){return Vt("mask",or(t.mask))}),f=X(function(){var g=_e(_e(_e(_e({},u.value),l.value),c.value),{},{symbol:t.symbol,maskId:t.maskId});return g.title=t.title,g.titleId=t.titleId,Xo(s.value,g)});lr(f,function(g){if(!g)return ol("Could not find one or more icon(s)",s.value,c.value)},{immediate:!0});var p=X(function(){return f.value?cn(f.value.abstract[0],{},r):null});return function(){return p.value}}});/*!
 * Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */var ul={prefix:"fas",iconName:"weight-scale",icon:[448,512,["weight"],"f496","M116.6 192c-3-10.1-4.6-20.9-4.6-32 0-61.9 50.1-112 112-112S336 98.1 336 160c0 11.1-1.6 21.9-4.6 32l-71 0 24.6-44.3c6.4-11.6 2.3-26.2-9.3-32.6s-26.2-2.3-32.6 9.3l-37.6 67.7-88.8 0zM128 32L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-64 0C293.3 11.9 260 0 224 0s-69.3 11.9-96 32z"]};const dl={class:"p-3 mx-auto space-y-4 max-w-7xl sm:p-6"},cl={class:"flex items-center gap-2 pb-1 overflow-x-auto no-scrollbar"},fl={key:0,class:"p-10 text-center card"},ml={key:1,class:"grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"},pl=["onClick"],vl={class:"flex items-start justify-between gap-2"},gl={class:"flex items-center min-w-0 gap-2"},yl={class:"font-bold text-gray-900"},bl={class:"text-base font-extrabold text-mantis-700 tabular-nums shrink-0"},hl={class:"mt-2.5 space-y-1"},xl={class:"flex items-center justify-between gap-2"},wl={class:"font-semibold text-gray-900 truncate"},_l={key:0,class:"text-xs text-gray-500 shrink-0 tabular-nums"},kl={class:"text-xs text-gray-600 line-clamp-2"},Al={key:0,class:"flex flex-wrap gap-1 mt-3"},Sl={key:0,class:"px-2 py-0.5 text-[11px] font-semibold text-mantis-700 bg-mantis-50 rounded-md"},Cl=["onClick"],Pl={class:"truncate max-w-[115px]"},$l={class:"flex items-center gap-1.5"},Ol=["onClick"],El=["onClick"],Il=["onClick"],Nl={key:0,class:"modal-backdrop"},jl={class:"modal-sheet w-full max-w-6xl lg:h-[90vh]"},Fl={class:"modal-header shrink-0"},Tl={class:"flex items-center gap-2.5 min-w-0"},Ml={class:"truncate modal-title"},Dl={class:"px-2.5 py-0.5 text-xs font-bold rounded-full bg-mantis-100 text-mantis-800 tabular-nums shrink-0"},zl={class:"grid grid-cols-3 border-b border-gray-200 bg-gray-50 shrink-0 lg:hidden"},Ll={key:0,class:"w-1.5 h-1.5 rounded-full bg-mantis-600"},Rl={key:0,class:"text-white badge bg-mantis-600"},Wl={class:"flex flex-col flex-1 min-h-0 overflow-hidden lg:grid lg:grid-cols-12"},Ul={class:"relative"},ql={class:"flex gap-1.5"},Bl={class:"relative flex-1"},Vl={key:0,class:"absolute left-0 right-0 z-20 mt-1 overflow-y-auto bg-white border border-gray-200 divide-y divide-gray-100 shadow-lg rounded-xl max-h-52"},Yl=["onClick"],Hl={class:"font-semibold text-gray-900"},Gl={class:"text-xs text-gray-500"},Kl={class:"grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"},Xl={key:0,class:"flex flex-wrap gap-1.5 mb-1.5"},Jl=["onClick"],Ql={class:"border border-gray-200 rounded-xl bg-gray-50/70"},Zl={key:0,class:"grid grid-cols-1 gap-2 px-3 pb-3 sm:grid-cols-2 lg:grid-cols-1"},eu={class:"grid grid-cols-3 gap-1.5"},tu={key:0,class:"mt-2"},au={class:"grid grid-cols-1 gap-2"},ru={class:"pt-2 mt-auto lg:hidden"},nu={class:"p-3 space-y-2.5 bg-white border-b border-gray-200 shrink-0"},su={class:"relative"},iu={class:"flex items-center gap-1.5 overflow-x-auto no-scrollbar"},ou=["onClick"],lu={class:"flex-1 min-h-0 p-3 space-y-4 overflow-y-auto"},uu={key:0,class:"py-10 text-sm text-center text-gray-500"},du={class:"text-xs font-bold tracking-wider text-gray-400 uppercase"},cu={class:"grid grid-cols-2 gap-2 xl:grid-cols-3"},fu=["onClick"],mu={class:"flex items-start justify-between gap-1"},pu={class:"text-xs font-semibold text-left text-gray-800 line-clamp-2"},vu={key:0,class:"px-1.5 py-0.5 text-[10px] font-bold text-white rounded-full bg-mantis-600 shrink-0 tabular-nums"},gu={class:"flex items-center justify-between w-full pt-2 mt-auto"},yu={class:"text-xs font-bold text-mantis-700 tabular-nums"},bu={key:0,class:"pi pi-sliders-h text-[11px] text-amber-600"},hu={key:0,class:"p-3 bg-white border-t border-gray-200 shrink-0 lg:hidden"},xu={class:"font-extrabold tabular-nums"},wu={class:"flex-1 min-h-0 overflow-y-auto bg-white divide-y divide-gray-200/80"},_u={key:0,class:"flex flex-col items-center justify-center h-40 p-6 text-center text-gray-400"},ku={class:"flex-1 min-w-0"},Au={class:"flex items-center gap-1.5 min-w-0"},Su={class:"text-xs font-semibold text-gray-900 truncate"},Cu={key:0,class:"px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-100 rounded shrink-0"},Pu={class:"text-[11px] text-gray-500 tabular-nums"},$u={class:"flex items-center gap-2 shrink-0"},Ou={class:"stepper"},Eu=["onClick"],Iu=["onClick"],Nu={class:"text-xs font-bold text-right text-gray-900 w-14 tabular-nums"},ju=["onClick"],Fu={class:"p-3 space-y-2.5 bg-white border-t border-gray-200 shrink-0"},Tu={class:"flex items-center justify-between cursor-pointer select-none"},Mu={key:0,class:"p-2.5 space-y-2 rounded-xl bg-amber-50/70 border border-amber-200"},Du={class:"flex items-center gap-2"},zu={class:"segmented shrink-0"},Lu={class:"space-y-1 text-xs"},Ru={class:"flex justify-between text-gray-600"},Wu={class:"font-medium tabular-nums"},Uu={key:0,class:"flex justify-between text-amber-700"},qu={class:"font-medium tabular-nums"},Bu={class:"flex justify-between pt-1.5 text-base font-extrabold text-gray-900 border-t border-gray-100"},Vu={class:"text-mantis-700 tabular-nums"},Yu={class:"flex gap-2 pt-1 pb-safe"},Hu={key:1,class:"modal-backdrop"},Gu={class:"modal-sheet w-full max-w-3xl lg:h-auto lg:max-h-[90vh]"},Ku={class:"modal-header shrink-0"},Xu={class:"flex items-center gap-2.5"},Ju={class:"modal-title"},Qu={class:"flex-1 min-h-0 p-4 space-y-4 overflow-y-auto sm:p-5"},Zu={class:"grid grid-cols-1 gap-4 md:grid-cols-5"},ed={class:"space-y-3 md:col-span-2"},td={class:"p-3.5 space-y-2 border border-gray-200 rounded-xl bg-gray-50/60"},ad={class:"font-bold text-gray-900"},rd={key:0,class:"text-xs text-gray-600"},nd={class:"text-xs text-gray-700 whitespace-pre-line"},sd={class:"pt-2 space-y-1 text-xs text-gray-600 border-t border-gray-200"},id={key:0},od={class:"text-mantis-700"},ld={class:"p-3.5 space-y-1.5 border border-gray-200 rounded-xl bg-white"},ud={class:"flex justify-between text-xs text-gray-600"},dd={class:"font-medium tabular-nums"},cd={key:0,class:"text-xs text-amber-700"},fd={class:"flex justify-between"},md={key:0},pd={class:"tabular-nums"},vd={key:0,class:"text-[11px] text-amber-600 mt-0.5"},gd={class:"flex justify-between pt-1.5 text-base font-extrabold border-t border-gray-100"},yd={class:"text-mantis-700 tabular-nums"},bd={class:"md:col-span-3"},hd={key:0,class:"overflow-hidden bg-white border border-gray-200 divide-y divide-gray-100 rounded-xl"},xd={class:"min-w-0"},wd={class:"font-medium text-gray-900 truncate"},_d={class:"text-xs text-gray-500 tabular-nums"},kd={class:"font-bold text-gray-900 tabular-nums shrink-0"},Ad={key:1,class:"p-6 text-sm text-center text-gray-500 border border-gray-200 rounded-xl"},Sd={class:"flex-wrap justify-between gap-2 modal-footer pb-safe"},Cd={class:"flex flex-wrap gap-2"},Pd={class:"flex flex-wrap gap-2 ml-auto"},$d={key:2,class:"modal-backdrop"},Od={class:"w-full max-w-md modal-sheet lg:h-auto"},Ed={class:"p-4 space-y-2 max-h-[60vh] overflow-y-auto"},Id={key:0,class:"text-xs pi pi-check text-mantis-600"},Nd=["onClick"],jd={class:"flex items-center gap-2"},Fd={key:0,class:"text-xs pi pi-check text-mantis-600"},Td={key:3,class:"modal-backdrop"},Md={class:"w-full max-w-sm modal-sheet lg:h-auto"},Dd={class:"modal-header"},zd={class:"flex items-center gap-2 modal-title"},Ld={class:"p-4 space-y-3"},Rd={class:"justify-end gap-2 modal-footer pb-safe"},Hd={__name:"index",props:{orders:{type:Array,default:()=>[]},products:{type:Array,default:()=>[]},riders:{type:Array,default:()=>[]}},setup(e){const t=j(window.innerWidth<768),a=()=>{t.value=window.innerWidth<768};Nn(()=>{window.addEventListener("resize",a)}),jn(()=>{window.removeEventListener("resize",a)});const r=Fn(),s=Tn(),u=e,l=j("all"),c=j("customer"),f=j(""),p=j("all"),g=j(!1),v=o=>(Number(o)||0).toFixed(2),C=(o,n)=>o.temp_id||(o.is_manual_price?`m-${o.id}-${n}`:`p-${o.id}`),S=X(()=>{const o=u.orders||[];return{all:o.length,abierta:o.filter(n=>n.status==="abierta").length,asignada:o.filter(n=>n.status==="asignada").length,en_camino:o.filter(n=>n.status==="en_camino").length}}),D=X(()=>{const o=u.orders||[];return l.value==="all"?o:o.filter(n=>n.status===l.value)});function N(o){switch(o){case"abierta":return{label:"Abierta",badge:"bg-amber-100 text-amber-800 border-amber-200"};case"asignada":return{label:"Asignada",badge:"bg-mantis-100 text-mantis-800 border-mantis-200"};case"en_camino":return{label:"En camino",badge:"bg-gray-900 text-white border-gray-900"};case"entregada":return{label:"Entregada",badge:"bg-gray-100 text-gray-700 border-gray-200"};case"cancelada":return{label:"Cancelada",badge:"bg-red-100 text-red-700 border-red-200"};default:return{label:(o||"Pendiente").replace("_"," "),badge:"bg-gray-100 text-gray-700 border-gray-200"}}}const R=X(()=>Object.keys(ba.value||{})),y=X(()=>{const o=ba.value||{},n=f.value.trim().toLowerCase();return(p.value==="all"?Object.keys(o):o[p.value]?[p.value]:[]).map(d=>({category:d,items:(o[d]||[]).filter(b=>!n||(b.name||"").toLowerCase().includes(n))})).filter(d=>d.items.length>0)}),w=X(()=>U.value.reduce((o,n)=>o+(Number(n.quantity)||0),0)),F=X(()=>{const o={};for(const n of U.value)o[n.id]=(o[n.id]||0)+(Number(n.quantity)||0);return o}),B=X(()=>pt(mt.value,oe.value)),W=j(!1),A=j(null),ie=j("");function qe(o){A.value=o,W.value=!0}function ct(){W.value=!1,A.value=null}const ba=X(()=>{const o=u.products.reduce((d,b)=>{const P=b.category||"Sin categoría";return d[P]||(d[P]=[]),d[P].push(b),d},{}),n=Object.keys(o).sort((d,b)=>{const P=d.toLowerCase()==="sopas",q=b.toLowerCase()==="sopas";return P&&!q?-1:!P&&q?1:d.localeCompare(b)}),O={};for(const d of n)O[d]=o[d];return O}),Be=j(!1),Ve=j(!1),ft=j(null),ha=()=>({id:null,name:"",phone:"",fiscal_name:"",fiscal_ruc:"",addresses:[],selectedAddress:""}),$=j(ha()),Fe=j(""),Ye=j([]),U=j([]);let xa=null;const Te=j(!1),de=j("amount"),Ce=j(0),Pe=j(""),oe=j(null),Qe=j(!1),jt=j(null),Ze=j(0),et=j(""),ee=j(""),Me=j(0),tt=j("");function mn(){wa(),U.value=[],Ve.value=!1,ft.value=null,et.value="",ee.value="null",Me.value=0,tt.value="",Te.value=!1,de.value="amount",Ce.value=0,Pe.value="",oe.value=null,c.value="customer",f.value="",p.value="all",g.value=!1,Be.value=!0}function wa(){$.value=ha(),Fe.value="",Ye.value=[]}function pn(){clearTimeout(xa),Ye.value=[],!(Fe.value.length<2)&&(xa=setTimeout(async()=>{try{const o=await xe.get(we("customers.search"),{params:{term:Fe.value}});Ye.value=o.data}catch(o){console.error("Error buscando clientes:",o)}},300))}function vn(o){$.value.id=o.id,$.value.name=o.name,$.value.phone=o.phone,$.value.fiscal_name=o.fiscal_name,$.value.fiscal_ruc=o.fiscal_ruc,$.value.addresses=o.addresses,o.addresses&&o.addresses.length>0?$.value.selectedAddress=o.addresses[0].address:$.value.selectedAddress="",Fe.value=o.name,Ye.value=[]}function gn(o){if(o.is_generic){hn(o);return}const n=U.value.find(O=>O.id===o.id&&!O.is_manual_price);n?n.quantity+=1:U.value.push({...o,quantity:1,is_manual_price:!1})}function Ft(o){const n=U.value.indexOf(o);return n!==-1?n:U.value.findIndex(O=>O.temp_id&&O.temp_id===o.temp_id||!O.temp_id&&!o.temp_id&&O.id===o.id)}function yn(o){const n=Ft(o);if(n!==-1){if(U.value[n].is_active===!1){r.add({severity:"warn",summary:"Producto inactivo",detail:`No se pueden agregar más unidades de "${U.value[n].name}" porque ya no está activo.`,life:3500});return}U.value[n].quantity+=1}}function bn(o){const n=Ft(o);n!==-1&&(U.value[n].quantity>1?U.value[n].quantity-=1:_a(o))}function _a(o){const n=Ft(o);n!==-1&&U.value.splice(n,1)}const mt=X(()=>U.value.reduce((o,n)=>o+n.price*n.quantity,0)),at=X(()=>{const o=mt.value;if(!oe.value)return o;const n=pt(o,oe.value);return o-n});function pt(o,n){return!n||n.value<=0?0:n.type==="percent"?o*Math.min(n.value,100)/100:Math.min(n.value,o)}lr([Te,de,Ce,Pe],([o])=>{if(!o){oe.value=null,Ce.value=0,Pe.value="";return}de.value||(de.value="amount");const n=Number(Ce.value)||0;oe.value=n>0?{type:de.value,value:n,reason:Pe.value||""}:null});function hn(o){jt.value=o,Ze.value=0,Qe.value=!0}function ka(){if(Ze.value<=0){r.add({severity:"warn",summary:"Precio Inválido",detail:"El precio debe ser mayor a 0.",life:3e3});return}const o={...jt.value,price:parseFloat(Ze.value),quantity:1,is_manual_price:!0,temp_id:`manual_${Date.now()}`};U.value.push(o),Qe.value=!1}function xn(){if(!A.value)return;const o=A.value;$.value={id:o.customer_id||null,name:o.customer_name||"",phone:o.customer_phone||"",fiscal_name:o.fiscal_name||"",fiscal_ruc:o.fiscal_ruc||"",addresses:[],selectedAddress:o.delivery_address||""},U.value=(o.items||[]).map(n=>({id:n.product_id,name:n.product_name,price:parseFloat(n.price),quantity:n.quantity,is_generic:!1,is_manual_price:!1,is_active:n.is_active??!0})),o.discount_type&&o.discount_value?(Te.value=!0,de.value=o.discount_type,Ce.value=parseFloat(o.discount_value),Pe.value=o.discount_reason||"",oe.value={type:o.discount_type,value:parseFloat(o.discount_value),reason:o.discount_reason}):(Te.value=!1,oe.value=null,Ce.value=0,Pe.value=""),et.value=o.indications||"",ee.value=o.payment_method||"cash",Me.value=parseFloat(o.cash_amount||0),tt.value=o.delivery_notes||"",g.value=!!(o.fiscal_name||o.fiscal_ruc),c.value="order",f.value="",p.value="all",Ve.value=!0,ft.value=o.id,W.value=!1,Be.value=!0}function wn(){var O,d,b;if(!$.value.name){r.add({severity:"error",summary:"Error de Validación",detail:"Por favor, complete el nombre del cliente.",life:4e3});return}if(!$.value.selectedAddress){r.add({severity:"error",summary:"Error de Validación",detail:"Debe ingresar una dirección de entrega.",life:4e3});return}if(U.value.length===0){r.add({severity:"error",summary:"Error de Validación",detail:"Debe agregar al menos un producto a la orden.",life:4e3});return}if(!ee.value||ee.value==="null"){r.add({severity:"error",summary:"Error de Validación",detail:"Debe seleccionar un método de pago.",life:4e3});return}ee.value==="cash"&&Me.value>0&&Me.value<at.value&&r.add({severity:"warn",summary:"Aviso",detail:"El efectivo recibido es menor que el total de la orden.",life:5e3});const o={customer:{id:$.value.id,name:$.value.name,phone:$.value.phone,fiscal_name:$.value.fiscal_name,fiscal_ruc:$.value.fiscal_ruc},address:$.value.selectedAddress,products:U.value.map(P=>({id:P.id,quantity:P.quantity,price:P.price,is_generic:!!P.is_generic,is_manual_price:!!P.is_manual_price})),total:at.value,discount_type:((O=oe.value)==null?void 0:O.type)||null,discount_value:((d=oe.value)==null?void 0:d.value)||0,discount_reason:((b=oe.value)==null?void 0:b.reason)||"",calculated_discount:pt(mt.value,oe.value),indications:et.value,payment_method:ee.value,cash_amount:ee.value==="cash"?Me.value:0,delivery_notes:tt.value};(Ve.value?xe.put(we("delivery.update",{order:ft.value}),o):xe.post(we("delivery.store"),o)).then(()=>{Be.value=!1,r.add({severity:"success",summary:"Éxito",detail:Ve.value?"Orden actualizada.":"Orden de delivery creada correctamente.",life:3e3}),setTimeout(()=>location.reload(),800)}).catch(P=>{var Y,ye,be,$e,ce,fe,me;console.error("Error guardando la orden:",((Y=P.response)==null?void 0:Y.data)||P);const q=((ce=($e=(be=(ye=P.response)==null?void 0:ye.data)==null?void 0:be.errors)==null?void 0:$e.products)==null?void 0:ce[0])||((me=(fe=P.response)==null?void 0:fe.data)==null?void 0:me.message)||"Hubo un error al guardar la orden. Revise los datos.";r.add({severity:"error",summary:"Error",detail:q,life:4e3})})}function _n(o){s.require({group:"delivery",message:"¿Estás seguro de que deseas anular esta orden? Esta acción no se puede deshacer y también anulará cualquier factura asociada.",header:"Confirmar Anulación",icon:"pi pi-exclamation-triangle",acceptLabel:"Sí, Anular",rejectLabel:"No",accept:()=>{kn(o)},reject:()=>{r.add({severity:"info",summary:"Cancelado",detail:"La anulación de la orden fue cancelada.",life:3e3})}})}async function kn(o){var n,O,d;try{const b=await xe.post(we("delivery.cancel",{order:o.id}));r.add({severity:"success",summary:"Éxito",detail:b.data.message,life:4e3}),ct(),setTimeout(()=>location.reload(),1e3)}catch(b){console.error("Error al anular la orden:",((n=b.response)==null?void 0:n.data)||b);const P=((d=(O=b.response)==null?void 0:O.data)==null?void 0:d.message)||"No se pudo anular la orden.";r.add({severity:"error",summary:"Error",detail:P,life:5e3})}}const Tt=j(!1),ae=j({orderId:null,rider_id:null});function Aa(o){ae.value.orderId=o.id,ae.value.rider_id=o.assigned_to??(o.rider?o.rider.id:null),Tt.value=!0}function Mt(){ae.value={orderId:null,rider_id:null},Tt.value=!1}async function An(){var o,n;if(ae.value.orderId)try{const O=await xe.put(we("delivery.assignRider",{order:ae.value.orderId}),{rider_id:ae.value.rider_id});r.add({severity:"success",summary:"OK",detail:"Rider asignado",life:2e3});const d=((o=O.data)==null?void 0:o.order)||u.orders.find(b=>b.id===ae.value.orderId)||A.value;d&&Sn(d),setTimeout(()=>location.reload(),800),Mt()}catch(O){console.error("Error asignando rider",((n=O.response)==null?void 0:n.data)||O),r.add({severity:"error",summary:"Error",detail:"No se pudo asignar el rider",life:4e3})}}function Sn(o){var re,Ee,gt,Sa;if(!o)return;const n={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0},O=new Date().toLocaleString("es-MX",n),d="Delivery",b=o.customer_name||((re=o.customer)==null?void 0:re.name)||o.fiscal_name||"—",P=o.customer_phone||((Ee=o.customer)==null?void 0:Ee.phone)||o.phone||"—",q=o.delivery_address||o.address||((gt=o.customer)==null?void 0:gt.selectedAddress)||"—",Y=o.indications||o.delivery_notes||"",be={cash:"Efectivo",card:"Tarjeta",bank_transfer:"Transferencia"}[o.payment_method]||o.payment_method||"—",$e=o.cash_amount||0,ce=(o.items||o.order_items||[]).map(G=>{var $a;const Dt=G.product_name||G.name||(($a=G.product)==null?void 0:$a.name)||"Producto",Ca=Number(G.quantity??G.qty??1),Pa=Number(G.price??G.unit_price??0),On=+(Ca*Pa).toFixed(2);return{name:Dt,qty:Ca,price:Pa,lineSubtotal:On}}),fe=ce.reduce((G,Dt)=>G+Dt.lineSubtotal,0),me=Number(o.total??fe),De=ce.map(G=>`
    <tr>
      <td style="padding:4px 6px; width:30px;">${V(G.qty)}</td>
      <td style="padding:4px 6px;">${V(G.name)}</td>
      <td style="padding:4px 6px; text-align:right; width:56px;">${G.price.toFixed(2)}</td>
      <td style="padding:4px 6px; text-align:right; width:64px;">${G.lineSubtotal.toFixed(2)}</td>
    </tr>
  `).join(""),ze=typeof u<"u"&&u.riders?u.riders.find(G=>G.id===o.assigned_to):null,Le=((Sa=o.rider)==null?void 0:Sa.name)||(ze==null?void 0:ze.name)||(o.assigned_to?`Rider #${o.assigned_to}`:"—"),Oe=Number(o.discount_amount??0),T=o.discount_type||null,L=o.discount_value!=null?Number(o.discount_value):null,Q=T==="percent"?`(${L??0}%)`:"",Z=`
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
        <p><strong>Tipo:</strong> ${V(d)}</p>

        ${`<p><strong>Cliente:</strong> ${V(b)}</p>`}
        ${`<p><strong>Teléfono:</strong> ${V(P)}</p>`}
        ${`<p><strong>Dirección:</strong> ${V(q)}</p>`}
        ${Y?`<p><strong>Indicaciones:</strong> ${V(Y)}</p>`:""}
        <p><strong>Método de Pago:</strong> ${V(be)}</p>
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

        <div class="footer">Asignado a Rider: ${V(Le)}</div>
        <div style="margin-top: 50px;">.</div>

        <script>
          window.onload = function() { try { window.print(); } catch(e) {} };
        <\/script>
      </body>
    </html>
  `,H=window.open("","_blank");if(!H){alert("Por favor permite ventanas emergentes para imprimir el RiderPaper.");return}H.document.open(),H.document.write(Z),H.document.close()}async function Cn(){try{const n=await(await fetch("/next-invoice-number")).json();ie.value=n.invoice_number}catch(o){console.error("Error al obtener número de factura:",o),r.add({severity:"error",summary:"Error",detail:"No se pudo obtener el número de factura.",life:3e3})}}async function vt(o,n){var O,d,b;if(!(!o||!o.id))try{const P=await xe.put(we("delivery.updateStatus",{order:o.id}),{status:n});r.add({severity:"success",summary:"OK",detail:"Estado actualizado",life:2e3});let q=null;try{const Y=await xe.get(we("delivery.show",{order:o.id}));q=((O=Y.data)==null?void 0:O.order)||Y.data}catch(Y){console.warn("No se pudo obtener la orden completa tras cambiar estado, usando datos locales.",Y),q=((d=P.data)==null?void 0:d.order)||{...o,status:n}}n==="en_camino"&&(await Pn(q),window.location.reload()),n==="entregada"&&window.location.reload()}catch(P){console.error("Error cambiando estado",((b=P.response)==null?void 0:b.data)||P),r.add({severity:"error",summary:"Error",detail:"No se pudo cambiar el estado",life:4e3})}}async function Pn(o){var me,De,ze,Le,Oe;if(!o||!o.id){console.warn("generateDeliveryInvoice: faltó pasar la orden");return}if(!o.items||!o.items.length)try{const T=await xe.get(we("delivery.show",{order:o.id}));o=((me=T.data)==null?void 0:me.order)||T.data||o}catch(T){console.warn("No se pudo obtener orden completa dentro de generateDeliveryInvoice, se continúa con lo disponible.",T)}if(ie.value||await Cn(),!ie.value){r.add({severity:"error",summary:"Error",detail:"No se obtuvo número de factura.",life:4e3});return}const n=A.value&&A.value.id===o.id?A.value:o,O=n.items||n.order_items||[],d=O.reduce((T,L)=>{const Q=Number(L.price??L.unit_price??0),Z=Number(L.quantity??L.qty??1);return T+Q*Z},0),b=n.discount_type||null,P=n.discount_value!=null?Number(n.discount_value):0;let q=Number(n.discount_amount??0);if((!q||q===0)&&b&&P)try{q=pt(d,{type:b==="percent"?"percent":"amount",value:P})}catch{q=b==="percent"?d*P/100:P}const Y=n.subtotal!=null?Number(n.subtotal):Number(d.toFixed(2)),ye=q||0,be=n.total!=null?Number(n.total):Number((Y-ye).toFixed(2)),$e=n.fiscal_name||n.customer&&n.customer.fiscal_name||"",ce=n.fiscal_ruc||n.customer&&n.customer.fiscal_ruc||"",fe={invoice_number:ie.value,order_id:n.id,fiscal_name:$e,fiscal_ruc:ce,subtotal:Y,discount_type:b,discount_value:P,discount_reason:n.discount_reason||"",discount_amount:ye,total:be};try{const T=await xe.post(we("invoices.delivery.store"),fe),L=((De=T.data)==null?void 0:De.invoice_number)||ie.value;ie.value="";let Q=((ze=T.data)==null?void 0:ze.invoice)??T.data;(!Q||!Q.items)&&(Q={invoice_number:L,created_at:new Date().toISOString(),order_id:n.id,fiscal_name:$e,fiscal_ruc:ce,customer_name:n.customer_name||n.customer&&n.customer.name||"",customer_phone:n.customer_phone||n.customer&&n.customer.phone||"",delivery_address:n.delivery_address||n.address||"",items:O.map(re=>{var Ee;return{product_name:re.product_name||re.name||((Ee=re.product)==null?void 0:Ee.name)||"Producto",quantity:Number(re.quantity??re.qty??1),price:Number(re.price??re.unit_price??0)}}),subtotal:Y,discount_amount:ye,discount_type:b,discount_value:P,discount_reason:n.discount_reason||"",total:be,payment_method:n.payment_method||"",cash_amount:n.cash_amount||0,rider_name:n.rider_name||(n.assigned_to?`Rider #${n.assigned_to}`:"")});const Z=$n(Q),H=window.open("","_blank");return H?(H.document.open(),H.document.write(Z),H.document.close(),r.add({severity:"success",summary:"Éxito",detail:"Factura generada e impresa.",life:3e3}),T.data):(r.add({severity:"warn",summary:"Aviso",detail:"Permita ventanas emergentes para imprimir la factura.",life:4e3}),T.data)}catch(T){console.error("Error al generar factura de delivery:",T);const L=(Le=T==null?void 0:T.response)==null?void 0:Le.data;if(L!=null&&L.errors){const Q=Object.values(L.errors).flat().join(" — ");r.add({severity:"error",summary:"Validación",detail:Q,life:6e3})}else{const Q=(L==null?void 0:L.message)||(typeof L=="string"?L:null)||((Oe=T==null?void 0:T.response)==null?void 0:Oe.statusText)||"No se pudo generar la factura de entrega.";r.add({severity:"error",summary:"Error",detail:Q,life:5e3})}return null}}function rt(o){return Number(o??0).toFixed(2)}function V(o){return o==null?"":String(o).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function $n(o){var Le,Oe,T,L,Q;if(!o)return"";const n={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0},O=new Date(o.created_at||Date.now()).toLocaleString("es-MX",n),d=o.items||o.order_items||o.products||[],b=d.map(Z=>{const H=Z.product_name||Z.name||Z.description||"Producto",re=Number(Z.quantity??Z.qty??1),Ee=Number(Z.price??Z.unit_price??0),gt=re*Ee;return`
      <tr>
        <td style="padding:6px 4px; width:32px;">${re}</td>
        <td style="padding:6px 4px;">${V(H)}</td>
        <td style="padding:6px 4px; text-align:right; width:60px;">${rt(Ee)}</td>
        <td style="padding:6px 4px; text-align:right; width:70px;">${rt(gt)}</td>
      </tr>
    `}).join(""),P=Number(o.subtotal??d.reduce((Z,H)=>Z+Number(H.price??H.unit_price??0)*Number(H.quantity??H.qty??1),0)),q=Number(o.discount_amount??o.discount??0),Y=o.discount_type||(o.discount_percent?"percent":o.discount_amount?"amount":null),ye=o.discount_value??o.discount_percent??null,be=Number(o.total??P-q);({cash:"Efectivo",card:"Tarjeta",bank_transfer:"Transferencia"})[o.payment_method]||o.payment_method,Number(o.cash_amount??0);const ce=Y==="percent"?`(${ye??0}%)`:"",fe=o.fiscal_name||((Le=o.customer)==null?void 0:Le.fiscal_name)||"",me=o.fiscal_ruc||((Oe=o.customer)==null?void 0:Oe.fiscal_ruc)||"",De=o.customer_name||((T=o.customer)==null?void 0:T.name)||"";return o.customer_phone||(L=o.customer)!=null&&L.phone,o.delivery_address||o.address||(Q=o.customer)!=null&&Q.selectedAddress,`
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
        ${b}
      </tbody>
    </table>

    <!-- Totales -->
    <div class="total">Subtotal: C$${rt(P)}</div>
    ${q>0?`
      <div class="total">Descuento ${ce}: -C$${rt(q)}</div>
      ${o.discount_reason?'<div class="muted"></div>':""}
    `:""}
    <div class="total">Total: C$${rt(be)}</div>

    

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


  `}return(o,n)=>(h(),Mn(Rn,{title:"Delivery"},{header:Oa(()=>[yt(Wn)]),default:Oa(()=>{var O;return[yt(bt(Un)),yt(bt(qn),{group:"delivery"}),i("div",dl,[i("div",{class:"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"},[n[43]||(n[43]=i("div",null,[i("h1",{class:"text-xl font-bold text-gray-900 sm:text-2xl"},"Órdenes Delivery"),i("p",{class:"text-xs text-gray-500"},"Gestiona pedidos activos, motorizados y facturación")],-1)),i("button",{onClick:mn,class:"w-full btn btn-primary sm:w-auto"},n[42]||(n[42]=[i("i",{class:"text-xs pi pi-plus"},null,-1),i("span",null,"Nueva orden",-1)]))]),i("div",cl,[i("button",{onClick:n[0]||(n[0]=d=>l.value="all"),class:M(["pill shrink-0",l.value==="all"?"pill-active":""])}," Todas ("+_(S.value.all)+") ",3),i("button",{onClick:n[1]||(n[1]=d=>l.value="abierta"),class:M(["pill shrink-0",l.value==="abierta"?"pill-active":""])}," Abiertas ("+_(S.value.abierta)+") ",3),i("button",{onClick:n[2]||(n[2]=d=>l.value="asignada"),class:M(["pill shrink-0",l.value==="asignada"?"pill-active":""])}," Asignadas ("+_(S.value.asignada)+") ",3),i("button",{onClick:n[3]||(n[3]=d=>l.value="en_camino"),class:M(["pill shrink-0",l.value==="en_camino"?"pill-active":""])}," En camino ("+_(S.value.en_camino)+") ",3)]),D.value.length===0?(h(),x("div",fl,[n[44]||(n[44]=i("i",{class:"text-3xl text-gray-300 pi pi-truck"},null,-1)),n[45]||(n[45]=i("p",{class:"mt-2 text-sm font-medium text-gray-600"},"No hay órdenes en esta vista",-1)),l.value!=="all"?(h(),x("button",{key:0,onClick:n[4]||(n[4]=d=>l.value="all"),class:"mt-3 text-xs btn btn-secondary"}," Ver todas las órdenes ")):E("",!0)])):(h(),x("div",ml,[(h(!0),x(pe,null,ve(D.value,d=>(h(),x("div",{key:d.id,onClick:b=>qe(d),class:"flex flex-col justify-between p-4 transition cursor-pointer card hover:shadow-md hover:border-mantis-300 active:scale-[0.99]"},[i("div",null,[i("div",vl,[i("div",gl,[i("span",yl,"#"+_(d.id),1),i("span",{class:M(["px-2 py-0.5 text-[11px] font-semibold border rounded-full",N(d.status).badge])},_(N(d.status).label),3)]),i("span",bl," C$"+_(v(d.total)),1)]),i("div",hl,[i("div",xl,[i("p",wl,_(d.customer_name||"Sin cliente"),1),d.customer_phone?(h(),x("span",_l,[n[46]||(n[46]=i("i",{class:"pi pi-phone text-[10px] mr-0.5"},null,-1)),he(_(d.customer_phone),1)])):E("",!0)]),i("p",kl,[n[47]||(n[47]=i("i",{class:"pi pi-map-marker text-[10px] mr-1 text-gray-400"},null,-1)),he(_(d.delivery_address||"Sin dirección"),1)])]),d.items&&d.items.length?(h(),x("div",Al,[(h(!0),x(pe,null,ve(d.items.slice(0,3),(b,P)=>(h(),x("span",{key:P,class:"px-2 py-0.5 text-[11px] font-medium text-gray-700 bg-gray-100 rounded-md truncate max-w-[180px]"},_(b.quantity)+"× "+_(b.product_name),1))),128)),d.items.length>3?(h(),x("span",Sl," +"+_(d.items.length-3)+" más ",1)):E("",!0)])):E("",!0)]),i("div",{class:"flex items-center justify-between gap-2 pt-3 mt-3 border-t border-gray-100",onClick:n[5]||(n[5]=Dn(()=>{},["stop"]))},[i("button",{onClick:b=>Aa(d),class:M(["inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition",d.rider_name?"bg-mantis-50 text-mantis-800 hover:bg-mantis-100":"bg-gray-100 text-gray-600 hover:bg-gray-200"])},[n[48]||(n[48]=i("i",{class:"pi pi-user text-[11px]"},null,-1)),i("span",Pl,_(d.rider_name||"Asignar rider"),1)],10,Cl),i("div",$l,[d.status==="asignada"?(h(),x("button",{key:0,onClick:b=>vt(d,"en_camino"),class:"btn btn-primary py-1.5 px-2.5 text-xs"}," En camino ",8,Ol)):d.status==="en_camino"?(h(),x("button",{key:1,onClick:b=>vt(d,"entregada"),class:"btn btn-primary py-1.5 px-2.5 text-xs"}," Entregada ",8,El)):E("",!0),i("button",{onClick:b=>qe(d),class:"btn btn-outline py-1.5 px-2.5 text-xs"}," Detalle ",8,Il)])])],8,pl))),128))]))]),Be.value?(h(),x("div",Nl,[i("div",jl,[i("div",Fl,[i("div",Tl,[i("h2",Ml,_(Ve.value?`Editar Orden #${ft.value}`:"Nueva Orden Delivery"),1),i("span",Dl," C$"+_(v(at.value)),1)]),i("button",{onClick:n[6]||(n[6]=d=>Be.value=!1),class:"icon-btn","aria-label":"Cerrar"},n[49]||(n[49]=[i("i",{class:"text-sm pi pi-times"},null,-1)]))]),i("div",zl,[i("button",{onClick:n[7]||(n[7]=d=>c.value="customer"),class:M(["tab",c.value==="customer"?"tab-active":""])},[n[50]||(n[50]=i("i",{class:"text-xs pi pi-user"},null,-1)),n[51]||(n[51]=i("span",null,"Cliente",-1)),$.value.name?(h(),x("span",Ll)):E("",!0)],2),i("button",{onClick:n[8]||(n[8]=d=>c.value="menu"),class:M(["tab",c.value==="menu"?"tab-active":""])},n[52]||(n[52]=[i("i",{class:"text-xs pi pi-th-large"},null,-1),i("span",null,"Menú",-1)]),2),i("button",{onClick:n[9]||(n[9]=d=>c.value="order"),class:M(["tab",c.value==="order"?"tab-active":""])},[n[53]||(n[53]=i("i",{class:"text-xs pi pi-shopping-cart"},null,-1)),n[54]||(n[54]=i("span",null,"Orden",-1)),w.value>0?(h(),x("span",Rl,_(w.value),1)):E("",!0)],2)]),i("div",Wl,[i("div",{class:M(["flex-col min-h-0 p-4 space-y-3 overflow-y-auto border-gray-200 lg:col-span-4 lg:border-r lg:flex",c.value==="customer"?"flex flex-1":"hidden"])},[i("div",Ul,[n[57]||(n[57]=i("label",{class:"label"},"Buscar cliente existente",-1)),i("div",ql,[i("div",Bl,[n[55]||(n[55]=i("i",{class:"absolute text-xs text-gray-400 -translate-y-1/2 pointer-events-none pi pi-search left-3 top-1/2"},null,-1)),te(i("input",{"onUpdate:modelValue":n[10]||(n[10]=d=>Fe.value=d),onInput:pn,type:"text",placeholder:"Nombre o teléfono...",class:"pl-8 input"},null,544),[[ne,Fe.value]])]),$.value.id||Fe.value?(h(),x("button",{key:0,onClick:wa,type:"button",class:"px-3 btn btn-secondary shrink-0",title:"Limpiar cliente"},n[56]||(n[56]=[i("i",{class:"text-xs pi pi-times"},null,-1)]))):E("",!0)]),Ye.value.length>0?(h(),x("ul",Vl,[(h(!0),x(pe,null,ve(Ye.value,d=>(h(),x("li",{key:d.id,onClick:b=>vn(d),class:"px-3 py-2.5 text-sm cursor-pointer hover:bg-mantis-50"},[i("p",Hl,_(d.name),1),i("p",Gl,_(d.phone||"Sin teléfono"),1)],8,Yl))),128))])):E("",!0)]),i("div",Kl,[i("div",null,[n[58]||(n[58]=i("label",{class:"label"},"Nombre *",-1)),te(i("input",{"onUpdate:modelValue":n[11]||(n[11]=d=>$.value.name=d),type:"text",placeholder:"Nombre completo",class:"input"},null,512),[[ne,$.value.name]])]),i("div",null,[n[59]||(n[59]=i("label",{class:"label"},"Teléfono",-1)),te(i("input",{"onUpdate:modelValue":n[12]||(n[12]=d=>$.value.phone=d),type:"text",inputmode:"tel",placeholder:"8888-8888",class:"input"},null,512),[[ne,$.value.phone]])])]),i("div",null,[n[60]||(n[60]=i("label",{class:"label"},"Dirección de entrega *",-1)),$.value.addresses&&$.value.addresses.length?(h(),x("div",Xl,[(h(!0),x(pe,null,ve($.value.addresses,(d,b)=>(h(),x("button",{key:d.id||b,type:"button",onClick:P=>$.value.selectedAddress=d.address,class:M(["px-2.5 py-1 text-xs font-medium rounded-lg border transition text-left",$.value.selectedAddress===d.address?"bg-mantis-50 border-mantis-500 text-mantis-800":"bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"])},_(d.address),11,Jl))),128))])):E("",!0),te(i("textarea",{"onUpdate:modelValue":n[13]||(n[13]=d=>$.value.selectedAddress=d),rows:"2",placeholder:"Dirección exacta y referencias...",class:"resize-none input"},null,512),[[ne,$.value.selectedAddress]])]),i("div",Ql,[i("button",{type:"button",onClick:n[14]||(n[14]=d=>g.value=!g.value),class:"flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-700"},[n[61]||(n[61]=i("span",null,"Datos fiscales (Opcional)",-1)),i("i",{class:M([g.value?"pi pi-chevron-up":"pi pi-chevron-down","text-[11px]"])},null,2)]),g.value?(h(),x("div",Zl,[te(i("input",{"onUpdate:modelValue":n[15]||(n[15]=d=>$.value.fiscal_name=d),type:"text",placeholder:"Nombre fiscal / Razón social",class:"input"},null,512),[[ne,$.value.fiscal_name]]),te(i("input",{"onUpdate:modelValue":n[16]||(n[16]=d=>$.value.fiscal_ruc=d),type:"text",placeholder:"RUC / Cédula",class:"input"},null,512),[[ne,$.value.fiscal_ruc]])])):E("",!0)]),i("div",null,[n[66]||(n[66]=i("label",{class:"label"},"Método de pago *",-1)),i("div",eu,[i("button",{type:"button",onClick:n[17]||(n[17]=d=>ee.value="cash"),class:M(["flex flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition border rounded-xl",ee.value==="cash"?"bg-mantis-50 border-mantis-500 text-mantis-800":"bg-white border-gray-200 text-gray-600 hover:bg-gray-50"])},n[62]||(n[62]=[i("i",{class:"text-sm pi pi-money-bill"},null,-1),i("span",null,"Efectivo",-1)]),2),i("button",{type:"button",onClick:n[18]||(n[18]=d=>ee.value="card"),class:M(["flex flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition border rounded-xl",ee.value==="card"?"bg-mantis-50 border-mantis-500 text-mantis-800":"bg-white border-gray-200 text-gray-600 hover:bg-gray-50"])},n[63]||(n[63]=[i("i",{class:"text-sm pi pi-credit-card"},null,-1),i("span",null,"Tarjeta",-1)]),2),i("button",{type:"button",onClick:n[19]||(n[19]=d=>ee.value="bank_transfer"),class:M(["flex flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition border rounded-xl",ee.value==="bank_transfer"?"bg-mantis-50 border-mantis-500 text-mantis-800":"bg-white border-gray-200 text-gray-600 hover:bg-gray-50"])},n[64]||(n[64]=[i("i",{class:"text-sm pi pi-building-columns"},null,-1),i("span",null,"Transf.",-1)]),2)]),ee.value==="cash"?(h(),x("div",tu,[n[65]||(n[65]=i("label",{class:"label"},"Con cuánto paga (C$)",-1)),te(i("input",{"onUpdate:modelValue":n[20]||(n[20]=d=>Me.value=d),type:"number",step:"0.01",min:"0",placeholder:"0.00",class:"input"},null,512),[[ne,Me.value,void 0,{number:!0}]])])):E("",!0)]),i("div",au,[i("div",null,[n[67]||(n[67]=i("label",{class:"label"},"Indicaciones de cocina / orden",-1)),te(i("input",{"onUpdate:modelValue":n[21]||(n[21]=d=>et.value=d),type:"text",placeholder:"Ej: Sin cebolla, cubiertos...",class:"input"},null,512),[[ne,et.value]])]),i("div",null,[n[68]||(n[68]=i("label",{class:"label"},"Notas para el motorizado",-1)),te(i("input",{"onUpdate:modelValue":n[22]||(n[22]=d=>tt.value=d),type:"text",placeholder:"Ej: Casa portón verde, llamar al llegar...",class:"input"},null,512),[[ne,tt.value]])])]),i("div",ru,[i("button",{onClick:n[23]||(n[23]=d=>c.value="menu"),type:"button",class:"w-full btn btn-primary"},n[69]||(n[69]=[i("span",null,"Continuar al menú",-1),i("i",{class:"text-xs pi pi-arrow-right"},null,-1)]))])],2),i("div",{class:M(["flex-col min-h-0 border-gray-200 lg:col-span-4 xl:col-span-5 lg:border-r lg:flex",c.value==="menu"?"flex flex-1":"hidden"])},[i("div",nu,[i("div",su,[n[71]||(n[71]=i("i",{class:"absolute text-xs text-gray-400 -translate-y-1/2 pointer-events-none pi pi-search left-3 top-1/2"},null,-1)),te(i("input",{"onUpdate:modelValue":n[24]||(n[24]=d=>f.value=d),type:"text",placeholder:"Buscar producto...",class:"pl-8 pr-8 input"},null,512),[[ne,f.value]]),f.value?(h(),x("button",{key:0,onClick:n[25]||(n[25]=d=>f.value=""),type:"button",class:"absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"},n[70]||(n[70]=[i("i",{class:"text-xs pi pi-times"},null,-1)]))):E("",!0)]),i("div",iu,[i("button",{onClick:n[26]||(n[26]=d=>p.value="all"),type:"button",class:M(["pill shrink-0",p.value==="all"?"pill-active":""])}," Todos ",2),(h(!0),x(pe,null,ve(R.value,d=>(h(),x("button",{key:d,onClick:b=>p.value=d,type:"button",class:M(["pill shrink-0",p.value===d?"pill-active":""])},_(d),11,ou))),128))])]),i("div",lu,[y.value.length===0?(h(),x("div",uu," No se encontraron productos ")):E("",!0),(h(!0),x(pe,null,ve(y.value,d=>(h(),x("div",{key:d.category,class:"space-y-2"},[i("h4",du,_(d.category),1),i("div",cu,[(h(!0),x(pe,null,ve(d.items,b=>(h(),x("button",{key:b.id,onClick:P=>gn(b),type:"button",class:M(["product-tile",F.value[b.id]?"border-mantis-400 bg-mantis-50/40":""])},[i("div",mu,[i("span",pu,_(b.name),1),F.value[b.id]?(h(),x("span",vu,_(F.value[b.id]),1)):E("",!0)]),i("div",gu,[i("span",yu,_(b.is_generic?"Precio manual":`C$${v(b.price)}`),1),b.is_generic?(h(),x("i",bu)):E("",!0)])],10,fu))),128))])]))),128))]),w.value>0?(h(),x("div",hu,[i("button",{onClick:n[27]||(n[27]=d=>c.value="order"),type:"button",class:"justify-between w-full btn btn-primary"},[i("span",null,"Ver orden ("+_(w.value)+")",1),i("span",xu,"C$"+_(v(at.value)),1)])])):E("",!0)],2),i("div",{class:M(["flex-col min-h-0 bg-gray-50/60 lg:col-span-4 xl:col-span-3 lg:flex",c.value==="order"?"flex flex-1":"hidden"])},[i("div",wu,[U.value.length===0?(h(),x("div",_u,n[72]||(n[72]=[i("i",{class:"pi pi-shopping-bag text-2xl mb-1.5"},null,-1),i("p",{class:"text-xs"},"Agrega productos del menú",-1)]))):E("",!0),(h(!0),x(pe,null,ve(U.value,(d,b)=>(h(),x("div",{key:C(d,b),class:"flex items-center justify-between gap-2 px-3 py-2"},[i("div",ku,[i("div",Au,[i("p",Su,_(d.name),1),d.is_active===!1?(h(),x("span",Cu,"Inactivo")):E("",!0)]),i("p",Pu,"C$"+_(v(d.price))+" c/u",1)]),i("div",$u,[i("div",Ou,[i("button",{onClick:P=>bn(d),type:"button","aria-label":"Disminuir"},n[73]||(n[73]=[i("i",{class:"pi pi-minus text-[10px]"},null,-1)]),8,Eu),i("span",null,_(d.quantity),1),i("button",{onClick:P=>yn(d),class:M(d.is_active===!1?"!opacity-45":""),type:"button","aria-label":"Aumentar"},n[74]||(n[74]=[i("i",{class:"pi pi-plus text-[10px]"},null,-1)]),10,Iu)]),i("span",Nu," C$"+_(v(d.price*d.quantity)),1),i("button",{onClick:P=>_a(d),type:"button",class:"p-1 text-gray-400 transition hover:text-red-600",title:"Quitar"},n[75]||(n[75]=[i("i",{class:"text-xs pi pi-trash"},null,-1)]),8,ju)])]))),128))]),i("div",Fu,[i("label",Tu,[n[76]||(n[76]=i("span",{class:"text-xs font-semibold text-gray-700 flex items-center gap-1.5"},[i("i",{class:"pi pi-percentage text-[11px] text-amber-600"}),he(" Aplicar descuento ")],-1)),te(i("input",{"onUpdate:modelValue":n[28]||(n[28]=d=>Te.value=d),type:"checkbox",class:"checkbox"},null,512),[[zn,Te.value]])]),Te.value?(h(),x("div",Mu,[i("div",Du,[i("div",zu,[i("button",{type:"button",onClick:n[29]||(n[29]=d=>de.value="amount"),class:M(de.value==="amount"?"bg-white shadow-sm text-gray-900":"")},"C$",2),i("button",{type:"button",onClick:n[30]||(n[30]=d=>de.value="percent"),class:M(de.value==="percent"?"bg-white shadow-sm text-gray-900":"")},"%",2)]),te(i("input",{"onUpdate:modelValue":n[31]||(n[31]=d=>Ce.value=d),type:"number",min:"0",step:"0.01",placeholder:"Valor",class:"input flex-1 py-1.5 text-xs"},null,512),[[ne,Ce.value,void 0,{number:!0}]])]),te(i("input",{"onUpdate:modelValue":n[32]||(n[32]=d=>Pe.value=d),type:"text",placeholder:"Motivo del descuento (opcional)",class:"input py-1.5 text-xs"},null,512),[[ne,Pe.value]])])):E("",!0),i("div",Lu,[i("div",Ru,[n[77]||(n[77]=i("span",null,"Subtotal",-1)),i("span",Wu,"C$"+_(v(mt.value)),1)]),B.value>0?(h(),x("div",Uu,[n[78]||(n[78]=i("span",null,"Descuento",-1)),i("span",qu,"-C$"+_(v(B.value)),1)])):E("",!0),i("div",Bu,[n[79]||(n[79]=i("span",null,"Total",-1)),i("span",Vu,"C$"+_(v(at.value)),1)])]),i("div",Yu,[i("button",{onClick:n[33]||(n[33]=d=>Be.value=!1),type:"button",class:"flex-1 btn btn-secondary"}," Cancelar "),i("button",{onClick:wn,type:"button",class:"btn btn-primary flex-[2]"},[n[80]||(n[80]=i("i",{class:"text-xs pi pi-check"},null,-1)),i("span",null,_(Ve.value?"Actualizar":"Crear Orden"),1)])])])],2)])])])):E("",!0),W.value&&A.value?(h(),x("div",Hu,[i("div",Gu,[i("div",Ku,[i("div",Xu,[i("h3",Ju,"Orden #"+_(A.value.id),1),i("span",{class:M(["px-2.5 py-0.5 text-xs font-semibold border rounded-full",N(A.value.status).badge])},_(N(A.value.status).label),3)]),i("button",{onClick:ct,class:"icon-btn"},n[81]||(n[81]=[i("i",{class:"text-sm pi pi-times"},null,-1)]))]),i("div",Qu,[i("div",Zu,[i("div",ed,[i("div",td,[n[88]||(n[88]=i("p",{class:"text-[11px] font-bold tracking-wider text-gray-400 uppercase"},"Cliente",-1)),i("p",ad,_(A.value.customer_name),1),A.value.customer_phone?(h(),x("p",rd,[n[82]||(n[82]=i("i",{class:"pi pi-phone text-[10px] mr-1"},null,-1)),he(_(A.value.customer_phone),1)])):E("",!0),i("p",nd,[n[83]||(n[83]=i("i",{class:"pi pi-map-marker text-[10px] mr-1 text-gray-400"},null,-1)),he(_(A.value.delivery_address),1)]),i("div",sd,[i("p",null,[n[84]||(n[84]=i("span",{class:"text-gray-400"},"Fiscal:",-1)),he(" "+_(A.value.fiscal_name||"—"),1)]),i("p",null,[n[85]||(n[85]=i("span",{class:"text-gray-400"},"RUC:",-1)),he(" "+_(A.value.fiscal_ruc||"—"),1)]),A.value.rider_name?(h(),x("p",id,[n[86]||(n[86]=i("span",{class:"text-gray-400"},"Rider:",-1)),n[87]||(n[87]=he()),i("strong",od,_(A.value.rider_name),1)])):E("",!0)])]),i("div",ld,[n[92]||(n[92]=i("p",{class:"text-[11px] font-bold tracking-wider text-gray-400 uppercase"},"Resumen",-1)),i("div",ud,[n[89]||(n[89]=i("span",null,"Subtotal",-1)),i("span",dd," C$"+_(v(A.value.subtotal??(A.value.items?A.value.items.reduce((d,b)=>d+(parseFloat(b.price)||0)*b.quantity,0):0))),1)]),A.value.discount_amount&&A.value.discount_amount>0?(h(),x("div",cd,[i("div",fd,[i("span",null,[n[90]||(n[90]=he("Descuento")),A.value.discount_type==="percent"?(h(),x("span",md," ("+_(A.value.discount_value)+"%)",1)):E("",!0)]),i("span",pd,"-C$"+_(v(A.value.discount_amount)),1)]),A.value.discount_reason?(h(),x("p",vd," Motivo: "+_(A.value.discount_reason),1)):E("",!0)])):E("",!0),i("div",gd,[n[91]||(n[91]=i("span",null,"Total",-1)),i("span",yd,"C$"+_(v(A.value.total)),1)])])]),i("div",bd,[n[93]||(n[93]=i("p",{class:"mb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase"},"Productos",-1)),A.value.items&&A.value.items.length?(h(),x("div",hd,[(h(!0),x(pe,null,ve(A.value.items,(d,b)=>(h(),x("div",{key:b,class:"flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm"},[i("div",xd,[i("p",wd,_(d.product_name),1),i("p",_d,_(d.quantity)+" × C$"+_(v(d.price)),1)]),i("span",kd," C$"+_(v(parseFloat(d.price)*d.quantity)),1)]))),128))])):(h(),x("p",Ad," No hay items cargados. "))])])]),i("div",Sd,[i("div",Cd,[i("button",{onClick:xn,class:"text-xs btn btn-outline"},n[94]||(n[94]=[i("i",{class:"text-xs pi pi-pencil"},null,-1),i("span",null,"Editar",-1)])),A.value.status!=="entregada"&&A.value.status!=="cancelada"?(h(),x("button",{key:0,onClick:n[34]||(n[34]=d=>_n(A.value)),class:"text-xs btn btn-danger"},n[95]||(n[95]=[i("i",{class:"text-xs pi pi-ban"},null,-1),i("span",null,"Anular",-1)]))):E("",!0)]),i("div",Pd,[i("button",{onClick:n[35]||(n[35]=d=>Aa(A.value)),class:"text-xs btn btn-secondary"},[n[96]||(n[96]=i("i",{class:"text-xs pi pi-user"},null,-1)),i("span",null,_(A.value.rider_name?"Cambiar Rider":"Asignar Rider"),1)]),A.value.status==="asignada"?(h(),x("button",{key:0,onClick:n[36]||(n[36]=d=>vt(A.value,"en_camino")),class:"text-xs btn btn-primary"}," Marcar En Camino ")):E("",!0),A.value.status==="en_camino"?(h(),x("button",{key:1,onClick:n[37]||(n[37]=d=>vt(A.value,"entregada")),class:"text-xs btn btn-primary"}," Marcar Entregada ")):E("",!0)])])])])):E("",!0),Tt.value?(h(),x("div",$d,[i("div",Od,[i("div",{class:"modal-header"},[n[98]||(n[98]=i("h3",{class:"modal-title"},"Asignar Motorizado",-1)),i("button",{onClick:Mt,class:"icon-btn"},n[97]||(n[97]=[i("i",{class:"text-sm pi pi-times"},null,-1)]))]),i("div",Ed,[i("button",{type:"button",onClick:n[38]||(n[38]=d=>ae.value.rider_id=null),class:M(["flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium border rounded-xl transition",ae.value.rider_id===null?"border-mantis-500 bg-mantis-50 text-mantis-800":"border-gray-200 hover:bg-gray-50 text-gray-700"])},[n[99]||(n[99]=i("span",null,"Sin asignar",-1)),ae.value.rider_id===null?(h(),x("i",Id)):E("",!0)],2),(h(!0),x(pe,null,ve(u.riders,d=>(h(),x("button",{key:d.id,type:"button",onClick:b=>ae.value.rider_id=d.id,class:M(["flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium border rounded-xl transition",ae.value.rider_id===d.id?"border-mantis-500 bg-mantis-50 text-mantis-800":"border-gray-200 hover:bg-gray-50 text-gray-800"])},[i("span",jd,[n[100]||(n[100]=i("i",{class:"text-xs text-gray-400 pi pi-user"},null,-1)),i("span",null,_(d.name),1)]),ae.value.rider_id===d.id?(h(),x("i",Fd)):E("",!0)],10,Nd))),128))]),i("div",{class:"justify-end gap-2 modal-footer pb-safe"},[i("button",{onClick:Mt,type:"button",class:"btn btn-secondary"},"Cancelar"),i("button",{onClick:An,type:"button",class:"btn btn-primary"},"Guardar")])])])):E("",!0),Qe.value?(h(),x("div",Td,[i("div",Md,[i("div",Dd,[i("h3",zd,[yt(bt(ll),{icon:bt(ul),class:"text-mantis-600"},null,8,["icon"]),i("span",null,_(((O=jt.value)==null?void 0:O.name)||"Precio manual"),1)]),i("button",{onClick:n[39]||(n[39]=d=>Qe.value=!1),class:"icon-btn"},n[101]||(n[101]=[i("i",{class:"text-sm pi pi-times"},null,-1)]))]),i("div",Ld,[i("div",null,[n[102]||(n[102]=i("label",{class:"label"},"Precio unitario (C$)",-1)),te(i("input",{"onUpdate:modelValue":n[40]||(n[40]=d=>Ze.value=d),type:"number",step:"0.01",min:"0",placeholder:"0.00",class:"text-lg font-bold input",onKeyup:Ln(ka,["enter"])},null,544),[[ne,Ze.value,void 0,{number:!0}]])])]),i("div",Rd,[i("button",{onClick:n[41]||(n[41]=d=>Qe.value=!1),type:"button",class:"btn btn-secondary"},"Cancelar"),i("button",{onClick:ka,type:"button",class:"btn btn-primary"},"Agregar")])])])):E("",!0)]}),_:1}))}};export{Hd as default};
