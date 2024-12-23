<script setup lang="ts">
import { menuKey } from '@/utils/injectionKeys'

const { pageData } = storeToRefs(usePageStore())
const { profile } = storeToRefs(useAuthStore())

const taskSheetOpen = ref(false)

const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const isAdmin =  (profile.value?.role === 'admin')

provide(menuKey, {
  menuOpen,
  toggleMenu,
  isAdmin
})

</script>

<template>
  <div>
    <Sidebar v-if="isAdmin" @taskClicked="taskSheetOpen = true" />
    <!-- <AppNewTask v-model="taskSheetOpen" /> -->

    <div
      class="flex flex-col transition-[margin]"
      :class="{ 'ml-52': isAdmin && menuOpen, 'ml-24': isAdmin && !menuOpen }"
    >
      <TopNavbar />

      <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">
            {{ pageData.title }}
          </h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>
