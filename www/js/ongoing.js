
get_ongoing_order_detail();
function get_ongoing_order_detail(){
    if (localStorage.userid != undefined && localStorage.log != undefined && localStorage.sid != undefined){
        $.get(api+"sales/get_sales_transaction_json/"+localStorage.sid+"/uid", function(data, status){
                var sales = data.content[0];
                var shipping = data.shipping[0];

                $("#ordercode").html(sales.code);
                $("#orderdate").html(sales.dates);
                $("#ordercustomer").html(sales.customer);
                
                $("#orderaddress").html(shipping.destination);
                var amt = parseInt(sales.amount)+parseInt(sales.shipping);
                $("#salestotal").html(idr_format(amt));
                $("#salespayment").html(sales.payment_type);
        });
    }else{
        setTimeout(function(){ window.location = "index.html"; }, 1000);
    }
}