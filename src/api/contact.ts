import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer'; // Nodemailerをインポート

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const email = data.get('email');
  const subject = data.get('subject');
  const message = data.get('message');

  if (!email || !subject || !message) {
    return new Response(JSON.stringify({ error: 'すべての項目を入力してください' }), { status: 400 });
  }

  try {
    // GmailのSMTPサーバー情報
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: '<YOUR_GMAIL_ADDRESS>', // 例: myname@gmail.com
        pass: '<YOUR_APP_PASSWORD>', // ここに生成したアプリパスワードを貼り付け
      },
    });

    const mailOptions = {
      from: 'noreply@yourdomain.com', // この部分は任意の表示名でOK
      to: '<YOUR_GMAIL_ADDRESS>', // メールを受信したいあなたのGmailアドレス
      subject: `ウェブサイトからのお問い合わせ: ${subject}`,
      text: `送信元メールアドレス: ${email}\n\n内容:\n${message}`,
      replyTo: email as string,
    };

    await transporter.sendMail(mailOptions);
    console.log('メール送信に成功しました！');
    
    return redirect('/contact-success');

  } catch (error) {
    console.error('メール送信に失敗しました:', error);
    return new Response(JSON.stringify({ error: 'メールの送信に失敗しました。' }), { status: 500 });
  }
};