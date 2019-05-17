const container = require('rhea');

let connection;
let sender;
let receiver;
let publishInterval;

container.on('connection_open', function (context) {
  console.log('connection_open event');
  receiver = context.connection.open_receiver('examples');
  receiver.add_credit(3);

  context.connection.open_sender('examples');

  connection = context.connection;
});

container.on('message', function (context) {
  console.log('got: ', context.message.body);

  setTimeout(function(){
    context.delivery.accept();
    console.log('accepted:', context.message.body);
    receiver.add_credit(1);
  },10000);
});

container.once('sendable', function (context) {
  console.log('sendable event');

  sender = context.sender;

  let i = 0;
  publishInterval = setInterval(() => {
    i++;
    context.sender.send({body: i});
    console.log('message sent: ', i)
  }, 1000);
});

let amazonOpts = {
  host: 'b-d0161bb0-710d-4481-a386-ae36528464b6-1.mq.us-east-2.amazonaws.com',
  port: 5671,
  username: 'admin1',
  password: 'admin1admin2',
  transport: "ssl",
  reconnect: true,

  receiver_options: {
    credit_window: 0,
    autoaccept: false,
  }
};

let localOpts = {
  host: 'localhost',
  port: 5673,
  username: 'admin1',
  password: 'admin1',
  reconnect: true,

  receiver_options: {
    credit_window: 0,
    autoaccept: false,
  }
};

container.connect(localOpts);

function stopHandler() {
  console.log('stopHandler');
  if (connection) {
    console.log('close connection');
    connection.close();
    sender.close();
    receiver.close();
    clearInterval(publishInterval);
  }
}

process.on('SIGTERM', stopHandler);
process.on('SIGINT', stopHandler);