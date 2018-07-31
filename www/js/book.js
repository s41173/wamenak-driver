
document.addEventListener("deviceready", vibrator, false);

function vibrator(){
  navigator.vibrate([1000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000]);
}

get_ongoing_order();
vibrator();
var vibrate = setInterval(function(){ vibrator(); }, 20000);

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
        $.get(api+"sales/book_order/"+localStorage.sid+"/"+localStorage.userid, function(data, status){
           if (data.status == true){
            // localStorage.removeItem("sid");
            toast(data.error);
            setTimeout(function(){ window.location = "order.html"; }, 2000);
           }
        });
    }
}