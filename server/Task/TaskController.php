<?php


class TaskController{
    function __construct(){
            require_once dirname(__FILE__) . '/TaskService.php';
        }
    function createNonLinkedTask($user_id,$task_name,$task_description,$task_deadline){
        $taskService = new TaskService();
        return $taskService->createNonLinkedTask($user_id,$task_name,$task_description,$task_deadline);
    }
    function fetchNonLinkedTask($user_id){
        $taskService = new TaskService();
        return $taskService->fetchNonLinkedTask($user_id);
    }
    function completeNonLinkedTask($user_id,$task_id){
        $taskService = new TaskService();
        return $taskService->completeNonLinkedTask($user_id,$task_id);
    }
    function deletedNonLinkedTask($user_id,$task_id){
        $taskService = new TaskService();
        return $taskService->deletedNonLinkedTask($user_id,$task_id);
    }
    function editNonLinkedTask($user_id,$task_id,$task_name,$task_description,$task_deadline){
        $taskService= new TaskService();
        return $taskService->editNonLinkedTask($user_id,$task_id,$task_name,$task_description,$task_deadline);
    }
    function notifyNonLinkedTask($user_id,$task_id,$reminder_email,$reminder_message,$reminder_time){
        $taskService = new TaskService();
        return $taskService->notifyNonLinkedTask($user_id,$task_id,$reminder_email,$reminder_message,$reminder_time);
    }
}

?>