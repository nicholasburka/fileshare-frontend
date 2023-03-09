<template>
  <div id="app">
    <title>chris' files for you</title>
    <link rel="stylesheet" type="text/css" href="./icofont/icofont.min.css">
    <a href="https://www.chrisbankscarr.com/">
    <img id="logo" src="//images.squarespace-cdn.com/content/v1/5fdc1dd2ff99f865bfeb9467/1608267602186-4JQBHLKKKIV3PQAHY4DC/mockup+name.png?format=1000w"/>
    </a>
    <div v-if="!loaded">
      <p>loading...</p>
    </div>
    <div v-else>
      <div id="nav">
        
        <input id="searchField" v-model="search" type="text" name="search" placeholder="search">
        <span class="icofont-search button" id="submitSearch" v-on:click="$store.commit('searchFiles', search)"></span>
        <span class="icofont-close-line button" id="dismissSearch" v-on:click="dismissSearch()"></span>
        <!--<p class="button" id="submitSearch" v-on:click="$store.commit('searchFiles', search)">Search</p>-->
        <!--<p class="button" id="dismissSearch" v-on:click="$store.commit('dismissSearch', search)">Dismiss</p>-->

        <!--<p class="nav" v-on:click="$store.commit('prevFiles')" id="prev">Prev</p>-->
        <span class="nav icofont-arrow-left button page-button" id="prev" :ref="'prev'" v-on:click="$store.commit('prevFiles')"></span>
        <p id="file-count" v-if="loaded">showing {{currentFiles.length}} of {{$store.getters.numFiles}} files</p>
        <span class="nav icofont-arrow-right button page-button" id="next" :ref="'next'" v-on:click="$store.commit('nextFiles')"></span>
        <!--<p class="nav" v-on:click="$store.commit('nextFiles')" id="next">Next</p>-->
      </div>

      <div id="files" class="column">
        <div class="file row" :key="file" v-for="file in currentFiles" :id="file">
          <!--<p v-on:click="if (!clicked[file]){$store.dispatch('downloadFile', file); clicked[file] = true; }" v-bind:id="file" v-bind:class="{clicked: clicked[file]}">{{file}}</p>-->
          <!--<a v-on:click="if (!clicked[file]){$store.dispatch('downloadFile', file); clicked[file] = true; }" v-bind:id="file" v-bind:class="{clicked: clicked[file]}">{{file}}</a>-->
          <!--<button class="icofont-play" v-on:click="loadAudioSource(file)"></button>-->
          <div class="icon-holder" :id="file + 'icon-holder'" :ref="file + 'icon-holder'">
            <span class="icofont-play play-icon song-left" :id="file + 'play'" :ref="file + 'play'" v-on:click="loadAudioSource(file)" alt="play"></span>
            <span class="" :id="file + 'loading'" :ref="file + 'loading'" alt="loading"></span>
          </div>
          <a
            class="file"
            :href="baseURL + file"
            v-text="file"
            @click.prevent="downloadItem({url: file, label: file})" />
          <mini-audio class="mini-audio audio-off" :ref="file + 'player'" :preload="false" :audio-source="baseURL + file"></mini-audio>
          <!--<mini-audio class="mini-audio" :id="file" v-on:click="loadAudioSource(file)"></mini-audio>-->
          <!--<mini-audio audio-source="https://f000.backblazeb2.com/file/parnhash/B Who I Want 2 B - Sophie.mp3"></mini-audio>-->
        </div>
        <!--
        <div class="file" :key="file" v-for="file in currentFiles" :id="file">
          
          <div class="icon-holder" :id="file.url + 'icon-holder'" :ref="file.url + 'icon-holder'">
            <span class="icofont-play play-icon song-left" :id="file.url + 'play'" :ref="file.url + 'play'" v-on:click="loadAudioSource(file)" alt="play"></span>
            <span class="" :id="file.url + 'loading'" :ref="file.url + 'loading'" alt="loading"></span>
          </div>
          <a
            class="file"
            :href="baseURL + file.url"
            v-text="file.url"
            @click.prevent="downloadItem({url: file.url, label: file.url})" />
          <mini-audio class="mini-audio audio-off" :ref="file.url + 'player'" :preload="false" :audio-source="baseURL + file"></mini-audio>
      
        </div>
        -->
      </div>
        <div id="player-div">
            <audio id="player" controls crossorigin>
            </audio>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex' //access state variables from the vuex 'store'
