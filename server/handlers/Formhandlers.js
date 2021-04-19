const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const postUserReviews = async (req, res) => {
  const _id = req.body.id;
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();
  // connect to the database
  const db = client.db("Final_Project");
  console.log("connected!");

  console.log("REQUEST", req.body);
  const query = { _id };
  const newValues = { $set: { reviews: req.body } };

  try {
    console.log(req.body); //has form data and post to DB
    const result = await db.collection("users").updateOne(query, newValues);
    res.status(200).json({ status: 200, _id, newValues });

    // const result = await db
    //   .collection("users")
    //   .update({ _id: req.body.id }, { $push: { reviews: req.body } });
    // res.status(200).json({ status: 200, _id, reviews });
  } catch (err) {
    //console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports = {
  postUserReviews,
};
