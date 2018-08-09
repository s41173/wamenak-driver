var start = 0;
var limit = 3;
var reachedMax = false;

get_order();

$(window).scroll(function(){    
    if ($(window).scrollTop() == $(document).height() - $(window).height()){
        get_order();
    }
});

function get_order(){
       
    $(document).ready(function (e) {   
        
        var nilai = '{ "courier":"'+localStorage.userid+'", "limit":"'+limit+'", "start":"'+start+'" }';
        
        if (reachedMax)
            return;

        $.ajax({
            type: 'POST',
            url: api+'sales/get_sales_by_courier_json',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var con = "";
                var total = 0;
if (data.content != null && data.content != 'reachedMax'){

                for (i=0; i<data.content.length; i++){
                    var datax = data.content;
                    total = parseInt(datax[i].total)+parseInt(datax[i].shipping);

con = con+
"<div class=\"rw\">"+
"<div class=\"container-fluid\">"+
    "<span class=\"ff2\" style=\"padding-right: 25px;\">"+datax[i].code+"</span>"+
    "<span class=\"date\">"+datax[i].dates+"</span>"+
    "<hr style=\"margin: 0;padding: 3px 0;\">"+

    "<div class=\"col-xs-3\" style=\"padding: 0\">"+
        "<img src=\"img/location.png\" width=\"50\" class=\"img-responsive\" style=\"margin-top: 20px;\">"+
    "</div>"+

    "<div class=\"col-xs-9\" style=\"padding: 0\">"+
        "<h5 style=\"font-weight: bold;\">"+datax[i].customer+"</h5>"+
        "<span style=\"font-size: 10px;\">"+datax[i].destination+"</span>"+
    "</div>"+
    "<div class=\"col-xs-12 mtop\" style=\"padding: 0;\">"+
        "<span>Total : <b>Rp "+idr_format(datax[i].amount)+"</b></span> &nbsp; "+
        "<small>Delivery : Rp "+idr_format(datax[i].shipping)+" </small> <br>"+
        "<span class=\"ff2\">"+datax[i].payment_type+"</span>"+
    "</div>"+
"</div>"+
"</div> <br>";
                
                } // end looping
                start += limit;
                $("#successbox").append(con);
}else{ reachedMaxs = true; }

            },
            error: function (request, status, error) {
                console.log('Request Failed...!'+error);
            }
        })
        return false;
                
    });  // end document ready	    
}