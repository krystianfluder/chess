exports.BACKEND_URL = process.env.BACKEND_URL
  ? `${process.env.BACKEND_URL}/v1`
  : "https://project-chess.herokuapp.com/v1";
