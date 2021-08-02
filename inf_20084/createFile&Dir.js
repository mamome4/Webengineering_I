function createDir() {
    try{
        document.getElementById("wrapper_create").remove();
    } catch (e) {}
    try{
        document.getElementById("content_wrapper").remove();
    } catch (e) {}

    const container = document.getElementById("contents");

    const wrapper = document.createElement("wrapper_create");
    wrapper.setAttribute("id", "wrapper_create");

    const textArea = document.createElement("textarea");
    textArea.setAttribute("id", "newDir");
    textArea.setAttribute("maxlength", "256");
    textArea.setAttribute("placeholder", "Directory Name");

    const button_create = document.createElement("button");
    button_create.innerText = "Create";
    button_create.addEventListener("click", function () {createNewDir(textArea.value)});

    const button_close = document.createElement("button");
    button_close.innerText = "Close";
    button_close.addEventListener("click", function () {wrapper.remove();});

    wrapper.append(textArea);
    wrapper.append(button_create);
    wrapper.append(button_close);
    container.append(wrapper);
}

function createNewDir (name) {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                document.getElementById("wrapper_create").remove();
                refreshTable(sessionStorage.getItem("dir"));
                console.log("new Directory created");
            } else {
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    req.open("POST", "http://localhost:8080/" + sessionStorage.getItem("dir") + name, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("type=dir");
}

function createTextFile(){
    try{
        document.getElementById("wrapper_create").remove();
    } catch (e) {}
    try {
        document.getElementById("content_wrapper").remove()
    } catch (e) {}
    try{
        document.getElementById("wrapper_create").remove();
    } catch (e) {}

    const container = document.getElementById("contents");

    const wrapper = document.createElement("wrapper_create");
    wrapper.setAttribute("id", "wrapper_create");

    const textArea = document.createElement("textarea");
    textArea.setAttribute("maxlength", "256");
    textArea.setAttribute("placeholder", "File Name");
    textArea.setAttribute("id", "fileName");

    const textAreaFileContent = document.createElement("textarea");
    textAreaFileContent.setAttribute("placeholder", "Text input");
    textAreaFileContent.setAttribute("id", "fileContent");

    const button_create = document.createElement("button");
    button_create.innerText = "Create";
    button_create.setAttribute("id", "create");
    button_create.addEventListener("click", function () {createNewTextFile(textArea.value, textAreaFileContent.value)});

    const button_close = document.createElement("button");
    button_close.innerText = "Close";
    button_close.addEventListener("click", function () {wrapper.remove();});

    wrapper.append(textArea);
    wrapper.append(textAreaFileContent);
    wrapper.append(button_create);
    wrapper.append(button_close);

    container.append(wrapper);
}

function createNewTextFile (name, text) {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                document.getElementById("wrapper_create").remove();
                refreshTable(sessionStorage.getItem("dir"));
                console.log("new File created: " + name);
                console.log(text);
            }
            else{
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    req.open("POST", "http://localhost:8080/" + sessionStorage.getItem("dir") + name, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("content=" + btoa(text));
}