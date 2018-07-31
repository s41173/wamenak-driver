
get_start_order_detail();
function get_start_order_detail(){
    if (localStorage.userid != undefined && localStorage.log != undefined){
        $.get(api+"sales/get_sales_transaction_json/"+localStorage.sid+"/uid", function(data, status){
                var sales = data.content[0];
                var shipping = data.shipping[0];
                var trans = data.transaction;

                $("#ordercode").html(sales.code);
                $("#ordercustomer").html(sales.customer);

                //  get transaction details
                var con = "";
                for (i=0; i<trans.length; i++){                    
con = con+"<tr> <td>"+capitalizeFirstLetter(trans[i].product)+"</td> <td>x "+trans[i].qty+"</td> </tr>";
                }

                $("#protable").html(con);
                $("#orderaddress").html(shipping.destination);

                var bodyId = document.body.id;
                if (bodyId == 'orderstart'){
                    var cor = shipping.coordinate.split(',');
                    initialize_map(parseFloat(cor[0]),parseFloat(cor[1]));
                    // $("#bnavigate").href = "geo:"+cor[0]+","+cor[1];
                    a = document.getElementById("bnavigate");
                    a.setAttribute("href", "geo:"+cor[0]+","+cor[1]);
                }
        });
    }
}

