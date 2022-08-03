const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const fileUploader = require('../config/cloudinary.config');
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


//SIGN UP user
  //GET SIGNUP
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

  //POST SIGNUP
router.post("/signup",  fileUploader.single('profile_pic'), (req, res) => {
  console.log("entré, wey" , req.body)

  let profile_pic;

  if(!req.file){
      console.log("error creating account con picture")

     profile_pic = "https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg"
  }else{
      console.log("creating account con picture")

      profile_pic= req.file.path
      console.log("creating account con picture", profile_pic)

  }

  const { username, password,firstName,lastName,phoneNumber,email,sex,investorType,role } = req.body;
  console.log("yo soy el req body",req.body)

  /* if (!username) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your username.",
    });
  } */

/*   if (password.length < 8) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  } */

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res
        .status(400)
        .render("auth.signup", { errorMessage: "Username already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username,
          password: hashedPassword,
          firstName,
          lastName,
          phoneNumber,
          email,
          sex,
          investorType,
          profile_pic,
          role
        });
      })
      .then((user) => {
        console.log("new user created",user)
        // Bind the user to the session object
        req.session.user = user;
        console.log('El req.session: ', req.session);
        res.redirect("/");
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("auth/signup", {
            errorMessage:
              "Username need to be unique. The username you chose is already in use.",
          });
        }
        return res
          .status(500)
          .render("auth/signup", { errorMessage: error.message });
      });
  });
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});



router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;
console.log("el req body del login", req.body)

  if (!username) {
    return res.status(400).render("auth/login", {
      errorMessage: "Please provide your username.",
    });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).render("auth/login", {
          errorMessage: "Wrong user.",
        });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).render("auth/login", {
            errorMessage: "Wrong password.",
          });
        }
        req.session.user = user;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.redirect("profile");
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

//User profile

router.get('/profile',isLoggedIn,(req,res)=>{
  console.log(req.session.user)

  const dataUser = req.session.user;

  res.render("auth/profile",{dataUser})
})




router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;
