require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid);
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client =  require('twilio')(accountSid, authToken);

client.messages.create({
  // dummie phone number: +19292948737
  // the number of free texts is limited, use the feature wisely
  body: 'yo food will be ready in 10 minutes, come pick it up until someone else does !!!',
  from: '',
  to: ''
})
  .then(message => console.log(message))
  .catch((err) => console.log(err));
