<?php


class UserService{
    function __construct(){
        require_once dirname(__FILE__) . '/UserImp.php';
        // require_once dirname(__FILE__) . '../Task/TaskController.php';
    }
    // function getAllInfo($user_id){
    //     // $userImp = new UserImp();
    //     // return $userImp->getAllInfo($user_id);
    //     $taskController = new TaskController();
    //     return $taskController->fetchNonLinkedTask($user_id);
    // }
   
    function checkForInvitesAccepted($user_id,$user_mail){
        $userImp = new UserImp();
        return $userImp->checkForInvitesAccepted($user_id,$user_mail);
    }
}

?>