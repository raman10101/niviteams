<?php


class ProjectQuery
{
    function __construct()
    {
        require_once '../Config/Connect.php';
        $db = new Connect();
        $this->conn = $db->connect();
    }
    function createNonLinkedTask($user_id, $task_name, $task_description, $task_deadline)
    {
        $response = array();
        $task_id = uniqid($user_id);
        $task_label = "WORK";
        $task_priority = 1;
        $stmt = mysqli_query($this->conn, "insert into tasks(user_id,task_id,task_name,task_description,task_timestamp,task_label,task_priority,task_deadline) 
        values('" . $user_id . "','" . $task_id . "','" . $task_name . "','" . $task_description . "',NOW(),'" . $task_label . "','" . $task_priority . "','" . $task_deadline . "')");
        if ($stmt) {
            $response["error"] = false;
            $response["message"] = "Task Created Successfully";
        } else {
            $response["error"] = true;
            $response["message"] = "Task could not be created";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }

    function createProject($user_id, $project_name, $project_description)
    {
        $response = array();
        $project_id = uniqid($user_id);
        $stmt = mysqli_query($this->conn, "insert into project (user_id,project_id,project_name,project_description,timestamp) values ('" . $user_id . "','" . $project_id . "','" . $project_name . "','" . $project_description . "',NOW())");

        if ($stmt) {
            $response["error"] = false;
            $response["message"] = "Project Created Successfully";
        } else {
            $response["error"] = true;
            $response["message"] = "Project could not be created";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }
    function createTaskinproject($user_id, $task_name, $task_description, $project_id, $task_deadline, $team_id)
    {
        $response = array();
        $task_id = uniqid($user_id);
        $stmt = mysqli_query($this->conn, "insert into project_tasks (user_id,project_id,task_deadline,task_description,task_id,task_label,task_name,task_priority,task_status,task_timestamp,team_id) values ('" . $user_id . "','" . $project_id . "','" . $task_deadline . "','" . $task_description . "','" . $task_id . "', 'work' ,'" . $task_name . "','0','0',NOW(),'" . $team_id . "')");

        if ($stmt) {
            $response["error"] = false;
            $response["message"] = "Project Task Created Successfully";
        } else {
            $response["error"] = true;
            $response["message"] = "Project Task could not be created";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }

    function createTeamInProject($user_id, $project_id, $team_name, $team_description)
    {
        $response = array();
        $team_id = uniqid($user_id);
        $stmt = mysqli_query($this->conn, "insert into project_teams (project_id,user_id,team_id,team_name,team_description,timestamp)
        values('" . $project_id . "','" . $user_id . "','" . $team_id . "','" . $team_name . "','" . $team_description . "',NOW())");
        if ($stmt) {
            $response["error"] = false;
            $response["message"] = "Project Team Created Successfully";
        } else {
            $response["error"] = true;
            $response["message"] = "Project Team could not be created";
            $response["info"] = mysqli_error($this->conn);
        }


        return $response;
    }

    function addMemeberToProject($user_id, $project_id, $member_name, $member_mail)
    {
        $response = array();
        $invite_id = uniqid($user_id);
        $stmt = mysqli_query($this->conn, "insert into project_add_member_invites (user_id,project_id,member_name,member_mail,invite_id, timestamp)
        values('" . $user_id . "','" . $project_id . "','" . $member_name . "','" . $member_mail . "','" . $invite_id . "',NOW())");
        if ($stmt) {
            //Send Mail To Person
            $to = $member_mail;
            $subject = 'Project Proposal';
            $from = 'raman.10101@gmail.com';

            // To send HTML mail, the Content-type header must be set
            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

            // Create email headers
            $headers .= 'From: ' . $from . "\r\n" .
                'Reply-To: ' . $from . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

            // Compose a simple HTML email message
            $message = '<html><body>';
            $message .= '<h1 style="color:#f40;">Hi Jane!</h1>';
            $message .= '<p style="color:#080;font-size:18px;">Will you marry me?</p>';
            $message .= '<form method="post" action="appnivi.com/niviteams/server/v1/project/acceptInvitesForProject" >
                <input type="hidden" name="userid" value="' . $user_id . '" >
                <input type="hidden" name="projectid" value="' . $project_id . '" >
                <input type="hidden" name="inviteid" value="' . $invite_id . '" >
                <input type="hidden" name="membermail" value="' . $member_mail . '">
                <input type="submit" value="I accept">
            </form>';
            $message .= '</body></html>';
            if (mail($to, $subject, $message, $headers)) {
                $response["error"] = false;
                $response["message"] = "Member added Successfully and Mail Sent";
            } else {
                $response["error"] = true;
                $response["message"] = "Member added Successfully but Mail not sent";
            }
        } else {
            $response["error"] = true;
            $response["message"] = "member could not be added";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }
    function acceptInvitesForProject($user_id, $project_id, $member_mail, $invite_id)
    {
        $response = array();
        $stmt  = mysqli_query($this->conn, "select * from project_add_member_invites where invite_id = '" . $invite_id . "' ");
        if (mysqli_num_rows($stmt)>0) {

            $stmt = mysqli_query($this->conn,"update project_add_member_invites set accepted = 1 where invite_id = '" . $invite_id . "' ");
            if ($stmt) {
                $response["error"] = false;
                $response["message"] = "Member Successfully added to project";
            } else {
                $response["error"] = true;
                $response["message"] = "Member Could not be added to project";
                $response["info"] = mysqli_error($this->conn);
            }
        } else {
            $response["error"] = true;
            $response["message"] = "Member Could not be added to project";
            $response["info"] = mysqli_error($this->conn);
        }

        return $response;
    }
    function fetchTasksOfProject($user_id,$project_id){
        $response = array();
        $stmt = mysqli_query($this->conn,"select * from project_tasks where project_id = '".$project_id."' ");
        if(mysqli_num_rows($stmt) > 0){
            $response["error"] = false;
            $response["message"] = "Tasks Found";
            $response["project_tasks"] = array();
            while($row = mysqli_fetch_assoc($stmt)){
                array_push($response["project_tasks"],$row);
            }
        }else{
            $response["error"] = true;
            $response["message"] = "Tasks Not Found";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }
    function fetchTeamsOfProject($user_id,$project_id){
        $response = array();
        $stmt = mysqli_query($this->conn,"select * from project_teams where project_id = '".$project_id."' ");
        if(mysqli_num_rows($stmt) > 0){
            $response["error"] = false;
            $response["message"] = "Teams Found";
            $response["project_teams"] = array();
            while($row = mysqli_fetch_assoc($stmt)){
                array_push($response["project_teams"],$row);
            }
        }else{
            $response["error"] = true;
            $response["message"] = "Teams Not Found";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }
    function fetchMembersOfProject($user_id, $project_id){
        $response = array();
        $stmt = mysqli_query($this->conn,"select * from project_members_mapper where project_id = '".$project_id."' ");
        if(mysqli_num_rows($stmt) > 0){
            $response["error"] = false;
            $response["message"] = "Members Found";
            $response["project_members"] = array();
            while($row = mysqli_fetch_assoc($stmt)){
                array_push($response["project_members"],$row);
            }
        }else{
            $response["error"] = true;
            $response["message"] = "Members Not Found";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }
    function fetchProjects($user_id){
        $response = array();
        $stmt = mysqli_query($this->conn,"select * from project where user_id = '".$user_id."' ");
        if(mysqli_num_rows($stmt) > 0){
            $response["error"] = false;
            $response["message"] = "Projects found";
            $response["projects"] = array();
            while($row = mysqli_fetch_assoc($stmt)){
                array_push($response["projects"],$row);
            }
        }else{
            $response["error"] = true;
            $response["message"] = "Projects Not Found";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }
}
