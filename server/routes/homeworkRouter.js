const Router = require("express");
const router = new Router();
const homeworkController = require("../controllers/homeworkController.js");

router.post("/:lessonId/create_homework", homeworkController.create);
router.get("/:lessonId", homeworkController.getOne);
router.post(
  "/:lessonId/create_answer/:userId",
  homeworkController.createAnswer
);
router.get("/:lessonId/answer_homework", homeworkController.getAllAnswers);
router.get(
  "/:lessonId/answer_homework/:userId",
  homeworkController.getOneUserHomework
);
router.post(
  "/:lessonId/answer_homework/photos/:userId",
  homeworkController.addPhoto
);
//TODO: create delete photo

module.exports = router;
