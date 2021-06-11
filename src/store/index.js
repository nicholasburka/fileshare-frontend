import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//import axios from 'axios'
const maxNumFiles = 10000

export default new Vuex.Store({
  state: {
	loadingFiles: true,
	files: [],
	numToDisplay: 50,
	fileIndex: 0,
	currentFiles: [],
	fileNames: []
  },
  mutations: {
	setFiles(state, files) {
		state.files = files
		state.fileNames = files.map((file) => file.fileName).filter((file) => (file.indexOf('.bzEmpty') === -1))
		state.currentFiles = state.fileNames.slice(0, state.numToDisplay)
		state.loadingFiles = false
	},
	prevFiles(state) {
		state.fileIndex = state.fileIndex - state.numToDisplay
		if (state.fileIndex < 0) {
			state.fileIndex = maxNumFiles - state.numToDisplay
		}
		if (state.fileNames[state.fileIndex]) {
			state.currentFiles = state.fileNames.slice(state.fileIndex, state.numToDisplay)
		}
	},
	nextFiles(state) {
		state.fileIndex = state.fileIndex + state.numToDisplay
		if (state.fileIndex >= maxNumFiles) {
			state.fileIndex = 0
		}
		if (state.fileNames[state.fileIndex]) {
			state.currentFiles = state.fileNames.slice(state.fileIndex, state.numToDisplay)
		}
	},
	setCurrentFiles(state, currFiles) {
		state.currentFiles = currFiles
	},
	searchFiles(state, search) {
		console.log(search)
		state.currentFiles = state.fileNames.filter((name) => (name.indexOf(search) > -1))
	},
	dismissSearch(state) {
		state.fileIndex = 0
		state.currentFiles = state.fileNames.slice(state.fileIndex, state.numToDisplay)
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
