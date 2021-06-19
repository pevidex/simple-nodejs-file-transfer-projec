
import { uploadFile} from '../controllers/upload/uploadController';
import { deleteFile } from '../controllers/deleteController';

export default function(app: any) {
  
    app.route('/file')
      .post(uploadFile);

    app.route('/file/:fileId')
      .delete(deleteFile)
      /*.get(getFile)
        .put(replaceFile)
        .patch(updateFile);*/


  };