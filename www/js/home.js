
setTimeout(function(){ sleep(1); }, 10000);
function sleep(val){
    if (val == 1){ 
      window.plugins.insomnia.keepAwake(); 
      toast('Screen Light On'); }else{
      window.plugins.insomnia.allowSleepAgain(); 
      toast('Screen Light Off');
    }
}