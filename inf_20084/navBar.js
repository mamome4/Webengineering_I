function buildNavBar() {
    try {
        document.getElementById("currentDir_wrapper").remove()
    } catch (e) {}

    const navBar = document.getElementById("navBar");

    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "wrapper");

    const logout_wrapper = document.createElement("div");
    logout_wrapper.setAttribute("id", "logout_wrapper");

    const currentDir_wrapper = document.createElement("div");
    currentDir_wrapper.setAttribute("id", "currentDir_wrapper");

    const button_back = document.createElement("img");
    button_back.setAttribute("src",  "./assets/back.png");
    button_back.setAttribute("class", "iconSize clickable");
    button_back.setAttribute("id", "img_action_logout");
    button_back.setAttribute("title", "Back");
    button_back.addEventListener("click", previousDir);



    const lable_dir = document.createElement("label");
    lable_dir.setAttribute("id", "currentDir");
    lable_dir.innerText = "";

    const button_refresh = document.createElement("img");
    button_refresh.setAttribute("src",  "./assets/refresh.png");
    button_refresh.setAttribute("class", "iconSize clickable");
    button_refresh.setAttribute("id", "img_action_logout");
    button_refresh.setAttribute("title", "Refresh");
    button_refresh.addEventListener("click", function () {refreshTable(sessionStorage.getItem("dir"))});

    const input_upload = document.createElement("input");
    input_upload.setAttribute("type", "file");
    input_upload.setAttribute("id", "input_Files");
    input_upload.setAttribute("hidden", "");
    input_upload.setAttribute("height", "0px");
    input_upload.setAttribute("width", "0px");
    input_upload.innerText = "File Upload";
    input_upload.addEventListener("change", uploadFile);

    const button_upload = document.createElement("img");
    button_upload.setAttribute("src",  "./assets/upload.png");
    button_upload.setAttribute("class", "iconSize clickable");
    button_upload.setAttribute("id", "img_action_logout");
    button_upload.setAttribute("title", "Upload");
    button_upload.addEventListener("click", openDialog);

    function openDialog() {
        document.getElementById("input_Files").click();
    }

    const button_createDir = document.createElement("img");
    button_createDir.setAttribute("src",  "./assets/createDir.png");
    button_createDir.setAttribute("class", "iconSize clickable");
    button_createDir.setAttribute("id", "img_action_logout");
    button_createDir.setAttribute("title", "Create Directory");
    button_createDir.addEventListener("click", createDir);

    const button_createText = document.createElement("img");
    button_createText.setAttribute("src",  "./assets/createText.png");
    button_createText.setAttribute("class", "iconSize clickable");
    button_createText.setAttribute("id", "img_action_logout");
    button_createText.setAttribute("title", "Create Text File");
    button_createText.addEventListener("click", createTextFile);

    try{
        document.getElementById("logout_wrapper").remove();
    } catch (e) {}

    const button_logout = document.createElement("img");
    button_logout.setAttribute("src",  "./assets/logout.png");
    button_logout.setAttribute("class", "iconSize clickable");
    button_logout.setAttribute("id", "img_action_logout");
    button_logout.setAttribute("title", "Logout");
    button_logout.addEventListener("click", logout);

    wrapper.append(button_back);
    wrapper.append(button_refresh);
    wrapper.append(button_upload);
    wrapper.append(button_createDir);
    wrapper.append(button_createText);
    wrapper.append(input_upload);
    currentDir_wrapper.append(lable_dir);
    logout_wrapper.append(button_logout);
    navBar.append(wrapper);
    navBar.append(currentDir_wrapper);
    navBar.append(logout_wrapper);
}