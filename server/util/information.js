const useragent = require("useragent");

exports.getIpAndAgent = (req) => {
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const agent = { ...useragent.parse(req.headers["user-agent"]) };
  return [ip, agent];
};
