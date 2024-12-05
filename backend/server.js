const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files
 app.use('/uploads', express.static(path.join(__dirname,'uploads')));

const PORT = 4500;
app.listen( PORT, () => { console.log(`App is running on port : ${PORT}`)});

const URL = "mongodb+srv://nisithalakshan94:portaldevSLT@slt.ffxoqv6.mongodb.net/PortalDev"

mongoose.connect( URL )
.then( () => {
    console.log("MongoDB Connection Successfull!");
})
.catch( (err) => {
    console.log("MongoDB Connection Unsuccessfull!", err);
})

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

const UserreqRoute = require("./routes/UserreqRoutes.js")
app.use(UserreqRoute);

const paymentRoutes = require("./routes/paymentRoutes.js");
app.use(paymentRoutes);

const userRoutes = require("./routes/userRoutes.js");
app.use(userRoutes);


// Routes 
const documentRoute = require("./routes/DocumentRoute");
app.use(documentRoute);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  