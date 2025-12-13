import express, { NextFunction, Request, Response } from 'express';

const app = express();
const port = 592;

app.get('/', (req: Request, res: Response) => {
  res.send('This is the home page of the codello.');
});

app.get(
  '/profile',
  [
    (req: Request, res: Response, next: NextFunction) => {
      res.send('This is the profile page of the codello. 1');
      next();
    },
    (req: Request, res: Response, next: NextFunction) => {
      res.send('This is the profile page of the codello. 2');
      next();
    },
  ],
  (req: Request, res: Response, next: NextFunction) => {
    res.send('This is the profile page of the codello. 3');
    next();
  },
  (req: Request, res: Response) => {
    res.send('This is the next profile page of the codello. 4');
  },
);

app.listen(port, () => {
  console.log(
    'Codello server is up and running at - ',
    `http://localhost:${port}/`,
  );
});