//import * as axios from 'axios'
import Spinner from './components/Spinner.vue' //vue css loading icon
//import VueAudio from 'vue-audio-better'
import Vue from 'vue' //front-end web development framework

import Plyr from 'plyr' //web audio player
const player = new Plyr('#player');

//https://css-tricks.com/creating-vue-js-component-instances-programmatically/
var SpinnerClass = Vue.extend(Spinner);
//var AudioClass = Vue.extend(VueAudio);
document.title = "chris' files for you"

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapState({
      loading_files: state => state.loadingFiles,
      files: state => state.files,
      fileNames: state => state.fileNames,
      currentFiles: state => state.currentFiles,
      numPages: state => state.files.length/state.numToDisplay
    }),
    clicked: function() {
      var clicked = {}
      this.files.forEach(file => {
        clicked[file] = false
      })
      return clicked
    },
    loaded: function() {
      return (!this.loading && !this.loading_files);
    }
  },
  data: function() {
    return {
      loading: true,
      baseURL: 'https://f000.backblazeb2.com/file/parnhash/',
      search: '',
      song_playing: '',
      song_loading: ''
      //clicked: {}
    }
  },
  methods: {
    //https://stackoverflow.com/questions/53772331/vue-html-js-how-to-download-a-file-to-browser-using-the-download-tag
    dismissSearch() {
      this.search = '';
      this.$store.commit('dismissSearch', this.search);
    },
    downloadItem ({ url }) { //,label}) {
      /*console.log("download");
      console.log(url);
      console.log(label);*/
      window.open(this.baseURL + encodeURIComponent(url), '_blank').focus();
      //open url in new tab
        /*axios.get(url, { responseType: 'blob' })
          .then(response => {
            const blob = new Blob([response.data], { type: 'application/' + label.substr(label.length - 4) })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = label
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)*/
      },
    toPlayState (url) {
      this.$refs[url + 'icon-holder'].replaceChildren()
    },
    playAudio() {
      var curr_player_el = document.getElementById('player');
      curr_player_el.play();
    },
    pauseAudio() {
      var curr_player_el = document.getElementById('player');
      curr_player_el.pause();
    },
    clearLastPlaying() {
      var last_play_button = document.getElementById(this.song_playing + 'play');
      last_play_button.classList.remove('playing');
      last_play_button.classList.remove('paused');
    },
    loadAudioSource (url) {
      console.log("load media");
      var orig_url = url;
      console.log(url);

      const full_src = this.baseURL + encodeURIComponent(url);
      const url_filetype = url.substr(url.length - 3, url.length);
      var filetype_html = '';
      switch (url_filetype) {
        case 'wav':
          filetype_html = 'audio/x-wav';
          break;
        case 'mp3':
          filetype_html = 'audio/mpeg';
          break;
        /*case 'm4a':
          filetype_html = "audio/x-m4a";
          break;*/
        case 'mp4':
          this.downloadItem({url: orig_url});
          this.pauseAudio();
          this.clearLastPlaying();
          return;
        case 'jpg':
          this.downloadItem({url: orig_url});
          this.pauseAudio();
          this.clearLastPlaying();
          return;
        default:
          console.log('unrec filetype');
          filetype_html = "audio/x-" + url.substr(url.length - 3, url.length);
          //this.downloadItem(url);
      }

      //var loading = document.getElementById(url + "loading");
      //loading.className = "lds-spinner"
      var spinner = new SpinnerClass();
      spinner.$mount();
      //document.body.appendChild(spinner.$el);
      console.log(spinner.$el)
      console.log(this.$refs[url + 'loading'][0]);

      if (this.song_playing) {
        if (this.song_playing === url) {
          var curr_play_button = document.getElementById(this.song_playing + 'play');
          if (curr_play_button.classList.contains('playing')) {
            this.pauseAudio();
            curr_play_button.classList.remove('playing');
            curr_play_button.classList.add('paused');
          } else {
            this.playAudio();
          }
        }
        this.clearLastPlaying();
      }

      if (this.song_loading) {
        this.$refs[this.song_loading + 'loading'][0].innerHTML = '';
        this.$refs[this.song_loading + 'play'][0].classList.remove('playing');
        this.$refs[this.song_loading + 'play'][0].classList.remove('off');
      }
      this.$refs[url + 'loading'][0].appendChild(spinner.$el);
      this.song_loading = url;



      var file_div = document.getElementById(url + 'icon-holder');
      var play_button = document.getElementById(url + 'play');
      play_button.classList.add('off');
      //var audio_player = this.$refs[url + 'player'][0];
      //audio_player.$el.classList.remove('audio-off');
      //audio_player.play();
      //console.log(audio_player);
      var player_el = document.getElementById('player');
      var source = document.createElement('source');
      
      
      
      console.log('full src: ' + full_src);
      console.log(filetype_html);
      console.log(player);

      source.src = full_src;
      source.type = filetype_html;
      player_el.replaceChildren(source);
      player_el.pause();
      player_el.load();
      player_el.autoplay = true;
      player_el.oncanplay = () => {
        player_el.play();
        
        this.$refs[url + 'loading'][0].removeChild(spinner.$el);
        this.song_loading = '';

        play_button.classList.add('playing');
        play_button.classList.remove('off');
        
        this.song_playing = url;
      };
      player_el.onended = () => {
        //play_button.classList.remove('playing');
        //play_button.classList.add('paused');
        //this.song_playing = '';
      };
      //player_el.

      player.source = {
        type: 'audio',
        /*sources: player.sources.push({
          src: full_src,
          type: file_type_html
        })*/
        sources: [
          {
            src: full_src,
            type: filetype_html
          }
        ]
      };
      player.on('canplay', (event) => {
        console.log('can play');
        console.log(event);
        player.play();
        this.$refs[url + 'loading'][0].removeChild(spinner.$el);
        play_button.classList.add('playing');
        file_div.appendChild(play_button);
        this.song_playing = url;
      });
      
      //var audio_player = document.createElement('div');//new AudioClass();//document.createElement('mini-audio');
      //audio_player.innerHTML = "<mini-audio :autoplay='true' :audio-source='" + this.baseURL + url + "'></mini-audio>"
      //audio_player.$mount();
      //audio_player.className = "mini-audio";
      //audio_player["audio-source"] = this.baseURL + url;
      //console.log(file_div);
      //console.log(audio_player);
      //file_div.appendChild(audio_player);
      //loading icon
      //create player
      //set autoplay of player to true
      //loop settimeout 
      //if playing
      //remove gif
    }
  },
  created() {
    this.$store.dispatch('getFiles');
    setTimeout(() => {if (this.loading) {location.reload()}}, 40000);
  },
  mounted() {
    //console.log('mounted');
    this.$nextTick(function() {
      //console.log('mounted next tick');
      this.loading = false;
      //too early in vue lifecycle for file count check
    })
  },
  updated() {
    //console.log('updated');
    if (this.currentFiles.length === this.$store.getters.numFiles) {
      console.log('displaying all files');
      //console.log(this.$refs['prev']);
      //console.log(this.$refs);
      document.getElementById('prev').classList.add('off');
      document.getElementById('next').classList.add('off');
      //this.$refs['prev'].classList.add('off');
      //this.$refs['next'].classList.add('off');
    } else {
      //console.log(this.currentFiles.length);
      //console.log(this.$store.getters.numFiles);
    }
  }
}
</script>

