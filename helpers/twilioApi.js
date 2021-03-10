require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid);
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client =  require('twilio')(accountSid, authToken);


const sendSms = function(clientsNumber, message) {
  client.messages.create({
    // dummie phone number: +19292948737
    // the number of free texts is limited, use the feature wisely
    body: message,
    from: '+19292948737',
    to: clientsNumber
  })
    .then(message => console.log(message))
    .catch((err) => console.log(err));

};




module.exports = sendSms;
