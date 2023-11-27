import mongoose from "mongoose";

let isConnected = false; //track the connection

export const connectTODB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongodb is connected');
        return;
    
}

try {
await mongoose.connect(process.env.MONGODB_URI,{ dbName:"share_prompt", userNewUrlParser: true, userUnifiedTopology: true })
isConnected = true;
console.log("MongoDB connected")
} catch (error) {
    console.log(error);
}
}
