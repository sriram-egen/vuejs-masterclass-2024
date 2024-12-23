import {
  approvedResourcesQuery,
  deleteResourceQuery,
  pendingResourcesQuery,
  resourcesQuery,
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import type { Resources } from '@/utils/supaQueries'

export const useResourcesStore = defineStore('resources-store', () => {
  const resources = ref<Resources | null>(null)
  const approvedResources = ref<Resources | null>(null)
  const pendingResources = ref<Resources | null>(null)
  // const project = ref<Project | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadResources = useMemoize(async (key: string) => await resourcesQuery)
  const loadApprovedResources = useMemoize(async (key: string) => await approvedResourcesQuery)
  const loadPendingResources = useMemoize(async (key: string) => await pendingResourcesQuery)
  // const loadProject = useMemoize(
  //   async (slug: string) => await projectQuery(slug)
  // )

  interface ValidateCacheParams {
    ref: typeof resources
    query: typeof resourcesQuery
    key: string
    loaderFn: typeof loadResources
  }

  const validateCache = ({
    ref,
    query,
    key,
    loaderFn
  }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getResources = async () => {
    resources.value = null

    const { data, error, status } = await loadResources('resources')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) resources.value = data

    validateCache({
      ref: resources,
      query: resourcesQuery,
      key: 'resources',
      loaderFn: loadResources
    })
  }

  const getApprovedResources = async () => {
    approvedResources.value = null

    const { data, error, status } = await loadApprovedResources('approved-resources')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) approvedResources.value = data

    validateCache({
      ref: approvedResources,
      query: approvedResourcesQuery,
      key: 'approved-resources',
      loaderFn: loadApprovedResources
    })
  }

  const getPendingResources = async () => {
    pendingResources.value = null

    const { data, error, status } = await loadPendingResources('pending-resources')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) pendingResources.value = data

    validateCache({
      ref: pendingResources,
      query: pendingResourcesQuery,
      key: 'pending-resources',
      loaderFn: loadPendingResources
    })
  }

  // const getProject = async (slug: string) => {
  //   project.value = null

  //   const { data, error, status } = await loadProject(slug)

  //   if (error) useErrorStore().setError({ error, customCode: status })

  //   if (data) project.value = data

  //   validateCache({
  //     ref: project,
  //     query: projectQuery,
  //     key: slug,
  //     loaderFn: loadProject
  //   })
  // }

  // const updateProject = async () => {
  //   if (!project.value) return

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { tasks, id, ...projectProperties } = project.value

  //   await updateProjectQuery(projectProperties, project.value.id)
  // }

  const deleteResource = async (id: number) => {
      if (!id || typeof id !== 'number') return
    await deleteResourceQuery(id)
  }

  return {
    resources,
    approvedResources,
    pendingResources,
    getResources,
    getApprovedResources,
    getPendingResources,
    deleteResource
  }
})
