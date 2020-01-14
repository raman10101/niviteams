<?php


class ProjectController
{
    function __construct()
    {
        require_once dirname(__FILE__) . '/ProjectService.php';
    }

    function createProject($user_id, $project_name, $project_description)
    {
        $projectService = new ProjectService();
        return $projectService->createProject($user_id, $project_name, $project_description);
    }
    function createTaskinproject($user_id, $task_name, $task_description, $project_id, $task_deadline, $team_id)
    {
        $projectService = new ProjectService();
        return $projectService->createTaskinproject($user_id, $task_name, $task_description, $project_id, $task_deadline, $team_id);
    }
    function createTeamInProject($user_id, $project_id, $team_name, $team_description)
    {
        $projectService = new ProjectService();
        return $projectService->createTeamInProject($user_id, $project_id, $team_name, $team_description);
    }
    function addMemeberToProject($user_id, $project_id, $member_name, $member_mail)
    {
        $projectService = new ProjectService();
        return $projectService->addMemeberToProject($user_id, $project_id, $member_name, $member_mail);
    }
    function acceptInvitesForProject($user_id, $project_id, $member_mail, $invite_id)
    {
        $projectService = new ProjectService();
        return $projectService->acceptInvitesForProject($user_id, $project_id, $member_mail, $invite_id);
    }
    function fetchTasksOfProject($user_id, $project_id)
    {
        $projectService = new ProjectService();
        return $projectService->fetchTasksOfProject($user_id, $project_id);
    }
    function fetchTeamsOfProject($user_id, $project_id)
    {
        $projectService = new ProjectService();
        return $projectService->fetchTeamsOfProject($user_id, $project_id);
    }
    function fetchMembersOfProject($user_id, $project_id)
    {
        $projectService = new ProjectService();
        return $projectService->fetchMembersOfProject($user_id, $project_id);
    }
    function fetchProjects($user_id)
    {
        $projectService = new ProjectService();
        return $projectService->fetchProjects($user_id);
    }
}
