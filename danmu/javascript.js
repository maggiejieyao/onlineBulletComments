function myFunction() {
   var x = document.getElementById("pdf_content").data;
   var ch = checkFileInput();
   if(ch == true){
       document.getElementById("pdf_content").data = getFilePath();
       displayFile('pdf_content');
   }else{
       alert("Please enter your PDF file.");
   }
   //alert(getFilePath());
}
function checkFileInput(){
    var check = false;
    if(document.getElementById("fileName").value!=null){
        check = true;
    }
    return check;

}
function getFilePath(){
    var fullPath = document.getElementById("fileName").value;
    var simpleFN = fullPath.split(/(\\|\/)/g).pop();

    return simpleFN;
}
function displayFile(el){
    var elems =document.getElementById(el);
//    for (var i=0;i<elems.length;i+=1){
//        if(elems[i].style.display == 'block'){
//            elems[i].style.display = 'none';
//        }else{
//            elems[i].style.display = 'block'
//        }
//    }
    elems.style.display = 'block';

    return;
}  
var DmClass = {  
    "Dm_H":0, //height of Danmu area 
    "Dm_W":0,//Weight of Danmu area  
    "DmObj":"",//Dabmu object

    //initialization 
    init :  function(){  
        var _this  = this;  

        _this.DmObj = $(".dmArea");  
        _this.Dm_H = _this.DmObj.height();  
        _this.Dm_W = _this.DmObj.width();  

        //Send danmu  
        _this.sendToDmFunc();  
    },  

    sendToDmFunc    :       function(){  
        var _this = this;  

        $(".sendToDm").click(function(){  


            var sendCon = $('input[name="dm_con"]').val();  
            if($.trim(sendCon) == "") {  
                var testList = ["hello world!","hello","Great presetation","what are you talking about！！","lol"];  
                var _s = Math.floor(Math.random()*5);  
                sendCon = testList[_s];  
                //return false;  
            }  

            //json file format 
            var sData = '{"data":"'+sendCon+'"}';  
            //send to websocket server  
            SocketClass.websocket.send(sData);  



        });  
    },  

    // Add danmu data got from server
    addToDm :   function(rdata){  
        var _this = this;  

        //json to obejct  
        var newObj = eval('(' + rdata + ')');  

        //make a new object  
        var newDom = $("<span></span>");  

        //get a random location  
        var p = _this.randPosition();  

        //put the danmu in it  
        newDom.html(newObj.data);  
        _this.DmObj.append(newDom);  

        //set the initialized location to the right of danmu area  
        newDom.css({"left":_this.Dm_W+"px","top":p+"px"});  


        //Current danmu location  
        var tR = _this.Dm_W;  
        //Timer(20 msec）  
        var newTimer = setInterval(function(){  

            tR -= 2;  

            //Delete the danmu when out of the danmu, delte it and delte the timer 
            if(tR <= -newDom.width()){  
                newDom.remove();  
                clearInterval(newTimer);  
            }  
            //new location  
            newDom.css("left",tR+"px");  
        },20);  

    },  

    //Get the random location  
    randPosition    :   function(){  
        var _this = this;  
        var rn = Math.floor(Math.random()*(_this.Dm_H - 20));  
        return rn;  
    },  

}  

//sockey server  
var SocketClass = {  
    "wsServer":"ws://127.0.0.1:9502", //server location 
    "websocket":"", //socket object  
    init    :   function(){  
        var _this = this;  

        //connect to docket  
        _this.socketServerInit();  
    },  

    socketServerInit    :   function(){  
        var _this = this;  
        _this.websocket = new WebSocket(_this.wsServer);  

        //Connect to socket  
        _this.websocket.onopen = function (evt) {  
            console.log("Connected to WebSocket server.");  
        };  

        //close the socket server  
        _this.websocket.onclose = function (evt) {  
            alert("socket server closed");  
            console.log("Disconnected");  
        };  

        //get the data sent from socket server
        _this.websocket.onmessage = function (evt) {  
            console.log('Retrieved data from server: ' + evt.data);  

            //Put the danmu to addToDm method, to add it to the danmu area  
            DmClass.addToDm(evt.data);  
        };  

        //connect false 
        _this.websocket.onerror = function (evt, e) {  
            console.log('Error occured: ' + evt.data);  
        };  
    },  


}  

//init   
$(function(){  
    DmClass.init();  
    SocketClass.init();  
});  

