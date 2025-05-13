require('dotenv').config();

//uses the attributes defined in the .env file
module.exports = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    ADMIN_REGISTRATION_KEY: process.env.ADMIN_REGISTRATION_KEY
};