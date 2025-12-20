export type UserSchema = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  gender: string;
  photoUrl?: string;
  age: number;
};

// export type UserDocument = UserSchema & MongoDocument;
