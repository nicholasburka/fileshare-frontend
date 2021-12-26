<template>
  <div id="app">
    <a href="https://www.chrisbankscarr.com/">
    <img id="logo" src="//images.squarespace-cdn.com/content/v1/5fdc1dd2ff99f865bfeb9467/1608267602186-4JQBHLKKKIV3PQAHY4DC/mockup+name.png?format=1000w"/>
    <link rel="stylesheet" type="text/css" href="./icofont/icofont.min.css">
    </a>
    <div v-if="loading">
      <p>loading...</p>
    </div>
    <div v-else>
      <div id="nav">
        <p class="nav" v-on:click="$store.commit('prevFiles')" id="prev">Prev</p>
        <input id="searchField" v-model="search" type="text" name="search" placeholder="search">
        <p class="button" id="submitSearch" v-on:click="$store.commit('searchFiles', search)">Search</p>
        <p class="button" id="dismissSearch" v-on:click="$store.commit('dismissSearch', search)">Dismiss</p>
        <p class="nav" v-on:click="$store.commit('nextFiles')" id="next">Next</p>
      </div>
      <div id="files">
        <div class="file" :key="file" v-for="file in currentFiles" :id="file">
          <!--<p v-on:click="if (!clicked[file]){$store.dispatch('downloadFile', file); clicked[file] = true; }" v-bind:id="file" v-bind:class="{clicked: clicked[file]}">{{file}}</p>-->
          <!--<a v-on:click="if (!clicked[file]){$store.dispatch('downloadFile', file); clicked[file] = true; }" v-bind:id="file" v-bind:class="{clicked: clicked[file]}">{{file}}</a>-->
          <!--<button class="icofont-play" v-on:click="loadAudioSource(file)"></button>-->
          <div class="icon-holder" :id="file + 'icon-holder'" :ref="file + 'icon-holder'">
            <i class="icofont-play play-icon song-left" :id="file + 'play'" :ref="file + 'play'" v-on:click="loadAudioSource(file)"></i>
            <i class="" :id="file + 'loading'" :ref="file + 'loading'" />
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

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapState({
      loading: state => state.loadingFiles,
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
    }
  },
  data: function() {
    return {
      baseURL: 'https://f000.backblazeb2.com/file/parnhash/',
      search: '',
      playing: '',
      loading: ''
      //clicked: {}
    }
  },
  methods: {
    //https://stackoverflow.com/questions/53772331/vue-html-js-how-to-download-a-file-to-browser-using-the-download-tag
    downloadItem ({ url, label }) {

      console.log(url);
      console.log(label);
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
    loadAudioSource (url) {
      console.log(url);
      //var loading = document.getElementById(url + "loading");
      //loading.className = "lds-spinner"
      var spinner = new SpinnerClass();
      spinner.$mount();
      //document.body.appendChild(spinner.$el);
      console.log(spinner.$el)
      console.log(this.$refs[url + 'loading'][0]);
      if (this.loading) {
        this.$refs[this.loading + 'loading'][0].removeChild(spinner.$el);
      }
      this.$refs[url + 'loading'][0].appendChild(spinner.$el);
      this.loading = url;

      var file_div = document.getElementById(url + 'icon-holder');
      var play_button = document.getElementById(url + 'play')
      file_div.removeChild(play_button);
      //var audio_player = this.$refs[url + 'player'][0];
      //audio_player.$el.classList.remove('audio-off');
      //audio_player.play();
      //console.log(audio_player);
      var player_el = document.getElementById('player');
      var source = document.createElement('source');
      
      
      const full_src = this.baseURL + url;
      const url_filetype = url.substr(url.length - 3, url.length);
      var filetype_html = '';
      switch (url_filetype) {
        case 'wav':
          filetype_html = 'audio/x-wav';
          break;
        case 'mp3':
          filetype_html = 'audio/mpeg';
          break;
        default:
          console.log('unrec filetype');
          filetype_html = "audio/" + url.substr(url.length - 3, url.length);
      }
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
        
        if (this.playing) {
          var last_play_button = document.getElementById(this.playing + 'play');
          last_play_button.classList.remove('playing');
        }
        play_button.classList.add('playing');
        file_div.appendChild(play_button);
        this.playing = url;
      };

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
        this.playing = url;
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
    this.$store.dispatch('getFiles')
  }
}
</script>

<style>
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
  width: 100vw;
  /*max-width: 90vw;*/
  /*left: 5vw;*/
  top: 20vh;
  height: 65vh;
  justify-content: center;
  overflow-y: auto;
}
.nav {
  position: absolute;
  top: 0vh;
  padding-top: 2vh;
  max-height: 20vh;
  display: flex;
  align-items: center;
  transition: color .4s;
}
.nav:hover {
  transition: 1s;
  color: purple;
}
div .icon-holder {
  display: inline;
}
#player-div {
  position: absolute;
  top: 85vh;
  left: 40vw;
  max-height: 14vh;
}
#prev {
  left: 30vw;
  top: 4vh;
  max-width: 8vw;
  font-size: var(--size);
}
#next {
  left: 68vw;
  top: 4vh;
  max-width: 8vw;
  font-size: var(--size);
}
#searchField {
  position: absolute;
  left: 30vw;
  width: 40vw;
  height: 3vh;
  text-align: center;
}
#submitSearch {
  position: absolute;
  top: 4vh;
  left: 38vw;
  width: 10vw;
}
#dismissSearch {
  position: absolute;
  top: 4vh;
  left: 52vw;
  width: 10vw;
}
.audio-off {
  display: none !important;
}
.play-icon {
  height: var(--size);
  font-size: var(--size);
  top: 1vh;
}
.playing {
  transition: .5s;
  /*filter: invert(100%);*/
  animation: 3s linear infinite playing;
}
@keyframes playing {
  0% {
    filter: invert(0%);
  }
  50% {
    filter: invert(100%);
  }
}
.song-left {
  margin-right: 1vh;
}
.file {
  height: 10vw;
  width: 100%;
  align-self: center;
  text-decoration: none;
  color: purple;
}
.file:hover {
  transition: 1s;
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
