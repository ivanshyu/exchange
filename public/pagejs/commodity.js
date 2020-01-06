$.ajax({
    type: 'GET',
    url: "/goods",
    data: {
    },
    success: function (msg) {
        var commodity_id = $('#commodity_id').text();
        console.log(commodity_id);
        var commodity_name = "";
        var info = "";
        var category = "";
        for (let i = 0; i < msg.msg.length; i++) {
            console.log(msg.msg[i]._id);
            if (commodity_id == msg.msg[i]._id) {
                commodity_name = msg.msg[i].title;
                info = msg.msg[i].description;
                category = msg.msg[i].class;

                console.log("OK");
            }
        }
        $('#h1_title').html(category + ' / ' + commodity_name);

        $('#info').html(info);
        $('#commodity_name1').html(commodity_name);
        $('#commodity_name2').html(commodity_name);
    },
    error: function (errors) {
        console.log(errors);
    }
})

