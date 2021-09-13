import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
