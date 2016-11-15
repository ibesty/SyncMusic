var playingId;
var playingType;
chrome.runtime.onConnect.addListener(function(port){
    if (port.name == 'syncMusic') {
        port.onMessage.addListener(function(msg){
            if (!!msg.playingId) {
                playingId = msg.playingId;
                playingType = msg.playingType;
                console.log('Recieved Playing ID : ' + playingId + ' Type :' + playingType);
                port.postMessage({status: 'recieved', playingId: playingId, playingType: playingType});
            }
        });
    }
});