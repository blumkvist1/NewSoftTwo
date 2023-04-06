const Router = require('express');
const router = new Router();
const analiticsController = require('../controllers/analiticsController.js');


router.get('/users', analiticsController.getUsersAnalize)
router.get('/courses', analiticsController.getCoursesAnalize)



module.exports = router