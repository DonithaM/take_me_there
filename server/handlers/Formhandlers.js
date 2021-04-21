const { MongoClient, ObjectId } = require("mongodb");

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

  try {
    const updated = await db
      .collection("users")
      .updateOne(
        { _id: ObjectId(req.body.id) },
        { $push: { reviews: req.body } }
      );
    res.status(200).json({ status: 200, _id, updated });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

//get all reviews
const getAllReviews = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();
  // connect to the database
  const db = client.db("Final_Project");
  console.log("connected!");

  try {
    const allusers = await db.collection("users").find({}).toArray();
    //console.log(allusers);

    //[user 1, user 2]
    //

    //at this point, you have all users from your db
    //1. allusers.map to get an array of review arrays (i.e. [[user 1's reviews], [user 2's reviews]])
    // 2. use .concat to combine [user 1 review 1, user 1, review 2, user2 review 1]
    //side note: one review object {username, place, description, image, timestamp}
    // 3. .sort based on time stamp ([earliest > latest])
    //4. pass this array as response to FE

    const allReviews = allusers.map((user, index) => {
      //console.log(`user revs: ${index}`, user.reviews);

      //console.log("second user's", user.reviews[1]);
      //const allReviews = user.reviews[0].concat(user.reviews[1]);
      //console.log("combined revs", allReviews);
      return user.reviews;
    });
    console.log(allReviews);
    res.status(200).json({ status: 200, data: allReviews });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

module.exports = {
  postUserReviews,
  getAllReviews,
};
