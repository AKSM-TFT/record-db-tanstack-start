import * as React from 'react'
import { cn } from 'cn'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-28 w-full rounded-[6px] border border-input bg-card px-3 py-2.5 text-sm text-card-foreground shadow-none transition-[color,box-shadow,border-color] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
