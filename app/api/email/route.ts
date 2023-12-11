import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
    const { email, leadName, phone } = await request.json();
    const parsedPhone = phone === "" ? 'Não Informado' : phone

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        // to: process.env.MY_EMAIL,
        to: ['ronaldo@voca.com.br', 'cristiano@voca.com.br'],
        cc: process.env.MY_EMAIL,
        subject: `[Site VOCA] Novo LEAD: ${leadName}`,
        html: `<h2>Dados do LEAD</h2> <b>Nome:</b> ${leadName} <br /> <b>Telefone:</b> ${parsedPhone} <br /> <b>Email Corporativo:</b> ${email} <br /><br /> <span>*Enviado através do formulário de contato do site em ${new Date()}</span>`,
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