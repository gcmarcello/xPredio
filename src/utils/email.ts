import nodemailer from "nodemailer";

// Configuração do transporte de e-mails (SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Servidor SMTP (exemplo: Gmail)
  port: 587, // Porta SMTP
  secure: false, // false para STARTTLS, true para SSL
  auth: {
    user: "vitor.rubi.oliveira@gmail.com", // e-mail
    pass: "zfmm mtat ddya yraz", // senha de aplicativo
  },
});

// Função para enviar o e-mail
export async function sendRecoveryEmail(email: string, token: string) {
  const recoveryLink = `https://xdpredio.com/recover-account?token=${token}`;

  const mailOptions = {
    from: '"XD Predio" <vitor.rubi.oliveira@gmail.com>', // email meu pessoal para teste
    to: email, // email do destinatário
    subject: "Recuperação de Conta", // Assunto do email
    text: `Clique no link para recuperar sua conta: ${recoveryLink}`, // Corpo do email
    html: `<p>Clique no link para recuperar sua conta: <a href="${recoveryLink}">Recuperar Conta</a></p>`, // Corpo do email em HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`E-mail de recuperação enviado para ${email}`);
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    throw new Error("Falha ao enviar o e-mail de recuperação.");
  }
}

//FUNÇÃO DE TESTE
// export async function sendExampleEmail() {
//   const recoveryLink = `https://xdpredio.com/recover-account?token`;

//   const mailOptions = {
//     from: '"XD Predio" <vitor.rubi.oliveira@gmail.com>', // email meu pessoal para teste
//     to: "vitor.rubi.oliveira@gmail.com", // email do destinatário
//     subject: "Recuperação de Conta", // Assunto do email
//     text: `Clique no link para recuperar sua conta: ${recoveryLink}`, // Corpo do email
//     html: `<p>Clique no link para recuperar sua conta: <a href="${recoveryLink}">Recuperar Conta</a></p>`, // Corpo do email em HTML
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`E-mail de recuperação enviado para vitor`);
//   } catch (error) {
//     console.error("Erro ao enviar o e-mail:", error);
//     throw new Error("Falha ao enviar o e-mail de recuperação.");
//   }
// }
