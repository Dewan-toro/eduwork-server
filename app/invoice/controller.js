const { subject } = require("@casl/ability");
const Invoice = require("./model");
const { policyFor } = require("../../utils");

const show = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    let subjectInvoice = subject("Invoice", {
      ...invoice,
      user_id: invoice.user._id,
    });

    if (!policy.can("read", subjectInvoice)) {
      return res.json({
        error: 1,
        message: "You're not allowed to view this invoice",
      });
    }

    let { order_id } = req.params;
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user");

    return res.json(invoice);
  } catch (error) {
    return res.json({
      error: 1,
      message: "Error when get invoice",
    });
  }
};

module.exports = {
  show,
};
