import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface WithTooltipProps {
  content: string
  children: React.ReactNode
  asChild?: boolean
}

export default function WithTooltip({
  content,
  children,
  asChild = false,
}: WithTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        {asChild ? (
          <TooltipTrigger asChild>{children}</TooltipTrigger>
        ) : (
          <TooltipTrigger>{children}</TooltipTrigger>
        )}
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
