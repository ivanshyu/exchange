var string = $('#card_title').text();
string = string.split(":")
category = string[1]

let item = ['物品一', '物品二', '物品三', '物品四']
let item_number = [5, 7, 12, 18]
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
        row += '<div class="col-sm-4" id=' + item[r_i] + ' onclick="location.href=\'/commodity/' + item_number[r_i] + '\'">'
        row += '<div class="position-relative p-3 bg-gray" style="height: 180px">'
        row += '<div style="text-align:center"><img src="../../dist/img/' + item_image[r_i] + '" width="55%"></div>'

        if (ribbon[n + i] == 'hot') {
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

$('#card_body').html(row)