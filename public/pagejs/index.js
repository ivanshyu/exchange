let category = ['鞋子', '衣服', '類別三','類別四', '類別五', '其他'];
let category_page = '';
let item_number = [35894,2231,1128,3,10,1283]
let ribbon = ['hot','new','none','none','none','none'];
var row = '';

for(let n=0;n<2;n++){
    if(n==0){
        row += '<div class="row">';
    }
    else{
        row += '<div class="row mt-4">';
    }
    for(let i=0;i<3;i++){
        let r_i = n*3+i;
        row += '<div class="col-sm-4" id='+category[r_i]+' onclick="location.href=\'category/'+category[r_i]+'\'">'
        row += '<div class="position-relative p-3 bg-gray" style="height: 180px">'
        if(ribbon[n+i]=='hot'){
            row += '<div class="ribbon-wrapper ribbon-lg">'
            row += '<div class="ribbon bg-danger text-lg">Hot~</div></div>'
        } 
        else if(ribbon[r_i]=='new'){
            row += '<div class="ribbon-wrapper ribbon-lg">'
            row += '<div class="ribbon bg-success text-lg">New!</div></div>'
        }

    row += '<h5>'+category[r_i]+'</h5><br>'+item_number[r_i]+'件物品'+'</div></div>'
    }
    row += '</div>';
}

$('#firstrow').html(row)
