<?php


class UserController{
    function __construct(){
            require_once dirname(__FILE__) . '/UserService.php';
        }
    // function getAllInfo($user_id){
    //     $userService = new UserService();
    //     return $userService->getAllInfo($user_id);
    // }
    function checkForInvitesAccepted($user_id,$user_mail){
        $userService = new UserService();
        return $userService->checkForInvitesAccepted($user_id,$user_mail);
    }
}

?>