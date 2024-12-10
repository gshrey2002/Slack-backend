import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV= process.env.NODE_ENV || "development";
export const DEV_MONGO_URL= process.env.DEV_MONGO_URL ;
// console.log(DEV_MONGO_URL);
export const PROD_MONGO_URL= process.env.PROD_MONGO_URL;