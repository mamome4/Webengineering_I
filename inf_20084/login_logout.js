function login() {
    const formData = new FormData();
    formData.append("username", document.getElementById("input_username").value);
    formData.append("password", document.getElementById("input_password").value);

    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if(req.status === 200){
                console.log(req.status);
                console.log(req.responseText);
                console.log("Login successfull");
                sessionStorage.setItem("username", formData.get("username").toString());
                sessionStorage.setItem("authcode", "Basic " + btoa(formData.get("username") + ":" + JSON.parse(this.response).token));
                document.getElementById("myText").innerHTML  = "";
                sessionStorage.setItem("dir", "");
                //buildNavBar();
                loadDirectory(sessionStorage.getItem("dir"));
                setLoginState();

            }else {
                document.getElementById("myText").textContent = "Es konnte keine Verbindung zum Server aufgebaut werden"
            }
        }
        if ((document.getElementById("input_username").value !== "admin") || (document.getElementById("input_password").value !== "admin")) {
            document.getElementById("myText").textContent = "Falscher Username oder Passwort"
        }
    }
    req.open('POST', "http://localhost:8080/login", true);
    req.setRequestHeader("Authorization", "application/x-www-form-urlencoded");
    req.send(formData);
}

function setLoginState() {
    try{
        document.getElementById("topbar").removeAttribute("hidden");
    } catch (e) {}
    document.getElementById("login_button").setAttribute("hidden", "");
    document.getElementById("inputs").setAttribute("hidden", "");
    document.getElementById("login").remove();
}

function logout() {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if(req.readyState === 4){
            if(req.status === 200){
                console.log(req.status);
                console.log(req.responseText);
                console.log("Logout successfull");
                sessionStorage.removeItem("authcode");
                setLogoutState();
                try{
                    document.getElementById("myText").textContent = "";
                } catch (e) {}


            }
        }
    }
    req.open('GET', "http://localhost:8080/logout", true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send();
}

function setLogoutState() {
    try {document.getElementById("logout_button").setAttribute("hidden", "");}catch (e) {}

    removeTable();

    try{ document.getElementById("wrapper_create").remove();} catch (e) {}
    try{
        document.getElementById("wrapper").remove();
        document.getElementById("content_wrapper").remove();
    } catch (e) {}
    try{document.getElementById("login_button").removeAttribute("hidden");}catch (e) {}
    try{document.getElementById("inputs").removeAttribute("hidden");} catch (e) {}

    document.getElementById("topbar").setAttribute("hidden", "");

    if(!document.getElementById("login")){
        buildlogin();
    }
}

function isLoggedIn(){
    if(sessionStorage.getItem("authcode") == null){
        setLogoutState();
        return;
    }

    const req = new XMLHttpRequest();
    req.onreadystatechange = function (){
        if(req.readyState === 4){
            if(req.status === 200){
                setLoginState();
                loadDirectory(sessionStorage.getItem("dir"));
            }
            if(req.status === 401){
                sessionStorage.removeItem("authcode");
                sessionStorage.removeItem("directory");
                setLogoutState();
                document.getElementById("myText").innerHTML = this.responseText;
            }
        }
    }
    req.open("GET", "http://localhost:8080/", true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send();

}

function buildlogin() {
    const div_login = document.createElement("div");
    div_login.setAttribute("id", "login");

    const form = document.createElement("form");
    form.setAttribute("id", "login-form");
    form.setAttribute("enctype", "application/x-www-form-urlencoded");

    const inputs = document.createElement("a");
    inputs.setAttribute("id", "inputs");

    const br = document.createElement("br");

    const lable_username = document.createElement("label");
    lable_username.setAttribute("for", "input_username");
    lable_username.innerText = "Username:";

    const input_username = document.createElement("input");
    input_username.setAttribute("type","text");
    input_username.setAttribute("id", "input_username");

    const lable_password = document.createElement("label");
    lable_password.setAttribute("for", "lable_password");
    lable_password.innerText = "Passowrd:";

    const input_password = document.createElement("input");
    input_password.setAttribute("type","password");
    input_password.setAttribute("id", "input_password");

    const myText = document.createElement("p")
    myText.setAttribute("id", "myText");

    const login_button = document.createElement("button");
    login_button.setAttribute("class", "button");
    login_button.setAttribute("type", "button");
    login_button.setAttribute("id", "login_button");
    login_button.innerText = "Login";
    login_button.addEventListener("click", login);

    inputs.append(lable_username);
    inputs.append(br);
    inputs.append(input_username);
    inputs.append(lable_password);
    inputs.append(br);
    inputs.append(input_password);

    form.append(inputs);
    form.append(br);
    form.append(myText)
    form.append(br)
    form.append(login_button);

    div_login.append(form);
    document.body.appendChild(div_login);
}