const { Testing, Task, AnswerTask } = require("../models/model");
const ApiError = require("../error/ApiError");

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

  async createAnswersToTasks(req, res) {
    try {
      const { testingId, userId } = req.params;
      let { results } = req.body;

      results = results.map(async (result) => {
        const { taskId, answer } = result;
        const task = Task.findOne({
          where: { id: taskId, [Op.not]: { type: "input" } },
          attributes: [answer_true, grade_max],
        });

        if (answer == task.answer_true) {
          result.grade = grade_max;
        } else {
          result.grade = 0;
        }

        await AnswerTask.create({ taskId, answer, userId, grade });
      });

      const tasks = await Task.findAll({
        where: { testingId },
        attributes: [id],
      });

      const total_grade = await AnswerTask.sum("grade", {
        where: {
          taskId: {
            [Op.in]: [...tasks],
          },
          userId,
        },
      });

      const testingResult = await ResultTesting.create({
        testingId,
        userId,
        total_grade,
      });

      return res.json(testingResult);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new TestingController();
