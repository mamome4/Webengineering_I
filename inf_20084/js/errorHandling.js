function errorHandling (message, diplayTime){
    //only works if there is no preexisting error banner
    if(!document.getElementById("errorBanner")){
        //Creates the errorbanner and the message for the banner
        const div_error = document.createElement("div");
        div_error.setAttribute("id", "errorBanner");

        const errorMessage = document.createElement("div")
        errorMessage.setAttribute("id", "errorMessage");
        errorMessage.innerText = message;

        //appends the banner and message to the banner and banner to the page
        div_error.append(errorMessage);
        document.body.append(div_error);

        //waits until the diplay time is over and removes the error banner and text( *1000 to convert displayTime into seconds)
        setTimeout(() => {
            div_error.remove();
            }, diplayTime * 1000
        );
    }
}