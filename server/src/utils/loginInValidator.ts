import validator from 'validator';

import validateMandatoryFields from './validateMandatoryFields';

const MANDATORY_FIELDS = {
  email: {
    key: 'email',
    label: 'Email Address',
  },
  password: {
    key: 'password',
    label: 'Password',
  },
};

export default function loginInValidator({
  credentials,
}: {
  credentials: { email: string; password: string };
}) {
  validateMandatoryFields({ data: credentials, MANDATORY_FIELDS });

  const { email } = credentials;

  if (!validator.isEmail(email)) {
    throw new Error('Invalid credentials.');
  }
}
