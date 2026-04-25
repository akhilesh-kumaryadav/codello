import { SESClient, SESClientConfig } from '@aws-sdk/client-ses';

const REGION = 'ap-south-1';

const AWS_SES_ACCESS_KEY = process.env.AWS_SES_ACCESS_KEY;
const AWS_SES_SECRET_KEY = process.env.AWS_SES_SECRET_KEY;

if (!AWS_SES_ACCESS_KEY || !AWS_SES_SECRET_KEY) {
  throw new Error('Missing AWS SES credentials in environment variables');
}

const config: SESClientConfig = {
  region: REGION,
  credentials: {
    accessKeyId: AWS_SES_ACCESS_KEY,
    secretAccessKey: AWS_SES_SECRET_KEY,
  },
};

const sesClient = new SESClient(config);

export { sesClient };
