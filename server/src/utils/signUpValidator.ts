import validator from 'validator';

import type { UserDocument } from '../models/collectionTypes/user';
import validateMandatoryFields from './validateMandatoryFields';

const MANDATORY_FIELDS = {
  firstName: {
    key: 'firstName',
    label: 'First Name',
  },
  email: {
    key: 'email',
    label: 'Email Address',
  },
  password: {
    key: 'password',
    label: 'Password',
  },
};

export default function signUpValidator({
  bodyParams,
}: {
  bodyParams: UserDocument;
}) {
  validateMandatoryFields({ data: bodyParams, MANDATORY_FIELDS });

  const { email, password } = bodyParams;

  if (!validator.isEmail(email)) {
    throw new Error('Email address is not valid.');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong.');
  }
}
