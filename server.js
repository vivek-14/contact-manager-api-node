const express = require("express");
const connectDb = require("./config/database.js");
const errorHandler = require("./middleware/errorHandler.js");
const dotenv = require("dotenv").config();

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send(`Server is running on ${port}`);
});

// Json body parser to read request body
app.use(express.json());

// Contacts
app.use("/api/contacts", require("./routes/contactRoutes"));

// Users
app.use("/api/users", require("./routes/usersRoutes"));

// Middleware
app.use(errorHandler);

app.listen(port, () => {
	console.log("server is running on port 5000");
});