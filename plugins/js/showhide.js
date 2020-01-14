// Show Hide Content Div

let contentDivs = ["intro-page","non-linked-tasks", "project-list-div","project-div"];

function hideContentDiv(){
    for(let i = 0; i<contentDivs.length;i++){
        document.getElementById(contentDivs[i]).style.display="none";
    }
}
function showIntroPageDiv(){
    hideContentDiv();
    document.getElementById("intro-page").style.display = "block"; 
}
function showNonLinkedTaskDiv(){
    hideModalDiv();
    hideContentDiv();
    fetchNonLinkedTask();
    document.getElementById("non-linked-tasks").style.display = "block";
}
function showProjectListDiv(){
    hideModalDiv();
    hideContentDiv();
    fetchProjects();
    document.getElementById("project-list-div").style.display = "block";
}
function showProjectDiv(){
    hideModalDiv();
    hideContentDiv();
    showProjectTasks();
    document.getElementById("project-div").style.display = "block";
    document.getElementById('project-name').innerHTML = getCurrentProjectName();
}


// Show Hide Project Content
let projectContentDiv = ["project-div-content-create-task","project-div-content-create-team","project-div-content-add-member","project-div-content-tasks","project-div-content-teams","project-div-content-members"]
function hideProjectContentDiv(){
    for(let i = 0; i<projectContentDiv.length;i++){
        document.getElementById(projectContentDiv[i]).style.display="none";
    }
}
function showProjectCreateTasksDiv(){
    hideProjectContentDiv();
    document.getElementById("project-div-content-create-task").style.display = "block"; 
}
function showProjectCreateTeamDiv(){
    hideProjectContentDiv();
    document.getElementById("project-div-content-create-team").style.display = "block"; 
}
function showProjectCreateAddMember(){
    hideProjectContentDiv();
    document.getElementById("project-div-content-add-member").style.display = "block"; 
}
function showProjectTasks(){
    hideProjectContentDiv();
    fetchTasksOfProject();
    showProjectBacklogTasksDiv();
    document.getElementById("project-div-content-tasks").style.display = "block"; 
}
function showProjectTeams(){
    hideProjectContentDiv();
    fetchTeamsOfProject();
    document.getElementById("project-div-content-teams").style.display = "block"; 
}
function showProjectMembers(){
    hideProjectContentDiv();
    fetchMembersOfProject();
    document.getElementById("project-div-content-members").style.display = "block"; 
}

let projectTasksDiv = ["project-div-content-tasks-backlog-list","project-div-content-tasks-assigned-list","project-div-content-tasks-unassigned-list","project-div-content-tasks-completed-list"];
function hideAllProjectTaskDiv(){
    for(let i = 0; i<projectTasksDiv.length;i++){
        document.getElementById(projectTasksDiv[i]).style.display="none";
    }
}
function showProjectBacklogTasksDiv(){
    hideAllProjectTaskDiv();
    document.getElementById("project-div-content-tasks-backlog-list").style.display = "block"; 
}
function showProjectAssignedTasksDiv(){
    hideAllProjectTaskDiv();
    document.getElementById("project-div-content-tasks-assigned-list").style.display = "block"; 
}
function showProjectUnassignedTasksDiv(){
    hideAllProjectTaskDiv();
    document.getElementById("project-div-content-tasks-unassigned-list").style.display = "block"; 
}
function showProjectCompletedTasksDiv(){
    hideAllProjectTaskDiv();
    document.getElementById("project-div-content-tasks-completed-list").style.display = "block"; 
}

///////////
function showProjectTasksDetailDiv(e){
    if(e==0){
        fetchCurrentBacklogTaskInformation();
    }else if (e==1){
        fetchCurrentAssignedTaskInformation();
    }else if (e==2){
        fetchCurrentUnassignedTaskInformation();
    }else if (e==3){
        fetchCurrentCompletedTaskInformation();
    }
    document.getElementById("project-div-content-tasks-selected-detail").style.display = "block"; 
}
function hideProjectTasksDetailDiv(){
    document.getElementById("project-div-content-tasks-selected-detail").style.display = "none"; 
}

// Show Hide Modals

let modalDivs = ["create-non-linked-task","edit-non-linked-task","notify-non-linked-task","create-team","create-project"];

function hideModalDiv(){
    for(let i=0;i<modalDivs.length;i++){
        document.getElementById(modalDivs[i]).style.display="none";
    }
}
function showCreateNonLinkedTasksModal(){
    document.getElementById("create-non-linked-task").style.display="block";
}
function hideCreateNonLinkedTasksModal(){
    document.getElementById("create-non-linked-task").style.display="none";
}

function showEditNonLinkedTasksModal(){
    document.getElementById("edit-non-linked-task").style.display="block";
}
function hideEditNonLinkedTasksModal(){
    document.getElementById("edit-non-linked-task").style.display="none";
}


function showNotifyNonLinkedTasksModal(){
    document.getElementById("notify-non-linked-task").style.display="block";
}
function hideNotifyNonLinkedTasksModal(){
    document.getElementById("notify-non-linked-task").style.display="none";
}

function showCreateTeamModal(){
    document.getElementById("create-team").style.display="block";
}
function hideCreateTeamModal(){
    document.getElementById("create-team").style.display="none";
}

function showCreateProjectModal(){
    document.getElementById("create-project").style.display="block";
}
function hideCreateProjectModal(){
    document.getElementById("create-project").style.display="none";
}