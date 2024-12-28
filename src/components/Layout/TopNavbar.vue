<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const { profile } = storeToRefs(useAuthStore())
const router = useRouter()

defineEmits(['addProfile'])

const isDark = useDark()
const toggleDark = useToggle(isDark)

const handleSignoutAction = async () => {
  const { logout } = await import('@/utils/supaAuth')
  const isLoggedOut = await logout()

  if (isLoggedOut) router.push('/login')

}
</script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex gap-2 justify-between px-6 items-center">
    <div>
      <RouterLink to="/" class="font-bold text-2xl">Vivaah</RouterLink>
    </div>
    <div class="flex justify-center items-center gap-2">
      <Button size="sm" class="cursor-pointer" @click="$emit('addProfile')">
        Add Profile
      </Button>
      <Button @click="toggleDark()" class="w-8 h-8">
        <Transition name="scale" mode="out-in">
          <iconify-icon v-if="isDark" icon="lucide:sun"></iconify-icon>
          <iconify-icon v-else icon="lucide:moon"></iconify-icon>
        </Transition>
      </Button>
      <div class="w-8">
        <DropdownMenu v-if="profile">
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage :src="profile.avatar_url || ''" :alt="`${profile.full_name} profile picture`" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <RouterLink :to="{
                name: '/users/[username]',
                params: { username: profile.username }
              }" class="w-full h-full">
                Profile
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem @click="handleSignoutAction">
              Signout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
