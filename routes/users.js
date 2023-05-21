const router = require("express").Router();
const User = require("../models/music_model");
var qs = require('querystring');

// Find All
router.get("/", (req, res) => {
  User.findAll()
    .then((Users) => {
      if (!Users.length) return res.status(404).send({ err: "User not found" });
      res.send(Users);
    })
    .catch((err) => res.status(500).send(err));
});

// Find One by userid
router.get("/userid/:userid", (req, res) => {
  User.findById(req.params.userid)
    .then((User) => {
      if (!User) return res.status(404).send({ err: "User not found" });
      res.send(`findOne successfully: ${User}`);
    })
    .catch((err) => res.status(500).send(err));
});

// create new User
router.get("/create", (req, res) => {
  let name = req.query.name;
  let song = req.query.song;
  let url = req.query.url;
  var user1 = new User({
      name: name,
      song: song,
      url: url
  })
  User.create(user1)
  .then((User) => res.send(User))
  .catch((err) => res.status(500).send(err));
  console.log("추가 성공");
})

// Update by userid
router.put("/userid/:userid", (req, res) => {
  User.updateByuserid(req.params.userid, req.body)
    .then((User) => res.send(User))
    .catch((err) => res.status(500).send(err));
});

// Delete by userid
router.delete("/userid/:userid", (req, res) => {
  User.deleteByuserid(req.params.userid)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
