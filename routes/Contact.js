import express from "express";
import {
  addContact,
  deleteContactById,
  getAllContact,
  getContactById,
  updateContactById,
  getContactByUserId,
} from "../controllers/Contact.js";

import { authenticate } from "../middlewares/Auth.js";

const router = express.Router();

//get all contact
router.get("/", getAllContact);

//get contact by id
router.get("/:id", getContactById);

//add new contact
router.post("/add", authenticate, addContact);

//update contact
router.put("/:id", authenticate, updateContactById);

//delete contact
router.delete("/:id", authenticate, deleteContactById);

//contact by userId
router.get("/userid/:id", getContactByUserId);

export default router;
