const Router = require("express");
const router = new Router();
const testingController = require("../controllers/testingController.js");

router.post("/create_testing", testingController.createTesting);
router.post("/:testingId/create_tasks", testingController.createTasks);
router.get("/:lessonId", testingController.getTestingWithTasks);
router.post("/:testingId/answers_to_tasks/:userId", testingController.createAnswersToTasks);
//TODO: создание ответа на тест req: массив тасков с ответами, подсчет тотал сум
// TODO: получение результатов теста всех узеров
// TODO: получение результатов конкретного узера (возможно отдавать массив тасков узера)
// TODO: получение конкретного таска конкретного узера

module.exports = router;
