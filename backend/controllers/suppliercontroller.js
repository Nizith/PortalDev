const Supplier = require("../controllers/supplier.js");

const createSupplier = ( async ( req , res)=>{
    const{ name , age } = req.body;
  
        const newSupplier = new Supplier({
            name,
            age
        });
        await newSupplier.save()
        .then(() => {
            res.status(201).json({ message:"new supplier created successfully"});

        })
        .catch((error)=>{
            console.error(error)
            res.status(500).json({message : "Supplier creattion unsuccessful",error })
        })
        

   
})

module.exports = {createSupplier};