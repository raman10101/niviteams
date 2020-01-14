<?php


class TeamImp
{
    function __construct()
    {
        require_once dirname(__FILE__) . '/TeamQuery.php';
    }

    function createTeam($user_id,$team_name,$team_description){
        $teamQuery = new TeamQuery();
        return $teamQuery->createTeam($user_id,$team_name,$team_description);
    }

}
