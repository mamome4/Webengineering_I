function createDir() {
    //removes other content in the contents div
    try{
        document.getElementById("wrapper_create").remove();
    } catch (e) {}
    try{
        document.getElementById("content_wrapper").remove();
    } catch (e) {}

    //creates the textarea element for the name and the button elements to create a new Directory
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

    //appends the created elements to the list
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
                //removes the elements to create a new directory after creation
                document.getElementById("wrapper_create").remove();
                //refreshes the table to show the new directory
                refreshTable();
                console.log("new Directory created");
            } else {
                //calls errorHandling function in case request is unsuccessful
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    //asks to create the new directory with the name from the textarea
    req.open("POST", "http://localhost:8080/" + sessionStorage.getItem("dir") + name, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("type=dir");
}

function createTextFile(){
    //removes other content in the contents div
    try{
        document.getElementById("wrapper_create").remove();
    } catch (e) {}
    try {
        document.getElementById("content_wrapper").remove()
    } catch (e) {}

    //creates the textareas for the name and content of a textfile as well as the buttons to create it
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

    //appends the new Elements to the page
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
                //removes the elements to create a new textfile after creation
                document.getElementById("wrapper_create").remove();
                //reloads the table to show the new textfile
                refreshTable();
                console.log("new File created: " + name);
                console.log(text);
            }
            else{
                //calls errorHandling function in case request is unsuccessful
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    //asks to create the new textfile with the name and content from the textareas
    req.open("POST", "http://localhost:8080/" + sessionStorage.getItem("dir") + name + ".txt", true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("content=" + btoa(text));
}