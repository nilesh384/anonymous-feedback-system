import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(){
    if(connection.isConnected){
        console.log("Database already connected");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "");

        connection.isConnected = db.connections[0].readyState

        console.log("DB is connected");

    } catch (error) {
        console.log("DB Connection failed", error);
        process.exit(1);
    }
}

export default dbConnect;