const projectDb = require("./data/helpers/projectModel");

module.exports = {
  validateProjectId: function (req, res, next) {
    const { id } = req.params;
    projectDb
      .get(id)
      .then((project) => {
        if (project) {
          next();
        } else {
          res
            .status(404)
            .json({ message: "The project with the ID could not be found" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "There was an error processing your request" });
      });
  },

  validateProject: function (req, res, next) {
    const body = req.body;
    const name = req.body.name;
    const description = req.body.description;

    if (!body) {
      res.status(400).json({ message: "Missing project data" });
    } else if (!name || !description) {
      res.status(400).json({
        message: "Please provide a name and description for the project.",
      });
    } else {
      next();
    }
  },

  validateAction: function (req, res, next) {
    const body = req.body;
    const notes = req.body.notes;
    const description = req.body.description;

    if (!body) {
      res.status(400).json({ message: "Missing project data" });
    } else if (!notes || !description) {
      res.status(400).json({
        message: "Please provide notes and a description for the project.",
      });
    } else {
      next();
    }
  },
};
