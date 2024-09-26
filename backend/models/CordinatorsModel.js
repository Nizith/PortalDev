const mongoose = require('mongoose');

const CordinatorSchema = mongoose.Schema({

  sectionName: {
    type: String,
    //required: true
  },

  SalesCategory: {
    type: String,
    //required: true
  },
  SolutionCategory: {
    type: String,
    //required: true
  },
  AccountManager: {
    type: String,
   // required: true
  },
  Manager: {
    type: String,
   // required: true
  },
  SalesEngineer: {
    type: String,
    //required: true
  },
  SolutionEngineer: {
    type: String,
   // required: true
  }
})

const cordinatorModel = mongoose.model("Cordinators", CordinatorSchema);

module.exports = cordinatorModel;
