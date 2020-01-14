function createTeam(){
    let user_id = getUserId();
    let team_name = "Team Name";
    let team_description = "Team Description";
    $.ajax({
        url: "http://appnivi.com/niviteams/server/v1/team/createTeam ",
        type: 'post',
        data: {
            userid: user_id,
            name: team_name,
            description:team_description
        },
        success: function(data) {
            //If task created go to showNonLinkedTasks
            console.log(data);
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}