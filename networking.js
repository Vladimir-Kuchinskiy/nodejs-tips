process.stdout.write('\u001B[2J\u001B[0;0f');

const server = require('net').createServer();

let counter = 0;
let sockets = {};

function attachName(socket, data) {
  socket.name = data.toString().trim();
}

function attachId(socket) {
  socket.id = ++counter;
}

function saveConnection(socket) {
  sockets[socket.id] = socket;
}

function deleteConnection(socket) {
  delete sockets[socket.id];
}

function broadcastMessage(socket, data) {
  Object.entries(sockets).forEach(([key, cs]) => {
    if (key == socket.id) return;

    cs.write(`${socket.name} ${timestamp()}: `);
    cs.write(data);
  });
}

function timestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

server.on('connection', (socket) => {
  attachId(socket);

  console.log('Client connected');

  socket.write('Enter a name: ');

  socket.on('data', (data) => {
    if (!sockets[socket.id]) {
      attachName(socket, data);

      socket.write(`Welcome ${socket.name}!\n`);

      saveConnection(socket);

      return;
    }

    broadcastMessage(socket, data);
  });

  socket.on('end', () => {
    deleteConnection(socket);

    console.log('Client disconnected');
  });
});

server.listen(8000, () => {
  console.log('Server bound');
});
