// Show Hide Content Div

let contentDivs = [WELCOME_DIV_ID, NON_LINKED_TASKS_ID, PROJECT_LIST_ID, PROJECT_DIV_ID];

function hideContentDiv(){
    for(let i = 0; i<contentDivs.length;i++){
        hideElementById(contentDivs[i]);
    }
}
function showIntroPageDiv(){
    hideContentDiv();
    showElementById(WELCOME_DIV_ID); 
}
function showNonLinkedTaskDiv(){
    hideModalDiv();
    hideContentDiv();
    fetchNonLinkedTask();
    showElementById(NON_LINKED_TASKS_ID);
}
function showProjectListDiv(){
    hideModalDiv();
    hideContentDiv();
    fetchProjects();
    showElementById(PROJECT_LIST_ID);
}
function showProjectDiv(){
    hideModalDiv();
    hideContentDiv();
    showProjectTasks();
    showElementById(PROJECT_DIV_ID);
    setInnerHtml('project-name', getCurrentProjectName());
}


// Show Hide Project Content
let projectContentDiv = [CREATE_PROJECT_TASK_ID, CREATE_PROJECT_TEAM_ID, ADD_PROJECT_MEMBER_ID, PROJECT_TASK_ID, PROJECT_TASK_ID, PROJECT_MEMBERS_ID]
function hideProjectContentDiv(){
    for(let i = 0; i<projectContentDiv.length;i++){
        hideElementById(projectContentDiv[i]);
    }
}
function showProjectCreateTasksDiv(){
    hideProjectContentDiv();
    showElementById(CREATE_PROJECT_TASK_ID); 
}
function showProjectCreateTeamDiv(){
    hideProjectContentDiv();
    showElementById(CREATE_PROJECT_TEAM_ID); 
}
function showProjectCreateAddMember(){
    hideProjectContentDiv();
    showElementById(ADD_PROJECT_MEMBER_ID); 
}
function showProjectTasks(){
    hideProjectContentDiv();
    fetchTasksOfProject();
    showProjectBacklogTasksDiv();
    showElementById(PROJECT_TASK_ID); 
}
function showProjectTeams(){
    hideProjectContentDiv();
    fetchTeamsOfProject();
    showElementById(PROJECT_TASK_ID); 
}
function showProjectMembers(){
    hideProjectContentDiv();
    fetchMembersOfProject();
    showElementById(PROJECT_MEMBERS_ID); 
}

let projectTasksDiv = [BACKLOG_TASK_DIV_ID, ASSIGNED_TASK_DIV_ID, UNASSIGNED_TASK_DIV_ID, COMPLETED_TASK_DIV_ID];
function hideAllProjectTaskDiv(){
    for(let i = 0; i<projectTasksDiv.length;i++){
        hideElementById(projectTasksDiv[i]);
    }
}
function showProjectBacklogTasksDiv(){
    hideAllProjectTaskDiv();
    showElementById(BACKLOG_TASK_DIV_ID); 
}
function showProjectAssignedTasksDiv(){
    hideAllProjectTaskDiv();
    showElementById(ASSIGNED_TASK_DIV_ID); 
}
function showProjectUnassignedTasksDiv(){
    hideAllProjectTaskDiv();
    showElementById(UNASSIGNED_TASK_DIV_ID); 
}
function showProjectCompletedTasksDiv(){
    hideAllProjectTaskDiv();
    showElementById(COMPLETED_TASK_DIV_ID); 
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
    showElementById(TASK_DETAIL_DIV); 
}
function hideProjectTasksDetailDiv(){
    hideElementById(TASK_DETAIL_DIV); 
}

// Show Hide Modals

let modalDivs = [CREATE_NON_LINKED_TASK_MODAL, EDIT_NON_LINKED_TASK_MODAL, NOTIFY_NON_LINKED_TASK_MODAL, CREATE_TEAM_MODAL, CREATE_PROJECT_MODAL];

function hideModalDiv(){
    for(let i=0;i<modalDivs.length;i++){
        hideElementById(modalDivs[i]);
    }
}
function showCreateNonLinkedTasksModal(){
    showElementById(CREATE_NON_LINKED_TASK_MODAL);
}
function hideCreateNonLinkedTasksModal(){
    hideElementById(CREATE_NON_LINKED_TASK_MODAL);
}

function showEditNonLinkedTasksModal(){
    showElementById(EDIT_NON_LINKED_TASK_MODAL);
}
function hideEditNonLinkedTasksModal(){
    hideElementById(EDIT_NON_LINKED_TASK_MODAL);
}


function showNotifyNonLinkedTasksModal(){
    showElementById(NOTIFY_NON_LINKED_TASK_MODAL);
}
function hideNotifyNonLinkedTasksModal(){
    hideElementById(NOTIFY_NON_LINKED_TASK_MODAL);
}

function showCreateTeamModal(){
    showElementById(CREATE_TEAM_MODAL);
}
function hideCreateTeamModal(){
    hideElementById(CREATE_TEAM_MODAL);
}

function showCreateProjectModal(){
    showElementById(CREATE_PROJECT_MODAL);
}
function hideCreateProjectModal(){
    hideElementById(CREATE_PROJECT_MODAL);
}