
cek_ongoing_order_active();
var orderID = setInterval(function(){ cek_ongoing_order_active(); }, 10000);
// fungsi untuk mengecek apakah order id berstatus booked or not // d reject oleh admin
function cek_ongoing_order_active(){
    if (localStorage.sid != undefined){
        $.get(api+"sales/cek_booked_status/"+localStorage.sid, function(data, status){
            if (data.status == true){
                cek_ongoing_active();
            }else{
                localStorage.removeItem("sid");
                cek_order();
            }
        });
    }else{ cek_order(); }
}

function cek_ongoing_active(){

    $.get(api+"sales/cek_id_json/"+localStorage.sid, function(data, status){
        if (data.status == false){
            localStorage.removeItem("sid");
            console.log('hapus sid');
        }
    });

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
            }else{ localStorage.removeItem("sid"); }
        });
    }
}