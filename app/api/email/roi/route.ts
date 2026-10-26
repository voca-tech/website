import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export async function POST(request: NextRequest) {
  const {
    leadName,
    email,
    phone,
    employees,
    features,
    platformCount,
    monthlySpendInformed,
    currentMonthlySpend,
    vocaMonthlySpend,
    monthlySavings,
    totalSavings,
    percentSavings,
    contractMonths,
    noSavings,
  } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const featuresList =
    Array.isArray(features) && features.length > 0
      ? features.map((f: string) => escapeHtml(String(f))).join(", ")
      : "Nenhuma";

  const spendInformedBlock =
    monthlySpendInformed === null || monthlySpendInformed === undefined
      ? "Não informado (usou estimativa de mercado)"
      : formatCurrency(Number(monthlySpendInformed));

  const savingsNote = noSavings
    ? "<br /><b>Observação:</b> Gasto informado abaixo da estimativa VOCA — caso sem economia de preço.<br />"
    : "";

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: ["ronaldo@voca.com.br", "cristiano@voca.com.br"],
    cc: process.env.MY_EMAIL,
    subject: `[Site VOCA] Novo LEAD ROI: ${leadName}`,
    html: `
      <h2>Lead — Calculadora de ROI</h2>
      <h3>Contato</h3>
      <b>Nome:</b> ${escapeHtml(String(leadName))} <br />
      <b>Telefone:</b> ${escapeHtml(String(phone || "Não Informado"))} <br />
      <b>Email Corporativo:</b> ${escapeHtml(String(email))} <br />

      <h3>Operação informada</h3>
      <b>Colaboradores:</b> ${Number(employees)} <br />
      <b>Plataformas hoje:</b> ${Number(platformCount)} <br />
      <b>Gasto mensal informado:</b> ${spendInformedBlock} <br />
      <b>Funcionalidades (${Array.isArray(features) ? features.length : 0}):</b> ${featuresList} <br />

      <h3>Resultado da simulação</h3>
      <b>Gasto atual considerado:</b> ${formatCurrency(Number(currentMonthlySpend))} /mês <br />
      <b>Gasto estimado com VOCA:</b> ${formatCurrency(Number(vocaMonthlySpend))} /mês <br />
      <b>Economia mensal:</b> ${formatCurrency(Number(monthlySavings))} <br />
      <b>Economia em ${Number(contractMonths)} meses:</b> ${formatCurrency(Number(totalSavings))} <br />
      <b>% de economia:</b> ${Number(percentSavings)}% <br />
      ${savingsNote}
      <br />
      <span>*Enviado através da calculadora de ROI do site em ${new Date()}</span>
    `,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) resolve("Email sent");
        else reject(err.message);
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent", status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err, status: 500 });
  }
}
