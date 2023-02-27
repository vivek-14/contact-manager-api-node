const expressAsyncHandler = require("express-async-handler");
const Contact = require('../models/contacts')
// @desc Get all Contacts
// @route GET /api/contacts
// @access private

const getContacts = expressAsyncHandler ( async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

// @desc Create Contact
// @route POST /api/contacts
// @access private

const createContact = expressAsyncHandler ( async (req, res) => {
    const {name, email, phone} = req.body;
    if (!name, !email, !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const createContact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(200).json({ message: "Create Contact", createdContact: createContact });
});


// @desc Update Contact
// @route PUT /api/contacts/:id
// @access private

const updateContact = expressAsyncHandler ( async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403).json({ message: "This contact is not editable through this user access" })
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true} 
    );
    res.status(200).json({ message: `Update Contact for ${req.params.id}`, newContactInfo: updatedContact});
});

// @desc Delete Contact
// @route DELETE /api/contacts/:id
// @access private

const deleteContact = expressAsyncHandler ( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403).json({ message: "This contact is not editable through this user access" })
    }

    await Contact.deleteOne({ _id: req.params._id });

    res.status(200).json({ message: `Deleted Contact for ${contact}` });
});

// @desc Get Contact By Id
// @route GET /api/contacts/:id
// @access private

const getContact = expressAsyncHandler ( async (req, res) => {
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ message: `Get Contact for ${req.params.id}`, contactInfo: contacts});
});

module.exports =  { getContacts, createContact, updateContact, deleteContact };