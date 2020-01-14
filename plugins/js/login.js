
function login(){
    //show modal for login
    document.getElementById("login-modal").style.display="block";
}
function closeLoginModal(){
    document.getElementById("login-modal").style.display="none";

}
function HandleGoogleApiLibrary() {
    // Load "client" & "auth2" libraries
   
    gapi.load('client:auth2', {
        callback: function () {
            // Initialize client & auth libraries
            gapi.client.init({
                apiKey: 'AIzaSyAX9TuyBDEdc7u72xT1lO32b4_Kat62Bhs',
                clientId: '456611571672-ahsjeq0rjfi7r83u9at0304oippaidpr.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
            }).then(
                function (success) {
                    // Libraries are initialized successfully
                    // You can now make API calls
                   // renderButton();
                //    console.log("success");
                },
                function (error) {
                    // Error occurred
                    console.log(error) //to find the reason
                }
            );
        },
        onerror: function () {
            // Failed to load libraries
        }
    });
}
function googleLogin(){
    gapi.auth2.getAuthInstance().signIn().then(
        function (success) {
            gapi.client.request({ path: 'https://www.googleapis.com/plus/v1/people/me' }).then(
                function (success) {
                    var user_info = JSON.parse(success.body);
                    // console.log(user_info);
                    var user_name = user_info.displayName;
                    var user_email = user_info.emails[0].value;
                    var user_googleId = user_info.id;
                    var user_image = user_info.image.url;
                    $.ajax({
                        type: "POST",
                        url: "http://appnivi.com/server/v1/user/googleLogin",
                        data: { name: user_name, email: user_email, googleId: user_googleId, image: user_image },
                        dataType: 'JSON',
                        success: function (e) {
                            var response = e;
                            console.log(response);
                            if (response.error == false) {
                                localStorage.setItem("user", "true");
                                localStorage.setItem("apiResponse", JSON.stringify(response));
                                closeLoginModal();
                                console.log("Login success");
                                console.log("In LocalStorage \nVariable 'user' is set true \nVariable 'apiResponse' contains information of response ");
                                console.log("Function loginSuccess() will be called after this, include that in your javascript file");
                                loginSuccess();
                            } else {
                                console.log(respopnse);
                                localStorage.setItem("user", "false");
                            }
                        },
                        error: function (textStatus, errorThrown) {
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                },
                function (error) {
                    console.log(error);
                }
            );
        },
        function (error) {
            console.log(error)
        }
    );
}

function signOut() {
    gapi.auth2.getAuthInstance().signOut().then(
        function (success) {
            console.log("success");
            console.log(success);
        },
        function (error) {
            console.log(error);

        }
    );
}
const loginTemplate = '\
<div id="login-modal">\
    <div id="login-welcome">\
        <span>Welcome To</span>\
        <span>APPNIVI</span>\
    </div>\
    <div id="login-content">\
        <div id="login-google">\
            <button id="google-login-button" onclick="googleLogin()">Google</button>\
        </div>\
    </div>\
    <div id="login-close"><span onclick="closeLoginModal()">Close</span></div>\
</div>';
window.onload = function(){
    document.body.innerHTML= loginTemplate +  document.body.innerHTML;
    HandleGoogleApiLibrary();
};

