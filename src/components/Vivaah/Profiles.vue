<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useBioProfilesStore } from '@/stores/loaders/profiles'
usePageStore().pageData.title = "Resources"

const bioProfilesLoader = useBioProfilesStore()
const { profiles } = storeToRefs(bioProfilesLoader)
const { getBioProfiles } = bioProfilesLoader

await getBioProfiles()

</script>

<template>
  <div v-if="profiles?.length === 0">
    <section class="mx-auto flex max-w-[980px] flex-col items-center gap-2 md:pb-8 lg:pb-20 pb-8">
      <span class="max-w-[750px] text-center text-lg font-light text-foreground"
        style="display: inline-block; vertical-align: top; text-decoration: inherit; text-wrap: initial; max-width: 503px;">
        No Profiles exists.
      </span>
      <section class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
        <a href="/bio-data-form"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-[6px]">
          Create Your Profile Now
        </a>
      </section>
    </section>
  </div>
  <div class="grid md:grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-4">
    <Card v-for="profile in profiles" :key="profile.id" class="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{{ profile.full_name }}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{{ profile.email }}</CardDescription>
      </CardContent>
      <CardFooter class="flex justify-between">
        <RouterLink :to="`profile/${profile.id}`">
          <iconify-icon icon="lucide:eye" />
        </RouterLink>
        <Button variant="ghost">
          <iconify-icon icon="lucide:square-arrow-out-up-right" />
        </Button>
        <Button variant="ghost">
          <iconify-icon icon="lucide:square-pen" />
        </Button>
        <Button variant="ghost">
          <iconify-icon icon="lucide:trash-2" />
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
