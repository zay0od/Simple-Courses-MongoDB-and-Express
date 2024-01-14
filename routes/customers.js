const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Customer } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.send(customer);
});

router.post("/", async (req, res) => {
  const schema = {
    isGold: Joi.boolean().required(),
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  customer = await customer.save();
  return res.status(200).send(customer);
});

router.put("/:id", async (req, res) => {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(3),
    phone: Joi.string().min(3),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //[2] Find and Update By DB
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer) return res.status(404).send("Customer Not Found");

  return res.status(200).send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("Customer Not Found");
  res.send(customer);
});

//Export the Routes
module.exports = router;
