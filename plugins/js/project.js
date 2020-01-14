function getProjectId() {
    let projectId = localStorage.getItem("current-project-id");
    return projectId;
}
function getCurrentProjectName(){
    let currentProject = JSON.parse(localStorage.getItem("current-project"));
    return currentProject.project_name;

}
function setCurrentTaskId(currentTaskId) {
    localStorage.setItem("current-task-id", currentTaskId);
}
function getCurrentTaskId() {
    let taskId = localStorage.getItem("current-task-id");
    return taskId;
}
function getProjectTaskInfoById(id) {
    let taskList = JSON.parse(localStorage.getItem(PROJECT_TASKS));
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].task_id == id) {
            return taskList[i];
        }
    }
}
function getProjectMemberInfoById(id) {
    let memberList = JSON.parse(localStorage.getItem(PROJECT_MEMBERS));
    for (let i = 0; i < memberList.length; i++) {
        if (memberList[i].member_id == id) {
            return memberList[i];
        }
    }
}
function fetchProjects() {
    //Fetch All the projects of the id and store it in project-list-div
    let user_id = getUserId();
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/fetchProjects ",
        type: 'post',
        data: {
            userid: user_id
        },
        success: function (data) {
            console.log(data);
            let project_list = data["projects"];
            let project_list_div = document.getElementById("project-list-div");
            project_list_div.innerHTML = "";
            for (let i = 0; i < project_list.length; i++) {
                let boxDiv = document.createElement("div");
                boxDiv.setAttribute("class", "project-list-box");
                boxDiv.addEventListener('click', function () {
                    localStorage.setItem("current-project-id", project_list[i].project_id);
                    localStorage.setItem("current-project",JSON.stringify(project_list[i]));
                    showProjectDiv();
                    fetchMembersOfProject();
                });
                let namediv = document.createElement('div');
                let descdiv = document.createElement('div');
                namediv.innerHTML= project_list[i].project_name;
                descdiv.innerHTML= project_list[i].project_description;
                boxDiv.appendChild(namediv);
                boxDiv.appendChild(descdiv);
                project_list_div.appendChild(boxDiv);
            }

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function createProject() {
    console.log("Creating Task");
    let user_id = getUserId();
    let project_name = document.getElementById("project-name-input").value;
    let project_description = document.getElementById("project-description-input").value;
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/createProject ",
        type: 'post',
        data: {
            userid: user_id,
            name: project_name,
            description: project_description,
        },
        success: function (data) {
            console.log(data);
            showProjectDiv();

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function createTaskInProject() {

    let user_id = getUserId();
    let project_id = getProjectId();
    let project_task_name = document.getElementById("project-task-name-input").value;
    let project_task_description = document.getElementById("project-task-description-input").value;
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/createTaskInProject ",
        type: 'post',
        data: {
            userid: user_id,
            projectid: project_id,
            name: project_task_name,
            description:project_task_description
        },
        success: function (data) {
            console.log(data);
            showProjectDiv();
            showProjectTasks();

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function createTeamInProject() {

    let user_id = getUserId();
    let project_id = getProjectId();
    let project_team_name = document.getElementById("project-team-name-input").value;
    let project_team_description = document.getElementById("project-team-description-input").value;
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/createTeamInProject ",
        type: 'post',
        data: {
            userid: user_id,
            projectid: project_id,
            name: project_team_name,
            description: project_team_description,
        },
        success: function (data) {
            console.log(data);

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function addMemberToProject() {

    let project_id = getProjectId();
    let user_id = getUserId();
    let member_name = document.getElementById("project-team-add-member-name-input").value;
    let member_mail = document.getElementById("project-team-add-member-email-input").value;

    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/addMemberToProject ",
        type: 'post',
        data: {
            userid: user_id,
            projectid: project_id,
            membername: member_name,
            membermail: member_mail
        },
        success: function (data) {
            console.log(data);

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function fetchTasksOfProject() {
    let user_id = getUserId();
    let project_id = getProjectId();
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/fetchTasksOfProject ",
        type: 'post',
        data: {
            userid: user_id,
            projectid: project_id,
        },
        success: function (data) {
            console.log(data)
            let backlogDiv = document.getElementById("project-div-content-tasks-backlog-list");
            backlogDiv.innerHTML = "";
            let AssignedDiv = document.getElementById("project-div-content-tasks-assigned-list");
            AssignedDiv.innerHTML = "";
            let UnassignedDiv = document.getElementById("project-div-content-tasks-unassigned-list");
            UnassignedDiv.innerHTML = "";
            let completedDiv = document.getElementById("project-div-content-tasks-completed-list");
            completedDiv.innerHTML = "";
            if (data["error"] == false) {
                localStorage.setItem(PROJECT_TASKS, JSON.stringify(data.project_tasks));
                let project_tasks = data["project_tasks"]

                // let assignedDiv = document.getElementById();
                for (let i = 0; i < project_tasks.length; i++) {
                    if (project_tasks[i].is_backlog == 1) {
                        let projectTaskBoxDiv = document.createElement("div");
                        projectTaskBoxDiv.setAttribute("class", "project-task-box");
                        projectTaskBoxDiv.textContent = project_tasks[i].task_name;
                        projectTaskBoxDiv.addEventListener('click', function () {
                            console.log(project_tasks[i].task_id);
                            setCurrentTaskId(project_tasks[i].task_id);
                            showProjectTasksDetailDiv(0);
                        });
                        backlogDiv.appendChild(projectTaskBoxDiv);
                    }
                    else if (project_tasks[i].is_assigned == 1) {
                        let projectTaskBoxDiv = document.createElement("div");
                        projectTaskBoxDiv.setAttribute("class", "project-task-box");
                        projectTaskBoxDiv.textContent = project_tasks[i].task_name;
                        projectTaskBoxDiv.addEventListener('click', function () {
                            console.log(project_tasks[i].task_id);
                            setCurrentTaskId(project_tasks[i].task_id);
                            showProjectTasksDetailDiv(1);
                        });
                        AssignedDiv.appendChild(projectTaskBoxDiv);
                    }
                    else if (project_tasks[i].is_unassigned == 1) {
                        let projectTaskBoxDiv = document.createElement("div");
                        projectTaskBoxDiv.setAttribute("class", "project-task-box");
                        projectTaskBoxDiv.textContent = project_tasks[i].task_name;
                        projectTaskBoxDiv.addEventListener('click', function () {
                            console.log(project_tasks[i].task_id);
                            setCurrentTaskId(project_tasks[i].task_id);
                            showProjectTasksDetailDiv(2);
                        });
                        UnassignedDiv.appendChild(projectTaskBoxDiv);
                    }
                    else if (project_tasks[i].is_completed == 1) {
                        let projectTaskBoxDiv = document.createElement("div");
                        projectTaskBoxDiv.setAttribute("class", "project-task-box");
                        projectTaskBoxDiv.textContent = project_tasks[i].task_name;
                        projectTaskBoxDiv.addEventListener('click', function () {
                            console.log(project_tasks[i].task_id);
                            setCurrentTaskId(project_tasks[i].task_id);
                            showProjectTasksDetailDiv(3);
                        });
                        completedDiv.appendChild(projectTaskBoxDiv);
                    }
                }
            }

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function fetchTeamsOfProject() {
    let user_id = getUserId();
    let project_id = getProjectId();
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/fetchTeamsOfProject ",
        type: 'post',
        data: {
            userid: user_id,
            projectid: project_id,
        },
        success: function (data) {
            console.log(data);
            let projectTeamDiv = document.getElementById("project-div-content-teams");
            let teams = data["project_teams"];
            projectTeamDiv.innerHTML = "";
            for (let i = 0; i < teams.length; i++) {
                let projectTeamBoxDiv = document.createElement("div");
                projectTeamBoxDiv.setAttribute("class", "project-teams-box");
                projectTeamBoxDiv.textContent = teams[i].team_id;
                projectTeamBoxDiv.addEventListener('click', function () {
                    console.log(teams[i].team_id);
                });
                projectTeamDiv.appendChild(projectTeamBoxDiv);
            }

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function fetchMembersOfProject() {
    let user_id = getUserId();
    let project_id = getProjectId();
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/fetchMembersOfProject ",
        type: 'post',
        data: {
            userid: user_id,
            projectid: project_id,
        },
        success: function (data) {
            console.log(data);
            if (data['error'] == false) {
                localStorage.setItem(PROJECT_MEMBERS, JSON.stringify(data.project_members));
                let projectMemberDiv = document.getElementById("project-div-content-members");
                let members = data["project_members"];
                projectMemberDiv.innerHTML = "";
                for (let i = 0; i < members.length; i++) {
                    let projectMemberBoxDiv = document.createElement("div");
                    projectMemberBoxDiv.setAttribute("class", "project-member-box");
                    projectMemberBoxDiv.textContent = members[i].member_id;
                    projectMemberBoxDiv.addEventListener('click', function () {
                        console.log(members[i].member_id);
                    });
                    projectMemberDiv.appendChild(projectMemberBoxDiv);
                }
            }
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function fetchCommentsOfTask(){
    let taskId = getCurrentTaskId();
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/Comment/fetchCommentsOfTask ",
        type: 'post',
        data: {
            userid: getUserId(),
            taskid: taskId,
            projectid: getProjectId()
        },
        success: function (data) {
            console.log("Cooments Fetched");
            console.log(data);
            if (data["error"] == false){
            let comments = data.comment;
            console.log(comments);
            return comments;
            }
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function fetchCurrentBacklogTaskInformation() {
    let taskId = getCurrentTaskId();
    let parentElem = document.getElementById("project-div-content-tasks-selected-detail");
    parentElem.innerHTML = "";
    let currentProjectTask = getProjectTaskInfoById(taskId);
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div1.textContent = currentProjectTask.task_name;
    div2.textContent = currentProjectTask.task_description;
    div1.setAttribute("id", "xyz");
    parentElem.appendChild(div1);
    parentElem.appendChild(div2);
    let divSelect = document.createElement("select");
    divSelect.setAttribute('id', "member_dropdown");
    parentElem.appendChild(divSelect);
    let opt = document.createElement("option");
    opt.id = 0;
    opt.value = 0;
    opt.innerHTML = "No member selected";
    divSelect.appendChild(opt);
    let members = JSON.parse(localStorage.getItem(PROJECT_MEMBERS));
    for (let i = 0; i < members.length; i++) {
        let opt = document.createElement("option");
        opt.id = members[i].member_id;
        opt.value = members[i].member_id;
        opt.innerHTML = members[i].member_id;
        divSelect.appendChild(opt);
    }

    let btn = document.createElement("button");
    btn.innerHTML = "Assign";
    btn.addEventListener('click', function () {
        assignProjectTaskToMember();
    });
    


    parentElem.appendChild(btn);

    if(getUserId() == currentProjectTask.user_id){
        let btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.addEventListener('click', function () {
        deleteProjectTask();
    });
    parentElem.appendChild(btn);
    }

    let commentDiv = document.createElement("div");
    commentDiv.setAttribute("class","comment-box");
    let commentInput = document.createElement('input');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('id', 'comment_message');
    let commentButton = document.createElement('button');
    commentButton.innerHTML = "Comment";
    commentDiv.appendChild(commentInput);
    commentDiv.appendChild(commentButton);
    commentButton.addEventListener('click', function(){

        addCommentToProjectTask();
    });
    parentElem.appendChild(commentDiv);


    
   

    let conversationsDiv = document.createElement('div');
    conversationsDiv.setAttribute('class', 'conversations-box');


    ///FetchCommentsOfTask
    let comments= fetchCommentsOfTask(); 
    for(let i=0;i<comments.length;i++){
        let singleCommentDiv = document.createElement('div');
        singleCommentDiv.setAttribute('class',coversation-single-box);
        singleCommentDiv.textContent(comments[i].comment_text); 
        conversationsDiv.appendChild(singleCommentDiv);
    }
    parentElem.appendChild(conversationsDiv);

}

function fetchCurrentAssignedTaskInformation() {
    let taskId = getCurrentTaskId();
    let parentElem = document.getElementById("project-div-content-tasks-selected-detail");
    parentElem.innerHTML = "";
    let currentProjectTask = getProjectTaskInfoById(taskId);
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div1.textContent = currentProjectTask.task_name;
    div2.textContent = currentProjectTask.task_description;
    div1.setAttribute("id", "xyz");
    parentElem.appendChild(div1);
    parentElem.appendChild(div2);

    if (currentProjectTask.assigned_to == getUserId()) {
        let btn = document.createElement("button");
        btn.innerHTML = "Completed";
        parentElem.appendChild(btn);
        btn.addEventListener('click', function () {
            completeProjectTaskOfMember();
        });
        let btn2 = document.createElement("button");
        btn2.innerHTML = "Unassign";
        parentElem.appendChild(btn2);
        btn2.addEventListener('click', function () {
            unassignProjectTaskOfMember();
        });
    }

    if(getUserId() == currentProjectTask.user_id){
        let btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.addEventListener('click', function () {
        deleteProjectTask();
    });
    parentElem.appendChild(btn);
    }

    let commentDiv = document.createElement("div");
    commentDiv.setAttribute("class","comment-box");
    parentElem.appendChild(commentDiv);
    let commentInput = document.createElement('input');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('id', 'comment_message');
    let commentButton = document.createElement('button');
    commentButton.innerHTML = "Comment";
    commentDiv.appendChild(commentInput);
    commentDiv.appendChild(commentButton);
    commentButton.addEventListener('click', function(){
        addCommentToProjectTask();
    });

}

function fetchCurrentUnassignedTaskInformation() {
    let taskId = getCurrentTaskId();
    let parentElem = document.getElementById("project-div-content-tasks-selected-detail");
    parentElem.innerHTML = "";
    let currentProjectTask = getProjectTaskInfoById(taskId);
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div1.textContent = currentProjectTask.task_name;
    div2.textContent = currentProjectTask.task_description;
    div1.setAttribute("id", "xyz");
    parentElem.appendChild(div1);
    parentElem.appendChild(div2);
    let divSelect = document.createElement("select");
    divSelect.setAttribute('id', "member_dropdown");
    parentElem.appendChild(divSelect);
    let opt = document.createElement("option");
    opt.id = 0;
    opt.value = 0;
    opt.innerHTML = "No member selected";
    divSelect.appendChild(opt);
    let members = JSON.parse(localStorage.getItem(PROJECT_MEMBERS));
    for (let i = 0; i < members.length; i++) {
        let opt = document.createElement("option");
        opt.id = members[i].member_id;
        opt.value = members[i].member_id;
        opt.innerHTML = members[i].member_id;
        divSelect.appendChild(opt);
    }

    let btn = document.createElement("button");
    btn.innerHTML = "Assign";
    btn.addEventListener('click', function () {
        assignProjectTaskToMember();
    });
    parentElem.appendChild(btn);

    if(getUserId() == currentProjectTask.user_id){
        let btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.addEventListener('click', function () {
        deleteProjectTask();
    });
    parentElem.appendChild(btn);
    }

    let commentDiv = document.createElement("div");
    commentDiv.setAttribute("class","comment-box");
    parentElem.appendChild(commentDiv);
    let commentInput = document.createElement('input');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('id', 'comment_message');
    let commentButton = document.createElement('button');
    commentButton.innerHTML = "Comment";
    commentDiv.appendChild(commentInput);
    commentDiv.appendChild(commentButton);
    commentButton.addEventListener('click', function(){
        addCommentToProjectTask();
    });
}

function fetchCurrentCompletedTaskInformation() {
    let taskId = getCurrentTaskId();
    let parentElem = document.getElementById("project-div-content-tasks-selected-detail");
    parentElem.innerHTML = "";
    let currentProjectTask = getProjectTaskInfoById(taskId);
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div1.textContent = currentProjectTask.task_name;
    div2.textContent = currentProjectTask.task_description;
    div1.setAttribute("id", "xyz");
    parentElem.appendChild(div1);
    parentElem.appendChild(div2);

    if(getUserId() == currentProjectTask.user_id){
        let btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.addEventListener('click', function () {
        deleteProjectTask();
    });
    parentElem.appendChild(btn);
    }

    let commentDiv = document.createElement("div");
    commentDiv.setAttribute("class","comment-box");
    parentElem.appendChild(commentDiv);
    let commentInput = document.createElement('input');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('id', 'comment_message');
    let commentButton = document.createElement('button');
    commentButton.innerHTML = "Comment";
    commentDiv.appendChild(commentInput);
    commentDiv.appendChild(commentButton);
    commentButton.addEventListener('click', function(){
        addCommentToProjectTask();
    });
}



function assignProjectTaskToMember() {
    let select = document.getElementById("member_dropdown");
    let taskId = getCurrentTaskId();
    let memberId = select.options[select.selectedIndex].value;
    let projectId = getProjectId();
    let user_id = getUserId();
    console.log(taskId);
    console.log(memberId);
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/assignProjectTaskToMember ",
        type: 'post',
        data: {
            userid: user_id,
            memberid: memberId,
            taskid: taskId,
            projectid: projectId,
        },
        success: function (data) {
            console.log(data);
            if (data['error'] == false)
                showProjectTasks();
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function completeProjectTaskOfMember() {
    let taskId = getCurrentTaskId();
    let user_id = getUserId();
    let projectId = getProjectId();
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/projectTaskComplete ",
        type: 'post',
        data: {
            userid: user_id,
            taskid: taskId,
            projectid: projectId,
        },
        success: function (data) {
            console.log(data);
            if (data['error'] == false)
                showProjectTasks();
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function unassignProjectTaskOfMember(){
    let taskId = getCurrentTaskId();
    let user_id = getUserId();
    let projectId = getProjectId();
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/unassignProjectTaskToMember ",
        type: 'post',
        data: {
            userid: user_id,
            taskid: taskId,
            projectid: projectId,
        },
        success: function (data) {
            console.log(data);
            if (data['error'] == false)
                showProjectTasks();
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function deleteProjectTask(){
    let taskId = getCurrentTaskId();
    let user_id = getUserId();
    let projectId = getProjectId();
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/projectTaskDelete ",
        type: 'post',
        data: {
            userid: user_id,
            taskid: taskId,
            projectid: projectId,
        },
        success: function (data) {
            console.log(data);
            if (data['error'] == false)
                showProjectTasks();
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });

}

function addCommentToProjectTask(){
    let taskId = getCurrentTaskId();
    let user_id = getUserId();
    let projectId = getProjectId();
    let message = document.getElementById('comment_message').value;
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/Comment/addComment ",
        type: 'post',
        data: {
            userid: user_id,
            taskid: taskId,
            projectid: projectId,
            text: message
        },
        success: function (data) {
            console.log(data);
            if (data['error'] == false)
                showProjectTasks();
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
