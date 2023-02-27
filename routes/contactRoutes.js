const express = require("express");
const contactRoutes = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

contactRoutes.use(validateToken)

contactRoutes.route("/").get(getContacts).post(createContact);

contactRoutes.route("/:id").put(updateContact).delete(deleteContact);

module.exports = contactRoutes;
