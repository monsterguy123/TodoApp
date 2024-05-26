import mongoose from 'mongoose'

const db = async()=>{
    try {
        await mongoose.connect("mongodb+srv://deepakbisht9891:Deepak123@cluster0.srjtgwr.mongodb.net/");
        console.log("connect to the db successfully...");
    } catch (error:any) {
        console.log(error.message);
    }
}

export default db;