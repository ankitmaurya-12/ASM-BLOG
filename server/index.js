const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Adjusted path to models/User.js
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const multer = require("multer");
const fs = require("fs");
const path = require('path'); // Import the path module
const Post = require('./models/Post');


const app = express();


const saltRounds = 10; // Define salt rounds for bcrypt
const secret = "an12x85qm9k5ie9ts4hi7oam0kj1et3dgvz6r8epl3f0hsrw";

// app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cors({ credentials: true, origin: "https://asm-blog.vercel.app/" }));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use('/uploads', express.static(__dirname + '/uploads'));  // to show image from backend to link

// Mongoose connection
mongoose
  .connect(
    "mongodb+srv://ankitmaurya:WlXlt6C9KFocMJpg@cluster0.m1qg0u2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });


// Routes

// Register page route
app.get("/", (req, res)=>{
  res.json("Hello World.")
})

app.post("/register", async (req, res) => {
  const { authorname, username, password } = req.body;

  if (!authorname || !username || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Validate that username is at least 7 characters long
  if (username.length < 7) {
    return res.status(400).json({ error: 'Username must be at least 7 characters long.' });
  }

  // Validate that username is lowercase, contains numbers, and has no spaces
  const usernameRegex = /^[a-z0-9]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ error: 'Username must be lowercase, can contain numbers, and should not have spaces.' });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const userDoc = await User.create({
      authorname,
      username,
      password: hashedPassword,
    });
    // res.json(userDoc);
    res.status(201).json({ message: 'User registered successfully.' , user: userDoc });
  } catch (error) {
    console.error("Error creating user:", error.message); // Log the specific error message
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message }); // Send error details in response
  }
});

// app.post('/login', async(req, res)=>{
//     const{username, password}=req.body;
//     const userDoc = await User.findOne({username});
//     const passOk= bcrypt.compareSync(password, userDoc.password); // true
//     res.json(userDoc);
//     res.json(passOk);
//     if (passOk) {
//         // loggedIn
//         jwt.sign({username, id:userDoc._id}, secret, {}, (error,token)=>{
//             if (error) {
//                 throw error;
//             }
//             res.cookie('token', token).json('ok')
//         });
//     } else {
//         // no loggedin
//         res.status(400).json('wrong credentials');
//     }
// })


// Login page Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // Logged in
      jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
        if (error) {
          throw error;
        }
        res.cookie("token", token, { httpOnly: true }).json({
            id:userDoc._id,
            username,
        });
      });
    } else {
      // Not logged in due to wrong password
      res.status(401).json({ error: "Wrong password" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// app.get('/profile', (req, res)=>{
//     const{token} = req.cookies;
//     jwt.verify(token,secret,{},(error, info)=>{
//         if (error) {
//             throw error;
//         }
//         res.json(info);
//     });
//     // res.json(req.cookies);
// });


// Profilr page route
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secret, {}, (error, userData) => {
    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.json(userData);
  });
});


// logout page routes
app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).json("ok");
});



// create Post Page
// youtube version

// define upload folder
// const uploadMiddleware = multer({ dest: 'uploads/' });
// // use multer library to get image ile from frontend to backend uploads foalder
// app.post("/post", uploadMiddleware.single('file'), (req, res) =>{
//   // res.json({files:req.file});

//   // getting original extension of images
//   const {originalname, path}= req.file;
//   const parts = originalname.split('.');
//   const ext =parts[parts.length -1];

//   // use fs libary for changing file name
//   const newPath = path+'.'+ext;
//   fs.renameSync(path,newPath);

//   res.json({ext});
// });



// GPT version adding custom imge name
// Setup storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploadMiddleware = multer({ storage });

// Counter file path
const counterFilePath = './uploadCounter.json';

// Initialize counter file if it doesn't exist
if (!fs.existsSync(counterFilePath)) {
  fs.writeFileSync(counterFilePath, JSON.stringify({ counter: 0 }));
}
// Function to get and increment counter
function getNextCounter() {
  const counterData = JSON.parse(fs.readFileSync(counterFilePath));
  counterData.counter += 1;
  fs.writeFileSync(counterFilePath, JSON.stringify(counterData));
  return counterData.counter;
}

// Image upload and rename endpoint
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path: tempPath } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];

  const counter = getNextCounter();
  const newFileName = `asm${String(counter).padStart(4, '0')}.${ext}`;
  const newPath = path.join('uploads', newFileName).replace(/\\/g, '/'); // Replace backslashes with forward slashes

  fs.renameSync(tempPath, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (error, userData) => {
    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    try {
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: userData.id,
      });
      res.json(postDoc);
    } catch (err) {
      res.status(500).json({ message: "Error creating post", error: err.message });
    }
  });
});


  // res.json({ title, summary, content });
  // res.json({ newFileName });
  
  // res.json(postDoc); 

// });




// GEtting post to the home page
app.get('/post', async (req, res) => {
  try {
      const posts = await Post.find()
                    .populate('author',['username'])
                    .sort({createdAt: -1})
                    .limit(20); // Populate 'author' field with User details
      res.json(posts);
  } catch (error) {
      console.error("Error fetching posts:", error.message);
      res.status(500).json({ error: "Internal server error", details: error.message });
  }
});



// Getting post to PostPage with respective id
app.get('/post/:id', async (req,res)=>{
  const {id} = req.params;
  // res.json(id);
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})



// run server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});






// ankitmaurya
// WlXlt6C9KFocMJpg

// // Mogoose
// mongoose.connect('mongodb+srv://ankitmaurya:WlXlt6C9KFocMJpg@cluster0.m1qg0u2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// erroe here

// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     // console.log(`Received registration details: username=${username}, password=${password}`);
//     // res.json({ requestData:{username, password}});

//     const userDoc= await User.create({username, password});
//     res.json(userDoc);
// });

// app.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });
