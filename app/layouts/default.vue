<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navigation: NavigationMenuItem[][] = [[
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
  { label: 'Assessments', icon: 'i-lucide-clipboard-list', to: '/assessment' },
  { label: '360 Reviews', icon: 'i-lucide-users', to: '/reviews' },
  { label: 'Reports', icon: 'i-lucide-bar-chart-3', to: '/reports' },
  { label: 'AI Coach', icon: 'i-lucide-sparkles', to: '/coach' },
]]

const userMenu = [[
  { label: 'Settings', icon: 'i-lucide-settings', to: '/settings' },
  { label: 'Sign out', icon: 'i-lucide-log-out', click: () => navigateTo('/login') }
]]
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar collapsible class="bg-white border-r border-gray-200">
      <template #header="{ collapsed }">
        <div class="flex items-center gap-3" :class="collapsed ? 'justify-center' : ''">
          <div class="size-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-activity" class="size-5 text-white" />
          </div>
          <div v-if="!collapsed" class="flex flex-col">
            <span class="font-semibold text-gray-900">High Coherence</span>
            <span class="text-xs text-gray-500">Employee Development</span>
          </div>
        </div>
      </template>

      <UNavigationMenu :items="navigation" orientation="vertical" class="flex-1" />

      <template #footer="{ collapsed }">
        <UDropdownMenu :items="userMenu">
          <div
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            :class="collapsed ? 'justify-center' : ''"
          >
            <UAvatar text="JD" size="sm" class="bg-blue-600" />
            <div v-if="!collapsed" class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p class="text-xs text-gray-500 truncate">Manager</p>
            </div>
            <UIcon v-if="!collapsed" name="i-lucide-chevron-up" class="size-4 text-gray-400" />
          </div>
        </UDropdownMenu>
      </template>
    </UDashboardSidebar>

    <UDashboardPanel grow>
      <template #header>
        <UDashboardNavbar class="bg-white border-b border-gray-200">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #trailing>
            <div class="flex items-center gap-2">
              <UColorModeButton />
              <UButton color="neutral" variant="ghost" icon="i-lucide-bell" size="sm" :ui="{ base: 'relative' }">
                <span class="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
              </UButton>
              <UButton color="neutral" variant="ghost" icon="i-lucide-help-circle" size="sm" />
            </div>
          </template>
        </UDashboardNavbar>
      </template>

      <div class="p-6 bg-gray-50 min-h-full">
        <slot />
      </div>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
