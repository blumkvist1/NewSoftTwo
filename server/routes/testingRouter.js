const Router = require("express");
const router = new Router();
const testingController = require("../controllers/testingController.js");

router.post("/create_testing", testingController.createTesting);
router.post("/:testingId/create_tasks", testingController.createTasks);
router.get("/:lessonId", testingController.getTestingWithTasks);
router.post(
  "/:testingId/answers_to_tasks/:userId",
  testingController.createAnswersToTasks
);
router.get(
  "/:testingId/results_testing",
  testingController.getAllResultsTesting
);
router.get(
  "/:testingId/result_testing",
  testingController.getOneResultTestingByUser
);
router.get("/task/:taskId/results_task", testingController.getResultsOnTask);
router.get(
  "/task/:taskId/result_task",
  testingController.getResultOnTaskByUser
);

module.exports = router;
