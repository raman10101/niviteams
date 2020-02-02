function getProjectId() {
    let projectId = getLocalStorageInfo(CURR_PROJECT_ID);
    return projectId;
}
function getCurrentProjectName() {
    let currentProject = getJSONLocalStorageInfo(CURR_PROJECT);
    console.log(currentProject);
    return currentProject.project_name;

}
function setCurrentTaskId(currentTaskId) {
    setLocalStorageInfo(CURR_TASK_ID, currentTaskId);
}
function getCurrentTaskId() {
    let taskId = getLocalStorageInfo(CURR_TASK_ID);
    return taskId;
}
function getProjectTaskInfoById(id) {
    let taskList = JSON.parse(localStorage.getItem(CURR_PROJECT_TASKS));
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].task_id == id) {
            return taskList[i];
        }
    }
}
function getProjectMemberInfoById(id) {
    let memberList = JSON.parse(localStorage.getItem(CURR_PROJECT_MEMBERS));
    for (let i = 0; i < memberList.length; i++) {
        if (memberList[i].member_id == id) {
            return memberList[i];
        }
    }
}
//---------------------------------------------------------------
function fetchProjects() {
    //Fetch All the projects of the id and store it in project-list-div
    let user_id = getUserId();
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/fetchProjects",
        type: 'post',
        data: {
            userid: user_id
        },
        success: function (data) {
            console.log(data);
            if (data["error"] == false) {

                let project_list = data["projects"];
                setJSONLocalStorageInfo(PROJECT_LIST, data["projects"]);
                let project_list_div = document.getElementById("project-list-div-left");
                project_list_div.innerHTML = "";
                if (project_list.length > 0) {
                    for (let i = 0; i < project_list.length; i++) {
                        let boxDiv = document.createElement("div");
                        boxDiv.setAttribute("class", "project-list-box");
                        let namediv = document.createElement('div');
                        let descdiv = document.createElement('div');
                        namediv.innerHTML = project_list[i]['project'].project_name;
                        namediv.setAttribute("class", "project-list-box-name");
                        descdiv.innerHTML = project_list[i]['project'].project_description;
                        descdiv.setAttribute("class", "project-list-box-desc");
                        boxDiv.appendChild(namediv);
                        boxDiv.appendChild(descdiv);

                        boxDiv.addEventListener('click', function () {
                            setLocalStorageInfo(CURR_PROJECT_ID, project_list[i]['project'].project_id);
                            setJSONLocalStorageInfo(CURR_PROJECT, project_list[i].project);


                            setJSONLocalStorageInfo(CURR_PROJECT_FILES, project_list[i]['project'].project_files);

                            setJSONLocalStorageInfo(CURR_PROJECT_MEMBERS, project_list[i]['project'].project_members);
                            // showProjectDiv();
                            loadProjectDetails();
                            removeActiveStateFromProjects();
                            boxDiv.classList.add("project-list-box-active");

                            showProjectDetailsDiv();
                            getElementById('project-name').innerHTML = project_list[i]['project'].project_name;
                            // fetchMembersOfProject();
                        });



                        project_list_div.appendChild(boxDiv);
                    }
                }
            }
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function loadProjectDetails() {
    let nameDiv = getElementById('project-list-div-right-name');
    let project = getJSONLocalStorageInfo(CURR_PROJECT);
    nameDiv.textContent = project.project_name;

    let descDiv = getElementById('project-list-div-right-description');
    descDiv.innerHTML = "<b>Description: </b><br>" + project.project_description;

    let created = getElementById('project-list-div-right-createdon');
    created.innerHTML = "<b>Created On: </b><br>" + project.timestamp;

    // setting files list of task
    let files_list = getElementById('project-files-list');
    files_list.innerHTML = "";
    let files = getJSONLocalStorageInfo(CURR_PROJECT_FILES);
    if (files.length != 0) {
        for (let i = 0; i < files.length; i++) {
            let item = document.createElement("li");
            let a_tag = document.createElement("a");
            a_tag.innerHTML = files[i].file_name;
            a_tag.setAttribute("href", files[i].file_link);
            a_tag.setAttribute("target", "_blank");
            item.appendChild(a_tag);
            files_list.appendChild(item);
        }
    } else {
        document.getElementById('project-selected-details-files-list').innerHTML = '<b>No Attachments </b><br><ul id="project-files-list"></ul>';
    }
    // let btn_div = document.createElement("div");
    // btn_div.setAttribute("id", "project-list-div-right-btn-div");

    // let deleteBtn = document.createElement('div');
    // deleteBtn.setAttribute('id', 'project-list-div-right-delete');
    // deleteBtn.textContent = "Delete";
    // deleteBtn.addEventListener('click', function () {
    //     deleteProject();
    // });
    // let boxDiv = getElementById('project-list-div-right');
    // btn_div.appendChild(deleteBtn);

    // let openBtn = document.createElement('div');
    // openBtn.setAttribute('id', 'project-list-div-right-open');
    // openBtn.textContent = "Open Project";
    // openBtn.addEventListener('click', function () {
    //     showProjectDiv();
    // });
    // btn_div.appendChild(openBtn);

    // let editBtn = document.createElement('div');
    // editBtn.setAttribute('id', 'project-list-div-right-edit');
    // editBtn.textContent = "Edit Project";
    // editBtn.addEventListener('click', function () {
    //     let nameField = getElementById('project-name-edit');
    //     let descField = getElementById('project-description-edit');
    //     nameField.value = project.project_name;
    //     descField.value = project.project_description;
    //     showEditProject();
    // });
    // btn_div.appendChild(editBtn);
    // boxDiv.appendChild(btn_div);

}

function createProject() {
    console.log("Creating Project");
    let user_id = getUserId();
    let user_mail = getUserEmail();
    let project_name = document.getElementById("project-name-input").value;
    let project_description = document.getElementById("project-description-input").value;
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/createProject",
        type: 'post',
        data: {
            userid: user_id,
            mail: user_mail,
            name: project_name,
            description: project_description,
        },
        success: function (data) {
            console.log(data);
            showProjectListDiv();

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}


function deleteProject() {
    console.log("deleted");
    let project_id = getLocalStorageInfo(CURR_PROJECT_ID);
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/deleteProjectById ",
        type: 'post',
        data: {
            projectid: project_id,
        },
        success: function (data) {
            console.log(data);
            if (data['error'] == false) {
                alert("project deleted");
                showProjectListDiv();
            }

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function updateProjectDetails() {
    // api call
    let newName = getElementById('project-name-edit').value;
    let newDesc = getElementById('project-description-edit').value;
    let userId = getJSONLocalStorageInfo('apiResponse').user.user_id;
    let pId = getLocalStorageInfo(CURR_PROJECT_ID);

    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/updateProject ",
        type: 'post',
        data: {
            userid: userId,
            projectid: pId,
            name: newName,
            description: newDesc,

        },
        success: function (data) {
            console.log(data);
            if (data['error'] == false) {
                alert("project updated");

                showProjectListDiv();
            }

        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
    hideElementById("project-list-div-right-edit-div");


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
            description: project_task_description
        },
        success: function (data) {
            console.log(data);
            var task_list = getJSONLocalStorageInfo(CURR_PROJECT_TASKS);
            console.log(task_list);
            task_list.push(data['task_detail']);
            console.log(task_list);
            var curr_project = getJSONLocalStorageInfo(CURR_PROJECT);
            curr_project.project_tasks = task_list;
            setJSONLocalStorageInfo(CURR_PROJECT, curr_project);
            // setJSONLocalStorageInfo();
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

    let project_id = getLocalStorageInfo(CURR_PROJECT_ID);
    let user_id = getJSONLocalStorageInfo("apiResponse").user.user_id;
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
    let curr_project = getJSONLocalStorageInfo(CURR_PROJECT);
    setJSONLocalStorageInfo(CURR_PROJECT_TASKS, curr_project['project_tasks']);
    let backlogDiv = getElementById(BACKLOG_TASK_DIV_ID);
    backlogDiv.innerHTML = "";
    let AssignedDiv = getElementById(ASSIGNED_TASK_DIV_ID);
    AssignedDiv.innerHTML = "";
    let UnassignedDiv = getElementById(UNASSIGNED_TASK_DIV_ID);
    UnassignedDiv.innerHTML = "";
    let completedDiv = getElementById(COMPLETED_TASK_DIV_ID);
    completedDiv.innerHTML = "";
    // if (data["error"] == false) {
    let project_tasks = getJSONLocalStorageInfo(CURR_PROJECT_TASKS);

    // let assignedDiv = document.getElementById();
    for (let i = 0; i < project_tasks.length; i++) {
        if (project_tasks[i].is_backlog == 1) {
            let projectTaskBoxDiv = document.createElement("div");
            projectTaskBoxDiv.setAttribute("class", "project-task-box");

            projectTaskBoxDiv.textContent = project_tasks[i].task_name;
            projectTaskBoxDiv.addEventListener('click', function () {
                setLocalStorageInfo(CURR_TASK_ID, project_tasks[i].task_id);
                setJSONLocalStorageInfo(CURR_TASK, project_tasks[i]);
                setJSONLocalStorageInfo(CURR_TASK_FILES, project_tasks[i].files_list);
                console.log(project_tasks[i].task_id);
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
                setLocalStorageInfo(CURR_TASK_ID, project_tasks[i].task_id);
                setJSONLocalStorageInfo(CURR_TASK, project_tasks[i]);
                setJSONLocalStorageInfo(CURR_TASK_FILES, project_tasks[i].files_list);
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
                setLocalStorageInfo(CURR_TASK_ID, project_tasks[i].task_id);
                setJSONLocalStorageInfo(CURR_TASK, project_tasks[i]);
                setJSONLocalStorageInfo(CURR_TASK_FILES, project_tasks[i].files_list);
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
                setLocalStorageInfo(CURR_TASK_ID, project_tasks[i].task_id);
                setJSONLocalStorageInfo(CURR_TASK, project_tasks[i]);
                setJSONLocalStorageInfo(CURR_TASK_FILES, project_tasks[i].files_list);
                showProjectTasksDetailDiv(3);
            });
            completedDiv.appendChild(projectTaskBoxDiv);
        }
    }
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
            if (data["error"] == false) {
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
            }
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function fetchMembersOfProject() {
    let projectMemberDiv = document.getElementById("project-div-content-members");
    let members = getJSONLocalStorageInfo(CURR_PROJECT_MEMBERS);
    projectMemberDiv.innerHTML = "";
    for (let i = 0; i < members.length; i++) {
        let projectMemberBoxDiv = document.createElement("div");
        projectMemberBoxDiv.setAttribute("class", "project-member-box");
        projectMemberBoxDiv.textContent = members[i].name;
        // projectMemberBoxDiv.addEventListener('click', function () {
        //     console.log(members[i].member_id);
        // });
        projectMemberDiv.appendChild(projectMemberBoxDiv);
    }
}

function showAssignTaskBox() {
    document.getElementById("project-task-selected-details-assign-to-user").style.visibility = 'visible';
}

function refreshAllTaskOptions() {
    let arr = ["complete-task-btn", 'edit-task-btn', 'assign-to-user-btn', 'unassign-user-btn', 'delete-task-btn'];
    for (let i = 0; i < arr.length; i++) {
        document.getElementById(arr[i]).style.display = 'inline-block';
    }
    document.getElementById('project-task-selected-details-assign-to-user').style.visibility = "hidden";
}

function fetchCurrentBacklogTaskInformation() {
    refreshAllTaskOptions();

    let currentProjectTask = getJSONLocalStorageInfo(CURR_TASK);
    // setting task name
    document.getElementById('project-task-selected-head-div').innerHTML = currentProjectTask.task_name; 4
    // setting task description
    if (currentProjectTask.task_description != "") {
        document.getElementById("project-task-selected-details-description").innerHTML = currentProjectTask.task_description;
    } else {
        document.getElementById("project-task-selected-details-description").innerHTML = "No Description";
    }
    // setting assigned to user
    if (currentProjectTask.is_assigned == "1") {
        document.getElementById("project-task-selected-details-assigned-to").innerHTML = "Assigned to : <b>" + getProjectMemberInfoById(currentProjectTask.assigned_to).name + "</b>";
    } else {
        document.getElementById("project-task-selected-details-assigned-to").innerHTML = "Assigned to : <b>No User" + "</b>";
    }
    // setting created by user
    document.getElementById("project-task-selected-details-created-by").innerHTML = "Created by : <b>" + getProjectMemberInfoById(currentProjectTask.user_id).name + "</b>";

    // setting task completion functionanlity
    document.getElementById('complete-task-btn').style.display = 'none';


    // setting deletion functionality
    if (getUserId() != currentProjectTask.user_id) {
        document.getElementById('delete-task-btn').style.display = 'none';
    }

    // setting edit task functionality

    // setting unassign user functionality
    document.getElementById('unassign-user-btn').style.display = 'none';

    // setting assign to user functionality
    let divSelect = document.getElementById("member_dropdown");
    divSelect.innerHTML = "";
    let opt = document.createElement("option");
    opt.id = 0;
    opt.value = 0;
    opt.innerHTML = "No member selected";
    divSelect.appendChild(opt);
    let members = getJSONLocalStorageInfo(CURR_PROJECT_MEMBERS);
    for (let i = 0; i < members.length; i++) {
        let opt = document.createElement("option");
        opt.id = members[i].member_id;
        opt.value = members[i].member_id;
        opt.innerHTML = members[i].name;
        divSelect.appendChild(opt);
    }
    // setting files list of task
    let files_list = getElementById('task-files-list');
    files_list.innerHTML = "";
    let files = getJSONLocalStorageInfo(CURR_TASK_FILES);
    if (files.length != 0) {
        for (let i = 0; i < files.length; i++) {
            let item = document.createElement("li");
            let a_tag = document.createElement("a");
            a_tag.innerHTML = files[i].file_name;
            a_tag.setAttribute("href", files[i].file_link);
            a_tag.setAttribute("target", "_blank");
            item.appendChild(a_tag);
            files_list.appendChild(item);
        }
    } else {
        document.getElementById('project-task-selected-details-files-list').innerHTML = '<b>No Attachments </b><br><ul id="task-files-list"></ul>';
    }

    // setting up comments section
    let mainBox = document.getElementById("comment-list-box");
    mainBox.innerHTML = "";

    //FetchCommentsOfTask
    let comments = getJSONLocalStorageInfo(CURR_TASK).comments;
    if (comments) {
        for (let i = 0; i < comments.length; i++) {
            let commentBox = document.createElement("div");
            commentBox.setAttribute("class", "comment-box");
            let commentSenderDetails = document.createElement("div");
            commentSenderDetails.setAttribute("class", "comment-sender-details");
            let commentSender = document.createElement("div");
            commentSender.setAttribute("class", "comment-user-name");
            commentSender.textContent = getProjectMemberInfoById(comments[i].user_id).name;
            let commentTimestamp = document.createElement("div");
            commentTimestamp.setAttribute("class", "comment-timestamp");
            commentTimestamp.textContent = comments[i].timestamp;
            let commentText = document.createElement("div");
            commentText.setAttribute("class", "comment-text");
            commentText.textContent = comments[i].comment_text;

            commentSenderDetails.appendChild(commentSender);
            commentSenderDetails.appendChild(commentTimestamp);
            commentBox.appendChild(commentSenderDetails);
            commentBox.appendChild(commentText);
            mainBox.appendChild(commentBox);
        }
    }

    // let parentElem = getElementById(TASK_DETAIL_DIV);
    // parentElem.innerHTML = "";
    // // let currentProjectTask = getProjectTaskInfoById(taskId);
    // let currentProjectTask = getJSONLocalStorageInfo(CURR_TASK);
    // let div1 = document.createElement("div");
    // let div2 = document.createElement("div");
    // div1.textContent = currentProjectTask.task_name;
    // if (currentProjectTask.task_description != "") {
    //     div2.textContent = currentProjectTask.task_description;
    // } else {
    //     div2.textContent = "No Description";
    // }
    // div1.setAttribute("class", "project-task-detail-name-div");
    // div2.setAttribute("class", "project-task-detail-desc-div");
    // parentElem.appendChild(div1);
    // parentElem.appendChild(div2);



    // let assignDiv = document.createElement("div");
    // assignDiv.setAttribute("class", "project-task-detail-assign-div");

    // let labeldiv = document.createElement("span");
    // labeldiv.setAttribute("class", "project-task-detail-assign-to-text");
    // labeldiv.textContent = "Assign task to ";
    // assignDiv.appendChild(labeldiv);
    // let divSelect = document.createElement("select");
    // divSelect.setAttribute('id', "member_dropdown");
    // assignDiv.appendChild(divSelect);
    // parentElem.appendChild(assignDiv);
    // let opt = document.createElement("option");
    // opt.id = 0;
    // opt.value = 0;
    // opt.innerHTML = "No member selected";
    // divSelect.appendChild(opt);
    // let members = getJSONLocalStorageInfo(CURR_PROJECT_MEMBERS);
    // for (let i = 0; i < members.length; i++) {
    //     let opt = document.createElement("option");
    //     opt.id = members[i].member_id;
    //     opt.value = members[i].member_id;
    //     opt.innerHTML = members[i].name;
    //     divSelect.appendChild(opt);
    // }



    // let btn = document.createElement("button");
    // btn.innerHTML = "Assign";
    // btn.setAttribute("class", "task-btn");
    // btn.addEventListener('click', function () {
    //     assignProjectTaskToMember();
    // });
    // assignDiv.appendChild(btn);

    // if (getUserId() == currentProjectTask.user_id) {
    //     let deleteDiv = document.createElement("div");
    //     deleteDiv.setAttribute("class", "project-task-detail-delete-div");
    //     let labeldiv = document.createElement("span");
    //     labeldiv.setAttribute("class", "project-task-detail-delete-text");
    //     labeldiv.textContent = "Want to delete task? ";
    //     deleteDiv.appendChild(labeldiv);
    //     let btn = document.createElement("button");
    //     btn.innerHTML = "Delete";
    //     btn.setAttribute("class", "task-btn");
    //     btn.addEventListener('click', function () {
    //         deleteProjectTask();
    //     });
    //     deleteDiv.appendChild(btn);
    //     parentElem.appendChild(deleteDiv);
    // }
    // let chatDiv = document.createElement("div");
    // chatDiv.setAttribute("class", "chat-box");

    // let commentDiv = document.createElement("div");
    // commentDiv.setAttribute("class", "comment-box");
    // let commentInput = document.createElement('input');
    // commentInput.setAttribute('type', 'text');
    // commentInput.setAttribute('id', 'comment_message');
    // let commentButton = document.createElement('button');
    // commentButton.setAttribute("class", "task-btn");
    // commentButton.innerHTML = "Comment";
    // commentDiv.appendChild(commentInput);
    // commentDiv.appendChild(commentButton);
    // commentButton.addEventListener('click', function () {

    // addCommentToProjectTask();
    // });
    // chatDiv.appendChild(commentDiv);

    // let conversationsDiv = document.createElement('div');
    // conversationsDiv.setAttribute('class', 'conversations-box');


    // ///FetchCommentsOfTask
    // let comments = getJSONLocalStorageInfo(CURR_TASK).comments;
    // if (comments) {
    //     for (let i = 0; i < comments.length; i++) {
    //         let singleCommentDiv = document.createElement('div');
    //         singleCommentDiv.setAttribute('class', 'coversation-single-box');
    //         singleCommentDiv.textContent = comments[i].comment_text;
    //         conversationsDiv.appendChild(singleCommentDiv);
    //     }
    // }
    // chatDiv.appendChild(conversationsDiv);
    // parentElem.appendChild(chatDiv);

}

function fetchCurrentAssignedTaskInformation() {
    refreshAllTaskOptions();

    let currentProjectTask = getJSONLocalStorageInfo(CURR_TASK);
    // setting task name
    document.getElementById('project-task-selected-head-div').innerHTML = currentProjectTask.task_name;
    // setting task description
    if (currentProjectTask.task_description != "") {
        document.getElementById("project-task-selected-details-description").innerHTML = currentProjectTask.task_description;
    } else {
        document.getElementById("project-task-selected-details-description").innerHTML = "No Description";
    }
    // setting assigned to user
    if (currentProjectTask.is_assigned == "1") {
        document.getElementById("project-task-selected-details-assigned-to").innerHTML = "Assigned to : <b>" + getProjectMemberInfoById(currentProjectTask.assigned_to).name + "</b>";
    } else {
        document.getElementById("project-task-selected-details-assigned-to").innerHTML = "Assigned to : <b>No User" + "</b>";
    }
    // setting created by user
    document.getElementById("project-task-selected-details-created-by").innerHTML = "Created by : <b>" + getProjectMemberInfoById(currentProjectTask.user_id).name + "</b>";

    // setting task completion functionanlity

    // setting deletion functionality
    if (getUserId() != currentProjectTask.user_id) {
        document.getElementById('delete-task-btn').style.display = 'none';
    }

    // setting edit task functionality

    // setting unassign user functionality
    if (getUserId() != currentProjectTask.assigned_to) {
        document.getElementById('unassign-user-btn').style.display = 'none';
    }

    // setting assign to user functionality
    if (getUserId() != currentProjectTask.assigned_to) {
        document.getElementById('assign-to-user-btn').style.display = 'none';
    }

    // setting files list of task
    let files_list = getElementById('task-files-list');
    files_list.innerHTML = "";
    let files = getJSONLocalStorageInfo(CURR_TASK_FILES);
    if (files.length != 0) {
        for (let i = 0; i < files.length; i++) {
            let item = document.createElement("li");
            let a_tag = document.createElement("a");
            a_tag.innerHTML = files[i].file_name;
            a_tag.setAttribute("href", files[i].file_link);
            a_tag.setAttribute("target", "_blank");
            item.appendChild(a_tag);
            files_list.appendChild(item);
        }
    } else {
        document.getElementById('project-task-selected-details-files-list').innerHTML = '<b>No Attachments </b><br><ul id="task-files-list"></ul>';
    }

    // setting up comments section
    let mainBox = document.getElementById("comment-list-box");
    mainBox.innerHTML = "";

    //FetchCommentsOfTask
    let comments = getJSONLocalStorageInfo(CURR_TASK).comments;
    if (comments) {
        for (let i = 0; i < comments.length; i++) {
            let commentBox = document.createElement("div");
            commentBox.setAttribute("class", "comment-box");
            let commentSenderDetails = document.createElement("div");
            commentSenderDetails.setAttribute("class", "comment-sender-details");
            let commentSender = document.createElement("div");
            commentSender.setAttribute("class", "comment-user-name");
            commentSender.textContent = getProjectMemberInfoById(comments[i].user_id).name;
            let commentTimestamp = document.createElement("div");
            commentTimestamp.setAttribute("class", "comment-timestamp");
            commentTimestamp.textContent = comments[i].timestamp;
            let commentText = document.createElement("div");
            commentText.setAttribute("class", "comment-text");
            commentText.textContent = comments[i].comment_text;

            commentSenderDetails.appendChild(commentSender);
            commentSenderDetails.appendChild(commentTimestamp);
            commentBox.appendChild(commentSenderDetails);
            commentBox.appendChild(commentText);
            mainBox.appendChild(commentBox);
        }
    }
    // // let taskId = getCurrentTaskId();
    // let parentElem = getElementById(TASK_DETAIL_DIV);
    // parentElem.innerHTML = "";
    // let currentProjectTask = getJSONLocalStorageInfo(CURR_TASK);
    // // let currentProjectTask = getProjectTaskInfoById(taskId);
    // let div1 = document.createElement("div");
    // let div2 = document.createElement("div");
    // div1.textContent = currentProjectTask.task_name;
    // div2.textContent = currentProjectTask.task_description;
    // div1.setAttribute("id", "xyz");
    // parentElem.appendChild(div1);
    // parentElem.appendChild(div2);
    // // upload file
    // let div = document.createElement("div");
    // div.setAttribute("id", "project-task-list-div-right-file");
    // div.innerHTML = '<input type="file" id="file-input-project-task"><button id="project-task-file-upload-button"\
    //     onclick="fileUploadInProjectTask()">Upload</button>'

    // parentElem.appendChild(div);
    // if (currentProjectTask.assigned_to == getUserId()) {
    //     let btn = document.createElement("button");
    //     btn.innerHTML = "Completed";
    //     parentElem.appendChild(btn);
    //     btn.addEventListener('click', function () {
    //         completeProjectTaskOfMember();
    //     });
    //     let btn2 = document.createElement("button");
    //     btn2.innerHTML = "Unassign";
    //     parentElem.appendChild(btn2);
    //     btn2.addEventListener('click', function () {
    //         unassignProjectTaskOfMember();
    //     });
    // }

    // if (getUserId() == currentProjectTask.user_id) {
    //     let btn = document.createElement("button");
    //     btn.innerHTML = "Delete";
    //     btn.addEventListener('click', function () {
    //         deleteProjectTask();
    //     });
    //     parentElem.appendChild(btn);
    // }

    // let commentDiv = document.createElement("div");
    // commentDiv.setAttribute("class", "comment-box");
    // parentElem.appendChild(commentDiv);
    // let commentInput = document.createElement('input');
    // commentInput.setAttribute('type', 'text');
    // commentInput.setAttribute('id', 'comment_message');
    // let commentButton = document.createElement('button');
    // commentButton.innerHTML = "Comment";
    // commentDiv.appendChild(commentInput);
    // commentDiv.appendChild(commentButton);
    // commentButton.addEventListener('click', function () {
    //     addCommentToProjectTask();
    // });

    // let conversationsDiv = document.createElement('div');
    // conversationsDiv.setAttribute('class', 'conversations-box');


    // ///FetchCommentsOfTask
    // let comments = getJSONLocalStorageInfo(CURR_TASK).comments;
    // for (let i = 0; i < comments.length; i++) {
    //     let singleCommentDiv = document.createElement('div');
    //     singleCommentDiv.setAttribute('class', 'coversation-single-box');
    //     singleCommentDiv.textContent = comments[i].comment_text;
    //     conversationsDiv.appendChild(singleCommentDiv);
    // }
    // parentElem.appendChild(conversationsDiv);

}

function fetchCurrentUnassignedTaskInformation() {
    refreshAllTaskOptions();

    let currentProjectTask = getJSONLocalStorageInfo(CURR_TASK);
    // setting task name
    document.getElementById('project-task-selected-head-div').innerHTML = currentProjectTask.task_name;
    // setting task description
    if (currentProjectTask.task_description != "") {
        document.getElementById("project-task-selected-details-description").innerHTML = currentProjectTask.task_description;
    } else {
        document.getElementById("project-task-selected-details-description").innerHTML = "No Description";
    }
    // setting assigned to user
    if (currentProjectTask.is_assigned == "1") {
        document.getElementById("project-task-selected-details-assigned-to").innerHTML = "Assigned to : <b>" + getProjectMemberInfoById(currentProjectTask.assigned_to).name + "</b>";
    } else {
        document.getElementById("project-task-selected-details-assigned-to").innerHTML = "Assigned to :<b> No User" + "</b>";
    }
    // setting created by user
    document.getElementById("project-task-selected-details-created-by").innerHTML = "Created by : <b>" + getProjectMemberInfoById(currentProjectTask.user_id).name + "</b>";

    // setting task completion functionanlity
    document.getElementById('complete-task-btn').style.display = 'none';

    // setting deletion functionality
    if (getUserId() != currentProjectTask.user_id) {
        document.getElementById('delete-task-btn').style.display = 'none';
    }

    // setting edit task functionality

    // setting unassign user functionality
    document.getElementById('unassign-user-btn').style.display = 'none';

    // setting assign to user functionality


    // setting files list of task
    let files_list = getElementById('task-files-list');
    files_list.innerHTML = "";
    let files = getJSONLocalStorageInfo(CURR_TASK_FILES);
    if (files.length != 0) {
        for (let i = 0; i < files.length; i++) {
            let item = document.createElement("li");
            let a_tag = document.createElement("a");
            a_tag.innerHTML = files[i].file_name;
            a_tag.setAttribute("href", files[i].file_link);
            a_tag.setAttribute("target", "_blank");
            item.appendChild(a_tag);
            files_list.appendChild(item);
        }
    } else {
        document.getElementById('project-task-selected-details-files-list').innerHTML = '<b>No Attachments </b><br><ul id="task-files-list"></ul>';
    }

    // setting up comments section
    let mainBox = document.getElementById("comment-list-box");
    mainBox.innerHTML = "";

    //FetchCommentsOfTask
    let comments = getJSONLocalStorageInfo(CURR_TASK).comments;
    if (comments) {
        for (let i = 0; i < comments.length; i++) {
            let commentBox = document.createElement("div");
            commentBox.setAttribute("class", "comment-box");
            let commentSenderDetails = document.createElement("div");
            commentSenderDetails.setAttribute("class", "comment-sender-details");
            let commentSender = document.createElement("div");
            commentSender.setAttribute("class", "comment-user-name");
            commentSender.textContent = getProjectMemberInfoById(comments[i].user_id).name;
            let commentTimestamp = document.createElement("div");
            commentTimestamp.setAttribute("class", "comment-timestamp");
            commentTimestamp.textContent = comments[i].timestamp;
            let commentText = document.createElement("div");
            commentText.setAttribute("class", "comment-text");
            commentText.textContent = comments[i].comment_text;

            commentSenderDetails.appendChild(commentSender);
            commentSenderDetails.appendChild(commentTimestamp);
            commentBox.appendChild(commentSenderDetails);
            commentBox.appendChild(commentText);
            mainBox.appendChild(commentBox);
        }
    }



    //     // let taskId = getCurrentTaskId();
    //     let parentElem = getElementById(TASK_DETAIL_DIV);
    //     parentElem.innerHTML = "";
    //     let currentProjectTask = getJSONLocalStorageInfo(CURR_TASK);
    //     // let currentProjectTask = getProjectTaskInfoById(taskId);
    //     let div1 = document.createElement("div");
    //     let div2 = document.createElement("div");
    //     div1.textContent = currentProjectTask.task_name;
    //     div2.textContent = currentProjectTask.task_description;
    //     div1.setAttribute("id", "xyz");
    //     parentElem.appendChild(div1);
    //     parentElem.appendChild(div2);
    //     let divSelect = document.createElement("select");
    //     divSelect.setAttribute('id', "member_dropdown");
    //     parentElem.appendChild(divSelect);
    //     let opt = document.createElement("option");
    //     opt.id = 0;
    //     opt.value = 0;
    //     opt.innerHTML = "No member selected";
    //     divSelect.appendChild(opt);
    //     let members = getJSONLocalStorageInfo(CURR_PROJECT_MEMBERS);
    //     for (let i = 0; i < members.length; i++) {
    //         let opt = document.createElement("option");
    //         opt.id = members[i].member_id;
    //         opt.value = members[i].member_id;
    //         opt.innerHTML = members[i].name;
    //         divSelect.appendChild(opt);
    //     }

    //     let btn = document.createElement("button");
    //     btn.innerHTML = "Assign";
    //     btn.addEventListener('click', function () {
    //         assignProjectTaskToMember();
    //     });
    //     parentElem.appendChild(btn);

    //     if (getUserId() == currentProjectTask.user_id) {
    //         let btn = document.createElement("button");
    //         btn.innerHTML = "Delete";
    //         btn.addEventListener('click', function () {
    //             deleteProjectTask();
    //         });
    //         parentElem.appendChild(btn);
    //     }

    //     let commentDiv = document.createElement("div");
    //     commentDiv.setAttribute("class", "comment-box");
    //     parentElem.appendChild(commentDiv);
    //     let commentInput = document.createElement('input');
    //     commentInput.setAttribute('type', 'text');
    //     commentInput.setAttribute('id', 'comment_message');
    //     let commentButton = document.createElement('button');
    //     commentButton.innerHTML = "Comment";
    //     commentDiv.appendChild(commentInput);
    //     commentDiv.appendChild(commentButton);
    //     commentButton.addEventListener('click', function () {
    //         addCommentToProjectTask();
    //     });

    //     let conversationsDiv = document.createElement('div');
    //     conversationsDiv.setAttribute('class', 'conversations-box');


    //     ///FetchCommentsOfTask
    //     let comments = getJSONLocalStorageInfo(CURR_TASK).comments;
    //     for (let i = 0; i < comments.length; i++) {
    //         let singleCommentDiv = document.createElement('div');
    //         singleCommentDiv.setAttribute('class', 'coversation-single-box');
    //         singleCommentDiv.textContent = comments[i].comment_text;
    //         conversationsDiv.appendChild(singleCommentDiv);
    //     }
    //     parentElem.appendChild(conversationsDiv);
    // }
}
function fetchCurrentCompletedTaskInformation() {
    refreshAllTaskOptions();

    let currentProjectTask = getJSONLocalStorageInfo(CURR_TASK);
    // setting task name
    document.getElementById('project-task-selected-head-div').innerHTML = currentProjectTask.task_name;
    // setting task description
    if (currentProjectTask.task_description != "") {
        document.getElementById("project-task-selected-details-description").innerHTML = currentProjectTask.task_description;
    } else {
        document.getElementById("project-task-selected-details-description").innerHTML = "No Description";
    }
    // setting assigned to user
    if (currentProjectTask.is_assigned == "1") {
        document.getElementById("project-task-selected-details-assigned-to").innerHTML = "Assigned to : <b>" + getProjectMemberInfoById(currentProjectTask.assigned_to).name + "</b>";
    } else {
        document.getElementById("project-task-selected-details-assigned-to").innerHTML = "Assigned to : <b>No User" + "</b>";
    }
    // setting created by user
    document.getElementById("project-task-selected-details-created-by").innerHTML = "Created by : <b>" + getProjectMemberInfoById(currentProjectTask.user_id).name + "</b>";

    // setting task completion functionanlity
    document.getElementById('complete-task-btn').style.display = 'none';

    // setting deletion functionality
    if (getUserId() != currentProjectTask.user_id) {
        document.getElementById('delete-task-btn').style.display = 'none';
    }

    // setting edit task functionality

    // setting unassign user functionality
    document.getElementById('unassign-user-btn').style.display = 'none';

    // setting assign to user functionality
    document.getElementById('assign-to-user-btn').style.display = 'none';


    // setting files list of task
    let files_list = getElementById('task-files-list');
    files_list.innerHTML = "";
    let files = getJSONLocalStorageInfo(CURR_TASK_FILES);
    if (files.length != 0) {
        for (let i = 0; i < files.length; i++) {
            let item = document.createElement("li");
            let a_tag = document.createElement("a");
            a_tag.innerHTML = files[i].file_name;
            a_tag.setAttribute("href", files[i].file_link);
            a_tag.setAttribute("target", "_blank");
            item.appendChild(a_tag);
            files_list.appendChild(item);
        }
    } else {
        document.getElementById('project-task-selected-details-files-list').innerHTML = '<b>No Attachments </b><br><ul id="task-files-list"></ul>';
    }

    // setting up comments section
    let mainBox = document.getElementById("comment-list-box");
    mainBox.innerHTML = "";

    //FetchCommentsOfTask
    let comments = getJSONLocalStorageInfo(CURR_TASK).comments;
    if (comments) {
        for (let i = 0; i < comments.length; i++) {
            let commentBox = document.createElement("div");
            commentBox.setAttribute("class", "comment-box");
            let commentSenderDetails = document.createElement("div");
            commentSenderDetails.setAttribute("class", "comment-sender-details");
            let commentSender = document.createElement("div");
            commentSender.setAttribute("class", "comment-user-name");
            commentSender.textContent = getProjectMemberInfoById(comments[i].user_id).name;
            let commentTimestamp = document.createElement("div");
            commentTimestamp.setAttribute("class", "comment-timestamp");
            commentTimestamp.textContent = comments[i].timestamp;
            let commentText = document.createElement("div");
            commentText.setAttribute("class", "comment-text");
            commentText.textContent = comments[i].comment_text;

            commentSenderDetails.appendChild(commentSender);
            commentSenderDetails.appendChild(commentTimestamp);
            commentBox.appendChild(commentSenderDetails);
            commentBox.appendChild(commentText);
            mainBox.appendChild(commentBox);
        }
    }

    //     // let taskId = getCurrentTaskId();
    //     let parentElem = getElementById(TASK_DETAIL_DIV);
    //     parentElem.innerHTML = "";
    //     let currentProjectTask = getJSONLocalStorageInfo(CURR_TASK);
    //     // let currentProjectTask = getProjectTaskInfoById(taskId);
    //     let div1 = document.createElement("div");
    //     let div2 = document.createElement("div");
    //     div1.textContent = currentProjectTask.task_name;
    //     div2.textContent = currentProjectTask.task_description;
    //     div1.setAttribute("id", "xyz");
    //     parentElem.appendChild(div1);
    //     parentElem.appendChild(div2);

    //     if (getJSONLocalStorageInfo("apiResponse").user.user_id == currentProjectTask.user_id) {
    //         let btn = document.createElement("button");
    //         btn.innerHTML = "Delete";
    //         btn.addEventListener('click', function () {
    //             deleteProjectTask();
    //         });
    //         parentElem.appendChild(btn);
    //     }

    //     let commentDiv = document.createElement("div");
    //     commentDiv.setAttribute("class", "comment-box");
    //     parentElem.appendChild(commentDiv);
    //     let commentInput = document.createElement('input');
    //     commentInput.setAttribute('type', 'text');
    //     commentInput.setAttribute('id', 'comment_message');
    //     let commentButton = document.createElement('button');
    //     commentButton.innerHTML = "Comment";
    //     commentDiv.appendChild(commentInput);
    //     commentDiv.appendChild(commentButton);
    //     commentButton.addEventListener('click', function () {
    //         addCommentToProjectTask();
    //     });

    //     let conversationsDiv = document.createElement('div');
    //     conversationsDiv.setAttribute('class', 'conversations-box');


    //     ///FetchCommentsOfTask
    //     let comments = getJSONLocalStorageInfo(CURR_TASK).comments;
    //     for (let i = 0; i < comments.length; i++) {
    //         let singleCommentDiv = document.createElement('div');
    //         singleCommentDiv.setAttribute('class', 'coversation-single-box');
    //         singleCommentDiv.textContent = comments[i].comment_text;
    //         conversationsDiv.appendChild(singleCommentDiv);
    //     }
    //     parentElem.appendChild(conversationsDiv);


}



function assignProjectTaskToMember() {
    let select = document.getElementById("member_dropdown");
    let taskId = getLocalStorageInfo(CURR_TASK_ID);
    let memberId = select.options[select.selectedIndex].value;
    let memberlist = getJSONLocalStorageInfo(CURR_PROJECT_MEMBERS);
    let email;
    for (var i = 0; i < memberlist.length; i++) {
        if (memberlist[i].member_id == memberId) {
            email = memberlist[i].email;
        }
    }
    let projectId = getLocalStorageInfo(CURR_PROJECT_ID);
    let user_id = getJSONLocalStorageInfo("apiResponse").user.user_id;
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
            let project = getJSONLocalStorageInfo(CURR_PROJECT).project_name;
            let task = getJSONLocalStorageInfo(CURR_TASK).task_name;
            console.log(email);
            // email api.
            $.ajax({
                type: 'POST',
                url: 'http://appnivi.com/server/v1/mail/sendMail',
                data: {
                    product: 'niviteams',
                    application: 'niviteams',
                    from: email,
                    to: email,
                    message: "You have been assigned task: " + task + " in project " + project,
                    subject: "Task assigned in NiviTeams.",
                },

                success: function (data) {
                    console.log("email sent successfully");
                    console.log(data);
                },

                error: function (error) {
                    console.log(error);
                }
            })
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
    let taskId = getLocalStorageInfo(CURR_TASK_ID);
    let user_id = getJSONLocalStorageInfo("apiResponse").user.user_id;
    let projectId = getLocalStorageInfo(CURR_PROJECT_ID);
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

function unassignProjectTaskOfMember() {
    let taskId = getLocalStorageInfo(CURR_TASK_ID);
    let user_id = getJSONLocalStorageInfo("apiResponse").user.user_id;
    let projectId = getLocalStorageInfo(CURR_PROJECT_ID);
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

function deleteProjectTask() {
    let taskId = getLocalStorageInfo(CURR_TASK_ID);
    let user_id = getJSONLocalStorageInfo("apiResponse").user.user_id;
    let projectId = getLocalStorageInfo(CURR_PROJECT_ID);
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
            if (data['error'] == false) {
                let task_list = getJSONLocalStorageInfo(CURR_PROJECT_TASKS);
                for (i = 0; i < task_list.length; i++) {
                    if (task_list[i].task_id == taskId) {
                        task_list.splice(i, 1);
                    }
                }
                setJSONLocalStorageInfo(CURR_PROJECT_TASKS, task_list);
                let project = getJSONLocalStorageInfo(CURR_PROJECT);
                project.project_tasks = task_list;
                setJSONLocalStorageInfo(CURR_PROJECT, project);
                showProjectTasks();
            }
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });

}

function addCommentToProjectTask() {
    let task = getJSONLocalStorageInfo(CURR_TASK);
    console.log(task);
    let commlist = task.comments;
    console.log(commlist);
    setJSONLocalStorageInfo(CURR_COMMENT_LIST, commlist);
    let taskId = getLocalStorageInfo(CURR_TASK_ID);
    let user_id = getJSONLocalStorageInfo("apiResponse").user.user_id;
    let projectId = getLocalStorageInfo(CURR_PROJECT_ID);
    let message = getElementById('comment_message').value;
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/Comment/addComment",
        type: 'post',
        data: {
            userid: user_id,
            taskid: taskId,
            projectid: projectId,
            text: message
        },
        success: function (data) {
            console.log(data);
            if (data['error'] == false) {
                commlist.push(data['comment']);
                setJSONLocalStorageInfo(CURR_COMMENT_LIST, commlist);
                console.log(getJSONLocalStorageInfo(CURR_COMMENT_LIST));
            }
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function fileUploadInProject() {
    var file = getElementById('file-input').files[0];
    var file_name = file.name;

    if (file) {
        var formData = new FormData();

        formData.append('file', file);
        formData.append('product', 'niviteams');
        formData.append('application', 'niviteams');
        formData.append('to', 'pratyush1997.aswal@gmail.com');
        formData.append('from', 'raman.10101@gmail.com');
        formData.append('message', 'hello');

        $.ajax({
            type: 'POST',
            url: 'http://appnivi.com/server/v1/file/fileupload',
            data: formData,
            success: function (data) {
                console.log(data.link);
                let userId = getUserId();
                let projectId = (getProjectId());
                let link = data.link;
                // api call to save the link to database
                $.ajax({
                    type: 'POST',
                    url: 'http://appnivi.com/niviteams/server/v1/project/saveFileLinkOfProject',
                    data: {
                        filelink: link,
                        projectid: projectId,
                        userid: userId,
                        filename: file_name
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }
    else {
        alert('select a file');
    }
}

function fileUploadInProjectTask() {
    var file = getElementById('file-input-project-task').files[0];
    var file_name = file.name;
    if (file) {
        var formData = new FormData();

        formData.append('file', file);
        formData.append('product', 'niviteams');
        formData.append('application', 'niviteams');
        formData.append('to', 'pratyush1997.aswal@gmail.com');
        formData.append('from', 'raman.10101@gmail.com');
        formData.append('message', 'hello');
        formData.append('filename', file.name);

        $.ajax({
            type: 'POST',
            url: 'http://appnivi.com/server/v1/file/fileupload',
            data: formData,
            success: function (data) {
                console.log(data.link);
                let userId = getUserId();
                let projectId = (getProjectId());
                let taskId = (getCurrentTaskId());
                let link = data.link;
                // api call to save the link to database
                $.ajax({
                    type: 'POST',
                    url: 'http://appnivi.com/niviteams/server/v1/project/saveFileLinkOfProjectTask',
                    data: {
                        filelink: link,
                        projectid: projectId,
                        userid: userId,
                        taskid: taskId,
                        filename: file_name
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }
    else {
        alert('select a file');
    }
}