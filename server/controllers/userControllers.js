const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10; //required by bcrypt
const firebase = require("../database/firestore");
const db = firebase.firestore();
const userRef = db.collection("users");

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  login,
  isAdmin,
};

async function getUsers(req, res) {
  const users = [];
  const snapshot = await userRef.get();
  snapshot.forEach((doc) => {
    users.push({ id: doc.id, user: doc.data() });
  });
  res.send(users);
}

async function createUser(req, res) {
  try {
    // Check for existing users with the same email or username
    const snapshot = await userRef.get();
    let emailExists = false;
    let usernameExists = false;

    snapshot.forEach((doc) => {
      if (doc.data().email === req.body.email) {
        emailExists = true;
      }
      if (doc.data().username === req.body.userName) {
        usernameExists = true;
      }
    });

    // Respond with an error if user already exists
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Prepare user data
    const data = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      admin: false,
    };

    // Save the user in the database
    await db.collection("users").doc().set(data);
    const token = createJWT(data);

    // Send the token as response
    res.json({ token });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getUser(req, res) {
  const user = [];

  const snapShot = await userRef.get();
  snapShot.forEach((doc) => {
    if (req.body.id == doc.id) {
      user.push(doc.data());
    }
  });
  res.send(user);
}

async function deleteUser(req, res) {
  const snapShot = await userRef.get();
  snapShot.forEach(async (doc) => {
    if ("aNIEdHdHKs8262HQ8dZY" === doc.id) {
      await userRef.doc(doc.id).delete();
    }
  });
  console.log("user deleted");
}

async function login(req, res) {
  try {
    const snapshot = await userRef.get();
    snapshot.forEach(async (user) => {
      if (!user) throw new Error();
      const match = await bcrypt.compare(
        req.body.password,
        user.data().password
      );
      if (!match) throw new Error();
      res.json(createJWT(user));
    });
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

async function isAdmin(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming the token is sent in the Authorization header
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.user.id; // Adjust based on your token structure

    const doc = await userRef.doc(userId).get();
    if (doc.exists && doc.data().admin) {
      next(); // User is admin, proceed to the next handler
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid or missing token." });
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.TOKEN_SECRET,
    { expiresIn: "24h" }
  );
}
