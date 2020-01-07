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
                swal("加到我的最愛成功", "", "success")
            }else{
                swal("加到我的最愛失敗", "", "warning")
            }
        },
        error: function (errors) {
            console.log(errors);
        }
    })
}

window.addEventListener('load', function () {
    $('#textareaname').html(getCookie("name"))
    $.ajax({
        type: 'GET',
        url: "/users/messagebar?id="+$('#commodity_id').text(),
        success: function (msg) {
            console.log(msg)
            var messagelist = "";

            for (let i = 0; i < msg.msg.length; i++) {
                // console.log(msg.msg[i]._id);
                messagelist += `<div class="card card-solid">
                <div class="card-body"> 
                    <div class="row">
                        <div class="col-12 ">
                            <div class="post">
                                <div class="user-block">
                                    <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg"
                                         alt="user image">
                                    <span class="username">
                          <a href="#">${msg.msg[i].name}</a>
                        </span>
                                    <span class="description">${msg.msg[i].time}</span>
                                </div>
                                <p>
                                    ${msg.msg[i].message}
                                </p>
                                <p>
                                    <a href="#" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</a>
                                    <a href="#" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i>
                                        Like</a>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>`
            }
            $('#messagebar').html(messagelist)

        },
        error: function (errors) {
            alert(errors)
            console.log(errors);
        }
    })



})

function leavemessage() {

    $.ajax({
        type: 'POST',
        url: "/users/messagebar",
        data: {
            id:$('#commodity_id').text(),
            message:$('#leavemessage').val()
        },
        success: function (msg) {
            console.log(msg)
            if(msg.status === true){
                swal("留言成功", "做得好!", "success")
                    .then((value) => {
                        window.location.reload();
                });
            }else{
                swal("留言失敗", "QQ", "warning")
            }
        },
        error: function (errors) {
            console.log(errors);
        }
    })
}