// Verify review token and return review details
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
  const token = getRouterParam(event, 'token')

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token is required'
    })
  }

  // For demo, create a mock review if token doesn't exist
  // In production, this would check a database
  if (!reviewTokens.has(token)) {
    // Demo mode - create a mock review for any token
    return {
      valid: true,
      revieweeName: 'Demo Employee',
      reviewType: 'peer',
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false
    }
  }

  const review = reviewTokens.get(token)!

  // Check if expired
  if (new Date() > review.expiresAt) {
    throw createError({
      statusCode: 410,
      message: 'This review link has expired'
    })
  }

  // Check if already completed
  if (review.completed) {
    throw createError({
      statusCode: 410,
      message: 'This review has already been completed'
    })
  }

  return {
    valid: true,
    revieweeName: review.revieweeName,
    reviewType: review.reviewType,
    expiresAt: review.expiresAt.toISOString(),
    completed: review.completed
  }
})
