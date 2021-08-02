//############# post request for token ###################################
function httpPost(){
    const url = "http://localhost:8080/login";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log("Request-Token: " + xhr.responseText);
            console.log("Second Part of Token" + xhr.responseText.split(":"));
            const token = xhr.responseText.slice(10,).replace(/['"}]+/g, '');
            console.log("Token-Nr: " + token);
            base64(token);
        }
    };

    const data = "username=admin&password=admin";

    xhr.send(data);
}

//##################### base64 encoding #################################

function base64(token) {
    console.log("String for Base64: " + token);

    const str = `admin:${token}`;
    console.log("String before base64: " + str);
    let enc = btoa(str);
    console.log("encoded string:" + enc); // Outputs Encoded String
    let dec = atob(enc);
    console.log(dec); // Outputs Decode String
    enc = enc.substring(0, enc.length -1)+"=";
    console.info("Final Encoded String: "+enc);

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const yourFunction = async () => {
        await delay(5000);
        test(enc);
    };
    yourFunction();
}


//################################ GET Request ###########################

function test(enc) {
    const urlout = "http://localhost:8080/logout";

    xhr = new XMLHttpRequest();
    xhr.open("GET", urlout);

    xhr.setRequestHeader("Authorization", "Basic " + enc);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    };

    xhr.send();
    return 1;
}