const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;
