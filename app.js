const express = require("express");
const bodyParser = require("body-parser");
const { google } = require('googleapis');
const credentials = require('/path/to/credentials.json');  
const nodemailer = require('nodemailer');
const https = require("https");
const app = express();


const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/script.projects']
  });


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shivamrvgupta@gmail.com',
      pass: 'vryonzxsfexgzihc'
    }
  });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
    var name = req.body.name;
    var city = req.body.city;
    var district = req.body.district;
    var state = req.body.state;
    var phone = req.body.number;
    var email = req.body.email;
    var course = req.body.course;

    const mailOptions = {
        from: 'shivamrvgutpa@gmail.com',
        to: [email, 'rvshivamsahu.1222@gmail.com'].join(','),
        subject: 'Course Enquiry - Follow-up and Next Steps',
        html: "Dear" + name + " Thank you for visiting our website and expressing interest in our " + course + " course . We appreciate your inquiry and would be delighted to provide you with further information. At KLE, we are dedicated to offering high-quality courses that align with your educational and career goals. We understand that choosing the right course is an important decision, and we are here to assist you throughout the process.We would like to schedule a consultation with you to discuss your specific requirements and answer any questions you may have. Our team of experienced advisors will guide you in selecting the most suitable course, ensuring that it meets your needs and expectations.</p>"
      };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error occurred:', error.message);
          res.sendFile(__dirname + "/failure.html")
        } else {
          console.log('Email sent successfully!');
          res.sendFile(__dirname + "/success.html")
          console.log('Message ID:', info.messageId);
        }
      });
});


app.post("/failure", function(req,res) {
    res.redirect("/")
})

app.listen(8000, function () {
    console.log("server is listening");
});
