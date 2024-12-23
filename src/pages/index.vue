<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
usePageStore().pageData.title = "Resources"

const resourcesLoader = useResourcesStore()
const { approvedResources } = storeToRefs(resourcesLoader)
const { getApprovedResources } = resourcesLoader

await getApprovedResources()

</script>

<template>
    <div class="grid md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2 gap-4" >
      <Card v-for="resource in approvedResources" :key="resource.id" class="flex flex-col justify-between" >
    <CardHeader>
      <CardTitle>{{resource.title}}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{{resource.description}}</CardDescription>
    </CardContent>
    <CardFooter class="flex justify-between">
      <Button variant="ghost">
        <iconify-icon
        icon="lucide:eye"
      />
      </Button>
      <Button variant="ghost">
        <iconify-icon
        icon="lucide:heart"
      />
      </Button>
      <Button variant="ghost">
        <iconify-icon
        icon="lucide:share-2"
      />
      </Button>
      <Button variant="ghost">
        <iconify-icon
        icon="lucide:square-arrow-out-up-right"
      />
      </Button>
      <Button variant="ghost">
        <iconify-icon
        icon="lucide:trash-2"
      />
    </Button>
    </CardFooter>
  </Card>
    </div>
</template>
