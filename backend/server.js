const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const config = require('./config/config');
const connectDB = require('./config/db');

const app = express();
/**
 * Use cors to allow cross-origin requests
 * This is important for allowing the frontend and backend to communicate
 * */
app.use(cors());

/**
 * This middleware is crucial for parsing JSON request bodies
 * It convert the incoming data into the JSON format
 * and makes it accessible in the req.body object.
 */
app.use(bodyParser.json()); 

// Optional: to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

/**
 * Importing the PORT from the config file
 */
const PORT = config.PORT;

/**
 * Run the express app on the imported port using the listen function in express
 */
app.listen(PORT, () => {    
    console.log(`Server running on ${PORT}`);
});

//Connecting to the database 
connectDB();

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Routes
const customerRoutes = require("./routes/customerRoutes.js");
app.use(customerRoutes);

const supplierRoutes = require("./routes/supplierroutes.js");
app.use(supplierRoutes);

const sectionRoutes = require("./routes/sectionRoutes.js");
app.use(sectionRoutes);

const contractRoutes = require("./routes/contractRoutes.js");
app.use(contractRoutes);

const coordinatorRoutes = require("./routes/CordinatorsRoutes.js");
app.use(coordinatorRoutes);

const UserreqRoute = require("./routes/UserreqRoutes.js");
app.use(UserreqRoute);

const paymentRoutes = require("./routes/paymentRoutes.js");
app.use(paymentRoutes);

const userRoutes = require("./routes/userRoutes.js");
app.use(userRoutes);

const notificationRoutes = require("./routes/notificationRoutes.js");
app.use(notificationRoutes);

const documentRoute = require("./routes/DocumentRoute");
app.use(documentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Require and initialize the cron job
require("./jobs/checkExpiringContracts");
