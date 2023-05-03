/*
Upload scripts separated out from Upload.vue
Currently manually combined into static html, until routing + rendering refactor

Upload a file to a backblaze B2 bucket as configured by the back-end
The back-end implements:
- get upload details
- save DB entry

The front-end implements:
- metadata to send to DB (calling save DB entry)
- (calling get upload details) upload the file to the bucket
*/

import * as CryptoJS from 'crypto-js';

const getUploadDetailsUrl = 'localhost:2000/uploadDetails';

export const getUploadDetails = async () => {
    return new Promise((resolve, reject) => {
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.info(`Get upload details response: `, this.responseText);
                try {
                    const uploadDetails = JSON.parse(this.responseText);
                    resolve(uploadDetails);
                } catch (err) {
                    reject("could not connect to Backblaze");
                }
            }
        });

        xhr.open("GET", getUploadDetailsUrl);

        xhr.send(data);
    });
};

export const uploadAFile = async (file, meta) => {
    //const uploadFileInput = document.getElementById("uploadFileInput");
    //const uploadFileButton = document.getElementById("uploadFileButton");
    var uploadStatus = document.getElementById("uploadStatus");
    var uploadFileName = document.getElementById("uploadFileName");

    uploadFileName.innerHTML = file.name;

    uploadStatus.innerHTML = "preparing upload..."
    uploadStatus.className = "preparing";
    var uploadDetails;
    try {
        uploadDetails = await getUploadDetails();
    } catch (err) {
        console.log("errored out on uploadDetails");
        uploadStatus.innerHTML = "error - could not connect to database";
        uploadStatus.className = "";
    }
    

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
};