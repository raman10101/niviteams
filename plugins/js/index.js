function toggleSidebar(){
    var navElem = document.getElementById("sidebar");
    if(navElem.classList.contains("sidebar-show")){
        navElem.classList.remove("sidebar-show");
        navElem.classList.add("sidebar-hide");
    }else{
        navElem.classList.remove("sidebar-hide");
        navElem.classList.add("sidebar-show");
    }
}
function loginSuccess(){
    //Store User Information
    checkForInvitesAccepted();
}

function checkForInvitesAccepted(){
    console.log("checkings");
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/user/checkForInvitesAccepted ",
        type: 'post',
        data: {
            userid: getUserId(),
            usermail: getUserEmail(),
        },
        success: function (data) {
            console.log(data);
            window.location="index.html";

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}