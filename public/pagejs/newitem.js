
window.addEventListener('load', function () {

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
        var row = '<option selected="" disabled="">請選擇</option>\n'

        for (let n = 0; n < category.length ; n++) {
            row += `<option>${category[n]}</option>\n`
        }


        $('#inputCategory').html(row)
    },
    error: function (errors) {
        console.log(errors);
    }
})

})



$("#progressbarTWInput").change(function(){

    readURL(this);

});


function readURL(input){

    if(input.files && input.files[0]){

        var reader = new FileReader();

        reader.onload = function (e) {

            $("#preview_progressbarTW_img").attr('src', e.target.result);

        }

        reader.readAsDataURL(input.files[0]);

    }

}


