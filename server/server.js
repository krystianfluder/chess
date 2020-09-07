const { app } = require("./app");
const db = require("./config/db");
const io = require("./config/socket");

const start = async () => {
  // init mongo db
  await db.init();
  // init www server
  const server = app.listen(
    process.env.SERVER_PORT ? process.env.SERVER_PORT : 80
  );
  // init websockets
  io.init(server);

  console.log(`Listening`);
};

start();
