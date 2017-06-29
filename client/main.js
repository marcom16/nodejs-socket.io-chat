var socket = io.connect('http://192.168.0.101:6677', {'forceNew':true});

socket.on('messages', function(data){
     console.log(data);
     render(data);
});

function render(data) {
     var html = data.map(function(message, index) {
          return (`
               <div class="message">
                    <b>${message.nickname}</b> dice:
                    <p>${message.text}</p>
               </div>
          `)
     }).join(' ');

     var div_msgs = $('#messages')
     div_msgs.html(html)
     div_msgs.scrollTop(div_msgs.height())
}

function addMessage(e){
     var message = {
          nickname: $('#nickname').val(),
          text: $('#text').val()
     }

     $('#nickname').css({'display': 'none'});
     socket.emit('add-message', message);
     return false;
     console.log(e);
}
