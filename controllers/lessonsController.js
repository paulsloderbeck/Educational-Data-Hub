const db = require("../database/models");
const url = require("url");
//defining methods for controllersController
module.exports = {
  findAll: function (req, res) {
    db.Lesson.find({})
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByGradeLevel: function (req, res) {
    console.log("findbygradelevel")
    console.log("req.url", req.url);
    console.log("req.query", req.query)

    const k5 = req.query["k-5"];
    const sixEight = req.query["6-8"];
    const nineTwelve = req.query["9-12"];

    const gradeLevels = [];

    if (k5 === "true") gradeLevels.push("k-5");
    if (sixEight === "true") gradeLevels.push("6-8");
    if (nineTwelve === "true") gradeLevels.push("9-12");

    console.log("GRADE LEVELS", { gradeLevels });
    // Need to create in API route for getting by grade levels
    // Use this controller methode
    // Update line 30 to find by items within the array
    db.Lesson.findAll({ gradeLevel: { $in: gradeLevels } })
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Lesson.findById(req.params.id)
      .sort({ date: -1 })
      .populate("commentArray")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  create: function (req, res) {
    db.Lesson.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  update: function (req, res) {
    db.Lesson.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    ).then((dbModel) =>
      res.json(dbModel).catch((err) => res.status(422).json(err))
    );
  },

  updateComment: function (req, res) {
    db.Lesson.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { commentArray: req.body.comment } }
    ).then((dbModel) =>
      res.json(dbModel).catch((err) => res.status(422).json(err))
    );
  },

  remove: function (req, res) {
    db.Lesson.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
