
get_start_order_detail();
function get_start_order_detail(){
    if (localStorage.userid != undefined && localStorage.log != undefined){
        $.get(api+"sales/get_sales_transaction_json/"+localStorage.sid+"/uid", function(data, status){
                var sales = data.content[0];
                var shipping = data.shipping[0];
                var trans = data.transaction;

                $("#ordercode").html(sales.code);
                $("#horder").val(sales.code);
                var amt = parseInt(sales.amount)+parseInt(sales.shipping);
                $("#gtotal").html(idr_format(amt));
                $("#total").html(idr_format(sales.amount));
                $("#shipping").html(idr_format(sales.shipping));
                $("#salespayment").html(sales.payment_type);

//                 //  get transaction details
                var con = "";
                for (i=0; i<trans.length; i++){                    
con = con+"<tr> <td>"+capitalizeFirstLetter(trans[i].product)+"</td> <td style=\"text-align:right;\"> "+idr_format(trans[i].amount)+"</td> </tr>";
                }

                $("#protable").html(con);
        });
    }
}

function finishorder(){
    
    var nilai = '{ "orderid":"'+$("#horder").val()+'" }';
    var mess = null;

        $.ajax({
            type: 'POST',
            url: api+'sales/confirmation_json',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                if (data.status == false){ 
                    toast(data.error);
                    setTimeout(function(){ window.location = "ongoing.html"; }, 3000);
                }else{
                    toast(data.error);
                    localStorage.removeItem("sid");
                    setTimeout(function(){ window.location = "index.html"; }, 3000);
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

}