<style>
:root {
  --size: min(4vh, 4vw);
  --icon-size: min(5.5vh,5.5vw);
}
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}
#logo {
  position: absolute;
  top: 3vh;
  left: 3vw;
  width: 20vw;
  height: auto;
  z-index: 15;
}
a {
  font-size: var(--size);
  overflow-wrap: break-word;
  inline-size: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: white;*//*#2c3e50;*/
  max-width: 100vw;
  max-height: 100vh;
  margin: 0;
  background-color: white;
}
#files {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 2vw;
  width: 96vw;
  /*max-width: 90vw;*/
  /*left: 5vw;*/
  top: 20vh;
  height: 55vh;
  justify-content: space-between;
  overflow-y: auto;
}
.off {
  display: none !important;
}
.nav {
  position: absolute;
  top: 0vh;
  padding-top: 2vh;
  max-height: 20vh;
  font-size: 10vh;
  display: flex;
  align-items: center;
  transition: color .4s;
}
.nav:hover {
  transition: .3s;
  color: purple;
}
div .icon-holder {
  display: inline;
}
#player-div {
  position: absolute;
  top: 78vh;
  left: 5vw;
  max-height: 14vh;
}
audio {
  width: 90vw;
  height: 12vh;
}
.page-button {

}
#prev {
  font-size: min(10vh, 10vw);
  left: calc(22vw - min(3vh,3vw));
  top: 10vh;
  z-index: 1;
}
#next {
  font-size: min(10vh, 10vw);
  left: calc(78vw - min(5vh,5vw));
  top: 10vh;
  z-index: 1;
}
#file-count {
  position: absolute;
  text-align: center;
  top: calc(10.5vh - min(3.5vh,5.5vw));
  left: 5vw;
  width: 90vw;
  color: rgb(195,68,122);
  font-size: min(4vh,4vw);
  z-index: -1;
}
#searchField {
  position: absolute;
  left: 30vw;
  width: 40vw;
  height: 6vh;
  top: 1vh;
  text-align: center;
  font-size: min(6vh, 8vw);
}
#submitSearch {
  position: absolute;
  font-size: min(8vh, 9vw);
  top: 2.5vh;
  left: calc(72vw + min(5vh, 4vw));
}
#dismissSearch {
  position: absolute;
  font-size: min(8vh, 9vw);
  top: 2.5vh;
  left: calc(73vw + min(15vh, 15vw));
}
@media (max-width: 500px) {
  #file-count {
    top: calc(7.5vh + min(4vh,4vw));
  }
  #submitSearch {
    left: calc(75vw + min(5vh, 4vw));
  }
  #dismissSearch {
    left: calc(86vw + min(5vh, 4vw));
  }
  #player-div {
    top: 73vh;
  }
}
.audio-off {
  display: none !important;
}
.play-icon {
  height: var(--icon-size);
  font-size: var(--icon-size);
  top: 1vh;
}
.playing {
  transition: .5s;
  /*filter: invert(100%);*/
  animation: 5s linear infinite playing;
}
.paused {
  transition: .5s;
  color: green;
}
@keyframes playing {
  0% {
   color: white;
  }
  50% {
    color: green;
  }
  100% {
    color: white;
  }
}
.song-left {
  margin-right: 1vh;
}
.file {
  /*height: 10vw;*/
  margin-left: 0vw;
  width: 70vw;
  align-self: center;
  text-align: left;
  text-decoration: none;
  color: purple;
}
.file:hover {
  transition: .5s;
  color: black;
}
.clicked {
  animation: glow 2s repeat;
}
.button {
  background-color: hsla(300,100,100,10);
  color: black;
  transition: color .4s;
}
.button:hover {
  transition: 1s;
  color: orange;
}

.mini-audio {
  position: relative;
  width: 30vw;
  margin-left: 0 !important;
  margin-right: 0 !important;
  left: 34.5vw;
  max-height: 10vh !important;
  max-width: 30vw !important;
}

@keyframes glow {
  0% {
    color: black;
  }
  50% {
    color: purple;
  }
}
</style>
