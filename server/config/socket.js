let io;

exports.init = (httpServer) => {
  io = require("socket.io")(httpServer);
  io.on("connect", () => {
    console.log("connected");
  });
  return io;
};

exports.get = () => {
  if (!io) throw Error("Socket.io not initialized");
  return io;
};
