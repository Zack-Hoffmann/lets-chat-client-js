jQuery(function ($) {
    $("#chat-form").on('submit', function () {
        var ws = new WebSocket("ws://localhost:1234/chat");
        ws.onerror = function (event) {
            console.log(event);
        };
        ws.onmessage = function (sMsg) {
            var msg = JSON.parse(sMsg.data);
            $("#chat-box").append(msg.body + "\n");
        };
        ws.onopen = function () {
            var msg = {};
            $('#chat-form input').not(":input[type=submit]").each(function (i, e) {
                msg[e.getAttribute("name")] = e.value;
            });
            ws.send(JSON.stringify(msg));
        };
    });
});