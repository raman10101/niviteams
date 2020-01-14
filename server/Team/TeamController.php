<?php


class TeamController
{
    function __construct()
    {
        require_once dirname(__FILE__) . '/TeamService.php';
    }
    function createTeam($user_id,$team_name,$team_description){
        $teamService = new TeamService();
        return $teamService->createTeam($user_id,$team_name,$team_description);
    }
}
