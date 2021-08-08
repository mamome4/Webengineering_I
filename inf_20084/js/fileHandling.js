function clickedOnPath(event){
    //get the type of Element that was clicked on
    const dir = event.target.parentNode.childNodes[0].innerText;
    //if the element is a directory
    if(dir === "dir"){
        //get the name of the Element that was clicked on plus a "/" to complete the path
        const linkappend = event.target.innerText + "/";
        //get the current directory
        const link = sessionStorage.getItem("dir");

        //the current directory plus the name of the element that was clicked on an the "/" make the path for the
        //directory that we have to navigate into
        sessionStorage.setItem("dir", link + linkappend);

        removeTable();
        //reload the table with the new directory
        loadDirectory(sessionStorage.getItem("dir"));
    } else {
        //if the Element is not a direcoty is has to be a file so we load it
        console.log(dir);
        loadFile(dir, event.target.innerText);
    }
}

function downloadFile(event) {
    //get the file name, type and the current directory path
    const tr = event.target.parentNode.parentNode;
    const fileName = tr.childNodes[1].innerText;
    const dir = sessionStorage.getItem("dir");
    const type = tr.childNodes[0].innerText;

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                //if request is succesful use the type of the file and the response from the server to download the file
                //with the help of an anchor tag
                const download = document.createElement("a");

                download.setAttribute("hidden", "");
                download.setAttribute("href", "data:" + type + ";base64," + req.responseText);
                download.setAttribute("download", fileName);

                download.click();
            } else {
                //in case of an error display it with the error banner
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    req.open("GET", "http://localhost:8080/" + dir + fileName + "?format=base64", true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send();
}

function deleteFile(event){
    //get the filename and the current directory for the full path of the file that should be deleted
    const tr = event.target.parentNode.parentNode;
    const fileName = tr.childNodes[1].innerText;
    const dir = sessionStorage.getItem("dir");

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("File successfully deleted");
            } else {
                //in case of error display it with the error banner
                console.log("File could not be deleted");
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    //ask the server to delete the file for which we need its the full path
    req.open("DELETE", "http://localhost:8080/" + dir + fileName, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send();

    tr.remove();
}


function saveText(name) {
    //read the path from the textarea
    const textarea = document.getElementById("edit");
    const path = textarea.getAttribute("path");
    const newContent = textarea.value;

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                //after the element has been saved the edditing textarea can be removed
                document.getElementById("content_wrapper").remove();
                console.log("Datei: " + name + " gespeichert");
            } else {
                console.log("Save failed");
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    //ask the server to "update" the file content of the textfile with the current content of the textarea
    req.open("POST", "http://localhost:8080/" + path, true);
    req.setRequestHeader("Authorization",  sessionStorage.getItem("authcode"));
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("content=" + btoa(newContent));
}

function uploadFile() {
    //get the input element with type="file"
    const fileInput = document.getElementById("input_Files");
    const formData = new FormData();
    //get the file form the input element into the formData
    formData.append("newFile", fileInput.files[0]);

    //take the name of the file that will be uploaded form the input element
    const name = fileInput.files[0].name;

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                //in case of success reload the table to show the new element
                console.log("Upload succsess");
                refreshTable();
            }
            else {
                //in case of failure create an error message with the server response
                console.log("uploadFailure");
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    //ask the server to uplpad the file, in the formData, into the current directory
    req.open("POST", "http://localhost:8080/" + sessionStorage.getItem("dir") + name, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send(formData);
}

