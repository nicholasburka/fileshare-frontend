(function(e){function t(t){for(var i,a,r=t[0],l=t[1],c=t[2],d=0,f=[];d<r.length;d++)a=r[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);u&&u(t);while(f.length)f.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,r=1;r<n.length;r++){var l=n[r];0!==o[l]&&(i=!1)}i&&(s.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},o={app:0},s=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"131c":function(e,t,n){e.exports=n.p+"img/sxsw-big.6eff7cfe.png"},"16be":function(e,t,n){"use strict";n("3357")},"1f07":function(e,t,n){e.exports=n.p+"img/chris-big.6846080f.png"},"1f6b":function(e,t,n){},3357:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("a026"),o=n("dad5"),s=n.n(o),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("title",[e._v("chris' files for you")]),n("link",{attrs:{rel:"stylesheet",type:"text/css",href:"./icofont/icofont.min.css"}}),e._m(0),n("div",[e.folderSelected?n("div",[n("FolderContents",{attrs:{folderName:this.clickedFolder}})],1):n("div",{staticClass:"column",attrs:{id:"folders"}},e._l(e.folders,(function(t){return n("div",{key:t,staticClass:"folder row",attrs:{id:t}},[t.img?n("img",{attrs:{src:t.img,alt:t.alt},on:{click:function(n){return e.toFolder(t.name)}}}):n("h2",{domProps:{textContent:e._s(t.alt)},on:{click:function(n){return e.toFolder(t.name)}}})])})),0)])])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a",{attrs:{href:"https://www.chrisbankscarr.com/"}},[n("img",{attrs:{id:"logo",src:"//images.squarespace-cdn.com/content/v1/5fdc1dd2ff99f865bfeb9467/1608267602186-4JQBHLKKKIV3PQAHY4DC/mockup+name.png?format=1000w"}})])}],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("title",[e._v("chris' files for you")]),n("link",{attrs:{rel:"stylesheet",type:"text/css",href:"./icofont/icofont.min.css"}}),e._m(0),e.loaded?n("div",[n("div",{attrs:{id:"nav"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],attrs:{id:"searchField",type:"text",name:"search",placeholder:"search"},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}}),n("span",{staticClass:"icofont-search button",attrs:{id:"submitSearch"},on:{click:function(t){return e.$store.commit("searchFiles",e.search)}}}),n("span",{staticClass:"icofont-close-line button",attrs:{id:"dismissSearch"},on:{click:function(t){return e.dismissSearch()}}}),n("span",{ref:"prev",staticClass:"nav icofont-arrow-left button page-button",attrs:{id:"prev"},on:{click:function(t){return e.$store.commit("prevFiles")}}}),e.loaded?n("p",{attrs:{id:"file-count"}},[e._v("showing "+e._s(e.currentFiles.length)+" of "+e._s(e.$store.getters.numFiles)+" files")]):e._e(),n("span",{ref:"next",staticClass:"nav icofont-arrow-right button page-button",attrs:{id:"next"},on:{click:function(t){return e.$store.commit("nextFiles")}}})]),n("div",{staticClass:"column",attrs:{id:"files"}},e._l(e.currentFiles,(function(t){return n("div",{key:t,staticClass:"file row",attrs:{id:t}},[n("div",{ref:t+"icon-holder",refInFor:!0,staticClass:"icon-holder",attrs:{id:t+"icon-holder"}},[n("span",{ref:t+"play",refInFor:!0,staticClass:"icofont-play play-icon song-left",attrs:{id:t+"play",alt:"play"},on:{click:function(n){return e.loadAudioSource(t)}}}),n("span",{ref:t+"loading",refInFor:!0,attrs:{id:t+"loading",alt:"loading"}})]),e.fileMetadata[t].title?n("div",[n("a",{staticClass:"file",attrs:{href:e.baseURL+t},domProps:{textContent:e._s(e.fileMetadata[t].title)},on:{click:function(n){return n.preventDefault(),e.loadAudioSource(t)}}}),n("span",{staticStyle:{"font-size":"var(--size)"}},[e._v(" - ")]),n("a",{staticClass:"file",attrs:{href:e.fileMetadata[t].artistLink,target:"_blank"},domProps:{textContent:e._s(e.fileMetadata[t].artist)}})]):n("a",{staticClass:"file",attrs:{href:e.baseURL+t},domProps:{textContent:e._s(t)},on:{click:function(n){return n.preventDefault(),e.downloadItem({url:t})}}}),n("mini-audio",{ref:t+"player",refInFor:!0,staticClass:"mini-audio audio-off",attrs:{preload:!1,"audio-source":e.baseURL+t}})],1)})),0),e._m(1)]):n("div",[n("p",[e._v("loading...")])])])},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a",{attrs:{href:"https://files.chrisbankscarr.com/"}},[n("img",{attrs:{id:"logo",src:"//images.squarespace-cdn.com/content/v1/5fdc1dd2ff99f865bfeb9467/1608267602186-4JQBHLKKKIV3PQAHY4DC/mockup+name.png?format=1000w"}})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"player-div"}},[n("audio",{attrs:{id:"player",controls:"",crossorigin:""}})])}],u=n("5530"),d=(n("159b"),n("ac1f"),n("841c"),n("2f62")),f=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"lds-spinner song-left",staticStyle:{"max-width":"4vh"}},[n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div"),n("div")])}],m=(n("f22a"),n("2877")),g={},h=Object(m["a"])(g,f,p,!1,null,null,null),v=h.exports,y=n("4fb8"),b=n.n(y),x=new b.a("#player"),w=i["a"].extend(v);document.title="chris' files for you";var F={props:["folderName"],computed:Object(u["a"])(Object(u["a"])({},Object(d["b"])({loading_files:function(e){return e.loadingFiles},files:function(e){return e.files},fileNames:function(e){return e.fileNames},fileMetadata:function(e){return e.fileMetadata},currentFiles:function(e){return e.currentFiles},numPages:function(e){return e.files.length/e.numToDisplay}})),{},{clicked:function(){var e={};return this.files.forEach((function(t){e[t]=!1})),e},loaded:function(){return console.log(this.fileMetadata),!this.loading&&!this.loading_files}}),data:function(){return{loading:!0,folderToURL:{chris:"parnhash/",sxsw:"sxsw-2023/"},baseURL:"https://f000.backblazeb2.com/file/",search:"",song_playing:"",song_loading:""}},methods:{dismissSearch:function(){this.search="",this.$store.commit("dismissSearch",this.search)},downloadItem:function(e){var t=e.url;window.open(this.baseURL+encodeURIComponent(t),"_blank").focus()},toPlayState:function(e){this.$refs[e+"icon-holder"].replaceChildren()},playAudio:function(){var e=document.getElementById("player");e.play()},pauseAudio:function(){var e=document.getElementById("player");e.pause()},clearLastPlaying:function(){var e=document.getElementById(this.song_playing+"play");e.classList.remove("playing"),e.classList.remove("paused")},loadAudioSource:function(e){var t=this;console.log("load media");var n=e;console.log(e);var i=this.baseURL+encodeURIComponent(e),o=e.substr(e.length-3,e.length),s="";switch(o){case"wav":s="audio/x-wav";break;case"mp3":s="audio/mpeg";break;case"mpg":case"peg":s="audio/mpeg";break;case"ogg":case"oga":s="audio/ogg";break;case"aac":s="audio/aac";break;case"flac":s="audio/flac";break;case"m4a":s="audio/mp4";break;case"mp4":case"m4v":case"m4p":return this.downloadItem({url:n}),this.pauseAudio(),void this.clearLastPlaying();case"MOV":return this.downloadItem({url:n}),this.pauseAudio(),void this.clearLastPlaying();case"jpg":return this.downloadItem({url:n}),this.pauseAudio(),void this.clearLastPlaying();case"png":return this.downloadItem({url:n}),this.pauseAudio(),void this.clearLastPlaying();default:return this.downloadItem({url:n}),this.pauseAudio(),void this.clearLastPlaying()}var a=new w;if(a.$mount(),console.log(a.$el),console.log(this.$refs[e+"loading"][0]),this.song_playing){if(this.song_playing===e){var r=document.getElementById(this.song_playing+"play");r.classList.contains("playing")?(this.pauseAudio(),r.classList.remove("playing"),r.classList.add("paused")):this.playAudio()}this.clearLastPlaying()}this.song_loading&&(this.$refs[this.song_loading+"loading"][0].innerHTML="",this.$refs[this.song_loading+"play"][0].classList.remove("playing"),this.$refs[this.song_loading+"play"][0].classList.remove("off")),this.$refs[e+"loading"][0].appendChild(a.$el),this.song_loading=e;var l=document.getElementById(e+"play");l.classList.add("off");var c=document.getElementById("player"),u=document.createElement("source");console.log("full src: "+i),console.log(s),console.log(x),u.src=i,u.type=s,c.replaceChildren(u),c.pause(),c.load(),c.autoplay=!0,c.oncanplay=function(){c.play(),t.$refs[e+"loading"][0].removeChild(a.$el),t.song_loading="",l.classList.add("playing"),l.classList.remove("off"),t.song_playing=e},c.onended=function(){}},folderNameF:function(){var e=window.location.pathname,t=1,n="folder/",i=e.indexOf(n);return i>=0&&(t+=i+n.length),e.substr(t)}},created:function(){var e=this,t=this.folderName.toLowerCase();this.baseURL="https://f000.backblazeb2.com/file/"+this.folderToURL[t],this.$store.dispatch("getFolderFiles",t),setTimeout((function(){e.loading&&location.reload()}),4e4)},mounted:function(){this.$nextTick((function(){this.loading=!1}))},updated:function(){this.currentFiles.length===this.$store.getters.numFiles&&(console.log("displaying all files"),document.getElementById("prev").classList.add("off"),document.getElementById("next").classList.add("off"))}},_=F,k=(n("16be"),Object(m["a"])(_,l,c,!1,null,null,null)),C=k.exports,L=n("131c"),I=n("1f07");document.title="chris' files for you";var O={name:"App",components:{FolderContents:C},data:function(){return{loading:!0,baseURL:"files.chrisbankscarr.com/",search:"",song_playing:"",song_loading:"",folders:[{name:"SXSW",alt:"SXSW Music Exchange",img:L},{name:"chris",alt:"Chris' Files",img:I}],folderSelected:!1,clickedFolder:""}},methods:{toFolder:function(e){this.clickedFolder=e,this.folderSelected=!0,window.history.pushState("",e+" files","/"+e),window.onpopstate=function(e){console.log("pop state"),console.log(e),this.folderSelected=!1,this.clickedFolder="",window.location.reload()}}},created:function(){},mounted:function(){},updated:function(){}},S=O,$=(n("034f"),Object(m["a"])(S,a,r,!1,null,null,null)),E=$.exports,P=n("1da1");n("96cf"),n("4de4"),n("d81d"),n("fb6a"),n("d3b7");i["a"].use(d["a"]);var R=1e4,j="https://server1.nicholasab.com";function A(e){var t="",n="",i="";if(e.indexOf("METADATA:")>=0){var o=e.substr("METADATA:".length);return console.log(o),n=o.substr(o.indexOf("artist:")+"artist:".length,o.indexOf("link:")-"artist:".length),console.log(o.indexOf("link:")),i=o.substr(o.indexOf("link:")+"link:".length,o.indexOf("title:")-"link:".length-o.indexOf("link:")),0!==i.toLowerCase().indexOf("http")&&(i="https://"+i),t=o.substr(o.indexOf("title:")+"title:".length),{file:e,title:t,artist:n,artistLink:i}}return{file:e,title:t,artist:n,artistLink:i}}var N=new d["a"].Store({state:{loadingFiles:!0,attemptCounter:0,files:[],fileMetadata:{},numToDisplay:50,fileIndex:0,currentFiles:[],currentFolders:[],currentFolderFiles:{},currentDir:"",fileNames:[]},mutations:{setFiles:function(e,t){e.files=t,e.fileNames=t.map((function(e){return e.fileName})).filter((function(e){return-1===e.indexOf(".bzEmpty")})),e.fileNames.forEach((function(t){var n=A(t);console.log("metadata for "+t),console.log(n),e.fileMetadata[t]=A(t)})),e.currentFiles=e.fileNames.slice(0,e.numToDisplay),e.loadingFiles=!1},prevFiles:function(e){e.fileIndex=e.fileIndex-e.numToDisplay,e.fileIndex<0&&(e.fileIndex=R-e.numToDisplay),e.fileNames[e.fileIndex]&&(e.currentFiles=e.fileNames.slice(e.fileIndex,e.numToDisplay))},nextFiles:function(e){e.fileIndex=e.fileIndex+e.numToDisplay,e.fileIndex>=R&&(e.fileIndex=0),e.fileNames[e.fileIndex]&&(e.currentFiles=e.fileNames.slice(e.fileIndex,e.numToDisplay))},setCurrentFiles:function(e,t){e.currentFiles=t},searchFiles:function(e,t){console.log(t),e.currentFiles=e.fileNames.filter((function(e){return e.indexOf(t)>-1}))},dismissSearch:function(e){e.fileIndex=0,e.currentFiles=e.fileNames.slice(e.fileIndex,e.numToDisplay)},setLoadingFiles:function(e){e.loadingFiles=!0}},actions:{getFiles:function(e){return Object(P["a"])(regeneratorRuntime.mark((function t(){var n,i,o,s,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,i=e.commit,o=e.dispatch,n.attemptCounter=n.attemptCounter+1,t.prev=2,i("setLoadingFiles"),console.log("getting files"),t.next=7,fetch(j);case 7:return s=t.sent,console.log(s),t.next=11,s.json();case 11:a=t.sent,r=a.files,console.log(r),console.log(a),r=r.filter((function(e){return-1===e.fileName.indexOf(".bzEmpty")})),i("setFiles",r),r.length<1&&n.attemptCounter<3&&o("getFiles"),t.next=24;break;case 20:t.prev=20,t.t0=t["catch"](2),console.log(t.t0),r.length<1&&n.attemptCounter<3&&o("getFiles");case 24:case"end":return t.stop()}}),t,null,[[2,20]])})))()},getFolderFiles:function(e,t){return Object(P["a"])(regeneratorRuntime.mark((function n(){var i,o,s,a,r,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.state,o=e.commit,s=e.dispatch,i.attemptCounter=i.attemptCounter+1,n.prev=2,o("setLoadingFiles"),console.log("getting files for folder "+t),n.next=7,fetch(j+"/files?folder="+t);case 7:return a=n.sent,console.log(a),n.next=11,a.json();case 11:r=n.sent,l=r.files,console.log(l),console.log(r),l=l.filter((function(e){return-1===e.fileName.indexOf(".bzEmpty")})),o("setFiles",l),l.length<1&&i.attemptCounter<3&&s("getFiles"),n.next=24;break;case 20:n.prev=20,n.t0=n["catch"](2),console.log(n.t0),l.length<1&&i.attemptCounter<3&&s("getFiles");case 24:case"end":return n.stop()}}),n,null,[[2,20]])})))()},downloadFile:function(e,t){return Object(P["a"])(regeneratorRuntime.mark((function n(){var i,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.state,n.prev=1,console.log(i.loadingFiles),console.log("downloading a file "+t),n.next=6,fetch(j+"/fileByName?filename="+t);case 6:o=n.sent,console.log(o),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](1),console.log(n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,10]])})))()}},getters:{numFiles:function(e){return e.files.length}},modules:{}});i["a"].config.productionTip=!1,i["a"].use(s.a);var T={"/":E,"/sxsw":C,"/chris":C};new i["a"]({store:N,data:{currentRoute:window.location.pathname},computed:{ViewComponent:function(){return console.log(this.currentRoute),console.log(T[this.currentRoute]),T[this.currentRoute]}},render:function(e){return e(this.ViewComponent)}}).$mount("#app")},"85ec":function(e,t,n){},f22a:function(e,t,n){"use strict";n("1f6b")}});
//# sourceMappingURL=app.14105552.js.map