const router = require("express").Router();
const actionDb = require("../data/helpers/actionModel");
const { validateProjectId, validateAction } = require("../middleware");

router.get("/", (req, res) => {
  actionDb
    .get()
    .then((actions) => {
      res.status(200).json({ data: actions });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." });
    });
});

router.post("/:id", validateProjectId, validateAction, (req, res) => {
  const newAction = {
    description: req.body.description,
    notes: req.body.notes,
    project_id: req.params.id,
  };
  actionDb
    .insert(newAction)
    .then((newAction) => {
      res
        .status(201)
        .json({ message: "Action was created successfully", data: newAction });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." });
    });
});

router.put("/:id", validateProjectId, validateAction, (req, res) => {
  const { id } = req.params;
  const updatedAction = {
    description: req.body.description,
    notes: req.body.notes,
    project_id: req.params.id,
  };
  console.log(updatedAction);
  actionDb
    .update(id, updatedAction)
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Error performing the requested operation " });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  actionDb
    .remove(id)
    .then((deletedAction) => {
      res.status(202).json(deletedAction);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Error performing the requested operation " });
    });
});

module.exports = router;
