import axios from 'axios';
require('dotenv').config();


export async function sendSMS(data){
    const options = {
        method: 'POST',
        url: 'https://api.d7networks.com/messages/v1/send',
        headers: {
          Authorization: `Bearer ${process.env.SMS_AUTH_TOKEN}`,
          'content-type': 'application/json',
          Accept: 'application/json'
        },
        data: {
          messages: [
            {
              channel: 'sms',
              recipients: [data.phone],
              content: `Hi, I am ${data.name}, Please Help me.`, // need to add link to ack
              msg_type: 'text',
              data_coding: 'text'
            }
          ],
          message_globals: {
            originator: 'SignOTP',
            report_url: 'https://the_url_to_recieve_delivery_report.com'
          }
        }
      };

      try {
        const { data } = await axios.request(options);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    
}