import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { type NavItem } from '@/types'
import { Link } from '@inertiajs/react'
import { type PropsWithChildren } from 'react'

interface Props {
  title: string
  description: string
  sidebarNavItems?: NavItem[]
}

export default function ContentLayout({ children, title, description, sidebarNavItems }: PropsWithChildren<Props>) {
  // When server-side rendering, we only render the layout on the client...
  if (typeof window === 'undefined') {
    return null
  }

  const currentPath = window.location.pathname

  return (
    <div className="flex w-full grow flex-col overflow-x-hidden px-4 py-6">
      <Heading title={title} description={description} />

      <div className="flex grow flex-col overflow-x-hidden lg:flex-row lg:space-y-0 lg:space-x-12">
        {sidebarNavItems && (
          <aside className="w-full max-w-xl lg:w-48">
            <nav className="flex flex-wrap space-y-1 space-x-1 lg:flex-col lg:space-x-0">
              {sidebarNavItems.map((item, index) => (
                <Button
                  key={`${item.href}-${index}`}
                  size="sm"
                  variant="ghost"
                  asChild
                  className={cn('justify-start lg:w-full', {
                    'bg-muted': currentPath === item.href
                  })}
                >
                  <Link href={item.href} prefetch>
                    {item.title}
                  </Link>
                </Button>
              ))}
            </nav>
          </aside>
        )}
        <Separator className="my-4 lg:hidden" />

        <div className="flex w-full grow overflow-x-hidden">
          <section className="w-full grow space-y-12">{children}</section>
        </div>
      </div>
    </div>
  )
}
