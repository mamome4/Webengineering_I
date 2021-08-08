function loadFile(type, name) {
    const dir = sessionStorage.getItem("dir");
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if(req.readyState === 4) {
            if(req.status === 200) {
                const response = req.responseText;
                switch (type) {
                    case "image/jpeg":
                    case "image/png": displayImage(response, type);
                        break;
                    case "audio/ogg":
                    case "audio/mpeg": displayAudio(response, type);
                        break;
                    case "text/plain": displayText(response, name);
                        break;
                    case "video/mp4": displayVideo(response, type);
                        break;
                    default:
                        break;
                }
            } else {
                errorHandling(JSON.parse(req.responseText).error, 3);
            }
        }
    }
    req.open("GET", "http://localhost:8080/" + dir + name + "?format=base64", true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send();
}

function displayImage(response, type) {
    //removes other content in the contents div
    try{document.getElementById("content_wrapper").remove();} catch (e) {}
    try{ document.getElementById("wrapper_create").remove();} catch (e) {}

    //creats the img element with the source from the API request response
    const container = document.getElementById("contents");

    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "content_wrapper");

    const img = document.createElement("img");
    img.setAttribute("src", "data:" + type + ";base64," + response);

    const button_close = document.createElement("button");
    button_close.innerText = "Close";
    button_close.addEventListener("click", function () {wrapper.remove();});

    //appends img and close button to the wrapper which is then appended to the contents div
    wrapper.append(img);
    wrapper.append(button_close);
    container.append(wrapper);
}

function displayAudio(response, type) {
    //removes other content in the contents div API request response
    try{document.getElementById("content_wrapper").remove();} catch (e) {}
    try{ document.getElementById("wrapper_create").remove();} catch (e) {}

    //creats the audio element with the source from the API request response
    const container = document.getElementById("contents");

    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "content_wrapper");

    const audio = document.createElement("audio");
    audio.setAttribute("controls", "");
    audio.setAttribute("type", type);
    audio.setAttribute("src", "data:" + type + ";base64," + response);

    const button_close = document.createElement("button");
    button_close.innerText = "Close";
    button_close.addEventListener("click", function () {wrapper.remove();});

    //appends audio element and close button to the wrapper which is then appended to the contents div
    wrapper.append(audio);
    wrapper.append(button_close);
    container.append(wrapper);
}

function displayText(response, name) {
    //removes other content in the contents div
    try{document.getElementById("content_wrapper").remove();} catch (e) {}
    try{document.getElementById("wrapper_create").remove();} catch (e) {}

    //creats the textarea element with the source from the API request response
    const container = document.getElementById("contents");

    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "content_wrapper");

    const textArea = document.createElement("textarea");
    //save the path of the file in the textarea tag itself
    textArea.setAttribute("path", sessionStorage.getItem("dir") + name);
    textArea.setAttribute("id", "edit");
    textArea.innerText = atob(response);

    const button_save = document.createElement("button");
    button_save.innerText = "Save";
    button_save.addEventListener("click", function () {saveText(name)});

    const button_close = document.createElement("button");
    button_close.innerText = "Close";
    button_close.addEventListener("click", function () {wrapper.remove();});

    //appends textarea and open and close buttons to the wrapper which is then appended to the contents div
    wrapper.append(textArea);
    wrapper.append(button_save);
    wrapper.append(button_close);
    container.append(wrapper);
}

function displayVideo(response, type) {
    //removes other content in the contents div
    try{document.getElementById("content_wrapper").remove();} catch (e) {}
    try{document.getElementById("wrapper_create").remove();} catch (e) {}

    //creats the video element with the source from the API request response
    const container = document.getElementById("contents");

    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "content_wrapper");

    const videoPlayer = document.createElement("video");
    videoPlayer.setAttribute("controls", "");
    videoPlayer.setAttribute("type", type);
    videoPlayer.setAttribute("src", "data:" + type + ";base64," + response);

    const button_close = document.createElement("button");
    button_close.innerText = "Close";
    button_close.addEventListener("click", function () {wrapper.remove();});

    //appends video element and close button to the wrapper which is then appended to the contents div
    wrapper.append(videoPlayer);
    wrapper.append(button_close);
    container.append(wrapper);
}