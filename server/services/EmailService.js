const nodemailer = require("nodemailer");
const inlineBase64 = require('nodemailer-plugin-inline-base64')

const sendEmailCreateOrder = async(email, orderItems) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "helpfulman20032003@gmail.com",
          pass: "xiipqznwtyxbgplr",
        },
      });

      transporter.use('compile', inlineBase64({ cidPrefix: 'my-prefix-' }));

      let listItem = ''
      const attachImage = []
      orderItems?.forEach(order => {
        listItem += `<div>
        <div>Số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
        <div>Bên dưới là hình ảnh sản phẩm</div>
        </div>`
        attachImage.push({path: order.image})
      });

      const info = await transporter.sendMail({
        from: 'helpfulman20032003@gmail.com', // sender address
        to: "helpfulman20032003@gmail.com", // list of receivers
        subject: "Bạn đã đặt hàng bên shop", // Subject line
        text: "Hello world?", // plain text body
        html: `<div><b>Bạn đã đặt hàng thành công tại shop</b></div>${listItem}`, // html body
        attachments: attachImage,
      });
}

module.exports = sendEmailCreateOrder