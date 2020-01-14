<?php


class ProjectService
{
    function __construct()
    {
        require_once dirname(__FILE__) . '/ProjectImp.php';
    }

    function createProject($user_id, $project_name, $project_description)
    {
        $projectImp = new ProjectImp();
        return $projectImp->createProject($user_id, $project_name, $project_description);
    }
    function createTaskinproject($user_id, $task_name, $task_description, $project_id, $task_deadline, $team_id)
    {
        $projectImp = new ProjectImp();
        return $projectImp->createTaskinproject($user_id, $task_name, $task_description, $project_id, $task_deadline, $team_id);
    }
    function createTeamInProject($user_id, $project_id, $team_name, $team_description)
    {
        $projectImp = new ProjectImp();
        return $projectImp->createTeamInProject($user_id, $project_id, $team_name, $team_description);
    }
    function addMemeberToProject($user_id, $project_id, $member_name, $member_mail)
    {
        $projectImp = new ProjectImp();
        return $projectImp->addMemeberToProject($user_id, $project_id, $member_name, $member_mail);
    }
    function acceptInvitesForProject($user_id, $project_id, $member_mail, $invite_id)
    {
        $projectImp = new ProjectImp();
        return $projectImp->acceptInvitesForProject($user_id, $project_id, $member_mail, $invite_id);
    }
    function fetchTasksOfProject($user_id, $project_id)
    {
        $projectImp = new ProjectImp();
        return $projectImp->fetchTasksOfProject($user_id, $project_id);
    }
    function fetchTeamsOfProject($user_id, $project_id)
    {
        $projectImp = new ProjectImp();
        return $projectImp->fetchTeamsOfProject($user_id, $project_id);
    }
    function fetchMembersOfProject($user_id, $project_id)
    {
        $projectImp = new ProjectImp();
        return $projectImp->fetchMembersOfProject($user_id, $project_id);
    }

    function fetchProjects($user_id)
    {
        $projectImp = new ProjectImp();
        return $projectImp->fetchProjects($user_id);
    }
}
