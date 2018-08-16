
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

                var cor = shipping.coordinate.split(',');
                setTimeout(function(){ initialize_map(parseFloat(cor[0]),parseFloat(cor[1])); 
                a = document.getElementById("bnavigate");
                $("#hcoor").val(cor[0]+","+cor[1]);
                }, 3000);

        });
    }
}

// ====================== map ========================================
    
function initialize_map(lat,long) {
    
    var myLatlng = new google.maps.LatLng(lat,long);
    var myOptions = {
        zoom: 17,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
    var myLatlng = new google.maps.LatLng(lat,long);
        
    var markerOptions = {
        map: map,
        position: myLatlng		
    };
    marker_0 = createMarker_map(markerOptions);
    
    marker_0.set();
    
    google.maps.event.addListener(marker_0, "click", function(event) {
        iw_map.setContent(this.get("content"));
        iw_map.open(map, this);

});

}

function createMarker_map(markerOptions) {
    var marker = new google.maps.Marker(markerOptions);
    markers_map.push(marker);
    lat_longs_map.push(marker.getPosition());
    return marker;
}

function navigate(){
    var coor = $("#hcoor").val();
    window.open("google.navigation:q="+coor+"&mode=d" , '_system'); 
}
