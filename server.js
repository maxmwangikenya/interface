require('dotenv').config();
const express = require('express')
const app = express()
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Order = require('./models/Orders')
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DBENV,{useNewUrlParser: true,useUnifiedTopology: true})
        .then(()=> console.log("Database connected"))
        .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/test',async(req,res)=> {
    const account = req.body.account
    const amount = req.body.amount
    

    console.log(account, amount)

    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "itsthindi@gmail.com",
        pass: "ynbgzxupqcikhtig",
    },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'itsthindi@gmail.com', // sender address
        to: req.body.mail, // list of receivers
        subject: "Account Request", // Subject line
        text: "Request for a"+account+" account provision for " +req.body.mail+".", // plain text body
        html: `<b>Request for a `+account+` account provision for ` +req.body.mail+`.</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    
    }

    main().catch(console.error);

    const order = new Order({
        custname: req.body.mail,
        account: account,
        amount: amount
      })
    
      try{
        const cafeposted = await order.save()
        console.log(cafeposted)
      }catch(err){
        console.log(err)
      }

    res.send("Good")
})

app.get('/myadmin', async(req,res)=> {
    const filter = {};
    const all = await Order.find(filter);
    //console.log(all)
    res.json(all)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function mymailer(themail,account){
    const mail = themail
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "itsthindi@gmail.com",
    pass: "ynbgzxupqcikhtig",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'itsthindi@gmail.com', // sender address
    to: "${mail}", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  
}

main().catch(console.error);
}