const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");

//GENERAL
router.get("/educationList", (req, res) => {
  res.render("education/educationList");
  
});

router.get("/calculatorsList",(req, res)=>{
  res.render("education/calculatorsList")
})


/////////////////////////

//Articles Routes
router.get("/articles/peratioPage", (req, res) => {
    res.render("education/articles/peratioPage");
  });

  router.get("/articles/rocePage", (req, res) => {
    res.render("education/articles/rocePage");
  });
  

  
//Calculator routes
  
  router.get("/calculatorsList/peratio",(req, res) => {
    res.render("education/calculators/peratio")
  })

  router.get("/calculatorsList/roce",(req, res) => {
    res.render("education/calculators/roce")
  })

  //Create page:

  router.get("/formCreate",(req, res) =>{
    res.render("education/createPage")
  })

  router.post("/pageCreated",(req, res)=>{
    res.send("Gracias por crear un post. Te avisaremos cuando este aprobado.")
  })







module.exports = router;
