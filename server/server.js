const { app } = require("./app");
const db = require("./config/db");
const io = require("./config/socket");

const start = async () => {
  // init mongo db
  await db.init();
  // init www server
  const server = app.listen(process.env.SERVER_PORT);
  // init websockets
  io.init(server);

  console.log(
    `Listening ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
  );
};

start();
