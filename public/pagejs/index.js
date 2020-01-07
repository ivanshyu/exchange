$.ajax({
    type: 'GET',
    url: "goods/classify",
    data: {
    },
    success: function (msg) {

        let category = [];
        for (let i = 0; i < msg.msg.length; i++) {
            category[i] = msg.msg[i].class;
        }
        let category_image = ['item02.jpg', 'item01.jpg', 'item03.jpg', 'pic01.jpg', 'pic02.jpg', 'pic03.jpg', 'pic04.jpg']
        let ribbon = ['hot', 'new', 'none', 'none', 'none', 'none', 'none'];
        var row = '';

        for (let n = 0; n < category.length / 3; n++) {
            if (n == 0) {
                row += '<div class="row">';
            }
            else {
                row += '<div class="row mt-4">';
            }
            for (let i = 0; i < 3; i++) {
                let r_i = n * 3 + i;
                if (category[r_i] == undefined) {
                    break;
                }
                row += '<div class="col-sm-4" id=' + category[r_i] + ' onclick="location.href=\'category/' + category[r_i] + '\'">'
                row += '<div class="position-relative p-3 bg-gray" style="height: 180px">'
                row += '<div style="text-align:center"><img src="/images/' + category_image[r_i] + '" width="50%"></div>'

                if (ribbon[r_i] == 'hot') {
                    row += '<div class="ribbon-wrapper ribbon-lg">'
                    row += '<div class="ribbon bg-danger text-lg">Hot~</div></div>'
                }
                else if (ribbon[r_i] == 'new') {
                    row += '<div class="ribbon-wrapper ribbon-lg">'
                    row += '<div class="ribbon bg-success text-lg">New!</div></div>'
                }

                row += '<h5>' + category[r_i] + '</h5></div></div>'
            }
            row += '</div>';
        }

        $('#card_body').html(row)
    },
    error: function (errors) {
        console.log(errors);
    }
})

