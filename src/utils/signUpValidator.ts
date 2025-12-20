import validator from 'validator';

import type { UserSchema } from '../models/collectionTypes/user';

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
  gender: {
    key: 'gender',
    label: 'Gender',
  },
};

function validateMandatoryFields({ bodyParams }: { bodyParams: UserSchema }) {
  for (const field of Object.values(MANDATORY_FIELDS)) {
    const value = bodyParams[field.key as keyof UserSchema];

    if (value === null || value === undefined || value == '') {
      throw new Error(`${field.label} is required.`);
    }
  }
}

export default function signUpValidator({
  bodyParams,
}: {
  bodyParams: UserSchema;
}) {
  validateMandatoryFields({ bodyParams });

  const { email, password, age, gender, photoUrl } = bodyParams;

  if (!validator.isEmail(email)) {
    throw new Error('Email address is not valid.');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong.');
  }

  if (age && age < 18) {
    throw new Error('Age must be atleast 18.');
  }

  if (!['male', 'female', 'others'].includes(gender)) {
    throw new Error(`${gender} is not a valid gender`);
  }

  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error(`${photoUrl} is not a valid URL.`);
  }
}
