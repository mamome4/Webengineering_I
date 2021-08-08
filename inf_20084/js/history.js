window.addEventListener("popstate", loadState);

//safes the current table path
function safeState(content) {
    const state = {
        table: content,
        dir: sessionStorage.getItem("dir"),
    }
    history.pushState(state, "Table", document.location);
}

//loads the table path from the state(s) that are in the browser history
function loadState(event){
    const state = event.state;
    if(state){
        document.getElementById("table_content").innerHTML= "";
        buildDirectory(state.table);
        sessionStorage.setItem("dir", state.dir);

        try{
            document.getElementById("content_wrapper").remove();
        } catch (e) {}
        try{
            document.getElementById("create_wrapper").remove();
        } catch (e) {}
    }
}