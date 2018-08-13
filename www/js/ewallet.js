wallet();

function wallet(){

    var nilai = '{ "courier":"'+localStorage.userid+'" }';
    $.ajax({
        type: 'POST',
        url: api+'courier/balance',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {   
            if (data.status == true){
                // panggil function confirmation
                console.log(data.balance);
                $("#balance").html(idr_format(data.balance));
            }else{ toast(data.error); setTimeout(function(){ window.location = "index.html"; }, 3000); }
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

function direct(val){
  
  if (val == 'topup'){ window.location = "ewallet-history.html"; }else { window.location = "order-history.html"; }
}