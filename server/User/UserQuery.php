<?php


class UserQuery
{
    function __construct()
    {
        require_once '../Config/Connect.php';
        $db = new Connect();
        $this->conn = $db->connect();
    }
    // function getAllInfo($user_id)
    // {
    //     $response = array();
    //     return $response;
    // }
    function checkForInvitesAccepted($user_id, $user_mail)
    {
        $response = array();
        $stmt = mysqli_query($this->conn, "select * from project_add_member_invites where member_mail='" . $user_mail . "' and accepted=1");
        if (mysqli_num_rows($stmt) > 0) {
            while ($row = mysqli_fetch_assoc($stmt)) {
                $stmt2 = mysqli_query($this->conn, "insert into project_members_mapper (project_id,member_id,timestamp,role) 
                values ('" . $row["project_id"] . "' , '" . $user_id . "',NOW(),0) ");
                if ($stmt2) {
                    $stmt3 = mysqli_query($this->conn, "delete from project_add_member_invites where invite_id = '" . $row["invite_id"] . "' ");
                    if (!$stmt3) {
                        $response["error"] = true;
                        $response["info"] = mysqli_error($this->conn);
                        return $response;
                    } else {
                        $response["error"] = false;
                        $response["message"] = "Accepted invites saved";
                    }
                } else {
                    $response["error"] = true;
                    $response["info"] = mysqli_error($this->conn);
                    return $response;
                }
            }
        } else {
            $response["error"] = true;
            $response["message"] = "No accepted invites";
        }

        return $response;
    }
}
