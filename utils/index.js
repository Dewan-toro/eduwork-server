const { AbilityBuilder } = require("@casl/ability");

function getToken(req) {
  let token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer", "")
    : null;
  return token && token.length ? token : null;
}

const policies = {
  guest(user, { can }) {
    can("read", "Product");
  },
  user(user, { can }) {
    can("view", "Order");
    can("create", "Order");
    can("read", "Order", { user_id: user.user_id });
    can("update", "User", { user_id: user.user_id });
    can("read", "Cart", { user_id: user.user_id });
    can("update", "Cart", { user_id: user.user_id });
    can("view", "DeliverAddress");
    can("create", "DeliverAddress", { user_id: user.user_id });
    can("update", "DeliverAddress", { user_id: user.user_id });
    can("delete", "DeliverAddress", { user_id: user.user_id });
    can("read", "Invoice", { user_id: user.user_id });
  },
  admin(user, { can }) {
    can("manage", "all");
  },
};

const policyFor = (user) => {
  let builder = new AbilityBuilder();
  if (user && typeof policies[user.role] === "function") {
    policies[user.role](user, builder);
  } else {
    policies["guest"](user, builder);
  }
  return new Ability(builder.rules);
};

module.exports = { getToken, policyFor };
