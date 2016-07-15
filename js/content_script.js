var s = document.createElement('script');
var jq = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('js/sync_music.js');
jq.src = chrome.extension.getURL('js/jquery-3.0.0.min.js');
var frame = $(window.frames['contentFrame'].document).find('body');
$(frame[0]).append(jq);
$(frame[0]).append(s);