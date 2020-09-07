const { app } = require("./app");
const db = require("./config/db");
const io = require("./config/socket");

const PORT = process.env.PORT || 8080;

const start = async () => {
  // init mongo db
  await db.init();
  // init www server
  const server = app.listen(PORT);
  // init websockets
  io.init(server);

  console.log(`Listening`);
};

start();
