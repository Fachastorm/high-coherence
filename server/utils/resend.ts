import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendReviewInvite(
  toEmail: string,
  revieweeNane: string,
  reviewToken: string,
  reviewType: 'peer' | 'manager' | 'direct-report'
) {
  const baseUrl = process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const reviewUrl = `${baseUrl}/review/${reviewToken}`

  const typeLabels = {
    'peer': 'Peer Review',
    'manager': 'Manager Review',
    'direct-report': 'Direct Report Review'
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'High Coherence <reviews@highcoherence.com>',
      to: toEmail,
      subject: `360 Review Request: ${typeLabels[reviewType]} for ${revieweeNane}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { width: 48px; height: 48px; background: #2563eb; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; margin: 20px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
            .note { background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h1 style="margin: 0; color: #111827;">360 Review Request</h1>
            </div>

            <p>Hello,</p>

            <p>You've been invited to provide a <strong>${typeLabels[reviewType]}</strong> for <strong>${revieweeNane}</strong> as part of our 360-degree feedback process.</p>

            <div class="note">
              <strong>🔒 Your feedback is completely anonymous.</strong><br>
              Your responses will be aggregated with others and individual responses will never be shared with the person being reviewed or their manager.
            </div>

            <p>The review takes approximately 5-10 minutes to complete and covers:</p>
            <ul>
              <li>Performance & work quality</li>
              <li>Collaboration & communication</li>
              <li>Leadership & growth potential</li>
            </ul>

            <div style="text-align: center;">
              <a href="${reviewUrl}" class="button">Complete Review</a>
            </div>

            <p>This link is unique to you and will expire in 14 days.</p>

            <div class="footer">
              <p>High Coherence - Employee Development Platform</p>
              <p style="font-size: 12px;">If you believe you received this email in error, please ignore it.</p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}
