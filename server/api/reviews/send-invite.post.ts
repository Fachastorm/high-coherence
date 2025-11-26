import { sendReviewInvite } from '../../utils/resend'
import { randomUUID } from 'crypto'

// In-memory store for demo - replace with database in production
const reviewTokens = new Map<string, {
  revieweeId: string
  revieweeName: string
  reviewType: 'peer' | 'manager' | 'direct-report'
  recipientEmail: string
  createdAt: Date
  expiresAt: Date
  completed: boolean
}>()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    recipientEmail,
    revieweeId,
    revieweeName,
    reviewType
  } = body

  if (!recipientEmail || !revieweeId || !revieweeName || !reviewType) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  // Generate unique token
  const token = randomUUID()

  // Store token with review details
  reviewTokens.set(token, {
    revieweeId,
    revieweeName,
    reviewType,
    recipientEmail,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    completed: false
  })

  // Send email via Resend
  const result = await sendReviewInvite(
    recipientEmail,
    revieweeName,
    token,
    reviewType
  )

  if (!result.success) {
    throw createError({
      statusCode: 500,
      message: 'Failed to send review invite email'
    })
  }

  return {
    success: true,
    message: 'Review invite sent successfully',
    token // Return token for testing/demo purposes
  }
})

// Export for use in other routes
export { reviewTokens }
