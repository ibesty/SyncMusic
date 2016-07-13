
function submit() {
    var id = document.getElementById('id').value;
    if (id) {
        chrome.tabs.executeScript(null,
            { code: "playOnClient(" + id + ")" });
    }
}

var btn = document.getElementById('submit_id');
btn.addEventListener('click', submit, false);