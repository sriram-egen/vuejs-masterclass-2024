<script setup lang="ts">
import { menuKey } from '@/utils/injectionKeys'
import type { MenuInjectionOptions } from '@/utils/injectionKeys'
import { useWindowSize } from '@vueuse/core'

const links = ([
  {
    title: 'Resources',
    to: '/',
    icon: 'lucide:house'
  },
  {
    title: 'Admin',
    to: '/admin',
    icon: 'lucide:badge-check'
  }
])

defineEmits(['taskClicked'])

const { menuOpen, toggleMenu } = inject(menuKey) as MenuInjectionOptions
const windowWidth = useWindowSize().width

watchEffect(() => {
  if (windowWidth.value > 1024) {
    menuOpen.value = true
  } else {
    menuOpen.value = false
  }
})
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]"
    :class="{ 'w-52': menuOpen, 'w-24': !menuOpen }"
  >
    <div
      class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between"
    >
      <Button @click="toggleMenu" variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8">
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskClicked')">
            Task
          </DropdownMenuItem>
          <DropdownMenuItem> Project </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>
    </nav>
  </aside>
</template>
