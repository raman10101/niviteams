<?php


class UserImp
{
    function __construct()
    {
        require_once dirname(__FILE__) . '/UserQuery.php';
    }
    // function getAllInfo($user_id)
    // {
    //     $userQuery = new UserQuery();
    //     return $userQuery->getAllInfo($user_id);
    // }
    function checkForInvitesAccepted($user_id, $user_mail)
    {
        $userQuery = new UserQuery();
        return $userQuery->checkForInvitesAccepted($user_id, $user_mail);
    }
}
