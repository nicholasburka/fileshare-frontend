<template>

  <div id="app">

    <title>chris' files for you</title>
    <link rel="stylesheet" type="text/css" href="./icofont/icofont.min.css">
    <a href="https://files.chrisbankscarr.com/">
    <img id="logo" src="//images.squarespace-cdn.com/content/v1/5fdc1dd2ff99f865bfeb9467/1608267602186-4JQBHLKKKIV3PQAHY4DC/mockup+name.png?format=1000w"/>
    </a>

    <div v-if="!loaded">
      <p>loading...</p>
    </div>

    <div v-else>
      <div id="nav">
        
        <input id="searchField" v-model="search" type="text" name="search" placeholder="search">
        <span id="submitSearch" class="icofont-search button"  v-on:click="$store.commit('searchFiles', search)"></span>
        <span id="dismissSearch" class="icofont-close-line button"  v-on:click="dismissSearch()"></span>

        <span id="prev" class="nav icofont-arrow-left button page-button" :ref="'prev'" v-on:click="$store.commit('prevFiles')"></span>
        <p id="file-count" v-if="loaded">showing {{currentFiles.length}} of {{$store.getters.numFiles}} files</p>
        <span id="next" class="nav icofont-arrow-right button page-button"  :ref="'next'" v-on:click="$store.commit('nextFiles')"></span>

      </div>

      <div id="files" class="column">

        <div class="file row" :key="file" v-for="file in currentFiles" :id="file">

          <div :id="file + 'icon-holder'" class="icon-holder" :ref="file + 'icon-holder'">
            <span :id="file + 'play'" class="icofont-play play-icon song-left" :ref="file + 'play'" v-on:click="loadAudioSource(file)" alt="play"></span>
            <span :ref="file + 'loading'" class="" :id="file + 'loading'"  alt="loading"></span>
          </div>
          
          <a v-if="!fileMetadata[file].title"
            :href="baseURL + file"
            class="file"
            v-text="file"
            @click.prevent="downloadItem({url: file})" />
          <div v-else>
            <a
              :href="baseURL + file"
              class="file"
              v-text="fileMetadata[file].title"
              @click.prevent="loadAudioSource(file)" />
            <span style="font-size: var(--size)"> - </span>
            <a
              :href="fileMetadata[file].artistLink"
              class="file"
              v-text="fileMetadata[file].artist"
              target="_blank"/>
          </div>

          <mini-audio class="mini-audio audio-off" :ref="file + 'player'" :preload="false" :audio-source="baseURL + file"></mini-audio>

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
import Spinner from './Spinner.vue' //vue css loading icon
//import VueAudio from 'vue-audio-better'
import Vue from 'vue' //front-end web development framework
import Plyr from 'plyr' //web audio player
const player = new Plyr('#player');

//https://css-tricks.com/creating-vue-js-component-instances-programmatically/
var SpinnerClass = Vue.extend(Spinner);
//var AudioClass = Vue.extend(VueAudio);
document.title = "chris' files for you"

export default {
  props: ["folderName"],
  computed: {
    ...mapState({
      loading_files: state => state.loadingFiles,
      files: state => state.files,
      fileNames: state => state.fileNames,
      fileMetadata: state => state.fileMetadata,
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
      console.log(this.fileMetadata)
      return (!this.loading && !this.loading_files);
    }
  },
  data: function() {
    return {
      loading: true,
      folderToURL: {
        'chris': 'parnhash/',
        'sxsw': 'sxsw-2023/'
      },
      //folderName: 'sxsw',
      baseURL: 'https://f000.backblazeb2.com/file/',
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
    downloadItem ({ url }) { 
      /*console.log("download");
      console.log(url);*/
      window.open(this.baseURL + encodeURIComponent(url), '_blank').focus(); //open url in new tab
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
        case 'mpg':
        case 'peg':
          filetype_html = 'audio/mpeg';
          break;
        case 'ogg':
        case 'oga':
          filetype_html = 'audio/ogg';
          break;
        case 'aac':
          filetype_html = 'audio/aac';
          break;
        case 'flac':
          filetype_html = 'audio/flac';
          break;
        case 'm4a':
          filetype_html = 'audio/mp4';
          break;
        /*case 'm4a':
          filetype_html = "audio/x-m4a";
          break;*/
        case 'mp4':
        case 'm4v':
        case 'm4p':
          //video/mp4
          //open the video player
          this.downloadItem({url: orig_url});
          this.pauseAudio();
          this.clearLastPlaying();
          return;
        case 'MOV':
          this.downloadItem({url: orig_url});
          this.pauseAudio();
          this.clearLastPlaying();
          return;
        case 'jpg':
          this.downloadItem({url: orig_url});
          this.pauseAudio();
          this.clearLastPlaying();
          return;
        case 'png':
          this.downloadItem({url: orig_url});
          this.pauseAudio();
          this.clearLastPlaying();
          return;
        default:
          this.downloadItem({url: orig_url});
          this.pauseAudio();
          this.clearLastPlaying();
          return;
      }

      var spinner = new SpinnerClass();
      spinner.$mount();
      console.log(spinner.$el)
      console.log(this.$refs[url + 'loading'][0]);

      
      if (this.song_playing) {
        //if the song is already playing
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
        this.clearLastPlaying(); //clear play state classnames
      }

      if (this.song_loading) {
        this.$refs[this.song_loading + 'loading'][0].innerHTML = '';
        this.$refs[this.song_loading + 'play'][0].classList.remove('playing');
        this.$refs[this.song_loading + 'play'][0].classList.remove('off');
      }
      this.$refs[url + 'loading'][0].appendChild(spinner.$el);
      this.song_loading = url;


      //var file_div = document.getElementById(url + 'icon-holder');
      var play_button = document.getElementById(url + 'play');
      play_button.classList.add('off');
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
      
    },
    folderNameF: function() {
      const pathname = window.location.pathname;
      var index = 1;
      const folder_str = 'folder/';
      var folder_idx = pathname.indexOf(folder_str);
      if (folder_idx >= 0) {
        index += folder_idx + folder_str.length;
      }
      return pathname.substr(index);
    }
  },
  created() {
    //unused router stuff
    //const pathname = window.location.pathname;
    /*var index = 1;
    const folder_str = 'folder/';
    var folder_idx = pathname.indexOf(folder_str);
    if (folder_idx >= 0) {
      index += folder_idx + folder_str.length;
    }*/
    //this.folderName = pathname.substr(index);

    let folder_name_lc = this.folderName.toLowerCase()
    this.baseURL = 'https://f000.backblazeb2.com/file/' + this.folderToURL[folder_name_lc];
    this.$store.dispatch('getFolderFiles', folder_name_lc);
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
