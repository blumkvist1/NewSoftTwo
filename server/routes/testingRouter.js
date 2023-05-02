const Router = require("express");
const router = new Router();
const testingController = require("../controllers/testingController.js");

router.post("/create_testing", testingController.createTesting);
router.post("/:testingId/create_tasks", testingController.createTasks);
router.get("/:lessonId", testingController.getTestingWithTasks)


module.exports = router;
