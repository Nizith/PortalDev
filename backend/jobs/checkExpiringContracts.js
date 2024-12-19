const cron = require("node-cron");
const Contract = require("../models/contractModel");
const {createNotification} = require("../controllers/NotificationController");

async function checkExpiringContracts(){
    try{
        const currentDate = new Date();
        const threeMonthsfromNOw = new Date();
        threeMonthsfromNOw.setMonth(currentDate.getMonth() +3 );

        const expiringContracts = await Contract.find({
            customerContEndDate:{
                $gte: threeMonthsfromNOw,
                $lt:new Date(threeMonthsfromNOw.getTime() + 24 * 60 * 60 * 1000),// Less than 1 day after
            },
        });

        for (let contract of expiringContracts){
            const message = `Contract with tender no. ${contract.tenderNo} is expiring on ${contract.customerContEndDate}.`;
            await createNotification(message,contract.tenderNo);
        }
    } catch (error){
        console.error("Error checking expiring contracts:",error);
    }
}

cron.schedule("0 0 * * *", () => {
    console.log("Running job: Checking for contracts expiring in 3 months...");
    checkExpiringContracts();
});
