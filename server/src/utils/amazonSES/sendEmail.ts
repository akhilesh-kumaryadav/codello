import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from './sesClient';

const createSendEmailCommand = ({
  toAddress,
  fromAddress,
  body,
  subject,
}: {
  toAddress: string;
  fromAddress: string;
  body: string;
  subject: string;
}) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<h1>${body}</h1>`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'This is text body',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async ({ body, subject }: { body: string; subject: string }) => {
  const sendEmailCommand = createSendEmailCommand({
    toAddress: 'akhileshkumaryadav2407@gmail.com',
    fromAddress: 'connection@codello-by-akki.club',
    body,
    subject,
  });

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === 'MessageRejected') {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

export default { run };
