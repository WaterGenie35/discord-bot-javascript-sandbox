import { Request, Response, Router } from 'express';


const helloRouter = Router();

helloRouter.get('/hi', (request: Request, response: Response) => {
    response.send("Hi :)");
});

export default helloRouter;
