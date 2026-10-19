import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { email, token, name } = await request.json();

    if (!email || !token) {
      return NextResponse.json(
        { success: false, error: 'Email dan token verifikasi wajib disertakan.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanToken = String(token).trim();
    const displayName = name ? String(name).trim() : 'Mahasiswa / Rekan Mentor';

    const emailSubject = `[Career Bridge] Kode Verifikasi Reset Kata Sandi: ${cleanToken}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${emailSubject}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
            .container { max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { background: linear-gradient(135deg, #064e3b 0%, #047857 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0; font-size: 13px; color: #a7f3d0; font-weight: 500; }
            .content { padding: 32px 24px; }
            .greeting { font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
            .body-text { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px; }
            .code-box { background-color: #ecfdf5; border: 2px dashed #059669; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
            .code-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #047857; margin-bottom: 8px; }
            .code-number { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 32px; font-weight: 900; letter-spacing: 0.25em; color: #064e3b; margin: 0; }
            .warning-box { background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 6px; font-size: 12px; color: #64748b; line-height: 1.5; margin: 20px 0; }
            .footer { background-color: #f1f5f9; padding: 20px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Career Bridge</h1>
              <p>Platform Kesiapan Karier Mahasiswa Teknik & Energi ITS</p>
            </div>
            <div class="content">
              <div class="greeting">Halo ${displayName},</div>
              <p class="body-text">
                Kami menerima permintaan untuk mengatur ulang kata sandi akun Career Bridge Anda yang terdaftar pada email: <strong>${cleanEmail}</strong>.
              </p>
              <p class="body-text">
                Gunakan 6 digit kode verifikasi keamanan berikut untuk membuat kata sandi baru:
              </p>
              <div class="code-box">
                <div class="code-label">Kode Verifikasi Keamanan</div>
                <div class="code-number">${cleanToken}</div>
              </div>
              <div class="warning-box">
                <strong>Peringatan Keamanan:</strong> Kode ini bersifat rahasia dan berlaku selama 15 menit. Jangan pernah membagikan kode ini kepada siapa pun termasuk pihak yang mengatasnamakan Career Bridge.
              </div>
              <p class="body-text" style="font-size: 12px; color: #64748b;">
                Jika Anda tidak merasa meminta pengaturan ulang kata sandi, abaikan email ini. Akun Anda tetap aman dan tidak ada perubahan apa pun yang dibuat.
              </p>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Career Bridge • Departemen Teknik Elektro, FTEIC ITS Surabaya.<br>
              Inisiatif Pengembangan Karier Mahasiswa Teknik & Energi.
            </div>
          </div>
        </body>
      </html>
    `;

    // 1. Try sending with Resend API if API key provided
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const sendResult = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Career Bridge <onboarding@resend.dev>',
          to: [cleanEmail],
          subject: emailSubject,
          html: emailHtml,
        });

        console.log('[CareerBridge Mail] Dispatched via Resend:', sendResult);
        return NextResponse.json({
          success: true,
          delivered: true,
          provider: 'resend',
          message: 'Email verifikasi berhasil dikirim via Resend.',
        });
      } catch (resendErr) {
        console.error('[CareerBridge Mail] Resend dispatch failed:', resendErr);
      }
    }

    // 2. Try sending with Nodemailer (Gmail / SMTP) if credentials provided
    const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.SMTP_SERVICE || 'gmail',
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
          secure: process.env.SMTP_SECURE === 'true' || true,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const info = await transporter.sendMail({
          from: process.env.EMAIL_FROM || `"Career Bridge ITS" <${smtpUser}>`,
          to: cleanEmail,
          subject: emailSubject,
          html: emailHtml,
        });

        console.log('[CareerBridge Mail] Dispatched via Nodemailer SMTP:', info.messageId);
        return NextResponse.json({
          success: true,
          delivered: true,
          provider: 'smtp',
          messageId: info.messageId,
          message: 'Email verifikasi berhasil dikirim via SMTP.',
        });
      } catch (smtpErr) {
        console.error('[CareerBridge Mail] SMTP dispatch failed:', smtpErr);
      }
    }

    // 3. Fallback when SMTP credentials are not yet configured in env variables
    console.warn(
      `[CareerBridge Mail] Reset request for ${cleanEmail}. Token generated: ${cleanToken}. (To deliver live emails to ${cleanEmail}, configure EMAIL_USER & EMAIL_PASS or RESEND_API_KEY in Vercel environment variables).`
    );

    return NextResponse.json({
      success: true,
      delivered: false,
      provider: 'none',
      message: 'Email verifikasi telah diproses oleh sistem.',
    });
  } catch (error: any) {
    console.error('[CareerBridge Mail] Server error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal memproses pengiriman email.' },
      { status: 500 }
    );
  }
}
