const express = require('express')
const app = express()
const cors = require('cors')

const corsOptions = {
    origin: [
        'http://localhost:3000', 
        'https://msubyoteshin.com', 
        'https://msubmovie.vercel.app', 
        'https://msubmovie-qf7i8uyez-aungzawphyos-projects.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(express.json());
app.use(cors(corsOptions))
app.options('*', cors(corsOptions));

const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: 'gmail',
    secure: true,
    name: 'Chat',
    auth: {
        user: "aungzawphyo.dev@gmail.com",
        pass: "zaweyidcteuyqjmr",
    },
})

app.get('/', (req, res, next) => {
    res.status(200).json({ status: true, message: 'Server is running' })
})

app.post('/api/send-email', async(req, res, next) => {
    try {
        const message = req.body.message;
        if (!message) {
            const error = new Error('Message is required.')
            error.statusCode = 422
            throw error
        }
        const mailOptions = {
            from: '"MSub YoteShin" <user@gmail.com>',
            to: 'yethwaycoding@gmail.com',
            subject: `MESSAGE`,
            text: message
        }
        transport.sendMail(mailOptions, function(err, info) {
            if (!err) {
                res.status(200).json({ status: true, message: 'Successfully Sent Message.' })
            } else {
                console.log('*********************', err);
                res.status(422).json({ status: false, message: 'Message Sending Fail!' })
            }
        })
    } catch (error) {
        const statusCode = error.status || 500
        const message = error.message || 'Something Wrong.'
        res.status(statusCode).json({ status: false, message: message })
    }
})

app.listen(6060, () => console.log('server is running on port: 6060'))