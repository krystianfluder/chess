exports.BACKEND_URL = process.env.BACKEND_URL
  ? `${process.env.BACKEND_URL}/v1`
  : "http://localhost:8080/v1";
