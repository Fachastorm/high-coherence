<script setup lang="ts">
const activeTab = ref('employees')

// Employee data for admin view
const employees = ref([
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Engineer',
    department: 'Engineering',
    reviewsReceived: 5,
    avgScore: 4.2,
    completedReviews: true,
    canBePromoted: true,
    topStrength: 'Technical Excellence',
    improvementArea: 'Delegation'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Product Manager',
    department: 'Product',
    reviewsReceived: 4,
    avgScore: 4.5,
    completedReviews: true,
    canBePromoted: true,
    topStrength: 'Cross-team Collaboration',
    improvementArea: 'Time Management'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Designer',
    department: 'Design',
    reviewsReceived: 3,
    avgScore: 3.8,
    completedReviews: false,
    canBePromoted: false,
    topStrength: 'Creative Problem Solving',
    improvementArea: 'Communication'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Sales Lead',
    department: 'Sales',
    reviewsReceived: 6,
    avgScore: 4.0,
    completedReviews: true,
    canBePromoted: false,
    topStrength: 'Client Relations',
    improvementArea: 'Documentation'
  },
])

// Send invite modal
const showInviteModal = ref(false)
const selectedEmployee = ref<typeof employees.value[0] | null>(null)
const inviteForm = ref({
  emails: '',
  reviewType: 'peer'
})
const sendingInvites = ref(false)

const openInviteModal = (employee: typeof employees.value[0]) => {
  selectedEmployee.value = employee
  inviteForm.value = { emails: '', reviewType: 'peer' }
  showInviteModal.value = true
}

const sendInvites = async () => {
  if (!selectedEmployee.value || !inviteForm.value.emails) return

  sendingInvites.value = true
  const emails = inviteForm.value.emails.split(',').map(e => e.trim())

  // Simulate sending - in production this would call the API
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Show success toast
  alert(`Review invites sent to ${emails.length} recipients for ${selectedEmployee.value.name}`)

  sendingInvites.value = false
  showInviteModal.value = false
}

// Detailed results modal
const showResultsModal = ref(false)
const selectedEmployeeResults = ref<typeof employees.value[0] | null>(null)

const mockDetailedResults = {
  performance: { avg: 4.2, breakdown: [4, 5, 4, 4, 4] },
  collaboration: { avg: 4.5, breakdown: [5, 4, 5, 4, 5] },
  leadership: { avg: 3.8, breakdown: [4, 3, 4, 4, 4] },
  comments: {
    strengths: [
      'Excellent technical skills and problem-solving ability',
      'Always willing to help team members',
      'Delivers high-quality work consistently'
    ],
    improvements: [
      'Could delegate more tasks to junior team members',
      'Sometimes takes on too much work',
      'Could improve documentation habits'
    ],
    recommendations: [
      'Consider leadership training program',
      'Pair with mentor for management skills',
      'Shadow a senior lead for delegation techniques'
    ]
  }
}

const openResultsModal = (employee: typeof employees.value[0]) => {
  selectedEmployeeResults.value = employee
  showResultsModal.value = true
}

const getScoreColor = (score: number) => {
  if (score >= 4.5) return 'success'
  if (score >= 3.5) return 'primary'
  if (score >= 2.5) return 'warning'
  return 'error'
}

