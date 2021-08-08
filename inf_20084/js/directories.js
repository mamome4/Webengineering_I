function loadDirectory(link) {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(this.status === 200) {
                //if everything is okay build the table and safe the state into the browser history
                let path = JSON.parse(req.responseText);
                console.log(req.responseText);
                buildDirectory(path);
                safeState(path);
                //build the navbar and display the current dir
                try{document.getElementById("wrapper").remove();} catch (e) {}
                buildNavBar();
                displayCurrentDir();
            } else {
                //if there is an error create the error banner with the error response form the request
                console.log("Failed to get Folders!");
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    //ask to get the directory data from the server for the table
    req.open("GET", "http://localhost:8080/" + link, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send();
}

function buildDirectory(path) {
    const table = document.getElementById("table_content");

    let tableHeader = ["Type", "Name", "Download", "Delete"];
    let tr = document.createElement("tr");

    //create the table header with the Names from the Array
    tableHeader.forEach((element) => {
       let th = document.createElement("th");
       th.innerText = element;
       tr.append(th);
    });
    table.appendChild(tr)

    console.log(path.length);

    //create the Table one row at a time
    for(let i = 0; i < path.length; i++){
        const tr = document.createElement("tr");

        const tdFileType = document.createElement("td");
        const tdFileName = document.createElement("td");
        const tdFileDownload = document.createElement("td");
        const tdFileDelete = document.createElement("td");

        const button_Download = document.createElement("img");
        button_Download.setAttribute("src",  "./assets/Download.png");
        button_Download.setAttribute("class", "iconSize clickable");
        button_Download.setAttribute("id", "img_action");
        button_Download.setAttribute("title", "Download");
        button_Download.addEventListener("click", downloadFile);

        const button_Delete = document.createElement("img");
        button_Delete.setAttribute("src",  "./assets/trashcan.png");
        button_Delete.setAttribute("class", "iconSize clickable");
        button_Delete.setAttribute("id", "img_action");
        button_Delete.setAttribute("title", "Delete");
        button_Delete.addEventListener("click", deleteFile);

        tdFileType.innerText = path[i].Type;
        tdFileName.innerText = path[i].Name;
        tdFileName.addEventListener("click", clickedOnPath);
        //if it is a directory download is not available for everything else download is available
        tdFileDownload.innerText = path[i].Type === "dir" ? "unavailable" : "available";
        tdFileDelete.appendChild(button_Delete);
        if(tdFileDownload.innerText === "available") {
            //if the download is avialable remove the delete button, add the download button and readd the delete button
            //so that the download button is always bevor the delete button
            tdFileDelete.removeChild(button_Delete);
            tdFileDelete.appendChild(button_Download);
            tdFileDelete.appendChild(button_Delete);
        }

        //append each column to the row and append the row to the table
        tr.append(tdFileType);
        tr.append(tdFileName);
        tr.append(tdFileDownload);
        tr.append(tdFileDelete);
        table.appendChild(tr);
    }
}

function removeTable() {
    //remove the entre table one child at a time
    const table =document.getElementById("table_content");
    while(table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
}

function refreshTable() {
    //wipe the table and reload with the current directory
    document.getElementById("table_content").innerHTML = "";
    loadDirectory(sessionStorage.getItem("dir"));
}

function previousDir() {
    //first try to remove any content which could be in the content wrapper
    try{document.getElementById("content_wrapper").remove();} catch (e) {}
    try{document.getElementById("wrapper_create").remove();} catch (e) {}

    let dir = sessionStorage.getItem("dir");
    if (dir) {
        //take the direcotry path split it and only use the path to the next higher directory set that as the new directory path and refresh
        dir = dir.split("/");
        dir = dir.splice(0, dir.length - 2);
        dir = dir.join("/");
        if(dir){ dir = dir + "/";}
        sessionStorage.setItem("dir", dir);
        refreshTable();
    }
}

function displayCurrentDir() {
    //gets the current dir from the session storage
    const dir = sessionStorage.getItem("dir");
    //creates a lable for the current directory text
    const lable = document.getElementById("currentDir");

    if(!dir){
        //if there is no current dir text we are in the main dir
        lable.innerText = "Main";
    }else{
        //every other time the text can just be the directory path as written in the session storage
        lable.innerText = dir;
    }
}
