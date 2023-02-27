const expressAsyncHandler = require("express-async-handler");
const User = require('../models/users')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Get user by id
// @route GET /api/user/current
// @access private

const getCurrentUser = expressAsyncHandler ( async (req, res) => {
    res.status(200).json(req.user);
});

// @desc Create new user
// @route POST /api/user/register
// @access public

const createUser = expressAsyncHandler ( async (req, res) => {
    
   // Bro forgot Something? 
    const {first_name, last_name, email, password} = req.body;
    if (!first_name || !email || !password) {
        res.status(400).json({ message:  'Oops! looks like you missed one.'});
    } 

    // Dupes are not allowed
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400).json({ message:  'Email already exists!'});
    }

    // Need some security?
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Finally you are good to go
    const user = await User.create({
        first_name,
        last_name: last_name ? last_name : null, 
        email,
        password: passwordHash
    });

    // For the DevOps logs
    console.log(`User Created: ${user._id}`);

    // Yey! Registration is Finished successfully 
    res.status(200).json({ message: "Created Users", createdUser: user });
});


// @desc Authenticate user
// @route POST /api/user/login
// @access public

const authenticateUser = expressAsyncHandler ( async (req, res) => {
    
    // Not so fast
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message:  'Oops! looks like you missed one'});
    }

    // Lest's see if you are on the system.
    const userAvailable = await User.findOne({ email });
    if (userAvailable && bcrypt.compare(password, userAvailable.password)) {
        const accessToken = jwt.sign({
            user: {
                first_name: userAvailable.first_name,
                email: userAvailable.email,
                id: userAvailable._id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({ message: 'Wrong credentials' });
    }
});

module.exports = { getCurrentUser, createUser, authenticateUser };
