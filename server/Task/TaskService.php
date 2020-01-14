<?php


class TaskService
{
    function __construct()
    {
        require_once dirname(__FILE__) . '/TaskImp.php';
    }

    function createNonLinkedTask($user_id, $task_name, $task_description,$task_deadline)
    {
        $taskImp = new TaskImp();
        return $taskImp->createNonLinkedTask($user_id, $task_name, $task_description,$task_deadline);
    }

    function fetchNonLinkedTask($user_id)
    {
        $taskImp = new TaskImp();
        return $taskImp->fetchNonLinkedTask($user_id);
    }

    function completeNonLinkedTask($user_id, $task_id)
    {
        $taskImp = new TaskImp();
        return $taskImp->completeNonLinkedTask($user_id, $task_id);
    }
    function deletedNonLinkedTask($user_id, $task_id)
    {
        $taskImp = new TaskImp();
        return $taskImp->deletedNonLinkedTask($user_id, $task_id);
    }
    function editNonLinkedTask($user_id,$task_id,$task_name,$task_description,$task_deadline){
        $taskImp = new TaskImp();
        return $taskImp->editNonLinkedTask($user_id,$task_id,$task_name,$task_description,$task_deadline);
    }
    function notifyNonLinkedTask($user_id,$task_id,$reminder_email,$reminder_message,$reminder_time){
        $taskImp = new TaskImp();
        return $taskImp->notifyNonLinkedTask($user_id,$task_id,$reminder_email,$reminder_message,$reminder_time);
    }
}
