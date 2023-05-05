const {
  Testing,
  Task,
  AnswerTask,
  ResultTesting,
  User,
} = require("../models/model");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class TestingController {
  async createTesting(req, res) {
    const { lessonId, discription } = req.body;
    const testing = await Testing.create({ lessonId, discription });
    return res.json(testing);
  }

  async createTasks(req, res) {
    const { tasks } = req.body;
    const { testingId } = req.params;

    tasks.map(async (task) => {
      const { quest, answer_true, grade_max, type, options_answer } = task;
      await Task.create({
        quest,
        answer_true,
        grade_max,
        type,
        options_answer,
        testingId,
      });
    });

    const createdTasks = await Task.findAll({
      where: { testingId },
    });

    return res.json(createdTasks);
  }

  async getTestingWithTasks(req, res) {
    const { lessonId } = req.params;
    const testing = await Testing.findOne({
      where: { lessonId: lessonId },
      include: { model: Task },
    });
    return res.json({ testing });
  }

  //TODO: fix error  original: error: столбец "resultTestingId" не существует
  async createAnswersToTasks(req, res, next) {
    try {
      const { testingId, userId } = req.params;
      let { results } = req.body;

      let [testingResult, created] = await ResultTesting.findOrCreate({
        where: { userId, testingId },
      });

      console.log(testingResult, created);

      if (created) {
        results.map(async (result) => {
          const { taskId, answer } = result;
          const task = await Task.findOne({
            where: { id: taskId, [Op.not]: { type: "input" } },
            attributes: ["answer_true", "grade_max"],
          });

          if (!!task) {
            if (answer == task.answer_true) {
              result.grade = task.grade_max;
            } else {
              result.grade = 0;
            }
          }
          console.log(testingResult.id);
          await AnswerTask.create({
            taskId,
            answer,
            userId,
            grade: result.grade,
            result_testingId: testingResult.id,
          });
        });

        const tasks = await Task.findAll({
          where: { testingId },
          attributes: ["id"],
        });

        let tasksId = tasks.map((task) => task.id);

        const total_grade = await AnswerTask.sum("grade", {
          where: {
            taskId: {
              [Op.in]: [...tasksId],
            },
            userId,
          },
        });

        testingResult.set({ total_grade: total_grade });
        testingResult.save();
      }
      return res.json(testingResult);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllResultsTesting(req, res) {
    const { testingId } = req.params;

    const results = await ResultTesting.findAll({
      where: { testingId },
      include: {
        model: User,
        attributes: ["name", "lastname", "email"],
      },
    });

    return res.json(results);
  }

  //TODO: need to edit
  async getOneResultTesting(req, res) {
    const { testingId } = req.params;
    const { userId } = req.body;

    const tasks = await Task.findAll({
      where: { testingId },
      attributes: ["id"],
    });

    let tasksId = tasks.map((task) => task.id);

    const results = await ResultTesting.findAll({
      where: { testingId, userId },
      include: {
        model: User,
        attributes: ["name", "lastname", "email"],
        include: {
          model: AnswerTask,
          where: {
            taskId: {
              [Op.in]: [...tasksId],
            },
          },
        },
      },
    });

    return res.json(results);
  }
}

module.exports = new TestingController();
