function getProjectId() {
    let projectId = localStorage.getItem("current-project-id");
    return projectId;
}
function setCurrentTaskId(currentTaskId) {
    localStorage.setItem("current-task-id", currentTaskId);
}
function getCurrentTaskId() {
    let taskId = localStorage.getItem("current-task-id");
    return taskId;
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
            let project_list = data["projects"];
            let project_list_div = document.getElementById("project-list-div");
            project_list_div.innerHTML = "";
            for (let i = 0; i < project_list.length; i++) {
                let boxDiv = document.createElement("div");
                boxDiv.setAttribute("class", "project-list-box");
                boxDiv.addEventListener('click', function () {
                    localStorage.setItem("current-project-id", project_list[i].project_id);
                    showProjectDiv();
                });
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
    //Ajax
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
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/createTaskInProject ",
        type: 'post',
        data: {
            userid: user_id,
            projectid: project_id,
            name: project_task_name,
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
function addMemeberToProject() {

    let project_id = getProjectId();
    let user_id = getUserId();
    let member_name = document.getElementById("project-team-add-member-name-input").value;
    let member_mail = document.getElementById("project-team-add-member-email-input").value;

    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/project/addMemeberToProject ",
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
            let backlogDiv = document.getElementById("project-div-content-tasks-backlog-list");
            backlogDiv.innerHTML = "";
            let AssignedDiv = document.getElementById("project-div-content-tasks-assigned-list");
            AssignedDiv.innerHTML = "";
            let UnassignedDiv = document.getElementById("project-div-content-tasks-unassigned-list");
            UnassignedDiv.innerHTML = "";
            let completedDiv = document.getElementById("project-div-content-tasks-completed-list");
            completedDiv.innerHTML = "";
            if (data["error"] == false) {
                let project_tasks = data["project_tasks"]

                // let assignedDiv = document.getElementById();
                for (let i = 0; i < project_tasks.length; i++) {
                    if (project_tasks[i].is_backlog == 1) {
                        let projectTaskBoxDiv = document.createElement("div");
                        projectTaskBoxDiv.setAttribute("class", "project-task-box");
                        projectTaskBoxDiv.textContent = project_tasks[i].task_name;
                        projectTaskBoxDiv.addEventListener('click', function () {
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
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}
function fetchCurrentBacklogTaskInformation() {
    let taskId = getCurrentTaskId();
    console.log(taskId);

}
function assignProjectTaskToMember(){
    let taskId = getCurrentTaskId();
    let memberId = "";
    let projectId = getProjectId();
}