<?php


class TaskQuery
{
    function __construct()
    {
        require_once '../Config/Connect.php';
        $db = new Connect();
        $this->conn = $db->connect();
    }
    function createNonLinkedTask($user_id,$task_name,$task_description,$task_deadline){
        $response = array();
        $task_id = uniqid($user_id);
        $task_label = "WORK";
        $task_priority = 1;
        $stmt = mysqli_query($this->conn, "insert into tasks(user_id,task_id,task_name,task_description,task_timestamp,task_label,task_priority,task_deadline) 
        values('".$user_id."','".$task_id."','".$task_name."','".$task_description."',NOW(),'".$task_label."','".$task_priority."','".$task_deadline."')");
        if($stmt){
            $response["error"] = false;
            $response["message"] = "Task Created Successfully";

        }else{
            $response["error"] = true;
            $response["message"] = "Task could not be created";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }

    function fetchNonLinkedTask($user_id){
        $response = array();
        $stmt = mysqli_query($this->conn,"select * from tasks where user_id = '".$user_id."' and task_status <> 2 ");
        if(mysqli_num_rows($stmt) > 0){
            $response["error"] = false;
            $response["message"] = "Non Linked Tasks Found";
            $response["nonlinkedtasks"] = array();
            while($row = mysqli_fetch_assoc($stmt)){
                array_push($response["nonlinkedtasks"],$row);
            }
        }else{
            $response["error"] = true;
            $response["message"] = "No Non Linked Tasks Found";
        }
        return $response;
    }

    function completeNonLinkedTask($user_id,$task_id){
        $response = array();
        $stmt = mysqli_query($this->conn,"update `tasks` set `task_status` = 1  where `task_id` = '".$task_id."' and `user_id`='".$user_id."' ");
        if($stmt){
            $response["error"] = false;
            $response["message"] = "Non Linked Tasks Completed";
        }else{
            $response["error"] = true;
            $response["message"] = "Non Linked Tasks Not Completed";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }
    function deletedNonLinkedTask($user_id,$task_id){
        $response = array();
        $stmt = mysqli_query($this->conn,"update `tasks` set `task_status` = 2  where `task_id` = '".$task_id."' and `user_id`='".$user_id."' ");
        if($stmt){
            $response["error"] = false;
            $response["message"] = "Non Linked Tasks Deleted";
        }else{
            $response["error"] = true;
            $response["message"] = "Non Linked Tasks Not Deleted";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }
    function editNonLinkedTask($user_id,$task_id,$task_name,$task_description,$task_deadline){
        $response = array();

        $stmt = mysqli_query($this->conn,"update tasks set `task_name`='".$task_name."',`task_description`='".$task_description."',`task_deadline`='".$task_deadline."' where `task_id` = '".$task_id."' and `user_id`='".$user_id."' ");
        if($stmt){
            $response["error"] = false;
            $response["message"] = "Task Updated Successfully";

        }else{
            $response["error"] = true;
            $response["message"] = "Task could not be Updated";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }

    function notifyNonLinkedTask($user_id,$task_id,$reminder_email,$reminder_message,$reminder_time){
        $response = array();
        $stmt = mysqli_query($this->conn,"insert into non_linked_tasks_reminders (user_id,task_id,task_message,task_email,task_reminder_time,timestamp)
        values('".$user_id."','".$task_id."','".$reminder_message."','".$reminder_email."','".$reminder_time."',NOW())");
        if($stmt){
            $response["error"] = false;
            $response["message"] = "Task Set For Notification Successfully";

        }else{
            $response["error"] = true;
            $response["message"] = "Task could not be set For Notification";
            $response["info"] = mysqli_error($this->conn);
        }

        return $response;
    }
}
