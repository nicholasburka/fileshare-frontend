<template>
  <div id="app">
    <title>chris' files for you</title>
    <link rel="stylesheet" type="text/css" href="./icofont/icofont.min.css">
    <a href="https://www.chrisbankscarr.com/">
    <img id="logo" src="//images.squarespace-cdn.com/content/v1/5fdc1dd2ff99f865bfeb9467/1608267602186-4JQBHLKKKIV3PQAHY4DC/mockup+name.png?format=1000w"/>
    </a>

    <div>

      <div id="folders" class="column" v-if="!folderSelected">
        <div class="folder row" :key="folder" v-for="folder in folders" :id="folder">
          <img v-if="folder.img" :src="folder.img" :alt="folder.alt" v-on:click="toFolder(folder.name)">
          <h2 v-else v-text="folder.alt" v-on:click="toFolder(folder.name)"></h2>
        </div>
      </div>
      <div v-else>
        <FolderContents :folderName="this.clickedFolder"></FolderContents>
      </div>

    </div>
  </div>
</template>

<script>
const sxsw_img = require('./assets/sxsw-big.png')
const chris_img = require('./assets/chris-big.png')
document.title = "chris' files for you"
import FolderContents from './components/FolderContents.vue'

export default {
  name: 'App',
  components: {
    FolderContents
  },
  data: function() {
    return {
      loading: true,
      baseURL: 'files.chrisbankscarr.com/',
      search: '',
      song_playing: '',
      song_loading: '',
      folders: [{
        name: "SXSW",
        alt: "SXSW Music Exchange",
        img: sxsw_img
      }, {
        name: "chris",
        alt: "Chris' Files",
        img: chris_img
      }],
      folderSelected: false,
      clickedFolder: ''
      //clicked: {}
    }
  },
  methods: {
    toFolder: function(folderName) {
      this.clickedFolder = folderName;
      this.folderSelected = true;
      window.history.pushState('', folderName + ' files', '/' + folderName);
      window.onpopstate = function(e) {
        console.log("pop state");
        console.log(e);
        this.folderSelected = false;
        this.clickedFolder = '';
        window.location.reload();
      }
    },
  },
  created() {
    //this.$store.dispatch('getFiles');
    //setTimeout(() => {if (this.loading) {location.reload()}}, 40000);
  },
  mounted() {

  },
  updated() {
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
#folders {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 2vw;
  width: 96vw;
  /*max-width: 90vw;*/
  /*left: 5vw;*/
  top: 20vh;
  height: 65vh;
  justify-content: space-between;
  overflow-y: auto;
}
.folder {
  /*height: 10vw;*/
  margin-left: 0vw;
  width: 70vw;
  max-height: 30vh;
  height: 30vh;
  align-self: center;
  text-align: center;
  text-decoration: none;
  color: purple;
  font-size: max(2vw, 5vh);
}
.folder img {
  max-width: 80vw;
  height: auto;
  /*align-items: center;*/
  object-fit: contain;
}
.folder:hover {
  transition: .5s;
  color: white;
  background-color: #29adff;
}
</style>