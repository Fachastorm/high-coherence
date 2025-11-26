<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const route = useRoute()
const token = route.params.token as string

const loading = ref(true)
const submitting = ref(false)
const submitted = ref(false)
const error = ref<string | null>(null)
const reviewData = ref<{
  revieweeName: string
  reviewType: string
  expiresAt: string
} | null>(null)

const currentStep = ref(0)

const categories = [
  {
    name: 'Performance',
    description: 'Work quality, productivity, and goal achievement',
    questions: [
      { id: 'perf_1', text: 'Consistently meets deadlines and delivers quality work', score: 0 },
      { id: 'perf_2', text: 'Takes initiative and goes beyond basic requirements', score: 0 },
      { id: 'perf_3', text: 'Effectively manages their workload and priorities', score: 0 },
      { id: 'perf_4', text: 'Demonstrates expertise in their role', score: 0 },
    ]
  },
  {
    name: 'Collaboration',
    description: 'Teamwork, communication, and interpersonal skills',
    questions: [
      { id: 'collab_1', text: 'Communicates clearly and effectively with team members', score: 0 },
      { id: 'collab_2', text: 'Actively contributes to team discussions and projects', score: 0 },
      { id: 'collab_3', text: 'Is receptive to feedback and different perspectives', score: 0 },
      { id: 'collab_4', text: 'Supports and helps colleagues when needed', score: 0 },
    ]
  },
  {
    name: 'Leadership',
    description: 'Influence, mentorship, and growth potential',
    questions: [
      { id: 'lead_1', text: 'Inspires and motivates others around them', score: 0 },
      { id: 'lead_2', text: 'Handles conflicts and difficult situations professionally', score: 0 },
      { id: 'lead_3', text: 'Mentors or supports the development of others', score: 0 },
      { id: 'lead_4', text: 'Shows potential for increased responsibility', score: 0 },
    ]
  },
  {
    name: 'Growth Areas',
    description: 'Development opportunities and recommendations',
    questions: []
  }
]

const comments = ref({
  strengths: '',
  improvements: '',
  recommendations: ''
})

// Fetch review details
onMounted(async () => {
  try {
    const data = await $fetch(`/api/reviews/${token}`)
    reviewData.value = data as typeof reviewData.value
    loading.value = false
  } catch (e: any) {
    error.value = e.data?.message || 'This review link is invalid or has expired'
    loading.value = false
  }
})

const currentCategory = computed(() => categories[currentStep.value])
const progress = computed(() => ((currentStep.value + 1) / categories.length) * 100)

const canProceed = computed(() => {
  if (currentStep.value === categories.length - 1) {
    // Last step - comments are optional
    return true
  }
  // Check if all questions in current category are answered
  return currentCategory.value.questions.every(q => q.score > 0)
})

