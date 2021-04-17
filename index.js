const port = process.env.PORT || 4000;
const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(port, function(){
    console.log(`listening for requests on port ${port}`);
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
