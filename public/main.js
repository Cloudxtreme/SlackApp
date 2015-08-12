$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var userCount = $('#userCount');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    var updateUserCount = function(count) {
        userCount.text("Users in Chat: " + count);
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });

    socket.on('message', addMessage);

    socket.on('connected', function() {
        addMessage("User connected");
    });

    socket.on('disconnected', function() {
        addMessage("User disconnected");
    });
    
    socket.on('userCount', updateUserCount);
});