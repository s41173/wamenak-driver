cek_order_active();
var orderID = setInterval(function(){ cek_order_active(); }, 10000);
function cek_order_active(){
    if (localStorage.userid != undefined && localStorage.log != undefined){
        $.get(api+"sales/sales/cek_booked_status/"+localStorage.sid, function(data, status){
            if (data.status == false){
                localStorage.removeItem("sid");
                toast(data.error);
                setTimeout(function(){ window.location = "index.html"; }, 3000);
            }
        });
    }
}