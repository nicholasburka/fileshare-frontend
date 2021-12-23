<template>
  <div id="app">
    <a href="https://www.chrisbankscarr.com/">
    <img id="logo" src="//images.squarespace-cdn.com/content/v1/5fdc1dd2ff99f865bfeb9467/1608267602186-4JQBHLKKKIV3PQAHY4DC/mockup+name.png?format=1000w"/>
    </a>
    <div v-if="loading">
      <p>loading...</p>
    </div>    
    <div id="files" v-else>
      <div class="file" :key="file" v-for="file in currentFiles">
        <!--<p v-on:click="if (!clicked[file]){$store.dispatch('downloadFile', file); clicked[file] = true; }" v-bind:id="file" v-bind:class="{clicked: clicked[file]}">{{file}}</p>-->
        <!--<a v-on:click="if (!clicked[file]){$store.dispatch('downloadFile', file); clicked[file] = true; }" v-bind:id="file" v-bind:class="{clicked: clicked[file]}">{{file}}</a>-->
        <a
          class="file"
          :href="baseURL + file"
          v-text="file"
          @click.prevent="downloadItem({url: baseURL + file, label: file})" />
        <mini-audio class="mini-audio" :preload="false" :audio-source="baseURL + file"></mini-audio>
        <!--<mini-audio class="mini-audio" :id="file" v-on:click="loadAudioSource(file)"></mini-audio>-->
        <!--<mini-audio audio-source="https://f000.backblazeb2.com/file/parnhash/B Who I Want 2 B - Sophie.mp3"></mini-audio>-->
      </div>
    </div>
    <p class="bottom" v-on:click="$store.commit('prevFiles')" id="prev">Prev</p>
    <input id="searchField" v-model="search" type="text" name="search" placeholder="search">
    <p class="button" id="submitSearch" v-on:click="$store.commit('searchFiles', search)">Search</p>
    <p class="button" id="dismissSearch" v-on:click="$store.commit('dismissSearch', search)">Dismiss</p>
    <p class="bottom" v-on:click="$store.commit('nextFiles')" id="next">Next</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'
//import * as axios from 'axios'

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
      search: ''
      //clicked: {}
    }
  },
  methods: {
    //https://stackoverflow.com/questions/53772331/vue-html-js-how-to-download-a-file-to-browser-using-the-download-tag
    downloadItem ({ url, label }) {

      console.log(url);
      console.log(label);
      window.open(url, '_blank').focus();
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
  top: 5vh;
  height: 80vh;
  justify-content: center;
  overflow-y: auto;
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
.bottom {
  position: absolute;
  top: 90vh;
  max-height: 5vh;
  display: flex;
  align-items: center;
  transition: color .4s;
}
.bottom:hover {
  transition: 1s;
  color: purple;
}
#prev {
  left: min(5vw, 5vh);
  max-width: 8vw;
  font-size: min(4vw, 4vh);
}
#next {
  left: min(89vw, calc(100vw - 9vh));
  max-width: 8vw;
  font-size: min(4vw, 4vh);
}
#searchField {
  position: absolute;
  top: 90vh;
  left: 30vw;
  width: 40vw;
  height: 3vh;
  text-align: center;
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
#submitSearch {
  position: absolute;
  top: 92vh;
  left: 38vw;
  width: 10vw;
}
#dismissSearch {
  position: absolute;
  top: 92vh;
  left: 52vw;
  width: 10vw;
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
