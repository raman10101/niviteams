<?php
require_once '../Config/Connect.php';
$db = new Connect();

$conn = $db->connect();

$from = "raman.10101@gmail.com";
$application="raman.10101@gmail.com";
$response = array();
$stmt = mysqli_query($conn, "select * from non_linked_tasks_reminders");

if (mysqli_num_rows($stmt)>0) {
    while ($row = mysqli_fetch_assoc($stmt)) {

        $to = $row["task_email"];
        $subject = $row["task_id"];
        $message = $row["task_message"];
        $headers = 'From: ' . $from . '' . "\r\n" .
            'Reply-To: ' . $from . ' ' . "\r\n" .
            'Mailed-By: ' . $application . ' ' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        if (!mail($to, $subject, $message, $headers)) {
            $response["error"] = true;
            $response["message"] = 'Message was not sent.';
            $response["info"] = 'Mailer error: ' . error_get_last()['message'];
        } else {
            $response["error"] = false;
            $response["message"] = 'Message has been sent.';
        }
    }
} else {
    $response["error"] = true;
    $response["message"] = "No Reminders Found";
}



print_r( $response);
?>
