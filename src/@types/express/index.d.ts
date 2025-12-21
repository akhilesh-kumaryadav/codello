import { Document } from 'mongoose';
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Document;
  }
}
