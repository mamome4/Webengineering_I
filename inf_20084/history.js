window.addEventListener("popstate", loadState);

function safeState(content) {
    const state = {
        table: content,
        dir: sessionStorage.getItem("dir"),
    }
    history.pushState(state, "Table", document.location);
}

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