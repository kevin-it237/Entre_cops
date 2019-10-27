
module.exports = function () {
    
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    const msg = {
      to: 'ngaleuabel@gmail.com',
      from: 'test@example.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    });
}

