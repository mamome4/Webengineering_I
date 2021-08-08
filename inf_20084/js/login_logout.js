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
                //writes the username and the Token in the session storage
                sessionStorage.setItem("username", formData.get("username").toString());
                sessionStorage.setItem("authcode", "Basic " + btoa(formData.get("username") + ":" + JSON.parse(this.response).token));
                document.getElementById("myText").innerHTML  = "";
                //start out directory is the empty path
                sessionStorage.setItem("dir", "");
                loadDirectory(sessionStorage.getItem("dir"));
                //sets the "is logged in state"
                setLoginState();
            }else {
                //In case of an error this message is displayed above the login button
                document.getElementById("myText").textContent = "No connection to the server could be established"
            }
        }
        //In case the username and/or password are wrong the mesage "Wrong Username and Passowrd" is diplayed above the login button
        if ((document.getElementById("input_username").value !== "admin") || (document.getElementById("input_password").value !== "admin")) {
            document.getElementById("myText").textContent = "Wrong Username and Password"
        }
    }
    //asks the server for the token with the username and password to authenticate them
    req.open('POST', "http://localhost:8080/login", true);
    req.setRequestHeader("Authorization", "application/x-www-form-urlencoded");
    req.send(formData);
}

function setLoginState() {
    //trys to remove the hidden attribute from the topbar
    try{document.getElementById("topbar").removeAttribute("hidden");} catch (e) {}
    //removes the login div to make space for the directory
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
                //removes the token from the session storage upon logout
                sessionStorage.removeItem("authcode");
                //sets the "is logged out" state
                setLogoutState();
                try{ document.getElementById("myText").textContent = "";} catch (e) {}
            }
        }
    }
    //asks the server for a logout
    req.open('GET', "http://localhost:8080/logout", true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send();
}

function setLogoutState() {
    //removes all possible Elements (so that, for example, no pictures or other elements are still displayed on the page after logout)
    try {document.getElementById("logout_button").setAttribute("hidden", "");}catch (e) {}

    removeTable();

    try{ document.getElementById("wrapper_create").remove();} catch (e) {}
    try{
        document.getElementById("wrapper").remove();
        document.getElementById("content_wrapper").remove();
    } catch (e) {}
    try{document.getElementById("login_button").removeAttribute("hidden");}catch (e) {}
    try{document.getElementById("inputs").removeAttribute("hidden");} catch (e) {}

    //makes the topbar invisible
    document.getElementById("topbar").setAttribute("hidden", "");

    //builds the login again
    if(!document.getElementById("login")){
        buildlogin();
    }
    document.getElementById("myText").textContent = "";
}

function isLoggedIn(){
    //if there is no token i.e. if the session has expired upon loading of the page the "is logged out state" is loaded
    if(sessionStorage.getItem("authcode") == null){
        setLogoutState();
        return;
    }

    //if the authentication code exists then load the current directory
    const req = new XMLHttpRequest();
    req.onreadystatechange = function (){
        if(req.readyState === 4){
            if(req.status === 200){
                setLoginState();
                loadDirectory(sessionStorage.getItem("dir"));
            }
            //if there is an error reload the login form and delete the existing token and directory path
            if(req.status === 401){
                sessionStorage.removeItem("authcode");
                sessionStorage.removeItem("dir");
                setLogoutState();
            }
        }
    }
    req.open("GET", "http://localhost:8080/", true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authcode"));
    req.send();

}

function buildlogin() {
    //builds the entire login form as it is in the html file again after logout
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