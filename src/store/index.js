import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//import axios from 'axios'

export default new Vuex.Store({
  state: {
	loadingFiles: true,
	files: [],
	fileNames: []
  },
  mutations: {
	setFiles(state, files) {
		state.files = files
		state.fileNames = files.map((file) => file.fileName).filter((file) => (file.indexOf('.bzEmpty') === -1))
		state.loadingFiles = false
	},
	setLoadingFiles(state) {
		state.loadingFiles = true
	}
  },
  actions: {
	async getFiles({commit}) {
		try {
			commit('setLoadingFiles')
			console.log('getting files')
			const res = await fetch('https://chris-fileshare.herokuapp.com/files')
			console.log(res)
			const parsed_json = await res.json();
			const files = parsed_json.files
			console.log(files)
			//.filter((file) => (file.indexOf('.bzEmpty') === -1))
			console.log(parsed_json)
			commit('setFiles', files)
		} catch (err) {
			console.log(err)
		}
	},
	async downloadFile({state}, fileName) {
		try {
			console.log(state.loadingFiles)
			console.log('downloading a file ' + fileName)
			const res = await fetch('https://chris-fileshare.herokuapp.com/fileByName?filename=' + fileName)
			console.log(res)
			//const url = URL.createObjectURL(res)
		} catch(err) {
			console.log(err)
		}
	}
  },
  modules: {
  }
})
