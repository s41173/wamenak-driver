function topup(){

    if (localStorage.userid != undefined && localStorage.log != undefined){

           var num = $("#tphone").val();
           if (num != ""){
               
    $.get(api+"customer/detail_by_phone/"+num, function(data, status){
            
        if (data != null){

            $("#name").html(data.first_name);
            $("#no").html(data.phone);
            $("#hcust").val(data.id);
            $("#tcust,#btop").css("display", "block");

        }else{ $("#tcust,#btop").css("display", "none"); toast('Invalid Phone No'); }

    });


           }else{ toast('Customer Phone No Required'); }

    }
}

function process(){

        var nilai = '{ "courier":"'+localStorage.userid+'", "customer":"'+$("#hcust").val()+'", "amount":"'+$("#camount").val()+'", "type":"1" }';
        $.ajax({
            type: 'POST',
            url: api+'topup/add_json',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                toast(data.error);
                if (data.status == true){
                    // panggil function confirmation
                    confirmation(data.id);
                    
                }else{ setTimeout(function(){ location.reload(); }, 3000); }
            },
            error: function (request, status, error) {
                toast('Request Failed Otentikasi Request...! - '+request.responseText);
                toast('Request Failed Otentikasi Status...! - '+error);
                toast('Request Failed Otentikasi Error...! - '+status);
                setTimeout(function(){ navigator.app.exitApp(); }, 1500);
            }
        })
        return false;
}

function confirmation(uid){

    var nilai = '{ "id":"'+uid+'" }';
    $.ajax({
        type: 'POST',
        url: api+'topup/confirmation_driver',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {   
            toast(data.error);
            if (data.status == true){
                setTimeout(function(){ window.location = "ewallet-history.html"; }, 4000);
            }else{ setTimeout(function(){ location.reload(); }, 3000); }
        },
        error: function (request, status, error) {
            toast('Request Failed Otentikasi Request...! - '+request.responseText);
            toast('Request Failed Otentikasi Status...! - '+error);
            toast('Request Failed Otentikasi Error...! - '+status);
            setTimeout(function(){ navigator.app.exitApp(); }, 1500);
        }
    })
    return false;
}