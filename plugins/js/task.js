function createNonLinkedTask(){
    console.log("Creating Task");
    //Ajax
    let user_id = getUserId();
    let task_name=document.getElementById("task-name-input").value;
    let task_description = document.getElementById("task-description-input").value;
    let task_deadline = document.getElementById("task-deadline-input").value;
    console.log(task_name);
    console.log(task_description);
    console.log(task_deadline);
    task_deadline = task_deadline.split("T");
    task_deadline = task_deadline[0] + " " + task_deadline[1]+":00";
    console.log(task_deadline);
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/task/createNonLinkedTask ",
        type: 'post',
        data: {
            userid: user_id,
            name: task_name,
            description:task_description,
            deadline:task_deadline
        },
        success: function(data) {
            console.log(data);
            if(data["error"] == false){
                showNonLinkedTaskDiv();
            }
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}

function fetchNonLinkedTask(){
    let user_id = getUserId();
    $.ajax({
        url:"http://appnivi.com/niviteams/server/v1/task/fetchNonLinkedTask",
        type:'post',
        data:{
            userid : user_id
        },
        success:function(data){
            console.log(data);
            let todoTasksDiv = document.getElementById("non-linked-todo-tasks");
            let tasks = data["nonlinkedtasks"];

            todoTasksDiv.innerHTML="";
            for(let i=0;i<tasks.length;i++){
                let tableTaskDiv = document.createElement("div");
                tableTaskDiv.setAttribute("class","table-task");

                let taskNamePara = document.createElement("p");
                taskNamePara.textContent = tasks[i].task_name+ "status "+ tasks[i].task_status;

                tableTaskDiv.appendChild(taskNamePara);

                let taskDescPara = document.createElement("p");
                taskDescPara.textContent = tasks[i].task_description;

                tableTaskDiv.appendChild(taskDescPara);

                let tableTaskIconDiv = document.createElement("div");

                tableTaskIconDiv.setAttribute("class","table-task-icons");

                //Edit Icon Div
                let iconDiv1 = document.createElement("div");
                iconDiv1.setAttribute("class","icon-div");
                let icon1 = document.createElement("i");
                icon1.setAttribute("class","fa fa-edit");
                icon1.addEventListener("click",function(){
                    console.log("Edit Task ID : " + tasks[i].task_id);
                    
                    localStorage.setItem("current-edit-non-linked-task",tasks[i].task_id);
                    showEditNonLinkedTasksModal();
                });
                iconDiv1.appendChild(icon1);
                tableTaskIconDiv.appendChild(iconDiv1);


                //Complete Icon Div
                let iconDiv2 = document.createElement("div");
                iconDiv2.setAttribute("class","icon-div");
                let icon2 = document.createElement("i");
                icon2.setAttribute("class","fa fa-check");
                icon2.addEventListener("click",function(){
                    console.log("Complete Task ID : " + tasks[i].task_id);
                    completeNonLinkedTask(tasks[i].task_id);
                });
                iconDiv2.appendChild(icon2);
                tableTaskIconDiv.appendChild(iconDiv2);


                // Notification Icon Div
                let iconDiv3 = document.createElement("div");
                iconDiv3.setAttribute("class","icon-div");
                let icon3 = document.createElement("i");
                icon3.setAttribute("class","fa fa-bell");
                icon3.addEventListener("click",function(){
                    console.log("Notify Task ID : " + tasks[i].task_id);
                    localStorage.setItem("current-notify-non-linked-task",tasks[i].task_id);
                    showNotifyNonLinkedTasksModal();
                });
                iconDiv3.appendChild(icon3);
                tableTaskIconDiv.appendChild(iconDiv3);


                //Delete Icon Div
                let iconDiv4 = document.createElement("div");
                iconDiv4.setAttribute("class","icon-div");
                let icon4 = document.createElement("i");
                icon4.setAttribute("class","fa fa-times");
                icon4.addEventListener("click",function(){
                    console.log("Delete Task ID : " + tasks[i].task_id);
                    deletedNonLinkedTask(tasks[i].task_id);
                });
                iconDiv4.appendChild(icon4);
                tableTaskIconDiv.appendChild(iconDiv4);


                tableTaskDiv.appendChild(tableTaskIconDiv);

                todoTasksDiv.appendChild(tableTaskDiv);
            }
            
        },
        error : function(xhr){
            console.log(xhr);
        }
    });
}
function completeNonLinkedTask(task_id){
    let user_id = getUserId();
    $.ajax({
        url:"http://appnivi.com/niviteams/server/v1/task/completeNonLinkedTask",
        type:'post',
        data:{
            userid : user_id,
            taskid : task_id
        },
        success:function(data){
            console.log(data);
            showNonLinkedTaskDiv();
        },
        error : function(xhr){
            console.log(xhr);
        }
    });
}
function deletedNonLinkedTask(task_id){
    let user_id =getUserId();
    $.ajax({
        url:"http://appnivi.com/niviteams/server/v1/task/deletedNonLinkedTask",
        type:'post',
        data:{
            userid : user_id,
            taskid : task_id
        },
        success:function(data){
            console.log(data);
            showNonLinkedTaskDiv();
        },
        error : function(xhr){
            console.log(xhr);
        }
    });
}
function editNonLinkedTask(){
    let task_id = localStorage.getItem("current-edit-non-linked-task");
    let user_id = getUserId();
    let task_name=document.getElementById("edit-task-name-input").value;
    let task_description = document.getElementById("edit-task-description-input").value;
    let task_deadline = document.getElementById("edit-task-deadline-input").value;
    task_deadline = task_deadline.split("T");
    task_deadline = task_deadline[0] + " " + task_deadline[1]+":00";
    //
    document.getElementById("edit-non-linked-task").style.display = "none";
    //
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/task/editNonLinkedTask ",
        type: 'post',
        data: {
            userid: user_id,
            taskid:task_id,
            name: task_name,
            description:task_description,
            deadline:task_deadline
        },
        success: function(data) {
            console.log(data);
            if(data["error"] == false){
                showNonLinkedTaskDiv();
            }
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}

function notifyNonLinkedTask(){
    console.log("Notified");
    let user_id = getUserId();
    let task_id = localStorage.getItem("current-notify-non-linked-task");
    let reminder_email = document.getElementById("notify-email-non-linked-task").value;
    let reminder_message = document.getElementById("notify-message-non-linked-task").value;
    let reminder_time = document.getElementById("notify-non-linked-task-time-input").value;
    
    reminder_time = reminder_time.split("T");
    reminder_time = reminder_time[0] + " " + reminder_time[1]+":00";
    console.log(reminder_time);
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/task/notifyNonLinkedTask ",
        type: 'post',
        data: {
            userid: user_id,
            taskid:task_id,
            email:reminder_email,
            message :reminder_message,
            time:reminder_time
        },
        success: function(data) {
            console.log(data);
            // if(data["error"] == false){
            //     showNonLinkedTaskDiv();
            // }
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}