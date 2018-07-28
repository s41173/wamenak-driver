
document.addEventListener("deviceready", vibrator, false);

function vibrator(){
  navigator.vibrate([1000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000]);
}

get_ongoing_order();
vibrator();
cek_order_active();
var vibrate = setInterval(function(){ vibrator(); }, 20000);
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

function get_ongoing_order(){
    if (localStorage.userid != undefined && localStorage.log != undefined){
        $.get(api+"sales/cek_ongoing", function(data, status){
                var datax = data.content[0];
                $("#ordercode").html(datax.code);
                $("#orderaddress").html(datax.destination);
                $("#orderpayment").html(datax.payment_type);
        });
    }
}

function book(){
    if (localStorage.userid != undefined && localStorage.log != undefined){
        $.get(api+"sales/book_order/"+localStorage.sid, function(data, status){
           if (data.status == true){
            localStorage.removeItem("sid");
            toast(data.error);
            setTimeout(function(){ window.location = "ongoing.html"; }, 2000);
           }
        });
    }
}