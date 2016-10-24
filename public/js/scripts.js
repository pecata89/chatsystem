$(document).ready(function () {

    $('#createRoomModal').on('shown.bs.modal', function () {
        $('#roomName').focus();
    });

    $('#editRoomModal').on('shown.bs.modal', function () {
        $('#roomName').focus();
    });



    // SOCKET.IO FUNCTIONALITY

    var socket = io();

    // var messages = [];
    //
    // socket.on("chatMessage", function (message) {
    //     messages.push(message);
    // });

    var message = {};

    $("#messageForm").on("submit", function () {
        message = {
            message: $("#messageContent").val()
        };

        socket.emit("chatMessage", message);

        $("#messageContent").val("");

        $("#chatMessages").scrollTop($("#chatMessages")[0].scrollHeight);
        return false;
    });

    // var connectBlock = '<div class="alert alert-success">User ' + chatInformation.currentUser.username + ' connected</div>';
    // $("#chatMessages .messagesElement").append(connectBlock);


    // var disconnectBlock = '<div class="alert alert-danger">User ' + chatInformation.currentUser.username + ' disconnected</div>';
    // $("#chatMessages .messagesElement").append(disconnectBlock);



    socket.on("chatMessage", function(message) {
        if (message.message !== undefined) {
            if (String(message.room) == $("#currentRoomName").text()) {
                var messageBlock = '<table class="table bg-info table-condensed"><thead><tr><th><span class="glyphicon glyphicon-user">&nbsp;</span>' + message.user + '</th></tr></thead><tbody><tr><td><span class="glyphicon glyphicon-hand-right">&nbsp;</span>' + message.message + '</td></tr></tbody></table>';
                $("#chatMessages .messagesElement").append(messageBlock);

                $("#chatMessages").scrollTop($("#chatMessages")[0].scrollHeight);
            }
        } else {
            socket.removeListener("chatMessage");
        }

        $("#chatMessages").scrollTop($("#chatMessages")[0].scrollHeight);
    });



    // socket.on("chatMessage", function(message) {
    //     if (message.message !== undefined) {
    //         if (chatInformation.currentRoom.roomName == message.room) {
    //             var messageBlock = '<table class="table bg-info table-condensed"><thead><tr><th><span class="glyphicon glyphicon-user">&nbsp;</span>' + message.user + '</th></tr></thead><tbody><tr><td><span class="glyphicon glyphicon-hand-right">&nbsp;</span>' + message.message + '</td></tr></tbody></table>';
    //             $("#chatMessages .messagesElement").append(messageBlock);
    //
    //             $("#chatMessages").scrollTop($("#chatMessages")[0].scrollHeight);
    //         } else {
    //             socket.removeListener("chatMessage");
    //         }
    //     }
    // });
    //
    // $("#chatMessages").scrollTop($("#chatMessages")[0].scrollHeight);

    // socket.removeListener("chatMessage");

    // socket.on("broadcast" , function (broadcastedMessage) {
    //     console.log(broadcastedMessage);
    // })
    $("#chatMessages").scrollTop($("#chatMessages")[0].scrollHeight);
});