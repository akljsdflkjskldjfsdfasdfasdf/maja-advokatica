import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, date } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Nedostaju obavezna polja" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email advokatici
    await transporter.sendMail({
      from: `"Sajt - Ana Petrović Advokat" <${process.env.GMAIL_USER}>`,
      to: process.env.LAWYER_EMAIL,
      replyTo: email,
      subject: `📋 Nova poruka: ${subject || "Zakazivanje termina"} — ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#0d0c0a;font-family:Georgia,serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0c0a;padding:40px 20px;">
            <tr><td>
              <table width="600" cellpadding="0" cellspacing="0" style="margin:0 auto;background:#161411;border:1px solid #b8952a;">
                <tr>
                  <td style="padding:40px;border-bottom:1px solid #2e2b26;">
                    <p style="color:#b8952a;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 12px 0;font-family:'DM Sans',sans-serif;">Ana Petrović | Advokat</p>
                    <h1 style="color:#d4af65;font-size:26px;margin:0;font-weight:600;">Nova poruka sa sajta</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #2e2b26;">
                          <span style="color:#b8952a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:'DM Sans',sans-serif;">Ime i prezime</span><br>
                          <span style="color:#f0ece4;font-size:18px;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #2e2b26;">
                          <span style="color:#b8952a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:'DM Sans',sans-serif;">Email adresa</span><br>
                          <span style="color:#f0ece4;font-size:18px;"><a href="mailto:${email}" style="color:#d4af65;text-decoration:none;">${email}</a></span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #2e2b26;">
                          <span style="color:#b8952a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:'DM Sans',sans-serif;">Telefon</span><br>
                          <span style="color:#f0ece4;font-size:18px;">${phone || "Nije navedeno"}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #2e2b26;">
                          <span style="color:#b8952a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:'DM Sans',sans-serif;">Oblast prava / Predmet</span><br>
                          <span style="color:#f0ece4;font-size:18px;">${subject || "Nije navedeno"}</span>
                        </td>
                      </tr>
                      ${
                        date
                          ? `<tr>
                        <td style="padding:12px 0;border-bottom:1px solid #2e2b26;">
                          <span style="color:#b8952a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:'DM Sans',sans-serif;">Željeni datum termina</span><br>
                          <span style="color:#f0ece4;font-size:18px;">${date}</span>
                        </td>
                      </tr>`
                          : ""
                      }
                      <tr>
                        <td style="padding:24px 0 0 0;">
                          <span style="color:#b8952a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:'DM Sans',sans-serif;">Poruka</span><br>
                          <p style="color:#f0ece4;font-size:17px;line-height:1.8;margin:8px 0 0 0;">${message.replace(/\n/g, "<br>")}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 40px;border-top:1px solid #2e2b26;">
                    <p style="color:#c8c0b0;font-size:13px;margin:0;font-family:'DM Sans',sans-serif;">Odgovorite direktno na ovaj email — reply ide na <strong style="color:#d4af65;">${email}</strong></p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    // Potvrdan email klijentu
    await transporter.sendMail({
      from: `"Ana Petrović | Advokat" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Potvrda prijema poruke — Ana Petrović Advokat`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#0d0c0a;font-family:Georgia,serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0c0a;padding:40px 20px;">
            <tr><td>
              <table width="600" cellpadding="0" cellspacing="0" style="margin:0 auto;background:#161411;border:1px solid #b8952a;">
                <tr>
                  <td style="padding:40px;border-bottom:1px solid #2e2b26;">
                    <p style="color:#b8952a;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 12px 0;">Ana Petrović | Advokat</p>
                    <h1 style="color:#d4af65;font-size:26px;margin:0;font-weight:600;">Hvala na poruci, ${name.split(" ")[0]}.</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px;">
                    <p style="color:#f0ece4;font-size:18px;line-height:1.8;margin:0 0 20px 0;">Vaša poruka je uspešno primljena. Javiću Vam se u najkraćem mogućem roku, najkasnije u roku od <strong style="color:#d4af65;">24 časa</strong> u toku radnog dana.</p>
                    <p style="color:#c8c0b0;font-size:16px;line-height:1.8;margin:0;">Za hitne predmete, možete me kontaktirati direktno telefonom.</p>
                    <hr style="border:none;border-top:1px solid #2e2b26;margin:30px 0;">
                    <p style="color:#b8952a;font-size:13px;margin:0;">Ana Petrović, advokat<br>
                    <span style="color:#c8c0b0;">Beograd, Srbija</span></p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email greška:", error);
    return NextResponse.json(
      { success: false, error: "Greška pri slanju emaila" },
      { status: 500 },
    );
  }
}
