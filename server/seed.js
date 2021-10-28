const mongoose = require("mongoose")
const connectDB = require("./db")
const User = require("./models/User")

require("dotenv").config()

async function seed() {
    
    try {     
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
        });
        
        await mongoose.connection.db.dropDatabase()
    
        await User.create({
            username: "DemoUser",
            email: "demo@kanban.com",
            password: "123456"
        })
        console.log("seeded demo user")
    } catch (error) {
        console.error(error)
        process.exitCode = 1
    } finally {
        console.log("closing db connection")
        await mongoose.disconnect()
        console.log("db connection closed")
    }   

}

if (module === require.main) {
    seed();
}