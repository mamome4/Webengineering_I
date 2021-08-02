function loadDirectory(link) {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(this.status === 200) {
                let path = JSON.parse(req.responseText);
                console.log(req.responseText);
                buildDirectory(path);
                safeState(path);
                try{
                    document.getElementById("wrapper").remove();
                } catch (e) {}
                buildNavBar();
                displayCurrentDir();
            } else {
                console.log("Failed to get Folders!");
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    req.open("GET", "http://localhost:8080/" + link, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send();
}

function buildDirectory(path) {
    const table = document.getElementById("table_content");

    let tableHeader = ["Type", "Name", "Download", "Delete"];
    let tr = document.createElement("tr");

    tableHeader.forEach((element) => {
       let th = document.createElement("th");
       th.innerText = element;
       tr.append(th);
    });
    table.appendChild(tr)

    console.log(path.length);

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
        tdFileDownload.innerText = path[i].Type === "dir" ? "unavailable" : "available";
        tdFileDelete.appendChild(button_Delete);
        if(tdFileDownload.innerText === "available") {
            tdFileDelete.removeChild(button_Delete);
            tdFileDelete.appendChild(button_Download);
            tdFileDelete.appendChild(button_Delete);
        }

        tr.append(tdFileType);
        tr.append(tdFileName);
        tr.append(tdFileDownload);
        tr.append(tdFileDelete);
        table.appendChild(tr);
    }
}

function removeTable() {
    const table =document.getElementById("table_content");
    while(table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
}

function refreshTable(link) {
    document.getElementById("table_content").innerHTML = "";
    loadDirectory(link);
}

function previousDir() {
    try{
        document.getElementById("content_wrapper").remove();
    } catch (e) {}

    let dir = sessionStorage.getItem("dir");
    if (dir) {
        dir = dir.split("/");
        dir = dir.splice(0, dir.length - 2);
        dir = dir.join("/");
        if (dir) dir = dir + "/";
        sessionStorage.setItem("dir", dir);
        refreshTable(dir);
    }
}

function displayCurrentDir() {
    const dir = sessionStorage.getItem("dir");
    const lable = document.getElementById("currentDir");

    if(!dir){
        lable.innerText = "Main";
    }else{
        lable.innerText = dir;
    }
}
