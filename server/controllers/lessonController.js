const ApiError = require("../error/ApiError");
const path = require("path")
const uuid = require("uuid");
const { Lesson, Answerhw } = require("../models/model");
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

  //TODO create a true name for files
  async uploadAnswerHomework(req, res, next) {
    console.log(req)
    // const {file} = req.files
    // console.log(file)
    // let fileName = uuid.v4(); // + `.${file.mimetype.split("/")[1]}`;
    // file.mv(path.resolve(__dirname, "..", "static", fileName));

    //const homeWork =  await Answerhw.create({answer: fileName, userId: 12, lessonId: 15})
    // console.log(homeWork)
    // return res.json(homeWork)
    return true;
  }
}

module.exports = new LessonController();
