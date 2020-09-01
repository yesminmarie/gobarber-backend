import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

// o usuário precisa estar autenticado para alterar seu avatar (ensureAuthenticated)
// upload.single('avatar') -> outro middleware que indica que o usuário poderá
// subir apenas uma imagem (single)
// 'avatar' é o nome do campo que vai conter a imagem
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);
export default usersRouter;
