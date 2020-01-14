<?php


class ProjectImp
{
    function __construct()
    {
        require_once dirname(__FILE__) . '/ProjectQuery.php';
    }

    function createProject($user_id, $project_name, $project_description)
    {
        $projectQuery = new ProjectQuery();
        return $projectQuery->createProject($user_id, $project_name, $project_description);
    }
    function createTaskinproject($user_id, $task_name, $task_description, $project_id, $task_deadline, $team_id)
    {
        $projectQuery = new ProjectQuery();
        return $projectQuery->createTaskinproject($user_id, $task_name, $task_description, $project_id, $task_deadline, $team_id);
    }
    function createTeamInProject($user_id, $project_id, $team_name, $team_description)
    {
        $projectQuery = new ProjectQuery();
        return $projectQuery->createTeamInProject($user_id, $project_id, $team_name, $team_description);
    }
    function addMemeberToProject($user_id, $project_id, $member_name, $member_mail)
    {
        $projectQuery = new ProjectQuery();
        return $projectQuery->addMemeberToProject($user_id, $project_id, $member_name, $member_mail);
    }
    function acceptInvitesForProject($user_id, $project_id, $member_mail, $invite_id)
    {
        $projectQuery = new ProjectQuery();
        return $projectQuery->acceptInvitesForProject($user_id, $project_id, $member_mail, $invite_id);
    }
    function fetchTasksOfProject($user_id, $project_id)
    {
        $projectQuery = new ProjectQuery();
        return $projectQuery->fetchTasksOfProject($user_id, $project_id);
    }
    function fetchTeamsOfProject($user_id, $project_id)
    {
        $projectQuery = new ProjectQuery();
        return $projectQuery->fetchTeamsOfProject($user_id, $project_id);
    }
    function fetchMembersOfProject($user_id, $project_id)
    {
        $projectQuery = new ProjectQuery();
        return $projectQuery->fetchMembersOfProject($user_id, $project_id);
    }
    function fetchProjects($user_id)
    {
        $projectQuery = new ProjectQuery();
        return $projectQuery->fetchProjects($user_id);
    }
}
