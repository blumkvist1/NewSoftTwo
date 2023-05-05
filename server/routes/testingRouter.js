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
); // TODO
router.get("/:testingId/result_testing", testingController.getOneResultTesting); // TODO

//TODO: получение результатов конкретного узера (возможно отдавать массив тасков узера)
// TODO: получение конкретного таска конкретного узера

module.exports = router;
