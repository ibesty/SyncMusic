function playOnClient(id, type) {       //id为资源id，type为资源类型，17为program电台节目，18为song自有资源
    var playArea = $('#sync-music');
    var position = window.frames['contentFrame'].document.body;
    if (playArea === null) {
        playArea = document.createElement('span');      //构造可点击对象，模拟播放按钮点击
        playArea.id = 'sync-music';
        playArea.setAttribute('data-res-id', id);
        playArea.setAttribute('data-res-type', type);
        playArea.setAttribute('data-res-action', 'play');
    }
    else {
        playArea.setAttribute('data-res-type', type);
        playArea.setAttribute('data-res-id', id);
    }
    position.appendChild(playArea);
    playArea.click();
}

function sendMusicId(port,playingId) {
    port.postMessage({playingId: playingId});
    port.onMessage.addListener(function (msg) {
        if (msg.status == 'recieved') {
            console.log('Send success! Playing ID : ' +msg.playingId);
        }
    });
}

(function listenDOMChange() {
    var playerStatus = $('#g_player .ply.j-flag')[0];
    var playingId;
    var config = { attributes: true };
    var port = chrome.runtime.connect({name: "syncMusic"});

    var statusObserver = new MutationObserver(function (mutations) {
        //console.log(mutations.length);
        //console.log('Status change to '+mutations[mutations.length-1].target.getAttribute('data-action'));
        if (mutations[mutations.length-1].target.getAttribute('data-action') == 'pause') {
            playingId = $('#g_player .f-thide.name.fc1.f-fl')[0].getAttribute('href').substr(9);
            console.log(playingId);
            sendMusicId(port,playingId);
            statusObserver.disconnect();
            setTimeout(function() {statusObserver.observe(playerStatus,config);},3000); //如果观察到pause，则停止观察3秒再重新观察，以避免重复
        }
    });

    statusObserver.observe(playerStatus,config);
})();