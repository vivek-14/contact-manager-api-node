const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Contact Name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email address']
    },
    phone: {
        type: String,
        required: [true, 'Please Enter Contact Number']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema)