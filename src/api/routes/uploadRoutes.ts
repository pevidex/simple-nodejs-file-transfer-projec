
export default function(app: any) {
    var uploadController = require('../controllers/uploadController');
  
    app.route('/upload')
      .post(uploadController.upload);
  };