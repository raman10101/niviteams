<?php


class TaskImp
{
    function __construct()
    {
        require_once dirname(__FILE__) . '/TaskQuery.php';
    }

    function createNonLinkedTask($user_id, $task_name, $task_description,$task_deadline)
    {
        $taskQuery = new TaskQuery();
        return $taskQuery->createNonLinkedTask($user_id, $task_name, $task_description,$task_deadline);
    }

    function fetchNonLinkedTask($user_id)
    {
        $taskQuery = new TaskQuery();
        return $taskQuery->fetchNonLinkedTask($user_id);
    }
    function completeNonLinkedTask($user_id,$task_id){
        $taskQuery = new TaskQuery();
        return $taskQuery->completeNonLinkedTask($user_id,$task_id);
    }
    function deletedNonLinkedTask($user_id,$task_id){
        $taskQuery = new TaskQuery();
        return $taskQuery->deletedNonLinkedTask($user_id,$task_id);
    }
    function editNonLinkedTask($user_id,$task_id,$task_name,$task_description,$task_deadline){
        $taskQuery = new TaskQuery();
        return $taskQuery->editNonLinkedTask($user_id,$task_id,$task_name,$task_description,$task_deadline);
    }
    function notifyNonLinkedTask($user_id,$task_id,$reminder_email,$reminder_message,$reminder_time){
        $taskQuery = new TaskQuery();
        return $taskQuery->notifyNonLinkedTask($user_id,$task_id,$reminder_email,$reminder_message,$reminder_time);
    }
}
