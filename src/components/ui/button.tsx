import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-ui font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      /* Solid variants take a neutral disabled surface. Fading an accent to
         50% muddies it against the background and reads as a render bug
         rather than an unavailable control. */
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-(--shadow-btn) hover:brightness-110 active:brightness-95 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground shadow-(--shadow-card) hover:bg-destructive/90 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none",
        outline:
          "border border-border bg-card hover:bg-accent hover:text-accent-foreground disabled:text-muted-foreground disabled:opacity-70",
        secondary:
          "border border-border bg-secondary text-secondary-foreground hover:bg-accent disabled:text-muted-foreground disabled:opacity-70",
        ghost:
          "hover:bg-accent hover:text-accent-foreground disabled:text-muted-foreground",
        link: "text-link underline-offset-4 hover:underline disabled:text-muted-foreground",
      },
      size: {
        default: "h-9 px-4 has-[>svg]:px-3.5",
        xs: "h-6 gap-1 px-2.5 text-label has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3.5 has-[>svg]:px-3",
        lg: "h-10 px-6 has-[>svg]:px-5",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
