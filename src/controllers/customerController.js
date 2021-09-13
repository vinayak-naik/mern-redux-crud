import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel";

const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({});
  res.json(customers);
});

const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, address, balance } = req.body;
  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    res.status(400);
    throw new Error("customer already exists");
  }

  const customer = await Customer.create({
    name,
    email,
    address,
    balance,
  });

  if (customer) {
    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      address: customer.address,
      balance: customer.balance,

    });
  } else {
    res.status(400);
    throw new Error("Invalid customer data");
  }
});

const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (customer) {
    res.json(customer)
  } else {
    res.status(404)
    throw new Error('customer not found')
  }
})

const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (customer) {
    await customer.remove()
    res.json({ message: 'customer removed' })
  } else {
    res.status(404)
    throw new Error('customer not found')
  }
})

const updateCustomer = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    balance
  } = req.body

  const customer = await Customer.findById(req.params.id)

  if (customer) {
    customer.name = name
    customer.address = address
    customer.balance = balance

    const updatedCustomer = await customer.save()
    res.json(updatedCustomer)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getCustomers, createCustomer, getCustomerById, deleteCustomer, updateCustomer };
