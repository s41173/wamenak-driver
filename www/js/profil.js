
profil();
function profil(){

    if (localStorage.userid != undefined && localStorage.log != undefined){
        $.get(api+"courier/details/"+localStorage.userid, function(data, status){
                
                var datax = data.content[0];
                console.log(datax);

                $("#name").html(capitalizeFirstLetter(datax.name));
                $("#ic").html(datax.ic);
                $("#phone").html(datax.phone);
                $("#email").html(datax.email);
                $("#address").html(datax.address);
                $("#proimage").attr("src",datax.image);
        });
    }else{
        setTimeout(function(){ window.location = "index.html"; }, 1000);
    }

}