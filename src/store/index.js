import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//import axios from 'axios'
const maxNumFiles = 10000


export default new Vuex.Store({
  state: {
	loadingFiles: true,
	attemptCounter: 0,
	files: [],
	numToDisplay: 50,
	fileIndex: 0,
	currentFiles: [],
	currentFolders: [],
	currentFolderFiles: {},
	currentDir: '',
	fileNames: []
  },
  mutations: {
	setFiles(state, files) {
		//console.log(newDir);
		//state.currentDir = newDir;
		state.files = files
		state.fileNames = files.map((file) => file.fileName).filter((file) => (file.indexOf('.bzEmpty') === -1))
		//only need to percent encode on downloads state.fileNames = fileNames.map((file) => cleanSpaces(file))
		//to get current files
		//filter out only the files within the current directory (as shown by current prefix === currentDir)
		//type each file into folder, music, video, pdf [if untyped (the default type), then client only allows download] 
		//state.folders = files.filter((file) => (file.fileName.indexOf('/') > -1))
		//give each
		//get folder names within current dir
		//folders.map
		//slice only the ones in range of num to display
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
	async getFiles({state, commit, dispatch}) {
		state.attemptCounter = state.attemptCounter + 1
		try {
			commit('setLoadingFiles');
			console.log('getting files');
			const res = await fetch('https://chris-fileshare.herokuapp.com/files');
			console.log(res);
			const parsed_json = await res.json();
			var files = parsed_json.files;
			console.log(files);
			//.filter((file) => (file.indexOf('.bzEmpty') === -1))
			console.log(parsed_json);
			files = files.filter((file) => (file.fileName.indexOf('.bzEmpty') === -1))
			commit('setFiles', files);
			if (files.length < 1 && state.attemptCounter < 3) {
				dispatch('getFiles');
			}
		} catch (err) {
			console.log(err);
			if (files.length < 1 && state.attemptCounter < 3) {
				dispatch('getFiles');
			}
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
  getters: {
	numFiles: state => {
		return state.files.length;
	}
  },
  modules: {
  }
})
