const { Testing, Task } = require("../models/model");
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
      where: { lessonId },
      include: { model: Task },
    });
    return res.json(testing);
  }
}

module.exports = new TestingController();
