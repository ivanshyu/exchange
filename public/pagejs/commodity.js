$.ajax({
    type: 'GET',
    url: "/goods?id="+$('#commodity_id').text(),
    data: {
    },
    success: function (msg) {
        var commodity_id = $('#commodity_id').text();
        var commodity_name = "";
        var info = "";
        var category = "";
        var image = '<img class="product-image" alt="Product Image" src="/';
        var time;
        var place;
        console.log(msg)

        for (let i = 0; i < msg.msg.length; i++) {
            console.log(msg.msg[i]._id);
            if (commodity_id == msg.msg[i]._id) {
                commodity_name = msg.msg[i].title;
                info = msg.msg[i].description;
                category = msg.msg[i].class;
                image += msg.msg[i].image;
                time = msg.msg[i].time;
                place = msg.msg[i].place;
            }
        }
        image += '">';
        $('#h1_title').html(category + ' / ' + commodity_name);

        $('#info1').html(info);
        $('#infotime').html(time);
        $('#infoplace').html(place);

        $('#commodity_name1').html(commodity_name);
        $('#commodity_name2').html(commodity_name);
        $('#main_image').html(image);
    },
    error: function (errors) {
        console.log(errors);
    }
})



function onclickmylove() {

    $.ajax({
        type: 'POST',
        url: "/users/favorite_list",
        data: {
            id:$('#commodity_id').text()
        },
        success: function (msg) {
            console.log(msg)
            if(msg.status === true){
                swal("加到我的最愛成功", "You clicked the button!", "success")
            }else{
                swal(加到我的最愛失敗, "You clicked the button!", "warning")
            }
        },
        error: function (errors) {
            console.log(errors);
        }
    })
}
