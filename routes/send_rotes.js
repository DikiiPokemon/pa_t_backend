const Router = require("express")
const router = new Router()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.smtp_Host,
    port: Number(process.env.smtp_Port),
    secure: process.env.smtp_Secure === 'true', 
    auth: {
      user: process.env.smtp_Mail,
      pass: process.env.smtp_Pass,
    },
  });


router.post("/", (req, res) => {

    transporter.verify((err, success) => {
  if (err) {
    console.error('VERIFY ERROR:', err);
  } else {
    console.log('SMTP готов к работе');
  }
});
    
    
    transporter.sendMail({
        from: process.env.smtp_Mail, // sender address
        to: process.env.smtp_Mail, // list of receivers
        subject: "Обратная связь с сайта ПА-Т от " + req.body.fio,
        //subject: "Обратная связь с сайта ПА-Т от " + req.body.fio + ", телефон для обратной связи:" + req.body.phone + ", Почта для обратной связи: " + req.body.mail, // Subject line
        text: req.body.description, // plain text body
        }, (error, info) => {
            if (error) {
                return res.status(404).json({ message: 'Произошла ошибка во время отправки письма', ...error });
            }else{
                return res.status(200).json({ message: 'Письмо успешно отправлено', ...info });
            }
        });
    
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    
   
})


module.exports = router;