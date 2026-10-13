import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
    const { email, leadName, phone, message } = await request.json();
    const parsedPhone = phone === "" ? 'Não Informado' : escapeHtml(phone)

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const messageBlock = message
        ? `<br /><b>Mensagem:</b><br /> ${escapeHtml(message).replace(/\n/g, '<br />')} <br />`
        : '';

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: ['ronaldo@voca.com.br', 'cristiano@voca.com.br'],
        cc: process.env.MY_EMAIL,
        subject: `[Site VOCA] Novo LEAD: ${leadName}`,
        html: `<h2>Dados do LEAD</h2> <b>Nome:</b> ${escapeHtml(leadName)} <br /> <b>Telefone:</b> ${parsedPhone} <br /> <b>Email Corporativo:</b> ${escapeHtml(email)} <br /> ${messageBlock}<br /> <span>*Enviado através do formulário de contato do site em ${new Date()}</span>`,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        return NextResponse.json({ message: 'Email sent', status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err, status: 500 });
    }
}