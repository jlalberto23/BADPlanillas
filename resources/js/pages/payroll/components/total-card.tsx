import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatCurrency'
import { cn } from '@/lib/utils'

type Props = {
  description: string
  total: number
  className?: string
}

export default function TotalCard({ description, total, className }: Props) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{formatCurrency(total)}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
