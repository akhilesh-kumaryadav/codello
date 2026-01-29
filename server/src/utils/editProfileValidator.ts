import validator from 'validator';

import { UserDocument } from '../models/collectionTypes/user';
import validateEditableFields from './validateEditableFields';

export const EDITABLE_FIELDS = {
  firstName: {
    key: 'firstName',
    label: 'First Name',
  },
  lastName: {
    key: 'lastName',
    label: 'Last Name',
  },
  email: {
    key: 'email',
    label: 'Email',
  },
  age: {
    key: 'age',
    label: 'Age',
  },
  gender: {
    key: 'gender',
    label: 'Gender',
  },
  photoUrl: {
    key: 'photoUrl',
    label: 'Photo',
  },
};

export type EditableFieldTypes = keyof typeof EDITABLE_FIELDS;

export default function editProfileValidator({
  bodyParams,
}: {
  bodyParams: UserDocument;
}) {
  validateEditableFields({ data: bodyParams, EDITABLE_FIELDS });

  const { email, age, gender, photoUrl } = bodyParams;

  if (email && !validator.isEmail(email)) {
    throw new Error('Email address is not valid.');
  }

  if (age && age < 18) {
    throw new Error('Age must be atleast 18.');
  }

  if (gender && !['male', 'female', 'others'].includes(gender)) {
    throw new Error(`${gender} is not a valid gender.`);
  }

  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error(`${photoUrl} is not a valid URL.`);
  }
}
