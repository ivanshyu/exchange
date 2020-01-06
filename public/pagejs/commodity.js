$.ajax({
    type: 'GET',
    url: "/goods",
    data: {
    },
    success: function (msg) {
        for(let i=0;i<msg.msg.length;i++){
            console.log("OK");
        }
    },
    error: function (errors) {
        console.log(errors);
    }
})


var commodity_id = $('#commodity_id').text();
var commodity_name = "LOWA Men’s Renegade GTX Mid Hiking Boots Review(物品名稱)";
var info = "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terr.(產品資訊)";
var category = "男鞋";


$('#h1_title').html(category + ' / ' + commodity_name);

$('#info').html(info);
$('#commodity_name1').html(commodity_name);
$('#commodity_name2').html(commodity_name);