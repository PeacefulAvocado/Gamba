function Menu() {
    var x = document.getElementById("menu");
    if (x.className === "menu") {
        x.className += " responsive";
    } else {
    x.className = "menu";
        }
    }


function toggleTheme(type,index) {
    var theme = document.getElementsByTagName('link')[0];
        theme.setAttribute('href', `Styles/${type}${index}.css`);
        localStorage.setItem("globalTheme",index)
   
}


function Configure(page) {
    if (localStorage.getItem("globalTheme") != null){
    if(page == "mainpage") {
        toggleTheme("style",localStorage.getItem("globalTheme"))
    } else {
        toggleTheme("aloldal",localStorage.getItem("globalTheme"))
    }}
    
}