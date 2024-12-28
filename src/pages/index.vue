<script setup lang="ts">
import LandingPage from '@/components/Vivaah/LandingPage.vue';
import Profiles from "@/components/Vivaah/Profiles.vue"

const { user } = storeToRefs(useAuthStore())

</script>

<template>
  <LandingPage v-if="!user" />
  <div v-else>
    <Profiles />
  </div>
</template>
