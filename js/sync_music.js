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

function sendMusicId(port,playingId,playingType) {
    port.postMessage({playingId: playingId, playingType: playingType});
    port.onMessage.addListener(function (msg) {
        if (msg.status == 'recieved') {
            console.log('Send success! Playing ID : ' + msg.playingId + ' Type :' + msg.playingType);
        }
    });
}

(function listenDOMChange() {
    var playerStatus = document.querySelector('.ply.j-flag');
    var playingId;
    var playingType;
    var config = { attributes: true };
    var port = chrome.runtime.connect({name: "syncMusic"});

    var statusObserver = new MutationObserver(function (mutations) {
        //console.log(typeof mutations[mutations.length-1].target);
        //console.log('Status change to '+mutations[mutations.length-1].target.getAttribute('data-action'));
        if (mutations[mutations.length-1].target.getAttribute('data-action') == 'pause') {
            var href = document.querySelector('#g_player .f-thide').getAttribute('href');
            playingType = href.search('song')!=-1?18:17;        //匹配播放类型
            //console.log(playingType);
            playingId = href.match(/[1-9]\d*/g)[0];        //匹配id
            //console.log(playingId);
            sendMusicId(port, playingId, playingType);
            statusObserver.disconnect();
            setTimeout(function() {statusObserver.observe(playerStatus,config);},3000); //如果观察到pause，则停止观察3秒再重新观察，以避免重复
        }
    });

    statusObserver.observe(playerStatus,config);
})();