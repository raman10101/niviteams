<?php
error_reporting(-1);
ini_set('display_errors', 'On');
require '../User/UserController.php';
require '../Task/TaskController.php';
require '../Team/TeamController.php';
require '../Project/ProjectController.php';
require '../libs/Slim/Slim.php';
 
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

// User Controller
// $app->post('/user/getAllInfo',function() use($app){
//     verifyRequiredParams(array('userid'));
//     $user_id =$app->request->post('userid');
//     $user = new UserController();
//     $response = $user->getAllInfo($user_id);
//     echoRespnse(200, $response);
// });
$app->post('/user/checkForInvitesAccepted',function() use($app){
    verifyRequiredParams(array('userid','usermail'));
    $user_id =$app->request->post('userid');
    $user_mail = $app->request->post('usermail');
    $user = new UserController();
    $response = $user->checkForInvitesAccepted($user_id,$user_mail);
    echoRespnse(200, $response);
});
//Task Controller
$app->post('/task/createNonLinkedTask',function() use($app){
    verifyRequiredParams(array('userid','name'));
    $user_id = $app->request->post('userid');
    $task_name = $app->request->post('name');
    $task_description ="Task Description";
    if(isset($_POST["description"])){
        $task_description = $app->request->post('description');
    }
    $task_deadline = null;
    if(isset($_POST["deadline"])){
        $task_deadline = $app->request->post("deadline");
    }
    
    $task = new TaskController();
    $response = $task->createNonLinkedTask($user_id,$task_name,$task_description,$task_deadline);
    echoRespnse(200, $response);
});
$app->post('/task/editNonLinkedTask',function() use($app){
    verifyRequiredParams(array('userid','name','taskid'));
    $user_id = $app->request->post('userid');
    $task_id = $app->request->post('taskid');
    $task_name = $app->request->post('name');
    $task_description ="Task Description";
    if(isset($_POST["description"])){
        $task_description = $app->request->post('description');
    }
    $task_deadline = null;
    if(isset($_POST["deadline"])){
        $task_deadline = $app->request->post("deadline");
    }
    
    $task = new TaskController();
    $response = $task->editNonLinkedTask($user_id,$task_id,$task_name,$task_description,$task_deadline);
    echoRespnse(200, $response);
});
$app->post('/task/fetchNonLinkedTask',function() use($app){
    verifyRequiredParams(array('userid'));
    $user_id =$app->request->post('userid');
    $task = new TaskController();
    $response = $task->fetchNonLinkedTask($user_id);
    echoRespnse(200, $response);
});
$app->post('/task/completeNonLinkedTask',function() use($app){
    verifyRequiredParams(array('userid','taskid'));
    $user_id =$app->request->post('userid');
    $task_id = $app->request->post('taskid');
    $task = new TaskController();
    $response = $task->completeNonLinkedTask($user_id,$task_id);
    echoRespnse(200, $response);
});

$app->post('/task/deletedNonLinkedTask',function() use($app){
    verifyRequiredParams(array('userid','taskid'));
    $user_id =$app->request->post('userid');
    $task_id = $app->request->post('taskid');
    $task = new TaskController();
    $response = $task->deletedNonLinkedTask($user_id,$task_id);
    echoRespnse(200, $response);
});

$app->post('/task/notifyNonLinkedTask',function() use($app){
    verifyRequiredParams(array('userid','taskid'));
    $user_id =$app->request->post('userid');
    $task_id = $app->request->post('taskid');
    $reminder_message =$app->request->post('message');
    $reminder_email = $app->request->post('email');
    $reminder_time = $app->request->post('time');
    $task = new TaskController();
    $response = $task->notifyNonLinkedTask($user_id,$task_id,$reminder_email,$reminder_message,$reminder_time);
    echoRespnse(200, $response);
});


// Team Controller

$app->post('/team/createTeam',function() use($app){
    verifyRequiredParams(array('userid','name','description'));
    $user_id = $app->request->post('userid');
    $team_name = $app->request->post('name');
    $team_description = $app->request->post('description');
    $team = new TeamController();
    $response = $team->createTeam($user_id,$team_name,$team_description);
    echoRespnse(200, $response);

});



// Project Controller

$app->post('/project/createProject',function() use($app){
    verifyRequiredParams(array('userid','name','description'));
    $user_id = $app->request->post('userid');
    $project_name = $app->request->post('name');
    $project_description = $app->request->post('description');
    $project = new ProjectController();
    $response = $project->createProject($user_id,$project_name,$project_description);
    echoRespnse(200, $response);
});
$app->post('/project/fetchProjects',function() use($app){
    verifyRequiredParams(array('userid'));
    $user_id = $app->request->post('userid');
    $project = new ProjectController();
    $response = $project->fetchProjects($user_id);
    echoRespnse(200, $response);
});


