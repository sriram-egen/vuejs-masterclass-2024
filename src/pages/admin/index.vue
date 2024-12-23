<template>
  <div>
 <Tabs v-model="activeTab">
    <TabsList>
      <TabsTrigger value="approved">
        Approved
      </TabsTrigger>
      <TabsTrigger value="pending">
        Pending
      </TabsTrigger>
      <TabsTrigger value="add-resource">
        Add Resource
      </TabsTrigger>
    </TabsList>
    <TabsContent value="approved">
      <DataTable v-if="approvedResources" :columns="columnsWithCollabs" :data="approvedResources" />
    </TabsContent>
    <TabsContent value="pending">
      <DataTable v-if="pendingResources" :columns="columnsWithCollabs" :data="pendingResources" />
    </TabsContent>
    <TabsContent value="add-resource">
      <FormKit
        type="form"
        @submit="createResource"
        submit-label="Create Resource"
        :config="{
          validationVisibility: 'submit'
        }"
      >
        <FormKit
          type="text"
          name="title"
          id="title"
          label="Title"
          placeholder="New Resource"
          validation="required|length:1,255"
        />
        <FormKit
          type="url"
          name="url"
          id="url"
          label="URL"
          placeholder="https://www.example.com"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Resource description"
          validation="length:0,500"
        />
      </FormKit>
    </TabsContent>
  </Tabs>
</div>
  </template>
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { CreateNewResource } from '@/types/CreateNewResource';
import { createNewResourceQuery } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/resourcesColumns';

usePageStore().pageData.title = "Admin"
const activeTab = ref<string>(useRoute().query.t as string || 'pending')
const router = useRouter()

const resourcesLoader = useResourcesStore()
const { pendingResources, approvedResources } = storeToRefs(resourcesLoader)
const { getApprovedResources, getPendingResources } = resourcesLoader

await getApprovedResources()
await getPendingResources()

const columnsWithCollabs = columns()

useMeta({
  title: 'Resources | Pulse',
  description: {
    name: 'description',
    content: 'See all resources in Pulse.'
  }
})

watch(
  () => activeTab.value,
  () => {
   router.replace({query: { t: activeTab.value }})
  }
)

const createResource = async (formData: CreateNewResource) => {
  const task = {
    ...formData,
    slug: formData.title.split(" ").map(w=>w.toLowerCase()).join("-")
  }

  const { error } = await createNewResourceQuery(task)

  if (error) {
    console.log(error)
  }

}
</script>
