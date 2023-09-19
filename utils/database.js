import mongoose from "mongoose";

let isConnected = false; //track the connection

export const connectTODB = async () => {
    mongoose.set('strictQuery', true);
    
}