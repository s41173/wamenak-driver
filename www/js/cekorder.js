
cek_ongoing_order_active();
var orderID = setInterval(function(){ cek_ongoing_order_active(); }, 10000);
// fungsi untuk mengecek apakah order id berstatus booked or not // d reject oleh admin
function cek_ongoing_order_active(){
    if (localStorage.sid != undefined){
        $.get(api+"sales/cek_booked_status/"+localStorage.sid, function(data, status){
            if (data.status == true){
                localStorage.removeItem("sid");
                cek_order();
                console.log('hapus sid');
            }
        });
    }else{ cek_order(); }
}

function cek_order(){
    if (localStorage.userid != undefined && localStorage.log != undefined){
        $.get(api+"sales/cek_ongoing", function(data, status){
            if (data.status == true){
                var uid = data.content[0].id;
                localStorage.setItem("sid", uid);
                var bodyId = document.body.id;
                console.log('buat sid');
                if (bodyId != 'book'){ window.location = "book.html"; }
            }
        });
    }
}