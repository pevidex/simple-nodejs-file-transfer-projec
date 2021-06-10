
module.exports = function(app: any) {
    var todoList = require('../controllers/todoListController');
  
    // todoList Routes
    app.route('/tasks')
      .post(todoList.list_all_tasks);
  };