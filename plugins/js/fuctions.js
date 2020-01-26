function hideElementById(id){
    document.getElementById(id).style.display='none';
}

function showElementById(id){
    document.getElementById(id).style.display='block';
}

function setLocalStorageInfo(x, info){
    localStorage.setItem(x, info);
}

function getLocalStorageInfo(x){
    return localStorage.getItem(x);
}

function setJSONLocalStorageInfo(x, info){
    localStorage.setItem(x, JSON.stringify(info));
}

function getJSONLocalStorageInfo(x){
    return JSON.parse(localStorage.getItem(x));
}

function getElementById(id){
    return document.getElementById(id);
}

function setInnerHtml(id, html_content){
    getElementById(id).innerHTML = html_content;
}

function init(){
    getElementById("user-name-span").innerHTML = "Hi "+ getJSONLocalStorageInfo("apiResponse").user.name + "!";
}