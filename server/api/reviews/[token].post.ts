// Submit anonymous review
const reviewTokens = new Map<string, {
  revieweeId: string
  revieweeName: string
  reviewType: 'peer' | 'manager' | 'direct-report'
  recipientEmail: string
  createdAt: Date
  expiresAt: Date
  completed: boolean
}>()

// Store for aggregated review responses - anonymous
const reviewResponses = new Map<string, {
  revieweeId: string
  responses: Array<{
    reviewType: string
    submittedAt: Date
    scores: Record<string, number>
    comments: Record<string, string>
  }>
}>()

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, 'token')
  const body = await readBody(event)

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token is required'
    })
  }

  const { scores, comments } = body

  if (!scores) {
    throw createError({
      statusCode: 400,
      message: 'Scores are required'
    })
  }

  // For demo mode - accept any submission
  // In production, validate token against database
  const revieweeId = 'demo-employee-id'
  const reviewType = 'peer'

  // Store anonymous response (no connection to email)
  if (!reviewResponses.has(revieweeId)) {
    reviewResponses.set(revieweeId, {
      revieweeId,
      responses: []
    })
  }

  reviewResponses.get(revieweeId)!.responses.push({
    reviewType,
    submittedAt: new Date(),
    scores,
    comments: comments || {}
  })

  // Mark token as completed if it exists
  if (reviewTokens.has(token)) {
    const review = reviewTokens.get(token)!
    review.completed = true
  }

  return {
    success: true,
    message: 'Thank you! Your anonymous feedback has been submitted.'
  }
})

// Export for admin dashboard
export { reviewResponses }
