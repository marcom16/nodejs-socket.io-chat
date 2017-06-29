var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola', function (req, res) {
     res.status(200).send('Hola mundo');
});

var messages = [{
     id: 1,
     text: 'Bienbenido al chat privado',
     nickname: 'Bot'
}];

io.on('connection', function(socket) {
     console.log('El nodo:'+socket.handshake.address+' se ha conectado');

     socket.emit('messages', messages);

     socket.on('add-message', function(data){
          messages.push(data);

          io.sockets.emit('messages', messages);
     });

});

server.listen(6677, function() {
     console.log('el servidor esta funcionando en localhost:6677');
});
