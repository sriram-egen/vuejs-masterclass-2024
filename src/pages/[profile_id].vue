<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const { profile_id } = useRoute('/[profile_id]').params

const bioProfilesLoader = useBioProfilesStore()
const { bioProfile } = storeToRefs(bioProfilesLoader)
const { getBioProfile } = bioProfilesLoader

const carouselImgs = ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

await getBioProfile(profile_id)
</script>

<template>
  <div class="flex justify-between px-8 h-screen items-center">
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8 border-x border-dashed border-zinc-300 dark:border-zinc-700">
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.full_name }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Full Name </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.date_of_birth }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Birth Date</p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.time_of_birth }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Birth Time </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.mangalik || '--' }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Mangalik </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.caste_subcaste }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Caste/Subcaste </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.devak_gotra }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Devak/Gotra </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.marital_status || '--' }}
        </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Marital Status </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.complexion || '--' }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Complexion </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.education_details || '--'
          }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Education Details </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.occupation }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Occupation </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.hobbies || '--' }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> hobbies</p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.gender }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Gender </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.phone_number || '--' }}
        </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Phone Number </p>
      </li>
      <li>
        <h3 class="text-base  text-black dark:text-white block font-semibold"> {{ bioProfile.email }} </h3>
        <p class="text-base  text-zinc-500 dark:text-zinc-400 text-pretty"> Email </p>
      </li>
    </ul>
    <div>
      <Carousel class="relative w-full max-w-xs">
        <CarouselContent>
          <CarouselItem v-for="(img, index) in carouselImgs" :key="index">
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <img :src="img" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  </div>
</template>

<style scoped>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