const stats = [
  { label: 'Total Employees', value: employees.value.length, icon: 'i-lucide-users' },
  { label: 'Reviews Completed', value: employees.value.filter(e => e.completedReviews).length, icon: 'i-lucide-check-circle' },
  { label: 'Promotion Ready', value: employees.value.filter(e => e.canBePromoted).length, icon: 'i-lucide-trending-up' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">360 Reviews</h1>
        <p class="text-gray-500 mt-1">Manage anonymous feedback and view aggregated results</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" class="bg-white" :ui="{ body: 'p-5' }">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
          </div>
          <div class="size-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <UIcon :name="stat.icon" class="size-6 text-blue-600" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2">
      <UButton
        :variant="activeTab === 'employees' ? 'solid' : 'ghost'"
        :color="activeTab === 'employees' ? 'primary' : 'neutral'"
        @click="activeTab = 'employees'"
      >
        Employee Results
      </UButton>
      <UButton
        :variant="activeTab === 'pending' ? 'solid' : 'ghost'"
        :color="activeTab === 'pending' ? 'primary' : 'neutral'"
        @click="activeTab = 'pending'"
      >
        Pending Reviews
      </UButton>
    </div>

    <!-- Employee Results Table -->
    <UCard v-if="activeTab === 'employees'" class="bg-white">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Aggregated Review Results</h2>
          <p class="text-sm text-gray-500">Anonymous feedback summary per employee</p>
        </div>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Employee</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Reviews</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Avg Score</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Top Strength</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Focus Area</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              <th class="text-right py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="emp in employees"
              :key="emp.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td class="py-4 px-4">
                <div class="flex items-center gap-3">
                  <UAvatar :text="emp.name.split(' ').map(n => n[0]).join('')" size="sm" class="bg-blue-100 text-blue-700" />
                  <div>
                    <p class="font-medium text-gray-900">{{ emp.name }}</p>
                    <p class="text-sm text-gray-500">{{ emp.role }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="text-gray-900">{{ emp.reviewsReceived }}</span>
              </td>
              <td class="py-4 px-4">
                <UBadge :color="getScoreColor(emp.avgScore)" variant="subtle">
                  {{ emp.avgScore.toFixed(1) }} / 5
                </UBadge>
              </td>
              <td class="py-4 px-4">
                <span class="text-gray-700">{{ emp.topStrength }}</span>
              </td>
              <td class="py-4 px-4">
                <span class="text-gray-700">{{ emp.improvementArea }}</span>
              </td>
              <td class="py-4 px-4">
                <UBadge v-if="emp.canBePromoted" color="success" variant="subtle">
                  Promotion Ready
                </UBadge>
                <UBadge v-else color="neutral" variant="subtle">
                  In Progress
                </UBadge>
              </td>
              <td class="py-4 px-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <UButton
                    variant="ghost"
                    size="sm"
                    icon="i-lucide-mail"
                    @click="openInviteModal(emp)"
                  >
                    Send Invite
                  </UButton>
                  <UButton
                    variant="soft"
                    size="sm"
                    icon="i-lucide-bar-chart-3"
                    @click="openResultsModal(emp)"
                  >
                    View Details
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <!-- Pending Reviews -->
    <UCard v-else class="bg-white">
      <template #header>
        <h2 class="text-lg font-semibold text-gray-900">Pending Review Invites</h2>
      </template>

      <div class="text-center py-12 text-gray-500">
        <UIcon name="i-lucide-inbox" class="size-12 mx-auto mb-4 text-gray-300" />
        <p>No pending invites to track</p>
        <p class="text-sm mt-1">Send review invites from the Employee Results tab</p>
      </div>
    </UCard>

    <!-- Send Invite Modal -->
    <UModal v-model:open="showInviteModal">
      <template #content>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Send Review Invites</h2>
            <UButton variant="ghost" icon="i-lucide-x" @click="showInviteModal = false" />
          </div>

          <div v-if="selectedEmployee" class="space-y-6">
            <UAlert
              color="info"
              variant="subtle"
              icon="i-lucide-shield"
              title="Anonymous Reviews"
              description="Recipients will provide anonymous feedback. Their identity will not be linked to their responses."
            />

            <div class="p-4 rounded-xl bg-gray-50">
              <p class="text-sm text-gray-500">Requesting feedback for:</p>
              <p class="font-semibold text-gray-900">{{ selectedEmployee.name }}</p>
              <p class="text-sm text-gray-500">{{ selectedEmployee.role }} • {{ selectedEmployee.department }}</p>
            </div>

            <UFormField label="Reviewer Emails" hint="Separate multiple emails with commas">
              <UTextarea
                v-model="inviteForm.emails"
                placeholder="reviewer1@company.com, reviewer2@company.com"
                :rows="3"
              />
            </UFormField>

            <UFormField label="Review Type">
              <USelect
                v-model="inviteForm.reviewType"
                :items="[
                  { label: 'Peer Review', value: 'peer' },
                  { label: 'Manager Review', value: 'manager' },
                  { label: 'Direct Report Review', value: 'direct-report' }
                ]"
              />
            </UFormField>

            <div class="flex justify-end gap-3">
              <UButton variant="ghost" color="neutral" @click="showInviteModal = false">
                Cancel
              </UButton>
              <UButton
                :loading="sendingInvites"
                :disabled="!inviteForm.emails"
                icon="i-lucide-send"
                @click="sendInvites"
              >
                Send Invites
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Detailed Results Modal -->
    <UModal v-model:open="showResultsModal" :ui="{ width: 'max-w-3xl' }">
      <template #content>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Review Results</h2>
              <p class="text-gray-500" v-if="selectedEmployeeResults">{{ selectedEmployeeResults.name }}</p>
            </div>
            <UButton variant="ghost" icon="i-lucide-x" @click="showResultsModal = false" />
          </div>

          <div v-if="selectedEmployeeResults" class="space-y-6">
            <!-- Score Summary -->
            <div class="grid grid-cols-3 gap-4">
              <UCard variant="subtle" :ui="{ body: 'p-4 text-center' }">
                <p class="text-3xl font-bold text-gray-900">{{ mockDetailedResults.performance.avg }}</p>
                <p class="text-sm text-gray-500">Performance</p>
                <UProgress :value="mockDetailedResults.performance.avg * 20" color="primary" size="xs" class="mt-2" />
              </UCard>
              <UCard variant="subtle" :ui="{ body: 'p-4 text-center' }">
                <p class="text-3xl font-bold text-gray-900">{{ mockDetailedResults.collaboration.avg }}</p>
                <p class="text-sm text-gray-500">Collaboration</p>
                <UProgress :value="mockDetailedResults.collaboration.avg * 20" color="success" size="xs" class="mt-2" />
              </UCard>
              <UCard variant="subtle" :ui="{ body: 'p-4 text-center' }">
                <p class="text-3xl font-bold text-gray-900">{{ mockDetailedResults.leadership.avg }}</p>
                <p class="text-sm text-gray-500">Leadership</p>
                <UProgress :value="mockDetailedResults.leadership.avg * 20" color="warning" size="xs" class="mt-2" />
              </UCard>
            </div>

            <!-- Anonymous Feedback -->
            <div class="space-y-4">
              <h3 class="font-semibold text-gray-900">Anonymous Feedback Summary</h3>

              <UCard variant="subtle" :ui="{ body: 'p-4' }">
                <h4 class="font-medium text-green-700 mb-2 flex items-center gap-2">
                  <UIcon name="i-lucide-thumbs-up" class="size-4" />
                  Key Strengths
                </h4>
                <ul class="space-y-2">
                  <li v-for="(strength, i) in mockDetailedResults.comments.strengths" :key="i" class="text-sm text-gray-700 flex items-start gap-2">
                    <span class="text-green-500 mt-1">•</span>
                    {{ strength }}
                  </li>
                </ul>
              </UCard>

              <UCard variant="subtle" :ui="{ body: 'p-4' }">
                <h4 class="font-medium text-amber-700 mb-2 flex items-center gap-2">
                  <UIcon name="i-lucide-target" class="size-4" />
                  Areas for Improvement
                </h4>
                <ul class="space-y-2">
                  <li v-for="(item, i) in mockDetailedResults.comments.improvements" :key="i" class="text-sm text-gray-700 flex items-start gap-2">
                    <span class="text-amber-500 mt-1">•</span>
                    {{ item }}
                  </li>
                </ul>
              </UCard>

              <UCard variant="subtle" :ui="{ body: 'p-4' }">
                <h4 class="font-medium text-blue-700 mb-2 flex items-center gap-2">
                  <UIcon name="i-lucide-lightbulb" class="size-4" />
                  Recommendations & Tips
                </h4>
                <ul class="space-y-2">
                  <li v-for="(rec, i) in mockDetailedResults.comments.recommendations" :key="i" class="text-sm text-gray-700 flex items-start gap-2">
                    <span class="text-blue-500 mt-1">•</span>
                    {{ rec }}
                  </li>
                </ul>
              </UCard>
            </div>

            <!-- Promotion Recommendation -->
            <UAlert
              v-if="selectedEmployeeResults.canBePromoted"
              color="success"
              variant="subtle"
              icon="i-lucide-award"
              title="Recommended for Promotion"
              description="Based on aggregated feedback, this employee demonstrates consistent high performance and is ready for increased responsibility."
            />
            <UAlert
              v-else
              color="warning"
              variant="subtle"
              icon="i-lucide-clock"
              title="Development in Progress"
              description="This employee shows promise but needs more time to develop in key areas before promotion consideration."
            />
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
