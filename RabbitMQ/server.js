const amqp = require('amqplib');



amqp.connect('amqp://localhost')
  .then((connection) => connection.createChannel())
  .then((channel) => {
    channel.assertExchange('direct_exchange', 'direct', { durable: false });
    channel.assertQueue('chat_messages', { durable: false });
    channel.bindQueue('chat_messages', 'direct_exchange', 'chat');
  })
  .catch((error) => {
    console.error('Error connecting to RabbitMQ', error);
  });


  app.post('/message', (req, res) => {
    const message = req.body.message;
  
    // Publish the message to RabbitMQ
    channel.publish('direct_exchange', 'chat', Buffer.from(message));
  
    res.sendStatus(200);
  });

io.on('connection', (socket) => {
  console.log('A user connected');

  // Consume messages from RabbitMQ
  channel.consume('chat_messages', (message) => {
    socket.emit('new_message', message.content.toString());
  }, { noAck: true });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});