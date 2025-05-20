import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatCurrency'

type Props = {
  description: string
  total: number
}

export default function TotalCard({ description, total }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formatCurrency(total)}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
