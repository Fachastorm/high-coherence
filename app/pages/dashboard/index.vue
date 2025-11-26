<script setup lang="ts">
const userProfile = {
  name: 'John Doe',
  role: 'Senior Developer',
  department: 'Engineering'
}

const hexacoScores = [
  { trait: 'Honesty-Humility', score: 78, description: 'You value fairness and tend to be sincere and modest. You avoid manipulating others for personal gain.' },
  { trait: 'Emotionality', score: 62, description: 'You have moderate emotional sensitivity. You can empathize with others while maintaining composure under stress.' },
  { trait: 'Extraversion', score: 71, description: 'You are socially confident and enjoy engaging with others. You feel energized by team interactions.' },
  { trait: 'Agreeableness', score: 85, description: 'You are highly cooperative and patient. You tend to forgive easily and work well in collaborative settings.' },
  { trait: 'Conscientiousness', score: 88, description: 'You are very organized, disciplined, and goal-oriented. You consistently meet deadlines and maintain high standards.' },
  { trait: 'Openness', score: 74, description: 'You appreciate new ideas and creative approaches. You enjoy intellectual discussions and exploring unconventional solutions.' }
]

const recentActivities = [
  { title: 'Completed HEXACO Assessment', date: '2 days ago', icon: 'i-lucide-clipboard-check' },
  { title: '360 Review from Sarah M.', date: '1 week ago', icon: 'i-lucide-user-circle' },
  { title: 'Updated Q4 Goals', date: '2 weeks ago', icon: 'i-lucide-flag' },
  { title: 'New recommendation available', date: '3 weeks ago', icon: 'i-lucide-lightbulb' }
]

const stats = [
  { label: 'Overall Score', value: '76', change: '+5 from last assessment', changeType: 'positive', icon: 'i-lucide-bar-chart-3', gradient: 'from-violet-500 to-purple-600' },
  { label: 'Reviews Completed', value: '8/10', change: '360 feedback this cycle', changeType: 'neutral', icon: 'i-lucide-check-circle', gradient: 'from-emerald-400 to-green-500' },
  { label: 'Goals Progress', value: '67%', change: 'Q4 2025 objectives', changeType: 'neutral', icon: 'i-lucide-target', gradient: 'from-amber-400 to-orange-500' },
  { label: 'Next Review', value: 'Dec 1', change: '5 days remaining', changeType: 'neutral', icon: 'i-lucide-calendar', gradient: 'from-pink-400 to-rose-500' }
]

const recommendations = [
  { title: 'Leadership Workshop', description: 'Enhance your leadership presence based on your high Agreeableness score.', icon: 'i-lucide-graduation-cap', gradient: 'from-blue-400 to-indigo-500' },
  { title: 'Assertiveness Training', description: 'Balance your agreeable nature with confident communication skills.', icon: 'i-lucide-message-circle', gradient: 'from-emerald-400 to-green-500' },
  { title: 'Creative Problem Solving', description: 'Leverage your Openness to drive innovation in your team.', icon: 'i-lucide-puzzle', gradient: 'from-purple-400 to-pink-500' }
]

const getScoreColor = (score: number) => {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 60) return 'bg-violet-500'
  if (score >= 40) return 'bg-amber-500'
  return 'bg-rose-500'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Welcome back, {{ userProfile.name.split(' ')[0] }}</h1>
        <p class="text-white/70 mt-1">Here's your development overview</p>
      </div>
      <UButton
        to="/coach"
        icon="i-lucide-sparkles"
        size="lg"
        class="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
      >
        Talk to AI Coach
      </UButton>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white/80 backdrop-blur-xl border-white/30 hover:shadow-lg transition-all hover:-translate-y-1"
        :ui="{ body: 'p-5' }"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
          </div>
          <div
            class="size-12 rounded-xl flex items-center justify-center bg-gradient-to-br"
            :class="stat.gradient"
          >
            <UIcon :name="stat.icon" class="size-6 text-white" />
          </div>
        </div>
        <p
          class="text-xs mt-2"
          :class="stat.changeType === 'positive' ? 'text-emerald-600' : 'text-gray-500'"
        >
          {{ stat.change }}
        </p>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- HEXACO Results -->
      <UCard
        class="lg:col-span-2 bg-white/80 backdrop-blur-xl border-white/30"
        :ui="{ body: 'p-6' }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Your HEXACO Profile</h2>
            <UButton variant="ghost" size="sm" color="neutral">View Details</UButton>
          </div>
        </template>

        <div class="space-y-5">
          <div
            v-for="trait in hexacoScores"
            :key="trait.trait"
            class="group"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">{{ trait.trait }}</span>
              <UBadge :color="trait.score >= 80 ? 'success' : trait.score >= 60 ? 'primary' : 'warning'" variant="subtle">
                {{ trait.score }}%
              </UBadge>
            </div>
            <UProgress :value="trait.score" :color="trait.score >= 80 ? 'success' : trait.score >= 60 ? 'primary' : 'warning'" size="sm" />
            <p class="text-xs text-gray-500 mt-2 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
              {{ trait.description }}
            </p>
          </div>
        </div>
      </UCard>

      <!-- Recent Activity -->
      <UCard
        class="bg-white/80 backdrop-blur-xl border-white/30"
        :ui="{ body: 'p-6' }"
      >
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </template>

        <div class="space-y-3">
          <div
            v-for="activity in recentActivities"
            :key="activity.title"
            class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div class="size-10 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center shrink-0">
              <UIcon :name="activity.icon" class="size-5 text-violet-600" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ activity.title }}</p>
              <p class="text-xs text-gray-500">{{ activity.date }}</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Recommendations Section -->
    <UCard
      class="bg-white/80 backdrop-blur-xl border-white/30"
      :ui="{ body: 'p-6' }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Personalized Recommendations</h2>
            <p class="text-sm text-gray-500 mt-1">Based on your HEXACO profile and 360 feedback</p>
          </div>
          <UButton variant="soft" size="sm" icon="i-lucide-refresh-cw">Refresh</UButton>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UCard
          v-for="rec in recommendations"
          :key="rec.title"
          class="bg-white/60 border-white/40 hover:shadow-lg transition-all hover:-translate-y-1"
          :ui="{ body: 'p-5' }"
        >
          <div
            class="size-10 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br"
            :class="rec.gradient"
          >
            <UIcon :name="rec.icon" class="size-5 text-white" />
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ rec.title }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ rec.description }}</p>
          <UButton variant="outline" size="sm" block>Learn More</UButton>
        </UCard>
      </div>
    </UCard>
  </div>
</template>
