import { Request, Response, NextFunction } from 'express';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('Admin auth started...');
  const token = 'xyz';
  const comingToken = 'xyz';
  const isAdminToken = token === comingToken;

  if (!isAdminToken) {
    res.status(401).send('Unauthorized admin user');
  }

  next();
};

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('User auth started...');
  const token = 'xyz';
  const isUserToken = token === 'xyz';

  if (!isUserToken) {
    res.status(401).send('Unauthorized user');
  }

  next();
};
