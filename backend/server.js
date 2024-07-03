const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

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