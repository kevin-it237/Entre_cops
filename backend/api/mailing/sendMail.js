require('dotenv').config()

var aws = require('aws-sdk');

const SESConfig = {
    apiVersion: '2010-12-01',
    accessKeyId: process.env.AWS_CLIENT_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
}


module.exports = function (subject, emails, html, cb) {
    
    // Replace sender@example.com with your "From" address.
    // This address must be verified with Amazon SES.
    const sender = "ngaleuabel@gmail.com <ngaleuabel@gmail.com>";
    
    // Replace recipient@example.com with a "To" address. If your account 
    // is still in the sandbox, this address must be verified.
    let recipient = emails;
    
    // The email body for recipients with non-HTML email clients.
    const body_text = "";
    
    // The HTML body of the email.
    const body_html = `<html>
    <head></head>
    <body>
      <h1>Amazon SES Test (Kit SDK pour JavaScript dans Node.js)</h1>
      ${html}
    </body>
    </html>`;
    
    // The character encoding for the email.
    const charset = "UTF-8";
    
    // Create a new SES object. 
    var ses = new aws.SES(SESConfig);
    
    // Specify the parameters to pass to the API.
    var params = {
        Source: sender,
        Destination: {
            ToAddresses: recipient
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: charset
            },
            Body: {
                Text: {
                    Data: body_text,
                    Charset: charset
                },
                Html: {
                    Data: body_html,
                    Charset: charset
                }
            }
        }
    };
    
    //Try to send the email.
    ses.sendEmail(params, cb);


}