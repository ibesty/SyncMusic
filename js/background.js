chrome.runtime.onConnect.addListener(function(port){
    if (port.name == 'syncMusic') {
        port.onMessage.addListener(function(msg){
            if (msg.playingId) {
                console.log('Recieved Playing ID : '+ msg.playingId);
                port.postMessage({status: 'recieved',playingId: msg.playingId});
            }
        });
    }
});