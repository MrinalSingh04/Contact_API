import { Contact } from "../models/contact.js";

//get all contacts
export const getAllContact = async (req, res) => {
  const contacts = await Contact.find();
  if (!contacts)
    return res.status(404).json({ msg: "No contact found", contacts });
  res.json({ msg: "Contact fetched", contacts });
};

//get specific contact
export const getContactById = async (req, res) => {
  const Id = req.params.id;

  const userContact = await Contact.findById(Id);
  if (!userContact)
    return res.status(404).json({ msg: "NO contact found", userContact });
  res.json({ msg: "Contact fetched", userContact });
};

//get new contact
export const addContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (name == " " || email == " " || phone == " " || type == " ")
    return res.status(404).json({ msg: "All fields are required" });

  const saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user,
  });

  res.json({ msg: "Contacts saved successfully...!", saveContact });
};

//update contact
export const updateContactById = async (req, res) => {
  const Id = req.params.id;
  const { name, email, phone, type } = req.body;
  const updateContact = await Contact.findByIdAndUpdate(
    Id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true }
  );

  if (!updateContact) return res.status(404).json({ msg: "No contact found" });

  res.json({ msg: "Contact updated successfully", updateContact });
};

//delete contact
export const deleteContactById = async (req, res) => {
  const Id = req.params.id;
  const deleteContact = await Contact.findByIdAndDelete(Id);

  if (!deleteContact) return res.status(404).json({ msg: "No contact found" });
  res.json({ msg: "Contact deleted successfully", deleteContact });
};

//get contact by userId
export const getContactByUserId = async (req, res) => {
  const Id = req.params.id;
  let contact = await Contact.find({ user: Id });

  if (!contact) return res.status(404).json({ msg: "Contact not found" });

  res.json({ msg: "User specific contact", contact });
};
