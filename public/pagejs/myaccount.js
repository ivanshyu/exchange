window.addEventListener('load', function () {



    $.ajax({
        type: 'GET',
        url: "/users",
        success: function (msg) {
            console.log(msg.msg);


            $("input[name='email']").val(msg.msg.email);
            $("input[name='name']").val(msg.msg.name);
            $("input[name='password']").val(msg.msg.password);
            $("input[name='address_nation']").val(msg.msg.address.address_nation);
            $("input[name='address_city']").val(msg.msg.address.address_city);
            $("input[name='address_dist']").val(msg.msg.address.address_dist);
            $("input[name='address_street']").val(msg.msg.address.address_street);
            $("input[name='address_section']").val(msg.msg.address.address_section);
            $("input[name='address_other']").val(msg.msg.address.address_other);

        },
        error: function (errors) {
            console.log(errors);
            swal("註冊失敗了", "You clicked the button!", "warning")
        }
    })
})