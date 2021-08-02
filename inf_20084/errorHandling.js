function errorHandling (message, diplayTime){
    if(!document.getElementById("errorBanner")){
        const div_error = document.createElement("div");
        div_error.setAttribute("id", "errorBanner");

        const errorMessage = document.createElement("div")
        errorMessage.setAttribute("id", "errorMessage");
        errorMessage.innerText = message;

        div_error.append(errorMessage);
        document.body.append(div_error);

        setTimeout(() => {
            div_error.remove();
            }, diplayTime * 1000
        );
    }
}