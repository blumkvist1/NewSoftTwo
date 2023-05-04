const { Answerhw, Homework } = require("../models/model");
const ApiError = require("../error/ApiError");
const sequelize = require("../db");
const path = require("path");
const uuid = require("uuid");

class HomeworkController {
  async create(req, res) {
    const { lessonId } = req.params;
    const { discription, reference } = req.body;

    const homework = await Homework.create({
      lessonId,
      discription,
      reference,
    });

    return res.json(homework);
  }

  async getOne(req, res) {
    const { lessonId } = req.params;

    const homework = await Homework.findOne({
      where: { lessonId },
    });

    return res.json(homework);
  }

  async addPhoto(req, res, next) {
    try {
      const { userId, lessonId } = req.params;

      const { file } = req.files;
      console.log(file);
      let fileName = uuid.v4() + "_" + file.name;
      file.mv(path.resolve(__dirname, "..", "static", fileName));

      let [answerHw, created] = await Answerhw.findOrCreate({
        where: { userId, lessonId },
        defaults: {
          files: [],
        },
      });

      await Answerhw.update(
        {
          files: sequelize.fn("array_append", sequelize.col("files"), fileName),
        },
        { where: { userId, lessonId } }
      );

      answerHw = await Answerhw.findOne({ where: { lessonId, userId } });

      return res.json(answerHw);
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async createAnswer(req, res) {
    const { userId, lessonId } = req.params;
    const { answer } = req.body;

    const [answerHw, created] = await Answerhw.findOrCreate({
      where: { userId, lessonId },
      defaults: { answer },
    });

    if (!created) {
      answerHw.answer = answer;
      answerHw.save();
    }

    return res.json(answerHw);
  }

  async getAllAnswers(req, res) {
    const { lessonId } = req.params;

    const answers = await Answerhw.findAll({
      where: { lessonId },
    });
    return res.json(answers);
  }

  async getOneUserHomework(req, res) {
    const { lessonId, userId } = req.params;

    const answer = await Answerhw.findOne({
      where: { lessonId, userId },
    });
    return res.json(answer);
  }
}

module.exports = new HomeworkController();
