const twilio = require('twilio')
const accountSid = 'AC74f138e835fe0c8987ed18c36551e92d'
const authToken = '0aaeb54824bc08864169e492ae8ef4cc'
const client = twilio(accountSid, authToken)

client.messages
  .create({
    body: 'Vui long nop le phi qua STK: Vietcombank 0531002575122',
    from: '+13475072738',
    to: '+84772010496',
  })
  .then((message) => {
    console.log(JSON.stringify(message, null, 2))
  })
  .catch((err) => console.error(err))
