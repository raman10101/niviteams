<?php


class TeamService
{
    function __construct()
    {
        require_once dirname(__FILE__) . '/TeamImp.php';
    }

    function createTeam($user_id,$team_name,$team_description){
        $teamImp = new TeamImp();
        return $teamImp->createTeam($user_id,$team_name,$team_description);
    }

}
