<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

// Redirect to dashboard if logged in, otherwise to login
navigateTo('/login')
</script>

<template>
  <div></div>
</template>
