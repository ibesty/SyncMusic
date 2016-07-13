function playOnClient(id) {
    var playArea = $('#sync-music');
    var position = $(window.frames['contentFrame'].document).find('body');
    if (playArea !== null) {
        playArea = document.createElement('span');
        playArea.id = 'sync-music';
        playArea.setAttribute('data-res-id', id);
        playArea.setAttribute('data-res-type', '18');
        playArea.setAttribute('data-res-action', 'play');
    }
    else {
        playArea.setAttribute('data-res-id', id);
    }
    position[0].appendChild(playArea);
    playArea.click();
}