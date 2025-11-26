<script setup lang="ts">
const companyStats = [
  { label: 'Total Employees', value: '156', icon: 'i-lucide-users', gradient: 'from-violet-500 to-purple-600' },
  { label: 'Assessments Done', value: '142', change: '91% completion rate', icon: 'i-lucide-clipboard-check', gradient: 'from-emerald-400 to-green-500' },
  { label: 'Company Avg Score', value: '74', change: '+3 from last quarter', icon: 'i-lucide-bar-chart-3', gradient: 'from-blue-400 to-cyan-500' },
  { label: 'Reviews In Progress', value: '23', icon: 'i-lucide-clock', gradient: 'from-amber-400 to-orange-500' }
]

const departmentScores = [
  { name: 'Engineering', avgScore: 78, employees: 45, gradient: 'from-blue-400 to-indigo-500' },
  { name: 'Product', avgScore: 82, employees: 28, gradient: 'from-purple-400 to-pink-500' },
  { name: 'Design', avgScore: 76, employees: 18, gradient: 'from-emerald-400 to-green-500' },
  { name: 'Marketing', avgScore: 71, employees: 32, gradient: 'from-amber-400 to-orange-500' },
  { name: 'Sales', avgScore: 69, employees: 33, gradient: 'from-rose-400 to-red-500' }
]

const hexacoCompanyAverages = [
  { trait: 'Honesty-Humility', score: 72 },
  { trait: 'Emotionality', score: 58 },
  { trait: 'Extraversion', score: 68 },
  { trait: 'Agreeableness', score: 75 },
  { trait: 'Conscientiousness', score: 81 },
  { trait: 'Openness', score: 70 }
]

const recentReports = [
  { id: 1, title: 'Q3 2025 Performance Summary', date: '2025-10-15' },
  { id: 2, title: 'Engineering Team 360 Review', date: '2025-10-01' },
  { id: 3, title: 'Company Culture Assessment', date: '2025-09-15' },
  { id: 4, title: 'Leadership Development Report', date: '2025-09-01' }
]

const insights = [
  { title: 'High Conscientiousness', description: 'Your organization scores above average in Conscientiousness (81%), indicating strong work ethic and reliability across teams.', type: 'positive', icon: 'i-lucide-trending-up' },
  { title: 'Emotionality Variance', description: 'There is significant variance in Emotionality scores across departments. Consider team-building activities to improve emotional support.', type: 'warning', icon: 'i-lucide-alert-triangle' },
  { title: 'Sales Team Engagement', description: 'Sales team shows lower engagement scores. Review workload distribution and recognition programs.', type: 'info', icon: 'i-lucide-lightbulb' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Reports & Analytics</h1>
        <p class="text-white/70 mt-1">Company-wide performance insights and summaries</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton variant="outline" icon="i-lucide-download" class="bg-white/70 backdrop-blur-xl border-white/30">
          Export Report
        </UButton>
        <UButton icon="i-lucide-plus" class="bg-gradient-to-r from-violet-500 to-purple-600">
          Generate Report
        </UButton>
      </div>
    </div>

    <!-- Company Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard
        v-for="stat in companyStats"
        :key="stat.label"
        class="bg-white/80 backdrop-blur-xl border-white/30"
        :ui="{ body: 'p-5' }"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
          </div>
          <div class="size-12 rounded-xl flex items-center justify-center bg-gradient-to-br" :class="stat.gradient">
            <UIcon :name="stat.icon" class="size-6 text-white" />
          </div>
        </div>
        <p v-if="stat.change" class="text-xs text-emerald-600 mt-2">{{ stat.change }}</p>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Department Performance -->
      <UCard class="lg:col-span-2 bg-white/80 backdrop-blur-xl border-white/30" :ui="{ body: 'p-6' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Department Performance</h2>
            <UButton variant="ghost" size="sm" color="neutral">View All</UButton>
          </div>
        </template>

        <div class="space-y-4">
          <div
            v-for="dept in departmentScores"
            :key="dept.name"
            class="p-4 rounded-xl bg-gray-50 hover:bg-white transition-colors"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="size-10 rounded-xl flex items-center justify-center bg-gradient-to-br" :class="dept.gradient">
                  <UIcon name="i-lucide-users" class="size-5 text-white" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ dept.name }}</h3>
                  <p class="text-sm text-gray-500">{{ dept.employees }} employees</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-gray-900">{{ dept.avgScore }}</p>
                <p class="text-xs text-gray-500">avg score</p>
              </div>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full"
                :class="dept.avgScore >= 75 ? 'bg-emerald-500' : dept.avgScore >= 65 ? 'bg-primary-500' : 'bg-amber-500'"
                :style="{ width: `${dept.avgScore}%` }"
              />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Company HEXACO Profile -->
      <UCard class="bg-white/80 backdrop-blur-xl border-white/30" :ui="{ body: 'p-6' }">
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900">Company HEXACO Profile</h2>
        </template>

        <div class="space-y-4">
          <div v-for="trait in hexacoCompanyAverages" :key="trait.trait">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm text-gray-600">{{ trait.trait.split('-')[0] }}</span>
              <span class="text-sm font-semibold text-gray-900">{{ trait.score }}%</span>
            </div>
            <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full bg-primary-500"
                :style="{ width: `${trait.score}%` }"
              />
            </div>
          </div>
        </div>

        <USeparator class="my-6" />

        <div>
          <h3 class="font-medium text-gray-900 mb-3">What This Means</h3>
          <p class="text-sm text-gray-600">
            Your organization demonstrates strong conscientiousness and agreeableness, indicating a collaborative and reliable workforce. Consider initiatives to boost openness for more innovation.
          </p>
        </div>
      </UCard>
    </div>

    <!-- Insights & Reports -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- AI Insights -->
      <UCard class="bg-white/80 backdrop-blur-xl border-white/30" :ui="{ body: 'p-6' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">AI-Generated Insights</h2>
            <UButton variant="ghost" size="sm" icon="i-lucide-refresh-cw">Refresh</UButton>
          </div>
        </template>

        <div class="space-y-4">
          <UAlert
            v-for="insight in insights"
            :key="insight.title"
            :color="insight.type === 'positive' ? 'success' : insight.type === 'warning' ? 'warning' : 'info'"
            variant="subtle"
            :icon="insight.icon"
            :title="insight.title"
            :description="insight.description"
          />
        </div>
      </UCard>

      <!-- Recent Reports -->
      <UCard class="bg-white/80 backdrop-blur-xl border-white/30" :ui="{ body: 'p-6' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Recent Reports</h2>
            <UButton variant="ghost" size="sm" color="neutral">View All</UButton>
          </div>
        </template>

        <div class="space-y-3">
          <div
            v-for="report in recentReports"
            :key="report.id"
            class="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div class="flex items-center gap-4">
              <div class="size-10 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                <UIcon name="i-lucide-file-text" class="size-5 text-violet-600" />
              </div>
              <div>
                <h3 class="font-medium text-gray-900">{{ report.title }}</h3>
                <p class="text-sm text-gray-500">{{ report.date }}</p>
              </div>
            </div>
            <UButton variant="ghost" icon="i-lucide-download" size="sm" />
          </div>
        </div>

        <UButton block variant="outline" class="mt-4" icon="i-lucide-folder-open">
          Browse All Reports
        </UButton>
      </UCard>
    </div>
  </div>
</template>
