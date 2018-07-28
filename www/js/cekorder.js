cek_order();
var orderID = setInterval(function(){ cek_order(); }, 10000);
function cek_order(){
    if (localStorage.userid != undefined && localStorage.log != undefined){
        $.get(api+"sales/cek_ongoing", function(data, status){
            if (data.status == true){
                var uid = data.content[0].id;
                localStorage.setItem("sid", uid);
                window.location = "book.html";
            }
        });
    }
}