const nextStep = () => {
  if (currentStep.value < categories.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitReview = async () => {
  submitting.value = true

  // Collect all scores
  const scores: Record<string, number> = {}
  categories.forEach(cat => {
    cat.questions.forEach(q => {
      scores[q.id] = q.score
    })
  })

  try {
    await $fetch(`/api/reviews/${token}`, {
      method: 'POST',
      body: {
        scores,
        comments: comments.value
      }
    })
    submitted.value = true
  } catch (e: any) {
    error.value = e.data?.message || 'Failed to submit review'
  } finally {
    submitting.value = false
  }
}

const typeLabels: Record<string, string> = {
  'peer': 'Peer Review',
  'manager': 'Manager Review',
  'direct-report': 'Direct Report Review'
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <UIcon name="i-lucide-loader-2" class="size-8 text-blue-600 animate-spin mx-auto mb-4" />
      <p class="text-gray-600">Loading review...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-12">
      <UCard class="bg-white">
        <div class="text-center py-8">
          <div class="size-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
            <UIcon name="i-lucide-x" class="size-8 text-red-600" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Link Invalid</h2>
          <p class="text-gray-600">{{ error }}</p>
        </div>
      </UCard>
    </div>

    <!-- Submitted -->
    <div v-else-if="submitted" class="text-center py-12 animate-fade-in-up">
      <UCard class="bg-white">
        <div class="text-center py-8">
          <div class="size-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
            <UIcon name="i-lucide-check" class="size-8 text-green-600" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Thank You!</h2>
          <p class="text-gray-600 mb-6">Your anonymous feedback has been submitted successfully.</p>
          <p class="text-sm text-gray-500">You can close this window now.</p>
        </div>
      </UCard>
    </div>

    <!-- Review Form -->
    <div v-else class="animate-fade-in-up">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="size-14 mx-auto rounded-xl bg-blue-600 flex items-center justify-center mb-4">
          <UIcon name="i-lucide-activity" class="size-7 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">360 Feedback Review</h1>
        <p class="text-gray-600">
          {{ typeLabels[reviewData?.reviewType || 'peer'] }} for <strong>{{ reviewData?.revieweeName }}</strong>
        </p>
      </div>

      <!-- Anonymous Notice -->
      <UAlert
        color="info"
        variant="subtle"
        icon="i-lucide-shield-check"
        class="mb-6"
        title="Your feedback is anonymous"
        description="Individual responses are never shared. Only aggregated results are visible to reviewers."
      />

      <!-- Progress -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">{{ currentCategory.name }}</span>
          <span class="text-sm text-gray-500">Step {{ currentStep + 1 }} of {{ categories.length }}</span>
        </div>
        <UProgress :value="progress" color="primary" size="sm" />
      </div>

      <!-- Question Card -->
      <UCard class="bg-white mb-6">
        <template #header>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{{ currentCategory.name }}</h2>
            <p class="text-sm text-gray-500 mt-1">{{ currentCategory.description }}</p>
          </div>
        </template>

        <!-- Rating Questions -->
        <div v-if="currentCategory.questions.length > 0" class="space-y-6">
          <div v-for="question in currentCategory.questions" :key="question.id" class="p-4 rounded-xl bg-gray-50">
            <p class="text-gray-900 font-medium mb-4">{{ question.text }}</p>
            <div class="flex items-center gap-2">
              <button
                v-for="i in 5"
                :key="i"
                @click="question.score = i"
                class="size-12 rounded-xl border-2 transition-all duration-200 font-semibold text-lg"
                :class="question.score === i
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-blue-300 text-gray-600 bg-white'"
              >
                {{ i }}
              </button>
              <div class="ml-4 text-xs text-gray-500">
                <span>1 = Needs Improvement</span>
                <span class="mx-2">|</span>
                <span>5 = Excellent</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments Section (Last Step) -->
        <div v-else class="space-y-6">
          <UFormField label="What are this person's key strengths?" hint="Optional">
            <UTextarea
              v-model="comments.strengths"
              placeholder="Share what this person does particularly well..."
              :rows="3"
            />
          </UFormField>

          <UFormField label="What areas could they improve?" hint="Optional">
            <UTextarea
              v-model="comments.improvements"
              placeholder="Share constructive feedback on areas for growth..."
              :rows="3"
            />
          </UFormField>

          <UFormField label="Any recommendations or tips?" hint="Optional">
            <UTextarea
              v-model="comments.recommendations"
              placeholder="Specific suggestions that could help them succeed..."
              :rows="3"
            />
          </UFormField>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <UButton
              v-if="currentStep > 0"
              variant="ghost"
              color="neutral"
              icon="i-lucide-arrow-left"
              @click="prevStep"
            >
              Previous
            </UButton>
            <div v-else></div>

            <UButton
              v-if="currentStep < categories.length - 1"
              :disabled="!canProceed"
              icon="i-lucide-arrow-right"
              trailing
              @click="nextStep"
            >
              Next
            </UButton>
            <UButton
              v-else
              :loading="submitting"
              icon="i-lucide-send"
              @click="submitReview"
            >
              Submit Review
            </UButton>
          </div>
        </template>
      </UCard>

      <p class="text-center text-xs text-gray-500">
        High Coherence - Employee Development Platform
      </p>
    </div>
  </div>
</template>
