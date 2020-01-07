$.ajax({
    type: 'GET',
    url: "/goods",
    data: {
    },
    success: function (msg) {
        var string = $('#card_title').text();
        string = string.split(":")
        category = string[1]

        let item = [];
        let item_id = [];
        var item_number = 0;
        for (let i = 0; i < msg.msg.length; i++) {
            if (msg.msg[i].class == category) {
                item[item_number] = msg.msg[i].title;
                item_id[item_number] = msg.msg[i]._id;
                item_number++;
            }
        }
        let item_image = ['prod-1.jpg', 'prod-1.jpg', 'prod-1.jpg', 'prod-1.jpg']
        let ribbon = ['new', 'new', 'none', 'none'];

        var row = '';

        for (let n = 0; n < item.length / 3; n++) {
            if (n == 0) {
                row += '<div class="row">';
            }
            else {
                row += '<div class="row mt-4">';
            }
            for (let i = 0; i < 3; i++) {
                let r_i = n * 3 + i;
                if (item[r_i] === undefined) {
                    break;
                }
                row += '<div class="col-sm-4" id=' + item[r_i] + ' onclick="location.href=\'/commodity/' + item_id[r_i] + '\'">'
                row += '<div class="position-relative p-3 bg-gray" style="height: 180px">'
                row += '<div style="text-align:center"><img src="../../dist/img/' + item_image[r_i] + '" width="45%"></div>'

                if (ribbon[r_i] == 'hot') {
                    row += '<div class="ribbon-wrapper ribbon-lg">'
                    row += '<div class="ribbon bg-danger text-lg">Hot~</div></div>'
                }
                else if (ribbon[r_i] == 'new') {
                    row += '<div class="ribbon-wrapper ribbon-lg">'
                    row += '<div class="ribbon bg-success text-lg">New!</div></div>'
                }

                row += '<h5>' + item[r_i] + '</h5>' + '</div></div>'
            }
            row += '</div>';
        }

        if (item.length == 0) {
            row = '系統忙碌中~';
        }

        $('#card_body').html(row)

    },
    error: function (errors) {
        console.log(errors);
    }
})

