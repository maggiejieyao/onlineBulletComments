<?php  
  
//Build websocket server object，monitor local host(9502) 
$ws = new swoole_websocket_server("127.0.0.1",9502);  
  
//monitor WebSocket connection  
$ws->on('open', function ($ws, $request) {  
    var_dump($request->fd, $request->get, $request->server);  
    $ws->push($request->fd, '{"data":"socket server connected"}');  
});  
  
//monintor WebSocket message  
$ws->on('message', function ($ws, $frame) {  
    //echo "Message: {$frame->data}\n";  
    echo "<pre>";  
    print_r($frame);  
  
    //Foreach connection, get the data
    foreach($ws->connections as $fd){  
        $ws->push($fd, "{$frame->data}");  
    }  
    //$ws->push($frame->fd, "{$frame->data}");  
});  
  
//monitor WebSocket connection, and close it 
$ws->on('close', function ($ws, $fd) {  
    echo "client-{$fd} is closed\n";  
});  
  
$ws->start();  
  
?>  