<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  navigateTo('/dashboard')
}
</script>

<template>
  <div class="w-full max-w-md animate-fade-in-up">
    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="size-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 pulse-glow">
        <UIcon name="i-lucide-sparkles" class="size-8 text-white" />
      </div>
      <h1 class="text-3xl font-bold text-white mb-2">High Coherence</h1>
      <p class="text-white/70">Employee Development Platform</p>
    </div>

    <!-- Login Card -->
    <UCard class="glass rounded-2xl" :ui="{ body: 'p-8' }">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Welcome back</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <UFormField label="Email" name="email">
          <UInput
            v-model="email"
            type="email"
            placeholder="you@company.com"
            icon="i-lucide-mail"
            size="lg"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter your password"
            icon="i-lucide-lock"
            size="lg"
          />
        </UFormField>

        <div class="flex items-center justify-between">
          <UCheckbox v-model="rememberMe" label="Remember me" />
          <NuxtLink to="/forgot-password" class="text-sm text-violet-600 hover:text-violet-700">
            Forgot password?
          </NuxtLink>
        </div>

        <UButton
          type="submit"
          block
          size="lg"
          :loading="loading"
          class="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
        >
          Sign in
        </UButton>
      </form>

      <div class="mt-6 text-center">
        <p class="text-gray-600 text-sm">
          Don't have an account?
          <NuxtLink to="/signup" class="text-violet-600 hover:text-violet-700 font-medium">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </UCard>

    <!-- SSO Options -->
    <div class="mt-6">
      <USeparator label="Or continue with" class="text-white/70" />

      <div class="mt-4 grid grid-cols-2 gap-3">
        <UButton color="neutral" variant="outline" size="lg" class="bg-white/70 backdrop-blur-xl border-white/30">
          <UIcon name="i-simple-icons-google" class="size-5 mr-2" />
          Google
        </UButton>
        <UButton color="neutral" variant="outline" size="lg" class="bg-white/70 backdrop-blur-xl border-white/30">
          <UIcon name="i-simple-icons-microsoft" class="size-5 mr-2" />
          Microsoft
        </UButton>
      </div>
    </div>
  </div>
</template>
