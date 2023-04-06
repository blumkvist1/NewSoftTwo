const ApiError = require("../error/ApiError");
const { Lesson } = require("../models/model");
const courseController = require("./courseController");
class LessonController {
  async create(req, res, next) {
    try {
      const courseWorkame = req.baseUrl.split("/")[2];
      const courseId = await courseController.getId(courseWorkame);
      const { name, number, video, presentation, datetime } = req.body;
      const lesson = await Lesson.create({
        name,
        number,
        video,
        presentation,
        courseId,
        datetime,
      });
      return res.json(lesson);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    try {
      const lessons = await Lesson.findAll();
      return res.json(lessons);
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(req, res, next) {
    const courseWorkame = req.baseUrl.split("/")[2];
    const courseId = await courseController.getId(courseWorkame);
    const { number } = req.params;
    const lesson = await Lesson.findOne({ where: { number, courseId } });
    if (!lesson) {
      return next(ApiError.badRequest("Такого урока не существует"));
    }
    return res.json(lesson);
  }
  async delete(req, res) {}
}

module.exports = new LessonController();
