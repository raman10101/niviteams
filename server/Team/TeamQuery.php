<?php


class TeamQuery
{
    function __construct()
    {
        require_once '../Config/Connect.php';
        $db = new Connect();
        $this->conn = $db->connect();
    }

    function createTeam($user_id,$team_name,$team_description){
        $response = array();
        $team_id = uniqid($user_id);


        $stmt = mysqli_query($this->conn, "insert into teams(team_id,user_id,team_name,team_description,timestamp) 
        values('".$team_id."','".$user_id."','".$team_name."','".$team_description."',NOw())");
        if($stmt){
            $response["error"] = false;
            $response["message"] = "Team Created Successfully";
        }else{
            $response["error"] = true;
            $response["message"] = "Team Not Created";
            $response["info"] = mysqli_error($this->conn);
        }
        return $response;
    }


}
