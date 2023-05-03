<!-- UNUSED, static upload.html instead, see upload-frontend.js -->
<template>
  <div id="app">
    <title>chris' files for you</title>
    <link rel="stylesheet" type="text/css" href="./icofont/icofont.min.css">
    <a href="https://www.chrisbankscarr.com/">
    <img id="logo" src="//images.squarespace-cdn.com/content/v1/5fdc1dd2ff99f865bfeb9467/1608267602186-4JQBHLKKKIV3PQAHY4DC/mockup+name.png?format=1000w"/>
    </a>

    <div class="column">
      <div class="row">
        <img id="folderImg" v-bind:src="require('../assets/sxsw-big.png')">
        <p id="uploadStatus"></p>
      </div>
      <input @change="autofill" id="fileInput" type="file">
      <span>Title: </span><input id="title" type="text">
      <span>Artist: </span><input id="artist" type="text">
      <span>Artist Link: (optional) </span><input id="artistLink" type="text">
      <button v-on:click="uploadFile()">Upload</button>
    </div>
  </div>
</template>

<script>
//import axios from 'axios'
import * as CryptoJS from 'crypto-js'
//import {getUploadDetails} from '../upload-frontend'

export default {
  name: 'Upload',
  data: function() {
    return {
      gettingUploadDetails: false,
      uploading: false,
      hasFile: false,
      apiUrl: 'http://server1.nicholasab.com/',
      uploadDetails: {},
      metadata: '',
      uploadStatus: document.getElementById('uploadStatus')
    }
  },
  methods: {
    autofill: function(event) {
      console.log(event.target)
      let filename = event.target.value.substr('C:\\fakepath\\'.length);
      console.log(filename)
      let title = document.getElementById('title')
      title.value = filename
      if (filename) {
        this.hasFile = true
      }
    },
    getMetadata: function() {
      let metadata = 'METADATA:'
      let title = document.getElementById('title').value
      let artist = document.getElementById('artist').value
      let link = document.getElementById('artistLink').value
      if (title) {
        metadata += "title:" + title
      }
      if (artist) {
        metadata += 'artist:' + artist
      }
      if (link) {
        metadata += 'link:' + link
      }
      this.metadata = metadata
      return metadata
    },
    uploadFile: async function() {
      if (this.hasFile) {
        let meta = this.getMetadata()
        let file = document.getElementById('fileInput').files[0]
        this.gettingUploadDetails = true;
        this.uploadDetails = await fetch(this.apiUrl + 'uploadDetails')//getUploadDetails()
        console.log(this.uploadDetails)
        this.uploadDetails = await this.uploadDetails.body.json()
        
        console.log(this.uploadDetails)
        let uploadStatus = document.getElementById('uploadStatus')
        uploadStatus.innerHTML = "preparing upload..."
        uploadStatus.className = "preparing";

        const reader = new FileReader();
        reader.onload = function () {

            const hash = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(reader.result));
            // Data hashed. Now perform upload.
            const xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function () {
                console.log(this.response);
                console.info(`XHR response:`, this.response);
                uploadStatus.innerHTML = "file(s) uploaded";
                uploadStatus.className = "uploaded";
            });

            try {
                xhr.open("POST", uploadDetails.uploadUrl);
                uploadStatus.innerHTML = "uploading...";
                uploadStatus.className = "uploading";

                xhr.setRequestHeader("Content-Type", "image/png");
                xhr.setRequestHeader("Authorization", uploadDetails.authToken);
                if (meta) {
                    xhr.setRequestHeader("X-Bz-File-Name", escape((meta + file.name)));//escape percent encodes: https://thewebdev.info/2022/01/21/how-to-percent-encode-strings-with-javascript/
                } else {
                    xhr.setRequestHeader("X-Bz-File-Name", escape(file.name));//escape percent encodes: https://thewebdev.info/2022/01/21/how-to-percent-encode-strings-with-javascript/
                }
                xhr.setRequestHeader("X-Bz-Content-Sha1", hash);

                const fileToSend = file;

                
                xhr.send(fileToSend);
                
            } catch (err) {
                console.log(err);
                uploadStatus.innerHTML = "error - could not upload"
                uploadStatus.className = "";
            }

            
        };
        reader.readAsBinaryString(file);
      }
    }
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
  #folderImg {
    max-height: 20vh;
    max-width: 40vw;
    width: auto;
    align-self: center;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  input, button, span {
    align-self: center;
    margin-top: 2vh;
    width: 50vw;
    text-align: center;
    font-size: 2vw;
  }
  span {
    height: 4vh;
  }
  input {
    height: 8vh;
  }
  button {
    margin-top: 6vh;
    height: 10vh;
  }

</style>