document.addEventListener('deviceready', function () {


  // location
// onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    function onSuccess(position) {
      // var element = document.getElementById('geolocation');
      // element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
      //                     'Longitude: ' + position.coords.longitude     + '<br />' +
      //                     '<hr />'      + element.innerHTML;
      if (localStorage.userid != undefined){

        var coor = position.coords.latitude+','+position.coords.longitude;
        var nilai = '{ "userid":"'+localStorage.userid+'", "coordinate":"'+coor+'" }';
  
        $.ajax({
            type: 'POST',
            url: api+'courier/post_loc',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
              if (data.status == true){ /*toast("Location updated");*/ }else{ toast(data.error); }
            },
            error: function (request, status, error) {
              toast('Send Location Error'+error);
            }
        })
        return false;

      }
  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  // Options: throw an error if no update is received every 30 seconds.
  //
  navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
  // var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
  // location

  // onesignal
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
  .startInit("95b026cd-a68a-42e4-bcb3-63d5bd93f341")
  .handleNotificationOpened(notificationOpenedCallback)
  .endInit();

  window.plugins.OneSignal.getPermissionSubscriptionState(function(status) {
    idapp = status.subscriptionStatus.userId;
    if (idapp != null){ localStorage.setItem("device", idapp); }
  });

  // onesignal
   
var lastTimeBackPress=0;
var timePeriodToExit=2000;

  document.addEventListener("backbutton", function(e){
    
   var bodyId = document.body.id;   
   if(bodyId == 'index'){
     
       e.preventDefault();
       e.stopPropagation();

       if(new Date().getTime() - lastTimeBackPress < timePeriodToExit){
        navigator.app.exitApp();
       }else{
            toast("Press again to exit");
            lastTimeBackPress=new Date().getTime();
        }
        return false;
   }
   else if (bodyId == 'register'){ window.location.href = "index.html";  }
   else {
       navigator.app.backHistory()
   }
      
  }, false);
  
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);