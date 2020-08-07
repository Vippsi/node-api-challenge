const router = require("express").Router();
const projectDb = require("../data/helpers/projectModel");
const { validateProjectId, validateProject } = require("../middleware");
//Gets all projects

router.get("/", (req, res) => {
  projectDb
    .get()
    .then((projects) => {
      res.status(200).json({ data: projects });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved." });
    });
});

//Adds new project to DB
router.post("/", validateProject, (req, res) => {
  projectDb
    .insert(req.body)
    .then((newProject) => {
      res
        .status(201)
        .json({ message: "Project create successfully", data: newProject });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved." });
    });
});

//Updates existing project by id
router.put("/:id", validateProject, validateProjectId, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  projectDb
    .update(id, update)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Error performing the requested operation " });
    });
});

//Removes existing project by id
router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  projectDb
    .remove(id)
    .then((deletedProject) => {
      res.status(202).json(deletedProject);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Error performing the requested operation " });
    });
});

//Get all ACTIONS from project_id

router.get("/actions/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  projectDb
    .getProjectActions(id)
    .then((projectActions) => {
      res.status(200).json(projectActions);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Error performing the requested operation " });
    });
});

module.exports = router;
