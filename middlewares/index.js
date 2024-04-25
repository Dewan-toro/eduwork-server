const { getToken } = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../app/config");
const User = require("../app/user/model");
const policyFor = require("../utils");

function decodeToken() {
  return async (req, res, next) => {
    try {
      const token = getToken(req);
      if (!token) return next();

      req.user = jwt.verify(token, config.secretkey);

      let user = await User.findOne({ token: { $in: { token } } });

      if (!user) {
        return res.json({ message: "Token is Expired" });
      }
    } catch (error) {
      if (error && error.name === "JsonWebTokenError") {
        return res.json({ message: error.message });
      }

      next();
    }
    return next();
  };
}

function police_check(action, subject) {
  return function (req, res, next) {
    let policy = policyFor(req.user);
    if (!policy.can(action, subject)) {
      return res.json({
        error: 1,
        message: `You are not allowed to ${action} ${subject}`,
      });
    }
    next();
  };
}

module.exports = {
  decodeToken,
  police_check,
};
