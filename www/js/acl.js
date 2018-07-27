var api = "http://administrator.wamenak.com/"; 

$(document).ready(function () {

   $(document).ajaxStart(function(){
       $(".loader").css("display", "block");
   });
   $(document).ajaxComplete(function(){
       $(".loader").css("display", "none");
   });

   $(document).ajaxError(function(){
       toast("No Internet Connection..!!");
       setTimeout(function(){ navigator.app.exitApp(); }, 3500);
   });

}); // end document ready

function toast(msg) {
   var x = document.getElementById("snackbar");
   x.innerHTML=msg;
   x.className = "show";
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function toastpop(msg) {
   var x = document.getElementById("snackbarpop");
   x.innerHTML=msg;
   x.className = "show";
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

function idr_format(val){
   while (/(\d+)(\d{3})/.test(val.toString())){
       val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
   }
   var val = val+',-';
   return val;
}

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

function otentikasi(page){
    
    $(document).ready(function(e){  

        var bodyId = document.body.id;   
        var nilai = '{ "userid":"'+localStorage.userid+'", "log":"'+localStorage.log+'", "mobile":"1" }';
        var mess = null;

        $.ajax({
            type: 'POST',
            url: api+'courier/otentikasi',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                if (page == 'cart'){ mess = "Please login to view your order"; }
                else if (page == 'wallet'){ mess = "Please login to view your wallet"; }
                else if (page == 'notif'){ mess = "Please login to view your notification"; }
                else if (page == 'order'){ mess = "Please login to view the order history page"; }
                else if (page == 'profil'){ mess = "Please login to view the profile page"; }
                else if (page == 'index'){ mess = "Please login to use this application"; }
                
                if (data.status == false){ 
                    toast(mess);
                    setTimeout(function(){ window.location = "login.html"; }, 3000);

                }
            },
            error: function (request, status, error) {
                toast('Request Failed Otentikasi Request...! - '+request.responseText);
                toast('Request Failed Otentikasi Status...! - '+error);
                toast('Request Failed Otentikasi Error...! - '+status);
                setTimeout(function(){ navigator.app.exitApp(); }, 1500);
            }
        })
        return false;

    }); // end document ready
}

function logout(){

    navigator.notification.confirm('Are you sure want to logout ?'
            , function(button) {
                if (button == 2 || button == 0) {
                    localStorage.removeItem("username");
                    localStorage.removeItem("userid");
                    localStorage.removeItem("log");
                    window.location = "login.html";
                }
            }
            , 'Logout ?'
            , ['No way', 'Logout']
    );
}

// ----------------------------- acl --------------------------------------------------------