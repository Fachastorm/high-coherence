<script setup lang="ts">
const activeTab = ref('profile')

const tabs = [
  { id: 'profile', label: 'Profile', icon: 'i-lucide-user' },
  { id: 'notifications', label: 'Notifications', icon: 'i-lucide-bell' },
  { id: 'privacy', label: 'Privacy', icon: 'i-lucide-shield' },
  { id: 'integrations', label: 'Integrations', icon: 'i-lucide-puzzle' }
]

const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@company.com',
  department: 'Engineering',
  role: 'Senior Developer',
  manager: 'Sarah Mitchell'
})

const notifications = ref({
  emailAssessments: true,
  emailReviews: true,
  emailRecommendations: true,
  weeklyDigest: true,
  pushNotifications: false
})

const privacy = ref({
  shareWithManager: true,
  anonymousInReports: true,
  allowAIAnalysis: true
})

const integrations = [
  { name: 'Slack', icon: 'i-simple-icons-slack', color: '#4A154B', connected: false },
  { name: 'Google Calendar', icon: 'i-simple-icons-googlecalendar', color: '#4285F4', connected: true },
  { name: 'Microsoft Teams', icon: 'i-simple-icons-microsoftteams', color: '#6264A7', connected: false }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-white">Settings</h1>
      <p class="text-white/70 mt-1">Manage your account and preferences</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar -->
      <UCard class="bg-white/80 backdrop-blur-xl border-white/30 h-fit" :ui="{ body: 'p-4' }">
        <nav class="space-y-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
            :class="activeTab === tab.id
              ? 'bg-violet-50 text-violet-700'
              : 'text-gray-600 hover:bg-gray-50'"
          >
            <UIcon :name="tab.icon" class="size-5" />
            <span class="font-medium">{{ tab.label }}</span>
          </button>
        </nav>
      </UCard>

      <!-- Content -->
      <UCard class="lg:col-span-3 bg-white/80 backdrop-blur-xl border-white/30" :ui="{ body: 'p-6' }">
        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>

          <div class="flex items-center gap-6 mb-8">
            <UAvatar
              text="JD"
              size="3xl"
              class="bg-gradient-to-br from-violet-400 to-purple-500 ring-4 ring-violet-100"
            />
            <div>
              <UButton variant="outline" size="sm">Change Photo</UButton>
              <p class="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="First Name">
              <UInput v-model="profile.firstName" size="lg" />
            </UFormField>
            <UFormField label="Last Name">
              <UInput v-model="profile.lastName" size="lg" />
            </UFormField>
            <UFormField label="Email">
              <UInput v-model="profile.email" type="email" size="lg" disabled />
            </UFormField>
            <UFormField label="Department">
              <UInput v-model="profile.department" size="lg" disabled />
            </UFormField>
            <UFormField label="Role">
              <UInput v-model="profile.role" size="lg" />
            </UFormField>
            <UFormField label="Reports To">
              <UInput v-model="profile.manager" size="lg" disabled />
            </UFormField>
          </div>

          <USeparator class="my-8" />

          <div class="flex items-center justify-end gap-3">
            <UButton variant="ghost" color="neutral">Cancel</UButton>
            <UButton class="bg-gradient-to-r from-violet-500 to-purple-600">Save Changes</UButton>
          </div>
        </div>

        <!-- Notifications Tab -->
        <div v-else-if="activeTab === 'notifications'">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>

          <div class="space-y-6">
            <UCard variant="subtle" :ui="{ body: 'p-4' }">
              <h3 class="font-medium text-gray-900 mb-4">Email Notifications</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-700">Assessment Reminders</p>
                    <p class="text-sm text-gray-500">Get notified when assessments are due</p>
                  </div>
                  <USwitch v-model="notifications.emailAssessments" />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-700">360 Review Requests</p>
                    <p class="text-sm text-gray-500">Notifications for new review requests</p>
                  </div>
                  <USwitch v-model="notifications.emailReviews" />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-700">AI Recommendations</p>
                    <p class="text-sm text-gray-500">Personalized development suggestions</p>
                  </div>
                  <USwitch v-model="notifications.emailRecommendations" />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-700">Weekly Digest</p>
                    <p class="text-sm text-gray-500">Summary of your progress and activities</p>
                  </div>
                  <USwitch v-model="notifications.weeklyDigest" />
                </div>
              </div>
            </UCard>

            <UCard variant="subtle" :ui="{ body: 'p-4' }">
              <h3 class="font-medium text-gray-900 mb-4">Push Notifications</h3>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-700">Enable Push Notifications</p>
                  <p class="text-sm text-gray-500">Receive notifications in your browser</p>
                </div>
                <USwitch v-model="notifications.pushNotifications" />
              </div>
            </UCard>
          </div>
        </div>

        <!-- Privacy Tab -->
        <div v-else-if="activeTab === 'privacy'">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h2>

          <div class="space-y-4">
            <UCard variant="subtle" :ui="{ body: 'p-4' }">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-700">Share Results with Manager</p>
                  <p class="text-sm text-gray-500">Allow your manager to view your assessment results</p>
                </div>
                <USwitch v-model="privacy.shareWithManager" />
              </div>
            </UCard>

            <UCard variant="subtle" :ui="{ body: 'p-4' }">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-700">Anonymous in Reports</p>
                  <p class="text-sm text-gray-500">Your individual data is anonymized in company-wide reports</p>
                </div>
                <USwitch v-model="privacy.anonymousInReports" />
              </div>
            </UCard>

            <UCard variant="subtle" :ui="{ body: 'p-4' }">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-700">AI Analysis</p>
                  <p class="text-sm text-gray-500">Allow AI to analyze your data for personalized recommendations</p>
                </div>
                <USwitch v-model="privacy.allowAIAnalysis" />
              </div>
            </UCard>

            <UAlert
              color="error"
              variant="subtle"
              icon="i-lucide-alert-triangle"
              title="Danger Zone"
              description="Once you delete your account, there is no going back. Please be certain."
              class="mt-8"
            >
              <template #actions>
                <UButton color="error" variant="outline" size="sm">Delete Account</UButton>
              </template>
            </UAlert>
          </div>
        </div>

        <!-- Integrations Tab -->
        <div v-else-if="activeTab === 'integrations'">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Connected Integrations</h2>

          <div class="space-y-4">
            <UCard
              v-for="integration in integrations"
              :key="integration.name"
              variant="subtle"
              :ui="{ body: 'p-4' }"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <UIcon :name="integration.icon" class="size-6" :style="{ color: integration.color }" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ integration.name }}</p>
                    <p class="text-sm text-gray-500">
                      {{ integration.connected ? 'Connected' : 'Not connected' }}
                    </p>
                  </div>
                </div>
                <UBadge v-if="integration.connected" color="success" variant="subtle">Connected</UBadge>
                <UButton v-else variant="outline" size="sm">Connect</UButton>
              </div>
            </UCard>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
