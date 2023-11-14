
/*function sendMail(params){

    var tempParams = {
        from_name : "client",
        to_name  : "wadi",
        message : "warning, dev tools has been opened from : " + mac + " for: " + details +" secondes"
    };
    emailjs.send('service_a92uzh9', 'template_uytzjdn', tempParams)
    .then(function(res){
        console.log("success", res.status);
    })

}*/



/*
(function () {
    'use strict';
    Object.getOwnPropertyNames(console).filter(function(property) {
        return typeof console[property] == 'function';
    }).forEach(function (verb) {
        console[verb] =function(){return 'Sorry, for security reasons...';};
    });
    window.addEventListener('devtools-opened', ()=>{
        // do some extra code if needed or ...
        // maybe even delete the page, I still like to add redirect just in case
        window.location.replace("#");
        window.document.head.innerHTML="";
        window.document.body.innerHTML="Warning... you will face legal consequences.";
        //sendMail();
    });
    window.addEventListener('devtools-closed', ()=>{
        // do some extra code if needed
    });
    let verifyConsole = () => {
        var before = new Date().getTime();
        debugger;
        var after = new Date().getTime();
        if (after - before > 100) { // user had to resume the script manually via opened dev tools 
            window.dispatchEvent(new Event('devtools-opened'));
            var details = after - before ; 

            function sendMail(params){
                var tempParams = {
                    from_name : "client",
                    to_name  : "wadi",
                    message : "warning, dev tools has been opened from : " + mac + " for: " + details +" secondes"
                };
                emailjs.send('service_a92uzh9', 'template_uytzjdn', tempParams)
                .then(function(res){
                    console.log("success", res.status);
                })
            }
            if (details > 15000){
                sendMail();
            }
            
            

            alert("you violated license termes.");
        }else{
            window.dispatchEvent(new Event('devtools-closed'));
        }


        setTimeout(verifyConsole, 100);
    }
    verifyConsole();        
})();

*/








if(!window.console) window.console = {};
var methods = ["log", "debug", "warn", "info", "dir", "dirxml", "trace", "profile"];
for(var i=0;i<methods.length;i++){
    console[methods[i]] = function(){};
}

const noContext1 = document.getElementById('side-bar');

noContext1.addEventListener('contextmenu', (e) => {
  e.preventDefault();

});
$(window).on("contextmenu",function(e){        
   e.preventDefault();

});

$('body').keydown(function(e) {
        if(e.which==123){
            e.preventDefault();
            for (var i = 0; i < Infinity; i++) {

              alert('YOU ARE NOT ALLOWED');
}
            
            
        }
        if(e.ctrlKey && e.shiftKey && e.which == 73){
            e.preventDefault();
                        for (var i = 0; i < Infinity; i++) {

              alert('YOU ARE NOT ALLOWED');
}
        }
        if(e.ctrlKey && e.shiftKey && e.which == 75){
            e.preventDefault();
                        for (var i = 0; i < Infinity; i++) {

              alert('YOU ARE NOT ALLOWED');
}
        }
        if(e.ctrlKey && e.shiftKey && e.which == 67){
            e.preventDefault();
                        for (var i = 0; i < Infinity; i++) {

              alert('YOU ARE NOT ALLOWED');
}
        }
        if(e.ctrlKey && e.shiftKey && e.which == 74){
            e.preventDefault();
                        for (var i = 0; i < Infinity; i++) {

              alert('YOU ARE NOT ALLOWED');
}
        }
    });

