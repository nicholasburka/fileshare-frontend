<template>
  <div id="app">
    <div v-if="loading">
      <p>loading...</p>
    </div>
    <div id="files" v-else>
      <div class="file" :key="file" v-for="file in fileNames">
        <p v-on:click="if (!clicked[file]){$store.dispatch('downloadFile', file); clicked[file] = true; }" v-bind:id="file" v-bind:class="{clicked: clicked[file]}">{{file}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapState({
      loading: state => state.loadingFiles,
      files: state => state.files,
      fileNames: state => state.fileNames
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
      //clicked: {}
    }
  },
  created() {
    this.$store.dispatch('getFiles')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#files {
  display: flex;
  flex-direction: column;
  width: 90vw;
  left: 5vw;
  top: 15vh;
  height: 80vh;
  justify-content: flex-start;
}
.file {
  height: 10vw;
  width: 100%;
  align-self: center;
}
.file:hover {
  transition: 1s;
  color: white;
}
.clicked {
  animation: glow 2s repeat;
}
@keyframes glow {
  0% {
    color: white;
  }
  50% {
    color: purple;
  }
}
</style>
