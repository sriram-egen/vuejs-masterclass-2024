import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Resources } from '../supaQueries'
import { Button } from '@/components/ui/button'

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
        'div',
        {
          class: "flex flex-col justify-center "
        },
        [h('a',
          {
            class: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
            href: row.original.url,
            target: '_blank'
          },
          h(
            'iconify-icon',
            {
              icon: 'lucide:square-arrow-out-up-right',
            },
            row.getValue('url')
          )),
        h(
          Button,
          {
            variant: 'ghost',
            onClick: () => {
              useResourcesStore().deleteResource(parseInt(row.original.id))
            },
          },
          h(
            'iconify-icon',
            {
              icon: 'lucide:trash-2',
            },
            row.getValue('url')
          ))
        ]
      )
    }
  }
]
