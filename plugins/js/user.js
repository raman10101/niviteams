function getUserEmail(){
    let userEmail  = JSON.parse(localStorage.getItem("apiResponse")).user["email"];
    return userEmail;
}
function getUserId(){
    let userId  = JSON.parse(localStorage.getItem("apiResponse")).user["user_id"];
    return userId;
}