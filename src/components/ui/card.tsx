import * as React from "react"
import { cn } from "@/lib/utils"

type PropsWithClassName<T> = T & { className?: string }

export const Card = React.forwardRef<HTMLDivElement, PropsWithClassName<React.HTMLAttributes<HTMLDivElement>>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("rounded-lg border bg-background shadow-sm", className)} {...props} />
  }
)
Card.displayName = "Card"

export const CardHeader = React.forwardRef<HTMLDivElement, PropsWithClassName<React.HTMLAttributes<HTMLDivElement>>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex flex-col space-y-1.5 p-4", className)} {...props} />
  }
)
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<HTMLParagraphElement, PropsWithClassName<React.HTMLAttributes<HTMLHeadingElement>>>(
  ({ className, ...props }, ref) => {
    return <h3 ref={ref as any} className={cn("text-sm font-semibold", className)} {...props} />
  }
)
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<HTMLParagraphElement, PropsWithClassName<React.HTMLAttributes<HTMLParagraphElement>>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref as any} className={cn("text-sm text-muted-foreground", className)} {...props} />
  }
)
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef<HTMLDivElement, PropsWithClassName<React.HTMLAttributes<HTMLDivElement>>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
  }
)
CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef<HTMLDivElement, PropsWithClassName<React.HTMLAttributes<HTMLDivElement>>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
  }
)
CardFooter.displayName = "CardFooter"

export default Card
