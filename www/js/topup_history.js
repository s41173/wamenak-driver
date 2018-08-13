var start = 0;
var limit = 4;
var reachedMax = false;

get_order();

$(window).scroll(function(){    
    if ($(window).scrollTop() == $(document).height() - $(window).height()){
        get_order();
    }
});

function get_order(){
       
    $(document).ready(function (e) {   
        
        if (reachedMax)
            return;

        $.ajax({
            type: 'GET',
            url: api+'topup/get_by_courier/'+localStorage.userid+'/'+limit+'/'+start,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var con = "";
if (data.content != null && data.content != 'reachedMax'){

                for (i=0; i<data.content.length; i++){
                    var datax = data.content;
con = con+
"<div class=\"rw\">"+
"<div class=\"container-fluid\">"+
    "<span class=\"date\">"+datax[i].dates+", "+datax[i].time+" </span>"+
    "<hr style=\"margin: 0;padding: 3px 0;\">"+

    "<div class=\"col-xs-6\" style=\"padding: 0\">"+
        "<h5 style=\"font-weight: bold;\"> "+datax[i].code+" </h5>"+
        "<span> "+datax[i].customer+" </span>"+
        "<br>"+
        "<span class=\"balance2\">Rp "+datax[i].amount+",-</span>"+
    "</div>"+
    "<div class=\"col-xs-6\" style=\"padding: 0\">"+
        "<h4 style=\"font-weight: bold;text-align: center;padding-top: 15px;\"> "+datax[i].redeem+" </h4>"+
    "</div>"+
"</div>"+
"</div> <br>";
                
                } // end looping
                start += limit;
                $("#transbox").append(con);
}else{ reachedMax = true; }

            },
            error: function (request, status, error) {
                console.log('Request Failed...!'+error);
            }
        })
        return false;
                
    });  // end document ready	    
}