$app->post('/project/createTaskInProject',function() use($app){
    verifyRequiredParams(array('userid','name','projectid'));
    $user_id = $app->request->post('userid');
    $task_name = $app->request->post('name');
    $project_id = $app->request->post('projectid');

    $task_description ="Task Description";
    if(isset($_POST["description"])){
        $task_description = $app->request->post('description');
    }
    $task_deadline = null;
    if(isset($_POST["deadline"])){
        $task_deadline = $app->request->post("deadline");
    }
    $team_id = null;
    if(isset($_POST["teamid"])){
        $team_id = $app->request->post("teamid");
    }
    $project = new ProjectController();
    $response = $project->createTaskinproject($user_id,$task_name,$task_description,$project_id,$task_deadline,$team_id);
    echoRespnse(200, $response);
});

$app->post('/project/createTeamInProject',function() use($app){
    verifyRequiredParams(array('userid','projectid','name','description'));
    $user_id = $app->request->post('userid');
    $team_name = $app->request->post('name');
    $project_id = $app->request->post('projectid');

    $team_description ="Team Description";
    if(isset($_POST["description"])){
        $team_description = $app->request->post('description');
    }
    $project = new ProjectController();
    $response = $project->createTeamInProject($user_id,$project_id,$team_name,$team_description);
    echoRespnse(200, $response);
});

$app->post('/project/addMemeberToProject',function() use($app){
    verifyRequiredParams(array('userid','projectid','membername','membermail'));
    $user_id = $app->request->post('userid');
    $member_name = $app->request->post('membername');
    $member_mail = $app->request->post('membermail');
    $project_id = $app->request->post('projectid');
    $project = new ProjectController();
    $response = $project->addMemeberToProject($user_id,$project_id,$member_name,$member_mail);
    echoRespnse(200, $response);
});
$app->post('/project/acceptInvitesForProject',function() use($app){
    verifyRequiredParams(array('userid','projectid','membermail','inviteid'));
    $user_id = $app->request->post('userid');
    $member_mail = $app->request->post('membermail');
    $project_id = $app->request->post('projectid');
    $invite_id = $app->request->post('inviteid');
    $project = new ProjectController();
    $response = $project->acceptInvitesForProject($user_id,$project_id,$member_mail,$invite_id);
    echoRespnse(200, $response);
});

$app->post('/project/fetchTasksOfProject',function() use($app){
    verifyRequiredParams(array('userid','projectid'));
    $user_id = $app->request->post('userid');
    $project_id = $app->request->post('projectid');
    $project = new ProjectController();
    $response = $project->fetchTasksOfProject($user_id,$project_id);
    echoRespnse(200, $response);
});

$app->post('/project/fetchTeamsOfProject',function() use($app){
    verifyRequiredParams(array('userid','projectid'));
    $user_id = $app->request->post('userid');
    $project_id = $app->request->post('projectid');
    $project = new ProjectController();
    $response = $project->fetchTeamsOfProject($user_id,$project_id);
    echoRespnse(200, $response);
});

$app->post('/project/fetchMembersOfProject',function() use($app){
    verifyRequiredParams(array('userid','projectid'));
    $user_id = $app->request->post('userid');
    $project_id = $app->request->post('projectid');
    $project = new ProjectController();
    $response = $project->fetchMembersOfProject($user_id,$project_id);
    echoRespnse(200, $response);
});





/**
 * Verifying required params posted or not
 */
function verifyRequiredParams($required_fields) {
    $error = false;
    $error_fields = "";
    $request_params = array();
    $request_params = $_REQUEST;
    // Handling PUT request params
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $app = \Slim\Slim::getInstance();
        parse_str($app->request()->getBody(), $request_params);
    }
    foreach ($required_fields as $field) {
        if (!isset($request_params[$field]) || strlen(trim($request_params[$field])) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }
 
    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["error"] = true;
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoRespnse(400, $response);
        $app->stop();
    }
}

/**
 * Validating email address
 */
function validateEmail($email) {
    $app = \Slim\Slim::getInstance();
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["error"] = true;
        $response["message"] = 'Email address is not valid';
        echoRespnse(400, $response);
        $app->stop();
    }
}
 
function IsNullOrEmptyString($str) {
    return (!isset($str) || trim($str) === '');
}
 
/**
 * Echoing json response to client
 * @param String $status_code Http response code
 * @param Int $response Json response
 */
function echoRespnse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);
 
    // setting response content type to json
    $app->contentType('application/json');
 
    echo json_encode($response);
}
 
$app->run();


?>