import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Resources } from '../supaQueries'

export const columns = (): ColumnDef<Resources[0]>[] => [
  {
    accessorKey: 'title',
    header: () => h('div', { class: 'text-left' }, 'Title'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/resources/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.getValue('title')
      )
    }
  },
  {
    accessorKey: 'description',
    header: () => h('div', { class: 'text-left' }, 'Description'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        row.getValue('description')
      )
    }
  },
  {
    accessorKey: 'url',
    header: () => h('div', { class: 'text-left' }, 'URL'),
    cell: ({ row }) => {
      return h(
        'a',
        {
          class: 'text-left font-medium',
          href: row.original.url,
          target: '_blank'
        },
        h(
          'iconify-icon',
          {
            icon: 'lucide:square-arrow-out-up-right',
          },
          row.getValue('url')
        )
      )
    }
  }
]
