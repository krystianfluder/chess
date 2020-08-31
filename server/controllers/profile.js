const User = require("../models/user");

exports.getProfile = async (req, res, next) => {
  const profile = await User.findById(req.userId).select("email").lean();

  res.json({
    message: "Profile",
    profile,
  });
};
