$(document).ready(function() {
    var socket = io();
    var messageBodyInput = $('#messageBody');
    var userNameInput = $('#userName');
    var messages = $('#messages');
    var userCount = $('#userCount');

    var addMessage = function(message) {
        if (!message.userName) {
            message.userName = "unknown";
        }

        messages.append('<div><b>' + message.userName + '</b>' + ": " + message.body + '</div>');
    };

    var addConnectMesage = function(message) {
        messages.append('<div style="color: red">' + message + '</div>');
    };

    var updateUserCount = function(count) {
        userCount.text("Users in Chat: " + count);
    };

    messageBodyInput.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var body = messageBodyInput.val();
        var userName = userNameInput.val();
        addMessage({body: body, userName: userName});
        socket.emit('message', {body: body, userName: userName});
        messageBodyInput.val('');
    });

    socket.on('message', addMessage);

    socket.on('connected', function() {
        addConnectMesage("User connected");
    });

    socket.on('disconnected', function() {
        addConnectMesage("User disconnected");
    });
    
    socket.on('userCount', updateUserCount);
});