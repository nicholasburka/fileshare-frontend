(function(e){function t(t){for(var i,l,s=t[0],a=t[1],c=t[2],f=0,d=[];f<s.length;f++)l=s[f],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&d.push(r[l][0]),r[l]=0;for(i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i]);u&&u(t);while(d.length)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var a=n[s];0!==r[a]&&(i=!1)}i&&(o.splice(t--,1),e=l(l.s=n[0]))}return e}var i={},r={app:0},o=[];function l(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=i,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(n,i,function(t){return e[t]}.bind(null,i));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/fileshare-frontend/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=a;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"1f6b":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=n("dad5"),o=n.n(r),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._m(0),e.loading?n("div",[n("p",[e._v("loading...")])]):n("div",[n("div",{attrs:{id:"nav"}},[n("p",{staticClass:"nav",attrs:{id:"prev"},on:{click:function(t){return e.$store.commit("prevFiles")}}},[e._v("Prev")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],attrs:{id:"searchField",type:"text",name:"search",placeholder:"search"},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}}),n("p",{staticClass:"button",attrs:{id:"submitSearch"},on:{click:function(t){return e.$store.commit("searchFiles",e.search)}}},[e._v("Search")]),n("p",{staticClass:"button",attrs:{id:"dismissSearch"},on:{click:function(t){return e.$store.commit("dismissSearch",e.search)}}},[e._v("Dismiss")]),n("p",{staticClass:"nav",attrs:{id:"next"},on:{click:function(t){return e.$store.commit("nextFiles")}}},[e._v("Next")])]),n("div",{attrs:{id:"files"}},e._l(e.currentFiles,(function(t){return n("div",{key:t,staticClass:"file",attrs:{id:t}},[n("div",{ref:t+"icon-holder",refInFor:!0,staticClass:"icon-holder",attrs:{id:t+"icon-holder"}},[n("i",{ref:t+"play",refInFor:!0,staticClass:"icofont-play play-icon song-left",attrs:{id:t+"play"},on:{click:function(n){return e.loadAudioSource(t)}}}),n("i",{ref:t+"loading",refInFor:!0,attrs:{id:t+"loading"}})]),n("a",{staticClass:"file",attrs:{href:e.baseURL+t},domProps:{textContent:e._s(t)},on:{click:function(n){return n.preventDefault(),e.downloadItem({url:t,label:t})}}}),n("mini-audio",{ref:t+"player",refInFor:!0,staticClass:"mini-audio audio-off",attrs:{preload:!1,"audio-source":e.baseURL+t}})],1)})),0),e._m(1)])])},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a",{attrs:{href:"https://www.chrisbankscarr.com/"}},[n("img",{attrs:{id:"logo",src:"//images.squarespace-cdn.com/content/v1/5fdc1dd2ff99f865bfeb9467/1608267602186-4JQBHLKKKIV3PQAHY4DC/mockup+name.png?format=1000w"}}),n("link",{attrs:{rel:"stylesheet",type:"text/css",href:"./icofont/icofont.min.css"}})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"player-div"}},[n("audio",{attrs:{id:"player",controls:"",crossorigin:""}})])}],a=n("5530"),c=(n("159b"),n("2f62")),u=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},f=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"lds-spinner song-left",staticStyle:{"max-width":"4vh"}},[n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div")])}],d=(n("f22a"),n("2877")),p={},m=Object(d["a"])(p,u,f,!1,null,null,null),h=m.exports,g=n("4fb8"),v=n.n(g),y=new v.a("#player"),b=i["a"].extend(h),x={name:"App",components:{},computed:Object(a["a"])(Object(a["a"])({},Object(c["b"])({loading:function(e){return e.loadingFiles},files:function(e){return e.files},fileNames:function(e){return e.fileNames},currentFiles:function(e){return e.currentFiles},numPages:function(e){return e.files.length/e.numToDisplay}})),{},{clicked:function(){var e={};return this.files.forEach((function(t){e[t]=!1})),e}}),data:function(){return{baseURL:"https://f000.backblazeb2.com/file/parnhash/",search:"",playing:""}},methods:{downloadItem:function(e){var t=e.url,n=e.label;console.log(t),console.log(n),window.open(this.baseURL+encodeURIComponent(t),"_blank").focus()},loadAudioSource:function(e){var t=this;console.log(e);var n=new b;n.$mount(),console.log(n.$el),console.log(this.$refs[e+"loading"][0]),this.$refs[e+"loading"][0].appendChild(n.$el);var i=document.getElementById(e+"icon-holder"),r=document.getElementById(e+"play");i.removeChild(r);var o=document.getElementById("player"),l=document.createElement("source"),s=this.baseURL+e,a=e.substr(e.length-3,e.length),c="";switch(a){case"wav":c="audio/x-wav";break;case"mp3":c="audio/mpeg";break;default:console.log("unrec filetype"),c="audio/"+e.substr(e.length-3,e.length)}console.log("full src: "+s),console.log(c),console.log(y),l.src=s,l.type=c,o.replaceChildren(l),o.pause(),o.load(),o.autoplay=!0,o.oncanplay=function(){if(o.play(),t.$refs[e+"loading"][0].removeChild(n.$el),t.playing){var l=document.getElementById(t.playing+"play");l.classList.remove("playing")}r.classList.add("playing"),i.appendChild(r),t.playing=e},y.source={type:"audio",sources:[{src:s,type:c}]},y.on("canplay",(function(o){console.log("can play"),console.log(o),y.play(),t.$refs[e+"loading"][0].removeChild(n.$el),r.classList.add("playing"),i.appendChild(r),t.playing=e}))}},created:function(){this.$store.dispatch("getFiles")}},w=x,F=(n("034f"),Object(d["a"])(w,l,s,!1,null,null,null)),I=F.exports,_=n("1da1");n("96cf"),n("4de4"),n("d81d"),n("fb6a"),n("d3b7");i["a"].use(c["a"]);var k=1e4,C=new c["a"].Store({state:{loadingFiles:!0,attemptCounter:0,files:[],numToDisplay:50,fileIndex:0,currentFiles:[],fileNames:[]},mutations:{setFiles:function(e,t){e.files=t,e.fileNames=t.map((function(e){return e.fileName})).filter((function(e){return-1===e.indexOf(".bzEmpty")})),e.currentFiles=e.fileNames.slice(0,e.numToDisplay),e.loadingFiles=!1},prevFiles:function(e){e.fileIndex=e.fileIndex-e.numToDisplay,e.fileIndex<0&&(e.fileIndex=k-e.numToDisplay),e.fileNames[e.fileIndex]&&(e.currentFiles=e.fileNames.slice(e.fileIndex,e.numToDisplay))},nextFiles:function(e){e.fileIndex=e.fileIndex+e.numToDisplay,e.fileIndex>=k&&(e.fileIndex=0),e.fileNames[e.fileIndex]&&(e.currentFiles=e.fileNames.slice(e.fileIndex,e.numToDisplay))},setCurrentFiles:function(e,t){e.currentFiles=t},searchFiles:function(e,t){console.log(t),e.currentFiles=e.fileNames.filter((function(e){return e.indexOf(t)>-1}))},dismissSearch:function(e){e.fileIndex=0,e.currentFiles=e.fileNames.slice(e.fileIndex,e.numToDisplay)},setLoadingFiles:function(e){e.loadingFiles=!0}},actions:{getFiles:function(e){return Object(_["a"])(regeneratorRuntime.mark((function t(){var n,i,r,o,l,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,i=e.commit,r=e.dispatch,t.prev=1,i("setLoadingFiles"),console.log("getting files"),t.next=6,fetch("https://chris-fileshare.herokuapp.com/files");case 6:return o=t.sent,console.log(o),t.next=10,o.json();case 10:l=t.sent,s=l.files,console.log(s),console.log(l),i("setFiles",s),s.length<1&&n.attemptCounter<3&&r("getFiles"),t.next=21;break;case 18:t.prev=18,t.t0=t["catch"](1),console.log(t.t0);case 21:case"end":return t.stop()}}),t,null,[[1,18]])})))()},downloadFile:function(e,t){return Object(_["a"])(regeneratorRuntime.mark((function n(){var i,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.state,n.prev=1,console.log(i.loadingFiles),console.log("downloading a file "+t),n.next=6,fetch("https://chris-fileshare.herokuapp.com/fileByName?filename="+t);case 6:r=n.sent,console.log(r),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](1),console.log(n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,10]])})))()}},modules:{}});i["a"].config.productionTip=!1,i["a"].use(o.a),new i["a"]({store:C,render:function(e){return e(I)}}).$mount("#app")},"85ec":function(e,t,n){},f22a:function(e,t,n){"use strict";n("1f6b")}});
//# sourceMappingURL=app.bf75c738.js.map