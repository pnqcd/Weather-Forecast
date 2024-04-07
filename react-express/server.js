const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require('nodemailer');

const app = express();

// Serve the static files from the React app
const path = __dirname + '/app/views/'
app.use(express.static(path));

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path + "index.html");
});


const apiKey = '56ed530bd4d4475289491812240404';

app.get('/weather/:location', async (req, res) => {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${req.params.location}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

const EMAIL_USER = 'ptqjava@gmail.com';
const EMAIL_PASS = 'ptqjava123';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    console.log(email)
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Subscription Confirmation',
        text: `You've successfully subscribed to weather updates.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending mail: ', error);
            res.status(500).json({message: 'Error sending confirmation email'});
        } else {
            res.json({message: 'Subscription successful'});
        }
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
})