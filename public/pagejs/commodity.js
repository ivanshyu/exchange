$.ajax({
    type: 'GET',
    url: "/goods",
    data: {
    },
    success: function (msg) {
        var commodity_id = $('#commodity_id').text();
        var commodity_name = "";
        var info = "";
        var category = "";
        var image = '<img class="product-image" alt="Product Image" src="/images/';
        
        for (let i = 0; i < msg.msg.length; i++) {
            console.log(msg.msg[i]._id);
            if (commodity_id == msg.msg[i]._id) {
                commodity_name = msg.msg[i].title;
                info = msg.msg[i].description;
                category = msg.msg[i].class;
                image += msg.msg[i].image;
            }
        }
        image += '">';
        $('#h1_title').html(category + ' / ' + commodity_name);

        $('#info').html(info);
        $('#commodity_name1').html(commodity_name);
        $('#commodity_name2').html(commodity_name);
        if(image == undefined){
            image = '<img src="../../dist/img/prod-1.jpg" class="product-image" alt="Product Image">';
        }
        $('#main_image').html(image);
    },
    error: function (errors) {
        console.log(errors);
    }
})

