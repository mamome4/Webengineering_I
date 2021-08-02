function clickedOnPath(event){
    const dir = event.target.parentNode.childNodes[0].innerText;
    if(dir === "dir"){
        const linkappend = event.target.innerText + "/";
        const link = sessionStorage.getItem("dir");

        sessionStorage.setItem("dir", link + linkappend);

        removeTable();
        loadDirectory(sessionStorage.getItem("dir"));
    } else {
        console.log(dir);
        loadFile(dir, event.target.innerText);
    }
}

function downloadFile(event) {
    const tr = event.target.parentNode.parentNode;
    const fileName = tr.childNodes[1].innerText;
    const dir = sessionStorage.getItem("dir");
    const type = tr.childNodes[0].innerText;

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                const download = document.createElement("a");

                download.setAttribute("hidden", "");
                download.setAttribute("href", "data:" + type + ";base64," + req.responseText);
                download.setAttribute("download", fileName);

                download.click();
            } else {
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    req.open("GET", "http://localhost:8080/" + dir + fileName + "?format=base64", true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send();
}

function deleteFile(event){
    const tr = event.target.parentNode.parentNode;
    const fileName = tr.childNodes[1].innerText;
    const dir = sessionStorage.getItem("dir");

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("File successfully deleted");
                console.log("http://localhost:8080/" + dir + fileName);
            } else {
                console.log("File could not be deleted");
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    req.open("DELETE", "http://localhost:8080/" + dir + fileName, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send();

    tr.remove();
}


function saveText(name) {
    const textarea = document.getElementById("edit");
    const path = textarea.getAttribute("path");
    const newContent = textarea.value;

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                document.getElementById("content_wrapper").remove();
                console.log("Datei: " + name + " gespeichert");
            } else {
                console.log("Save failed");
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    req.open("POST", "http://localhost:8080/" + path, true);
    req.setRequestHeader("Authorization",  sessionStorage.getItem("authcode"));
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("content=" + btoa(newContent));
}

function uploadFile() {
    const fileInput = document.getElementById("input_Files");
    const formData = new FormData();
    formData.append("newFile", fileInput.files[0]);

    const name = fileInput.files[0].name;

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("Upload succsess");
                refreshTable(sessionStorage.getItem("dir"));
            }
            else {
                console.log("uploadFailure");
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    req.open("POST", "http://localhost:8080/" + sessionStorage.getItem("dir") + name, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send(formData);
}

