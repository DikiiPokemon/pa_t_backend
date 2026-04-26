const ApiError = require("../Error/ApiError")
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

const generateProductsTable = (products, text) => {
  const rows = products.map(p => `
    <tr>
      <td style="padding:8px;border:1px solid #ddd;">${p.id}</td>
      <td style="padding:8px;border:1px solid #ddd;">${p.number}</td>
      <td style="padding:8px;border:1px solid #ddd;">${p.price} руб.</td>
      <td style="padding:8px;border:1px solid #ddd;">${p.price * p.number} руб.</td>
    </tr>
  `).join("");

  const total = products.reduce((sum, p) => sum + p.price * p.number, 0);

  return `
    <h2>Заказ</h2>
    <table style="border-collapse:collapse;width:100%;font-family:Arial;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th style="padding:8px;border:1px solid #ddd;">Модификация</th>
          <th style="padding:8px;border:1px solid #ddd;">Кол-во</th>
          <th style="padding:8px;border:1px solid #ddd;">Цена</th>
          <th style="padding:8px;border:1px solid #ddd;">Сумма</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <h3 style="margin-top:16px;">Итого: ${total} руб.</h3>
    <h1>Примечание к заказу:</h1>
    <p>${text}</p>
  `;
};


router.post("/", (req, res, next) => {

  const {theme, name, mail, text, check} = req.body
  
  if(!check){
    return next(ApiError.badRequest("Необходимо согласие на обработку данных!"))
  }

  if(!theme || !name || !mail || !text){
    return next(ApiError.badRequest("Не заданы обязательные поля!"))
  }


  transporter.sendMail({
    from: process.env.smtp_Mail, // sender address
    to: process.env.smtp_Mail, // list of receivers
    subject: "Обратная связь с сайта ПА-Т от " + req.body.name + ", Почта для обратной связи: " + req.body.mail + ", Тема сообщения: " + req.body.theme, // Subject line
    text: req.body.text, // plain text body
    }, (error, info) => {
    if (error) {
      return res.status(404).json({ message: 'Произошла ошибка во время отправки письма'});
    }else{
      return res.status(200).json({ message: 'Письмо успешно отправлено'});
    }
  });
    
   
})

router.post("/cart", (req, res) => {

  const {name, mail, phone, text, check, cart} = req.body
  
  if(!check){
    return next(ApiError.badRequest("Необходимо согласие на обработку данных!"))
  }

  if(!cart){
    return next(ApiError.badRequest("Простите, мы потеряли товары, которые вы добавили("))
  }

  if(!name || !mail || !phone){
    return next(ApiError.badRequest("Не заданы обязательные поля!"))
  }

  const products = JSON.parse(cart)
  const html = generateProductsTable(products, text);



  transporter.sendMail({
    from: process.env.smtp_Mail, // sender address
    to: process.env.smtp_Mail, // list of receivers
    subject: "Заказ на товары с сайта ПА-Т от " + req.body.name + ", телефон для обратной связи:" + req.body.phone + ", Почта для обратной связи: " + req.body.mail, // Subject line
    text: req.body.text,
    html
    }, (error, info) => {
    if (error) {
      return res.status(404).json({ message: 'Произошла ошибка во время отправки письма'});
    }else{
      return res.status(200).json({ message: 'Письмо успешно отправлено'});
    }
  });
    
   
})


module.exports = router;