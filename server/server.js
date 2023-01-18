const io = require('socket.io')(5000)
const users = {};
io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)
  users[id] = id;

  const userList=Object.keys(users);
  // userList.forEach(user => {
  //   console.log(user);
  //   socket.broadcast.to(user).emit('update-list', {
  //     userList
  //   })
  
// })
  io.sockets.emit('broadcast', {userList})

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      
      
    
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
  socket.on('disconnect', function(){
    // remove saved socket from users object
    delete users[id];
    const userList=Object.keys(users);
    userList.forEach(user => {
      socket.broadcast.to(user).emit('update-list', {
        userList
      })
    })

  });
})