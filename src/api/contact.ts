import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer'; // Nodemailerをインポート

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const email = data.get('email'); // ユーザーのメールアドレスを取得
  const subject = data.get('subject');
  const message = data.get('message');

  // 必須項目が入力されているか確認
  if (!email || !subject || !message) {
    return new Response(JSON.stringify({ error: 'すべての項目を入力してください' }), { status: 400 });
  }

  try {
    // Nodemailerのトランスポーター（メール送信者）を設定
    // ★重要★: ここにあなたのメールサーバー情報を設定してください
    // この情報は、あなたが利用しているメールサービス（Gmail, Outlook, プロバイダなど）によって異なります。
    const transporter = nodemailer.createTransport({
      host: 'your_email_host.com', // 例: smtp.gmail.com
      port: 587,
      secure: false, // TLSを使用する場合はtrue
      auth: {
        user: 'your_email_address@example.com', // あなたのメールアドレス
        pass: 'your_email_password', // あなたのメールパスワード
      },
    });

    // 送信するメールの内容を設定
    const mailOptions = {
      from: 'noreply@yourdomain.com', // フォーム送信元として設定するメールアドレス
      to: 'your_email_address@example.com', // ★あなたの受信メールアドレス★
      subject: `ウェブサイトからのお問い合わせ: ${subject}`,
      text: `メールアドレス: ${email}\n\n内容:\n${message}`,
      replyTo: email as string, // 返信ボタンを押した際にユーザーのメールアドレスが宛先にセットされる
    };

    // メールを送信
    await transporter.sendMail(mailOptions);

    console.log('メール送信に成功しました！');
    
    // 成功した場合は、完了ページにリダイレクト
    return redirect('/contact-success');

  } catch (error) {
    console.error('メール送信に失敗しました:', error);
    return new Response(JSON.stringify({ error: 'メールの送信に失敗しました。' }), { status: 500 });
  }
};