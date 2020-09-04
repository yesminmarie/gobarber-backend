import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

// use faz com que toda rota que inicie com /appointments
// independente dos métodos get, post, delete, put etc
// quando usa "use" ele funciona para qualquer tipo de rota
// vai repassar o que vem depois do /appointments para dentro do appointmentsRouter
// então para criar uma rota do tipo post no arquivo appointments.routes.ts por exemplo,
// não precisa colocar /appointments dentro da URL
// coloca apenas '/'
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
