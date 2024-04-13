const mongoose =require("mongoose");
// const mongoURL = process.env.CONNECTION_STRING;

const connectDb = async () => {
    try {
      const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
      console.log(
        "Database connected: ",
        connect.connection.host,
        connect.connection.name
      );
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
};

module.exports = connectDb;



// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("connected", () => {
//   console.log("Connected to mongoDB server");
// });