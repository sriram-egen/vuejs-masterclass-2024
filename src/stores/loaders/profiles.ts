import {
  bioDataProfileQuery,
  bioDataProfilesQuery,
  deleteBioDataQuery,
  updateProjectQuery,
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import type { BioDataProfile, BioDataProfiles } from '@/utils/supaQueries'

export const useBioProfilesStore = defineStore('bio-data-profiles-store', () => {
  const profiles = ref<BioDataProfiles | null>(null)
  const bioProfile = ref<BioDataProfile | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadBioProfiles = useMemoize(async (key: string) => await bioDataProfilesQuery)
  const loadBioProfile = useMemoize(
    async (id: string) => await bioDataProfileQuery(id)
  )

  interface ValidateCacheParams {
    ref: typeof profiles | typeof bioProfile
    query: typeof bioDataProfilesQuery | typeof bioDataProfileQuery
    key: string
    loaderFn: typeof loadBioProfiles | typeof loadBioProfile
  }

  const validateCache = ({
    ref,
    query,
    key,
    loaderFn
  }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

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

  const getBioProfiles = async () => {
    profiles.value = null

    const { data, error, status } = await loadBioProfiles('resources')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) profiles.value = data

    validateCache({
      ref: profiles,
      query: bioDataProfilesQuery,
      key: 'resources',
      loaderFn: loadBioProfiles
    })
  }

  const getBioProfile = async (id: string) => {
    bioProfile.value = null

    const { data, error, status } = await loadBioProfile(id)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) bioProfile.value = data

    validateCache({
      ref: bioProfile,
      query: bioDataProfileQuery,
      key: id,
      loaderFn: loadBioProfile
    })
  }

  const updateBioProfile = async () => {
    if (!bioProfile.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    await updateProjectQuery(bioProfile, bioProfile.value.id)
  }

  const deleteBioProfile = async (id: number) => {
    if (!id || typeof id !== 'number') return
    await deleteBioDataQuery(id)
  }

  return {
    profiles,
    getBioProfile,
    updateBioProfile,
    bioProfile,
    getBioProfiles,
    deleteBioProfile
  }
})
