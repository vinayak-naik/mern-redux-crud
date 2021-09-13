import express from "express";
const router = express.Router();
import {
  getCustomers,
  createCustomer,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
} from "../controllers/customerController";
import { protect, admin } from "../middleware/authMiddleware";

router.route("/").get(getCustomers).post(createCustomer);
router
  .route("/:id")
  .get(getCustomerById)
  .delete(deleteCustomer)
  .put(updateCustomer);

export default router;
