function run(){
    console.log("hi")
    $.ajax({
        type: 'POST',
        url: 'http://appnivi.com/niviteams/server/v1/project/saveFileLinkOfProjectTask',
        data: {
            filelink: 'llll',
            projectid: 11,
            taskid: 2
        },
        success: function (data) {
            console.log(data.message);
        },
        error: function (error) {
            console.log(error);
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

run();