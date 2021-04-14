const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signup = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();
  // connect to the database
  const db = client.db("Final_Project");
  console.log("connected!");

  try {
    //generates salt for password encryption
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    //password encryption
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);
    //user with hashed password
    const user = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    };

    const result = await db.collection("users").insertOne(user);
    res.status(201).json({ status: 201, message: "succesfully added user" });
  } catch (error) {
    res.status(500).send({ status: 500, message: err.message });
  }

  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

const login = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();
  // connect to the database
  const db = client.db("Final_Project");
  console.log("connected!");

  console.log("REQUEST", req.body);
  const username = req.body.username;
  const password = req.body.password; //check if req.body password is equal to password in the database
  console.log(password);
  try {
    const result = await db.collection("users").findOne({ username });
    // const test = await db.collection("users").find().toArray();
    // console.log(test);
    if (result) {
      console.log("Result :", result); //result from DB
      const passwordCompare = await bcrypt.compare(password, result.password);

      if (passwordCompare) {
        //send the result properties except password -- fetch FE
        const { _id, username, email } = result;
        res.status(201).json({
          status: 201,
          data: { id: _id, username, email },
          message: "Logged in successfully",
        });
      } else {
        //message: "Wrong password entered"
        res.status(401).json({
          status: 401,
          message: "You have entered wrong username or password",
        });
      }
    } else {
      //NOTE: "If username not found"
      res.status(401).json({
        status: 401,
        message: "You have entered wrong username or password",
      });
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

module.exports = {
  signup,
  login,
};
